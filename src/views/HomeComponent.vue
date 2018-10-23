/*
 * @Author: tonyTang 
 * @Date: 2018-10-16 18:57:51 
 * @Last Modified by: tonyTang
 * @Last Modified time: 2018-10-18 16:25:20
 */

<template>
  <div v-show="showPop" id="home-component">
    <div class="container">
      <div class="introduction-up">
        <div class="title">{{ $t("homecomponent.title") }}</div>
        <div class="summary">{{ $t("homecomponent.summary") }}</div>
        <div class="intr-icon">
          <div class="row2 row-flex row-margin-height">
            <div class="icon2"></div>
            <div class="title2 row-color1 title-left">{{ $t("homecomponent.titleLeft2") }}</div>
            <div class="summary2 row-color2 summary-left">{{ $t("homecomponent.summaryLeft2") }}</div>
          </div>
          <div class="row3 row-flex row-margin-height">
            <div class="icon3"></div>
            <div class="title3 row-color1 title-left">{{ $t("homecomponent.titleLeft3") }}</div>
            <div class="summary3 row-color2 summary-left">{{ $t("homecomponent.summaryLeft3") }}</div>
          </div>
        </div>
      </div>
      <div class="game-down">
        <GameList @goCoinGame="goCoinGame" @goRollerCenter="goRollerCenter" />
      </div>
      <div class="extra-part">
        <div class="moreGame" @click="goGameCenter">{{ $t("homecomponent.extraPart.moreGame") }}</div>
        <div class="title">{{ $t("homecomponent.extraPart.title") }}</div>
        <div class="intro">{{ $t("homecomponent.extraPart.intro") }}</div>
        <div class="support-list">
          <img class="support-list-logo" src="../../static/img/medishares_logo@3x.png" alt="logo" />
          <img class="support-list-logo" src="../../static/img/more_logo@3x.png" alt="logo" />
          <img class="support-list-logo" src="../../static/img/penguin_logo@3x.png" alt="logo" />
        </div>
        <div class="thrPart-link">
          <a href="mailto:2140dev@gmail.com">
            <img class="thrPart-link-logo" src="../../static/img/home_game_information@3x.png" alt="logo" />
          </a>
          <img class="thrPart-link-logo" src="../../static/img/telegram@3x.png" alt="logo" @click="goTelegram" />
          <img class="thrPart-link-logo" src="../../static/img/home_game_wechat@3x.png" alt="logo" @click="goWechat" />
          <div :class="['qrBox',qrCodeSHow ? 'active': '']" @click="() => qrCodeSHow=false">
            <img class="qrCode" src="../../static/img/qr.png" alt="logo" />
          </div>
        </div>
      </div>
    </div>
    <div class="right-container">
      <HomeRightComponent />
    </div>
  </div>
</template>

<script>

import HomeRightComponent from './HomeRightComponent.vue';
import GameList from './GameList.vue';

export default {
    components: {
        HomeRightComponent,
        GameList,
    },
    data() {
        return {
            username: '', // 用户账号
            isLogin: false, // 是否登陆
            qrCodeSHow: false, // 二维码
        };
    },
    computed: {
        showPop() {
            return this.$store.state.homeComponentShow;
        },
    },
    mounted() {
        const that = this;
    },
    methods: {
        goCoinGame() {
            this.$store.state.homeComponentShow = false;
            this.$store.state.gameCenterShow = true;
            this.$store.state.coinCenterShow = true;  
            this.$emit('goCoinGame');      
        },
        goRollerCenter() {
            this.$store.state.homeComponentShow = false;
            this.$store.state.gameCenterShow = true;
            this.$store.state.rollerCoasterCenterShow = true;
            this.$emit('goRollerGame'); 
        },
        goGameCenter() {
            this.$store.state.homeComponentShow = false;
            this.$store.state.gameCenterShow = true;
            this.$store.state.coinCenterShow = false;
        },
        goTelegram() {
            this.$emit('goTelegram');
        },
        goWechat() {
            this.qrCodeSHow = !this.qrCodeSHow;
        },
    },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->

<style type="text/css" scopped lang="less">
  @color_1: rgba(255, 255, 255, 1);
  @color_2: rgba(144, 153, 186, 1);
  @color_3: rgba(232, 233, 255, 1);
  @font_family_1: MicrosoftYaHei;

  .change-opcity {
    opacity: 0.4;
  }

  #home-component {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .container {
    //   width: 70%;
      min-width: 600px;
      height: 100%;
      padding-top: 1px;
      .introduction-up {
        width: 100%;
        height: 46%;
        padding-top: 0.68rem;
        padding-left: 0.88rem;
        .title {
          width: 410px;
          text-align: left;
          font-size: 36px;
          font-weight: 400;
          color: @color_1;
        }
        .summary {
          margin-top: 0.2rem;
          width: 410px;
          line-height: 20px;
          text-align: left;
          font-size: 14px;
          font-family: @font_family_1;
          font-weight: 400;
          color: @color_2;
        }
        .intr-icon {
          margin-top: 0.5rem;
        }
      }
      .game-down {
        width: 100%;
        height: 54%;
        .game-content {
          height: 354px;
          width: 100%;
          margin-top: 10px;
          padding-top: 0 !important;
          display: flex;
          justify-content: flex-start;
          align-items: center;
        }
      }
    }
    .right-container {
    //   width: 530px;
    //   width: 30%;
      height: 100%;
      padding-top: 1px;
    //   background: linear-gradient(0deg,rgba(38,49,60,1),rgba(70,74,91,1));
    }
  }

  @media (max-width: 1100px) {
    #home-component {
      width: 100%;
      height: auto;
      display: flex;
      justify-content: flex-start;
      align-items: center;
      .container {
        width: 70%;
        // height: 100%;
        padding-top: 1px;
        .introduction-up {
          width: 100%;
          height: 46%;
          padding-top: 0.68rem;
          padding-left: 0.88rem;
          .title {
            width: 410px;
            text-align: left;
            font-size: 36px;
            font-weight: 400;
            color: @color_1;
          }
          .summary {
            margin-top: 0.2rem;
            width: 410px;
            line-height: 20px;
            text-align: left;
            font-size: 14px;
            font-family: @font_family_1;
            font-weight: 400;
            color: @color_2;
          }
          .intr-icon {
            margin-top: 0.5rem;
          }
        }
        .game-down {
          width: 100%;
          height: 54%;
          .game-content {
            height: 354px;
            width: 100%;
            margin-top: 10px;
            padding-top: 0 !important;
            display: flex;
            justify-content: flex-start;
            align-items: center;
          }
        }
      }
    }
  }
  @media (max-width: 1200px) {
      .right-container {
        display: none;
      }
  }

  .extra-part {
    display: none;
  }

  .intr-icon {
    .row-flex {
      display: flex;
      justify-content: flex-start;
      align-items: center;
    }
    .row-margin-height {
      margin-top: 16px;
    }

    div {
      .title-left {
        margin-left: 16px;
      }
      .summary-left {
        margin-left: 20px;
      }
      .row-color1 {
        font-size: 20px;
        font-weight: 400;
        color: @color_3;
      }
      .row-color2 {
        font-size: 16px;
        font-weight: 400;
        color: @color_2;
      }
    }
    .row1 {
      .icon1 {
        height: 24px;
        width: 24px;
        background: url('../../static/img/home_public_icon.png') no-repeat;
        background-size: 100% 100%;
      }
    }
    .row2 {
      .icon2 {
        height: 24px;
        width: 24px;
        background: url('../../static/img/home_fair_icon.png') no-repeat;
        background-size: 100% 100%;
      }
    }
    .row3 {
      .icon3 {
        height: 24px;
        width: 24px;
        background: url('../../static/img/home_just_icon.png') no-repeat;
        background-size: 100% 100%;
      }
    }
  }
  .game-down {
    .game-content {
      .eos-game1 {
        height: 100%;
        width: 340px;
        margin-left: 2rem;
        background: rgba(107, 113, 143, 0.3);
        border-radius: 5px;
        box-shadow: 0px 0px 10px rgba(19, 26, 47, 0.3);
      }
      div {
        .game-icon {
          height: 80px;
          width: 80px;
          margin: 46px auto 0 auto;
        }
        .icon1 {
          background: url('../../static/img/game_one_logo1.png') no-repeat;
          background-size: 100% 100%;
        }
        .icon2 {
          background: url('../../static/img/game_one_logo2.png') no-repeat;
          background-size: 100% 100%;
        }
        .game-title {
          width: 54px;
          font-size: 18px;
          text-align: center;
          margin: 24px auto 0 auto;
          font-weight: 400;
          color: @color_1;
        }
        .game-summary {
          width: 220px;
          text-align: center;
          margin: 16px auto 0 auto;
          font-size: 14px;
          font-family: @font_family_1;
          font-weight: 400;
          color: @color_2;
        }
        .game-button {
          width: 204px;
          height: 50px;
          line-height: 50px;
          font-size: 18px;
          font-weight: 400;
          color: @color_1;
          margin: 50px auto 0px auto;
          background: linear-gradient(90deg,
            rgba(147, 144, 254, 1),
            rgba(138, 124, 224, 1));
          border-radius: 5px;
          box-shadow: 1px 0px 10px rgba(44, 51, 62, 0.2);
          cursor: Pointer;
          &:hover {
            background: rgba(138, 124, 224, 1);
          }
        }
      }
      .eos-game2 {
        height: 100%;
        width: 340px;
        margin-left: 30px;
        background: rgba(107, 113, 143, 0.3);
        border-radius: 5px;
        box-shadow: 0px 0px 10px rgba(19, 26, 47, 0.3);
      }
    }
  }
</style>