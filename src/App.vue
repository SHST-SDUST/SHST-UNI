<script lang="ts">
import dispose from "@/vector/dispose";
import log from "@/modules/realtime-log";

export default {
    globalData: {},
    //处理404
    onPageNotFound: (): void => {
        uni.reLaunch({
            url: "pages/home/auxiliary/not-found",
        });
    },
    onLaunch: function (): void {
        console.log("APP INIT ");
        dispose.onLaunch.apply(this); //启动加载事件
    },
    onError: (err: string): void => {
        // 避免无限递归调用
        try {
            log.error(err);
            console.log(err);
            dispose.toast("Internal Error");
        } catch (e) {
            console.log(e);
        }
    },
};
</script>

<style lang="scss">
@import "./vector/resources/iconfont.css";
@import "./vector/resources/asse.mini.css";
button:after {
    border: none;
}
button {
    background: #fff;
    border: none;
    box-sizing: unset;
    padding: 0;
    margin: 0;
    font-size: inherit;
    color: inherit;
    line-height: unset;
    height: auto;
}
.adapt {
    box-sizing: border-box;
}
.tips-con {
    line-height: 27px;
}
</style>
