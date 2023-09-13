const baseURL = "http://localhost:4000/api";

class IndexConfig {
  //Authentication Links
  public readonly signupApi = baseURL + "/auth/signup/";
  public readonly loginApi = baseURL + "/auth/login/";

  //Holiday Links
  public readonly holidaysApi = baseURL + "/holidays";
  public readonly addHolidayApi = baseURL + "/holidays/add-holiday";
  public readonly editHolidayApi = baseURL + "/holidays/edit-holiday";

  //Followers Links
  public readonly FollowerApi = baseURL + "/holidays/followers";
}

const indexConfig = new IndexConfig();
export default indexConfig;
