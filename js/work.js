/**
 * work.js — 作品ページの名前置換処理
 * name.js の読み込みが先に必要です。
 */

document.addEventListener('DOMContentLoaded', () => {
  // 本文エリアに名前を適用
  const novelBody = document.getElementById('novelBody');
  if (novelBody) {
    applyNamesToElement(novelBody);
  }

  // ページタイトル内にもあれば置換
  const novelTitle = document.querySelector('.novel-title');
  if (novelTitle) {
    applyNamesToElement(novelTitle);
  }

  // ヘッダーの登場人物名表示
  const nameDisplay = document.getElementById('currentNameDisplay');
  if (nameDisplay) {
    const sei = getSei();
    const mei = getMei();
    if (sei || mei) {
      nameDisplay.textContent = `${sei} ${mei}`.trim();
      nameDisplay.closest('.reader-name-bar').classList.add('has-name');
    } else {
      nameDisplay.textContent = '（名前未登録）';
    }
  }

  // 「名前を変更する」ボタン → トップページへ
  const changeNameBtn = document.getElementById('changeNameBtn');
  if (changeNameBtn) {
    // GitHub Pagesのルートからの相対パスを動的に計算
    changeNameBtn.addEventListener('click', () => {
      const depth = location.pathname.split('/').length - 2;
      const prefix = depth > 1 ? '../'.repeat(depth - 1) : './';
      // works/ の下にいる場合は ../ でルートへ
      window.location.href = '../index.html';
    });
  }
});
