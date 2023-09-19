import useTitle from "../../../Services/useTitle";
import Menu from "../../LayoutArea/Menu/Menu";
import HolidayList from "../HolidayList/HolidayList";
import "./Home.css";
import { useNavigate } from 'react-router-dom';


function Home(): JSX.Element {
  useTitle("HolidayApp | Home");
  const navigate = useNavigate();

  return (
    <>
    <Menu/>
      <div className="cardContainer">
        <HolidayList />
      </div>
    </>
  );
}
export default Home;
