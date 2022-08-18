<template>
  <div>
    <div v-if="isLoading">
      Loading...
    </div>
    <div v-if="error">
      Something bad happened
    </div>
    <div v-if="data">
      <div class="article-preview" v-for="(article, index) in data.articles" :key="index">
        <div class="article-meta">
          <router-link :to="{name: 'userProfile', params: {slug: article.author.username}}" >
            <img :src="article.author.image" />
          </router-link>
          <div class="info">
            <router-link :to="{name: 'userProfile', params: {slug: article.author.username}}" class="author">
              {{article.author.username}}
            </router-link>
            <span class="date">
              {{article.createdAt}}
            </span>
          </div>
          <div class="pull-xs-right">
            ADD TO FAVORITES
          </div>
        </div>
        <router-link :to="{name: 'article', params: {slug: article.slug}}" class="preview-link">
          <h1>{{article.title}}</h1>
          <p>{{article.description}}</p>
          <span>Read more...</span>
          TAG LIST
        </router-link>
      </div>
      <app-pagination :total="total" :limit="limit" :current-page="currentPage" :url="url"></app-pagination>
    </div>
  </div>
</template>

<script>
import {mapState, mapActions} from "vuex";
import AppPagination from '@/components/AppPagination';

export default {
  name: 'FeedView',
  components: {
    AppPagination,
  },
  props: {
    apiUrl: {
      type: String,
      required: true,
    },
  },
  data: () => ({
    total: 500,
    limit: 10,
    currentPage: 5,
    url: '/tags/dragons',
  }),
  computed: {
    ...mapState("feed", ["isLoading", "data", "error"]),
  },
  methods: {
    ...mapActions("feed", ["getFeed"]),
  },
  mounted() {
    this.getFeed({apiUrl: this.apiUrl});
  }
}
</script>