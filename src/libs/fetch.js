import fetch from "isomorphic-fetch";
import promise from "es6-promise";
import getConfig from "next/config";

promise.polyfill();

export default function getFetch(path, params = {}) {
  const { publicRuntimeConfig } = getConfig();
  const apiUrl = publicRuntimeConfig.API_PATH + path;
  const url = apiUrl + toQueryString(params);
  return fetch(url, {
    method: "GET",
    mode: "cors",
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json"
    }
  });
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
