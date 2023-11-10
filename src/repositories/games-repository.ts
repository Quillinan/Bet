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

async function updateBet(betId: number, status?: string, amountWon?: number) {
  return prisma.bet.update({
    where: { id: betId },
    data: { status, amountWon },
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

export const gamesRepository = {
  create,
  finish,
  findAll,
  findOne,
  updateBet,
  updateWinner,
};
