<template>
  <div>
    <iframe :src="reportUrl"></iframe>
  </div>
</template>

<script>
export default {
  name: 'iframe-report',
  data () {
    return {
    //   reportUrl: "",
    }
  },
  computed: {
    reportUrl () {
      return this.reportUrl
    }
  }
}
</script>

<style scoped>
iframe {
    width: 100%;
}
</style>
