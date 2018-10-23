<template>
  <div id="coin-game">
    <div class="container">
        <CoinCenter />
    </div>
    <div class="coin-center-right">
        <CoinRight />
    </div>
  </div>
</template>

<script>
import CoinCenter from './CoinCenter.vue';
import CoinRight from './CoinRight.vue';

export default {
    data() {
        return {
            username: '', // 用户账号
        };
    },
    components: {
        CoinCenter,
        CoinRight,
    },
    created() {
        this.username = sessionStorage.getItem('username');
    },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style type="text/css" lang="less" scopped>
#coin-game {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .container {
        min-width: 600px;
        width: 13.07rem;
        height: 100%;
    }
    .coin-center-right {
        min-width: 500px;
        height: 100%;
    }
}
@media (max-width: 1500px) {
    #coin-game {
        .container {
            min-width: 400px;
        }
    }
}
</style>