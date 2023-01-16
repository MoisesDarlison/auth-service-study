import { NextFunction, Request, Response } from "express";

export const contentTypeDefault = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  res.type("json");
  next();
};
