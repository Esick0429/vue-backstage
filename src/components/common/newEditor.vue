<template>
  <div style="border: 1px solid #ccc">
    <Toolbar style="border-bottom: 1px solid #ccc" :editor="editor" :defaultConfig="toolbarConfig" :mode="mode" />
    <Editor style="height: 500px; overflow-y: hidden" v-model="info_" :defaultConfig="editorConfig" :mode="mode" @onCreated="onCreated" @onChange="onChange" />
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
      editorConfig: { placeholder: '请输入内容...' },
      mode: 'simple', // or 'simple',
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
