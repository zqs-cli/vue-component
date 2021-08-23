import { App } from 'vue';
import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import hljs from 'highlight.js'
import navConf from '@/nav.config.json'
const { nextTick } = require('vue')

let docRoutes: Array<RouteRecordRaw> = []

Object.keys(navConf).forEach((header) => {
  docRoutes = docRoutes.concat(navConf[header])
})

const addComponent = (router: any = []) => {
  router.forEach((route: any) => {
    if (route.items) {
      addComponent(route.items)
      docRoutes = docRoutes.concat(route.items)
    } else {
      if (route.type === 'pages') {
        route.component = () => import(`../views/${route.name}.vue`)
        return
      }
      route.component = () => import(`../docs/${route.name}.md`)
    }
  })
}
addComponent(docRoutes)

const router = createRouter({
  history: createWebHistory(),
  routes: docRoutes
})

const withAfterRouter = async (router: any = []) => {
  router.afterEach(() => {
    nextTick(() => {
      const blocks = document.querySelectorAll('pre code:not(.hljs)')
      Array.prototype.forEach.call(blocks, hljs.highlightBlock)
    })
  })
}

export const setupRouter = (app: App<Element>) => {
  withAfterRouter(router);
  app.use(router);
  return router
}

export default router
