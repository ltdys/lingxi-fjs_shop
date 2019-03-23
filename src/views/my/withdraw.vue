<template>
	<com-page>
		<com-header title="提现" is-back slot="header"></com-header>
		<div class="my-info">
				<img class="my__avatar" src="static/images/user.png" @click="$router.push('/my/info')"/>
				<div>
						<div>133****2332 <van-badge size="small" type="primary">资深交易员</van-badge></div>
						<div>会员账号:a12312312</div>
				</div>
		</div>
		<div class="my_info2">
			<div class="my_info2__num">
				<div>余额（元）</div>
				<div>12321321.00</div>
			</div>
			<div class="my__navs">
				<van-button type="primary" block @click="$router.push('/my/recharge')">充值</van-button>
				<van-button type="primary" block class="m-l" @click="$router.push('/my/transfer')">转账</van-button>
				<van-button type="primary" block class="m-l" @click="$router.push('/my/withdraw')">提现</van-button>
			</div>
		</div>
	</com-page>
</template>

<script>
</script>

<style lang="scss">
</style>
