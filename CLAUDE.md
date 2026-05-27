# Contributor notes

## Hero videos

The home hero (`src/components/Hero.tsx`) and industries hero (`src/pages/Industries.tsx`) load mp4s from `public/videos/`, served by Vite directly.

Do **not** use Lovable's video uploader for these. Lovable replaces uploaded media with a `*.mp4.asset.json` pointer that resolves to `/__l5e/...` — a path only Lovable's runtime serves. Locally and on any non-Lovable host, those URLs 404 and the hero looks empty.

To update a hero video: replace the file in `public/videos/` and commit. Keep the existing `const heroVideo = { url: "/videos/..." }` line — if Lovable rewrites it back to an `import ... from '@/assets/*.mp4.asset.json'`, revert that change in your next sync.
