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
          if (res.code === 0) {
            this.SET_USERNAME(res.data.username)
            this.SET_TOKEN(res.data.token)
            this.$message({ message: '登录成功', type: 'success' });
            this.$router.push({path: '/manage'})
          } else {
            this.$message({ message: res.msg, type: 'error' });
          }
        })
        .catch(err => {
          this.$message({ message: err.msg || err.message, type: 'error' });
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
