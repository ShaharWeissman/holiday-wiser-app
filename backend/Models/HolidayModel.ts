import { UploadedFile } from "express-fileupload";
import Joi from "joi";
import { ValidationError } from "./Clients-Errors";

class HolidayModel {
    public id: number;
    public destination: string;
    public description: string;
    public start_date: Date;
    public end_date: Date;
    public price: number;
public image_url : string;
public image: UploadedFile


    constructor(holiday: HolidayModel)
     {
        this.id = holiday.id;
        this.destination = holiday.destination,
            this.description = holiday.description,
            this.start_date = new Date(holiday.start_date),
            this.end_date = new Date(holiday.end_date),
            this.price = holiday.price,
            this.image_url = holiday.image_url;
            this.image = holiday.image;
        }




  //validation schema -
  private static validationSchema = Joi.object({
    id: Joi.number().optional().integer().positive(),
    destination: Joi.string().required().min(2).max(50),
    description: Joi.string().required().min(2).max(200),
    start_date: Joi.date().iso().required(), 
    end_date: Joi.date().iso().required(),  
    price: Joi.number().required().min(1).max(100000),   
    image_url: Joi.string().optional().min(40).max(200),
    image: Joi.object().optional()

  });

  // Validate properties and throw if not valid:
  public validate(): void {
    const result = HolidayModel.validationSchema.validate(this);
    if (result.error?.message) throw new ValidationError(result.error.message);
  }
}


export default HolidayModel;
