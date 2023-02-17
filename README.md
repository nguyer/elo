# elo

A simple tool for tracking ratings for friendly office competition.

## Get the source code

```
git clone git@github.com:nguyer/elo.git
cd elo
npm i
```

## Get some data

To generate ratings, you'll need a CSV file with a list of winners and losers like this:

```
Winner,Loser
Alice,Bob
Bob,Charlie
Alice,Charlie
```

> **NOTE**: The first line (assumed to be a header) is automatically discarded in the CSV processing

## Generate ratings

```
npm start game_data.csv

> elo@1.0.0 start
> npm run build && node dist/main.js "game_data.csv"


> elo@1.0.0 build
> rm -rf dist && npx tsc

| Name    | Elo  |
| ------- | ---- |
| Alice   | 1530 |
| Bob     | 1501 |
| Charlie | 1469 |

```

## Notes

- Currently everyone starts out with a rating of `1500`.
- The K-Factor is currently fixed at `32` and does not change based on the number of games played, or the overall rating.
