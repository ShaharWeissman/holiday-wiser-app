import { NavLink } from "react-router-dom";
import "./AuthMenu.css";
import CheckBox from "../../HolidayArea/CheckBox/CheckBox";
import notifyService from "../../../Services/NotifyService";
import UserModel from "../../../Models/UserModel";
import { useEffect, useState } from "react";
import {
  AuthAction,
  AuthActionType,
  authStore,
} from "../../../Redux/AuthState";
//mui feature
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import { Button } from "@mui/material";
import EqualizerIcon from "@mui/icons-material/Equalizer";
import AddIcon from "@mui/icons-material/Add";

function AuthMenu(): JSX.Element {
  const [user, setUser] = useState<UserModel>();
  const [userRole, setUserRole] = useState("");

  useEffect(() => {
    setUser(authStore.getState().user);
    const unsubscribe = authStore.subscribe(() =>
      setUser(authStore.getState().user)
    );
    return unsubscribe;
  }, []);

  function logout(): void {
    // go to global state and call logout
    const action: AuthAction = { type: AuthActionType.Logout };
    authStore.dispatch(action);
    notifyService.success("you have logged out");
  }

  return (
    <div className="AuthMenu">
      <div className="MenuContent">
        <div className="MenuLeft">
          {userRole === "admin" ? (
            <>
              <span className="MenuLabel">Admin Menu: </span>
              <NavLink to="/admin" className="nav-link">
                <Button
                  variant="contained"
                  color="primary"
                  startIcon={<AddIcon />}>
                  back to home admin
                </Button>
              </NavLink>
              <NavLink to="/admin/add-holiday" className="nav-link">
                <Button variant="contained" startIcon={<AddIcon />}>
                  Add New Holiday
                </Button>
              </NavLink>
              <NavLink to="/admin/holidays-report" className="nav-link">
                <Button
                  className="Holiday Report"
                  variant="contained"
                  startIcon={<EqualizerIcon />}>
                  Holidays Report
                </Button>
              </NavLink>
            </>
          ) : (
            <>
              <NavLink to="/admin" className="nav-link">
                <Button
                  variant="contained"
                  color="primary"
                  startIcon={<AddIcon />}>
                  back to home admin
                </Button>
              </NavLink>
              <span className="MenuLabel">Holiday Status:</span>
              <CheckBox />
            </>
          )}
        </div>
        <div className="MenuRight">
          <NavLink to="/auth/login">
            <Button
              variant="contained"
              color="warning"
              startIcon={<ExitToAppIcon />}>
              Sign Out
            </Button>
          </NavLink>
        </div>
      </div>
    </div>
  );
}

export default AuthMenu;
