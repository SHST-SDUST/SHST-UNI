<template>
    <view>
        <view>
            <layout title="校历查询">
                <view class="select-con">
                    <view>请选择学期</view>
                    <picker :value="index" :range="range" class="a-link" @change="bindPickerChange">
                        <view>{{ range[index] }}</view>
                    </picker>
                </view>
            </layout>
        </view>

        <view v-show="show">
            <layout>
                <view class="y-center head">
                    <view class="y-center">
                        <view
                            class="arrow-left iconfont icon-arrow-lift"
                            @click="switchMonth('l')"
                        ></view>
                        <view class="show-date">{{ curYear }}年 {{ curMonth }}月</view>
                        <view
                            class="arrow-right iconfont icon-arrow-right"
                            @click="switchMonth('r')"
                        ></view>
                    </view>
                    <view class="y-center">
                        <view
                            class="opt y-center x-center"
                            style="background-color: #1e9fff"
                            @click="jumpDate(today)"
                        >
                            今
                        </view>
                        <view
                            class="opt y-center x-center"
                            style="background-color: #ff6347"
                            @click="jumpDate(termStart)"
                        >
                            开
                        </view>
                        <view
                            class="opt y-center x-center"
                            style="background-color: #3cb371"
                            @click="jumpDate(vacationStartDate)"
                        >
                            假
                        </view>
                    </view>
                </view>

                <view>
                    <view class="y-center line">
                        <view
                            v-for="(item, index) in [
                                '周',
                                '一',
                                '二',
                                '三',
                                '四',
                                '五',
                                '六',
                                '日',
                            ]"
                            :key="index"
                            class="unit"
                        >
                            {{ item }}
                        </view>
                    </view>
                    <view v-for="(item, index) in calendarData" :key="index" class="line">
                        <view v-for="(innerItem, innerIndex) in item" :key="innerIndex">
                            <view class="unit-con" :class="innerItem.color">
                                <view class="unit u">{{ innerItem.day }}</view>
                                <view class="x-center intro" :class="innerItem.detach">
                                    {{ innerItem.type }}
                                </view>
                            </view>
                        </view>
                    </view>
                </view>
            </layout>

            <layout>
                <view class="card y-center info">
                    <view style="width: 40%">
                        <view class="a-dot" style="background: #3cb371"></view>
                        <view class="text">学期:{{ term }}</view>
                    </view>
                    <view style="width: 24%">
                        <view class="a-dot" style="background: #9f8bec"></view>
                        <view class="text">周次:{{ weekCount }}</view>
                    </view>
                    <view style="width: 36%">
                        <view class="a-dot" style="background: #ff6347"></view>
                        <view class="text">开学:{{ termStart }}</view>
                    </view>
                </view>
            </layout>

            <layout>
                <view class="y-center info">
                    <view style="width: 40%">
                        <view class="a-dot" style="background: #3cb371"></view>
                        <view class="text">假期:{{ vacationStartDate }}</view>
                    </view>
                    <view style="width: 24%">
                        <view class="a-dot" style="background: #9f8bec"></view>
                        <view class="text">周次:{{ vacationStart }}</view>
                    </view>
                    <view style="width: 36%">
                        <view class="a-dot" style="background: #ff6347"></view>
                        <view class="text">距假期:{{ vacationDateDiff }}天</view>
                    </view>
                </view>
            </layout>
        </view>
    </view>
</template>

<script>
import util from "@/modules/datetime";
const date = util.safeDate();
export default {
    data: () => ({
        range: ["请稍后"],
        index: 0,
        data: [],
        term: "",
        show: false,
        termStart: "",
        weekCount: 0,
        calendarData: [],
        vacationStart: "",
        vacationDateDiff: 0,
        vacationStartDate: "",
        curMonth: util.formatDate("MM", date),
        curYear: util.formatDate("yyyy", date),
        today: util.formatDate(void 0, date),
    }),
    created: async function () {
        uni.$app.onload(async () => {
            const res = await uni.$app.request({
                load: 2,
                throttle: true,
                url: uni.$app.data.url + "/ext/calendar",
            });
            if (!res.data.info || !res.data.info[0]) {
                uni.$app.toast("加载失败，请重试");
                return void 0;
            }
            res.data.info = res.data.info.reverse();
            this.data = res.data.info;
            const range = [];
            res.data.info.forEach(value => (value ? range.push(value.term) : ""));
            this.range = range;
            this.bindPickerChange({ detail: { value: 0 } });
        });
    },
    methods: {
        bindPickerChange: function (e) {
            if (this.range.length === 0) {
                uni.$app.toast("加载失败，请重试");
                return void 0;
            }
            this.index = e.detail.value;
            const curObj = this.data[this.index];
            this.term = curObj.term;
            this.weekCount = curObj.weekcount;
            this.termStart = curObj.startdata;
            this.vacationStart = curObj.vacationstart;
            this.calcVacation();
            this.redayForDate(date);
        },
        jumpDate: function (date) {
            const d = util.safeDate(date);
            this.curMonth = util.formatDate("MM", d);
            this.curYear = util.formatDate("yyyy", d);
            this.redayForDate(d);
        },
        switchMonth: function (s) {
            const d = util.safeDate(this.curYear + "-" + this.curMonth + "-01");
            if (s === "l") d.addDate(0, -1);
            else d.addDate(0, 1);
            this.curMonth = util.formatDate("MM", d);
            this.curYear = util.formatDate("yyyy", d);
            this.redayForDate(d);
        },
        redayForDate: function (date) {
            const curMonthDay = util.formatDate("yyyy-MM-01", date);
            const monthStart = util.safeDate(curMonthDay);
            let monthStartWeekDay = monthStart.getDay();
            monthStartWeekDay = monthStartWeekDay === 0 ? 7 : monthStartWeekDay;
            const calendarStart = monthStart;
            calendarStart.addDate(0, 0, -(monthStartWeekDay - 1));
            this.showCalendar(calendarStart);
        },
        showCalendar: function (start) {
            const showArr = [];
            for (let i = 0; i < 6; ++i) {
                const innerArr = [];
                let week = 0;
                for (let k = 0; k < 7; ++k) {
                    const unitDate = util.formatDate("yyyy-MM-dd", start);
                    if (k === 0) {
                        week = parseInt(util.dayDiff(this.termStart, unitDate) / 7) + 1;
                        week = week > 0 ? week : 0;
                        innerArr.push({ day: week, color: "week ", type: "周次", detach: "" });
                    }
                    const unitObj = {
                        day: unitDate.split("-")[2],
                        color: "not-cur-month ",
                        type: "--",
                        detach: "",
                    };
                    if (util.formatDate("MM", start) === this.curMonth)
                        unitObj.color = "cur-month ";
                    if (unitDate === this.today) unitObj.color = "today ";
                    if (unitDate === this.termStart) unitObj.color = "term-start ";
                    if (unitDate === this.vacationStartDate) unitObj.color = "vacation-start ";
                    if (k === 5 || k === 6) {
                        unitObj.type = "周末";
                        unitObj.color += "weekend ";
                    } else if (week && week <= this.weekCount) {
                        let tmpColor = "classes ";
                        unitObj.type = "教学";
                        unitObj.detach = "cdetach";
                        if (week >= this.vacationStart) {
                            unitObj.type = "假期";
                            tmpColor = "vacation ";
                            unitObj.detach = "";
                        }
                        unitObj.color += tmpColor;
                    }
                    innerArr.push(unitObj);
                    start.addDate(0, 0, 1);
                }
                showArr.push(innerArr);
            }
            this.calendarData = showArr;
            this.show = true;
        },
        calcVacation: function () {
            const d = util.safeDate(this.termStart);
            d.addDate(0, 0, (this.vacationStart - 1) * 7);
            const vacationStartDate = util.formatDate(undefined, d);
            this.vacationStartDate = vacationStartDate;
            this.vacationDateDiff = util.dayDiff(this.today, vacationStartDate);
        },
    },
};
</script>

<style scoped>
.select-con {
    display: flex;
    justify-content: space-between;
    padding: 15px 10px 5px 10px;
}

.head {
    justify-content: space-between;
    margin: 5px 5px 5px 10px;
}

.show-date {
    margin: 10px 20px;
    font-weight: bold;
}

.opt {
    width: 20px;
    line-height: 20px;
    padding: 4px;
    margin: 0 10px;
    color: #fff;
    background-color: #9f8bec;
    border-radius: 30px;
}

.line {
    display: flex;
    justify-content: space-around;
    align-content: center;
    margin: 10px 0;
}

.unit-con {
    color: #333;
}

.unit-con view {
    color: inherit;
}

.unit {
    line-height: 25px;
    width: 25px;
    margin: 2.5px;
    display: flex;
    justify-content: center;
    align-items: center;
}

.not-cur-month {
    color: #ddd !important;
}

.today > .u,
.term-start > .u,
.vacation-start > .u {
    color: #fff !important;
    border-radius: 30px;
    background: #1e9fff;
}

.term-start > .u {
    background: #ff6347;
}

.vacation-start > .u {
    background: #3cb371;
}

.week {
    color: #9f8bec;
}

.intro {
    font-size: 11px;
}

.cur-month > .cdetach {
    color: #999;
}

.weekend,
.vacation {
    color: #3cb371;
}

.arrow-left,
.arrow-right {
    font-size: 20px;
}

.a-dot + view {
    margin-right: 5px;
}

.info view {
    display: flex;
    align-items: center;
}

.text {
    color: #333;
}
</style>
