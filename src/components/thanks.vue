<template lang="html">
  <div id="thanks">
    <h3><i class="material-icons orange">favorite</i>
      Thanks
     </h3>
    <div class="col-lg-8 col-lg-offset-2 col-xs-10 col-xs-offset-1">
      <div class="thanks-message">
        <span class="paper">{{thanks}}</span>
      </div>
      <div class="col-sm-6 col-sm-offset-3">
        In the meantime, check out:
        <ul>
          <li>
            <a href="https://forum.xda-developers.com/android/apps-games/feed-t3585865"
               target="_blank"
               class="link">
            Official XDA Feed forum thread
            </a>
          </li>
          <li>
            <a href="https://t.me/xda_feed" target="_blank" class="link">
              Telegram XDA Feed group
            </a>
          </li>
          <li>
            <a href="https://www.xda-developers.com/xda-labs/" target="_blank"
               class="link">
               XDA Labs
            </a>
          </li>
        </ul>
      </div>
      <div class="center-xs thumb">
        <i class="material-icons dark-grey">thumb_up</i>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    thanks () {
      return this.$store.getters.thanks
    }
  }
}
</script>

<style lang="scss" scoped>

span {
  font-size: 1.5rem;
}

li {
  margin-bottom: 1rem;
}

ul {
  margin-bottom: 4rem;
}

.thanks-message {
  margin-bottom: 4rem;
}

.thumb {
  padding-bottom: 4rem;
}
</style>
