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
      <div class="date">
        <span class="grey-lightest input-title">
          {{ new Date(item.timestamp).toLocaleDateString() }}
        </span>
      </div>
      <div id="banner-container">
        <img :src="item.banner.source" id="banner" class="shadow-2dp">
      </div>
      <div class="row">
        <div class="col-lg-8 col-xs-12">
          <div class="detail-wrap">
            <span class="grey-lightest input-title">URL</span>
            <div class="detail" id="url">
              <a :href="item.url" class="link" target="_blank">
                {{ item.url }}
              </a>
            </div>
          </div>

          <div class="detail-wrap">
          <!-- TODO:if reusable put toggle here -->
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
        </div>
        <div class="col-lg-4">
          <div class="detail-wrap" v-if="liveReuse">
            <span class="grey-lightest input-title">Newest Version</span>
            <div class="detail">
              {{item.version}}
            </div>
          </div>
        </div>
      </div>

    </div>
    <pre>
      <!-- {{item}} -->
    </pre>
	</div>
</template>

<script>
import urlInput from './urlInput'

export default {
  props: ['id', 'live', 'reusable'],
  components: {
    urlInput
  },
  computed: {
    item () {
      return this.$store.getters.item
    },
    types () {
      return this.$store.getters.types
    },
    type () {
      if (this.item.id) {
        return this.types.filter(t => t.id === this.item.type)[0].tag
      }
    },
    liveNoReuse () {
      return this.live === 'live-true' && this.reusable !== 'reusable-true'
    },
    liveReuse () {
      return this.live === 'live-true' && this.reusable === 'reusable-true'
    },
    pending () {
      return this.live !== 'live-true'
    }
  },
  filters: {
    capitalize (val) {
      if (!val) return ''
      val = val.toString()
      return val.charAt(0).toUpperCase() + val.slice(1)
    }
  }
}
</script>

<style lang="scss" scoped>
  #item-details {
    margin-bottom: -3rem;
  }

  #banner-container {
    width: 100%;
    max-height: 10rem;
    margin-bottom: 6rem;
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
    text-overflow: ellipsis;
    max-width: 100%;
    // overflow-hidden kills a tag bottom border
    border-bottom: orange 2px solid;

  }
  .label-wrap {
    display: inline;
    float: right;
  }

  .detail-wrap {
    margin-bottom: 2rem;
    .detail {
      font-size: 1.4rem;
    }
  }

</style>
