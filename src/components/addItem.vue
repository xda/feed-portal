<template lang="html">
  <div id="add-item">
    <h4><i class="material-icons orange">add_circle_outline</i> Suggest feed content</h4>
    <div class="col-lg-8 col-lg-offset-2 col-sm-10 col-sm-offset-1">
      {{item}}
      <form method="post">

        <!-- Device -->
        <span class="grey-lightest">Choose a device</span>
        <div class="radio-group">
          <label for="oneplus">
            <input type="radio"
                   id="oneplus"
                   name="device"
                   value="oneplus"
                   v-model="item.device">
            <span class="radio-label">OnePlus 3/3T</span>
          </label>
          <label for="pixel">
            <input type="radio"
                   id="pixel"
                   name="device"
                   value="pixel"
                   v-model="item.device">
            <span class="radio-label">Pixel</span>
          </label>
        </div>
        <br><br>
        <span class="grey-lightest">Type of content</span>
        <div class="content-type col-lg-9">
          <div class="row">
            <div class="type-radio-group" v-for="type in types" ref="type">
              <label :for="type.id">
                <input type="radio"
                       name="type"
                       :id="type.id"
                       :value="type.id"
                       v-model="item.type">
                <span class="type-box"
                      :id="'label-' + type.id"
                      :class="{'not-selected' : item.type !== type.id && item.type !== ''}">
                  {{type.name}}
                </span>
              </label>
            </div>
          </div>
        </div>
        <!-- Title (Inputbox) -->
        <div class="input-group">
          <input type="text" id="title-input" v-model="item.title" required>
          <label for="title-input">Title</label>
        </div>
        <!-- Description (Textarea) -->
        <div class="input-group">
          <textarea id="description-input"
                    rows="4"
                    cols="60"
                    v-model="item.description"
                    required>
          </textarea>
          <label for="description-input">Description</label>
        </div>
        <!-- Banner (File selection) (optional) -->
        <div class="row banner">
          <div class="file col-lg-5">
            <input type="file" id="banner-input" @change="onFileChange">
            <label for="banner-input" id="b-i">
              {{ !item.banner.img ? 'upload banner image' : item.banner.name }}
            </label>
          </div>
          <div class="col-lg-7 banner-image-container">
            <img :src="item.banner.img" v-if="item.banner.img" id="banner-img">
          </div>
        </div>

        <div class="col-lg-8 col-lg-offset-2 end-lg">
          <button class="btn btn-orange">Submit</button>
        </div>
      </form>

    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      item: {
        device: '',
        type: '',
        title: '',
        description: '',
        banner: {
          name: '',
          img: ''
        }
      },
      types: [
        { name: 'Article', id: 'article' },
        { name: 'Thread', id: 'thread' },
        { name: 'Wallpaper', id: 'wallpaper' },
        { name: 'Homescreen', id: 'homescreen' },
        { name: 'ROM', id: 'rom' },
        { name: 'Kernel', id: 'kernel' },
        { name: 'Icon Pack', id: 'iconpack' },
        { name: 'Theme', id: 'theme' },
        { name: 'App', id: 'app' },
        { name: 'Video', id: 'video' }
      ]
    }
  },
  computed: {
  },
  methods: {
    onFileChange (e) {
      var files = e.target.files || e.dataTransfer.files
      if (!files.length) {
        return
      }
      this.item.banner.name = files[0].name
      this.createImage(files[0])
    },
    createImage (file) {
      var reader = new FileReader()

      reader.onload = (e) => {
        this.item.banner.img = e.target.result
      }
      reader.readAsDataURL(file)
    },
    removeImage: function (e) {
      this.banner = {name: '', img: ''}
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../styles/variables';

h4 {
  margin: 0 auto 1rem auto;
  padding-bottom: 1rem;
  border-bottom: 1px dotted grey;
}

form {
  padding-bottom: 4rem;
}

$type-colours: (
'app' : #f06292,
'article' : #34b5e2,
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

.content-type {
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
}

.type-radio-group {
  input[type="radio"] {
    width: 0.1px;
    height: 0.1px;
    opacity: 0;
    z-index: -1;
    position: absolute;
  }
  span.type-box {
    height: 100px;
    width: 100px;
    margin: 2px;
    display:inline-flex;
    justify-content: center;
    align-items:center;
    font-weight: bold;
  }
}

.banner {
  display: flex;
  padding: 0;
  align-items: flex-start;
}

.banner-image-container {
  height: 10rem;
  width: 100%;
  border: 1px solid $grey-lightest;
  border-radius: 2px;
  background-color: $grey-light;
}

#banner-img {
  width: 100%;
  height: 10rem;
  object-fit: cover;
}
</style>
