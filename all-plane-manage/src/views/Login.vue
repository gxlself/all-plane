<template>
  <div>
    <el-button @click="login">点击</el-button>
  </div>
</template>

<script>
import { mapMutations} from 'vuex'
export default {
  methods: {
    ...mapMutations(['setUsername']),
    login() {
      let data = {
        username: 'gxlself',
        password: '123456'
      }
      this.api.login(data).then(res => {
        if (res.status === 200 && res.code === 0) {
          this.setUsername(res.data)
          this.$message({ message: '登录成功', type: 'success' });
          this.$router.push({name: 'message'})
        } else {
          this.$message({ message: res.msg, type: 'success' });
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>

</style>
