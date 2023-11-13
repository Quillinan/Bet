import { gamesService } from "@/services";
import { Request, Response } from "express";
import httpStatus from "http-status";

async function gamePost(req: Request, res: Response) {
  const { homeTeamName, awayTeamName } = req.body;

  const game = await gamesService.createGame({
    homeTeamName,
    awayTeamName,
  });

  return res.status(httpStatus.CREATED).json({
    id: game.id,
    createdAt: game.createdAt,
    updatedAt: game.updatedAt,
    homeTeamName: game.homeTeamName,
    awayTeamName: game.awayTeamName,
    homeTeamScore: game.homeTeamScore,
    awayTeamScore: game.awayTeamScore,
    isFinished: game.isFinished,
  });
}

async function gameFinish(req: Request, res: Response) {
  const { homeTeamScore, awayTeamScore } = req.body;
  const gameId = Number(req.params.id);

  const game = await gamesService.finishGame(gameId, {
    homeTeamScore,
    awayTeamScore,
  });

  return res.status(httpStatus.OK).json({
    id: game.id,
    createdAt: game.createdAt,
    updatedAt: game.updatedAt,
    homeTeamName: game.homeTeamName,
    awayTeamName: game.awayTeamName,
    homeTeamScore: game.homeTeamScore,
    awayTeamScore: game.awayTeamScore,
    isFinished: game.isFinished,
  });
}

async function gamesGet(_: Request, res: Response): Promise<Response> {
  const games = await gamesService.findGames();
  return res.status(httpStatus.OK).send(games);
}

async function gameGetWithBets(req: Request, res: Response) {
  const gameId = Number(req.params.id);

  const gamesWithBets = await gamesService.findOneGame(gameId);
  res.status(httpStatus.OK).send(gamesWithBets);
}

export const gamesController = {
  gamePost,
  gameFinish,
  gamesGet,
  gameGetWithBets,
};
