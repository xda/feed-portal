<template lang="html">
  <div id="pending-item">
    Link already exists in PendingItem
      Title (Read only)
      Banner (Read only)
      Thumbs up [FAB] between top and start of content
      Line of text at very button that says "To vote for this content hit the FAB above".

    Item is re-usable (ROM/App/Theme/Icon Pack/etc)
      Newest Version (Read only -- turns into Inputbox when update button is clicked)
      "There is a newer version" [highlighted text] (Shows 'Submit' button when clicked)
      If 'New Version' is entered, request to /pending/create instead of /pending/vote using the applicable parameters
      Validation
      Check if newest version input is different from initial value

  </div>
</template>

<script>
export default {
}
</script>

<style lang="scss">
</style>
