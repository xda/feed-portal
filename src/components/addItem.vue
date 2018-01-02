<template lang="html">
  <div id="add-item">
    <h3><i class="material-icons orange">add_circle_outline</i> Suggest feed content</h3>
    <div class="col-lg-8 col-lg-offset-2 col-sm-10 col-sm-offset-1 col-xs-12">
      <div class="form">
        <transition name="fade">
          <div class="card" v-if="infoBox">
            <div class="row card-body">
              <span class="remove" id="info-box" @click="closeInfoBox">
                <i class="material-icons dark-orange">close</i>
              </span>
              <div>
                <i class="material-icons orange">lightbulb_outline</i> Suggestions have a better chance of being approved quickly if they're filled out completely and accurately!
              </div>
              <div>
                <i class="material-icons orange">create</i>Content should be high quality and in line with what you already see in Feed.
              </div>
            </div>
          </div>
        </transition>

        <div v-if="url">
          <span class="grey-lightest input-title">URL</span>
          <h4 id="url">
            <div>
              <a :href="url" class="link" target="_blank">{{ url }}</a>
            </div>
          </h4>
        </div>
        <!-- Type -->
        <span class="grey-lightest input-title">Type of content</span>
        <div class="content-type col-lg-9 col-sm-12 col-xs-12">
          <div class="row">
            <div class="type-radio-group" v-for="type in types" ref="type">
              <label :for="type.tag">
                <input type="radio"
                       name="type"
                       :id="type.tag"
                       :value="type.id"
                       v-model="item.type"
                       @change="setLocalStorage"
                       required>
                <span class="type-box col-sm-12"
                      :id="'label-' + type.tag"
                      :class="{'not-selected' : item.type !== type.id && item.type !== ('' || null)}">
                  {{type.name}}
                </span>
              </label>
            </div>
          </div>
          <span v-if="formErrors.type" class="errors">{{ formErrors.type }}</span>
        </div>
        <br><br>
        <!-- Device -->
        <span class="grey-lightest input-title">Item scope</span>
        <div class="checkbox-group">
          <input type="checkbox" id="device-specific"
                 v-model="item.deviceSpecific"
                 @blur="setLocalStorage">
          <label for="device-specific" class="grey-lightest">Device specific</label>
        </div>

        <transition name="fade">
          <div id="device-picker" v-show="item.deviceSpecific">
            <div class="input-group">
              <select class="input"required v-model="item.device" @blur="setLocalStorage">
                <option></option>
                <option v-for="d in devices" :value="d.model">
                  {{d.name}}
                </option>
              </select>
              <label class="grey-lightest">Choose a device</label>
            </div>
          </div>
        </transition>
        <!-- Title (Inputbox) -->
        <div class="input-group">
          <input type="text" id="title-input"
                 v-model="item.title"
                 @blur="setLocalStorage"
                 required>
          <label for="title-input">Title</label>
          <span v-if="formErrors.title" class="errors">{{ formErrors.title }}</span>
        </div>
        <!-- Description (Textarea) -->
        <div class="input-group">
          <textarea id="description-input"
                    rows="4"
                    cols="60"
                    maxLength="2000"
                    v-model="item.description"
                    @blur="setLocalStorage"
                    required>
          </textarea>
          <label for="description-input">Description</label>
        </div>
        <!-- Banner (File selection) (optional) -->
        <div class="row banner">
          <div class="file col-lg-5">
            <input type="file" id="banner-input" @change="onFileChange">
            <label for="banner-input" id="b-i">
              {{ !item.banner.source ? 'upload banner image' : item.banner.source }}
            </label>
          </div>
          <div class="col-lg-7 banner-image-container">
            <div class="loader" v-if="item.banner.source && !item.banner.img"></div>
            <span class='remove' v-show="item.banner.img" @click="removeImage">
              <i class="material-icons orange">close</i>
            </span>
            <img :src="item.banner.img" v-if="item.banner.img" id="banner-img">
          </div>
        </div>
        <div class="end-lg" id="submit-button">
          <submit-button :classes="'btn-orange'"
                         :text="'Submit'"
                         @click.native="submit">
          </submit-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import submitButton from './submitButton'

const initialItem = {
  url: '',
  deviceSpecific: false,
  device: '',
  type: '',
  title: '',
  description: '',
  banner: {
    source: '',
    img: '',
    file: ''
  }
}

export default {
  data () {
    return {
      item: JSON.parse(localStorage.getItem('ITEM')) || initialItem,
      formErrors: {},
      infoBox: localStorage.getItem('ADD_INFOBOX') === null ? 1 : parseInt(localStorage.getItem('ADD_INFOBOX'))
    }
  },
  components: {
    submitButton
  },
  mounted () {
    this.removeImage()
    if (this.url) {
      this.item.url = this.url
    }
  },
  watch: {
    'item.deviceSpecific': function () {
      if (!this.item.deviceSpecific) {
        this.item.device = ''
      }
    }
  },
  computed: {
    ...mapGetters([
      'url',
      'types',
      'devices'
    ])
  },
  methods: {
    closeInfoBox () {
      this.infoBox = 0
      localStorage.setItem('ADD_INFOBOX', this.infoBox)
    },
    setLocalStorage () {
      localStorage.setItem('ITEM', JSON.stringify({...this.item}))
    },
    validate () {
      let errors = {}
      if (this.item.type === '') {
        errors.type = 'Choose a type'
      }
      if (!this.item.title) {
        errors.title = 'Title is required'
      }
      this.formErrors = errors

      return Object.keys(this.formErrors).length === 0
    },
    onFileChange (e) {
      if (this.item.banner.img) {
        this.removeImage()
      }
      var files = e.target.files || e.dataTransfer.files
      if (!files.length) {
        return
      }
      this.item.banner.source = files[0].name
      this.item.banner.file = files[0]

      setTimeout(() => {
        this.createImage(files[0])
      }, 800)
    },
    createImage (file) {
      var reader = new FileReader()

      reader.onload = (e) => {
        this.item.banner.img = e.target.result
      }
      reader.readAsDataURL(file)
    },
    removeImage: function (e) {
      this.item.banner = {source: '', img: '', file: ''}
    },
    submit () {
      this.$store.commit('TOGGLE_LOADING', true)
      if (this.validate()) {
        this.$store.dispatch('saveItem', this.item).then(() => {
          this.$store.commit('TOGGLE_LOADING', false)
          this.$router.push({name: 'thanks'})
        })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../styles/variables';
@import '../styles/mixins';


::-webkit-scrollbar {
  width: .3rem;
}

::-webkit-scrollbar-track {
  background-color: $grey-light;
}

::-webkit-scrollbar-thumb {
  background-color: $dark-grey;
}

::-webkit-scrollbar-thumb:hover {
  background-color: lighten($orange, 15%);
  @include shadow-2dp;
}

$type-colours: (
'app' : #f06292,
'article' : #388E7D,
'thread' : #aa66cc,
'kernel' : #74c353,
'wallpaper' : #34b5e2,
'homescreen' : #d39747,
'rom' : #dd4b39,
'iconpack' : #9c27b0,
'theme' : #7d4641,
'video' : #ffb74d,
);

@each $section, $colour in $type-colours {
  #label-#{$section} {
    background-color: $colour;
    opacity: 1;
    transition: .300s ease all;
    &:hover {
      background-color: lighten($colour, 10%);
      transition: background-color ease .300s;
    }
    &.not-selected {
      opacity: .4;
      transition: .300s ease all;
    }
  }
}

.card {
  background-color: $grey-light;
  margin-bottom: 2rem;
  .card-body {
    padding-top: .3rem;
  }
}

.form {
  padding-bottom: 4rem;
}

.content-type {
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
  .type-radio-group {
    input[type="radio"] {
      width: 0.1px;
      height: 0.1px;
      opacity: 0;
      z-index: -1;
      position: absolute;
    }
    span.type-box {
      height: 7.2rem;
      width: 7.2rem;
      text-transform: uppercase;
      margin: 2px;
      display:inline-flex;
      justify-content: center;
      align-items:center;
      font-weight: bold;
    }
  }

}

.banner {
  display: flex;
  padding: 0;
  align-items: flex-start;
  margin-bottom: 4rem;
  .banner-image-container {
    height: 10rem;
    width: 100%;
    border: 1px solid $grey-lightest;
    border-radius: 2px;
    background-color: $grey-light;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    #banner-img {
      width: 90%;
      height: 9rem;
      border-radius: 2px;
      object-fit: cover;
      position: absolute;
      z-index: 4;
      animation: fadein .8s;
      @keyframes fadein  {
        from { opacity: 0; }
        to { opacity: 1; }
      }
    }
  }
}

.remove {
  align-self: flex-start;
  top: 98%;
  margin-left: 98%;
  left: 0;
  z-index: 5;
  &:hover {
    cursor: pointer;
  }
  &#info-box {
    top: 120%;
  }
}

#url {
  color: $grey-lightest;
}

// tiny screens
@media screen and (max-width: 360px) {
  span.type-box {
    font-size: .7rem;
    max-height: 5.3rem;
    max-width: 5.3rem;
  }
  .banner {
    justify-content: center;
    .banner-image-container {
      max-width: 90%;
      align-self: center;
      #banner-img {
        max-width: 85%;
      }
    }
  }
}

</style>
