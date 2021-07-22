
<template>
  <a-form
      :form="form"
      v-bind="$attrs"
    >
      <slot name="formHeader" />
      <!-- 卡包名称 -->
      <a-form-item
        v-for="(fItem, idx) in config"
        :key="idx"
        :label="fItem.label"
        class="mb15"
      >
        <a-input
          v-if="['Input'].includes(fItem.type)"
          :placeholder="fItem.placeholder"
          v-decorator="[
            `${fItem.param}`,
            {
              initialValue: fItem.initialValue || '',
              rules: fItem.rules
            }
          ]"
        />
        <a-input-password
          v-if="['InputPassword'].includes(fItem.type)"
          :placeholder="fItem.placeholder"
          v-decorator="[
            `${fItem.param}`,
            {
              initialValue: fItem.initialValue || '',
              rules: fItem.rules
            }
          ]"
        />
        <a-textarea
          v-if="['Textarea'].includes(fItem.type)"
          :placeholder="fItem.placeholder"
          v-decorator="[
            `${fItem.param}`,
            {
              initialValue: fItem.initialValue || '',
              rules: fItem.rules
            }
          ]"
          :rows="4" />
        <a-input-number
          v-if="['InputNumber'].includes(fItem.type)"
          :placeholder="fItem.placeholder"
          v-decorator="[
            `${fItem.param}`,
            {
              initialValue: fItem.initialValue || '',
              rules: fItem.rules
            }
          ]"
          :min="fItem.min || 1"
          :max="fItem.max || 100"
        />
        <a-select
          v-if="['Select'].includes(fItem.type)"
          :placeholder="fItem.placeholder"
          v-decorator="[
            `${fItem.param}`,
            {
              initialValue: fItem.initialValue || '',
              rules: fItem.rules
            }
          ]"
        >
          <a-select-option v-for="item in fItem.options" :key="item.id" :value="item.id">{{ item.name }}</a-select-option>
        </a-select>
        <a-range-picker
          v-if="['RangePicker'].includes(fItem.type)"
          v-decorator="[
            `${fItem.param}`,
            {
              initialValue: fItem.initialValue || [],
              rules: fItem.rules
            }
          ]"
          :showTime="false"
          format="YYYY-MM-DD HH:mm:ss"
          :placeholder="fItem.placeholder"
        />
      </a-form-item>
      <slot name="customFormItem" />
    </a-form>
</template>
<script>
import { config } from './config'
function isFun (fn) {
  return typeof fn === 'function'
}
export default {
  name: 'BasicForm',
  props: {
    config: {
      type: Array,
      default: () => ([...config])
    }
  },
  data () {
    this.config.forEach(async (v) => {
      const { options = [] } = v
      const res = Array.isArray(options) ? options : (isFun(options) && await options())
      v.options = res
    })
    return {
      form: this.$form.createForm(this)
    }
  },
}
</script>
<style lang="less" scoped>

</style>
