const MONTHS_PL = [
  'Styczeń','Luty','Marzec','Kwiecień','Maj','Czerwiec',
  'Lipiec','Sierpień','Wrzesień','Październik','Listopad','Grudzień'
];
const DAYS_PL = [
  'niedziela','poniedziałek','wtorek','środa',
  'czwartek','piątek','sobota'
];

let viewYear, viewMonth;
let selectedDate = null;
let selectedMinutes = null;

const today = new Date();

function init() {
  viewYear = today.getFullYear();
  viewMonth = today.getMonth();
  renderCalendar();
  renderTimeSlots();
  document.getElementById('prevMonth').addEventListener('click', () => shiftMonth(-1));
  document.getElementById('nextMonth').addEventListener('click', () => shiftMonth(1));
  document.getElementById('durationSelect').addEventListener('change', updateResult);
  document.getElementById('copyBtn').addEventListener('click', copyResult);
}

function shiftMonth(delta) {
  viewMonth += delta;
  if (viewMonth < 0)  { viewMonth = 11; viewYear--; }
  if (viewMonth > 11) { viewMonth = 0;  viewYear++; }
  renderCalendar();
}

function renderCalendar() {
  document.getElementById('monthLabel').textContent =
    `${MONTHS_PL[viewMonth]} ${viewYear}`;

  const grid = document.getElementById('calGrid');
  grid.innerHTML = '';

  const firstDay    = new Date(viewYear, viewMonth, 1).getDay();
  const startOffset = (firstDay + 6) % 7;
  const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();
  const daysInPrev  = new Date(viewYear, viewMonth, 0).getDate();

  for (let i = startOffset - 1; i >= 0; i--)
    grid.appendChild(makeCell(daysInPrev - i, true));

  for (let d = 1; d <= daysInMonth; d++) {
    const isToday =
      d === today.getDate() &&
      viewMonth === today.getMonth() &&
      viewYear === today.getFullYear();
    const isSel =
      selectedDate &&
      selectedDate.day === d &&
      selectedDate.month === viewMonth &&
      selectedDate.year === viewYear;
    const cell = makeCell(d, false, isToday, isSel);
    cell.addEventListener('click', () => selectDay(d));
    grid.appendChild(cell);
  }

  const total  = startOffset + daysInMonth;
  const remain = total % 7 === 0 ? 0 : 7 - (total % 7);
  for (let d = 1; d <= remain; d++)
    grid.appendChild(makeCell(d, true));
}

function makeCell(day, otherMonth, isToday = false, isSel = false) {
  const el = document.createElement('div');
  el.className = 'day-cell';
  if (otherMonth) el.classList.add('other-month');
  if (isToday)    el.classList.add('today');
  if (isSel)      el.classList.add('selected');
  el.textContent = day;
  return el;
}

function selectDay(d) {
  selectedDate = { year: viewYear, month: viewMonth, day: d };
  renderCalendar();
  updateResult();
}

function renderTimeSlots() {
  const container = document.getElementById('timeScroll');
  container.innerHTML = '';
  for (let h = 6; h <= 22; h++) {
    for (let m = 0; m < 60; m += 15) {
      const minutes = h * 60 + m;
      const slot = document.createElement('div');
      slot.className = 'time-slot';
      slot.dataset.minutes = minutes;

      const hourSpan = document.createElement('span');
      hourSpan.className = 'hour-label';
      hourSpan.textContent = pad(h) + ':' + pad(m);
      slot.appendChild(hourSpan);

      if (m !== 0) {
        slot.style.paddingTop = '3px';
        slot.style.paddingBottom = '3px';
        hourSpan.style.fontWeight = '400';
        hourSpan.style.fontSize = '0.78rem';
        hourSpan.style.color = '#6b7280';
      }

      slot.addEventListener('click', () => selectTime(minutes, slot));
      container.appendChild(slot);
    }
  }
}

function selectTime(minutes, el) {
  selectedMinutes = minutes;
  document.querySelectorAll('.time-slot').forEach(s => s.classList.remove('selected'));
  el.classList.add('selected');
  el.scrollIntoView({ block: 'nearest' });
  updateResult();
}

function updateResult() {
  const resultEl = document.getElementById('resultText');
  const copyBtn  = document.getElementById('copyBtn');

  if (!selectedDate || selectedMinutes === null) {
    resultEl.innerHTML = '<span class="result-placeholder">Wybierz datę i godzinę…</span>';
    copyBtn.disabled = true;
    return;
  }

  const { year, month, day } = selectedDate;
  const dow     = new Date(year, month, day).getDay();
  const dayName = DAYS_PL[dow];

  const duration   = parseInt(document.getElementById('durationSelect').value, 10);
  const endMinutes = selectedMinutes + duration;

  const startStr = minsToTime(selectedMinutes);
  const endStr   = minsToTime(endMinutes);
  const dateStr  = pad(day) + '.' + pad(month + 1) + '.' + year;
  const result   = `${dateStr} (${dayName}) ${startStr}-${endStr}`;

  resultEl.textContent = result;
  copyBtn.disabled = false;
  copyBtn.textContent = 'Kopiuj';
  copyBtn.classList.remove('copied');
}

function copyResult() {
  const text = document.getElementById('resultText').textContent;
  const html = `<font size="4">${text}</font>`;
  const item = new ClipboardItem({
    'text/html':  new Blob([html],  { type: 'text/html' }),
    'text/plain': new Blob([text], { type: 'text/plain' }),
  });
  navigator.clipboard.write([item]).then(() => {
    const btn = document.getElementById('copyBtn');
    btn.textContent = 'Skopiowano!';
    btn.classList.add('copied');
    setTimeout(() => {
      btn.textContent = 'Kopiuj';
      btn.classList.remove('copied');
    }, 2000);
  });
}

function minsToTime(m) {
  const h = Math.floor(m / 60) % 24;
  const min = m % 60;
  return pad(h) + ':' + pad(min);
}

function pad(n) { return String(n).padStart(2, '0'); }

init();
