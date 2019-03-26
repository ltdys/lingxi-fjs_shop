<template>
  <com-page>
    <com-header title="商品详情" slot="header" is-back></com-header>
    <img class="w-100" src="static/images/home_shop.png">

    <van-cell-group class="shop-detail">
      <van-cell title="产品名称">
        <span class="f333">{{goods.title}}</span>
      </van-cell>
      <van-cell title="产品价格">
        <span class="amount">
          ¥
          <em>{{goods.price | number}}</em>
        </span>
      </van-cell>
      <van-cell title="风险说明">
        <span class="fred">虚拟商品无法退货，请谨慎操作</span>
      </van-cell>
      <van-cell title="促销说明">
        <van-tag type="danger" plain>赠品</van-tag>
        <span class="m-l-sm">豪峰整套功夫陶瓷茶具套装XXXXXX四合一电磁炉套装</span>
      </van-cell>
    </van-cell-group>

    <van-button type="primary" bottom-action slot="footer" bottom block @click="preBuy">立刻购买</van-button>

    <van-sku
      slot="popup"
      v-model="showCustomAction"
      :sku="sku"
      :goods="goods"
      :goods-id="goodsId"
      :hide-stock="sku.hide_stock"
      :quota="0"
      :quota-used="0"
      @buy-clicked="onBuyClicked"
    >
      <!-- 自定义 sku-header-price -->
      <template slot="sku-header-price" slot-scope="props">
        <div class="van-sku__goods-price">
          <span class="van-sku__price-symbol">￥</span>
          <span class="van-sku__price-num">{{ props.price }}</span>
        </div>
      </template>
      <!-- 自定义 sku actions -->
      <template slot="sku-actions" slot-scope="props">
        <div class="van-sku-actions">
          <van-submit-bar
            style="position:relative"
            :price="350"
            button-text="立刻购买"
            his.page
            @submit="props.skuEventBus.$emit('sku:buy')"
          />
        </div>
      </template>
    </van-sku>
  </com-page>
</template>

<script>
import { Sku, SubmitBar } from "vant";
import { paramConvert } from "@/utils/stringUtil.js"
import { shopInfo } from "@/api/index.js"

export default {
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
            id: 2259, // skuId，下单时后端需要
            price: 100, // 价格（单位分）
            s1: "1215", // 规格类目 k_s 为 s1 的对应规格值 id
            s2: "1193", // 规格类目 k_s 为 s2 的对应规格值 id
            s3: "0", // 最多包含3个规格值，为0表示不存在该规格
            stock_num: 110 // 当前 sku 组合对应的库存
          }
        ],
        price: "1.00", // 默认价格（单位元）
        stock_num: 227, // 商品总库存
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
      imgDefaultUrl: 'static/images/home_shop.png'
    };
  },

  created () {
    this.id = this.$route.params.id
    this.shopInfo()
  },

  methods: {
    async shopInfo () {
      let queryParams = paramConvert({ id: this.id })
      let resData = await shopInfo(queryParams, { id: this.id })
      if (resData.status === 200 && resData.data.Success) {
        this.goods = resData.data.Data || {}
			}
    },
    preBuy() {
      // this.popupVisible = true;
      this.showCustomAction = true;
    },
    onBuyClicked() {
      this.$router.push("/order/1");
    },
    onAddCartClicked() {}
  }
};
</script>

<style lang="scss">
.shop-detail {
  .van-cell__title {
    flex: 0.5;
  }
}
</style>
