<template>
  <div class="article-page">
    <div class="banner">
      <div class="container" v-if="data">
        <h1>{{ data.title }}</h1>
        <div class="article-meta">
          <router-link :to="{name: 'userProfile', params: {slug: data.author.username}}">
            <img :src="data.author.image"/>
          </router-link>
          <div class="info">
            <router-link :to="{name: 'userProfile', params: {slug: data.author.username}}">
              {{ data.author.username }}
            </router-link>
            <span class="date">&nbsp;{{ data.createdAt }}</span>
          </div>
          <span>
          <router-link class="btn btn-outline-secondary btn-sm" :to="{name: 'editArticle', params: {slug: data.slug}}">
            <i class="ion-edit"/> Edit Article
          </router-link>
          <button class="btn btn-outline-danger btn-sm">
            <i class="ion-trash-a"/> Delete Article
          </button>
        </span>
        </div>
      </div>
    </div>
    <div class="container page">
      <app-loading v-if="isLoading"/>
      <app-error v-if="error" :message="error"/>
      <div class="row article-content" v-if="data">
        <div class="col-xs-12">
          <div>
            <p>{{ data.body }}</p>
          </div>
          TAGLIST
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {mapState, mapActions} from "vuex";
import AppLoading from '@/components/Loading';
import AppError from '@/components/Error';

export default {
  name: 'AppArticle',
  components: {
    AppLoading,
    AppError,
  },
  computed: {
    ...mapState("article", ["data", "isLoading", "error"])
  },
  methods: {
    ...mapActions("article", ["getArticle"]),
  },
  mounted() {
    this.getArticle({slug: this.$route.params.slug});
  }
}
</script>