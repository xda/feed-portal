<template lang="html">
  <div id="carousel">
    <div class="slide"
         @mouseover="stopRotate"
         @mouseout="startRotate">
         <!-- TODO: material-icons in buttons -->
      <button class="btn btn-flat" @click="clickSide('prev')"><</button>
      <img :src="slides[slideIndex -1] || slides[slides.length -1]"
          @click="clickSide('prev')"
           class="side-slide
                  shadow-2dp">
      <img :src="slides[slideIndex]"
           class="shadow-6dp
                  main-img">
      <img :src="slides[slideIndex + 1] || slides[0]"
           @click="clickSide('next')"
           class="side-slide
                  shadow-2dp">
      <button class="btn btn-flat" @click="clickSide('next')">></button>
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
  computed: {
    slideIndex () {
      return this.currentIndex % this.slides.length
    }
  },
  methods: {
    startRotate () {
      this.timer = setInterval(this.next, 3000)
    },
    stopRotate () {
      clearTimeout(this.timer)
      this.timer = null
    },
    clickSide (direction) {
      if (direction === 'next') {
        this.next()
      } else if (direction === 'prev') {
        this.prev()
      }
      this.stopRotate()
      setTimeout(() => {
        this.startRotate()
      }, 2000)
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
@import '../styles/mixins';

.slide {
  max-width: 60rem;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 5rem;
  margin-bottom: 5rem;
  img.side-slide {
    width: 30%;
    opacity: .6;
  }
  img {
    width: 35%;
    &:hover {
      opacity: 1;
      @include focus-shadow;
    }
  }
  button.btn {
    margin: .5rem;
  }
}
</style>
