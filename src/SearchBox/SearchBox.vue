<template>
  <a-row :gutter="24" :class="['z-operate-row', showAll ? '' : 'z-limitH']" ref="searchBox">
    <a-col v-for="(fItem, idx) in config" :key="idx" :span="fItem.span">
      <a-button v-if="fItem.vType === 'Button'" type="primary" @click="operate(fItem)">
        {{ configMaps['Button']['text'] }}
      </a-button>
      <a-input
        v-if="fItem.vType === 'Input'"
        :placeholder="configMaps['Input']['placeholder']"
        v-model="query[configMaps['Input']['vModel']]"
        @search="operate(fItem)"
        />
      <a-range-picker
        v-if="fItem.vType === 'DatePicker'"
        format="YYYY-MM-DD HH:mm"
        v-model="query[configMaps['DatePicker']['vModel']]"
        :default-value="configMaps['DatePicker']['defaultValue']"
        @change="operate(fItem)">
      </a-range-picker>
    </a-col>
    <slot />
    <a class="ant-dropdown-link" @click="expend">
      {{ showAll ? '收起' : '展开' }} <a-icon :type="showAll ? 'up' : 'down' " />
    </a>
  </a-row>
</template>
<script>
import { Custom } from './config'
export default {
  name: 'SearchBox',
  components: {
    custom: Custom
  },
  props: {
    config: {
      type: Array,
      default: () => ([])
    }
  },
  data () {
    const query = {}
    this.config.forEach(v => {
      const key = v['vModel']
      const value = v['defaultValue'] || ''
      key && (query[key] = value)
    })
    return {
      showAll: true,
      query
    }
  },
  computed: {
    configMaps () {
      const maps = {}
      this.config.forEach(v => {
        maps[v['vType']] = v
      })
      return maps
    }
  },
  methods: {
    operate (action) {
      this.$emit('change', action, this.query)
    },
    expend () {
      this.showAll = !this.showAll
    }
  }
}
</script>
<style lang="less" scoped>
.z-operate-row{
  position: relative;
  .ant-col{
    margin-bottom: 20px;
  }
  .ant-dropdown-link{
    position: absolute;
    right: 20px;
    top: 4px;
  }
}
.z-limitH{
  height: 50px;
  overflow: hidden;
}
</style>
