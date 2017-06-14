<template lang="html">
  <carousel-3d :controls-visible="true"
               :autoplay="true"
               :height="640"
               :display="3"
               :animationSpeed="1500">
    <slide v-for="(slide, i) in slides"
           :index="i"
           class="side-slide shadow-2dp">
      <img :src="slide"/>
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
        '../../static/images/feed2.png',
        '../../static/images/feed3.png',
        '../../static/images/feed4.png',
        '../../static/images/feed5.png',
        '../../static/images/feed6.png'
      ],
      currentIndex: 1,
      timer: null
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../styles/mixins';
</style>
