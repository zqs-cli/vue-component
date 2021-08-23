/**
 * 前端基础组件库
 * https://www.antdv.com/docs/vue/introduce-cn/
 */
import { App } from 'vue';
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css';

export default (app: App<Element>) => {
  app.use(Antd)
}
