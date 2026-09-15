import c from './content.js';

const e = value =>
  String(value ?? '').replace(
    /[&<>"']/g,
    char =>
      ({
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#39;',
      })[char],
  );

const instagramIcon =
  '<svg class="instagram-icon" viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="18" cy="6" r="1"/></svg>';

const slideshow = c.gallery
  .slice(0, 4)
  .map(src => '<img src="' + e(src) + '" alt="" decoding="async">')
  .join('');

const galleryPhotos = c.gallery.map(
  (src, index) =>
    '<button class="photo" type="button" data-index="' +
    index +
    '" aria-label="Perbesar foto ' +
    (index + 1) +
    '">' +
    '<img src="' +
    e(src) +
    '" alt="Kenangan Tyas dan Faris ' +
    (index + 1) +
    '" loading="lazy" decoding="async" width="800" height="1200">' +
    '</button>',
);

const story = c.story
  .map(
    item =>
      '<article data-reveal>' +
      '<time>' +
      e(item.date) +
      '</time>' +
      '<p>' +
      e(item.text) +
      '</p>' +
      '</article>',
  )
  .join('');

export function invitation() {
  return `<!doctype html>
<html lang="id">

<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <meta name="robots" content="noindex,nofollow">
  <meta name="theme-color" content="#f4eadc">

  <title>Our Story — Tyas & Faris</title>

  <link rel="icon" href="/favicon.svg">
  <link rel="stylesheet" href="/app.css">

  <script src="/app.js" defer></script>
</head>

<body class="elementor-page elementor-page-94">

  <main class="source-layout">


    <!-- =====================================================
         DESKTOP SIDE
         ===================================================== -->

    <section class="desktop-portrait" aria-hidden="true">
      <div>

        <p>
          Our Love Story
        </p>

        <h2>
          Tyas <i>&</i> Faris
        </h2>

        <span>
          26 · 09 · 2026
        </span>

      </div>
    </section>



    <div class="shell">


      <!-- =====================================================
           COVER
           ===================================================== -->

      <header id="cover">

        <div class="cover-shade"></div>

        <div class="cover-content">

          <div class="cover-heading">

            <p class="eyebrow">
              OUR LOVE STORY
            </p>

            <h1>
              Tyas <i>&</i> Faris
            </h1>

          </div>


          <div class="cover-details">

            <p class="date">
              26 · 09 · 2026
            </p>

            <p class="cover-message">
              Every love story is beautiful,<br>
              but this one is ours.
            </p>

            <button id="open" type="button">

              <svg
                class="cover-heart-icon"
                viewBox="0 0 24 24"
                aria-hidden="true"
                focusable="false"
              >
                <path
                  d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8L12 21l8.8-8.6a5.5 5.5 0 0 0 0-7.8Z"
                />
              </svg>

              Open Our Story

            </button>

          </div>

        </div>

      </header>



      <div id="story-content" tabindex="-1" hidden>

        <!-- =====================================================
             LOVE STORY OPENING
             ===================================================== -->

        <section class="story-opening">

          <div class="slideshow" aria-hidden="true">
            ${slideshow}
          </div>


          <div
            class="story-opening-copy"
            data-reveal
          >

            <img
              class="gunungan"
              src="/media/decor/gunungan.webp"
              alt=""
            >

            <p>
              How It All Began
            </p>

            <h2>
              Our<br>
              Love Story
            </h2>

            <span>
              Every story has a beginning.
            </span>

          </div>

        </section>



        <!-- =====================================================
             OUR JOURNEY
             ===================================================== -->

        <section class="story paper">

          <div class="story-inner">


            <div
              class="story-heading"
              data-reveal
            >

              <img
                class="gunungan"
                src="/media/decor/gunungan.webp"
                alt=""
              >

              <p class="script">
                From the very beginning
              </p>

              <h2>
                Our Journey
              </h2>

              <p>
                Sebuah perjalanan sederhana yang
                membawa kami sampai pada hari ini.
              </p>

            </div>


            <div class="timeline">
              ${story}
            </div>


          </div>

        </section>



        <!-- =====================================================
             THE TWO BEHIND THE STORY
             ===================================================== -->

        <section class="couple paper">

          <div class="couple-scroll">

            <img
              class="couple-scroll-motif couple-scroll-motif-top"
              src="/media/decor/motif-top.webp"
              alt=""
            >

            <img
              class="couple-scroll-motif couple-scroll-motif-bottom"
              src="/media/decor/motif-bottom.webp"
              alt=""
            >


            <!-- INTRO -->

            <div class="married-intro">

              <img
                class="gunungan"
                src="/media/decor/gunungan.webp"
                alt=""
                data-reveal
              >

              <h2 data-reveal>
                The Two Behind<br>
                The Story
              </h2>

              <p data-reveal>
                Every story has two sides.<br>
                This one belongs to us.
              </p>

            </div>



            <!-- =================================================
                 TYAS
                 ================================================= -->

            <article class="profile bride">

              <div
                class="portrait-frame"
                data-reveal
              ></div>


              <img
                class="couple-illustration"
                src="/media/decor/couple-2.webp"
                alt=""
                data-reveal
              >


              <h2 data-reveal>
                Tyas
              </h2>


              <p
                class="couple-name"
                data-reveal
              >
                ${e(c.bride)}
              </p>


              <p
                class="couple-family"
                data-reveal
              >
                ${e(c.brideFamily)}
              </p>


              <a
                class="instagram"
                href="${e(c.instagram.bride)}"
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram Tyas"
                data-reveal
              >

                ${instagramIcon}

                Instagram

              </a>

            </article>



            <span
              class="amp"
              data-reveal
            >
              &
            </span>



            <!-- =================================================
                 FARIS
                 ================================================= -->

            <article class="profile groom">

              <div
                class="portrait-frame"
                data-reveal
              ></div>


              <img
                class="couple-illustration"
                src="/media/decor/couple-4.webp"
                alt=""
                data-reveal
              >


              <h2 data-reveal>
                Faris
              </h2>


              <p
                class="couple-name"
                data-reveal
              >
                ${e(c.groom)}
              </p>


              <p
                class="couple-family"
                data-reveal
              >
                ${e(c.groomFamily)}
              </p>


              <a
                class="instagram"
                href="${e(c.instagram.groom)}"
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram Faris"
                data-reveal
              >

                ${instagramIcon}

                Instagram

              </a>

            </article>


          </div>

        </section>



        <!-- =====================================================
             OUR MEMORIES / GALLERY
             ===================================================== -->

        <section class="gallery-section">


          <div
            class="gallery-heading"
            data-reveal
          >

            <p class="script">
              Little pieces of us
            </p>

            <h2>
              Our Memories
            </h2>

          </div>



          <div
            class="gallery-layout"
            aria-label="Galeri perjalanan Tyas dan Faris"
          >


            <!-- COLLAGE -->

            <div class="gallery-collage">
              ${galleryPhotos.slice(0, 3).join('')}
            </div>



            <!-- CAROUSEL -->

            <div
              class="gallery-viewport"
              aria-label="Foto kenangan bergeser otomatis"
            >

              <div class="gallery">
                ${galleryPhotos.slice(3, -1).join('')}
              </div>

            </div>



            <!-- WIDE PHOTO -->

            <div class="gallery-wide">
              ${galleryPhotos.slice(-1).join('')}
            </div>


          </div>

        </section>



        <!-- =====================================================
             FOREVER BEGINS
             ===================================================== -->

        <section class="wedding-day paper">


          <div
            class="wedding-day-inner"
            data-reveal
          >


            <div
              class="wedding-day-backdrop"
              aria-hidden="true"
            ></div>


            <img
              class="gunungan"
              src="/media/decor/gunungan.webp"
              alt=""
            >


            <p class="script">
              And then...
            </p>


            <h2>
              Forever<br>
              Begins.
            </h2>



            <div class="wedding-date">

              <span>
                SEPTEMBER
              </span>

              <strong>
                26
              </strong>

              <span>
                2026
              </span>

            </div>



            <p class="wedding-day-copy">
              After all the moments,
              conversations, laughter,
              and memories that brought us here,
              today marks the beginning
              of our forever.
            </p>


          </div>

        </section>



        <!-- =====================================================
             PART OF OUR STORY
             ===================================================== -->

        <section class="thank-you">


          <div
            class="thank-you-content"
            data-reveal
          >


            <p class="script">
              And here you are...
            </p>


            <h2>
              Part of<br>
              Our Story.
            </h2>


            <p>
              Terima kasih telah hadir di hari
              yang begitu berarti bagi kami.
            </p>


            <p>
              Kehadiran dan doa kalian menjadi
              bagian indah dari perjalanan
              yang akan selalu kami kenang.
            </p>


          </div>

        </section>



        <!-- =====================================================
             ENDING
             ===================================================== -->

        <footer>


          <img
            class="footer-gunungan"
            src="/media/decor/gunungan.webp"
            alt=""
          >


          <p>
            The beginning of forever
          </p>


          <h2>
            Tyas <i>&</i> Faris
          </h2>


          <span>
            26 · 09 · 2026
          </span>


          <p>
            To be continued...
          </p>


        </footer>


      </div>

    </div>

  </main>



  <!-- =========================================================
       MUSIC
       ========================================================= -->

  <p
    id="status"
    role="status"
    aria-live="polite"
  ></p>


  <audio
    id="music"
    src="${e(c.music)}"
    loop
    preload="auto"
  ></audio>


  <button
    id="music-toggle"
    type="button"
    hidden
    aria-label="Jeda musik"
  >
    <svg
      class="music-icon"
      viewBox="0 0 24 24"
      aria-hidden="true"
      focusable="false"
    >
      <path d="M9 18V5l10-2v13" />
      <circle cx="7" cy="18" r="3" />
      <circle cx="17" cy="16" r="3" />
    </svg>
  </button>



  <!-- =========================================================
       GALLERY LIGHTBOX
       ========================================================= -->

  <dialog
    id="lightbox"
    aria-label="Galeri kenangan"
  >


    <button
      id="close-lightbox"
      type="button"
      aria-label="Tutup"
    >
      ×
    </button>


    <button
      id="prev-photo"
      type="button"
      aria-label="Foto sebelumnya"
    >
      ‹
    </button>


    <img
      alt="Foto diperbesar"
    >


    <button
      id="next-photo"
      type="button"
      aria-label="Foto berikutnya"
    >
      ›
    </button>


  </dialog>


</body>
</html>`;
}