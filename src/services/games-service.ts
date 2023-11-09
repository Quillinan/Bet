import { notFoundError } from "@/errors";
import { gamesRepository } from "@/repositories";
import { Game } from "@prisma/client";

async function createGame({
  homeTeamName,
  awayTeamName,
}: CreateGameParams): Promise<Game> {
  return gamesRepository.create({ homeTeamName, awayTeamName });
}

export type CreateGameParams = Pick<Game, "homeTeamName" | "awayTeamName">;

async function findGames() {
  const games = await gamesRepository.findAll();
  if (games.length === 0) throw notFoundError;

  return games;
}

export const gamesService = {
  createGame,
  findGames,
};
