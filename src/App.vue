<template>
  <div id="app">
    <header>
      <h1>XDA FEED</h1>
    </header>
    <div class="card shadow-4dp">
      <header class="card-header shadow-2dp">
        <h1>something</h1>
      </header>
      <div class="card-body">
        <h2>something else</h2>
        <h3>eitch three</h3>
        <h4>eitch foor</h4>
        <h5>eitch fayve</h5>
        <h6>eitch siks</h6>
        <a href="#">Linky</a><br>
        <button class="btn-orange"> button </button><br>
        <button class="btn-grey"> button </button><br>
        <button class="btn-danger"> button </button><br>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
      </div>
    </div>
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
  background-color: orange;
  padding: 2rem;
  margin: 0px;
  align-items: center;
}
</style>
