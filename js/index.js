/**
 * index.js — 作品一覧ページの名前入力・プレビュー制御
 */

document.addEventListener('DOMContentLoaded', () => {
  const inputSei = document.getElementById('inputSei');
  const inputMei = document.getElementById('inputMei');
  const previewText = document.getElementById('previewText');
  const saveBtn = document.getElementById('saveNameBtn');
  const toast = document.getElementById('saveToast');
  const worksGrid = document.getElementById('worksGrid');

  // ── 起動時：保存済み名前をフォームに復元 ──
  inputSei.value = getSei();
  inputMei.value = getMei();
  updatePreview();

  // ── 入力のたびにプレビューを更新 ──
  inputSei.addEventListener('input', updatePreview);
  inputMei.addEventListener('input', updatePreview);

  // ── 登録ボタン ──
  saveBtn.addEventListener('click', () => {
    const sei = inputSei.value.trim();
    const mei = inputMei.value.trim();

    saveName(sei, mei);
    updatePreview();
    applyNamesToGrid();
    showToast();
  });

  // ── Enter キーでも登録 ──
  [inputSei, inputMei].forEach(el => {
    el.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') saveBtn.click();
    });
  });

  // ── 起動時に作品カードの説明文も更新 ──
  applyNamesToGrid();

  // ──────────────────────────────────
  function updatePreview() {
    const sei = inputSei.value.trim() || '';
    const mei = inputMei.value.trim() || '';
    if (!sei && !mei) {
      previewText.textContent = '（未入力）';
      previewText.classList.remove('has-name');
    } else {
      previewText.textContent = `${sei} ${mei}`.trim();
      previewText.classList.add('has-name');
    }
  }

  function applyNamesToGrid() {
    // カードの説明文 (.work-card__desc) の #姓# #名# を置換
    const descs = document.querySelectorAll('.work-card__desc');
    descs.forEach(el => {
      // オリジナルテキストを data 属性に保持（再置換のため）
      if (!el.dataset.originalText) {
        el.dataset.originalText = el.textContent;
      }
      const sei = getSei() || '○○';
      const mei = getMei() || '○○';
      el.textContent = el.dataset.originalText
        .replace(/#姓#/g, sei)
        .replace(/#名#/g, mei);
    });
  }

  let toastTimer = null;
  function showToast() {
    if (toastTimer) clearTimeout(toastTimer);
    toast.classList.add('show');
    toastTimer = setTimeout(() => {
      toast.classList.remove('show');
    }, 2200);
  }
});
