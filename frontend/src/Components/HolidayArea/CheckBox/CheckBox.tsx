import React, { useState } from 'react';
import { Checkbox, FormControlLabel } from "@mui/material";
import "./CheckBox.css";

function CheckBox(): JSX.Element {
  const [selectedOption, setSelectedOption] = useState('');

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedOption(event.target.name);
  };

  const isCheckboxChecked = (name: string) => {
    return selectedOption === name;
  };

  return (
    <div className="CheckBox">
      <FormControlLabel
        control={
          <Checkbox
            name="followed"
            checked={isCheckboxChecked("followed")}
            onChange={handleCheckboxChange}
          />
        }
        label="Followed Holidays"
      />

      <FormControlLabel
        control={
          <Checkbox
            name="upcoming"
            checked={isCheckboxChecked("upcoming")}
            onChange={handleCheckboxChange}
          />
        }
        label="Upcoming Holidays"
      />
      <FormControlLabel
        control={
          <Checkbox
            name="ongoing"
            checked={isCheckboxChecked("ongoing")}
            onChange={handleCheckboxChange}
          />
        }
        label="Ongoing Holidays"
      />
    </div>
  );
}

export default CheckBox;
