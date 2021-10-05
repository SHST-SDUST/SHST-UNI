type PossibleParams = string | number | boolean | undefined | null | void | Record<string, unknown>;

/**
 * 防抖
 * 定时器实现 立即防抖
 */
const debounceGenerator = () => {
    let timer: number;
    return <T extends PossibleParams[]>(wait: number, funct: (...args: T) => void, ...args: T) => {
        clearTimeout(timer);
        timer = setTimeout(() => funct(...args), wait);
    };
};
export const debounce = debounceGenerator();

// debounce<[number, number]>(500, (n1: number, n2: number) => n1 + n2, 1, 2);

/**
// 防抖
// 定时器实现 非立即防抖
function debounceGenerator(){
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
const throttleGenerator = () => {
    let previous = 0;
    return <T extends PossibleParams[]>(wait: number, funct: (...args: T) => void, ...args: T) => {
        const now = +new Date();
        if (now - previous > wait) {
            funct(...args);
            previous = now;
        }
    };
};
export const throttle = throttleGenerator();

// throttle<[number, number]>(500, (n1: number, n2: number) => n1 + n2, 1, 2);

/*
// 节流
// 定时器实现
function throttleGenerator(){
    var timer = null;
    return (wait, funct, ...args) => {
        if(!timer){
            funct(...args);
            timer = setTimeout(() => timer = null, wait);
        }
    }
}
 */

export default { debounceGenerator, throttleGenerator };
