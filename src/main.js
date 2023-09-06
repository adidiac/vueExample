// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import vuetify from  '@/plugins/installVuetify.js'
import '@/plugins/installComposition.js'
import App from '@/App'
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
const store = new Vuex.Store({
  state: {
    selectedStudent: null,
  },
  mutations: {
    setSelectedStudent(state, student) {
      state.selectedStudent = student
    }
  }
})

Vue.config.productionTip = false


/* eslint-disable no-new */
new Vue({
  el: '#app',
  components: { App },
  template: '<App/>',
  store: store,
  vuetify: vuetify
})
