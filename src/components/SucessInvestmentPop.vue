<template>
    <div id="sucessinvestmentpop">
        <div class="pop-wrapper" v-show="showPop">
            <div class="pop-container">
                <div class="close-icon" @click="closePop"></div>
                <div class="sucess-icon"></div>
                <div class="title">{{$t("successInvestment.title")}}</div>
                <div class="summary">{{$t("successInvestment.summary")}}</div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data () {
        return {
            
        }
    },
    computed: {
        showPop() {
            return this.$store.state.sucessInvestShow
        }
    },
    created(){
        
    },
    methods: {
        closePop(){
            this.$store.state.sucessInvestShow = false;
        },
    },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#sucessinvestmentpop>.pop-wrapper{
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background:rgba(43,48,59,1);
    z-index: 2010;
}
#sucessinvestmentpop>.pop-wrapper>.pop-container{
    position: relative;
    margin: 254px auto 0px auto;
    width:500px;
    height:354px;
    background:linear-gradient(0deg,rgba(38,49,60,1),rgba(70,74,91,1));
    border-radius:5px;
    box-shadow:0px 0px 10px rgba(19,26,47,0.2);
}
#sucessinvestmentpop>.pop-wrapper>.pop-container>.close-icon{
    position: absolute;
    height: 36px;
    width: 36px;
    top: -18px;
    right: -18px;
    background: url('../../static/img/close_icon.png') no-repeat;
    background-size: 100% 100%;
}
#sucessinvestmentpop>.pop-wrapper>.pop-container>.sucess-icon{
    position: absolute;
    width: 94px;
    height: 110px;
    top: 60px;
    left: 50%;
    margin-left: -47px;
    background: url('../../static/img/success_icon.png') no-repeat;
    background-size: 100% 100%;
}
#sucessinvestmentpop>.pop-wrapper>.pop-container>.title{
    position: absolute;
    width: 120px;
    top: 209px;
    left: 50%;
    margin-left: -60px;
    text-align: center;
    font-size:24px;
    font-family:MicrosoftYaHei;
    font-weight:400;
    color:rgba(255,255,255,1);
}
#sucessinvestmentpop>.pop-wrapper>.pop-container>.summary{
    position: absolute;
    width: 340px;
    top: 272px;
    left: 50%;
    margin-left: -170px;
    text-align: center;
    font-size:16px;
    font-family:MicrosoftYaHei;
    font-weight:400;
    color:rgba(144,153,186,1);
}
</style>
