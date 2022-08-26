<template>
  <div class="card" v-for="(comment, index) in commentList" :key="index">
    <div class="card-block">
      <p class="card-text">{{comment.body}}</p>
    </div>
    <div class="card-footer">
      <router-link class="comment-author" :to="{name: 'userProfile', params: {slug: comment.author.username}}">
        <img class="comment-author-img" :src="comment.author.image">
      </router-link>
      &nbsp;
      <router-link class="comment-author" :to="{name: 'userProfile', params: {slug: comment.author.username}}">{{ comment.author.username }}</router-link>
      <span class="date-posted">{{ comment.createdAt }}</span>
      <span v-if="comment.author.username === user.username" class="mod-options"><i class="ion-trash-a" @click="handleDelete(comment.id)"/></span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CommentsList',
  props:{
    user: {
      type: Object,
      required: true,
    },
    commentList:{
      type: Array,
      required:true,
    }
  },
  computed:{},
  methods:{
    handleDelete(id) {
      this.$emit('deleteComment', id);
    },
  },
}
</script>