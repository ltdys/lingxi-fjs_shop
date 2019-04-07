<template>
  <com-page>
    <com-header title="我的二维码" is-back slot="header"></com-header>
    <div class="wrap">
      <div>
        <img src="static/images/mycode-bg.png" alt="" class="mocode-bg">
      </div>
      <div class="mycode-wrap">
        <div id="qrcode" ref="qrcode"></div>
        <div ref="qrcodeInfo">[&nbsp;扫码加入{{this.userInfo.userName || ''}}钻石圈&nbsp;]</div>
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
      userInfo: '',
      qrcodeWidth: 122,
      qrcodeHeight: 122
    };
  },
  mounted () {
    this.userInfo = JSON.parse(this.$store.getters.getUserInfo) || ''
    //获得网页可见区域宽高
    let cw = document.body.clientWidth
    let ch = document.body.clientHeight

    let qrcodeRefs = this.$refs.qrcode
    qrcodeRefs.style.position = 'absolute'
    qrcodeRefs.style.top = '50%'
    qrcodeRefs.style.border = '10px solid #fff'
    
    let qrcodeInfoRefs = this.$refs.qrcodeInfo
    qrcodeInfoRefs.style.position = 'absolute'
    qrcodeInfoRefs.style.color = '#CDC093'
    qrcodeInfoRefs.style.top = '80%'
    qrcodeInfoRefs.style.fontSize = '17px'
    qrcodeInfoRefs.style.letterSpacing = '3px'

    this.$nextTick (function () {
      this.qrcodeWidth = cw * 0.3288
      this.qrcodeHeight = this.qrcodeWidth
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
          width: this.qrcodeWidth,  // 设置宽度 
          height: this.qrcodeHeight, // 设置高度
          text: url
      })  
    },
  }
};
</script>

<style lang="scss" scoped>
  .wrap {
    height: 100%;
    background: #000;
  }
  .mycode-wrap {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .mocode-bg {
    width: 100%;
    height: calc(100vh - 0.92rem - 1rem);
  }
</style>