// 引入`*.vue`的`module`
declare module "*.vue" {
    import Vue from "vue/types/vue";
    export default Vue;
}

// `Date`原型方法
declare interface Date {
    addDate: (years: number, months: number, days: number) => void;
}

// `uni.$app`全局对象
declare namespace UniApp {
    interface Uni {
        $app: {
            toast: typeof import("./modules/toast").toast;
            extend: typeof import("./modules/copy").extend;
            data: import("./modules/global-data").Data;
            throttle: typeof import("./modules/operate-limit").throttle;
            eventBus: typeof import("./modules/event-bus").default;
            request: typeof import("./modules/request").request;
            ajax: typeof import("./modules/request").ajax;
            reInitApp: () => void;
            onload: <T extends Array<unknown>>(funct: (...args: T) => void, ...args: T) => void;
        };
    }
}
