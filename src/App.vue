<template>
  <div id="app">
    <IframeReport></IframeReport>
  </div>
</template>

<script>
import IframeReport from '@/components/IframeReport'
export default {
  name: 'App',
  components: {
    IframeReport
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
