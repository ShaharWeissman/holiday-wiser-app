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
}

// const Card: React.FC<CardProps> = ({  }) => {
function Card(props: CardProps): JSX.Element {
  const [isFollowed, setIsFollowed] = useState(false);
  const [userRole, setUserRole] = useState("");
  const user = localStorage.getItem("user");

  useEffect(() => {
    const user = localStorage.getItem("user");
    setUserRole(user);
    console.log({ userRole });
  }, [userRole]);

  const handleCheckboxChange = () => {
    setIsFollowed(!isFollowed);
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
          }}>
          <EditIcon />
        </IconButton>
      )}

      {userRole === "user" && (
        <Checkbox
          checked={isFollowed}
          onChange={handleCheckboxChange}
          icon={<BookmarkBorderIcon />}
          checkedIcon={<BookmarkIcon style={{ color: teal[500] }} />}
        />
      )}
    </div>
  );
}

export default Card;
