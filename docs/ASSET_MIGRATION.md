# Asset migration

The public Love Story keeps original asset paths under public/media/ and deploys them under /media/. Photos, motifs, full video, music and fonts are unchanged.

Original HTML/HAR, extracted source bodies, personal-photo reference copies and screenshots have moved to .private-archive/cleanup-2026-09-15/legacy/. Earlier migration documentation and provenance manifest are preserved under snapshot/docs/. The historical high-resolution MJP_5659.jpg remains unresolved; the recovered scaled photo used by the app is available.

No WordPress, Elementor, WeddingPress or vendor runtime is deployed. All interactions use native browser APIs. No cookies, database or guest-specific media validation is part of the current public app.

Font licenses remain in docs/licenses/. docs/asset-manifest.json records active source media and docs/deploy-manifest.json records the built release output.

Audio update: initial three seconds trimmed losslessly at an MP3 frame boundary (3.004 seconds). Original audio is preserved privately at .private-archive/music-original-before-trim.mp3; public asset path unchanged.

Illustrated story (2026-09-15): eight supplied 1672 x 941 PNG originals retained under public/media/story/. WebP copies use quality 93, method 6 at original dimensions. Picture elements select WebP with PNG fallback; images remain uncropped with lazy loading, async decoding and explicit dimensions. Build permits PNG only for media/story/1.png through 8.png; other media restrictions remain. Active and deploy manifests refreshed.
