<template>
	<com-page>
		<com-header title="我的团队" is-back slot="header"></com-header>
		<div class="myteam">
			<div>
				<div class="myteam-title">总业绩(万元)</div>
				<div class="myteam-num">{{300|number}}</div>
			</div>
			<div>
				<div class="myteam-title">团队人数(人)</div>
				<div class="myteam-num">{{180|number(0)}}</div>
			</div>
		</div>
		<div class="team2">
			<div>直接下属团队（5人）</div>
			<div class="a" @click="$router.push('/team/register')">注册会员</div>
		</div>
		<van-cell :title="'1331234123'|phone" label="交易员" v-for="i in 20" :key="i">
			<com-icon name="iconwode" slot="icon"></com-icon>
			<div class="f333 tc">
				总业绩<br/>{{10000|number}}元
			</div>
		</van-cell>
	</com-page>
</template>

<script>
</script>

<style lang="scss">
.myteam {
	background: #fff;
	text-align: center;
	padding: 20px;
	display: flex;
	justify-content: space-between;
	.myteam-title{
		font-size: 14px;
		color: #666;
	}
	>div{
		flex: .4;
	}
	.myteam-num{
		font-size: 18px;
		color: #ff7b27;
	}
}
.team2{
	padding: 15px 10px;
	display: flex;
	justify-content: space-between;
}
</style>
