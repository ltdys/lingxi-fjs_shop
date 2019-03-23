<template>
    <div class="home-hot_shop">
        <div class="hot-title">热卖商品</div>
        <div class="shop" v-for="i in 3" :key="i">
            <img class="w-100"  src="static/images/home_shop.png"/>
            <div class="shop-desc">
                <div class="shop-title">钻石DC元券（代码CEPL）</div>
                <div>
                    <div class="shop-price">￥1.3</div>
                    <div class="shop-btn" @click="buy">立刻购买</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    methods: {
        buy(){
            this.$router.push('/shop/1')
        }
    },
}
</script>

<style lang="scss">
.home-hot_shop{
    .hot-title{
        font-size: .34rem;
        color: #333;
        line-height: 1rem;
    }
    .shop{
        +.shop{
            margin-top: 15px;
        }
        border-radius: .15rem;
        box-shadow: 1px 1px 8px #ccc;
        .shop-title{
            font-size: .28rem;
            color: #333;
            line-height: .6rem;
        }
        .shop-price{
            color: #ec9300;
            font-size: .34rem;
        }
        .shop-btn{
            background: #ec9300;
            color: #fff;
            border-radius: .5rem;
            padding: .15rem .4rem;;
            display: inline-block;
        }
        .shop-desc{
            padding: .2rem .4rem;
            >:last-child{
                display: flex;
                justify-content: space-between;
            }
        }
    }
    
}
</style>
