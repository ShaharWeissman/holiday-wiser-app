import { Button, TextField } from "@mui/material";
import "./EditHoliday.css";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import useTitle from "../../../Services/useTitle";
import { NavLink, useParams } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import HolidayModel from "../../../Model/HolidayModel";
import holidaysService from "../../../Services/AdminService";
import adminService from "../../../Services/AdminService";
import {  useForm } from "react-hook-form";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";

function EditHoliday(): JSX.Element {
  useTitle("HolidayApp | edit-holiday");
  const navigate = useNavigate();
  const params = useParams();
  const { handleSubmit, register, setValue } = useForm<HolidayModel>();
  const [currentImage, setCurrentImage] = useState<string | null>(null); // Define the state variable for the current image URL

  const id = +params.id;

  useEffect(() => {
    holidaysService
      .getHolidayById(id)
      .then((backendHolidays) => {
        setValue("destination", backendHolidays.destination);
        setValue("description", backendHolidays.description);
        setValue("price", backendHolidays.price);
        setValue("image", backendHolidays.image);
        setValue("start_date", backendHolidays.start_date);
        setValue("end_date", backendHolidays.end_date);

        setCurrentImage(backendHolidays.image_url);
      })
      .catch((err) => console.log(err.message));
  }, []);

  async function sendHoliday(holiday: HolidayModel) {
    try {
      holiday.id = id;
      holiday.image = (holiday.image as unknown as FileList)[0];
      console.log(holiday);
      await adminService.editHoliday(holiday);
      console.log("holiday was edited successfully");
      navigate("/admin/");
    } catch (err: any) {
      console.log(err.message);
    }
  }

  async function deleteMe(): Promise<void> {
    try {
      const ok = window.confirm("are you sure you want to delete?");
      if (!ok) return;
      await adminService.deleteHoliday(id);
      console.log("holiday has been deleted");
    } catch (err: any) {
      console.log(err.message);
    }
    console.log("delete id " + id);
  }

  return (
    <div>
      <>
        <div className="MenuAdmin">
          <div className="MenuContent">
            <div className="MenuLeft">
              <NavLink to="/admin" className="nav-link">
                <Button
                  variant="contained"
                  color="primary"
                  startIcon={<AddIcon />}>
                  back to home admin
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

        <div className="EditHoliday">
          <div
            className="SignUp Box"
            style={{ width: "300px", margin: "0 auto" }}>
            <form onSubmit={handleSubmit(sendHoliday)}>
              <h2>Edit Holiday</h2>
              <TextField
                id="destination"
                name="destination"
                label="destination"
                type="text"
                variant="outlined"
                fullWidth
                margin="normal"
                defaultValue
                {...register("destination")}
              />
              <TextField
                id="description"
                label="description"
                multiline
                rows={4}
                type="text"
                variant="outlined"
                fullWidth
                margin="normal"
                defaultValue
                {...register("description")}
              />
              <br />
              {/* Time section */}

              <TextField
                id="start_date"
                name="start_date"
                label="Start Date"
                type="date"
                variant="outlined"
                fullWidth
                margin="normal"
                InputLabelProps={{
                  shrink: true,
                }}
                {...register("start_date")}
              />

              <TextField
                id="end_date"
                name="end_date"
                label="End Date"
                type="date"
                variant="outlined"
                fullWidth
                margin="normal"
                InputLabelProps={{
                  shrink: true,
                }}
                {...register("end_date")}
              />

              <TextField
                id="price"
                name="price"
                label="price"
                type="text"
                variant="outlined"
                fullWidth
                margin="normal"
                defaultValue
                {...register("price")}
              />
              <div
                className="icon Box"
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}>
                <img
                  src={currentImage}
                  alt="Current Image"
                  style={{ width: "200px", height: "130px" }}
                />{" "}
                <input
                  type="file"
                  accept="image/*"
                  style={{ display: "none" }}
                  id="uploadInput"
                  {...register("image")}
                />
                <label
                  htmlFor="uploadInput"
                  style={{ display: "flex", alignItems: "center" }}>
                  <Button component="span">
                    <CloudUploadIcon />
                    Upload a photo*
                  </Button>
                </label>
              </div>
              <Button
                variant="contained"
                color="primary"
                fullWidth
                type="submit">
                Edit Holiday
              </Button>
              <hr />
              <Button variant="outlined" color="primary" fullWidth>
                Cancel
              </Button>
            </form>
          </div>
        </div>
      </>
    </div>
  );
}

export default EditHoliday;
