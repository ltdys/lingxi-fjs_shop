<template>
	<com-page>
		<com-header title="我的银行卡" is-back slot="header"></com-header>
    <com-bank-list
      v-model="chosenBankId"
      :list="list"
      :switchable="switchable"
      
      @add="onAdd"
      @edit="onEdit"
      @select="$emit('select',$event)"
      @selectBank="backBank"
    >
    </com-bank-list>
	</com-page>
</template>

<script>
import { Toast } from 'vant';
import { list_mixins } from "@/mixins";
import BankList from '@/components/bank/list'
import { getMyBank } from "@/api/index.js"
import { paramConvert } from "@/utils/stringUtil.js"
export default {
  mixins: [list_mixins],
  props:{
    switchable:Boolean
  },
  components:{
    [BankList.name]:BankList
  },
  data() {
    return {
      chosenBankId:1,
      list:[{
        id:1,
        name:'农业银行',
        cardno:'12312321312312312312'
      }]
    };
  },
  created () {
		this.getMyBank()
	},
  methods: {
    async getMyBank () { //查询我的银行卡列表
      let self = this;
      let param = {
        id: self.userId
      }
			let queryParams = paramConvert(param)
			let resData = await getMyBank(queryParams, param)
      if (resData.status === 200 && resData.data.Success) {
        self.list = resData.data.Data
        console.log('查询我的银行卡列表',resData.data.Data)
			} else {
        Toast({
					message: resData.data.Msg || '查询我的银行卡列表失败',
					duration: 1500
				})
      }
		},
    onAdd() {
      this.$router.push("/my/bank_add");
    },
    onEdit(item, index) {
      console.info(item)
      Toast({
        message: '暂不支持修改银行卡',
        duration: 1500
      })
      // this.$store.dispatch('setCurrentBankMess', item)
      // this.$router.push("/my/bank/" + item.Mid);
    },
    backBank (bank) { //选择当前银行
      let self = this;
      let queryId = self.$route.query.id
      if (queryId == 2) {
        this.$store.dispatch('setCurrentBankMess', bank)
        // this.$router.push("/my/withdraw");
        this.$router.back();
      }
    },

    // async getMyBank () { //模板
    //   let self = this;
    //   let param = {
    //     id: self.userId
    //   }
		// 	let queryParams = paramConvert(param)
		// 	let resData = await getMyBank(queryParams, param)
    //   if (resData.status === 200 && resData.data.Success) {
    //     console.log('查询我的银行卡列表',resData.data.Data)
		// 	} else {
    //     Toast({
		// 			message: resData.data.Msg || '查询我的银行卡列表失败',
		// 			duration: 1500
		// 		})
    //   }
		// },
  }
};
</script>


<style lang="scss">
.mt-bankitem {
  color: #fff;
  background: #fff;
  .mt-box {
    background: #48bca0;
    // background: #f67676;
  }
  // &.green .mt-box{
  //   background: #48bca0;
  // }
  // &.blue .mt-box{
  //   background: #7290e1;
  // }
  .mt-bankitem-content {
    padding: 5px 0;
  }
  &-content {
    display: flex;
  }
  &-logo {
    width: 100px;
  }
  &-info {
    flex: 1;
    .mt-bankitem-name {
      font-size: 16px;
    }
    .mt-bankitem-type {
      font-size: 12px;
    }
    .mt-bankitem-idno {
      font-size: 18px;
      margin-top: 8px;
    }
  }
  &-action {
    .mt-bankitem-button {
      color: #fff;
      border: none;
      background: rgba(#fff, 0.2);
      border-radius: 4px;
      padding: 4px 10px;
      line-height: 1;
      font-size: 12px;
    }
  }
}
</style>

