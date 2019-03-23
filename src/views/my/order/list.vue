<template>
	<com-page>
    <template slot="header">
		  <com-header title="我的订单" is-back></com-header>
      <van-tabs v-model="active" @change="changeItem" swipeable>
        <van-tab :title="tab.title" v-for="tab in tabs" :key="tab.value">
        </van-tab>
      </van-tabs>
    </template>

    <van-panel v-for="i in 3" :key="i" 
    title="2018-09-09 12:22" status="待付款" class="goods-panel">
      <van-card @click.native="$router.push('/my/order/1')"
          num="2"
          price="2.00"
          desc="描述信息"  
          title="商品标题"
          :thumb="imageURL"
        >
      </van-card>
      <div slot="footer" v-if="i==1">
        <van-button size="small">取消订单</van-button>
        <van-button size="small" type="danger" plain>支付订单</van-button>
      </div>
      <div slot="footer" v-if="i==2">
        共3件商品 合计:¥<span class="fs-16">{{3|number}}</span>
      </div>
      <div slot="footer" v-if="i==3">
        <van-button size="small">删除订单</van-button>
      </div>
    </van-panel>
	</com-page>
</template>

<script>
import { Card, Panel } from "vant";

export default {
  components: {
    [Card.name]: Card,
    [Panel.name]: Panel
  },
  data() {
    return {
      active: +this.$route.query.tab || 0,
      imageURL: "static/images/banner.png",
      tabs: [
        { title: "全部", value: 0 },
        { title: "待付款", value: 1 },
        { title: "待发货", value: 2 },
        { title: "已发货", value: 3 }
      ]
    };
  },
  methods: {
    changeItem(item) {}
  }
};
</script>

<style lang="scss">
.goods-panel {
  .van-panel__header{
    .van-cell__title{
      color: #666;
    }
  }
  .van-panel__footer {
    text-align: right;
  }
  &:not(:first-child) {
    margin-top: 15px;
  }
}
</style>
