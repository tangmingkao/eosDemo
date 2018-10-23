/*
 * @Author: tonyTang 
 * @Date: 2018-10-17 17:46:50 
 * @Last Modified by: tonyTang
 * @Last Modified time: 2018-10-20 20:15:57
 */
import * as Actions from './constants'

const actions = {
    [Actions.SET_SCATTER]:({commit}, scatter) => commit(Actions.SET_SCATTER, scatter),
    [Actions.SET_EOSCLIENT]:({commit}, eosClient) => commit(Actions.SET_EOSCLIENT, eosClient),
    
    [Actions.SET_COMMONCOINOBJ]:({commit}, coinObj) => commit(Actions.SET_COMMONCOINOBJ, coinObj),
    [Actions.SET_COMMONROLLOBJ]:({commit}, rollObj) => commit(Actions.SET_COMMONROLLOBJ, rollObj),
    [Actions.SET_GBDATACOINOBJ]:({commit}, gbdataCoinObj) => commit(Actions.SET_GBDATACOINOBJ, gbdataCoinObj),
    [Actions.SET_GBDATAROLLOBJ]:({commit}, gbdataRollObj) => commit(Actions.SET_GBDATAROLLOBJ, gbdataRollObj),

    //抛硬币
    [Actions.SET_HISTORYDATA]:({commit}, historyList) => commit(Actions.SET_HISTORYDATA, historyList),
    [Actions.SET_MYHISTORY]:({commit}, myHistoryList) => commit(Actions.SET_MYHISTORY, myHistoryList),
    [Actions.SET_ZEROITEMID]:({commit}, id) => commit(Actions.SET_ZEROITEMID, id),
    //过山车
    [Actions.SET_ROLLHISTORYLIST]:({commit}, rollHistoryList) => commit(Actions.SET_ROLLHISTORYLIST, rollHistoryList),
    [Actions.SET_ROLLMYHISTORYLIST]:({commit}, rollMyHistoryList) => commit(Actions.SET_ROLLMYHISTORYLIST, rollMyHistoryList),
    [Actions.SET_ROLLZEROITEMID]:({commit}, id) => commit(Actions.SET_ROLLZEROITEMID, id),
};

export default actions;