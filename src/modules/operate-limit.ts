// type PossibleParams = string | number | boolean | undefined | null | void | Record<string, unknown>;
type LimitFunction = <T extends Array<unknown>>(
    wait: number,
    funct: (...args: T) => void,
    ...args: T
) => void;

/**
 * 防抖
 * 定时器实现 立即防抖
 */
const debounceFactory = (): LimitFunction => {
    let timer: number;
    return (wait, funct, ...args) => {
        clearTimeout(timer);
        timer = setTimeout(() => funct(...args), wait);
    };
};
export const debounce = debounceFactory();

// debounce(500, (n1: number, n2: number) => n1 + n2, 1, 2);
// debounce<[number, number]>(500, (n1: number, n2: number) => n1 + n2, 1, 2);

/**
// 防抖
// 定时器实现 非立即防抖
function debounceFactory(){
    var timer = null;
    return (wait, funct, ...args) => {
        if(!timer) funct(...args);
        clearTimeout(timer);
        timer = setTimeout(() => timer = null, wait);
    }
}
 */

/**
 * 节流
 * 时间戳实现
 */
const throttleFactory = (): LimitFunction => {
    let previous = 0;
    return (wait, funct, ...args) => {
        const now = +new Date();
        if (now - previous > wait) {
            funct(...args);
            previous = now;
        }
    };
};
export const throttle = throttleFactory();

// throttle(500, (n1: number, n2: number) => n1 + n2, 1, 2);
// throttle<[number, number]>(500, (n1: number, n2: number) => n1 + n2, 1, 2);

/*
// 节流
// 定时器实现
function throttleFactory(){
    var timer = null;
    return (wait, funct, ...args) => {
        if(!timer){
            funct(...args);
            timer = setTimeout(() => timer = null, wait);
        }
    }
}
 */

export default { debounceFactory, throttleFactory };
