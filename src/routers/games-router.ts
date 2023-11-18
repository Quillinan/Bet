import { gamesController } from "@/controllers";
import { validateBody } from "@/middlewares";
import { createGameSchema, finishGameSchema } from "@/schemas";
import { Router } from "express";

const gamesRouter = Router();

gamesRouter
  .post("/", validateBody(createGameSchema), gamesController.postGame)
  .post(
    "/:id/finish",
    validateBody(finishGameSchema),
    gamesController.finishGame
  )
  .get("/", gamesController.getGames)
  .get("/:id", gamesController.getGameWithBets);

export { gamesRouter };
