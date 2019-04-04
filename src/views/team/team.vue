<template>
	<com-page>
		<com-header title="钻友圈" slot="header" is-back></com-header>
		<div class="team" v-for="(item, index) in teamList" :key="index">
			<div class="team__info">
				<div class="team-title">{{teamList[index].title || '--'}}</div>
				<div class="team-num">
          <span class="zs-text">奖励红包数量：</span>
          {{teamList[index].price}}&nbsp; 
          <span class="zs-text">钻石卷</span>
        </div>
			</div>
			<div class="team__info2">
				<div>
					<div class="team-title">本月奖励</div>
					<div class="team-num">{{teamList[index].mprice | number}}</div>
				</div>
				<div>
					<div class="team-title">近七日奖励</div>
					<div class="team-num">{{teamList[index].dprice | number}}</div>
				</div>
			</div>
		</div>
		<van-cell title="推广二维码" is-link @click.native="$router.push('/mycode')"></van-cell>
		<van-cell title="我的钻友圈" is-link  @click.native="$router.push('/team/myteam')"></van-cell>
		<van-cell title="兑换明细" is-link  @click.native="$router.push('/team/dc')"></van-cell>
	</com-page>
</template>

<script>
  import { getTeam } from "@/api/index"
  import { paramConvert } from "@/utils/stringUtil.js"
  export default {
    data () {
      return {
        teamList: []
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
      this.getTeam()
    },

    methods: {
      async getTeam () {
        let id = this.userId
        let queryParams = paramConvert({
          id: id
        })
        let resData = await getTeam(queryParams, { id: id })
        if (resData.status === 200 && resData.data.Success) {
          this.teamList = resData.data.Data || []
        }
      }
    }
  }
</script>

<style lang="scss">
.team {
  background: #ec9300;
  color: #fff;
  text-align: center;
  padding: 20px;
  .team-title {
    font-size: 14spx;
    color: rgb(230,198,160);
  }
  &__info {
    .team-num {
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 28px;
      .zs-text{
        font-size: 16px;
      }
    }
  }
  &__info2 {
    margin-top: 20px;
    display: flex;
    justify-content: space-between;
    > div {
      flex: 0.4;
    }
    .team-num {
      font-size: 16px;
    }
  }
}
</style>
