import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

const URL = 'http://192.168.1.9:24688/api/v1/bierp-embed/'
export default new Vuex.Store({
  state: {
  },
  actions: {
    getAllReportActive () {
      return axios.get(URL + 'get-all-report-active')
    }
  }

})
