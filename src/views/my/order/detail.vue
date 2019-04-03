<template>
	<com-page>
    <com-header slot="header" title="订单详情" is-back></com-header>

    <div class="order-detail__status">
      <div>订单状态：{{ orderDetail.status }}</div>
      <!-- <div class="fs-12" v-if="orderDetail.state == '1'">剩{{ surplusTime | timeDate1 }}自动关闭</div> -->
    </div>
    <!-- <van-cell-group>
      <van-cell icon="location" class="select-location" :is-link="orderDetail.status == '待付款'" @click="jumpAddress">
        <div v-if="Object.keys(currentAddress).length != 0">
          <div>
            <span>{{currentAddress.name}}</span>
            <span>{{currentAddress.tel | phone}}</span>
          </div>
          <div class="select-location__address">{{currentAddress.address}}</div>
        </div>
        <div v-else>请选择收货地址</div>
      </van-cell>
    </van-cell-group> -->
    <van-cell-group class="flex5">
      <van-cell title="订单编号">
        <span>{{ orderDetail.orderno }}</span>
        <van-button
          type="default"
          size="mini"
          plain
          hairline
          class="order_copy"
          v-clipboard:copy="orderDetail.orderno"
          v-clipboard:success="onCopy"
          v-clipboard:error="onError">复制</van-button>
      </van-cell>
    </van-cell-group>
    <van-cell-group>
      <div v-for="(order, ind) in orderDetail.goodlist" :key="ind">
        <van-card
          :num="order.num"
          :price="order.price | number"
          desc="描述信息"  
          :title="order.title"
          :thumb="order.img"
        >
        </van-card>
      </div>
    </van-cell-group>
      <van-panel title="订单信息">
        <ul class="order-detail_info">
          <li>订单编号 : {{ orderDetail.orderno }}</li>
          <li>创建时间 : {{ orderDetail.date | date('yyyy-MM-dd hh:mm') }}</li>
          <li>支付时间 : {{ orderDetail.date | date('yyyy-MM-dd hh:mm') }}</li>
        </ul>
        <template slot="footer">
          <div class="order-detail__actions" v-if="orderDetail.state==1">
            <van-button size="small" @click="cancelOrder(orderDetail)">取消订单</van-button>
            <van-button size="small" type="danger" plain @click="paymentOrder">支付订单</van-button>
          </div>
          <div class="order-detail__actions" v-if="orderDetail.state==2">
            共{{ orderDetail.num }}件商品 合计: <span class="fs-16">{{ orderDetail.price | vFixedTwo }}</span>
          </div>
          <div class="order-detail__actions" v-if="orderDetail.state==3">
            <van-button size="small">删除订单</van-button>
          </div>
        </template>
      </van-panel>
	</com-page>
</template>

<script>
import { list_mixins } from "@/mixins";
import { Toast, Card, Panel } from "vant";
import { getOrderInfo, paymentOrder, CancelOrder } from "@/api/index.js"
import { paramConvert } from "@/utils/stringUtil.js"
export default {
  mixins: [list_mixins],
  components: {
    [Card.name]: Card,
    [Panel.name]: Panel
  },
  data() {
    return {
      id: '', //用户id
      orderId: '', //订单id
      orderDetail: {},
      i: 1,
      surplusTime: 100,
      imageURL: "static/images/banner.png",
      address:{
        name:'王大锤',
        tel:'12312312',
        address:'XXXXXXXXXX'
      },
      timer: null
    };
  },
  created () {
    let self = this;
    self.orderId = this.$route.params.id,
    self.getOrderInfo()
    // this.paymentOrder()
    self.timer = setInterval(function () {
      if (self.surplusTime <= 0) {
        window.setInterval(self.timer);
        self.timer = null
      } else {
        self.surplusTime --
      }
    }, 1000)
  },
  destroyed () {
    let self = this;
    window.setInterval(self.timer);
    self.timer = null
  },
  computed: {
    currentOrder: {
      get: function () {
        return this.$store.getters.getCurrentOrder
      }
    },
    currentAddress: {
      get: function () {
        return this.$store.getters.getCurrentAddress
      }
    }
  },
  methods: {
    async getOrderInfo () { //获取订单详情
      let self = this;
      let param = {
        id: self.orderId,
      }
			let queryParams = paramConvert(param)
			let resData = await getOrderInfo(queryParams, param)
      if (resData.status === 200 && resData.data.Success) {
        self.orderDetail = resData.data.Data;
        self.orderDetail.state = self.statusChange(self.orderDetail.status)
        console.log('获取订单详情',resData)
			}
    },
    async paymentOrder () { //支付商品订单
      let self = this;
      let param = {
        id: self.userId,
        orderid: self.orderId,
      }
			let queryParams = paramConvert(param)
			let resData = await paymentOrder(queryParams, param)
      if (resData.status === 200 && resData.data.Success) {
        Toast({
					message: '支付订单成功',
					duration: 1500
        });
        self.getOrderInfo()
        console.log('支付订单成功',resData)
			} else {
        Toast({
          message: resData.data.Msg,
          duration: 1500
        })
      }
    },
    async cancelOrder (item) {
      console.log("item", item)
      let param = {
        orderid: item.id
      }
      let queryParams = paramConvert(param)
      let resData = await CancelOrder(queryParams, param)
      if (resData.status === 200&& resData.data.Success) {
        Toast({
          message: '取消订单成功',
          duration: 1500
        })
        this.$router.back()
      } else {
        Toast({
					message: resData.data.Msg || '取消订单失败',
					duration: 1500
				})
      }
    },
    statusChange (name) { //状态转化编码
      let self = this;
      let state = 0
      if (name == '待付款') {
        state = 1
      } else if (name == '已付款') {
        state = 2
      } else if (name == '已完成') {
        state = 3
      }
      return state
    },
    onCopy () { //复制成功
			Toast({
				message: '复制成功',
				duration: 1500
			})
		},
		onError () { //复制失败
      Toast({
				message: '复制失败',
				duration: 1500
			})
    },
    jumpAddress () {
      let self = this;
      if (self.orderDetail.status == '待付款') {
        self.$router.push({
          path: '/my/address',
          query: { id: 2 }
        })
      }
    },
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
.fs-16{
  color: #ee4442;
}
</style>
