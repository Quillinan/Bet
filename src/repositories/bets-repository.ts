import { prisma } from "@/database";
import { CreateBetParams } from "@/services";

async function create(data: CreateBetParams) {
  return prisma.bet.create({
    data,
  });
}

async function updateBet(betId: number, status?: string, amountWon?: number) {
  return prisma.bet.update({
    where: { id: betId },
    data: { status, amountWon },
  });
}

export const betsRepository = {
  create,
  updateBet,
};
