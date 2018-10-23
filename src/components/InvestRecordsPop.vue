<template>
    <div id="investrecordspop">
        <transition name="slide-fade">
            <div class="pop-wrapper" v-show="showPop">
                <div class="pop-container">
                    <div class="pop-title">{{$t("investRecords.title")}}</div>
                    <div class="pop-content">
                        <ul>
                            <li v-if="divestmentList.length>0" v-for="(item,index) in divestmentList" :key="index">
                                <div class="item-container" :class="[(index+1)%2 == 0 ? 'item-background-grey' : '']">
                                    <div class="left">
                                        <div class="intr-text">{{$t("investRecords.intrText")}}</div>
                                        <div class="time-text">{{item.time|showDay2}}</div>
                                    </div>
                                    <div class="right">
                                        <div class="plus-icon">+ </div>
                                        <div class="number-text">{{item.amount}}</div>
                                    </div>
                                </div>
                            </li>
                        </ul>    
                    </div>
                    <div class="pop-button" @click="back">{{$t("common.back")}}</div>
                </div>
            </div>
        </transition>
    </div>
</template>

<script>

export default {
    props: [ "divestmentList"],
    data () {
        return {
            
        }
    },
    computed: {
        showPop() {
            return this.$store.state.investRecordsShow
        },
        filterList(){
            return function(){

            }
        }
    },
    methods: {
        back(){
            this.$store.state.investRecordsShow = false;
        },
    },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.slide-fade-enter-active {
  transition: all .4s ease;
}
.slide-fade-leave-active {
  transition: all .6s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}
.slide-fade-enter
{
  transform: translateX(6rem);
  opacity: 0;
}
.slide-fade-leave-to
{
  transform: translateX(6rem);
  opacity: 0;
}
#investrecordspop>.pop-wrapper{
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background:rgba(43,48,59,1);
    z-index: 2010;
}
#investrecordspop>.pop-wrapper>.pop-container{
    position: relative;
    margin: 100px auto 0px auto;
    padding-top: 70px;
    width:540px;
    /* height:646px; */
    padding-bottom: 50px;
    background:linear-gradient(0deg,rgba(38,49,60,1),rgba(70,74,91,1));
    border-radius:5px;
    box-shadow:0px 0px 10px rgba(19,26,47,0.2);
}
#investrecordspop>.pop-wrapper>.pop-container>.pop-title{
    width:240px;
    height:28px;
    line-height:28px;
    text-align: center;
    margin: 0 auto;
    font-size:24px;
    font-weight:400;
    color:rgba(255,255,255,1);
    
}
#investrecordspop>.pop-wrapper>.pop-container>.pop-content{
    width: 440px;
    height: 300px;
    margin: 34px auto 46px auto;
    font-size:16px;
    font-family:MicrosoftYaHei;
    font-weight:400;
    text-align: left;
    color:rgba(144,153,186,1);
    line-height:24px;
    overflow-y: auto;
    overflow-x: hidden;  
}
#investrecordspop>.pop-wrapper>.pop-container>.pop-content>ul>li>.item-container{
    height: 60px;
    width: 440px;
    display: flex;
    justify-content: center;
    align-items: center;
}
.item-background-grey{
    background:rgba(70,74,91,1);
}
.item-container>.left{
    height: 60px;
    width: 200px;
}
.item-container>.left>.intr-text{
    width: 200px;
    text-align: left;
    margin-top: 10px;
    margin-left: 5px;
}
.item-container>.left>.time-text{
    width: 200px;
    text-align: left;
    margin-left: 5px;
}
.item-container>.right{
    height: 60px;
    width: 200px;
    display: flex;
    justify-content: center;
    align-items: center;
    color:rgba(255,255,255,1);
}
.item-container>.right>.number-text{
    margin-left: 10px;
}
#investrecordspop>.pop-wrapper>.pop-container>.pop-content::-webkit-scrollbar{
    /* display: none; */
    height: 1px;
    width: 16px;
}
#investrecordspop>.pop-wrapper>.pop-container>.pop-content::-webkit-scrollbar-thumb{
    /* border-radius: 5px; */
    height: 8px;
    -webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
    background:rgba(91,95,120,1);
}
#investrecordspop>.pop-wrapper>.pop-container>.pop-content::-webkit-scrollbar-track{
    border-radius: 0;
}

#investrecordspop>.pop-wrapper>.pop-container>.pop-content>p{
    margin-bottom: 8px;
}
#investrecordspop>.pop-wrapper>.pop-container>.pop-button{
    width: 204px;
    height: 50px;
    line-height: 50px;
    margin: 0 auto;
    font-size:18px;
    font-weight:400;
    color:rgba(255,255,255,1);
    text-align: center;
    background:linear-gradient(90deg,rgba(147,144,254,1),rgba(138,124,224,1));
    border-radius:5px;
    box-shadow:1px 0px 10px rgba(44,51,62,0.2);
}
</style>
