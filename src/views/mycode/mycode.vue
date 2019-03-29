<template>
  <com-page>
    <com-header title="我的二维码" is-back slot="header"></com-header>
    <div style="background-image:url('static/images/mycode-bg.jpg');background-size: 100%"
      class="mycode-wrap">
      <div id="qrcode" ref="qrcode" class="mycode-code"></div>
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
      
    };
  },
  created () {
    this.$nextTick (function () {
      this.qrcode();
    })
  },
  computed: {
    
  },
  methods: {
    qrcode () {
      // http://192.19.23.49:8000/#/team/register
      let url = window.location.href.split('#')[0] + '#/team/register'
      let qrcode = new QRCode('qrcode', {  
          width: 160,  // 设置宽度 
          height: 160, // 设置高度
          text: url
      })  
    },
  }
};
</script>

<style lang="scss" scoped>
  .mycode-wrap {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    .mycode-code {
      transform: skew(0deg, 0deg);
    }
  }
</style>


