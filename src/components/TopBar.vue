<template>
  <nav class="navbar navbar-light">
    <div class="container">
      <router-link :to="{name: 'globalFeed'}" class="navbar-brand" >
        MediumClone
      </router-link>
      <ul class="nav navbar-nav pull-xs-right">
        <li class="nav-item">
          <router-link :to="{name: 'globalFeed'}" class="nav-link" active-class="active" exact>Home</router-link>
        </li>
        <template v-if="isLoggedIn">
          <li class="nav-item">
            <router-link :to="{name: 'createArticle'}" class="nav-link" active-class="active">
              <i class="ion-compose"></i>&nbsp;
              New Article
            </router-link>
          </li>
          <li class="nav-item">
            <router-link :to="{name: 'settings'}" class="nav-link" active-class="active">
              <i class="ion-gear-a"></i>&nbsp;
              Settings
            </router-link>
          </li>
          <li class="nav-item">
            <router-link :to="{name: 'userProfile', params: {slug: curUser.username}}" class="nav-link" active-class="active">
              <img class="user-pic" :src="curUser.image" />&nbsp; {{curUser.username}}
            </router-link>
          </li>
        </template>
        <template v-if="isAnonymous">
          <li class="nav-item">
            <router-link :to="{name: 'login'}" class="nav-link" active-class="active">
              Sign In
            </router-link>
          </li>
          <li class="nav-item">
            <router-link :to="{name: 'register'}" class="nav-link" active-class="active">
              Sign Up
            </router-link>
          </li>
        </template>
      </ul>
    </div>
  </nav>
</template>

<script>
import {mapState, mapGetters} from "vuex";

export default {
  name: 'TopBar',
  computed:{
    ...mapState("auth", [ "isLoggedIn"]),
    ...mapGetters("auth", ["curUser", "isLogged", "isAnonymous"]),
  },
}
</script>

<style scoped>

</style>