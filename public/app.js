const $ = selector => document.querySelector(selector);
const $$ = selector => [...document.querySelectorAll(selector)];

const status = text => {
  const node = $('#status');

  if (node) {
    node.textContent = text;
  }
};

const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;


/* =========================================================
   MUSIC
   ========================================================= */

const music = $('#music');
const musicButton = $('#music-toggle');

let opened = false;
let userPaused = false;
let visibilityPaused = false;
// The local MP3 already starts at the original track's three-second offset.

function syncMusicButton() {
  if (!music || !musicButton) {
    return;
  }

  const playing = !music.paused;

  musicButton.classList.toggle('paused', !playing);
  musicButton.setAttribute(
    'aria-label',
    playing ? 'Jeda musik' : 'Putar musik',
  );
  musicButton.setAttribute('aria-pressed', String(playing));
}


async function startMusic(retry = true) {
  if (!music) {
    return false;
  }

  try {
    music.muted = false;
    music.volume = 1;
    await music.play();
    status('');
    syncMusicButton();

    return true;
  } catch (error) {
    // A metadata seek can interrupt an in-flight play request.
    if (error.name === 'AbortError' && retry && opened && !userPaused && !document.hidden) {
      return startMusic(false);
    }
    syncMusicButton();
    status('Tekan tombol musik untuk memutar lagu.');

    return false;
  }
}


/* =========================================================
   OPEN LOVE STORY
   ========================================================= */

const openButton = $('#open');
const cover = $('#cover');
const storyContent = $('#story-content');
const motion = $('#motion');

openButton?.addEventListener('click', async () => {
  if (opened) return;
  openButton.disabled = true;
  opened = true;
  userPaused = false;
  visibilityPaused = false;

  cover?.classList.add('opening');

  // Start playback directly in the click; the initial seek is prepared by metadata.

  if (musicButton) {
    musicButton.hidden = false;
  }

  void startMusic();

  setTimeout(
    () => {
      if (cover) {
        cover.hidden = true;
      }

      if (storyContent) {
        storyContent.hidden = false;
      }

      storyContent?.focus({preventScroll: true});
      if (!reduced) motion?.play().catch(() => {});
      startGallery();

      /*
       * Baru observe elemen setelah halaman utama ditampilkan.
       */
      observeReveals();
    },
    reduced ? 0 : 700,
  );
});


/* =========================================================
   MUSIC BUTTON
   ========================================================= */

musicButton?.addEventListener('click', async () => {
  if (!music) {
    return;
  }

  if (music.paused) {
    userPaused = false;
    visibilityPaused = false;

    await startMusic();

    return;
  }

  userPaused = true;
  visibilityPaused = false;

  music.pause();
  syncMusicButton();
});


music?.addEventListener('play', syncMusicButton);
music?.addEventListener('pause', syncMusicButton);


/* =========================================================
   PAGE VISIBILITY
   ========================================================= */

document.addEventListener('visibilitychange', async () => {
  if (!music) {
    return;
  }

  /*
   * User pindah tab / minimize browser:
   * pause otomatis apabila sebelumnya musik sedang berjalan.
   */
  if (document.hidden) {
    visibilityPaused =
      opened &&
      !userPaused &&
      !music.paused;

    if (visibilityPaused) {
      music.pause();
    }

    return;
  }

  /*
   * User kembali ke halaman:
   * lanjutkan hanya apabila pause sebelumnya dilakukan otomatis.
   */
  if (
    opened &&
    visibilityPaused &&
    !userPaused
  ) {
    visibilityPaused = false;

    await startMusic();
  }
});


window.addEventListener('pagehide', () => {
  if (music && !music.paused) {
    music.pause();
  }
});


/* =========================================================
   REVEAL ANIMATION
   ========================================================= */

const sourceAnimations = {
  default: {
    name: 'zoom-in-up',
    delay: 0,
    duration: 1000,
    threshold: .15,
  },

  zoomIn: {
    name: 'zoomIn',
    delay: 800,
    duration: 2000,
    threshold: .15,
  },
};


let stopReveals;


function observeReveals() {
  const nodes = $$('[data-reveal]');

  /*
   * Setup animation properties.
   */
  nodes.forEach(node => {
    const requested =
      node.dataset.reveal ||
      sourceAnimations.default.name;

    const preset =
      sourceAnimations[requested] ||
      sourceAnimations.default;

    const delay = Number(
      node.dataset.revealDelay ??
      preset.delay,
    );

    const duration = Number(
      node.dataset.revealDuration ??
      preset.duration,
    );

    node.dataset.reveal = preset.name;

    node.style.setProperty(
      '--reveal-delay',
      `${delay}ms`,
    );

    node.style.setProperty(
      '--reveal-duration',
      `${duration}ms`,
    );
  });


  /*
   * Accessibility:
   * kalau reduced motion aktif, langsung tampilkan semuanya.
   */
  if (
    reduced
  ) {
    nodes.forEach(node => {
      node.classList.add('revealed');
    });

    return;
  }


  stopReveals?.();
  let previousY = window.scrollY;
  let frame = 0;

  function updateReveals(initial = false) {
    frame = 0;
    const currentY = window.scrollY;
    const scrollingDown = currentY > previousY;
    const viewportBottom = currentY + window.innerHeight;
    const triggerLine = currentY + window.innerHeight * .85;

    // offsetTop/offsetHeight use layout geometry, unaffected by reveal transforms.
    nodes.forEach(node => {
      let top = 0;
      for (let parent = node; parent; parent = parent.offsetParent) {
        top += parent.offsetTop;
      }
      const bottom = top + node.offsetHeight;
      if (top >= viewportBottom) {
        // Rearm below the screen, ready for the next downward pass.
        node.classList.add('reveal-immediate');
        node.classList.remove('revealed');
      } else if (bottom > currentY && top < triggerLine) {
        if (initial || scrollingDown) {
          // Commit the reset before restoring the normal transition.
          if (!node.classList.contains('revealed')) {
            void node.offsetWidth;
            node.classList.remove('reveal-immediate');
            node.classList.add('revealed');
          }
        } else {
          // Upward entry stays readable without replaying the animation.
          node.classList.add('reveal-immediate', 'revealed');
        }
      }
    });
    previousY = currentY;
  }

  function scheduleReveals() {
    if (!frame) frame = requestAnimationFrame(() => updateReveals());
  }

  window.addEventListener('scroll', scheduleReveals, {passive: true});
  window.addEventListener('resize', scheduleReveals);
  stopReveals = () => {
    cancelAnimationFrame(frame);
    window.removeEventListener('scroll', scheduleReveals);
    window.removeEventListener('resize', scheduleReveals);
  };
  updateReveals(true);
}


/* =========================================================
   GALLERY AUTO SLIDE
   ========================================================= */

const gallery = $('.gallery');
const galleryViewport = $('.gallery-viewport');
const galleryInterval = 1000;
const galleryTransition = 700;

let galleryTimer;
let galleryMoving = false;
let galleryHovered = false;
let galleryTouching = false;
let swipeStart;
let suppressPhotoClick = false;
let galleryFallback;

function getGallerySlides() {
  return gallery ? [...gallery.querySelectorAll('.photo')] : [];
}

function galleryStep() {
  const slide = gallery?.querySelector('.photo');
  return slide ? slide.getBoundingClientRect().width + (parseFloat(getComputedStyle(gallery).gap) || 0) : 0;
}

function finishGalleryMove() {
  if (!galleryMoving) return;
  clearTimeout(galleryFallback);
  gallery.style.transition = 'none';
  gallery.append(gallery.firstElementChild);
  gallery.style.transform = 'translateX(0)';
  void gallery.offsetWidth;
  gallery.style.transition = '';
  galleryMoving = false;
}

function moveGallery(backward = false) {
  if (!gallery || galleryMoving || getGallerySlides().length < 2) return;
  const step = galleryStep();
  if (!step) return;
  if (backward) {
    gallery.style.transition = 'none';
    gallery.prepend(gallery.lastElementChild);
    gallery.style.transform = `translateX(-${step}px)`;
    void gallery.offsetWidth;
    gallery.style.transition = '';
    gallery.style.transform = 'translateX(0)';
    return;
  }
  galleryMoving = true;
  gallery.style.transform = `translateX(-${step}px)`;
  galleryFallback = setTimeout(finishGalleryMove, reduced ? 0 : galleryTransition + 100);
}

gallery?.addEventListener('transitionend', event => {
  if (event.target === gallery && event.propertyName === 'transform') finishGalleryMove();
});

function stopGallery() {
  clearInterval(galleryTimer);
  galleryTimer = null;
}

function startGallery() {
  stopGallery();
  if (!opened || document.hidden || dialog?.open || reduced || !gallery ||
      galleryHovered || galleryTouching || galleryViewport?.contains(document.activeElement)) return;
  galleryTimer = setInterval(() => moveGallery(), galleryInterval);
}

galleryViewport?.addEventListener('pointerenter', event => {
  if (event.pointerType === 'mouse') { galleryHovered = true; stopGallery(); }
});
galleryViewport?.addEventListener('pointerleave', () => {
  galleryHovered = false;
  startGallery();
});
galleryViewport?.addEventListener('pointerdown', event => {
  galleryTouching = true;
  swipeStart = event.clientX;
  stopGallery();
});
window.addEventListener('pointerup', event => {
  if (!galleryTouching) return;
  const delta = event.clientX - swipeStart;
  if (Math.abs(delta) > 30) {
    suppressPhotoClick = true;
    moveGallery(delta > 0);
    setTimeout(() => { suppressPhotoClick = false; }, 0);
  }
  galleryTouching = false;
  startGallery();
});
window.addEventListener('pointercancel', () => {
  galleryTouching = false;
  startGallery();
});
window.addEventListener('resize', finishGalleryMove);

/* =========================================================
   GALLERY LIGHTBOX
   ========================================================= */

const photoButtons = $$('.photo');

const photos = photoButtons
  .map(button => button.querySelector('img'))
  .filter(Boolean);

const dialog = $('#lightbox');
const dialogImage = dialog?.querySelector('img');

const closeLightbox = $('#close-lightbox');
const prevPhoto = $('#prev-photo');
const nextPhoto = $('#next-photo');

let activePhoto = 0;


function showPhoto(index) {
  if (
    !dialog ||
    !dialogImage ||
    !photos.length
  ) {
    return;
  }

  activePhoto =
    (index + photos.length) %
    photos.length;

  const source = photos[activePhoto];

  /*
   * currentSrc berguna apabila nanti menggunakan srcset.
   */
  dialogImage.src =
    source.currentSrc ||
    source.src;

  dialogImage.alt =
    source.alt ||
    `Foto Tyas dan Faris ${activePhoto + 1}`;
}


photoButtons.forEach(button => {
  button.addEventListener('click', () => {
    if (suppressPhotoClick) return;
    if (!dialog) {
      return;
    }

    showPhoto(
      Number(button.dataset.index) || 0,
    );

    stopGallery();

    dialog.showModal();
  });
});


closeLightbox?.addEventListener(
  'click',
  () => {
    dialog?.close();
  },
);


prevPhoto?.addEventListener(
  'click',
  () => {
    showPhoto(activePhoto - 1);
  },
);


nextPhoto?.addEventListener(
  'click',
  () => {
    showPhoto(activePhoto + 1);
  },
);


dialog?.addEventListener('click', event => {
  /*
   * Klik area backdrop dialog.
   */
  if (event.target === dialog) {
    dialog.close();
  }
});


dialog?.addEventListener('close', () => {
  startGallery();
});


/* =========================================================
   LIGHTBOX KEYBOARD
   ========================================================= */

document.addEventListener('keydown', event => {
  if (
    !dialog ||
    !dialog.open
  ) {
    return;
  }

  if (event.key === 'ArrowLeft') {
    showPhoto(activePhoto - 1);
  }

  if (event.key === 'ArrowRight') {
    showPhoto(activePhoto + 1);
  }
});
document.addEventListener('visibilitychange', () => {
  if (document.hidden) { stopGallery(); motion?.pause(); }
  else if (opened) { startGallery(); if (!reduced) motion?.play().catch(() => {}); }
});
galleryViewport?.addEventListener('focusin', stopGallery);
galleryViewport?.addEventListener('focusout', startGallery);
