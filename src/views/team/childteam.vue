<template>
	<com-page>
		<com-header title="我的钻友圈" is-back slot="header"></com-header>
		<div class="myteam-top">
			<div>
				<div><com-icon name="iconwode" slot="icon" class="lx-svg"></com-icon>{{myTeamSonData.username}} {{myTeamSonData.level}}</div>
				<div class="fa-color-default" @click="jumpChildRegister">注册下级会员帐户</div>
			</div>
			<div class="myteam-padd">姓名:{{currentUserInfo.realname}} 帐户:{{myTeamSonData.zhanghu}}</div>
			<div class="myteam-padd">注册时间: {{myTeamSonData.time}}</div>
		</div>
		<div class="myteam">
			<div>
				<div class="myteam-title">共收获奖励红包(钻石券)</div>
        <div class="myteam-num">{{myTeamSonData.price|number}}</div>
			</div>
			<div class="tl-r">
				<div class="myteam-title">钻友圈</div>
        <div class="myteam-num">{{myTeamSonData.num|number(0)}}</div>
			</div>
		</div>
		<div class="team-child">
      <div>我的钻友团队（{{myTeamSonData.zjxj}}人）</div>
		</div>

		<div v-for="(item, index) in myTeamSonData.list" :key="index" class="myteam-cell">
			<van-cell :title="item.username|phone" :label="item.level" is-link @click="changeTeam(item)">
				<com-icon name="iconwode" slot="icon" class="lx-svg"></com-icon>
				<div class="f333 tc">
					总业绩<br/>{{item.price|number}}元
				</div>
			</van-cell>
		</div>
	</com-page>
</template>

<script>
  import { Toast } from "vant"
	import { paramConvert } from "@/utils/stringUtil.js"
	import { getMyTeam, getMyTeamSon, getUserInfo } from "@/api/index.js"
	import { formatTime } from "@/utils/dateUtil"
	export default {
		data () {
			return {
        myTeamSonData: {},
        id: '',
				currentUserInfo: {},
			}
    },
    
    watch: {
      $route: {
        handler: function (val, oldVal) {
          this.id = this.$route.params.id
          this.getUserInfo()
        }
      },
      deep: true
    },

		computed: {
      userId: {
        get: function () {
          return this.$store.getters.getUserId
        }
      }
		},

		created () {
      this.id = this.$route.params.id
			this.getUserInfo()
		},

		methods: {
			async getMyTeamSon () {
				let id = this.id
        let queryParams = paramConvert({
          id: id
        })
        let resData = await getMyTeamSon(queryParams, { id: id })
        if (resData.status === 200 && resData.data.Success) {
					this.myTeamSonData = resData.data.Data
					this.myTeamSonData.time = formatTime(this.myTeamSonData.time, '{y}/{m}/{d} {h}:{i}')
        }
			},
			changeTeam (item) {
				this.$router.push('/team/childteam/' + item.id)
			},
			jumpChildRegister () {  //注册下级会员
			  this.$router.push({path:'/team/register',query:{
					mobile: this.currentUserInfo.mobile,
					realname: this.currentUserInfo.realname || ''
				}})
			},
			async getUserInfo () {
				let queryParams = paramConvert({ "uId": this.id })
				let resData = await getUserInfo(queryParams, { "uId": this.id })
				if (resData.status === 200 && resData.data.Success) {
					this.currentUserInfo = resData.data.Data
					this.getMyTeamSon()
				} else {
					Toast({
						message: resData.data.Msg || '获取用户信息失败',
						duration: 1500
					})
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.myteam-top {
		padding: 10px;
		div:nth-child(1) {
			display: flex;
			justify-content: space-between;
			height: 26px;
			line-height: 26px;
		}
		.myteam-padd {
			padding: 5px 28px;
		}
	}
	.myteam {
		background: #fff;
		padding: 20px 10px;
		display: flex;
		justify-content: space-between;
		.myteam-title{
			font-size: 14px;
			color: #666;
		}
		>div{
			flex: .5;
		}
		.myteam-num {
			font-size: 18px;
			color: #ff7b27;
		}
	}
	.team-child {
		padding: 15px 10px;
		display: flex;
		justify-content: space-between;
	}
	.lx-svg {
		margin: 5px;
	}
</style>

