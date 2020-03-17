<template>
  <div id="recursion" >
    <ui-notice-bar slot="breadcast" >
      <el-breadcrumb slot="location" separator=">">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>寿险业务管理</el-breadcrumb-item>
          <el-breadcrumb-item>离职单递归提醒</el-breadcrumb-item>
        </el-breadcrumb>
    </ui-notice-bar>
    <el-form class="manage_form" :model="searchData"  ref="searchData" :rules="rule">
      <el-row>
        <el-col :span="12">
          <el-form-item >
            <ui-label-text label="省级分公司代码：" labelWidth="150" >
              <el-input slot="text" v-model="searchData.comCode" placeholder="双击选择" clearable  @dblclick.native="getAllProCom(1, 0, $event)" ></el-input>
            </ui-label-text>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item >
            <ui-label-text label="省级分公司名称：" labelWidth="150" >
              <el-input slot="text" v-model="searchData.comName" placeholder="双击选择" clearable  @dblclick.native="getAllProCom(1, 0, $event)"></el-input>
            </ui-label-text>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item >
            <ui-label-text label="地市级分公司代码：" labelWidth="150" >
              <el-input slot="text" v-model="searchData.comComCode" placeholder="双击选择" clearable  @dblclick.native="getAllCityCom(1, 1, $event)"  ></el-input>
            </ui-label-text>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item >
            <ui-label-text label="地市级分公司名称：" labelWidth="150" >
              <el-input slot="text" v-model="searchData.comComName" placeholder="双击选择" clearable  @dblclick.native="getAllCityCom(1, 1, $event)"  ></el-input>
            </ui-label-text>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form-item name='dateArr' prop="dateArr">
            <ui-label-text :required="true" label="保单生效日期：" labelWidth="150" >
              <el-date-picker slot="text" unlink-panels v-model="searchData.dateArr" type="daterange" value-format="yyyy-MM-dd" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" placeholder="选择日期"></el-date-picker>
            </ui-label-text>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <!-- 基础操作 -->
    <div class='btn-container'>
      <el-button type="primary" @click="query(1)">查询</el-button>
      <el-button type="primary" @click="onexport">导出</el-button>
    </div>
    <!-- 查询结果 -->
    <el-table stripe ref="multipleTable" :data="searchTableData" v-if='isShowTable' tooltip-effect="dark" style="width: 100%;" >
      <el-table-column prop="comName" label="省级分公司" ></el-table-column>
      <el-table-column prop="comComName" label="地市级分公司" ></el-table-column>
      <el-table-column prop="sumPolicyNo" label="生效保单总计"  > </el-table-column>
      <el-table-column prop="leavePolicyNo" label="须递归保单">
        <template slot-scope="scope">
          <a href="javascript:void(0)"  @click="detailBill(scope.row, '1')">{{scope.row.leavePolicyNo}}</a>
        </template>
      </el-table-column>
      <el-table-column prop="inLeavePolicyNo" label="已递归保单"  >
        <template slot-scope="scope">
          <a href="javascript:void(0)" @click="detailBill(scope.row, '2')">{{scope.row.inLeavePolicyNo}}</a>
        </template>
      </el-table-column>
      <el-table-column prop="personLeavePolicyNo" label="人工递归保单">
        <template slot-scope="scope">
          <a href="javascript:void(0)" @click="detailBill(scope.row, '3')">{{scope.row.personLeavePolicyNo}}</a>
        </template>
      </el-table-column>
      <el-table-column prop="sysLeavePolicyNo" label="强制递归保单">
        <template slot-scope="scope">
          <a href="javascript:void(0)" @click="detailBill(scope.row, '4')">{{scope.row.sysLeavePolicyNo}}</a>
        </template>
      </el-table-column>
      <el-table-column prop="notLeavePolicyNo" label="未递归保单">
        <template slot-scope="scope">
          <a href="javascript:void(0)" @click="detailBill(scope.row, '5')">{{scope.row.notLeavePolicyNo}}</a>
        </template>
      </el-table-column>
      <el-table-column prop="policyNoRate" label="递归率"></el-table-column>
    </el-table>
    <!-- 查询分页 -->
    <div class="pagination" v-if='isShowTable'>
      <el-pagination @size-change="searchSizeChange" @current-change='handleCurrentChange' :current-page.sync="current" :pager-count='5' :page-size='5' :page-sizes='[5, 10, 20, 50]' :total="totalRecords" layout="total, sizes, prev, pager, next, jumper" :page-count="totalPages"></el-pagination>
    </div>
    <!-- 须递归保单弹框 -->
    <el-dialog :append-to-body='true' :before-close='closeDetail' center width='70%' title="递归保单详情"  :visible.sync="isShow" >
      <el-table stripe ref="multipleTable" :data="recursionData"  tooltip-effect="dark" style="width: 100%;" >
        <el-table-column prop="comName" label="省级分公司" ></el-table-column>
        <el-table-column prop="comComName" label="地市级分公司" ></el-table-column>
        <el-table-column prop="policyNo" label="保单号" ></el-table-column>
        <el-table-column prop="generateDate" label="保单生效日期" ></el-table-column>
        <el-table-column prop="oldAgentCode" label="递归前业务员代码" ></el-table-column>
        <el-table-column prop="oldAgentName" label="递归前业务员名称" ></el-table-column>
        <el-table-column prop="outTime" label="递归前业务员离职日期" ></el-table-column>
        <el-table-column prop="newAgentCode" label="递归后业务员代码" ></el-table-column>
        <el-table-column prop="newAgentName" label="递归后业务员名称" ></el-table-column>
        <el-table-column prop="leaveDate" label="递归操作日期" ></el-table-column>
      </el-table>
        <!-- 查询分页 -->
      <div class="pagination" v-if='isShow'>
        <el-pagination @size-change="detailSizeChange" @current-change='detailCurrentChange' :current-page.sync="currentDetail" :pager-count='5' :page-size='5' :page-sizes='sizeListDetail' :total="totalRecordsDetail" layout="total, sizes, prev, pager, next, jumper" :page-count="totalPages"></el-pagination>
      </div>
      <div class='btn-container'>
        <el-button type="primary" @click="detailExport">导出</el-button>
      </div>
    </el-dialog>
    <!-- 获取省级地市分公司 -->
    <el-dialog :before-close='closeCom' :append-to-body='true' :visible.sync="com_dialog" width="50%" center>
      <el-table stripe @row-click='selectRowCom' ref="multipleTable" :data="searchComTableData" >
        <el-table-column prop="comCode" label="公司代码" center ></el-table-column>
        <el-table-column prop="comCName" label="公司名称" center ></el-table-column>
      </el-table>
      <div class="pagination" >
        <el-pagination @size-change="comSizeChange" @current-change='comCurrentChange' :current-page.sync="currentD" :pager-count='5' :page-size='5' :page-sizes='sizeList'  :total="totalRecordsD" layout="total, sizes, prev, pager, next, jumper" > </el-pagination>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import NoticeBar from '@/components/notice-bar'
import LineTittle from '@/components/line-tittle'
import LabelText from '@/components/label-text'
import { mapActions } from 'vuex'
// import IsEmpty from '@/utils/IsEmpty'
// import {
//   api
// } from '@/api/lifeInsur_mgr/quitListMgr.js'
export default {
  name: '',
  data () {
    return {
      searchData: {
        comCode: '',
        comName: '',
        comComCode: '',
        comComName: '',
        startDate: '',
        endDate: '',
        currentPage: 1,
        dateArr: ''
      },
      postList: {},
      current: 1,
      pageSize: 5,
      totalPages: 0,
      totalRecords: 0,
      searchTableData: [
      ],
      isShowTable: false,
      isShow: false,
      pageSizeDetail: 5,
      totalRecordsDetail: 0,
      totalPagesDetail: 0,
      currentDetail: 1,
      sizeListDetail: [],
      recursionData: [],
      type: '',
      com_dialog: false,
      searchComTableData: [],
      sizeList: [],
      currentD: 1,
      pageSizeD: 5,
      totalPagesD: 0,
      totalRecordsD: 0,
      isComType: '',
      comCodeOrName: '',
      openDetailData: '',
      rule: {
        dateArr: [
          { required: true, message: '请输入保单生效日期', trigger: 'change' }
        ]
      },
      loading: ''
    }
  },
  mounted () {
  },
  watch: {
    'searchData.comCode' () {
      if (this.searchData.comCode === '') {
        this.searchData.comName = ''
        this.searchData.comComCode = ''
        this.searchData.comComName = ''
      }
    },
    'searchData.comName' () {
      if (this.searchData.comName === '') {
        this.searchData.comCode = ''
        this.searchData.comComCode = ''
        this.searchData.comComName = ''
      }
    },
    'searchData.comComCode' () {
      if (this.searchData.comComCode === '') {
        this.searchData.comComName = ''
      }
    },
    'searchData.comComName' () {
      if (this.searchData.comComName === '') {
        this.searchData.comComName = ''
      }
    }
  },
  methods: {
    query (page) { // 基础查询
      this.$refs['searchData'].validate((valid) => {
        if (valid) {
          this.searchData.startDate = this.searchData.dateArr[0]
          this.searchData.endDate = this.searchData.dateArr[1]
          this.searchData.currentPage = page
          this.current = page
          this.searchData.pageSize = this.pageSize
          this.postList = JSON.parse(JSON.stringify(this.searchData))
          this.Loading()
          this.searchList(this.searchData).then(resp => {
            this.closeLoading()
            if (resp.code === '000000') {
              this.isShowTable = true
              this.searchTableData = resp.data.content
              this.totalPages = resp.data.totalPages
              this.totalRecords = resp.data.totalElements
            } else {
              this.open('error', resp.msg)
            }
          })
        } else {
          return false
        }
      })
    },
    postPage (post) {
      this.Loading()
      this.queryListPage(post).then(resp => {
        this.closeLoading()
        if (resp.code === '000000') {
          this.isShowTable = true
          this.searchTableData = resp.data.content
          this.totalPages = resp.data.totalPages
          this.totalRecords = resp.data.totalElements
        } else {
          this.open('error', resp.msg)
        }
      })
    },
    handleCurrentChange (val) {
      this.current = val
      this.postList.currentPage = val
      this.postPage(this.postList)
    },
    searchSizeChange (val) {
      this.pageSize = val
      this.postList.pageSize = this.pageSize
      this.current = 1
      this.postList.currentPage = 1
      this.postPage(this.postList)
    },
    onexport () { // 导出
      this.$refs['searchData'].validate((valid) => {
        if (valid) {
          this.searchData.startDate = this.searchData.dateArr[0]
          this.searchData.endDate = this.searchData.dateArr[1]
          window.open(`/tabycore/leaveAgent/downloadLeaveAgent?comCode=${this.searchData.comCode}&comName=${this.searchData.comName}&comComCode=${this.searchData.comComCode}&comComName=${this.searchData.comComName}&startDate=${this.searchData.startDate}&endDate=${this.searchData.endDate}`)
        } else {
          return false
        }
      })
    },
    detailExport () { // 详情导出
      this.$refs['searchData'].validate((valid) => {
        if (valid) {
          this.searchData.startDate = this.searchData.dateArr[0]
          this.searchData.endDate = this.searchData.dateArr[1]
          window.open(`/tabycore/leaveAgent/downloadLeaveAgentDetail?comCode=${this.openDetailData.comCode}&comName=${this.openDetailData.comName}&comComCode=${this.openDetailData.comComCode}&comComName=${this.openDetailData.comComName}&startDate=${this.openDetailData.startDate}&endDate=${this.openDetailData.endDate}&type=${this.type}`)
        } else {
          return false
        }
      })
    },
    detailBill (row, type) {
      this.$refs['searchData'].validate((valid) => {
        if (valid) {
          this.openDetailData = row
          this.type = type
          this.postBill(1)
        }
      })
    },
    postBill (page) {
      this.currentDetail = page
      var postData = {
        type: this.type,
        comCode: this.openDetailData.comCode,
        comName: this.openDetailData.comName,
        comComCode: this.openDetailData.comComCode,
        comComName: this.openDetailData.comComName,
        startDate: this.openDetailData.startDate,
        endDate: this.openDetailData.endDate,
        currentPage: page,
        pageSize: this.pageSizeDetail
      }
      this.sizeListDetail = [5, 10, 20, 50]
      this.Loading()
      this.leaveAgentDetail(postData).then(resp => {
        this.closeLoading()
        if (resp.code === '000000') {
          this.recursionData = resp.data.content
          console.log(resp.data.totalElements)
          this.totalRecordsDetail = resp.data.totalElements
          this.totalPagesDetail = resp.data.totalPages
          this.isShow = true
        } else {
          this.open('error', resp.msg)
        }
      })
    },
    detailCurrentChange (val) { // 选择分页
      this.postBill(val)
    },
    detailSizeChange (val) {
      this.pageSizeDetail = val
      this.currentDetail = 1
      this.postBill(1)
    },
    closeDetail () {
      this.sizeListDetail = []
      this.openDetailData = ''
      this.pageSizeDetail = 5
      this.isShow = false
    },
    closeCom () {
      this.sizeList = []
      if (this.isComType === 0) {
        this.searchData.comCode = ''
        this.searchData.comName = ''
      } else {
        this.searchData.comComCode = ''
        this.searchData.comComName = ''
      }
      this.pageSizeD = 5
      this.com_dialog = false
    },
    getAllProCom (page, tag, event) { // 获取公司
      this.sizeList = [5, 10, 20, 50]
      this.isComType = tag // 0 省级 1 地市
      this._event = event
      this.comCodeOrName = event.target.value
      this.currentD = page
      let postData = {
        'currentPage': page,
        'comCodeOrName': this.comCodeOrName,
        'pageSize': this.pageSizeD,
        'clickType': '2'
      }
      this.getAllComP_quitList(postData).then(resp => {
        if (resp.code === '000000' || resp.code === '000002') {
          if (resp.code === '000002') {
            this.searchComTableData = []
          } else {
            this.searchComTableData = resp.data.data
          }
          this.com_dialog = true
          this.totalPagesD = resp.data.totalPages
          this.totalRecordsD = resp.data.totalRecords
        }
      })
    },
    getAllCityCom (page, tag, event) { // 获取地市级公司
      this.sizeList = [5, 10, 20, 50]
      this.isComType = tag // 0 省级 1 地市
      this._event = event
      this.comCodeOrName = event.target.value
      this.currentD = page
      if (this.searchData.comCode === '') {
        this.open('warning', '请先选择省级分公司！')
        return false
      }
      let postData = {
        'upperComCode': this.searchData.comCode,
        'currentPage': page,
        'comCodeOrName': this.comCodeOrName,
        'pageSize': this.pageSizeD,
        'clickType': '2'
      }
      this.getAllComC_quitList(postData).then(resp => {
        if (resp.code === '000000' || resp.code === '000002') {
          if (resp.code === '000002') {
            this.searchComTableData = []
          } else {
            this.searchComTableData = resp.data.data
          }
          this.com_dialog = true
          this.totalPagesD = resp.data.totalPages
          this.totalRecordsD = resp.data.totalRecords
        }
      })
    },
    selectRowCom (row) { // 公司选择
      this.closeDailog().then(() => {
        row = JSON.parse(JSON.stringify(row))
        if (this.isComType === 0) {
          this.searchData.comCode = row.comCode
          this.searchData.comName = row.comCName
        } else if (this.isComType === 1) {
          this.searchData.comComCode = row.comCode
          this.searchData.comComName = row.comCName
        }
        this.com_dialog = false
      })
    },
    comCurrentChange (val) { // 选择分页
      if (this.isComType === 0) {
        this.getAllProCom(val, this.isComType, this._event)
      } else {
        this.getAllCityCom(val, this.isComType, this._event)
      }
    },
    comSizeChange (val) {
      this.pageSizeD = val
      if (this.isComType === 0) {
        this.getAllProCom(1, this.isComType, this._event)
      } else {
        this.getAllCityCom(1, this.isComType, this._event)
      }
    },
    closeDailog () {
      return new Promise((resolve, reject) => {
        this.pageSizeD = 5
        this.sizeList = []
        this.com_dialog = false
        resolve()
      })
    },
    open (types, mesg) { // 提示
      this.$message({
        message: mesg,
        type: types
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
      'searchList',
      'leaveAgentDetail',
      'getAllComP_quitList',
      'getAllComC_quitList',
      'queryListPage'
    ])
  },
  computed: {
  },
  components: {
    [NoticeBar.name]: NoticeBar,
    [LineTittle.name]: LineTittle,
    [LabelText.name]: LabelText
  }
}
</script>

<style lang="scss" scoped type="text/css">
  #recursion{
    padding: 0px 30px 30px 30px;
  }
  #recursion .manage_form { margin-top: 20px; }
  .btn-container { text-align: center; margin: 20px auto; }

</style>
<style lang="scss" type="text/css">
  #recursion .el-form-item__error{
    left: 150px;
  }
</style>
