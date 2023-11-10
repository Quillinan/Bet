import { prisma } from "@/database";
import { Participant } from "@prisma/client";
import { faker } from "@faker-js/faker";

export async function createParticipant(
  params: Partial<Participant> = {}
): Promise<Participant> {
  return prisma.participant.create({
    data: {
      name: faker.person.firstName(),
      balance: faker.number.int({ min: 10, max: 100 }),
    },
  });
}
