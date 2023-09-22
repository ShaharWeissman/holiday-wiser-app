class HolidayModel {
    public id: number;
    public destination: string;
    public description: string;
    public start_date: Date;
    public end_date: Date;
    public price: number;
    public image_url: string; // Image url serving the uploaded image.
    public image: File; // Image file to upload to backend.
    isFollowed: number;
    followerCount: number;
  }
  
  export default HolidayModel;
  