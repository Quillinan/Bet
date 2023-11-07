import { CreateParticipantParams } from "@/services/participants-service";
import Joi from "joi";

export const createParticipantSchema = Joi.object<CreateParticipantParams>({
  name: Joi.string().required(),
  balance: Joi.number().required(),
});
