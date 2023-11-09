import { betsService } from "@/services";
import { Request, Response } from "express";
import httpStatus from "http-status";

async function betPost(req: Request, res: Response) {
  const { homeTeamScore, awayTeamScore, amountBet, gameId, participantId } =
    req.body;

  const bet = await betsService.createBet({
    homeTeamScore,
    awayTeamScore,
    amountBet,
    gameId,
    participantId,
  });

  return res.status(httpStatus.CREATED).json({
    id: bet.id,
    createdAt: bet.createdAt,
    updatedAt: bet.updatedAt,
    homeTeamScore: bet.homeTeamScore,
    awayTeamScore: bet.awayTeamScore,
    amountBet: bet.amountBet,
    gameId: bet.gameId,
    participantId: bet.participantId,
    status: bet.status,
    amountWon: bet.amountWon,
  });
}

export const betsController = {
  betPost,
};
