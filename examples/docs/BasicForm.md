## BasicDialog

提供了常用搜索功能包括: Button, Input, DatePicker等功能

### 使用方法



### 使用示例
:::demo
```html
<template>
  <basic-form :label-col="{ span: 5 }" :wrapper-col="{ span: 12 }">
    <template v-slot:formHeader>form-header</template>
    <template v-slot:customFormItem>form-customer</template>
  </basic-form>
  <div><a-button @click="onSubmit">提交</a-button></div>
</template>
<script>
import { reactive, defineComponent, toRaw } from 'vue';
import { Form } from 'ant-design-vue';
const useForm = Form.useForm;
export default defineComponent({
    setup(){
        const modelRef = reactive({
            name: '',
            region: undefined,
            type: []
        });
        const { resetFields, validate, validateInfos, mergeValidateInfo } = useForm(modelRef, []);
        const onSubmit = () => {
            validate()
            .then(() => {
            console.log(toRaw(modelRef));
            })
            .catch(err => {
            console.log('error', err);
            });
        }
        return {
            modelRef,
            resetFields,
            onSubmit
        }
    },
})
</script>
```
:::

