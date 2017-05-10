<template lang="html">
  <div id="add-item">
    <h4><i class="material-icons orange">add_circle_outline</i> Suggest feed content</h4>
    <div class="col-lg-8 col-lg-offset-2 col-sm-10 col-sm-offset-1">
      <form method="post">

        <!-- Device -->
        <span class="grey-lightest">Choose a device</span>
        <div class="radio-group">
          <label for="oneplus">
            <input type="radio" name="device" value="oneplus" id="oneplus">
            <span class="radio-label">OnePlus 3/3T</span>
          </label>
          <label for="pixel">
            <input type="radio" name="device" value="pixel" id="pixel">
            <span class="radio-label">Pixel</span>
          </label>
        </div>
        <br><br>
        <span class="grey-lightest">Type of content</span>
        <div class="content-type col-lg-9">
          <div class="row">
            <div class="type-box" v-for="type in types" :class="type.id">
              {{type.name}}
            </div>
          </div>
        </div>
        <!-- Title (Inputbox) -->
        <div class="input-group">
          <input type="text" id="title-input" required>
          <label for="title-input">Title</label>
        </div>
        <!-- Description (Textarea) -->
        <div class="input-group">
          <textarea id="description-input" rows="4" cols="60" required></textarea>
          <label for="description-input">Description</label>
        </div>
        <!-- Banner (File selection) (optional) -->
        <div class="input-group">
          <div class="file">
            <input type="file" id="banner-input">
            <label for="banner-input">Upload Banner</label>
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
  }
}
</script>

<style lang="scss" scoped>

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


h4 {
  margin: 0 auto 1rem auto;
  padding-bottom: 1rem;
  border-bottom: 1px dotted grey
}

form {
  padding-bottom: 4rem;
}

@each $section, $colour in $type-colours {
  .#{$section} {
    background-color: $colour;
    &:hover {
      background-color: lighten($colour, 10%);
    }
  }
}

.content-type {
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
}

.type-box {
  height: 100px;
  width: 100px;
  margin: 2px;
  display:inline-flex;
  justify-content: center;
  align-items:center;
  font-weight: bold;
}
</style>
