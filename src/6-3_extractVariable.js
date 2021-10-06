const 개요 = () => {
  const 수정전 = () => {
    function price(order) {
      return (
        order.quantity * order.itemPrice - Math.max(0, order.quantity - 500) * order.itemPrice * 0.05 + Math.min(order.quntity * order.itemPrice * 0.1, 100)
      );
    }
  };

  const 수정후 = () => {
    function price(order) {
      const basePrice = order.quantity * order.itemPrice;
      const quantityDiscount = Math.max(0, order.quantity - 500) * order.itemPrice * 0.05;
      const shipping = Math.min(basePrice * 0.1, 100);
      return basePrice - quantityDiscount + shipping;
    }
  };
};

const 예시 = () => {
  const 수정전 = () => {
    function price(order) {
      // 가격(price) = 기본가격 - 수량 할인 + 배송비
      return (
        order.quantity * order.itemPrice - Math.max(0, order.quantity - 500) * order.itemPrice * 0.05 + Math.min(order.quntity * order.itemPrice * 0.1, 100)
      );
    }
  };

  const 수정1 = () => {
    function price(order) {
      // 가격(price) = 기본가격 - 수량 할인 + 배송비
      const basePrice = order.quantity * order.itemPrice;
      return (
        order.quantity * order.itemPrice - Math.max(0, order.quantity - 500) * order.itemPrice * 0.05 + Math.min(order.quntity * order.itemPrice * 0.1, 100)
      );
    }
  };
  const 수정2 = () => {
    function price(order) {
      // 가격(price) = 기본가격 - 수량 할인 + 배송비
      const basePrice = order.quantity * order.itemPrice;
      return basePrice - Math.max(0, order.quantity - 500) * order.itemPrice * 0.05 + Math.min(basePrice * 0.1, 100);
    }
  };
  const 수정후 = () => {
    function price(order) {
      const basePrice = order.quantity * order.itemPrice;
      const quantityDiscount = Math.max(0, order.quantity - 500) * order.itemPrice * 0.05;
      const shipping = Math.min(basePrice * 0.1, 100);
      return basePrice - quantityDiscount + shipping;
    }
  };
};

// 똑같은 코드를 클래스 문맥 안에서 처리
class BeforeRefactoringOrder {
  constructor(aRecord) {
    this._data = aRecord;
  }

  get quantity() {
    return this._data.quantity;
  }
  get itemPrice() {
    return this._data.itemPrice;
  }

  get price() {
    return (
      this.quantity * this.itemPrice - //
      Math.max(0, this.quantity - 500) * this.itemPrice * 0.05 + //
      Math.min(this.quantity * this.itemPrice * 0.1, 100)
    );
  }
}

// 최종 리팩토링
class Order {
  constructor(aRecord) {
    this._data = aRecord;
  }

  get quantity() {
    return this._data.quantity;
  }
  get itemPrice() {
    return this._data.itemPrice;
  }

  get price() {
    return this.basePrice - this.quantityDiscount + this.shipping;
  }

  get basePrice() {
    return this.quantity * this.itemPrice;
  }
  get quantityDiscount() {
    return Math.max(0, this.quantity - 500) * this.itemPrice * 0.05;
  }
  get shipping() {
    return Math.min(this.quantity * this.itemPrice * 0.1, 100);
  }
}

const newOrder = new Order({ quantity: 20, itemPrice: 200 });

console.log(newOrder);
