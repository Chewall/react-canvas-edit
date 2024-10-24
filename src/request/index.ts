import axios from "axios";
import docCookies from "../utils/cookies";

export const end = "";

export function common(
    res: any,
    successCallback: Function,
    failedCallback?: Function
) {
  if (res.status === 200) {
    const code = res.data.code || 200;
    if (code === 200) {
      successCallback(res.data.result);
    } else {
      failedCallback ? failedCallback() : alert(res.data.msg || "信息有误，失败！");
    }
  } else {
    failedCallback ? failedCallback() : alert("请求失败！");
  }
}

function getHeaders(): {
  headers: {
    Authorization: string;
  };
} {
  return { headers: { Authorization: docCookies.getItem("sessionId") || "" } };
}

export const myAxios = {
  get: (url: string, values?: any) => axios.get(url, getHeaders()),
  post: (url: string, values: any) => axios.post(url, values, getHeaders()),
};
