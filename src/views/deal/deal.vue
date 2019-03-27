<template>
  <com-page>
    <com-header title="交易" slot="header"></com-header>
    <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="loadBottom">
      <div class="goods">
        <div class="good-top">
          <div class="goods__title">钻石DC元券(代码CEPL)</div>
          <div class="goods__count">
            <div class="tl-l">
              <div class="lx-small">总市值(元)</div>
              <div class="lx-big">130,000</div>
            </div>
            <div class="tl-r">
              <div class="lx-small">单价(元/张)</div>
              <div>1.30</div>
            </div>
          </div>
        </div>
        <div class="goods-middle">
          <div class="goods-middle-top">
            <div class="lx-small">持仓数量(张)</div>
            <div>1000</div>
          </div>
          <div class="goods-middle-bottom">详情</div>
        </div>
        <div class="goods-content">
          <div>
            <div class="lx-mr-15 lx-small">购买数量</div>
            <div class="tl-c lx-middle">6000</div>
          </div>
          <div>
            <div class="lx-mr-15 lx-small">提&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;成</div>
            <div class="tl-c lx-middle">0</div>
          </div>
        </div>
        <div class="goods-content">
          <div>
            <div class="lx-mr-15 lx-small">系统奖励</div>
            <div class="tl-c lx-middle">6000</div>
          </div>
          <div>
            <div class="lx-mr-15 lx-small">提货数量</div>
            <div class="tl-c lx-middle">2000</div>
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
export default {
  mixins: [list_mixins],

  created () {
  },

  methods: {
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
  .lx-small {
    font-size: 14px;
    color: #969799;
  }
  .lx-big {
    font-size: 24px;
    color: $defaultColor;
  }
  .lx-middle {
    font-size: 17px;
    color: $otherColor;
  }
}
</style>
