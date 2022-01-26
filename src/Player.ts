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

    if (card1.rank === card2.rank) {
      if (
        card1.rank === "A" ||
        card1.rank === "K" ||
        card1.rank === "Q" ||
        card1.rank === "J" ||
        card1.rank === "10" ||
        card1.rank === "9" ||
        card1.rank === "8" ||
        card1.rank === "7" ||
        card1.rank === "6" ||
        card1.rank === "5"
      ) {
        return 5000;
      }
    }

    if (
      ["A", "K", "Q", "J", "10"].indexOf(card2.rank) !== -1 &&
      ["A", "K", "Q", "J", "10"].indexOf(card1.rank) !== -1
    ) {
      return 5000;
    }

    const toCall = gameState.current_buy_in - ourPlayer.bet;

    return toCall === gameState.small_blind * 2 ? gameState.small_blind * 2 : 0;
  };

  public showdown(gameState: any): void {}
}

export default Player;
