<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>
<script>
  import Vue from 'vue'
  export default {
    name: 'App',
    data() {
      return {}
    },
  }
</script>
<style>
  html,
  body,
  #app {
    height: 100%;
    width: 100%;
    background-color: #E6F4FF;
  }
  * {
    padding: 0;
    margin: 0;
    background: transparent;
  }
  #app,
  input,
  select,
  button {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #555;
  }
</style>
