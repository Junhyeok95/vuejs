import Vue from 'vue';
import App from './App.vue';

import store from './store';

new Vue({
  el: '#app',
  store, // 스토어를 가저와서 추가한다
  render: h => h(App)
});
