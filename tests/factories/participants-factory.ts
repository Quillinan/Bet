import { prisma } from "@/database";
import { Participant } from "@prisma/client";
import { faker } from "@faker-js/faker";

export async function createParticipant(
  params: Partial<Participant> = {}
): Promise<Participant> {
  return prisma.participant.create({
    data: generateValidParticipantBody(params),
  });
}

export const generateValidParticipantBody = (
  params: Partial<Participant> = {}
) => ({
  name: params.name || faker.person.firstName(),
  balance: params.balance || faker.number.int({ min: 1000, max: 10000 }),
});

export const generateNotValidParticipantName = (
  params: Partial<Participant> = {}
) => ({
  name: params.name || faker.number.int({ min: 10, max: 100 }),
  balance: params.balance || faker.number.int({ min: 1000, max: 10000 }),
});

export const generateNotValidParticipantBalance = (
  params: Partial<Participant> = {}
) => ({
  name: params.name || faker.person.firstName(),
  balance: params.balance || faker.number.int({ max: 999 }),
});
