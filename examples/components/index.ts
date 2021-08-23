import { App } from 'vue';
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

const useComponents = (app: App<Element>) => {
  components.map(component => {
    app.component(`${component.name}`, component)
  })
}

export {
  demoBlock
}

export default useComponents
