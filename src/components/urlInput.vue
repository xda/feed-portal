<template lang="html">
  <div id="enter-url">
    <input type="text" placeholder="URL" v-model="url">
    {{url}}
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

<style lang="scss">
#enter-url {
  padding: 2rem;
}
</style>
