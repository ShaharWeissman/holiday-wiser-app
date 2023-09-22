import React, { useEffect, useState } from "react";
import "./Card.css";
import { teal } from "@mui/material/colors";
import { Checkbox, IconButton } from "@mui/material";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import EditIcon from "@mui/icons-material/Edit";
import { NavLink } from "react-router-dom";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import DeleteHoliday from "../../AdminArea/DeleteHoliday/DeleteHoliday";

interface CardProps {
  onClick?: () => void;
  id: number;
  destination: string;
  description: string;
  start_date: Date;
  end_date: Date;
  price: number;
  image_url: string;
  hideFollowButton?: boolean;
  onEditHoliday: (id: number) => void;
  onDeleteHoliday: (id: number) => void;
  isFollowed: boolean; // This prop is enough, no need for local state
  followerCount: number;
}

function Card(props: CardProps): JSX.Element {
  const [userRole, setUserRole] = useState("");
  const user = localStorage.getItem("user");

  useEffect(() => {
    const user = localStorage.getItem("user");
    setUserRole(user);
    console.log({ userRole });
  }, [userRole]);

  const handleCheckboxChange = async () => {
    try {
      // Make an API call to update the follow status on the server
      const response = await fetch(`/api/follow/${props.id}`, {
        method: props.isFollowed ? "DELETE" : "POST",
      });

      if (!response.ok) {
        // Handle errors here
        console.error("Failed to update follow status");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleDeleteClick = () => {
    // Call the onDeleteHoliday prop to delete the specific card and holiday
    props.onDeleteHoliday(props.id);
  };

  return (
    <div className="card" onClick={props?.onClick}>
      <div className="card-header">{props.destination}</div>
      <div className="card-text">{props.description}</div>

      <div className="card-header-line"></div>

      <div className="card-date">
        <CalendarMonthIcon fontSize="small" />{" "}
        <span>
          {props.start_date.toDateString()} - {props.end_date.toDateString()}
        </span>
      </div>
      <NavLink to={"/holidays/:holidayId" + props.id}>
        <img className="card-image" src={props.image_url} alt="holiday" />
      </NavLink>
      <div className="card-price">Price: {+props.price} $</div>

      {userRole === "admin" && (
        <IconButton
          onClick={() => {
            props.onEditHoliday(props.id);
          }}
        >
          <EditIcon />
        </IconButton>
      )}

      {userRole === "user" && (
        <div>
          <Checkbox
            checked={props.isFollowed}
            onChange={handleCheckboxChange}
            icon={<BookmarkBorderIcon />}
            checkedIcon={<BookmarkIcon style={{ color: teal[500] }} />}
          />
          <span>Followers: {props.followerCount}</span>
        </div>
      )}
    </div>
  );
}

export default Card;
