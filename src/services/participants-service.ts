import { notFoundError } from "@/errors";
import { participantsRepository } from "@/repositories";
import { Participant } from "@prisma/client";

async function createParticipant({
  name,
  balance,
}: CreateParticipantParams): Promise<Participant> {
  return participantsRepository.createParticipant({ name, balance });
}

async function findAllParticipants() {
  const participants = await participantsRepository.findManyParticipants();
  if (participants.length === 0) throw notFoundError();

  return participants;
}

export type CreateParticipantParams = Pick<Participant, "name" | "balance">;

export const participantsService = {
  createParticipant,
  findAllParticipants,
};
