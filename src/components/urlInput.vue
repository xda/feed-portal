<template lang="html">
  <div id="enter-url">
    <div class="input-group">
      <input type="text" id="url" v-model="url" required>
      <label for="url">Enter URL</label>
      <button class="btn btn-orange" @click="submit">
        Go
      </button>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      url: ''
    }
  },
  methods: {
    submit () {
      this.$emit('submit', this.url)
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
