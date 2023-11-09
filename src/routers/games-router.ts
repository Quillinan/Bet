import { gamesController } from "@/controllers";
import { validateBody } from "@/middlewares";
import { createGameSchema } from "@/schemas";
import { Router } from "express";

const gamesRouter = Router();

gamesRouter
  .post("/", validateBody(createGameSchema), gamesController.gamePost)
  .get("/", gamesController.gamesGet)
  .get("/:gameId", gamesController.gameGetWithBets);

export { gamesRouter };
