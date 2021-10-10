/**
 * 正则匹配
 */
export const regMatch = (regex: RegExp, s: string): Array<string> => {
    const result = [];
    let temp = null;
    const flags = `${regex.flags}${regex.global ? "" : "g"}`;
    regex = new RegExp(regex, flags);
    while ((temp = regex.exec(s))) result.push(temp[1] ? temp[1] : temp[0]);
    return result;
};

export default { regMatch };
