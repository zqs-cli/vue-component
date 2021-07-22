## BasicDialog

提供了常用搜索功能包括: Button, Input, DatePicker等功能

### 使用方法



### 使用示例
:::demo
```html
<basic-form :config="config" :label-col="{ span: 5 }" :wrapper-col="{ span: 12 }" />
<script>
export default {
  data() {
    return {
        config: [
            {
                type: 'Input',
                label: 'label1',
                param: 'param1',
                placeholder: 'placeholder...',
                rules: [
                { message: '不能为空...', required: true }
                ]
            },
            {
                type: 'Input',
                label: 'label1',
                param: 'param1',
                placeholder: 'placeholder...',
                rules: [
                { message: '不能为空...', required: true }
                ]
            },
            {
                type: 'Textarea',
                label: 'label1',
                param: 'param1',
                placeholder: 'placeholder...',
                rules: [
                { message: '不能为空...', required: true }
                ]
            },
            {
                type: 'InputNumber',
                label: 'label1',
                param: 'param1',
                placeholder: 'placeholder...',
                rules: [
                { message: '不能为空...', required: true }
                ]
            },
            {
                type: 'Select',
                label: 'label1',
                param: 'param1',
                placeholder: 'placeholder...',
                rules: [
                { message: '不能为空...', required: true }
                ],
                options: async () => {
                return Promise.resolve([
                    {
                    id: 1,
                    name: 'ssss'
                    }
                ]).then(res => {
                    return res.map(v => ({ ...v, dd: '2222' }))
                })
                }
            },
            {
                type: 'Select',
                label: 'label1',
                param: 'param1',
                placeholder: 'placeholder...',
                rules: [
                { message: '不能为空...', required: true }
                ],
                options: [{
                id: 1,
                name: 'ssss'
                }]
            },
            {
                type: 'RangePicker',
                label: 'label1',
                param: 'param2',
                placeholder: ['开始时间', '结束时间'],
                rules: [
                { message: '不能为空...', required: true }
                ],
                defaultValue: []
            }
            ]
    }
  },
  methods: {
    
  }
}
</script>
```
:::

