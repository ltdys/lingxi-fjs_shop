<template>
  <div  class="page-home">
    <van-swipe :autoplay="3000" indicator-color="white" >
        <van-swipe-item v-for="(image, index) in images" :key="index">
          <img class="w-100 h-225" :src="image"/>
        </van-swipe-item>
    </van-swipe>
    <div class="page-home-middle">
      <home-message></home-message>
      <home-navs></home-navs>
      <div class="page-hint"></div>
      <home-hot-shop></home-hot-shop>
    </div>
  </div>
</template>

<script>
import homeNavs from "./components/navs";
import homeMessage from "./components/message";
import homeHotShop from "./components/hotShop";
export default {
  components: {
    homeNavs,
    homeMessage,
    homeHotShop
  },
  data() {
    return {
      images: [
        'static/images/banner.jpg',
        'static/images/banner1.jpg',
      ]
    };
  }
};
</script>
<style lang="scss" scoped>
.page-home {
  padding-bottom: 25px;
  background: #FFF;
  // background: #F8F8F8;
  // padding: 0.2rem 0.3rem;
  .mint-swipe {
    height: 225px;
    // width: 690px;
    // margin: 20px auto;
  }
  img{
    display: block;
  }
}
.page-hint{
  width: 100%;
  height: 15px;
  background: #F8F8F8;
}
// .page-home-middle {
//   padding: 0 15px; 
// }
</style>