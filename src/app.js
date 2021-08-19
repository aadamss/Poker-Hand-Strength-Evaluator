import createInterface from 'readline';
let rl = createInterface({
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
  straightFlugh: 900,
};

rl.on('line', function (line) {
  const [gameType, baseCards, ...allPlayersCards] = line.split(' ');
  console.log(line, baseCards, allPlayersCards);

  const getValueAndCombinationTexasHoldem = (baseCards, playerCards) => {
    const combination = {
      straight_flush: false,
      quads: false,
      full_house: false,
      flush: false,
      straight: false,
      trips: false,
      two_pairs: false,
      pair: false,
      high_card: true,
    };
    return {
      combination: combination,
      value: value,
    };
  };

  const getValueAndCombinationOmahaHolden = (baseCards, playerCards) => {
    const combination = {
      straight_flush: false,
      quads: false,
      full_house: false,
      flush: false,
      straight: false,
      trips: false,
      two_pairs: false,
      pair: false,
      high_card: true,
    };
    return {
      combination: combination,
      value: value,
    };
  };

  const getValueAndCombinationFiveCardDraw = (baseCards, playerCards) => {
    const combination = {
      straight_flush: false,
      quads: false,
      full_house: false,
      flush: false,
      straight: false,
      trips: false,
      two_pairs: false,
      pair: false,
      high_card: true,
    };
    return {
      combination: combination,
      value: value,
    };
  };

  const result = allPlayersCards
    .map((onePlayerCards) => {
      if (gameTyype === 'texas-holdem')
        return getValueAndCombinationTexasHoldem(baseCards, onePlayerCards);
      if (gameTyype === 'omaha-holdem')
        return getValueAndCombinationOmahaHolden(baseCards, onePlayerCards);
      if (gameTyype === 'five-card-draw')
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
