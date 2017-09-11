<template lang="html">
  <div id="enter-url" class="row">
    <transition name="fade">
      <div class="card" v-if="infoBox">
        <div class="row card-body">
          <span class="remove" id="info-box" @click="infoBox = false">
            <i class="material-icons dark-orange">close</i>
          </span>
          <div>
            <i class="material-icons orange">lightbulb_outline</i>    ROM, Kernel, Wallpaper and Homescreen urls are typically a link to the XDA thread where they're posted. App, Theme or Icon Packs often link to Google Play™ or XDA Labs.
          </div>
        </div>
      </div>
    </transition>
    <div class="input-group">
      <input type="text" id="url" v-model="url"  @keyup.enter="submit" required>
      <label for="url">Enter URL</label>
      <button class="btn btn-orange" @click.prevent="submit">
        Add
      </button>
    </div>
    <div class="errors" v-if="lengthError">
      {{ lengthError }}
    </div>
    <div class="errors"
         v-if="errors.response &&
               errors.response.data &&
               errors.response.data.detail">
      {{errors.response.data.detail}}
    </div>
    <div class="errors" v-if="Object.keys(errors).length">
      {{errors.response.data.error}}
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
export default {
  data () {
    return {
      url: '',
      lengthError: '',
      infoBox: true
    }
  },
  beforeMount () {
    this.clearItem()
  },
  computed: {
    ...mapGetters([
      'item',
      'errors',
      'instance'
    ])
  },
  methods: {
    ...mapActions(['setItem', 'setErrors', 'fetchDevices', 'clearItem']),
    submit () {
      if (this.url.length) {
        this.checkUrl()
      } else {
        this.lengthError = 'Can\'t be blank'
      }
    },
    checkUrl (url) {
      this.$store.commit('SET_URL', this.url)

      this.instance.get('/pending/check', {params: {url: this.url}, timeout: 3000})
      .then((response) => {
        let check = response.data
        if (check.exists) {
          let item = response.data.item
          let status = {reusable: true, live: true}

          this.setItem({item: item, status: status})

          this.$router.push({path: `/suggest/${item.uuid}`})
        } else {
          this.fetchDevices(response.data.devices)
          this.$router.push({name: 'add-item'})
        }
      })
      .catch(err => {
        this.setErrors(err)
        this.clearItem()
        console.log(err)
      })
    }
  }
}

</script>

<style lang="scss" scoped>
@import '../styles/variables';

  #enter-url {
    margin-bottom: 4rem;
  }

  .input-group {
    display: flex;
    margin-bottom: 0;
    button {
      margin-left: 1rem;
    }
  }

  .card {
    background-color: $grey-light;
    margin-top: 2rem;
    margin-bottom: -1rem;
    .card-body {
      padding-top: .3rem;
    }
    .remove {
      align-self: flex-start;
      top: 120%;
      margin-left: 98%;
      left: 0;
      z-index: 5;
      &:hover {
        cursor: pointer;
      }
    }
  }

  @media screen and (max-width: 600px) {
    .input-group {
      flex-wrap: wrap;
      align-items: center;
      justify-content: center;
      button {
        width: 100%;
        margin: 10px 0 0 0;
      }
    }
  }
</style>
