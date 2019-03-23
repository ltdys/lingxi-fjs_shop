<template>
	<com-page>
		<com-header title="余额充值申请记录" is-back slot="header"></com-header>
    <van-list class="yllist2_list" v-model="loading" :finished="finished" finished-text="没有更多了" @load="loadBottom">
        <van-cell v-for="(v,i) in resultList" :key="'d'+i">
          <div slot="title">
            <div class="yllist2_list__title">余额充值</div>
            <div class="yllist2_list__date">02-01 15:20</div>
            <div class="yllist2_list__reason" v-if="i%3==1">原因：与实际缴纳金额不符合</div>
          </div>
          <div class="yllist2_list__right">
            <div>+{{i}}000</div>
            <div class="yllist2_list__status" :class="{'yllist2_list__status__success':i%3==2}">{{STATUS[i%3]}}</div>
          </div> 
        </van-cell>
    </van-list>
	</com-page>
</template>

<script>
import { list_mixins } from "@/mixins";

export default {
  mixins: [list_mixins],
  data() {
    return {
      STATUS: ["待审核", "审核不通过", "审核通过"],
      isFinished2: false
    };
  },
  created() {},
  methods: {}
};
</script>

<style lang="scss">
.yllist2_list {
  line-height: 1.6;
  &__right {
    text-align: right;
    color: #333;
  }
  &__status {
    color: #ee4442;
    font-size: 12px;
    &__success {
      color: green;
    }
  }
  &__date {
    font-size: 12px;
    color: #999;
  }
  &__reason {
    color: #ee4442;
    font-size: 12px;
  }
}
</style>
