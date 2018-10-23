
import Eos from 'eosjs'
import Config from '../../src/config/config'

var scatter = null;
var scatterEosClient = null;
var eosClient = null;
var account = null;
var isLogin = false;


(function (doc, win) {
    eosClient = Eos(Config);
    document.addEventListener('scatterLoaded',scatterExtension => {
        console.log('------------scatter ready---------');
        scatter = window.scatter;
        console.log(scatter);
        window.scatter = null;
        scatterEosClient = scatter.eos(Config.eosNetwork,Eos,Config.eosOptions,"http"); 
        //获取账户信息
        console.log(this.scatter.identity);
        if (this.scatter.identity && this.scatter.identity.accounts.length > 0) {
            account = this.scatter.identity.accounts.find(
                account => account.blockchain === "eos"
            );
            console.log('---------has login in --------------');
            console.log(account);
            isLogin = true;      
        } else {
            isLogin = false;
        }
    });
})(document, window)

export default {
    scatter: scatter,
    scatterEosClient: scatterEosClient,
    eosClient: eosClient,
    isLogin: isLogin
}