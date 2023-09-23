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
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);

  const filterHolidaysMode = useSelector(
    (state: { mode: CheckedMode }) => state.mode
  );

  const chnageHolidayFollowData = (holiday: HolidayModel) => {
    const holidays = [...filteredHolidays];
    const index = holidays.findIndex(
      (h) => h.id === holiday.id
    );
    holidays[index] = holiday;
    setFilteredHolidays(holidays);
  };

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

  useEffect(() => {
    let filtered: HolidayModel[] = JSON.parse(JSON.stringify(holidays));
    const holidaysPreFiltered = [...holidays];

    switch (filterHolidaysMode) {
      case "all":
        filtered = holidays;
        break;
      case "followed":
        filtered = holidaysPreFiltered.filter((holiday) => holiday.isFollowed);
        break;
      case "upcoming":
        filtered = holidaysPreFiltered.filter((holiday) => new Date(holiday.start_date) > new Date());

        break;
      case "ongoing":
        filtered = holidaysPreFiltered.filter((holiday) => new Date(holiday.start_date) < new Date() && new Date(holiday.end_date) > new Date());

        break;
    }
    setFilteredHolidays(filtered);
  }, [filterHolidaysMode]);



  useEffect(() => {
    setCurrentPage(1);
  }, [filteredHolidays]);

  const handleClickedCard = (holiday: HolidayModel) => {
    onClickedCard?.(holiday);
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredHolidays.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);


  return (
    <div className="container">

      <div className="pagination-controls">
        <button onClick={() => paginate(currentPage - 1)} disabled={currentPage === 1}>
          Previous
        </button>
        <span>Page {currentPage}</span>
        <button onClick={() => paginate(currentPage + 1)} disabled={currentPage === Math.ceil(filteredHolidays.length / itemsPerPage)}>
          Next
        </button>
      </div>

      <div className="HolidayList">
        {currentItems?.length &&
          currentItems.map((holiday: HolidayModel, key) => (
            <div key={holiday.id + key}>
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
                onDeleteHoliday={() => {
                  const holidaysPreRemoveOne = [...holidays];
                  const index = holidaysPreRemoveOne.findIndex(h => h.id === holiday.id);
                  holidaysPreRemoveOne.splice(index, 1);
                  setHolidays(holidaysPreRemoveOne);
                  setFilteredHolidays(holidays);
                  setCurrentPage(1);
                }}
                isFollowed={holiday.isFollowed}
                followerCount={holiday.followerCount}
                onAddFollow={() => {
                  holiday.followerCount = holiday.followerCount + 1;
                  holiday.isFollowed = holiday.isFollowed === 0 ? 1 : 0;
                  chnageHolidayFollowData(holiday)
                }}
                onRemoveFollow={() => {
                  holiday.followerCount = holiday.followerCount - 1;
                  holiday.isFollowed = holiday.isFollowed === 0 ? 1 : 0;
                  chnageHolidayFollowData(holiday)
                }}
              />
            </div>
          ))}
      </div>
    </div>
  );
};

export default HolidayList;
