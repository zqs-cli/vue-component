<template>
  <div class="z-login-bg" ref="zLoginBg">
    <canvas ref="canvas" v-if="particle" />
    <slot />
    <footer class="z-login-bg-footer">copyright © 2019 卓见云科技出品</footer>
  </div>
</template>
<script>
import { Dotline } from '../utils'
export default {
  name: 'LoginBg',
  props: {
    particle: {
      type: Boolean,
      default: true,
    }
  },
  data () {
    return {
      thatLine: null
    }
  },
  mounted () {
    this.particle && this.init()
  },
  methods: {
    init () {
      const cw = this.$refs.zLoginBg.offsetWidth
      const ch = this.$refs.zLoginBg.offsetHeight
      this.thatLine = new Dotline({
        dom: this.$refs.canvas, // 画布id
        cw, // 画布宽
        ch, // 画布高
        ds: 200, // 点的个数
        r: 0.5, // 圆点半径
        cl: '#00C6D7', // 粒子线颜色
        dis: 60 // 触发连线的距离
      }).start()
    }
  },
  beforeDestroy () {
    this.thatLine = null
  }
}
</script>
<style lang="less" scoped>
.z-login-bg{
   position: relative;
   .z-login-bg-footer{
      text-align: center;
      position: absolute;
      bottom: 0;
      width: 100%;
   }
}
</style>

