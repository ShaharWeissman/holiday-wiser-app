
import { Route, Routes, Navigate } from "react-router-dom";
import Page404 from "../Page404/Page404";
import Home from "../../HolidayArea/Home/Home";
import SignUp from "../../AuthArea/SignUp/SignUp";
import Login from "../../AuthArea/Login/Login";

function MainRoute(): JSX.Element {
  return (
    <div className="MainRoute">
      <Routes>
      <Route path="*" element={<Navigate to="/auth/login" />} />
      <Route path="auth/signup" element={<SignUp />} />
      <Route path="auth/login" element={<Login />} />
      <Route path="/home" element={<Home />} />
      <Route path="/admin/add-holiday" element={<AdminAddHoliday />} />
      <Route path="/admin/edit-holiday/:id" element={<AdminEditHoliday />} />
      <Route path="/admin/holidays-report" element={<AdminHolidaysReport />} />
      <Route path="*" element={<Page404 />} />
      </Routes>
    </div>
  );
}

export default MainRoute;
