import UserModel from "../Models/UserModel";
import jwt, { JsonWebTokenError } from "jsonwebtoken";
import { UnauthorizedError, ForbiddenError } from "../Models/Clients-Errors";
import bcrypt from "bcrypt";
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

function verifyToken(request: Request): Promise<any | null> {
  return new Promise<any | null>((resolve, reject) => {
    try {
      const header = request.header("authorization");
      if (!header) {
        resolve(null); // No token found, resolve with null
        return;
      }
      const token = header.substring(7);
      if (!token) {
        resolve(null); // Token is empty, resolve with null
        return;
      }
      jwt.verify(
        token,
        jwtSecretKey,
        (err: JsonWebTokenError, decodedToken: any) => {
          if (err) {
            resolve(null); // Token verification failed, resolve with null
            return;
          }
          resolve(decodedToken); // Resolve with the decoded token
        }
      );
    } catch (err: any) {
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

async function comparePassword(
  plainText: string,
  hashedPassword: string
): Promise<boolean> {
  try {
    const match = await bcrypt.compare(plainText, hashedPassword);
    return match;
  } catch (error) {
    console.error("Error comparing passwords:", error);
    return false;
  }
}

export default {
  getNewToken,
  verifyToken,
  hashPassword,
  comparePassword,
};
