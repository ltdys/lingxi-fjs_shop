<template>
	<com-page>
		<com-header title="我的团队" is-back slot="header"></com-header>
		<div class="myteam-top" v-show="i > 1">
			<div>
				<div><com-icon name="iconwode" slot="icon" class="lx-svg"></com-icon>{{myTeamSonData.username}} {{myTeamSonData.level}}</div>
				<div class="fa-color-default" @click="jumpChildRegister">注册下级会员帐户</div>
			</div>
			<div class="myteam-padd">姓名:{{currentUserInfo.realname}} 帐户:{{myTeamSonData.zhanghu}}</div>
			<div class="myteam-padd">注册时间: {{myTeamSonData.time}}</div>
		</div>
		<div class="myteam">
			<div>
				<div class="myteam-title">总业绩(万元)</div>
				<template v-if="i < 1">
					<div class="myteam-num">{{myTeamData.price|number}}</div>
				</template>
				<template v-else>
					<div class="myteam-num">{{myTeamSonData.price|number}}</div>
				</template>
			</div>
			<div class="tl-r">
				<div class="myteam-title">团队人数(人)</div>
				<template v-if="i < 1">
					<div class="myteam-num">{{myTeamData.num|number(0)}}</div>
				</template>
				<template v-else>
					<div class="myteam-num">{{myTeamSonData.num|number(0)}}</div>
				</template>
			</div>
		</div>
		<div class="team-child">
			<template v-if="i < 1">
				<div>直接下属团队（{{myTeamData.zjxj}}人）</div>
			</template>
			<template v-else>
				<div>直接下属团队（{{myTeamSonData.zjxj}}人）</div>
			</template>
			<div class="a" @click="jumpRegister" v-show=" i <= 1">注册会员</div>
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
	import { paramConvert } from "@/utils/stringUtil.js"
	import { getMyTeam, getMyTeamSon, getUserInfo } from "@/api/index.js"
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
				currentTeam: {},
				currentUserInfo: {},
				i: 0
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
				let id = this.i === 0 ? this.userId : this.currentTeam.id
        let queryParams = paramConvert({
          id: id
        })
        let resData = await getMyTeamSon(queryParams, { id: id })
        if (resData.status === 200 && resData.data.Success) {
					this.i++
					this.myTeamSonData = resData.data.Data
					this.myTeamSonData.time = formatTime(this.myTeamSonData.time, '{y}/{m}/{d} {h}:{i}')
        }
			},
			changeTeam (item) {
				this.currentTeam = item
				this.getUserInfo()
			},
			jumpRegister () {  //注册会员
				let userInfo = JSON.parse(this.$store.getters.getUserInfo) || ''
			  this.$router.push({path:'/team/register',query:{
					mobile: userInfo.mobile,
					realname: userInfo.realname || ''
				}})
			},
			jumpChildRegister () {  //注册下级会员
			  this.$router.push({path:'/team/register',query:{
					mobile: this.currentUserInfo.mobile,
					realname: this.currentUserInfo.realname || ''
				}})
			},
			async getUserInfo () {
				let queryParams = paramConvert({ "uId": this.currentTeam.id })
				let resData = await getUserInfo(queryParams, { "uId": this.currentTeam.id })
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
			flex: .4;
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

