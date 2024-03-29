/**
 * 全局变量
 */

export interface Data {
    url: string;
    tmp: {
        [key: string]: unknown;
    };
    colorN: number;
    openid: string;
    point: string;
    curWeek: number;
    userFlag: number;
    project: string;
    initData:
        | {
              tips: string;
              curTerm: string;
              termStart: string;
              curWeek: number;
              popup: {
                  popup: string;
                  serial: number;
                  path: string;
              };
              ads: Array<{
                  img: string;
                  url: string;
              }>;
              articalName: string;
              articleUrl: string;
              adSelect: {
                  tips: number;
                  funct: number;
                  table: number;
                  grade: number;
              };
              custom: {
                  color_list: string;
              };
          }
        | Record<string, never>;
    version: string;
    curTerm: string;
    curTermStart: string;
    colorList: Array<string>;
    [key: string]: unknown;
}

export const data: Data = {
    url: "",
    tmp: {},
    colorN: 6,
    openid: "",
    point: "",
    curWeek: 1,
    userFlag: 0, // 0 未登录 1 已登陆
    initData: {},
    version: "3.5.7",
    project: "山科小站",
    curTerm: "2019-2020-1",
    curTermStart: "2019-08-26",
    colorList: ["#FE9E9F", "#93BAFF", "#D999F9", "#81C784", "#FFCA62", "#FFA477"],
};

console.log("Version:", data.version);

if (process.env.NODE_ENV === "development") {
    console.log("Environment:", "development");
    data.url = "http://dev.shst.touchczy.top";
} else {
    console.log("Environment:", "production");
    data.url = "https://shst.touchczy.top";
}

// var colorList = ["#EAA78C", "#F9CD82", "#9ADEAD", "#9CB6E9", "#E49D9B", "#97D7D7", "#ABA0CA", "#9F8BEC",
//     "#ACA4D5", "#6495ED", "#7BCDA5", "#76B4EF","#E1C38F","#F6C46A","#B19ED1","#F09B98","#87CECB","#D1A495","#89D196"
// ];

export default { data };
