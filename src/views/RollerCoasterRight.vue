
/*
 * @Author: lindongwu 
 * @Date: 2018-10-20 18:03:45 
 * @Last Modified by: tonyTang
 * @Last Modified time: 2018-10-20 20:33:19
 */
<template>
    <div id="roller-coaster-right">
        <div class="container">
            <div class="main-right">
                <FriendPoolRoll />
                <div class="history-part">
                    <el-tabs v-model="activeName">
                        <el-tab-pane :label="labelComput1" name="first">
                            <div class="table">
                                <div class="table-header">
                                    <div style="width: 1.6rem;">玩家</div>
                                    <div style="width: 1.4rem;">賭註</div>
                                    <div style="width: 1rem;">勝率</div>
                                    <div style="width: 1rem;">結果</div>     
                                    <div>收益</div>
                                </div>
                                <div class="table-body">
                                    <div class="table-row" v-for="(item,index) in computHistory " :key="index">
                                        <div style="width: 1.6rem;">{{ item.name }}</div>
                                        <div style="width: 1.4rem;">{{ item.bet }}</div>
                                        <div style="width: 1rem;">≤70</div>
                                        <div style="width: 1rem;">65</div>
                                        <div>
                                            <div v-if="item.win == 1" style="color: rgba(139,126,228,1);">{{ item.winamount }}</div>
                                            <div v-if="item.win == 0">----------</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </el-tab-pane>
                        <el-tab-pane :label="labelComput2" name="second">
                            <div class="table">
                                <div class="table-header">
                                    <div style="width: 1.6rem;">玩家</div>
                                    <div style="width: 1.4rem;">賭註</div>
                                    <div style="width: 1rem;">勝率</div>
                                    <div style="width: 1rem;">結果</div>    
                                    <div>收益</div>
                                </div>
                                <div class="table-body">
                                    <div class="table-row" v-for="(item,index) in computMyHistory " :key="index">
                                        <div style="width: 1.6rem;">{{ item.name }}</div>
                                        <div style="width: 1.4rem;">{{ item.bet }}</div>
                                        <div style="width: 1rem;">≤70</div>
                                        <div style="width: 1rem;">65</div>
                                        <div>
                                            <div v-if="item.win == 1" style="color: rgba(139,126,228,1);">{{ item.winamount }}</div>
                                            <div v-if="item.win == 0">----------</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </el-tab-pane>
                    </el-tabs>
                    <div style="height: 30px;width: 100%;" />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Config from '../config/config';
import FriendPoolRoll from './FriendPoolRoll.vue';

export default {
    components: {
        FriendPoolRoll,
    },
    data() {
        return {
            /** 历史记录tab项 */
            activeName: 'first',
            /** 用户账号 */
            username: '',
        };
    },
    computed: {
        labelComput1(){
            return this.$t('coinRight.label1');
        },
        labelComput2(){
            return this.$t('coinRight.label2');
        },
        computHistory() {
            return this.$store.state.rollHistoryList;
        },
        computMyHistory() {
            return this.$store.state.rollMyHistoryList;
        },
    },
    created() {
        this.username = sessionStorage.getItem('username');
    },
    methods: {
        /** 获取游戏历史数据 */  
    },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style type="text/css" scopped>
#roller-coaster-right {
    width: 100%;
    height: 100%;
}
@media (max-width: 1100px) {
    #roller-coaster-right {
        display: none;
    }
}
#roller-coaster-right > .container {
    width: 100%;
    height: 100%;
}
#roller-coaster-right > .container > .main-right {
    height: 100%;
    width: 100%;
    background: linear-gradient(0deg, rgba(38, 49, 60, 1), rgba(70, 74, 91, 1));
}
#roller-coaster-right > .container > .main-right > .friend-part {
    height: 24%;
    width: 100%;
    border-bottom: 1px solid #465769;
}
#roller-coaster-right > .container > .main-right > .friend-part > .friend-first {
    height: 40%;
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
}
#roller-coaster-right > .container > .main-right > .friend-part > .friend-first > .left {
    height: 100%;
    width: 50%;
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
}
#roller-coaster-right > .container > .main-right > .friend-part > .friend-first > .left > .left-one {
    height: 70%;
    width: 40%;
    display: flex;
    justify-content: flex-end;
    align-items: flex-end;
    font-size: 14px;
    font-family: MicrosoftYaHei;
    color: rgba(144, 153, 186, 1);
}
#roller-coaster-right > .container > .main-right > .friend-part > .friend-first > .left > .left-two {
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
#roller-coaster-right > .container > .main-right > .friend-part > .friend-first > .left > .left-three {
    height: 70%;
    width: 20%;
    display: flex;
    align-items: flex-end;
    font-size: 20px;
    font-family: MicrosoftYaHei;
    font-weight: 400;
    color: #e8e9ff;
}
#roller-coaster-right > .container > .main-right > .friend-part > .friend-first > .right {
    height: 100%;
    width: 50%;
    display: flex;
    align-items: center;
}
#roller-coaster-right > .container > .main-right > .friend-part > .friend-first > .right > div {
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
#roller-coaster-right > .container > .main-right > .friend-part > .friend-first > .right > div:hover {
    background: rgba(147, 144, 254, 1);
}
#roller-coaster-right > .container > .main-right > .friend-part > .friend-second {
    height: 50px;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
}
#roller-coaster-right > .container > .main-right > .friend-part > .friend-second > .invite-friend {
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
#roller-coaster-right > .container > .main-right > .friend-part > .friend-third {
    height: 49px;
    width: 204px;
    margin: 15px auto 0 auto;
    text-align: center;
    font-size: 14px;
    font-family: MicrosoftYaHei;
    font-weight: 400;
    color: rgba(139, 126, 228, 1);
}

#roller-coaster-right > .container > .main-right > .village-part {
    width: 100%;
    padding-top: 20px;
    padding-bottom: 30px;
    border-bottom: 1px solid #465769;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}
#roller-coaster-right > .container > .main-right > .village-part > .village-text {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 24px;
    font-weight: 400;
    color: rgba(232, 233, 255, 1);
}
#roller-coaster-right > .container > .main-right > .village-part > .village-text > span {
    font-size: 14px;
    color: rgba(144, 153, 186, 1);
}
#roller-coaster-right > .container > .main-right > .village-part > .village-button {
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
#roller-coaster-right > .container > .main-right > .history-part {
    width: 90%;
    height: 100%;
    margin: 0 auto;
}
.table-header {
    width: 100%;
    height: 36px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    font-size: 14px;
    font-weight: 400;
    color: rgba(146, 142, 251, 1);
}
.table-header > div {
    display: flex;
    justify-content: flex-start;
}
.table-body {
    width: 100%;
    color: #ffffff;
    font-size: 14px;
    overflow-y: scroll;
    font-family: Consolas, Monaco, monospace;
}
.table-body::-webkit-scrollbar {
    display: none;
}

.table-body div {
    display: flex;
}

.table-row {
    width: 100%;
    justify-content: flex-start;
    height: 35px;
    line-height: 35px;
}
.table-row > div:first-child {
    color: #9099BA;
}
.table-body > .ul-height1 {
    height: 700px;
    overflow: auto;
    margin: 0 !important;
    padding: 0 !important;
}
</style>

<style type="text/css">
/* 重写element的tab切换样式 */

.container .el-tabs {
    width: 100% !important;
    height: 100% !important;
    margin: 0 0 !important;
}
.container .el-tabs__nav-prev,
.el-tabs__nav-next {
    display: none;
}
.container .el-tabs__content,
.el-tab-pane,
.table {
    height: 100%;
}

.container .table-body {
    height: 100%;
    overflow: scroll;
}

.container .el-tabs__nav-wrap::after {
    content: '';
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 1px;
    background-color: #465769 !important;
    z-index: 1;
}
.container .el-tabs__active-bar {
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
.container .el-tabs__item.is-active {
    color: #ffffff !important;
}
.container .el-tabs__item {
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
.container .el-tabs__header {
    padding: 0;
    position: relative;
    margin: 0 0 5px 0;
}
</style>
