import React, { useState } from "react";
import { Checkbox, FormControlLabel } from "@mui/material";
import "./CheckBox.css";
import { useDispatch, useSelector } from "react-redux";
import { setMode } from "../../../Redux/HolidaysState";

function CheckBox(): JSX.Element {
  const dispatch = useDispatch();
  // const [selectedOptionLocalState, setSelectedOption] = useState("all");
  const filterHolidaysMode = useSelector((state: { mode: string }) => state.mode);

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    // setSelectedOption(event.target.name);
    dispatch(setMode(event.target.name as "all"));
  };

  const isCheckboxChecked = (name: string) => {
    return filterHolidaysMode === name;
  };

  return (
    <div className="CheckBox">
      <FormControlLabel
        control={
          <Checkbox
            name="all"
            checked={isCheckboxChecked("all")}
            onChange={handleCheckboxChange}
          />
        }
        label="All"
      />

      <FormControlLabel
        control={
          <Checkbox
            name="followed"
            checked={isCheckboxChecked("followed")}
            onChange={handleCheckboxChange}
          />
        }
        label="Followed"
      />

      <FormControlLabel
        control={
          <Checkbox
            name="upcoming"
            checked={isCheckboxChecked("upcoming")}
            onChange={handleCheckboxChange}
          />
        }
        label="Upcoming"
      />
      <FormControlLabel
        control={
          <Checkbox
            name="ongoing"
            checked={isCheckboxChecked("ongoing")}
            onChange={handleCheckboxChange}
          />
        }
        label="Ongoing"
      />
    </div>
  );
}

export default CheckBox;
