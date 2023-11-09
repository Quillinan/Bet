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

async function updateGame(
  gameId: number,
  { homeTeamScore, awayTeamScore }: UpdateGameParams
): Promise<Game> {
  if (!gameId || isNaN(gameId)) throw invalidDataError("gameId");

  return gamesRepository.finish(gameId, { homeTeamScore, awayTeamScore });
}

export type UpdateGameParams = Pick<Game, "homeTeamScore" | "awayTeamScore">;

async function findGames() {
  const games = await gamesRepository.findAll();
  if (games.length === 0) throw notFoundError;

  return games;
}

async function findOneGame(gameId: number) {
  if (!gameId || isNaN(gameId)) throw invalidDataError("gameId");

  const gameWithBets = await gamesRepository.findOne(gameId);
  if (!gameWithBets) throw notFoundError;

  return gameWithBets;
}

export const gamesService = {
  createGame,
  findGames,
  findOneGame,
  updateGame,
};
