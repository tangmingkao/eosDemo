import Vue from 'vue'
import Vuex from 'vuex'

import state from './state'
import getters from './getters'
import mutations from './mutations'
import actions from './actions'
import demo from './modules/demo'

Vue.use(Vuex)

export default new Vuex.Store({
    state,
	actions,
    getters,
    mutations,
	modules: {
        demo,
    },
});