import { Card, GameState } from "./GameState";

export class Player {
  public betRequest(gameState: GameState, betCallback: (bet: number) => void): void {
    console.log(gameState);

    const ourId = gameState.in_action;
    const ourPlayer = gameState.players[ourId];

    console.log(`We are ${ourPlayer}`);

    if (this.doWeHaveGoodCards(ourPlayer.hole_cards)) {
      betCallback(50000);
    } else {
      betCallback(0);
    }

    console.error(gameState);
  }

  doWeHaveGoodCards = (cards: Card[]) => {
    const card1 = cards[0];
    const card2 = cards[1];

    if (card1.rank === card2.rank) {
      if (card1.rank === 'A' || card1.rank === 'K' || card1.rank === 'Q' || card1.rank === 'J' || card1.rank === '10' || card1.rank === '9' || card1.rank === '8' || card1.rank === '7' || card1.rank === '6' || card1.rank === '5') {
        return true;
      }
    }

    if (card1.rank === 'A' && ['K', 'Q', 'J', '10'].indexOf(card2.rank) !== -1) {
      return true;
    }

    return false;
  }

  public showdown(gameState: any): void {

  }
}

export default Player;
