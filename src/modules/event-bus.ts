type Handler = (...args: unknown[]) => unknown;
interface Handlers {
    [key: string]: Array<Handler>;
}

class PubSub {
    private handlers: Handlers;

    constructor() {
        this.handlers = {};
    }
    public on(key: string, handler: Handler) {
        // 订阅
        if (!(key in this.handlers)) this.handlers[key] = [];
        if (!this.handlers[key].includes(handler)) {
            this.handlers[key].push(handler);
            return true;
        }
        return false;
    }
    public once(key: string, handler: Handler) {
        // 一次性订阅
        if (!(key in this.handlers)) this.handlers[key] = [];
        if (this.handlers[key].includes(handler)) return false;
        const onceHandler = (...args: unknown[]) => {
            handler.apply(this, args);
            this.off(key, onceHandler);
        };
        this.handlers[key].push(onceHandler);
        return true;
    }
    public off(key: string, handler: Handler) {
        // 卸载
        const index = this.handlers[key].findIndex(item => item === handler);
        if (index < 0) return false;
        if (this.handlers[key].length === 1) delete this.handlers[key];
        else this.handlers[key].splice(index, 1);
        return true;
    }
    commit(key: string, ...args: unknown[]) {
        // 触发
        if (!this.handlers[key]) return false;
        console.log(key, "Execute");
        this.handlers[key].forEach(handler => handler.apply(this, args));
        return true;
    }
}

export default new PubSub();
