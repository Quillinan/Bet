import { gamesController } from "@/controllers";
import { validateBody } from "@/middlewares";
import { createGameSchema, finishGameSchema } from "@/schemas";
import { Router } from "express";

const gamesRouter = Router();

gamesRouter
  .post("/", validateBody(createGameSchema), gamesController.gamePost)
  .post(
    "/:id/finish",
    validateBody(finishGameSchema),
    gamesController.gameFinish
  )
  .get("/", gamesController.gamesGet)
  .get("/:id", gamesController.gameGetWithBets);

export { gamesRouter };
