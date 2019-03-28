<template>
	<com-page>
		<com-header title="提现" is-back slot="header"></com-header>
		<div class="my-info">
			<img class="my__avatar" src="static/images/user.png" @click="$router.push('/my/info')"/>
			<div>
				<div>{{ userInfo.userName | phone }} <van-tag round color="rgb(229,96,3)">{{ userInfo.userLevel | vipLevel }}</van-tag></div>
				<div class="my_vip">会员账号: <span class="my_vip__acc">{{ userInfo.userName || 'a123123132' }}</span></div>
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
import { Toast } from 'vant';
import { list_mixins } from "@/mixins";
import { getUserByPhone, balanceTransfer } from "@/api/index.js"
import { paramConvert } from "@/utils/stringUtil.js"
export default {
  mixins: [list_mixins],
  data(){
    return {
      
    }
  },
  created () {
    this.getUserInfo()
  },
  watch: {
    
  },
  methods: {

  },
}
</script>

<style lang="scss">
.my{
	&_vip {
		display: flex;
		align-items: center;
		justify-content: flex-start;
		&__acc{
			width: 80px;
			outline: none;
			background: transparent;
			border: none;
		}
	}
}
</style>
