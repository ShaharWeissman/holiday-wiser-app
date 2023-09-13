import express, { Request, Response, Router, NextFunction } from "express";
import StatusCode from "../Models/status-code";
import AuthLogic from "../Logic/AuthLogic";
import UserModel from "../Models/UserModel";
import CredentialsModel from "../Models/credentialsModel";
import unLoggedInBlocker from "../MiddleWare/non-user-block";

//create router part of the express
const router = express.Router();

// ===============Sign Up Router===============

router.post(
  "/signup",async (request: Request, response: Response, next: NextFunction) => {
    try {
      console.log(request.body);
      const user = new UserModel(request.body);
      const token = await AuthLogic.signup(user);
      response.status(StatusCode.Created).json(token);
    } catch (err: any) {
      next(err);
    }
  }
);

// ===============LOGIN Router===============
router.post(
  "/login",async (request: Request, response: Response, next: NextFunction) => {
    try {
      const credentials = new CredentialsModel(request.body);
      const token = await AuthLogic.login(credentials);
      response.json(token);
    }
     catch (err: any) {
      next(err);
    }
  }
);

// ===============Get A User By ID Router===============

router.get("/users/:id",
unLoggedInBlocker, async (request: Request, response: Response, next: NextFunction) => {
  try {
      const id = +request.params.id;
      const user = await AuthLogic.getUserById(id);
      response.json(user);
  }
  catch (err: any) {
      next(err);
  }
});

// ===============Update User Properties Router===============

router.patch("/users/:id",
unLoggedInBlocker, async (request: Request, response: Response, next: NextFunction) => {
  try {
      request.body.id = +request.params.id;
      const user = new UserModel(request.body);
      const updatedUser = await AuthLogic.updateUser(user);
      response.json(updatedUser);
  }
  catch (err: any) {
      next(err);
  }
});


export default router;
