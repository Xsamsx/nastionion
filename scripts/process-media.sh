#!/usr/bin/env bash
#
# process-media.sh — batch-compress a dump of photos/videos for the website.
#
# Usage:
#   ./scripts/process-media.sh <input-dir> [output-dir]
#
#   <input-dir>   folder of raw media (can have subfolders per collab/brand)
#   [output-dir]  where processed files go (default: public/media)
#
# What it does:
#   - Images  -> resized to max 1200px, converted to .webp (~150KB)
#   - Videos  -> 720p, audio stripped, H.264, silent-loop ready (~1-3MB)
#               + auto-generates a <name>-poster.webp still frame
#   - Subfolder structure from the input is preserved in the output, so if you
#     sort the dump into per-brand folders first, the website folders match.
#
# Raw originals are never moved or deleted — they stay where you dropped them.

set -euo pipefail

IN="${1:?Usage: ./scripts/process-media.sh <input-dir> [output-dir]}"
OUT="${2:-public/media}"

if ! command -v ffmpeg >/dev/null 2>&1; then
  echo "ffmpeg not found. Install with: brew install ffmpeg" >&2
  exit 1
fi

mkdir -p "$OUT"

shopt -s nullglob nocaseglob

img_count=0
vid_count=0

# Walk every file under the input dir, preserving relative subfolder paths.
while IFS= read -r -d '' f; do
  rel="${f#"$IN"/}"                 # path relative to input root
  reldir="$(dirname "$rel")"
  base="$(basename "${f%.*}")"
  ext="$(echo "${f##*.}" | tr '[:upper:]' '[:lower:]')"
  destdir="$OUT/$reldir"
  mkdir -p "$destdir"

  case "$ext" in
    jpg|jpeg|png|webp|heic|tiff|bmp)
      out="$destdir/$base.webp"
      echo "IMG  $rel -> ${out#"$OUT"/}"
      ffmpeg -y -loglevel error -i "$f" \
        -vf "scale='min(1200,iw)':-2" \
        -q:v 80 "$out"
      img_count=$((img_count+1))
      ;;
    mp4|mov|webm|m4v|avi|mkv|gif)
      out="$destdir/$base.mp4"
      poster="$destdir/$base-poster.webp"
      echo "VID  $rel -> ${out#"$OUT"/}  (+poster)"
      # Silent 720p loop. Drop -an and add audio flags if a clip needs sound.
      ffmpeg -y -loglevel error -i "$f" \
        -vf "scale=-2:720" -an \
        -c:v libx264 -crf 28 -preset slow -movflags +faststart "$out"
      # Poster frame from the first second.
      ffmpeg -y -loglevel error -ss 0 -i "$out" -vframes 1 -q:v 80 "$poster"
      vid_count=$((vid_count+1))
      ;;
    *)
      echo "skip $rel (unsupported: .$ext)"
      ;;
  esac
done < <(find "$IN" -type f -print0)

echo ""
echo "Done. $img_count image(s), $vid_count video(s) -> $OUT"
echo "Total output size:"
du -sh "$OUT"
