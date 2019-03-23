<template>
	<com-page class="more-more">
		<com-header title="更多" is-back slot="header"></com-header>
    <van-cell title="商品购买协议" is-link @click.native="$router.push('/more/protocol')"></van-cell>
    <van-cell title="修改登录密码" is-link @click.native="$router.push('/more/update_pwd')"></van-cell>
    <van-cell title="关于" is-link @click.native="$router.push('/more/about')"></van-cell>
	</com-page>
</template>

<script>
</script>

<style lang="scss">
.more-more{
}
</style>
