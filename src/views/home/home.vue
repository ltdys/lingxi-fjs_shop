<template>
  <div  class="page-home">
    <van-swipe :autoplay="3000" indicator-color="white" >
        <van-swipe-item v-for="(image, index) in images" :key="index">
          <img class="w-100" :src="image"/>
        </van-swipe-item>
    </van-swipe>
    <home-navs></home-navs>
    <home-message></home-message>
    <home-hot-shop></home-hot-shop>
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
        'static/images/banner.png',
        'static/images/banner.png',
      ]
    };
  }
};
</script>
<style lang="scss">
.page-home {
  background: #fff;
  padding: 0.2rem 0.3rem;
  .mint-swipe {
    height: 3rem;
    // width: 690px;
    // margin: 20px auto;
  }
}
</style>

