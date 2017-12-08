<template lang="html">
  <div id="get-feed">
      <h3><i class="material-icons orange">add_circle_outline</i> Suggest feed content</h3>
      <div class="col-sm-8 col-sm-offset-2 col-xs-10 col-xs-offset-1">
        <span v-if="isLoggedIn">
          <url-input></url-input>
        </span>
        <div v-else>
          <h6><a class="link" @click="handleLogin">Login</a>,
            then add a link to something you want to see in XDA Feed
          </h6>
        </div>
      </div>
    <h3><i class="material-icons orange">add_circle_outline</i> Get feed</h3>

    <div class="col-xs-12">
      <div class="download row center-xs">
        <div class="col-xs-5 end-xs">
          <div class="text-download-link">
            <a href="https://labs.xda-developers.com/store/app/com.xda.feed"
               target="_blank"
               class="link">
              Download on XDA Labs
            </a>
          </div>

          <a href="https://labs.xda-developers.com/store/app/com.xda.feed"
             target="_blank">
            <img src="../assets/icons/getonlabs.png"
                 alt="google play download link"
                 class="download-link">
          </a>
        </div>
        <div class="col-xs-5 start-xs">
          <div class="text-download-link">
            <a href="https://play.google.com/store/apps/details?id=com.xda.feed"
               target="_blank"
               class="link text-download-link">
              Download on Play
            </a>
          </div>
          <a href="https://play.google.com/store/apps/details?id=com.xda.feed"
            target="_blank">
            <img src="../assets/icons/google-play-badge.png"
                 alt="google play download link"
                 class="download-link">
          </a>
        </div>
      </div>
    </div>


    <div class="row video-player center-xs">
       <div id="iframe-wrap">
          <iframe width="100%" height="100%"
                  src="https://www.youtube.com/embed/2X6iaCW5IXY"
                  frameborder="0"
                  allowfullscreen
                  class="shadow-2dp">
          </iframe>
      </div>
    </div>

    <div class="row col-lg-10 col-lg-offset-1">
      <div class="card">
        <div class="row card-body">
          <div class="col-sm-6" id='feed-description'>

            XDA Feed is a "feed" of the best of the best from the XDA forums,
            updated several times per day. Whether it's a wallpaper, icon pack,
            news article, interesting thread, video, XDA Feed will keep you
            apprised of the best stuff for your phone, with granular
            notifications to filter content type and push interval selection --
            or disable them altogether, if you don't wish to be disturbed.
          </div>
          <div class="col-sm-6">
            <ul>
              <li> <span class="list-text">Optimized for speed and fluidity</span></li>
              <li> <span class="list-text">Fully Material Design</span></li>
              <li> <span class="list-text">Download ROMs, kernels, and other cool stuff right to your device, or easily get to a thread to see more information or join the discussion</span></li>
              <li> <span class="list-text">Full notification control: you pick the type of content for which you get notifications, and the time interval</span></li>
              <li> <span class="list-text">Dark theme and light theme</span></li>
              <li> <span class="list-text">Star your favorite content for later viewing</span></li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <div>
      <div class="col-lg-6 col-lg-offset-3">
        <carousel></carousel>
      </div>
      <br>
    </div>

  </div>
</template>

<script>
import urlInput from './urlInput'
import carousel from './carousel'
import { login } from '../utils/auth'

export default {
  components: {
    urlInput,
    carousel
  },
  data () {
    return {
      url: ''
    }
  },
  computed: {
    isLoggedIn () {
      return this.$store.getters.user.isLoggedIn
    }
  },
  methods: {
    handleLogin () {
      login()
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../styles/variables';

#feed-description {
  border-left: 1px solid $orange;
}

#iframe-wrap {
  margin-bottom: 4rem;
}

.feed-icon {
  height: 1.6rem;
}

.download {
  margin-bottom: 4rem;
  .download-link {
    max-height: 2.5rem;
    max-width: 100%;
  }
  .text-download-link {
    margin-bottom: 1rem;
  }
}

.card {
  background-color: $dark-grey;
  margin-bottom: 5rem;
}

@media screen and (min-width: 768px) {
  #iframe-wrap {
    width: 560px;
    height: 315px;
  }
}


@media screen and (min-width: 451px) and (max-width: 767px) {
  #iframe-wrap {
    width: 315px;
    height: 177px;
  }
  #feed-description {
    padding-left: .6rem;
  }
}

@media screen and (max-width: 450px) {
  #iframe-wrap {
    width: 315px;
    height: 177px;
  }
  #feed-description {
    padding-left: .6rem;
  }
}
</style>
