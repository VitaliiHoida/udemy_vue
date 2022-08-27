<template>
  <p v-if="!curUser">
    <router-link :to="{name: 'login'}">Sign in</router-link>
    or
    <router-link :to="{name: 'register'}">sign up</router-link>
    to add comments on this article.
  </p>
  <div v-else>
    <form @submit.prevent="onSubmit" class="card comment-form">
      <div class="card-block">
        <textarea class="form-control" placeholder="Write a comment..."
                  rows="3" v-model="body"/>
      </div>
      <div class="card-footer">
        <img class="comment-author-img"
             :src="curUser.image">
        <button class="btn btn-sm btn-primary" type="button" @click="handleSend">
          Post Comment
        </button>
      </div>
    </form>
  </div>
</template>

<script>
import {mapActions, mapGetters} from "vuex";

export default {
  name: 'CommentsForm',
  props: {
    slug: {
      type: String,
      required: true,
    }
  },
  data: () => ({
    body: '',
  }),
  computed: {
    ...mapGetters("auth", ["curUser"]),
  },
  methods:{
    ...mapActions("article", ["addComment"]),
    handleSend(){
      this.addComment({slug: this.slug, comment: {body: this.body}});
      this.body = '';
    }
  },
}
</script>