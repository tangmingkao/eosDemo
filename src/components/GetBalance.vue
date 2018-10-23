/*
 * @Author: tonyTang 
 * @Date: 2018-10-18 13:49:19 
 * @Last Modified by: tonyTang
 * @Last Modified time: 2018-10-19 21:08:01
 */

<template>
    <div id="getbalance-component"></div>
</template>

<script>
import Eos from 'eosjs'
import * as Mutations from '../store/constants'
export default {
    data() {
        return { 
            comonConfig: null,
            eosClient: null,  // 用来获取区块链只读数据，不需要通过scatter
            username: '', //用户名
        };
    },
    computed: {
        computUsername(){
            return this.$store.state.userName || '';
        },
    },
    created() {
        this.comonConfig = this.$clone(this.$comonConfig);
        this.eosClient = Eos(this.comonConfig);
        this.username = sessionStorage.getItem('username');  
        if(this.username){
            this.$store.commit(Mutations.SET_USERNAME,this.username);
        }
    }, 
    mounted() {
        let that = this;
        setInterval(() => {
            that.getUserBalance();
        },2000);
    },  
    methods: {
        //获取账户余额
        getUserBalance() { 
            let that = this;
            if(that.computUsername){
                that.eosClient.getCurrencyBalance({
                    code: that.comonConfig.tokenContract,
                    account: that.computUsername,
                    symbol: that.comonConfig.mainToken,
                }).then(result => {
                    // console.log(result);
                    that.$store.state.accountBlance = result[0];
                });
            } else {
                that.$store.state.accountBlance = 0;
            }
        }
    },
    
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style type="text/css" scopped>

</style>
