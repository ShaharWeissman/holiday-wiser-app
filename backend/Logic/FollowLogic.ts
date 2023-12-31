import { OkPacket } from "mysql";
import dal_mysql from "../Utils/dal_mysql";

// Function to get all holiday IDs followed by a user
async function getAllFollowedHolidayIds(userId: number) {
  const sqlCommand = `SELECT holidayId FROM follow WHERE userId = ${userId}`;
  const followedHolidays = await dal_mysql.execute(sqlCommand);
  return followedHolidays.map((follow: any) => follow.holidayId);
}

// Function to add a follower for a specific user and holiday
async function addFollower(
  userId: number,
  holidayId: number
): Promise<boolean> {
  try {
    const sqlCommand = `INSERT INTO follow (userId, holidayId) VALUES (${userId}, ${holidayId});`;
    const result = await dal_mysql.execute(sqlCommand);
    return true;
  } catch (error) {
    console.error(error);
  }
  return false;
}

// Function to get all holidays followed by a user
async function getAllFollowedHolidays(userId: number) {
  const sqlCommand = `SELECT * FROM follow WHERE userId = ${userId}`;
  const followedHolidays = await dal_mysql.execute(sqlCommand);
  return followedHolidays;
}

// Function to remove a follower by user and holiday ID
async function removeFollower(userId: number, holidayId: number) : Promise<boolean>{
  try {
    const sqlCommand = `DELETE FROM follow WHERE userId = ${userId} AND holidayId = ${holidayId}`;
    const result = await dal_mysql.execute(sqlCommand);
    return result.affectedRows === 0 ? null : result;
  } catch (error) {
    console.error(error);
  }
  return false;
}

// Function to get the follower count for a specific holiday
async function getFollowerCount(holidayId: number) {
  const sqlCommand = `SELECT COUNT(userId) AS followersCount FROM follow WHERE holidayId = ${holidayId}`;
  const result = await dal_mysql.execute(sqlCommand);
  return result[0].followersCount;
}

export default {
  getAllFollowedHolidayIds,
  addFollower,
  getAllFollowedHolidays,
  removeFollower,
  getFollowerCount,
};
