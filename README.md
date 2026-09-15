# Tyas & Faris ? Online Love Story

Website statis vanilla JavaScript dengan foto, video, musik dan font lokal. Tidak membutuhkan database, backend, login, cookies, analytics atau browser storage.

## Lokal

Node.js 22+: jalankan npm ci, npm test, lalu npm run dev. Source aktif: src/page.js, src/content.js, public/app.css dan public/app.js. Media aktif: public/media/.

## Deployment hemat

npm run build menghasilkan dist/ dengan index.html, app.css, app.js, favicon.svg, _headers dan media/. Wrangler hanya mengunggah dist/; tidak ada Worker runtime atau binding D1/R2/KV.

Cloudflare Static Assets menyediakan request aset statis gratis dan tidak terbatas: https://developers.cloudflare.com/workers/static-assets/billing-and-limitations/

Gunakan alamat bawaan workers.dev agar tidak perlu membeli domain. npm run deploy menerbitkan website; deployment belum dijalankan. Setelah release, arahkan QR resepsi ke URL HTTPS final.

Build menolak file tak dikenal di output dan media non-aset, symlink, serta file di atas 25 MiB. File undangan lama, ekspor privat, backup dan referensi diabaikan Git dan tidak disalin ke output. File lama sudah diarsipkan lokal di .private-archive/cleanup-2026-09-15/. Rincian pemulihan dan cleanup ada di docs/CLEANUP_PLAN.md; inventaris deploy ada di docs/deploy-manifest.json. Lisensi font dipertahankan di docs/licenses/.
