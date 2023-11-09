import { CreateGameParams, UpdateGameParams } from "@/services";
import Joi from "joi";

export const createGameSchema = Joi.object<CreateGameParams>({
  homeTeamName: Joi.string().required(),
  awayTeamName: Joi.string().required(),
});

export const finishGameSchema = Joi.object<UpdateGameParams>({
  homeTeamScore: Joi.number().required(),
  awayTeamScore: Joi.number().required(),
});
