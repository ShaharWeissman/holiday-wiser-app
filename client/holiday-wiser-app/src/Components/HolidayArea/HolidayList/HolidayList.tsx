import { useEffect, useState } from "react";
import HolidayModel from "../../../Models/HolidayModel";
import notifyService from "../../../Services/NotifyService";
import CheckBox from "../CheckBox/CheckBox";
import indexConfig from "../../../Services/IndexConfig";
import axios from "axios";
import { HolidaysAction, HolidaysActionType, holidaysStore } from "../../../Redux/HolidaysState";

interface Props {
  onClickedCard?: (holiday: HolidayModel) => void;
  onEditHoliday?: (id: number) => void;
  hideFollowButton?: boolean;
}

const HolidayList: FC<Props> = ({ hideFollowButton }) => {
  const [holidays, setHolidays] = useState<HolidayModel[]>([]);

  useEffect(() => {
    const getAllHolidays = async () => {
      // Get holiday from global state
      let holidays = holidaysStore.getState().holidays;

      // When there are no holidays in global state
      if (holidays.length === 0) {
        try {
          // Get all the holidays inside the response object
          const response = await axios.get<HolidayModel[]>(
            indexConfig.holidaysApi + "/getAllHolidays/"
          );

          // Save holidays in global state
          const action: HolidaysAction = {
            type: HolidaysActionType.SetAllHolidays,
            payload: holidays,
          };
          holidaysStore.dispatch(action);

          // Take the "holiday" from the response and return it
          holidays = response.data;
        } catch (err) {
          notifyService.error(err);
        }
      }
      return holidays;
    };

    const fetchHolidays = async () => {
      try {
        const backendHolidays = await getAllHolidays();
        setHolidays(backendHolidays);
      } catch (err) {
        notifyService.error(err);
      }
    };

    fetchHolidays();
  }, []);


  const handleClickedCard = (holiday: HolidayModel) => {
    onClickedCard?.(holiday);
  };

  return (
    <div className="HolidayList">
      <span className="MenuLabel">Holiday Status:</span>
      <CheckBox />
      
      {holidays?.length &&
        holidays.map((holiday: HolidayModel) => (
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
            />
          </div>
        ))}
    </div>
  );
};

export default HolidayList;
