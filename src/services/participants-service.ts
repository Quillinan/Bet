import { invalidDataError, notFoundError } from "@/errors";
import { participantsRepository } from "@/repositories";
import { Participant } from "@prisma/client";

async function createParticipant({
  name,
  balance,
}: CreateParticipantParams): Promise<Participant> {
  if (balance < 10) throw invalidDataError("Balance must be greater than 10");

  balance *= 100;
  return participantsRepository.create({ name, balance });
}

async function findParticipants() {
  const participants = await participantsRepository.findAll();
  if (participants.length === 0) throw notFoundError;

  return participants;
}

export type CreateParticipantParams = Pick<Participant, "name" | "balance">;

export const participantsService = {
  createParticipant,
  findParticipants,
};
