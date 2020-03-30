<template>
  <div class="app-container">
    <!-- 表格 -->
    <el-table v-loading="listLoading" :data="list" border fit highlight-current-row style="width: 100%">
      <el-table-column align="center" type="index" label="序号" width="120">
        <template slot-scope="scope">
          {{ scope.$index + 1 + listQuery.size * (listQuery.page - 1) }}
        </template>
      </el-table-column>

      <el-table-column align="center" label="菜单名称">
        <template slot-scope="{row}">
          <span>{{ row.menu_name }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="页面路径">
        <template slot-scope="{row}">
          <span>{{ row.url }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="显示图标">
        <template slot-scope="{row}">
          <span>{{ row.icon }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="是否可用">
        <template slot-scope="{row}">
          <span>{{ row.enable | enable }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="排序">
        <template slot-scope="{row}">
          <span>{{ row.sort }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="操作" width="450">
        <template slot-scope="{row, $index}">
          <el-button type="primary" size="mini" icon="el-icon-edit" @click="editMenu(row)">
            编辑
          </el-button>
          <el-button v-if="row.enable == 0" size="mini" icon="el-icon-success" type="success" @click="updateEnable(row)">
            启用
          </el-button>
          <el-button v-if="row.enable == 1" size="mini" icon="el-icon-warning" type="danger" @click="updateEnable(row)">
            禁用
          </el-button>
          <el-button size="mini" icon="el-icon-plus" type="primary" @click="addSubMenu(row)">
            添加下级菜单
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
import { getMenus, addMenu, updateMenu, deleteMenu, updateEnable } from '@/api/menu'
import { Message } from 'element-ui'
import Pagination from '@/components/Pagination' // secondary package based on el-pagination
export default {
  name: 'MenuList',
  filters: {
    enable(val) {
      let text = ''
      switch (val) {
        case 0:
          text = '否'
          break
        case 1:
          text = '是'
          break
      }
      return text
    }
  },
  components: {
    Pagination
  },
  data() {
    return {
      listLoading: true,
      list: null,
      listQuery: {
        page: 1,
        size: 10
      },
      total: 0
    }
  },
  created() {
    this.getList()
  },
  methods: {
    async getList() {
      this.listLoading = true
      const { data } = await getMenus(this.listQuery)
      this.list = data.list
      this.total = data.count
      this.listLoading = false
    },
    // 编辑
    editMenu(row) {

    },
    // 删除
    delteMenu(row) {

    },
    // 添加下级菜单
    addSubMenu(row) {
    },
    // 启用禁用
    async updateEnable(row) {
      const options = {
        id: row.id,
        enable: row.enable === 1 ? 0 : 1
      }
      const { code, msg } = await updateEnable(options)
      if (code === 0) {
        Message({
          message: msg,
          type: 'success',
          duration: 2 * 1000
        })
        this.getList()
      }
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
