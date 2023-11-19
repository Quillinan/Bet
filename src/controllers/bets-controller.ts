import { betsService } from "@/services";
import { Request, Response } from "express";
import httpStatus from "http-status";

async function postBet(req: Request, res: Response) {
  const { homeTeamScore, awayTeamScore, amountBet, gameId, participantId } = req.body;

  const bet = await betsService.createBet({
    homeTeamScore,
    awayTeamScore,
    amountBet,
    gameId,
    participantId,
  });

  const { id, createdAt, updatedAt, status, amountWon } = bet;
  const response = { id, createdAt, updatedAt, homeTeamScore, awayTeamScore, amountBet, gameId, participantId, status, amountWon };

  return res.status(httpStatus.CREATED).json(response);
}


export const betsController = {
  postBet,
};
