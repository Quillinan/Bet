import { betsController } from "@/controllers";
import { validateBody } from "@/middlewares";
import { createBetSchema } from "@/schemas";
import { Router } from "express";

const betsRouter = Router();

betsRouter.post("/", validateBody(createBetSchema), betsController.betPost);

export { betsRouter };
