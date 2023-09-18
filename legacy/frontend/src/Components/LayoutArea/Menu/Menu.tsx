import React from "react";
import "./Menu.css";
import { Button } from "@mui/material";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import { NavLink } from "react-router-dom";
import CheckBox from "../../HolidayArea/CheckBox/CheckBox";

function Menu(): JSX.Element {
  return (
    <div className="Menu">
      <div className="MenuContent">
        <div className="MenuLeft">
          <span className="MenuLabel">Holiday Status:</span>
          <CheckBox />
        </div>
        <div className="MenuRight">
          <NavLink to="/auth/login">
            <Button variant="contained" color="warning" startIcon={<ExitToAppIcon />}>
              Sign out
            </Button>
          </NavLink>
        </div>
      </div>
    </div>
  );
}

export default Menu;
