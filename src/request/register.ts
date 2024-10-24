import {common} from "./index";

export function register(
    values: { name: string; password: string },
    successCallback: Function,
    failedCallback?: Function
) {
  const res = {
    status: 200,
    data: {
      code: 200,
      result: {
        sessionId: "mockSessionId",
        name: values.name
      }
    }
  };

  common(res, () => {
    console.log("Register success");
    successCallback();
  }, failedCallback);
}
