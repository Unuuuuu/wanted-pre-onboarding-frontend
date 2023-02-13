import axios from "axios";

export interface AxiosResponseData {
  error: string;
  message: string;
  statusCode: number;
}

const axoisInstance = axios.create({
  baseURL: "https://pre-onboarding-selection-task.shop/",
});

export default axoisInstance;
