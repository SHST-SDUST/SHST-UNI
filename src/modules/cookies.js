import storage from "./storage.js";

/**
 * GetCookie
 */
function getCookies(res) {
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
}

export { getCookies };
export default { getCookies };
