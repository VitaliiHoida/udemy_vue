<template>
<button class="btn btn-sm action-btn btn-outline-secondary" @click="handleClick">
  <i class="ion-plus-round" />
  <span v-if="!user.following">&nbsp;Follow {{user.username}}</span>
  <span v-else>&nbsp;Unfollow {{user.username}}</span>
</button>
</template>

<script>
export default {
  name: 'FollowButton',
  props:{
    user: {
      type: Object,
      required: true,
    },
  },
  methods:{
    handleClick(){
      this.$emit('followUser');
    }
  },
}
</script>