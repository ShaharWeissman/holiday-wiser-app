import UserModel from "../Models/UserModel";
import jwt, { JsonWebTokenError } from "jsonwebtoken";
import { UnauthorizedError , ForbiddenError} from "../Models/Clients-Errors";
import bcrypt from "bcrypt"
import express, { NextFunction, Request, Response } from "express";

// Secret key for token
const jwtSecretKey = "goPassword";

function getNewToken(user: UserModel): string {
   delete user.password;
  const container = { user };
  const options = { expiresIn: "3h" };
  const token = jwt.sign(container, jwtSecretKey, options);
  return token;
}


function verifyToken(request: Request): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
        try {
            const header = request.header("authorization");
            if (!header) {
                resolve(false);
                return;
            }
            const token = header.substring(7);
            if (!token) {
                resolve(false);
                return;
            }
            jwt.verify(token, jwtSecretKey, (err: JsonWebTokenError) => {
                if (err) {
                    resolve(false);
                    return;
                }
                resolve(true);
            });
        }
        catch (err: any) {
            reject(err);
        }
    });
}


async function hashPassword(plainText: string): Promise<string | null> {
    try {
        if (!plainText) return null;
        const saltRounds = 10; // You can adjust this value for security
        const hashedPassword = await bcrypt.hash(plainText, saltRounds);
        return hashedPassword;
    } catch (error) {
        console.error("Error hashing password:", error);
        return null;
    }
}


export default {
  getNewToken,
  verifyToken,
  hashPassword
};
