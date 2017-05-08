<template lang="html">
  <div id="add-item">
    <h4><i class="material-icons">add</i>Suggest feed content</h4>
    <div class="col-lg-8 col-lg-offset-2">
      <form method="post">
        <!-- Device (Dropdown, new device?) -->
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
        <!-- Type of content (Text, padded as a square button, bg color different per-type --  listed horizontally in 2-3 rows) -->
        <!-- App
        Article
        Homescreen
        Wallpaper
        Icon Pack
        Kernel
        ROM
        Thread
        Video -->
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

      <!-- Submit to feed [button] -->
    </div>
  </div>
</template>

<script>
export default {
}
</script>

<style lang="scss" scoped>
h4 {
  margin: 0 auto 1rem auto;
  // color: lighten(grey, 10%);
  padding-bottom: 1rem;
  border-bottom: 1px dotted grey
}

form {
  padding-bottom: 4rem;
}
</style>
