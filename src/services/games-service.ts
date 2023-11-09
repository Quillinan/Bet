import { invalidDataError, notFoundError } from "@/errors";
import { gamesRepository } from "@/repositories";
import { Game } from "@prisma/client";

async function createGame({
  homeTeamName,
  awayTeamName,
}: CreateGameParams): Promise<Game> {
  return gamesRepository.create({ homeTeamName, awayTeamName });
}

export type CreateGameParams = Pick<Game, "homeTeamName" | "awayTeamName">;

async function finishGame(
  gameId: number,
  { homeTeamScore, awayTeamScore }: FinishGameParams
): Promise<Game> {
  const game = await validateGame(gameId);

  if (game.isFinished) throw invalidDataError("Game is already finished");

  const bets = game.Bets;

  for (const bet of bets) {
    if (
      bet.homeTeamScore !== homeTeamScore ||
      bet.awayTeamScore !== awayTeamScore
    ) {
      await gamesRepository.updateBet(bet.id, "LOST", 0);
    } else {
      await gamesRepository.updateBet(bet.id, "WON", bet.amountBet);
    }
  }

  return gamesRepository.finish(gameId, { homeTeamScore, awayTeamScore });
}

export type FinishGameParams = Pick<Game, "homeTeamScore" | "awayTeamScore">;

async function findGames() {
  const games = await gamesRepository.findAll();
  if (games.length === 0) throw notFoundError;

  return games;
}

async function findOneGame(gameId: number) {
  await validateGame(gameId);
  const gameWithBets = await gamesRepository.findOne(gameId);
  if (!gameWithBets) throw notFoundError;

  return gameWithBets;
}

async function validateGame(gameId: number) {
  if (!gameId || isNaN(gameId)) throw invalidDataError("gameId");

  const game = await gamesRepository.findOne(gameId);
  if (!game) throw notFoundError;

  return game;
}

export const gamesService = {
  createGame,
  findGames,
  findOneGame,
  finishGame,
};
