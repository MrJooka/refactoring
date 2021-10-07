/* _______________________개요________________________________________________ */
// 수정 전
function amountInvoiced(startDate, endDate) {
  // ...
}
function amountReceived(startDate, endDate) {
  // ...
}
function amountOverdue(startDate, endDate) {
  // ...
}

// 수정 후
function amountInvoiced(aDateRange) {
  // ...
}
function amountReceived(aDateRange) {
  // ...
}
function amountOverdue(aDateRange) {
  // ...
}

/* _______________________예시________________________________________________ */

// 기차역의 온도 측정값(reaadings)배열에서 정상 작동 범위를 벗어나는 것이 있는지 검사하는 코드
const station = {
  name: 'ZB1',
  readings: [
    { temp: 47, time: '2016-11-10 09:10' },
    { temp: 53, time: '2016-11-10 09:20' },
    { temp: 58, time: '2016-11-10 09:30' },
    { temp: 53, time: '2016-11-10 09:40' },
    { temp: 51, time: '2016-11-10 09:50' },
  ],
};
// 정상 범위 온도
const operatingPlan = {
  temperatureFloor: 46,
  temperatureCeiling: 55,
};
// 정상 범위를 벗어난 값을 찾는 함수
function readingsOutsideRange(station, min, max) {
  return station.readings //
    .filter((r) => r.temp < min || r.temp > max);
}
// 호출문
const alerts = readingsOutsideRange(
  station, //
  operatingPlan.temperatureFloor, //최저 온도
  operatingPlan.temperatureCeiling //최고 온도
);

/* -------------------- 범위(range)는 객체로  ----------------------- */
// 여기서는 객체가 아닌 클래스로 생성하였는데, 새로 생성한 객체로 동작까지 옮기는 더 큰 작업이 수행될 때가 많기 때문이다
class NumberRange {
  constructor(min, max) {
    this._data = { min, max };
  }
  get min() {
    return this._data.min;
  }
  get max() {
    return this._data.max;
  }
}

const range = new NumberRange(operatingPlan.temperatureFloor, operatingPlan.temperatureCeiling);

/* -------------------- 새 객체를 함수의 매개변수로  ----------------------- */
function readingsOutsideRange(station, min, max, range) {
  return station.readings //
    .filter((r) => r.temp < min || r.temp > max);
}

/* -------------------- 호출문에서 새 매개변수 자리엔 null  ----------------------- */
const alerts = readingsOutsideRange(
  station, //
  operatingPlan.temperatureFloor, //최저 온도
  operatingPlan.temperatureCeiling, //최고 온도
  null
);

/* -------------------- 호출문의 매개변수 null을 range로 변경  ----------------------- */
const alerts = readingsOutsideRange(
  station, //
  operatingPlan.temperatureFloor, //최저 온도
  operatingPlan.temperatureCeiling, //최고 온도
  range
);

/* -------------------- 함수의 range 매개변수를 함수 안에서 사용하는 코드로 변경  ----------------------- */
function readingsOutsideRange(station, min, max, range) {
  return station.readings //
    .filter((r) => r.temp < range.min || r.temp > range.max);
}
function readingsOutsideRange(station, range) {
  return station.readings //
    .filter((r) => r.temp < range.min || r.temp > range.max);
}

/* -------------------- 호출문의 매개변수 operatingPlan을 삭제  ----------------------- */
const alerts = readingsOutsideRange(station, range);

/* _______________________최종________________________________________________ */
function readingsOutsideRange(station, range) {
  return station.readings //
    .filter((r) => !range.contains(r.temp));
}

const finalRange = new FinalNumberRange(operatingPlan.temperatureFloor, operatingPlan.temperatureCeiling);
const finalAlerts = readingsOutsideRange(station, finalRange);

class FinalNumberRange {
  constructor(min, max) {
    this._data = { min, max };
  }
  get min() {
    return this._data.min;
  }
  get max() {
    return this._data.max;
  }

  contains(arg) {
    return arg >= this.min && arg <= this.max;
  }
}
