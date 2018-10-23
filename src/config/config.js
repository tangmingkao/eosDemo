export default {
    //test 配置
    testConfig: {
        //公共配置
        comonConfig: {
            mainToken: 'EOS', // 主网代币，永远是EOS, 不会变
            tokenContract: 'eosio.token', //  系统合约
            keyProvider: ['5JaFjQ7vnAirFi5LDhLVKW2LjN1EdoSGQXEgphR3pBNcysAG4GF'],
            httpEndpoint: 'http://172.17.2.136:8888',
            eosNetwork: {
                blockchain: 'eos',
                host: '172.17.2.136',
                port: 8888,
                chainId: 'cf057bbfb72640471fd910bcb67639c22df9f92470936cddc1ade0e2f2e7dc4f',
                protocol: 'http',
            },
            eosOptions: {
                broadcast: true,
                sign: true,
                chainId: 'cf057bbfb72640471fd910bcb67639c22df9f92470936cddc1ade0e2f2e7dc4f',
                httpEndpoint: 'http://172.17.2.136:8888',
            },

        },
        //抛银币游戏配置
        coinConfig: {
            gameContract: 'a4', //  游戏合约名
            toContract: 'a4', //  合约拥有者
        },
        //过山车游戏配置
        rollConfig: {
            gameContract: 'gsc.code', // 游戏合约名
            toContract: 'gsc.code', // 合约拥有者
        },
    },
    //production线上配置
    productionConfig: {
        //公共配置
        comonConfig: {
            mainToken: 'EOS', // 主网代币，永远是EOS, 不会变
            tokenContract: 'eosio.token', //  系统合约
            httpEndpoint: 'https://api1.eosasia.one:443',
            eosNetwork: {
                blockchain: 'eos',
                host: 'api1.eosasia.one',
                port: 443,
                chainId: 'aca376f206b8fc25a6ed44dbdc66547c36c6c33e3a119ffbeaef943642f0e906',
                protocol: 'https'
            },
            eosOptions: {
                broadcast: true,
                sign: true,
                chainId: 'aca376f206b8fc25a6ed44dbdc66547c36c6c33e3a119ffbeaef943642f0e906',
                httpEndpoint: 'https://api1.eosasia.one:443'
            },
        },
        // comonConfig: {
        //     mainToken: 'EOS', // 主网代币，永远是EOS, 不会变
        //     tokenContract: 'eosio.token', //  系统合约
        //     keyProvider: ['5JaFjQ7vnAirFi5LDhLVKW2LjN1EdoSGQXEgphR3pBNcysAG4GF'],
        //     httpEndpoint: 'http://172.17.2.136:8888',
        //     eosNetwork: {
        //         blockchain: 'eos',
        //         host: '172.17.2.136',
        //         port: 8888,
        //         chainId: 'cf057bbfb72640471fd910bcb67639c22df9f92470936cddc1ade0e2f2e7dc4f',
        //         protocol: 'http',
        //     },
        //     eosOptions: {
        //         broadcast: true,
        //         sign: true,
        //         chainId: 'cf057bbfb72640471fd910bcb67639c22df9f92470936cddc1ade0e2f2e7dc4f',
        //         httpEndpoint: 'http://172.17.2.136:8888',
        //     },

        // },
        //抛银币游戏配置
        coinConfig: {
            gameContract: '214odicedice', //  游戏合约名
            toContract: '214odicedice', //  合约拥有者
        },
        //过山车游戏配置
        rollConfig: {
            gameContract: 'gsc.code', // 游戏合约名
            toContract: 'gsc.code', // 合约拥有者
        },
    }
};
