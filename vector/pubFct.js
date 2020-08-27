"use strict";
import util from "@/modules/datetime";

/**
 * 统一处理课表功能
 */
function tableDispose(info, flag = 0) {
    const app = getApp();
    var tableArr = [];
    var week = new Date().getDay() - 1;
    if (week === -1) week = 6;
    info.forEach(value => {
        if (!value) return;
        var arrInner = [];
        var day = parseInt(value.kcsj[0]) - 1;
        if (flag === 1 && day !== week) return;
        var knot = parseInt(parseInt(value.kcsj.substr(1, 2)) / 2);
        var uniqueNum = Array.prototype.reduce.call(v.name, (pre, cur) => pre+cur.charCodeAt(), 0);
        var colorSignal = app.data.colorList[ uniqueNum % app.data.colorN];
        arrInner.push(day);
        arrInner.push(knot);
        arrInner.push(value.kcmc.split("（")[0]);
        arrInner.push(value.jsxm);
        arrInner.push(value.jsmc);
        arrInner.push(colorSignal);
        if (!tableArr[day]) tableArr[day] = [];
        tableArr[day][knot] = arrInner;
    })
    if (flag === 1) return tableArr[week];
    else return tableArr;
}

function todoDateDiff(startDateString, endDateString, content) {
    const app = getApp();
    const colorList = app.data.colorList;
    const colorN = app.data.colorList.length;
    var color = colorList[content.charCodeAt() % colorN];
    var diff = util.dateDiff(startDateString, endDateString);
    if (diff === 0) diff = "今";
    else if (diff < 0) diff = "超期" + Math.abs(diff);
    else diff = "距今" + Math.abs(diff);
    return [diff, color];
}


function getCurWeek(startTime) {
    console.log(util.formatDate())
    if (util.formatDate() < startTime) return 1;
    var week = (parseInt(util.dateDiff(startTime, util.formatDate()) / 7) + 1);
    return week;
}

export {todoDateDiff, getCurWeek, tableDispose}

export default {todoDateDiff, getCurWeek, tableDispose}