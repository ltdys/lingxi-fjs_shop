<template>
	<com-page>
		<com-header title="团队" slot="header"></com-header>
		<div class="team">
			<div class="team__info">
				<div class="team-title">DC(元)</div>
				<div class="team-num">{{1000000|number}}</div>
			</div>
			<div class="team__info2">
				<div>
					<div class="team-title">本月DC(元)</div>
					<div class="team-num">{{30000|number}}</div>
				</div>
				<div>
					<div class="team-title">近七日DC(元)</div>
					<div class="team-num">{{1000|number}}</div>
				</div>
			</div>
		</div>
		<van-cell title="推广二维码" is-link @click.native="$router.push('/team/invite')"></van-cell>
		<van-cell title="我的团队" is-link  @click.native="$router.push('/team/myteam')"></van-cell>
		<van-cell title="DC明细" is-link  @click.native="$router.push('/team/dc')"></van-cell>
	</com-page>
</template>

<script>
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
      font-size: 28px;
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
