import { prisma } from "@/database";
import { Game } from "@prisma/client";
import { faker } from "@faker-js/faker";

export async function createGame(params: Partial<Game> = {}): Promise<Game> {
  return prisma.game.create({
    data: generateValidGameBody(params),
  });
}

export async function createGameWithBets(params: Partial<Game> = {}) {
  return prisma.game.create({
    data: generateValidGameBody(params),
    include: {
      Bets: true,
    },
  });
}

export const generateValidGameBody = (params: Partial<Game> = {}) => ({
  homeTeamName: params.homeTeamName || faker.company.name(),
  awayTeamName: params.awayTeamName || faker.company.name(),
  isFinished: params.isFinished,
});

export const generateNotValidGameHome = (params: Partial<Game> = {}) => ({
  homeTeamName: params.homeTeamName || faker.number.int({ min: 0, max: 9 }),
  awayTeamName: params.awayTeamName || faker.company.name(),
});

export const generateNotValidGameAway = (params: Partial<Game> = {}) => ({
  homeTeamName: params.homeTeamName || faker.company.name(),
  awayTeamName: params.awayTeamName || faker.number.int({ min: 0, max: 9 }),
});
