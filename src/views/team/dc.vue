<template>
	<com-page>
		<com-header title="DC明细" is-back slot="header"></com-header>
		<div class="dc-list">
			<template v-for="i in 10">
				<div class="dc-count" :key="'c'+i" v-if="i%2==1">
					<div class="fs-16">2019年3月</div>
					<div class="f666">收入¥1500</div>
				</div>
				<div class="dc-item" :key="'d'+i">
					<div>分销提成<span class="amount fr">+1000</span></div>
					<div class="dc-item__desc">
						<div>下单用户：133****1232</div>
						<div>订单金额：10000</div>
						<div>提成比例：10%</div>
						<div>下单时间：03-01 21:38</div>
					</div>
				</div>
			</template>
		</div>
	</com-page>
</template>

<script>
</script>

<style lang="scss">
.dc-count {
  margin-bottom: 10px;
  padding: 0 10px;
  margin-top: 10px;
}
.dc-item {
  padding: 10px;
  background: #fff;
  padding: 10px;
//   border-radius: 5px;
  + .dc-item{
    margin-top: 10px;
  }
  &__desc {
    color: #666;
  }
}
</style>
