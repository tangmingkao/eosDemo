/*
 * @Author: tonyTang 
 * @Date: 2018-10-16 20:29:51 
 * @Last Modified by: tonyTang
 * @Last Modified time: 2018-10-17 09:29:17
 */

import state from './state'

const getters = {
    navListComputed: () => {
        return state.navList;
    },
};
 
export default getters;