import EloRank from "elo-rank";
import { readCsv } from "./csv.js";
import { markdownTable } from "markdown-table";

const inputPath = process.argv[2];
if (!inputPath) {
  console.error("Error: No game data provided\n\nUsage: elo <game_data.csv>");
  process.exit(1);
}

const elo = new EloRank();

const DEFAULT_RATING = 1500;

const rankings = new Map<string, number>([]);

const computeElo = async () => {
  const games = await readCsv(inputPath);

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

  const sortedRankings = new Map(
    [...rankings.entries()].sort((a, b) => b[1] - a[1])
  );
  const table = [["Name", "Elo"]];
  for (const ranking of sortedRankings) {
    table.push([ranking[0], ranking[1].toString()]);
  }
  return markdownTable(table);
};

computeElo().then((res) => {
  console.log(res + "\n");
});
