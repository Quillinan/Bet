import { prisma } from "@/database";
import { CreateParticipantParams } from "@/services/participants-service";

async function create(data: CreateParticipantParams) {
  return prisma.participant.create({
    data,
  });
}

async function findAll() {
  return prisma.participant.findMany();
}

export const participantsRepository = {
  create,
  findAll,
};
