import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
    mode: 'history',
    routes: [
        
        {
            path: '/',
            name: 'HomeComponent',
            component(resolve) {
                require.ensure(['../views/HomeComponent.vue'], () => {
                    resolve(require('../views/HomeComponent.vue'))
                })
            },
        },
        {
            path: '/gamecenter',
            name: 'GameCenter',
            component(resolve) {
                require.ensure(['../views/GameCenter.vue'], () => {
                    resolve(require('../views/GameCenter.vue'))
                })
            },
        },
        {
            path: '/gamecenter/rollgame',
            name: 'RollGame',
            component(resolve) {
                require.ensure(['../views/RollGame.vue'], () => {
                    resolve(require('../views/RollGame.vue'))
                })
            },
        },
        {
            path: '/commonproblem',
            name: 'CommonProblem',
            component(resolve) {
                require.ensure(['../views/CommonProblem.vue'], () => {
                    resolve(require('../views/CommonProblem.vue'))
                })
            },
        },
        {
            path: '/aboutus',
            name: 'AboutUs',
            component(resolve) {
                require.ensure(['../views/AboutUs.vue'], () => {
                    resolve(require('../views/AboutUs.vue'))
                })
            },
        },
        
    ]
})
