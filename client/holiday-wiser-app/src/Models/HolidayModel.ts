interface HolidayModel {
     id: number;
     destination: string;
     description: string;
     start_date: Date;
     end_date: Date;
     price: number;
     image_url: string; // Image url serving the uploaded image.
     image: File; // Image file to upload to backend.
  }
  
  export default HolidayModel;
  