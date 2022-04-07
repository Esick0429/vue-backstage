<template>
  <div class="content">
    <div class="loginBox">
      <el-form ref="loginForm" label-width="80px" label-position="left">
        <h3 class="login-title">欢迎登录</h3>
        <el-form-item label="账号" prop="username">
          <el-input type="text" placeholder="请输入账号" id="username" oncopy="return false" v-model="username" />
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input show-password placeholder="请输入密码" id="password" v-model="password" @keyup.enter.native="login()" />
        </el-form-item>
        <el-form-item>
          <div style="display: flex">
            <el-button type="primary" @click="login()">登录</el-button>
            <el-button type="primary" @click="register()">注册</el-button>
          </div>
        </el-form-item>
      </el-form>
    </div>
    <footer>
      <a href="https://beian.miit.gov.cn">粤ICP备2021044207号</a>
    </footer>
  </div>
</template>

<script>
// import axios from 'axios'
import { login } from '../api/index.js'
import { debounce } from '@/util/debounce'
import { mapMutations } from 'vuex'
export default {
  name: 'Login',
  data() {
    return {
      username: 'user',
      password: '123456'
    }
  },
  mounted() {},
  methods: {
    ...mapMutations(['setToken', 'setMoreUserInfo']),
    login: debounce(async function (formName) {
      let username = this.username
      console.log(username)
      let { data } = await login({
        username: this.username,
        password: this.password
      })
      console.log(data, '哇哇哇哇啊')
      if (data) {
        let token = data.token
        if (data.status == 200) {
          this.$message.success('欢迎进入我的世界')
          localStorage.setItem('token', token)
          this.$router.push({
            name: 'rc' //使用params传参需要name，query则是用path
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
      } else {
        this.$message.error('请先注册账号')
      }
    }, 300),
    register() {
      this.$router.replace('/register')
    }
  }
}
</script>

<style lang="scss" scoped>
.content {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
  // background: url('http://119.91.27.40:4000/images/image_1649350088439_wallhaven-3z7dd3.png') no-repeat fixed;
  // background-size: 100% 100%;
}

.login-title {
  text-align: center;
  margin: 0 auto 40px auto;
  color: #303133;
}

.loginBox {
  padding: 35px;
  border: 1px solid #000;
  border-radius: 5px;
  box-shadow: 5px 5px 30px rgb(90, 88, 85);
  background: rgb(255, 255, 255);
}
footer {
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  bottom: 0;
  width: 100%;
}
</style>
