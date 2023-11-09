import { prisma } from "@/database";
import { CreateGameParams } from "@/services/games-service";

async function create(data: CreateGameParams) {
  return prisma.game.create({
    data,
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
  findAll,
  findOne,
};
