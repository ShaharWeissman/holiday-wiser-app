import React from "react";
import { TextField, Button } from "@mui/material";
import { NavLink, useNavigate } from "react-router-dom";
import "./Login.css";
import CredentialsModel from "../../../Model/CredentialsModel";
import authService from "../../../Services/AuthService";
import { useForm } from "react-hook-form";
import notifyService from "../../../Services/NotifyService";
import axios from "axios";
import indexConfig from "../../../Services/api/indexConfig";
import LocalStorageService from "../../../Services/localStorage.service";

function Login(): JSX.Element {
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm<CredentialsModel>();

  // async function send(credentials: CredentialsModel) {
  //   try {
  //     await authService.login(credentials);
  //     notifyService.success("you have been logged in");
  //     navigate("/home");
  //   } catch (err: any) {
  //     notifyService.error(err);
  //     navigate("auth/login");
  //   }
  // }

  async function loginUser(credentials: CredentialsModel) {
    axios
      .post(indexConfig.loginUrl, credentials)
      .then((response) => {
        notifyService.success("you have been logged in");
        const [role, token, id] = response.data.split(":");
        console.log({ r: response.data });
        LocalStorageService.set("user", role);
        LocalStorageService.set("token", token);
        LocalStorageService.set("id", id);
        navigate(role === "admin" ? "/admin" : "/home");
        console.log(response);
      })
      .catch((err) => {
        notifyService.error(err);
      });
  }

  return (
    <>
      <div className="Login Box">
        <h2>Login</h2>
        <form onSubmit={handleSubmit(loginUser)}>
          <TextField
            required
            id="email"
            label="Email"
            type="email"
            variant="outlined"
            fullWidth
            margin="normal"
            {...register("email")}
          />
          <TextField
            required
            id="password"
            label="Password"
            type="password"
            variant="outlined"
            fullWidth
            margin="normal"
            {...register("password")}
          />
          <div className="BtnArea">
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              style={{ marginTop: "20px", height: "40px" }}>
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
