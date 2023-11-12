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
  amountBet: params.amountBet || faker.number.int({ min: 1000, max: 10000 }),
  gameId: params.gameId || faker.number.int(),
  participantId: params.participantId || faker.number.int(),
  status: params.status,
  amountWon: params.amountWon,
});

export const generateNotValidBetHome = (params: Partial<Bet> = {}) => ({
  homeTeamScore: params.homeTeamScore || faker.company.name(),
  awayTeamScore: params.awayTeamScore || faker.number.int({ min: 0, max: 9 }),
  amountBet: params.amountBet || faker.number.int({ min: 1000, max: 10000 }),
  gameId: params.gameId || faker.number.int(),
  participantId: params.participantId || faker.number.int(),
});

export const generateNotValidBetAway = (params: Partial<Bet> = {}) => ({
  homeTeamScore: params.homeTeamScore || faker.number.int({ min: 0, max: 9 }),
  awayTeamScore: params.awayTeamScore || faker.company.name(),
  amountBet: params.amountBet || faker.number.int({ min: 1000, max: 10000 }),
  gameId: params.gameId || faker.number.int(),
  participantId: params.participantId || faker.number.int(),
});

export const generateNotValidBetAmount = (params: Partial<Bet> = {}) => ({
  homeTeamScore: params.homeTeamScore || faker.number.int({ min: 0, max: 9 }),
  awayTeamScore: params.awayTeamScore || faker.number.int({ min: 0, max: 9 }),
  amountBet: params.amountBet || faker.company.name(),
  gameId: params.gameId || faker.number.int(),
  participantId: params.participantId || faker.number.int(),
});

export const generateNotValidBetGame = (params: Partial<Bet> = {}) => ({
  homeTeamScore: params.homeTeamScore || faker.number.int({ min: 0, max: 9 }),
  awayTeamScore: params.awayTeamScore || faker.number.int({ min: 0, max: 9 }),
  amountBet: params.amountBet || faker.number.int({ min: 1000, max: 10000 }),
  gameId: params.gameId || faker.company.name(),
  participantId: params.participantId || faker.number.int(),
});

export const generateNotValidBetParticipant = (params: Partial<Bet> = {}) => ({
  homeTeamScore: params.homeTeamScore || faker.number.int({ min: 0, max: 9 }),
  awayTeamScore: params.awayTeamScore || faker.number.int({ min: 0, max: 9 }),
  amountBet: params.amountBet || faker.number.int({ min: 1000, max: 10000 }),
  gameId: params.gameId || faker.number.int(),
  participantId: params.participantId || faker.company.name(),
});
