<template>
  <div class="home-page">
    <app-banner/>
    <div class="container page">
      <div class="row">
        <div class="col-md-9">
          <feed-toggler :tag-name="tagName" />
          <feed-view :api-url="apiUrl"/>
        </div>
        <div class="col-md-3">
          <popular-tags/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import FeedView from "@/components/FeedView";
import PopularTags from "@/components/PopularTags";
import AppBanner from '@/components/Banner';
import FeedToggler from "@/components/FeedToggler";

export default {
  name: 'TagFeed',
  components: {
    FeedView,
    PopularTags,
    AppBanner,
    FeedToggler,
  },
  computed: {
    tagName() {
      return this.$route.params.slug;
    },
    apiUrl() {
      return `/articles?tag=${this.tagName}`;
    }
  },
}
</script>