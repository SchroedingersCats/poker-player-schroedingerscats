export class Player {
  public betRequest(gameState: any, betCallback: (bet: number) => void): void {
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

  doWeHaveGoodCards = (cards: any) => {
    const card1 = cards[0];
    const card2 = cards[1];

    if (card1.rank === card2.rank) {
      if (card1.rank === 'A' || card1.rank === 'K' || card1.rank === 'Q' || card1.rank === 'J') {
        return true;
      }
    }

    return false;
  }

  public showdown(gameState: any): void {

  }
}

export default Player;
