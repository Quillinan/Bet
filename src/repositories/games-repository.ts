import { prisma } from "@/database";
import { CreateGameParams, FinishGameParams } from "@/services/games-service";

async function create(data: CreateGameParams) {
  return prisma.game.create({
    data,
  });
}

async function finish(gameId: number, data: FinishGameParams) {
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

async function findAll() {
  return prisma.game.findMany();
}

async function findOne(gameId: number) {
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
  create,
  finish,
  findAll,
  findOne,
  checkGame,
};
