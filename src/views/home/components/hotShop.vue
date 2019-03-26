<template>
  <div class="home-hot_shop">
    <div class="hot-title">热卖商品</div>
    <div class="shop" v-for="(item, index) in shopList" :key="index">
      <img class="w-100" :src="item.imgurl || imgDefaultUrl">
      <div class="shop-desc">
        <div class="shop-title">{{item.title}}</div>
        <div>
          <div class="shop-price">￥{{item.price | number}}</div>
          <div class="shop-btn" @click="buy(item.id)">立刻购买</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getHot } from "@/api/index.js"
export default {
	data () {
		return {
			shopList: [],
			imgDefaultUrl: 'static/images/home_shop.png'
		}
	},

	created () {
		this.getHot()
	},

  methods: {
    buy(id) {
      this.$router.push("/shop/" + id);
		},
		//获取商品
		async getHot () {
			let resData = await getHot()
			if (resData.status === 200 && resData.data.Success) {
				this.shopList = resData.data.Data || []
			}
		}
  }
};
</script>

<style lang="scss">
.home-hot_shop {
  .hot-title {
    font-size: 0.34rem;
    color: #333;
    line-height: 1rem;
  }
  .shop {
    + .shop {
      margin-top: 15px;
    }
    border-radius: 0.15rem;
    box-shadow: 1px 1px 8px #ccc;
    .shop-title {
      font-size: 0.28rem;
      color: #333;
      line-height: 0.6rem;
    }
    .shop-price {
      color: #ec9300;
      font-size: 0.34rem;
    }
    .shop-btn {
      background: #ec9300;
      color: #fff;
      border-radius: 0.5rem;
      padding: 0.15rem 0.4rem;
      display: inline-block;
    }
    .shop-desc {
      padding: 0.2rem 0.4rem;
      > :last-child {
        display: flex;
        justify-content: space-between;
      }
    }
  }
}
</style>
