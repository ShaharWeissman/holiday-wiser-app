import express, { NextFunction, Request, Response } from "express";
import User from "../Models/UserModel";
import userLogic from "../Logic/UserLogic"


const userRouter = express.Router();

userRouter.post(
    "/addUser",
    async (request: Request, response: Response, next: NextFunction) => {
        const newUser: User = request.body;
        return response.status(201).json(await userLogic.addUser(newUser));

    }
)
userRouter.delete(
    "/delete/:id",
    async (request: Request, response: Response, next: NextFunction) => {
      const userId: number = +request.params.id; // Access the 'id' parameter value
      await userLogic.deleteUser(userId);
      return response.sendStatus(204); // Send a 204 No Content response
    }
  );
  

  userRouter.put(
    "/editUser",
    async (request: Request, response: Response, next: NextFunction) => {
      const editUser: User = request.body;
      await userLogic.editUser(editUser);
      return response.status(200).json("EDIT SUCCESS");
    }
  );


userRouter.post(
    "/verifyLogin",
    async (request: Request, response: Response, next: NextFunction) => {
        const userLogin: User = request.body;
        if ( await userLogic.verifyLogin(userLogin)) {
            return response.status(200).json("ok")
        }
        return response.status(401).json("unauthorized");

    }
)


userRouter.get(
    "/getAll", 
    async (request: Request, response: Response, next: NextFunction) => {
        const userList = await userLogic.getUserList();
        return response.status(200).json(userList);
    }
);


export default userRouter;