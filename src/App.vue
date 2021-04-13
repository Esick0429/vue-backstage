<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',
  components: {
    
  },
}
</script>

<style>
  @import url('../src/assets/css/index.css');
html, body, #app, .wrapper {
    width: 100%;
    height: 100%;
    }
</style>
