<template>
  <div class="min-vh-80 d-flex align-items-center">
    <el-container class="justify-content-center">
      <el-row class="align-items-center justify-content-center">
        <el-col :xs="24" :sm="24" :md="12" :lg="12">
          <h4 class="lagerfont">500</h4>
          <h1 class="lagerfont2 font-weight-light">Something has gone <span class="text-primary">seriously</span> wrong</h1>
          <p class="my-5 lead">It's always time for a coffee break. We should be back by the time you finish your coffee.</p>
          <el-button type="primary" icon="el-icon-arrow-left" round @click="goBack"> Go back home </el-button>
        </el-col>
        <el-col :xs="24" :sm="24" :md="12"><img src="../assets/img/500.svg" alt="" class="img-fluid" /> </el-col>
      </el-row>
    </el-container>
  </div>
</template>

<script>
export default {
  name: '',
  data() {
    return {
      msg: 'sssss'
    }
  },
  props: {},
  components: {},
  mounted() {},
  methods: {
    goBack() {
      this.$router.replace('rc')
    }
  }
}
</script>

<style scoped>
@import '../assets/css/miss.css';
</style>
