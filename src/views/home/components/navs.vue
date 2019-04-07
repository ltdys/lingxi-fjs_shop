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
        { name: "购买", icon: "balance-o", path: "/commoditylist" },
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
  padding: 10px 15px;
  border-radius: 4px;
  background: #fff;
  margin-top: 10px;
  margin-bottom: 8px;
  justify-content: space-between;
  > a {
    // flex: 1;
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
      height: 44px;
      width: 44px;
      font-size: 24px
    }
    .nav-label{
      color: #131313;
      font-weight: 500;
      font-size:.28rem;
      margin-top: 8px;
    }
  }
}
</style>

