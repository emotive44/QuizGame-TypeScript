import { questionPrice } from '../components/price-aside/PriceAside';

export const getWinMoney = (currQuest: number, takeMoney?: boolean) => {
  if(takeMoney) {
    if(currQuest - 2 < 0) return 0;
    
    return [...questionPrice].sort((a, b) => a - b).slice(currQuest -2, currQuest-1)[0];
  }

  if(currQuest >= 5 && currQuest < 10) {
    return 250;
  } else if (currQuest >= 10 && currQuest <= 14) {
    return 2500;
  } else return 0;

}