<template>
  <div>
    <div class="header">
      <el-input width="200" v-model="value"></el-input>
      <el-button type="primary" @click="addTag()">新增</el-button>
    </div>
    <main>
      <div class="tag_box">
        <el-tag v-for="tag in tags" :key="tag.name" closable :type="tag.type" @close="deleteTag(tag)">
          {{ tag.tagName }}
        </el-tag>
      </div>
    </main>
  </div>
</template>

<script>
import { getTagList, addTags, deleteTags } from '@/api/blog.js'
export default {
  data() {
    return {
      value: '',
      tags: []
    }
  },
  mounted() {
    this.getTagList()
  },
  methods: {
    async getTagList() {
      let res = await getTagList()
      this.tags = res.data
    },
    async addTag() {
      let res = await addTags({ tagName: this.value })
      if (res.status === 200) {
        this.$message.success('新增成功')
        this.getTagList()
      }
    },
    async deleteTag(value) {
      let res = await deleteTags({ tagId: value.tagId })
      if (res.status === 200) {
        this.$message.success('删除成功')
        this.getTagList()
      }
    }
  }
}
</script>

<style scoped>
.header {
  display: flex;
  width: 300px;
  justify-content: space-between;
}
.tag_box {
  width: 20%;
  display: flex;
  justify-content: space-between;
  padding-top: 20px;
}
</style>
