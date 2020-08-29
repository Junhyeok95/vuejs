<template>
  <div class="hello">
    <h2>{{ msg }}</h2>
  </div>
</template>

<script>
export default {
  name: "HelloVue",
  props: {
    msg: String,
  },
};
</script>
