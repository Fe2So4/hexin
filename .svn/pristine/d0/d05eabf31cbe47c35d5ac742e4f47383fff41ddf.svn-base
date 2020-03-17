<template>
  <div id="lifeInsur_differ">
    <ui-notice-bar slot="breadcast" >
      <el-breadcrumb slot="location" separator=">">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>银保代理业务管理</el-breadcrumb-item>
        <el-breadcrumb-item>导入错误数据查询</el-breadcrumb-item>
      </el-breadcrumb>
    </ui-notice-bar>
    <el-form class="manage_form mesg_form" :model="searchData" ref="searchData" :rules="rules" >
      <el-row class="ri-line">
        <el-col :span="12">
          <el-form-item prop='comCode'>
            <ui-label-text :required="true"  label="保险公司代码：" labelWidth="120" >
              <el-input slot="text" clearable v-model="searchData.comCode" @dblclick.native="getComInfo(1)" placeholder="双击选择" @blur='blurCom(0, $event)' ></el-input>
            </ui-label-text>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item prop='comName'>
            <ui-label-text :required="true" label="保险公司名称：" labelWidth="120">
            <el-input slot="text" clearable @blur='blurCom(0, $event)' placeholder="双击选择" v-model="searchData.comName" @dblclick.native="getComInfo(1)" ></el-input>
            </ui-label-text>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <!-- 基础操作 -->
    <div class='btn-container'>
      <el-button type="primary" @click.native.prevent="silverDifferList(1)" >查询</el-button>
      <el-button type="primary" @click.native.prevent="silverDifferImp" >导出</el-button>
    </div>
    <!-- 查询结果 -->
    <el-table stripe ref="multipleTable" :data="differTableData" v-if='isShowTable' tooltip-effect="dark" style="width: 100%;"  >
      <el-table-column prop="companyCode" label="保险公司名称" ></el-table-column>
      <el-table-column prop="errors" label="错误信息" ></el-table-column>
    </el-table>
    <!-- 查询分页 -->
    <div class="pagination" v-if='isShowTable'>
      <el-pagination @size-change='handleSizeChange' @current-change='handleCurrentChange' :current-page.sync="current" :pager-count='5' :page-size='5' :page-sizes='[5, 10, 20, 50]' :total="totalRecords" layout="total, sizes, prev, pager, next, jumper" :page-count="totalPages"></el-pagination>
    </div>
    <!-- 获取保险公司 -->
    <el-dialog title="保险公司" :append-to-body='true' :visible.sync="com_dialog" width="50%" center>
      <el-table stripe @row-click='selectRowCom' ref="multipleTable" :data="insComTableData" >
        <el-table-column prop="insurercode" label="保险公司代码" center ></el-table-column>
        <el-table-column prop="insurername" label="保险公司名称" center ></el-table-column>
      </el-table>
      <div class="pagination" >
        <el-pagination small  @size-change="comSizeChange" @current-change='comCurrentChange' :current-page.sync="currentD" :pager-count='5' :page-size='5' :page-sizes='sizeList'  :total="totalRecordsD" layout="total, sizes, prev, pager, next, jumper" :page-count="totalPagesD"></el-pagination>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import NoticeBar from '@/components/notice-bar'
import LabelText from '@/components/label-text'
import LineTittle from '@/components/line-tittle'
import { mapActions } from 'vuex'
export default {
  name: '',
  data () {
    return {
      sizeList: [5, 10, 20, 50],
      searchData: {
        comCode: '',
        comName: ''
      }, // 查询条件
      differTableData: [], // 查询结果
      isShowTable: false, // 是否显示查询结果
      current: 1,
      totalRecords: 0,
      totalPages: 0,
      currentD: 1,
      totalRecordsD: 0,
      totalPagesD: 0,
      pageSize: 5,
      pageSizeD: 5,
      loading: '',
      postData: {}, // 导出数据
      com_dialog: false, // 是否显示保险公司弹框
      insComTableData: [], // 保险公司数据
      rules: {
        comCode: [
          { required: true, message: '请输入保险公司代码', trigger: 'change' }
        ],
        comName: [
          { required: true, message: '请输入保险公司名称', trigger: 'change' }
        ]
      },
      rowList: {}
    }
  },
  mounted () {
  },
  watch: {
    'searchData.comCode' (newValue, oldValue) {
      if (newValue === '') {
        this.searchData.comName = ''
      }
    },
    'searchData.comName' (newValue, oldValue) {
      if (newValue === '') {
        this.searchData.comCode = ''
      }
    }
  },
  methods: {
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
    silverDifferList (page) { // 查询银保保单差异
      this.$refs['searchData'].validate((valid) => {
        if (valid) {
          this.current = page
          this.searchData.pageSize = this.pageSize
          this.searchData.currentPage = page
          this.Loading()
          this.silverDiffer(this.searchData).then(resp => {
            this.closeLoading()
            this.differTableData = resp.content
            this.totalPages = resp.totalPages
            this.totalRecords = resp.totalElements
            this.isShowTable = true
          })
        } else {
          return false
        }
      })
    },
    handleCurrentChange (val) { // 分页
      this.silverDifferList(val)
    },
    handleSizeChange (val) { // 选择保险公司分页
      this.pageSize = val
      this.silverDifferList(1)
    },
    silverDifferImp () { // 导出
      this.$refs['searchData'].validate((valid) => {
        if (valid) {
          this.postData.comCode = this.searchData.comCode
          this.postData.comName = this.searchData.comName
          window.open(`/tabycore/bankChannel/matchExport?comCode=${this.searchData.comCode}&comName=${this.searchData.comName}`)
        }
      })
    },
    selectRowCom (row) { // 保险公司选择
      this.searchData.comCode = row.insurercode
      this.searchData.comName = row.insurername
      this.com_dialog = false
    },
    comCurrentChange (val) { // 选择保险公司分页
      this.getComInfo(val)
    },
    comSizeChange (val) { // 选择保险公司分页
      this.pageSizeD = val
      this.getComInfo(1)
    },
    getComInfo (page) { // 保险公司查询
      this.com_dialog = true
      var data = {
        'insurerCode': this.searchData.comCode,
        'insurerName': this.searchData.comName,
        'currentPage': page,
        'pageSize': this.pageSizeD,
        'insurerType': '3',
        'codeType': 'getCom',
        'clickType': '2'
      }
      this.getDifferInsCom(data).then(resp => {
        this.insComTableData = resp.content
        this.totalRecordsD = resp.totalElements
        this.totalPagesD = resp.totalPages
      })
    },
    blurCom (type, event) { // 失去焦点判断
      if (this.com_dialog || event.target.value === '') {
        return false
      }
      let Code = ''
      let Name = ''
      Code = this.searchData.comCode
      Name = this.searchData.comName
      if (type === 0) {
        Name = ''
      } else {
        Code = ''
      }
      var data = {
        'insurerCode': Code,
        'insurerName': Name,
        'insurerType': '3',
        'codeType': 'getCom',
        'clickType': '1'
      }
      this.getDifferInsCom(data).then(resp => {
        if (resp.content.length > 0) {
          this.searchData.comCode = resp.content[0].insurercode
          this.searchData.comName = resp.content[0].insurername
        } else {
          this.searchData.comCode = ''
          this.searchData.comName = ''
          this.open('error', '代码或名称不存在')
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
    ...mapActions([
      'silverDiffer',
      'silverDifferImport',
      'getDifferInsCom'
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
  #lifeInsur_differ{
    padding: 0px 30px 30px 30px;
  }
  .el-form-item { margin-bottom: 0; }
  .manage_form { margin-top: 20px; }
  .ri-line { margin-bottom: 10px; }
  .selectItem { margin-top: 20px; }
  .checkBtn { margin: 20px 0; text-align: center; }

</style>
<style>
  .btn-container { margin: 30px 0; text-align: center; }
  .pagination {
    text-align: right;
    margin: 20px auto;
  }
  .mesg_form .required:before{
    font-size: 14px!important;
    top: 3px !important;
  }
  #lifeInsur_differ .manage_form .el-form-item__error { left: 120px;}
  .batch .el-button { width: inherit; height: inherit; line-height: inherit; font-size: inherit; padding: 10px; }
  .el-input__icon { line-height: inherit;}
</style>
