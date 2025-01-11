import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { getStore } from './store'
import Antd from 'ant-design-vue'
import './permission'

import 'ant-design-vue/dist/reset.css'

const createAppAsync = async () => {
  const store = await getStore;
  createApp(App).use(store).use(router).use(Antd).mount('#app')
}

createAppAsync()