import { FilterGamesParams, gamesService } from "@/services";
import { Game } from "@prisma/client";
import { Request, Response } from "express";
import httpStatus from "http-status";

async function formatGameResponse(res: Response, status: number, game: Game) {
  return res.status(status).json({
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

async function postGame(req: Request, res: Response) {
  const { homeTeamName, awayTeamName } = req.body;

  const game = await gamesService.createGame({
    homeTeamName,
    awayTeamName,
  });

  return formatGameResponse(res, httpStatus.CREATED, game);
}

async function finishGame(req: Request, res: Response) {
  const { homeTeamScore, awayTeamScore } = req.body;
  const gameId = Number(req.params.id);

  const game = await gamesService.finishGame(gameId, {
    homeTeamScore,
    awayTeamScore,
  });

  return formatGameResponse(res, httpStatus.OK, game);
}

async function getAllGames(req: Request, res: Response): Promise<Response> {
  const { homeTeamName, awayTeamName, isFinished } = req.query;

  const gamesParams: FilterGamesParams = {
    homeTeamName: typeof homeTeamName === "string" ? homeTeamName : undefined,
    awayTeamName: typeof awayTeamName === "string" ? awayTeamName : undefined,
    isFinished: typeof isFinished === "string" ? isFinished : undefined,
  };

  const games = await gamesService.findAllGames(gamesParams);
  return res.status(httpStatus.OK).send(games);
}

async function getGameWithBets(req: Request, res: Response) {
  const gameId = Number(req.params.id);

  const gamesWithBets = await gamesService.findOneGame(gameId);
  res.status(httpStatus.OK).send(gamesWithBets);
}

export const gamesController = {
  postGame,
  finishGame,
  getAllGames,
  getGameWithBets,
};
