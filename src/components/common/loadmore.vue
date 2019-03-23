<template>
    <div class="p-a tc" v-if="isFinished || loading">
      <span v-if="isFinished">已全部加载</span>
      <span v-if="!isFinished && loading">加载中...</span>
    </div>
</template>

<script>
export default {
  name:'com-loadmore',
  props: {
    isFinished: Boolean,
    loading: Boolean
  }
};
</script>

<style>
</style>
