## Header

提供了常用搜索功能包括: 

### 使用方法



### 使用示例
:::demo
```html
<template>
  <Header @operate="operate" />
</template>
<script>
export default {
  data() {
    return {
    }
  },
  methods: {
      operate(item) {
          console.log(item)
      }
  }
}
</script>
```
:::

