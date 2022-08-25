<template>
  <div>
    <app-loading v-if="isLoading" />
    <app-error v-if="error" :message="error"/>
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
            <add-to-favorites :is-favorited="article.favorited" :article-slug="article.slug" :favorites-count="article.favoritesCount" />
          </div>
        </div>
        <router-link :to="{name: 'article', params: {slug: article.slug}}" class="preview-link">
          <h1>{{article.title}}</h1>
          <p>{{article.description}}</p>
          <span>Read more...</span>
          <tag-list :tags="article.tagList" />
        </router-link>
      </div>
      <app-pagination :total="data.articlesCount" :limit="limit" :current-page="curPage" :url="baseUrl"></app-pagination>
    </div>
  </div>
</template>

<script>
import {mapState, mapActions} from "vuex";
import AppPagination from '@/components/AppPagination';
import {limit} from '@/helpers/vars';
import {stringify, parseUrl} from 'query-string';
import AppLoading from '@/components/Loading';
import AppError from '@/components/Error';
import TagList from "@/components/TagList";
import AddToFavorites from "@/components/AddToFavorites";

export default {
  name: 'FeedView',
  components: {
    AppPagination,
    AppLoading,
    AppError,
    TagList,
    AddToFavorites,
  },
  props: {
    apiUrl: {
      type: String,
      required: true,
    },
  },
  data: () => ({
    limit,
  }),
  computed: {
    ...mapState("feed", ["isLoading", "data", "error"]),
    curPage() {
      return Number(this.$route.query.page || '1');
    },
    baseUrl (){
      return this.$route.path;
    },
    offset() {
      return ( (this.curPage * limit) - limit );
    },
  },
  methods: {
    ...mapActions("feed", ["getFeed"]),
    fetchFeed(){
      const parsedUrl = parseUrl(this.apiUrl);
      const stringifiedParams = stringify({
        limit,
        offset: this.offset,
        ...parsedUrl.query
      });
      const apiUrlWithParams = `${parsedUrl.url}?${stringifiedParams}`;
      this.getFeed({apiUrl: apiUrlWithParams});
    },
  },
  watch: {
    curPage() {
      this.fetchFeed();
    },
  },
  mounted() {
    this.fetchFeed();
  }
}
</script>