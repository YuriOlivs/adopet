import { NextFunction, Request, Response } from "express";
import { ErrorHandler } from "../domain/models/ErrorHandler";
import { HttpStatusCode } from "../enum/HttpStatusCode";

export const errorMiddleware = (
  error: ErrorHandler,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const statusCode =
    error.statusCode ?? HttpStatusCode.INTERNAL_SERVER_ERROR;
  const message = error.statusCode ? error.message : "Internal server error";

  res.status(statusCode).json({ message });
  return next();
};
