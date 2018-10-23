/*
 * @Author: tonyTang 
 * @Date: 2018-10-18 19:18:11 
 * @Last Modified by: tonyTang
 * @Last Modified time: 2018-10-20 20:50:30
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
                <div class="right">
                    <div  @click="getWithdraw">{{$t("friendpool.withDraw")}}</div>
                </div>
            </div>
            <div class="friend-second">
                <div class="invite-friend" @click="goInviteFriends">{{$t("friendpool.goInviteFriends")}}</div>
            </div>
            <div class="friend-third"  @click="goFriendRecords">{{$t("friendpool.goFriendRecords")}}</div>
        </div>
        <div class="village-part" v-show="computLogin">
            <div class="village-text"><span>{{$t("friendpool.villageText")}}</span>{{computRewardpoolAmount}}</div>
            <div class="village-button" @click="goVillageHome">{{$t("friendpool.goVillageHome")}}</div>
        </div> 
        <!--人人坐庄说明  -->
        <CoinVillageHomePop />
        <!-- 好友返利组件 -->
        <FriendRecordsPop :inviteFriendList='inviteFriend' v-if="inviteFinish"></FriendRecordsPop>
        <!-- 邀请好友页 -->
        <InviteFriendPop v-if="username"></InviteFriendPop>            
    </div>
</template>

<script>
import Eos from 'eosjs'
import * as Mutations from '../store/constants'

import CoinVillageHomePop from '../views/CoinVillageHomePop.vue'
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
        }
    },
    components: { 
        CoinVillageHomePop,
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
        computGbdataCoinObj(){
            return this.$store.state.gbdataCoinObj;
        },
        //计算邀请奖励
        computInviteRebat(){
            let that = this;
            let inviteRebat = ''; //好友返利
            //连接两个数组合成一个数据进行排序
            if(this.computComonCoinObj && this.computComonCoinObj['rows']){
                let coinArr = this.computComonCoinObj['rows'].filter(function(item){
                    return item.owner == that.username;
                });
                //获取抛硬币游戏的好友返利
                let inviteRebat1 = coinArr && coinArr[0] && coinArr[0].agent_rebate || 0;
                let index1 = inviteRebat1 && inviteRebat1.indexOf(' ') || 0;
                inviteRebat1 = inviteRebat && inviteRebat1.slice(0,index1) || 0;
                //获取总的好友返利
                let tempInviteRebat = parseFloat(inviteRebat1);
                inviteRebat = tempInviteRebat.toFixed(4);
            }
            return inviteRebat;
        },
        //计算奖池数据
        computRewardpoolAmount(){
            let that = this;
            let rewardpoolAmount = '0 EOS';
            if(this.computGbdataCoinObj && this.computGbdataCoinObj['rows']){
                let tempArr1 = that.computGbdataCoinObj['rows'] || [];
                let rewardpool1 = tempArr1 && tempArr1[0] && tempArr1[0].rewardpool || 0;
                //计算奖池总数  
                let tempRewardpool = parseFloat(rewardpool1);
                rewardpoolAmount = tempRewardpool.toFixed(4) + ' EOS';     
            }
            return rewardpoolAmount;
        },
    },
    created(){
        this.username = sessionStorage.getItem('username');
        this.comonConfig = this.$clone(this.$comonConfig);
        this.coinConfig = this.$clone(this.$coinConfig);

        this.eosClient = Eos(this.comonConfig);
    },
    mounted() {      
        this.getAllFriendRecordList();
    },
    methods: {
        //点击按钮进入人人坐庄主页
        goVillageHome(){
            this.$store.commit(Mutations.SET_VILLAGEHOMESHOW,true);
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
            Promise.all([coinPromise]).then(result => {
                console.log(result);
                that.inviteFinish = true;
                //邀请好友列表
                let tempArr1 = (result && result[0] && result[0].rows) || [];
                that.inviteFriend = [...tempArr1];
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
        //好友返利提现
        getWithdraw() {
            let that = this;
            //最小提现额度0.1eos.
            if(that.computInviteRebat-0 < 0.1){
                that.$message({
                    message: that.$t("common.errorMessage1"),
                    type: 'warning',
                    center: true,
                    duration: 1000,
                });
                return false;
            } 
            //生产可以交易的scatter对象
            that.scatterEosClient = that.computScatter.eos(that.comonConfig.eosNetwork,Eos,that.comonConfig.eosOptions,"http"); 

            let account = this.computScatter.identity.accounts.find(
                account => account.blockchain === "eos"
            );
            let options = {
                authorization: [`${account.name}@${account.authority}`],
                broadcast: true,
                sign: true
            };
            let requiredFields = {
                accounts: [that.comonConfig.eosNetwork]
            };
            let args = [account.name,options];
            //进行提现
            that.scatterEosClient.contract(that.coinConfig.gameContract,{requiredFields}).then(hello => {
                console.log(hello);
                hello.withdraw(...args).then(tx => {
                    console.log(tx);
                    that.$store.state.sucessWithdrawalShow = true;
                }).catch(e => {
                    console.log(e);
                     if(e){
                        const error = typeof e === 'string' ? JSON.parse(e) : e;
                        // eos io 的系统错误处理.
                        that.$errorFun(error);
                    }
                });
            });
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
