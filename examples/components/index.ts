import demoBlock from './demo-block.vue'

const modules = [] as any;
const srcModels = require.context('../../src', true, /index.(js|ts|tsx|jsx|vue)$/)

srcModels.keys().forEach(key => {
  // const dirs = key.replace(/(\.\/|\/index.(js|ts|tsx|jsx|vue))/g, '').split('/');
  // const name = dirs[dirs.length - 1]
  // modules[name] = srcModels(key).default || srcModels(key);
  // Vue.component(name,modules[name]);
  const component = srcModels(key).default || srcModels(key);
  component.name && modules.push(component)
})

const components = [
  demoBlock,
  ...modules
]

const install = function (Vue: any) {
  components.map(component => {
    // console.log(component)
    Vue.component(`${component.name}`, component)
  })
}

if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue)
}
export {
  demoBlock
}

export default {
  install
}
