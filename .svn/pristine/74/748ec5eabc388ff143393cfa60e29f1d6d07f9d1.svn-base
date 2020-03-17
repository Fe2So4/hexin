<template>
  <div id="riskImport" >
      <div class="ri-content" slot="content" >
        <el-upload
          class="upload-risk"
          :action="uploadUrl()"
          name="fileName"
          multiple
          :on-success="handleEXLSuccess"
          accept='xls'
          :before-upload="beforeUpload"
          :file-list="fileList">
          <el-button size="small" type="primary">点击上传</el-button>
          <div slot="tip" class="el-upload__tip"></div>
        </el-upload>
        <el-row class="ri-line">
          <el-col :span="12" :offset="6">
            <ui-label-text labelWidth="130" label="模板选择 :" >
              <el-select v-model="info.temtype" slot="text" placeholder="请选择">
                <el-option
                  label="寿险模板"
                  value="1">
                </el-option>
                <el-option
                  label="银代模板"
                  value="2">
                </el-option>
                <el-option
                  label="财险模板"
                  value="3">
                </el-option>
              </el-select>
            </ui-label-text>
          </el-col>
        </el-row>
        <div class="download">
          <a @click="downTem(info.temtype)" href="javascript:void(0)" download>导入模板下载</a>
        </div>
        <el-row class="ri-line">
          <el-col :span="12" :offset="6">
            <ui-label-text labelWidth="130" label="请选择产品类型 :" >
              <el-select v-model="info.type" slot="text" placeholder="请选择">
                <el-option
                  label="寿险"
                  value="1">
                </el-option>
                <el-option
                  label="财险"
                  value="2">
                </el-option>
                <el-option
                  label="银代"
                  value="3">
                </el-option>
              </el-select>
            </ui-label-text>
          </el-col>
        </el-row>
      </div>
  </div>
</template>

<script>
import NoticeBar from '@/components/notice-bar'
import LineTittle from '@/components/line-tittle'
import LabelText from '@/components/label-text'
import { mapActions } from 'vuex'
export default {
  name: 'risk-import',
  data () {
    return {
      info: {
      },
      fileList: []
    }
  },
  mounted () {
  },
  methods: {
    uploadUrl () {
      // return '/tabycore/lifeInsurance/fileUpload'
      return ''
    },
    downTem (type) {
      let result = ''
      if (type) {
        switch (type) {
          case '1' :
            result = '/tabycore/rate/downloadModel?downType=sxliferisk'
            break
          case '2' :
            result = '/tabycore/rate/downloadModel?downType=ybliferisk'
            break
          case '3' :
            result = '/tabycore/rate/downloadModel?downType=cxliferisk'
            break
        }
        window.open(result)
      } else {
        this.$message({
          showClose: true,
          message: '请先选择模板类型',
          type: 'error'
        })
      }
    },
    beforeUpload (file) {
      if (this.info.type) {
        let fd = new FormData()
        fd.append('fileName', file)
        fd.append('type', this.info.type)
        this.uploadRisk(fd).then(resp => {
          if (resp.data.code === '000000') {
            this.$message({
              message: resp.data.msg,
              type: 'success'
            })
          } else {
            this.$message({
              message: resp.data.msg,
              type: 'error'
            })
          }
        })
      } else {
        this.$message({
          message: '请先选择产品类型',
          type: 'error'
        })
      }
    },
    handleEXLSuccess (response, file, fileList) {
      if (response.data.code === '000000') {
        this.$message({
          message: response.data.msg,
          type: 'success'
        })
      } else {
        this.$message({
          message: response.data.msg,
          type: 'error'
        })
      }
    },
    ...mapActions([
      'uploadRisk'
    ])
  },
  components: {
    [NoticeBar.name]: NoticeBar,
    [LineTittle.name]: LineTittle,
    [LabelText.name]: LabelText
  },
  created () {
  }
}
</script>

<style lang="scss" scoped type="text/css">
#riskImport {
  padding-left: 30px;
  padding-right: 30px;
}
.btn-container{
  text-align: center;
  margin-top: 60px;
  margin-bottom: 30px;
}
.ri-line{
  margin-top: 10px;
  margin-bottom: 10px;
}
.upload-risk {
  text-align: center;
  margin-top: 20px;
}
.download {
  text-align: center;
}
</style>
