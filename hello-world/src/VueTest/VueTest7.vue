// Vuex import 사용 후 

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
      return this.$store.state.count;
    }
  }

}
</script>

<style>

</style>
