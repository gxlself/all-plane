<template>
  <div class="app-container">
    <!-- 头部搜索 -->
    <div class="filter-container">
      <el-input v-model="listQuery.title" placeholder="文章名称" style="width: 200px" class="filter-item" @keyup.enter.native="getList()" />
      <el-input v-model="listQuery.theme" placeholder="文章主题" style="width: 200px" class="filter-item" @keyup.enter.native="getList()" />
      <el-input v-model="listQuery.create_use" placeholder="文章作者" style="width: 200px" class="filter-item" @keyup.enter.native="getList()" />
      <el-select v-model="listQuery.status" placeholder="文章状态" style="width: 140px" class="filter-item" @change="getList()">
        <el-option label="全部" :value="-1" />
        <el-option label="草稿" :value="0" />
        <el-option label="待审核" :value="1" />
        <el-option label="已拒绝" :value="2" />
        <el-option label="已通过" :value="3" />
      </el-select>
      <el-button v-waves class="filter-item" type="primary" icon="el-icon-search" @click="getList()">搜索</el-button>
      <el-button v-waves class="filter-item" type="danger" icon="el-icon-search" @click="getList()">重置</el-button>
      <el-button v-waves class="filter-item" style="margin-left: 10px" type="primary" icon="el-icon-plus" @click="openRolesForm('add')">新增</el-button>
    </div>
    <div class="filter-container">
      <el-date-picker v-model="listQuery.start_date" class="filter-item" type="datetime" format="yyyy-MM-dd HH:mm:ss" value-format="yyyy-MM-dd HH:mm:ss" default-time="00:00:00" placeholder="选择日期时间" />
      <span class="filter-span filter-item"> 至 </span>
      <el-date-picker v-model="listQuery.end_date" class="filter-item" type="datetime" format="yyyy-MM-dd HH:mm:ss" value-format="yyyy-MM-dd HH:mm:ss" default-time="00:00:00" placeholder="选择日期时间" />
    </div>
    <!-- 表格 -->
    <el-table
      v-loading="listLoading"
      element-loading-text="加载中~"
      element-loading-background="rgba(0, 0, 0, 0.5)"
      element-loading-spinner="el-icon-loading"
      :data="list"
      border
      fit
      highlight-current-row
      size="mini"
      style="width: 100%"
    >
      <el-table-column align="center" type="index" label="序号" width="80">
        <template slot-scope="{ $index }">
          {{ $index + 1 + listQuery.size * (listQuery.page - 1) }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="文章作者" prop="create_use" width="160" />
      <el-table-column align="center" label="文章名称" prop="title" />
      <el-table-column align="center" label="文章主题" prop="theme" />
      <el-table-column align="center" label="文章状态">
        <template slot-scope="{row}">
          <span>{{ row.status | statusMap }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="创建时间" prop="create_date" width="180" />
      <el-table-column align="center" label="更新时间" prop="last_modify" width="180" />
      <el-table-column fixed="right" align="center" label="操作" width="300">
        <template slot-scope="{row, $index}">
          <el-button type="primary" size="mini" icon="el-icon-edit">
            编辑
          </el-button>
          <el-button v-if="row.enable == 0" size="mini" icon="el-icon-success" type="success">
            启用
          </el-button>
          <el-button v-if="row.enable == 1" size="mini" icon="el-icon-warning" type="danger">
            禁用
          </el-button>
          <el-button size="mini" type="danger" icon="el-icon-delete" @click="delteMenu(row, $index)">
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <pagination v-show="total > 0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.size" @pagination="getList" />
  </div>
</template>

<script>
import { fetchList, deleteArticle } from '@/api/article'
import waves from '@/directive/waves' // waves directive
import { Message } from 'element-ui'
import Pagination from '@/components/Pagination' // secondary package based on el-pagination
export default {
  name: 'MenuList',
  directives: { waves },
  filters: {
    statusMap(status) {
      const statusMap = {
        0: '草稿',
        1: '待审核',
        2: '已拒绝',
        3: '已通过'
      }
      return statusMap[status]
    }
  },
  components: {
    Pagination
  },
  data() {
    return {
      listLoading: true, // 表格loading
      list: null, // 表格数据
      listQuery: {
        page: 1,
        size: 10,
        title: '',
        theme: '',
        create_user: '',
        status: '',
        start_date: '',
        end_date: ''
      },
      total: 0, // 所有数据
      cacheMap: {
        listQuery: null
      }
    }
  },
  created() {
    this.init()
    this.getList()
  },
  methods: {
    // 获取列表
    async getList() {
      this.listLoading = true
      try {
        const { data } = await fetchList(this.listQuery)
        this.list = data.list
        this.total = data.count
      } catch (err) {
        console.log(err)
      }
      this.listLoading = false
    },
    // 删除
    async delteMenu(row) {
      this.listLoading = true
      try {
        await deleteArticle({ id: row.id })
        this.listLoading = false
        this.openMsg('删除成功')
        this.getList()
      } catch (err) {
        console.log(err)
      }
    },
    // 二次封装消息提示
    openMsg(message, type = 'success') {
      Message({ message, type, duration: 2.5 * 1000 })
    },
    // 初始化
    init() {
      if (this.cacheMap.listQuery) {
        this.listQuery = JSON.parse(JSON.stringify(this.cacheMap.listQuery))
      } else {
        this.cacheMap.listQuery = JSON.parse(JSON.stringify(this.listQuery))
      }
    }
  }
}
</script>

<style scoped>
.filter-span {
  color: rgb(183, 185, 190);
  padding: 0 20px;
}
</style>
