<template>
  <div>
    <top-bar/>
    <router-view/>
  </div>
</template>

<script>
import TopBar from "@/components/TopBar";
import {mapActions} from "vuex";


export default {
  name: 'App',
  components: {
    TopBar,
  },
  methods: {
    ...mapActions("auth", ["getCurrentUser"]),
  },
  mounted(){
    this.getCurrentUser();
  }
}
</script>