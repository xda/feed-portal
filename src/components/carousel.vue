<template lang="html">
  <div id="carousel">
    <div class="slide">
      <img :src="slides[currentIndex -1]" class="side-slide">
      <img :src="slides[currentIndex]">
      <img :src="slides[currentIndex + 1]" class="side-slide">
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      slides: [
        '../../static/images/feed2.png',
        '../../static/images/feed3.png',
        '../../static/images/feed4.png',
        '../../static/images/feed5.png',
        '../../static/images/feed6.png'
      ],
      currentIndex: 1,
      timer: null
    }
  },
  mounted () {
    this.startRotate()
  },
  methods: {
    startRotate () {
      this.timer = setInterval(this.next, 2000)
    },
    stopRotate () {
      clearTimeout(this.timer)
      this.timer = null
    },
    next () {
      this.currentIndex += 1
    },
    prev () {
      this.currentIndex -= 1
    }
  }
}
</script>

<style lang="scss" scoped>
.slide {
  max-width: 60rem;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 5rem;
  margin-bottom: 5rem;
  img {
    width: 35%;
  }
  img.side-slide {
    width: 25%;
  }
}
</style>
