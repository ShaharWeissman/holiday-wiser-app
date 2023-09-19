import axios from "axios";
import HolidayModel from "../Model/HolidayModel";
import indexConfig from "./api/indexConfig";

class HolidaysService {
    public async getAllHolidays(): Promise<HolidayModel[]> {
        //get all the holidays inside -> response object
    const response =await axios.get<HolidayModel[]>(indexConfig.holidaysApi + "/getAllHolidays/"); 
    // take the "holiday" from the response +return holiday
    const holidays = response.data;
    return holidays;
    }

    public async getHolidayById(id: number): Promise<HolidayModel> {
        const response = await axios.get<HolidayModel>(indexConfig.holidaysApi +`/${id}` );
        const holiday = response.data;
        return holiday;
      }

}
    



// export const getAllHolidays = async (): Promise<HolidayModel[]> => {
//     try {
//       const response = await holidaysApi.get("/holidays/getAllHolidays");
//       return response.data;
//     } catch (error) {
//       console.error("Error in getAllHolidays:", error);
//       throw error;
//     }
//   };
  
//   export const getHolidayById = async (id: number): Promise<HolidayModel> => {
//     try {
//       const response = await holidaysApi.get(`/holidays/${id}`);
//       return response.data;
//     } catch (error) {
//       console.error("Error in getHolidayById:", error);
//       throw error;
//     }
//   };
  
const holidaysService = new HolidaysService();

export default holidaysService;