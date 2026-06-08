const MONTHS_PL = [
  'Styczeń','Luty','Marzec','Kwiecień','Maj','Czerwiec',
  'Lipiec','Sierpień','Wrzesień','Październik','Listopad','Grudzień'
];
const DAYS_PL = [
  'niedziela','poniedziałek','wtorek','środa',
  'czwartek','piątek','sobota'
];

let viewYear, viewMonth;
let selectedDate   = null;
let selectedMinutes = null;
let stack          = [];
let aggregateLevel = 0;

const today = new Date();

function init() {
  viewYear  = today.getFullYear();
  viewMonth = today.getMonth();
  renderCalendar();
  renderTimeSlots();
  document.getElementById('prevMonth').addEventListener('click', () => shiftMonth(-1));
  document.getElementById('nextMonth').addEventListener('click', () => shiftMonth(1));
  document.getElementById('durationSelect').addEventListener('change', updateResult);
  document.getElementById('copyBtn').addEventListener('click', copyResult);
  document.getElementById('addBtn').addEventListener('click', addToStack);
  document.getElementById('aggregateBtn').addEventListener('click', aggregate);
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
      selectedDate.day   === d &&
      selectedDate.month === viewMonth &&
      selectedDate.year  === viewYear;
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
        slot.style.paddingTop    = '3px';
        slot.style.paddingBottom = '3px';
        hourSpan.style.fontWeight  = '400';
        hourSpan.style.fontSize    = '0.78rem';
        hourSpan.style.color       = '#6b7280';
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
  const addBtn   = document.getElementById('addBtn');

  if (!selectedDate || selectedMinutes === null) {
    resultEl.innerHTML = '<span class="result-placeholder">Wybierz datę i godzinę…</span>';
    addBtn.disabled = true;
    updateCopyBtn();
    return;
  }

  const { year, month, day } = selectedDate;
  const dow      = new Date(year, month, day).getDay();
  const dayName  = DAYS_PL[dow];
  const duration = parseInt(document.getElementById('durationSelect').value, 10);
  const startStr = minsToTime(selectedMinutes);
  const endStr   = minsToTime(selectedMinutes + duration);
  const dateStr  = pad(day) + '.' + pad(month + 1) + '.' + year;

  resultEl.textContent = `${dateStr} (${dayName}) ${startStr}-${endStr}`;
  addBtn.disabled = stack.length >= 10;
  updateCopyBtn();
}

function updateCopyBtn() {
  const copyBtn = document.getElementById('copyBtn');
  copyBtn.disabled = !(stack.length > 0 || (selectedDate && selectedMinutes !== null));
}

/* ── STACK ── */

function addToStack() {
  if (!selectedDate || selectedMinutes === null || stack.length >= 10) return;

  const { year, month, day } = selectedDate;
  const dow      = new Date(year, month, day).getDay();
  const duration = parseInt(document.getElementById('durationSelect').value, 10);

  stack.push({
    year, month, day,
    dateStr:      pad(day) + '.' + pad(month + 1) + '.' + year,
    dayName:      DAYS_PL[dow],
    startMinutes: selectedMinutes,
    startStr:     minsToTime(selectedMinutes),
    endStr:       minsToTime(selectedMinutes + duration)
  });

  stack.sort((a, b) => {
    const dd = new Date(a.year, a.month, a.day) - new Date(b.year, b.month, b.day);
    return dd !== 0 ? dd : a.startMinutes - b.startMinutes;
  });

  aggregateLevel = 0;
  renderStackSection();
  document.getElementById('addBtn').disabled = stack.length >= 10;
  updateCopyBtn();
}

function removeFromStack(idx) {
  stack.splice(idx, 1);
  if (stack.length === 0) aggregateLevel = 0;
  renderStackSection();
  if (selectedDate && selectedMinutes !== null)
    document.getElementById('addBtn').disabled = false;
  updateCopyBtn();
}

function getAggregatedText() {
  if (stack.length === 0) return '';

  switch (aggregateLevel) {
    case 0:
      return stack.map(it =>
        `${it.dateStr} (${it.dayName}) ${it.startStr}-${it.endStr}`
      ).join(', ');

    case 1:
      return stack.map(it =>
        `${it.dateStr} ${it.startStr}-${it.endStr}`
      ).join(', ');

    case 2: {
      const parts = [];
      let lastDate = null;
      for (const it of stack) {
        parts.push(it.dateStr !== lastDate
          ? `${it.dateStr} ${it.startStr}-${it.endStr}`
          : `${it.startStr}-${it.endStr}`);
        lastDate = it.dateStr;
      }
      return parts.join(', ');
    }

    case 3:
      return [...new Set(stack.map(it => it.dateStr))].join(', ');
  }
  return '';
}

function renderStackSection() {
  const section = document.getElementById('stackSection');
  const list    = document.getElementById('stackList');
  const output  = document.getElementById('stackOutput');

  if (stack.length === 0) {
    section.style.display = 'none';
    return;
  }

  section.style.display = 'flex';

  list.innerHTML = '';
  stack.forEach((it, i) => {
    const el   = document.createElement('div');
    el.className = 'stack-item';
    const span = document.createElement('span');
    span.textContent = `${it.dateStr} (${it.dayName}) ${it.startStr}-${it.endStr}`;
    const btn  = document.createElement('button');
    btn.className   = 'stack-remove';
    btn.textContent = '×';
    btn.addEventListener('click', () => removeFromStack(i));
    el.appendChild(span);
    el.appendChild(btn);
    list.appendChild(el);
  });

  output.textContent = getAggregatedText();
}

function aggregate() {
  if (stack.length === 0) return;
  aggregateLevel = (aggregateLevel + 1) % 4;
  renderStackSection();
}

/* ── COPY ── */

function copyResult() {
  const btn  = document.getElementById('copyBtn');
  const text = stack.length > 0
    ? document.getElementById('stackOutput').textContent
    : document.getElementById('resultText').textContent;

  const html = `<font size="4">${text}</font>`;
  const item = new ClipboardItem({
    'text/html':  new Blob([html],  { type: 'text/html' }),
    'text/plain': new Blob([text], { type: 'text/plain' }),
  });
  navigator.clipboard.write([item]).then(() => {
    btn.textContent = 'Skopiowano!';
    btn.classList.add('copied');
    setTimeout(() => {
      btn.textContent = 'Kopiuj';
      btn.classList.remove('copied');
    }, 2000);
  });
}

/* ── UTILS ── */

function minsToTime(m) {
  return pad(Math.floor(m / 60) % 24) + ':' + pad(m % 60);
}

function pad(n) { return String(n).padStart(2, '0'); }

init();
