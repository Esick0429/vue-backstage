<template>
  <div style="border: 1px solid #ccc">
    <Toolbar style="border-bottom: 1px solid #ccc" :editor="editor" :default-config="toolbarConfig" :mode="mode" />
    <Editor style="height: 500px; overflow-y: hidden" v-model="info_" :default-config="editorConfig" :mode="mode" @onCreated="onCreated" @onChange="onChange" />
  </div>
</template>
<script>
import Vue from 'vue'
import { Editor, Toolbar } from '@wangeditor/editor-for-vue'
export default Vue.extend({
  components: { Editor, Toolbar },
  data() {
    return {
      editor: null,
      toolbarConfig: {},
      editorConfig: {
        placeholder: '请输入内容...',
        MENU_CONF: {
          uploadImage: {
            server: 'https://api.esick.work/admin/uploadImg', // 上传图片地址
            // server: '/api/upload-img-10s', // 用于测试 timeout
            // server: '/api/upload-img-failed', // 用于测试 failed
            // server: '/api/xxx', // 用于测试 404

            timeout: 5 * 1000, // 5s

            fieldName: 'image',
            // meta: { token: localStorage.getItem('token') },
            metaWithUrl: false, // 参数拼接到 url 上
            headers: { Authorization: localStorage.getItem('token') },

            maxFileSize: 10 * 1024 * 1024, // 10M
            allowedFileTypes: ['image/*'],
            base64LimitSize: 5 * 1024, // 5kb 以下插入 base64

            onBeforeUpload(files) {
              console.log('onBeforeUpload', files)

              return files // 返回哪些文件可以上传
              // return false 会阻止上传
            },
            onProgress(progress) {
              console.log('onProgress', progress)
            },
            onSuccess(file, res) {
              console.log('onSuccess', file, res)
            },
            onFailed(file, res) {
              // alert(res.message)
              console.log('onFailed', file, res)
            },
            onError(file, err, res) {
              // alert(err.message)
              console.error('onError', file, err, res)
            }
          }
        }
      },
      mode: 'default', // or 'simple',
      info_: null
    }
  },

  props: {
    value: {
      type: String,
      default: ''
    },
    isClear: {
      type: Boolean,
      default: false
    },
    height: {
      type: Number,
      default: 300
    }
  },
  watch: {
    value: function (value) {
      if (value !== this.editor.getHtml()) {
        this.editor.setHtml(this.value)
      }
    }
  },
  methods: {
    onCreated(editor) {
      this.editor = Object.seal(editor) // 一定要用 Object.seal() ，否则会报错
      editor.setHtml(this.value)
    },
    onChange(editor) {
      // console.log('onChange', editor.getHtml()) // onChange 时获取编辑器最新内容
      // console.log(editor)
      this.info_ = editor.getHtml() // 绑定当前逐渐地值
      this.$emit('change', this.info_) // 将内容同步到父组件中
    }
  },
  mounted() {},
  beforeDestroy() {
    const editor = this.editor
    if (editor == null) return
    editor.destroy() // 组件销毁时，及时销毁编辑器
  }
})
</script>
<style src="@wangeditor/editor/dist/css/style.css"></style>
