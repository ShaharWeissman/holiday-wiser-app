import { RouteNotFound } from './../Models/Clients-Errors';
import { Request, Response, NextFunction } from "express";

const routeNotFound = (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const err = new RouteNotFound(request.originalUrl);
  next(err);
};

export default routeNotFound;
