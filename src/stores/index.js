import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  },
  actions: {
    async getAllReportActive (serverUrl) {
      return axios.get(serverUrl + 'get-all-report-active')
    },
    async getReportTicket (serverUrl) {
      return axios.get(serverUrl + 'get-report-ticket')
    }
  }
})
