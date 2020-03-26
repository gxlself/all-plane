<template>
  <div id="app" v-loading.body="this.$store.state.loading" customClass="transparent">
    <router-view></router-view>
  </div>
</template>

<script>
import Index from './views/Index'
import { mapGetters } from 'vuex'
export default {
  name: 'App',
  data() {
    return {

    }
  },
  components: {
    Index
  },
  methods: {

  },
  computed: mapGetters(['getToken']),
  watch: {
    $route(to, from) {
      let token = sessionStorage.getItem('token')
      if (!token && this.$route.path !== '/login') {
        this.$router.push({path: '/login'})
      }
    }
  }
}
</script>

<style>
html,body{
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
}
#app {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgb(233, 236, 243);
}
</style>
