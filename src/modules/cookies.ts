import storage from "./storage";

/**
 * GetCookie
 */
export const getCookies = (res: { header: { [key: string]: string } }): string => {
    let cookies = "";
    if (res && res.header) {
        for (const item in res.header) {
            if (item.toLowerCase() === "set-cookie") {
                const cookie = res.header[item].match(/.*?=.*?;/);
                cookies += cookie; // [] + "" = ""
            }
        }
        console.log("SetCookie:", cookies);
        storage.setPromise("cookies", cookies);
    } else {
        console.log("Get Cookie From Cache");
        cookies = storage.get("cookies") || "";
    }
    return cookies;
};

export default { getCookies };
