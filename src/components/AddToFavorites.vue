<template>
  <button
      @click="handleLike"
      :class="{
          'btn': true,
          'btn-sm': true,
          'btn-primary': isFavorited,
          'btn-outline-primary': !isFavorited
       }"
  >
    <i class="ion-heart"/>
    <span>&nbsp;
      <span v-if="detailed">
        <span v-if="!isFavorited">Favorite Article</span>
        <span v-else>Unfavorite Article</span>
        ({{ favoritesCount }})
      </span>
      <span v-else>{{ favoritesCount }}</span>
    </span>
  </button>
</template>

<script>
export default {
  name: 'AddToFavorites',
  props: {
    isFavorited: {
      type: Boolean,
      required: true,
    },
    favoritesCount: {
      type: Number,
      required: true,
    },
    detailed:{
      type: Boolean,
      required: true,
      default: false,
    }
  },
  data: () => ({
    isFav: this?.isFavorited,
    favCount: this?.favoritesCount,
  }),
  methods: {
    handleLike(){
      this.$emit('addToFavorites');
    }
  },
}
</script>