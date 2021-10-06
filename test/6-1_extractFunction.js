// 최종 결과
function printOwing(invoice) {
  printBanner();
  const outstanding = calculateOutstanding(invoice); // 불변으로 만들자
  recordDueDate(invoice);
  printDetails(invoice, outstanding);
}
function calculateOutstanding(invoice) {
  let result = 0;
  for (const o of invoice.orders) {
    result += o.amount;
  }
  return result; // 함숭의 결과값은 result라는 변수로 통일하면 함수가 값을 리턴하는지 예상하기 쉽다
}
function recordDueDate(invoice) {
  const today = Clock.today;
  invoice.dueDate = new Date(today.getFullYear(), today.getMonth, today.getDate() + 30);
}
function printDetails(invoice, outstanding) {
  console.log(`고객명: ${invoice.customer}`);
  console.log(`채무액: ${outstanding}`);
  console.log(`고객명: ${invoice.dueDate.toLocaleDateString()}`);
}
function printBanner() {
  console.log('****************');
  console.log('****고객 채무****');
  console.log('****************');
}

const Clock = {
  today: new Date(2021, 09, 21),
};

// ----------------------------------------------------------------------------------------------------------------------------------------------------------
function 개요() {
  const 수정전 = () => {
    function printOwing(invoice) {
      printBanner();
      let outstanding = calculateOutstanding();

      console.log(`고객명: ${invoice.customer}`);
      console.log(`채무액: ${outstanding}`);
    }
  };

  const 수정후 = () => {
    function printOwing(invoice) {
      printBanner();
      let outstanding = calculateOutstanding();
      printDetails(outstanding);

      function printDetails(outstanding) {
        console.log(`고객명: ${invoice.customer}`);
        console.log(`채무액: ${outstanding}`);
      }
    }
  };
}

// ----------------------------------------------------------------------------------------------------------------------------------------------------------

const 유효범위를벗어나는변수가없을때 = () => {
  const 수정전 = () => {
    function printOwing(invoice) {
      let outstanding = 0;

      console.log('****************');
      console.log('****고객 채무****');
      console.log('****************');

      // 미해결 채무(outstanding)를 계산한다
      for (const o of invoice.orders) {
        outstanding += o.amount;
      }

      // 마감일(dueDate)을 기록한다
      const today = Clock.today;
      invoice.dueDate = new Date(today.getFullYear(), today.getMonth, today.getDate() + 30);

      // 세부 사항을 출력한다
      console.log(`고객명: ${invoice.customer}`);
      console.log(`채무액: ${outstanding}`);
      console.log(`고객명: ${invoice.dueDate.toLocaleDateString()}`);
    }
  };

  const 수정후 = () => {
    function printOwing(invoice) {
      let outstanding = 0;

      printBanner();

      // 미해결 채무(outstanding)를 계산한다
      for (const o of invoice.orders) {
        outstanding += o.amount;
      }

      // 마감일(dueDate)을 기록한다
      const today = Clock.today;
      invoice.dueDate = new Date(today.getFullYear(), today.getMonth, today.getDate() + 30);

      printDetails();
      function printDetails() {
        console.log(`고객명: ${invoice.customer}`);
        console.log(`채무액: ${outstanding}`);
        console.log(`고객명: ${invoice.dueDate.toLocaleDateString()}`);
      }
    }

    function printBanner() {
      console.log('****************');
      console.log('****고객 채무****');
      console.log('****************');
    }
  };
};

// ----------------------------------------------------------------------------------------------------------------------------------------------------------

const 지역변수를사용할때 = () => {
  const 수정전 = () => {
    function printOwing(invoice) {
      let outstanding = 0;

      printBanner();

      // 미해결 채무(outstanding)를 계산한다
      for (const o of invoice.orders) {
        outstanding += o.amount;
      }

      // 마감일(dueDate)을 기록한다
      const today = Clock.today;
      invoice.dueDate = new Date(today.getFullYear(), today.getMonth, today.getDate() + 30);

      // 세부 사항을 출력한다
      console.log(`고객명: ${invoice.customer}`);
      console.log(`채무액: ${outstanding}`);
      console.log(`고객명: ${invoice.dueDate.toLocaleDateString()}`);
    }
    function printBanner() {
      console.log('****************');
      console.log('****고객 채무****');
      console.log('****************');
    }
  };

  const 수정후 = () => {
    function printOwing(invoice) {
      let outstanding = 0;

      printBanner();

      // 미해결 채무(outstanding)를 계산한다
      for (const o of invoice.orders) {
        outstanding += o.amount;
      }

      // 마감일(dueDate)을 기록한다
      const today = Clock.today;
      invoice.dueDate = new Date(today.getFullYear(), today.getMonth, today.getDate() + 30);

      // 앞의 예와 달리 지역 변수를 매개변수로 전달한다
      printDetails(invoice, outstanding);
    }
    function printDetails(invoice, outstanding) {
      console.log(`고객명: ${invoice.customer}`);
      console.log(`채무액: ${outstanding}`);
      console.log(`고객명: ${invoice.dueDate.toLocaleDateString()}`);
    }
    function printBanner() {
      console.log('****************');
      console.log('****고객 채무****');
      console.log('****************');
    }
  };
  function 한번더수정() {
    function printOwing(invoice) {
      let outstanding = 0;

      printBanner();

      // 미해결 채무(outstanding)를 계산한다
      for (const o of invoice.orders) {
        outstanding += o.amount;
      }

      // 마감일 설정 로직을 함수로 축출
      recordDueDate(invoice);

      // 앞의 예와 달리 지역 변수를 매개변수로 전달한다
      printDetails(invoice, outstanding);
    }
    function recordDueDate(invoice) {
      const today = Clock.today;
      invoice.dueDate = new Date(today.getFullYear(), today.getMonth, today.getDate() + 30);
    }
    function printDetails(invoice, outstanding) {
      console.log(`고객명: ${invoice.customer}`);
      console.log(`채무액: ${outstanding}`);
      console.log(`고객명: ${invoice.dueDate.toLocaleDateString()}`);
    }
    function printBanner() {
      console.log('****************');
      console.log('****고객 채무****');
      console.log('****************');
    }
  }
};

// ----------------------------------------------------------------------------------------------------------------------------------------------------------

const 지역변수의값을변경할때 = () => {
  const 수정전 = () => {
    function printOwing(invoice) {
      let outstanding = 0;

      printBanner();

      // 미해결 채무(outstanding)를 계산한다
      for (const o of invoice.orders) {
        outstanding += o.amount;
      }

      recordDueDate(invoice);
      printDetails(invoice, outstanding);
    }
    function recordDueDate(invoice) {
      const today = Clock.today;
      invoice.dueDate = new Date(today.getFullYear(), today.getMonth, today.getDate() + 30);
    }
    function printDetails(invoice, outstanding) {
      console.log(`고객명: ${invoice.customer}`);
      console.log(`채무액: ${outstanding}`);
      console.log(`고객명: ${invoice.dueDate.toLocaleDateString()}`);
    }
    function printBanner() {
      console.log('****************');
      console.log('****고객 채무****');
      console.log('****************');
    }
  };

  // 선언문을 변수가 사용되는 코드 근처로 슬라이드한다
  const 수정1단계 = () => {
    function printOwing(invoice) {
      printBanner();

      // 미해결 채무(outstanding)를 계산한다
      let outstanding = 0;
      for (const o of invoice.orders) {
        outstanding += o.amount;
      }

      recordDueDate(invoice);
      printDetails(invoice, outstanding);
    }
    function recordDueDate(invoice) {
      const today = Clock.today;
      invoice.dueDate = new Date(today.getFullYear(), today.getMonth, today.getDate() + 30);
    }
    function printDetails(invoice, outstanding) {
      console.log(`고객명: ${invoice.customer}`);
      console.log(`채무액: ${outstanding}`);
      console.log(`고객명: ${invoice.dueDate.toLocaleDateString()}`);
    }
    function printBanner() {
      console.log('****************');
      console.log('****고객 채무****');
      console.log('****************');
    }
  };

  // 추출할 부분을 새로운 함수로 복사한다
  const 수정2단계 = () => {
    function printOwing(invoice) {
      printBanner();

      // 미해결 채무(outstanding)를 계산한다
      let outstanding = 0;
      for (const o of invoice.orders) {
        outstanding += o.amount;
      }

      recordDueDate(invoice);
      printDetails(invoice, outstanding);
    }
    function calculateOutstanding(invoice) {
      let outstanding = 0;
      for (const o of invoice.orders) {
        outstanding += o.amount;
      }
      return outstanding; //수정된 값 반환
    }
    function recordDueDate(invoice) {
      const today = Clock.today;
      invoice.dueDate = new Date(today.getFullYear(), today.getMonth, today.getDate() + 30);
    }
    function printDetails(invoice, outstanding) {
      console.log(`고객명: ${invoice.customer}`);
      console.log(`채무액: ${outstanding}`);
      console.log(`고객명: ${invoice.dueDate.toLocaleDateString()}`);
    }
    function printBanner() {
      console.log('****************');
      console.log('****고객 채무****');
      console.log('****************');
    }
  };

  // 추출한 자리에 새로 만든 함수를 호출하는 문장으로 교체
  const 수정3단계 = () => {
    function printOwing(invoice) {
      printBanner();
      let outstanding = calculateOutstanding(invoice); // 함수 추출 완료. 추출한 함수가 반환한 값을 변수에 저장한다
      recordDueDate(invoice);
      printDetails(invoice, outstanding);
    }
    function calculateOutstanding(invoice) {
      let outstanding = 0;
      for (const o of invoice.orders) {
        outstanding += o.amount;
      }
      return outstanding;
    }
    function recordDueDate(invoice) {
      const today = Clock.today;
      invoice.dueDate = new Date(today.getFullYear(), today.getMonth, today.getDate() + 30);
    }
    function printDetails(invoice, outstanding) {
      console.log(`고객명: ${invoice.customer}`);
      console.log(`채무액: ${outstanding}`);
      console.log(`고객명: ${invoice.dueDate.toLocaleDateString()}`);
    }
    function printBanner() {
      console.log('****************');
      console.log('****고객 채무****');
      console.log('****************');
    }
  };

  // 코딩 스타일에 맞게 수정
  const 수정3단계 = () => {
    function printOwing(invoice) {
      printBanner();
      const outstanding = calculateOutstanding(invoice); // 불변으로 만들자
      recordDueDate(invoice);
      printDetails(invoice, outstanding);
    }
    function calculateOutstanding(invoice) {
      let result = 0;
      for (const o of invoice.orders) {
        result += o.amount;
      }
      return result; // 함숭의 결과값은 result라는 변수로 통일하면 함수가 값을 리턴하는지 예상하기 쉽다
    }
    function recordDueDate(invoice) {
      const today = Clock.today;
      invoice.dueDate = new Date(today.getFullYear(), today.getMonth, today.getDate() + 30);
    }
    function printDetails(invoice, outstanding) {
      console.log(`고객명: ${invoice.customer}`);
      console.log(`채무액: ${outstanding}`);
      console.log(`고객명: ${invoice.dueDate.toLocaleDateString()}`);
    }
    function printBanner() {
      console.log('****************');
      console.log('****고객 채무****');
      console.log('****************');
    }
  };
};
