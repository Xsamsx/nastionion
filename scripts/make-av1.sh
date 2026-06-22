#!/usr/bin/env bash
#
# make-av1.sh — generate an AV1 (WebM) sibling for every .mp4 in public/media.
#
# The site serves <video> with two <source>s: the AV1 .webm first, the H.264
# .mp4 as fallback. Modern browsers (Chrome/Firefox/Edge/Android) pick the AV1
# and get noticeably better quality; Safari/iOS fall back to the .mp4.
#
# AV1 is encoded 2-pass to ~92% of each MP4's bitrate, so the .webm is the same
# size or smaller than the .mp4 it shadows — better quality, no size increase.
#
# Usage:
#   ./scripts/make-av1.sh [--force] [target-dir]
#     --force      re-encode even if an up-to-date .webm already exists
#     target-dir   default: public/media
#
# Run AFTER optimize-media.sh (it shadows the optimised MP4s). Idempotent:
# skips any .webm already newer than its .mp4. Safe to re-run.

set -uo pipefail
export LANG=en_US.UTF-8 LC_ALL=en_US.UTF-8

if ! ffmpeg -hide_banner -encoders 2>/dev/null | grep -q libsvtav1; then
  echo "ffmpeg has no libsvtav1 encoder. Install a recent ffmpeg: brew install ffmpeg" >&2
  exit 1
fi

FORCE=0
TARGET="public/media"
for arg in "$@"; do
  case "$arg" in
    --force) FORCE=1 ;;
    *) TARGET="$arg" ;;
  esac
done
[ -d "$TARGET" ] || { echo "No such dir: $TARGET" >&2; exit 1; }

LOCK="${TMPDIR:-/tmp}/make-av1.lock"
if ! mkdir "$LOCK" 2>/dev/null; then
  echo "Another make-av1 run is already in progress (lock: $LOCK)." >&2
  echo "If you're sure none is, remove it: rmdir '$LOCK'" >&2
  exit 1
fi
PASSLOG="${TMPDIR:-/tmp}/av1pass.$$"
trap 'rmdir "$LOCK" 2>/dev/null; rm -f "$PASSLOG"*' EXIT

filesize() { wc -c < "$1" | tr -d '[:space:]'; }
human() { awk -v b="$1" 'BEGIN{ split("B KB MB GB",u); i=1; while(b>=1024&&i<4){b/=1024;i++} printf "%.1f%s", b, u[i] }'; }

PRUNE=( -path '*/_unsorted/*' -o -path '*/_screenshots/*' -o -path '*/_unassigned/*' )

made=0; skipped=0; webm_total=0; mp4_total=0

echo "Generating AV1 WebM siblings in: $TARGET"
echo "------------------------------------------------------------"

while IFS= read -r -d '' mp4; do
  webm="${mp4%.mp4}.webm"

  # Idempotency: skip if a WebM newer than the MP4 already exists.
  if [ $FORCE -eq 0 ] && [ -f "$webm" ] && [ "$webm" -nt "$mp4" ]; then
    skipped=$((skipped+1)); continue
  fi

  dur=$(ffprobe -v error -show_entries format=duration -of csv=p=0 "$mp4" </dev/null 2>/dev/null)
  sz=$(filesize "$mp4")
  # Target 92% of the MP4's effective bitrate (kbps) so the WebM stays smaller.
  br=$(awk -v s="$sz" -v d="$dur" 'BEGIN{ if(d>0) printf "%d", (s*8/d/1000)*0.92; else print 0 }')
  if [ -z "$br" ] || [ "$br" -lt 1 ]; then
    echo "  SKIP (no duration)  $mp4"; skipped=$((skipped+1)); continue
  fi

  ffmpeg -nostdin -y -loglevel error -i "$mp4" -an -c:v libsvtav1 -b:v "${br}k" \
    -preset 6 -pix_fmt yuv420p -pass 1 -passlogfile "$PASSLOG" -f null /dev/null </dev/null 2>/dev/null
  ffmpeg -nostdin -y -loglevel error -i "$mp4" -an -c:v libsvtav1 -b:v "${br}k" \
    -preset 6 -pix_fmt yuv420p -pass 2 -passlogfile "$PASSLOG" "$webm" </dev/null 2>/dev/null

  if [ -f "$webm" ] && [ "$(filesize "$webm")" -gt 0 ]; then
    w=$(filesize "$webm")
    made=$((made+1)); webm_total=$((webm_total+w)); mp4_total=$((mp4_total+sz))
    echo "  AV1  $webm  $(human "$sz") mp4 -> $(human "$w") webm"
  else
    rm -f "$webm"
    echo "  FAILED  $mp4 (kept mp4-only)"; skipped=$((skipped+1))
  fi
done < <(find "$TARGET" \( "${PRUNE[@]}" \) -prune -o -name '*.mp4' -print0)

echo "------------------------------------------------------------"
echo "AV1 WebM created: $made | skipped: $skipped"
[ $made -gt 0 ] && echo "Matched MP4s: $(human "$mp4_total") -> AV1 WebM: $(human "$webm_total")"
echo "Delete all WebMs with: find $TARGET -name '*.webm' -delete"
