## Menus

提供了常用搜索功能包括: 

### 使用方法



### 使用示例
:::demo
```html
<Menus 
    mode="inline" 
    theme="dark" 
    @click="meunClick"
     />
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

