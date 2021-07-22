<template>
    <div class="z-header">
      <div class="z-header-left">
        <img :src="config.logo" />
        {{config.title}}
      </div>
      <a-dropdown :trigger="['click']">
        <div class="users">
          <a-avatar icon="user" :src="config.userImg" /> {{config.userName}}
        </div>
        <a-menu slot="overlay">
          <a-menu-item v-for="(item) in config.menuItems" :key="item.desc" @click="operate(item)">
            {{item.desc}}
          </a-menu-item>
        </a-menu>
      </a-dropdown>
    </div>
</template>
<script>
export default {
  name: 'Header',
  props: {
    config: {
      type: Object,
      default: () => ({
        logo: 'https://yhdsj.oss-cn-shanghai.aliyuncs.com/logo.png',
        title: 'Hello, I am Logo and Name',
        userImg: 'https://yhdsj.oss-cn-shanghai.aliyuncs.com/logo.png',
        userName: 'userName',
        menuItems: [
          {
            desc: '修改密码',
          },
          {
            desc: '退出登录'
          }
        ]
      })
    }
  },
  methods: {
    operate (item) {
      this.$emit('operate', item)
    }
  }
}
</script>
<style lang="less" scoped>
.z-header{
  background: #3c3d3c;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #fff;
  .users{
    cursor: pointer;
    box-sizing: border-box;
    padding: 10px;
  }
  &-left{
    cursor: pointer;
    img{
      width: 40px;
    }
  }
}
</style>
