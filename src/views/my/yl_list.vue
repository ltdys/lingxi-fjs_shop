<template>
	<com-page>
		<com-header title="余额变动明细" is-back slot="header"></com-header>
    <div class="yu_e">
      <van-button round size="small" type="default" @click="selectTime">
        <div class="yu_e_btn">
          <span class="yu_e_btn__span">{{ currentDate | date('yyyy-MM') }}</span>
          <van-icon :name="iconName" />
        </div>
      </van-button>
      <div class="yu_e_income">
        <div class="f666"><span class="f666__gr">收入</span>{{ changeList.sr | number }}</div>
        <div class="f666"><span class="f666__re">支出</span>{{ changeList.zc | number }}</div>
      </div>
    </div>
    <div class="m-main">
      <van-cell
        :title="v.typename"
        v-for="(v,i) in changeList.list"
        :key="i"
        :label="v.date | date('yyyy-MM-dd hh:mm')"
        :value="v.price"
        :value-class="[{'re': v.price < 0}]">
      </van-cell>
      <div class="m-main-default" v-if="changeList.list && changeList.list.length == 0">没有更多数据了~</div>
    </div>
    <van-popup v-model="datePopShow" position="bottom">
      <van-datetime-picker
        v-model="currentDate"
        type="year-month"
        :formatter="formatter"
        @confirm="confirmDate"
        @cancel="cancelDate"
      />
    </van-popup>
    
	</com-page>
</template>

<script>
import { list_mixins } from "@/mixins";
import { Toast } from "vant";
import { getMyYEMx } from "@/api/index.js"
import { paramConvert } from "@/utils/stringUtil.js"
import { getDateFormat } from "@/utils/dateUtil.js"
export default {
  mixins: [list_mixins],
  data() {
    return {
      iconName: 'arrow-down', //日期选择图标
      datePopShow: false, //日期选择弹框
      currentDate: new Date(), //当前日期
      STATUS: ["待审核", "审核不通过", "审核通过"],
      isFinished2:false,
      changeList: {}, //余额充值列表
    };
  },
  created() {
    this.getMyYEMx()
  },
  methods: {
    async getMyYEMx () { //根据用户ID获取余额充值明细
      let self = this;
      let param = {
        id: self.userId,
        date: getDateFormat(self.currentDate, 'yyyy-MM')
      }
      console.log(param)
			let queryParams = paramConvert(param)
			let resData = await getMyYEMx(queryParams, param)
      if (resData.status === 200 && resData.data.Success) {
        let list = resData.data.Data;
        self.changeList = list;
        console.log('根据用户ID获取余额充值明细',resData)
        // list.forEach((item, index) => {
        //   // item.state = self.statusChange(item.status)
        //   self.rechargeList.push(item)
        // })
        // self.reLoading = false;
        // if (list.length == 0 || list.length < self.pageRows) {
        //   self.reFinished = true;
        // }
			}
    },
    selectTime () { //切换日期选择时间
      let self = this;
      self.datePopShow = true
    },
    confirmDate (value) { //确认时间选择
      let self = this;
      self.currentDate = value;
      self.getMyYEMx();
      self.datePopShow = false
      console.log(value)
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

<style lang="scss">
.m-main{
  margin-top: 50px;
  .yllist_count {
    margin-bottom: 10px;
    padding: 0 10px;
    margin-top: 10px;
  }
  &-default{
    text-align: center;
    color: #969799;
    font-size: 12px;
  }
}

.yu_e{
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: fixed;
  top: 0.92rem;
  left: 0;
  z-index: 10;
  width: 100%;
  height: 50px;
  padding: 0 10px;
  background: #eaeef1;
  box-sizing: border-box;
  &_btn{
    display: flex;
    justify-content: center;
    align-items: center;
    &__span{
      margin-right: 5px;
    }
  }
  &_income{
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    font-size: 12px;
    .f666{
      &__gr{
        margin-right: 10px;
        color: #07c160;
      }
      &__re{
        margin-right: 10px;
        color: #ee4442;
      }
    }
  }
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
.gr{
  color: #07c160;
}
.re{
  color: #ee4442;
}
</style>
