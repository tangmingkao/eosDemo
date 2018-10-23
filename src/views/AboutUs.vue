/*
 * @Author: tonyTang 
 * @Date: 2018-10-16 19:02:36 
 * @Last Modified by: tonyTang
 * @Last Modified time: 2018-10-16 19:02:57
 */

<template>
  <div id="about-us" v-show="showPop">
    <div class="container">
      <div class="text-container">
        <div class="about-title">{{$t("aboutus.title")}}</div>
        <div class="about-content">
          <p>{{$t("aboutus.content1")}}</p>
          <p>{{$t("aboutus.content2")}}</p>
          <p>{{$t("aboutus.content3")}}</p>
          <p class="s-title">{{$t("aboutus.content4")}}</p>
          <p>{{$t("aboutus.content5")}}</p>
          <p>{{$t("aboutus.content6")}}</p>
          <p class="s-title">{{$t("aboutus.content7")}}</p>
        </div>
        <div class="about-cooperation">
          <div class="icon1"></div>
          <div class="icon2"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
    data() {
        return {
           
        };
    },
    computed: {
        showPop() {
            return this.$store.state.aboutUsShow
        },
    },
    methods: {
       
    },
    
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style type="text/css" scopped lang="less">
  @color_1: rgba(232, 233, 255, 1);
  @color_2: rgba(144, 153, 186, 1);
  @color_3: white;
  @font_family_1: MicrosoftYaHei;

  #about-us {
    width: 100%;
    height: 100%;
    .container {
      width: 100%;
      height: 100%;
      padding: 80px 160px 100px 90px;
      font-size: 24px;
      font-family: @font_family_1;
      font-weight: 400;
      text-align: left;

      .text-container {
        height: 100%;
        width: 100%;
        padding-top: 1px;
        background: rgba(107, 113, 143, 0.3);
        border-radius: 5px;
        box-shadow: 0px 0px 10px rgba(19, 26, 47, 0.3);

        .about-title {
          width: 540px;
          margin: 40px auto 30px auto;
          text-align: center;
          font-size: 36px;
          font-weight: 400;
          color: @color_1;
        }

        .about-content {
          width: 90%;
          margin: 0 auto;
          text-align: left;
          font-size: 16px;
          font-weight: 400;
          color: @color_2;

          p {
            font-size: 16px;
            font-weight: 400;
            margin-top: 10px;
            color: @color_2;
          }
        }

        .about-cooperation {
          width: 90%;
          height: 114px;
          margin: 15px auto 0 auto;
          display: flex;
          justify-content: flex-start;
          align-items: center;

          .icon1 {
            height: 100%;
            width: 328px;
            border-radius: 10px;
            background: url('../../static/img/eostoken.png') no-repeat;
            background-size: 100% 100%;
          }

          .icon2 {
            height: 100%;
            width: 328px;
            margin-left: 20px;
            border-radius: 10px;
            background: url('../../static/img/scatten.png') no-repeat;
            background-size: 100% 100%;
          }
        }
      }
    }
  }

  .s-title {
    font-size: 18px;
    color: @color_3;
  }
</style>