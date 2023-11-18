import { prisma } from "@/database";
import { CreateGameParams, FinishGameParams } from "@/services/games-service";

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

async function findManyGames() {
  return prisma.game.findMany();
}

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
