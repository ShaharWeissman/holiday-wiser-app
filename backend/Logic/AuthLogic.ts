import {
  ResourceNotFoundError,
  UnauthorizedError,
  ValidationError,
} from "../Models/Clients-Errors";
import UserModel from "../Models/UserModel";
import CredentialsModel from "../Models/credentialsModel";
import cyber from "../Utils/cyber";
import dal_mysql from "../Utils/dal_mysql";
import { OkPacket } from "mysql";
import bcrypt from "bcrypt";

// ===============Sign Up Logic===============

async function signup(user: UserModel): Promise<string> {
  const error = user.validate();
  if (error) throw new ValidationError(error);

  if (await isEmailTaken(user.email)) {
    throw new ValidationError(`Email: ${user.email} is already taken`);
  }
  user.password = await cyber.hashPassword(user.password);
  // SQL command for  user
  const sqlCommand = `INSERT INTO users (first_name, last_name, email, password)
    VALUES ('${user.first_name}', '${user.last_name}', '${user.email}', '${user.password}')`;
  const info: OkPacket = await dal_mysql.execute(sqlCommand);
  user.id = info.insertId;
  const token = cyber.getNewToken(user);

  return token;
}

// ===============Function For Checking Email Exist===============
async function isEmailTaken(email: string): Promise<boolean> {
  const sqlCommand = `SELECT COUNT(*) AS count FROM users WHERE email = '${email}'`;
  const result = await dal_mysql.execute(sqlCommand);
  const count = result[0].count;
  return count > 0;
}

// ===============LOGIN===============
async function login(credentials: CredentialsModel): Promise<string> {
  // validation
  credentials.validate();

  const sqlCommand = `SELECT * FROM users WHERE email = "${credentials.email}"`; // execution

  const users = await dal_mysql.execute(sqlCommand);
  const user = users[0];
  if (!cyber.comparePassword(credentials.password, user.password)) {
    throw new Error("user not authenticated");
  }
  const token = cyber.getNewToken(user);
  return user.role + ":" + token;
}

// ===============Get User By ID===============

async function getUserById(id: number): Promise<UserModel> {
  const sqlCommand = `SELECT * FROM users WHERE id = ${id}`;
  const users = await dal_mysql.execute(sqlCommand);
  if (users.length === 0) throw new ResourceNotFoundError(id);

  const user = users[0];

  return user;
}

// ===============Update User Properties Logic===============

async function updateUser(user: UserModel): Promise<UserModel> {
  const sqlCommand = `
      UPDATE users SET
          first_name = '${user.first_name}',
          last_name = '${user.last_name}',
          email = '${user.email}'
      WHERE id = ${user.id}`;

  const info: OkPacket = await dal_mysql.execute(sqlCommand);

  if (info.affectedRows === 0) throw new ResourceNotFoundError(user.id);

  return user;
}

export default {
  signup,
  login,
  updateUser,
  getUserById,
};
