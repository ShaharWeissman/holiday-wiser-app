
const baseURL = "http://localhost:4000/api";

class IndexConfig {
  public readonly signupUrl = baseURL + "/auth/signup/";
  public readonly loginUrl =  baseURL + "/auth/login/";
  public readonly holidaysApi =  baseURL + "/holidays";


}

 const indexConfig = new IndexConfig();
export default indexConfig;

