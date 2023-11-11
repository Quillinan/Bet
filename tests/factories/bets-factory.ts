import { prisma } from "@/database";
import { faker } from "@faker-js/faker";
import { Bet } from "@prisma/client";

export async function createBet(params: Partial<Bet> = {}): Promise<Bet> {
  return prisma.bet.create({
    data: generateValidBetBody(params),
  });
}

export const generateValidBetBody = (params: Partial<Bet> = {}) => ({
  homeTeamScore: params.homeTeamScore || faker.number.int({ min: 0, max: 9 }),
  awayTeamScore: params.awayTeamScore || faker.number.int({ min: 0, max: 9 }),
  amountBet: params.amountBet || faker.number.int(),
  gameId: params.gameId || faker.number.int(),
  participantId: params.participantId || faker.number.int(),
});

export const generateNotValidBet = (params: Partial<Bet> = {}) => ({
  homeTeamScore: params.homeTeamScore || faker.company.name(),
  awayTeamScore: params.awayTeamScore || faker.company.name(),
  amountBet: params.amountBet || faker.company.name(),
  gameId: params.gameId || faker.company.name(),
  participantId: params.participantId || faker.company.name(),
});
