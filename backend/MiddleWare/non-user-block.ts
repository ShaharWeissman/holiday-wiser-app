import { UnauthorizedError } from "../Models/Clients-Errors";
import { Request, Response, NextFunction } from "express";
import cyber from "../Utils/cyber";

async function unLoggedInBlocker(request: Request, response: Response, next: NextFunction) {
    try {
        const isValid = await cyber.verifyToken(request);
        if(!isValid) throw new UnauthorizedError("You are not logged in");
        next();
    }
    catch(err: any) {
        next(err);
    }
    
}

export default unLoggedInBlocker;
