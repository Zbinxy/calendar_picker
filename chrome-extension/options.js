const stor = typeof browser !== 'undefined' ? browser.storage.local : chrome.storage.local;

stor.get('lang').then(result => {
  document.getElementById('langSelect').value = result.lang || '';
});

document.getElementById('saveBtn').addEventListener('click', () => {
  const lang = document.getElementById('langSelect').value;
  const action = lang ? stor.set({ lang }) : stor.remove('lang');
  action.then(() => {
    const s = document.getElementById('status');
    s.textContent = '✓ Saved';
    setTimeout(() => s.textContent = '', 1800);
  });
});
