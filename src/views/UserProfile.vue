<template>
  <div class="profile-page" v-if="data">
    <div class="user-info">
      <div class="container">
        <div class="row">
          <div class="col-xs-12 col-md-10 offset-md-1">
            <img class="user-img" :src="data.image">
            <h4>{{ data.username }}</h4>
            <p>{{ data.bio }}</p>
            <div>
              FOLLOW USER BUTTON
              <router-link v-if="isCurrentUserProfile" class="btn btn-sm btn-outline-secondary action-btn"
                           :to="{name: 'settings'}">Edit Profile Settings
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
                <router-link class="nav-link" :to="{name: 'userProfile', params: {slug: data.username}}" :class="{active: routeName === 'userProfile'}">
                  My Post
                </router-link>
              </li>
              <li class="nav-item">
                <router-link class="nav-link" :to="{name: 'userProfileFavorites', params: {slug: data.username}}" :class="{active: routeName === 'userProfileFavorites'}">
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

export default {
  name: 'UserProfile',
  components: {
    FeedView
  },
  computed: {
    ...mapState("userProfile", ["isLoading", "data", "error"]),
    ...mapGetters("auth", ["curUser"]),
    isCurrentUserProfile() {
      if (!this.curUser || !this.data) {
        return false;
      }
      return this.data.username === this.curUser.username;
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
    ...mapActions("userProfile", ["getUserProfile"]),
    getUserProfileComp(){
      this.getUserProfile({slug: this.userProfileSlug});
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
