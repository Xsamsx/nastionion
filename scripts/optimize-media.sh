#!/usr/bin/env bash
#
# optimize-media.sh — shrink the ALREADY-SHIPPED media in public/media in place.
#
# Unlike process-media.sh / sort-media.sh (which ingest a raw dump), this script
# re-compresses the files the site actually serves, to cut page weight.
#
# Usage:
#   ./scripts/optimize-media.sh [--dry-run] [target-dir]
#
#   --dry-run     report what would change without writing anything
#   target-dir    default: public/media
#
# What it does:
#   - Videos -> capped to a 1280px box AND 30fps (reels are muted background
#               loops — 60fps just doubles the bytes), audio stripped, H.264
#               CRF 30, +faststart. Replaced only if the result is smaller.
#   - Images -> capped to 1280px long edge, JPEG re-compressed at q82. Extension
#               is kept (.jpg stays .jpg), so NO code references need to change.
#               Replaced only if the result is smaller.
#
# Safe by design:
#   - Idempotent: already-optimised files (no audio + <=1280px + <=30fps) are skipped.
#   - Never enlarges a file; keeps the original if re-encoding doesn't help.
#   - Originals are tracked in git, so `git checkout -- public/media` restores them.
#   - Skips the gitignored working folders (_unsorted, _screenshots, _unassigned).

set -uo pipefail  # not -e: one bad file shouldn't abort the whole batch

# Force a UTF-8 locale so filenames with emoji / Cyrillic are handled correctly.
export LANG=en_US.UTF-8 LC_ALL=en_US.UTF-8

DRY_RUN=0
TARGET="public/media"
for arg in "$@"; do
  case "$arg" in
    --dry-run) DRY_RUN=1 ;;
    *) TARGET="$arg" ;;
  esac
done

if ! command -v ffmpeg >/dev/null 2>&1; then
  echo "ffmpeg not found. Install with: brew install ffmpeg" >&2; exit 1
fi

[ -d "$TARGET" ] || { echo "No such dir: $TARGET" >&2; exit 1; }

# Single-instance lock: two runs writing the same tree corrupt each other.
# mkdir is atomic, so it doubles as the lock.
LOCK="${TMPDIR:-/tmp}/optimize-media.lock"
if ! mkdir "$LOCK" 2>/dev/null; then
  echo "Another optimize-media run is already in progress (lock: $LOCK)." >&2
  echo "If you're sure none is, remove it: rmdir '$LOCK'" >&2
  exit 1
fi
trap 'rmdir "$LOCK" 2>/dev/null' EXIT

# Bytes of a file. wc -c reads via the shell's own file handle, so it's both
# portable (macOS + Linux) and immune to stat's filename/locale quirks.
filesize() { wc -c < "$1" | tr -d '[:space:]'; }
human() { awk -v b="$1" 'BEGIN{ split("B KB MB GB",u); i=1; while(b>=1024&&i<4){b/=1024;i++} printf "%.1f%s", b, u[i] }'; }

PRUNE=( -path '*/_unsorted/*' -o -path '*/_screenshots/*' -o -path '*/_unassigned/*' )

saved_total=0
vid_done=0; vid_skip=0; img_done=0; img_skip=0

echo "Optimizing media in: $TARGET  $([ $DRY_RUN -eq 1 ] && echo '(dry run)')"
echo "------------------------------------------------------------"

# ---- Videos ----------------------------------------------------------------
while IFS= read -r -d '' f; do
  before=$(filesize "$f")

  # Idempotency: skip if already audio-less AND within the 1280px box AND <=30fps.
  has_audio=$(ffprobe -v error -select_streams a -show_entries stream=index -of csv=p=0 "$f" </dev/null 2>/dev/null)
  longest=$(ffprobe -v error -select_streams v:0 -show_entries stream=width,height -of csv=p=0 "$f" </dev/null 2>/dev/null \
            | tr ',' '\n' | sort -n | tail -1)
  fr=$(ffprobe -v error -select_streams v:0 -show_entries stream=r_frame_rate -of csv=p=0 "$f" </dev/null 2>/dev/null)
  fps=$(awk -F/ '{ if($2) printf "%d", $1/$2; else print $1 }' <<<"$fr")
  if [ -z "$has_audio" ] && [ -n "$longest" ] && [ "$longest" -le 1280 ] && [ -n "$fps" ] && [ "$fps" -le 32 ]; then
    vid_skip=$((vid_skip+1)); continue
  fi

  if [ $DRY_RUN -eq 1 ]; then
    echo "  VIDEO  would re-encode  $f  ($(human "$before"), ${fps}fps)"
    vid_done=$((vid_done+1)); continue
  fi

  tmp="${f%.mp4}.opt.mp4"
  ffmpeg -nostdin -y -loglevel error -i "$f" \
    -vf "scale='min(1280,iw)':'min(1280,ih)':force_original_aspect_ratio=decrease,scale=trunc(iw/2)*2:trunc(ih/2)*2,fps=30" \
    -an -c:v libx264 -crf 30 -preset slow -pix_fmt yuv420p -movflags +faststart "$tmp" 2>/dev/null

  if [ -f "$tmp" ] && [ "$(filesize "$tmp")" -lt "$before" ]; then
    after=$(filesize "$tmp"); mv "$tmp" "$f"
    saved_total=$((saved_total + before - after)); vid_done=$((vid_done+1))
    echo "  VIDEO  $f  $(human "$before") -> $(human "$after")"
  else
    rm -f "$tmp"; vid_skip=$((vid_skip+1))
    echo "  VIDEO  kept (no gain)  $f"
  fi
done < <(find "$TARGET" \( "${PRUNE[@]}" \) -prune -o -name '*.mp4' -print0)

# ---- Images ----------------------------------------------------------------
while IFS= read -r -d '' f; do
  before=$(filesize "$f")
  if [ $DRY_RUN -eq 1 ]; then
    echo "  IMAGE  would re-compress  $f  ($(human "$before"))"
    img_done=$((img_done+1)); continue
  fi

  ext="${f##*.}"; tmp="${f%.*}.opt.${ext}"
  ffmpeg -nostdin -y -loglevel error -i "$f" \
    -vf "scale='min(1280,iw)':'min(1280,ih)':force_original_aspect_ratio=decrease" \
    -q:v 5 "$tmp" 2>/dev/null   # -q:v 5 ≈ JPEG quality ~82

  if [ -f "$tmp" ] && [ "$(filesize "$tmp")" -lt "$before" ]; then
    after=$(filesize "$tmp"); mv "$tmp" "$f"
    saved_total=$((saved_total + before - after)); img_done=$((img_done+1))
    echo "  IMAGE  $f  $(human "$before") -> $(human "$after")"
  else
    rm -f "$tmp"; img_skip=$((img_skip+1))
  fi
done < <(find "$TARGET" \( "${PRUNE[@]}" \) -prune -o \( -name '*.jpg' -o -name '*.jpeg' -o -name '*.png' \) -print0)

echo "------------------------------------------------------------"
echo "Videos: $vid_done re-encoded, $vid_skip skipped/kept"
echo "Images: $img_done re-compressed, $img_skip skipped/kept"
[ $DRY_RUN -eq 0 ] && echo "Total saved: $(human "$saved_total")"
echo "Restore originals anytime with: git checkout -- $TARGET"
