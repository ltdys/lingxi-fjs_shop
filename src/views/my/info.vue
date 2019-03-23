<template>
	<com-page class="myinfo">
		<com-header title="个人资料" is-back slot="header"></com-header>
		<van-cell title="头像" is-link>
			<img class="myinfo__avatar" src="static/images/user.png"/>
		</van-cell>
		<van-cell title="会员账号" value="ab123456">
		</van-cell>
		<van-field label="姓名" value="王大锤" input-align="right"></van-field>
		<van-cell title="手机号" value="133****0988" is-link @click.native="$router.push('/my/update_phone')"></van-cell>
		<van-cell title="会员等级" value="资深交易员"></van-cell>
		<van-cell title="身份证号" value="43122********093x"></van-cell>
		<van-cell title="银行账号" is-link to="/my/bank"></van-cell>
		<van-cell title="收货地址" is-link to="/my/address"></van-cell>
		<van-field label="支付宝账号" input-align="right"></van-field>
		<van-field label="微信账号" input-align="right"></van-field>
    <div class="submit_buttons">
      <van-button type="primary" block>保存</van-button>
    </div>
	</com-page>
</template>

<script>
</script>

<style lang="scss">
.myinfo{
  &__avatar{
    border-radius: 50%;
    height: 30px;
		width: 30px;
		vertical-align: middle;
  }
}
</style>
