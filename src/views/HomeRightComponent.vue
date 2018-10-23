/*
 * @Author: tonyTang 
 * @Date: 2018-10-18 19:34:33 
 * @Last Modified by: tonyTang
 * @Last Modified time: 2018-10-19 10:33:09
 */

<template>
    <div id="home-right-component" v-show="showPop">
        <div class="container">
            <div class="main-right">
                <FriendPoolHome v-if="computLogin" />
                <div class="history-part">
                    <TabChangeHome />
                    <div style="height: 30px;width: 100%;"></div>
                </div>
            </div>
        </div>        
    </div>
</template>

<script>

import FriendPoolHome from '../views/FriendPoolHome.vue'
import TabChangeHome from '../components/TabChangeHome.vue'

export default {
    components: {  
        FriendPoolHome,
        TabChangeHome,
    },
    computed: {
        showPop() {
            return this.$store.state.homeRightShow;
        },
        computLogin() {
            return this.$store.state.isLogin;
        },
    },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style type="text/css" scopped>
#home-right-component{
    width: 100%;
    height: 100%;
}
#home-right-component>.container{
    height: 100%;
    width: 100%;
}

#home-right-component>.container>.main-right{
    height: 100%;
    width: 100%;
    background: linear-gradient(0deg,rgba(38,49,60,1),rgba(70,74,91,1));
}

#home-right-component>.container>.main-right>.history-part{
    width: 100%;
}
</style>
