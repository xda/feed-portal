<template>
  <div id="application">
    <header id="nav">
      <router-link to="/">
        <img src="./assets/icons/aQ.png" alt="feed-icon" class="feed-icon">
        <h1 class="orange-light header">xda</h1><h1 class="paper header">feed</h1>
      </router-link>
      <div class="register">
        <router-link to="/">
          <i class="material-icons grey-lightest">lock</i>
          <span class="grey-lightest continuum login">
            Login
          </span>
        </router-link>
      </div>
    </header>
    <main class="col-lg-8
                 col-lg-offset-2
                 col-sm-12
                 col-sm-offset-1
                 shadow-4dp">
      <router-view></router-view>
    </main>
    <footer>some stuff about xda</footer>
  </div>
</template>

<script>
export default {
  name: 'application'
}
</script>

<style lang="scss" scoped>

#application {
  min-height: 100%;
}

header#nav {
  width: 100vw;
  margin-left: -10px;
  margin-top: -10px;
  z-index: 4;
  position: fixed;
}

h1.header {
  display: inline-block;
}

a {
  text-decoration: none;
}

i, span.login{
  font-size: 2rem;
}

.register {
  margin-left: auto;
  margin-right: 10rem;
  display: flex;
  justify-content: center;
  align-items: center;
}

.feed-icon {
  height: 4rem;
  position: relative;
  top: .7rem;
  padding-right: 1rem;
}
</style>
