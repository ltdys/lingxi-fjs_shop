<template>
  <com-page>
    <com-header title="库存" is-back slot="header"></com-header>
    <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="loadBottom">
      <div class="goods" v-for="(item, index) in tradeList" :key="index">
        <div class="good-top">
          <div class="goods__title">{{item.title}}</div>
          <!-- <div class="goods__count">
            <div class="tl-l">
              <div class="fa-stack-14x fa-color-969">总价值(元)</div>
              <div class="fa-stack-24x fa-color-default h24x">{{item.ZSZ}}</div>
            </div>
            <div class="tl-r">
              <div class="fa-stack-14x fa-color-969">当前价格(元/张)</div>
              <div class="fa-stack-17x fa-color-323 h24x">{{item.danjia}}</div>
            </div>
          </div> -->
        </div>
        <div class="goods-middle">
          <div class="goods-middle-top">
            <div class="fa-stack-14x fa-color-969">总价值(钻石券)</div>
            <div class="fa-stack-24x fa-color-323">{{item.ZSZ}}</div>
          </div>
          <div class="goods-middle-bottom fa-stack-14x fa-color-default" @click="$router.push('/deal/detail')">详情</div>
        </div>
        <div class="goods-content">
          <div class="div-center">
            <div class="lx-mr-15 fa-stack-14x fa-color-969">购买数量</div>
            <div class="tl-c fa-stack-17x fa-color-327">{{item.GMSL}}</div>
          </div>
          <div class="div-center">
            <div class="lx-mr-15 fa-stack-14x fa-color-969">当前单价(钻石券)</div>
            <div class="tl-c fa-stack-17x fa-color-327">{{item.danjia}}</div>
          </div>
        </div>
        <div class="goods-content">
          <div class="div-center">
            <div class="lx-mr-15 fa-stack-14x fa-color-969">历史提货</div>
            <div class="tl-c fa-stack-17x fa-color-327">{{item.XTJL}}</div>
          </div>
          <div class="div-center">
            <div class="lx-mr-15 fa-stack-14x fa-color-969">提&nbsp;&nbsp;货&nbsp;&nbsp;中</div>
          <div class="tl-c fa-stack-17x fa-color-327">{{item.THSL}}</div>
          </div>
        </div>
        <div class="goods-bottom">
          <div class="shop-btn lx-mr" @click="buy(item.id)">买入</div>
          <div class="shop-btn lx-th" @click="pushDelivery(item)">提货</div>
        </div>
      </div>
    </van-list>
  </com-page>
</template>

<script>
import { list_mixins } from "@/mixins";
import { Button  } from 'vant'
import { paramConvert } from "@/utils/stringUtil.js"
import { getTrade } from "@/api/index"
export default {
  mixins: [list_mixins],

  data () {
    return {
      tradeList: []
    }
  },

  created () {
    this.getTrade()
  },

  methods: {
    async getTrade () {
      let id = this.userId
      let queryParams = paramConvert({
        id: id
      })
      let resData = await getTrade(queryParams, { id: id })
      if (resData.status === 200 && resData.data.Success) {
        this.tradeList = resData.data.Data || []
      }
    },
    pushDelivery (item) {
      this.$store.dispatch("setDeliveryList", item)
      this.$router.push("/deal/delivery")
    },
    buy (id) {
      this.$router.push("/shop/" + id)
    }
  }
};
</script>


<style lang="scss" scoped>
$defaultColor:#EC9300;
$otherColor: #3279FF;
.goods {
  padding: 15px;
  box-sizing: border-box;
  .good-top {
    .goods__title {
      width: 345px;
      height: 57px;
      line-height: 57px;
      padding-left: 15px;
      background: $defaultColor;
      box-shadow: 0px 1px 5px 0pa rgba(153, 153, 153, 0.25);
      border-radius: 4px 4px 0px 0px;
      font-size: 17px;
      color: #fff;
    }
  }
  .goods-middle {
    padding: 15px;
    display: flex;
    background: #fff;
    .goods-middle-top {
      box-sizing: border-box;
      width: 85%;
      text-align: center;
      margin-left: 15%;
      div:nth-child(1) {
        margin-bottom: 15px;
      }
      div:nth-child(2) {
        height: 24px;
        line-height: 24px;
      }
    }
    .goods-middle-bottom {
      width: 15%;
      text-align: right;
    }
  }
	.goods__count {
    padding: 15px;
		width: 345px;
		height: 93px;
		border-radius: 4px;
    display: flex;
    box-sizing: border-box;
    justify-content: space-between;
    border-bottom: 1px solid #eee;
    .h24x {
      height: 24px;
      line-height: 24px;
      margin-top: 15px;
    }
	}
  .goods-content {
    display: flex;
    box-sizing: border-box;
    justify-content: space-around;
    background: #fff;
    padding-bottom: 30px;
    .div-center {
      width: 50%;
      text-align: center;
    }
    .lx-mr-15 {
      margin-bottom: 15px;
    }
  }
  .goods-bottom {
    display: flex;
    box-sizing: border-box;
    justify-content: space-around;
    background: #fff;
    padding: 15px;
    .shop-btn {
      width: 158px;
      border-radius: 19px;
      color: #fff;
      padding: 0.15rem 0.4rem;
      display: inline-block;
      text-align:center;
    }
    .lx-mr {
      background: $defaultColor;
    }
    .lx-th {
      background: $otherColor;
      margin-left: 15px;
    }
  }
}
</style>
