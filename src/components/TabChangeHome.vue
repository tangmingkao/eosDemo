/*
 * @Author: tonyTang 
 * @Date: 2018-10-18 16:44:09 
 * @Last Modified by: tonyTang
 * @Last Modified time: 2018-10-19 16:08:22
 */

<template>
    <div id="tabchange-component">
        <div class="tabchange">
            <div class="nav-list">
                <ul>
                    <li class="tab1" @click="selectItem('tab1')"><div :class="[selected == '1' ? 'active' : '']">{{$t('homecomponentright.label1')}}</div></li>
                    <li class="tab2" @click="selectItem('tab2')"><div :class="[selected == '2' ? 'active' : '']">{{$t('homecomponentright.label2')}}</div></li>
                </ul>
            </div>
            <div class="item-contanier" id="tab1" v-show="selected == '1'">
                <div class="item-contanier-title">
                    <div class="title1">{{$t("homecomponentright.rank1")}}</div>
                    <div class="title2">{{$t("homecomponentright.userName1")}}</div>
                    <div class="title3">{{$t("homecomponentright.cumulativeReward")}}</div>
                </div>
                <ul :class="[computLogin ? 'ul-height2' : 'ul-height1']">
                    <li v-for="(item,index) in computWinnerRankList " :key="index">
                        <div class="title1">{{index+1}}</div>
                        <div class="title2">{{item.owner}}</div>
                        <div class="title3">{{item.winamount}}</div>
                    </li>
                </ul>
            </div>
            <div class="item-contanier" id="tab2" v-show="selected == '2'">
                <div class="item-contanier-title">
                    <div class="title1">{{$t("homecomponentright.rank2")}}</div>
                    <div class="title2">{{$t("homecomponentright.userName2")}}</div>
                    <div class="title3">{{$t("homecomponentright.cumulativeBet")}}</div>
                </div>
                <ul :class="[computLogin ? 'ul-height2' : 'ul-height1']">
                    <li v-for="(item,index) in computbetRankList" :key="index">
                        <div class="title1">{{index+1}}</div>
                        <div class="title2">{{item.owner}}</div>
                        <div class="title3">{{item.betamount}}</div>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
import Config from '../config/config';
import Eos from 'eosjs'
import * as Mutations from '../store/constants'
export default {
    data() {
        return { 
            selected: '1', //选中的tab页，默认位历史记录页
            winnerRankList: [], //赢家排行榜
            betRankList: [], //累计投注额度排行榜
        };
    },
    computed: {
        computLogin(){
            return this.$store.state.isLogin
        },
        computScatter(){
            return this.$store.state.scatter;
        },
        computComonCoinObj(){
            return this.$store.state.commonCoinObj;
        },
        computComonRollObj(){
            return this.$store.state.commonRollObj;
        },
        computWinnerRankList(){
            let tempList = [];
            //连接两个数组合成一个数据进行排序
            if(this.computComonCoinObj && this.computComonCoinObj['rows'] && this.computComonRollObj && this.computComonRollObj['rows']){
                tempList = tempList.concat(this.computComonCoinObj['rows'],this.computComonRollObj['rows']);
                this.winnerRankList = this.bubbleSort(tempList,'winamount');   
            }
            return this.winnerRankList;
        },
        computbetRankList(){
            let tempList = [];
            //连接两个数组合成一个数据进行排序
            if(this.computComonCoinObj && this.computComonCoinObj['rows'] && this.computComonRollObj && this.computComonRollObj['rows']){
                tempList = tempList.concat(this.computComonCoinObj['rows'],this.computComonRollObj['rows']);
                this.betRankList = this.bubbleSort(tempList,'betamount');
            }
            return this.betRankList;
        },

    },
    methods: {
        //tab切换
        selectItem(type){
            console.log(type);
            if(type == 'tab1'){
                this.selected = '1';
            } else {
                this.selected = '2';
            }
            console.log(this.selected);
        },
        //冒泡排序算法
        bubbleSort(arr,str){
            let tempArr = [...arr] || [];
            let len = tempArr.length,j,temp;
            while(len > 1){
                for(let j = 0;j < len-1; j++){
                    if(parseFloat(tempArr[j][str]) < parseFloat(tempArr[j+1][str])){
                        temp = tempArr[j];
                        tempArr[j] = tempArr[j+1];
                        tempArr[j+1] = temp;
                    }
                }
                len--;
            }
            return tempArr;
        },
    },
    
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style type="text/css" scopped>
#tabchange-component{
    width: 100%;
}
.tabchange{
    width: 100%;
    background: linear-gradient(0deg,rgba(38,49,60,1),rgba(70,74,91,1));
    margin: 0 auto;
    /* padding-left: .4rem;
    padding-right: .4rem;   */
}
.nav-list>ul{
    display: flex;
    justify-content: space-around;
    align-items: center;
    height: .58rem;
    border-bottom: .01rem solid rgba(70,87,105);
}
.nav-list>ul>li{
    width: 50%;
    height: .58rem;
    line-height: .58rem;
    color: #989FBB;
    font-size: .16rem;
}
.nav-list>ul>.tab1{
    text-align: left;
    display: flex;
    justify-content: flex-start;
    align-items: center;
}
.nav-list>ul>.tab2{
    text-align: right;
    display: flex;
    justify-content: flex-end;
    align-items: center;
}
.tab1>div{
    width: 3rem;
    text-align: center;
}
.tab2>div{
    width: 3rem;
    text-align: center;
}
.nav-list>ul>li>.active{
    font-size: 16px;
    font-family:MicrosoftYaHei-Bold;
    font-weight:bold;
    color:rgba(232,233,255,1);
    border-bottom: .01rem solid #fff;
}
.item-contanier-title{
    width: 100%;
    height: .5rem;  
    display: flex;
    justify-content: space-around;
    align-items: center;
    color: #928EFB;
    font-size: 14px;
    font-weight: 400;
}
.item-contanier-title>.title1{
    width: 16%;
    height: .5rem;
    line-height: .5rem;
    text-align: center;
}
.item-contanier-title>.title2{
    width: 46%;
    height: .5rem;
    line-height: .5rem;
    text-align: center;
}
.item-contanier-title>.title3{
    width: 38%;
    height: .5rem;
    line-height: .5rem;
    text-align: center;
}
.item-contanier>.ul-height1{
    height: 700px;
    overflow: auto;
}
.item-contanier>.ul-height2{
    height: 380px;
    overflow: auto;
}
.item-contanier>ul{
    overflow-y: scroll;
}
.item-contanier>ul>li{
    width: 100%;
    height: .5rem;
    display: flex;
    justify-content: space-around;
    align-items: center;  
    color: #fff;
    font-size: 14px;
    font-weight: 400;
}
.item-contanier>ul::-webkit-scrollbar{
    display: none;
}
.item-contanier>ul>li>.title1{
    width: 16%;
    height: .5rem;
    line-height: .5rem;
    text-align: center;
}
.item-contanier>ul>li>.title2{
    width: 46%;
    height: .5rem;
    line-height: .5rem;
    text-align: center;
}
.item-contanier>ul>li>.title3{
    width: 38%;
    height: .5rem;
    line-height: .5rem;
    text-align: center;
}
</style>