import HolidayModel from "../Model/HolidayModel";
import indexConfig from "./api/indexConfig";
import axiosInstance from "./http.service";

class HolidaysService {
  public async getAllHolidays(): Promise<HolidayModel[]> {
    //get all the holidays inside -> response object
    const response = await axiosInstance.get(
      indexConfig.holidaysApi + "/getAllHolidays/"
    );
    // take the "holiday" from the response +return holiday
    const holidays = response.data as HolidayModel[];
    return holidays;
  }

  public async getHolidayById(id: number): Promise<HolidayModel> {
    const response = await axiosInstance.get(
      indexConfig.holidaysApi + `/${id}`
    );
    const holiday = response.data as HolidayModel;
    return holiday;
  }
}

const holidaysService = new HolidaysService();

export default holidaysService;
