/* _______________________개요________________________________________________ */
// 수정 전
let a = height * width;

// 수정 후
let area = height * width;

/* _______________________예시________________________________________________ */

// 변수
let tpHd = 'untitled';
// 변수를 읽기만 함
result += `<h1>${tpHd}</h1>`;
// 값을 수정도 함
tpHd = obj['articleTitle'];

/* -------------- 변수 캡슐화하기(6-6) ----------------------- */
result += `<h1>${tpHd}</h1>`;

setTitle(obj['articleTitle']);

function title() {
  return tpHd;
}
function setTitle(arg) {
  tpHd = arg;
}
// ----- 캡슐화 한 후 이름을 변경 -----
let _title = 'untitled';
result += `<h1>${_title}</h1>`;

setTitle(obj['articleTitle']);

function title() {
  return _title;
}
function setTitle(arg) {
  _title = arg;
}
