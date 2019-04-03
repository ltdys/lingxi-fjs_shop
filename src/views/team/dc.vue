<template>
  <com-page>
    <com-header title="兑换明细" is-back slot="header"></com-header>
    <div class="dc-list">
      <div class="dc-top">
        <div class="dc-top-btn">
          <van-button round size="small" type="default" @click="selectTime">
            <div class="yu_e_btn">
              <span class="yu_e_btn__span">{{ currentDate | date('yyyy-MM') }}</span>
              <van-icon :name="iconName" />
            </div>
          </van-button>
        </div>
        <div class="dc-count">
          <div class="fs-16">{{showDate}}</div>
          <div class="f666">收获 ¥{{myDcMxList.sr}}</div>
        </div>
      </div>
      <div class="dc-item" v-for="(item, index) in myDcMxList.list" :key="'d'+index">
        <div>
          {{item.tclx}}
          <span class="amount fr">
            {{item.price}}
          </span>
        </div>
        <div class="dc-item__desc">
          <div>兑换用户：{{item.xdyh}}</div>
          <div>兑换金额：{{item.ddje}}</div>
          <div v-show="item.tcbl">提成比例：{{item.tcbl}}</div>
          <div class="lx-margin-bottom-10">兑换时间：{{item.date}}</div>
        </div>
        <!-- <div class="lx-margin-top-10">
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
        </div> -->
      </div>
    </div>

    <van-popup v-model="datePopShow" position="bottom">
      <van-datetime-picker
        v-model="currentDate"
        type="year-month"
        :max-date="new Date()"
        :formatter="formatter"
        @confirm="confirmDate"
        @cancel="cancelDate"
      />
    </van-popup>
  </com-page>
</template>

<script>
import { getMyDcMx } from "@/api/index"
import { paramConvert } from "@/utils/stringUtil.js"
import { formatTime, getDateFormat } from "@/utils/dateUtil"
export default {
  data() {
    return {
      iconName: 'arrow-down', //日期选择图标
      datePopShow: false, //日期选择弹框
      currentDate: new Date(), //当前日期
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
    this.getMyDcMx()
  },

  methods: {
    async getMyDcMx() {
      let id = this.userId
      let fd = getDateFormat(this.currentDate, 'yyyy-MM').split("-")
      this.showDate = fd[0] + "年" + fd[1] + "月"
      let queryParams = paramConvert({
				id: id,
				date: getDateFormat(this.currentDate, 'yyyy-MM')
      });
			let resData = await getMyDcMx(queryParams, { 
				id: id,
				date: getDateFormat(this.currentDate, 'yyyy-MM')
			});
      if (resData.status === 200 && resData.data.Success) {
        this.myDcMxList = resData.data.Data
        if (this.myDcMxList.list && this.myDcMxList.list.length > 0) {
          this.myDcMxList.list.forEach(function(item, index) {
            item.price = item.price.toString()
            if (item.price < 0 && !item.price.includes("-")) {
              item.price = "-" + item.price    
            }
          })
        }
      }
    },
    selectTime () { //切换日期选择时间
      let self = this;
      self.datePopShow = true
    },
    confirmDate (value) { //确认时间选择
      let self = this;
      self.currentDate = value;
      self.getMyDcMx();
      self.datePopShow = false
    },
    cancelDate () { //取消时间选择
      let self = this;
      self.datePopShow = false
    },
    formatter(type, value) { //时间模块显示格式化
      if (type === 'year') {
        return `${value}年`;
      } else if (type === 'month') {
        return `${value}月`
      }
      return value;
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
    text-align: right;
  }
  .dc-top {
    display: flex;
    justify-content: space-between;
    .dc-top-btn {
      display: flex;
      justify-content: center;
      align-items: center;
    }
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
			// border-bottom: 1px solid #eee;
			color: #666;
		}
		&__desc1 {
			color: #666;
		}
	}
</style>
