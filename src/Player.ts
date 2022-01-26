export class Player {
  public betRequest(gameState: any, betCallback: (bet: number) => void): void {
    betCallback(50000);
    console.error(gameState);
  }

  public showdown(gameState: any): void {}
}

export default Player;
