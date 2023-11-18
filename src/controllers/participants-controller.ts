import { participantsService } from "@/services";
import { Request, Response } from "express";
import httpStatus from "http-status";

async function postParticipant(req: Request, res: Response) {
  const { name, balance } = req.body;

  const participant = await participantsService.createParticipant({
    name,
    balance,
  });

  return res.status(httpStatus.CREATED).json({
    id: participant.id,
    createdAt: participant.createdAt,
    updatedAt: participant.updatedAt,
    name: participant.name,
    balance: participant.balance,
  });
}

async function getAllParticipants(
  _: Request,
  res: Response
): Promise<Response> {
  const participants = await participantsService.findAllParticipants();
  return res.status(httpStatus.OK).send(participants);
}

export const participantsController = {
  postParticipant,
  getAllParticipants,
};
