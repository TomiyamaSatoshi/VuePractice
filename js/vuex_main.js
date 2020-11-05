import Vue from 'vue'
import App from '../vue/vuex_app.vue'
import store from './vuex_store.js'

new Vue({
    el: '#app',

    store,
    render: h => h(App)
})