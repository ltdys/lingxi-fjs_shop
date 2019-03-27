<template>
  <com-page>
    <com-header title="交易" slot="header"></com-header>
    <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="loadBottom">
      <div class="goods" v-for="(item, index) in tradeList" :key="index">
        <div class="good-top">
          <div class="goods__title">{{item.title}}</div>
          <div class="goods__count">
            <div class="tl-l">
              <div class="fa-stack-14x fa-color-969">总市值(元)</div>
              <div class="fa-stack-24x fa-color-default h24x">130,000</div>
            </div>
            <div class="tl-r">
              <div class="fa-stack-14x fa-color-969">单价(元/张)</div>
              <div class="fa-stack-17x fa-color-323 h24x">1.30</div>
            </div>
          </div>
        </div>
        <div class="goods-middle">
          <div class="goods-middle-top">
            <div class="fa-stack-14x fa-color-969">持仓数量(张)</div>
            <div class="fa-stack-24x fa-color-323">1000</div>
          </div>
          <div class="goods-middle-bottom fa-stack-14x fa-color-default">详情</div>
        </div>
        <div class="goods-content">
          <div>
            <div class="lx-mr-15 fa-stack-14x fa-color-969">购买数量</div>
            <div class="tl-c fa-stack-17x fa-color-327">6000</div>
          </div>
          <div>
            <div class="lx-mr-15 fa-stack-14x fa-color-969">提&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;成</div>
            <div class="tl-c fa-stack-17x fa-color-327">0</div>
          </div>
        </div>
        <div class="goods-content">
          <div>
            <div class="lx-mr-15 fa-stack-14x fa-color-969">系统奖励</div>
            <div class="tl-c fa-stack-17x fa-color-327">6000</div>
          </div>
          <div>
            <div class="lx-mr-15 fa-stack-14x fa-color-969">提货数量</div>
            <div class="tl-c fa-stack-17x fa-color-327">2000</div>
          </div>
        </div>
        <div class="goods-bottom">
          <div class="shop-btn lx-mr" @click="buy(item.id)">买入</div>
          <div class="shop-btn lx-th" @click="buy(item.id)">提货</div>
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

  computed: {
    userId: {
      get: function () {
        return this.$store.getters.getUserId
      }
    }
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
    }
  }
};
</script>


<style lang="scss" scoped>
$defaultColor:#EC9300;
$otherColor: #3279FF;
.goods {
  margin: 15px;
  background: #fff;
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
    .goods-middle-top {
      width: 90%;
      text-align: center;
      margin-left: 10%;
      div:nth-child(1) {
        margin-bottom: 15px;
      }
      div:nth-child(2) {
        height: 24px;
        line-height: 24px;
      }
    }
    .goods-middle-bottom {
      width: 10%;
    }
  }
	.goods__count {
    padding: 15px;
		width: 345px;
		height: 93px;
		border-radius: 4px;
    display: flex;
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
    justify-content: space-around;
    padding-bottom: 30px;
    .lx-mr-15 {
      margin-bottom: 15px;
    }
  }
  .goods-bottom {
    display: flex;
    justify-content: space-around;
    padding: 15px;
    .shop-btn {
      width: 158px;
      height: 38px;
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
