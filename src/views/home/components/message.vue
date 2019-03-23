<template>
    <div class="home-message"  @click="$router.push('/message')">
        <div>
            <com-icon name="icontoutiao" size="xxlg"></com-icon>
        </div>
        <div>
            <com-icon name="iconshengyin" class="m-r"></com-icon>
            <div>电力（代码：CEPL）价格变动</div>
        </div>
    </div>
</template>

<script>
export default {

}
</script>

<style lang="scss">
.home-message{
    background: #fef9f2;
    border-radius: 1rem;
    height: 1rem;
    padding: 0 .4rem;
    display: flex;
    align-items: center;
    >:nth-child(1){
        padding-right: .4rem;
    }
    >:nth-child(2){
        border-left: 1px solid rgba(234,88,78,.3); 
        height: .4rem;
        padding-left: .4rem;
        color: #ea584e;
        font-size: .24rem;
        display: flex;
        align-items: center;
    }
}
</style>
