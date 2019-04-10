<template>
	<com-page>
		<com-header title="我的钻友圈" is-back slot="header"></com-header>
		<div class="myteam">
			<div>
				<div class="myteam-title">共收获奖励红包(钻石券)</div>
				<div class="myteam-num">{{myTeamData.price|number}}</div>
			</div>
			<div class="tl-r">
				<div class="myteam-title">钻友圈</div>
				<div class="myteam-num">{{myTeamData.num|number(0)}}</div>
			</div>
		</div>
		<div class="team-child">
			<div>我的钻友（{{myTeamData.zjxj}}人）</div>
			<div class="a" @click="jumpRegister">注册钻友</div>
		</div>

		<div v-for="(item, index) in myTeamSonData.list" :key="index" class="myteam-cell">
			<van-cell :title="item.username|phone" :label="item.level" is-link @click="changeTeam(item)">
				<com-icon name="iconwode" slot="icon" class="lx-svg"></com-icon>
				<div class="f333 tc">
					收获红包(钻石券)<br/>{{item.price}}
				</div>
			</van-cell>
		</div>
	</com-page>
</template>

<script>
	import { paramConvert } from "@/utils/stringUtil.js"
	import { getMyTeam, getMyTeamSon } from "@/api/index.js"
	import { formatTime } from "@/utils/dateUtil"
	export default {
		data () {
			return {
				myTeamData: {
					price: 0,
					num: 0,
					zjzxj: 0
				},
				myTeamSonData: {},
			}
		},

		computed: {
      userId: {
        get: function () {
          return this.$store.getters.getUserId
        }
      }
		},

		created () {
			this.getMyTeam()
		},

		methods: {
			async getMyTeam () {
				let id = this.userId
        let queryParams = paramConvert({
          id: id
        })
        let resData = await getMyTeam(queryParams, { id: id })
        if (resData.status === 200 && resData.data.Success) {
					this.myTeamData = resData.data.Data
					this.getMyTeamSon()
        }
			},
			async getMyTeamSon () {
				this.myTeamSonList = []
				let id = this.userId
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
			jumpRegister () {  //注册会员
				let userInfo = JSON.parse(this.$store.getters.getUserInfo) || ''
			  this.$router.push({path:'/team/register',query:{
					mobile: userInfo.mobile,
					realname: userInfo.realname || ''
				}})
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

