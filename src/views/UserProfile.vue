<template>
  <div class="profile-page" v-if="data">
    <div class="user-info">
      <div class="container">
        <div class="row">
          <div class="col-xs-12 col-md-10 offset-md-1">
            <img class="user-img" :src="data.image">
            <h4>{{data.username}}</h4>
            <p>{{data.bio}}</p>
            <div>
              FOLLOW USER BUTTON
              <router-link v-if="isCurrentUserProfile" class="btn btn-sm btn-outline-secondary action-btn" :to="{name: 'settings'}" >Edit Profile Settings</router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="container">
      <div class="row">
        <div class="col-xs-12 col-md-10 offset-md-1">
          <div class="article-toggle">

          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {mapState} from "vuex";

export default {
  name: 'UserProfile',
  components:{},
  computed:{
    ...mapState("userProfile", ["isLoading", "data", "error"]),
  },

}
</script>
