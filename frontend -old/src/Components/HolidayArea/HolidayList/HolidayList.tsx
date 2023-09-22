// HolidayList.tsx
import React, { useEffect, useState, FC } from "react";
import "./HolidayList.css";
import HolidayModel from "../../../Model/HolidayModel";
import IconButton from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import notifyService from "../../../Services/NotifyService";
import Card from "../HolidayCard/Card";
import holidaysService from "../../../Services/HolidaysService";
import { useSelector } from "react-redux";
import { CheckedMode } from "../../../Redux/HolidaysState";

interface Props {
  onClickedCard?: (holiday: HolidayModel) => void;
  onEditHoliday?: (id: number) => void;
  hideFollowButton?: boolean;
  onDeleteHoliday?: (id: number) => void;
}

const HolidayList: FC<Props> = ({
  onClickedCard,
  onEditHoliday,
  hideFollowButton,
  onDeleteHoliday,
}) => {
  const [holidays, setHolidays] = useState<HolidayModel[]>([]);
  const [filteredHolidays, setFilteredHolidays] = useState<HolidayModel[]>([]);

  const filterHolidaysMode = useSelector(
    (state: { mode: CheckedMode }) => state.mode
  );

  useEffect(() => {
    // Get holidays:
    holidaysService
      .getAllHolidays()
      .then((backendHolidays) => {
        console.log(
          "🚀 ~ file: HolidayList.tsx:37 ~ .then ~ backendHolidays:",
          backendHolidays
        );

        setFilteredHolidays(backendHolidays);
        setHolidays(backendHolidays);
      })
      .catch((err) => notifyService.error(err));
  }, []);

  const handleClickedCard = (holiday: HolidayModel) => {
    onClickedCard?.(holiday);
  };

  return (
    <div className="HolidayList">
      {filteredHolidays?.length &&
        filteredHolidays.map((holiday: HolidayModel) => (
          <div key={holiday.id}>
            <Card
              onClick={() => handleClickedCard(holiday)}
              id={holiday.id}
              destination={holiday.destination}
              description={holiday.description}
              start_date={new Date(holiday.start_date)}
              end_date={new Date(holiday.end_date)}
              price={holiday.price}
              image_url={holiday.image_url}
              onEditHoliday={onEditHoliday}
              hideFollowButton={hideFollowButton}
              onDeleteHoliday={onDeleteHoliday}
              userRole={"user"} 
              isFollowed={holiday.isFollowed || false} 
              followerCount={holiday.followerCount || 0} 
            
            />
          </div>
        ))}
    </div>
  );
};

export default HolidayList;
