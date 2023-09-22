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
import indexConfig from "../../../Services/api/indexConfig";

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
  onDeleteHoliday: (id: number) => void;
  onEditHoliday: (id: number) => void;
  isFollowed: boolean;
  followerCount: number;
  userRole: string; // Add a userRole prop
}

function Card(props: CardProps): JSX.Element {
  const [isFollowed, setIsFollowed] = useState(false);
  const [followerCount, setFollowerCount] = useState(props.followerCount || 0);
  
  const handleCheckboxChange = async () => {
    try {
      // Toggle the follow status locally
      setIsFollowed(!isFollowed);
  
      // Make an API call to update the follow status on the server
      const response = await fetch(indexConfig.followApi + `/${props.id}`, {
        method: isFollowed ? "DELETE" : "POST", // Use the follow API endpoint
      });
  
      if (!response.ok) {
        // Handle errors here
        console.error("Failed to update follow status");
        // You may want to revert the local state on error
        setIsFollowed(!isFollowed);
      } else {
        // Update the follower count on success
        const data = await response.json();
        setFollowerCount(data.followerCount);
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

      {props.userRole === "admin" && ( // Render IconButton only for admin users
        <IconButton
          onClick={() => {
            props.onEditHoliday(props.id);
          }}
        >
          <EditIcon />
        </IconButton>
      )}

      <div>
        <Checkbox
          checked={isFollowed}
          onChange={handleCheckboxChange}
          icon={<BookmarkBorderIcon />}
          checkedIcon={<BookmarkIcon style={{ color: teal[500] }} />}
        />
        <span>Followers: {followerCount}</span>
      </div>
    </div>
  );
}

export default Card;
