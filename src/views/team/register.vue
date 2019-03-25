<template>
  <com-page>
    <com-header title="注册会员" is-back slot="header"></com-header>
    <van-cell title="推荐人账号" value="ab123445"></van-cell>
    <van-cell title="推荐人姓名" value="王大锤"></van-cell>
    <van-field class="m-t" type="tel" label="手机号" placeholder="请输入手机号"></van-field>
    <van-field label="密码" placeholder="请输入密码"></van-field>
    <van-field label="姓名" placeholder="请输入姓名"></van-field>
    <van-field label="身份证号" placeholder="请输入身份证号"></van-field>
    <div class="submit_buttons">
      <van-button type="primary" block>立即注册</van-button>
    </div>
  </com-page>
</template>

<script>
  export default {
		data () {
			return {
				formData: {
					
				}
			}
		}
	}
</script>

<style lang="scss">
</style>
