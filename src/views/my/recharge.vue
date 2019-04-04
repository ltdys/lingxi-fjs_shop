<template>
	<com-page class="recharge">
		<com-header title="购买钻石券" is-back slot="header"></com-header>
		<van-cell-group>
			<van-cell title="会员号" :value="userInfo.mobile"></van-cell>
			<van-cell title="当前钻石券数量" :value="userInfo.price | number"></van-cell>
		</van-cell-group>
		<van-cell-group>
			<van-field v-model="form.amount" label="购买数量" type="number" input-align="right" placeholder="请输入购买数量"></van-field>
			<van-cell title="付款途径" is-link clickable @click="show=true">
				<span v-if="channelName" class="f333">{{channelName}}</span>
				<span v-else>请选择</span>
			</van-cell>
			<van-cell>
				<div slot="title" class="recharge__tip">提交申请之后，后台审核通过即充值成功</div>
			</van-cell>
		</van-cell-group>
    <div class="submit_buttons">
      <van-button type="primary" block :disabled="rechargeShow" @click="setYECZ">提交购买申请</van-button>
    </div>
		<van-actionsheet slot="popup"
			v-model="show"
			cancel-text="取消"
			:actions="actions"
			@select="onSelect"
		/>
	</com-page>
</template>

<script>
import { Toast } from 'vant';
import { list_mixins } from "@/mixins";
import { setYECZ } from "@/api/index.js"
import { paramConvert } from "@/utils/stringUtil.js"
import { isPositiveInteger } from "@/utils/is"
export default {
	mixins: [list_mixins],
	data(){
		return {
			id: '', //用户id
			radio:1,
			show:false,
			actions:[
				{ name : '现金/POS机',value:1},
				{ name : '微信',value:2},
				{ name : '支付宝',value:3},
				{ name : '银行卡',value:4}
			],
			channelName:null,
			form:{
				amount:null,
				channel:null
			},
			rechargeShow: true
		}
	},
	watch: {
		form: {
			handler: function (val, old) {
				if (val.amount == null || val.amount == '') {
					this.rechargeShow = true
				} else {
					this.rechargeShow = false
				}
			},
			deep: true
		}
	},
	created () {
		this.id = this.$store.getters.getUserId
		this.getUserInfo()
	},
	methods: {
		async setYECZ () { //余额充值
			let self = this;
			if (!isPositiveInteger(this.form.amount)) {
				Toast({
					message: '充值金额必须为正整数',
					duration: 1500
				})
				return
			}
			if (!this.channelName) {
				Toast({
					message: '请选择付款途径',
					duration: 1500
				})
				return
			}
			let param = {
				id: this.id,
				price: self.form.amount,
				FeeChannel: this.form.channel
			}
			let queryParams = paramConvert(param)
			let resData = await setYECZ(queryParams, param)
      if (resData.status === 200 && resData.data.Success) {
				self.getUserInfo()
				Toast.success({
					message: '充值申请成功',
					duration: 1500
				});
				self.$router.push('/my/yl_list2')
			} else {
				Toast({
					message: '余额充值失败',
					duration: 1500
				})
			}
		},
		onSelect(item){
			this.show = false;
			this.form.channel = item.value
			this.channelName = item.name
		}
	},
}
</script>

<style lang="scss">
.recharge{
	&__tip{
		color:red;
		font-size: 12px;
	}
	// .submit_real{
	// 	background: rgba(236, 147, 0, 0.5);
	// 	border: none;
	// }
}

</style>
