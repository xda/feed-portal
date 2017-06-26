<template lang="html">
	<div id="item-details">
    <h3><i class="material-icons orange">add_circle_outline</i>
       {{ item.title }}
       <div class="label-wrap">
         <span :id="'label-' + type" class="label">{{type}}</span>
       </div>
     </h3>

     <!-- if thing exists already - -->
     <div class="col-sm-8 col-sm-offset-2 col-xs-10 col-xs-offset-1"
          v-if="liveNoReuse">
        <span class="orange-lightest">
          Already exists in feed, try something else!
        </span>
       <url-input></url-input>
     </div>

    <div class="col-lg-8 col-lg-offset-2 col-sm-10 col-sm-offset-1 col-xs-12">

      <div v-if="pending">
        <div class="row">
          <span>Item status: <strong class="orange">PENDING</strong><br></span>
        </div>
        <div class="row">
          <div class="col-xs-10">
            <span id="vote">Help get this item approved in feed with a vote!</span>
          </div>
          <div class="col-xs-2 end-xs">
            <button class="btn btn-small btn-orange"
                    @click="vote">
            vote
          </button>
        </div>
      </div>

      </div>

      <div id="banner-container">
        <div class="date">
          <span class="grey-lightest input-title">
            {{ item.timestamp | prettyDate }}
          </span>
        </div>
        <img :src="item.banner.img || '../../static/images/xda_500.png'" id="banner" class="shadow-2dp">
      </div>


      <div class="row">
        <div class="col-lg-12 col-xs-12">
          <div class="detail-wrap">
            <span class="grey-lightest input-title">URL</span>
            <div class="detail" id="url">
              <a :href="item.url" id="url-link" class="link" target="_blank">
                {{ item.url }}
              </a>
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
              <div class="row new-version">
                <div class="col-lg-6 col-xs-12">
                  <div class="input-group">
                    <input type="text" id="version-number"
                           v-model="version"
                           @keyup.enter="submit"
                           required>
                    <label for="version-number">New version</label>
                    <span class="errors" v-if="formErrors.version">{{formErrors.version}}</span>
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
      formErrors: {}
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
      return !this.status.live
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
      'voteForIt',
      'updateVersion'
    ]),
    validate () {
      let errors = {}
      if (this.versionUpdate && !this.version) {
        errors.version = "Can't be blank"
      }
      this.formErrors = errors
      return Object.keys(this.formErrors).length === 0
    },
    checkNetworkErrors () {
      let errors = this.$store.getters.errors
      return Object.keys(errors).length === 0
    },
    vote () {
      this.voteForIt(this.item.url).then(() => {
        if (this.checkNetworkErrors()) {
          this.$router.push({name: 'thanks'})
        }
      })
    },
    submit () {
      if (this.validate()) {
        this.updateVersion(this.version).then(() => {
          this.saveItem(this.item).then(() => {
            this.$router.push({name: 'thanks'})
          }).catch(() => {
            this.updateVersion(this.oldVersion)
          })
        })
      }
    }
  }
}
</script>

<style lang="scss" scoped>

a#url-link {
  display: block;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}

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

#submit-button {
  margin-top: 1rem;
}

#update-version {
  margin-left: 7rem;
}

#vote {
  font-size: 1.3rem;
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
