import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isCollapse: false,
    userName: ''
  },
  mutations: {
    changeIsc(state) {
      state.isCollapse = !state.isCollapse
    },
    openIsc(state) {
      state.isCollapse = true
    },
    closeIsc(state) {
      state.isCollapse = false
    },
    changeUserName(state, num) {
      state.userName = num
    }
  },
  actions: {},
  modules: {}
})
