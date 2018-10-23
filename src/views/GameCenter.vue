<template>
  <div id="game-center" v-show="showPop1" >
      <CoinGame v-show="computCoinGameShow" />
      <RollGame v-show="computRollGameShow" />
      <GameList @goCoinGame="goCoinGame" @goRollerCenter="goRollerCenter" />
  </div>
</template>

<script>
import * as Mutations from '../store/constants'
import CoinGame from '../views/CoinGame.vue'
import RollGame from '../views/RollGame.vue'
import GameList from '../views/GameList.vue';
export default {
    components: {
        CoinGame,
        RollGame,
        GameList,
    },
    data() {
        return {
            whichGame: 'coinGame', //那个游戏
            shareName: "", // 分享的参数
        };
    },
    computed: {
        showPop1() {
            return this.$store.state.gameCenterShow;
        },
        computCoinGameShow(){
            return this.$store.state.coinGameShow;
        },
        computRollGameShow(){
            return this.$store.state.rollGameShow;
        },
    },
    created(){
        this.whichGame = sessionStorage.getItem('whichGame') || 'coinGame';
        console.log( this.whichGame);
        this.shareName = sessionStorage.getItem("shareName");
    },
    mounted() {
        //判断在没关闭浏览器的情况下，上次选中的是那个游戏  (注意： 需要对游戏的判断放在导航之后，不然会路由错误),默认抛硬币。
        if(this.whichGame == 'coinGame'){
            this.$store.commit(Mutations.SET_COINGAMESHOW,true);
            this.$store.commit(Mutations.SET_ROLLGAMESHOW,false);
            this.$router.push({
                path: '/gamecenter',
                query: this.shareName ? { shareName: this.shareName } : ""
            });
        } else {
            this.$store.commit(Mutations.SET_ROLLGAMESHOW,true);
            this.$store.commit(Mutations.SET_COINGAMESHOW,false);
            this.$router.push({
                path: '/gamecenter/rollgame',
                query: this.shareName ? { shareName: this.shareName } : ""
            });
        }
    },
    methods: {
        goCoinGame() {
            this.$store.state.homeComponentShow = false;
            this.$store.state.gameCenterShow = true;
            this.$store.state.coinCenterShow = true;
        },
        goRollerCenter() {
            this.$store.state.homeComponentShow = false;
            this.$store.state.gameCenterShow = true;
            this.$store.state.rollerCoasterCenterShow = true;
        },
    },  
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style type="text/css" lang="less" scopped>
  #game-center {
    width: 100%;
    height: 100%;
  }

  @media (max-width: 600px) {
    #game-center {
        min-width: 400px;
    }
  }
</style>