<template>
	<com-page>
		<com-header title="兑换券记录" is-back slot="header"></com-header>
    <van-list class="yllist2_list" v-model="reLoading" :finished="reFinished" finished-text="没有更多了" @load="reLoadBottom">
      <van-cell v-for="(v,i) in rechargeList" :key="'d'+i">
        <div slot="title">
          <div class="yllist2_list__title">{{ v.typename }}</div>
          <div class="yllist2_list__date">{{ v.date | date('yyyy-MM-dd hh:mm') }}</div>
          <div class="yllist2_list__reason" v-if="v.state == 2">{{ v.info }}</div>
        </div>
        <div class="yllist2_list__right">
          <div>+{{ v.price }}</div>
          <div
            class="yllist2_list__status"
            :class="[{
              'yllist2_list__status__success': v.state == 1,
              'yllist2_list__status__error': v.state == 2
            }]">{{ v.status }}</div>
        </div> 
      </van-cell>
    </van-list>
	</com-page>
</template>

<script>
import { list_mixins } from "@/mixins";
import { Toast } from "vant";
import { getMyYECZMx } from "@/api/index.js"
import { paramConvert } from "@/utils/stringUtil.js"
export default {
  mixins: [list_mixins],
  data() {
    return {
      STATUS: ["待审核", "审核不通过", "审核通过"],
      isFinished2: false,
      rechargeList: [], //余额充值列表
      // 分页操作
      pageIndex: 0,
      pageRows: 10,
      //加载
      reLoading: false,
      reFinished: false,
    };
  },
  created () {
    let self = this;
  },
  methods: {
    async getMyYECZMx () { //根据用户ID获取余额充值明细
      let self = this;
      let param = {
        id: self.userId,
        pageIndex: self.pageIndex,
        pageRows: self.pageRows,
      }
			let queryParams = paramConvert(param)
			let resData = await getMyYECZMx(queryParams, param)
      if (resData.status === 200 && resData.data.Success) {
        let list = resData.data.Data;
        list.forEach((item, index) => {
          item.state = self.statusChange(item.status)
          self.rechargeList.push(item)
        })
        self.reLoading = false;
        if (list.length == 0 || list.length < self.pageRows) {
          self.reFinished = true;
        }
        console.log('获取余额充值明细',resData)
			}
    },
    statusChange (name) { //状态转化编码
      let self = this;
      let state = 0
      if (name == '待审核') {
        state = 0
      } else if (name == '审核通过') {
        state = 1
      } else if (name == '拒绝') {
        state = 2
      }
      return state
    },
    reLoadBottom () { //下拉加载方法
      let self = this;
      if (self.reFinished){
        return
      }
      self.pageIndex ++
      self.getMyYECZMx()
    },
  }
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
    color: #ec9300;
    font-size: 12px;
    &__success {
      color: #07c160;
    }
    &__error {
      color: #ee4442;
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
