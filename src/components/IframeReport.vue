<template>
  <div>
    <el-select v-model="selectedReportCode" placeholder="Select">
      <el-option
        v-for="item in allReportActive"
        :key="item.value"
        :label="item.reportName"
        :value="item.reportCode"
      ></el-option>
    </el-select>
    <!-- <iframe :src="reportUrl"></iframe> -->
  </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  name: 'iframe-report',
  data () {
    return {
      selectedReportCode: '',
      allReportActive: []
    }
  },
  computed: {
    // reportUrl () {
    //   return 'this.reportUrl'
    // }
  },
  methods: {
    ...mapActions(['getAllReportActive'])
  },
  mounted () {
    this.getAllReportActive()
      .then(response => {
        console.log(response)
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
