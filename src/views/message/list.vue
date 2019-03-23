<template>
	<com-page>
		<com-header title="消息列表" is-back slot="header"></com-header>
    <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="loadBottom">
      <ul class="message">
        <li class="message-item" v-for="(item,i) in resultList" :key="i" @click="$router.push('/message/1')">
          <div class="message__title">电力（代码：CEPL）价格变动</div>
          <div class="message__date">2019-03-03 21:11</div>
          <div class="message__img">
            <img src="static/images/banner.png"/>
          </div>
          <div class="message__desc">各位朋友们，近期商品价格变动频繁，请小心购买，一旦购买，不能退换</div>
        </li>
      </ul>
    </van-list>
	</com-page>
</template>

<script>
import { list_mixins } from "@/mixins";

export default {
  mixins: [list_mixins],
  data(){
    return {
    }
  },
  methods: {
  }
};
</script>

<style lang="scss">
.message{
  padding: 10px;
  .message-item{
    padding: 10px;
    background: #fff;
    border-radius: 5px;
    &+.message-item{
      margin-top:10px;
    }
  }
  &__title{
    font-size: 14px;
  }
  &__date{
    font-size: 12px;
    color: #999;
    margin-bottom: 10px;
  }
  &__img{
    img{
      width: 100%;
    }
  }
  &__desc{
    font-size: 12px;
  }
}
</style>
