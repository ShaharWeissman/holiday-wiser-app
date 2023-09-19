import React from "react";
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import "./DeleteHoliday.css";

interface Props {
  onDelete: () => void;
}

const DeleteHoliday: React.FC<Props> = ({ onDelete }) => {
  return (
    <div className="DeleteHoliday" onClick={onDelete}>
      <RemoveCircleIcon fontSize="small" color="error" />
    </div>
  );
};

export default DeleteHoliday;



