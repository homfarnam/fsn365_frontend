import axios from "axios";

axios.defaults.baseURL = "https://api.fsn365.com/";
axios.interceptors.request.use(config => {
  config.headers["Content-Type"] = "application/json";
  return config;
});
axios.interceptors.response.use(
  response => {
    const { data } = response.data || {};
    return data || {};
  },
  error => {
    console.debug("error:", error);
    return {};
  }
);

export default axios;
