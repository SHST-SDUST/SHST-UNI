/**
 * 小程序更新
 */
export const checkUpdate = (): void => {
    if (!uni.getUpdateManager) return;
    uni.getUpdateManager().onCheckForUpdate(res => {
        console.log("Update:", res.hasUpdate);
        //如果有新版本
        if (res.hasUpdate) {
            // 当新版本下载完成
            uni.getUpdateManager().onUpdateReady(() => {
                uni.showModal({
                    title: "更新提示",
                    content: "新版本已经准备好，单击确定重启应用",
                    success: res => {
                        if (res.confirm) uni.getUpdateManager().applyUpdate(); // applyUpdate 应用新版本并重启
                    },
                });
            });
            // 当新版本下载失败
            uni.getUpdateManager().onUpdateFailed(() => {
                uni.showModal({
                    title: "提示",
                    content: "检查到有新版本，但下载失败，请检查网络设置",
                    showCancel: false,
                });
            });
        }
    });
};

export default { checkUpdate };
