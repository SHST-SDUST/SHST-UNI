declare module "*.vue" {
    import Vue from "vue";
    export default Vue;
}

interface Date {
    addDate(): function;
}

declare namespace UniApp {
    interface Uni {
        $app: any; // 之后补充
    }
}
