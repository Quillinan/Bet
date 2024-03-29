import { Request, Response, NextFunction } from "express";
import httpStatus from "http-status";
import { ApplicationError, RequestError } from "@/protocols";

/* eslint-disable */
export function handleApplicationErrors(err: RequestError | ApplicationError | Error,_req: Request,res: Response,next: NextFunction) {
  if (err.name === "NotFoundError") {
    return res.status(httpStatus.NOT_FOUND).send({message: err.message,
    });
  }
  if (err.name === "InvalidDataError") {
    return res.status(httpStatus.BAD_REQUEST).send({message: err.message,
    });
  }
  if (err.hasOwnProperty("status") && err.name === "RequestError") {
    return res.status((err as RequestError).status).send({message: err.message,
    });
  }
  /* eslint-disable-next-line no-console */
  console.log(next);
  res.status(httpStatus.INTERNAL_SERVER_ERROR).send({error: "InternalServerError",message: "Internal Server Error",});
}
/* eslint-enable */
