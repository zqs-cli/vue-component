import { VueConstructor } from 'vue/types'
import demoBlock from './demo-block.vue'
const modules = [] as any;
const srcModels = require.context('../../src', true, /index.(js|ts|tsx|jsx|vue)$/)

srcModels.keys().forEach(key => {
  const component = srcModels(key).default || srcModels(key);
  component.name && modules.push(component)
})

const components = [
  demoBlock,
  ...modules
]

const useComponents = (Vue: VueConstructor) => {
  components.forEach(component => {
    Vue.component(`${component.name}`, component)
  })
}

export {
  demoBlock
}

export default useComponents
