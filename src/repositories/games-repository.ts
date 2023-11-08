import { prisma } from "@/database";
import { CreateGameParams } from "@/services/games-service";

async function create(data: CreateGameParams) {
  return prisma.game.create({
    data,
  });
}

export const gamesRepository = {
  create,
};
