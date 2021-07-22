<template>
  <a-menu
      :open-keys="openKeys"
      :selected-keys="[$route.path]"
      :inline-collapsed="collapsed"
      class="z-menus"
      @openChange="onOpenChange"
      v-bind="$attrs"
      v-on="$listeners"
    >
      <template v-for="(mitem) in MenusRoute">
        <a-sub-menu
          v-if="!mitem.hidden && mitem.children"
          :key="mitem.path"
        >
          <template v-slot:title>
            <span>{{ mitem.menuName }}</span>
          </template>
          <a-menu-item
            v-for="(sitem) in mitem.children"
            :key="sitem.path"
          >
            {{ sitem.menuName }}
          </a-menu-item>
        </a-sub-menu>
        <a-menu-item
          v-else
          :key="mitem.path"
        >
          {{ mitem.menuName }}
        </a-menu-item>
      </template>
    </a-menu>
</template>
<script>
import MenusRouteConfig from './config';
export default {
  name: 'Menus',
  props: {
    MenusRoute: {
      type: Array,
      default: () => ([...MenusRouteConfig])
    }
  },
  data () {
    return {
      collapsed: false,
      openKeys: [''],
    }
  },
  mounted () {
    this.updateMenu()
  },
  methods: {
    onOpenChange (openKeys) {
      console.log(openKeys)
      const rootKeys = this.MenusRoute.map(v => v.path);
      const latestOpenKey = openKeys.find(key => this.openKeys.indexOf(key) === -1);
      if (!rootKeys.includes(latestOpenKey)) {
        this.openKeys = openKeys;
      } else {
        this.openKeys = latestOpenKey ? [latestOpenKey] : [];
      }
    },
    updateMenu () {
      const routes = this.$route.matched.concat()
      const { hidden } = this.$route.meta
      if (routes.length >= 3 && hidden) {
        routes.pop()
        this.selectedKeys = [routes[routes.length - 1].path]
      } else {
        this.selectedKeys = [routes.pop().path]
      }
      const openKeys = []
      if (this.mode === 'inline') {
        routes.forEach(item => {
          openKeys.push(item.path)
        })
      }
      this.collapsed ? (this.cachedOpenKeys = openKeys) : (this.openKeys = openKeys)
    },
  }
}
</script>
<style lang="less" scoped>
.z-menus{
  width: 256px;
  padding: 0 !important;
  /deep/ul{
    padding: 0 !important;
  }
}
</style>
