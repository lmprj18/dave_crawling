<template>
  <div id="app">
    <toolbar></toolbar>
    <router-view/>
  </div>
</template>

<script>
import Toolbar from './components/Toolbar'
export default {
  name: 'App',
  components: {
    Toolbar
  },
  mounted () {
    this.$store.dispatch('requestBestItems')
      .then(() => {
        console.log('Success requestBestItems!!')
      })
      .catch(err => {
        console.log('Error requestBestItems!!', err)
      })
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
}
</style>
