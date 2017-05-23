<template lang="html">
  <div id="enter-url" class="row">
    <div class="input-group">
      <input type="text" id="url" v-model="url"  @keyup.enter="submit" required>
      <label for="url">Enter URL</label>
      <button class="btn btn-orange" @click.prevent="submit">
        Add
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
  .input-group {
    display: flex;
    button {
      margin-left: 1rem;
    }
  }
</style>
