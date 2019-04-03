<template>
  <com-page>
    <com-header title="DC明细" is-back slot="header"></com-header>
    <div class="dc-list">
      <div class="dc-count">
        <div class="fs-16">{{showDate}}</div>
        <div class="f666">收入 ¥{{myDcMxList.sr}}</div>
      </div>
      <div class="dc-item" v-for="(item, index) in myDcMxList.list" :key="'d'+index">
        <div>
          {{item.tclx}}
          <span class="amount fr">
            <template v-if="item.price > 0">
              +
            </template>
            <template v-else>
              -
            </template>
            {{item.price}}
          </span>
        </div>
        <div class="dc-item__desc">
          <div>下单用户：{{item.xdyh}}</div>
          <div>订单金额：{{item.ddje}}</div>
          <div>提成比例：{{item.tcbl}}</div>
          <div class="lx-margin-bottom-10">下单时间：{{item.date}}</div>
        </div>
        <div class="lx-margin-top-10">
          {{item.tclx}}
          <span class="amount fr">
            <template v-if="item.price > 0">
              +
            </template>
            <template v-else>
              -
            </template>
            {{item.price}}
          </span>
        </div>
        <div class="dc-item__desc1">
          <div>赠送时间: {{item.date}}</div>
        </div>
      </div>
    </div>
  </com-page>
</template>

<script>
import { getMyDcMx } from "@/api/index"
import { paramConvert } from "@/utils/stringUtil.js"
import { formatTime } from "@/utils/dateUtil"
export default {
  data() {
    return {
			myDcMxList: {},
      nowDate: '',
      showDate: ''
    };
  },

  computed: {
    userId: {
      get: function() {
        return this.$store.getters.getUserId;
      }
    }
  },

  created() {
		let date = new Date()
    this.nowDate = formatTime(date, '{y}-{m}')
    let fd = this.nowDate.split("-")
    this.showDate = fd[0] + "年" + fd[1] + "月"
    this.getMyDcMx()
  },

  methods: {
    async getMyDcMx() {
      let id = this.userId;
      let queryParams = paramConvert({
				id: id,
				date: this.nowDate
      });
			let resData = await getMyDcMx(queryParams, { 
				id: id,
				date: this.nowDate 
			});
      if (resData.status === 200 && resData.data.Success) {
        this.myDcMxList = resData.data.Data
      }
    }
  }
};
</script>

<style lang="scss" scoped>
	.dc-count {
		margin-bottom: 10px;
		padding: 0 10px;
		margin-top: 10px;
		line-height: 30px;
	}
	.dc-item {
		padding: 10px 30px;
		background: #fff;
		line-height: 30px;
		//   border-radius: 5px;
		+ .dc-item {
			margin-top: 10px;
		}
		&__desc {
			border-bottom: 1px solid #eee;
			color: #666;
		}
		&__desc1 {
			color: #666;
		}
	}
</style>
