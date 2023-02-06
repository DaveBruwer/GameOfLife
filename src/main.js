import { createApp } from 'vue'
import { createPinia } from 'pinia'
import router from './router'
import "./styles.scss"
import * as bootstrap from "bootstrap"
import App from './App.vue'
// window.bootstrap = require("bootstrap/dist/js/bootstrap.bundle.js")


let app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')