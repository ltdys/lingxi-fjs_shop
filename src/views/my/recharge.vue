<template>
	<com-page class="recharge">
		<com-header title="余额充值" is-back slot="header"></com-header>
		<van-cell-group>
			<van-cell title="账号" value="15800804609"></van-cell>
			<van-cell title="余额" value="10,000"></van-cell>
		</van-cell-group>
		<van-cell-group>
			<van-field v-model="form.amount" label="充值金额" type="number" input-align="right" placeholder="请输入充值金额"></van-field>
			<van-cell title="付款途径" is-link clickable @click="show=true">
				<span v-if="channelName" class="f333">{{channelName}}</span>
				<span v-else>请选择</span>
			</van-cell>
			<van-cell>
				<div slot="title" class="recharge__tip">提交申请之后，后台审核通过即充值成功</div>
			</van-cell>
		</van-cell-group>
    <div class="submit_buttons">
      <van-button type="primary" block>提交充值申请</van-button>
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
export default {
	data(){
		return {
			radio:1,
			show:false,
			actions:[
				{ name : '现金/POST机',value:1},
				{ name : '微信',value:2},
				{ name : '支付宝',value:3},
				{ name : '银行卡',value:4}
			],
			channelName:null,
			form:{
				amount:null,
				channel:null
			}
		}
	},
	methods: {
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
}
</style>
