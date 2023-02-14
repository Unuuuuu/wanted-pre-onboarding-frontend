import axios from "axios";

export interface AxiosErrorResponseData {
  error: string;
  message: string;
  statusCode: number;
}

const axoisInstance = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

export default axoisInstance;
