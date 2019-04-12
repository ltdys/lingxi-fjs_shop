<template>
    <van-tabbar v-model="selected" :fixed="false" class="home-bot-tabbar">
      <van-tabbar-item :icon="menu.icon" v-for="menu in menus" :key="menu.icons" :to="menu.path" :class="[{'zy-item': menu.id == 3}]">
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
        { name: "首页", icon: "wap-home",path:'/', id: 1 },
        { name: "库存", icon: "gem-o",path:'/deal', id: 2 },
        { name: "我的二维码", icon: "scan",path:'/mycode', id: 3 },
        { name: "钻友圈", icon: "friends-o",path:'/team', id: 4 },
        { name: "我的", icon: "user-o", path:'/my', id: 5 }
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

