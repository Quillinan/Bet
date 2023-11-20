import { prisma } from "@/database";
import {
  CreateGameParams,
  FilterGamesParams,
  FinishGameParams,
} from "@/services/games-service";
import { Game } from "@prisma/client";

async function createGame(data: CreateGameParams) {
  return prisma.game.create({
    data,
  });
}

async function updateFinishedGame(gameId: number, data: FinishGameParams) {
  return await prisma.game.update({
    where: {
      id: gameId,
    },
    data: {
      homeTeamScore: data.homeTeamScore,
      awayTeamScore: data.awayTeamScore,
      isFinished: true,
    },
  });
}

async function findManyGames(params: FilterGamesParams): Promise<Game[]> {
  const where: GameWhereInput = {};
  if (params.homeTeamName) {
    where.homeTeamName = {contains: params.homeTeamName,};
  }
  if (params.awayTeamName) {
    where.awayTeamName = {contains: params.awayTeamName,};
  }
  if (params.isFinished !== undefined && params.isFinished === "true") {
    where.isFinished = Boolean(params.isFinished) == true;
  }
  if (params.isFinished !== undefined && params.isFinished === "false") {
    where.isFinished = false;
  }
  return prisma.game.findMany({where,});
}

type GameWhereInput = {
  homeTeamName?: {
    contains: string;
  };
  awayTeamName?: {
    contains: string;
  };
  isFinished?: boolean;
};

async function findOneGame(gameId: number) {
  return prisma.game.findUnique({
    where: {
      id: gameId,
    },
    include: {
      Bets: true,
    },
  });
}

async function checkGame(gameId: number): Promise<boolean> {
  const game = await prisma.game.findUnique({
    where: { id: gameId },
  });

  return game ? !game.isFinished : false;
}

export const gamesRepository = {
  createGame,
  updateFinishedGame,
  findManyGames,
  findOneGame,
  checkGame,
};
