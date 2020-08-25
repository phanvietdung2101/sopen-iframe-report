<template>
  <div id="iframe-report">
    <el-form label-width="120px">
      <el-form-item label="Server address">
        <el-input v-model="serverUrl">
          <template slot="append">/api/v1/bierp-embed</template>
        </el-input>
      </el-form-item>
      <el-form-item label="View address">
        <el-input v-model="viewUrl">
          <template slot="append">/bierp-embed</template>
        </el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitServer">Get report list</el-button>
      </el-form-item>
    </el-form>
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

export default {
  name: 'iframe-report',
  data () {
    return {
      selectedReportCode: '',
      allReportActive: [],
      reportTicket: '',
      generatedUrl: '',
      alertMessage: '',
      viewUrl: 'http://192.168.1.40:9528',
      serverUrl: 'http://192.168.1.40:24688'
    }
  },
  methods: {
    ...mapActions(['getAllReportActive', 'getReportTicket']),
    submitServer () {
      this.getAllReportActive(this.serverUrl)
        .then((response) => {
          this.$set(this, 'allReportActive', response.data.data)
        })
        .catch((error) => {
          console.log(error)
          this.alertMessage = error.message
        })
    },
    async getTicket () {
      await this.getReportTicket(this.serverUrl)
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
      this.generatedUrl = `${this.viewUrl}/bierp-embed/${this.selectedReportCode}/${this.reportTicket}`
    }
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
