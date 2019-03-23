<template>
  <van-popup v-model="currentValue" position="right" class="com-popup-page">
    <van-nav-bar 
     :title="title"
    left-arrow
    @click-left="onClickLeft"
  />
  <slot></slot>
  </van-popup>
</template>

<script>
export default {
  name: "com-popup-page",
  props: {
    value: Boolean,
    title: String
  },
  computed: {
    currentValue: {
      get() {
        return this.value;
      },
      set(v) {
        this.$emit("input", v);
      }
    }
  },
  methods: {
    onClickLeft() {
      this.currentValue = false;
    }
  }
};
</script>

<style lang="scss">
.com-popup-page{
  &.van-popup--right{
    height: 100%;
    width:100%;
  }
}
</style>
