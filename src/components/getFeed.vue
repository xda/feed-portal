<template lang="html">
  <div id="get-feed">
    <h3><i class="material-icons orange">add_circle_outline</i> Suggest feed content</h3>
    <div class="col-sm-8 col-sm-offset-2 col-xs-10 col-xs-offset-1">
      <url-input @submit="checkUrl"></url-input>
    </div>
    <h3><i class="material-icons orange">add_circle_outline</i> Get feed</h3>

    <div class="row col-lg-8 col-lg-offset-2">

      <div class="col-lg-6 phone-box-container">
        <div class="pixel-eg phone-box">
          Pixel
        </div>
        <div class="btn-group">
          <button class="btn btn-orange">Labs \=/</button>
          <button class="btn btn-grey">Play ||>></button>
        </div>
      </div>

      <div class="col-lg-6">
        <div class="phone-box-container">
          <div class="oneplus-eg phone-box">
            OnePlus3/3T
          </div>
          <div class="btn-group">
            <button class="btn btn-orange">Labs \=/</button>
            <button class="btn btn-grey">Play ||>></button>
          </div>
        </div>
      </div>
    </div>

    <div class="row">
      <div class="col-lg-8 col-lg-offset-2">
        <carousel></carousel>
      </div>
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
      url: ''
    }
  },
  methods: {
    checkUrl (url) {
      // check url status here
      if (url.length) {
        this.$store.commit('SET_URL', url)
        this.$router.push({name: 'add-item'})
      }
    }
  }
}
</script>

<style lang="scss">
.phone-box-container {
  display: flex;
  justify-content: space-around;
  align-items: center;
  flex-wrap: wrap;
  margin-bottom: 2rem;
  .phone-box {
    display: block;
    height: 366px;
    width: 206px;
    border-radius: 5px;
    border: 1px solid white;
    float: none;
    clear: both;
    margin-bottom: 1rem;
  }
  .btn-group {
    display: flex;
    justify-content: center;
    width: 100%;
    & * {
      margin: .2rem;
    }
  }
}
</style>
