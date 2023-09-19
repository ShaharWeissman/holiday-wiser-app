import { OkPacket } from "mysql";
import dal_mysql from "../Utils/dal_mysql";
import config from "../Utils/Config";
import HolidayModel from "../Models/HolidayModel";
import { ResourceNotFoundError } from "../Models/Clients-Errors";
import imageHandler from "../Utils/image-handler";

// ===============Get All Holidays===============
const getAllHolidays = async (userId: string) => {
  const sqlCommand = `
    SELECT 
      h.id AS id,
      h.destination AS destination,
      h.description AS description,
      DATE_FORMAT(h.start_date, '%Y-%m-%d') AS start_date,
      DATE_FORMAT(h.end_date, '%Y-%m-%d') AS end_date,
      h.price AS price,
      CONCAT('${config.domainName}/api/holidays/', h.image_name) AS image_url,
      COUNT(f.userId) AS followCount,
      CASE 
        WHEN EXISTS (SELECT 1 FROM follow f2 WHERE f2.holidayId = h.id AND f2.userId = ${userId}) 
        THEN true 
        ELSE false 
      END AS isFollowing
    FROM holidays h
    LEFT JOIN follow f ON h.id = f.holidayId
    GROUP BY h.id, h.destination, h.description, h.start_date, h.end_date, h.price, h.image_name;`;

  const holidays = await dal_mysql.execute(sqlCommand);

  return holidays;
};


// ===============Get A Holiday By ID ===============

const getHolidayById = async (
  id: number,
  userId: string
): Promise<HolidayModel & { followCount: number; isFollowing: boolean }> => {
  const sqlCommand = `
    SELECT 
      h.id AS id,
      h.destination AS destination,
      h.description AS description,
      DATE_FORMAT(h.start_date, '%d-%m-%Y') AS start_date,
      DATE_FORMAT(h.end_date, '%d-%m-%Y') AS end_date, 
      h.price AS price,
      h.image_name,
      COUNT(f.userId) AS followCount,
      CASE WHEN EXISTS (SELECT 1 FROM follow WHERE holidayId = ${id} AND userId = ${userId}) THEN TRUE ELSE FALSE END AS isFollowing
    FROM holidays h
    LEFT JOIN follow f ON h.id = f.holidayId
    WHERE h.id = ${id};
  `;

  // Take the holiday from the database that contains one holiday - it returns an array:
  const holidays = await dal_mysql.execute(sqlCommand);

  // Extract the single holiday
  const holiday = holidays[0];

  // In case the holiday does not exist
  if (!holiday.id) throw new ResourceNotFoundError(id);

  holiday.image_url = `${config.domainName}/assets/images/${holiday.image_name}`;
  return holiday;
};


// =============== Add Holiday ===============

const addHoliday = async (newHoliday: HolidayModel) => {
  newHoliday.validate();

  const formattedStartDate = formatDate(
    newHoliday.start_date.toISOString().split("T")[0]
  );
  const formattedEndDate = formatDate(
    newHoliday.end_date.toISOString().split("T")[0]
  );

  //save image
  const image_name = await imageHandler.saveImage(newHoliday.image);

  const sqlCommand = `INSERT INTO holidays (destination, description, start_date, end_date, price, image_name)
    VALUES ('${newHoliday.destination}', '${newHoliday.description}', 
    '${formattedStartDate}', '${formattedEndDate}',    ${newHoliday.price}, '${image_name}')`;

  // preform the sql command get info object
  const result: OkPacket = await dal_mysql.execute(sqlCommand);
  // take new ID set it in given holiday
  newHoliday.id = result.insertId;

  //get the image url
  newHoliday.image_url = `${config.domainName}/api/holidays/${image_name}`;

  //remove image from the holiday object - no need to response it back
  // @ts-ignore
  delete newHoliday.image;

  return newHoliday;
};

// =============== Edit A Holiday ===============

const editHoliday = async (holiday: HolidayModel) => {
  holiday.validate();
  const formattedStartDate = holiday.start_date.toISOString();
  const formattedEndDate = holiday.end_date.toISOString();
  let sqlCommand = "";
  let image_name = "";
  const oldImage = await getOldImage(holiday.id);

  if (holiday.image) {
    image_name = await imageHandler.editImage(holiday.image, oldImage);
    sqlCommand = `UPDATE holidays SET 
      destination = '${holiday.destination}',
      description = '${holiday.description}',
      start_date = '${formattedStartDate}',
      end_date = '${formattedEndDate}',
      price = ${holiday.price},
      image_name = '${image_name}' 
      WHERE id = ${holiday.id}`;
  } else {
    image_name = oldImage;
    sqlCommand = `UPDATE holidays SET 
      destination = '${holiday.destination}',
      description = '${holiday.description}',
      start_date = '${formattedStartDate}',
      end_date = '${formattedEndDate}',
      price = ${holiday.price}
      WHERE id = ${holiday.id}`;
  }
  const info: OkPacket = await dal_mysql.execute(sqlCommand);
  if (info.affectedRows === 0) throw new ResourceNotFoundError(holiday.id);
  return holiday;
};

// =============== Delete A Holiday ===============
const deleteHoliday = async (id: number) => {
  console.log(`you have deleted holiday id ${id}`);
  //for deleting image of holiday
  const oldImage = await getOldImage(id);
  // remove the actual image from folder
  await imageHandler.deleteImage(oldImage);

  const sqlCommand = `DELETE FROM holidays WHERE id=${id}`;
  dal_mysql.execute(sqlCommand);
};

// =============== Function For Date Type ===============

function formatDate(dateString: string): string {
  const parts = dateString.split("-");
  const formattedDate = `${parts[0]}-${parts[1]}-${parts[2]}`;
  return formattedDate;
}

// =============== Function For Handling Current Holiday Image ===============
async function getOldImage(id: number): Promise<string> {
  const sqlCommand = `SELECT image_name FROM holidays WHERE id = ${id}`;
  const holidays = await dal_mysql.execute(sqlCommand);
  const holiday = holidays[0];
  if (!holiday) return "";
  const image_name = holiday.image_name;
  return image_name;
}

export default {
  addHoliday,
  getAllHolidays,
  deleteHoliday,
  editHoliday,
  getHolidayById,
};
