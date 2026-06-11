const LANG = {
  pl: {
    timePickerLabel: 'Godzina rozpoczęcia',
    durationLabel:   'Czas trwania:',
    placeholder:     'Wybierz datę i godzinę…',
    addBtn:          '+ Dodaj',
    aggregateBtn:    'Agreguj',
    copyBtn:         'Kopiuj',
    copiedBtn:       'Skopiowano!',
    minUnit:         'min',
    titleStrike:     'Przekreślenie',
  },
  en: {
    timePickerLabel: 'Start time',
    durationLabel:   'Duration:',
    placeholder:     'Select date and time…',
    addBtn:          '+ Add',
    aggregateBtn:    'Aggregate',
    copyBtn:         'Copy',
    copiedBtn:       'Copied!',
    minUnit:         'min',
    titleStrike:     'Strike-through',
  },
  de: {
    timePickerLabel: 'Startzeit',
    durationLabel:   'Dauer:',
    placeholder:     'Datum und Uhrzeit wählen…',
    addBtn:          '+ Hinzufügen',
    aggregateBtn:    'Zusammenfassen',
    copyBtn:         'Kopieren',
    copiedBtn:       'Kopiert!',
    minUnit:         'Min.',
    titleStrike:     'Durchgestrichen',
  },
  fr: {
    timePickerLabel: 'Heure de début',
    durationLabel:   'Durée :',
    placeholder:     'Sélectionnez date et heure…',
    addBtn:          '+ Ajouter',
    aggregateBtn:    'Agréger',
    copyBtn:         'Copier',
    copiedBtn:       'Copié !',
    minUnit:         'min',
    titleStrike:     'Barré',
  },
};

let langCode, locale, t;

let viewYear, viewMonth;
let selectedDate    = null;
let selectedMinutes = null;
let currentFormat   = 'h2';
let strikethrough   = false;
let stack           = [];
let aggregateLevel  = 0;

const today = new Date();

function init() {
  viewYear  = today.getFullYear();
  viewMonth = today.getMonth();
  applyLang();
  renderCalendar();
  renderTimeSlots();
  document.getElementById('prevMonth').addEventListener('click', () => shiftMonth(-1));
  document.getElementById('nextMonth').addEventListener('click', () => shiftMonth(1));
  document.getElementById('durationSelect').addEventListener('change', updateResult);
  document.getElementById('copyBtn').addEventListener('click', copyResult);
  document.getElementById('addBtn').addEventListener('click', addToStack);
  document.getElementById('aggregateBtn').addEventListener('click', aggregate);
  document.querySelectorAll('.fmt-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      currentFormat = btn.dataset.fmt;
      document.querySelectorAll('.fmt-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      updateResult();
      if (stack.length > 0) applyPreviewFormat(document.getElementById('stackOutput'));
    });
  });
  document.getElementById('strikeBtn').addEventListener('click', () => {
    strikethrough = !strikethrough;
    document.getElementById('strikeBtn').classList.toggle('active', strikethrough);
    updateResult();
    if (stack.length > 0) applyPreviewFormat(document.getElementById('stackOutput'));
  });
}

function applyLang() {
  document.getElementById('timePickerLabel').textContent = t.timePickerLabel;
  document.getElementById('durationLabel').textContent   = t.durationLabel;
  document.getElementById('addBtn').textContent          = t.addBtn;
  document.getElementById('aggregateBtn').textContent    = t.aggregateBtn;
  document.getElementById('copyBtn').textContent         = t.copyBtn;
  document.getElementById('strikeBtn').title             = t.titleStrike;
  document.querySelectorAll('#durationSelect option').forEach(opt => {
    opt.textContent = `${opt.value} ${t.minUnit}`;
  });
  if (!selectedDate) {
    document.getElementById('resultText').innerHTML = `<span class="result-placeholder">${t.placeholder}</span>`;
  }
  renderWeekdays();
}

function renderWeekdays() {
  const container = document.getElementById('calWeekdays');
  container.innerHTML = '';
  for (let i = 0; i < 7; i++) {
    const date = new Date(2024, 0, 1 + i); // Mon 1 Jan 2024 … Sun 7 Jan 2024
    const span = document.createElement('span');
    span.textContent = new Intl.DateTimeFormat(locale, { weekday: 'short' }).format(date);
    container.appendChild(span);
  }
}

function shiftMonth(delta) {
  viewMonth += delta;
  if (viewMonth < 0)  { viewMonth = 11; viewYear--; }
  if (viewMonth > 11) { viewMonth = 0;  viewYear++; }
  renderCalendar();
}

function renderCalendar() {
  const monthName = new Intl.DateTimeFormat(locale, { month: 'long' }).format(new Date(viewYear, viewMonth, 1));
  document.getElementById('monthLabel').textContent =
    monthName.charAt(0).toUpperCase() + monthName.slice(1) + ' ' + viewYear;

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

function applyPreviewFormat(el) {
  const sizes   = { h1: '1.3rem',  h2: '1.05rem', p: '0.85rem', n: '0.75rem' };
  const weights = { h1: '700',     h2: '700',      p: '400',     n: '400'     };
  const opacity = { h1: '1',       h2: '1',        p: '0.85',    n: '0.6'    };
  el.style.fontSize       = sizes[currentFormat];
  el.style.fontWeight     = weights[currentFormat];
  el.style.opacity        = opacity[currentFormat];
  el.style.textDecoration = strikethrough ? 'line-through' : '';
}

function updateResult() {
  const resultEl = document.getElementById('resultText');
  const addBtn   = document.getElementById('addBtn');

  if (!selectedDate) {
    resultEl.innerHTML = `<span class="result-placeholder">${t.placeholder}</span>`;
    resultEl.style.fontSize = '';
    resultEl.style.fontWeight = '';
    resultEl.style.opacity = '';
    resultEl.style.textDecoration = '';
    addBtn.disabled = true;
    updateCopyBtn();
    return;
  }

  const { year, month, day } = selectedDate;
  const dayName = new Intl.DateTimeFormat(locale, { weekday: 'long' }).format(new Date(year, month, day));
  const dateStr = pad(day) + '.' + pad(month + 1) + '.' + year;

  if (selectedMinutes !== null) {
    const duration = parseInt(document.getElementById('durationSelect').value, 10);
    resultEl.textContent = `${dateStr} (${dayName}) ${minsToTime(selectedMinutes)}-${minsToTime(selectedMinutes + duration)}`;
  } else {
    resultEl.textContent = `${dateStr} (${dayName})`;
  }

  applyPreviewFormat(resultEl);
  addBtn.disabled = stack.length >= 10;
  updateCopyBtn();
}

function updateCopyBtn() {
  const copyBtn = document.getElementById('copyBtn');
  copyBtn.disabled = !(stack.length > 0 || selectedDate !== null);
  if (!copyBtn.disabled) { copyBtn.textContent = t.copyBtn; copyBtn.classList.remove('copied'); }
}

/* ── STACK ── */

function addToStack() {
  if (!selectedDate || stack.length >= 10) return;
  const { year, month, day } = selectedDate;
  const dayName = new Intl.DateTimeFormat(locale, { weekday: 'long' }).format(new Date(year, month, day));
  const dateStr = pad(day) + '.' + pad(month + 1) + '.' + year;
  let entry;
  if (selectedMinutes !== null) {
    const duration = parseInt(document.getElementById('durationSelect').value, 10);
    entry = {
      year, month, day, dateStr, dayName,
      startMinutes: selectedMinutes,
      startStr:     minsToTime(selectedMinutes),
      endStr:       minsToTime(selectedMinutes + duration)
    };
  } else {
    entry = { year, month, day, dateStr, dayName, startMinutes: -1, startStr: null, endStr: null };
  }
  stack.push(entry);
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
  if (selectedDate) document.getElementById('addBtn').disabled = stack.length >= 10;
  updateCopyBtn();
}

function itemLabel(it, withDay = true, withTime = true, skipDateIfSame = false, lastDate = null) {
  const time = it.startStr ? ` ${it.startStr}-${it.endStr}` : '';
  if (skipDateIfSame && it.dateStr === lastDate)
    return it.startStr ? `${it.startStr}-${it.endStr}` : it.dateStr;
  return withDay
    ? `${it.dateStr} (${it.dayName})${withTime ? time : ''}`
    : `${it.dateStr}${withTime ? time : ''}`;
}

function getAggregatedText() {
  if (stack.length === 0) return '';
  switch (aggregateLevel) {
    case 0: return stack.map(it => itemLabel(it, true, true)).join(', ');
    case 1: return stack.map(it => itemLabel(it, false, true)).join(', ');
    case 2: {
      const parts = []; let lastDate = null;
      for (const it of stack) {
        parts.push(itemLabel(it, false, true, true, lastDate));
        lastDate = it.dateStr;
      }
      return parts.join(', ');
    }
    case 3: return [...new Set(stack.map(it => it.dateStr))].join(', ');
    case 4: return [...new Map(stack.map(it => [it.dateStr, it])).values()]
                    .map(it => `${it.dateStr} (${it.dayName})`).join(', ');
  }
  return '';
}

function renderStackSection() {
  const section = document.getElementById('stackSection');
  const list    = document.getElementById('stackList');
  const output  = document.getElementById('stackOutput');

  if (stack.length === 0) { section.style.display = 'none'; return; }

  section.style.display = 'flex';
  list.innerHTML = '';
  stack.forEach((it, i) => {
    const el   = document.createElement('div');
    el.className = 'stack-item';
    const span = document.createElement('span');
    span.textContent = it.startStr
      ? `${it.dateStr} (${it.dayName}) ${it.startStr}-${it.endStr}`
      : `${it.dateStr} (${it.dayName})`;
    const btn  = document.createElement('button');
    btn.className   = 'stack-remove';
    btn.textContent = '×';
    btn.addEventListener('click', () => removeFromStack(i));
    el.appendChild(span);
    el.appendChild(btn);
    list.appendChild(el);
  });

  output.textContent = getAggregatedText();
  applyPreviewFormat(output);
}

function aggregate() {
  if (stack.length === 0) return;
  aggregateLevel = (aggregateLevel + 1) % 5;
  renderStackSection();
}

/* ── COPY ── */

function copyResult() {
  const text = stack.length > 0
    ? document.getElementById('stackOutput').textContent
    : document.getElementById('resultText').textContent;

  const wrap = (inner) => strikethrough ? `<s>${inner}</s>` : inner;
  const htmlMap = {
    h1: wrap(`<font size="6">${text}</font>`),
    h2: wrap(`<font size="4">${text}</font>`),
    p:  wrap(`<font size="3">${text}</font>`),
    n:  wrap(text),
  };

  const btn = document.getElementById('copyBtn');
  let promise;
  if (currentFormat === 'n' && !strikethrough) {
    promise = navigator.clipboard.writeText(text);
  } else {
    const item = new ClipboardItem({
      'text/html':  new Blob([htmlMap[currentFormat]], { type: 'text/html' }),
      'text/plain': new Blob([text], { type: 'text/plain' }),
    });
    promise = navigator.clipboard.write([item]);
  }
  promise.then(() => {
    btn.textContent = t.copiedBtn;
    btn.classList.add('copied');
    setTimeout(() => {
      btn.textContent = t.copyBtn;
      btn.classList.remove('copied');
    }, 2000);
  });
}

/* ── UTILS ── */

function minsToTime(m) {
  return pad(Math.floor(m / 60) % 24) + ':' + pad(m % 60);
}

function pad(n) { return String(n).padStart(2, '0'); }

const stor       = typeof browser !== 'undefined' ? browser.storage.local : chrome.storage.local;
const storageApi = typeof browser !== 'undefined' ? browser.storage      : chrome.storage;

stor.get('lang').then(result => {
  langCode = result.lang || (navigator.language || 'en').slice(0, 2).toLowerCase();
  if (!LANG[langCode]) langCode = 'en';
  locale   = { pl: 'pl-PL', en: 'en-US', de: 'de-DE', fr: 'fr-FR' }[langCode] || 'en-US';
  t        = LANG[langCode];
  init();
});

function applyStoredLang(code) {
  const next = code || (navigator.language || 'en').slice(0, 2).toLowerCase();
  const resolved = LANG[next] ? next : 'en';
  if (resolved === langCode) return;
  langCode = resolved;
  locale = { pl: 'pl-PL', en: 'en-US', de: 'de-DE', fr: 'fr-FR' }[langCode];
  t = LANG[langCode];
  stack.forEach(it => {
    it.dayName = new Intl.DateTimeFormat(locale, { weekday: 'long' }).format(new Date(it.year, it.month, it.day));
  });
  applyLang();
  renderCalendar();
  updateResult();
  if (stack.length > 0) renderStackSection();
}

storageApi.onChanged.addListener((changes, area) => {
  if (area !== 'local' || !('lang' in changes)) return;
  applyStoredLang(changes.lang.newValue);
});

document.addEventListener('visibilitychange', () => {
  if (document.visibilityState === 'visible') {
    stor.get('lang').then(r => applyStoredLang(r.lang));
  }
});
