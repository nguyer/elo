import fs from "fs";
import Game from "./Game.js";

export const readCsv = async (path: string): Promise<Game[]> => {
  const games: Game[] = [];

  const rawCsv = await fs.promises.readFile(path);
  const rows = rawCsv.toString().split("\n");

  for (let i = 1; i < rows.length; i++) {
    const columns = rows[i].split(",");
    if (columns.length >= 2) {
      games.push(new Game(columns[0].trim(), columns[1].trim()));
    }
  }

  return games;
};
