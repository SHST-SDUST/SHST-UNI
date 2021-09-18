import util from "@/modules/datetime";

/**
 * 统一处理课表功能
 */
function tableDispose(info, oneDay = false) {
    const tableArr = [];
    let week = util.safeDate().getDay() - 1;
    if (week === -1) week = 6;
    info.forEach(value => {
        if (!value) return void 0;
        const classObj = {};
        const day = ~~value.kcsj[0] - 1;
        if (oneDay && day !== week) return void 0;
        const knotArr = value.kcsj
            .slice(1)
            .replace(/(\d{4})/g, "$1,")
            .split(",");
        const uniqueNum = Array.prototype.reduce.call(
            value.kcmc,
            (pre, cur) => pre + cur.charCodeAt(),
            0
        );
        const colorSignal = uni.$app.data.colorList[uniqueNum % uni.$app.data.colorN];
        classObj.day = day;
        classObj.className = value.kcmc.split("（")[0];
        classObj.teacher = value.jsxm;
        classObj.classroom = value.jsmc;
        classObj.background = colorSignal;
        knotArr.forEach(v => {
            if (!v) return void 0;
            const knot = v.slice(1, 2) >> 1;
            classObj.knot = knot;
            if (!tableArr[day]) tableArr[day] = [];
            if (!tableArr[day][knot]) tableArr[day][knot] = { background: colorSignal, table: [] };
            tableArr[day][knot].table.push(classObj);
        });
    });
    if (oneDay) return tableArr[week];
    else return tableArr;
}

function todoDateDiff(startDateString, endDateString, content) {
    const colorList = uni.$app.data.colorList;
    const colorN = uni.$app.data.colorList.length;
    const color = colorList[content.charCodeAt() % colorN];
    let diff = util.dayDiff(startDateString, endDateString);
    if (diff === 0) diff = "今";
    else if (diff < 0) diff = "超期" + Math.abs(diff);
    else diff = "距今" + Math.abs(diff);
    return [diff, color];
}

function getCurWeek(startTime) {
    console.log(util.formatDate());
    if (util.formatDate() < startTime) return 1;
    const week = parseInt(util.dayDiff(startTime, util.formatDate()) / 7) + 1;
    return week;
}

async function registerCheck(funct, cancel = null) {
    if (uni.$app.data.userFlag) {
        funct();
    } else {
        const [, choice] = await uni.showModal({
            title: "提示",
            content: "使用该功能需要登录小程序，是否前去登录？",
        });
        if (choice.confirm) uni.navigateTo({ url: "/pages/home/auxiliary/login" });
        else cancel?.();
    }
}

function share(path = "pages/home/tips/tips", imageUrl = null, title = "山科小站") {
    return { title, imageUrl, path };
}

export { todoDateDiff, getCurWeek, tableDispose, registerCheck, share };

export default { todoDateDiff, getCurWeek, tableDispose, registerCheck, share };
