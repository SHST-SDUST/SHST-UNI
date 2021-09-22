/**
 * 引入`*.vue`的`module`
 */
declare module "*.vue" {
    import Vue from "vue/types/vue";
    export default Vue;
}

/**
 * `Date`原型方法
 */
interface Date {
    addDate: (years: number, months: number, days: number) => void;
}

/**
 * `$app`全局对象
 */
declare namespace UniApp {
    interface Uni {
        $app: any; // 之后补充
    }
}
