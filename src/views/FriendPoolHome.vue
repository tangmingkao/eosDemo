/*
 * @Author: tonyTang 
 * @Date: 2018-10-18 19:18:11 
 * @Last Modified by: tonyTang
 * @Last Modified time: 2018-10-19 16:06:50
 */

<template>
    <div id="friend-pool">
        <div class="friend-part" v-show="computLogin">
            <div class="friend-first">
                <div class="left">
                    <div class="left-one">{{$t("friendpool.leftOne")}}</div>
                    <div class="left-two">{{computInviteRebat}}</div>
                    <div class="left-three" style="margin-left: 8px;">EOS</div>
                </div>
                <!-- <div class="right">
                    <div>{{$t("friendpool.withDraw")}}</div>
                </div> -->
            </div>
            <div class="friend-second">
                <div class="invite-friend" @click="goInviteFriends">{{$t("friendpool.goInviteFriends")}}</div>
            </div>
            <div class="friend-third"  @click="goFriendRecords">{{$t("friendpool.goFriendRecords")}}</div>
        </div>
        <div class="village-part" v-show="computLogin">
            <div class="village-text"><span>{{$t("friendpool.villageText")}}</span>{{computRewardpoolAmount}}</div>
            <div class="village-button" @click="goVillageHome">{{$t("friendpool.goVillageHome1")}}</div>
        </div> 
        <!--人人坐庄说明  -->
        <VillageDetailPop />
        <!-- 好友返利组件 -->
        <FriendRecordsPop :inviteFriendList='inviteFriend' v-if="inviteFinish"></FriendRecordsPop>
        <!-- 邀请好友页 -->
        <InviteFriendPop v-if="username"></InviteFriendPop>            
    </div>
</template>

<script>
import Eos from 'eosjs'
import * as Mutations from '../store/constants'
import Config from '../config/config'

import VillageDetailPop from '../components/VillageDetailPop.vue'
import FriendRecordsPop from '../views/FriendRecordsPop.vue'
import InviteFriendPop from '../components/InviteFriendPop.vue'

export default {
    data () {
        return {
            username: '', //用户账号
            inviteFriend: [], //已邀请好友列表
            inviteFinish: false, //获取好友列表是否完成
            rewardpoolAmount: '', //奖池总金额
            eosClient: null,
            eosClientTestRoll: null,
            comonConfig: null,
            coinConfig: null,
            rollConfig: null,
        }
    },
    components: { 
        VillageDetailPop,
        FriendRecordsPop,
        InviteFriendPop
    },
    computed: {
        showPop() {
            return this.$store.state.sucessInvestShow;
        },
        computLogin(){
            return this.$store.state.isLogin;
        },
        computScatter(){
            return this.$store.state.scatter;
        },
        computComonCoinObj(){
            return this.$store.state.commonCoinObj;
        },
        computComonRollObj(){
            return this.$store.state.commonRollObj;
        },
        computGbdataCoinObj(){
            return this.$store.state.gbdataCoinObj;
        },
        computGbdataRollObj(){
            return this.$store.state.gbdataRollObj;
        },
        //计算邀请奖励
        computInviteRebat(){
            let that = this;
            let inviteRebat = ''; //好友返利
            let tempList = [];
            //连接两个数组合成一个数据进行排序
            if(this.computComonCoinObj && this.computComonCoinObj['rows'] && this.computComonRollObj && this.computComonRollObj['rows']){
                let coinArr = this.computComonCoinObj['rows'].filter(function(item){
                    return item.owner == that.username;
                });
                let rollArr = this.computComonRollObj['rows'].filter(function(item){
                    return item.owner == that.username;
                });
                //获取抛硬币游戏的好友返利
                let inviteRebat1 = coinArr && coinArr[0] && coinArr[0].agent_rebate || 0;
                let index1 = inviteRebat1 && inviteRebat1.indexOf(' ') || 0;
                inviteRebat1 = inviteRebat && inviteRebat1.slice(0,index1) || 0;
                //获取过山车游戏的好友返利
                let inviteRebat2 = rollArr && rollArr[0] && rollArr[0].agent_rebate || 0;
                let index2 = inviteRebat2 && inviteRebat2.indexOf(' ') || 0;
                inviteRebat2 = inviteRebat && inviteRebat2.slice(0,index2) || 0;
                //获取总的好友返利
                let tempInviteRebat = parseFloat(inviteRebat1) + parseFloat(inviteRebat2);
                inviteRebat = tempInviteRebat.toFixed(4);
            }
            return inviteRebat;
        },
        //计算奖池数据
        computRewardpoolAmount(){
            let that = this;
            let rewardpoolAmount = '0 EOS';
            if(this.computGbdataCoinObj && this.computGbdataCoinObj['rows'] && this.computGbdataRollObj && this.computGbdataRollObj['rows']){
                let tempArr1 = that.computGbdataCoinObj['rows'] || [];
                let tempArr2 = that.computGbdataRollObj['rows'] || [];
                let rewardpool1 = tempArr1 && tempArr1[0] && tempArr1[0].rewardpool || 0;
                let rewardpool2 = tempArr2 && tempArr2[0] && tempArr2[0].rewardpool || 0;
                //计算奖池总数  
                let tempRewardpool = parseFloat(rewardpool1) + parseFloat(rewardpool2);
                rewardpoolAmount = tempRewardpool.toFixed(4) + ' EOS';     
            }
            return rewardpoolAmount;
        },
    },
    created(){
        this.username = sessionStorage.getItem('username');
        this.comonConfig = this.$clone(this.$comonConfig);
        this.coinConfig = this.$clone(this.$coinConfig);
        this.rollConfig = this.$clone(this.$rollConfig);

        this.eosClient = Eos(this.comonConfig);
        //测试数据
        this.eosClientTestRoll = Eos(Config.testConfig.comonConfig);
    },
    mounted() {      
        this.getAllFriendRecordList();
    },
    methods: {
        //点击按钮进入人人坐庄说明页
        goVillageHome(){
            this.$store.commit(Mutations.SET_VILLAGEDETAILSHOW,true);
        },
         //点击进入邀请好友页
        goInviteFriends(){
            this.$store.commit(Mutations.SET_INVITEFRIENDSHOW,true);
        },
        
        //点击按钮进入好友返利页
        goFriendRecords(){      
            let that = this;
            this.$store.commit(Mutations.SET_FRIENDRECORDSSHOW,true);
        },

        //获取好友返利列表总数
        getAllFriendRecordList() {
            let that = this;
            let coinPromise = that.getCoinFriendRecordsList();
            let rollPromise = that.getRollFriendRecordsList();
            Promise.all([coinPromise,rollPromise]).then(result => {
                console.log(result);
                that.inviteFinish = true;
                //邀请好友列表
                let tempArr1 = (result && result[0] && result[0].rows) || [];
                let tempArr2 = (result && result[1] && result[1].rows) || [];
                that.inviteFriend = tempArr1.concat(tempArr2);
                console.log(that.inviteFriend);
            }).catch(error => {
                console.log(error);
            });
        },
        //获取抛硬币好友返利列表
        getCoinFriendRecordsList() {
            let that = this;
            let promiseCoinFriend = new Promise(function(resolve,reject){
                that.eosClient.getTableRows({
                    json: true,
                    code: that.coinConfig.gameContract,
                    scope: that.username,
                    table: "agentaccount",
                    limit: 100,
                    lower_bound: 0,   
                }).then(result => {
                    resolve(result);
                }).catch(error => {
                    console.log(error);
                    reject(error);
                });
            });
            return promiseCoinFriend;        
        },
        //获取过山车好友返利列表
        getRollFriendRecordsList() {
            let that = this;   
            let promiseRollFriend = new Promise(function(resolve,reject){
                that.eosClientTestRoll.getTableRows({
                    json: true,
                    code: that.rollConfig.gameContract,
                    scope: that.username,
                    table: "agentaccount",
                    limit: 100,
                    lower_bound: 0,   
                }).then(result => {
                    resolve(result);
                }).catch(error => {
                    console.log(error);
                    reject(error);
                });
            });
            return promiseRollFriend;
        },
    },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#friend-pool{
    width: 100%;
    /* height: 100%; */
    background: linear-gradient(0deg,rgba(38,49,60,1),rgba(70,74,91,1));
}
#friend-pool>.friend-part{
    height: 24%;
    border-bottom: 1px solid #465769;
    padding: 20px;
}
#friend-pool>.friend-part>.friend-first{
    height: 40%;
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
}
#friend-pool>.friend-part>.friend-first>.left{
    height: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
}
#friend-pool>.friend-part>.friend-first>.left>.left-one{
    height: 70%;
    width: 40%;
    min-width: 65px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size:14px;
    font-family:MicrosoftYaHei;
    color:rgba(144,153,186,1); 
}
#friend-pool>.friend-part>.friend-first>.left>.left-two{
    height: 62%;
    width: 30%;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size:24px;
    font-family:MicrosoftYaHei;
    font-weight:400;
    color:#E8E9FF;
}
#friend-pool>.friend-part>.friend-first>.left>.left-three{
    height: 70%;
    width: 20%;
    display: flex;
    align-items: center;
    font-size: 20px;
    font-family:MicrosoftYaHei;
    font-weight:400;
    color:#E8E9FF;
}
#friend-pool>.friend-part>.friend-first>.right{
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: flex-end;
}
#friend-pool>.friend-part>.friend-first>.right>div{
    height: 36px;
    line-height: 36px;
    width: 60px;
    background:rgba(71,82,100,1);
    border-radius:5px;
    box-shadow:5px 0px 60px rgba(19,26,47,0.3);
    text-align: center;
    font-size:16px;
    font-weight:bold;
    color:rgba(232,233,255,1);
    cursor: Pointer;
}
#friend-pool>.friend-part>.friend-first>.right>div:hover{
    background:rgba(147,144,254,1);
}
#friend-pool>.friend-part>.friend-second{
    height: 50px;
    width: 100%;
    margin-top: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
}
#friend-pool>.friend-part>.friend-second>.invite-friend{
    height: 49px;
    width: 204px;
    display: flex;
    justify-content: center;
    align-items: center;
    background:linear-gradient(90deg,rgba(147,144,254,1),rgba(138,124,224,1));
    border-radius:5px;
    box-shadow:1px 0px 10px rgba(44,51,62,0.2);
    font-size:18px;
    font-weight:400;
    color:rgba(255,255,255,1);
    cursor: Pointer;
}
#friend-pool>.friend-part>.friend-third{
    height: 20px;
    line-height: 20px;
    width: 204px;
    margin: 20px auto 0 auto;
    text-align: center;
    font-size:14px;
    font-family:MicrosoftYaHei;
    font-weight:400;
    color:rgba(139,126,228,1);
    cursor: Pointer;
}

#friend-pool>.village-part{
    width: 100%;
    padding-top: 20px;
    padding-bottom: 30px;
    /* border-bottom: 1px solid #465769; */
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}
#friend-pool>.village-part>.village-text{
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size:24px;
    font-weight:400;
    color:rgba(232,233,255,1);
}
#friend-pool>.village-part>.village-text>span{
    font-size:14px;
    color:rgba(144,153,186,1);
}
#friend-pool>.village-part>.village-button{
    display: flex;
    justify-content: center;
    align-items: center;
    height: 50px;
    width: 204px;
    margin-top: 16px;
    background:linear-gradient(90deg,rgba(147,144,254,1),rgba(138,124,224,1));
    border-radius:5px;
    box-shadow:1px 0px 10px rgba(44,51,62,0.2);
    font-size:18px;
    font-weight:400;
    color:rgba(255,255,255,1);
    cursor: Pointer;
}
</style>
