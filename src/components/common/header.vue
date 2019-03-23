<template>
  <van-nav-bar 
     :title="title"
    :left-arrow="isBack"
    @click-left="onClickLeft"
  />
</template>
<script>
export default {
  name: "com-header",
  props: {
    title: String,
    isBack: Boolean
  },
  methods: {
    onClickLeft() {
      this.$router.back();
    }
  }
};
</script>
<style lang="scss">
.com-header {
  &__border {
    &:before {
      content: "";
      position: absolute;
      z-index: 2;
      background-color: #ebebeb;
      -webkit-transform-origin: 100% 50%;
      transform-origin: 100% 50%;
      -webkit-transform: scaleY(0.5) translateY(100%);
      transform: scaleY(0.5) translateY(100%);
      bottom: 0;
      left: 0;
      width: 100%;
      height: 0.02rem;
    }
  }
}
</style>
