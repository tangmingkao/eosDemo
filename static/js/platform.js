/*
 * @Author: tonyTang 
 * @Date: 2018-10-17 19:37:56 
 * @Last Modified by: tonyTang
 * @Last Modified time: 2018-10-18 09:47:06
 */

//默认是pc端，chrome浏览器
let platForm = 'pc';
let isChrome = true;
let ua = navigator.userAgent;

if(ua.match(/Chrome/i) && (!ua.match(/Edge/i))){
    isChrome = true;
} else {
    isChrome = false;
}

if (navigator.userAgent.match(/(iPhone|iphone|ipad|ipod|iPad|iPod)/i)) {
    platForm = "ios";
} else if (navigator.userAgent.match(/(Android|android)/i)) {
    platForm = "android";
} else {
    //若是pc端，则两个按钮都展示。
    platForm = "pc";
}

export default {
    platForm: platForm,
    isChrome: isChrome,
}