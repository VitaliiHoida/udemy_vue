<template>
  <div class="profile-page" v-if="user">
    <div class="user-info">
      <div class="container">
        <div class="row">
          <div class="col-xs-12 col-md-10 offset-md-1">
            <img class="user-img" :src="user.image">
            <h4>{{ user.username }}</h4>
            <p>{{ user.bio }}</p>
            <div>
              <follow-button v-if="!isCurrentUserProfile" :user="user" @follow-user="followUserComp()"/>
              <router-link v-else
                           class="btn btn-sm btn-outline-secondary action-btn"
                           :to="{name: 'settings'}">
                <i class="ion-gear-a" />
                Edit Profile Settings
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="container">
      <div class="row">
        <div class="col-xs-12 col-md-10 offset-md-1">
          <div class="article-toggle">
            <ul class="nav nav-pills outline-active">
              <li class="nav-item">
                <router-link class="nav-link" :to="{name: 'userProfile', params: {slug: user.username}}" :class="{active: routeName === 'userProfile'}">
                  My Post
                </router-link>
              </li>
              <li class="nav-item">
                <router-link class="nav-link" :to="{name: 'userProfileFavorites', params: {slug: user.username}}" :class="{active: routeName === 'userProfileFavorites'}">
                  Favorites Posts
                </router-link>
              </li>
            </ul>
          </div>
          <feed-view :api-url="apiUrl"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {mapState, mapActions, mapGetters} from "vuex";
import FeedView from "@/components/FeedView";
import FollowButton from "@/components/FollowButton";

export default {
  name: 'UserProfile',
  components: {
    FeedView,
    FollowButton,
  },
  computed: {
    ...mapState("userProfile", ["isLoading", "user", "error"]),
    ...mapGetters("auth", ["curUser"]),
    isCurrentUserProfile() {
      if (!this.curUser || !this.user) {
        return false;
      }
      return this.user.username === this.curUser.username;
    },
    apiUrl() {
      const isFavorites = this.$route.path.includes('favorites');
      return isFavorites ? `/articles?favorited=${this.userProfileSlug}` : `/articles?author=${this.userProfileSlug}`;
    },
    userProfileSlug() {
      return this.$route.params.slug;
    },
    routeName() {
      return this.$route.name;
    },
  },
  methods: {
    ...mapActions("userProfile", ["getUserProfile", "followUser"]),
    getUserProfileComp(){
      this.getUserProfile({slug: this.userProfileSlug});
    },
    followUserComp(){
      this.followUser({slug: this.userProfileSlug, following: this.user.following}).
      then(() => {
        this.user.following = !this.user.following;
      });
    },
  },
  mounted() {
    this.getUserProfileComp();
  },
  watch: {
    userProfileSlug() {
      this.getUserProfileComp();
    }
  },
}
</script>
