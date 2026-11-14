const banner = document.querySelector('.banner');
const slides = [...banner.querySelectorAll('.banner-slide')];
const controls = banner.querySelector('.banner-controls');
const toggle = controls.querySelector('.banner-toggle');
const count = controls.querySelector('.banner-count');
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
let current = 0;
let playing = !reducedMotion.matches;
let timer;

function loadPhoto(index) {
  const photo = slides[index].querySelector('img');
  if (photo.dataset.src) {
    photo.src = photo.dataset.src;
    delete photo.dataset.src;
  }
}

function show(step) {
  const previous = slides[current];
  current = (current + step + slides.length) % slides.length;
  loadPhoto(current);
  previous.classList.remove('is-current');
  previous.inert = true;
  previous.setAttribute('aria-hidden', 'true');
  const active = slides[current];
  active.classList.add('is-current');
  active.inert = false;
  active.removeAttribute('aria-hidden');
  count.textContent = (current + 1) + ' / ' + slides.length;
  loadPhoto((current + 1) % slides.length);
}

function schedule() {
  window.clearInterval(timer);
  toggle.textContent = playing ? 'Pause' : 'Play';
  if (playing && !document.hidden && !banner.querySelector('.banner-copy:focus-within')) {
    timer = window.setInterval(() => show(1), 6500);
  }
}
for (const button of controls.querySelectorAll('[data-step]')) {
  button.addEventListener('click', () => { show(Number(button.dataset.step)); schedule(); });
}
toggle.addEventListener('click', () => { playing = !playing; schedule(); });
banner.addEventListener('focusin', schedule);
banner.addEventListener('focusout', () => window.setTimeout(schedule, 0));
reducedMotion.addEventListener('change', (event) => { playing = !event.matches; schedule(); });
document.addEventListener('visibilitychange', schedule);
controls.hidden = false;
schedule();
