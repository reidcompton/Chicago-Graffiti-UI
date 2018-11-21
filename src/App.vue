<template>
  <div id="app">
    <Graffiti />
  </div>
</template>

<script>
import Graffiti from './components/Graffiti.vue'
export default {
  name: 'App',
  components: {
    Graffiti
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
body {
  height: 100vh;
}
.is-full-height {
  height:100vh;
}
</style>
