import UserModel from "@/Models/UserModel";

declare module 'express-serve-static-core' {
  export interface Request {
    user?: UserModel;
  }
}
