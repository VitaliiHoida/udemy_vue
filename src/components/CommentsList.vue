<template>
  <div class="card" v-for="(comment, index) in comments" :key="index">
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
      <span v-if="comment.author.username === curUser.username" class="mod-options"><i class="ion-trash-a" @click="handleDelete(comment.id)"/></span>
    </div>
  </div>
</template>

<script>
import {mapState, mapActions, mapGetters} from "vuex";

export default {
  name: 'CommentsList',
  props:{
    slug: {
      type: String,
      required: true,
    }
  },
  computed:{
    ...mapState("article", ["comments"]),
    ...mapGetters("auth", ["curUser"])
  },
  methods:{
    ...mapActions("article", ["deleteComment", "getComments"]),
    handleDelete(id) {
      this.deleteComment({slug: this.slug, id: id});
    },
    getCommetnsComp(){
      this.getComments({slug: this.slug});
    }
  },
  mounted(){
    this.getCommetnsComp();
  },
  watch: {
    comments(){
      this.getCommetnsComp();
    }
  },
}
</script>