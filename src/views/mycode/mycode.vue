<template>
  <com-page>
    <com-header title="我的二维码" is-back slot="header"></com-header>
    <div class="wrap">
      <div>
        <img src="static/images/mycode-bg.jpg" alt="" class="mocode-bg">
      </div>
      <div class="mycode-wrap">
        <div id="qrcode" ref="qrcode" class="mycode-code"></div>
      </div>
    </div>
  </com-page>
</template>

<script>
import QRCode from 'qrcodejs2'
export default {
  components: {
    QRCode
  },
  data() {
    return {
      userInfo: ''
    };
  },
  created () {
    this.userInfo = JSON.parse(this.$store.getters.getUserInfo) || ''
    this.$nextTick (function () {
      this.qrcode();
    })
  },
  computed: {
    
  },
  methods: {
    qrcode () {
      // http://192.19.23.49:8000/#/team/register
      let url = window.location.href.split('#')[0] + '#/team/register?mobile='
        + this.userInfo.mobile + '&realname=' + this.userInfo.realname
      let qrcode = new QRCode('qrcode', {  
          width: 122,  // 设置宽度 
          height: 122, // 设置高度
          text: url
      })  
    },
  }
};
</script>

<style lang="scss" scoped>
  .wrap {
    height: 100%;
    background: #87D0F3;
  }
  .mycode-wrap {
    width: 100%;
    // height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    .mycode-code {
      position: absolute;
      top: 380px;
      // transform: rotate(-30deg) skew(30deg) scale(0.6) translate(28px);
      // transform: skew(15deg, 0deg);
    }
  }
  .mocode-bg {
    width: 100%;
    // height: calc(100vh - 0.92rem - 1rem);
  }
</style>