import { Button, TextField } from "@mui/material";
import "./AddHoliday.css";
import useTitle from "../../../Services/useTitle";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { NavLink, useNavigate } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";
import HolidayModel from "../../../Model/HolidayModel";
import { useForm } from "react-hook-form";
import holidaysService from "../../../Services/AdminService";
import notifyService from "../../../Services/NotifyService";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import adminService from "../../../Services/AdminService";

function AddHoliday(): JSX.Element {
  useTitle("HolidayApp | add-holiday");
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm<HolidayModel>();

  async function sendHoliday(holiday: HolidayModel) {
    try {
      console.log(holiday.image);
      holiday.image = (holiday.image as unknown as FileList)[0];

      console.log(holiday);
      await adminService.addHoliday(holiday);
      notifyService.success("holiday was added");
      navigate("/admin/");
    } catch (err: any) {
      notifyService.error(err.message);
    }
  }

  return (
    <>
      <div>
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

        <div className="AddHoliday">
          <div
            className="AddHoliday Box"
            style={{ width: "300px", margin: "0 auto" }}>
            <form onSubmit={handleSubmit(sendHoliday)}>
              <h2>Add a Holiday</h2>
              <TextField
                required
                id="destination"
                label="destination"
                type="text"
                variant="outlined"
                fullWidth
                margin="normal"
                {...register("destination")}
              />
              <TextField
                required
                id="description"
                label="description"
                rows={4}
                type="text"
                variant="outlined"
                fullWidth
                margin="normal"
                {...register("description")}
              />
              <br />
              <TextField
                required
                id="startDate"
                label="Start on:"
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
                required
                id="endDate"
                label="Ends on:"

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
                required
                id="price"
                label="price"
                type="number"
                variant="outlined"
                fullWidth
                margin="normal"
                {...register("price")}
              />

              <div className="icon Box">
                <input
                  type="file"
                  accept="image/*"
                  {...register("image")}
                  style={{ display: "none" }} // Hide the input element
                  id="uploadInput"
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
                type="submit"
                fullWidth>
                Add Holiday
              </Button>
              <hr />
              <Button variant="outlined" color="primary" fullWidth>
                Cancel
              </Button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default AddHoliday;
