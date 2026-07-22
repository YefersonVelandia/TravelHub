import { Request, Response } from "express";

export const health = (_req: Request, res: Response): void => {
  res.status(200).json({
    status: "ok",
    message: "API running",
    timestamp: new Date().toISOString(),
  });
};
