import { prisma } from "@/database";
import { CreateParticipantParams } from "@/services";

async function create(data: CreateParticipantParams) {
  return prisma.participant.create({
    data,
  });
}

async function findAll() {
  return prisma.participant.findMany();
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

async function reduceBalance(participantId: number, balanceReduction: number) {
  return prisma.participant.update({
    where: { id: participantId },
    data: {
      balance: {
        decrement: balanceReduction,
      },
    },
  });
}

async function updateWinner(participantId: number, amountWon: number) {
  return prisma.participant.update({
    where: { id: participantId },
    data: {
      balance: {
        increment: amountWon,
      },
    },
  });
}

export const participantsRepository = {
  create,
  findAll,
  checkBalance,
  reduceBalance,
  updateWinner,
};
