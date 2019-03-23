<template>
	<com-page bgColor="#fff">
		<com-header title="消息详情" is-back slot="header"></com-header>

    <div class="message_detail">
      <div class="message_detail__title">电力（代码：CEPL）价格变动</div>
      <div class="message_detail__date">2019-03-03 21:11</div>
      <div class="message_detail__img">
        <img src="static/images/banner.png"/>
      </div>
      <div class="message_detail__desc">
         <p>价格股票公示</p>
          <p v-for="i in 9" :key="i">1月{{i}}号 1.{{i}}元/股</p>
      </div>
    </div>
	</com-page>
</template>

<script>
export default {};
</script>

<style lang="scss">
.message_detail {
  padding: 10px;
  background: #fff;
  &__title {
    font-size: 14px;
  }
  &__date {
    font-size: 12px;
    color: #999;
    margin-bottom: 10px;
  }
  &__img {
    img {
      width: 100%;
    }
  }
  &__desc {
    font-size: 12px;
  }
}
</style>
