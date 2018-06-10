import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.css'

import App from './App'
import router from './router'

import config from '../config.js'

Vue.use(Vuex);
Vue.use(Vuetify)
if (!process.env.IS_WEB) Vue.use(require('vue-electron'))
Vue.http = Vue.prototype.$http = axios
Vue.config.productionTip = false

const store = new Vuex.Store({
    state: {
        settings: {
            isDark: false,
            isHelpVisible: true,
            shouldScroll: true,
            notificationTimeout: 5000,
        },
        stormTitle: ""
    },
    mutations: {
        flipTheme: state => state.settings.isDark = !state.settings.isDark,
        noHelp: state => state.settings.isHelpVisible = false,
        setTimeout: (state, t) => state.settings.notificationTimeout = t,

    }
})

config.getSettings(store.state.settings, (newSettings) => {
    store.state.settings = newSettings;
    new Vue({
        components: {App},
        router,
        store,
        template: '<App/>'
    }).$mount('#app')
});