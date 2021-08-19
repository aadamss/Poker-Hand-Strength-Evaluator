import readline from 'readline';
let rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false,
});

const CardValues = {
  2: 2,
  3: 3,
  4: 4,
  5: 5,
  6: 6,
  7: 7,
  8: 8,
  9: 9,
  10: 10,
  J: 11,
  Q: 12,
  K: 13,
  A: 14,
};

const CombinationValues = {
  highCard: 100,
  pair: 200,
  twoPairs: 300,
  threeOfAKind: 400,
  straight: 500,
  flush: 600,
  fullHouse: 700,
  fourOfAKind: 800,
  straightFlush: 900,
};

rl.on('line', function (line) {
  const [gameType, baseCards, ...allPlayersCards] = line.split(' ');
  console.log(allPlayersCards);

  const getValueAndCombinationTexasHoldem = (baseCards, playerCards) => {
    return {
      combination: combination,
      value: value,
    };
  };

  const getValueAndCombinationOmahaHolden = (baseCards, playerCards) => {
    return {
      combination: combination,
      value: value,
    };
  };

  const getValueAndCombinationFiveCardDraw = (baseCards, playerCards) => {
    return {
      combination: combination,
      value: value,
    };
  };

  const result = allPlayersCards
    .map((onePlayerCards) => {
      if (gameType === 'texas-holdem')
        return getValueAndCombinationTexasHoldem(baseCards, onePlayerCards);
      if (gameType === 'omaha-holdem')
        return getValueAndCombinationOmahaHolden(baseCards, onePlayerCards);
      if (gameType === 'five-card-draw')
        return getValueAndCombinationFiveCardDraw(baseCards, onePlayerCards);
    })
    .sort((a, b) => {
      if (a.value === b.value) {
        return a.combination > b.combination ? 1 : -1;
      }
      return a.value > b.value;
    })
    .forEach((result, index, arr) => {
      if (index === 0) {
        return console.log(result.combination);
      }

      if (arr[index - 1].value === result) {
        console.log('=');
      } else {
        console.log(' ');
      }

      console.log(result.combination);
    });
});
