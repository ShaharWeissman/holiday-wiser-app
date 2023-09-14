import React from "react";

type Holiday = {};
type Props = {
  Holiday: Holiday;
  editMode: "add" | "update";
  submitHandler: () => Holiday;
};

const HolidayForm = ({ Holiday, editMode, submitHandler }: Props) => {
  return <div>index</div>;
};

export default HolidayForm;

const x = () => {
  return <HolidayCard Holiday={Holiday}>
    <Button text={'a'} />
    <Button text={'b'} />
  </HolidayCard>
};

{children}