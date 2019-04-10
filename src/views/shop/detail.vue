<template>
  <com-page>
    <com-header title="商品详情" slot="header" is-back></com-header>
    <img class="w-100 h-115" :src="goods.imgurl">

    <van-cell-group class="shop-detail">
      <van-cell title="产品名称">
        <span class="f333">{{goods.title}}</span>
      </van-cell>
      <van-cell title="产品价格">
        <span class="amount">
          <!-- ¥<em>{{goods.price | number}}</em> -->
          <em>{{goods.price | number}}钻石券</em>
        </span>
      </van-cell>
      <van-cell title="风险说明">
        <!-- <span class="fred">虚拟商品无法退货，请谨慎操作</span> -->
        <span class="fred">{{goods.tip}}</span>
      </van-cell>
      <van-cell title="促销说明">
        <!-- <van-tag type="danger" plain>赠品</van-tag> -->
        <span class="m-l-sm">{{goods.info}}</span>
      </van-cell>
    </van-cell-group>

    <van-button type="primary" bottom-action slot="footer" bottom block @click="preBuy">立刻购买</van-button>

    <van-sku
      slot="popup"
      v-model="showCustomAction"
      :sku="sku"
      :goods="goods"
      :goods-id="goods.id"
      :hide-stock="sku.hide_stock"
      :quota="0"
      :quota-used="0"
      @stepper-change="onStepperChange"
      @buy-clicked="onBuyClicked"
    >
      <!-- 自定义 sku-header-price -->
      <template slot="sku-header-price" slot-scope="props">
        <div class="van-sku__goods-price">
          <!-- <span class="van-sku__price-symbol">￥</span> -->
          <span class="van-sku__price-num">{{ props.price }}</span>
          <span>钻石券</span>
        </div>
      </template>
      <!-- 自定义 sku actions -->
      <template slot="sku-actions" slot-scope="props">
        <div class="van-sku-actions">
          <van-submit-bar
            style="position:relative"
            :price="sku.totalPrice"
            button-text="立刻购买"
            currency="钻石券"
            his.page
            @submit="props.skuEventBus.$emit('sku:buy')"
          />
        </div>
      </template>
    </van-sku>
  </com-page>
</template>

<script>
import { list_mixins } from "@/mixins"
import { Sku, SubmitBar, Toast } from "vant"
import { paramConvert } from "@/utils/stringUtil.js"
import { formatTime } from "@/utils/dateUtil"
import { shopInfo, placeShop } from "@/api/index.js"
import { isPositiveInteger } from "@/utils/is"
export default {
  mixins: [list_mixins],
  components: {
    [Sku.name]: Sku,
    [SubmitBar.name]: SubmitBar
  },
  data() {
    return {
      popupVisible: false,
      showCustomAction: false,
      goodsId: 1,
      sku: {
        // 所有sku规格类目与其值的从属关系，比如商品有颜色和尺码两大类规格，颜色下面又有红色和蓝色两个规格值。
        // 可以理解为一个商品可以有多个规格类目，一个规格类目下可以有多个规格值。
        tree: [],
        // 所有 sku 的组合列表，比如红色、M 码为一个 sku 组合，红色、S 码为另一个组合
        list: [
          {
            id: "", // skuId，下单时后端需要
            price: "", // 价格（单位分）
            s1: "12", // 规格类目 k_s 为 s1 的对应规格值 id
            s2: "1193", // 规格类目 k_s 为 s2 的对应规格值 id
            s3: "0", // 最多包含3个规格值，为0表示不存在该规格
            stock_num: 110 // 当前 sku 组合对应的库存
          }
        ],
        price: "0", // 默认价格（单位元）
        totalPrice: 0,
        stock_num: 1000000000, // 商品总库存
        collection_id: 2261, // 无规格商品 skuId 取 collection_id，否则取所选 sku 组合对应的 id
        none_sku: true, // 是否无规格商品
        hide_stock: true // 是否隐藏剩余库存
      },
      goods: {
        // // 商品标题
        // title: "钻石DC元券（代码CEPL）",
        // // 默认商品 sku 缩略图
        // picture: "",
        // price: 1
      },
      id: '',
      formData: {
        uid: '',  //用户id
        sid: '',  //商品id
        num: '1'  //商品数量  
      },
      orderList: {}  //订单数据
    };
  },
  created () {
    this.id = this.$route.params.id
    this.formData.sid = this.id
    this.formData.uid = this.userId
    this.shopInfo()
  },
  methods: {
    async shopInfo () {
      let queryParams = paramConvert({ id: this.id })
      let resData = await shopInfo(queryParams, { id: this.id })
      if (resData.status === 200 && resData.data.Success) {
        this.goods = resData.data.Data || {}
        this.goods.picture = resData.data.Data.imgurl
        this.sku.price = this.goods.price
        this.sku.totalPrice = this.goods.price * 100
			}
    },
    preBuy() {
      // this.popupVisible = true;
      this.showCustomAction = true;
    },
    onBuyClicked() {
      this.placeShop()
    },
    onStepperChange (value) {
      this.formData.num = value
      this.sku.totalPrice = value * this.goods.price * 100
    },
    async placeShop () {
      if (!isPositiveInteger(this.formData.num)) {
        Toast({
          message: "购买数量必须为正整数型",
          duration: 1500
        })
        return
      }
      let queryParams = paramConvert(this.formData)
      let resData = await placeShop(queryParams, this.formData)
      if (resData.status === 200 && resData.data.Success) {
        // Toast("下订单成功")
        this.orderList = resData.data.Data
        this.orderList.title = this.goods.title
        this.orderList.imgurl = this.goods.imgurl
        this.orderList.info = this.goods.info
        this.orderList.num = this.formData.num
        this.orderList.onePrice = this.goods.price
        this.orderList.createTime = this.formatStr(this.orderList.orderNo)
        this.$store.dispatch("setAddOrder", this.orderList)
        this.$router.push("/order/" + this.formData.sid);
      }
    },
    formatStr(str) {
      if (!str) { 
        return formatTime(new Date(), "{y}/{m}/{d} {h}:{i}:{s}")
      } 
      return str.substring(0, 4) + "/" + str.substring(4, 6) + "/" + str.substring(6, 8) + " " + str.substring(8, 10) + ":" + str.substring(10, 12) + ":" + str.substring(12, 14)
    } 
  }
};
</script>

<style lang="scss">
.shop-detail {
  .van-cell__title {
    flex: 0.5;
  }
}
.shop-detail {
  .van-cell__title {
    flex: 0.5;
  }
}
.van-stepper__input {
  width: 3.6rem;
  height: 0.75rem;
  font-size: 0.38rem;
}
.van-stepper__minus, .van-stepper__plus {
  display: none;
}
</style>