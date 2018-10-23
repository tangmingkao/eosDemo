// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import router from './router';
import ElementUI from 'element-ui';
import VueClipboard from 'vue-clipboard2';
import 'element-ui/lib/theme-chalk/index.css';
import Store from '../src/store';
import VueI18n from 'vue-i18n';
import ScatterJS from 'scatterjs-core';
import ScatterEOS from 'scatterjs-plugin-eosjs'
import Config from './config/config';
import ComonObj from './getGloable'
ScatterJS.plugins( new ScatterEOS() );
Vue.use(ElementUI);
Vue.use(VueClipboard);
Vue.use(VueI18n);

const i18n = new VueI18n({
    locale: localStorage.getItem('localeLang') || 'zh-CN',
    messages: {
        'zh-CN': require('./common/lang/zh'),
        'en-US': require('./common/lang/en'),
    }, 
});

(function(){
     //先判断下是否有分享的
     console.log('----------- main js -----',window.location.href);
     let username = sessionStorage.getItem('username');
     if(window.location.href.indexOf('shareName') > -1){
         let index1 = window.location.href.indexOf('?');
         console.log(index1);
         let index2 = window.location.href.indexOf('=');
         console.log(index2);
 
         let string1 = window.location.href.slice(0,index1);
         let string2 = window.location.href.slice(index2+1);
         let inviteName = string2;
         //挂载到store上.
         Store.state.inviteName = inviteName;
         Store.state.inviteFriendLink = string1 + '?shareName=' + username;
         sessionStorage.setItem('shareName',inviteName);
     } else {
         Store.state.inviteFriendLink = window.location.href + '?shareName=' + username;
         sessionStorage.setItem('shareName','');
     }
})();

(function (doc, win) {
    var docEl = doc.documentElement;
    var resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize';
    console.log(resizeEvt);
    const recalc = function () {
        var clientWidth = docEl.clientWidth;
        if (!clientWidth) return;
        if (clientWidth >= 1920) {
            docEl.style.fontSize = '100px';
        } else {
            docEl.style.fontSize = 100 * (clientWidth / 1920) + 'px';
        }
    }
    if (!doc.addEventListener) return;
    doc.addEventListener('DOMContentLoaded', recalc, false);
    win.addEventListener(resizeEvt, recalc, false);
    win.addEventListener('load', recalc, false);
})(document, window);


function clone(origin){
    let originProto = Object.getPrototypeOf(origin);
    return Object.assign(Object.create(originProto),origin);
};
//全局注册一个clone函数。
Vue.prototype.$clone = clone;
//挂载store到全局
Vue.prototype.$store = Store;

//如果要更改测试，直接在这里改就好了
const config = Config.productionConfig;

Vue.prototype.$comonConfig = clone(config.comonConfig);
Vue.prototype.$coinConfig = clone(config.coinConfig);
// Vue.prototype.$rollConfig = clone(config.rollConfig);
//测试数据
Vue.prototype.$rollConfig = clone(Config.testConfig.rollConfig);


// eos io 的系统错误处理.
function errorFun(error) {
    if(error && error.code == 500) {
        if(error && error.error && error.error.code == 3050003) {
            this.$message.error(
                this.$t('common.errorMessage4'),
            );
        } else if(error && error.error &&error.error.code == 3080002) {
            this.$message.error(
                this.$t('common.errorMessage5'),
            );
        } else if (error && error.error && error.error.code == 3080001) {
            this.$message.error(
                this.$t('common.errorMessage6'),
            );
        } else if ((error && error.error && error.error.code == 3050004) || error.error.code == 3080004) {
            this.$message.error(
                this.$t('common.errorMessage7'),
            );
        } else {
            this.$message.error(
                this.$t('common.errorMessage10'),
            );
        }
    } else {
        //如果code码不为500的情况错误处理都为系统错误
        this.$message.error(
            this.$t('common.errorMessage10'),
        );
    }
}
//全局注册eos io的系统错误函数
Vue.prototype.$errorFun = errorFun;

Vue.filter('showDay1', function(value) {
    value = Number(value)/1000;
    if (!isNaN(Number(value))) {
        var date = new Date(value);
        var y = date.getFullYear();
        var m = date.getMonth() + 1
        m = m < 10 ? '0' + m : m;
        var d = date.getDate()
        d = d < 10 ? '0' + d : d;
        var h = date.getHours()
        h = h < 10 ? '0' + h : h;
        var min = date.getMinutes()
        min = min < 10 ? '0' + min : min;
        return y + '-' + m + '-' + d;
    } else {
        return value;
    }
})
Vue.filter('showDay2', function(value) {
    value = Number(value)/1000;
    if (!isNaN(Number(value))) {
        var date = new Date(value);
        var y = date.getFullYear();
        var m = date.getMonth() + 1
        m = m < 10 ? '0' + m : m;
        var d = date.getDate()
        d = d < 10 ? '0' + d : d;
        var h = date.getHours()
        h = h < 10 ? '0' + h : h;
        var min = date.getMinutes()
        min = min < 10 ? '0' + min : min;
        return y + '-' + m + '-' + d + ' ' + h + ':' + min;
    } else {
        return value;
    }
})
/* eslint-disable no-new */
new Vue({
  el: '#app',
  i18n,
  Store,
  router,
  components: { App },
  template: '<App/>'
})
