<template>
  <div class="app-container">
    <!-- 头部搜索 -->
    <div class="filter-container">
      <el-input v-model="firstMenuQuery.name" placeholder="菜单名称" style="width: 200px;" class="filter-item" @keyup.enter.native="handleFilter" />
      <el-select v-model="firstMenuQuery.enable" placeholder="是否启用" style="width: 140px" class="filter-item" @change="getList()">
        <el-option label="全部" value="" />
        <el-option label="启用" :value="1" />
        <el-option label="禁用" :value="0" />
      </el-select>
      <el-button class="filter-item" type="primary" icon="el-icon-search" @click="getList()">
        搜索
      </el-button>
      <el-button class="filter-item" style="margin-left: 10px;" type="primary" icon="el-icon-plus" @click="openMenuForm('add')">
        新增
      </el-button>
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
      @expand-change="expandChange"
    >
      <el-table-column type="expand">
        <template slot-scope="{row}">
          <el-table
            v-loading="secTableLoading[row.id]"
            element-loading-text="加载中~"
            element-loading-background="rgba(0, 0, 0, 0.5)"
            element-loading-spinner="el-icon-loading"
            :data="secTableList[row.id]"
            border
            fit
            highlight-current-row
            size="mini"
            style="width: 100%"
          >
            <el-table-column align="center" label="二级菜单名称" width="200">
              <template slot-scope="scope">
                <span>{{ scope.row.menu_name }}</span>
              </template>
            </el-table-column>
            <el-table-column align="center" label="页面路径" width="300">
              <template slot-scope="scope">
                <span>{{ scope.row.url }}</span>
              </template>
            </el-table-column>
            <el-table-column align="center" label="显示图标">
              <template slot-scope="scope">
                <span>{{ scope.row.icon }}</span>
              </template>
            </el-table-column>
            <el-table-column align="center" label="是否可用">
              <template slot-scope="scope">
                <el-tag :type="scope.row.enable | statusFilter">
                  {{ scope.row.enable | enable }}
                </el-tag>
              </template>
            </el-table-column>
            <el-table-column align="center" label="排序">
              <template slot-scope="scope">
                <span>{{ scope.row.sort }}</span>
              </template>
            </el-table-column>
            <el-table-column align="center" label="操作" width="450">
              <template slot-scope="scope">
                <el-button type="primary" size="mini" icon="el-icon-edit" @click="editMenu(scope.row)">
                  编辑
                </el-button>
                <el-button v-if="row.enable == 0" size="mini" icon="el-icon-success" type="success" @click="updateEnable(scope.row)">
                  启用
                </el-button>
                <el-button v-if="row.enable == 1" size="mini" icon="el-icon-warning" type="danger" @click="updateEnable(scope.row)">
                  禁用
                </el-button>
                <el-button size="mini" icon="el-icon-plus" type="primary" @click="addSubMenu(scope.row)">
                  添加下级菜单
                </el-button>
                <el-button size="mini" type="danger" icon="el-icon-delete" @click="delteMenu(scope.row, scope.$index)">
                  删除
                </el-button>
              </template>
            </el-table-column>
          </el-table>
        </template>
      </el-table-column>
      <el-table-column align="center" type="index" label="序号" width="120">
        <template slot-scope="{ $index }">
          {{ $index + 1 + firstMenuQuery.size * (firstMenuQuery.page - 1) }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="一级菜单名称" width="200">
        <template slot-scope="{row}">
          <span>{{ row.menu_name }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="页面路径" width="300">
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
          <el-tag :type="row.enable | statusFilter">
            {{ row.enable | enable }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column align="center" label="排序">
        <template slot-scope="{row}">
          <span>{{ row.sort }}</span>
        </template>
      </el-table-column>
      <el-table-column fixed="right" align="center" label="操作" width="450">
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
    <!-- 弹框 -->
    <el-dialog :title="textMap[dialogStatus]" :visible.sync="menuFormVisible" lock-scroll destroy-on-close width="500px" @closed="sureLoading = false">
      <el-form ref="dataForm" :rules="rules" :model="menuParams" label-position="left" label-width="130px" style="width: 400px;margin-left:30px;">
        <el-form-item label="菜单名称：" prop="menu_name">
          <el-input v-model="menuParams.menu_name" />
        </el-form-item>
        <el-form-item label="页面路径(URL)：">
          <el-input v-model="menuParams.url" />
        </el-form-item>
        <el-form-item label="icon：">
          <el-input v-model="menuParams.icon" />
        </el-form-item>
        <el-form-item label="排序：">
          <el-input v-model="menuParams.sort" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="menuFormVisible = false">
          取消
        </el-button>
        <el-button :loading="sureLoading" :disabled="sureLoading" type="primary" @click="addOrEditorMenu()">
          确认
        </el-button>
      </div>
    </el-dialog>
    <!-- 分页 -->
    <pagination v-show="total > 0" :total="total" :page.sync="firstMenuQuery.page" :limit.sync="firstMenuQuery.size" @pagination="getList" />
  </div>
</template>

<script>
import { getMenus, addMenu, updateMenu, deleteMenu, updateEnable } from '@/api/menu'
import { Message } from 'element-ui'
import Pagination from '@/components/Pagination' // secondary package based on el-pagination
export default {
  name: 'MenuList',
  filters: {
    enable(type) {
      const enableMap = {
        0: '否',
        1: '是'
      }
      return enableMap[type]
    },
    statusFilter(status) {
      const statusMap = {
        0: 'danger',
        1: 'success'
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
      firstMenuQuery: {
        page: 1,
        size: 10,
        name: '',
        enable: ''
      },
      secMenuQuery: {
        page: 1,
        size: 10,
        parentId: null
      },
      total: 0, // 所有数据
      menuParams: {
        menu_name: '',
        url: '',
        sort: '',
        type: 1,
        icon: ''
      },
      textMap: {
        editor: '编辑菜单',
        add: '新增菜单'
      },
      menuFormVisible: false, // 新增编辑菜单弹框
      dialogStatus: 'add', // 弹框类型
      rules: { // 规则
        menu_name: [{ required: true, message: '菜单名称不能为空', trigger: 'change' }]
      },
      cacheMap: {
        menuParams: null
      },
      sureLoading: false, // 添加、编辑菜单时确认按钮
      secTableLoading: {}, // 二级菜单表格
      secTableList: {}, // 二级菜单数据
      floor: null
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
        const { data } = await getMenus(this.firstMenuQuery)
        this.list = Object.assign([], data.list)
        this.total = data.count
        this.listLoading = false
      } catch (e) {
        this.listLoading = false
      }
    },
    // 编辑
    editMenu(row) {
      this.openMenuForm('editor', row)
    },
    // 删除
    async delteMenu(row) {
      this.listLoading = true
      const { code } = await deleteMenu({ id: row.id })
      this.listLoading = false
      if (code === 0) {
        Message({
          message: '删除成功',
          type: 'success',
          duration: 2 * 1000
        })
        this.getList()
      }
    },
    // 添加菜单
    async addOrEditorMenu() {
      if (!this.menuParams.menu_name) {
        this.openMsg('请输入菜单名称', 'warning')
        return
      }
      this.sureLoading = true
      this.listLoading = true
      const { code } = this.dialogStatus === 'add' ? await addMenu(this.menuParams) : await updateMenu(this.menuParams)
      this.menuFormVisible = false
      if (code === 0) {
        this.openMsg('添加成功')
        this.getList()
      } else {
        this.listLoading = false
      }
    },
    // 添加下级菜单
    async addSubMenu(row) {
    },
    // 启用禁用
    async updateEnable(row) {
      this.listLoading = true
      const options = {
        id: row.id,
        enable: row.enable === 1 ? 0 : 1
      }
      const { code, msg } = await updateEnable(options)
      if (code === 0) {
        this.openMsg(msg)
        this.getList()
      } else {
        this.listLoading = false
      }
    },
    // 二次封装消息提示
    openMsg(message, type = 'success') {
      Message({ message, type, duration: 2.5 * 1000 })
    },
    // 准备弹框前初始化
    openMenuForm(status, row) {
      this.dialogStatus = status
      if (status === 'editor') {
        this.menuParams = row
      } else {
        this.init()
      }
      this.menuFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
        this.sureLoading = false
      })
    },
    // 初始化
    init() {
      if (this.cacheMap.menuParams) {
        this.menuParams = JSON.parse(JSON.stringify(this.cacheMap.menuParams))
      } else {
        this.cacheMap.menuParams = JSON.parse(JSON.stringify(this.menuParams))
      }
    },
    // 展开 开始获取二级菜单数据
    async expandChange(row, expandedRows, expanded) {
      if (expandedRows.includes(row) && !this.secTableList[row.id]) {
        this.$set(this.secTableLoading, row.id, true)
        const query = {
          page: 1,
          size: 15,
          parentId: row.id
        }
        const { data, code } = await getMenus(query)
        if (code === 0) {
          this.$set(this.secTableList, row.id, data.list)
        }
        this.$set(this.secTableLoading, row.id, false)
      }
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
