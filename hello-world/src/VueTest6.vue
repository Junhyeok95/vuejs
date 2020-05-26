// Flux 패턴
// Action -> Dispatcher ->Store -> View

// Vuex
// 상태 ... 게터 ... 변이 ... 액션 ... 

<template>
  <div>
    {{ count }}
  </div>
</template>

<script>
import store from 'src/store';

export default {
  computed: {
    count () {
      return store.state.count;
    }
  }

}
</script>

<style>

</style>
