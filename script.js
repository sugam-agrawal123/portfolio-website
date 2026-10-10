// Tell CSS that JavaScript works, so the reveal animation only hides things when it can also show them.
document.documentElement.classList.add('js');
const root = document.documentElement;

// ---------- 1. Theme toggle (remembers choice) ----------
try { const saved = localStorage.getItem('theme'); if (saved) root.dataset.theme = saved; } catch (e) {}
document.getElementById('themeBtn').addEventListener('click', () => {
  const current = root.dataset.theme || (matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
  const next = current === 'dark' ? 'light' : 'dark';
  root.dataset.theme = next;
  try { localStorage.setItem('theme', next); } catch (e) {}
});

// ---------- 2. Scroll reveal ----------
const reveals = document.querySelectorAll('.reveal');
if ('IntersectionObserver' in window) {
  const io = new IntersectionObserver((entries) => {
    entries.forEach(en => { if (en.isIntersecting) { en.target.classList.add('show'); io.unobserve(en.target); } });
  }, { threshold: 0.1 });
  reveals.forEach(el => io.observe(el));
} else {
  reveals.forEach(el => el.classList.add('show'));
}

// ---------- 3. Highlight the nav link of the section on screen ----------
const links = document.querySelectorAll('.links a');
const spy = new IntersectionObserver((entries) => {
  entries.forEach(en => {
    if (en.isIntersecting) {
      links.forEach(l => l.classList.toggle('active', l.getAttribute('href') === '#' + en.target.id));
    }
  });
}, { rootMargin: '-40% 0px -55% 0px' });
document.querySelectorAll('main section[id]').forEach(s => spy.observe(s));

// ---------- 4. Copy email button ----------
document.getElementById('copyBtn').addEventListener('click', async (e) => {
  try { await navigator.clipboard.writeText('sgsugam.agr@gmail.com'); e.target.textContent = 'Copied ✓'; }
  catch (err) { e.target.textContent = 'sgsugam.agr@gmail.com'; }
  setTimeout(() => { e.target.textContent = 'Copy Email'; }, 2000);
});

// ---------- 5. Footer year ----------
document.getElementById('year').textContent = new Date().getFullYear();
