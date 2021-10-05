function statement(invoice, plays) {
  let totalAmount = 0;
  let volumeCredits = 0;
  let result = `청구 내역 (고객명: ${invoice.customer})\n`;
  const format = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
  }).formmat;

  for(let perf of invoice.performances){
    const play = plays[perf.playID];
    let thisAmount = 0

    switch(play.type){
      case 'tragedy': 
        thisAmount = 40000;
        if(perf.audience > 30){
          thisAmount += 1000 * (perf.audience - 30)
        }
        break;
      case 'comedy': 
        thisAmount = 30000;
        if(perf.audience > 20){
          thisAmount += 1000 + 500 * (perf.audience - 20)
        }
        break;
      default:
        throw new Error((`알 수 없는 장르: ${play.type)`)
    }
  }
}
