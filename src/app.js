import readline from 'readline'; // Readline provides an interface for reading data from a readable stream, one line at a time

let rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false,
});

const CardValues = {
  // Using a binary map representation to determine value for every card
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
  // Adding a value to every combination/hand
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
const getTwoPairs = (cards) => {
  const sortedCardsByValue = cards
    .map((cardWithSuite) => {
      const cardNameOnly = cardWithSuite.split('')[0];
      return { card: cardWithSuite, value: CardValues[cardNameOnly] };
    })
    .sort((a, b) => {
      return a.value < b.value ? 1 : -1;
    });
  let firstPair = undefined;
  for (let i = 0; i < sortedCardsByValue.length - 1; i++) {
    if (sortedCardsByValue[i].value === sortedCardsByValue[i + 1].value) {
      if (firstPair === undefined) {
        firstPair = [
          sortedCardsByValue[i].card,
          sortedCardsByValue[i + 1].card,
        ];
        i++;
      } else
        return [
          ...firstPair,
          sortedCardsByValue[i].card,
          sortedCardsByValue[i + 1].card,
        ];
    }
  }
  return null;
};
const getThreeOfAKind = (cards) => {
  const sortedCardsByValue = cards
    .map((cardWithSuite) => {
      const cardNameOnly = cardWithSuite.split('')[0];
      return { card: cardWithSuite, value: CardValues[cardNameOnly] };
    })
    .sort((a, b) => {
      return a.value < b.value ? 1 : -1;
    });
  for (let i = 0; i < sortedCardsByValue.length - 1; i++) {
    if (
      sortedCardsByValue[i].value === sortedCardsByValue[i + 1].value &&
      sortedCardsByValue[i + 1].value === sortedCardsByValue[i + 2].value
    ) {
      return [
        sortedCardsByValue[i].card,
        sortedCardsByValue[i + 1].card,
        sortedCardsByValue[i + 2].card,
      ];
    }
  }
  return null;
};
const getStraight = (cards) => {
  const sortedCardsByValue = cards
    .map((cardWithSuite) => {
      const cardNameOnly = cardWithSuite.split('')[0];
      return { card: cardWithSuite, value: CardValues[cardNameOnly] };
    })
    .sort((a, b) => {
      return a.value < b.value ? 1 : -1;
    });
  for (let i = 0; i < sortedCardsByValue.length - 3; i++) {
    if (
      sortedCardsByValue[i].value === sortedCardsByValue[i + 1].value - 1 &&
      sortedCardsByValue[i + 1].value === sortedCardsByValue[i + 2].value - 1 &&
      sortedCardsByValue[i + 2].value === sortedCardsByValue[i + 3].value - 1 &&
      sortedCardsByValue[i + 3].value === sortedCardsByValue[i + 4].value - 1
    ) {
      return [
        sortedCardsByValue[i].card,
        sortedCardsByValue[i + 1].card,
        sortedCardsByValue[i + 2].card,
        sortedCardsByValue[i + 3].card,
        sortedCardsByValue[i + 4].card,
      ];
    }
  }
  return null;
};
const getFlush = (cards) => {
  const sortedCardsByValue = cards
    .map((cardWithSuite) => {
      const [cardNameOnly, cardSuite] = cardWithSuite.split('');
      return {
        card: cardWithSuite,
        suite: cardSuite,
        value: CardValues[cardNameOnly],
      };
    })
    .sort((a, b) => {
      return a.value < b.value ? 1 : -1;
    });
  const cardsWithS = sortedCardsByValue.filter((card) => card.suite === 's');
  const cardsWithH = sortedCardsByValue.filter((card) => card.suite === 'h');
  const cardsWithD = sortedCardsByValue.filter((card) => card.suite === 'd');
  const cardsWithC = sortedCardsByValue.filter((card) => card.suite === 'c');
  console.log(cardsWithC, cardsWithH, cardsWithD, cardsWithS);

  if (cardsWithS.length >= 5) {
    return [
      cardsWithS[0],
      cardsWithS[1],
      cardsWithS[2],
      cardsWithS[3],
      cardsWithS[4],
    ];
  }
  if (cardsWithH.length >= 5) {
    return [
      cardsWithH[0],
      cardsWithH[1],
      cardsWithH[2],
      cardsWithH[3],
      cardsWithH[4],
    ];
  }
  if (cardsWithD.length >= 5) {
    return [
      cardsWithD[0].card,
      cardsWithD[1].card,
      cardsWithD[2].card,
      cardsWithD[3].card,
      cardsWithD[4].card,
    ];
  }
  if (cardsWithC.length >= 5) {
    return [
      cardsWithC[0],
      cardsWithC[1],
      cardsWithC[2],
      cardsWithC[3],
      cardsWithC[4],
    ];
  }

  return null;
};
const getFullHouse = (cards) => {
  const sortedCardsByValue = cards
    .map((cardWithSuite) => {
      const cardNameOnly = cardWithSuite.split('')[0];
      return { card: cardWithSuite, value: CardValues[cardNameOnly] };
    })
    .sort((a, b) => {
      return a.value < b.value ? 1 : -1;
    });
  let firstTwo = undefined;
  let firstThree = undefined;
  for (let i = 0; i < sortedCardsByValue.length - 1; i++) {
    if (
      firstThree === undefined &&
      sortedCardsByValue[i].value === sortedCardsByValue[i + 1].value &&
      sortedCardsByValue[i + 1].value === sortedCardsByValue[i + 2].value
    ) {
      firstThree = [
        sortedCardsByValue[i].card,
        sortedCardsByValue[i + 1].card,
        sortedCardsByValue[i + 2].card,
      ];
      i += 2;
      continue;
    }

    if (
      firstTwo === undefined &&
      sortedCardsByValue[i].value === sortedCardsByValue[i + 1].value
    ) {
      firstTwo = [sortedCardsByValue[i].card, sortedCardsByValue[i + 1].card];
      i++;
    }
    if (firstThree && firstTwo) {
      return [...firstThree, ...firstTwo];
    }
  }
  return null;
};
const getFourOfAKind = (cards) => {
  const sortedCardsByValue = cards
    .map((cardWithSuite) => {
      const cardNameOnly = cardWithSuite.split('')[0];
      return { card: cardWithSuite, value: CardValues[cardNameOnly] };
    })
    .sort((a, b) => {
      return a.value < b.value ? 1 : -1;
    });
  for (let i = 0; i < sortedCardsByValue.length - 1; i++) {
    if (
      sortedCardsByValue[i].value === sortedCardsByValue[i + 1].value &&
      sortedCardsByValue[i + 1].value === sortedCardsByValue[i + 2].value &&
      sortedCardsByValue[i + 2].value === sortedCardsByValue[i + 3].value
    ) {
      return [
        sortedCardsByValue[i].card,
        sortedCardsByValue[i + 1].card,
        sortedCardsByValue[i + 2].card,
        sortedCardsByValue[i + 3].card,
      ];
    }
  }
  return null;
};
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

  // Retrieves the result and sorts the combinations according to the rules of the task
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
