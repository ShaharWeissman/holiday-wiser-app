import axios, { AxiosResponse } from "axios";
import HolidayModel from "../Model/HolidayModel";
import indexConfig from "./api/indexConfig";
import { HolidaysActionType, HolidaysAction, holidaysStore } from "../Redux/HolidaysState";

class AdminService {
  //Get All Holidays
  public async getAllHolidays(): Promise<HolidayModel[]> {

    //get holiday from global state
    let holidays = holidaysStore.getState().holidays;

    //when there is no holidays in glbl state
    if (holidays.length === 0) {

      //get all the holidays inside -> response object
      const response = await axios.get<HolidayModel[]>(
        indexConfig.holidaysApi + "/getAllHolidays/");

      //save holidays in global state
      const action: HolidaysAction = {
        type: HolidaysActionType.SetAllHolidays,payload: holidays};
        holidaysStore.dispatch(action);

      // take the "holiday" from the response +return holiday
      holidays = response.data;
      // return holidays;
    }
    return holidays;
  }
//==================================================================
//Get Holiday By ID
  public async getHolidayById(id: number): Promise<HolidayModel> {
 let holidays = holidaysStore.getState().holidays;
 let holiday = holidays.find(h => h.id === id);

//if the holiday not found
if (!holiday){
  const response = await axios.get<HolidayModel>(indexConfig.holidaysApi +`/${id}` );

holiday  = response.data;

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
    const response = await axios.post<HolidayModel>(
      indexConfig.holidaysApi + "/addHoliday",
      holiday,
      options
    );


    //take the added holiday send back from backend
    const addedHoliday = response.data;

    const action: HolidaysAction ={type: HolidaysActionType.AddHoliday, payload: addedHoliday};
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
    const response = await axios.put<HolidayModel>(
      indexConfig.holidaysApi + "/editHoliday/" + holiday.id,
      holiday,
      options
    );
    //take the edited holiday send back from backend
    const editedHoliday = response.data;

    //edit holiday in glbl state
    const action: HolidaysAction ={type: HolidaysActionType.AddHoliday, payload: editedHoliday};
    holidaysStore.dispatch(action);

    console.log(editedHoliday);
  }
//==================================================================

  //delete holiday
  public async deleteHoliday(id: number): Promise<void> {
    //delete holiday in backend
    await axios.delete(indexConfig.holidaysApi + id);

    const action: HolidaysAction ={type: HolidaysActionType.DeleteHoliday, payload:id };
    holidaysStore.dispatch(action);
  }

}

const adminService = new AdminService();

export default adminService;
