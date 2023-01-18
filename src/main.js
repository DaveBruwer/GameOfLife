import { createApp } from 'vue'
import { createPinia } from 'pinia'
import router from './router'
import * as VeeValidate from 'vee-validate'
import "./styles.scss"
import * as bootstrap from "bootstrap"
import App from './App.vue'

let app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(VeeValidate)

app.mount('#app')
