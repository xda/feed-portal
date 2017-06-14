<template lang="html">
	<div id="item-details">
    <h3><i class="material-icons orange">add_circle_outline</i>
       {{ item.title }}
     </h3>
    <div class="col-lg-8 col-lg-offset-2 col-sm-10 col-sm-offset-1 col-xs-12">
      <div>
        <span class="grey-lightest input-title">URL</span>
        <h4 id="url">
          <span>
            {{ item.url }}
          </span>
        </h4>
      </div>
    </div>
    <pre>
      {{item}}
    </pre>
	</div>
</template>

<script>
export default {
  props: ['id', 'live', 'reusable'],
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
    }
  }
}
</script>

<style lang="scss">
</style>
