<template>
  <div id="author_copy">
    <ui-notice-bar slot="breadcast" >
      <el-breadcrumb slot="location" separator=">">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>系统管理</el-breadcrumb-item>
          <el-breadcrumb-item>人员权限设置</el-breadcrumb-item>
          <el-breadcrumb-item>权限完全复制</el-breadcrumb-item>
        </el-breadcrumb>
    </ui-notice-bar>
    <el-form style="margin: 20px 0; ">
      <el-row class="ri-line">
        <el-col :span="12">
          <ui-label-text labelWidth="120" label="源员工" ></ui-label-text>
        </el-col>
        <el-col :span="12">
          <ui-label-text labelWidth="120" label="目标员工" ></ui-label-text>
        </el-col>
      </el-row>
      <el-row class="ri-line">
        <el-col :span="12">
            <ui-label-text labelWidth="120" label="源员工代码:" >
            <el-input v-model="info.oricode" clearable slot="text" @dblclick.native="getEmployee(1)" placeholder="双击选择" @blur="empBlur($event, 0)"></el-input>
          </ui-label-text>
        </el-col>
        <el-col :span="12">
          <ui-label-text labelWidth="120" label="目标员工代码:" >
            <el-input v-model='info.tarcode' placeholder="双击选择" @dblclick.native="getTargetEmp(1)" slot="text" clearable></el-input>
          </ui-label-text>
        </el-col>
      </el-row>
      <el-row class="ri-line">
        <el-col :span="12">
            <ui-label-text labelWidth="120" label="源员工姓名:" >
            <el-input v-model="info.oriname" placeholder="双击选择" @dblclick.native="getEmployee(1)"  @blur="empBlur($event, 0)"  slot="text" clearable ></el-input>
          </ui-label-text>
        </el-col>
        <el-col :span="12">
          <ui-label-text labelWidth="120" label="目标员工姓名:" >
            <el-input v-model='info.tarname' placeholder="双击选择"  slot="text" clearable ></el-input>
          </ui-label-text>
        </el-col>
      </el-row>
    </el-form>
    <div class="btn-container" slot="controlbar" >
      <el-button type="primary" @click.native.prevent="put()">提交</el-button>
    </div>
    <!-- 员工弹框 -->
    <el-dialog title="源员工" :before-close='closeEmployee' :append-to-body='true' :visible.sync="emp_dialog" width="50%" center>
      <el-table stripe @row-click='selectRowEmp' ref="multipleTable" :data="searchTableData" >
        <el-table-column prop="agentCode" label="员工代码" center ></el-table-column>
        <el-table-column prop="agentName" label="员工名称" center ></el-table-column>
      </el-table>
      <div class="pagination" >
        <el-pagination @size-change="empSizeChange" @current-change='empCurrentChange' :current-page.sync="currentD" :pager-count='5' :page-size='5' :page-sizes='sizeList' :total="totalRecordsD" layout="total, sizes, prev, pager, next, jumper" > </el-pagination>
      </div>
    </el-dialog>
    <!-- 目标员工弹框 -->
    <el-dialog title="源员工" :before-close='closeTarget' :append-to-body='true' :visible.sync="tar_dialog" width="50%" center>
      <el-table stripe @row-click='selectRowTar' ref="multipleTable" :data="tableData" >
        <el-table-column prop="agentCode" label="员工代码" center ></el-table-column>
        <el-table-column prop="agentName" label="员工名称" center ></el-table-column>
      </el-table>
      <div class="pagination" >
        <el-pagination @size-change="tarSizeChange" @current-change='tarCurrentChange' :current-page.sync="currentD" :pager-count='5' :page-size='5' :page-sizes='sizeList' :total="totalRecordsD" layout="total, sizes, prev, pager, next, jumper" > </el-pagination>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import NoticeBar from '@/components/notice-bar'
import LabelText from '@/components/label-text'
import { mapActions } from 'vuex'
export default {
  name: '',
  data () {
    return {
      info: {
        oricode: '',
        oriname: '',
        tarcode: '',
        tarname: ''
      },
      pageSizeD: 5,
      totalRecordsD: 0, // 分页总条数
      totalPagesD: '', // 分页总页数
      currentD: 1,
      loading: '',
      emp_dialog: false,
      searchTableData: [],
      sizeList: [5, 10, 20, 50],
      tableData: [],
      tar_dialog: false
    }
  },
  mounted () {
  },
  watch: {
    'info.oricode' () {
      if (this.info.oricode === '') {
        this.info.oriname = ''
        this.info.tarcode = ''
        this.info.tarname = ''
      }
    },
    'info.oriname' () {
      if (this.info.oriname === '') {
        this.info.oricode = ''
        this.info.tarcode = ''
        this.info.tarname = ''
      }
    },
    'info.tarcode' () {
      if (this.info.tarcode === '') {
        this.info.tarname = ''
      }
    },
    'info.tarname' () {
      if (this.info.oriname === '') {
        this.info.tarcode = ''
      }
    }
  },
  methods: {
    getEmployee (page) { // 双击选择源员工
      let postData = {
        'agentCode': this.info.oricode,
        'agentName': this.info.oriname,
        'currentPage': page,
        'pageSize': this.pageSizeD,
        'validStatus': '1',
        'clickType': '2'
      }
      this.currentD = page
      this.sizeList = [5, 10, 20, 50]
      this.queryAuth(postData).then(resp => {
        if (resp.code === '000000') {
          this.emp_dialog = true
          this.searchTableData = resp.data.content
          this.totalRecordsD = resp.data.totalElements
        } else {
          this.open('error', resp.msg)
        }
      })
    },
    empBlur (event, tag) {
      if (this.emp_dialog || this.info.oricode === '') {
        return false
      }
      let agentCode = ''
      let agentName = ''
      if (tag === 0) {
        agentCode = this.info.oricode
      } else {
        agentName = this.info.oriname
      }
      let postData = {
        'agentCode': agentCode,
        'agentName': agentName,
        'currentPage': 1,
        'pageSize': '5',
        'validStatus': '1',
        'clickType': '1'
      }
      this.queryAuth(postData).then(resp => {
        if (resp.code === '000000') {
          this.info.oricode = resp.data.agentCode
          this.info.oriname = resp.data.agentName
        } else {
          this.info.oricode = ''
          this.info.oriname = ''
          this.open('error', resp.msg)
        }
      })
    },
    selectRowEmp (row) { // 选择源员工
      this.closeDailog().then(() => {
        this.info.oricode = row.agentCode
        this.info.oriname = row.agentName
        this.info.originId = row.id
        this.emp_dialog = false
        this.pageSizeD = 5
        this.sizeList = []
      })
    },
    empSizeChange (val) { // 分页size改变
      this.pageSizeD = val
      this.getEmployee(1)
    },
    empCurrentChange (val) { // 分页改变
      this.getEmployee(val)
    },
    closeEmployee () { // 关闭弹框
      this.info.oricode = ''
      this.info.oriname = ''
      this.emp_dialog = false
      this.pageSizeD = 5
      this.sizeList = []
    },
    closeDailog () {
      return new Promise((resolve, reject) => {
        this.com_dialog = false
        resolve()
      })
    },
    getTargetEmp (page) { // 目标员工弹框
      if (this.info.oricode === '') {
        this.open('error', '请先选择源员工！')
        return false
      }
      let postData = {
        'code': this.info.oricode,
        'agentCode': this.info.tarcode,
        'agentName': this.info.tarname,
        'currentPage': page,
        'pageSize': this.pageSizeD
      }
      this.currentD = page
      this.sizeList = [5, 10, 20, 50]
      this.getUserTo(postData).then(resp => {
        if (resp.code === '000000') {
          this.tar_dialog = true
          this.tableData = resp.data.content
          this.totalRecordsD = resp.data.totalElements
        } else {
          this.open('error', resp.msg)
        }
      })
    },
    selectRowTar (row) { // 选择目标员工
      this.closeDailog().then(() => {
        this.info.tarcode = row.agentCode
        this.info.tarname = row.agentName
        this.info.targetId = row.id
        this.tar_dialog = false
        this.pageSizeD = 5
        this.sizeList = []
      })
    },
    tarSizeChange (val) { // 分页size改变
      this.pageSizeD = val
      this.getTargetEmp(1)
    },
    tarCurrentChange (val) { // 分页改变
      this.getTargetEmp(val)
    },
    closeTarget () { // 关闭弹框
      this.info.tarcode = ''
      this.info.tarname = ''
      this.tar_dialog = false
      this.pageSizeD = 5
      this.sizeList = []
    },
    put () {
      if (this.info.oricode === '') {
        this.open('error', '请选择源员工！')
        return false
      }
      if (this.info.tarcode === '') {
        this.open('error', '请选择目标员工！')
        return false
      }
      this.Loading()
      this.copyQuality(this.info).then(resp => {
        this.closeLoading()
        if (resp.data.code === '000000') {
          this.open('success', '复制成功！')
        } else {
          this.open('error', resp.data.msg)
        }
      }).catch(error => {
        this.closeLoading()
        return error
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
    open (type, mesg) {
      this.$message({
        showClose: true,
        message: mesg,
        type: type
      })
    },
    ...mapActions([
      'getAllUser',
      'getUserTo',
      'copyQuality',
      'queryAuth'
    ])
  },
  components: {
    [NoticeBar.name]: NoticeBar,
    [LabelText.name]: LabelText
  },
  created () {
  },
  computed: {
    fresultNum () {
      return this.fnum
    },
    tresultNum () {
      return this.tnum
    }
  }
}
</script>

<style lang="scss" type="text/css">
#author_copy {
  padding-left: 30px;
  padding-right: 30px;

  .users-wrapper {
    .el-main {
      border: 1px solid #efefef;
      ul {
        list-style: none;
        li {
          padding: 4px 0;
          cursor: pointer;
          &:hover, &.active, &:active, &:focus {
            background: #ecf5ff
          }
        }
      }
    }
  }
}
.btn-container {
  text-align: center;
  margin-top: 60px;
  margin-bottom: 30px;
}
.ri-line {
  margin-top: 10px;
  margin-bottom: 10px;
}

</style>
