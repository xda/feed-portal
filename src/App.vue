<template>
  <div id="app">
    <header>
      <h1>XDA FEED</h1>
    </header>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style lang="scss">
#app {
}

header {
  height: 6rem;
  background-color: green;
  padding: 2rem;
  margin: 0px;
  align-items: center;
}
</style>
