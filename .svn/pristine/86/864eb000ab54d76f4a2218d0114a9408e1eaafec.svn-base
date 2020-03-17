<template>
  <div id="insComBusiness_mgr">
    <ui-notice-bar slot="breadcast" >
      <el-breadcrumb slot="location" separator=">">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>寿险业务管理</el-breadcrumb-item>
        <el-breadcrumb-item>保险公司承保清单导入</el-breadcrumb-item>
      </el-breadcrumb>
    </ui-notice-bar>
    <div class="upload">
      <el-upload class="upload-demo" :data="postData" ref="upload"  name="fileName" :on-success="handleSuccess" :action="uploadUrl()" :limit="1" accept='xls' :file-list="fileList" :auto-upload="false">
        <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
        <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload" >上传文件</el-button>
      </el-upload>
      <div class="selectItem">
        <ui-label-text style="display: inline-block; " >
          <el-select v-model="id" slot="text" placeholder="请选择保险公司">
            <el-option v-for="item in insCom" :key="item.insurercode" :label="item.insurername" :value="item.insurercode"></el-option>
          </el-select>
        </ui-label-text>
        <a @click='downModule()' href="javascript:void(0)">模板下载</a>
      </div>
      <div class="checkBtn">
        <el-button type="primary" @click='checkResult(1)' >查看解析结果</el-button>
      </div>
    </div>
    <!-- 解析结果 -->
    <el-table ref="multipleTable" :data="resultTableData" v-if='isShowTable' tooltip-effect="dark" style="width: 100%;" >
      <el-table-column prop="companycode" label="保险公司" ></el-table-column>
      <el-table-column prop="errorinfo" label="错误信息" ></el-table-column>
    </el-table>
    <!-- 查询分页 -->
    <div class="pagination" v-if='isShowTable'>
      <el-pagination @current-change='handleCurrentChange' :current-page.sync="current" :pager-count='5' :page-size='5' :page-sizes='[5]' :total="totalRecords" layout="total, sizes, prev, pager, next, jumper" :page-count="totalPages"></el-pagination>
    </div>
    <div class="checkBtn" v-if='isShowTable'>
      <el-button type="primary" @click.native.prevent='importExcal'>导出</el-button>
    </div>
    <!-- 导入提示 -->
    <el-dialog title="提示" center :append-to-body='true' :visible.sync="isTip" width="30%" >
      <p style="text-align: center; ">如果数据量比较大，整个过程会很慢，请您耐心等待</p>
      <span slot="footer" class="dialog-footer">
        <el-button @click="isTip = false">取 消</el-button>
        <el-button type="primary" @click="tipTrue">确 定</el-button>
      </span>
    </el-dialog>
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
      isTip: false,
      loading: ''
    }
  },
  mounted () {
    this.$nextTick(function () {
      // 初始化数据
      this.getInsCom()
    })
  },
  watch: {
  },
  methods: {
    getInsCom () { // 获取保险公司
      let data = {
        'type': '2'
      }
      this.Loading()
      this.searchInsCom(data).then(resp => {
        this.closeLoading()
        if (resp.code === '000000') {
          this.insCom = resp.data.data
        } else {
          this.open('error', resp.msg)
        }
      })
    },
    downModule () { // 下载模板
      if (this.id === '') {
        this.open('error', '请先选择保险公司')
        return false
      } else {
        console.log(this.id)
        window.open('/tabycore/rate/downloadModel5?downType=' + this.id)
      }
    },
    uploadUrl () { // 文件上传地址
      return '/tabycore/excelUpload/fileUpload'
    },
    submitUpload () { // 上传到服务器
      let list = document.querySelector('.is-ready')
      if (IsEmpty(list)) {
        list = []
      }
      if (this.id === '') {
        this.open('error', '请先选择保险公司')
        return false
      } else if (list.length <= 0) {
        this.open('error', '请先选择文件')
        return false
      } else {
        this.postData.insurerCode = this.id
        this.isTip = true
      }
    },
    tipTrue () {
      this.Loading()
      this.$refs.upload.submit()
    },
    handleSuccess (resp) { // 上传成功
      this.closeLoading()
      if (resp.code === '000000') {
        this.isTip = false
        this.fileList = []
        this.open('success', '上传成功！')
      } else {
        this.isTip = false
        this.open('error', resp.msg)
      }
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
    checkResult (page) {
      this.current = page
      this.infoData.currentPage = page
      this.Loading()
      this.analyResult(this.infoData).then(resp => {
        this.closeLoading()
        this.resultTableData = resp.data
        this.isShowTable = true
        this.totalPages = resp.totalPages
        this.totalRecords = resp.totalRecords
      })
    },
    handleCurrentChange (val) {
      this.checkResult(val)
    },
    importExcal () { // 导出
      window.open('/tabycore/excelUpload/exportExcel')
    },
    open (type, mesg) { // 提示
      this.$message({
        showClose: true,
        message: mesg,
        type: type
      })
    },
    ...mapActions([
      'searchInsCom',
      'uploadMoudle',
      'analyResult',
      'importResult'
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
  .selectItem { margin-top: 20px; }
  .checkBtn { margin: 20px 0; text-align: center; }
</style>
<style>
  .btn-container { margin: 30px 0; text-align: center; }
  .el-date-editor .el-range__icon, .el-date-editor .el-range-separator { height: auto;}
  .pagination {
    text-align: right;
    margin: 20px auto;
  }
  .upload { text-align: center; margin: 20px auto 0; width: 50%; }
</style>

