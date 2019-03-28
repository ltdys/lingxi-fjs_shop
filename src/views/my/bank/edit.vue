<template>
	<com-page>
		<com-header :title="bankId?'银行卡编辑':'添加银行卡'" is-back slot="header"></com-header>
    <com-bank-edit
      :bank-info="currentBankMess"
      @save="onSave"
      @delete="onDelete"
      :is-saving="isSaving"
      :is-deleting="isDeleting"
      :show-delete="!!bankId"
    ></com-bank-edit>
	</com-page>
</template>

<script>
import { Toast } from 'vant';
import { list_mixins } from "@/mixins";
import BankEdit from "@/components/bank/edit";
import { setAddBank } from "@/api/index.js"
import { paramConvert } from "@/utils/stringUtil.js"
export default {
  mixins: [list_mixins],
  components: {
    [BankEdit.name] : BankEdit
  },
  data() {
    return {
      bankId: this.$route.params.id,
      bankInfo : {},
      isSaving:false,
      isDeleting:false,
    };
  },

  computed: {
    currentBankMess: {
      get: function () {
        return this.$store.getters.getCurrentBankMess
      }
    }
  },

  methods: {
    async setAddBank (value) { //新增银行卡
      let self = this;
      let param = {
        id: self.userId,
        BankName: value.BankName,
        BankCode: value.BankCode,
        AccountName: value.AccountName,
        SubBranch: value.SubBranch
      }
			let queryParams = paramConvert(param)
			let resData = await setAddBank(queryParams, param)
      if (resData.status === 200 && resData.data.Success) {
        Toast.success({
					message: '新增银行卡成功',
					duration: 1500
        });
        self.$router.back()
        console.log('新增银行卡',resData.data.Data)
			} else {
        Toast({
					message: resData.data.Msg || '新增银行卡失败',
					duration: 1500
				})
      }
		},
    onSave(value) {
      let self = this;
      if (!value.BankName || value.BankName == '') {
        Toast({
					message: '请输入银行名称',
					duration: 1500
        })
        return
      } else if (!value.BankCode || value.BankCode == '') {
        Toast({
					message: '请输入银行卡号',
					duration: 1500
        })
        return
      } else if (!value.AccountName || value.AccountName == '') {
        Toast({
					message: '请输入银行卡持有人',
					duration: 1500
        })
        return
      } else if (!value.SubBranch || value.SubBranch == '') {
        Toast({
					message: '请输入开户支行名称',
					duration: 1500
        })
        return
      }
      self.setAddBank(value)
    },
    onDelete() {
      this.isDeleting = true
    }
  }
};
</script>

<style lang="scss">
</style>
