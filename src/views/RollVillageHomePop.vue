<template>
  <div id="villagehomepop">
    <transition name="slide-fade">
      <div v-show="showPop" class="pop-wrapper1">
        <div class="pop-container">
          <div class="close-icon" @click="closePop" />
          <div class="pop-title">{{ $t("villagehomepop.title") }}</div>
          <div class="pop-summary1">{{ $t("villagehomepop.summary1") }}</div>
          <div class="pop-summary2">{{ $t("villagehomepop.summary2") }}</div>
          <div class="pop-introdution">
            <div @click="checkIntroduction">{{ $t("villagehomepop.checkIntroduction") }}</div>
          </div>
          <div class="go-PC-tips">{{ $t("villagehomepop.goPCTips") }}</div>
          <div class="pop-img-tips">
            <img class="img-chrome" src="../../static/img/chrome_logo@3x.png" alt="logo">
            <img class="img-add" src="../../static/img/add_icon@3x.png" alt="logo">
            <img class="img-scatter" src="../../static/img/scatter_logo@3x.png" alt="logo">
          </div>
          <!-- <a href="javascript:void(0)"></a> -->
          <div class="pop-datapart">
            <div class="left">
              <div class="ring-circle">
                <el-progress type="circle" :percentage="investmentRatio" color="#8e71c7" :stroke-width="10" />
              </div>
              <div class="ring-text">
                <div class="text1">{{ $t("villagehomepop.rightText1") }}</div>
                <div class="text2">{{ $t("villagehomepop.rightText2") }}</div>
                <div class="text3">{{ $t("villagehomepop.rightText3") }}</div>
              </div>
            </div>
            <div class="right">
              <div class="right-text">
                <div class="text1">{{ investmentBalance }}</div>
                <div class="text2">{{ investmentCost }}</div>
                <div class="text3">{{ investmentDividend }}</div>
              </div>
              <div class="right-buttons">
                <div class="button1" @click="centerDialogVisible = true">{{ $t("villagehomepop.buttonText1") }}</div>
                <div class="button2" @click="clickRecords">{{ $t("villagehomepop.buttonText2") }}</div>
              </div>
            </div>
          </div>
          <div class="pop-input">
            <input v-model="inputText" type="text" maxlength="7">
          </div>
          <!-- <div class="pop-dividend-text">{{$t("villagehomepop.dividendText")}}</div> -->
          <div class="pop-button" @click="clickInvestment">{{ $t("villagehomepop.investmentButton") }}</div>
        </div>
      </div>
    </transition>
    <el-dialog :title="dialogTitle" :visible.sync="centerDialogVisible" :show-close="false" top="35vh" width="35vh" center>
      <span slot="footer" class="dialog-footer">
        <el-button @click="centerDialogVisible = false">{{ $t("villagehomepop.dialogCancel") }}</el-button>
        <el-button type="primary" @click="clickDivestment">{{ $t("villagehomepop.dialogSure") }}</el-button>
      </span>
    </el-dialog>
    <!-- 组件 -->
    <VillageDetailPop />
    <InvestRecordsPop :divestment-list="computMydevestmentList"/>
    <SucessDivestmentPop />
    <SucessInvestmentPop />
    <SucessWithdrawalPop />
  </div>
</template>

<script>

import Eos from 'eosjs'
import Md5 from '../../static/js/md5.min';
import * as Mutations from '../store/constants'
import Config from '../config/config';

import VillageDetailPop from '../components/VillageDetailPop.vue';
import InvestRecordsPop from '../components/InvestRecordsPop.vue';
import SucessDivestmentPop from '../components/SucessDivestmentPop.vue';
import SucessInvestmentPop from '../components/SucessInvestmentPop.vue';
import SucessWithdrawalPop from '../components/SucessWithdrawalPop.vue';

export default {
    name: 'RollVillageHomePop',
    components: {
        VillageDetailPop,
        InvestRecordsPop,
        SucessDivestmentPop,
        SucessInvestmentPop,
        SucessWithdrawalPop,
    },
    data() {
        return {
            inputText: '100.00',
            centerDialogVisible: false, // 弹窗插件
            username: '', // 用户账号

            feepool: '', // 水池金额
            investmentRatio: 0, // 投资占比
            investmentBalance: '0.0000 EOS', // 投资余额
            investmentCost: '0.0000 EOS', // 累计投资成本
            investmentDividend: '0.0000 EOS', // 投资分红
            devestFinish: false, // 获取投资历史记录列表是否完成
            eosClient: null, // 用来获取区块链只读数据，不需要通过scatter
            eosClientTestRoll: null,
            comonConfig: null,
            coinConfig: null,
            rollConfig: null,
        };
    },
    computed: {
        showPop() {
            return this.$store.state.villageHomeShow;
        },
        dialogTitle() {
            return this.$t('villagehomepop.dialogTitle');
        },
        computLogin(){
            return this.$store.state.isLogin;
        },
        computScatter(){
            return this.$store.state.scatter;
        },
        computScatterClient() {    
            return this.computScatter.eos(this.comonConfig.eosNetwork,Eos,this.comonConfig.eosOptions,"http");  
        },
        computComonRollObj(){
            return this.$store.state.commonRollObj;
        },
        computGbdataRollObj(){
            return this.$store.state.gbdataRollObj;
        },
        //计算投资金额
        computInvestment() {
            let that = this;
            let investment = 0; 
            if(this.computComonRollObj && this.computComonRollObj['rows']){
                let rollArr = this.computComonRollObj['rows'].filter(function(item){
                    return item.owner == that.username;
                });
                //获取抛硬币游戏的好友返利
                investment = rollArr && rollArr[0] && rollArr[0].investment || 0;
            }
            return investment;
        },
        //计算我的投资列表历史数据
        computMydevestmentList(){
            let that = this;
            let myDevestmentList = []; //我的投资列表
            if(this.computComonRollObj && this.computComonRollObj['rows']){
                let rollArr = this.computComonRollObj['rows'].filter(function(item){
                    return item.owner == that.username;
                });
                //获取抛硬币游戏的好友返利
                myDevestmentList = rollArr && rollArr[0] && rollArr[0].investhistorys || [];
            }
            return myDevestmentList;
        },
        //计算奖池/水池数据
        computRewardpoolAmount(){
            let that = this;
            let rewardpoolAmount = '0 EOS';
            let feePoolAmount = '0 EOS';
            if(this.computGbdataRollObj && this.computGbdataRollObj['rows']){
                let tempArr = that.computGbdataRollObj['rows'] || [];
                let rewardpool = tempArr && tempArr[0] && tempArr[0].rewardpool || '0 EOS';
                let feepool = tempArr && tempArr[0] && tempArr[0].feepool || '0 EOS';
                //计算奖池总数  
                rewardpoolAmount = parseFloat(rewardpool).toFixed(4) + ' EOS';  
                //计算水池总数
                feePoolAmount = parseFloat(feepool).toFixed(4) + ' EOS';  
            }
            return {
                rewardpoolAmount: rewardpoolAmount,
                feePoolAmount: feePoolAmount,
            };
        },
    },
    watch: {
        inputText(newVal, oldVal) {
            console.log(newVal);
            const that = this;
            const reg = /^(([1-9]{1}\d*)|(0{1}))(\.\d{0,2})?$/;
            if (!newVal) {
                console.log(newVal);
                newVal = 100.0;
            }
            // 最多输入两位小数
            if (!reg.test(newVal)) {
                console.log(parseFloat(newVal));
                that.inputText = parseFloat(newVal).toFixed(2);
            }
        },
    },
    created() {
        this.username = sessionStorage.getItem('username');
        this.comonConfig = this.$clone(this.$comonConfig);
        this.rollConfig = this.$clone(this.$rollConfig);
        this.eosClientTestRoll = Eos(Config.testConfig.comonConfig);

        // this.coinConfig = this.$clone(this.$coinConfig);
        // this.eosClient = Eos(this.comonConfig);
    },
    mounted() {
        const that = this;
        setInterval(() => {
            that.promiseAlldone();
        }, 3000);
    },
    methods: {
        // 关闭当前组件
        closePop() {
            this.$store.commit(Mutations.SET_VILLAGEHOMESHOW,false);
        },
        // 查看详细说明
        checkIntroduction() {
            this.$store.commit(Mutations.SET_VILLAGEDETAILSHOW,true);
        },
        // 点击记录
        clickRecords() {
            this.$store.state.investRecordsShow = true;
        },

        // 撤资操作
        clickDivestment() {
            const that = this;
            this.centerDialogVisible = false;
            //判断是否又投资
            if (!(parseInt(that.computInvestment) > 0)) {
                that.$message({
                    message: that.$t('common.errorMessage2'),
                    type: 'warning',
                    center: true,
                    duration: 1000,
                });
                return false;
            }
            // 当前时间毫秒数
            const nowTime = new Date();
            const nowMillSecons = nowTime.getTime();
            // 最后一笔投资时间
            const investmentTime = (that.computMydevestmentList && that.computMydevestmentList[0] && that.computMydevestmentList[0].time) || 0;
            // 容错处理，基本不会出现
            if (investmentTime == 0) {
                return false;
            }

            // 和本地时间比较是否超过24小时。
            const isPassTime = (investmentTime - 0) / 1000 + 24 * 60 * 60 * 1000 < nowMillSecons - 0;
            if (!isPassTime) {
                console.log('----------not pass 24 hous ---------');
                that.$message({
                    message: that.$t('common.errorMessage12'),
                    type: 'warning',
                    center: true,
                    duration: 1000,
                });
                return false;
            }

            //成功后做个短暂的延时
            that.promiseDividend().then(() => {
                console.log('------- done devidend --------');
            });
            
        },

        // 撤资
        doDividend() {
            const that = this;
            const account = this.computScatter.identity.accounts.find(
                account => account.blockchain === 'eos',
            );
            console.log('--------------doDividend--------------');
            const options = {
                authorization: [`${account.name}@${account.authority}`],
                broadcast: true,
                sign: true,
            };
            const requiredFields = {
                accounts: [that.comonConfig.eosNetwork],
            };
            const args = [account.name, options];

            //撤资操作
            that.computScatterClient.contract(that.rollConfig.gameContract, { requiredFields })
            .then(hello => {
                console.log(hello);
                hello.leave(...args).then(tx => {
                    console.log(tx);
                    // 获取最新的账户信息
                    setTimeout(() => {
                        that.$store.state.sucessDivestmentShow = true;
                    },800);    
                }).catch(e => {
                    console.log(e);
                    if(e){
                        const error = typeof e === 'string' ? JSON.parse(e) : e;
                        // eos io 的系统错误处理.
                        that.$errorFun(error);
                    }   
                });
            }).catch(e => {
                console.log(e);
                if(e){
                    const error = typeof e === 'string' ? JSON.parse(e) : e;
                    // eos io 的系统错误处理.
                    that.$errorFun(error);
                }
                       
            });
        },
        // 封装撤资函数
        promiseDividend() {
            const that = this;
            const dividendPromise = new Promise((resolve, reject) => {
                resolve(that.doDividend());
            });
            return dividendPromise;
        },

        // 获取玩家投资表
        getPlayerDivest() {
            const that = this;
            const playerDivestPromise = new Promise((resolve, reject) => {
                that.eosClientTestRoll.getTableRows({
                    json: true,
                    code:  that.rollConfig.gameContract,
                    scope:  that.rollConfig.toContract,
                    table: 'invest',
                    limit: 100,
                    lower_bound: 0,
                }).then(result => {
                    resolve(result);
                }).catch(e => {
                    console.log(e);
                    reject(e);
                });
            });
            return playerDivestPromise;
        },

        // 请求投资invest表信息
        promiseAlldone() {
            const that = this;
            const playerPro = that.getPlayerDivest();
            Promise.all([playerPro]).then(value => {
                // console.log(value);
                const tempList1 = (value && value[0]) || {};
                that.devestFinish = true;
                // 处理玩家投资表返回的数据
                const accountObj1 = tempList1 && tempList1.rows && tempList1.rows.filter(item => item.owner == 't1');
                const tempPercent = (accountObj1 && accountObj1[0] && parseFloat(accountObj1[0].invest_rate)) || 0;

                if (tempPercent == 0) {
                    that.investmentRatio = tempPercent / 10000 || 0;
                } else {
                    that.investmentRatio = (tempPercent + 1) / 10000 || 0;
                }
                const tempCost = (accountObj1 && accountObj1[0] && parseFloat(accountObj1[0].amount)) || 0;
                that.investmentCost = `${parseFloat(tempCost).toFixed(4)} EOS`;

                // 数据处理完后计算
                that.calculationBalance();
                that.calculationDividend();
            });
        },

        // 计算投资余额，投资余额：(invest_rate * (rewardpool: 奖池金额) / 10000) + (invest_rate * (feepool: 抽水总额) / 10000)
        calculationBalance() {
            const that = this;
            const tempPool = parseFloat(that.computRewardpoolAmount.rewardpoolAmount);
            const tempFeePool = parseFloat(that.computRewardpoolAmount.feePoolAmount);
            that.investmentBalance = `${((tempPool * that.investmentRatio) / 100 + (tempFeePool * that.investmentRatio) / 100).toFixed(4)} EOS`;
        },
        // 计算投资分红，投资余额 - 累计投资成本
        calculationDividend() {
            const that = this;
            that.investmentDividend = `${(parseFloat(that.investmentBalance) - parseFloat(that.investmentCost)).toFixed(4)} EOS`;
        },
       
        // 点击投资
        clickInvestment() {
            const that = this;
            //判断是否有值
            if (!that.inputText) {
                that.$message({
                    message: that.$t('common.errorMessage3'),
                    type: 'warning',
                    center: true,
                    duration: 1000,
                });
                that.inputText = '100.00';
                return false;
            }
            //最低投资100 EOS
            if (parseFloat(that.inputText) < 100) {
                that.$message({
                    message: that.$t('common.errorMessage3'),
                    type: 'warning',
                    center: true,
                    duration: 1000,
                });
                that.inputText = '100.00';
                return false;
            }
            //最多投资5000EOS
            if (parseFloat(that.inputText) > 5000) {
                that.$message({
                    message: that.$t('common.errorMessage11'),
                    type: 'warning',
                    center: true,
                    duration: 1000,
                });
                that.inputText = '100.00';
                return false;
            }
            // 投资操作
            const str = new Date().getTime();
            const memo = `C${Md5(str).substring(16)}`;
            const account = this.computScatter.identity.accounts.find(
                account => account.blockchain === 'eos',
            );
            const options = {
                authorization: [`${account.name}@${account.authority}`],
                broadcast: true,
                sign: true,
            };
            const requiredFields = {
                accounts: [that.comonConfig.eosNetwork],
            };
            const strChapin = `${(that.inputText - 0).toFixed(4)} EOS`;
            const args = [
                account.name,
                that.rollConfig.toContract,
                strChapin,
                memo,
                options,
            ];
            console.log(args);
            //投资操作
            that.computScatterClient.contract(that.comonConfig.tokenContract, { requiredFields })
            .then(hello => {
                console.log(hello);
                hello.transfer(...args)
                .then(tx => {
                    console.log(tx);
                    // 投资成功后弹出成功弹窗
                    setTimeout(() => {
                        that.$store.state.sucessInvestShow = true;
                    },800);
                        
                }).catch(e => {
                    console.log(e);
                    if(e){
                        const error = typeof e === 'string' ? JSON.parse(e) : e;
                        // eos io 的系统错误处理.
                        that.$errorFun(error);
                    } 
                });
            }).catch(e => {
                console.log(e);
                if(e){
                    const error = typeof e === 'string' ? JSON.parse(e) : e;
                    // eos io 的系统错误处理.
                    that.$errorFun(error);
                } 
            });
        },
        
    },
};
</script>
<style type="text/css" lang="less" scopped>
  @color_1: rgba(255, 255, 255, 1);
  @color_2: rgba(144, 153, 186, 1);
  @color_3: rgba(139, 126, 228, 1);
  @color_4: rgba(232, 233, 255, 1);
  @color_5: #ffffff;

  .el-dialog--center {
    .el-dialog__body {
      display: none !important;
    }
  }

  .slide-fade-enter-active {
    transition: all 0.4s ease;
  }

  .slide-fade-leave-active {
    transition: all 0.6s cubic-bezier(1, 0.5, 0.8, 1);
  }

  .slide-fade-enter {
    transform: translateX(6rem);
    opacity: 0;
  }

  .slide-fade-leave-to {
    transform: translateX(6rem);
    opacity: 0;
  }

  #villagehomepop {
    .pop-wrapper1 {
      position: fixed;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      background: rgba(43, 48, 59, 1);
      z-index: 2000;

      .pop-container {
        position: relative;
        margin: 100px auto 0px auto;
        width: 580px;
        height: 745px;
        background: linear-gradient(0deg,
          rgba(38, 49, 60, 1),
          rgba(70, 74, 91, 1));
        border-radius: 5px;
        box-shadow: 0px 0px 10px rgba(19, 26, 47, 0.2);

        .close-icon {
          position: absolute;
          height: 36px;
          width: 36px;
          top: -18px;
          right: -18px;
          background: url('../../static/img/close_icon.png') no-repeat;
          background-size: 100% 100%;
        }

        .pop-title {
          position: absolute;
          width: 180px;
          height: 40px;
          text-align: center;
          top: 70px;
          left: 50%;
          margin-left: -90px;
          font-size: 24px;
          font-weight: 400;
          color: @color_1;
        }

        .pop-summary1 {
          position: absolute;
          width: 480px;
          text-align: left;
          top: 130px;
          left: 50%;
          margin-left: -240px;
          font-size: 16px;
          font-weight: 400;
          color: @color_2;
        }

        .pop-summary2 {
          position: absolute;
          width: 480px;
          text-align: left;
          top: 220px;
          left: 50%;
          margin-left: -240px;
          font-size: 16px;
          font-weight: 400;
          color: @color_2;
        }

        .go-PC-tips {
          display: none;
        }

        .pop-img-tips {
          display: none;
        }

        .pop-introdution {
          position: absolute;
          width: 480px;
          text-align: left;
          top: 250px;
          left: 50%;
          margin-left: -240px;
          font-size: 16px;
          font-weight: 400;
          color: @color_3;

          div {
            width: 200px;
          }
        }

        .pop-datapart {
          position: absolute;
          width: 500px;
          height: 180px;
          top: 272px;
          left: 50%;
          margin-left: -250px;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .pop-input {
          position: absolute;
          width: 330px;
          height: 80px;
          top: 490px;
          left: 50%;
          margin-left: -165px;
          border: 1px solid rgba(144, 153, 186, 1);
          border-radius: 5px;
          display: flex;
          justify-content: center;
          align-items: center;

          input {
            height: 60px;
            font-size: 24px;
            text-align: center;
            width: 131px;
            color: @color_5;
          }
        }

        .pop-dividend-text {
          position: absolute;
          width: 330px;
          height: 20px;
          line-height: 20px;
          text-align: center;
          top: 580px;
          left: 50%;
          margin-left: -165px;
          font-size: 14px;
          font-weight: 400;
          color: @color_2;
        }

        .pop-button {
          position: absolute;
          width: 204px;
          height: 50px;
          line-height: 50px;
          text-align: center;
          top: 634px;
          left: 50%;
          margin-left: -102px;
          background: linear-gradient(90deg,
            rgba(147, 144, 254, 1),
            rgba(138, 124, 224, 1));
          border-radius: 5px;
          box-shadow: 1px 0px 10px rgba(44, 51, 62, 0.2);
          font-size: 18px;
          font-weight: 400;
          color: @color_1;
        }
      }
    }
  }

  .pop-datapart {
    .left {
      width: 50%;
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;

      .ring-circle {
        height: 150px;
        width: 150px;
        display: flex;
        justify-content: center;
        align-items: center;
      }

      .ring-text {
        height: 144px;
        width: 100px;
        font-size: 14px;
        font-weight: 400;
        color: @color_2;

        div {
          text-align: center;
          margin-top: 20px;
        }
      }
    }

    .right {
      width: 50%;
      height: 100%;
      display: flex;
      justify-content: flex-start;
      align-items: center;

      .right-text {
        height: 144px;
        width: 180px;
        font-size: 18px;
        font-weight: 400;
        color: @color_4;

        div {
          text-align: center;
          margin-top: 20px;
          line-height: 18px;
          height: 18px;
        }
      }

      .right-buttons {
        height: 144px;
        width: 60px;
        font-size: 18px;
        font-weight: 400;
        color: @color_3;

        div {
          text-align: left;
          margin-top: 20px;
          line-height: 18px;
          height: 18px;
        }
      }
    }
  }
</style>