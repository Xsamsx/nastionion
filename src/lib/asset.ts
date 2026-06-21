// Resolve a public/ asset path against Vite's base URL so media works both in
// dev ('/') and on GitHub Pages ('/nastionion/'). Store paths without a leading
// slash, e.g. asset('media/wal-design/clip.mp4').
export const asset = (path: string) =>
  `${import.meta.env.BASE_URL}${path.replace(/^\//, '')}`
