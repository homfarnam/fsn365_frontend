import fetch from "isomorphic-unfetch";
import getConfig from "next/config";

export default function getFetch(path, params = {}) {
  const { publicRuntimeConfig } = getConfig();
  const url = publicRuntimeConfig.API_PATH + path + toQueryString(params);
  return fetch(url);
}

function toQueryString(params) {
  Object.keys(params).map(key => {
    if (!params[key]) {
      delete params[key];
    }
  });
  return (
    "?" +
    Object.keys(params)
      .map(function(key) {
        return encodeURIComponent(key) + "=" + encodeURIComponent(params[key]);
      })
      .join("&")
  );
}
