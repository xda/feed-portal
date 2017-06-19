<template lang="html">
	<div id="item-details">

    <h3><i class="material-icons orange">add_circle_outline</i>
       {{ item.title }}
       <div class="label-wrap">
         <span :id="'label-' + type" class="label">{{type}}</span>
       </div>
     </h3>

     <div class="col-sm-8 col-sm-offset-2 col-xs-10 col-xs-offset-1"
          v-if="liveNoReuse">
        <span class="orange-lightest">
          Already exists in feed, try something else!
        </span>
       <url-input></url-input>
     </div>

    <div class="col-lg-8 col-lg-offset-2 col-sm-10 col-sm-offset-1 col-xs-12">

      <div id="banner-container">
        <div class="date">
          <span class="grey-lightest input-title">
            {{ item.timestamp | prettyDate }}
          </span>
        </div>
        <img :src="item.banner.img" id="banner" class="shadow-2dp">
      </div>

      <div class="row">
        <div class="col-lg-12 col-xs-12">
          <div class="detail-wrap">
            <span class="grey-lightest input-title">URL</span>
            <div class="detail" id="url">
              <div>
                <a :href="item.url" class="link" target="_blank">
                  {{ item.url }}
                </a>
              </div>

            </div>
          </div>

          <div class="detail-wrap">
            <span class="grey-lightest input-title">Device</span>
            <div class="detail">
              {{item.device.name || 'any' | capitalize }}
            </div>
          </div>
          <div class="detail-wrap">
            <span class="grey-lightest input-title">Description</span>
            <div class="detail">
              {{item.description}}
            </div>
          </div>

          <div class="detail-wrap" v-if="liveReuse">
            <div v-if="!versionUpdate">
              <span class="grey-lightest input-title">Newest Version</span>
              <div class="detail">
                {{item.version}}
                <button class="btn btn-flat btn-small"
                        id="update-version"
                        @click="versionUpdate = true">
                  update
                </button>
              </div>
            </div>

            <div v-if="versionUpdate">
              {{errors}}
              <div class="row new-version">
                <div class="col-lg-6 col-xs-12">
                  <div class="input-group">
                    <input type="text" id="version-number"
                           v-model="version"
                           @keyup.enter="submit"
                           required>
                    <label for="version-number">New version</label>
                  </div>
                </div>
                <div class="col-lg-2 col-offset-4 col-xs-12">
                  <div id="submit-button">
                    <button class="btn btn-small btn-orange"
                            @click.prevent="submit">
                      Submit
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
	</div>
</template>

<script>
import {mapActions} from 'vuex'

import urlInput from './urlInput'

export default {
  props: ['type', 'id'],
  components: {
    urlInput
  },
  data () {
    return {
      version: '',
      versionUpdate: false,
      errors: ''
    }
  },
  computed: {
    item () {
      return this.$store.getters.item
    },
    status () {
      return this.$store.getters.status
    },
    oldVersion () {
      return this.item.version
    },
    liveNoReuse () {
      return this.status.live && !this.status.reusable
    },
    liveReuse () {
      return this.status.live && this.status.reusable
    },
    pending () {
      return this.status.live
    }
  },
  filters: {
    capitalize (val) {
      if (!val) return ''
      val = val.toString()
      return val.charAt(0).toUpperCase() + val.slice(1)
    },
    prettyDate (val) {
      return new Date(val).toLocaleDateString()
    }
  },
  methods: {
    ...mapActions([
      'saveItem',
      'setItem',
      'updateVersion'
    ]),
    submit () {
      this.updateVersion(this.version).then(() => {
        this.saveItem(this.item).then(() => {
          setTimeout(() => {
            this.$router.push({name: 'thanks'})
          }, 1000)
        }).catch(() => {
          this.updateVersion(this.oldVersion)
          this.errors = 'something went wrong'
        })
      })
    }
  }
}
</script>

<style lang="scss" scoped>

.input-group {
  margin: 0 0 0rem -.2rem;
}

#item-details {
  margin-bottom: -3rem;
}

#banner-container {
  width: 100%;
  max-height: 10rem;
  margin-bottom: 10rem;
  margin-top: 2rem;
  #banner {
    width: 100%;
    max-height: 15rem;
    min-height: 5rem;
    border-radius: 2px;
    object-fit: cover;
    position: relative;
    z-index: 4;
  }
}

#url {
  white-space: nowrap;
  overflow: hidden;
  display: inline;
  text-overflow: ellipsis;
  max-width: 100%;

}

#submit-button {
  margin-top: 1rem;
}

#update-version {
  margin-left: 7rem;
}

.detail-wrap {
  margin-bottom: 2rem;
  .detail {
    font-size: 1.4rem;
  }
}
.label-wrap {
  display: inline;
  float: right;
}

.new-version {
  margin-bottom: 6rem;
}

</style>
