import { defineComponent } from 'vue';
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

export const Custom = defineComponent({
  data () {
    return {
      options: []
    }
  },
  async beforeCreate () {
    const res = await Promise.resolve([{ label: '123', value: '222' }])
    this.options = res
  },
  render () {
    return (<a-select options={ this.options }></a-select>)
  }
});

export default [
  InputConfig,
  DatePickerConfig,
  DatePickerConfig,
  DatePickerConfig,
  ButtonConfig
]
