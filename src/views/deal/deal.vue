<template>
    <com-page>
        <com-header title="交易" slot="header"></com-header>
        <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="loadBottom">
            <div class="goods">
                <div class="good-top">
                    <div class="goods__title">钻石DC元券(代码CEPL)</div>
                    <div class="goods__count">
                        <div>
                            <div>总市值（元）</div>
                            <div>130,000</div>
                        </div>
                        <div>
                            <div>单价（元/张）</div>
                            <div>1.3</div>
                        </div>
                    </div>
                </div>
                <div class="goods-middle">
                    <van-cell>
                        <div slot="title">总数量(张)</div>
                        <div>详情</div>
                    </van-cell>
                </div>
                <div class="goods-bottom">
                </div>
            </div>
        </van-list>
    </com-page>
</template>

<script>
import { list_mixins } from "@/mixins";

export default {
  mixins: [list_mixins],
}
</script>


<style lang="scss">
.goods{
    &-top{
        background: #ec9300;
    }
}
</style>
