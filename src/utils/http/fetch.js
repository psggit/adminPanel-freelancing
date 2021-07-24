import axios from "axios";
import { config } from "./../../config";

const getHeaders = () => {
  const json_headers = {
    "content-Type": "application/json",
  };

  return Object.assign({}, json_headers);
};

export const service = () => {
  return axios.create({
    baseURL: `${config.API_SERVER}`,
    headers: getHeaders(),
    //withCredentials: true
  });
};
