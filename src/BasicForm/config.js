const config = [
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
    options: () => {
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

export {
  config
}
