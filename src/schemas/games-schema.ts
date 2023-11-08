import { CreateGameParams } from "@/services";
import Joi from "joi";

export const createGameSchema = Joi.object<CreateGameParams>({
  homeTeamName: Joi.string().required(),
  awayTeamName: Joi.string().required(),
});
