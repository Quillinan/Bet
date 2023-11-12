import { invalidDataError } from "@/errors";
import { betsRepository } from "@/repositories";
import { Bet } from "@prisma/client";

async function createBet({
  homeTeamScore,
  awayTeamScore,
  amountBet,
  gameId,
  participantId,
}: CreateBetParams): Promise<Bet> {
  await validateBet(amountBet, gameId, participantId);
  await betsRepository.reduceBalance(participantId, amountBet);
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

async function validateBet(
  amountBet: number,
  gameId: number,
  participantId: number
) {
  const checkBalance = await betsRepository.checkBalance(
    participantId,
    amountBet
  );
  if (!checkBalance) throw invalidDataError("Balance is not enough");
  const checkGame = await betsRepository.checkGame(gameId);
  if (!checkGame) throw invalidDataError("Game is invalid");
}

export const betsService = {
  createBet,
};
