<template>
	<com-page>
		<com-header title="提现" is-back is-click v-on:backClick="backClick" slot="header"></com-header>
		<div class="withdraw" @click="addBankCard" v-if="Object.keys(currentBankMess).length == 0">
			<!-- <img class="withdraw__avatar" :src="userInfo.icon | userImg" onerror="onerror=null;this.src='static/images/icon/user_defu.png'"/> -->
			<van-icon name="add" color="#ec9300" size="2em" />
			<div>添加到提现银行卡</div>
		</div>
		<div class="withdraw with_bank" @click="addBankCard" v-else>
			<div class="with_bank__name">{{ currentBankMess.BankName }}</div>
			<div class="with_bank__acco">{{ currentBankMess.AccountName }}</div>
		</div>
		<div class="text-prompt">输入提现金额</div>
		<van-cell-group>
			<van-field label="提现金额" input-align="right" placeholder="请输入提现金额" v-model="withdrawrNum"></van-field>
			<van-cell>
				<span class="f666">您的当前余额 <span class="amount">{{ userInfo.price | number }}</span> 元</span>
			</van-cell>
		</van-cell-group>
		<div class="submit_buttons">
			<van-button type="primary" block :disabled="autoWithdrawr" @click="cashDeposit">确认提现</van-button>
		</div>
	</com-page>
</template>

<script>
import { Toast, Dialog } from 'vant';
import { list_mixins } from "@/mixins";
import { cashWithdrawal } from "@/api/index.js"
import { paramConvert } from "@/utils/stringUtil.js"
export default {
  mixins: [list_mixins],
  data(){
    return {
      step:1,
      withdrawrNum: null, //提现金额
      autoWithdrawr: true, //确认提现显示状态
    }
  },
  created () {
    this.getUserInfo()
	},
	computed: {
    currentBankMess: {
      get: function () {
        return this.$store.getters.getCurrentBankMess
      }
    }
  },
  watch: {
    withdrawrNum:{
      handler: function (val, old) {
        if (val == null || val == '') {
					this.autoWithdrawr = true
				} else {
					if (val > this.userInfo.price) {
						this.autoWithdrawr = true;
						Dialog.alert({
							message: '您最多可提现 '+ this.userInfo.price + ' 元'
						}).then(() => {
							// this.withdrawrNum = ''
						});
					} else {
						this.autoWithdrawr = false
					}
				}
      },
      deep: true
    }
  },
  methods: {
		backClick () { //返回事件处理
			this.$store.dispatch('setCurrentBankMess', {})
			this.$router.back();
		},
    addBankCard () { //添加银行卡
			let self = this;
			self.$router.push({
				path: '/my/bank',
				query:{
					id: 2
				}
			})
		},
		cashDeposit () {
			let self = this;
			if (Object.keys(self.currentBankMess).length == 0) {
				Toast({
					message: '请选择银行卡',
					duration: 1500
        })
        return
			} else if (self.withdrawrNum == '') {
				Toast({
					message: '请输入提现金额',
					duration: 1500
        })
        return
			}
			self.cashWithdrawal()
		},
    async cashWithdrawal(){
      let self = this;
			let param = {
        id: self.userId,
        BankId: self.currentBankMess.BanklId,
        price: Number(self.withdrawrNum)
      }
			let queryParams = paramConvert(param)
			let resData = await cashWithdrawal(queryParams, param)
      if (resData.status === 200 && resData.data.Success) {
        console.log("提现成功",resData.data.Data)
        Toast.success({
					message: '提现成功',
					duration: 1500
        });
				self.$router.back()
			} else {
				Toast({
					message: resData.data.Msg || '提现失败',
					duration: 1500
				})
			}
    }
  },
}
</script>

<style lang="scss">
.withdraw{
  text-align: center; 
  margin: 10px;
  padding: 15px;
	background: #FFF;
	border-radius: 5px;
	box-sizing: border-box;
  &__avatar{
    height: 50px;
    width: 50px;
    border-radius: 50%;
  }
}
.with_bank{
	color: #FFF;
	background: #48bca0;
	&__name{
		font-size: 16px;
	}
	&__acco{
		margin-top: 10px;
		font-size: 14px;
	}
}
.f666{
  font-size: 12px;
}
</style>
