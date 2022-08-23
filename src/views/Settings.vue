<template>
  <div class="settings-page" v-if="curUser">
    <div class="container page">
      <div class="row">
        <div class="col-md-6 offset-md-3 col-xs-12">
          <h1 class="text-xs-center">Settings</h1>
          <validation-errors v-if="validationErrors" :validation-errors="validationErrors"/>
          <form @submit.prevent="onSubmit">
            <fieldset>
              <fieldset class="form-group">
                <input type="text" class="form-control form-control-lg" v-model="form.image"
                       placeholder="URL of profile picture">
              </fieldset>
              <fieldset class="form-group">
                <input type="text" class="form-control form-control-lg" v-model="form.username" placeholder="Username">
              </fieldset>
              <fieldset class="form-group">
                <textarea class="form-control form-control-lg" v-model="form.bio" placeholder="Short bio about you"/>
              </fieldset>
              <fieldset class="form-group">
                <input type="text" class="form-control form-control-lg" v-model="form.email" placeholder="Email">
              </fieldset>
              <fieldset class="form-group">
                <input type="password" class="form-control form-control-lg" v-model="form.password"
                       placeholder="Password">
              </fieldset>
              <button type="submit" class="btn btn-lg btn-primary pull-xs-right" :disabled="isSubmitting">Update
                settings
              </button>
            </fieldset>
          </form>
          <hr/>
          <button class="btn btn-outline-danger" @click="onLogout" type="button">Or click here to logout</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {mapState, mapGetters, mapActions} from "vuex";
import ValidationErrors from '@/components/ValidationErrors';

export default {
  name: 'AppSettings',
  components: {
    ValidationErrors,
  },
  computed: {
    ...mapState("settings", ["isSubmitting", "validationErrors"]),
    ...mapGetters("auth", ["curUser"]),
    form() {
      return {
        username: this.curUser.username,
        bio: this.curUser.bio,
        image: this.curUser.image,
        email: this.curUser.email,
        password: '',
      }
    },
  },
  methods: {
    ...mapActions("auth", ["updateCurrentUser", "logout"]),
    onSubmit() {
      this.updateCurrentUser({currentUserInput: this.form});
    },
    onLogout() {
      this.logout().then(() => {
        this.$router.push({name: 'globalFeed'})
      });
    },
  },

}
</script>