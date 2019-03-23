<template>
	<com-page>
    <com-header slot="header" title="订单详情" is-back></com-header>

    <div class="order-detail__status">
      <div>订单状态：待付款</div>
      <div class="fs-12">剩10小时22分钟自动关闭</div>
    </div>
    <van-cell-group>
      <van-cell icon="location" class="select-location">
        <div>{{address.name}} 
          <span>{{address.tel | phone}}</span>
        </div>
        <div class="select-location__address">{{address.address}}</div>
      </van-cell>
    </van-cell-group>
    <van-cell-group class="flex5">
      <van-cell title="物流单号">
        <span>1312312312312312</span>
        <van-button size="mini">复制</van-button>
      </van-cell>
    </van-cell-group>
    <van-cell-group>
      <van-card @click.native="$router.push('/my/order/1')"
          num="2"
          price="2.00"
          desc="描述信息"  
          title="商品标题"
          :thumb="imageURL"
        >
      </van-card>
      <van-card @click.native="$router.push('/my/order/1')"
          num="1"
          tag="赠品"
          desc="描述信息"  
          title="商品标题"
          :thumb="imageURL"
        >
      </van-card>
    </van-cell-group>
      <van-panel title="订单信息">
        <ul class="order-detail_info">
          <li>订单编号 : avasd12321321321321</li>
          <li>创建时间 : 2018-09-09 09:09</li>
          <li>付款时间 : 2018-09-09 09:09</li>
        </ul>
        <template slot="footer">
          <div class="order-detail__actions" v-if="i==1">
            <van-button size="small">取消订单</van-button>
            <van-button size="small" type="danger" plain>支付订单</van-button>
          </div>
          <div class="order-detail__actions" v-if="i==2">
            共3件商品 合计:¥<span class="fs-16">{{3|number}}</span>
          </div>
          <div class="order-detail__actions" v-if="i==3">
            <van-button size="small">删除订单</van-button>
          </div>
        </template>
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
      i: 1,
      imageURL: "static/images/banner.png",
       address:{
        name:'王大锤',
        tel:'12312312',
        address:'XXXXXXXXXX'
      }
    };
  },
  methods: {
    changeItem(item) {}
  }
};
</script>

<style lang="scss">
.select-location{
  align-items: center;
  .van-icon-location{
    color: #ec9300;
    font-size: 24px;
  }
  &__address{
    font-size: 12px;
    color: #666;
  }
}
.order-detail {
  &__status {
    background: #ec9300;
    color: #fff;
    padding: 15px;
  }
  &__actions {
    text-align: right;
  }
  &_info{
    padding: 10px 15px;
    font-size: 12px;
    color: #666;
    line-height: 2;
  }
}
</style>
