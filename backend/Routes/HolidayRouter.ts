import getHolidayById from "../../frontend/src/Services/api/indexConfig";
import express, { NextFunction, Request, Response } from "express";
import Holiday from "../Models/HolidayModel";
import holidayLogic from "../Logic/HolidayLogic";
import { verify } from "jsonwebtoken";
import StatusCode from "../Models/status-code";
import path from "path";
import HolidayModel from "../Models/HolidayModel";
import HolidayLogic from "../Logic/HolidayLogic";

const holidayRouter = express.Router();



// ===============Get All Holidays Router===============
holidayRouter.get(
  "/getAllHolidays",
  async (request: Request, response: Response, next: NextFunction) => {
    const holidayList = await holidayLogic.getAllHolidays();
    return response.status(200).json(holidayList);
  }
);

// ===============Get Holiday By ID Router===============
holidayRouter.get("/:id([0-9]+)", async (request: Request, response: Response, next: NextFunction) => {
  try {
      // Get route id: 
      const id = +request.params.id;

      // Get one product from database: 
      const holiday = await HolidayLogic.getHolidayById(id);

      // Response back desired product: 
      response.json(holiday);
  }
  catch (err: any) {
      next(err);
  }
});


// ===============Add Holiday Router===============
holidayRouter.post(
  "/addHoliday",
  async (request: Request, response: Response, next: NextFunction) => {
    try {
      request.body.image = request.files?.image;
      const newHoliday = new HolidayModel(request.body);
      const addedHoliday = await holidayLogic.addHoliday(newHoliday);
      response.status(StatusCode.Created).json(addedHoliday);
    } catch (err: any) {
      next(err);
    }
  }
);

// ===============Delete Holiday Router===============

holidayRouter.delete(
  "/deleteHoliday/:id([0-9]+)",
  async (request: Request, response: Response, next: NextFunction) => {
    try {
      const holidayId = +request.params.id;
      await holidayLogic.deleteHoliday(holidayId);
      const message = `You have deleted holiday with ID ${holidayId}`;
      return response.status(StatusCode.NoContent).json({ message });
    } catch (error) {
      next(error); 
    }
  }
);

// ===============EDIT Holiday Router===============

holidayRouter.put(
  "/editHoliday/:id([0-9]+)",
  async (request: Request, response: Response, next: NextFunction) => {
    try {
      // take the route id into the body
      request.body.id = +request.params.id;
      //add image from the request files into request body
      request.body.image = request.files?.image;
      const editHoliday = new HolidayModel(request.body);
      const editedHoliday = await HolidayLogic.editHoliday(editHoliday);
      const message = `You edited holiday with ID ${editedHoliday.id}`;
      return response.status(200).json({ message });
    } catch (err: any) {
      next(err);
    }
  }
);

// ===============Handling IMAGES Router===============

holidayRouter.get(
  "/:imageName",
  async (request: Request, response: Response, next: NextFunction) => {
    try {
      //get the image name
      const imageName = request.params.imageName;

      //get img path on computer:
      const absolutePath = path.join(
        __dirname,
        "..",
        "Assets",
        "Images",
        imageName
      );
      //the response = the image file
      response.sendFile(absolutePath);
    }
    catch (err: any) {
        next(err);
    }
});
export default holidayRouter;
