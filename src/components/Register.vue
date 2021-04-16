<template>
<div>
  <el-form ref="loginForm" label-width="80px" class="login-box">
    <h3 class="login-title">注册账号</h3>
    <el-form-item label="账号" prop="username">
      <el-input type="text" placeholder="请输入账号" id="username" v-model="username"/>
    </el-form-item>
    <el-form-item label="密码" prop="password">
      <el-input show-password placeholder="请输入密码" id="pwd" v-model="pwd"/>
    </el-form-item>
    <el-form-item label="密码" prop="password2">
      <el-input show-password placeholder="请再次输入密码" id="pwd2" v-model="pwd2" @blur="verify"/>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" v-on:click.prevent="register()">注册</el-button>
       <el-button type="primary" v-on:click.prevent="goBack()">返回</el-button>
       <div>{{msg}}</div>
    </el-form-item>
  </el-form>

  <el-dialog
    title="温馨提示"
    :visible.sync="dialogVisible"
    width="30%"
    >
    <span>请输入账号和密码</span>
    <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
     
  </el-dialog>
</div>
</template>

<script>
import axios from "axios";
// import {login} from '../api/index';
  export default {
    name: "",
    data() {
      return {
          username: '',
          pwd: '',
          pwd2: '',
          msg:'',
        // 表单验证，需要在 el-form-item 元素中增加 prop 属性
        // rules: {
        //   username: [
        //     {required: true, message: '账号不可为空', trigger: 'change'}
        //   ],
        //   pwd: [
        //     {required: true, message: '密码不可为空', trigger: 'blur'}
        //   ]
        // },
        // 对话框显示和隐藏
        dialogVisible: false
      }
    },
    methods: {
      verify(){
            if(this.pwd!==this.pwd2){
               this.$message.error({message: '两个密码不一致'});
                this.pwd2 = '';
                return;
            }
        },
        goBack(){
                 this.$router.replace({path: '/login'});
        },
     register(){
            this.verify()
            axios.post('/api/register',{username:this.username,password:this.pwd})
            .then(result=>{
                this.msg = result.data.msg;
                if(result.data.status == 200){
                  this.$message({
                    message: '恭喜你，注册成功',
                    type: 'success'
                  })
                  this.$router.replace('/login')
                }else if(result.data.status == 1){
                 if(this.pwd.length == 0 || this.username.length == 0){
                  this.$message.error('请输入账号和密码')
                }
               }else if(result.data.status == 1002){
                 this.$message.error('用户名已被占用');
                 this.username = ''
               }
            })
            .catch(err=>{
                console.log(err)
            })           
        }
    }
  }
</script>

<style lang="scss" scoped>
  .login-box {
    border: 1px solid #DCDFE6;
    width: 350px;
    margin: 180px auto;
    padding: 35px 35px 15px 35px;
    border-radius: 5px;
    -webkit-border-radius: 5px;
    -moz-border-radius: 5px;
  }

  .login-title {
    text-align: center;
    margin: 0 auto 40px auto;
    color: #303133;
  }
</style>
