import { VueConstructor } from 'vue/types'
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css';

const usePlugins = (Vue: VueConstructor) => {
  Vue.use(Antd)
}

export default usePlugins
