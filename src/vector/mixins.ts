import Vue from "vue";
declare module "vue/types/vue" {
    interface Vue {
        copy: (str: string) => void;
        nav: (url: string, type?: string) => void;
        viewImage: (url: string, list: Array<string>) => void;
    }
}

export const filters: { [key: string]: () => string } = {};

export const methods = {
    copy: (str: string): void => {
        if (str) uni.setClipboardData({ data: str });
    },
    nav: (url: string, type = "nav"): void => {
        const fail = (e: Error) => console.log(e);
        const webviewPath = "/pages/home/auxiliary/webview?url=";
        switch (type) {
            case "nav":
                return uni.navigateTo({ url, fail });
            case "tab":
                return uni.switchTab({ url, fail });
            case "relunch":
                return uni.reLaunch({ url, fail });
            case "back":
                return uni.navigateBack({});
            case "webview":
                return uni.navigateTo({
                    url: webviewPath + encodeURIComponent(url),
                    fail,
                });
            case "redirect":
                return uni.redirectTo({ url, fail });
        }
    },
    viewImage: (url: string, list: Array<string>): void => {
        uni.previewImage({ current: url, urls: list });
    },
};

const filterMount = (): void => {
    Object.keys(filters).forEach((key: string) => Vue.filter(key, filters[key]));
};

const methodMount = (): void => {
    Vue.mixin({ methods });
};

const run = (): void => {
    filterMount();
    methodMount();
};

export default { run };
