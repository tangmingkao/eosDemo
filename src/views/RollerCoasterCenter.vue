/*
 * @Author: lindongwu 
 * @Date: 2018-10-20 18:03:45 
 * @Last Modified by: tonyTang
 * @Last Modified time: 2018-10-22 14:24:46
 */

<template>
  <div id="roller-center">
    <div class="container">
      <div class="main-left">
        <div class="left-container">
          <div class="title">EOS過山車</div>
          <div class="subtitle">一款可控制風險的EOS博弈遊戲</div>
          <div class="summary">遊戲玩法：調整勝率，輸入投注金額，點擊“投擲”按鈕下注即可</div>
        </div>
        <div class="right">
          <div class="right-container">
            <div class="first-part">
              <div class="first-first">
                <div class="first-text1">勝率</div>
                <div class="first-text2">{{ (winningRate * 100).toFixed(0) }}%</div>
              </div>
              <div class="first-second">
                <div class="first-text1">賠率</div>
                <div class="first-text2">{{ odds.toFixed(2) }}x</div>
              </div>
              <div class="first-third">
                <div class="first-text1">贏得收益</div>
                <div class="first-text2">{{ finalProfit.toFixed(4) }}</div>
              </div>
            </div>
            <div class="second-part">
              <div class="second-text">請調整您的勝率</div>
              <div class="second-block">
                <vue-slider id="realSlider" ref="slider" v-bind="slider" @callback="adjustWinningRate" />
                <vue-slider id="fakeSlider" ref="fakeSlider" v-model="fakeSlider.value" :disabled="true" v-bind="fakeSlider" />
                <img class="ruler" src="../../static/img/scale.png">
                <div class="ruler-numbers">
                  <span>1%</span>
                  <span>25%</span>
                  <span>50%</span>
                  <span>75%</span>
                  <span>99%</span>
                </div>
              </div>
              <div class="second-bet">
                <div class="bet1 bet-style" @click="getRandom">
                  隨機
                </div>
                <div class="bet2 bet-style" @click="getHalf">
                  1/2
                </div>
                <div class="bet3 bet-style" @click="getDouble">
                  x2
                </div>
                <div class="bet4 bet-style" @click="getBigValue">
                  最大
                </div>
              </div>
              <div class="second-operation">
                <div class="operation-subtraction" @click="getSubtraction">
                  -
                </div>
                <div class="operation-num">
                  <input v-model="betting" type="text" pattern="^(([1-9]{1}\d*)|(0{1}))(\.\d{2})$" maxlength="5" style="font-size:30px;">
                </div>
                <div class="operation-plus" @click="getPlus">
                  +
                </div>
              </div>
              <div class="second-expected">我的賬戶餘額 {{computAccountBlance}} EOS</div>
              <div class="second-button" @click="clickChipin">投注</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Eos from 'eosjs'
import Config from '../config/config';
import Md5 from '../../static/js/md5.min';
import { Button, Select } from 'element-ui';
import vueSlider from 'vue-slider-component';
import * as Mutations from '../store/constants'

import Plat from '../../static/js/platform.js'
const platForm = Plat.platForm;
const isChrome = Plat.isChrome;
// const BONUS_ODDS = 1.96;
const BONUS_PERCENT = 0.1;
//最小下注额度
const MININUM = 0.1;

function delay(duration) {
    return new Promise(resolve => setTimeout(resolve, duration));
}

export default {
    components: {
        vueSlider,
    },
    data() {
        return {
            /** 手续费率 */
            feeRate: 0.02,
            /** 胜率 */
            winningRate: 0.75,
            /** 投注的 EOS 量 */
            betting: 1,
            /** 奖池大小 */
            poolSize: 10,
            /** 最终结果的数字 */
            resultPosition: null,

            /** 是否登陆 */
            isLogin: false,
            /** 用来获取区块链只读数据，不需要通过scatter */
            eosClient: null,
            /** 用来创建签名。转账需要用这个 */
            scatterEosClient: null,
            comonConfig: null,
            rollConfig: null,
            inviteName: '', // 邀请好友账号

            /** 历史数据列表,游戏数据 */
            historyData: [],
            /** 我的游戏历史数据 */
            myHistory: [],
            /** 用户名 */
            username: '',
            /** 用户信息 */
            userInfo: '',

            slideValue: 0,

            /** 滑动条属性 */
            slider: {
                value: 0.5,
                height: 8,
                dotSize: 12,
                min: 0,
                max: 1,
                interval: 0.01,
                formatter: v => `${(v * 100).toFixed(0)}%`,
                tooltip: 'always',
                bgStyle: {
                    backgroundColor: 'rgba(119,125,154,0.8)',
                },
                sliderStyle: {
                    backgroundColor: '#fff',
                },
                tooltipStyle: {
                    backgroundColor: '#fff',
                    borderColor: '#fff',
                    color: '#000',
                },
                processStyle: {
                    backgroundColor: 'rgba(147, 144, 254, 1)'
                }
            },
            fakeSlider: {
                value: 0,
                min: 0,
                max: 1,
                interval: 0.01,
                height: 0,
                formatter: v => `${(v * 100).toFixed(0)}%`,
                bgStyle: {
                    backgroundColor: 'rgba(0, 0, 0, 0)',
                },
                sliderStyle: {
                    backgroundColor: 'rgba(0, 0, 0, 0)',
                    boxShadow: '0px 0px 0px 0px',
                },
                tooltipStyle: {
                    backgroundColor: 'rgba(147, 144, 254, 1)',
                    borderColor: 'rgba(147, 144, 254, 1)',
                },
                processStyle: {
                    backgroundColor: 'rgba(0, 0, 0, 0)',
                },
            },
        };
    },
    computed: {
        /** 赔率  */
        odds() {
            if(this.winningRate == 0){
                return 0;
            } else {
                return 1 / this.winningRate;
            }    
        },
        /** 手续费 */
        fee() {
            if(this.odds == 0){
                return 0;
            } else {
                return this.betting * (this.odds - 1) * this.feeRate;
            }   
        },
        /** 赢得收益 */
        finalProfit() {
            return this.betting * this.odds - this.fee;
        },
        /** 最大投注金额 */
        maxBetLimit(amount) {
            return amount * 0.1 * this.winningRate;
        },
        
        computLogin() {
            return this.$store.state.isLogin;
        },
        computScatter(){
            return this.$store.state.scatter;
        },
        computGbdataRollObj(){
            return this.$store.state.gbdataRollObj;
        },
        //账户余额
        computAccountBlance() {
            return this.$store.state.accountBlance;
        },
        //计算奖池数据
        computRewardpoolAmount(){
            let that = this;
            let rewardpoolAmount = '0 EOS';
            if(this.computGbdataRollObj && this.computGbdataRollObj['rows']){
                let tempArr = that.computGbdataRollObj['rows'] || [];
                let rewardpool = tempArr && tempArr[0] && tempArr[0].rewardpool || 0;
                //计算奖池总数  
                let tempRewardpool = parseFloat(rewardpool);
                rewardpoolAmount = (tempRewardpool.toFixed(4) + ' EOS') || '0 EOS' ;     
            }
            return rewardpoolAmount;
        },
        //计算可以投注的最大额度
        computMaxBetAmount() {
            let amount = parseFloat(this.computRewardpoolAmount);
            let maxbetAmount = ((amount * BONUS_PERCENT * 100) /(this.odds * 100)).toFixed(2) || 0;
            return maxbetAmount;
        },
    },
    created() {
        this.username = sessionStorage.getItem('username');
        //邀请好友账号
        this.inviteName = this.$route.query.shareName || '';

        this.comonConfig = this.$clone(this.$comonConfig);
        this.rollConfig = this.$clone(this.$rollConfig);
        this.eosClient = Eos(this.comonConfig);
    },
    mounted() {
        let that = this;
        this.isLogin = this.$store.state.isLogin;
        this.historyData = this.$store.state.historyData;
        this.myHistory = this.$store.state.myHistory;
        
        setTimeout(() => that.$refs.slider.refresh(), 100);
        setTimeout(() => that.$refs.fakeSlider.refresh(), 100);
    },

    methods: {
        /** 调整胜率 */
        adjustWinningRate(winningRate) {
            this.winningRate = winningRate;
        },

        /** 调整投注的 EOS 量 */
        // 点击生成随机下注数,随机生产1-最大值中的随机数.
        getRandom() {
            const that = this;
            // 需要判断最大可下注额度
            let result = parseFloat(that.computMaxBetAmount);
            if(result == 0){
                let number = Math.floor(Math.random() * 20 + 1);
                that.betting = parseFloat(number).toFixed(2);
            } else {
                let number = Math.floor(Math.random() * (result - 1) + 1);
                that.betting = parseFloat(number).toFixed(2);
            }   
        },
        // 点击下注最大金额
        getBigValue() {
            const that = this;
            console.log(this.computMaxBetAmount);
            this.betting = parseFloat(that.computMaxBetAmount).toFixed(2);
        },    
        // 点击生成当前输入框的半
        getHalf() {
            const number = parseFloat(this.betting);
            const tempNumber = number / 2;
            if (tempNumber < MININUM) {
                this.betting = parseFloat(MININUM).toFixed(2);
                this.$message.error(this.$t('common.errorMessage9'));
            } else {
                this.betting = parseFloat(tempNumber).toFixed(2);
            }
        },
        getDouble() {
            const that = this;
            let number = parseFloat(this.betting);
            let tempNumber = number * 2;
            // 需要判断最大可下注额度 
            let result = parseFloat(that.computMaxBetAmount);
            if (tempNumber < result) {
                that.betting = parseFloat(tempNumber).toFixed(2);
            } else {
                that.betting = parseFloat(result).toFixed(2);
                that.$message.error(that.$t('common.errorMessage8'));
            }
            
        },
        // 点击加号
        getPlus() {
            const that = this;
            // 需要判断最大可下注额度   
            let result = parseFloat(that.computMaxBetAmount);
            if (this.betting - 0 < result) {
                this.betting = (parseFloat(this.betting) + 0.01).toFixed(2);
            }
        },
        // 点击减号
        getSubtraction() {
            if (this.betting - 0 > MININUM) {
                this.betting = (parseFloat(this.betting) - 0.01).toFixed(2);
            }
        },
        
        /** 下注 */
        async clickChipin() {
            const that = this;
            //设置请求参数
            const memo = this.winningRate.toFixed(2) + Md5(new Date().getTime()).substring(16) + this.inviteName;
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
            const strChapin = `${(this.betting - 0).toFixed(4)} EOS`;
            const args = [
                account.name,
                that.rollConfig.toContract,
                strChapin,
                memo,
                options,
            ];

            that.scatterEosClient = that.computScatter.eos(that.comonConfig.eosNetwork,Eos,that.comonConfig.eosOptions,"http"); 
            console.log(that.scatterEosClient);
            that.scatterEosClient
            .contract(that.comonConfig.tokenContract, { requiredFields })
            .then(hello => {
                console.log(hello);
                //调用过山车动画
                that.playRollerCoasterAnimation(0.5,8);
                //调用合约中的转账方法
                hello.transfer(...args).then(tx => {
                    // 下注成功再改状态
                    console.log(tx);
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
      
        /** 过山车动画效果 */
        async playRollerCoasterAnimation(result, times = 1) {
            for (let count = 0; count < times; count += 1) {
                // eslint-disable-next-line
                await delay(500);
                const nextVale = Math.random();
                this.fakeSlider.value = nextVale;
                await delay(100);
                if (nextVale <= this.winningRate) {
                    this.fakeSlider.tooltipStyle = {
                        backgroundColor: 'rgba(0,255,0, 1)',
                        borderColor: 'rgba(0,255,0, 1)',
                        color: '#fff',
                    };
                } else {
                    this.fakeSlider.tooltipStyle = {
                        backgroundColor: 'rgba(255,0,0, 1)',
                        borderColor: 'rgba(255,0,0, 1)',
                        color: '#fff',
                    };
                }
            }
            await delay(500);
            this.fakeSlider.value = result;
            await delay(100);
            if (result <= this.winningRate) {
                this.fakeSlider.tooltipStyle = {
                    backgroundColor: 'rgba(0,255,0, 1)',
                    borderColor: 'rgba(0,255,0, 1)',
                    color: '#fff',
                };
            } else {
                this.fakeSlider.tooltipStyle = {
                    backgroundColor: 'rgba(255,0,0, 1)',
                    borderColor: 'rgba(255,0,0, 1)',
                    color: '#fff',
                };
            }
        },
    
        // 登陆scatter
        loginScatter() {
            const that = this;
            //如果不是chrome并且是pc端才弹出.
            if (platForm == 'pc' && !isChrome) {
                that.$confirm(
                    that.$t('common.onlySupportChrome'),
                    that.$t('common.supportChromeTip'),
                    {type: 'warning' },
                ).then(() => {

                }).catch(() => {

                });
                return;
            }
            //chrome 如果没有下载scatter跳转scatter插件下载
            if (!that.computScatter) {
                window.open(
                    'https://chrome.google.com/webstore/detail/scatter/ammjpmhgckkpcamddpolhchgomcojkle',
                );
                return;
            }
            //获取身份标识
            that.computScatter.getIdentity({
                accounts: [that.comonConfig.eosNetwork],
            }).then(identity => {
                if (identity && identity.accounts.length > 0) {
                    let account = identity.accounts.find(
                        account => account.blockchain === "eos"
                    );
                    that.username = account.name;
                    sessionStorage.setItem('username',that.username);

                    that.$store.commit(Mutations.SET_LOGINTEXT,that.username);
                    that.$store.commit(Mutations.SET_LOGINOUTTEXT,that.$t("login.loginOutText"));
                    that.$store.commit(Mutations.SET_LOGINSTATUS,true);
                    that.$store.commit(Mutations.SET_USERNAME,that.username);
                }
            }).catch(error => {
                console.log(error);
            });
        },
    },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style type="text/css" scopped>
  #roller-center {
    width: 100%;
    height: 100%;
  }

  #roller-center>.container {
    width: 100%;
    height: 100%;
  }

  #roller-center>.container>.main-left {
    height: 100%;
    width: 100%;
    display: flex;
    justify-content: space-around;
    align-items: center;
    padding-left: .4rem;
  }

  #roller-center>.container>.main-left>.left-container {
    height: 100%;
  }

  @media (max-width: 1100px) {
    #roller-center>.container>.main-left>.left-container {
      display: none;
    }
  }

  #roller-center>.container>.main-left>.left-container>.title {
    width: 100%;
    height: 46px;
    font-size: 48px;
    font-family: HYSongYunLangHeiF;
    font-weight: 400;
    color: rgba(255, 255, 255, 1);
    line-height: 46px;
    margin-top: 34px;
    text-align: left;
  }

  @media (max-width: 1500px) {
    #roller-center>.container>.main-left>.left-container>.title {
      font-size: 42px;
    }
  }

  @media (max-width: 1300px) {
    #roller-center>.container>.main-left>.left-container>.title {
      font-size: 24px;
    }
  }

  #roller-center>.container>.main-left>.left-container>.subtitle {
    width: 100%;
    height: 22px;
    font-size: 22px;
    font-family: HYSongYunLangHeiF;
    font-weight: 400;
    color: rgba(255, 255, 255, 1);
    line-height: 22px;
    margin-top: 34px;
    text-align: left;
  }

  @media (max-width: 1500px) {
    #roller-center>.container>.main-left>.left-container>.subtitle {
      font-size: 18px;
    }
  }

  @media (max-width: 1300px) {
    #roller-center>.container>.main-left>.left-container>.subtitle {
      font-size: 14px;
      width: 180px;
    }
  }

  #roller-center>.container>.main-left>.left-container>.summary {
    width: 384px;
    height: 40px;
    font-size: 16px;
    font-family: HYSongYunLangHeiF;
    font-weight: 400;
    color: rgba(144, 153, 186, 1);
    line-height: 20px;
    margin-top: 34px;
    text-align: left;
  }

  @media (max-width: 1500px) {
    #roller-center>.container>.main-left>.left-container>.summary {
      font-size: 16px;
      width: 300px;
    }
  }

  @media (max-width: 1300px) {
    #roller-center>.container>.main-left>.left-container>.summary {
      font-size: 12px;
      width: 180px;
    }
  }

  #roller-center>.container>#roller-center>.container>.main-left>.right {
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  #roller-center>.container>.main-left>.right>.right-container {
    min-width: 440px;
    background: rgba(107, 113, 143, 0.3);
    /* opacity:0.3; */
    border-radius: 5px;
    box-shadow: 0px 0px 10px rgba(19, 26, 47, 0.3);
    margin-top: .8rem;
  }

  @media (max-width: 1500px) {
    #roller-center>.container>.main-left>.right>.right-container {
      min-width: 360px;
       margin-top: .8rem;
    }
  }

  @media (max-width: 1300px) {
    #roller-center>.container>.main-left>.right>.right-container {
      min-width: 300px;
      margin-top: .8rem;
    }
  }

  #roller-center>.container>.main-left>.right>.right-container>.first-part {
    height: 140px;
    width: 100%;
    border-bottom: 1px solid #465769;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  #roller-center>.container>.main-left>.right>.right-container>.first-part>.first-first {
    height: 133px;
    width: 30%;
    border-right: 1px solid #465769;
  }

  #roller-center>.container>.main-left>.right>.right-container>.first-part>.first-second {
    height: 133px;
    width: 30%;
    border-right: 1px solid #465769;
  }

  #roller-center>.container>.main-left>.right>.right-container>.first-part>.first-third {
    height: 133px;
    width: 40%;
  }

  #roller-center>.container>.main-left>.right>.right-container>.first-part .first-text1 {
    font-size: 16px;
    margin-top: 28px;
    font-family: HYSongYunLangHeiF;
    font-weight: 400;
    color: rgba(144, 153, 186, 1);
  }

  #roller-center>.container>.main-left>.right>.right-container>.first-part .first-text2 {
    margin-top: 20px;
    font-size: 24px;
    font-family: HYSongYunLangHeiF;
    font-weight: 400;
    color: rgba(232, 233, 255, 1);
  }

  #roller-center>.container>.main-left>.right>.right-container>.second-part {
    padding-bottom: 24px;
  }

  #roller-center>.container>.main-left>.right>.right-container>.second-part>.second-text {
    line-height: 20px;
    width: 100%;
    text-align: center;
    margin-top: 20px;
    height: 18px;
    font-size: 18px;
    font-family: HYSongYunLangHeiF;
    font-weight: 400;
    color: rgba(254, 254, 254, 1);
  }

  #roller-center>.container>.main-left>.right>.right-container>.second-part>.second-block {
    width: 85%;
    margin-left: auto;
    margin-right: auto;
    font-size: 18px;
    margin-top: 40px;
  }

  .vue-slider-dot {
    border-radius: 0 !important;
    top: -6px !important;
    height: 18px !important;
  }

  #realSlider .vue-slider-dot:after {
    content: '';
    display: block;
    position: absolute;
    width: 0;
    height: 0;
    border: 6px solid transparent;
    border-top: 6px solid white;
    top: 17px;
  }

  #realSlider .vue-slider-process {
    background-image: linear-gradient(135deg,
      rgba(255, 255, 255, 0.15) 25%,
      transparent 25%,
      transparent 50%,
      rgba(255, 255, 255, 0.15) 50%,
      rgba(255, 255, 255, 0.15) 75%,
      transparent 75%,
      transparent) !important;
    background-size: 0.2rem 0.2rem;
  }

  #fakeSlider {
    margin-top: -22px;
    margin-left: -2px;
  }

  #roller-center>.container>.main-left>.right>.right-container>.second-part>.second-bet {
    height: 86px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  #roller-center>.container>.main-left>.right>.right-container>.second-part>.second-bet>.bet-style {
    height: 36px;
    line-height: 36px;
    /* margin-top: 40px; */
    background: rgba(71, 82, 100, 1);
    width: 65px;
    font-size: 16px;
    font-weight: 400;
    color: rgba(255, 255, 255, 1);
    cursor: Pointer;
  }

  #roller-center>.container>.main-left>.right>.right-container>.second-part>.second-bet>.bet-style:hover {
    box-shadow: 0.05em 0.1em 0.2em rgba(0, 0, 0, 0.6) inset;
    border-color: rgba(0, 0, 0, 0.3);
    background: rgba(147, 144, 254, 1);
  }

  #roller-center>.container>.main-left>.right>.right-container>.second-part>.second-bet>.bet2 {
    margin-left: 10px;
  }

  #roller-center>.container>.main-left>.right>.right-container>.second-part>.second-bet>.bet3 {
    margin-left: 10px;
  }

  #roller-center>.container>.main-left>.right>.right-container>.second-part>.second-bet>.bet4 {
    margin-left: 10px;
  }

  #roller-center>.container>.main-left>.right>.right-container>.second-part>.second-operation {
    height: 80px;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    /* background: red; */
    font-size: 36px;
    color: rgba(255, 255, 255, 1);
  }

  .second-operation>.operation-num {
    height: 80px;
    width: 160px;
    border: 1px solid rgba(144, 153, 186, 1);
    border-radius: 5px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .second-operation>.operation-num>input {
    height: 100%;
    width: 160px;
    text-align: center;
    color: #ffffff;
    background: transparent;
    border: none;
    outline: none;
  }

  .second-operation>.operation-plus {
    height: 80px;
    width: 18px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-left: 20px;
    font-weight: 400;
    font-size: 34px;
    cursor: Pointer;
  }

  .second-operation>.operation-plus:hover {
    color: rgba(147, 144, 254, 1);
  }

  .second-operation>.operation-subtraction {
    height: 80px;
    width: 18px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-right: 20px;
    font-weight: 400;
    font-size: 34px;
    cursor: Pointer;
  }

  .second-operation>.operation-subtraction:hover {
    color: rgba(147, 144, 254, 1);
  }

  .second-button {
    height: 50px;
    line-height: 50px;
    width: 204px;
    background: linear-gradient(90deg, rgba(147, 144, 254, 1), rgba(138, 124, 224, 1));
    border-radius: 5px;
    box-shadow: 1px 0px 10px rgba(44, 51, 62, 0.2);
    text-align: center;
    font-size: 18px;
    font-weight: 400;
    color: rgba(255, 255, 255, 1);
    margin: 10px auto;
    cursor: Pointer;
  }

  #roller-center>.container>.main-left>.right>.right-container>.second-part>.second-expected {
    height: 34px;
    line-height: 34px;
    width: 100%;
    font-size: 14px;
    font-weight: 400;
    color: rgba(144, 153, 186, 1);
  }

  #roller-center>.container>.main-left>.right>.right-container>.second-part>.second-chipin {
    height: 50px;
    line-height: 50px;
    text-align: center;
    margin: 0 auto;
    width: 204px;
    font-size: 18px;
    font-weight: 400;
    color: rgba(255, 255, 255, 1);
    background: linear-gradient(90deg, rgba(147, 144, 254, 1), rgba(138, 124, 224, 1));
    border-radius: 5px;
    box-shadow: 1px 0px 10px rgba(44, 51, 62, 0.2);
    cursor: Pointer;
  }

  .ruler {
    width: 97%;
    margin-left: auto;
    margin-right: auto;
  }

  .ruler-numbers {
    display: flex;
    justify-content: space-between;

    font-size: 16px;
    color: white;
  }

  @media (max-width: 1100px) {
    #roller-center>.container>.main-left>.right {
      width: 100vw;
      height: 100vh;
    }

    #roller-center>.container>.main-left>.right>.right-container {
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0);
      margin-top: .8rem;
    }

    #roller-center>.container>.main-left {
      display: block;
    }
  }
</style>