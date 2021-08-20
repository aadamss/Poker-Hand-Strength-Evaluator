import readline from 'readline'; // Readline provides an interface for reading data from a readable stream, one line at a time

let rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false,
});

const CardValues = {
  // using a binary map representation to determine value for every card
  2: 2,
  3: 4,
  4: 8,
  5: 16,
  6: 32,
  7: 64,
  8: 128,
  9: 256,
  10: 512,
  J: 1024,
  Q: 2048,
  K: 4096,
  A: 8192,
};

const CombinationValues = {
  // adding a value to every combination/hand
  highCard: 1000000000,
  pair: 2000000000,
  twoPairs: 3000000000,
  threeOfAKind: 4000000000,
  straight: 5000000000,
  flush: 6000000000,
  fullHouse: 7000000000,
  fourOfAKind: 8000000000,
  straightFlush: 9000000000,
};

// Functions below determine each of the combinations/hands

const getHighCard = (cards) => {
  const sortedCardsByValue = cards
    .map((cardWithSuite) => {
      const cardNameOnly = cardWithSuite.split('')[0];
      return { card: cardWithSuite, value: CardValues[cardNameOnly] };
    })
    .sort((a, b) => {
      return a.value < b.value ? 1 : -1;
    });

  return sortedCardsByValue[0].card;
};
const getPair = (cards) => {
  const sortedCardsByValue = cards
    .map((cardWithSuite) => {
      const cardNameOnly = cardWithSuite.split('')[0];
      return { card: cardWithSuite, value: CardValues[cardNameOnly] };
    })
    .sort((a, b) => {
      return a.value < b.value ? 1 : -1;
    });
  for (let i = 0; i < sortedCardsByValue.length - 1; i++) {
    if (sortedCardsByValue[i].value === sortedCardsByValue[i + 1].value) {
      return [sortedCardsByValue[i].card, sortedCardsByValue[i + 1].card];
    }
  }
  return null;
};
const getTwoPairs = () => {};
const getThreeOfAKind = () => {};
const getStraight = () => {};
const getFlush = () => {};
const getFullHouse = () => {};
const getFourOfAKind = () => {};
const getStraightFlush = () => {};

// Retrieve the values of the cards
const getCardValues = (cards) => {
  const cardValues = cards.map((cardWithSuite) => {
    const cardNameOnly = cardWithSuite.split('')[0];
    return CardValues[cardNameOnly];
  });
  let cardValueSum = 0;

  for (let i = 0; i < cardValues.length; i++) {
    cardValueSum += cardValues[i];
  }
  return cardValueSum;
};

rl.on('line', function (line) {
  const [gameType, baseCards, ...allPlayersCards] = line.split(' ');

  // Retrieves the value and combination for all the poker combinations/hands
  const getValueAndCombination = (baseCards, playerCards) => {
    const baseAndPlayer = (baseCards + playerCards)
      .split(/([a-zA-Z]{2})/)
      .filter((el) => el);

    const straightFlush = getStraightFlush(baseAndPlayer);
    if (straightFlush) {
      return {
        combination: straightFlush,
        value: CombinationValues.straightFlush + getCardValues(straightFlush),
      };
    }
    const fourOfAKind = getFourOfAKind(baseAndPlayer);
    if (fourOfAKind) {
      return {
        combination: fourOfAKind,
        value: CombinationValues.fourOfAKind + getCardValues(fourOfAKind),
      };
    }
    const fullHouse = getFullHouse(baseAndPlayer);
    if (fullHouse) {
      return {
        combination: fullHouse,
        value: CombinationValues.fullHouse + getCardValues(fullHouse),
      };
    }
    const flush = getFlush(baseAndPlayer);
    if (flush) {
      return {
        combination: flush,
        value: CombinationValues.flush + getCardValues(flush),
      };
    }
    const straight = getStraight(baseAndPlayer);
    if (straight) {
      return {
        combination: straight,
        value: CombinationValues.straight + getCardValues(straight),
      };
    }
    const threeOfAKind = getThreeOfAKind(baseAndPlayer);
    if (threeOfAKind) {
      return {
        combination: threeOfAKind,
        value: CombinationValues.threeOfAKind + getCardValues(threeOfAKind),
      };
    }
    const twoPairs = getTwoPairs(baseAndPlayer);
    if (twoPairs) {
      return {
        combination: twoPairs,
        value: CombinationValues.twoPairs + getCardValues(twoPairs),
      };
    }
    const pair = getPair(baseAndPlayer);
    if (pair) {
      return {
        combination: pair,
        value: CombinationValues.pair + getCardValues(pair),
      };
    }
    const highCard = getHighCard(baseAndPlayer);
    if (highCard) {
      return {
        combination: highCard,
        value: CombinationValues.highCard + getCardValues(highCard),
      };
    }
  };

  // Retrieves the result and sorts the combinations accordin to the rules of the task
  const result = allPlayersCards
    .map((onePlayerCards) => {
      return getValueAndCombination(baseCards, onePlayerCards);
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
