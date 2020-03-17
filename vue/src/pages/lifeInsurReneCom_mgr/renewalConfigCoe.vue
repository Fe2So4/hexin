<template>
  <div class="wrap">
    <ui-notice-bar slot="breadcast" >
      <el-breadcrumb slot="location" separator=">">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>寿险续期佣金管理</el-breadcrumb-item>
        <el-breadcrumb-item>继续率调节系数配置</el-breadcrumb-item>
      </el-breadcrumb>
    </ui-notice-bar>
    <ui-label-text class="input-dis" labelWidth="200" label="继续率区间:" >
      <el-select v-model="Rvalue" placeholder="请选择" slot="text">
        <el-option
          v-for="item in options"
          :key="item.intervalView"
          :label="item.intervalView"
          :value="item.interval">
        </el-option>
      </el-select>
    </ui-label-text>
    <div class="btn-container">
      <el-button type="primary" :disabled="!limt.query"  @click="onQueryCoe">查询</el-button>
      <el-button type="primary" :disabled="!limt.export" @click="onexport">继续率调节系数导出</el-button>
      <el-button type="primary" :disabled="!limt.import" @click="dialogVisible = true">继续率调节系数导入</el-button>
    </div>
    <div class="rate-table" v-if="tableShow">
      <el-table
        :data="tableData"
        border
        style="width: 100%">
        <el-table-column
          v-for="(item, index) in tableColum"
          :key="index"
          :prop="item.prop"
          :label="item.label"
          :width="item.width">
        </el-table-column>
      </el-table>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :page-size="tablePage.size"
        :page-sizes="tablePage.sizes"
        layout="total, sizes, prev, pager, next, jumper"
        :total="tablePage.total">
      </el-pagination>
    </div>
    <el-dialog
      append-to-body
      center
      title="导入继续率调节参数"
      :visible.sync="dialogVisible"
      width="50%">
      <el-upload
        class="upload-content"
        action="/tabycore/reports/continueRateIntervalImport"
        :before-remove="beforeRemove"
        :limit="1"
        :on-success="handleEXLSuccess"
        :on-exceed="handleExceed"
        :file-list="fileList"
        center>
        <el-button size="small" type="primary">点击上传</el-button>
        <div slot="tip" class="el-upload__tip red-color">
          <p>* 模版中红色字段为必填项！</p>
          <p>* 调节系数填写为数字百分比格式！</p>
          <p>
            * 请您耐心等待，导入结果将会以excel的形式进行显示！
            <a class="download" @click="ondownloadDemo">(模板下载)</a>
          </p>
        </div>
      </el-upload>
    </el-dialog>
</div>
</template>

<script>
import NoticeBar from '@/components/notice-bar'
import LineTittle from '@/components/line-tittle'
import LabelText from '@/components/label-text'
import api from '@/api/agreeRate_mgr/util/zxcrequest'
export default {
  data () {
    return {
      options: [],
      Rvalue: '',
      tableColum: [
        {prop: 'continueRateInterval', label: '继续率区间(简称R)'},
        {prop: 'r13Ratio', label: 'R13调节系数'},
        {prop: 'r25Ratio', label: 'R25调节系数'},
        {prop: 'r37Ratio', label: 'R37调节系数'},
        {prop: 'r49Ratio', label: 'R49调节系数'}
      ],
      tableData: [],
      dialogVisible: false,
      fileList: [],
      loading: '',
      tablePage: {
        currentPage: 1,
        total: 0,
        size: 5,
        sizes: [5, 10, 20, 50]
      },
      tableShow: false,
      limt: {
        import: false,
        query: false,
        export: false
      }
    }
  },
  components: {
    [NoticeBar.name]: NoticeBar,
    [LineTittle.name]: LineTittle,
    [LabelText.name]: LabelText
  },
  mounted () {
    this.getRenewalRate()
    this.getBtnLimt()
  },
  methods: {
    getBtnLimt () { // 按钮权限
      api(`/auth/findButtonByUserCodeAndPage?userId=${this.$store.state.login.loginUserId}&page=继续率调节系数配置`, 'get').then(result => {
        console.log(result)
        if (result.data.code === '000000') {
          result.data.data.forEach((item, index) => {
            this.limt[item.code] = item.checked
          })
        }
      }).catch((e) => {
        console.log(e)
      })
    },
    getRenewalRate () {
      api('/reports/getRateIntervalList', 'get').then(r => {
        console.log(r)
        this.options = r.data
        this.options.unshift({intervalView: '全部', interval: ''})
      }).catch(r => {
        console.log(r)
      })
    },
    Loading () {
      this.loading = this.$loading({
        lock: true,
        text: 'Loading',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.6)'
      })
    },
    closeLoading () {
      this.loading.close()
    },
    getRenewalRateQuery () {
      this.Loading()
      api('/reports/continueRateIntervalQuery', 'post', {
        jobTypeSelect: this.Rvalue,
        pageNo: this.tablePage.currentPage,
        pageSize: this.tablePage.size
      }
      ).then(r => {
        this.closeLoading()
        // console.log(r)
        this.tableShow = true
        this.tableData = r.data.content
        this.tablePage.total = r.data.totalElements
      })
    },
    handleSizeChange (e) {
      this.tablePage.size = e
      this.getRenewalRateQuery()
    },
    handleCurrentChange (e) {
      this.tablePage.currentPage = e
      this.getRenewalRateQuery()
    },
    importRenewalRate () {
      api('/reports/continueRateIntervalImport', 'post').then(r => {
        console.log(r)
      }).catch(r => {
        console.log(r)
      })
    },
    onQueryCoe () {
      this.getRenewalRateQuery()
    },
    ondownloadDemo () {
      console.log(1)
      window.open('/tabycore/reports/downloadModel')
    },
    ondownload () {
      let str = this.Rvalue.replace('&&', '--')
      window.open(`/tabycore/reports/continueRateIntervalExport?jobTypeSelect=${str}`)
    },
    handleEXLSuccess (response, file, fileList) {
      if (response.code === '000000') {
        this.$message({
          message: response.msg,
          type: 'success'
        })
        this.fileList = []
      } else {
        this.$message({
          message: response.msg,
          type: 'error'
        })
      }
    },
    onexport () {
      this.$confirm('此过程可能比较缓慢，导出过程中请勿关闭浏览器, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.ondownload()
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消下载'
        })
      })
    },
    handleExceed (files, fileList) {
      this.$message.warning(`当前限制选择 1 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`)
    },
    beforeRemove (file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`)
    }
  }
}
</script>

<style lang="scss" scoped type="text/css">
.wrap{
  padding-left: 30px;
  padding-right: 30px;
}
.input-dis{
  margin: 20px 0 10px;
}
.btn-container{
  text-align: center;
  margin-top: 60px;
  margin-bottom: 30px;
}
.btn-container .el-button{
  width: auto;
  padding: 0 2em;
}
.upload-content{
  width: 100%;
  text-align: center;
}
.red-color{
  color: red;
}
.download{
  color:blue;
  cursor:pointer;
}
</style>

