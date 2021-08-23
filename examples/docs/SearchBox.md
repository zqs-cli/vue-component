## SearchBox

提供了常用搜索功能包括: Button, Input, DatePicker等功能

### 使用方法



### 使用示例
:::demo
```html
<template>
  <search-box @change="searchBoxChange" :config="config" />
</template>
<script>
const ButtonConfig = {
  vType: 'Button',
  span: 3,
  text: 'search'
}

const InputConfig = {
  vType: 'Input',
  span: 6,
  placeholder: '请输入...',
  vModel: 'search'
}

const DatePickerConfig = {
  vType: 'DatePicker',
  span: 8,
  defaultValue: [],
  vModel: 'date'
}

export default {
  data() {
    return {
      config: [
        InputConfig,
        InputConfig,
        DatePickerConfig,
        DatePickerConfig,
        ButtonConfig
      ]
    }
  },
  methods: {
      searchBoxChange(val) {
          console.log(val)
      }
  }
}
</script>
```
:::

