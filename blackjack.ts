interface CardsProps {
  cardValues: number[];
  cardStringsValues: string[];
  cardSuits: {
    hearts: string;
    diamonds: string;
    spades: string;
    clubs: string;
  };
}
let options: string[] = [];
const cardsProps: CardsProps = {
  cardValues: [2, 3, 4, 5, 6, 7, 8, 9, 10, 10, 10, 10, 11 | 1],
  cardStringsValues: [
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "10",
    "J",
    "Q",
    "K",
    "A",
  ],
  cardSuits: {
    hearts: "♥",
    diamonds: "♦",
    spades: "♠",
    clubs: "♣",
  },
};
class Card {
  cardValue: number;
  cardStringValue: string;
  cardSuit: string;
  constructor(value: number, fakeValue: string, suit: string) {
    this.cardValue = value;
    this.cardStringValue = fakeValue;
    this.cardSuit = suit;
  }
}
let deck: Card[] = [];
let playerCards: Card[] = [];
let croupierCards: Card[] = [];

const mainGame = () => {
  const startGame = () => {
    deck = [];
    generateDeck();
    playerCards = [];
    croupierCards = [];
    croupierCards.push(grabCard());
    croupierCards.push(grabCard());
    playerCards.push(grabCard());
    playerCards.push(grabCard());
    handler();
  };

  const handler = (message = "Game has started!", croupiersTurn = false) => {
    console.clear();
    console.log(`${message}\n`);
    options = [];
    if (croupiersTurn === false) {
      if (totalValue(playerCards) > 21) {
        caseHandler("bust");
      } else if (totalValue(playerCards) === 21) {
        if (totalValue(croupierCards) != 21) {
          caseHandler("bj");
        } else {
          caseHandler("bj-push");
        }
      } else if (totalValue(croupierCards) === 21) {
        caseHandler("cbj");
      } else {
        options.push("hit", "stand");

        console.log("Crouipier's cards:" + showDeck(croupierCards));
        console.log(`Croupiers's total value: ${totalValue(croupierCards)}`);

        console.log("Your cards:" + showDeck(playerCards));
        console.log(`Player's total value: ${totalValue(playerCards)}`);
      }
    } else {
      if (totalValue(croupierCards) > 21) {
        caseHandler("croupierBust");
      } else if (totalValue(croupierCards) < totalValue(playerCards)) {
        caseHandler("playerWin");
      } else if (totalValue(croupierCards) > totalValue(croupierCards)) {
        caseHandler("playerLose");
      } else if (totalValue(croupierCards) === totalValue(croupierCards)) {
        caseHandler("push");
      } else if (totalValue(croupierCards)) {
      }
    }

    // if (deck.length === 48) {
    //   options.push("double");
    // }

    input();
  };
  const caseHandler = (event: string) => {
    let message: string = "";
    switch (event) {
      case "bust":
        message = "You lost! You exceeded 21!\n";
        break;
      case "croupierBust":
        message = "You won! Croupier exceeded 21!\n";
        break;
      case "bj":
        message = "You won! You got Black-Jack!\n";
        break;
      case "bl-push":
        message = "Draw! Both got Black-Jack!\n";
        break;
      case "push":
        message = "Draw! Both got the same value of cards!\n";
        break;
      case "cbj":
        message = "You lost! Croupier got Black-Jack!\n";
        break;

      case "playerWin":
        message = "You Win! Croupier could not match your card value\n";
        break;
      case "playerLose":
        message = "You lost! Croupier surpassed your card value\n";
        break;

      default:
        message = "Invalid event!\n";
        break;
    }

    console.log(message);

    console.log("Crouipier's cards:" + showDeck(croupierCards));
    console.log(`Croupiers's total value: ${totalValue(croupierCards)}`);

    console.log("Your cards:" + showDeck(playerCards));
    console.log(`Player's total value: ${totalValue(playerCards)}`);
    options.push("play again", "exit");
  };

  //GAME LOGIC FUNCTIONS

  /**
   * Generates a full deck of cards by combining values, string values, and suits.
   */
  const generateDeck = () => {
    const suits = Object.values(cardsProps.cardSuits);
    for (let i = 0; i < suits.length; i++) {
      for (let j = 0; j < cardsProps.cardValues.length; j++) {
        deck.push(
          new Card(
            cardsProps.cardValues[j],
            cardsProps.cardStringsValues[j],
            suits[i]
          )
        );
      }
    }
  };
  /**
   * Removes a random card from the deck and returns it.
   *
   * @returns {Card} A randomly selected card from the deck.
   */
  const grabCard = () => {
    let r = Math.floor(Math.random() * deck.length);
    let grabbed = deck[r];
    deck.splice(r, 1);
    return grabbed;
  };

  /**
   * Formats the cards in a hand as a readable string.
   *
   * @param {Card[]} hand - Array of Card objects representing a player's hand.
   * @returns {string[]} An array of strings describing the cards in the hand.
   */
  const showDeck = (hand: Card[]) => {
    let counter: string[] = [];
    for (let i = 0; i < hand.length; i++) {
      counter.push(" " + hand[i].cardStringValue + " of " + hand[i].cardSuit);
    }
    return counter;
  };

  /**
   * Calculates the total value of all cards in a given hand.
   *
   * @param {Card[]} hand - Array of Card objects representing the player's or croupier's hand.
   * @returns {number} The total value of the cards in the hand.
   */
  const totalValue = (hand: Card[]) => {
    let counter = 0;
    for (let i = 0; i < hand.length; i++) {
      counter += hand[i].cardValue;
    }
    return counter;
  };

  //User input selection
  const input = () => {
    console.log(
      `\nProvide an option, Available options: (${options.map(
        (item) => item + ":" + (options.indexOf(item) + 1)
      )})`
    );
    process.stdout.write("- Write an option: ");
    process.stdin.once("data", (data) => {
      let normalizedData = data.toString().trim().toLocaleLowerCase();
      let found = "";
      for (let i = 0; i < options.length; i++) {
        if (
          normalizedData === options[i] ||
          normalizedData === options[i].charAt(0) ||
          normalizedData === (i + 1).toString()
        ) {
          found = options[i];
        }
      }
      if (found === "") {
        if (normalizedData === found) {
          handler(
            `You must provided an option, please provide a valid option.`
          );
        } else {
          handler(
            `"${normalizedData}" is not a valid option, please provide a valid option.`
          );
        }
      } else {
        switch (found) {
          case "hit":
            playerCards.push(grabCard());
            handler(
              "You drew a card: " +
                showDeck([playerCards[playerCards.length - 1]])
            );
            break;
          case "stand":
            while (totalValue(croupierCards) <= 17) {
              croupierCards.push(grabCard());
            }
            handler("Croupiers turn...", true);
            break;
          case "play again":
            startGame();
            break;
          case "exit":
            console.clear();
            console.log(
              "Have a good time! Thanks for playing my game <3\nGame by: Dumxrg\nFind the repo of this game at https://github.com/Dumxrg/blackjack"
            );
            process.exit();

            break;
        }
      }
    });
  };

  startGame();
};
mainGame();
