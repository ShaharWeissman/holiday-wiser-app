import HolidayModel from "../Model/HolidayModel";
import indexConfig from "./api/indexConfig";
import {
  HolidaysActionType,
  HolidaysAction,
  holidaysStore,
} from "../Redux/HolidaysState";
import axiosInstance from "./http.service";

class AdminService {
  //Get All Holidays
  public async getAllHolidays(): Promise<HolidayModel[]> {
    //get holiday from global state
    let holidays = holidaysStore.getState().holidays;

    //when there is no holidays in global state
    if (holidays.length === 0) {
      //get all the holidays inside -> response object
      const response = await axiosInstance.get("/getAllHolidays/");

      //save holidays in global state
      const action: HolidaysAction = {
        type: HolidaysActionType.SetAllHolidays,
        payload: holidays,
      };
      holidaysStore.dispatch(action);

      // take the "holiday" from the response +return holiday
      holidays = response.data as HolidayModel[];
      // return holidays;
    }
    return holidays;
  }
  //==================================================================
  //Get Holiday By ID
  public async getHolidayById(id: number): Promise<HolidayModel> {
    let holidays = holidaysStore.getState().holidays;
    let holiday = holidays.find((h) => h.id === id);

    //if the holiday not found
    if (!holiday) {
      const response = await axiosInstance.get(`/${id}`);

      holiday = response.data as HolidayModel;
    }
    return holiday;
  }

  //==================================================================
  //Add Holiday
  public async addHoliday(holiday: HolidayModel): Promise<void> {
    // for configuration of the additional data like image we use header
    const options = {
      headers: { "Content-Type": "multipart/form-data" }, //the file include in request
    };
    //send holiday to backend
    const response = await axiosInstance.post("/addHoliday", holiday, options);

    //take the added holiday send back from backend
    const addedHoliday = response.data as HolidayModel;

    const action: HolidaysAction = {
      type: HolidaysActionType.AddHoliday,
      payload: addedHoliday,
    };
    holidaysStore.dispatch(action);

    console.log(addedHoliday);
  }

  //==================================================================
  //Edit Holiday
  public async editHoliday(holiday: HolidayModel): Promise<void> {
    // for configuration of the additional data like image we use header
    const options = {
      headers: { "Content-Type": "multipart/form-data" }, //the file include in request
    };
    //send holiday to backend
    const response = await axiosInstance.put(
    "/editHoliday/" + holiday.id,
      holiday,
      options
    );
    //take the edited holiday send back from backend
    const editedHoliday = response.data as HolidayModel;

    //edit holiday in global state
    const action: HolidaysAction = {
      type: HolidaysActionType.AddHoliday,
      payload: editedHoliday,
    };
    holidaysStore.dispatch(action);

    console.log(editedHoliday);
  }
  //==================================================================

  //delete holiday
  public async deleteHoliday(id: number): Promise<void> {
    //delete holiday in backend
    await axiosInstance.delete(indexConfig.holidaysApi + id);

    const action: HolidaysAction = {
      type: HolidaysActionType.DeleteHoliday,
      payload: id,
    };
    holidaysStore.dispatch(action);
  }
}

const adminService = new AdminService();

export default adminService;
