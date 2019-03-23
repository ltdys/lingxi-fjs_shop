<template>
	<com-page>
		<com-header title="余额变动明细" is-back slot="header"></com-header>
		<van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="loadBottom">
			<template v-for="(v,i) in resultList">
				<div class="yllist_count" :key="'c'+i" v-if="i%2==0">
					<div class="fs-16">2019年3月</div>
					<div class="f666">收入¥1500</div>
				</div>
        <van-cell title="分销奖金" label="02-01 15:20" :key="'d'+i" :value="`+${i}000`"></van-cell>
			</template>
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
      isFinished2:false
    };
  },
  created() {
  },
  methods: {
  }
};
</script>

<style lang="scss">
.yllist_count {
  margin-bottom: 10px;
  padding: 0 10px;
  margin-top: 10px;
}
.yllist_item {
  padding: 10px;
  background: #fff;
  padding: 10px;
//   border-radius: 5px;
  + .yllist_item{
    margin-top: 10px;
  }
}
</style>
