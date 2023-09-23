import mysql from "mysql2";
import config from "../Utils/Config";

// Creating a connection pool
const connection = mysql.createPool({
  host: config.host,
  user: config.user,
  password: config.pass,
  database: config.database,
  port: config.mySQLPort,
});

const execute = (sql: string): Promise<any> => {
  return new Promise<any>((resolve, reject) => {
    connection.query(sql, (err, res) => {
      if (err) {
        reject(err);
        return;
      }

      resolve(res);
    });
  });
};

// Function to test the connection
export const testConnection = async () => {
  try {
    await execute("SELECT 1");
    console.log("Database connection established successfully!");
  } catch (error) {
    console.error("Failed to establish a database connection!", error);
  }
};

export default { execute };
