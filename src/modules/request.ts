import loading from "./loading";
import { getCookies } from "./cookies";
import { extend } from "./copy";
import { toast } from "./toast";
import operateLimit from "./operate-limit";

const throttle = operateLimit.throttleFactory();
const debounce = operateLimit.debounceFactory();

const headers = {
    "cookie": "",
    "content-type": "application/x-www-form-urlencoded",
};

export interface RequestInfo {
    title?: string;
    load?: number;
    url: string;
    method?: Parameters<typeof uni.request>[0]["method"];
    data?: Record<string, unknown>;
    cookie?: boolean;
    debounce?: boolean;
    throttle?: boolean;
    headers?: typeof headers;
    success?: (res: UniApp.RequestSuccessCallbackResult) => void;
    fail?: (res: UniApp.GeneralCallbackResult) => void;
    complete?: (res: UniApp.GeneralCallbackResult) => void;
    completeLoad?: (res: UniApp.GeneralCallbackResult) => void;
    [key: string]: unknown;
}

type NoUndefinedField<T> = { [P in keyof T]-?: NonNullable<T[P]> };

export type RequestOptionsAllNeeded = NoUndefinedField<RequestInfo>;

/**
 * HTTP请求
 */
export const ajax = (requestInfo: RequestInfo): void => {
    const option: RequestOptionsAllNeeded = {
        title: "",
        load: 1,
        url: "",
        method: "GET",
        data: {},
        cookie: true,
        debounce: false,
        throttle: false,
        headers: headers,
        success: () => void 0,
        fail: function () {
            this.completeLoad = () => toast("External Error");
        },
        complete: () => void 0,
        completeLoad: () => void 0,
    };
    extend(option, requestInfo);
    const run = () => {
        loading.start(option);
        console.log("Request for", option.url);
        uni.request({
            url: option.url,
            data: option.data,
            method: option.method,
            header: headers,
            success: function (res) {
                if (option.cookie && !headers.cookie) headers.cookie = getCookies(res);
                if (option.cookie && !headers.cookie) {
                    option.fail({ ...res, errMsg: "No Cookies" });
                }
                if (res.statusCode === 200) {
                    if (
                        typeof res.data === "object" &&
                        !(res.data instanceof ArrayBuffer) &&
                        res.data.status
                    ) {
                        if (res.data.status === -1 && res.data.msg) {
                            const popupMsg = res.data.msg;
                            option.completeLoad = () => toast(popupMsg);
                            return void 0;
                        }
                    }
                    try {
                        option.success(res);
                    } catch (e) {
                        const ERROR_MSG = "Execute Fail";
                        option.fail({ ...res, errMsg: ERROR_MSG });
                        option.completeLoad = () => toast(ERROR_MSG);
                        console.log(e);
                    }
                } else {
                    option.fail({ ...res, errMsg: "Response No Status" });
                }
            },
            fail: function (res) {
                option.fail(res);
            },
            complete: function (res) {
                loading.end(option);
                try {
                    option.complete(res);
                } catch (e) {
                    console.log(e);
                }
                option.completeLoad(res);
            },
        });
    };
    if (option.debounce) debounce(500, () => run());
    else if (option.throttle) throttle(500, () => run());
    else run();
};

/**
 * request promise封装
 */
type ResponseDataType = UniApp.RequestSuccessCallbackResult["data"];
export type PromiseFulfilled<T> = Omit<UniApp.RequestSuccessCallbackResult, "data"> & {
    data: T;
};
export const request = <T extends ResponseDataType>(
    requestInfo: RequestInfo
): Promise<PromiseFulfilled<T>> => {
    return new Promise((resolve, reject) => {
        requestInfo.success = res => resolve(res as PromiseFulfilled<T>);
        requestInfo.fail = res => reject(res);
        ajax(requestInfo);
    });
};

ajax.headers = headers;
request.headers = headers;

export default { ajax, request };
