<template>
	<com-page>
		<com-header title="我的" slot="header"></com-header>
		<div class="my-info">
			<img class="my__avatar" :src="userInfo.icon | userImg" onerror="onerror=null;this.src='static/images/icon/user_defu.png'" @click="$router.push('/my/info')"/>
			<div>
				<div>{{ userInfo.userName | phone }} <van-tag round color="rgb(229,96,3)">{{ userInfo.userLevel | vipLevel }}</van-tag></div>
				<div class="m-t-sm my_vip">
					<span>会员账号：<span class="my_vip__acc">{{ userInfo.userName || 'a123123132' }}</span></span>
					<van-button
						type="primary"
						size="mini"
						plain
						hairline
						class="my_vip__copy"
						v-clipboard:copy="sysAppIds"
						v-clipboard:success="onCopy"
						v-clipboard:error="onError">复制</van-button>
				</div>
			</div>
		</div>
		<div class="my-main">
			<div class="my_info2">
				<div class="my_info2__num">
					<div>余额（元）</div>
					<div>{{userInfo.price | number}}</div>
				</div>
				<van-row class="my__navs">
					<van-col span="8">
						<van-button type="primary" class="my__navs__topup" round size="small" @click="$router.push('/my/recharge')">充值</van-button>
					</van-col>
					<van-col span="8">
						<van-button type="primary" class="my__navs__auto" round size="small" @click="$router.push('/my/transfer')">转账</van-button>
					</van-col>
					<van-col span="8">
						<van-button type="primary" class="my__navs__cash" plain round size="small" @click="$router.push('/my/withdraw')" :disabled="isPay !== '1'">提现</van-button>
					</van-col>
				</van-row>
			</div>
			<van-cell-group class="m-t">
				<van-cell class="my-order" title="我的订单" icon="records" value="查看全部订单" is-link to="/my/order"></van-cell>
				<van-row class="my-links">
					<van-col class="my_img" span="6" @click.native="$router.push('/my/order?tab=0')">
						<div class="my-order">
							<img class="my_img__box" src="static/images/icon/all_order.png" alt="">
							<span class="my_img__num" v-show="userInfo.dingdanqb && userInfo.dingdanqb != 0">{{ userInfo.dingdanqb }}</span>
						</div>
						<div>全部</div>
					</van-col>
					<van-col class="my_img" span="6" @click.native="$router.push('/my/order?tab=1')">
						<div class="my-order">
							<img class="my_img__box" src="static/images/icon/pay_order.png" alt="">
							<span class="my_img__num" v-show="userInfo.dingdandfk && userInfo.dingdandfk != 0">{{ userInfo.dingdandfk }}</span>
						</div>
						<div>待付款</div>
					</van-col>
					<van-col class="my_img" span="6" @click.native="$router.push('/my/order?tab=2')">
						<div class="my-order">
							<img class="my_img__box" src="static/images/icon/car_order.png" alt="">
							<span class="my_img__num" v-show="userInfo.dingdanyfk && userInfo.dingdanyfk != 0">{{ userInfo.dingdanyfk }}</span>
						</div>
						<div>待收货</div>
					</van-col>
					<van-col class="my_img" span="6" @click.native="$router.push('/my/order?tab=3')">
						<div class="my-order">
							<img class="my_img__box" src="static/images/icon/finish_order.png" alt="">
							<span class="my_img__num" v-show="userInfo.dingdanywc && userInfo.dingdanywc != 0">{{ userInfo.dingdanywc }}</span>
						</div>
						<div>已完成</div>
					</van-col>
				</van-row>
			</van-cell-group>
			<van-cell-group>
				<van-cell icon="balance-o" title="余额充值申请记录" is-link to="/my/yl_list2">
				</van-cell>
				<van-cell  icon="balance-pay"  title="余额变动明细" is-link  to="/my/yl_list">
				</van-cell>
				<van-cell  icon="exchange"  title="退出登录" is-link @click="loginOut">
				</van-cell>
				<van-cell  icon="records"  title="提现纪录" is-link to="/my/yl_list3">
				</van-cell>
				<van-cell icon="more-o" title="更多" is-link to="/more">
				</van-cell>
			</van-cell-group>
		</div>
	</com-page>
</template>

<script>
import { Toast, Badge, GoodsAction, GoodsActionMiniBtn } from 'vant';
import { list_mixins } from "@/mixins";
import { clearStorage } from "@/utils/storage.js"
import { getPaymentFee } from "@/api/index.js"
export default {
	mixins: [list_mixins],
	components: {
    Badge, GoodsAction, GoodsActionMiniBtn
  },
	data () {
		return {
			id: '', //用户id
			sysAppIds: 'a12312312', //会员账号
			isPay: '0',  //是否可提现,1为可以提现
		}
	},
	created () {
		this.id = this.$store.getters.getUserId
		this.getPaymentFee()
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
			Toast({
				message: '复制失败',
				duration: 1500
			})
		},
		loginOut () {  //退出登录
			this.$store.dispatch('setClearAll', '')
			clearStorage()
			this.$router.push('/team/login')
		},
		async getPaymentFee () {
			let resData = await getPaymentFee()
			if (resData.status === 200 && resData.data.Success) {
				this.isPay = resData.data.Data.SFKTX
			}
		}
	}
}
</script>


<style lang="scss">

.my {
  &-info {
    // background: #f5c678;
    background: #ec9300;
    padding: 30px 10px;
    display: flex;
    align-items: center;
    color: #fff;
    padding-bottom: 80px;
  }
  &_info2 {
    margin: 10px;
    background: #fff;
    border-radius: 5px;
    padding: 15px 20px;
    margin-top: -1rem;
    &__num {
      margin-bottom: 10px;
      > :nth-child(1) {
        font-size: 14px;
        color: #666;
      }
      > :nth-child(2) {
        margin-top: 5px;
        font-size: 28px;
        color: #ff7b27;
      }
    }
  }
  &__navs {
    display: flex;
    text-align: center;
    .van-button {
      min-width: 85px;
    }
  }
  &__avatar {
    height: 50px;
    width: 50px;
    border-radius: 50%;
    margin-right: 10px;
  }

  &-links {
    padding: 15px 0;
    font-size: 12px;
    text-align: center;
    .van-icon {
      display: block;
      font-size: 24px;
    }
  }
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
		&__copy {
			width: 27px;
			height: 15px;
			text-align: center;
			line-height: 15px;
			border-radius: 50px;
			font-size: 10px;
			margin-left: 10px;
			background: transparent;
		}
	}
	&_img{
		display: flex;
    flex-direction: column;
    align-items: center;
		justify-content: center;
		.my-order{
			position: relative;
		}
		&__box{
			display: block;
			// width: 32px;
			height: 32px;
			margin-bottom: 12px;
		}
		&__num{
			position: absolute;
			top: -7px;
			right: -7px;
			width: 16px;
			height: 16px;
			font-size: 12px;
			line-height: 16px;
			text-align: center;
			border: 1px solid #FFB54C;
			color: #FFB54C;
			border-radius: 50%;
			background: #FFF;
		}
	}
	&-main {
		min-height: 100vh;
	}
}
</style>
