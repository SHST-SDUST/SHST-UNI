<template>
    <view>

        <layout title="添加事项" v-if="dataDo > '2019-12-31'">
            <view>
                <input class="input a-lmt" placeholder="描述" v-model="addContent"></input>
                <view class="top a-flex-space-between">
                    <picker class="y-center" mode="date" :value="dataDo" :end="dataEnd" @change="dataDo = $event.detail.value">
                        <view class="y-center">
                            <view>执行时间：</view>
                            <view class="a-link">{{dataDo}}</view>
                        </view>
                    </picker>
                    <view class="a-btn a-btn-mini a-btn-blue btn" @click="add">确定</view>
                </view>
            </view>
        </layout>

        <view>
            <headslot title="待办事项">
                <view class="y-center">
                    <view class="y-center a-ml a-mr">
                        <view class="a-dot" style="background: #6495ED;"></view>
                        <view>待办:{{count}}</view>
                    </view>
                    <view class="y-center a-ml a-mr">
                        <view class="a-dot" style="background: #ACA4D5;"></view>
                        <view class="a-link" @click="nav('./fin-event')">已完成</view>
                    </view>
                </view>
            </headslot>
            <view class="a-lmt"></view>
            <layout v-for="(item, index) in todoList" :key="item.id">
                <view class="y-center unit-todo a-flex-space-between">
                    <view>
                        <view class="y-center a-mt a-mb">
                            <view class="a-dot" :style="{'background':item.color}"></view>
                            <view>{{item.event_content}}</view>
                        </view>
                        <view class="y-center">
                            <view class="a-mt a-mb a-ml a-mr">{{item.todo_time}}</view>
                            <view class="a-lml">{{item.diff}}天</view>
                        </view>
                    </view>
                    <view class="y-center">
                        <i class="iconfont icon-banner set-status" @click="setStatus(item.id, index)"></i>
                        <i class="iconfont icon-x set-status" @click="deleteUnit(item.id, index)"></i>
                    </view>
                </view>
            </layout>
            <layout v-if="tips">
                <view class="y-center">
                    <view class="a-dot a-mr" style="background: #eee;"></view>
                    <view>{{tips}}</view>
                </view>
            </layout>
        </view>

    </view>
</template>

<script>
    import storage from "@/modules/storage";
    import {todoDateDiff} from "@/vector/pub-fct";
    import headslot from "@/components/headslot/headslot.vue";
    import {formatDate, safeDate, addDate} from "@/modules/datetime";
    export default {
        components: { headslot },
        data: () => ({
            addContent: "",
            dataDo: formatDate(), //默认起始时间
            dataEnd: formatDate(), //默认结束时间
            todoList: [],
            tips: "",
            count: 0
        }),
        created: function() {
            uni.$app.onload(async () => {
                this.dataEnd = formatDate("yyyy-MM-dd", addDate(safeDate(), 1));
                storage.remove("event");
                if(uni.$app.data.openid === "") {
                    this.tips = "未正常获取用户信息";
                }else{
                    const res = await uni.$app.request({
                        load: 2,
                        url: uni.$app.data.url + "/todo/getEvent",
                    });
                    if(res.data.data) {
                        if (res.data.data.length === 0) {
                            this.tips = "暂没有待办事项";
                            return void 0;
                        }
                        const curData = formatDate();
                        res.data.data.map(function(value) {
                            [value.diff, value.color] = todoDateDiff(curData, value.todo_time, value.event_content);
                            return value;
                        });
                        console.log(res.data.data);
                        this.todoList = res.data.data;
                        this.count = res.data.data.length;
                    }
                }
            });
        },
        methods: {
            add: async function() {
                if (this.addContent === "") {
                    uni.$app.toast("事件内容不能为空");
                    return void 0;
                }
                const res = await uni.$app.request({
                    url: uni.$app.data.url + "/todo/addEvent",
                    method: "POST",
                    data: {
                        content: this.addContent,
                        date: this.dataDo
                    }
                });
                const todoArr = this.todoList;
                const curData = formatDate();
                const diff_color = todoDateDiff(curData, this.dataDo, this.addContent);
                todoArr.push({
                    event_content: this.addContent,
                    todo_time: this.dataDo,
                    diff: diff_color[0],
                    color: diff_color[1],
                    id : res.data.id
                });
                this.addContent = "";
                this.todoList = todoArr;
                this.tips = "";
                this.count = this.count + 1;
                uni.$app.toast("添加成功");
            },
            setStatus: async function(id, index) {
                const [err,choice] = await uni.showModal({
                    title: "提示",
                    content: "确定标记为已完成吗",
                });
                if (choice.confirm) {
                    const res = await uni.$app.request({
                        url: uni.$app.data.url + "/todo/setStatus",
                        method: "POST",
                        data: {id},
                    });
                    uni.$app.toast("标记成功");
                    this.todoList.splice(index, 1);
                    this.todoList = this.todoList;
                    this.tips = this.todoList.length === 0 ? "暂没有待办事项" : "";
                    this.count = this.count - 1;
                }
            },
            deleteUnit: async function(id, index) {
                const [err,choice] = await uni.showModal({
                    title: "提示",
                    content: "确定删除吗",
                });
                if (choice.confirm) {
                    const res = await uni.$app.request({
                        url: uni.$app.data.url + "/todo/deleteUnit",
                        method: "POST",
                        data: {id},
                    });
                    uni.$app.toast("删除成功");
                    this.todoList.splice(index, 1);
                    this.todoList = this.todoList;
                    this.tips = this.todoList.length === 0 ? "暂没有待办事项" : "";
                    this.count = this.count - 1;
                }
            },
        }
    };
</script>

<style scoped>
    .top{
        border-bottom: 1px solid #eee;
        padding:5px 0;
    }
    .input {
        margin: 0;
        padding: 0 5px;
        border-bottom: 1px solid #eee;
    }

    .unit-todo {
        color: #555555;
    }

    .set-status {
        color: #555555;
        border: 1px solid #EEEEEE;
        padding: 7px;
        border-radius: 20px;
        margin: 0 3px;
    }
</style>
