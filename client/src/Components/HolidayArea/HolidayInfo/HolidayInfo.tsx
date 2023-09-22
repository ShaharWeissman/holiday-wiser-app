import { NavLink, useParams } from "react-router-dom";
import holidaysService from "../../../Services/HolidaysService";
import { useEffect, useState } from "react";
import HolidayModel from "../../../Model/HolidayModel";
import { TextField } from "@mui/material";
import notifyService from "../../../Services/NotifyService";

function HolidayInfo(): JSX.Element {
  const [holiday, setHoliday] = useState<HolidayModel>();
  const params = useParams();
  //always define in route params
  const id = +params.id;
  console.log("id:", id);
  
  useEffect(() => {
    holidaysService.getHolidayById(id)
      .then((backendHoliday) => setHoliday(backendHoliday))
      .catch((err) => notifyService.error(err));
  }, [id]);

  console.log(id);
  return (
    <div className="holidayInfo">
      <div className=" Box" style={{ width: "300px", margin: "0 auto" }}>
        <h2>Holiday Information</h2>
        <h3>Destination: {holiday?.destination}</h3>
        <h3>Description: {holiday?.description}</h3>
        <h3>Start Date: {holiday?.start_date?.toLocaleDateString()}</h3>
        <h3>End Date: {holiday?.end_date?.toLocaleDateString()}</h3>
        <h3>Price: {holiday?.price}</h3>
        <br />
        <img src={holiday?.image_url} alt="holiday"/>
<br />
<NavLink to="/home">Back</NavLink>
      </div>
    </div>
  );
}

export default HolidayInfo;
