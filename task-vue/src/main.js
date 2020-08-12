import Vue from "vue";
import App from "./App.vue";
import vuetify from "./plugins/vuetify"; // 이런 형태로 추가됨 ... axios 마찬가지

Vue.config.productionTip = false;

new Vue({
  vuetify,
  render: (h) => h(App),
}).$mount("#app"); // public index.html
