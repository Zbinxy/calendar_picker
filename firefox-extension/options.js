const stor = typeof browser !== 'undefined' ? browser.storage.local : chrome.storage.local;

stor.get('lang').then(result => {
  const val = result.lang || '';
  document.querySelector(`input[name="lang"][value="${val}"]`).checked = true;
});

document.querySelectorAll('input[name="lang"]').forEach(radio => {
  radio.addEventListener('change', () => {
    const lang = radio.value;
    const action = lang ? stor.set({ lang }) : stor.remove('lang');
    action.then(() => {
      const s = document.getElementById('status');
      s.textContent = '✓ Saved';
      setTimeout(() => s.textContent = '', 1800);
    });
  });
});
