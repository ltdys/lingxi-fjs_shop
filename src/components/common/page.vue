<template>
   <div class="com-page" :style="styles" ref="page" :class="{'has-footer':$slots.footer}">
    <div class="com-page-header" ref="header" v-if="$slots.header">
     <slot name="header"></slot>
    </div>
    <div class="com-page-content">
     <slot></slot>
    </div>
    <div class="com-page-footer" ref="footer" v-if="$slots.footer">
     <slot name="footer"></slot>
    </div>
    <slot name="popup"></slot>
   </div>
</template>

<script>
export default {
  name:'com-page',
  props:{
    bgColor:String,
  },
  data(){
    return {
      styles:{
        paddingTop:0,
        paddingBottom:0,
        backgroundColor:this.bgColor,
      }
    }
  },
  mounted() {
    this.init()
    window.addEventListener('resize', this.init);
  },
  destroyed() {
    window.removeEventListener('resize', this.init);
  },
  methods:{
    init(){
      if(this.$refs.header){
        this.styles.paddingTop = this.$refs.header.offsetHeight + 'px'
      }
      if(this.$refs.footer){
        this.styles.paddingBottom = this.$refs.footer.offsetHeight + 'px'
      }
    },
  }
}
</script>

<style lang="scss">
.md-scroll-view .scroll-view-header {
  z-index:2;
}
.no-scroller{
  .scroll-view-container{
    height:100%;
  }
}
.com-page{
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  width: 100%;
  max-height: 100%;
  &.has-footer{
    bottom: env(safe-area-inset-bottom);
  }
  &-header{
    position: absolute ;
    z-index: 2;
    left: 0;
    top: 0;
    right: 0;
    width: 100%;
  }
  &-content{
    height:100%;
    position: relative;
    overflow-y: auto;
    -webkit-overflow-scrolling:touch;
  }
  &-footer{
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
  }
}
</style>
