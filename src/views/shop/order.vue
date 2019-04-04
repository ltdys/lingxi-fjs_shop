<template>
    <com-page>
        <com-header title="订单支付" slot="header" is-back></com-header>

        <!-- <van-cell-group>
          <van-cell icon="location" class="select-location" is-link @click.native="selectAddress">
            <div>{{address.name}} 
              <span>{{address.tel | phone}}</span>
            </div>
            <div class="select-location__address">{{address.address}}</div>
          </van-cell>
        </van-cell-group> -->

        <van-cell-group>
          <van-card @click.native="orderDetail"
              :num="addOrder.num"
              :price="addOrder.onePrice"
              :desc="addOrder.info"  
              :title="addOrder.title"
              :thumb="addOrder.imgurl"
            >
          </van-card>
          <!-- <van-card @click.native="$router.push('/my/order/1')"
              num="1"
              tag="赠品"
              desc="描述信息"  
              title="商品标题"
              :thumb="imageURL"
            >
          </van-card> -->
        </van-cell-group>
        <van-cell-group>
          <van-cell title="订单编号" :value="addOrder.orderNo"></van-cell>
          <van-cell title="创建时间" :value="addOrder.createTime"></van-cell>
          <van-cell title="订单金额">
              <span class="amount">¥<em>{{ addOrder.price | number}}</em></span>
          </van-cell>
          <van-cell title="当前余额">
              <span>¥<em>{{price}}</em></span>
          </van-cell>
        </van-cell-group>
        <div class="submit_buttons">
        	<van-button type="primary" block @click="onPay">余额支付</van-button>
				</div>

        <com-popup-page v-model="popupVisible" slot="popup" title="选择地址">
          <AddressList switchable @select="onSelect"></AddressList>
        </com-popup-page>
    </com-page>
</template>

<script>
import { list_mixins } from "@/mixins"
import { Card, Panel, } from "vant";
import AddressList from "../my/address/list";
import PopupPage from "@/components/popup-page"
import { paymentOrder, getMyAddress, getUserInfo } from "@/api/index.js"
import { paramConvert } from "@/utils/stringUtil.js"
import { Toast } from "vant"

export default {
  mixins: [list_mixins],

  components: {
    [Card.name]: Card,
    [Panel.name]: Panel,
    AddressList,
    [PopupPage.name]: PopupPage
  },

  created () {
    this.getUserInfoPrice()
  },

  computed: {
    addOrder: {
      get: function () {
        return this.$store.getters.getAddOrder
      }
    }
  },

  data() {
    return {
      price: 0,
      popupVisible: false,
      num: 1,
      imageURL: "static/images/banner.png",
      chosenAddressId: "1",
      address:{
        name:'',
        tel:'',
        address:''
      }
    };
  },

  methods: {
    selectAddress() {
      this.popupVisible = true
    },
    onSelect(v){
      this.address = v;
      this.popupVisible = false
    },
    async getUserInfoPrice () { //获取用户消息
      let self = this;
      let id = self.$store.getters.getUserId
			let queryParams = paramConvert({ "uId": id })
      let resData = await getUserInfo(queryParams, { "uId": id })
      if (resData.status === 200 && resData.data.Success) {
        let userInfo = resData.data.Data
        self.price = userInfo.price
        self.$store.dispatch("setUserInfo", userInfo)
			} else {
        Toast({
					message: resData.data.Msg || '获取用户信息失败',
					duration: 1500
				})
      }
		},
    onPay (){
      if (this.price < this.addOrder.price) {
        Toast({
					message: '余额不足!',
					duration: 1500
        });
      } else {
        this.paymentOrder()
      }
    },
    async paymentOrder () {
      let queryParams = paramConvert({
        id: this.userId,
        orderid: this.addOrder.orderId
      })
      let resData = await paymentOrder(queryParams, {
        id: this.userId,
        orderid: this.addOrder.orderId
      })
      if (resData.status === 200 && resData.data.Success) {
        Toast.success({
          message: "支付成功",
          duration: 1500
        })
        this.$router.push("/")
      } else {
        Toast(resData.data.Msg)
      }
    },
    async getMyAddress () {
      let id = this.userId
      let queryParams = paramConvert({
        id: id
      })
      let resData = await getMyAddress(queryParams, { id: id })
      if (resData.status === 200 && resData.data.Success) {
        let list = resData.data.Data[0] || []
        this.address.name = list.AccountName
        this.address.tel = list.Mobile
        this.address.address = list.AddressName
      }
    },
    orderDetail () {
      this.$router.push('/my/order/' + this.addOrder.orderId)
    }
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
</style>
