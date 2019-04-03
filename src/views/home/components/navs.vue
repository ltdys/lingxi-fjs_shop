<template>
    <nav class="home-navs">
      <router-link v-for="v in navs" :key="v.name" :to="v.path">
        <div class="nav-icon">
          <van-icon :name="v.icon"></van-icon>
          <!-- <com-icon :name="v.icon"></com-icon> -->
        </div>
        <div class="nav-label">{{v.name}}</div>
      </router-link>
    </nav>
</template>

<script>
export default {
  data() {
    return {
      navs: [
        { name: "购买", icon: "balance-o", path: "/my/recharge" },
        { name: "提货", icon: "gem-o", path: "/deal" },
        { name: "转让", icon: "peer-pay", path: "/my/transfer" },
        { name: "明细", icon: "balance-pay", path: "/my/yl_list" }
      ]
    };
  }
};
</script>
<style lang="scss">
.home-navs {
  display: flex;
  padding: .3rem 0;
  > a {
    flex: 1;
    text-decoration: none;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    .nav-icon{
      color: #ec9505;
      border-radius: 50%;
      border: 1px solid #ec9505;
      display: flex;
      align-items: center;
      justify-content: center;
      height: .8rem;
      width: .8rem;
      font-size: 24px
    }
    .nav-label{
      color: #333;
      line-height: .6rem;
      font-size:.28rem;
    }
  }
}
</style>

