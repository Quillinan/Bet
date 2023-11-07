import { participantsService } from "@/services";
import { Request, Response } from "express";
import httpStatus from "http-status";

async function participantPost(req: Request, res: Response) {
  const { name, balance } = req.body;

  const participant = await participantsService.createParticipant({
    name,
    balance,
  });

  return res.status(httpStatus.CREATED).json({
    id: participant.id,
    name: participant.name,
    balance: participant.balance,
  });
}

export const participantsController = {
  participantPost,
};
