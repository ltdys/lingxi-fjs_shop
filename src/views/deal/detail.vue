<template>
  <com-page>
    <com-header title="商品数量变动记录" is-back slot="header"></com-header>
    <van-list v-model="reLoading" :finished="reFinished" finished-text="没有更多了" @load="reLoadBottom">
      <van-cell v-for="(v,i) in tradeRecordList" :key="'d'+i">
        <div slot="title">
          <div class="deal_detail__title">{{ v.TypeName }}</div>
          <div class="deal_detail__date">{{ v.AddTime }}</div>
          <div class="deal_detail__reason" v-if="v.state == 2">{{ v.Info }}</div>
        </div>
        <div class="deal_detail__right">
          <div>{{ v.Num }}</div>
          <div
            class="deal_detail__status"
            :class="[{
              'deal_detail__status__success': v.Type == 1,
              'deal_detail__status__error': v.Type == 2
            }]">{{ v.Type }}</div>
        </div> 
      </van-cell>
    </van-list>
  </com-page>
</template>

<script>
import { list_mixins } from "@/mixins";
import { getTradeRecord } from "@/api/index"
import { paramConvert } from "@/utils/stringUtil.js"
export default {
  mixins: [list_mixins],

  data () {
    return {
      STATUS: ["待审核", "审核不通过", "审核通过"],
      tradeRecordList: [],
      // 分页操作
      pageIndex: 0,
      pageRows: 10,
      //加载
      reLoading: false,
      reFinished: false,
    }
  },

  created () {
  },

  methods: {
    async getTradeRecord () {
      let self = this
      let id = this.userId
      let queryParams = {
        id: id,
        pageIndex: this.pageIndex,
        rows: this.pageRows,
      }
      let resData = await getTradeRecord(paramConvert(queryParams), queryParams)
      if (resData.status === 200 && resData.data.Success) {
        let list = resData.data.Data;
        list.forEach((item, index) => {
          item.Type = self.typeChange(item.Type)
          self.tradeRecordList.push(item)
        })
        this.reLoading = false
        if (list.length == 0 || list.length < self.pageRows) {
          self.reFinished = true;
        }
      }
    },
    typeChange (type) { //状态转化编码
      let self = this;
      let state = ''
      if (type == 0) {
        state = '待审核'
      } else if (type == 1) {
        state = '审核通过'
      } else if (type == 2) {
        state = '拒绝'
      } else {
        state = ''
      }
      return state
    },
    reLoadBottom () { //下拉加载方法
      let self = this;
      if (self.reFinished){
        return
      }
      self.pageIndex ++
      self.getTradeRecord()
    }
  }
}
</script>

<style lang="scss">
.deal_detail {
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

