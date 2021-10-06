const 개요 = () => {
  const 수정전 = () => {
    function getRating(driver) {
      return moreThanfiveLateDeliveries(driver) ? 2 : 1;
    }

    function moreThanfiveLateDeliveries(driver) {
      return driver.numberOfLateDeliveries > 5;
    }
  };

  const 수정후 = () => {
    function getRating(driver) {
      return driver.numberOfLateDeliveries > 5 ? 2 : 1;
    }
  };
};

const 예시 = () => {
  const 수정전 = () => {
    function reportLines(aCustomer) {
      const lines = [];
      gatherCustomerData(lines, aCustomer);
      return lines;
    }

    function gatherCustomerData(out, aCustomer) {
      out.push(['name', aCustomer.name]);
      out.push(['location', aCustomer.location]);
    }
  };

  // 한번에 한문장씩 수정하자 => 호출하는 첫문장부터 차근차근
  const 일차수정 = () => {
    function reportLines(aCutomer) {
      const lines = [];
      lines.push(['name', aCutomer.name]);
      gatherCustomerData(lines, aCustomer);
      return lines;
    }

    function gatherCustomerData(out, aCustomer) {
      out.push(['location', aCustomer.location]);
    }
  };

  // 마무리
  const 완료 = () => {
    function reportLines(aCutomer) {
      const lines = [];
      lines.push(['name', aCutomer.name]);
      lines.push(['location', aCutomer.location]);
      return lines;
    }
  };
};
