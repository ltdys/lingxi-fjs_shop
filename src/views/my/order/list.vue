<template>
	<com-page>
    <template slot="header">
		  <com-header title="我的订单" is-back></com-header>
      <van-tabs v-model="active" @change="changeItem" swipeable>
        <van-tab :title="tab.title" v-for="tab in tabs" :key="tab.value">
        </van-tab>
      </van-tabs>
    </template>
    <van-list v-model="orderLoading" :finished="orderFinished" finished-text="没有更多了" @load="orderLoadBottom">
      <van-panel
        v-for="(item, index) in orderList"
        :key="index" 
        :title="item.date | date('yyyy-MM-dd hh:mm')"
        :status="item.status | orderTitle(active)"
        class="goods-panel">
        <div v-for="(order, ind) in item.goodlist" :key="ind">
          <van-card @click.native="jumpDetail(item)"
            :num="order.num"
            :price="order.price | number"
            desc="描述信息"  
            :title="order.title"
            :thumb="order.img"
            currency="钻石券"
          >
          </van-card>
        </div>
        <div slot="footer" v-if="item.state==1">
          <van-button size="small" @click="cancelOrder(item)">取消订单</van-button>
          <van-button size="small" type="danger" plain @click="paymentOrder(item)">支付订单</van-button>
        </div>
        <div slot="footer" v-if="item.state==2">
          共{{item.num}}件商品 合计: <span class="fs-16">{{ item.price | vFixedTwo }}</span>
        </div>
        <div slot="footer" v-if="item.state==3">
          <van-button size="small">删除订单</van-button>
        </div>
      </van-panel>
    </van-list>
	</com-page>
</template>

<script>
import { list_mixins } from "@/mixins";
import { Toast, Card, Panel } from "vant";
import { getMyOrder, paymentOrder, CancelOrder } from "@/api/index.js"
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
      active: +this.$route.query.tab || 0,
      imageURL: "static/images/banner.png",
      tabs: [
        { title: "全部", value: 0 },
        { title: "待支付", value: 1 },
        { title: "已支付", value: 2 },
        // { title: "待收货", value: 2 },
        { title: "已完成", value: 3 }
      ],
      orderList: [], //订单列表
      // 分页操作
      pageIndex: 0,
      pageRows: 10,
      //加载
      orderLoading: false,
      orderFinished:false,
    };
  },
  created () {
  },
  methods: {
    changeItem (item) { //切换tabbar状态
      let self = this;
      self.pageIndex = 1;
      self.pageRows = 10;
      self.active = item;
      self.orderList = []
      self.getMyOrder()
      console.log(item)
    },
    async getMyOrder () { //获取订单列表
      let self = this;
      let param = {
        id: self.userId,
        pageIndex: self.pageIndex,
        pageRows: self.pageRows,
        all: self.active
      }
			let queryParams = paramConvert(param)
			let resData = await getMyOrder(queryParams, param)
      if (resData.status === 200 && resData.data.Success) {
        let list = resData.data.Data;
        list.forEach((item, index) => {
          item.state = self.statusChange(item.status)
          self.orderList.push(item)
        })
        self.orderLoading = false
        if (list.length == 0) {
          self.orderFinished = true;
        }
        console.log(resData)
			}
    },
    statusChange (name) { //状态转化编码
      let self = this;
      let state = 0
      self.tabs.forEach((item, index) => {
        if (item.title == name) {
          state = item.value
        }
      })
      return state
    },
    orderLoadBottom () { //下拉加载方法
      let self = this;
      if (this.orderFinished){
        return
      }
      self.pageIndex ++
      self.getMyOrder()
    },
    jumpDetail (item) { //跳转订单详情页面
      let self = this;
      self.$store.dispatch('setCurrentOrder', item)
      console.log(item)
      self.$router.push('/my/order/' + item.id)
    },
    async paymentOrder (item) { //支付订单
      let self = this;
      console.log(item)
      let param = {
        id: self.userId,
        orderid: item.id
      }
			let queryParams = paramConvert(param)
			let resData = await paymentOrder(queryParams, param)
      if (resData.status === 200 && resData.data.Success) {
        Toast({
					message: '支付订单成功',
					duration: 1500
        });
        self.pageIndex = 1;
        self.orderList = []
        self.getMyOrder()
        console.log('支付订单成功',resData.data.Data)
			} else {
        Toast({
					message: resData.data.Msg || '支付订单失败',
					duration: 1500
				})
      }
    },
    async cancelOrder (item) {
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
        this.pageIndex = 1
        this.orderList = []
        this.getMyOrder()
      } else {
        Toast({
					message: resData.data.Msg || '取消订单失败',
					duration: 1500
				})
      }
    }
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
  .fs-16{
    color: #ee4442;
  }
}
</style>
