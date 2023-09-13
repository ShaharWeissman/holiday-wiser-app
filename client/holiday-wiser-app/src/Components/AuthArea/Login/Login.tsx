import { useForm } from "react-hook-form";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import CredentialsModel from "../../../Models/CredentialsModel";
import indexConfig from "../../../Services/IndexConfig";
import notifyService from "../../../Services/NotifyService";
//Mui feature
import { Button, TextField } from "@mui/material";



function Login(): JSX.Element {
    const navigate = useNavigate();
    const { register, handleSubmit } = useForm<CredentialsModel>();
  
  async function loginUser (credentials: CredentialsModel){
  axios.post(indexConfig.loginApi, credentials)
  .then (response => {
  notifyService.success("you have been logged in");
  console.log(response.data.role);
   if (response.data.role == "admin" ){
    navigate("/admin");
    localStorage.setItem("user", response.data.role)
  }
  else
        navigate("/home");
        localStorage.setItem("user", response.data.role)
  
        console.log(response);
  })
  .catch(err => {
    notifyService.error(err);
  })
  }

  return (
    <>
      <div className="Login Box">
        <h2>Login</h2>
        <form onSubmit={handleSubmit(loginUser)}>
          <TextField required id="email" label="Email" type="email" variant="outlined" fullWidth  margin="normal"
            {...register("email")}
          />
          <TextField required id="password" label="Password"  type="password" variant="outlined" fullWidth margin="normal"
            {...register("password")}
          />
          <div className="BtnArea">
            <Button type="submit" variant="contained" color="primary" fullWidth style={{ marginTop: "20px", height: "40px" }}>
              Login
            </Button>
            <div
              className="txtLine"
              style={{
                display: "flex",
                alignItems: "center",
                margin: "24px 0",
              }}>
              <span
                style={{
                  flexGrow: 1,
                  height: "1px",
                  background:
                    "linear-gradient(to right, #a8b1bc, #fff, #a8b1bc)",
                  margin: "0 10px",
                }}
              />
              <span>Not a Member?</span>
              <span
                style={{
                  flexGrow: 1,
                  height: "1px",
                  background:
                    "linear-gradient(to right, #a8b1bc, #fff, #a8b1bc)",
                  margin: "0 10px",
                }}
              />
            </div>
            <NavLink to="/auth/signup">
              <Button variant="text" fullWidth>
                sign up
              </Button>
            </NavLink>
          </div>
        </form>
      </div>
    </>
  );
}

export default Login;
