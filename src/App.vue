<template>
  <div id="app">
    <!-- <router-view/> -->
    <Home v-if="isMounted"></Home>
  </div>
</template>

<script>
  import Eos from 'eosjs'
  import Home from './views/Home.vue';
  import * as Actions from './store/constants'
  
  import Plat from '../static/js/platform.js'
  const platForm = Plat.platForm;
  const isChrome = Plat.isChrome;
  
  export default {
    name: 'App',
    components: {
      Home,
    },
    data() {
      return {
        isMounted: false,
        comonConfig: null,
        coinConfig: null,
        rollConfig: null,
        scatter: null,
        eosClient: null,
      }
    },
    created() {
        this.comonConfig = this.$clone(this.$comonConfig);
        this.coinConfig = this.$clone(this.$coinConfig);
        this.rollConfig = this.$clone(this.$rollConfig);

        this.eosClient = Eos(this.comonConfig);
        this.$store.dispatch(Actions.SET_EOSCLIENT,this.eosClient);

        console.log(platForm,isChrome);
    },
    async mounted() {
        const that = this;
        const isPc = platForm == 'pc'
        if(isPc && !isChrome){
            //是pc，但是不是chrome浏览器
            this.isMounted = true;
        } else {
            await this.connectScatter().then(result => {
                console.log(result);
                that.$store.dispatch(Actions.SET_SCATTER,result);
            });
            //获取账户信息
            // this.eosClient.getAccount('happyeosking').then(result => {
            //     console.log(result);
            // });

            //如果是pc，并且是chrome浏览器，是否获取scatter完成
            this.isMounted = true;
        }
    },
    methods: {
      //连接scatter
      connectScatter() {
        let that = this;
        let connectScatterPromise = new Promise((resolve, reject) => {
          const connectionOptions = {
            initTimeout: 10000
          }
          ScatterJS.scatter.connect("Put_Your_App_Name_Here", connectionOptions).then(connected => {
            if (!connected) {
              console.log('----------not connected----------');
              reject();
              return false;
            }
            console.log('----------connected----------');
            // Use `scatter` normally now.
            let scatter = ScatterJS.scatter;
            ScatterJS.scatter = null;
            resolve(scatter);
          });
        });
        return connectScatterPromise;
      },
    },
  }
</script>

<style>
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
  }
</style>