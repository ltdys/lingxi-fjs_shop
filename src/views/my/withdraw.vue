<template>
	<com-page>
		<com-header title="回购" is-back is-click v-on:backClick="backClick" slot="header"></com-header>
		<div class="withdraw" @click="addBankCard" v-if="Object.keys(currentBankMess).length == 0">
			<!-- <img class="withdraw__avatar" :src="userInfo.icon | userImg" onerror="onerror=null;this.src='static/images/icon/user_defu.png'"/> -->
			<van-icon name="add" color="#ec9300" size="2em" />
			<div>添加到回购银行卡</div>
		</div>
		<div class="withdraw with_bank" @click="addBankCard" v-else>
			<div class="with_bank__name">{{ currentBankMess.BankName }}</div>
			<div class="with_bank__acco">{{ currentBankMess.AccountName }}</div>
		</div>
		<div class="text-prompt">输入回购金额</div>
		<van-cell-group>
			<van-field label="回购金额" type="number" input-align="right" placeholder="请输入回购金额" v-model="withdrawrNum"></van-field>
			<van-cell>
				<span class="f666">您的当前余额 <span class="amount">{{ userInfo.price | number }}</span> 钻石券</span>
			</van-cell>
		</van-cell-group>
		<div class="m-t withraw-info">
			<van-cell>
				<span>说明:</span>
			</van-cell>
			<van-cell>
				<span>1.回购手续费{{payMentFee}}%。系统直接扣除。</span>
			</van-cell>
			<van-cell>
				<span>2.回购必须为100.0的整数倍。</span>
			</van-cell>
			<van-cell>
				<span>3.回购申请72小时（3个工作日，遇节假日顺延）内处理。到帐时间以收款方银行为准。</span>
			</van-cell>
			<van-cell>
				<span>4.回购方式：目前仅支持银行转帐。</span>
			</van-cell>
		</div>
		<div class="submit_buttons">
			<van-button type="primary" block :disabled="autoWithdrawr" @click="cashDeposit">确认回购</van-button>
		</div>
	</com-page>
</template>

<script>
import { Toast, Dialog } from 'vant';
import { list_mixins } from "@/mixins";
import { cashWithdrawal, getPaymentFee } from "@/api/index.js"
import { paramConvert } from "@/utils/stringUtil.js"
import { isPositiveInteger } from "@/utils/is"
export default {
  mixins: [list_mixins],
  data(){
    return {
      step:1,
      withdrawrNum: null, //回购金额
			autoWithdrawr: true, //确认回购显示状态
			payMentFee: '0.00'  //回购手续费
    }
  },
  created () {
		this.getPaymentFee()
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
							message: '您最多可回购 '+ this.userInfo.price + ' 元'
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
					message: '请输入回购金额',
					duration: 1500
        })
        return
			} else if (Number(self.withdrawrNum) % 100 != 0) {
				Toast({
					message: '回购金额必须为100的整数倍',
					duration: 1500
				})
				return
			}
			self.cashWithdrawal()
		},
    async cashWithdrawal(){
			let self = this;
			console.log(self.withdrawrNum)
			let param = {
        id: self.userId,
        BankId: self.currentBankMess.BanklId,
        price: Number(self.withdrawrNum)
      }
			let queryParams = paramConvert(param)
			let resData = await cashWithdrawal(queryParams, param)
      if (resData.status === 200 && resData.data.Success) {
        console.log("回购申请成功",resData.data.Data)
        Toast.success({
					message: '回购申请成功',
					duration: 1500
				});
				self.$store.dispatch('setCurrentBankMess', {})
				self.$router.back()
			} else {
				Toast({
					message: resData.data.Msg || '回购申请失败',
					duration: 1500
				})
			}
		},
		async getPaymentFee () {
			let resData = await getPaymentFee()
			if (resData.status === 200 && resData.data.Success) {
				this.payMentFee = resData.data.Data.TXSXF
			}
		}
  },
}
</script>

<style lang="scss" scoped>
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
</style>
