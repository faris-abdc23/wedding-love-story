# Project instructions for Codex
Read README.md, docs/DEVELOPMENT_PLAN.md and docs/ASSET_MIGRATION.md before editing.
Stack: JavaScript ES modules, native Cloudflare Worker, D1 SQLite, vanilla frontend.
Continue the earliest unchecked step in DEVELOPMENT_PLAN; update status and explain verification.
Never expose the guest list, phone numbers, token hashes or export CSV to browser/public assets.
Tokens: crypto-random 16 bytes base64url; database stores SHA-256 hash only. Invalid/inactive invitation must return HTTP 404 before rendering content. A holder can forward a bearer link; do not claim recipient identity verification.
Do not bypass Worker validation via static HTML or public R2 media. Keep private media under /media/ and preserve cookie validation.
Use bound SQL parameters. Keep wish content escaped/textContent. Maintain RSVP quota validation and same-origin writes.
Do not invent event times, parents, bank accounts or love story; ask only for missing content needed by the active task. Groom's mother's name must remain omitted.
Do not copy Elementor/WeddingPress runtime. Use asset manifest as reference; original HAR was not supplied in this workspace.
Run npm test and relevant local Wrangler/D1 integration checks for backend changes. Never use real guest data in fixtures.
Deployment and domain purchase are separate from local development; do not publish automatically.
