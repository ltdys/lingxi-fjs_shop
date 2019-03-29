<template>
  <com-page>
    <com-header title="我的二维码" is-back slot="header"></com-header>
    <div>
      我的二维码页面
    </div>
    <div id="qrcode" ref="qrcode"></div>
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
          width: 232,  // 设置宽度 
          height: 232, // 设置高度
          text: url
      })  
    },
  }
};
</script>
