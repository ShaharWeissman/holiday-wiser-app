import { Request, Response, NextFunction } from "express";

// Console log everything for diagnose:
function infoConsole(request: Request, response: Response, next: NextFunction): void {

    const now = new Date();

    console.log("Time signature: " + now.toLocaleString());
    console.log("Route location: " + request.originalUrl);
    console.log("Method: " + request.method);
    console.log("Body of the request: ", request.body);
    console.log("\n-=============================\n");
  
    next(); // Continue Request.
}

export default infoConsole;
