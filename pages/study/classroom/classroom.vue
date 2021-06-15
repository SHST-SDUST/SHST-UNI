<template>
    <view>

        <layout title="空教室" top-space>
            <view class="text-center a-flex-space-between a-lmt">
                <picker-view class="picker-con" indicator-style="height: 40px;" @change="bindPickerChange">
                    <picker-view-column>
                        <view v-for="(item,index) in queryData" :key="index" class="picker-item">{{item[1]}}</view>
                    </picker-view-column>
                    <picker-view-column>
                        <view v-for="(item,index) in queryTime" :key="index" class="picker-item">{{item[0]}}</view>
                    </picker-view-column>
                    <picker-view-column>
                        <view v-for="(item,index) in queryFloor" :key="index" class="picker-item">{{item[0]}}</view>
                    </picker-view-column>
                </picker-view>
                <view class="y-center">
                    <view class="a-btn a-btn-blue " @click="loadClassroom">搜索</view>
                </view>
            </view>
        </layout>

        <layout v-if="show" :title="qShow+'['+searchData+']'">
            <view class="floor-name">{{room[0].jxl}}</view>
            <view class="x-center y-center a-flex-warp">
                <view v-for="(inner,innerIndex) in room[0].jsList" :key="innerIndex">
                    <view class="unit">{{inner.jsmc}}</view>
                </view>
            </view>
        </layout>

    </view>
</template>

<script>
    import loading from "@/modules/loading";
    import datetime from "@/modules/datetime";
    export default {
        data: () => ({
            room: [],
            qShow: "",
            show: false,
            searchData: datetime.formatDate(),
            searchTime: "0102",
            searchFloor: 1,
            searchCampus: 1,
            index: [0, 0, 0],
            queryData: [],
            queryTime: [],
            queryFloor: []
        }),
        created: function() {
            uni.$app.onload(() => {
                const queryData = this.getTimeArr();
                const queryTime = [
                    ["12节", "0102", "12节(8:00-9:50)"],
                    ["34节", "0304", "34节(10:10-12:00)"],
                    ["56节", "0506", "56节(14:00-15:50)"],
                    ["78节", "0708", "78节(16:00-17:50)"],
                    ["9X节", "0910", "9X节(19:00-20:50)"],
                    ["上午", "am", "上午(8:00-12:00)"],
                    ["下午", "pm", "下午(14:00-17:50)"],
                    ["全天", "allday", "全天(8:00-20:50)"]
                ];
                const queryFloor = [
                    ["J1", "1", 1],
                    ["J3", "3", 1],
                    ["J5", "5", 1],
                    ["J7", "7", 1],
                    ["J14", "14", 1],
                    ["S1", "S1", 1],
                    ["泰-1", "0201", 2],
                    ["泰-2", "0202", 2],
                    ["泰-3", "0203", 2],
                    ["泰-4", "0204", 2],
                    ["泰-5", "0205", 2],
                    ["济-1", "0301", 3],
                    ["济-2", "0302", 3],
                    ["济-3", "0303", 3],
                ];
                this.queryData = queryData;
                this.queryTime = queryTime;
                this.queryFloor = queryFloor;
            })
        },
        methods: {
            loadClassroom: function (e) {
                loading.start({load: 2});
                setTimeout(async () => {
                    await this.loadClassroomSetTime(e);
                    loading.end({load: 2});
                }, 300);
            },
            loadClassroomSetTime: async function (e) {
                const res = await uni.$app.request({
                    load: 0,
                    throttle: true,
                    url: uni.$app.data.url + "/sw/classroom",
                    data: {
                        searchData: this.searchData,
                        searchTime: this.searchTime,
                        searchFloor: this.searchFloor,
                        searchCampus: this.searchCampus,
                    },
                })
                const data = res.data.data;
                if(!data) {
                    uni.$app.toast("加载失败，请重试");
                    return void 0;
                }
                if(res.data.data.flag) {
                    uni.$app.toast("该日期不在教学周期内");
                    return void 0;
                }
                if(!data[0]) data[0] = { "jxl": this.searchFloor + "号楼", jsList: [{jsmc: "无空教室"}]};
                data[0].jsList.sort((a, b) => a.jsmc > b.jsmc ? 1 : -1);
                this.room = data;
                this.show = true;
                this.qShow = this.queryTime[this.index[1]][2];
                this.searchData = this.searchData;
            },
            getTimeArr: function() {
                const weekShow = ["周日", "周一", "周二", "周三", "周四", "周五", "周六"];
                const date = datetime.safeDate();
                const year = date.getFullYear();
                const queryDataArr = [];
                const week = datetime.safeDate().getDay();
                console.log(week);
                for (let i = 0; i < 7; ++i) {
                    let monthTemp = date.getMonth() + 1;;
                    let dayTemp = date.getDate();
                    let weekTemp = week + i;
                    if (monthTemp < 10) monthTemp = "0" + monthTemp;
                    if (dayTemp < 10) dayTemp = "0" + dayTemp;
                    queryDataArr.push([year + "-" + monthTemp + "-" + dayTemp, weekShow[weekTemp % 7]]);
                    date.addDate(0, 0, 1);
                }
                return queryDataArr;
            },
            bindPickerChange: function(e) {
                this.index = e.detail.value;
                const [dataIndex, timeIndex, floorIndex] = e.detail.value;
                this.searchData = this.queryData[dataIndex][0];
                this.searchTime = this.queryTime[timeIndex][1];
                this.searchFloor = this.queryFloor[floorIndex][1];
                this.searchCampus = this.queryFloor[floorIndex][2];
            }
        }
    }
</script>

<style scoped>
    .picker-con{
        width: 77%;
        height: 100px;
    }

    .picker-item{
        line-height: 40px;
     }

    .unit {
        display: flex;
        padding: 10px 7px;
        font-size: 13px;
        background: #eee;
        margin: 3px;
    }

    .floor-name{
        border-bottom: 1px solid #eee;
        padding: 10px 0 ;
        text-align: center;
        margin: 0 0 8px 0;
    }


</style>
