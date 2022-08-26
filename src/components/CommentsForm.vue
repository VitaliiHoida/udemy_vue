<template>
  <p v-if="!user">
    <router-link :to="{name: 'login'}">Sign in</router-link>
    or
    <router-link :to="{name: 'register'}">sign up</router-link>
    to add comments on this article.
  </p>
  <div v-else>
    <form @submit.prevent="onSubmit" class="card comment-form">
      <div class="card-block">
        <textarea class="form-control" placeholder="Write a comment..."
                  rows="3" />
      </div>
      <div class="card-footer">
        <img class="comment-author-img"
             :src="user.image">
        <button class="btn btn-sm btn-primary" type="button" @click="handleSend">
          Post Comment
        </button>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  name: 'CommentsForm',
  props: {
    user: {
      type: Object,
      required: true,
    }
  },
  methods:{
    handleSend(){
      this.$emit('addComment');
    }
  }
}
</script>