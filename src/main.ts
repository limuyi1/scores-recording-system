import 'element-plus/dist/index.css'
import './assets/style/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import ElementPlus from 'element-plus'

import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

import VxeUIAll, { VxeUI } from 'vxe-pc-ui'
import VxeUITable from 'vxe-table'
import VxeUIPluginRenderElement from '@vxe-ui/plugin-render-element'
VxeUI.use(VxeUIPluginRenderElement)

import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons'

library.add(fas, far)

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

app.component('font-awesome-icon', FontAwesomeIcon)

app.use(pinia)
app.use(ElementPlus, {
  locale: zhCn
})
app.use(VxeUIAll)
app.use(VxeUITable)
app.use(router)

app.mount('#app')
