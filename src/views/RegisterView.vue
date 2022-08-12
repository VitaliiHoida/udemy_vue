<template>
  <div class="auth-page">
    <div class="container page">
      <div class="row">
        <div class="col-md-6 offset-md-3 col-xs-12">
          <h1 class="text-xs-center">Sign Up</h1>
          <p class="text-xs-center">
            <!--            <router-link to="{name: 'login'}">Need an account?</router-link>-->
          </p>
          <validation-errors :validation-errors="validationError" v-if="validationError"></validation-errors>
          <form @submit.prevent="onSubmit">
            <fieldset class="form-group">
              <input type="text" class="form-control form-control-lg" placeholder="Username" v-model="user.username"/>
            </fieldset>
            <fieldset class="form-group">
              <input type="text" class="form-control form-control-lg" placeholder="Email" v-model="user.email"/>
            </fieldset>
            <fieldset class="form-group">
              <input type="password" class="form-control form-control-lg" placeholder="Password" v-model="user.password"/>
            </fieldset>
            <button class="btn btn-lg btn-primary pull-xs-right" :disabled="isSubmitting">Sign Up</button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState, mapMutations } from "vuex";
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
      username: '',
    },
  }),
  computed: {
    ...mapState("auth", ["isSubmit", "validationErrors"]),
    isSubmitting(){
      return this.isSubmit;
    },
    validationError(){
      return this.validationErrors;
    }
  },
  methods: {
    ...mapActions("auth", ["register"]),
    ...mapMutations("auth", ["registerStart"]),
    onSubmit() {
      this.register({email: this.user.email, username: this.user.username, password: this.user.password}).then(user => {
        console.log('successfully register user', user);
        this.$router.push({name: 'home'});
      });
    },
  }
}
</script>

<style scoped>

</style>