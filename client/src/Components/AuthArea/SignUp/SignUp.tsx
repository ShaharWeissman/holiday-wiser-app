import { Button, TextField } from "@mui/material";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import notifyService from "../../../Services/NotifyService";
import UserModel from "../../../Model/UserModel";
import authService from "../../../Services/AuthService";
import LocalStorageService from "../../../Services/localStorage.service";

function SignUp(): JSX.Element {
  //register the inputs
  const { register, handleSubmit } = useForm<UserModel>();
  const navigate = useNavigate();

  async function send(user: UserModel) {
    try {
      await authService.signup(user);
      notifyService.success("you been signed up");
      navigate("/home");
    } catch (err: any) {
      notifyService.error(err);
    }
  }

  return (
    <>
      <div className="SignUp Box" style={{ width: "300px", margin: "0 auto" }}>
        <h2>Sign Up</h2>

        <form onSubmit={handleSubmit(send)}>
          <TextField
            required
            id="firstname"
            label="First Name"
            type="text"
            variant="outlined"
            fullWidth
            margin="normal"
            {...register("first_name")}
          />
          <TextField
            required
            id="lastname"
            label="Last Name"
            type="text"
            variant="outlined"
            fullWidth
            margin="normal"
            {...register("last_name")}
          />
          <TextField
            required
            id="email"
            label="Email:"
            type="email"
            variant="outlined"
            fullWidth
            margin="normal"
            {...register("email")}
          />
          <TextField
            required
            id="password"
            label="Password:"
            type="password"
            variant="outlined"
            fullWidth
            margin="normal"
            {...register("password")}
          />
          <Button
            variant="contained"
            color="primary"
            fullWidth
            style={{ marginTop: "20px" ,height: "40px" }}
            type="submit">
            SignUp
          </Button>
        </form>
      </div>
    </>
  );
}

export default SignUp;
