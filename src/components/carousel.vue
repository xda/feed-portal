<template lang="html">
  <carousel-3d :controls-visible="true"
               :autoplay="true"
               :height="510"
               :width="287"
               :display="3"
               :autoplayHoverPause="true"
               :animationSpeed="1500">
    <slide v-for="(slide, i) in slides"
           :key="slide"
           :index="i">
      <img :src="slide" class="slide-img">
    </slide>
  </carousel-3d>
</template>

<script>
import { Carousel3d, Slide } from 'vue-carousel-3d'

export default {
  components: {
    Carousel3d,
    Slide
  },
  data () {
    return {
      slides: [
        require('../assets/images/feed2.png'),
        require('../assets/images/feed3.png'),
        require('../assets/images/feed4.png'),
        require('../assets/images/feed5.png'),
        require('../assets/images/feed6.png')
      ],
      currentIndex: 1,
      timer: null
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
