import React from "react";

type Vacation = {};
type Props = {
  vacation: Vacation;
  editMode: "add" | "update";
  submitHandler: () => Vacation;
};

const VacationForm = ({ vacation, editMode, submitHandler }: Props) => {
  return <div>index</div>;
};

export default VacationForm;

const x = () => {
  return <VacationCard vacation={vacation}>
    <Button text={'a'} />
    <Button text={'b'} />
  </VacationCard>
};

{children}