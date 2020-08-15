import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  },
  actions: {
    getAllReportActive (obj, serverUrl) {
      const url = 'http://' + serverUrl + '/api/v1/bierp-embed/'
      return axios.get(url + 'get-all-report-active')
    },
    getReportTicket (obj, serverUrl) {
      const url = 'http://' + serverUrl + '/api/v1/bierp-embed/'
      return axios.get(url + 'get-report-ticket')
    }
  }
})
