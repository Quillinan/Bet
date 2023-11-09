import { prisma } from "@/database";
import { CreateBetParams } from "@/services";

async function create(data: CreateBetParams) {
  return prisma.bet.create({
    data,
  });
}

export const betsRepository = {
  create,
};
