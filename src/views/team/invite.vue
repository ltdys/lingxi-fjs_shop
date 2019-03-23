<template>
	<com-page>
		<com-header title="推广二维码" is-back slot="header"></com-header>
        推广二维码推广二维码推广二维码推广二维码推广二维码推广二维码
	</com-page>
</template>

<script>
</script>

<style lang="scss">
.team {
  background: #ec9300;
	height: 3rem;
	color: #fff;
	text-align: center;
	padding: 10px;
	.team-title{
		font-size: 16px;
	}
  &__info {
		.team-num{
			font-size: 24px;
		}
	}
	&__info2{
		margin-top: 20px;
		display: flex;
		justify-content: space-between;
		>div{
			flex: .4;
		}
		.team-num{
			font-size: 18px;
		}
	}
}
</style>
