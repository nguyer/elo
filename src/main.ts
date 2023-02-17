//create object with K-Factor(without it defaults to 32)
import EloRank from "elo-rank";
import { readCsv } from "./csv";
var elo = new EloRank();

const DEFAULT_RATING = 1500;

var playerA = 1200;
var playerB = 1400;

//Gets expected score for first parameter
var expectedScoreA = elo.getExpected(playerA, playerB);
var expectedScoreB = elo.getExpected(playerB, playerA);

//update score, 1 if won 0 if lost
playerA = elo.updateRating(expectedScoreA, 1, playerA);
playerB = elo.updateRating(expectedScoreB, 0, playerB);

console.log(playerA);
console.log(playerB);

const rankings = new Map<string, number>([]);

const computeElo = async () => {
  const games = await readCsv("./games.csv");

  for (const game of games) {
    const previousWinnerRating = rankings.get(game.winner) || DEFAULT_RATING;
    const previousLoserRating = rankings.get(game.loser) || DEFAULT_RATING;
    const expectedWinnerRating = elo.getExpected(
      previousWinnerRating,
      previousLoserRating
    );
    const expectedLoserRating = elo.getExpected(
      previousLoserRating,
      previousWinnerRating
    );
    const updatedWinnerRating = elo.updateRating(
      expectedWinnerRating,
      1,
      previousWinnerRating
    );
    const updatedLoserRating = elo.updateRating(
      expectedLoserRating,
      0,
      previousLoserRating
    );
    rankings.set(game.winner, updatedWinnerRating);
    rankings.set(game.loser, updatedLoserRating);
  }

  const mapSort1 = new Map([...rankings.entries()].sort((a, b) => b[1] - a[1]));
  return mapSort1;
};

computeElo().then(console.log);
