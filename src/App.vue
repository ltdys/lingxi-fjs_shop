<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>
<script>
import { mapGetters } from 'vuex';
import platform from '@/utils/platform'

export default {
  name: 'App',
  created() {
    //pc端显示
    if (platform.isPc()) {
      this.$router.push("/pc")
    }
    if(platform.inIOS()){
    //解决ios12键盘不回弹兼容
      document.body.addEventListener("blur",()=>{
        window.scrollTo(0,0)
      },true)
    }
  },
  watch: {
    '$route': {
      handler:function(val,oldval){
        if (platform.isPc() && val.fullPath === "/") {
          this.$router.push("/pc")
        }
      },
      deep: true
    }
  }
}
</script>
<style>
  #app{
    height: 100%;
  }
</style>


