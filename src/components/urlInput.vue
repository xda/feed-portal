<template lang="html">
  <div id="enter-url" class="row">
    <div class="input-group">
      <input type="text" id="url" v-model="url"  @keyup.enter="submit" required>
      <label for="url">Enter URL</label>
      <button class="btn btn-orange" @click.prevent="submit">
        Add
      </button>
    </div>
    {{item}}
  </div>
</template>

<script>
import instance from '../store/api'
// import {initialItem} from '../store/store'
export default {
  data () {
    return {
      url: ''
    }
  },
  computed: {
    item () {
      return this.$store.getters.item
    }
  },
  // beforeMount () {
  //   this.$store.commit('SET_ITEM', initialItem)
  // },
  methods: {
    submit () {
      if (this.url.length) {
        this.checkUrl()
      }
    },
    checkUrl (url) {
      this.$store.commit('SET_URL', this.url)

      instance.get('/pending/check', {params: {url: this.url}, timeout: 3000})
      .then((response) => {
        let check = response.data
        if (check.exists) {
          let item = response.data.item
          console.log(item)
          this.$store.commit('SET_ITEM', item)
          this.$router.push({path: `/item/live-${check.live}/reusable-${check.reusable}/${item.id}`})
        } else {
          this.$router.push({name: 'add-item'})
        }
      })
    }
  }
}

</script>

<style lang="scss" scoped>
  .input-group {
    display: flex;
    button {
      margin-left: 1rem;
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
