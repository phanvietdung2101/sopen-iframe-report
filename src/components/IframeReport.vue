<template>
  <div id="iframe-report">
    <el-select v-model="selectedReportCode" placeholder="Select report">
      <el-option
        v-for="item in allReportActive"
        :key="item.reportCode"
        :label="item.reportName"
        :value="item.reportCode"
      ></el-option>
    </el-select>
    <el-button type="primary" @click.prevent="generateReportUrl" plain>Comfirm</el-button>
    <el-alert v-show="alertMessage" v-bind:title="alertMessage" type="error"></el-alert>
    <p v-show="generatedUrl !== ''">URL: {{ generatedUrl }}</p>
    <iframe v-show="generatedUrl !== ''" :src="generatedUrl"></iframe>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

const URL = 'http://192.168.1.40:9528/bierp-embed'

export default {
  name: 'iframe-report',
  data () {
    return {
      selectedReportCode: '',
      allReportActive: [],
      reportTicket: '',
      generatedUrl: '',
      alertMessage: ''
    }
  },
  methods: {
    ...mapActions(['getAllReportActive', 'getReportTicket']),
    async getTicket () {
      await this.getReportTicket()
        .then((response) => {
          console.log(response)
          if (response.data.message === 'SUCCESS') {
            this.$set(this, 'reportTicket', response.data.data)
          }
        })
        .catch((error) => {
          console.error(error)
        })
    },
    async generateReportUrl () {
      if (this.selectedReportCode === '') {
        this.alertMessage = 'Please select a report'
        throw new Error('No report code selected')
      }
      await this.getTicket()
      this.generatedUrl = `${URL}/${this.selectedReportCode}/${this.reportTicket}`
    }
  },
  async mounted () {
    await this.getAllReportActive()
      .then(response => {
        this.$set(this, 'allReportActive', response.data.data)
      })
      .catch((error) => {
        console.log(error)
        this.alertMessage = error.message
      })
  }
}
</script>

<style scoped>
iframe {
  overflow: hidden;
  margin-top: 5px;
  display: block;
  width: 100%;
  height: 100%;
  border: none;
  overflow-y: hidden;
  overflow-x: hidden;
  position: absolute;
}
</style>
