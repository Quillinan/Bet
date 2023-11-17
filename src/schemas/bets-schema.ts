import { CreateBetParams } from "@/services";
import Joi from "joi";

export const createBetSchema = Joi.object<CreateBetParams>({
  homeTeamScore: Joi.number().min(0).required(),
  awayTeamScore: Joi.number().min(0).required(),
  amountBet: Joi.number().min(1).required(),
  gameId: Joi.number().required(),
  participantId: Joi.number().required(),
});
