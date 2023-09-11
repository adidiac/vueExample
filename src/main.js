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
  getters: {
    selectedStudent (state) {
      return state.selectedStudent
    }
  },
 
  mutations: {
    SET_STUDENT (state, value) {
      state.selectedStudent = value
    }
  },
 
  actions: {
    setSelectedStudent ({ commit, state }, value) {
      commit('SET_STUDENT', value)
    }
  },
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
