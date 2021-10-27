export interface RulesItem {
    msg: string;
    min?: number;
    max?: number;
    pattern?: string;
    required?: boolean;
}

export interface Rules {
    [key: string]: RulesItem[];
}

export interface DefineRulesItem {
    msg: string;
    show: boolean;
    rules: RulesItem[];
}

export interface DefineRules {
    [key: string]: DefineRulesItem;
}

export const defineInfo = (rules: Rules): DefineRules => {
    const info: DefineRules = {};
    Object.keys(rules).forEach(key => {
        const inner: DefineRulesItem = {
            msg: "",
            show: false,
            rules: rules[key],
        };
        info[key] = inner;
    });
    return info;
};

export const verifyRulesUnit = (
    value: string | number,
    rulesArr: RulesItem[],
    info: DefineRulesItem
): boolean => {
    if (!rulesArr) return true;
    let allCheck = true;
    const checkResult = (result: boolean, info: DefineRulesItem, msg: string) => {
        if (result) {
            info.msg = "";
            info.show = false;
        } else {
            info.show = true;
            info.msg = msg;
            allCheck = false;
        }
        return result;
    };
    for (let i = 0, len = rulesArr.length; i < len; ++i) {
        const rule = rulesArr[i];
        const valueLength = value.toString().length;
        if (rule.required === false && !value) {
            checkResult(true, info, rule.msg);
            break;
        }
        if (rule.min) {
            if (!checkResult(rule.min <= valueLength, info, rule.msg)) break;
        }
        if (rule.max) {
            if (!checkResult(valueLength <= rule.max, info, rule.msg)) break;
        }
        if (typeof rule.pattern === "string" && typeof value === "string") {
            if (!checkResult(new RegExp(rule.pattern).test(value), info, rule.msg)) {
                break;
            }
        }
    }
    return allCheck;
};

export const verifyRules = (
    form: Record<string, string | number>,
    rules: Rules,
    infos: DefineRules
): boolean => {
    let allCheck = true;
    for (const item in form) {
        const value = form[item];
        const rulesArr = rules[item];
        if (rulesArr === void 0) continue;
        if (!verifyRulesUnit(value, rulesArr, infos[item])) allCheck = false;
    }
    return allCheck;
};

export const verifyUnit = {
    methods: {
        verifyUnit: function (name: string): boolean {
            uni.$app.eventBus.commit("VerifyUnitAction", name);
            return true;
        },
    },
};
