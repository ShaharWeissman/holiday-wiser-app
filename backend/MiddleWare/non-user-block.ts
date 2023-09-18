import { UnauthorizedError } from "../Models/Clients-Errors";
import { Request, Response, NextFunction } from "express";
import cyber from "../Utils/cyber";

async function unLoggedInBlocker(request: Request, response: Response, next: NextFunction) {
    try {
        const user = await cyber.verifyToken(request);
        if(!user) throw new UnauthorizedError("You are not logged in");
        const r = request as any;
        r.user = user;
        next();
    }
    catch(err: any) {
        next(err);
    }
    
}

export default unLoggedInBlocker;
