export default class Game {
  winner: string;
  loser: string;

  constructor(winner: string, loser: string) {
    this.winner = winner;
    this.loser = loser;
  }
}
