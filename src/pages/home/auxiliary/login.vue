<template>
    <view>
        <view class="x-center">
            <image
                class="img"
                src="http://dev.shst.touchczy.top/public/static/img/SDUST.jpg"
            ></image>
        </view>

        <view>
            <view class="input-con">
                <view class="input-view y-center x-full">
                    <i class="iconfont icon-account"></i>
                    <input
                        v-model="account"
                        class="a-input x-full"
                        name="account"
                        placeholder="账号"
                        type="number"
                    />
                </view>
                <view class="input-view y-center x-full a-lmt">
                    <i class="iconfont icon-password"></i>
                    <input
                        v-model="password"
                        class="a-input x-full"
                        name="password"
                        placeholder="密码"
                        :password="hidePassword"
                    />
                    <switch @change="hidePassword = !hidePassword"></switch>
                </view>
            </view>
            <view class="a-flex a-lmt">
                <view class="a-btn a-btn-blue a-btn-large a-lmt a-flex-full" @click="enter()">
                    登录
                </view>
            </view>
        </view>
        <view class="tips a-flex-space-between">
            <view>请输入强智系统账号密码</view>
            <view style="color: #3cb371" @click="exLogin">测试账号登陆</view>
        </view>
        <view class="status a-lmt">{{ status }}</view>
        <view v-if="resetApp" class="status a-lmt" @click="reStartApp()">
            初始化信息失败 点我重载小程序
        </view>

        <view class="prompt">
            <view>提示：</view>
            <view>1. 账号密码与强智教务系统账号密码保持一致。</view>
            <view>2. 密码中使用某些特殊符号会导致无法登录，但不是所有的符号都不行，请悉知。</view>
            <view>
                <text decode>
                    3. 长时间未操作小程序会断开链接，如果一直出现External
                    Error或者信息初始化失败请&nbsp;&nbsp;
                </text>
                <text decode class="l-lml a-link" @click="reStartApp()">点我重载小程序</text>
                <text>。</text>
            </view>
            <view>4. 测试账号仅作为演示功能，无实际意义。</view>
            <view>
                5.
                由于强智教务系统只对本科生开放，研究生暂时无法登录，目前仅青岛校区与济南校区可用。
            </view>
            <view>6. 山科小站系个人业余开发项目，所提供的数据仅供参考，一切以教务系统为准。</view>
        </view>
    </view>
</template>

<script>
import storage from "@/modules/storage";
export default {
    data: () => ({
        account: "",
        password: "",
        status: "",
        resetApp: false,
        hidePassword: true,
    }),
    created: function () {
        uni.$app.onload(() => {
            storage.getPromise("user").then(res => {
                if (res && res.account && res.password) {
                    this.account = res.account;
                    this.password = res.password;
                }
            });
            uni.$app.data.url = uni.$app.data.url.replace("/example/", "");
            uni.$app.data.userFlag = 0;
        });
    },
    methods: {
        enter: async function () {
            if (this.account.length == 0 || this.password.length == 0) {
                uni.$app.toast("用户名和密码不能为空");
            } else {
                const res = await uni.$app.request({
                    load: 3,
                    // #ifdef MP-WEIXIN
                    url: uni.$app.data.url + "/auth/login/1",
                    // #endif
                    // #ifdef MP-QQ
                    /* eslint-disable-next-line no-dupe-keys */
                    url: uni.$app.data.url + "/auth/login/2",
                    // #endif
                    method: "POST",
                    throttle: true,
                    data: {
                        account: this.account,
                        password: encodeURIComponent(this.password),
                        openid: uni.$app.data.openid,
                    },
                });
                console.log(res.data);
                if (res.data.status === 1) {
                    storage.clearPromise().then(() => {
                        storage
                            .setPromise("user", {
                                account: this.account,
                                password: this.password,
                            })
                            .then(() => {
                                uni.$app.data.userFlag = 1;
                                this.nav("/pages/home/tips/tips", "relunch");
                            });
                    });
                } else if (res.data.status === 2) {
                    this.status = res.data.msg;
                    uni.$app.toast(res.data.msg);
                } else if (res.data.status === 3) {
                    this.resetApp = true;
                    uni.$app.toast(res.data.msg);
                }
            }
        },
        exLogin: function () {
            uni.$app.data.url = uni.$app.data.url + "/example/";
            uni.$app.data.userFlag = 1;
            this.nav("/pages/home/tips/tips", "relunch");
        },
        reStartApp: async function () {
            const [, choice] = await uni.showModal({
                title: "提示",
                content: "确定要重载小程序吗？",
            });
            if (choice.confirm) {
                uni.$app.data.openid = "";
                uni.$app.reInitApp();
                this.nav("/pages/home/tips/tips", "relunch");
            }
        },
    },
};
</script>

<style>
page {
    background: #ffffff;
}
.img {
    width: 230px;
    height: 80px;
    margin: 20px 0 30px 0;
}
.input-con {
    margin-top: 23px;
}
.input-view {
    border-bottom: 1px solid #eee;
    margin-top: 5px;
}
.tips {
    margin: 10px 0 0 3px;
    font-size: 13px;
    color: #79b2f9;
}
.input-view i {
    color: #aaa;
    margin: 0 4px 0 8px;
    align-self: center;
}
.a-input {
    border: none;
    margin: 7px 0;
}
.status {
    color: red;
    font-size: 13px;
    margin-left: 3px;
}
.prompt {
    margin: 20px 0 0 3px;
    font-size: 13px;
    color: #666;
    line-height: 27px;
}
switch {
    zoom: 0.8;
}
</style>
