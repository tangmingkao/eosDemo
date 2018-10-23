
const state = {
    isLogin: false, //是否已经登陆
    villageHomeShow: false, //人人坐庄home页
    villageDetailShow: false, //人人坐庄详情页
    investRecordsShow: false, //投资记录页
    friendRecordsShow: false, //好友返利列表页
    sucessDivestmentShow: false, //成功撤资页
    sucessWithdrawalShow: false, //成功提现页
    sucessInvestShow: false, //投资成功页
    inviteFriendShow: false, //邀请好友页
    inviteFriendLink: '', //游戏主页链
    inviteName: '', //邀请人的用户名
    userName: '', //用户账号

    homeComponentShow: true, //展示主页
    homeRightShow: true, //展示主页右边排名部分

    gameCenterShow: false, //展示游戏中心   
    commonProblemShow: false, //展示常见问题
    aboutUsShow: false, //展示关于我们

    coinGameShow: true, //游戏中心默认展示抛硬币游戏
    rollGameShow: false, //游戏中心默认不展示过山车游戏

    coinCenterShow: true, //硬币游戏中心展示
    coinRightShow: true, //硬币游戏右边展示
    rollerCoasterCenterShow: false, //过山车中心展示
    rollerCoasterRightShow: false, //过山车右边展示

    eosClient: null, // 用来获取区块链只读数据
    scatter: null,  
    scatterEosClient: null, // 用来创建签名。
    scatterIdentify: null, //scatter 身份ID。
    //抛硬币数据
    historyList: [], //历史数据列表,游戏数据
    myHistoryList: [], //我的游戏历史数据
    zeroItemId: 0, //我的历史记录的第一条的id.
    //过山车数据
    rollHistoryList: [], //历史数据列表,游戏数据
    rollMyHistoryList: [], //我的游戏历史数据
    rollZeroItemId: 0, //我的历史记录的第一条的id.

    popupOnBetShow: false,
    accountBlance: 0, //账户余额

    loginText: '登錄Scatter',  //登陆按钮文字
    logoutText: '沒有Scatter？',    //退出按钮文字
    hasNoScatter: false,

    //抛硬币和过山车的account表中的数据
    commonCoinObj: null,
    commonRollObj: null,
    //抛硬币和过山车的gbdata表中的数据
    gbdataCoinObj: null,
    gbdataRollObj: null,

    // 定义一种数据结构.导航栏.
    navList: [
        {
            id: 1,
            name: 'home',
            className1: 'aside-icon1',
            className2: 'bside-icon1',
            selected: true,
        },
        {
            id: 2,
            name: 'gameCenter',
            className1: 'aside-icon2',
            className2: 'bside-icon2',
            selected: false,
        },
        {
            id: 3,
            name: 'commonProblem',
            className1: 'aside-icon3',
            className2: 'bside-icon3',
            selected: false,
        },
        {
            id: 4,
            name: 'aboutUs',
            className1: 'aside-icon4',
            className2: 'bside-icon4',
            selected: false,
        },
    ],

};

export default state;