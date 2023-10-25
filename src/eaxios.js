import axios from "axios";
const baseUrl = "https://mapi.harmoney.dev/api/v1/";

const instance = axios.create({
  baseURL: baseUrl,
});

instance.interceptors.request.use(
  (config) => {
    let token = "-erA2Hla6SkvtiCw"; //Note: This should be in a .env file
    config.headers["Authorization"] = token;
    config.headers["Content-Type"] = "application/json";
    return config;
  },
  (err) => {
    return Promise.reject(err);
  }
);

instance.interceptors.response.use(
  (config) => {
    return config;
  },
  (err) => {
    return Promise.reject(err);
  }
);

export default instance;
