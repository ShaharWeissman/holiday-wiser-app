
import { OkPacket } from 'mysql';
import User from '../Models/UserModel';
import dal_mysql from '../Utils/dal_mysql';

const addUser = async (newUser: User) => {
  const sqlCommand = ``

  const result: OkPacket = await dal_mysql.execute(sqlCommand);

  newUser.id = result.insertId;
  return newUser;
};

const deleteUser = (id: number) => {
  const sqlCommand = `DELETE FROM users WHERE id=${id}`;
  dal_mysql.execute(sqlCommand);
};

const editUser = async (editUser: User) => {
  const sqlCommand = `UPDATE users 
    SET 
    user_email = '${editUser.email}',
    password = '${editUser.password}'
    WHERE id=${editUser.id}`;

  await dal_mysql.execute(sqlCommand);
};


const verifyLogin = async (user: User) => {
  const sqlCommand = `SELECT id, count(*) as userok FROM users WHERE email='${user.email}' AND password='${user.password}'`;
  const result: any[] = await dal_mysql.execute(sqlCommand);
  const isAUser = result[0].userok === 1;
  const user_id = isAUser ? result[0].id : null;
  console.log(user_id);
  return { isAUser, user_id };
};

const verifyUser = async (username: any) => {
  const sqlCommand = `SELECT count(*) as isAUser FROM users WHERE user_name='${username}'`;
  const result: any[] = await dal_mysql.execute(sqlCommand);
  return result[0].isAUser === 1;
};

const getUserList = async () => {
  const sqlCommand = `SELECT id, first_name, last_name, email FROM users`;
  return await dal_mysql.execute(sqlCommand);
};


export default {
  addUser,
  deleteUser,
  editUser,
  verifyUser,
  verifyLogin,
  getUserList,
};
