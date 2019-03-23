<template>
  <com-page>
    <router-view></router-view>
    <tabbar slot="footer"></tabbar>
  </com-page>
</template>

<script>
import tabbar from "@/components/tabbar";

export default {
  components: {
    tabbar
  },
  data() {
    return {
    };
  },
  methods: {
  }
};
</script>
<style lang="scss">
</style>

