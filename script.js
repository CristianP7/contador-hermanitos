// Birth date of Sarabi, Kenobi & Juanin
const BIRTH_DATE = new Date('2026-01-16T00:00:00');

// DOM references
const els = {
  years:     document.getElementById('years'),
  months:    document.getElementById('months'),
  days:      document.getElementById('days'),
  hours:     document.getElementById('hours'),
  minutes:   document.getElementById('minutes'),
  seconds:   document.getElementById('seconds'),
  // Mobile duplicates
  hoursM:    document.getElementById('hours-m'),
  minutesM:  document.getElementById('minutes-m'),
  secondsM:  document.getElementById('seconds-m'),
};

// Previous values to detect changes (for flip animation)
const prev = {};

/**
 * Calculates elapsed time since birth.
 * Returns { years, months, days, hours, minutes, seconds }
 */
function calcElapsed() {
  const now = new Date();
  let years  = now.getFullYear() - BIRTH_DATE.getFullYear();
  let months = now.getMonth()    - BIRTH_DATE.getMonth();
  let days   = now.getDate()     - BIRTH_DATE.getDate();
  let hours  = now.getHours()    - BIRTH_DATE.getHours();
  let mins   = now.getMinutes()  - BIRTH_DATE.getMinutes();
  let secs   = now.getSeconds()  - BIRTH_DATE.getSeconds();

  // Cascade borrows
  if (secs < 0)  { secs  += 60; mins--; }
  if (mins < 0)  { mins  += 60; hours--; }
  if (hours < 0) { hours += 24; days--; }
  if (days < 0) {
    // Days in previous month
    const prevMonth = new Date(now.getFullYear(), now.getMonth(), 0);
    days  += prevMonth.getDate();
    months--;
  }
  if (months < 0) { months += 12; years--; }

  return { years, months, days, hours, minutes: mins, seconds: secs };
}

/**
 * Pads a number to at least 2 digits.
 */
const pad = n => String(n).padStart(2, '0');

/**
 * Updates a single digit element, triggering animation if the value changed.
 */
function updateEl(el, value) {
  const str = pad(value);
  if (el.textContent === str) return;

  // Flip animation
  el.classList.add('flip');
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      el.textContent = str;
      el.classList.remove('flip');
    });
  });
}

/**
 * Main tick — runs every second.
 */
function tick() {
  const t = calcElapsed();

  updateEl(els.years,   t.years);
  updateEl(els.months,  t.months);
  updateEl(els.days,    t.days);
  updateEl(els.hours,   t.hours);
  updateEl(els.minutes, t.minutes);
  updateEl(els.seconds, t.seconds);

  // Mobile mirrors
  updateEl(els.hoursM,   t.hours);
  updateEl(els.minutesM, t.minutes);
  updateEl(els.secondsM, t.seconds);
}

// Initialize immediately, then every second
tick();
setInterval(tick, 1000);
