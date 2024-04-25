import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import ElementPlus from 'element-plus'
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
import 'element-plus/dist/index.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

import { createPersistedState } from 'pinia-plugin-persistedstate'
import { parse, stringify } from 'zipson'

import App from './App.vue'
import router from './router'

const app = createApp(App)

const pinia = createPinia()
pinia.use(
  createPersistedState({
    key: (id: string) => `__scs-persisted__${id}`,
    serializer: {
      serialize: stringify,
      deserialize: parse
    }
  })
)

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}

app.use(pinia)
app.use(ElementPlus, {
  locale: zhCn
})
app.use(router)

app.mount('#app')
