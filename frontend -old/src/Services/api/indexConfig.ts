
const baseURL = "http://localhost:4000/api";

class IndexConfig {
  public readonly signupUrl = baseURL + "/auth/signup/";
  public readonly loginUrl =  baseURL + "/auth/login/";
  public readonly holidaysApi =  baseURL + "/holidays";
  public readonly followApi = baseURL + "/follow"; // Add a new property for follow API


}

 const indexConfig = new IndexConfig();
export default indexConfig;

