<template>
    <svg class="icon-svg needclick" :class="size" aria-hidden="true" :style="{fill:color}">
        <use :xlink:href="'#'+name"></use>
    </svg>
</template>

<script>
export default {
    name:'com-icon',
    props:{
        name:String,
        color:String,
        size:String,
    }
}
</script>

<style lang="scss">
.icon-svg{
  vertical-align: middle;
  width: .32rem;
  height: .32rem;
  fill: currentColor;
  &.sm{
    width: .24rem;
    height: .24rem;
  }
  &.md{
    width: .32rem;
    height: .32rem;
  }
  &.lg{
    width: .44rem;
    height: .44rem;
  }
  &.xlg{
    width: .56rem;
    height: .56rem;
  }
  &.xxlg{
    width: .68rem;
    height: .68rem;
  }
  &.xxxlg{
    width: .8rem;
    height: .8rem;
  }
  &.big{
    width: 1rem;
    height: 1rem;
  }
  &.xbig{
    width: 1.3rem;
    height: 1.3rem;
  }
  &.xxbig{
    width: 1.6rem;
    height: 1.6rem;
  }
  &.xxxbig{
    width:1.9rem;
    height: 1.9rem;
  }
}
</style>
