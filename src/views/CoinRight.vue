
<template>
    <div id="coin-right" v-show="showPop">
        <div class="container">
            <div class="main-right">
                <FriendPoolCoin v-if="showPop"></FriendPoolCoin>
                <div class="history-part">
                    <el-tabs v-model="activeName" @tab-click="handleClick">
                        <el-tab-pane :label="labelComput1" name="first">
                            <div class="list-header1">
                                <div style="margin-left: 0rem; width: 20%;">{{$t("coinRight.userName1")}}</div>
                                <div style="width: 40%">{{$t("coinRight.bet1")}}</div>
                                <div style="width: 40%">{{$t("coinRight.result1")}}</div>
                            </div>
                            <div class="scrollbar-container1">
                                <ul :class="[computLogin ? 'ul-height2' : 'ul-height1']">
                                    <li v-for="(item,index) in computHistory " :key="index">
                                        <div class="list-left">
                                            <span class="list-address" style="-webkit-box-orient: vertical;">{{item.name}}</span>
                                        </div>
                                        <div class="list-middle" style="margin-left: 0;">
                                            <div class="list-chapin">{{item.bet}}</div>
                                            <div class="coin-side-a" v-show="item.select == 65"></div>
                                            <div class="coin-side-b" v-show="item.select == 66"></div>
                                        </div>
                                        <div class="list-right">
                                            <div class="coin-side-a" v-show="item.select_res == 65"></div>
                                            <div class="coin-side-b" v-show="item.select_res == 66"></div>
                                            <div class="list-chapin" v-show="item.win == 1" style="color: rgba(139,126,228,1);">{{item.winamount}}</div>
                                            <div class="list-chapin" v-show="item.win == 0">----------------</div>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </el-tab-pane>
                        <el-tab-pane :label="labelComput2" name="second">
                            <div class="list-header1">
                                <div style="margin-left: 0rem; width: 20%;">{{$t("coinRight.userName2")}}</div>
                                <div style="width: 40%">{{$t("coinRight.bet2")}}</div>
                                <div style="width: 40%">{{$t("coinRight.result2")}}</div>
                            </div>
                            <div class="scrollbar-container1">
                                <ul :class="[computLogin ? 'ul-height2' : 'ul-height1']">
                                    <li v-for="(item,index) in computMyHistory" :key="index">
                                        <div class="list-left">
                                            <span class="list-address" style="-webkit-box-orient: vertical;">{{item.name}}</span>
                                        </div>
                                        <div class="list-middle" style="margin-left: 0;">
                                            <div class="list-chapin">{{item.bet}}</div>
                                            <div class="coin-side-a" v-show="item.select == 65"></div>
                                            <div class="coin-side-b" v-show="item.select == 66"></div>
                                        </div>
                                        <div class="list-right">
                                            <div class="coin-side-a" v-show="item.select_res == 65"></div>
                                            <div class="coin-side-b" v-show="item.select_res == 66"></div>
                                            <div class="list-chapin" v-show="item.win == 1" style="color: rgba(139,126,228,1);">{{item.winamount}}</div>
                                            <div class="list-chapin" v-show="item.win == 0">----------------</div>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </el-tab-pane>
                    </el-tabs>
                    <div style="height: 30px;width: 100%;"></div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import FriendPoolCoin from './FriendPoolCoin.vue'
export default {
    data() {
        return {
            activeName: 'first', //历史记录tab项
        };
    },
    components: { 
        FriendPoolCoin,
    },
    computed: {
        showPop() {
            return this.$store.state.coinRightShow;
        },
        computLogin(){
            return this.$store.state.isLogin
        },
        labelComput1(){
            return this.$t('coinRight.label1');
        },
        labelComput2(){
            return this.$t('coinRight.label2');
        },
        computHistory() {
            return this.$store.state.historyList;
        },
        computMyHistory() {
            return this.$store.state.myHistoryList;
        },

    },
    methods: {
        //切换历史纪录的tab
        handleClick(tab, event){
            console.log(tab, event);
        }, 
    },
    
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style type="text/css" scopped>
#coin-right {
    width: 100%;
    height: 100%;
}
#coin-right > .container {
    width: 100%;
    height: 100%;
}
#coin-right > .container > .main-right {
    height: 100%;
    width: 100%;
    background: linear-gradient(0deg, rgba(38, 49, 60, 1), rgba(70, 74, 91, 1));
}
#coin-right > .container > .main-right > .friend-part {
    height: 24%;
    width: 100%;
    border-bottom: 1px solid #465769;
}
#coin-right > .container > .main-right > .friend-part > .friend-first {
    height: 40%;
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
}
#coin-right > .container > .main-right > .friend-part > .friend-first > .left {
    height: 100%;
    width: 50%;
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
}
#coin-right > .container > .main-right > .friend-part > .friend-first > .left > .left-one {
    height: 70%;
    width: 40%;
    display: flex;
    justify-content: flex-end;
    align-items: flex-end;
    font-size: 14px;
    font-family: MicrosoftYaHei;
    color: rgba(144, 153, 186, 1);
}
#coin-right > .container > .main-right > .friend-part > .friend-first > .left > .left-two {
    height: 62%;
    width: 40%;
    margin-top: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 36px;
    font-family: MicrosoftYaHei;
    font-weight: 400;
    color: #e8e9ff;
}
#coin-right > .container > .main-right > .friend-part > .friend-first > .left > .left-three {
    height: 70%;
    width: 20%;
    display: flex;
    align-items: flex-end;
    font-size: 20px;
    font-family: MicrosoftYaHei;
    font-weight: 400;
    color: #e8e9ff;
}
#coin-right > .container > .main-right > .friend-part > .friend-first > .right {
    height: 100%;
    width: 50%;
    display: flex;
    align-items: center;
}
#coin-right > .container > .main-right > .friend-part > .friend-first > .right > div {
    height: 36px;
    line-height: 36px;
    width: 60px;
    margin-left: 120px;
    background: rgba(71, 82, 100, 1);
    border-radius: 5px;
    box-shadow: 5px 0px 60px rgba(19, 26, 47, 0.3);
    text-align: center;
    font-size: 16px;
    font-weight: bold;
    color: rgba(232, 233, 255, 1);
}
#coin-right > .container > .main-right > .friend-part > .friend-first > .right > div:hover {
    background: rgba(147, 144, 254, 1);
}
#coin-right > .container > .main-right > .friend-part > .friend-second {
    height: 50px;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
}
#coin-right > .container > .main-right > .friend-part > .friend-second > .invite-friend {
    height: 49px;
    width: 204px;
    margin-top: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    background: linear-gradient(90deg, rgba(147, 144, 254, 1), rgba(138, 124, 224, 1));
    border-radius: 5px;
    box-shadow: 1px 0px 10px rgba(44, 51, 62, 0.2);
    font-size: 18px;
    font-weight: 400;
    color: rgba(255, 255, 255, 1);
}
#coin-right > .container > .main-right > .friend-part > .friend-third {
    height: 49px;
    width: 204px;
    margin: 15px auto 0 auto;
    text-align: center;
    font-size: 14px;
    font-family: MicrosoftYaHei;
    font-weight: 400;
    color: rgba(139, 126, 228, 1);
}

#coin-right > .container > .main-right > .village-part {
    width: 100%;
    padding-top: 20px;
    padding-bottom: 30px;
    border-bottom: 1px solid #465769;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}
#coin-right > .container > .main-right > .village-part > .village-text {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 24px;
    font-weight: 400;
    color: rgba(232, 233, 255, 1);
}
#coin-right > .container > .main-right > .village-part > .village-text > span {
    font-size: 14px;
    color: rgba(144, 153, 186, 1);
}
#coin-right > .container > .main-right > .village-part > .village-button {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 50px;
    width: 204px;
    margin-top: 16px;
    background: linear-gradient(90deg, rgba(147, 144, 254, 1), rgba(138, 124, 224, 1));
    border-radius: 5px;
    box-shadow: 1px 0px 10px rgba(44, 51, 62, 0.2);
    font-size: 18px;
    font-weight: 400;
    color: rgba(255, 255, 255, 1);
}
#coin-right > .container > .main-right > .history-part {
    width: 100%;
}
.list-header1 {
    width: 100%;
    height: 36px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 14px;
    font-weight: 400;
    color: rgba(146, 142, 251, 1);
}
.list-header1 > div {
    width: 33%;
}
.list-header1 > div:nth-child(1) {
    display: flex;
    justify-content: flex-start;
    align-items: center;
}
/* .list-header1>div:nth-child(3){
    width: 30%;
    margin-left: 3%;
    display: flex;
    justify-content: flex-start;
    align-items: center;
} */
#coin-right .scrollbar-container1 {
    width: 100%;
    color: #ffffff;
    overflow: auto;
}
#coin-right .scrollbar-container1 > .ul-height1 {
    height: 700px;
    overflow: auto;
}
#coin-right .scrollbar-container1 > .ul-height2 {
    height: 380px;
    overflow: auto;
}
#coin-right .scrollbar-container1 > ul::-webkit-scrollbar {
    display: none;
}
#coin-right .scrollbar-container1 > ul > li {
    width: 100%;
    height: 35px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 14px;
    font-weight: 400;
}
#coin-right .scrollbar-container1 > ul > li > .list-left {
    width: 30%;
    height: 35px;
    color: #9099ba;
    display: flex;
    justify-content: flex-start;
    align-items: center;
}
#coin-right .scrollbar-container1 > ul > li > .list-middle {
    width: 33%;
    height: 35px;
    color: #ffffff;
    display: flex;
    justify-content: space-around;
    align-items: center;
}
#coin-right .scrollbar-container1 > ul > li > .list-middle > .coin-side-a {
    width: 28px;
    height: 28px;
    border-radius: 50%;
    margin-left: 10px;
    background: url('../../static/img/recording_negative.png') no-repeat;
    background-size: 100% 100%;
}
#coin-right .scrollbar-container1 > ul > li > .list-middle > .coin-side-b {
    width: 28px;
    height: 28px;
    border-radius: 50%;
    margin-left: 10px;
    background: url('../../static/img/recording_positive.png') no-repeat;
    background-size: 100% 100%;
}
#coin-right .scrollbar-container1 > ul > li > .list-right {
    width: 33%;
    /* margin-left: 3%; */
    padding-left: .1rem;
    height: 35px;
    color: #ffffff;
    display: flex;
    justify-content: flex-start;
    align-items: center;
}
#coin-right .scrollbar-container1 > ul > li > .list-right > .coin-side-a {
    width: 28px;
    height: 28px;
    border-radius: 50%;
    margin-right: 10px;
    background: url('../../static/img/recording_negative.png') no-repeat;
    background-size: 100% 100%;
}
#coin-right .scrollbar-container1 > ul > li > .list-right > .coin-side-b {
    width: 28px;
    height: 28px;
    border-radius: 50%;
    margin-right: 10px;
    background: url('../../static/img/recording_positive.png') no-repeat;
    background-size: 100% 100%;
}
</style>

<style type="text/css">
/* 重写element的tab切换样式 */

#coin-right .el-tabs {
    width: 86% !important;
    margin: 0 auto !important;
}

#coin-right .el-tabs__nav-wrap::after {
    content: '';
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 1px;
    background-color: #465769 !important;
    z-index: 1;
}
#coin-right .el-tabs__active-bar {
    position: absolute;
    bottom: 0;
    left: 0;
    height: 1px;
    /* width: 50px; */
    background-color: #dadff8 !important;
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
#coin-right .el-tabs__item.is-active {
    color: #ffffff !important;
}
#coin-right .el-tabs__item {
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
    color: #ffffff !important;
    position: relative;
}
#coin-right .el-tabs__header {
    padding: 0;
    position: relative;
    margin: 0 0 5px 0;
}
</style>
