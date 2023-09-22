import UserModel from "../Model/UserModel";
// import axios from "axios";
// import CredentialsModel from "../Model/CredentialsModel";
import { AuthAction, AuthActionType, authStore } from "../Redux/AuthState";
import indexConfig from "./api/indexConfig";
import axiosInstance from "./http.service";
import LocalStorageService from "./localStorage.service";

class AuthService {
  public async signup(user: UserModel): Promise<void> {
    try {
      //send the user to the server
      const response = await axiosInstance.post(indexConfig.signupUrl, user);

      // extract the token
      const data = response.data;
      const [role, token, id] = response.data.split(":");


      console.log("Signup data:", data);
      LocalStorageService.set("user", role);
      LocalStorageService.set("token", token);
      LocalStorageService.set("id", id);

      // send the token to global state
      const action: AuthAction = {
        type: AuthActionType.Signup,
        payload: data,
      };
      authStore.dispatch(action);
    } catch (error) {
      console.log("signup error:", error);
    }
  }

  public logout(): void {
    // go to global state and call logout
    const action: AuthAction = { type: AuthActionType.Logout };
    authStore.dispatch(action);
  }
}

const authService = new AuthService();
export default authService;
