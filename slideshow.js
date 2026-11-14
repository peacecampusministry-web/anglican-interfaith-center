const slideshow = document.querySelector('.slideshow');
const slides = [...slideshow.querySelectorAll('.slide-frame img')];
const controls = slideshow.querySelector('.slide-controls');
const counter = slideshow.querySelector('.slide-count');
const toggle = slideshow.querySelector('.slide-toggle');
const motion = window.matchMedia('(prefers-reduced-motion: reduce)');

let current = 0;
let playing = !motion.matches;
let timer;

function showPhoto(step) {
  slides[current].hidden = true;
  current = (current + step + slides.length) % slides.length;
  const photo = slides[current];
  if (!photo.src) photo.src = photo.dataset.src;
  photo.hidden = false;
  counter.textContent = (current + 1) + ' / ' + slides.length;
}

function schedule() {
  window.clearInterval(timer);
  toggle.textContent = playing ? 'Pause' : 'Play';
  if (playing && !document.hidden) {
    timer = window.setInterval(() => showPhoto(1), 5000);
  }
}

controls.querySelectorAll('[data-step]').forEach((button) => {
  button.addEventListener('click', () => {
    showPhoto(Number(button.dataset.step));
    schedule();
  });
});
toggle.addEventListener('click', () => {
  playing = !playing;
  schedule();
});
motion.addEventListener('change', (event) => {
  playing = !event.matches;
  schedule();
});
document.addEventListener('visibilitychange', schedule);
controls.hidden = false;
schedule();
