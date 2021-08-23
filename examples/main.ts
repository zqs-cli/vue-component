import { createApp } from 'vue';
import { setupRouter } from '@/router';
import useComponents from './components';
import usePlugins from './plugins';
import App from '@/App.vue';
import './assets/style/index.less'

const install = async () => {
  const app = createApp(App);
  useComponents(app);
  usePlugins(app);
  await setupRouter(app).isReady()
  app.mount('#app');
};

install();
