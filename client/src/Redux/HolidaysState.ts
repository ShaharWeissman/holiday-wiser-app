import { configureStore } from "@reduxjs/toolkit";
import HolidayModel from "../Model/HolidayModel";

export type CheckedMode = "all" | "followed" | "ongoing" | "upcoming";
// 1. (GLOBAL STATE) on the level of AppState
export class HolidaysState {
  public holidays: HolidayModel[] = [];
  public mode: CheckedMode = "all";
}

//2. Types of Action
export enum HolidaysActionType {
  SetAllHolidays = "SetAllHolidays",
  AddHoliday = "AddHoliday",
  EditHoliday = "EditHoliday",
  DeleteHoliday = "DeleteHoliday",
  SetMode = "SetMode",
}

//3. action (interface help me create literal object!)

export interface HolidaysAction {
  type: HolidaysActionType; //action type
  payload: any; //the data in the action
}

//4.REDUCER - start the redux libary  -- action creators (functions for redux)
//(***first time there is no object we need to make new HolidatStaet())
export function holidaysReducer(
  currentState = new HolidaysState(),
  action: HolidaysAction
): HolidaysState {
  //this duplicate the global state using {..}
  const newState = { ...currentState };
  //change according the action - the duplicate glbl state
  switch (action.type) {
    case HolidaysActionType.SetMode:
      newState.mode = action.payload;
      break;
    case HolidaysActionType.SetAllHolidays:
      newState.holidays = action.payload;
      break;

    case HolidaysActionType.AddHoliday: //payload= single holiday to add
      newState.holidays.push(action.payload);
      break;

    case HolidaysActionType.EditHoliday: //payload=is single holiday to edit
      const indexForEdit = newState.holidays.findIndex(
        (h) => h.id === action.payload.id
      );
      if (indexForEdit >= 0) newState.holidays[indexForEdit] = action.payload;
      break;

    case HolidaysActionType.DeleteHoliday: //payload=id for deletion
      const indexForDelete = newState.holidays.findIndex(
        (h) => h.id === action.payload
      );
      if (indexForDelete >= 0) newState.holidays.splice(indexForDelete, 1);

      // newState.holidays.filter((h) => h.id === action.payload.id);
      // localStorage.setItem("holidays", JSON.stringify(newState.holidays));
      break;

    default:
      return currentState; // Return current state for unrecognized action types
  }
  return newState; //return the changed duplicate global state
}
//5. store export
export const holidaysStore = configureStore({
  reducer: holidaysReducer,
  middleware: [],
});

export const setMode = (mode: CheckedMode) => {
  return {
    type: HolidaysActionType.SetMode,
    payload: mode,
  };
};
