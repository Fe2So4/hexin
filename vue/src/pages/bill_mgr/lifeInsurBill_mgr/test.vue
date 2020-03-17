<template>
  <div>
    <el-button type="primary" class="test" @click.native.prevent="open" >查询</el-button>
    <div id="iddd">
      <span class="test"></span>
      <el-upload
        class="upload-rate"
        :action="uploadUrl()"
        :on-success="handleEXLSuccess"
        accept='xls'
        :file-list="fileList">
        <el-button size="small" v-if="!isImport" type="primary">点击上传</el-button>
        <div slot="tip" class="el-upload__tip"></div>
      </el-upload>
      <el-date-picker v-model="queryInfo.chengbaodate" slot="text" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" value-format="yyyy-MM-DD"></el-date-picker>
    </div>
  </div>
</template>

<script>
import NoticeBar from '@/components/notice-bar'
import LabelText from '@/components/label-text'
import LineTittle from '@/components/line-tittle'
import moment from 'moment'
// import IsEmpty from '@/utils/IsEmpty'
// import { mapActions } from 'vuex'
export default {
  data () {
    return {
      testInput: '430122198510060338',
      Boola: false,
      data: '天安佰盈保险销售有限公司深圳分公司',
      toastMessage: '',
      log: 'getIT',
      queryInfo: {
        chengbaodate: []
      },
      fileList: [],
      isImport: true
    }
  },
  methods: {
    uploadUrl () {
      return '/tabycore/ratebranch/fileUpload'
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
    open () {
      // let self = this
      // if (this.toastMessage) {
      //   this.toastMessage.close()
      // }
      // self.openToast()
      // this.data = this.data.replace(/天安佰盈保险销售有限公司/, '')
      // this.data = this.data.replace(/分公司/, '')
      // console.log(this.data)
      window.open('https://jichupro.oss-cn-szfinance.aliyuncs.com/dlrImage/13102519901107301X_01.jpg' + '?random=' + Math.random())
    },
    openToast () {
      this.toastMessage = this.$message({
        showClose: true,
        message: 'shishi',
        type: 'success',
        duration: 0
      })
    },
    change () {
      this.Boola = true
    }
  },
  computed: {
  },
  created () {
    console.log(this.log)
  },
  mounted () {
    var date = new Date()
    this.log = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + (date.getDate() >= 10 ? date.getDate() : '0' + date.getDate()) + ' ' + (date.getHours() >= 10 ? date.getHours() : '0' + date.getHours()) + ':' + (date.getMinutes() >= 10 ? date.getMinutes() : '0' + date.getMinutes()) + ':' + (date.getSeconds() >= 10 ? date.getSeconds() : '0' + date.getSeconds())
    console.log(this.log)
    console.log(moment(Date.now()).format('YYYY-M-DD HH:mm:ss'))
  },
  components: {
    [NoticeBar.name]: NoticeBar,
    [LabelText.name]: LabelText,
    [LineTittle.name]: LineTittle
  },
  watch: {
    queryInfo: {
      handler (newValue, oldValue) {
        console.log(this.queryInfo.chengbaodate[0])
      },
      deep: true
    }
  }
}
</script>

<style lang="scss" scoped type="text/css">
</style>
