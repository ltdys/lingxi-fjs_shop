<template>
  <!-- <div class="home-out_shop"> -->
    <div class="home-hot_shop">
      <div class="hot-title">热卖商品</div>
      <div class="shop" v-for="(item, index) in shopList" :key="index">
        <img class="w-100 h-115" :src="item.imgurl">
        <div class="shop-desc">
          <div class="shop-title">{{item.title}}</div>
          <div class="shop-mai-box">
            <!-- <div class="shop-price">￥{{item.price | number}}</div> -->
            <div class="shop-price">{{item.price | number}}钻石券</div>
            <div class="shop-btn" @click="buy(item.id)">立刻购买</div>
          </div>
        </div>
      </div>
    </div>
  <!-- </div> -->
</template>

<script>
import { getHot } from "@/api/index.js"
export default {
	data () {
		return {
			shopList: []
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
      this.shopList = []
			if (resData.status === 200 && resData.data.Success) {
        this.shopList.push(resData.data.Data[0])
			}
		}
  }
};
</script>

<style lang="scss" scoped>
.home-out_shop{
  padding: 0.2rem 0.3rem;
  background: #FFF;
}
.home-hot_shop {
  // margin-top: 0.16rem;
  margin: 0.3rem 0.3rem;
  background: #fff;
  border-radius: 4px;
  box-shadow:0px 1px 5px 0px rgba(157,157,157,0.25);
  .hot-title {
    height: 57px;
    line-height: 57px;
    font-size: 17px;
    color: #131313;
    font-weight: 500;
    padding-left: 15px;
  }
  .shop {
    + .shop {
      margin-top: 15px;
    }
    border-radius: 4px;
    // box-shadow: 1px 1px 8px #ccc;
    .shop-mai-box{
      display: flex;
      align-items: center;
    }
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