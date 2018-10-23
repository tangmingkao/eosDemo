/*
 * @Author: tonyTang 
 * @Date: 2018-10-16 19:44:53 
 * @Last Modified by: tonyTang
 * @Last Modified time: 2018-10-20 20:14:37
 */

import * as Mutations from './constants'
const mutations = {
   
    [Mutations.SET_CHANGEHOMECOMPONENTSHOW](state,type){
        state.homeComponentShow = type;
    },
    [Mutations.SET_CHANGEHOMERIGHTSHOW](state,type){
        state.homeRightShow = type;
    },
    [Mutations.SET_CHANGEGAMECENTERSHOW](state,type){
        state.gameCenterShow = type;
    },

    [Mutations.SET_CHANGECOINCENTERSHOW](state,type){
        state.coinCenterShow = type;
    },
    [Mutations.SET_CHANGECOINRIGHTSHOW](state,type){
        state.coinRightShow = type;
    },
    [Mutations.SET_CHANGEROLLERCOASTERCENTERSHOW](state,type){
        state.rollerCoasterCenterShow = type;
    },
    [Mutations.SET_CHANGEROLLERCOASTERRIGHTSHOW](state,type){
        state.rollerCoasterRightShow = type;
    },

    [Mutations.SET_CHANGECOMMONPROBLEMSHOW](state,type){
        state.commonProblemShow = type;
    },
    [Mutations.SET_CHANGEABOUTSSHOW](state,type){
        state.aboutUsShow = type;
    },
    [Mutations.SET_CHANGENAVLIST](state,id){
        state.navList.forEach(val => {
            if (id == val.id) {
                val.selected = true;
            } else {
                val.selected = false;
            }
        });
    },

    [Mutations.SET_USERNAME](state,username){
        state.userName = username;
    },
    [Mutations.SET_SCATTER](state,scatter){
        state.scatter = scatter;
    },
    [Mutations.SET_EOSCLIENT](state,eosClient){
        state.eosClient = eosClient;
    },
    [Mutations.SET_LOGINSTATUS](state,type){
        state.isLogin = type;
    },
    [Mutations.SET_LOGINOUTTEXT](state,type){
        state.logoutText = type;
    },
    [Mutations.SET_LOGINTEXT](state,type){
        state.loginText = type;
    },
    [Mutations.SET_VILLAGEDETAILSHOW](state,type){
        state.villageDetailShow = type;
    },
    [Mutations.SET_INVITEFRIENDSHOW](state,type){
        state.inviteFriendShow = type;
    },
    [Mutations.SET_FRIENDRECORDSSHOW](state,type){
        state.friendRecordsShow = type;
    },
    [Mutations.SET_VILLAGEHOMESHOW](state,type){
        state.villageHomeShow = type;
    },


    [Mutations.SET_COMMONCOINOBJ](state,coinObj){
        state.commonCoinObj = coinObj;
    },
    [Mutations.SET_COMMONROLLOBJ](state,rollObj){
        state.commonRollObj = rollObj;
    },
    
    [Mutations.SET_GBDATACOINOBJ](state,gbdataCoinObj){
        state.gbdataCoinObj = gbdataCoinObj;
    },
    [Mutations.SET_GBDATAROLLOBJ](state,gbdataRollObj){
        state.gbdataRollObj = gbdataRollObj;
    },

    [Mutations.SET_COINGAMESHOW](state,type){
        state.coinGameShow = type;
    },
    [Mutations.SET_ROLLGAMESHOW](state,type){
        state.rollGameShow = type;
    },
    //抛硬币
    [Mutations.SET_HISTORYDATA](state,tempArr){
        state.historyList = tempArr;
    },
    [Mutations.SET_MYHISTORY](state,tempArr){
        state.myHistoryList = tempArr;
    },
    [Mutations.SET_ZEROITEMID](state,id){
        state.zeroItemId = id;
    },
    //过山车
    [Mutations.SET_ROLLHISTORYLIST](state,tempArr){
        state.rollHistoryList = tempArr;
    },
    [Mutations.SET_ROLLMYHISTORYLIST](state,tempArr){
        state.rollMyHistoryList = tempArr;
    },
    [Mutations.SET_ROLLZEROITEMID](state,id){
        state.rollZeroItemId = id;
    },  
  
};

export default mutations;