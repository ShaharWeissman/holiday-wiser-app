// MainRoute.jsx
import { Route, Routes, Navigate } from "react-router-dom";
import Home from "../Components/HolidayArea/Home/Home";
import SignUp from "../Components/AuthArea/SignUp/SignUp";
import HomeAdmin from "../Components/AdminArea/HomeAdmin/HomeAdmin";
import AddHoliday from "../Components/AdminArea/AddHoliday/AddHoliday";
import EditHoliday from "../Components/AdminArea/EditHoliday/EditHoliday";
import Login from "../Components/AuthArea/Login/Login";
import HolidaysReport from "../Components/AdminArea/HolidaysReport/HolidaysReport";
import Page404 from "../Components/Pages/Page404/Page404";

function MainRoute(): JSX.Element {
  return (
    <div className="MainRoute">
      <Routes>
      <Route path="*" element={<Navigate to="/auth/login" />} />
      <Route path="auth/signup" element={<SignUp />} />
      <Route path="auth/login" element={<Login />} />
      <Route path="/home" element={<Home />} />
      <Route path="/admin/" element={<HomeAdmin />} />
      <Route path="/admin/add-holiday" element={<AddHoliday />} />
      <Route path="/admin/edit-holiday/:id" element={<EditHoliday />} />
      <Route path="/admin/holidays-report" element={<HolidaysReport />} />
      <Route path="*" element={<Page404 />} />
      </Routes>
    </div>
  );
}

export default MainRoute;
