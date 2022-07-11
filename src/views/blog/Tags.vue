<template>
  <div>
    <div class="header">
      <el-input width="200"></el-input>
      <el-button type="primary">新增</el-button>
    </div>
    <main>
      <div class="tag_box">
        <el-tag v-for="tag in tags" :key="tag.name" closable :type="tag.type">
          {{ tag.tagName }}
        </el-tag>
      </div>
    </main>
  </div>
</template>

<script>
import { getTagList } from '@/api/blog.js'
export default {
  data() {
    return {
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
      console.log(this.tags)
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
