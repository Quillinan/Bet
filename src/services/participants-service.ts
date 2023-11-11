import { invalidDataError, notFoundError } from "@/errors";
import { participantsRepository } from "@/repositories";
import { Participant } from "@prisma/client";

async function createParticipant({
  name,
  balance,
}: CreateParticipantParams): Promise<Participant> {
  if (balance < 1000)
    throw invalidDataError("Balance must be greater than 1000");

  return participantsRepository.create({ name, balance });
}

async function findParticipants() {
  const participants = await participantsRepository.findAll();
  if (participants.length === 0) throw notFoundError();

  return participants;
}

export type CreateParticipantParams = Pick<Participant, "name" | "balance">;

export const participantsService = {
  createParticipant,
  findParticipants,
};
