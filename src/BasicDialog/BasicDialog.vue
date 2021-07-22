<template>
  <!-- 弹框 -->
  <a-modal
    :title="config.title"
    v-model="config.visible"
    @ok="submit"
    v-bind="$attrs"
    v-on="$listeners"
  >
    <basic-form ref="basicForm" :config="config.formConfig" :label-col="{ span: 5 }" :wrapper-col="{ span: 12 }" />
  </a-modal>
</template>

<script>
import BasicForm from '../BasicForm'
export default {
  name: 'BasicDialog',
  components: {
    BasicForm,
  },
  props: {
    config: {
      type: Object,
      default: () => {
        return {
          title: 'I am dialog',
          visible: false,
          closeReset: true,
          formConfig: [],
          callBack: null
        }
      }
    }
  },
  data () {
    return {}
  },
  watch: {
    'config.visible' (val) {
      if (!val) {
        const { closeReset } = this.config
        closeReset && this.reset()
      }
    }
  },
  mounted () {
  },
  methods: {
    submit () {
      const { form } = this.$refs.basicForm
      form.validateFields((err, values) => {
        if (!err) {
          const { callBack } = this.config
          callBack && callBack(values)
        }
      })
    },
    reset () {
      const { form } = this.$refs.basicForm
      form.resetFields()
    }
  }
}
</script>
<style lang="less" scoped>

</style>
