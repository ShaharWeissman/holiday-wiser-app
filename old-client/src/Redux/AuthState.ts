import { configureStore } from "@reduxjs/toolkit";
import jwtDecode from "jwt-decode";
import UserModel from "../Models/UserModel";

// Global state definition
export class AuthState {
  public token: string | null = null; // jwt token
  public user: UserModel | null = null;
}

// Action types
export enum AuthActionType {
  Signup = "Signup",
  Login = "Login",
  Logout = "Logout",
}

// Action interface
export interface AuthAction {
  type: AuthActionType;
  payload?: string;
}

// Action creators
export const signupAction = (token: string): AuthAction => ({
  type: AuthActionType.Signup,
  payload: token,
});

export const loginAction = (token: string): AuthAction => ({
  type: AuthActionType.Login,
  payload: token,
});

export const logoutAction = (): AuthAction => ({
  type: AuthActionType.Logout,
});

// Reducer
export const authReducer = (
  currentState = new AuthState(),
  action: AuthAction
): AuthState => {
  const newState = { ...currentState };

  switch (action.type) {
    case AuthActionType.Signup:
    case AuthActionType.Login:
      // Save the token
      newState.token = action.payload;
      newState.user = jwtDecode<{ user: UserModel }>(newState.token).user;
      break;

    case AuthActionType.Logout:
      newState.token = null;
      newState.user = null;
      break;
  }
  return newState;
};
export const authStore = configureStore({
  reducer: authReducer,
  middleware: [], 
});



