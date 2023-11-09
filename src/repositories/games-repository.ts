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

async function findOne(id: number) {
  return prisma.game.findUnique({
    where: {
      id,
    },
    include: {
      Bets: true,
    },
  });
}

export const gamesRepository = {
  create,
  findAll,
};
