import fetch from "isomorphic-fetch";
import getConfig from "next/config";

export default function getFetch(path, params = {}) {
  const { publicRuntimeConfig } = getConfig();
  const apiUrl = publicRuntimeConfig.API_PATH + path;
  const url = apiUrl + toQueryString(params);
  console.log(url);
  return fetch(url);
}

function toQueryString(params) {
  let size = 0;
  Object.keys(params).map(key => {
    if (!params[key]) {
      delete params[key];
    } else {
      size++;
    }
  });
  if (size) {
    return (
      "?" +
      Object.keys(params)
        .map(function(key) {
          return (
            encodeURIComponent(key) + "=" + encodeURIComponent(params[key])
          );
        })
        .join("&")
    );
  }
  return "";
}
