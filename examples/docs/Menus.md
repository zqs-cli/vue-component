## Menus

提供了常用搜索功能包括: 

### 使用方法



### 使用示例
:::demo
```html
<template>
    <Menus 
      mode="inline" 
      theme="dark" 
      @click="meunClick"
    />
<template>
<script>
export default {
  data() {
    return {
    }
  },
  methods: {
    meunClick (e) {
      console.log(e)
    //   this.$router.push(e.key)
    },
  }
}
</script>
```
:::

