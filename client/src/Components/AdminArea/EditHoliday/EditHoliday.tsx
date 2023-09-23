import { Button, TextField } from "@mui/material";
import "./EditHoliday.css";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import useTitle from "../../../Services/useTitle";
import { NavLink, useParams } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";
import { useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import HolidayModel from "../../../Model/HolidayModel";
import holidaysService from "../../../Services/AdminService";
import adminService from "../../../Services/AdminService";
import { useForm } from "react-hook-form";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";

function stringToDate(dateString: string) {
  const dateParts = dateString.split("-");
  if (dateParts.length !== 3) {
    throw new Error("Invalid date format");
  }

  const day = parseInt(dateParts[0]);
  const month = parseInt(dateParts[1]) - 1; // Months are 0-indexed in JavaScript
  const year = parseInt(dateParts[2]);

  const date = new Date(year, month, day);

  if (isNaN(date.getTime())) {
    throw new Error("Invalid date");
  }

  return date;
}

function formatDateToYYYYMMDD(date: Date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-indexed, so we add 1 and pad with '0' if necessary
  const day = String(date.getDate()).padStart(2, "0"); // Pad with '0' if the day is a single digit

  return `${year}-${month}-${day}`;
}

function EditHoliday(): JSX.Element {
  useTitle("HolidayApp | edit-holiday");
  const navigate = useNavigate();
  const params = useParams();
  const { handleSubmit, register, setValue } = useForm<HolidayModel>();
  const [currentImage, setCurrentImage] = useState<string | null>(null); // Define the state variable for the current image URL
  const fileInputRef = useRef<HTMLInputElement | null>(null); // Create a ref for the file input

  const id = +params.id;

  useEffect(() => {
    holidaysService
      .getHolidayById(id)
      .then((holiday) => {
        console.log(
          "🚀 ~ file: EditHoliday.tsx:28 ~ .then ~ backendHolidays:",
          { ...holiday }
        );
        holiday.start_date = formatDateToYYYYMMDD(
          stringToDate(holiday.start_date as unknown as string)
        ) as undefined;
        holiday.end_date = formatDateToYYYYMMDD(
          stringToDate(holiday.end_date as unknown as string)
        ) as undefined;
        console.log(
          "🚀 ~ file: EditHoliday.tsx:28 ~ .then ~ backendHolidays:",
          holiday
        );

        setValue("destination", holiday.destination);
        setValue("description", holiday.description);
        setValue("price", holiday.price);
        setValue("image", holiday.image);
        setValue("start_date", holiday.start_date);
        setValue("end_date", holiday.end_date);

        setCurrentImage(holiday.image_url);
      })
      .catch((err) => console.log(err.message));
  }, []);

  async function sendHoliday(holiday: HolidayModel) {
    try {
      console.log(holiday, fileInputRef.current.files);
      holiday.id = id;
      holiday.image =fileInputRef.current.files[0];
      // holiday.image = (holiday.image as unknown as FileList)[0];

      // setValue("image", currentImage as any);
      await adminService.editHoliday(holiday);
      console.log("holiday was edited successfully");
      navigate("/admin/");
    } catch (err: any) {
      console.log(err.message);
    }
  }

  const handleImageChange = () => {
    console.log("Image changed");
    if (fileInputRef.current?.files && fileInputRef.current?.files[0]) {
      const reader = new FileReader();

      reader.onload = (e) => {
        if (e.target) {
          setCurrentImage(e.target.result as string);
          console.log(e.target.result, fileInputRef.current.files[0]);
          // Update the form value using React Hook Form's setValue
          setValue("image", e.target.result as any);
        }
      };
      reader.readAsDataURL(fileInputRef.current.files[0]);
    }
  };

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
                defaultValue={new Date()}
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
                defaultValue={new Date()}
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
                  alt={"holiday name"}
                  style={{ width: "200px", height: "130px" }}
                />
                <input
                  onChange={handleImageChange}
                  name="image"
                  ref={(e) => {
                    register("image"); // Register the input element with React Hook Form
                    fileInputRef.current = e; // Store a reference to the input element
                  }}
                  type="file"
                  accept="image/*"
                  style={{ display: "none" }}
                  id="uploadInput"
                  // {...register("image")}
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
