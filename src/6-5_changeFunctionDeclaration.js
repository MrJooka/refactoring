const { assert } = require('chai');

const 개요 = () => {
  const 수정전 = () => {
    function circum(radius) {
      // ....
    }
  };
  const 수정후 = () => {
    function circumference(radius) {
      // ....
    }
  };
};

const 함수이름변경간단한절차 = () => {
  const 수정전 = () => {
    function circum(radius) {
      return 2 * Math.PI * radius;
    }
  };
  const 수정후 = () => {
    function circumference(radius) {
      return 2 * Math.PI * radius;
    }
  };
};
const 함수이름변경마이그레이션절차 = () => {
  const 수정전 = () => {
    function circum(radius) {
      return 2 * Math.PI * radius;
    }
  };

  // 공개된 API에 적용하기 좋다. 다른 사용자가 모두 수정된 함수를 사용할 때까지 기존 함수는 놔둔다(기존 함수 폐기 예정임을 표시)
  const 수정후 = () => {
    //폐기 예정
    function circum(radius) {
      circumference(radius);
    }

    function circumference(radius) {
      return 2 * Math.PI * radius;
    }
  };
};

/* 매개변수 추가하기------------------------------------------------------------------------------------------------------- */

//Book class에 도서 예약 기능이 구현되어 있는데, 여기에 우선순위 큐를 지원하라는 요구가 들어온 상황
class Book {
  _reservations = [];

  addReservation(customer) {
    this._reservations.push(customer);
  }
}

//1단계 - 새로운 함수로 추출
class Book {
  _reservations = [];

  addReservation(customer) {
    this.zz_addReservation(customer);
  }
  zz_addReservation(customer) {
    this._reservations.push(customer);
  }
}
//2단계 - 새 함수의 선언문과 호출문에서 요구하는 매개변수 추가 (간단한 절차로 진행)
class Book {
  _reservations = [];

  addReservation(customer) {
    this.zz_addReservation(customer, false);
  }
  zz_addReservation(customer, isPriority) {
    this._reservations.push(customer);
  }
}
// 최종단계 - 어셔션을 추가하여 새로 추가한 매개변수를 실제로 사용하는지 확인
class Book {
  _reservations = [];

  zz_addReservation(customer, isPriority) {
    assert(isPriority === true || isPriority === false);
    this._reservations.push(customer);
  }
}

/* 매개변수를 속성으로 바꾸기------------------------------------------------------------------------------------------------------ */

// 고객이 뉴잉글랜드에 사는지 확인하는 함수
function inNewEngland(aCustomer) {
  return ['MA', 'CT', 'ME', 'VT', 'NH', 'RI'].includes(aCustomer.address.state);
}
// 함수 호출문
const newEnglanders = someCustomers.filter((c) => inNewEngland(c));

// -----------------------------------------------------------------------------------

// 1단계 - 매개변수로 사용할 코드를 변수로 추출
function inNewEngland(aCustomer) {
  const stateCode = aCustomer.address.state;
  return ['MA', 'CT', 'ME', 'VT', 'NH', 'RI'].includes(stateCode);
}
// 2단계 - 함수 추출하기로 새 함수를 만든다. 새 함수의 이름은 기존 함수 이름으로 바꾸기 쉽고 검색하기 쉬운 이름으로 설정한다
function inNewEngland(aCustomer) {
  const stateCode = aCustomer.address.state;
  return xxNEWinNewEngland(stateCode);
}
function xxNEWinNewEngland(stateCode) {
  return ['MA', 'CT', 'ME', 'VT', 'NH', 'RI'].includes(stateCode);
}
// 3단계 - 기존 함수 안에 변수로 추출해둔 입력 매개변수를 인라인한다(6-4 inlineVariable)
function inNewEngland(aCustomer) {
  return xxNEWinNewEngland(aCustomer.address.state);
}
function xxNEWinNewEngland(stateCode) {
  return ['MA', 'CT', 'ME', 'VT', 'NH', 'RI'].includes(stateCode);
}

// 5단계 - 함수 선언 바꾸기를 다시 한번 적용하여 새함수의 이름을 기존 함수의 이름으로 바꾼다
/* function inNewEngland(aCustomer) {
  return xxNEWinNewEngland(aCustomer.address.state);
} */
function inNewEngland(stateCode) {
  return ['MA', 'CT', 'ME', 'VT', 'NH', 'RI'].includes(stateCode);
}
const newEnglanders = someCustomers.filter((c) => inNewEngland(c.address.state));
