<template>
  <div id="roll-game">
    <div class="container">
        <RollerCoasterCenter />
    </div>
    <div class="roll-center-right">
        <RollerCoasterRight />
    </div>
  </div>
</template>

<script>
import RollerCoasterCenter from './RollerCoasterCenter.vue';
import RollerCoasterRight from './RollerCoasterRight.vue';

export default {
    data() {
        return {
            username: '', // 用户账号
        };
    },
    components: {
        RollerCoasterCenter,
        RollerCoasterRight,
    },
    created() {
        this.username = sessionStorage.getItem('username');
    },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style type="text/css" lang="less" scopped>
#roll-game {
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
    .roll-center-right {
        min-width: 500px;
        height: 100%;
    }
}
@media (max-width: 1500px) {
    #roll-game {
        .container {
            min-width: 400px;
        }
    }
}
</style>