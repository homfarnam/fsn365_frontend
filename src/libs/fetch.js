import fetch from "isomorphic-unfetch";
import getConfig from "next/config";

export default function getFetch(path) {
  const { publicRuntimeConfig } = getConfig();
  const url = publicRuntimeConfig.API_PATH + path;
  return fetch(url);
}
