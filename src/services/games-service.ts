import { invalidDataError, notFoundError } from "@/errors";
import {
  betsRepository,
  gamesRepository,
  participantsRepository,
} from "@/repositories";
import { Bet, Game } from "@prisma/client";

async function createGame({
  homeTeamName,
  awayTeamName,
}: CreateGameParams): Promise<Game> {
  return gamesRepository.create({ homeTeamName, awayTeamName });
}

export type CreateGameParams = Pick<Game, "homeTeamName" | "awayTeamName">;

async function findGames() {
  const games = await gamesRepository.findAll();

  if (games.length === 0) throw notFoundError();

  return games;
}

async function findOneGame(gameId: number) {
  await validateGame(gameId);

  const gameWithBets = await gamesRepository.findOne(gameId);

  return gameWithBets;
}

async function finishGame(
  gameId: number,
  { homeTeamScore, awayTeamScore }: FinishGameParams
): Promise<Game> {
  const game = await validateGame(gameId);

  if (game.isFinished) throw invalidDataError("Game is already finished");
  const bets = game.Bets;

  const totals = await checkBets(bets, homeTeamScore, awayTeamScore);

  const updatedBets = (await findOneGame(game.id)).Bets;

  await updateBetWinners(updatedBets, totals.total, totals.totalWinners);

  return gamesRepository.finish(gameId, { homeTeamScore, awayTeamScore });
}

export type FinishGameParams = Pick<Game, "homeTeamScore" | "awayTeamScore">;

export const gamesService = {
  createGame,
  findGames,
  findOneGame,
  finishGame,
};

async function validateGame(gameId: number) {
  if (!gameId || isNaN(gameId)) throw invalidDataError("gameId is not valid");
  const game = await gamesRepository.findOne(gameId);
  if (!game) throw notFoundError();

  return game;
}

export async function checkBets(
  bets: Partial<Bet[]>,
  homeTeamScore: number,
  awayTeamScore: number
) {
  let total = 0;
  let totalWinners = 0;
  for (const bet of bets) {
    total += bet.amountBet;
    if (
      bet.homeTeamScore == homeTeamScore &&
      bet.awayTeamScore == awayTeamScore
    ) {
      await betsRepository.updateBet(bet.id, "WON");
      totalWinners += bet.amountBet;
    } else {
      await betsRepository.updateBet(bet.id, "LOST", 0);
    }
  }
  return { total, totalWinners };
}

export async function updateBetWinners(
  bets: Bet[],
  total: number,
  totalWinners: number
) {
  for (const bet of bets) {
    if (bet.status == "WON") {
      const amountBet = calculateWinnerAmount(
        total,
        totalWinners,
        bet.amountBet
      );
      await betsRepository.updateBet(bet.id, undefined, amountBet);
      await participantsRepository.updateWinner(bet.participantId, amountBet);
    }
  }
}

export function calculateWinnerAmount(
  total: number,
  totalWinners: number,
  participantAmount: number
): number {
  const tax = 0.3;
  const amountWon = (participantAmount / totalWinners) * total * (1 - tax);
  return Math.floor(amountWon);
}
