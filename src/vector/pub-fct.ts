import util from "@/modules/datetime";
import { confirm } from "@/modules/toast";

/**
 * 统一处理课表功能
 */
type RemoteTableInfo = Array<null | {
    jsxm: string;
    jsmc: string;
    jssj: string;
    kssj: string;
    kkzc: string;
    kcsj: string;
    kcmc: string;
    sjbz: number;
}>;
interface ClassItem {
    day: number;
    knot: number;
    className: string;
    teacher: string;
    classroom: string;
    background: string;
}
interface TableItem {
    background: string;
    table: Array<ClassItem>;
}
export function tableDispose(info: RemoteTableInfo, oneDay: true): Array<TableItem>;
export function tableDispose(info: RemoteTableInfo, oneDay: false): Array<Array<TableItem>>;
export function tableDispose(
    info: RemoteTableInfo,
    oneDay = false
): Array<TableItem> | Array<Array<TableItem>> {
    const tableArr: Array<Array<TableItem>> = [];
    let week = util.safeDate().getDay() - 1;
    if (week === -1) week = 6;
    info.forEach(value => {
        if (!value) return void 0;
        const day = ~~value.kcsj[0] - 1;
        if (oneDay && day !== week) return void 0;
        const knotArr = value.kcsj
            .slice(1)
            .replace(/(\d{4})/g, "$1,")
            .split(",");
        const uniqueNum = Number(
            Array.prototype.reduce.call(value.kcmc, (pre, cur) => pre + cur.charCodeAt(), 0)
        );
        const colorSignal = uni.$app.data.colorList[uniqueNum % uni.$app.data.colorN];
        const classObj: ClassItem = {
            day: day,
            knot: 0,
            className: value.kcmc.split("（")[0],
            teacher: value.jsxm,
            classroom: value.jsmc,
            background: colorSignal,
        };

        knotArr.forEach(v => {
            if (!v) return void 0;
            const knot = Number(v.slice(1, 2)) >> 1;
            classObj.knot = knot;
            if (!tableArr[day]) tableArr[day] = [];
            if (!tableArr[day][knot]) tableArr[day][knot] = { background: colorSignal, table: [] };
            tableArr[day][knot].table.push(classObj);
        });
    });
    if (oneDay) return tableArr[week];
    else return tableArr;
}

export function todoDateDiff(
    startDateString: string,
    endDateString: string,
    content: string
): [string, string] {
    const colorList = uni.$app.data.colorList;
    const colorN = uni.$app.data.colorList.length;
    const color = colorList[content.charCodeAt(0) % colorN];
    const diff = util.dayDiff(startDateString, endDateString);
    let tips = "";
    if (diff === 0) tips = "今";
    else if (diff < 0) tips = "超期" + Math.abs(diff);
    else tips = "距今" + Math.abs(diff);
    return [tips, color];
}

export function getCurWeek(startTime: string): number {
    console.log(util.formatDate());
    if (util.formatDate() < startTime) return 1;
    const week = util.dayDiff(startTime, util.formatDate()) / 7 + 1;
    return week;
}

export async function registerCheck(
    funct: () => void,
    cancel: null | (() => void) = null
): Promise<void> {
    if (uni.$app.data.userFlag) {
        funct();
    } else {
        const choice = await confirm("提示", "使用该功能需要登录小程序，是否前去登录？");
        if (choice) uni.navigateTo({ url: "/pages/home/auxiliary/login" });
        else cancel?.();
    }
}

export function share(
    path = "pages/home/tips/tips",
    imageUrl: null | string = null,
    title = "山科小站"
): { title: string; imageUrl: string | null; path: string } {
    return { title, imageUrl, path };
}

export default { todoDateDiff, getCurWeek, tableDispose, registerCheck, share };
