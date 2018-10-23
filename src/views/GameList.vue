/**
* @Author:  chengzhaocheng
* @Date:  2018/9/27 20:20
* @Last Modified by:   chengzhaocheng
* @Last Modified by:   2018/9/27 20:20
*/
<template>
  <div class="game-content">
    <div class="eos-game1">
      <div class="game-icon icon1" />
      <div class="eos-game-center">
        <div class="game-title">{{ $t("homecomponent.gameTitle1") }}</div>
        <div class="game-summary">{{ $t("homecomponent.gameSummary1") }}</div>
      </div>
      <div
        class="game-button"
        @click="goCoinGame"
      >{{ $t("homecomponent.gameButton1") }}
      </div>
    </div>
    <div class="eos-game2">
      <div class="game-icon icon2" />
      <div class="eos-game-center">
        <div class="game-title">{{ $t("homecomponent.gameTitle2") }}</div>
        <div class="game-summary">{{ $t("homecomponent.gameSummary2") }}</div>
      </div>
      <div
        class="game-button"
        style="margin-top: 30px;"
        @click="goRollerGame"
      >{{ $t("homecomponent.gameButton2") }}
      </div>
    </div>
  </div>
</template>

<script>
import * as Mutations from '../store/constants'
export default {
    name: 'GameList',
    data() {
        return {
            test: 11,
            shareName: '', // 分享的参数
        };
    },
    created() {
        this.shareName = sessionStorage.getItem('shareName') || '';
    },
    methods: {
        goCoinGame() {
            this.$store.commit(Mutations.SET_COINGAMESHOW,true);
            this.$store.commit(Mutations.SET_ROLLGAMESHOW,false); 
            this.$emit('goCoinGame');
            this.$store.state.navList.forEach(val => {
                if (val.id == '2') {
                    val.selected = true;
                    sessionStorage.setItem('homeSelect', val.id);
                } else {
                    val.selected = false;
                }
            });
            this.$router.push({
                path: '/gamecenter',
                query: this.shareName ? { shareName: this.shareName } : '',
            });
        },
        goRollerGame() {
            // 暂时注释
            this.$emit('goRollerCenter');
            this.$store.state.navList.forEach(val => {
                if (val.id == '2') {
                    val.selected = true;
                    sessionStorage.setItem('homeSelect', val.id);
                } else {
                    val.selected = false;
                }
            });
            this.$router.push({
                path: '/gamecenter/rollgame',
                query: this.shareName ? { shareName: this.shareName } : '',
            });
            this.$store.commit(Mutations.SET_ROLLGAMESHOW,true);
            this.$store.commit(Mutations.SET_COINGAMESHOW,false);
        },
    },
};
</script>

<style type="text/css" scoped lang="less">
.game-content {
    display: none;
}
@media (max-width: 600px) {
    .game-content {
        display: block !important;
        height: 100% !important;
        color: white;
        padding-top: 3rem !important;
        .icon1 {
            background: url('../../static/img/game_one_logo1.png') no-repeat;
            background-size: 100% 100%;
        }
        .icon2 {
            background: url('../../static/img/game_one_logo2.png') no-repeat;
            background-size: 100% 100%;
        }
        .eos-game1,
        .eos-game2 {
            margin-left: 0.5rem !important;
            width: 18rem !important;
            padding: 0 0.5rem;
            background: rgba(107, 113, 143, 0.3);
            height: 4.5rem !important;
            display: flex !important;
            justify-content: space-between;
            align-items: center;
            .game-button {
                width: 3rem;
                height: 1.5rem;
                line-height: 1.5rem;
                margin: 0 !important;
                font-size: 0.7rem;
                border-radius: 0.1rem;
                background: linear-gradient(90deg, #9390fe, #8a7ce0);
            }
            .eos-game-center {
                .game-title {
                    margin: 0 !important;
                    font-size: 0.7rem;
                    text-align: left !important;
                    padding-left: 0.5rem;
                    width: 100% !important;
                }
                .game-summary {
                    width: 11rem;
                    text-align: left !important;
                    font-size: 0.55rem;
                    padding-left: 0.5rem;
                    margin: 0.5rem auto auto !important;
                }
            }
            .game-icon {
                margin-top: 0;
                width: 3rem !important;
                height: 3rem !important;
            }
        }
        .eos-game1 {
            margin-bottom: 1rem;
        }
    }
}
</style>
