import Joi from "joi";

class CredentialsModel {

  public email: string;
  public password: string;

  constructor(credentials : CredentialsModel) {
    this.email = credentials.email;
    this.password = credentials.password;
  }

  //validation schema - built one time
  private static validationSchema = Joi.object({
    email: Joi.string().required().min(4).max(20),
    password: Joi.string().required().min(4).max(20)
  });

  // Validate properties and throw if not valid:
  public validate(): string {
    const result = CredentialsModel.validationSchema.validate(this);
    return result.error?.message;
}
}

export default CredentialsModel;
