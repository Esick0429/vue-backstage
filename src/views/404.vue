<template>
  <div class="min-vh-80 d-flex align-items-center">
    <el-container class="justify-content-center">
      <el-row class=" align-items-center justify-content-center">
        <el-col :xs="24" :sm="24" :md="12" :lg="12">
            <img src="../assets/img/404-error.svg" alt="" class="img-fluid w-75">
            <h1 class="mt-5">Page not <span class="text-primary">found</span></h1>
            <p class="lead my-5">Oops! Looks like you followed a bad link. If you think this is a problem with us, please tell us.</p>
            <el-button @click="goBack" type="primary" icon="el-icon-arrow-left" round>
                Go back home
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