import { Card, GameState } from "./GameState";

export class Player {
  public betRequest(
    gameState: GameState,
    betCallback: (bet: number) => void
  ): void {
    //console.log(gameState);

    const ourId = gameState.in_action;
    const ourPlayer = gameState.players[ourId];
    const commCards = gameState.community_cards;

    console.log(`We are ${ourPlayer}`);

    betCallback(
      this.howManyMoneyShouldWeSet(ourPlayer.hole_cards, commCards, gameState)
    );

    console.error(gameState);
  }

  howManyMoneyShouldWeSet = (
    cards: Card[],
    commCards: Card[],
    gameState: GameState
  ) => {
    const card1 = cards[0];
    const card2 = cards[1];

    const ourId = gameState.in_action;
    const ourPlayer = gameState.players[ourId];
    const toCall = gameState.current_buy_in - ourPlayer.bet;

    const communityCards = gameState.community_cards;

    const activePlayers = gameState.players.filter(
      (x) => x.status === "active"
    );

    if (communityCards.length === 0) {
      if (card1.rank === card2.rank) {
        if (
          card1.rank === "A" ||
          card1.rank === "K" ||
          card1.rank === "Q" ||
          card1.rank === "J" ||
          (card1.rank === "10" && activePlayers.length < 4) ||
          (card1.rank === "9" && activePlayers.length < 4) ||
          (card1.rank === "8" && activePlayers.length < 4) ||
          (card1.rank === "7" && activePlayers.length < 4) ||
          (card1.rank === "6" && activePlayers.length < 4) ||
          (card1.rank === "5" && activePlayers.length < 3) ||
          (card1.rank === "4" && activePlayers.length < 3) ||
          (card1.rank === "3" && activePlayers.length < 3) ||
          (card1.rank === "2" && activePlayers.length < 3)
        ) {
          return 10000;
        } else if (gameState.bet_index === 0) {
          return gameState.minimum_raise;
        }
      }

      if (
        ["A", "K", "Q", "J", "10"].indexOf(card2.rank) !== -1 &&
        ["A", "K", "Q", "J", "10"].indexOf(card1.rank) !== -1
      ) {
        if (gameState.bet_index === 0) {
          return gameState.minimum_raise;
        } else {
          if ((toCall * 100) / ourPlayer.stack < 10) {
            return toCall;
          } else {
            return 0;
          }
        }
      }

      if (
        ["A", "K", "Q", "J", "10", "9", "8"].indexOf(card1.rank) !== -1 &&
        ["A", "K", "Q", "J", "10", "9", "8"].indexOf(card2.rank) !== -1
      ) {
        if ((toCall * 100) / ourPlayer.stack < 10) {
          return toCall;
        } else {
          return 0;
        }
      }
    } else {
      let sameCard = 0;
      for (let index = 0; index < communityCards.length; index++) {
        if (
          communityCards[index].rank == card1.rank ||
          communityCards[index].rank == card2.rank
        ) {
          sameCard++;
        }
      }

      if (sameCard > 1) {
        // Two-Pair or Set (3 of a kind)
        return 10000;
      } else if (sameCard > 0) {
        // One Pair
        return toCall;
      }
    }

    return 0;
    // return toCall === gameState.small_blind * 2 ? gameState.small_blind * 2 : 0;
  };

  public showdown(gameState: any): void {}
}

export default Player;
