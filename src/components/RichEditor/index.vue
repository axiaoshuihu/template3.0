<template>
  <div>
    <div ref="editor" style="text-align:left" />
  </div>
</template>

<script>
import E from 'wangeditor';
export default {
  name: 'Editor',
  props: {
    content: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      editor: null,
      video: '',
      editorContent: this.content
    };
  },
  mounted() {
    // console.log('子组件获取', this.content);
    this.editor = new E(this.$refs.editor);
    // 配置上传图片
    // this.editor.customConfig.uploadImgServer = this.$api.upload.img;
    // this.editor.customConfig.uploadFileName = 'image';
    // this.editor.customConfig.uploadImgTimeout = 30000;
    this.editor.customConfig.uploadImgHeaders = {
      'Authorization': ''
    };
    this.editor.customConfig.uploadImgHooks = {
      // 如果服务器端返回的不是 {errno:0, data: [...]} 这种格式，可使用该配置
      // （但是，服务器端返回的必须是一个 JSON 格式字符串！！！否则会报错）
      customInsert: function(insertImg, result) {
        // console.log('customInsert',insertImg, result);
        // 图片上传并返回结果，自定义插入图片的事件（而不是编辑器自动插入图片！！！）
        // insertImg 是插入图片的函数，editor 是编辑器对象，result 是服务器端返回的结果
        // 举例：假如上传图片成功后，服务器端返回的是 {url:'....'} 这种格式，即可这样插入图片：
        if (result.code === 200) {
          const url = result.data.url;
          insertImg(url);
        } else {
          this.$message.info(result.msg);
        }
      }
    };

    this.editor.customConfig.onchange = (html) => {
      this.editorContent = html;
      this.getContent();
    };
    // 自定义菜单配置
    this.editor.customConfig.menus = [
      'head', // 标题
      'bold', // 粗体
      'fontSize', // 字号
      'fontName', // 字体
      'italic', // 斜体
      'underline', // 下划线
      'strikeThrough', // 删除线
      'foreColor', // 文字颜色
      // 'backColor', // 背景颜色
      'link', // 插入链接
      'list', // 列表
      'justify', // 对齐方式
      'quote', // 引用
      // 'emoticon', // 表情
      'image', // 插入图片
      'table', // 表格
      'video', // 插入视频
      'code', // 插入代码
      'undo', // 撤销
      'redo' // 重复
    ];
    this.editor.create();
    this.editor.txt.append(this.content);
  },
  methods: {
    takeContent(value) {
      this.editor.txt.append(value);
      this.editorContent = value;
    },
    getContent() {
      // console.log('富文本内容', this.editorContent);
      this.$emit('getContent', this.editorContent);
    }
  }
};
</script>

<style scoped>
  /deep/.w-e-toolbar {
    flex-wrap: wrap;
    line-height: 20px;
  }
  /deep/.w-e-text-container {
    height: 180px!important;
    z-index: 7!important;
  }
  /deep/.w-e-menu {
    z-index: 8!important;
  }
</style>
