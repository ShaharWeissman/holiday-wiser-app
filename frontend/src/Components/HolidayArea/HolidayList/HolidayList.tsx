import { useEffect, useState, FC } from "react";
import "./HolidayList.css";
import HolidayModel from "../../../Model/HolidayModel";
import  IconButton  from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import notifyService from "../../../Services/NotifyService";
import Card from "../HolidayCard/Card";
import holidaysService from "../../../Services/HolidaysService";


interface Props {
  onClickedCard?: (holiday: HolidayModel) => void;
  onEditHoliday?: (id: number) => void;
  hideFollowButton?: boolean; 
  onDeleteHoliday?: (id: number) => void;
}

const HolidayList: FC<Props> = ({
  onClickedCard,
  onEditHoliday = () => {},
  hideFollowButton,
  onDeleteHoliday,
 
}) => {  
  const [holidays, setHolidays] = useState<HolidayModel[]>([]);

useEffect(() => {
  //get holidays:
  holidaysService.getAllHolidays()
  .then(backendHolidays => setHolidays(backendHolidays))
  .catch(err => notifyService.error(err));
},[]);
  



//fetching holiday data from api
  // const handleInit = async () => {
  //   try {
  //     const res = await getHolidaysApi();
  //     setHolidays(res.data);
  //   } catch(err) {
  //     console.log(err)
  //   }
  // }

  // useEffect(() => {
  //   handleInit()
  // }, []);
// =====

  const handleClickedCard = (holiday: HolidayModel) =>{
    onClickedCard?.(holiday);
  }



  return (
    <div className="HolidayList">
    {holidays?.length && holidays.map((holiday: HolidayModel) => (
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
          />
      </div>
    ))}
  </div>
);
};

export default HolidayList;



