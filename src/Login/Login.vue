<template>
    <login-bg class="z-login" :particle="particle">
      <div>
        <basic-form class="z-login-form" :config="basicFormConfig" ref="loginForm">
          <div class="z-login-form-header" slot="formHeader">登录</div>
          <a-form-item slot="customFormItem">
            <a-button type="primary" html-type="submit" block @click="login">登录</a-button>
          </a-form-item>
        </basic-form>
      </div>
    </login-bg>
</template>
<script>
import LoginBg from '../LoginBg'
import BasicForm from '../BasicForm'
export default {
  name: 'Login',
  components: {
    LoginBg,
    BasicForm
  },
  props: {
    basicFormConfig: {
      type: Array,
      default: () => ([{
        type: 'Input',
        label: '',
        param: 'name',
        placeholder: '用户名',
        rules: [
          { message: '请输入用户名', required: true }
        ]
      },
      {
        type: 'InputPassword',
        label: '',
        param: 'pwd',
        placeholder: '用户密码',
        rules: [
          { message: '请填写用户密码', required: true }
        ]
      }])
    },
    particle: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {
    }
  },
  methods: {
    login () {
      const { form } = this.$refs.loginForm
      form.validateFields((err, values) => {
        if (!err) {
          this.$emit('login', values)
        }
      })
    }
  }
}
</script>
<style lang="less" scoped>
.z-login{
  background: linear-gradient(90deg, #041315 0%, #0F3F41 100%);
  width: '100%';
  height: 800px;
  .z-login-form{
    box-sizing: border-box;
    position: absolute;
    right: 100px;
    top: 180px;
    width: 337px;
    padding: 20px 32px 50px;
    background: #fff;
    border-radius: 4px;
    &-header{
      margin-bottom: 37px;
      height: 28px;
      line-height: 28px;
      font-size: 20px;
      color: #333333;
      text-align: center;
    }
  }
}
</style>
