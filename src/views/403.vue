<template>
  <div class="min-vh-80 d-flex align-items-center">
    <el-container class="justify-content-center">
      <el-row class=" align-items-center justify-content-center">
        <el-col :xs="24" :sm="24" :md="12" :lg="12">
            <img src="../assets/img/403.svg" alt="" class="img-fluid w-75">
            <h1 class="mt-5">很抱歉 <span class="text-primary">你没有权限噢</span></h1>
            <p class="lead my-5">当你看到这段话时，说明你没有管理员权限噢</p>
            <el-button @click="goBack" type="primary" icon="el-icon-arrow-left" round>
                返回首页
            </el-button>
        </el-col>
      </el-row>
    </el-container>
 </div>
</template>

<script>
export default {
  name: '',
  data() { 
    return {

    }
  },
  props: {

  },
  components:{
  },
  mounted() {

  },
  methods:{
      goBack(){
          this.$router.replace('rc')
      }
  },
 }
</script>

<style scoped>
@import '../assets/css/miss.css';
</style>