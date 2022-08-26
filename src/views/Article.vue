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
          <span v-if="isAuthor">
            <router-link class="btn btn-outline-secondary btn-sm"
                         :to="{name: 'editArticle', params: {slug: data.slug}}">
              <i class="ion-edit"/> Edit Article
            </router-link>&nbsp;
            <button class="btn btn-outline-danger btn-sm" @click="delArticle">
              <i class="ion-trash-a"/> Delete Article
            </button>
          </span>
          <span v-else>
            <follow-button :user="data.author" @follow-user="followUserComp()"/>&nbsp;
            <add-to-favorites :favorites-count="data.favoritesCount" :is-favorited="data.favorited" @addToFavorites="atf(data)" detailed/>
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
          <tag-list :tags="data.tagList"/>
        </div>
      </div>

      <hr/>

      <div class="article-actions" v-if="data">
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
          <span v-if="isAuthor">
            <router-link class="btn btn-outline-secondary btn-sm"
                         :to="{name: 'editArticle', params: {slug: data.slug}}">
              <i class="ion-edit"/> Edit Article
            </router-link>&nbsp;
            <button class="btn btn-outline-danger btn-sm" @click="delArticle">
              <i class="ion-trash-a"/> Delete Article
            </button>
          </span>
          <span v-else>
            <follow-button :user="data.author" @follow-user="followUserComp()" />&nbsp;
            <add-to-favorites :favorites-count="data.favoritesCount" :is-favorited="data.favorited" @addToFavorites="atf(data)" detailed />
          </span>
        </div>
      </div>
      <div class="row">
        <div class="col-xs-12 col-md-8 offset-md-2">
          <comments-form :user="curUser" :add-comment="addCoomentComp"/>
          <comments-list :user="curUser" :comment-list="comments" @delete-comment="delComment"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {mapState, mapActions, mapGetters} from "vuex";
import AppLoading from '@/components/Loading';
import AppError from '@/components/Error';
import TagList from "@/components/TagList";
import AddToFavorites from "@/components/AddToFavorites";
import FollowButton from "@/components/FollowButton";
import CommentsForm from "@/components/CommentsForm";
import CommentsList from "@/components/CommentsList";

export default {
  name: 'AppArticle',
  components: {
    AppLoading,
    AppError,
    TagList,
    AddToFavorites,
    FollowButton,
    CommentsForm,
    CommentsList,
  },
  computed: {
    ...mapState("article", ["data", "isLoading", "error", "comments"]),
    ...mapGetters("auth", ["curUser"]),
    isAuthor() {
      if (!this.curUser || !this.data) {
        return false;
      }
      return this.data.author.username === this.curUser.username;
    },
    slug() {
      return this.$route.params.slug;
    },
  },
  methods: {
    ...mapActions("article", ["getArticle", "deleteArticle", "getComments", "deleteComment"]),
    ...mapActions("addToFavorites", ["addToFavorites"]),
    ...mapActions("userProfile", ["followUser"]),

    delArticle() {
      this.deleteArticle({slug: this.slug}).then(() => {
        this.$router.push({name: 'globalFeed'});
      });
    },
    atf(article){
      this.addToFavorites({slug: this.slug, isFavorited: article.favorited}).then(()=>{
        if (article.favorited) {
          article.favoritesCount = article.favoritesCount - 1;
        } else {
          article.favoritesCount = article.favoritesCount + 1;
        }
        article.favorited = !article.favorited;
      });
    },
    followUserComp(){
      console.log(this.data.author.username);
      this.followUser({slug: this.data.author.username, following: this.data.author.following}).
      then(() => {
        this.data.author.following = !this.data.author.following;
      });
    },
    addCoomentComp(){
      console.log('added');
    },
    delComment(data){
      this.deleteComment({slug: this.slug, id: data});
    }
  },
  mounted() {
    this.getArticle({slug: this.slug});
    this.getComments({slug: this.slug});
  },
}
</script>