<template>
  <div>
    <app-loading v-if="isLoading" />
    <app-error v-if="error" :message="error"/>
    <div class="sidebar" v-if="data">
      <p>Popular Tags</p>
      <div class="tag-list">
        <router-link v-for="popularTag in data"
                     :key="popularTag"
                     :to="{name: 'tag', params:{slug: popularTag}}"
                      class="tag-default tag-pill">
          {{ popularTag }}
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import {mapState, mapActions} from "vuex";
import AppLoading from '@/components/Loading';
import AppError from '@/components/Error';

export default {
  name: 'PopularTags',
  components: {
    AppLoading,
    AppError,
  },
  computed: {
    ...mapState("popularTags", ["data", "isLoading", "error"]),
  },
  methods: {
    ...mapActions("popularTags", ["getPopularTags"]),
  },
  mounted() {
    this.getPopularTags();
  },
}
</script>
