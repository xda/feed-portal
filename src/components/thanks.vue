<template lang="html">
  <div id="thanks">
    <div class="col-8-lg col-lg-offset-2 col-10-xs col-xs-offset-1">
      <h4 class="orange-light">{{thanks}}</h4>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    thanks () {
      return this.$store.getters.thanks
    }
  }
}
</script>

<style lang="css">
</style>
