<template>
	<com-page>
		<com-header title="我的" slot="header"></com-header>
		<div class="my-info">
				<img class="my__avatar" src="static/images/user.png" @click="$router.push('/my/info')"/>
				<div>
					<div>133****2332 <van-tag round color="rgb(229,96,3)">资深交易员</van-tag></div>
					<div class="m-t-sm">会员账号：a12312312</div>
				</div>
					<vue-q-art :config="config"></vue-q-art>
		</div>
		<div class="my-main">
			<div class="my_info2">
				<div class="my_info2__num">
					<div>余额（元）</div>
					<div>{{12321321 | number}}</div>
				</div>
				<van-row class="my__navs">
					<van-col span="8">
						<van-button type="primary" plain round size="small" @click="$router.push('/my/recharge')">充值</van-button>
					</van-col>
					<van-col span="8">
						<van-button type="primary" plain round size="small" @click="$router.push('/my/transfer')">转账</van-button>
					</van-col>
					<van-col span="8">
						<van-button type="primary" plain round size="small" @click="$router.push('/my/withdraw')">提现</van-button>
					</van-col>
				</van-row>
			</div>
			<van-cell-group class="m-t">
				<van-cell title="我的订单" icon="records" value="查看全部订单" is-link to="/my/order"></van-cell>
				<van-row class="my-links">
					<van-col span="8" @click.native="$router.push('/my/order?tab=1')">
						<van-icon name="pending-payment" />待付款
					</van-col>
					<van-col span="8" @click.native="$router.push('/my/order?tab=2')">
						<van-icon name="tosend" />待发货
					</van-col>
					<van-col span="8" @click.native="$router.push('/my/order?tab=3')">
						<van-icon name="logistics" />已发货
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
import VueQArt from 'vue-qart'
export default {
	components: {
		VueQArt
	},
	data () {
		return {
			config: {
				size: 50,
				value: 'http://192.168.0.103:8000/#/my',
				imagePath: 'static/images/user.png',
				filter: 'threshold',
				background: '#FFF',
			},
			downloadButton: false
		}
	},
	mounted () {

	},
	motheds: {

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
}
</style>
