<template>
  <div id="app">
    <HelloWorld msg="Welcome to Your Vue.js App" />
    <HelloVue msg="HelloVue" />
    <HelloVue msg="HelloVue" />
  </div>
</template>

<script>
import HelloWorld from "./components/HelloWorld.vue";
import HelloVue from "./components/HelloVue.vue";

export default {
  name: "App",
  components: {
    HelloWorld,
    HelloVue,
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
