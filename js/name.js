/**
 * name.js — 名前の保存・取得・置換ユーティリティ
 * LocalStorage を使用してブラウザ内に名前を保存します。
 */

const NAME_KEY_SEI = 'yumenovel_sei';
const NAME_KEY_MEI = 'yumenovel_mei';

/** 名前を保存 */
function saveName(sei, mei) {
  localStorage.setItem(NAME_KEY_SEI, sei.trim());
  localStorage.setItem(NAME_KEY_MEI, mei.trim());
}

/** 姓を取得 */
function getSei() {
  return localStorage.getItem(NAME_KEY_SEI) || '';
}

/** 名を取得 */
function getMei() {
  return localStorage.getItem(NAME_KEY_MEI) || '';
}

/** 本文内の #姓# #名# を置き換える */
function replaceNameInText(text) {
  const sei = getSei();
  const mei = getMei();
  return text
    .replace(/#姓#/g, sei || '○○')
    .replace(/#名#/g, mei || '○○');
}

/**
 * 指定要素内のテキストノードを走査して名前を置換する。
 * data-no-replace 属性がある要素はスキップ。
 */
function applyNamesToElement(rootEl) {
  if (!rootEl) return;
  walkTextNodes(rootEl, (node) => {
    const original = node.nodeValue;
    const replaced = replaceNameInText(original);
    if (original !== replaced) {
      node.nodeValue = replaced;
    }
  });
}

function walkTextNodes(el, callback) {
  if (el.nodeType === Node.TEXT_NODE) {
    callback(el);
    return;
  }
  if (el.nodeType !== Node.ELEMENT_NODE) return;
  if (el.dataset && el.dataset.noReplace !== undefined) return;
  for (const child of el.childNodes) {
    walkTextNodes(child, callback);
  }
}
