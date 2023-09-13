import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import notifyService from "../../../Services/NotifyService";
import indexConfig from "../../../Services/IndexConfig";
import UserModel from "../../../Models/UserModel";
import { AuthAction, AuthActionType, authStore } from "../../../Redux/AuthState";
import axios from "axios";
//mui feature
import { Button, TextField } from "@mui/material";


function SignUp(): JSX.Element {
    //register the inputs
    const { register, handleSubmit } = useForm<UserModel>();
    const navigate = useNavigate();
    

    async function sendUser(user: UserModel) {
      try {
   const response = await axios.post<string>(indexConfig.signupApi, user);   //send the user to the server
   const token = response.data;   // extract the token
   console.log("Signup Token:", token);
   const action: AuthAction = {
     type: AuthActionType.Signup, // send the token to global state
     payload: token,
   };
   authStore.dispatch(action);
        notifyService.success("you been signed up");
        navigate("/home");
      } catch (err: any) {
        notifyService.error(err);
        console.log("signup error:", err);
      }
    }


    
  return (
    <>
      <div className="SignUp Box" style={{ width: "300px", margin: "0 auto" }}>
        <h2>Sign Up</h2>

        <form onSubmit={handleSubmit(sendUser)}>
          <TextField
            required  id="firstname"  label="First Name" type="text" variant="outlined" fullWidth margin="normal"
            {...register("first_name")}
          />
          <TextField
            required id="lastname" label="Last Name" type="text" variant="outlined" fullWidth margin="normal"
            {...register("last_name")}
          />
          <TextField
            required id="email"  label="Email:"  type="email"  variant="outlined" fullWidth margin="normal"
            {...register("email")}
          />
          <TextField 
          required  id="password" label="Password:" type="password" variant="outlined"  fullWidth margin="normal"
            {...register("password")}
          />
          <Button variant="contained" color="primary" fullWidth style={{ marginTop: "20px" ,height: "40px" }} type="submit">
            SignUp
          </Button>
        </form>
      </div>
    </>
  );
}

export default SignUp;
