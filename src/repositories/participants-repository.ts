import { prisma } from "@/database";
import { CreateParticipantParams } from "@/services/participants-service";

async function create(data: CreateParticipantParams) {
  return prisma.participant.create({
    data,
  });
}

export const participantsRepository = {
  create,
};
