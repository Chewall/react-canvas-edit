import axios from "axios";
import { common, end } from "./index";
import docCookies from "../utils/cookies";

export function login(
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

    common(
        res,
        () => {
            console.log("Login success");
            docCookies.setItem("sessionId", res.data.result.sessionId);
            docCookies.setItem("name", res.data.result.name);
            successCallback();
        },
        failedCallback
    );
}

export const logout = (callback: () => void) => {
    docCookies.removeItem("sessionId");
    docCookies.removeItem("name");
    callback();
};
