<template>
	<com-page class="myinfo">
		<com-header title="个人资料" is-back slot="header"></com-header>
		<van-cell title="头像" is-link class="zl-cell">
			<img class="myinfo__avatar" :src="userInfo.icon | userImg" onerror="onerror=null;this.src='static/images/icon/user_defu.png'"/>
		</van-cell>
		<van-field label="姓名" :value="userInfo.userName" input-align="right"></van-field>
		<van-cell title="会员账号" :value="userInfo.userName"></van-cell>
		<van-cell title="手机号" :value="userInfo.mobile" is-link @click.native="$router.push('/my/update_phone')"></van-cell>
		<van-cell title="会员等级" :value="userInfo.userLevel | vipLevel"></van-cell>
		<van-cell title="邀请码" :value="userInfo.userName"></van-cell>
		<van-cell title="身份证号" :value="userInfo.card"></van-cell>
		<van-cell title="银行账号" is-link to="/my/bank?id=1"></van-cell>
		<van-cell title="收货地址" is-link to="/my/address"></van-cell>
		<!-- <van-field label="支付宝账号" input-align="right"></van-field> -->
		<!-- <van-field label="微信账号" input-align="right"></van-field> -->
    <div class="submit_buttons">
      <van-button type="primary" block>保存</van-button>
    </div>
	</com-page>
</template>

<script>
import { list_mixins } from "@/mixins";
export default {
	mixins: [list_mixins],
	data () {
		return {
			id: '', //用户id
		}
	},
	created () {
		this.id = this.$store.getters.getUserId
		this.getUserInfo()
	},
	mounted () {

	},
	methods: {
		onCopy () { //复制成功
			Toast({
				message: '复制成功',
				duration: 1500
			})
		},
		onError () { //复制失败
		
		},
	}
}
</script>

<style lang="scss">
.myinfo{
  &__avatar{
    border-radius: 50%;
    height: 30px;
		width: 30px;
		vertical-align: middle;
  }
	.zl-cell{
		display: flex;
    align-items: center;
	}
}
</style>
