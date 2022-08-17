<template>
  <div class="auth-page">
    <div class="container page">
      <div class="row">
        <div class="col-md-6 offset-md-3 col-xs-12">
          <h1 class="text-xs-center">Sign In</h1>
          <p class="text-xs-center">
            <router-link :to="{name: 'register'}">Need an account?</router-link>
          </p>
          <validation-errors :validation-errors="validationErrors" v-if="validationErrors"></validation-errors>
          <form @submit.prevent="onSubmit">
            <fieldset class="form-group">
              <input type="text" class="form-control form-control-lg" placeholder="Email" v-model="user.email"/>
            </fieldset>
            <fieldset class="form-group">
              <input type="password" class="form-control form-control-lg" placeholder="Password" v-model="user.password"/>
            </fieldset>
            <button class="btn btn-lg btn-primary pull-xs-right" :disabled="isSubmit">Sign In</button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import ValidationErrors from "@/components/ValidationErrors";

export default {
  name: 'RegisterView',
  components:{
    ValidationErrors,
  },
  data: ()=>({
    user: {
      email: '',
      password: '',
    },
  }),
  computed: {
    ...mapState("auth", ["isSubmit", "validationErrors"]),
  },
  methods: {
    ...mapActions("auth", ["login"]),
    // ...mapMutations("auth", ["loginStart"]),
    onSubmit() {
      this.login({email: this.user.email, password: this.user.password}).then(() => {
        this.$router.push({name: 'globalFeed'});
      });
    },
  }
}
</script>

<style scoped>

</style>