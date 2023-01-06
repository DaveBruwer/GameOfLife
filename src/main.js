import { createApp } from 'vue'
import { createPinia } from 'pinia'
// import './style.css'
import "./styles.scss"
import * as bootstrap from "bootstrap"
import App from './App.vue'

let app = createApp(App)

app.use(createPinia())

app.mount('#app')
