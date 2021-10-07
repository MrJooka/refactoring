const { expect } = require('chai');

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

const operatingPlan = {
  temperatureFloor: 46,
  temperatureCeiling: 55,
};

describe('리팩토링 전', function () {
  function readingsOutsideRange(station, min, max) {
    return station.readings.filter((r) => r.temp < min || r.temp > max);
  }
  const alerts = readingsOutsideRange(station, operatingPlan.temperatureFloor, operatingPlan.temperatureCeiling);

  it('alerts[0].temp === 58', function () {
    expect(alerts[0].temp).equal(58);
  });
  it('alerts.length === 1', function () {
    expect(alerts).to.have.lengthOf(1);
  });
  it('alerts.includes === { temp: 58, time: 2016-11-10 09:30 }', function () {
    expect(alerts).to.deep.include({ temp: 58, time: '2016-11-10 09:30' });
  });
});

/* ________________________________________________________________________________________________ */
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

describe('리팩토링 후', function () {
  function readingsOutsideRange(station, range) {
    return station.readings.filter((r) => r.temp < range.min || r.temp > range.max);
  }
  const alerts = readingsOutsideRange(station, range);

  it('alerts[0].temp === 58', function () {
    expect(alerts[0].temp).equal(58);
  });
  it('alerts.length === 1', function () {
    expect(alerts).to.have.lengthOf(1);
  });
  it('alerts.includes === { temp: 58, time: 2016-11-10 09:30 }', function () {
    expect(alerts).to.deep.include({ temp: 58, time: '2016-11-10 09:30' });
  });
});

/* ________________________________________________________________________________________________ */

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
const finalRange = new FinalNumberRange(operatingPlan.temperatureFloor, operatingPlan.temperatureCeiling);

describe('최종으로 개선방안 - 클래스에 메서드를 넣어서 관리', function () {
  function readingsOutsideRange(station, range) {
    return station.readings //
      .filter((r) => !range.contains(r.temp));
  }
  const finalAlerts = readingsOutsideRange(station, finalRange);

  it('finalAlerts[0].temp === 58', function () {
    expect(finalAlerts[0].temp).equal(58);
  });
  it('finalAlerts.length === 1', function () {
    expect(finalAlerts).to.have.lengthOf(1);
  });
  it('finalAlerts.includes === { temp: 58, time: 2016-11-10 09:30 }', function () {
    expect(finalAlerts).to.deep.include({ temp: 58, time: '2016-11-10 09:30' });
  });
});
