/**
 * start
 */
function start(option) {
    switch (option.load) {
        case 1: 
            uni.showNavigationBarLoading();
            break;
        case 2:
            uni.showNavigationBarLoading();
            uni.setNavigationBarTitle({
                title: option.title || "加载中..."
            });
            break;
        case 3:
            uni.showLoading({
                title: option.title || "请求中",
                mask: true
            });
            break;
    }
}

/**
 * end
 */
function end(option) {
    switch (option.load) {
        case 1:
            uni.hideNavigationBarLoading();
            break;
        case 2:
            uni.hideNavigationBarLoading();
            uni.setNavigationBarTitle({
                title: option.title || "山科小站"
            });
            break;
        case 3:
            uni.hideLoading();
            break;
    }
}

export { start as startLoading, end as endLoading };
export default { start, end };
