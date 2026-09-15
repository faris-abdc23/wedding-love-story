# Validation record

## 2026-09-14 local runtime and D1

- PASS: Node.js `v24.21.0`, npm `11.19.0`, Wrangler `4.131.1`; package engine requirement (`>=22`) is satisfied.
- PASS: `npm audit --omit=dev` reports 0 vulnerabilities.
- PASS: `npm test` passes 11 tests, including token rejection, quota/origin validation, safe text rendering assumptions, CSV parsing, stable-token re-import, additive merge, and strict legacy adoption.
- PASS: Wrangler local server started on `http://127.0.0.1:8787` with local D1 and static asset bindings.
- PASS: migrations `0001_initial.sql` and `0002_guest_key.sql` applied to local D1. The seed succeeds twice consecutively.
- PASS: local D1 contains only 64-character SHA-256 token hashes; querying `token_hash` with a raw exported token returned zero matches.
- PASS: the first raw token read locally from the private export returned HTTP 200 and set the scoped HttpOnly media cookie. `/`, an unregistered 22-character token, and the same registered token while temporarily inactive returned HTTP 404. The demo was restored active and returned 200 again.
- PASS: calendar returned HTTP 200 as `text/calendar` and contained a VEVENT.
- PASS: RSVP POST persisted in D1; over-quota input returned 400. Re-running the guest seed preserved the RSVP row.
- PASS: a test wish persisted unapproved, was absent from the public wishes response, then appeared after local SQL moderation. The JSON contains the literal test string, while the frontend renders both name and message through `textContent`/`createTextNode`; browser execution was not tested.
- PASS: legacy exports were adopted into stable `guest_id` values without token rotation. Re-import retained the same links. Idempotent seed reruns left two unique guests and preserved existing RSVP/wish rows.
- PASS: `seeds/`, `exports/`, `.wrangler/`, and `*.har` are excluded from Git. This workspace currently has no `.git` metadata, so Git status could not be checked.

## Remaining validation

- Browser UI, keyboard/accessibility, responsive screenshots, and private media playback/range behavior are not yet verified.
- The newly present HAR and all media rights/completeness still require audit before migration.
- No production Cloudflare account, remote D1, deployment, custom domain, or real guest data has been used.

## 2026-09-14 HAR migration and visual baseline

- PASS: audited `original/tahtaorganizer.site.har` (132 entries) and primary `original-viewsource.html`; safe reports omit query strings and request headers.
- PASS: source scan across 90 HTML/CSS/JS files found 37 unique image URLs. Thirteen unique complete personal-photo bodies, ten decor/background assets, full audio, full video, and six required font files are local and self-hosted.
- PARTIAL: source metadata references one additional higher-resolution `MJP_5659.jpg`. It was absent from HAR and the vendor host became unreachable during retrieval; `MJP_5659-scaled.jpg` is available. Derived original-name probes could not be completed for the same reason.
- PASS: video downloaded independently is 8,866,326 bytes and hashes identically to the HAR 206 payload. Audio was downloaded independently because its HAR body was missing.
- PASS: private media without invitation cookie returns 404; valid cookie returns 200. Video byte range `0-1023` returns 206 with exactly 1,024 bytes; an unsatisfiable range returns 416.
- PASS: `npm test` passes 13 tests, including private-media range behavior.
- PASS: Chrome headless opened the private demo invitation, scrolled all content to trigger lazy/reveal behavior, and captured full-page screenshots at 360, 390, 768, and 1440. Cover-before-open and nine per-section captures exist at both 390 and 1440.
- PASS: final browser report contains zero console exceptions, log errors, failed non-cancelled requests, or HTTP error responses.
- PASS: local screenshot inspection confirms the fixed 400px desktop panel, responsive single panel, source palette/fonts, ornament layers, video hero, profile illustrations, slideshow/countdown, reception card, 9-photo gallery, RSVP/wishes, and footer render without blank reveal sections.
- PASS: no WordPress/Elementor/WeddingPress/vendor URLs remain in `src/` or `public/`. OFL license texts for four font families are included.
- PASS (code path): music starts only after open/manual play; Page Visibility pauses and conditionally resumes only a visibility-caused pause; manual pause blocks resume; `pagehide` pauses; rejected `play()` leaves an accessible play button and status. Headless Chrome exercised the blocked-play fallback, but real OS tab/minimize audio behavior still needs manual UAT.
- NOT VERIFIED: live-source screenshots/DOM overlay. The browsing path could not open the vendor page, and the host later stopped accepting connections. Exact timing, carousel parity, and pixel comparison therefore remain pending.
- PASS: final D1 smoke test returned 200 for RSVP POST, wish POST, and RSVP GET; the submitted demo count persisted. Unknown token remained 404.

## 2026-09-14 missing-section parity pass

- PASS: restored the exact QS. Ar-Rum:21 quotation and source monogram/card hierarchy.
- PASS: restored separate bride and groom portraits with the corresponding four Java illustration/background layers.
- PASS: restored all eight dated love-story milestones from the supplied HTML source.
- PASS: RSVP and wishes now render as distinct sections while retaining the existing D1 endpoints, quota checks, moderation, and text-only wish rendering.
- PASS: refreshed 360/390/768/1440 full-page and 390/1440 section screenshots. The browser report records zero console exceptions, failed non-cancelled requests, or HTTP error responses.
- PASS: `npm test` passes 13 tests after the parity changes.
- BLOCKED CONTENT: both Instagram anchors in the supplied source use `href="#"`; no account handle or destination appears in the HTML/HAR. Disabled source-styled buttons are rendered until verified URLs are supplied.

## 2026-09-14 screenshot-directed parity revision

- PASS: applied the user-supplied Instagram URLs to the two individual profile buttons.
- PASS: restored the three source event cards, source gift account details, copy actions, a slower 20-second slideshow cycle, a vertical mobile gallery strip, combined RSVP/wishes, and the photo closing section.
- PASS (code path): QR is generated locally in the browser from the current valid `/i/{token}` URL; it does not use the source vendor QR or expose a guest export/list.
- PASS: `npm test` remains 13/13 and JavaScript syntax checks pass for content, renderer, and browser code.
- NOT VERIFIED: the headless Chrome capture process crashed before refreshed screenshots could complete. Existing screenshots are retained; a manual browser pass remains required for this revision.

## 2026-09-14 gallery source correction

- PASS (source audit): gallery widget `13980603` specifies three visible slides on mobile/tablet/desktop, 5px spacing, 1.5s autoplay and 1.5s transition; it is not a vertical strip.
- PASS (code path): local gallery was changed to a three-portrait-slide looping carousel with 1.5s glide, hover pause, reduced-motion opt-out, and existing private-media lightbox behavior.

## Static Love Story ? 2026-09-15

- npm test: static rendering/media references and deployment isolation pass; node --check public/app.js passes.
- Local Wrangler runs with static assets only and no D1 binding. Root and media return 200 without cookies; private exports, public backup paths and old invitation API paths return 404.
- Chrome QA at 360, 390, 430, 768 and 1440 pixels: cover opening, loaded video, gallery/lightbox next/close and music toggle checked, with no horizontal overflow or missing media. Screenshots and browser-report.json recorded under references/screenshots (never deployed).
- Reduced motion at 390px: zero hidden reveal nodes, paused video and working lightbox. Mobile cover visually reviewed; capsule geometry retained. Reveals now stay visible after scrolling. Gallery uses native horizontal scrolling and stops while interacting or backgrounded.
- Local static asset emulator returned full video (200) to a Range request, rather than 206; Chrome loaded the complete 8.9 MB video successfully. Production range/seek behavior and actual Android/iPhone playback still need a device check after an authorized release.
- Programmatic Chrome clicks can trigger autoplay restrictions; the fallback music control stays available. No deployment, QR URL selection or domain purchase performed.

Intro follow-up (2026-09-15): copied backup intro CSS including photo sizing, motifs, quote panel and typography. Repeat observer targets the stable section box to avoid animation-trigger feedback; reduced-motion fallback remains immediate. Verified with npm test, node --check public/app.js and npm run build.

Downward reveal correction (2026-09-15): verified JavaScript syntax, npm test and static build. Direction detection gates animated entry for every data-reveal element; upward entry disables transitions, and reset occurs below the viewport. Reduced motion remains immediate.

Intro photo layering (2026-09-15): photo frame clips the CSS radial-gradient vignette at 16px; quote panel uses z-index 1 and -30px top margin. Existing image path, responsive aspect ratio and reveal are retained. npm test and npm run build pass.

Intro layering correction (2026-09-15): confirmed 16px photo/frame radius, noninteractive vignette overlay, foreground photo stacking and margin-top -30px on the quote panel. Static build passed.

Couple background (2026-09-15): confirmed fixed background attachment is scoped to .couple.paper; npm run build passed.

Gallery (2026-09-15): npm test, JavaScript syntax check and static build passed. All nine original photo buttons remain in initial data order for the lightbox; carousel reuses nodes without cloned images, with interaction/background/lightbox pauses and swipe support. Fixed aspect ratios and a 420px maximum width constrain sizing.

Gallery background (2026-09-15): checked gradient scope in .gallery-section; npm run build passed.

Carousel timing (2026-09-15): transition/fallback finish before the 500ms autoplay tick; JavaScript syntax check and static build passed.

Music offset (2026-09-15): verified deferred metadata seek and no seek reset on resume using a mocked media element; npm test, JavaScript syntax and static build passed.

Playback/readability (2026-09-15): npm test, JavaScript syntax check and static build passed. Audio seek is prepared before opening when metadata is ready; play runs before any remaining seek, with a single AbortError retry respecting pause/visibility. Wedding backdrop is decorative; footer photo opacity is isolated from text. Actual mobile autoplay still depends on browser permission.

Cover spacing (2026-09-15): checked isolated heading/details wrappers and responsive viewport-height spacing, safe-area padding and scroll fallback for short screens. npm test and static build passed.

Cover height (2026-09-15): confirmed existing cover-content override now uses max-height 80% with vertical overflow auto; npm run build passed.

Responsive capsule (2026-09-15): checked capsule widths of 288/312/344px for 360/390/430px story panels, 544px for the 680px tablet panel, and 320px for the 400px desktop story panel. Portrait aspect ratio and minimum readable font sizes retained; conflicting mobile widths removed. npm run build passed.

Timeline readability (2026-09-15): verified scoped 18px body/16px date sizes without viewport scaling; npm run build passed.

Love Story text (2026-09-15): verified changes scoped to story opening, story heading copy and timeline text with no viewport-specific overrides. npm run build passed.

Capsule bottom spacing (2026-09-15): checked Instagram width override and increased responsive bottom padding; 44px minimum touch height retained. npm run build passed.

Full-width responsive update (2026-09-15): npm test/build passed. scripts/check-responsive.mjs uses trusted mouse input to open the cover, checks full available width accounting for scrollbars, no horizontal overflow and lightbox behavior at 360x800, 390x844, 430x932, 768x1024, 1024x768, 1366x768, 1920x1080, 2560x1440 and 844x390. Capsule is bounded at 560px, gallery at 420px, timeline at 760px. Reports/screenshots saved privately under references/screenshots. Desktop screenshot visually reviewed. Audio plays on opening in these checks, but the existing initial three-second offset was observed resetting to zero; this is a remaining playback issue, separate from responsive CSS.

Static deployment preparation (2026-09-15): npm test/build passed. Build output permits only six root entries and asset media extensions, rejects symlinks/files above 25 MiB. Legacy/private sources excluded from deployment by the build allowlist and Wrangler dist directory. Broad deletion rejected before execution; no original files were deleted.

Cleanup/rebuild completed (2026-09-15): legacy files archived with SHA-256 verification; npm test, JavaScript syntax and static build pass. Release output has 36 files / 21395045 bytes. Each deployed media file matches its source SHA-256, with no stale media or private legacy files. docs/deploy-manifest.json records exact output. No deployment performed.

Music offset resolved (2026-09-15): archived original MP3 at .private-archive/music-original-before-trim.mp3. Removed 115 MPEG Layer III frames (3.0040816 seconds) without re-encoding. Existing /media/audio/kusuma-wijaya.mp3 path retained. Removed initial seek code; native play runs from the opening gesture. Trusted Chrome click against local Wrangler verifies unpaused playback, advancing currentTime (1.423442 seconds into the trimmed track) and seeking false. npm test, JS syntax and build passed; deploy/source media manifests updated. Player time zero now corresponds to original track time 3.004 seconds.
