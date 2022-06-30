<template>
  <div>
    <div>
      <el-select v-model="value" filterable placeholder="请选择">
        <el-option v-for="item in options" :key="item.tagId" :label="item.tagName" :value="item.tagId"> </el-option>
      </el-select>
      <el-date-picker v-model="value6" type="daterange" range-separator="至" value-format="timestamp" start-placeholder="开始日期" end-placeholder="结束日期">
      </el-date-picker>
      <el-button type="primary" @click="select()">查询</el-button>
      <el-button @click="reset()">重置</el-button>
    </div>
    <div>
      <el-table :data="tableData" style="width: 100%">
        <el-table-column prop="date" label="创建时间" width="150" :formatter="formatDate"></el-table-column>
        <el-table-column prop="archiveTitle" label="标题" width="150"></el-table-column>
        <el-table-column prop="tagName" label="标签名" width="150"></el-table-column>
        <el-table-column prop="archiveContent" label="内容" min-width="800px">
          <template slot-scope="scope">
            <div v-html="scope.row.archiveContent"></div>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="150" fixed="right">
          <template slot-scope="scope">
            <!-- 点击编辑进入编辑页面进行编辑表格数据 -->
            <el-button size="small" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
            <el-button size="small" type="danger" @click="handleDelete(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
const FirstData = () => ({
  currentPage: 1,
  pageSize: 10
})
import { getTagList, getAllArchive, deleteArchive } from '@/api/blog.js'
export default {
  data() {
    return {
      value: '',
      value6: '',
      options: {},
      firstData: FirstData(),
      tableData: []
    }
  },
  created() {
    this.getTagList()
    this.getAllArchive()
  },
  methods: {
    async getTagList() {
      let res = await getTagList()
      this.options = res.data
    },
    async getAllArchive() {
      console.log(this.value6)
      let data = {
        ...this.firstData,
        tagId: this.value,
        startTime: this.value6[0] || 0,
        endTime: this.value6[1] || 0
      }
      let res = await getAllArchive(data)
      this.tableData = res.data.data.list
      console.log(this.tableData)
    },
    select() {
      this.getAllArchive()
    },
    reset() {
      this.value = ''
      this.value6 = ''
      this.firstData = FirstData()
      this.getAllArchive()
    },
    handleDelete(row) {
      console.log(row)
      // 设置类似于console类型的功能
      this.$confirm('是否删除该条文章？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(async () => {
          // 移除对应索引位置的数据，可以对row进行设置向后台请求删除数据
          let res = await deleteArchive({ archiveId: row.archiveId })
          if (res) {
            if (res.data.status === 200) {
              this.$message({
                type: 'success',
                message: '删除成功!'
              })
            } else if (res.data.status === 403) {
              this.$message.error('删除失败，权限不足')
            }
            await this.getAllArchive()
          }
        })
        .catch((err) => {
          console.log(err)
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
    },
    formatDate(row, column) {
      var date = row[column.property]
      if (date == undefined) {
        return ''
      }
      if (date == 0) {
        return ''
      }
      return this.dayjs(date).format('YYYY-MM-DD HH:mm')
    }
  }
}
</script>

<style></style>
