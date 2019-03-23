<template>
	<com-page class="more-pwd">
		<com-header title="修改登录密码" is-back slot="header"></com-header>
    <van-field label="旧密码" placeholder="请输入旧密码"></van-field>
    <van-field label="新密码"  placeholder="请输入新密码"></van-field>
    <van-field label="确认新密码"  placeholder="请再次输入新密码"></van-field>

    <div class="submit_buttons">
      <van-button type="primary" block>修改密码</van-button>
    </div>
	</com-page>
</template>

<script>
</script>

<style lang="scss">
.more-pwd{
}
</style>
