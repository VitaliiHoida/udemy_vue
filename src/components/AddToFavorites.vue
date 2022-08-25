<template>
  <button
      @click="handleLike"
      :class="{
          'btn': true,
          'btn-sm': true,
          'btn-primary': isFav,
          'btn-outline-primary': !isFav
       }"
  >
    <i class="ion-heart"/>
    <span>&nbsp; {{ favCount }}</span>
  </button>
</template>

<script>
import {mapActions} from "vuex";

export default {
  name: 'AddToFavorites',
  props: {
    isFavorited: {
      type: Boolean,
      required: true,
    },
    articleSlug: {
      type: String,
      required: true,
    },
    favoritesCount: {
      type: Number,
      required: true,
    },
  },
  data: () => ({
    isFav: this?.isFavorited,
    favCount: this?.favoritesCount,
  }),
  methods: {
    ...mapActions("addToFavorites", ["addToFavorites"]),
    handleLike() {
      this.addToFavorites({slug: this.articleSlug, isFavorited: this.isFav}).then(()=>{
        if (this.isFav) {
          this.favCount = this.favCount - 1;
        } else {
          this.favCount = this.favCount + 1;
        }
        this.isFav = !this.isFav;
      });

    },
  },
}
</script>