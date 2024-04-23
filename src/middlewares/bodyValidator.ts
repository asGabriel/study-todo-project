import express, { Request, Response, NextFunction } from "express";

export const bodyValidate = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.body || Object.keys(req.body).length === 0) {
    return res.status(400).send("Invalid body");
  }
  
  next();
};
