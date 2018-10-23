/*
 * @Author: tonyTang 
 * @Date: 2018-10-18 21:02:45 
 * @Last Modified by: tonyTang
 * @Last Modified time: 2018-10-20 20:34:16
 */

import Eos from 'eosjs'
import Store from '../src/store';
import Config from '../src/config/config';
import * as Actions from '../src/store/constants'

let rollObj = null;
let coinObj = null;
let gbdataCoinObj = null;
let gbdataRollObj = null;
let historyList = [];
let myHistoryList = [];
let zeroItemId = 0;
//过山车历史数据
let rollHistoryList = [];
let rollMyHistoryList = [];
let rollZeroItemId = 0;

//生成eosClient对象
let eosClient = Eos(Config.productionConfig.comonConfig);
//测试数据
let eosClientTestRoll = Eos(Config.testConfig.comonConfig);

//获取抛硬币的账户信息表
function getCoinAccount(){
    let accountPromise = new Promise(function(resolve,reject){
        eosClient.getTableRows({
            json: true,
            code: Config.productionConfig.coinConfig.gameContract,
            scope: Config.productionConfig.coinConfig.toContract,
            table: "account",
            limit: 100,
            lower_bound: 0,
        }).then(result => {
            // console.log(result);
            resolve(result); 
        }).catch(error => {
            console.log(error);
            reject(false);
        });
    });
    return accountPromise;       
}

//获取过山车的账户信息表
function getRollAccount(){
    let accountPromise = new Promise(function(resolve,reject){
        eosClientTestRoll.getTableRows({
            json: true,
            code: Config.testConfig.rollConfig.gameContract,
            scope: Config.testConfig.rollConfig.toContract,
            table: "account",
            limit: 100,
            lower_bound: 0,
        }).then(result => {
            resolve(result); 
        }).catch(error => {
            console.log(error);
            reject(false);
        });
    });
    return accountPromise;       
}

//获取抛银币和过山车的数据后的处理
function promiseAccountAllDone(){
    let coinPromise = getCoinAccount();
    let rollPromise = getRollAccount();
    Promise.all([coinPromise,rollPromise]).then(result => {  
        // console.log(result);
        coinObj = result[0];
        rollObj = result[1];
        Store.dispatch(Actions.SET_COMMONCOINOBJ,coinObj);
        Store.dispatch(Actions.SET_COMMONROLLOBJ,rollObj);
    }).catch(error => {
        console.log(error);
    });
}

//获取抛硬币的gbdata表中的数据
function getCoinGbdata() {
    let coinGbPromise = new Promise(function(resolve,reject){
        eosClient.getTableRows({
            json: true,
            code: Config.productionConfig.coinConfig.gameContract,
            scope: Config.productionConfig.coinConfig.toContract,
            table: "gbdata",
            limit: 100,
            lower_bound: 0,
        }).then(result => {
            // console.log(result);
            resolve(result);          
        }).catch(error => {
            console.log(error);
            reject(false);
        });
    });
    return coinGbPromise;
}

//获取过山车的gbdata表中的数据
function getRollGbdata() {
    let rollGbPromise = new Promise(function(resolve,reject){
        eosClientTestRoll.getTableRows({
            json: true,
            code: Config.testConfig.rollConfig.gameContract,
            scope: Config.testConfig.rollConfig.toContract,
            table: "gbdata",
            limit: 100,
            lower_bound: 0,   
        }).then(result => {
            resolve(result);          
        }).catch(error => {
            console.log(error);
            reject(false);
        });
    });
    return rollGbPromise;
}
//获取抛硬币和过山车的数据后的处理
function promiseGbdataAllDone(){
    let coinGbPromise = getCoinGbdata();
    let rollGbPromise = getRollGbdata();
    Promise.all([coinGbPromise,rollGbPromise]).then(result => {  
        // console.log(result);
        gbdataCoinObj = result[0];
        gbdataRollObj = result[1];
        Store.dispatch(Actions.SET_GBDATACOINOBJ,gbdataCoinObj);
        Store.dispatch(Actions.SET_GBDATAROLLOBJ,gbdataRollObj);
    }).catch(error => {
        console.log(error);
    });
}

//获取抛硬币游戏的历史记录
function getCoinHistoryList() {
    eosClient.getTableRows({
        json: true,
        code: Config.productionConfig.coinConfig.gameContract,
        scope: Config.productionConfig.coinConfig.toContract,
        table: 'game',
        limit: 100,
        lower_bound: 0,
    }).then(result => {
        historyList = result && result.rows;
        historyList = historyList.reverse();
        let username = sessionStorage.getItem('username') || '';
        if(username){
            myHistoryList = historyList.filter(
                item => item.name == username,
            );
        } else {
            myHistoryList = [];
        }  
        zeroItemId = (myHistoryList[0] && myHistoryList[0].id) || 0
        //更新状态到vuex的store中
        Store.dispatch(Actions.SET_HISTORYDATA,historyList);
        Store.dispatch(Actions.SET_MYHISTORY,myHistoryList);
        Store.dispatch(Actions.SET_ZEROITEMID,zeroItemId);
    }).catch(error => {
        console.log(error);
    });
}

//过山车历史游戏记录
function getRollHistoryList() {
    eosClientTestRoll.getTableRows({
        json: true,
        code: Config.testConfig.rollConfig.gameContract,
        scope: Config.testConfig.rollConfig.toContract,
        table: 'game',
        limit: 100,
        lower_bound: 0,
    }).then(result => {
       //console.log(result);
       rollHistoryList = result && result.rows;
       rollHistoryList = rollHistoryList.reverse();
       let username = sessionStorage.getItem('username') || '';
       if(username){
            rollMyHistoryList = rollHistoryList.filter(
                item => item.name == username,
            );
       } else {
            rollMyHistoryList = [];
       }  
       rollZeroItemId = (rollMyHistoryList[0] && rollMyHistoryList[0].id) || 0
       //更新状态到vuex的store中
       Store.dispatch(Actions.SET_ROLLHISTORYLIST,rollHistoryList);
       Store.dispatch(Actions.SET_ROLLMYHISTORYLIST,rollMyHistoryList);
       Store.dispatch(Actions.SET_ROLLZEROITEMID,rollZeroItemId);
       
    }).catch(error => {
        console.log(error);
    });
}

//循环请求数据
setInterval(() => {
    promiseAccountAllDone();
    promiseGbdataAllDone();
},3000);

//历史数据循环2s请求一次
setInterval(() =>{
    getCoinHistoryList();
    getRollHistoryList();
},2000);

export default {
    rollObj: rollObj,
    coinObj: coinObj,
    historyList: historyList,
    myHistoryList: myHistoryList,
    zeroItemId: zeroItemId,
}