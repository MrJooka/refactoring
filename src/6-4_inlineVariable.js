const 개요 = () => {
  const 수정전 = () => {
    function order(anOrder) {
      let basePrice = anOrder.basePrice;
      return basePrice > 0;
    }
  };

  const 완료 = () => {
    function order(anOrder) {
      return anOrder.basePrice > 0;
    }
  };
};
