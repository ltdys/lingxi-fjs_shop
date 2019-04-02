<template>
  <com-page>
    <com-header title="DC明细" is-back slot="header"></com-header>
    <div class="dc-list" v-for="(item, index) in myDcMxList" :key="index">
      <template>
        <div class="dc-count" :key="'c'+index">
          <div class="fs-16">{{item.list[0].date | formatDate}}</div>
          <div class="f666">收入 ¥{{item.sr}}</div>
        </div>
        <div class="dc-item" :key="'d'+index">
          <div>
            {{item.list[0].tclx}}
            <span class="amount fr">
              <template v-if="item.list[0].price > 0">
                +
              </template>
              <template v-else>
                -
              </template>
              {{item.list[0].price}}
            </span>
          </div>
          <div class="dc-item__desc">
            <div>下单用户：{{item.list[0].xdyh}}</div>
            <div>订单金额：{{item.list[0].ddje}}</div>
            <div>提成比例：{{item.list[0].tcbl}}</div>
            <div class="lx-margin-bottom-10">下单时间：{{item.list[0].date}}</div>
          </div>
          <div class="lx-margin-top-10">
            {{item.list[1].tclx}}
            <span class="amount fr">+{{item.list[1].price}}</span>
          </div>
          <div class="dc-item__desc1">
            <div>赠送时间: {{item.list[1].date}}</div>
          </div>
        </div>
      </template>
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
			myDcMxList: [],
			nowDate: ''
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
				this.myDcMxList.push(resData.data.Data);
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
