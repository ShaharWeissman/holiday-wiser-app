import UserModel from "../Model/UserModel";
import axios from "axios";
import CredentialsModel from "../Model/CredentialsModel";
import { AuthAction, AuthActionType, authStore } from "../Redux/AuthState";
import indexConfig from "./api/indexConfig";

class AuthService {
  public async signup(user: UserModel): Promise<void> {
    try {
      //send the user to the server
      const response = await axios.post<string>(indexConfig.signupUrl, user);

      // extract the token
      const token = response.data;

      console.log("Signup Token:", token);

      // send the token to global state
      const action: AuthAction = {
        type: AuthActionType.Signup,
        payload: token,
      };
      authStore.dispatch(action);
    } catch (error) {
      console.log("signup error:", error);
    }
  }

//   public async login(credentials: CredentialsModel): Promise<void> {
//     try {
//       const response = await axios.post<string>(
//         indexConfig.loginUrl,
//         credentials
//       );
// console.log(response);

//       // extract the credentials.
//       const token = response.data;
//       console.log("Login Token:", token);
//       // send the token to global state
//       const action: AuthAction = { type: AuthActionType.Login, payload: token };
//       authStore.dispatch(action);
//     } catch (error) {
//       console.log("login error check = ", error);
//     }
//   }

  // logout
  public logout(): void {
    // go to global state and call logout
    const action: AuthAction = { type: AuthActionType.Logout };
    authStore.dispatch(action);
  }
}

const authService = new AuthService();
export default authService;
