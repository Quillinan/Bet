import { invalidDataError } from "@/errors";
import {
  betsRepository,
  gamesRepository,
  participantsRepository,
} from "@/repositories";
import { Bet } from "@prisma/client";

async function createBet({
  homeTeamScore,
  awayTeamScore,
  amountBet,
  gameId,
  participantId,
}: CreateBetParams): Promise<Bet> {
  await validateBet(amountBet, gameId, participantId);
  await participantsRepository.reduceBalance(participantId, amountBet);
  return betsRepository.create({
    homeTeamScore,
    awayTeamScore,
    amountBet,
    gameId,
    participantId,
  });
}

export type CreateBetParams = Pick<
  Bet,
  "homeTeamScore" | "awayTeamScore" | "amountBet" | "gameId" | "participantId"
>;

export const betsService = {
  createBet,
};

async function validateBet(
  amountBet: number,
  gameId: number,
  participantId: number
) {
  const checkBalance = await participantsRepository.checkBalance(
    participantId,
    amountBet
  );
  if (!checkBalance) throw invalidDataError("Balance is not enough");
  const checkGame = await gamesRepository.check(gameId);
  if (!checkGame) throw invalidDataError("Game is invalid");
}
