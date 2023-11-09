import { CreateBetParams } from "@/services";
import Joi from "joi";

export const createBetSchema = Joi.object<CreateBetParams>({
  homeTeamScore: Joi.number().required(),
  awayTeamScore: Joi.number().required(),
  amountBet: Joi.number().required(),
  gameId: Joi.number().required(),
  participantId: Joi.number().required(),
});
