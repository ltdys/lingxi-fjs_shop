<template>
    <com-page>
        <com-header title="订单支付" slot="header" is-back></com-header>

        <van-cell-group>
          <van-cell icon="location" class="select-location" is-link @click.native="selectAddress">
            <div>{{address.name}} 
              <span>{{address.tel | phone}}</span>
            </div>
            <div class="select-location__address">{{address.address}}</div>
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
        <van-cell-group>
          <van-cell title="订单编号" value="DC12312312312312"></van-cell>
          <van-cell title="创建时间" value="2018-09-09 09:09"></van-cell>
          <van-cell title="订单金额">
              <span class="amount">¥<em>{{item.price  | number}}</em></span>
          </van-cell>
          <van-cell title="当前余额">
              <span>¥<em>{{item.price  | number}}</em></span>
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
import { Card, Panel, } from "vant";
import AddressList from "../my/address/list";
import PopupPage from "@/components/popup-page";

export default {
  components: {
    [Card.name]: Card,
    [Panel.name]: Panel,
    AddressList,
    [PopupPage.name]: PopupPage
  },
  data() {
    return {
      popupVisible: false,
      num: 1,
      imageURL: "static/images/banner.png",
      item: {
        title: "钻石DC元券（代码CEPL）",
        price: 1.3
      },
      chosenAddressId: "1",
      address:{
        name:'王大锤',
        tel:'12312312',
        address:'XXXXXXXXXX'
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
    onPay(){
      this.$router.push('/')
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
