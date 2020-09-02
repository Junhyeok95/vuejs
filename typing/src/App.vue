<template>
  <div id="app">
    <JangJang msg="JangJang" />
    <HelloWorld msg="Welcome to Your Vue.js App" />
    <HelloVue msg="HelloVue" />
    <p>{{mesaage}}</p>
  </div>
</template>

<script>
import HelloWorld from "./components/HelloWorld.vue";
import HelloVue from "./components/HelloVue.vue";
import JangJang from "./components/JangJang.vue";

export default {
  name: "App",
  components: {
    HelloWorld,
    HelloVue,
    JangJang,
  },
  data() {
    return {
      mesaage: "hello",
    };
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
