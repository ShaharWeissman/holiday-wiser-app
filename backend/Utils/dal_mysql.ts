import mysql, { OkPacket } from "mysql";
import config from "../Utils/Config";

// Creating a connection pool
const connection = mysql.createPool({
  host: config.host,
  user: config.user,
  password: config.pass,
  database: config.database,
  port: 3306,
});

// const execute = (sql: string, parameters?: any[]): Promise<any> => {
  const execute = (sql: string): Promise<any> => {
  return new Promise<any>((resolve, reject) => {
    // Connection and execute the SQL command
    connection.query(sql, (err, res) => {
      if (err) {
        reject(err);
        return;
      }

      resolve(res);
    });
  });
};

export default { execute };