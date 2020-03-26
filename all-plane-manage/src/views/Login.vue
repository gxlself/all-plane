<template>
  <div>
    <el-button @click="login">点击</el-button>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
export default {
  methods: {
    ...mapMutations(['SET_USERNAME', 'SET_TOKEN']),
    login() {
      let data = {
        username: 'gxlself',
        password: '123456'
      }

      this.$store.dispatch('login', data)
        .then(res => {
          this.SET_USERNAME(res.data.username)
          this.SET_TOKEN(res.data.token)
          this.$message({ message: '登录成功', type: 'success' });
          this.$router.push({path: '/manage'})
        })
        .catch(err => {
          console.log(err)
        })
    },
    mounted() {
      sessionStorage.clear()
    }
  }
}
</script>

<style lang="less" scoped>

</style>
