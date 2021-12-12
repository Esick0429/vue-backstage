<template>
  <div>
    <el-form ref="loginForm" label-width="80px" class="login-box">
      <h3 class="login-title">欢迎登录</h3>
      <el-form-item label="账号" prop="username">
        <el-input
          type="text"
          placeholder="请输入账号"
          id="username"
          oncopy="return false"
          v-model="username"
        />
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input
          show-password
          placeholder="请输入密码"
          id="password"
          v-model="password"
          @keyup.enter.native="login()"
        />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" v-on:click="login()">登录</el-button>
        <el-button type="primary" v-on:click="register()">注册</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
// import axios from 'axios'
import {login} from "../api/index.js";
import { debounce } from '@/util/debounce'
import { mapMutations } from 'vuex'
export default {
  name: 'login',
  data() {
    return {
      username: '',
      password: ''
    }
  },
  mounted() {},
  methods: {
    ...mapMutations(['setToken', 'setMoreUserInfo']),
    login: debounce(async function(formName) {
      let username = this.username
      console.log(username)
      let {data} = await login({
          username: this.username,
          password: this.password
      })
      console.log(data,"哇哇哇哇啊");
      if (data) {
          let token = data.token
          let getUserRole = data.authority === 1 ? 'admin' : 'user'
          let username = data.username
          if (data.status == 200) {
            this.$message.success('欢迎进入我的世界')
            localStorage.setItem('token', token)
            localStorage.setItem('UserRole', getUserRole)
            localStorage.setItem('Username', username)
            this.$router.push({
              name: 'rc', //使用params传参需要name，query则是用path
              // path: '/home/rc',
              params: {
                //   info:this.$Base64.encode(JSON.stringify({
                //   userId:this.username,
                // }))
                // userPwd:this.form.password
                info: this.username
                // userId: this.form.username,
                // userPwd:this.form.password
              }
            })
          } else if (data.status == 403) {
            if (this.password.length == 0 || this.username.length == 0) {
              this.$message.error('请输入账号和密码')
            } else {
              this.$message.error('账号或密码错误')
            }
          } else if (data.status == 1001) {
            this.$message.error('密码错误，请重新输入')
            this.password = ''
          }
      }else{
        this.$message.error('请先注册账号')
      }
      // axios
      //   .post('/api/login', {
      //     username: this.username,
      //     password: this.password
      //   })
      //   .then(result => {
      //     console.log(result.data)
      //     let token = result.data.token
      //     let getUserRole = result.data.authority === 1 ? 'admin' : 'user'
      //     let username = result.data.username
      //     if (result.data.status == 200) {
      //       this.$message.success('欢迎进入我的世界')
      //       localStorage.setItem('token', token)
      //       localStorage.setItem('UserRole', getUserRole)
      //       localStorage.setItem('Username', username)
      //       this.$router.push({
      //         name: 'rc', //使用params传参需要name，query则是用path
      //         // path: '/home/rc',
      //         params: {
      //           //   info:this.$Base64.encode(JSON.stringify({
      //           //   userId:this.username,
      //           // }))
      //           // userPwd:this.form.password
      //           info: this.username
      //           // userId: this.form.username,
      //           // userPwd:this.form.password
      //         }
      //       })
      //     } else if (result.data.status == 403) {
      //       if (this.password.length == 0 || this.username.length == 0) {
      //         this.$message.error('请输入账号和密码')
      //       } else {
      //         this.$message.error('账号或密码错误')
      //       }
      //     } else if (result.data.status == 1001) {
      //       this.$message.error('密码错误，青重新输入')
      //       this.password = ''
      //     }
      //   })
      //   .catch(err => {
      //     console.log(err)
      //     this.$message.error('请先注册账号')
      //   })
    }, 300),
    register() {
      this.$router.replace('/register')
    }
  }
}
</script>

<style lang="scss" scoped>
.login-box {
  border: 1px solid #dcdfe6;
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
