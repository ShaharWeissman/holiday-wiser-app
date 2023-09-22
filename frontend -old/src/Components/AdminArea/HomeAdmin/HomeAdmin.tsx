import { useState } from "react";
import HolidayModel from "../../../Model/HolidayModel";
import adminService from "../../../Services/AdminService";
import useTitle from "../../../Services/useTitle";
import HolidayList from "../../HolidayArea/HolidayList/HolidayList";
import MenuAdmin from "../MenuAdmin.tsx/MenuAdmin";
import { useNavigate } from "react-router-dom";
import notifyService from "../../../Services/NotifyService";

function HomeAdmin(): JSX.Element {
  useTitle("HolidayApp | Home-admin");
  const navigate = useNavigate();

  const handleHolidayCardClick = (holiday: HolidayModel) => {
    navigate(`edit-holiday/${holiday.id}`, {
      state: holiday,
    });
  };

  const handleDeleteHoliday = (id: number) => {
    // Toggle the state to show the delete icons

    // Call the deleteHoliday function from your adminService with the given ID
    adminService
      .deleteHoliday(id)
      .then(() => {
        // Handle any additional actions after successful deletion (e.g., updating the UI)
      })
      .catch((error) => {
        // Handle errors if the deletion fails
        console.error("Error deleting holiday:", error);
      });
  };

  return (
    <>
      <MenuAdmin />
      <div className="cardContainer">
        <HolidayList
          onClickedCard={handleHolidayCardClick}
          hideFollowButton={true}
          onDeleteHoliday={handleDeleteHoliday}
          onEditHoliday={(id) => {
            console.log(
              "🚀 ~ file: HomeAdmin.tsx:44 ~ HomeAdmin ~ holidayId:",
              id
            );

            navigate(`/admin/edit-holiday/${id}`);
          }}
        />
      </div>
    </>
  );
}
export default HomeAdmin;
