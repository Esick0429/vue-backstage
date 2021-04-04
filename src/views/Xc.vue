<template>
  <div>
    <div class="lj">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: 'rc' }">日常行程</el-breadcrumb-item>
        <el-breadcrumb-item>湘菜</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="main">
      <el-row class="nr">
        <el-col :span="6">
          <el-radio-group v-model="radio1">
            <el-radio-button label="上海"></el-radio-button>
            <el-radio-button label="北京"></el-radio-button>
            <el-radio-button label="广州"></el-radio-button>
            <el-radio-button label="深圳"></el-radio-button>
          </el-radio-group>
        </el-col>
        <el-col :span="6">
          <el-select v-model="value" clearable placeholder="选餐厅">
              <el-option
                v-for="item in options1"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
        </el-col>
      
      </el-row>
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
          <el-form-item label="吃饭人">
          <el-input v-model="formInline.user" placeholder="吃饭人"></el-input>
        </el-form-item>
        <el-form-item label="辣度选择">
          <el-select v-model="formInline.region" placeholder="辣度选择">
            <el-option label="不辣" value="bula"></el-option>
            <el-option label="辣" value="la"></el-option>
          </el-select>
        </el-form-item>
        
      </el-form>
      <el-row>
        <el-col :span="7" v-for="(o, index) in 2" :key="o" :offset="index > 0 ? 2 : 0">
          <el-card :body-style="{ padding: '0px' }">
              <img src="../assets/img/xc1.jpg" alt="">
              <div style="padding: 14px;">
              <span>大白菜</span>
            </div>
          </el-card>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
export default {
    name:'xc',
    components:{
        
    },
    data(){
      return {
        radio1: '上海',
        formInline: {
          user: '',
          region: ''
        },
        value:[],
        options1: [{
          value:'spring',
          label: '春满园',
        },{
          value: 'summer',
          label: '夏满园',
        },{
          value: 'autumn',
          label: '秋满园',
        },{
          value: 'winter',
          label: '冬满园',
        },],
      }
    }
}
</script>

<style>
 @import url('../assets/css/jzc.css');
</style>