import { createApp } from 'vue'
import App from './App.vue'

import Vue3Toastify from "vue3-toastify";
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import router from './router'

const vuetify = createVuetify({
        components,
        directives,
})

createApp(App)
    .use(vuetify)
    .use(Vue3Toastify, {
        position: 'top-right',
    })
    .use(router)
    .mount('#app')
