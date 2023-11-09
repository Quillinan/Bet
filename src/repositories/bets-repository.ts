import { prisma } from "@/database";
import { CreateBetParams } from "@/services";

async function create(data: CreateBetParams) {
  return prisma.bet.create({
    data,
  });
}

async function checkBalance(
  participantId: number,
  requiredBalance: number
): Promise<boolean> {
  const participant = await prisma.participant.findUnique({
    where: { id: participantId },
  });

  return participant?.balance >= requiredBalance ?? false;
}

async function updateBalance(participantId: number, balanceReduction: number) {
  return prisma.participant.update({
    where: { id: participantId },
    data: {
      balance: {
        decrement: balanceReduction,
      },
    },
  });
}

async function checkGame(gameId: number): Promise<boolean> {
  const game = await prisma.game.findUnique({
    where: { id: gameId },
  });

  return game ? !game.isFinished : true;
}

export const betsRepository = {
  create,
  checkBalance,
  updateBalance,
  checkGame,
};
