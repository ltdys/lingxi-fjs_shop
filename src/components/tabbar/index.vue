<template>
    <van-tabbar v-model="selected" :fixed="false">
      <van-tabbar-item :icon="menu.icon" v-for="menu in menus" :key="menu.icons" :to="menu.path">
            {{menu.name}}
      </van-tabbar-item>
    </van-tabbar>
</template>

<script>
export default {
  data() {
    return {
      selected: 0,
      menus: [
        { name: "首页", icon: "wap-home",path:'/'  },
        { name: "交易", icon: "gem-o",path:'/deal' },
        { name: "我的二维码", icon: "scan",path:'/mycode' },
        { name: "团队", icon: "friends-o",path:'/team'  },
        { name: "我的", icon: "user-o", path:'/my' }
      ],
      active: 0,
      icon: {
        normal: 'static/images/icon/all_order.png',
        active: '//img.yzcdn.cn/icon-active.png'
      }
    };
  },
  created() {
    for(let i in this.menus){
      if(this.menus[i].path === this.$route.path){
        this.selected = +i
      }
    }
  },
  methods: {
  }
};
</script>
<style lang="scss">
</style>

