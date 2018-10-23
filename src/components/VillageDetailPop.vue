<template>
    <div id="villagedetailpop">
        <transition name="slide-fade">
            <div class="pop-wrapper" v-show="showPop">
                <div class="pop-container">
                    <div class="pop-title">{{$t("villagedetail.title")}}</div>
                    <div class="pop-content">
                        <p>{{$t("villagedetail.comtent1")}}</p>
                        <p>{{$t("villagedetail.comtent2")}}</p>
                        <p>{{$t("villagedetail.comtent3")}}</p>
                        <p>{{$t("villagedetail.comtent4")}}</p>
                        <p>{{$t("villagedetail.comtent5")}}</p>
                        <p>{{$t("villagedetail.comtent6")}}</p>   
                    </div>
                    <div class="pop-button" @click="back">{{$t("common.back")}}</div>
                </div>
            </div>
        </transition>
    </div>
</template>

<script>
import * as Mutations from '../store/constants'
export default {
    name: 'villagedetailpop',
    data () {
        return {
            dialogVisible: true,
        }
    },
    computed: {
        showPop() {
            return this.$store.state.villageDetailShow;
        }
    },
    methods: {
        back(){
            this.$store.commit(Mutations.SET_VILLAGEDETAILSHOW,false);
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
#villagedetailpop>.pop-wrapper{
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background:rgba(43,48,59,1);
    z-index: 2010;
}
#villagedetailpop>.pop-wrapper>.pop-container{
    position: relative;
    margin: 100px auto 0px auto;
    padding-top: 70px;
    width:540px;
    height:646px;
    background:linear-gradient(0deg,rgba(38,49,60,1),rgba(70,74,91,1));
    border-radius:5px;
    box-shadow:0px 0px 10px rgba(19,26,47,0.2);
}
#villagedetailpop>.pop-wrapper>.pop-container>.pop-title{
    width:240px;
    height:28px;
    line-height:28px;
    text-align: center;
    margin: 0 auto;
    font-size:24px;
    font-weight:400;
    color:rgba(255,255,255,1);
    
}
#villagedetailpop>.pop-wrapper>.pop-container>.pop-content{
    width: 440px;
    max-height: 450px;
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
#villagedetailpop>.pop-wrapper>.pop-container>.pop-content::-webkit-scrollbar{
    /* display: none; */
    height: 1px;
    width: 16px;
}
#villagedetailpop>.pop-wrapper>.pop-container>.pop-content::-webkit-scrollbar-thumb{
    /* border-radius: 5px; */
    height: 8px;
    -webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
    background:rgba(91,95,120,1);
}
#villagedetailpop>.pop-wrapper>.pop-container>.pop-content::-webkit-scrollbar-track{
    border-radius: 0;
    /* width: 1px;
    border-left: 1px solid rgba(255,255,255,1);
    margin-left: 8px; */
}

#villagedetailpop>.pop-wrapper>.pop-container>.pop-content>p{
    margin-bottom: 8px;
}
#villagedetailpop>.pop-wrapper>.pop-container>.pop-button{
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
