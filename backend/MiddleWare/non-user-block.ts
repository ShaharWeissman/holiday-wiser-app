import { UnauthorizedError } from "../Models/Clients-Errors";
import { Request, Response, NextFunction } from "express";
import cyber from "../Utils/cyber";

async function unLoggedInBlocker(request: Request, response: Response, next: NextFunction) {
    try {
        const payload = await cyber.verifyToken(request);
        if(!payload.user) throw new UnauthorizedError("You are not logged in");
        request.user = payload.user;
        next();
    }
    catch(err: any) {
        next(err);
    }
    
}

export default unLoggedInBlocker;
