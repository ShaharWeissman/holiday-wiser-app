import axios from "axios";
import { authStore } from "../Redux/AuthState";
import axiosInstance from "../Services/http.service";


class Interceptors {
  public create(): void {
    // Set up request interceptor
    axiosInstance.interceptors.request.use((requestObject) => {
      console.log("Interceptor triggered"); 
      // Note: requestObject has all the info that is sent in the request
      if (authStore.getState().token) {
        
     requestObject.headers.Authorization = "Bearer " + authStore.getState().token;
     requestObject.headers.guardKey = "holiday-every-day"
      }

      return requestObject;
    });
  }
}

const interceptor = new Interceptors();

export default interceptor;