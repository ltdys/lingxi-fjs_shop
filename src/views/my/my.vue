<template>
	<com-page>
		<com-header title="我的" slot="header"></com-header>
		<div class="my-info">
			<img class="my__avatar" src="static/images/user.png" @click="$router.push('/my/info')"/>
			<div>
				<div>133****2332 <van-tag round color="rgb(229,96,3)">资深交易员</van-tag></div>
				<div class="m-t-sm my_vip">
					<!-- <input class="my_vip__acc" id="account" value="a12312312" readonly> -->
					<span>会员账号：<span class="my_vip__acc">a12312312</span></span>
					<!-- <span class="my_vip__copy"
						@click="copyVip"
						>复制</span> -->
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
					<div>{{12321321 | number}}</div>
				</div>
				<van-row class="my__navs">
					<van-col span="8">
						<van-button type="primary" class="my__navs__topup" round size="small" @click="$router.push('/my/recharge')">充值</van-button>
					</van-col>
					<van-col span="8">
						<van-button type="primary" class="my__navs__auto" round size="small" @click="$router.push('/my/transfer')">转账</van-button>
					</van-col>
					<van-col span="8">
						<van-button type="primary" class="my__navs__cash" plain round size="small" @click="$router.push('/my/withdraw')">提现</van-button>
					</van-col>
				</van-row>
			</div>
			<van-cell-group class="m-t">
				<van-cell class="my-order" title="我的订单" icon="records" value="查看全部订单" is-link to="/my/order"></van-cell>
				<van-row class="my-links">
					<van-col class="my_img" span="6" @click.native="$router.push('/my/order?tab=1')">
						<img class="my_img__box" src="static/images/icon/all_order.png" alt="">全部
					</van-col>
					<van-col class="my_img" span="6" @click.native="$router.push('/my/order?tab=2')">
						<img class="my_img__box" src="static/images/icon/pay_order.png" alt="">待付款
					</van-col>
					<van-col class="my_img" span="6" @click.native="$router.push('/my/order?tab=3')">
						<img class="my_img__box" src="static/images/icon/car_order.png" alt="">待收货
					</van-col>
					<van-col class="my_img" span="6" @click.native="$router.push('/my/order?tab=3')">
						<img class="my_img__box" src="static/images/icon/finish_order.png" alt="">已完成
					</van-col>
				</van-row>
			</van-cell-group>
			<van-cell-group>
				<van-cell icon="balance-o" title="余额充值申请记录" is-link to="/my/yl_list2">
				</van-cell>
				<van-cell  icon="balance-pay"  title="余额变动明细" is-link  to="/my/yl_list">
				</van-cell>
				<van-cell icon="more-o" title="更多" is-link to="/more">
				</van-cell>
			</van-cell-group>
		</div>
	</com-page>
</template>

<script>
import { getUserInfo } from "@/api/index.js"
import { paramConvert } from "@/utils/stringUtil.js"
export default {
	data () {
		return {
			id: '', //用户id
			sysAppIds: 'a12312312', //会员账号
		}
	},
	created () {
		this.id = this.$store.getters.getUserId
		console.log('id',this.id)
    this.getUserInfo()
  },
	mounted () {

	},
	methods: {
		//获取用户消息
		async getUserInfo () {
			let queryParams = paramConvert({ "uId": this.id })
			let resData = await getUserInfo(queryParams, { "uId": this.id })
      if (resData.status === 200 && resData.data.Success) {
        console.log(resData)
			}
		},
		onCopy () { //复制成功
			alert('复制成功')
		},
		onError () { //复制失败
		
		},
	}
}
</script>


<style lang="scss">

.my {
	&-main{
		// padding: 15px;
	}
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
		&__box{
			display: block;
			// width: 32px;
			height: 32px;
			margin-bottom: 12px;
		}
	}
}
</style>
