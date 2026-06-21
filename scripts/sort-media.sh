#!/usr/bin/env bash
#
# sort-media.sh — sort Anastasia's media dump into per-client folders AND compress.
#
# Usage:
#   ./scripts/sort-media.sh <dump-dir> [output-dir]
#
#   <dump-dir>    folder where you downloaded ALL the files (flat is fine)
#   [output-dir]  default: public/media
#
# Matches each file to a client slug, then compresses:
#   - video -> 720p silent H.264 mp4 (~2-3MB) + <name>-poster.webp
#   - image -> max 1200px .webp
# Phone screenshots (photo_*) go to _screenshots/ (UI chrome — not gallery-clean).
# Anything unrecognized goes to _unsorted/ for manual review.
# Raw originals are never moved or deleted.

set -uo pipefail  # not -e: one bad file shouldn't abort the whole batch

DUMP="${1:?Usage: ./scripts/sort-media.sh <dump-dir> [output-dir]}"
OUT="${2:-public/media}"

command -v ffmpeg >/dev/null 2>&1 || { echo "ffmpeg missing: brew install ffmpeg" >&2; exit 1; }
mkdir -p "$OUT"

# --- Manifest: normalized IMG_#### stem -> client slug ---------------------
slug_for() {
  case "$1" in
    img_1587|img_4295|img_0416|img_1824|img_2988|img_4384|img_4385|img_2983) echo "wal-design" ;;
    img_0653|img_0800|img_0871|img_4386|img_2989|img_2990)                   echo "kutok-house" ;;
    img_7974|img_8730)                                                       echo "onecar" ;;
    img_5933|img_3744|img_3745)                                              echo "dance-calgary" ;;
    img_7948)                                                                echo "mua-anya" ;;
    img_6650|img_7192)                                                       echo "ok-cosmetology" ;;
    img_8790|img_9956|img_9950|img_0331)                                     echo "dr-collins" ;;
    img_7730)                                                                echo "comedy-shelter" ;;
    img_3747)                                                                echo "khometska" ;;
    img_1057|img_2613|img_2594|img_4399|img_4400|img_4190)                   echo "ugc" ;;
    img_0769|img_2839|img_7590)                                              echo "brands/eva-beauty" ;;
    img_8105|img_4099|img_8104)                                              echo "brands/glambee" ;;
    img_0255|img_0180)                                                       echo "brands/_unassigned" ;;
    *) echo "_unsorted" ;;
  esac
}

shopt -s nullglob nocaseglob
img_count=0; vid_count=0; unsorted=0

while IFS= read -r -d '' f; do
  raw="$(basename "$f")"
  # Normalize stem: drop extension, lowercase (ASCII), strip " (1)" copy suffix + spaces.
  stem="$(basename "${f%.*}" | tr '[:upper:]' '[:lower:]' | sed -E 's/ *\([0-9]+\)//g; s/ +$//')"
  ext="$(echo "${f##*.}" | tr '[:upper:]' '[:lower:]')"

  # Named-file overrides (Cyrillic reels + phone screenshots) take priority.
  case "$raw" in
    photo_*|Photo_*)                 slug="_screenshots" ;;
    *Sweet_Amelie*|*sweet_amelie*)   slug="comedy-shelter" ;;
    *Вінниці*|*видалення_тату*)      slug="dr-collins" ;;
    *)                               slug="$(slug_for "$stem")" ;;
  esac
  [ "$slug" = "_unsorted" ] && unsorted=$((unsorted+1))

  destdir="$OUT/$slug"; mkdir -p "$destdir"
  base="$(basename "${f%.*}")"
  # Clean output name so " (1)" copy suffixes / trailing spaces match the data paths.
  outbase="$(echo "$base" | sed -E 's/ *\([0-9]+\)//g; s/ +$//')"

  case "$ext" in
    jpg|jpeg|png|webp|heic|tiff|bmp)
      echo "IMG  [$slug] $outbase"
      ffmpeg -nostdin -y -loglevel error -i "$f" -vf "scale='min(1200,iw)':-2" -frames:v 1 -update 1 -q:v 3 "$destdir/$outbase.jpg" || echo "  ! failed: $base"
      img_count=$((img_count+1)) ;;
    mp4|mov|webm|m4v|avi|mkv|gif)
      echo "VID  [$slug] $outbase"
      ffmpeg -nostdin -y -loglevel error -i "$f" -vf "scale=-2:720" -an \
        -c:v libx264 -crf 28 -preset fast -movflags +faststart "$destdir/$outbase.mp4" || echo "  ! failed: $base"
      ffmpeg -nostdin -y -loglevel error -ss 0 -i "$destdir/$outbase.mp4" -frames:v 1 -update 1 -q:v 4 "$destdir/$outbase-poster.jpg" || true
      vid_count=$((vid_count+1)) ;;
    *) echo "skip $base (.$ext)" ;;
  esac
done < <(find "$DUMP" -type f -print0)

echo ""
echo "DONE. $img_count image(s), $vid_count video(s). $unsorted -> _unsorted/."
du -sh "$OUT"
