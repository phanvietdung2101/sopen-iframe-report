<template>
  <div>
    <el-select v-model="selectedReportCode" placeholder="Select">
      <el-option
        v-for="item in allReportActive"
        :key="item.reportCode"
        :label="item.reportName"
        :value="item.reportCode"
      ></el-option>
    </el-select>
    <button @click.prevent="generateReportUrl">Comfirm</button>
    <p v-if="generatedUrl !== ''">URL: {{ generatedUrl }} </p>
    <!-- <iframe :src="reportUrl"></iframe> -->
  </div>
</template>

<script>
import { mapActions } from 'vuex'

const URL = 'http://192.168.1.9:9528/bierp-embed'

export default {
  name: 'iframe-report',
  data () {
    return {
      selectedReportCode: '',
      allReportActive: [],
      reportTicket: '',
      generatedUrl: ''
    }
  },
  methods: {
    ...mapActions(['getAllReportActive', 'getReportTicket']),
    async getTicket () {
      // const waitReportTicket = await this.getReportTicket()
      await this.getReportTicket()
        .then(response => {
          console.log(response)
          if (response.data.message === 'SUCCESS') {
            this.reportTicket = response.data.data
          }
        })
        .catch(error => {
          console.error(error)
        })
    },
    async generateReportUrl () {
      await this.getTicket()
      if (this.selectedReportCode === '') throw new Error('Please select a report code')
      this.generatedUrl = `${URL}/${this.selectedReportCode}/${this.reportTicket}`
    }
  },
  mounted () {
    this.getAllReportActive()
      .then(response => {
        this.allReportActive = response.data.data
      })
  }
}
</script>

<style scoped>
iframe {
  width: 100%;
}
</style>
