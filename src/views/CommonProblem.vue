/*
 * @Author: tonyTang 
 * @Date: 2018-10-16 19:02:12 
 * @Last Modified by:   tonyTang 
 * @Last Modified time: 2018-10-16 19:02:12 
 */

<template>
  <div id="common-problem" v-show="showPop">
    <div class="container">
      <div class="text-container">
        <el-collapse v-model="activeNames" @change="handleChange">
          <el-collapse-item :title="title1" name="1">
            <div>{{$t("commonproblem.answer11")}}</div>
            <div>{{$t("commonproblem.answer12")}}</div>
          </el-collapse-item>
          <el-collapse-item :title="title2" name="2" style="margin-top: 20px;">
            <div>{{$t("commonproblem.answer21")}}<a href="https://bihu.com/article/1303219" target="_blank" style="color: #8A7CE0;padding-left: 10px;">{{$t("commonproblem.scatterInstallation")}}
              </a></div>
            <div>{{$t("commonproblem.answer22")}}<a href="https://bihu.com/article/1305693" target="_blank" style="color: #8A7CE0;padding-left: 10px;">{{$t("commonproblem.eosRegister")}}</a></div>
            <div>{{$t("commonproblem.answer23")}}<a href=" https://bihu.com/article/1305759" target="_blank" style="color: #8A7CE0;padding-left: 10px;">{{$t("commonproblem.eosEmergency")}}</a></div>
          </el-collapse-item>
          <el-collapse-item :title="title3" name="3" style="margin-top: 20px;">
            <div>{{$t("commonproblem.answer31")}}</div>
          </el-collapse-item>
          <el-collapse-item :title="title4" name="4" style="margin-top: 20px;">
            <div>{{$t("commonproblem.answer41")}}</div>
          </el-collapse-item>
          <el-collapse-item :title="title5" name="5" style="margin-top: 20px;">
            <!-- <div>{{$t("commonproblem.answer51")}}</div> -->
            <div>{{$t("commonproblem.answer52")}}</div>
            <div>{{$t("commonproblem.answer53")}}</div>
          </el-collapse-item>
          <el-collapse-item :title="title6" name="6" style="margin-top: 20px;">
            <div>{{$t("commonproblem.answer61")}}</div>
            <div>{{$t("commonproblem.answer62")}}</div>
          </el-collapse-item>
          <el-collapse-item :title="title7" name="7" style="margin-top: 20px;">
            <div>{{$t("commonproblem.answer71")}}</div>
          </el-collapse-item>
          <el-collapse-item :title="title8" name="8" style="margin-top: 20px;">
            <div>{{$t("commonproblem.answer81")}}</div>
            <div>{{$t("commonproblem.answer82")}}</div>
            <div>{{$t("commonproblem.answer83")}}</div>
          </el-collapse-item>
          <el-collapse-item :title="title9" name="9" style="margin-top: 20px;">
            <div>{{$t("commonproblem.answer91")}}</div>
            <div>{{$t("commonproblem.answer92")}}</div>
            <div>{{$t("commonproblem.answer93")}}</div>
            <div>{{$t("commonproblem.answer94")}}</div>
            <div>{{$t("commonproblem.answer95")}}</div>
          </el-collapse-item>
        </el-collapse>
      </div>
    </div>
  </div>
</template>

<script>
export default {
    data() {
        return {
            activeNames: ['1'],
        };
    },
    computed: {
        showPop() {
            return this.$store.state.commonProblemShow
        },
        title1() {
            return this.$t("commonproblem.title1");
        },
        title2() {
            return this.$t("commonproblem.title2");
        },
        title3() {
            return this.$t("commonproblem.title3");
        },
        title4() {
            return this.$t("commonproblem.title4");
        },
        title5() {
            return this.$t("commonproblem.title5");
        },
        title6() {
            return this.$t("commonproblem.title6");
        },
        title7() {
            return this.$t("commonproblem.title7");
        },
        title8() {
            return this.$t("commonproblem.title8");
        },
        title9() {
            return this.$t("commonproblem.title9");
        },
    },
    methods: {
        handleChange(val) {
            console.log(val);
        }

    },
    
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style type="text/css" scopped>
  #common-problem {
    width: 100%;
    height: 100%;
  }

  #common-problem>.container {
    width: 100%;
    height: 100%;
    padding: 80px 160px 100px 90px;
    font-size: 24px;
    font-family: MicrosoftYaHei;
    font-weight: 400;
  }

  #common-problem>.container>.text-container {
    height: 100%;
    width: 100%;
    /* max-width: 1000px; */
    overflow-y: auto;
    overflow-x: hidden;
    text-align: left;
  }

  #common-problem>.container>.text-container::-webkit-scrollbar {
    display: none;
    /* height: 1px;
    width: 16px; */
  }

  #common-problem>.container>.text-container::-webkit-scrollbar-thumb {
    /* border-radius: 5px; */
    height: 8px;
    margin-left: 5px;
    -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
    background: rgba(91, 95, 120, 1);
  }

  #common-problem>.container>.text-container::-webkit-scrollbar-track {
    border-radius: 0;
  }
</style>

<style type="text/css" scopped>
  /* 重写element的tab切换样式 */

  .el-collapse {
    border-top: 0 solid #ebeef5 !important;
    border-bottom: 0 solid #ebeef5 !important;
  }

  .el-collapse-item__header {
    height: 48px;
    line-height: 48px;
    padding-left: 20px !important;
    color: #ffffff !important;
    cursor: pointer;
    border-bottom: 1px solid #465769 !important;
    font-size: 13px;
    font-weight: 500;
    -webkit-transition: border-bottom-color .3s;
    transition: border-bottom-color .3s;
    outline: 0;
  }

  item__header,
  .el-collapse-item__wrap {
    background: rgba(107, 113, 143, 0.3) !important;
    border-radius: 5px !important;
    box-shadow: 0px 0px 10px rgba(19, 26, 47, 0.3) !important;
    border-bottom: 1px solid #465769 !important;
  }

  .el-carousel__mask,
  .el-cascader-menu,
  .el-cascader-menu__item.is-disabled:hover,
  .el-collapse-item__header,
  .el-collapse-item__wrap {
    background: rgba(107, 113, 143, 0.3) !important;
    border-radius: 5px !important;
    box-shadow: 0px 0px 10px rgba(19, 26, 47, 0.3) !important;
  }

  .el-collapse-item__content {
    padding-bottom: 25px;
    font-size: 13px;
    color: #9099BA !important;
    line-height: 1.769230769230769;
    padding-left: 20px !important;
  }
</style>