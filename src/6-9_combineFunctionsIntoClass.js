/* _______________________개요________________________________________________ */
// 수정 전
function base(aReading) {
  // ...
}
function taxableCharge(aReading) {
  // ...
}
function calculateBaseCharge(aReading) {
  // ...
}

// 수정 후
class Reading {
  base() {
    // ...
  }
  taxableCharge() {
    // ...
  }
  calculateBaseCharge() {
    // ...
  }
}
/* _______________________예시________________________________________________ */
// 나라에서 차를 수돗물처럼 제공
// 차 계량기에서의 측정값
const reading = { customer: 'ivan', quantity: 10, month: 5, year: 2017 };

// 클라이언트1 -기본요금계산코드
const aReading = acquireReading();
const baseCharge = baseRate(aReading.month, aReading.year) * aReading.quantity;
// 클라이언트2 -세금; 기본 차 소비량에는 면세
const aReading = acquireReading();
const base = baseRate(aReading.month, aReading.year) * aReading.quantity;
const taxableCharge = Math.max(0, base - taxThreshold(aReading.year));
// 클라이언트3 -함수로 추출한 코드 이미 존재
const aReading = acquireReading();
const basicChargeAmount = calculateBaseCharge(aReading);

/* 해당함수를 최상위로 두면 못보고 지나치기 쉬운 문제가 있다
    데이터 처리 코드에 가까이 둘 수 있는 방법으로 리팩토링*/
function calculateBaseCharge(aReading) {
  return baseRate(aReading.month, aReading.year) * aReading.quantity;
}

/* -------------------- 1.레코드를 클래스로 변환하기 위해 레코드를 캡슐화  ----------------------- */
class Reading {
  constructor(data) {
    this._customer = data.customer;
    this._quantity = data.quantity;
    this._month = data.month;
    this._year = data.year;
  }
  get customer() {
    return this._customer;
  }
  get quantity() {
    return this._quantity;
  }
  get month() {
    return this._month;
  }
  get year() {
    return this._year;
  }
}
/* -------------------- 2.이미 만들어져 있는 calculateBaseCharge부터 옮기자  ----------------------- */
// 클라이언트3
const rawReading = acquireReading();
const aReading = new Reading(rawReading);
const basicChargeAmount = calculateBaseCharge(aReading);

/* -------------------- 3.calculateBaseCharge()를 Reading클래스로 옮긴고 이름 변경  ----------------------- */
// Reading 클래스의 클라이언트는 baseCharge가 필드인지, 계산된 값(함수호출)인지 구분할 수 없다.
// 이는 단일 접근 원칙(Uniform Access Principle)에서 권장하는 방식이다
class Reading {
  constructor(data) {
    this._customer = data.customer;
    this._quantity = data.quantity;
    this._month = data.month;
    this._year = data.year;
  }
  get customer() {
    return this._customer;
  }
  get quantity() {
    return this._quantity;
  }
  get month() {
    return this._month;
  }
  get year() {
    return this._year;
  }
  // get calculateBaseCharge() {
  //   return baseRate(this.month, this.year) * this.quantity;
  // }
  // 함수 이름도 변경한다
  get baseCharge() {
    return baseRate(this.month, this.year) * this.quantity;
  }
}
// 클라이언트3 - 호출문도 변경한다
const rawReading = acquireReading();
const aReading = new Reading(rawReading);
const basicChargeAmount = aReading.baseCharge;
/* -------------------- 4.클라이언트에서 중복 계산된 코드를 고쳐 앞의 메서드를 호출  ----------------------- */
// 클라이언트1 -기본요금계산코드
const rawReading = acquireReading();
const aReading = new Reading(rawReading);
const baseCharge = aReading.baseCharge;
// 클라이언트2 -세금; 기본 차 소비량에는 면세
const rawReading = acquireReading();
const aReading = new Reading(rawReading);
const taxableCharge = Math.max(0, aReading.baseCharge - taxThreshold(aReading.year));

/* -------------------- 4.세금을 부과할 소비량을 계산하는 코드를 함수로 추출(6-1)  ----------------------- */
function taxableChargeFn(aReading) {
  return Math.max(0, aReading.baseCharge - taxThreshold(aReading.year));
}
// 클라이언트2 - 추출한 함수를 호출하여 값으로 입력한다
const rawReading = acquireReading();
const aReading = new Reading(rawReading);
const taxableCharge = taxableChargeFn(aReading);

/* -------------------- 4.추출한 함수를 Reading 클래스로 이동(8-1)  ----------------------- */
class Reading {
  constructor(data) {
    this._customer = data.customer;
    this._quantity = data.quantity;
    this._month = data.month;
    this._year = data.year;
  }
  get customer() {
    return this._customer;
  }
  get quantity() {
    return this._quantity;
  }
  get month() {
    return this._month;
  }
  get year() {
    return this._year;
  }

  get baseCharge() {
    return baseRate(this.month, this.year) * this.quantity;
  }
  get taxableCharge() {
    return Math.max(0, this.baseCharge - taxThreshold(this.year));
  }
}

/* -------------------- 4.추출한 함수를 Reading 클래스로 이동(8-1)  ----------------------- */
class Reading {
  constructor(data) {
    this._customer = data.customer;
    this._quantity = data.quantity;
    this._month = data.month;
    this._year = data.year;
  }
  get customer() {
    return this._customer;
  }
  get quantity() {
    return this._quantity;
  }
  get month() {
    return this._month;
  }
  get year() {
    return this._year;
  }

  get baseCharge() {
    return baseRate(this.month, this.year) * this.quantity;
  }
  get taxableCharge() {
    return Math.max(0, this.baseCharge - taxThreshold(this.year));
  }
}

// 클라이언트2
const rawReading = acquireReading();
const aReading = new Reading(rawReading);
const taxableCharge = aReading.taxableCharge;
