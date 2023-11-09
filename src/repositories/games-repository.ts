import { prisma } from "@/database";
import { CreateGameParams, UpdateGameParams } from "@/services/games-service";

async function create(data: CreateGameParams) {
  return prisma.game.create({
    data,
  });
}

async function finish(gameId: number, data: UpdateGameParams) {
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

export const gamesRepository = {
  create,
  finish,
  findAll,
  findOne,
};
