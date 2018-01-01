<template>
  <div id="application">
    <header id="nav">
      <router-link to="/">
        <img src="./assets/icons/aQ.png" alt="feed-icon" class="feed-icon">
        <h1 class="orange-light header">xda</h1><h1 class="paper header">feed</h1>
      </router-link>
      <div class="login-wrapper" @click.prevent="handleLogin" v-if='!canSubmit'>
        <i class="material-icons grey-lightest">lock_outline</i>
        <span class="grey-lightest continuum login">
          Login
        </span>
      </div>
      <div class="login-wrapper" @click.prevent="handleLogout" v-else>
        <i class="material-icons grey-lightest">lock_open</i>
        <span class="grey-lightest continuum login">
          Logout
        </span>
      </div>
    </header>

    <main class="col-lg-8
                 col-lg-offset-2
                 col-sm-10
                 col-sm-offset-1
                 col-xs-12
                 shadow-4dp">

      <transition name="fade">
        <router-view></router-view>
      </transition>
    </main>

    <footer class="row">
      <div class="col-xs-12 center-xs start-sm col-sm-5">
        <div>
          <img src="../static/images/xdalogo-dark.png" alt="xda-logo" id="xda-logo">
        </div>

        <div id="footer-text" class="grey-lightest">
          XDA Developers was founded by developers, for developers. It is now a valuable resource for people who want to make the most of their mobile devices, from customizing the look and feel to adding new functionality.
          <br>
          <a id="developer-link"
             class="orange"
             href="https://www.xda-developers.com/recognized-developer-program/">
            Are you a developer?
          </a>
        </div>
      </div>
      <div class="col-xs-12 col-sm-7 center-xs end-sm">
        <div id="social">
          <strong class="orange-light">We're social</strong>
        </div>
        <a href="https://twitter.com/xdadevelopers" target="_blank">
          <img src="./assets/icons/twitter.png" alt="twitter" class="social-icon">
        </a>
        <a href="https://www.facebook.com/xda.developers" target="_blank">
          <img src="./assets/icons/facebook.png" alt="facebook" class="social-icon">
        </a>
        <a href="https://plus.google.com/+xda" target="_blank">
          <img src="./assets/icons/google-plus.png" alt="google-plus" class="social-icon">
        </a>
        <a href="https://www.youtube.com/user/xdadevelopers" target="_blank">
          <img src="./assets/icons/youtube.png" alt="youtube" class="social-icon">
        </a>

      </div>
    </footer>
  </div>
</template>

<script>
import {checkLogin, login, logout, getAccessToken, setConvertToken} from './utils/auth'
export default {
  name: 'feed-portal',
  computed: {
    isLoggedIn () {
      return this.$store.getters.user.isLoggedIn
    },
    redirect () {
      return this.$store.getters.redirect
    },
    canSubmit () {
      return this.isLoggedIn || this.redirect
    }
  },
  beforeMount () {
    // sets correct login state on store before we do anthing
    checkLogin()
  },
  mounted () {
    // if returning from xda login page then do all this
    if (window.location.hash.substring(0, 13) === '#access_token') {
      new Promise((resolve, reject) => {
        resolve(getAccessToken())
      }).then(accessToken => setConvertToken(accessToken)).then(
        this.$router.push('/')
      )
    }
  },
  methods: {
    handleLogin () {
      login()
    },
    handleLogout () {
      this.$store.commit('CLEAR_REDIRECT')
      logout()
    }
  }
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

#footer-text {
  max-width: 100%;
  font-size: .9rem;
}

#developer-link {
  font-size: .9rem;
  &:hover {
    color: white;
  }
}

#loading-container {
  margin: 15% 44%;
  margin-bottom: -2rem;
}

h1.header {
  display: inline-block;
}

a {
  text-decoration: none;
}

i, span.login {
  font-size: 2rem;
}

#social {
  margin-bottom: 1rem;
}

.social-icon {
  max-height: 2rem;
  max-width: auto;
  margin-left: 1rem;
  opacity: .6;
  transition: .300s ease all;
  &:hover {
    cursor: pointer;
    opacity: 1;
  }
}
@media screen and (max-width: 800px) {
  .social-icon {
    max-height: 1rem;
  }
  #social {
    margin-top: 1rem;
    font-size: .7rem;
  }
  #xda-logo {
    max-width: 50%;
  }
  #footer-text {
    font-size: .7rem;
  }
  #developer-link {
    font-size: .7rem;
  }
}

@media screen and (max-width: 600px) {
  i {
    font-size: 1.5rem;
    display: block;
    float: right;
  }
  span.login {
    font-size: 1rem;
    display: block;
  }
}

.login-wrapper {
  margin-left: auto;
  margin-right: 12%;
  display: flex;
  justify-content: center;
  align-items: center;
  &:hover {
    cursor: pointer;
  }
}

.feed-icon {
  height: 4rem;
  position: relative;
  top: .7rem;
  padding-right: 1rem;
}
</style>
