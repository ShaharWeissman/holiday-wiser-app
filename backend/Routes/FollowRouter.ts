// import express, { Request, Response, Router, NextFunction } from 'express';
// import FollowLogic from "../Logic/FollowLogic"
// import StatusCode from '../Models/status-code';
// import FollowModel from '../Models/FollowModel';
// const followRouter = express.Router();

// followRouter.get(
//   "/getAllfollowers",
//   async (request: Request, response: Response , next : NextFunction) => {
//     try {
//       // Get all products from database: 
//       const followers = await FollowLogic.getAllFollowers

//       // Response back all products: 
//       response.json(followers);
//   }
//   catch (err: any) {
//       next(err);
//   }

// });
// followRouter.post(
//   "/addfollower",
//   async (request: Request, response: Response, next: NextFunction) => {
//     try {
//       const follower = new FollowModel(request.body.holiday_id, request.body.user_id);
//       const addFollower = await FollowLogic.addFollower(follower);
//       response.status(StatusCode.Created).json(addFollower);
//     } catch (err: any) {
//       next(err);
//     }
//   }
// );





// followRouter.get(
//   "/getFollowers",
//   async (request: Request, response: Response, next: NextFunction) => {
//     try {
//       const { user_id } = request.query;
//       const userIdNumber = parseInt(user_id as string, 10); // Parse user_id as a number
//       const followList = await FollowLogic.getAllFollowers(userIdNumber);
//       return response.status(200).json(followList);
//     } catch (error) {
//       // Handle the error appropriately
//       return response.status(500).json({ error: "Internal server error" });
//     }
//   }
// );

// export default followRouter;
// function getAllFollowers(): any {
//   throw new Error("Function not implemented.");
// }

