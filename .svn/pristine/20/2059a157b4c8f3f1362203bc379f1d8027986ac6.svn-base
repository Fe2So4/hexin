<template>
  <div id="rate-import" >
    <div class="rate-wrapper">
      <div class="ri-content" slot="content" >
        <el-upload
          class="upload-rate"
          :action="uploadUrl()"
          :on-success="handleEXLSuccess"
          accept='xls'
          :file-list="fileList">
          <el-button size="small" v-if="isImport" type="primary">点击上传</el-button>
          <div slot="tip" class="el-upload__tip"></div>
        </el-upload>
        <div style="text-align:center;margin-bottom: 10px;" v-if="!isImport">
          <el-button size="small" :disabled="true" type="primary">点击上传</el-button>
        </div>
        <div class="download">
          <a @click="downTem()" href="javascript:void(0)" download>导入模板下载</a>
        </div>
        <div class="download1">
          <a @click='downRisk()' href="javascript:void(0)" download>保险公司、险种列表下载</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import LineTittle from '@/components/line-tittle'
import LabelText from '@/components/label-text'
import { mapActions } from 'vuex'
export default {
  name: 'rate-upload',
  props: {
    isImport: Boolean
  },
  data () {
    return {
      info: {
      },
      downOption: '',
      fileList: [],
      templateFile: ''
    }
  },
  mounted () {
  },
  methods: {
    uploadUrl () {
      return '/tabycore/rate/fileUpload'
    },
    downTem () {
      window.open('/tabycore/rate/downloadModel?downType=model')
    },
    downRisk () {
      window.open('/tabycore/rate/riskExport')
    },
    upload () {
    },
    handleEXLSuccess (response, file, fileList) {
      if (response.code === '000000') {
        this.$message({
          message: response.msg,
          type: 'success'
        })
      } else {
        this.$message({
          message: response.msg,
          type: 'error'
        })
      }
    },
    ...mapActions([
    ])
  },
  components: {
    [LineTittle.name]: LineTittle,
    [LabelText.name]: LabelText
  },
  created () {
  },
  computed: {
  }
}
</script>

<style lang="scss" scoped type="text/css">
#rate-index {
  padding-left: 30px;
  padding-right: 30px;
}
.upload-rate,
.download,
.download1 {
  text-align: center;
}
.rate-wrapper {
  width: 300px;
  margin: 100px auto;
}
.btn-container{
  text-align: center;
  margin-top: 60px;
  margin-bottom: 30px;
}
.el-button {
  width: 180px;
}
.ri-line{
  margin-top: 10px;
  margin-bottom: 10px;
}
</style>
