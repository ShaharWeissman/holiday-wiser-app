import { configureStore } from "@reduxjs/toolkit";
import UserModel from "../Model/UserModel";


//appstate
export class UsersState {
    public users: UserModel[] = [];
    }
    
//actionType
export enum UserActionType {
    SetAllUsers  = "SetAllUsers"
}
//action
export interface UsersAction{
    type : UserActionType;
    payload: UserModel[];
}
//action Creators
export function setAllUsersAction(allUsers: UserModel[]): UsersAction {
    return { type: UserActionType.SetAllUsers, payload: allUsers};}

    export function usersReducer( currentState= new UsersState(), action: UsersAction): UsersState {
        const newState = { ...currentState};
        switch (action.type) {
            case UserActionType.SetAllUsers:
                newState.users= action.payload;
                break;

        }
        return newState
    }
    export const usersStore = configureStore({
        reducer: usersReducer,
        middleware: [], 
      });
