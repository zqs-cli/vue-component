const ButtonConfig = {
  vType: 'Button',
  span: 3,
  text: 'hello, btn'
}

const InputConfig = {
  vType: 'Input',
  span: 6,
  placeholder: '请输入...',
  vModel: 'search'
}

const DatePickerConfig = {
  vType: 'DatePicker',
  span: 6,
  defaultValue: [],
  vModel: 'date'
}

export default [
  InputConfig,
  DatePickerConfig,
  DatePickerConfig,
  DatePickerConfig,
  ButtonConfig
]
