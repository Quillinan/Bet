import { betsRepository } from "@/repositories";
import { Bet } from "@prisma/client";

async function createBet({
  homeTeamScore,
  awayTeamScore,
  amountBet,
  gameId,
  participantId,
}: CreateBetParams): Promise<Bet> {
  amountBet = amountBet * 100;
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
