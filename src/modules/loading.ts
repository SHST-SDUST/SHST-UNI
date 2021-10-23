import { data } from "./global-data";

/**
 * start
 */
export const startLoading = (option: { load: number; title?: string }): void => {
    switch (option.load) {
        case 1:
            uni.showNavigationBarLoading();
            break;
        case 2:
            uni.showNavigationBarLoading();
            uni.setNavigationBarTitle({
                title: option.title || "加载中...",
            });
            break;
        case 3:
            uni.showLoading({
                title: option.title || "请求中",
                mask: true,
            });
            break;
    }
};

/**
 * end
 */
export const endLoading = (option: { load: number; title?: string }): void => {
    switch (option.load) {
        case 1:
            uni.hideNavigationBarLoading();
            break;
        case 2:
            uni.hideNavigationBarLoading();
            uni.setNavigationBarTitle({
                title: option.title || data.project,
            });
            break;
        case 3:
            uni.hideLoading();
            break;
    }
};

export default { start: startLoading, end: endLoading };
