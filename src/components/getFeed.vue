<template lang="html">
  <div id="get-feed">
    <h3><i class="material-icons orange">add_circle_outline</i> Suggest feed content</h3>
    <div class="col-sm-8 col-sm-offset-2 col-xs-10 col-xs-offset-1">
      <url-input></url-input>
    </div>
    <h3><i class="material-icons orange">add_circle_outline</i> Get feed</h3>

    <div class="row col-lg-10 col-lg-offset-1">
      <div class="card">
        <div class="row card-body">
          <div class="col-sm-6" id='feed-description'>
            XDA Feed is a "feed" of the best of the best for the OnePlus 3/3T, updated
            several times per day. Whether it's a new ROM, kernel, root method, news
            article, thread, video, or an interesting icon pack, theme, or wallpaper
            to change things up a little bit, XDA Feed will keep you apprised of the
            best stuff for your phone, with granular notifications to filter content
            type and push interval selection -- or disable them altogether, if you
            don't wish to be disturbed.
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
      <div class="col-lg-4 phone-box-container">
        <div class="phone-box">
        </div>
        <div class="download">
          <a href="https://play.google.com/store/apps/details?id=com.xda.feed">
            <img src="../assets/icons/getonlabs.png"
                 alt="google play download link"
                 class="download-link">
          </a>
          <a href="https://play.google.com/store/apps/details?id=com.xda.feed">
            <img src="../assets/icons/google-play-badge.png"
                 alt="google play download link"
                 class="download-link">
          </a>
        </div>
      </div>
      <div class="col-lg-8">
        <youtube :video-id="videoId" id="youtube"></youtube>
      </div>
    </div>
    <div>
      <div class="col-lg-8 col-lg-offset-2">
        <carousel></carousel>
      </div>
      <br>
    </div>

  </div>
</template>

<script>
import urlInput from './urlInput'
import carousel from './carousel'

export default {
  components: {
    urlInput,
    carousel
  },
  data () {
    return {
      url: '',
      videoId: 'videoId'
    }
  },
  mounted () {
    this.setVideoId('https://www.youtube.com/watch?v=2X6iaCW5IXY')
  },
  methods: {
    ready (player) {
      this.player = player
    },
    setVideoId (url) {
      this.videoId = this.$youtube.getIdFromURL(url)
      console.log(this.videoId)
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../styles/variables';

ul {
  li {
    list-style: circle;
    color: $orange;
    & ~span.list-text {
      color: $paper;
    }
  }
}

#feed-description {
  border-left: 1px solid $orange;
}

.download-link {
  max-height: 2.5rem;
  max-width: 100%;
}

.phone-box-container {
  display: flex;
  justify-content: space-around;
  align-items: center;
  flex-wrap: wrap;
  margin-bottom: 5rem;
  .phone-box {
    display: block;
    height: 300px;
    width: 169px;
    border-radius: 5px;
    border: 1px solid white;
    float: none;
    clear: both;
    margin-bottom: 1rem;
  }
  .download {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    width: 60%;
  }
}

.card {
  background-color: $dark-grey;
  margin-bottom: 5rem;
}


</style>
