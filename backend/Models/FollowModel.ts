import HolidayModel from "./HolidayModel";
import UserModel from "./UserModel";

class FollowModel {
    public holiday: HolidayModel;
    public user: UserModel;

    constructor(
        holiday: HolidayModel,
        user: UserModel,
    ){
        this.holiday = holiday;
        this.user = user;
    }
}

export default FollowModel;
