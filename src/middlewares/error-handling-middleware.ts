import { Request, Response, NextFunction } from "express";
import httpStatus from "http-status";
import { ApplicationError, RequestError } from "@/protocols";

export function handleApplicationErrors(
  err: RequestError | ApplicationError | Error,
  _req: Request,
  res: Response,
  next: NextFunction
) {
  if (err.name === "NotFoundError") {
    return res.status(httpStatus.NOT_FOUND).send({
      message: err.message,
    });
  }

  /* eslint-disable-next-line no-console */
  console.error(err);
  /* eslint-disable-next-line no-console */
  console.log(next);
  res.status(httpStatus.INTERNAL_SERVER_ERROR).send({
    error: "InternalServerError",
    message: "Internal Server Error",
  });
}
