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

export const gamesRepository = {
  create,
  findAll,
};
