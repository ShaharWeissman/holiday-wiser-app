import Joi from "joi";
import RoleModel from "./RoleModel";
import joi from "joi";
import { ValidationError } from "./Clients-Errors";

class UserModel {
  public id: number;
  public first_name: string;
  public last_name: string;
  public email: string;
  public password: string;

  constructor(user : UserModel) {
    this.id = user.id;
    this.first_name = user.first_name;
    this.last_name = user.last_name;
    this.email = user.email;
    this.password = user.password;
  }

  //validation schema - built one time
  private static validationSchema = Joi.object({
    id: Joi.number().optional().integer().positive(),
    first_name: Joi.string().required().min(2).max(50),
    last_name: Joi.string().required().min(2).max(50),
    email: Joi.string().required().min(4).max(50),
    password: Joi.string().required().min(4).max(50),
  });

  // Validate properties and throw if not valid:
  public validate(): string {
    const result = UserModel.validationSchema.validate(this);
    return result.error?.message;
}
}

export default UserModel;
