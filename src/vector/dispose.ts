import { toast } from "@/modules/toast";
import { extend } from "@/modules/copy";
import storage from "@/modules/storage";
import loading from "@/modules/loading";
import { methods } from "@/vector/mixins";
import eventBus from "@/modules/event-bus";
import { data } from "@/modules/global-data";
import { extDate } from "@/modules/datetime";
import { getCurWeek } from "@/vector/pub-fct";
import { checkUpdate } from "@/modules/update";
import { throttle } from "@/modules/operate-limit";
import request, { PromiseFulfilled } from "@/modules/request";

interface GlobalVueComponent {
    data: typeof data;
    globalData: typeof data;
    $scope: typeof uni.$app;
}

function disposeApp($app: GlobalVueComponent) {
    extDate(); //拓展Date原型
    checkUpdate(); // 检查更新
    uni.$app = $app.$scope;
    $app.$scope.toast = toast;
    $app.$scope.extend = extend;
    $app.data = $app.globalData;
    $app.$scope.data = $app.data;
    $app.$scope.throttle = throttle;
    $app.$scope.eventBus = eventBus;
    $app.$scope.extend($app.data, data);
    $app.$scope.extend($app.$scope, request);
    $app.data.colorN = $app.data.colorList.length;
    $app.$scope.reInitApp = initAppData.bind($app);
    $app.data.curWeek = getCurWeek($app.data.curTermStart);
    $app.$scope.onload = <T extends Array<unknown>>(
        funct: (...args1: T) => void,
        ...args: T
    ): void => {
        if ($app.data.openid) funct(...args);
        else $app.$scope.eventBus.once<T>("LoginEvent", funct);
    };
}

interface InitRemoteRequest {
    status: number;
    openid: string;
    initData: typeof data["initData"];
}

function initAppData(this: GlobalVueComponent) {
    loading.start({ load: 3, title: "加载中" });
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const $app = this;
    const userInfo = storage.get("user") || {};
    new Promise<[null | Error, null | UniApp.LoginRes]>(resolve => {
        uni.login({
            // #ifdef MP-WEIXIN
            provider: "weixin",
            // #endif
            // #ifdef MP-QQ
            // eslint-disable-next-line no-dupe-keys
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            provider: "qq",
            // #endif
            success: res => resolve([null, res]),
            fail: (err: Error) => resolve([err, null]),
        });
    })
        .then(([err, res]) => {
            if (err || !res) return Promise.reject(err);
            return $app.$scope.request<InitRemoteRequest>({
                load: 0,
                // #ifdef MP-WEIXIN
                url: $app.data.url + "/auth/wx",
                // #endif
                // #ifdef MP-QQ
                // eslint-disable-next-line no-dupe-keys
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                url: $app.data.url + "/auth/QQ",
                // #endif
                method: "POST",
                data: {
                    code: res.code,
                    user: JSON.stringify(userInfo),
                },
            });
        })
        .then((res: PromiseFulfilled<InitRemoteRequest>) => {
            /* 判断是否正常初始化 */
            const response = res.data;
            if (!response || !response.initData || !response.initData.curTerm)
                return Promise.reject("DATA INIT FAIL");

            /* 初始化全局信息 */
            $app.data.curTerm = response.initData.curTerm;
            $app.data.curTermStart = response.initData.termStart;
            $app.data.curWeek = response.initData.curWeek;
            $app.data.initData = response.initData;

            /* 自定义配色 */
            if ($app.data.initData.custom) {
                const custom = $app.data.initData.custom;
                if (custom.color_list) {
                    $app.data.colorList = JSON.parse(custom.color_list);
                    $app.data.colorN = $app.data.colorList.length;
                }
            }

            /* 用户使用信息  1 已注册用户  2 未注册用户*/
            $app.data.userFlag = response.status === 1 ? 1 : 0;
            console.log("Status:", $app.data.userFlag === 1 ? "User Login" : "New user");

            /* dot */
            const notify = response.initData.tips;
            $app.data.point = notify;
            const point = storage.get("point");
            // #ifdef MP-WEIXIN
            if (point !== notify) uni.showTabBarRedDot({ index: 2 });
            // #endif
            // #ifdef MP-QQ
            if (point !== notify) uni.showTabBarRedDot({ index: 3 });
            // #endif

            /* openid */
            console.log("SetOpenid:", response.openid);
            $app.data.openid = response.openid;

            /* 处理弹出式公告 */
            const popup = response.initData.popup;
            const popupCache = storage.get<number>("popup");
            if (popupCache !== popup.serial && popup.popup) {
                uni.showModal({
                    title: "公告",
                    confirmText: popup.path ? "立即查看" : "确认",
                    cancelText: "下次查看",
                    content: popup.popup,
                    success: res => {
                        if (res.confirm) {
                            storage.setPromise<number>("popup", popup.serial);
                            // #ifdef MP-WEIXIN
                            if (popup.path) methods.nav(popup.path, "webview");
                            // #endif
                            // #ifndef MP-WEIXIN
                            if (popup.path) methods.copy(popup.path);
                            // #endif
                        }
                    },
                });
            }

            /* resolve */
            return Promise.resolve(res);
        })
        .then((res: PromiseFulfilled<InitRemoteRequest>) => {
            $app.$scope.eventBus.commit("LoginEvent", res);
        })
        .catch((err: Error) => {
            console.log(err);
            uni.showModal({
                title: "警告",
                content: "数据初始化失败,点击确定重新初始化数据",
                showCancel: false,
                success: () => initAppData.apply($app),
            });
        })
        .finally(() => {
            loading.end({ load: 3 });
        });
}

// APP启动事件
// eslint-disable-next-line @typescript-eslint/no-explicit-any,@typescript-eslint/explicit-module-boundary-types
function onLaunch(this: any): void {
    disposeApp(this);
    initAppData.apply(this);
}

export default { onLaunch, toast };
