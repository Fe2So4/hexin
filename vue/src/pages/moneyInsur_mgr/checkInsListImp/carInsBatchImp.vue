<template>
  <div id="insComBusiness_mgr">
    <ui-notice-bar slot="breadcast" >
      <el-breadcrumb slot="location" separator=">">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>产险业务管理</el-breadcrumb-item>
        <el-breadcrumb-item>产险批改清单导入</el-breadcrumb-item>
      </el-breadcrumb>
    </ui-notice-bar>
    <div class="selectItem">
      <a @click='downModule()' style="margin-left: 10px; " href="javascript:void(0)">模板下载</a>
    </div>
    <div class="upload">
      <el-upload class="upload-demo" :data="postData" ref="upload" name="file" :action="uploadUrl()" :limit="1" accept='xls' :on-success="handleSuccess" :file-list="fileList" :auto-upload="false">
        <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
        <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload" >上传文件</el-button>
      </el-upload>

      <div class="checkBtn">
        <el-button type="primary" @click='analyResult(1)' >查看解析结果</el-button>
      </div>
    </div>
    <el-dialog :append-to-body='true' center width='40%' title="解析结果"  :visible.sync="isImport" >
      <p style="text-align: center; " v-text="result"></p>
      <div class='btn-container'>
        <el-button type="info" @click.native.prevent="isImport = false" >取消</el-button>
        <el-button type="primary"  @click.native.prevent="isImport = false" >确定</el-button>
      </div>
    </el-dialog>
    <!-- 解析结果 -->
    <!-- <el-table ref="multipleTable" :data="resultTableData" v-if='isShowTable' tooltip-effect="dark" style="width: 100%;" >
      <el-table-column prop="companycode" label="保险公司" ></el-table-column>
      <el-table-column prop="errorinfo" label="错误信息" ></el-table-column>
    </el-table> -->
    <!-- 查询分页 -->
    <!-- <div class="pagination" v-if='isShowTable'>
      <el-pagination @current-change='handleCurrentChange' :current-page.sync="current" :pager-count='5' :page-size='5' :page-sizes='[5]' :total="totalRecords" layout="total, sizes, prev, pager, next, jumper" :page-count="totalPages"></el-pagination>
    </div>
     <div class="checkBtn" v-if='isShowTable'>
        <el-button type="primary" @click.native.prevent='importExcal'  >导出</el-button>
      </div> -->
  </div>
</template>

<script>
import NoticeBar from '@/components/notice-bar'
import LabelText from '@/components/label-text'
import LineTittle from '@/components/line-tittle'
import IsEmpty from '@/utils/IsEmpty'
import { mapActions } from 'vuex'
export default {
  name: '',
  data () {
    return {
      id: '',
      postData: {}, // 上传数据
      insCom: [], // 保险公司列表
      resultTableData: [],
      isShowTable: false,
      fileList: [],
      infoData: {}, // 查询提交数据
      totalPages: 0, // 总页数
      totalRecords: 0, // 总条数
      current: 1, // 当前页码
      result: '',
      isImport: false,
      loading: ''
    }
  },
  mounted () {
    this.$nextTick(function () {
      // 初始化数据
    })
  },
  watch: {
  },
  methods: {
    downModule () { // 下载模板
      window.open('/tabycore/rate/downloadModel?downType=carEndorseExcel')
    },
    uploadUrl () { // 文件上传地址
      return '/tabycore/excelUpload/carEndexcelImport'
    },
    submitUpload (fileData) { // 上传到服务器
      let list = document.querySelector('.is-ready')
      if (IsEmpty(list)) {
        list = []
      }
      if (list.length <= 0) {
        this.open('error', '请先选择文件')
        return false
      } else {
        this.Loading()
        this.checkFile().then(resp => {
          this.closeLoading()
          if (resp.code === '000000') {
            this.$refs.upload.submit()
          } else {
            this.open('error', resp.msg)
          }
        }).catch(() => {
          this.closeLoading()
        })
      }
    },
    handleSuccess (resp) { // 上传成功
      if (resp.code === '000000') {
        this.open('success', '上传成功')
      } else {
        this.open('error', resp.msg)
        this.fileList = []
      }
    },
    analyResult (page) {
      this.Loading()
      this.checkResult().then(resp => {
        this.closeLoading()
        if (resp.code === '000000') {
          this.isImport = true
          this.result = resp.msg
        } else {
          this.open('error', resp.msg)
        }
      })
    },
    open (type, mesg) { // 提示
      this.$message({
        showClose: true,
        message: mesg,
        type: type
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
    ...mapActions([
      'checkFile',
      'checkResult'
    ])
  },
  components: {
    [NoticeBar.name]: NoticeBar,
    [LabelText.name]: LabelText,
    [LineTittle.name]: LineTittle
  },
  created () {
  }
}
</script>

<style lang="scss" scoped type="text/css">
  #insComBusiness_mgr{
    padding: 0px 30px 30px 30px;
  }
  .agent_manage_form { padding-top: 20px; }
  .ri-line { margin-bottom: 10px; }
  .selectItem { margin-top: 20px; text-align: center; }
  .checkBtn { margin: 20px 0; }
  .btn-container { margin: 30px 0 0; text-align: center; }
</style>
<style>
  .el-date-editor .el-range__icon, .el-date-editor .el-range-separator { height: auto;}
  .pagination {
    text-align: right;
    margin: 20px auto;
  }
  .upload { margin: 20px auto 0; text-align: center; }
</style>

