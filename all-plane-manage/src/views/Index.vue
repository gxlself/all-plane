<template>
  <el-container class="index">
    <!-- 顶部 -->
    <el-header>
      <el-tooltip class="item" effect="dark" content="菜单收缩" placement="top-start">
        <span class="menu-control el-icon-right" :class="[{'to-left': isCollapse}, {'to-right': !isCollapse}]" @click="menuControl"></span>
      </el-tooltip>
      <h1>管理系统</h1>
      <el-dropdown class="avatar" @command="handleCommand">
        <el-avatar> user </el-avatar>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>测试1</el-dropdown-item>
          <el-dropdown-item command="loginout" divided>退出登录</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </el-header>
    <!-- 主体 -->
    <el-container>
      <!-- 左侧菜单 -->
      <el-menu default-active="1-4-1" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose" :collapse="isCollapse">
        <el-submenu :index="menuItem.index" v-for="(menuItem, index) in menus" :key="'o-' + index">
          <template slot="title">
            <i :class="menuItem.icon"></i>
            <span slot="title">{{menuItem.title}}</span>
          </template>
          <el-menu-item :index="subItem.index" v-for="(subItem,innerIndex) in menuItem.child" :key="'i-' + innerIndex" @click="goPage(subItem.path)">{{subItem.title}}</el-menu-item>
        </el-submenu>
      </el-menu>
      <!-- 主题内容 路由导航以及底部 -->
      <el-container>
        <!-- 路由内容 -->
        <el-main>
          <router-view/>
        </el-main>
        <!-- 底部内容 -->
        <el-footer>@gxlself</el-footer>
      </el-container>
    </el-container>
  </el-container>
</template>

<script>
import { mapMutations} from 'vuex'
export default {
  data() {
    return {
      isCollapse: false,
      menus: [
        {
          title: '系统菜单',
          index: '1',
          icon: 'el-icon-menu',
          child: [
            {
              title: '系统管理',
              index: '1-1',
              path: '/manage/system'
            },
            {
              title: '新建公告',
              index: '1-2',
              path: '/manage/message'
            }
          ]
        }, {
          title: '飞人用户',
          index: '2',
          icon: 'el-icon-bicycle',
          child: []
        }, {
          title: '普通用户',
          index: '3',
          icon: 'el-icon-money',
          child: []
        }, {
          title: '订单管理',
          index: '4',
          icon: 'el-icon-tickets',
          child: []
        }
      ]
    }
  },
  methods: {
    ...mapMutations(['clearStore']),
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    menuControl() {
      this.isCollapse =! this.isCollapse
    },
    goPage(path) {
      if (path !== this.$route.path) {
        this.$router.push({path: path})
      }
    },
    loginout() {
      this.api.loginout().then(res => {
        this.clearStore()
      })
    },
    handleCommand(command) {
      switch(command) {
        case 'loginout':
          this.loginout()
      }
    }
  },
  mounted() {
    // this.api.manage().then(res => {
    //   // console.log(res)
    // })
  },
}
</script>

<style lang="less" scoped>
.index{
  height: 100%;
  padding-top: 60px;
  .el-header, .el-footer {
    background-color: #B3C0D1;
    color: #333;
    text-align: center;
    line-height: 60px;
  } 
  .el-aside {
    background-color: #D3DCE6;
    color: #333;
    text-align: center;
    line-height: 200px;
  }
  .el-main {
    background-color: #E9EEF3;
    color: #333;
    text-align: center;
    line-height: 160px;
  }
  .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
  }
  .el-header{
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    height: 60px;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 9;
    .menu-control{
      position: absolute;
      left: 10px;
      padding: 10px;
      cursor: pointer;
    }
    .to-right{
      animation: to-right .4s ease forwards;
    }
    .to-left{
      animation: to-left .4s ease forwards;
    }
    .avatar{
      position: absolute;
      right: 30px;
      max-height: 40px;
      cursor: pointer;
    }
  }
}
@keyframes to-right {
  0% {
    transform: translateX(0);
  }
  50% {
    transform: translateX(160px);
  }
  100% {
    transform: translateX(160px) rotate(180deg);
  }
}
@keyframes to-left {
  0% {
    transform: translateX(160px) rotate(180deg);
  }
  50% {
    transform: translateX(0px) rotate(180deg);
  }
  100% {
    transform: translateX(0px) rotate(0);
  }
}
</style>
