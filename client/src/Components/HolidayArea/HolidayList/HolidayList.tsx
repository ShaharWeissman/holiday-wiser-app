import { useEffect, useState, FC } from "react";
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
    //get holidays:
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

  // useEffect(() => {
  //   let filtered: HolidayModel[] = JSON.parse(JSON.stringify(holidays));
  //   switch (filterHolidaysMode) {
  //     case "all":
  //       filtered = holidays;
  //       break;
  //     case "followed":
  //       filtered = filteredHolidays.filter((holiday) => holiday);
  //       break;
  //     case "upcoming":
  //       filtered = filteredHolidays.filter((holiday) => holiday);

  //       break;
  //     case "ongoing":
  //       filtered = filteredHolidays.filter((holiday) => holiday);

  //       break;
  //       setFilteredHolidays(filtered);
  //   }
  // }, [filterHolidaysMode]);

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
              isFollowed={holiday.isFollowed}
              followerCount={holiday.followerCount}
              onAddFollow={() => {
                holiday.followerCount = holiday.followerCount + 1;
                holiday.isFollowed = holiday.isFollowed === 0 ? 1 : 0;
              }}
              onRemoveFollow={() => {
                holiday.followerCount = holiday.followerCount - 1;
                holiday.isFollowed = holiday.isFollowed === 0 ? 1 : 0;
              }}
            />
          </div>
        ))}
    </div>
  );
};

export default HolidayList;
