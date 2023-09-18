import React, { useState } from "react";
import "./MenuAdmin.css";
import { Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import EqualizerIcon from '@mui/icons-material/Equalizer';
import DeleteIcon from "@mui/icons-material/Delete";
import { NavLink } from "react-router-dom";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";

function MenuAdmin(): JSX.Element {


  return (
    <div className="MenuAdmin">
      <div className="MenuContent">
        <div className="MenuLeft">
          <span className="MenuLabel">Admin Menu: </span>
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
        </div>
        <div className="MenuRight">
          <NavLink to="/auth/login">
            <Button
              className="black-signout"
              variant="contained"
              startIcon={<ExitToAppIcon />}>
              Sign out
            </Button>
          </NavLink>
        </div>
      </div>
      
    </div>
  );
}
export default MenuAdmin;
