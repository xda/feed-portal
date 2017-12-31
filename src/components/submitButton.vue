<template lang="html">
  <button class="btn" :class="classes">
    <span v-if="!loading">
      {{ text }}
    </span>
    <div class="spinner" v-else></div>
  </button>
</template>

<script>
export default {
  props: ['classes', 'text'],
  computed: {
    loading () {
      return this.$store.getters.loading
    }
  }
}
</script>

<style lang="scss" scoped>
.spinner {
  border: 2px solid transparent;
  border-top: 3px solid white;
  border-left: 3px solid white;
  border-radius: 50%;
  width: 2rem;
  height: 2rem;
  animation: spin .4s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
</style>
