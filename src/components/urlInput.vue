<template lang="html">
  <div id="enter-url">
    <div id="url-input" class="col-lg-10 col-lg-offset-1">
      <div class="input-group">
        <input type="text" id="url" required>
        <label for="url">Enter URL</label>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      url: ''
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
