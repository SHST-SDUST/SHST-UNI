<template>
    <view>
        <layout title="常用链接">
            <view v-for="item in data" :key="item.name">
                <view class="a-flex line">
                    <view>{{ item.name }}：</view>
                    <view class="a-link" @click="copy(item.url)">{{ item.url }}</view>
                </view>
            </view>
        </layout>
    </view>
</template>

<script>
export default {
    data: () => ({
        data: [],
    }),
    onLoad: async function () {
        const res = await uni.$app.request({
            load: 2,
            url: uni.$app.data.url + "/ext/urlshare",
        });
        this.data = res.data.url;
    },
    methods: {},
};
</script>

<style scoped>
.line {
    padding: 20px 5px;
    border-bottom: 1px solid #eeeeee;
    flex-wrap: wrap;
}
</style>
