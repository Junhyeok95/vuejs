<template>
  <div class="jang">
    <button type="button" @click="bclick">hello button</button>
  </div>
</template>

<script>
export default {
  name: "JangJang",
  data() {
    return {};
  },
  methods: {
    bclick() {
      console.log("click");
    },
  },
};
</script>
