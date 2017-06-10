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
      if (this.url.length) {
        this.$store.dispatch('checkUrl', this.url)
      }
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
  @media screen and (max-width: 600px) {
    .input-group {
      flex-wrap: wrap;
      align-items: center;
      justify-content: center;
      button {
        width: 100%;
        margin: 10px 0 0 0;
      }
    }
  }
</style>
