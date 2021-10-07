import assert from 'assert/strict';

/* _______________________개요________________________________________________ */

let defaultOwner = { firstName: '마틴', lastName: '파울러' };

let defaultOwnerData = { firstName: '마틴', lastName: '파울러' };
export function defaultOwner() {
  return defaultOwnerData;
}
export function setDefaultOwner(arg) {
  defaultOwnerData = arg;
}

/* _______________________예시________________________________________________ */

let defaultOwner = { firstName: '마틴', lastName: '파울러' }; // 전역변수에 중요한 데이터가 있고
spaceship.owner = defaultOwner; // 이를 참조하는 코드 존재할 경우
defaultOwner = { firstName: '레베카', lastName: '파슨스' }; // 데이터 갱신도 이뤄짐

// 1.데이터를 읽고 쓰는 함수부터 정의한다
function getDefualtOwner() {
  return defaultOwner;
}
function setDefaaultOwner(arg) {
  defaultOwner = arg;
}
// 2.defaulutOwner를 참조하는 코드를 찾아서 방금 만든 게터 함수를 호출하도록 수정한다
spaceship.owner = getDefualtOwner();
// 3.데이터갱신은 세터 함수로 변경한다
setDefaaultOwner({ firstName: '레베카', lastName: '파슨스' });
import { assert } from 'chai';
// 4.가시범위를 제한한다. 새로운 파일을 생성하여 변수와 접근자를 해당 파일로 옮긴다. 접근자만 export로 노출시킨다
import { defaultOwner, setDefaultOwner } from './encapsulateValue/defaultOwner';

// 정리 : 데이터 구조로의 참조를 캡슐화하면, 그 구조로의 접근이나 구조 자체를 다시 대입하는 행위는 제어 가능하다
// 하지만, 필드 값을 변경하는 일은 제어할 수 없다

/* _______________________값 캡슐화하기________________________________________________ */

const owner1 = defaultOwner();
assert.equal('파울러', owner1.lastName, '처음 값 확인');
const owner2 = defaultOwner();
owner2.lastName = '파슨슨';
assert.equal('파슨스', owner1.lastName, 'owner2를 변경한 후'); // owner1.lastName도 '파슨스'으로 변경됨

// 첫번째 방법 - 복제본을 반환하여 원본은 불변하게 만든다
// defaultOwner.js 파일 내용
let defaultOwnerData = { firstName: '마틴', lastName: '파울러' };
export function defaultOwner() {
  return Object.assign({}, defaultOwnerData);
}
export function setDefaultOwner(arg) {
  defaultOwnerData = arg;
}

/* _______________________레코드 캡슐화________________________________________________ */

let defaultOwnerData = { firstName: '마틴', lastName: '파울러' };
export function defaultOwner() {
  return new Person(defaultOwnerData);
}
export function setDefaultOwner(arg) {
  defaultOwnerData = arg;
}

class Person {
  constructor(data) {
    this._lastName = data.lastName;
    this._firstName = data.firstName;
  }

  get lastName() {
    return this._lastName;
  }
  get firstName() {
    return this._firstName;
  }
}
