import { participantsController } from "@/controllers";
import { validateBody } from "@/middlewares";
import { createParticipantSchema } from "@/schemas";
import { Router } from "express";

const participantsRouter = Router();

participantsRouter.post(
  "/",
  validateBody(createParticipantSchema),
  participantsController.participantPost
);

export { participantsRouter };
