/*
* @Author: tonyTang
* @Date: 2018-10-17 09:31:22
 * @Last Modified by: tonyTang
 * @Last Modified time: 2018-10-19 21:11:40
*/

<template>
  <div id="game-home">
    <el-container style="height: 100%;width: 100%;">
      <el-header height="82px">
        <div class="game-header">
          <div :class="['btn-showList',showListShow ? 'active':'']" @click="toggleShowList"></div>
          <div class="header-left">
            <div class="game-logo" @click="goHome"></div>
          </div>
          <div class="header-middle" v-show="navListComputed[1].selected == true">
            <div class="list-game1">
              <div class="game1-icon" :class="[computCoinGameShow ? '' : 'change-opcity']" @click="goCoinGame"></div>
              <div class="game1-text" :class="[computCoinGameShow ? '' : 'change-opcity']">{{ $t('common.coinGameName') }}</div>
            </div>
            <div class="list-game2">
              <div class="game2-icon" :class="[computRollGameShow ? '' : 'change-opcity']" @click="goRollGame"></div>
              <div class="game2-text" :class="[computRollGameShow ? '' : 'change-opcity']">{{ $t('common.rollGameName') }}</div>
            </div>
          </div>
          <div class="header-right">
            <div class="login-scatter">
              <!-- scatter login -->
              <ScatterLogin />
            </div>
            <div class="local-language">
              <div class="language-container">
                <div class="language-text"><span style="color: #fff;">CH</span>/<span>EN</span></div>
              </div>
            </div>
          </div>
          <ul :class="['showList', showListShow ? 'active' : ''] ">
            <li v-for="(item,index) in $t('home.showList')" :key="index" @click="toggleListContent(index)">{{ item }}</li>
          </ul>
        </div>
      </el-header>
      <el-container>
        <el-aside width="83px">
          <div class="aside-container">
            <div class="aside-up">
              <div :id="navListComputed[0].id" class="aside-up-container" @click.stop="clickItem">
                <div :class="[navListComputed[0].selected ? navListComputed[0].className1 : navListComputed[0].className2]"></div>
              </div>
              <div :id="navListComputed[1].id" class="aside-up-container" @click.stop="clickItem">
                <div :class="[navListComputed[1].selected ? navListComputed[1].className1 : navListComputed[1].className2]"></div>
              </div>
              <div :id="navListComputed[2].id" class="aside-up-container" @click.stop="clickItem">
                <div :class="[navListComputed[2].selected ? navListComputed[2].className1 : navListComputed[2].className2]"></div>
              </div>
              <div :id="navListComputed[3].id" class="aside-up-container" @click.stop="clickItem">
                <div :class="[navListComputed[3].selected ? navListComputed[3].className1 : navListComputed[3].className2]"></div>
              </div>
            </div>
            <div class="aside-down">
              <a href="mailto:2140dev@gmail.com">
                <div class="aside-icon5"></div>
              </a>
              <div class="aside-icon6" @click="goTelegram"></div>
              <div class="aside-icon7" @mouseover="goWechat" @mouseout="hideWechat"></div>
              <div v-show="qrodShow" id="wechat-qrod">
                <div></div>
              </div>
              <!-- <div class="aside-icon8"></div> -->
            </div>
          </div>
        </el-aside>
        <el-main>
          <div class="main-container">
            <keep-alive>
              <HomeComponent @goTelegram="goTelegram" @goWechat="goWechat" @hideWechat="hideWechat" @goCoinGame="goCoinGame"
                @goRollerGame="goRollerGame" />
            </keep-alive>
            <keep-alive>
              <GameCenter />
            </keep-alive>
            <CommonProblem />
            <keep-alive />
            <keep-alive>
              <AboutUs />
            </keep-alive>
          </div>
        </el-main>
      </el-container>
    </el-container>
    <audio id="audio" ref="audio" src="../../static/audio/welcome2140.mp3" autoplay preload="auto"></audio>
    <!-- 获取账户余额 -->
    <GetBalance />
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
import HomeComponent from '@/views/HomeComponent.vue';
import GameCenter from '@/views/GameCenter.vue';
import CommonProblem from '@/views/CommonProblem.vue';
import AboutUs from '@/views/AboutUs.vue';
import ScatterLogin from '../components/ScatterLogin.vue';
import GetBalance from '../components/GetBalance.vue';
import * as Mutations from '../store/constants'
const BONUS_ODDS = 1.98;
const BONUS_PERCENT = 0.1;
export default {
  name: "Home",
  components: {
    HomeComponent,
    GameCenter,
    CommonProblem,
    AboutUs,
    ScatterLogin,
    GetBalance
  },
  data() {
    return {
      username: "", // 用户账号
      isLogin: false, // 是否登陆
      eosClient: null, // 用来获取区块链只读数据，不需要通过scatter
      scatter: null, // scatter
      scatterEosClient: null, // 用来创建签名。转账需要用这个
      inviteName: "", // 邀请人的用户名
      showChipin: false, // 未登录不显示下注
      selectedNavId: "1", // 选中导航栏中那一个，默认首页，id为1.
      showListShow: false, 
      qrodShow: false, // 二维码
      shareName: "", // 分享的参数
      whichGame: 'coinGame', //那个游戏
    };
  },
  computed: {  
    navListComputed() {
       return this.$store.state.navList;
    }, 
    computCoinGameShow(){
        return this.$store.state.coinGameShow;
    },
    computRollGameShow(){
        return this.$store.state.rollGameShow;
    },
  },
  created() {
    const that = this;
    this.username = sessionStorage.getItem("username");
    this.selectedNavId = sessionStorage.getItem("homeSelect") || 1;
    this.shareName = sessionStorage.getItem("shareName");
   
    //判断在没关闭浏览器的情况下，上次选中的是那个导航tab选项
    this.navListComputed.forEach(val => {
      if (that.selectedNavId == val.id) {
        val.selected = true;
      } else {
        val.selected = false;
      }
    });
    //注意需要同事设置路由
    const arr = ["/", "/gamecenter", "/commonproblem", "aboutus"];
    this.$router.push({
        path: arr[this.selectedNavId - 1],
        query: this.shareName ? { shareName: this.shareName } : ""
    });

    this.hideAllComponent();

    if (this.selectedNavId == 1) {
      this.$store.commit(Mutations.SET_CHANGEHOMECOMPONENTSHOW,true);
    } 
    if (this.selectedNavId == 2) {
      this.$store.commit(Mutations.SET_CHANGEGAMECENTERSHOW,true);
    } 
    if (this.selectedNavId == 3) {
      this.$store.commit(Mutations.SET_CHANGECOMMONPROBLEMSHOW,true);
    } 
    if (this.selectedNavId == 4) {
      this.$store.commit(Mutations.SET_CHANGEABOUTSSHOW,true);
    } 
  },
  
  methods: {  
    //设置导航栏四个按钮的组件都不显示 
    hideAllComponent() {
        let that = this;
        //导航栏四个组件在mutations中的函数名称
        let componentsList = ['SET_CHANGEHOMECOMPONENTSHOW','SET_CHANGEGAMECENTERSHOW','SET_CHANGECOMMONPROBLEMSHOW','SET_CHANGEABOUTSSHOW'];
        componentsList.forEach(val => {
            that.$store.commit(val,false);
        });
    },
    //设置当前导航栏当前按钮组件显示
    showNowComponent(index) {
        //导航栏四个组件在mutations中的函数名称
        let componentsList = ['SET_CHANGEHOMECOMPONENTSHOW','SET_CHANGEGAMECENTERSHOW','SET_CHANGECOMMONPROBLEMSHOW','SET_CHANGEABOUTSSHOW'];
        componentsList.forEach((val,id) => {
            if(id == index){
                that.$store.commit(val,true);
            }else {
                that.$store.commit(val,false);
            }
        });
    }, 
    toggleShowList() {
      this.showListShow = !this.showListShow;
    },
    goHome() {
      this.showNowComponent(0);
      this.showListShow = false;
    },
    toggleListContent(index) {
      this.hideAllComponent();
      if (!index) {
        this.$store.commit(Mutations.SET_CHANGEGAMECENTERSHOW,true);
        this.$store.commit(Mutations.SET_CHANGECOINCENTERSHOW,false);
      } else if (index === 1) {
        this.$store.commit(Mutations.SET_CHANGECOMMONPROBLEMSHOW,true);
      } else if (index === 2) {
        this.$store.commit(Mutations.SET_CHANGEABOUTSSHOW,true);  
      }
      this.toggleShowList();
    },
    clickItem(event) {
      const id = event.currentTarget.id;
      //注意从主页进入游戏页后，再切换到主页，需要从缓存中再取一次选中的id.
      this.selectedNavId = sessionStorage.getItem("homeSelect") || 1;
      if (id != this.selectedNavId) {
        this.$store.commit(Mutations.SET_CHANGENAVLIST,id);
        this.selectedNavId = id;
        sessionStorage.setItem('homeSelect', id);

        this.hideAllComponent();
        if (this.selectedNavId == 1) {
          this.$store.commit(Mutations.SET_CHANGEHOMECOMPONENTSHOW,true);
        } else if (this.selectedNavId == 2) {
          this.$store.commit(Mutations.SET_CHANGEGAMECENTERSHOW,true);
        } else if (this.selectedNavId == 3) {
          this.$store.commit(Mutations.SET_CHANGECOMMONPROBLEMSHOW,true);
        } else if (this.selectedNavId == 4) {
          this.$store.commit(Mutations.SET_CHANGEABOUTSSHOW,true);
        }

        const arr = ["/", "/gamecenter", "/commonproblem", "aboutus"];
        this.$router.push({
          path: arr[this.selectedNavId - 1],
          query: this.shareName ? { shareName: this.shareName } : ""
        });
      }
    },
    // 去GitHub
    goTelegram() {
      window.open("https://t.me/joinchat/HpOaXw2O1zynwx5KMj-VEA");
    },
    // 去微信
    goWechat() {
      this.qrodShow = true;
    },
    hideWechat() {
      this.qrodShow = false;
    },
    goCoinGame() {
      this.selectedNavId = '2';
      sessionStorage.setItem('homeSelect', '2');
    },
    goRollerGame() {
      this.selectedNavId = '2';
      sessionStorage.setItem('homeSelect', '2');
    },

    //点击头部切换游戏
    //1.切换到抛硬币游戏
    goCoinGame() {
        sessionStorage.setItem('whichGame','coinGame');
        this.$router.push({
          path: '/gamecenter',
          query: this.shareName ? { shareName: this.shareName } : ""
        });
        this.$store.commit(Mutations.SET_COINGAMESHOW,true);
        this.$store.commit(Mutations.SET_ROLLGAMESHOW,false);
    },
    //2.切换到过山车游戏
    goRollGame() {
        sessionStorage.setItem('whichGame','rollGame');
        this.$router.push({
          path: '/gamecenter/rollgame',
          query: this.shareName ? { shareName: this.shareName } : ""
        });
        this.$store.commit(Mutations.SET_ROLLGAMESHOW,true);
        this.$store.commit(Mutations.SET_COINGAMESHOW,false);
    },
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->

<style type="text/css" lang="less" scopped>
  @color_1: #333;
  @color_2: rgba(232, 233, 255, 1);
  @color_3: rgba(132, 144, 177, 1);
  @color_4: rgba(144, 153, 186, 1);
  @color_5: #ffffff;
  @font_family_1: MicrosoftYaHei;
  @background_color_1: #465769;
  @background_color_2: #dadff8;

  .change-opcity {
    opacity: 0.4;
  }

  #game-home {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    max-width: 100%;
    min-height: 100%;
    margin: 0 auto;
    overflow-x: hidden;
    overflow-y: auto;
  }

  .el-main {
    padding: 0 !important;
    height: calc(100vh - 82px);
    color: @color_1;
    padding: 0px;
  }

  .el-header {
    color: @color_1;
    padding: 0 !important;
    text-align: center;
    line-height: 0.6rem;

    .game-header {
      height: 100%;
      width: 100%;
      border-bottom: 1px solid #465769;
      display: flex;
      justify-content: flex-start;
      align-items: center;
      background: linear-gradient(90deg,
        rgba(55, 57, 77, 1),
        rgba(43, 53, 65, 1));
      display: flex;
      justify-content: space-between;

      .header-left {
        height: 81px;
        width: 82px;

        .game-logo {
          height: 31px;
          width: 62px;
          margin: 23px auto 28px auto;
          background: url("../../static/img/home_game_logo.png") no-repeat;
          background-size: 100% 100%;
        }
      }

      .header-middle {
        height: 100%;
        min-width: 60%;
        max-width: 60%;
        display: flex;
        justify-content: flex-start;
        align-items: center;

        .list-game1 {
          height: 100%;
          width: 144px;
          display: flex;
          justify-content: center;
          align-items: center;

          .game1-icon {
            height: 72px;
            width: 72px;
            background: url("../../static/img/gameone_logo_ho.png") no-repeat;
            background-size: 100% 100%;
            cursor: Pointer;
            &:hover {
                opacity: 1;
            }
          }

          .game1-text {
            height: 72px;
            width: 72px;
            line-height: 72px;
            text-align: center;
            font-size: 14px;
            font-family: @font_family_1;
            font-weight: bold;
            color: @color_2;
          }
        }

        .list-game2 {
          height: 100%;
          width: 144px;
          margin-left: 30px;
          display: flex;
          justify-content: center;
          align-items: center;

          .game2-icon {
            height: 72px;
            width: 72px;
            background: url("../../static/img/gametwo_logo_ho.png") no-repeat;
            background-size: 100% 100%;
            cursor: Pointer;
            &:hover {
                opacity: 1;
            }
          }

          .game2-text {
            height: 72px;
            width: 72px;
            line-height: 72px;
            text-align: center;
            font-size: 14px;
            font-family: @font_family_1;
            font-weight: bold;
            color: @color_2;
          }
        }
      }

      .header-right {
        height: 100%;
        min-width: 30%;
        display: flex;
        justify-content: center;
        align-items: center;

        .login-scatter {
          height: 100%;
          width: 73%;
          display: flex;
          justify-content: flex-start;
          align-items: center;

          .left {
            height: 49px;
            margin-left: 30px;
            display: flex;
            justify-content: center;
            align-items: center;
          }

          .right {
            height: 49px;
            width: 34%;
            margin-left: 20px;
            display: flex;
            justify-content: flex-start;
            align-items: center;
            font-size: 14px;
            font-family: @font_family_1;
            font-weight: 400;
            color: @color_3;
          }
        }

        .local-language {
          height: 100%;
          display: flex;
          justify-content: flex-start;
          align-items: center;
          margin-right: 0.5rem;

          .language-container {
            height: 50px;
            width: 104px;
            background: rgba(38, 46, 57, 1);
            display: flex;
            justify-content: flex-start;
            align-items: center;

            .language-text {
              height: 50px;
              width: 90px;
              display: flex;
              justify-content: center;
              align-items: center;
              text-align: center;
              height: 14px;
              font-size: 16px;
              font-family: @font_family_1;
              font-weight: bold;
              color: @color_4;
            }

            .language-icon {
              height: 50px;
              width: 57px;
              display: flex;
              justify-content: flex-start;
              align-items: center;

              .icon {
                height: 32px;
                width: 47px;
                display: flex;
                justify-content: flex-start;
                align-items: center;
                background: url("../../static/img/home_ganme_ch.png") no-repeat;
                background-size: 100% 100%;
              }
            }
          }
        }
      }
    }
  }

  #login-text {
    font-size: 14px;
    color: @color_2;
  }

  #login-icon {
    height: 16px;
    width: 20px;
    margin-left: 10px;
    background: url("../../static/img/home_ganme_more.png") no-repeat;
    background-size: 100% 100%;
  }

  .aside-container {
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    overflow-y: hidden;

    .aside-up {
      width: 100%;
      height: 65.5%;
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      align-items: center;
      background: linear-gradient(0deg, rgba(53, 56, 71, 1), rgba(34, 40, 48, 1));
      cursor: Pointer;

      .aside-up-container {
        width: 100%;
        height: 83px;
        display: flex;
        justify-content: center;
        align-items: center;
      }
    }

    .aside-down {
      width: 100%;
      height: 34.5%;
      border-top: 1px solid #7592b0;
      background: linear-gradient(0deg,
        rgba(104, 82, 113, 1),
        rgba(47, 53, 66, 1));
      cursor: Pointer;

      a {
        .aside-icon5 {
          width: 30px;
          height: 30px;
          margin: 30px auto 30px auto;
          background: url("../../static/img/home_game_information.png") no-repeat;
          background-size: 100% 100%;

          &:hover {
            width: 30px;
            height: 30px;
            margin: 30px auto 30px auto;
            background: url("../../static/img/home_game_informatinho.png") no-repeat;
            background-size: 100% 100%;
          }
        }
      }

      .aside-icon6 {
        width: 30px;
        height: 30px;
        margin: 30px auto 30px auto;
        background: url("../../static/img/telegram1.png") no-repeat;
        background-size: 100% 100%;

        &:hover {
          width: 30px;
          height: 30px;
          margin: 30px auto 30px auto;
          background: url("../../static/img/telegram2.png") no-repeat;
          background-size: 100% 100%;
        }
      }

      .aside-icon7 {
        width: 30px;
        height: 30px;
        margin: 30px auto 30px auto;
        background: url("../../static/img/home_game_wechat.png") no-repeat;
        background-size: 100% 100%;

        &:hover {
          width: 30px;
          height: 30px;
          margin: 30px auto 30px auto;
          background: url("../../static/img/home_game_wechatho.png") no-repeat;
          background-size: 100% 100%;
        }
      }

      .aside-icon8 {
        width: 30px;
        height: 30px;
        margin: 30px auto 30px auto;
        background: url("../../static/img/home_game_facebook.png") no-repeat;
        background-size: 100% 100%;

        &:hover {
          width: 30px;
          height: 30px;
          margin: 30px auto 30px auto;
          background: url("../../static/img/home_game_facebookho.png") no-repeat;
          background-size: 100% 100%;
        }
      }
    }
  }

  .aside-up-container {
    .aside-icon1 {
      width: 30px;
      height: 30px;
      margin: 30px auto 30px auto;
      background: url("../../static/img/home_game_home_ho.png") no-repeat;
      background-size: 100% 100%;
    }

    .bside-icon1 {
      width: 30px;
      height: 30px;
      margin: 30px auto 30px auto;
      background: url("../../static/img/home_ganme_home.png") no-repeat;
      background-size: 100% 100%;

      &:hover {
        width: 30px;
        height: 30px;
        margin: 30px auto 30px auto;
        background: url("../../static/img/home_game_home_ho.png") no-repeat;
        background-size: 100% 100%;
      }
    }

    .aside-icon2 {
      width: 30px;
      height: 30px;
      margin: 30px auto 30px auto;
      background: url("../../static/img/home_game_classification_ho.png") no-repeat;
      background-size: 100% 100%;
    }

    .bside-icon2 {
      width: 30px;
      height: 30px;
      margin: 30px auto 30px auto;
      background: url("../../static/img/home_game_classification.png") no-repeat;
      background-size: 100% 100%;

      &:hover {
        width: 30px;
        height: 30px;
        margin: 30px auto 30px auto;
        background: url("../../static/img/home_game_classification_ho.png") no-repeat;
        background-size: 100% 100%;
      }
    }

    .aside-icon3 {
      width: 30px;
      height: 30px;
      margin: 30px auto 30px auto;
      background: url("../../static/img/home_game_help_ho.png") no-repeat;
      background-size: 100% 100%;
    }

    .bside-icon3 {
      width: 30px;
      height: 30px;
      margin: 30px auto 30px auto;
      background: url("../../static/img/home_game_help.png") no-repeat;
      background-size: 100% 100%;

      &:hover {
        width: 30px;
        height: 30px;
        margin: 30px auto 30px auto;
        background: url("../../static/img/home_game_help_ho.png") no-repeat;
        background-size: 100% 100%;
      }
    }

    .aside-icon4 {
      width: 30px;
      height: 30px;
      margin: 30px auto 30px auto;
      background: url("../../static/img/home_ganme_enterprise_ho.png") no-repeat;
      background-size: 100% 100%;
    }

    .bside-icon4 {
      width: 30px;
      height: 30px;
      margin: 30px auto 30px auto;
      background: url("../../static/img/home_game_enterprise.png") no-repeat;
      background-size: 100% 100%;

      &:hover {
        width: 30px;
        height: 30px;
        margin: 30px auto 30px auto;
        background: url("../../static/img/home_ganme_enterprise_ho.png") no-repeat;
        background-size: 100% 100%;
      }
    }
  }

  #wechat-qrod {
    width: 200px;
    height: 200px;
    position: absolute;
    top: 74%;
    left: 90px;

    div {
      width: 100%;
      height: 100%;
      background: url("../../static/img/qr.png") no-repeat;
      background-size: 100% 100%;
    }
  }

  .main-container {
    height: 100%;
    width: 100%;
    background: url("../../static/img/home_game_bg.png") no-repeat;
    background-size: 100% 100%;
    overflow-y: hidden;
    overflow-x: hidden;

    .main-left {
      height: 100%;
      width: 71.1%;
      display: flex;
      justify-content: space-between;
      align-items: center;

      .left {
        height: 100%;
        width: 52.5%;
      }

      .right {
        height: 100%;
        // width: 38%;
      }
    }

    .main-right {
      height: 100%;
      width: 28.9%;
      background: linear-gradient(0deg, rgba(38, 49, 60, 1), rgba(70, 74, 91, 1));
    }
  }

  .container {
    .el-tabs {
      width: 86% !important;
      margin: 0 auto !important;
    }

    .el-tabs__nav-wrap {
      &::after {
        content: "";
        position: absolute;
        left: 0;
        bottom: 0;
        width: 100%;
        height: 1px;
        background-color: @background_color_1  !important;
        z-index: 1;
      }
    }

    .el-tabs__active-bar {
      position: absolute;
      bottom: 0;
      left: 0;
      height: 1px;
      background-color: @background_color_2  !important;
      z-index: 1;
      -webkit-transition: -webkit-transform 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
      transition: -webkit-transform 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
      transition: transform 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
      transition: transform 0.3s cubic-bezier(0.645, 0.045, 0.355, 1),
        -webkit-transform 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
      transition: transform 0.3s cubic-bezier(0.645, 0.045, 0.355, 1),
        -webkit-transform 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
      list-style: none;
    }

    .el-tabs__item.is-active {
      color: @color_5  !important;
    }

    .el-tabs__item {
      padding: 0px 70px !important;
      text-align: center;
      height: 40px !important;
      -webkit-box-sizing: border-box;
      box-sizing: border-box;
      line-height: 40px;
      display: inline-block;
      list-style: none;
      font-size: 14px;
      font-weight: 500;
      color: @color_5  !important;
      position: relative;
    }

    .el-tabs__header {
      padding: 0;
      position: relative;
      margin: 0 0 5px 0;
    }
  }

  .btn-showList {
    display: none;
  }

  .showList {
    display: none;
    min-height: 38rem;
  }

  @media (max-width: 1100px) {
    .el-aside {
      display: none;
    }

    .el-header {
      .game-header {
        .header-middle {
          display: none;
        }
      }
    }
  }
</style>