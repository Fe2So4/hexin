<template>
  <div id="lifeInsur_differ">
    <ui-notice-bar slot="breadcast" >
      <el-breadcrumb slot="location" separator=">">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>寿险业务管理</el-breadcrumb-item>
        <el-breadcrumb-item>寿险首期保单管理</el-breadcrumb-item>
        <el-breadcrumb-item>寿险保单差异查询</el-breadcrumb-item>
      </el-breadcrumb>
    </ui-notice-bar>
    <el-form class="manage_form">
      <el-row class="ri-line">
        <el-col :span="12">
          <ui-label-text label="保险公司代码：" labelWidth="120" >
           <el-input slot="text" @dblclick.native="getComInfo(1)" placeholder="双击选择" clearable v-model="searchData.companyCode" ></el-input>
          </ui-label-text>
        </el-col>
        <el-col :span="12">
          <ui-label-text label="保险公司名称：" labelWidth="120" >
           <el-input slot="text" @dblclick.native="getComInfo(1)"  placeholder="双击选择" clearable v-model="searchData.companyName" ></el-input>
          </ui-label-text>
        </el-col>
      </el-row>
      <el-row class="ri-line">
        <ui-label-text label="承保月份" labelWidth="120" >
          <el-date-picker slot="text" value-format="yyyy-MM" v-model="searchData.acceptDate"  type="month" placeholder="选择日期"> </el-date-picker>
        </ui-label-text>
      </el-row>
    </el-form>
    <!-- 基础操作 -->
    <div class='btn-container'>
      <el-button type="primary" @click.prevent="searchDiffer(1)" >查询</el-button>
      <el-button type="primary" @click.prevent="importEx" style="width: auto; padding: 0 15px;">导出Excel</el-button>
    </div>
    <!-- 查询结果 -->
    <el-table ref="multipleTable" :data="differTableData" v-if='isShowTable' tooltip-effect="dark" style="width: 100%;"  >
      <el-table-column prop="companyName" label="保险公司名称" ></el-table-column>
      <el-table-column prop="comName" label="佰盈分公司" ></el-table-column>
      <el-table-column prop="policyNo" label="保单号"  > </el-table-column>
      <el-table-column prop="proposalNo" label="投保单号"  > </el-table-column>
      <el-table-column prop="reason" label="差异原因"  > </el-table-column>
      <el-table-column prop="premium" label="保费"  > </el-table-column>
      <el-table-column prop="customerName" label="投保人姓名"  > </el-table-column>
      <el-table-column prop="acceptDate" label="承保日期"  > </el-table-column>
      <el-table-column prop="agentCode" label="业务员姓名"  > </el-table-column>
      <el-table-column prop="createTime" label="差异生成日期"  > </el-table-column>
    </el-table>
    <!-- 查询分页 -->
    <div class="pagination" v-if='isShowTable'>
      <el-pagination @size-change="searchSizeChange" @current-change='handleCurrentChange' :current-page.sync="current" :pager-count='5' :page-size='5' :page-sizes='sizeListS' :total="totalRecords" layout="total, sizes, prev, pager, next, jumper" :page-count="totalPages"></el-pagination>
    </div>
    <!-- 获取保险公司 -->
    <el-dialog title="保险公司" :before-close='closeCom' :append-to-body='true' :visible.sync="com_dialog" width="50%" center>
      <el-table @row-click='selectRowCom' ref="multipleTable" :data="insComTableData" >
        <el-table-column prop="insurercode" label="保险公司代码" center ></el-table-column>
        <el-table-column prop="insurername" label="保险公司名称" center ></el-table-column>
      </el-table>
      <div class="pagination" >
        <el-pagination @current-change='comCurrentChange' @size-change="comSizeChange" :current-page.sync="currentD" :pager-count='5' :page-size='5' :page-sizes='sizeList' :total="totalRecordsD" layout="total, sizes, prev, pager, next, jumper"> </el-pagination>
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
      searchData: {
        companyCode: '',
        companyName: '',
        acceptDate: ''
      }, // 查询条件
      differTableData: [], // 查询批处理结果
      isShowTable: false, // 是否显示查询结果
      current: 1, // 当前页
      pageSize: 5,
      totalRecords: 0, // 总条数
      totalPages: 0, // 总页数
      insComTableData: [], // 保险公司数据
      com_dialog: false,
      currentD: 1,
      totalRecordsD: 0,
      pageSizeD: 5,
      sizeList: [5, 10, 20, 50],
      sizeListS: [5, 10, 20, 50],
      loading: ''
    }
  },
  mounted () {
  },
  watch: {
    'searchData.companyCode' () {
      if (this.searchData.companyCode === '') {
        this.searchData.companyName = ''
      }
    },
    'searchData.companyName' () {
      if (this.searchData.companyName === '') {
        this.searchData.companyCode = ''
      }
    }
  },
  methods: {
    searchDiffer (page) { // 查询
      this.searchData.currentPage = page
      this.searchData.pageSize = this.pageSize
      this.current = page
      this.Loading()
      this.insBillDiffer(this.searchData).then(resp => {
        this.closeLoading()
        this.differTableData = resp.data
        this.totalRecords = resp.totalRecords
        this.totalPages = resp.totalPages
      })
      this.isShowTable = true
    },
    handleCurrentChange (val) { // 查询结果分页
      this.current = val
      this.searchDiffer(val)
    },
    searchSizeChange (val) {
      this.pageSize = val
      this.searchDiffer(1)
    },
    selectRowCom (row) { // 保险公司选择
      this.closeDailog().then(() => {
        this.searchData.companyCode = row.insurercode
        this.searchData.companyName = row.insurername
        this.com_dialog = false
      })
    },
    comCurrentChange (val) { // 选择保险公司分页
      this.getComInfo(val, this.isComType)
    },
    comSizeChange (val) { // 选择保险公司分页
      this.pageSizeD = val
      this.getComInfo(1, this.isComType)
    },
    getComInfo (page, type) { // 保险公司查询
      this.com_dialog = true
      let data = {}
      this.sizeList = [5, 10, 20, 50]
      this.currentD = page
      data = {
        'insurerCode': this.searchData.companyCode,
        'insurerName': this.searchData.companyName,
        'currentPage': page,
        'pageSize': this.pageSizeD,
        'type': '2',
        'clickType': '2'
      }
      this.getInsComDiffer(data).then(resp => {
        if (resp.code === '000000') {
          this.insComTableData = resp.data.data
          this.totalRecordsD = resp.data.totalRecords
        } else {
          this.open('error', resp.msg)
        }
      })
    },
    closeCom () {
      this.com_dialog = false
      this.searchData.companyCode = ''
      this.searchData.companyName = ''
      this.sizeList = []
    },
    closeDailog () {
      return new Promise((resolve, reject) => {
        this.com_dialog = false
        resolve()
      })
    },
    importEx () {
      window.open(`/tabycore/lifeDiff/exportExcel?companyCode=${this.searchData.companyCode}&companyName=${this.searchData.companyName}&acceptDate=${this.searchData.acceptDate}`)
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
      'insBillDiffer',
      'getInsComDiffer'
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
  .batch .el-button { width: inherit; height: inherit; line-height: inherit; font-size: inherit; padding: 10px; }
  .el-input__icon { line-height: inherit;}
</style>

