/*
 * @Author: tonyTang 
 * @Date: 2018-10-19 20:26:54 
 * @Last Modified by: tonyTang
 * @Last Modified time: 2018-10-22 11:24:09
 */

<template>
  <div v-show="showPop" id="coin-center">
    <div class="container">
      <div class="main-left">
        <div class="left">
          <div class="left-up">
            <div class="title">{{ $t('coincenter.title') }}</div>
            <div class="summary">{{ $t('coincenter.summary') }}</div>
          </div>
          <div class="left-down">
            <div :class="[coinMoving ? 'coin-moving-gif' : (computCoinRuslt == 'A' ? 'coin-positive-gif' : 'coin-negative-gif') ]"></div>
          </div>
        </div>
        <div class="right r-part">
          <div v-show="isShowChapin" class="right-container">
            <div class="first-part">
              <div class="intr-text">{{ $t('coincenter.intrText') }}</div>
              <div class="intr-icon">
                <div class="positive" @click="choiceSide('A')">
                  <div :class="[sideValue == 'A' ? 'positive-icon1' : 'positive-icon2']" />
                  <div class="positive-text">{{ $t('coincenter.positiveText') }}</div>
                </div>
                <div class="negative" @click="choiceSide('B')">
                  <div :class="[sideValue == 'B' ? 'negative-icon1' : 'negative-icon2']" />
                  <div class="negative-text">{{ $t('coincenter.negativeText') }}</div>
                </div>
              </div>
            </div>
            <div class="second-part">
              <div class="second-left">
                <div class="second-text1">{{ $t('coincenter.secondLeftText1') }}</div>
                <div class="second-text2">{{ $t('coincenter.secondLeftText2') }}</div>
              </div>
              <div class="second-middle">
                <div class="second-text1">{{ $t('coincenter.secondMiddleText1') }}</div>
                <div class="second-text2">{{ $t('coincenter.secondMiddleText2') }}</div>
              </div>
              <div class="second-right">
                <div class="second-text1">{{ $t('coincenter.secondRightText1') }}</div>
                <div class="second-text2">{{ parseFloat(estimatedAmount).toFixed(4) }}</div>
              </div>
            </div>
            <div class="third-part">
              <div class="third-bet">
                <div class="bet1 bet-style" @click="getRandom">隨機
                </div>
                <div class="bet2 bet-style" @click="getHalf">1/2
                </div>
                <div class="bet3 bet-style" @click="getDouble">2x
                </div>
                <div class="bet4 bet-style" @click="getBigValue">{{ $t('coincenter.bigValue') }}
                </div>
              </div>
              <div class="third-operation">
                <div class="operation-subtraction" @click="getSubtraction">-
                </div>
                <div class="operation-num">
                  <input v-model="inputNum" type="text" pattern="^(([1-9]{1}\d*)|(0{1}))(\.\d{2})$" maxlength="5" @blur="inputChange">
                </div>
                <div class="operation-plus" @click="getPlus">+
                </div>
              </div>
              <div class="third-expected">{{ $t('coincenter.myAccountBalance') }} {{ computAccountBlance
                || '-' }}
              </div>
              <div v-show="computLogin" class="third-chipin" @click="clickChipin">{{ $t('coincenter.thirdChipin') }}
              </div>
            </div>
            <div v-show="!computLogin" class="four-part">
              <div class="four-text">{{ $t('coincenter.fourText') }}</div>
              <div class="four-button" @click="loginScatter">{{ $t('coincenter.foutButton') }}
              </div>
              <div class="four-summary"><a href="https://bihu.com/article/1303219" target="_blank" style="color: #8A7CE0;">{{
                  $t('coincenter.fourSummary') }} </a></div>
            </div>
          </div>
          <PopupOnBet :sidevaluememo.sync="sideValueMemo" />
          <div v-show="isShowWin" id="coin-win-result">
            <div class="result-intr">{{ $t('coincenter.winResultIntr') }}</div>
            <div class="win-result">{{ $t('coincenter.winGetText') }} {{ winMount }} EOS</div>
            <div class="result-icon">
              <div class="left">
                <div class="icon1" :class="[sideValue == 'A' ? 'negative-result' : 'positive-result']" />
                <div class="text1">{{ $t('coincenter.chapInChoiceText') }}</div>
              </div>
              <div class="right">
                <div class="icon2" :class="[computCoinRuslt == 'A' ? 'negative-result' : 'positive-result']" />
                <div class="text2">{{ $t('coincenter.resultText') }}</div>
              </div>
            </div>
            <div class="onemore-button" @click="oneMoreTime">{{ $t('coincenter.oneMoreText') }}
            </div>
          </div>
          <div v-show="isShowLost" id="coin-lost-result">
            <div class="result-intr">{{ $t('coincenter.lostResultIntr') }}</div>
            <div class="result-icon">
              <div class="left">
                <div class="icon1" :class="[sideValue == 'A' ? 'negative-result' : 'positive-result']" />
                <div class="text1">{{ $t('coincenter.chapInChoiceText') }}</div>
              </div>
              <div class="right">
                <div class="icon2" :class="[computCoinRuslt == 'A' ? 'negative-result' : 'positive-result']" />
                <div class="text2">{{ $t('coincenter.resultText') }}</div>
              </div>
            </div>
            <div class="onemore-button" @click="oneMoreTime">{{ $t('coincenter.oneMoreText') }}
            </div>
          </div>
        </div>
      </div>
    </div>
    <audio id="audioMax" ref="audioMax" src="../../static/audio/max.mp3" preload="auto" />
    <audio id="audioLost" ref="audioLost" src="../../static/audio/lost.mp3" preload="auto" />
    <audio id="audioRandom" ref="audioRandom" src="../../static/audio/random.mp3" preload="auto" />
    <audio id="audioWin" ref="audioWin" src="../../static/audio/win.mp3" preload="auto" />
  </div>
</template>

<script>
import Eos from 'eosjs'
import * as Mutations from '../store/constants'
import Plat from '../../static/js/platform.js'
import Config from '../config/config';
import Md5 from '../../static/js/md5.min';
import PopupOnBet from './PopupOnBet.vue';

const platForm = Plat.platForm;
const isChrome = Plat.isChrome;

const BONUS_ODDS = 1.96;
const BONUS_PERCENT = 0.1;
//最小下注额度
const MININUM = 0.1;

export default {
    components: {
        PopupOnBet,
    },
    data() {
        return {
            sideValue: 'A',
            coinMoving: false, // 抛硬币动态
            coinRuslt: '', // 抛硬币结果
            maxbetAmount: '', // 最大投注金额
            inputNum: MININUM,
            estimatedAmount: MININUM*BONUS_ODDS + ' EOS', // 预计获得金额
            computCoinRuslt: 'A',

            isLogin: false, // 是否登陆
            eosClient: null, // 用来获取区块链只读数据，不需要通过scatter
            scatter: null, // scatter
            scatterEosClient: null, // 用来创建签名。转账需要用这个
            comonConfig: null,
            coinConfig: null,

            historyList: [], // 历史数据列表,游戏数据
            myHistoryList: [], // 我的游戏历史数据
            chepinItemId: 0, // 下注时我的游戏历史记录的第一条的id
            username: '', // 用户名
            userInfo: '', // 用户信息
            accountBlance: 0, // 账户余额

            inviteName: '', // 邀请好友账号
            isChrome: true, // 是否试chrome浏览器

            isShowChapin: true, // 是否显示下注页面
            isShowWin: false, // 是否显示赢了
            isShowLost: false, // 是否显示输了
            winMount: 0, // 赢了多少钱

            isClickChapin: false, // 是否点击了下注，
            sideValueMemo: '',

            rewardpoolAmount: '', //奖池总金额,下注最大额度需要根据奖池计算
        };
    },
    computed: {
        computAccountBlance() {
            return this.$store.state.accountBlance;
        },

        showPop() {
            return this.$store.state.coinCenterShow;
        },
        computLoginText(){
            return this.$store.state.loginText;
        },
        computLoginOutText(){
            return this.$store.state.logoutText;
        },
        computLogin(){
            return this.$store.state.isLogin;
        },
        computScatter(){
            return this.$store.state.scatter;
        },
        computScatterClient() {
            this.scatterEosClient = this.computScatter.eos(this.comonConfig.eosNetwork,Eos,this.comonConfig.eosOptions,"http");  
            return this.scatterEosClient;
        },
        computGbdataCoinObj(){
            return this.$store.state.gbdataCoinObj;
        },
        computMyhistoryList() {
            return this.$store.state.myHistoryList || [];
        },
        computZeroItemId() {
            return (this.computMyhistoryList && this.computMyhistoryList[0] && this.computMyhistoryList[0].id || 0);
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
        //计算下注的最大金额
        computMaxbetAmount(){
            let amount = parseFloat(this.computRewardpoolAmount);
            let maxbetAmount = ((amount * BONUS_PERCENT * 100) /(BONUS_ODDS * 100)).toFixed(2) || 0;
            return maxbetAmount;
        },    
    },
    watch: {
        computZeroItemId(newVal) {
            if (this.isClickChapin) {
                if (newVal) {
                    if (newVal - 0 > this.chepinItemId - 0) {
                        this.coinMoving = false;
                        this.computCoinRuslt = this.$store.state.myHistoryList[0] && this.$store.state.myHistoryList[0].select_res == '65' ? 'A' : 'B';
                        const isWin = this.$store.state.myHistoryList[0] && this.$store.state.myHistoryList[0].win == '1';
                        if (isWin) {
                            this.winMount = this.$store.state.myHistoryList[0] && parseFloat(this.$store.state.myHistoryList[0].winamount).toFixed(4);
                            this.isShowChapin = false;
                            this.isShowWin = true;
                            this.isShowLost = false;
                            this.isClickChapin = false;
                            this.audioStartFn4();
                        } else {
                            this.isShowChapin = false;
                            this.isShowWin = false;
                            this.isShowLost = true;
                            this.isClickChapin = false;
                            this.audioStartFn2();
                        }
                    }
                }
            }
        },
    },
    created() {
        this.comonConfig = this.$clone(this.$comonConfig);
        this.coinConfig = this.$clone(this.$coinConfig);
        this.eosClient = Eos(this.comonConfig);

        this.username = sessionStorage.getItem('username');
        if(this.username){
            this.$store.commit(Mutations.SET_LOGINTEXT,this.username);
            this.$store.commit(Mutations.SET_LOGINOUTTEXT,this.$t("login.loginOutText"));
            this.$store.commit(Mutations.SET_LOGINSTATUS,true);
        } 
        //邀请好友账号
        this.inviteName = this.$route.query.shareName || '';
    },
    mounted() {
        let that = this;
        if(that.computScatter){
            that.scatterEosClient = that.computScatter.eos(that.comonConfig.eosNetwork,Eos,that.comonConfig.eosOptions,"http"); 
        } 
    },
    methods: {
        // 控制音乐的函数
        audioStartFn1() {
            const audioObj = this.$refs.audioMax;
            audioObj.play();
        },
        audioStartFn2() {
            const audioObj = this.$refs.audioLost;
            audioObj.play();
        },
        audioStartFn3() {
            const audioObj = this.$refs.audioRandom;
            audioObj.play();
        },
        audioStartFn4() {
            const audioObj = this.$refs.audioWin;
            audioObj.play();
        },
        // 点击选择硬币正反面
        choiceSide(type) {
            this.sideValue = type;
        },

        // 输入框失去焦点
        inputChange() {
            const that = this;
            const reg = /^(([1-9]{1}\d*)|(0{1}))(\.\d{0,2})?$/;
            if (!that.inputNum) {
                that.inputNum = (MININUM).toFixed(1);
            }
            // 最多输入两位小数
            if (!reg.test(that.inputNum.toString())) {
                that.inputNum = parseFloat(that.inputNum).toFixed(2);
            }
            that.estimatedAmount = `${(
                parseFloat(this.inputNum) * BONUS_ODDS
            ).toFixed(4)} EOS`;
        },       
       
        // 点击下注最大金额
        getBigValue() {
            const that = this;
            console.log('------click max-------');   
            this.inputNum = parseFloat(that.computMaxbetAmount).toFixed(2);
            this.estimatedAmount = `${(
                parseFloat(this.inputNum) * BONUS_ODDS
            ).toFixed(4)} EOS`;
            
            that.audioStartFn1();
        },
        // 点击生成随机下注数,随机生产1-最大值中的随机数.
        getRandom() {
            const that = this;
            // let number = Math.floor(Math.random()*(100 - 1) + 1);
            // 需要判断最大可下注额度
            let result = parseFloat(that.computMaxbetAmount);
            let number = Math.floor(Math.random() * (result - 1) + 1);
            that.inputNum = parseFloat(number).toFixed(2);
            that.estimatedAmount = `${(
                parseFloat(that.inputNum) * BONUS_ODDS
            ).toFixed(4)} EOS`;
            that.audioStartFn3();
        },
        // 点击生成当前输入框的半
        getHalf() {
            const number = parseFloat(this.inputNum);
            const tempNumber = number / 2;
            if (tempNumber < MININUM) {
                this.inputNum = parseFloat(MININUM).toFixed(2);
                this.estimatedAmount = `${(
                    parseFloat(this.inputNum) * BONUS_ODDS
                ).toFixed(4)} EOS`;
                this.$message.error(this.$t('common.errorMessage9'));
            } else {
                this.inputNum = parseFloat(tempNumber).toFixed(2);
                this.estimatedAmount = `${(
                    parseFloat(this.inputNum) * BONUS_ODDS
                ).toFixed(4)} EOS`;
            }
        },
        getDouble() {
            const that = this;
            let number = parseFloat(this.inputNum);
            let tempNumber = number * 2;
            // 需要判断最大可下注额度 
            let result = parseFloat(that.computMaxbetAmount);
            if (tempNumber < result) {
                that.inputNum = parseFloat(tempNumber).toFixed(2);
                that.estimatedAmount = `${(
                    parseFloat(that.inputNum) * BONUS_ODDS
                ).toFixed(4)} EOS`;
            } else {
                that.inputNum = parseFloat(result).toFixed(2);
                that.estimatedAmount = `${(
                    parseFloat(that.inputNum) * BONUS_ODDS
                ).toFixed(4)} EOS`;
                that.$message.error(that.$t('common.errorMessage8'));
            }
            
        },
        // 点击加号
        getPlus() {
            const that = this;
            // 需要判断最大可下注额度   
            let result = parseFloat(that.computMaxbetAmount);
            if (this.inputNum - 0 < result) {
                this.inputNum = (parseFloat(this.inputNum) + 0.01).toFixed(2);
                this.estimatedAmount = `${(
                    parseFloat(this.inputNum) * BONUS_ODDS
                ).toFixed(4)} EOS`;
            }
        },
        // 点击减号
        getSubtraction() {
            if (this.inputNum - 0 > MININUM) {
                this.inputNum = (parseFloat(this.inputNum) - 0.01).toFixed(2);
                this.estimatedAmount = `${(
                    parseFloat(this.inputNum) * BONUS_ODDS
                ).toFixed(4)} EOS`;
            }
        },
        // 再来一次
        oneMoreTime() {
            this.isShowChapin = true;
            this.isShowWin = false;
            this.isShowLost = false;
        },
        // 下注
        
        clickChipin() {
            const that = this;
            this.sideValueMemo = this.sideValue + Md5(new Date().getTime()).substring(16) + this.inviteName;
            // 做下最大值的判断
            if (that.inputNum - 0 > that.computMaxbetAmount - 0) {
                that.$message.error(that.$t('common.errorMessage8'));
                that.inputNum = (MININUM).toFixed(1);
                that.estimatedAmount = `${(
                    parseFloat(that.inputNum) * BONUS_ODDS
                ).toFixed(4)} EOS`;
                return false;
            }
            if (that.inputNum - 0 < MININUM) {
                that.$message.error(that.$t('common.errorMessage9'));
                that.inputNum = (MININUM).toFixed(1);
                that.estimatedAmount = `${(
                    parseFloat(that.inputNum) * BONUS_ODDS
                ).toFixed(4)} EOS`;
                return false;
            }

            const account = this.computScatter.identity.accounts.find(
                account => account.blockchain === 'eos',
            );
            console.log('--------------chipin--------------');
            const options = {
                authorization: [`${account.name}@${account.authority}`],
                broadcast: true,
                sign: true,
            };
            const requiredFields = {
                accounts: [that.comonConfig.eosNetwork],
            };

            const strChapin = `${(that.inputNum - 0).toFixed(4)} EOS`;

            const args = [
                account.name,
                that.coinConfig.toContract,
                strChapin,
                this.sideValueMemo,
                options,
            ];
            that.scatterEosClient = that.computScatter.eos(that.comonConfig.eosNetwork,Eos,that.comonConfig.eosOptions,"http"); 
            console.log(that.scatterEosClient);

            that.scatterEosClient
            .contract(that.comonConfig.tokenContract, { requiredFields })
            .then(hello => {
                console.log(hello);
                // 下注，抛硬币动图出现
                that.coinMoving = true;
                that.chepinItemId = (this.$store.state.myHistoryList[0] && that.$store.state.myHistoryList[0].id) || 0;
                console.log(that.chepinItemId);

                //调用合约中的转账方法
                hello.transfer(...args).then(tx => {
                    // 下注成功再改状态
                    that.isClickChapin = true;
                    console.log(tx);
                }).catch(e => {
                    console.log(e);
                    if(e){
                        const error = typeof e === 'string' ? JSON.parse(e) : e;
                        // eos io 的系统错误处理.
                        that.$errorFun(error);
                    }
                    // 错误也得停下来
                    that.coinMoving = false;
                });
            });
        },

        // 登陆scatter
        loginScatter() {
            const that = this;
            this.sideValueMemo = this.sideValue + Md5(new Date().getTime()).substring(16) + this.inviteName;
            if (!window.scatter) {
                this.$store.state.popupOnBetShow = true;
                return;
            }
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
<style type="text/css" lang="less" scopped>
  @color_1: rgba(255, 255, 255, 1);
  @color_2: rgba(144, 153, 186, 1);
  @color_3: rgba(232, 233, 255, 1);
  @color_4: #ffffff;
  @color_5: rgba(147, 144, 254, 1);
  @color_6: rgba(146, 142, 251, 1);
  @font_family_1: MicrosoftYaHei;
  @font_family_2: MicrosoftYaHei-Bold;
  @border_color_1: rgba(0, 0, 0, 0.3);

  #coin-center {
    width: 100%;
    height: 100%;

    .container {
      width: 100%;
      height: 100%;

      .main-left {
        height: 100%;
        width: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;

        .left {
          height: 100%;
          width: 52.5%;

          .left-up {
            height: 30%;
            width: 100%;

            .title {
              height: 46px;
              width: 142px;
              line-height: 46px;
              margin-top: 34px;
              margin-left: 40px;
              text-align: left;
              font-size: 28px;
              font-weight: 400;
              color: @color_1;
            }

            .summary {
              width: 384px;
              line-height: 24px;
              margin-top: 10px;
              margin-left: 40px;
              text-align: left;
              font-size: 16px;
              font-family: @font_family_1;
              font-weight: 400;
              color: @color_2;
            }
          }

          .left-down {
            height: 554px;
            width: 570px;
            .coin-moving-gif {
              height: 428px;
              width: 338px;
              background: url('../../static/img/coin-moving.gif') no-repeat;
              background-size: 100% 100%;
            }

            .coin-positive-gif {
              height: 428px;
              width: 338px;
              background: url('../../static/img/coin-positive-static.png') no-repeat;
              background-size: 100% 100%;
            }

            .coin-negative-gif {
              height: 428px;
              width: 338px;
              background: url('../../static/img/coin-negative-static.png') no-repeat;
              background-size: 100% 100%;
            }
          }
        }

        .right {
          height: 100%;
          width: 46%;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;

          .right-container {
            width: 84%;
            background: rgba(107, 113, 143, 0.3);
            border-radius: 5px;
            box-shadow: 0px 0px 10px rgba(19, 26, 47, 0.3);
            padding-bottom: 0.3rem;

            .first-part {
              height: 210px;
              width: 100%;
              padding-top: 26px;
              border-bottom: 1px solid #465769;

              .intr-text {
                height: 20px;
                line-height: 20px;
                width: 200px;
                text-align: center;
                margin: 0 auto;
                font-size: 16px;
                font-weight: 400;
                color: @color_1;
              }

              .intr-icon {
                height: 144px;
                width: 100%;
                margin-top: 20px;
                display: flex;
                justify-content: center;
                align-items: flex-start;

                .positive {
                  height: 98px;
                  width: 98px;
                  margin-right: 25px;

                  .positive-icon1 {
                    height: 98px;
                    width: 98px;
                    background: url('../../static/img/homegame_ho_positive.png') no-repeat;
                    background-size: 100% 100%;
                    cursor: Pointer;
                  }

                  .positive-icon2 {
                    height: 98px;
                    width: 98px;
                    background: url('../../static/img/home_game_positive.png') no-repeat;
                    background-size: 100% 100%;
                    cursor: Pointer;
                  }

                  .positive-text {
                    font-size: 14px;
                    font-family: @font_family_1;
                    font-weight: 400;
                    margin-top: 10px;
                    text-align: center;
                    color: @color_2;
                  }
                }

                .negative {
                  height: 98px;
                  width: 98px;
                  margin-left: 25px;

                  .negative-icon1 {
                    height: 98px;
                    width: 98px;
                    background: url('../../static/img/homegame_ho_negative.png') no-repeat;
                    background-size: 100% 100%;
                    cursor: Pointer;
                  }

                  .negative-icon2 {
                    height: 98px;
                    width: 98px;
                    background: url('../../static/img/homegame_negative.png') no-repeat;
                    background-size: 100% 100%;
                    cursor: Pointer;
                  }

                  .negative-text {
                    font-size: 14px;
                    font-family: @font_family_1;
                    font-weight: 400;
                    margin-top: 10px;
                    text-align: center;
                    color: @color_2;
                  }
                }
              }
            }

            .second-part {
              height: 133px;
              width: 100%;
              border-bottom: 1px solid #465769;
              display: flex;
              justify-content: center;
              align-items: center;

              .second-left {
                height: 133px;
                width: 33%;
                border-right: 1px solid #465769;
              }

              .second-middle {
                height: 133px;
                width: 34%;
                border-right: 1px solid #465769;
              }

              .second-right {
                height: 133px;
                width: 33%;
              }

              .second-text1 {
                font-size: 0.16rem;
                font-family: @font_family_2;
                font-weight: bold;
                color: @color_2;
                margin-top: 28px;
              }

              .second-text2 {
                font-size: 0.3rem;
                font-weight: 400;
                margin-top: 20px;
                color: @color_3;
              }
            }

            .third-part {
              max-height: 350px;
              padding-bottom: 24px;

              .third-bet {
                height: 86px;
                display: flex;
                justify-content: center;
                align-items: center;

                .bet-style {
                  height: 36px;
                  line-height: 36px;
                  background: rgba(71, 82, 100, 1);
                  width: 65px;
                  font-size: 16px;
                  font-weight: 400;
                  color: @color_1;
                  cursor: Pointer;

                  &:hover {
                    box-shadow: 0.05em 0.1em 0.2em rgba(0, 0, 0, 0.6) inset;
                    border-color: @border_color_1;
                    background: rgba(147, 144, 254, 1);
                  }
                }

                .bet2 {
                  margin-left: 0.1rem;
                }

                .bet3 {
                  margin-left: 0.1rem;
                }

                .bet4 {
                  margin-left: 0.1rem;
                }
              }

              .third-operation {
                height: 80px;
                width: 100%;
                display: flex;
                justify-content: center;
                align-items: center;
                font-size: 36px;
                color: @color_1;
              }

              .third-expected {
                height: 34px;
                line-height: 34px;
                width: 100%;
                font-size: 14px;
                font-weight: 400;
                color: @color_2;
              }

              .third-chipin {
                height: 50px;
                line-height: 50px;
                text-align: center;
                margin: 0.15rem auto;
                width: 204px;
                font-size: 18px;
                font-weight: 400;
                color: @color_1;
                background: linear-gradient(90deg,
                  rgba(147, 144, 254, 1),
                  rgba(138, 124, 224, 1));
                border-radius: 5px;
                box-shadow: 1px 0px 10px rgba(44, 51, 62, 0.2);
                cursor: Pointer;
              }
            }

            .four-part {
              height: 144px;
              width: 100%;
              border-top: 1px solid #465769;

              .four-text {
                height: 20px;
                line-height: 20px;
                width: 100%;
                text-align: center;
                font-size: 16px;
                font-weight: 400;
                color: @color_1;
                margin-top: 20px;
              }

              .four-button {
                height: 50px;
                line-height: 50px;
                width: 204px;
                background: linear-gradient(90deg,
                  rgba(147, 144, 254, 1),
                  rgba(138, 124, 224, 1));
                border-radius: 5px;
                box-shadow: 1px 0px 10px rgba(44, 51, 62, 0.2);
                text-align: center;
                font-size: 18px;
                font-weight: 400;
                color: @color_1;
                margin: 10px auto;
                cursor: Pointer;
              }

              .four-summary {
                height: 14px;
                line-height: 14px;
                width: 100%;
                text-align: center;
                font-size: 14px;
                font-weight: 400;
                color: @color_6;
                margin: 0 auto;
              }
            }
          }
        }
      }
    }
  }

  .third-operation {
    .operation-num {
      height: 80px;
      width: 160px;
      border: 1px solid rgba(144, 153, 186, 1);
      border-radius: 5px;
      display: flex;
      justify-content: center;
      align-items: center;

      input {
        width: 160px;
        text-align: center;
        color: @color_4;
      }
    }

    .operation-plus {
      height: 80px;
      width: 18px;
      display: flex;
      justify-content: center;
      align-items: center;
      margin-left: 20px;
      font-weight: 400;
      font-size: 34px;
      cursor: Pointer;

      &:hover {
        color: @color_5;
      }
    }

    .operation-subtraction {
      height: 80px;
      width: 18px;
      display: flex;
      justify-content: center;
      align-items: center;
      margin-right: 20px;
      font-weight: 400;
      font-size: 34px;
      cursor: Pointer;

      &:hover {
        color: @color_5;
      }
    }
  }

  #coin-win-result {
    width: 74%;
    padding-top: 1px;
    background: rgba(107, 113, 143, 0.3);
    border-radius: 5px;
    box-shadow: 0px 0px 10px rgba(19, 26, 47, 0.3);
    padding-bottom: 0.5rem;

    .win-result {
      width: 100%;
      text-align: center;
      margin-top: 0.2rem;
      font-size: 14px;
      font-family: @font_family_1;
      font-weight: 400;
      color: @color_2;
    }
  }

  .result-intr {
    width: 100%;
    text-align: center;
    margin-top: 1.4rem;
    font-size: 24px;
    font-weight: 400;
    color: @color_1;
  }

  .result-icon {
    width: 100%;
    margin-top: 1rem;
    font-size: 14px;
    font-weight: 400;
    color: @color_3;
    display: flex;
    justify-content: center;
    align-items: center;

    .left {
      width: 50%;
      height: 2rem;
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      align-items: center;

      .icon1 {
        width: 0.98rem;
        height: 0.98rem;
        margin-left: 0.5rem;
      }

      .text1 {
        margin-left: 0.5rem;
        margin-top: 0.26rem;
      }
    }

    .right {
      width: 50%;
      height: 2rem;
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      align-items: center;

      .icon2 {
        width: 0.98rem;
        height: 0.98rem;
        margin-right: 0.5rem;
      }

      .text2 {
        margin-right: 0.5rem;
        margin-top: 0.26rem;
      }
    }
  }

  .onemore-button {
    height: 0.5rem;
    line-height: 0.5rem;
    margin: 0.8rem auto 0 auto;
    width: 2.04rem;
    background: linear-gradient(90deg,
      rgba(147, 144, 254, 1),
      rgba(138, 124, 224, 1));
    border-radius: 5px;
    box-shadow: 1px 0px 10px rgba(44, 51, 62, 0.2);
    font-size: 18px;
    font-weight: 400;
    color: @color_1;
  }

  #coin-lost-result {
    width: 84%;
    padding-top: 1px;
    background: rgba(107, 113, 143, 0.3);
    border-radius: 5px;
    box-shadow: 0px 0px 10px rgba(19, 26, 47, 0.3);
    padding-bottom: 0.5rem;
  }

  .positive-result {
    background: url('../../static/img/homegame_ho_negative.png') no-repeat;
    background-size: 100% 100%;
  }

  .negative-result {
    background: url('../../static/img/homegame_ho_positive.png') no-repeat;
    background-size: 100% 100%;
  }

  @media (max-width: 1000px) {
    body {
      overflow-scrolling: touch;
    }

    .el-message--error {
      margin-top: 1.2rem !important;
    }

    .el-header {
      height: 2rem !important;
      position: fixed !important;
      width: 100% !important;
      z-index: 999999;

      .game-header {
        position: relative;

        .btn-showList {
          width: 0.9rem;
          height: 0.9rem;
          display: block !important;
          margin-left: 1rem;
          background: url('../../static/img/home_menu_icon_wap@3x.png');
          background-size: contain;

          &.active {
            background: url('../../static/img/error@3x.png');
            background-size: contain;
          }
        }

        .game-logo {
          width: 2.5rem !important;
          height: 1.5rem !important;
          margin-left: 1.5rem !important;
          background-size: contain !important;
        }

        #login-component {
          display: none;
        }

        .showList {
          position: absolute;
          width: 100%;
          top: 2rem;
          background: #2e3140;

          &.active {
            display: block;
          }

          li {
            height: 2.5rem;
            line-height: 2.5rem;
            font-size: 0.6rem;
            border-bottom: 1px solid rgba(68, 74, 90, 1);
            text-align: left;
            padding-left: 1.5rem;
            color: white;
          }
        }
      }

      .login-scatter {
        display: none !important;
      }

      .language-container {
        width: 100% !important;
        height: 1rem !important;
        background: none !important;

        .language-text {
          width: 100% !important;
        }
      }
    }

    .main-container {
      overflow-y: auto !important;
    }

    .right-container {
      width: 100% !important;

      .main-right {
        background: none !important;
      }
    }

    .pop-container {
      width: 16.3rem !important;

      .pop-title {
        font-size: 1rem !important;
      }

      .pop-summary1 {
        width: 15.3rem !important;
        font-size: 0.8rem !important;
        margin-left: -7.6rem !important;
        top: 5rem !important;
      }

      .el-progress-circle {
        width: 1rem;
        height: 1rem;
      }

      .clickTips {
        display: none !important;
      }

      .pop-summary2 {
        width: 15.3rem !important;
        font-size: 0.8rem !important;
        margin-left: -7.6rem !important;
      }

      .friend-link {
        display: none !important;
        width: 15.3rem !important;
        margin-left: -7.8rem !important;
      }
    }

    .extra-part {
      display: block;
      font-family: HYSongYunLangHeiF;
      width: 17rem;
      margin: 0.5rem auto auto;

      .moreGame {
        font-size: 0.7rem;
        text-decoration: underline;
        color: rgba(146, 142, 251, 1) !important;
        margin-top: 1rem;
        margin-bottom: 2.5rem;
      }

      .title {
        font-size: 1.15rem;
        font-weight: bold;
        text-align: center;
        color: rgba(255, 255, 255, 1);
        line-height: 1.75rem;
        margin-bottom: 0.5rem;
      }

      .intro {
        font-size: 0.7rem;
        font-weight: 400;
        color: rgba(144, 153, 186, 1);
        line-height: 1.15rem;
        text-align: left;
      }

      .support-list {
        width: 17rem;
        text-align: left;
        margin: 0 auto;

        .support-list-logo {
          width: 6.5rem;
          height: 1.5rem;
          margin: 0.5rem 1rem 0.5rem 0.5rem;
        }
      }

      .thrPart-link {
        display: flex;
        justify-content: center;

        .qrBox {
          position: fixed;
          align-items: center;
          height: 100%;
          width: 100%;
          justify-content: center;
          z-index: 9999;
          top: 0;
          display: none;
          background: rgba(0, 0, 0, 0.5);

          &.active {
            display: flex;
          }

          .qrCode {}
        }

        .thrPart-link-logo {
          width: 1.5rem;
          height: 1.5rem;
          margin: 0.5rem;
        }
      }
    }

    .el-main {
      height: calc(100vh);
    }

    #home-component {
      display: block;

      .container {
        width: 100% !important;
        min-width: 0 !important;

        .introduction-up {
          width: 100% !important;
          text-align: center;
          height: 6rem !important;
          margin: 3rem auto;

          .title {
            width: 100% !important;
            font-size: 1.25rem !important;
            text-align: center !important;
            font-weight: bold !important;
          }

          .summary {
            width: 17.8rem !important;
            font-size: 0.75rem !important;
          }

          .intr-icon {
            display: none !important;
            margin-left: 0.5rem;

            .icon2,
            .icon3 {
              width: 1.25rem !important;
              height: 1.25rem !important;
            }

            .title2,
            .title3 {
              font-size: 0.75rem !important;
              margin-left: 0.5rem !important;
            }

            .summary2,
            .summary3 {
              width: 13rem !important;
              font-size: 0.6rem !important;
              text-align: left !important;
            }
          }
        }

        #friend-pool {
          background: none !important;
          display: flex;
          justify-content: center;
          position: relative;
          top: -30rem;

          .friend-part,
          .village-part {
            width: 50% !important;
            border: none !important;
            padding: 0 !important;

            .friend-first,
            .friend-third,
            .village-text {
              display: none !important;
            }

            .invite-friend,
            .invite-friend,
            .village-button {
              width: 5rem !important;
              height: 1.5rem !important;
              font-size: 0.65rem !important;
              line-height: 1.5rem !important;
              margin: 0 !important;
            }
          }
        }
      }
    }

    .history-part {
      display: none !important;

      .scrollbar-container {
        .ul-height2 {
          overflow-y: scroll;
          height: 8.8rem !important;
        }

        .ul-height1 {
          overflow-y: scroll;
          height: 8.8rem !important;
        }
      }

      .el-tabs__nav-wrap {
        .el-tabs__nav {
          #tab-first {
            width: 7rem;
            text-align: center;
            padding: 0rem !important;
            margin-right: 2rem !important;
          }

          .el-tabs__active-bar {
            width: 7.2rem !important;
          }

          #tab-second {
            width: 6rem;
            text-align: center;
            padding: 0rem !important;
          }
        }
      }
    }

    .pop-container {
      width: 17rem !important;
      margin: 6rem auto !important;
      height: 20rem !important;

      .close-icon {
        width: 1.5rem !important;
        height: 1.5rem !important;
      }

      .pop-title {
        top: 2rem !important;
      }

      .go-PC-tips {
        display: block !important;
        position: absolute;
        top: 15rem;
        left: 0.7rem;
        text-align: center;
        color: #e8e9ff;
        font-size: 0.5rem;
      }

      .pop-img-tips {
        display: flex !important;
        align-items: center;
        justify-content: center;
        position: absolute;
        top: 16rem;
        left: 0.7rem;

        .img-chrome,
        .img-scatter {
          display: block !important;
          width: 6rem !important;
          height: 2rem !important;
        }

        .img-add {
          display: block !important;
          width: 1rem;
          height: 1rem;
          margin: 0 1rem;
        }
      }

      .pop-introdution,
      .pop-datapart,
      .pop-input {
        display: none !important;
      }
    }

    #game-center {
      .container {
        width: 100%;
        min-width: 0 !important;

        #coin-center {
          .main-left {
            .left {
              display: none;
            }

            .r-part {
              width: 100% !important;

              .right-container {
                width: 100% !important;
                margin-top: 0 !important;

                .positive {
                  margin-left: 1.5rem !important;
                }

                .positive-icon1,
                .negative-icon2,
                .positive-icon2,
                .negative-icon1 {
                  width: 4rem !important;
                  height: 4rem !important;
                }

                .positive-text,
                .negative-text {
                  width: 4rem !important;
                }

                .second-text2 {
                  font-size: 1rem !important;
                }

                .second-part {
                  height: 4.33rem !important;

                  .second-left,
                  .second-middle,
                  .second-right {
                    height: 4.33rem !important;

                    .second-text1,
                    .second-text2 {
                      font-size: 0.9rem !important;
                      margin-top: 1rem !important;
                    }
                  }
                }

                .first-part {
                  height: 9.5rem !important;
                  margin-top: 1.2rem;
                }

                .third-part {
                  .third-bet {
                    .bet2 {
                      margin-left: 0.5rem;
                    }

                    .bet3 {
                      margin-left: 0.5rem;
                    }

                    .bet4 {
                      margin-left: 0.5rem;
                    }
                  }

                  .bet-style {
                    width: 2.5rem !important;
                    height: 2rem !important;
                    line-height: 2rem !important;
                    font-size: 0.9rem !important;
                  }
                }
              }
            }
          }
        }
      }

      .game-center-right {
        display: none;
      }

      #coin-win-result,
      #coin-lost-result {
        .result-intr {
          font-size: 1rem !important;
        }

        .result-icon {
          .left {
            display: flex !important;
            align-items: center;

            .icon1 {
              width: 3rem !important;
              height: 3rem !important;
            }
          }

          .right {
            height: 6rem !important;
            width: 50% !important;

            .icon2 {
              width: 3rem !important;
              height: 3rem !important;
            }
          }
        }

        .onemore-button {
          width: 4rem !important;
          height: 2rem !important;
          line-height: 2rem !important;
          font-size: 0.8rem;
        }
      }
    }

    #common-problem {
      .container {
        padding: 2rem 0 0 !important;
      }
    }

    #about-us {
      .container {
        padding: 2rem 0 0 !important;

        .about-title {
          width: 100% !important;
          font-size: 1.15rem !important;
          margin: 3rem auto 2rem auto !important;
        }

        .about-content {
          .s-title {
            color: white !important;
            text-align: center;
          }

          p {
            font-size: 0.65rem !important;
          }
        }

        .about-cooperation {

          .icon1,
          .icon2 {
            width: 8rem !important;
            height: 3rem !important;
          }
        }
      }
    }
  }
</style>