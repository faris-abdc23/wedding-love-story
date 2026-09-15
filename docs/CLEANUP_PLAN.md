# Cleanup completed - 2026-09-15

User explicitly authorized archiving legacy code/files and rebuilding deployment output.

Private archive: .private-archive/cleanup-2026-09-15/ (ignored by Git, never deployed).

- snapshot/: active code, configuration, package files and documentation before cleanup.
- legacy/: original source/HAR, references/screenshots, guest exports and seeds, database migrations, code backups, obsolete Worker/security/import/migration/QA scripts, guest example and historical layout documentation.
- build-before-cleanup/: copied previous generated build. The directory was locked by a local process, so it was copied instead of moved, then rebuilt in place.
- manifest.json: archived file paths, sizes and SHA-256 checksums. Legacy moves were verified against their pre-move hashes. The manifest contains 272 archived files, plus the manifest itself.

Nothing was permanently deleted. Original paths are preserved inside the archive. Restore a file by copying the corresponding legacy/ or snapshot/ entry back into the workspace. Guest exports remain private and recoverable.

Active app: src/page.js, src/content.js, public/app.js, public/app.css, public/favicon.svg and public/media/. Only scripts/build-static.mjs remains active. Package files, wrangler.jsonc, tests and license/documentation files are retained.

Deploy output: dist/ only. 36 files, 20.40 MiB. See deploy-manifest.json for exact sizes and hashes. No archive, CSV, database, source backup or development dependency is in the output.

npm test, node --check public/app.js and npm run build passed. Deployment not performed.

Follow-up audio archive: .private-archive/music-original-before-trim.mp3 preserves the original before the three-second trim. Updated deploy manifests reflect the rebuilt audio and JavaScript.
