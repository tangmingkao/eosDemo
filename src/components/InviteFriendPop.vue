<template>
    <div id="invitefriendpop">
        <transition name="slide-fade">
            <div class="pop-wrapper" v-show="showPop">
                <div class="pop-container pop-invite">
                    <div class="close-icon" @click="closePop"></div>
                    <div class="pop-title">{{$t("inviteFriend.title")}}</div>
                    <div class="pop-summary1">{{$t("inviteFriend.summary1")}}</div>
                    <div class="friend-link"
                    v-clipboard:copy="computShareStr"
                    v-clipboard:success="onCopy"
                    v-clipboard:error="onError"
                    >{{computShareStr}}</div>
                    <div class="pop-summary2 clickTips">{{$t("inviteFriend.summary2")}}</div>
                    <div class="go-PC-tips">{{ $t("villagehomepop.goPCTips") }}</div>
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
                    <!-- <a href="javascript:void(0)"></a> -->
                </div>
            </div>
        </transition>
    </div>
</template>

<script>
import * as Mutations from '../store/constants'
export default {
    computed: {
        showPop() {
            return this.$store.state.inviteFriendShow;
        },
        computShareStr(){
            return this.$store.state.inviteFriendLink;
        },
    },
    methods: {
        closePop(){
            this.$store.commit(Mutations.SET_INVITEFRIENDSHOW,false);
        },
        onCopy(){
            console.log('copy success');
            let that = this;
            this.$message({
                message: that.$t("common.copySuccessMessage"),
                type: 'success',
                duration: 1000,
            });
        },
        onError(){
            this.$message.error(this.$t("common.copyFailMessage"));
            console.log('copy fail');
        },
    },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style type="text/css" lang="less" scopped>
@color_1: rgba(255, 255, 255, 1);
@color_2: rgba(144, 153, 186, 1);
@font_family_1: MicrosoftYaHei;

.slide-fade-enter-active {
    transition: all .3s ease;
}

.slide-fade-leave-active {
    transition: all .5s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}

.slide-fade-enter {
    transform: translateX(6rem);
    opacity: 0;
}

.slide-fade-leave-to {
    transform: translateX(6rem);
    opacity: 0;
}

#invitefriendpop {
    .pop-wrapper {
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
            height: 445px;
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
            .pop-title {
                position: absolute;
                width: 480px;
                height: 40px;
                text-align: center;
                top: 70px;
                left: 50%;
                margin-left: -240px;
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
            .friend-link {
                position: absolute;
                width: 480px;
                line-height: 35px;
                min-height: 40px;
                border: 1px solid rgba(144, 153, 186, 1);
                background: linear-gradient(0deg, rgba(38, 49, 60, 1), rgba(70, 74, 91, 1));
                border-radius: 5px;
                text-align: center;
                top: 235px;
                left: 50%;
                margin-left: -240px;
                font-size: 16px;
                font-family: @font_family_1;
                font-weight: 400;
                color: @color_1;
                word-break: break-all;
                &:hover {
                    background: rgba(144, 153, 186, 1);
                }
            }
            .pop-summary2 {
                position: absolute;
                width: 480px;
                text-align: center;
                top: 340px;
                left: 50%;
                margin-left: -240px;
                font-size: 14px;
                font-weight: 400;
                color: @color_2;
            }
        }
    }
}
.pop-invite {
    .go-PC-tips,.img-chrome,.img-add,.img-scatter{
        display: none;
    }
}
@media (max-width: 1000px) {
    .pop-invite{
        .go-PC-tips {
            top: 11rem !important;
        }
        .pop-img-tips {
            top: 12rem !important;
        }
    }
}
</style>
