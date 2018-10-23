/**
* @Author:  chengzhaocheng
* @Date:  2018/9/28 17:56
* @Last Modified by:   chengzhaocheng
* @Last Modified by:   2018/9/28 17:56
*/
<template>
  <div 
    v-show="popShow"
    class="popup-on-bet"
  >
    <div class="pop-wrapper">
      <div class="pop-container">
        <div class="pop-container pop-invite">
          <div 
            class="close-icon" 
            @click="closePop"
          />
          <div class="tabBar">
            <div
              v-for="(item,index) in $t('coincenter.popOnBet.tabBar')" 
              :class="['tabBar-item', tabBarIndex == index ? 'active' : '' ]" 
              @click="toggleTabBar(index)"
              :key="index"
            >{{ item }}</div>
          </div>
          <div :class="['moneyPack', tabBarIndex == 0 ? 'active' : '' ]">
            <div class="info">
              {{ $t('coincenter.popOnBet.moneyPack.info') }}
            </div>
            <div class="fir">
              <img
                class="support-list-logo"
                src="../../static/img/penguin_logo@3x.png"
                alt="logo"
              >
              <img
                class="support-list-logo"
                src="../../static/img/more_logo@3x.png"
                alt="logo"
              >
            </div>
            <div class="sec">
              <img
                class="support-list-logo"
                src="../../static/img/medishares_logo@3x.png"
                alt="logo"
              >
              <img
                class="support-list-logo"
                src="../../static/img/tokenpocket_logo@3x.png"
                alt="logo"
              >
            </div>
          </div>
          <div :class="['EOSPack', tabBarIndex == 1 ? 'active' : '' ]">
            <div class="fir">
              <div class="l">{{ $t('coincenter.popOnBet.EOSPack.firL') }}</div>
              <div class="middle">{{ $t('coincenter.popOnBet.EOSPack.firMiddle') }}</div>
              <div class="r">
                <div 
                  v-clipboard:copy="$t('coincenter.popOnBet.EOSPack.firMiddle')"
                  v-clipboard:success="onCopy"
                  class="btn-copy"
                />
              </div>
            </div>
            <div class="sec">
              <div class="l">{{ $t('coincenter.popOnBet.EOSPack.secL') }}</div>
              <div class="middle">{{sidevaluememo}}</div>
              <div class="r">
                <div 
                  v-clipboard:copy="sidevaluememo"
                  v-clipboard:success="onCopyMemo"
                  class="btn-copy"
                />
              </div>
            </div>
            <div class="tips">{{ $t('coincenter.popOnBet.EOSPack.tips') }}</div>
          </div>
          <div :class="['ScatterPack', tabBarIndex == 2 ? 'active' : '' ]">
            <div class="info">
              电脑网页版连接Scatter，可畅玩游戏，即时反馈游戏结果。
            </div>
            <div class="pop-img-tips">
              <img
                class="img-chrome"
                src="../../static/img/chrome_logo@3x.png"
                alt="logo"
              >
              <img
                class="img-add"
                src="../../static/img/add_icon@3x.png"
                alt="logo"
              >
              <img
                class="img-scatter"
                src="../../static/img/scatter_logo@3x.png"
                alt="logo"
              >
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
    name: 'PopupOnBet',
    props: {
        sidevaluememo: {
            type: String,
        },
    },
    data() {
        return {
            tabBarIndex: 0,
        };
    },
    computed: {
        popShow() {
            return this.$store.state.popupOnBetShow;
        },
    },
    methods: {
        closePop() {
            this.$store.state.popupOnBetShow = !this.$store.state
                .popupOnBetShow;
        },
        toggleTabBar(index) {
            this.tabBarIndex = index;
        },
        onCopy() {
            const that = this;
            this.$message({
                message: that.$t('common.copySuccessMessage'),
                type: 'success',
                duration: 1000,
            });
        },
        onCopyMemo() {
            console.log(1111, this.sidevaluememo)
            const that = this;
            this.$message({
                message: that.$t('common.copySuccessMessage'),
                type: 'success',
                duration: 1000,
            });
        },

    },
};
</script>

<style type="text/css" lang="less" scopped>
@color_1: rgba(255, 255, 255, 1);
@color_2: rgba(144, 153, 186, 1);
@font_family_1: MicrosoftYaHei;
.el-message--success {
    margin-top: 2rem !important;
}
.popup-on-bet {
    .pop-wrapper {
        position: fixed;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        background: rgba(43, 48, 59, 1);
        z-index: 2000;
        display: flex;
        align-items: center;
        justify-content: center;
        .pop-container {
            position: relative;
            margin: 0 !important;
            width: 17rem !important;
            height: 13.6rem !important;
            background: rgba(70, 74, 91, 1);
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
            .tabBar {
                display: flex;
                justify-content: space-between;
                color: rgba(232, 233, 255, 1);
                padding: 1.5rem 1rem 0 1rem;
                .tabBar-item {
                    width: 4rem;
                    height: 1.7rem;
                    line-height: 1.7rem;
                    font-size: 0.5rem;
                    &.active {
                        background: linear-gradient(
                            90deg,
                            rgba(147, 144, 254, 1),
                            rgba(138, 124, 224, 1)
                        );
                        border-radius: 1rem;
                    }
                }
            }
            .moneyPack,
            .EOSPack,
            .ScatterPack {
                display: none;
                &.active {
                    display: block;
                }
            }
            .moneyPack {
                .info {
                    width: 15rem;
                    font-size: 0.65rem;
                    color: white;
                    margin: 1rem auto;
                    text-align: left;
                }
                .fir {
                    margin-bottom: 1rem;
                }
                .fir,
                .sec {
                    display: flex;
                    justify-content: space-between;
                    padding: 0 1rem;
                    align-items: center;
                    img {
                        width: 7rem;
                        height: 2rem;
                    }
                }
            }
            .EOSPack {
                padding-top: 1.5rem;
                .fir,
                .sec {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    width: 15rem;
                    height: 2.2rem;
                    background: rgba(78, 83, 107, 1);
                    margin: 0 auto;
                    border-radius: 0.5rem;
                    font-size: 0.6rem;
                    .l {
                        width: 3rem;
                        white-space: nowrap;
                        padding-left: 0.5rem;
                        color: rgba(144, 153, 186, 1);
                        text-align: center;
                    }
                    .middle {
                        width: 8rem;
                        color: white;
                    }
                    .r {
                        width: 1.8rem;
                        text-align: center;
                        .btn-copy {
                            width: 1rem;
                            height: 1rem;
                            background: url('../../static/img/payment_copy_icon@3x.png');
                            background-size: contain;
                        }
                    }
                }
                .fir {
                    margin-bottom: 1rem;
                }
                .sec {
                    margin-bottom: 0.5rem;
                }
                .tips {
                    width: 15rem;
                    margin: 0 auto;
                    font-size: 0.6rem;
                    color: rgba(144, 153, 186, 1);
                    .important {
                        font-size: 0.6rem;
                        color: white;
                        margin: 0 0.5rem;
                    }
                }
            }
            .ScatterPack {
                .info {
                    margin-top: 1.5rem;
                    font-size: 0.6rem;
                    color: rgba(232, 233, 255, 1);
                }
                .pop-img-tips {
                    top: 8rem !important;
                }
            }
        }
    }
}
</style>
