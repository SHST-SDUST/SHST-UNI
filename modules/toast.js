/**
 * 弹窗提示
 */
export const toast = function(msg, time = 2000, icon = "none") {
    uni.showToast({
        title: msg,
        icon: icon,
        mask: true,
        duration: time
    })
    return new Promise((resolve, reject) => setTimeout(() => resolve(msg), time));
}

export const confirm = function(title, content){
    return new Promise(resolve => {
        uni.showModal({
            title,
            content,
            success: choice => {
                if(choice.confirm) resolve(true);
                else resolve(false);
            }
        })
    })
}

export default { toast, confirm }
