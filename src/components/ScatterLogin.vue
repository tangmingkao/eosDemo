/*
 * @Author: tonyTang 
 * @Date: 2018-10-18 13:49:19 
 * @Last Modified by: tonyTang
 * @Last Modified time: 2018-10-19 20:55:38
 */

<template>
    <div id="login-component">
        <div class="left" v-bind:class="{ 'need-login': !computLogin }" @click="loginScatter">                     
            <div id="login-text">{{computLoginText}}</div>
            <div id="login-icon" v-show="!computLogin"></div>
        </div>
        <div class="right" @click="loginOut">{{computLoginOutText}}</div>
    </div>
</template>

<script>
import Eos from 'eosjs'
import * as Mutations from '../store/constants'
import Plat from '../../static/js/platform.js'
const platForm = Plat.platForm;
const isChrome = Plat.isChrome;
export default {
    data() {
        return { 
            comonConfig: null,
            coinConfig: null,
            rollConfig: null,
            eosClient: null,  // 用来获取区块链只读数据，不需要通过scatter
            scatter: null, //scatter
            scatterEosClient: null, // 用来创建签名。转账需要用这个

            loginText: this.$t("login.loginText1"),
            logoutText: this.$t("login.loginText2"),
            username: '', //用户名
        };
    },
    computed: {
        computLoginText(){
            return this.$store.state.loginText;
        },
        computLoginOutText(){
            return this.$store.state.logoutText;
        },
        computLogin(){
            return this.$store.state.isLogin;
        },
        computScatter(){
            return this.$store.state.scatter;
        },
    },
    created() {
        this.comonConfig = this.$clone(this.$comonConfig);
        this.coinConfig = this.$clone(this.$coinConfig);
        this.rollConfig = this.$clone(this.$rollConfig);
        this.eosClient = Eos(this.comonConfig);

        this.username = sessionStorage.getItem('username');
        if(this.username){
            this.$store.commit(Mutations.SET_LOGINTEXT,this.username);
            this.$store.commit(Mutations.SET_LOGINOUTTEXT,this.$t("login.loginOutText"));
            this.$store.commit(Mutations.SET_LOGINSTATUS,true);
            this.$store.commit(Mutations.SET_USERNAME,this.username);
        }      
    },
    mounted() {
        let that = this;
        if(that.computScatter){
            that.scatterEosClient = that.computScatter.eos(that.comonConfig.eosNetwork,Eos,that.comonConfig.eosOptions,"http"); 
        }  
        console.log(that.scatterEosClient);
    },
   
    methods: {
        //登陆scatter
        loginScatter(){
            let that = this;
            //如果不是chrome并且是pc端才弹出.
            if (that.platForm == 'pc' && !that.isChrome) {
                that.$confirm(
                    that.$t('common.onlySupportChrome'),
                    that.$t('common.supportChromeTip'),
                    {type: 'warning' },
                ).then(() => {

                }).catch(() => {

                });
                return;
            }
            
            //chrome 如果没有下载scatter跳转scatter插件下载
            if(!this.computScatter){
                window.open('https://chrome.google.com/webstore/detail/scatter/ammjpmhgckkpcamddpolhchgomcojkle');
                return;
            }
            
            //获取身份标识
            that.computScatter.getIdentity({
                accounts: [that.comonConfig.eosNetwork],
            }).then(identity => {
                if (identity && identity.accounts.length > 0) {
                    let account = identity.accounts.find(
                        account => account.blockchain === "eos"
                    );
                    that.username = account.name;
                    sessionStorage.setItem('username',that.username);
                    that.$store.commit(Mutations.SET_LOGINTEXT,that.username);
                    that.$store.commit(Mutations.SET_LOGINOUTTEXT,that.$t("login.loginOutText"));
                    that.$store.commit(Mutations.SET_LOGINSTATUS,true);
                    that.$store.commit(Mutations.SET_USERNAME,that.username);
                }
            }).catch(error => {
                console.log(error);
            });
        },
        //退出登陆
        loginOut(){
            let that = this;
            if(that.computLoginOutText == that.$t("login.loginOutText")){
                console.log('-----------login out----------');
                if(that.computScatter && that.computScatter.identity){
                    that.computScatter.forgetIdentity().then(() => {
                        that.username = '';
                        that.$store.commit(Mutations.SET_LOGINTEXT,that.$t("login.loginText1"));
                        that.$store.commit(Mutations.SET_LOGINOUTTEXT,that.$t("login.loginText2"));
                        that.$store.commit(Mutations.SET_LOGINSTATUS,false);
                        that.$store.commit(Mutations.SET_USERNAME,that.username);
                        sessionStorage.setItem('username',that.username);
                    });
                }
            } else {
                const h = that.$createElement;
                this.$notify({
                    title: that.$t("login.noScatterTitle"),
                    message: h('i', { style: 'color: black'}, that.$t("login.noScatterContent"))
                });
            }   
        },
    },
    
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style type="text/css" scopped>
#login-component {
    height: 100%;
    width: 100%;
    display: flex;
    justify-content: flex-start;
    align-items: center;
}
#login-component > .right {
    height: 49px;
    margin-left: 20px;
    margin-right: 50px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    font-size: 14px;
    font-family: MicrosoftYaHei;
    font-weight: 400;
    color: rgba(132, 144, 177, 1);
    cursor: Pointer;
    white-space: nowrap;
}
@media (max-width: 1100px) {
    #login-component > .right {
        display: none;
    }
}
#login-component > .left {
    height: 49px;
    margin-left: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    white-space: nowrap;
}
.need-login {
    cursor: pointer;
    background: rgba(71, 82, 100, 1);
    border-radius: 5px;
    box-shadow: 5px 0px 60px rgba(45, 51, 63, 0.3);
    padding: 0 20px;
}
#login-text {
    font-size: 16px;
    /* color:rgba(232,233,255,1); */
    color: #e8e9ff;
    padding: 0 .1rem 0 .1rem;
}
#login-icon {
    height: 16px;
    width: 20px;
    margin-left: 10px;
    background: url('../../static/img/home_ganme_more.png') no-repeat;
    background-size: 100% 100%;
}

</style>
