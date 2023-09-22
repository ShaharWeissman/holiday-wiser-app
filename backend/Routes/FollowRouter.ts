import express, { Request, Response, NextFunction } from 'express';
import FollowLogic from "../Logic/FollowLogic";
import StatusCode from '../Models/status-code';

const followerRouter = express.Router();

// Route to get all followed holiday IDs by a user
followerRouter.get(
    "/getAllFollowedHolidayIds/:userId",
    async (request: Request, response: Response, next: NextFunction) => {
      try {
        const userId = parseInt(request.params.userId, 10);
        const followedHolidayIds = await FollowLogic.getAllFollowedHolidayIds(userId);
        response.json(followedHolidayIds);
      } catch (err: any) {
        next(err);
      }
    }
  );

// Route to add a follower for a specific user and holiday
followerRouter.post(
    "/addFollower",
    async (request: Request, response: Response, next: NextFunction) => {
      try {
        const { userId, holidayId } = request.body;
        const followerId = await FollowLogic.addFollower(userId, holidayId);
        response.status(StatusCode.Created).json({ followerId });
      } catch (err: any) {
        next(err);
      }
    }
  );

// Route to get all holidays followed by a user
followerRouter.get(
  "/getAllFollowedHolidays/:userId",
  async (request: Request, response: Response, next: NextFunction) => {
    try {
      const userId = parseInt(request.params.userId, 10);
      const followedHolidayIds = await FollowLogic.getAllFollowedHolidayIds(userId);
      response.json(followedHolidayIds);
    } catch (err: any) {
      next(err);
    }
  }
);

// Route to remove a follower by user and holiday ID (changed route)
followerRouter.delete(
  "/removeFollower/:userId/:holidayId",
  async (request: Request, response: Response, next: NextFunction) => {
    try {
      const userId = parseInt(request.params.userId, 10);
      const holidayId = parseInt(request.params.holidayId, 10);
      const result = await FollowLogic.removeFollower(userId, holidayId);
      if (result) {
        response.status(StatusCode.OK).json({ message: "Follower removed successfully" });
      } else {
        response.status(StatusCode.NotFound).json({ message: "Follower not found" });
      }
    } catch (err: any) {
      next(err);
    }
  }
);

// Route to get the follower count for a specific holiday
followerRouter.get(
  "/getFollowerCount/:holidayId",
  async (request: Request, response: Response, next: NextFunction) => {
    try {
      const holidayId = parseInt(request.params.holidayId, 10);
      const followerCount = await FollowLogic.getFollowerCount(holidayId);
      response.json({ followerCount });
    } catch (err: any) {
      next(err);
    }    
  }
);

export default followerRouter;
