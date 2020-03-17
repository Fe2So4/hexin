<template>
  <div id="orgadd" >
      <ui-notice-bar slot="breadcast" >
        <el-breadcrumb slot="location" separator=">">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>保监会报表</el-breadcrumb-item>
            <el-breadcrumb-item>寿险保监会报表管理</el-breadcrumb-item>
          </el-breadcrumb>
      </ui-notice-bar>
      <div class="ri-content" slot="content" >
        <el-form ref="fenxiaoMonthlyBillList" :rules="rules" :model="fenxiaoMonthlyBillList">
          <el-row class="ri-line">
            <!-- <el-col :span="12">
              <el-form-item prop='companyCode'>
                <ui-label-text labelWidth="120" label="机构名称：" :required="true">
                  <el-input v-model="fenxiaoMonthlyBillList.companyCode" slot='text' clearable @blur='opensingleComDialog()' @dblclick.native="openComDialog()" placeholder="双击可选择"></el-input>
                </ui-label-text>
              </el-form-item>
            </el-col> -->
            <el-col :span="12">
              <el-form-item prop="year">
                <ui-label-text labelWidth="200" label="导出日期:" required=true>
                  <el-date-picker
                    v-model="fenxiaoMonthlyBillList.year"
                    slot="text"
                    type="month"
                    value-format="yyyy-MM">
                  </el-date-picker>
                </ui-label-text>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item prop="type">
                <ui-label-text labelWidth="200" label="下载类型:" required=true>
                  <el-select v-model="fenxiaoMonthlyBillList.type" slot="text" placeholder="请选择">
                    <el-option label="实际" value="0"></el-option>
                    <el-option label="上报" value="1"></el-option>
                  </el-select>
                </ui-label-text>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
        <div class="btn-container">
          <el-button type="primary" :disabled="quanxian.baojianMake" @click="makeReportList">生成</el-button>
          <!-- <el-button type="primary" @click="submitForm('fenxiaoMonthlyBillList',1)">查询</el-button> -->
          <el-button type="primary" :disabled="quanxian.export" @click="submitForm('fenxiaoMonthlyBillList')">导出</el-button>
        </div>
      </div>
      <el-dialog title="提示信息" center :append-to-body='true' :visible.sync='makeReportListTip'>
        <span class="center">寿险保监会报表生成时间可能较长，请耐心等待</span>
        <div class="btn-container">
          <el-button @click="goMakeReportList">确定</el-button>
          <el-button @click="makeReportListTip = false">取消</el-button>
        </div>
      </el-dialog>
      <el-dialog title="错误信息" center :append-to-body='true' :visible.sync='errorReport'>
        <span class="center">{{errorReportListTip}}</span>
        <div class="btn-container">
          <el-button @click="errorReport = false">返回</el-button>
        </div>
      </el-dialog>
      <ComDialog :vis='comDialog1' :workerVis='comDialogworker1' :comVis='comDialogCom1' :newTableData='tempTableData1' @onClose='comDialogClosing()' @selectDialog='dialogBackData1' @comdialogChangePageFunction='changeComdialogPage1' @comdialogChangePageSizeFunction='changeComdialogPageSize1' :fenyetotal='fenyetotalData'/>
      <!-- <div v-if='tableShowOrNot'>
        <el-table id="dataTable" :data="renderTableData" ref="multipleTable" tooltip-effect="dark" style="width: 100%"
        >
          <el-table-column prop="lifereportid" label="差异类型"  width="140">
          </el-table-column>
          <el-table-column prop="companyCode" label="保单年度"  width="150">
          </el-table-column>
          <el-table-column prop="newpremium" label="佰盈分公司" show-overflow-tooltip>
          </el-table-column>
          <el-table-column prop="XQREALFEE" label="差异类型"  width="140">
          </el-table-column>
          <el-table-column prop="newcommission" label="保单年度"  width="150">
          </el-table-column>
          <el-table-column prop="XQCOUNTFEE" label="佰盈分公司" show-overflow-tooltip>
          </el-table-column>
        </el-table>
        <div class="block">
          <el-pagination
            @current-change="handleCurrentChange"
            :current-page="fenxiaoMonthlyBillList.currentPage"
            @size-change="handleSizeChange"
            :page-sizes="[10,20,50]"
            layout="total, sizes, prev, pager, next, jumper"
            :total="fenyetotalData1"
            >
          </el-pagination>
        </div>
      </div> -->
  </div>
</template>

<script>
import NoticeBar from '@/components/notice-bar'
import LineTittle from '@/components/line-tittle'
import LabelText from '@/components/label-text'
import IsEmpty from '@/utils/IsEmpty'
import { mapActions } from 'vuex'
import {
  api
} from '@/api/lifeInsur_mgr/quitListMgr.js'
import ComDialog from '@/components/comDialog'
export default {
  data () {
    return {
      rules: {
        year: [{ required: true, message: '请输入导出日期', trigger: 'blur' }],
        type: [{ required: true, message: '请输入下载类型', trigger: 'blur' }]
      },
      fenxiaoMonthlyBillList: {
        year: '',
        type: '1',
        pageNo: 1,
        pageSize: 10
      },
      quanxian: {
        baojianMake: true,
        export: true
      },
      tableShowOrNot: false,
      orgQueryInfo: {
        clickType: '2',
        comCodeOrName: '',
        currentPage: 1,
        pageSize: 10
      },
      tempTableData1: [],
      comDialog1: false,
      comDialogCom1: false,
      comDialogworker1: false,
      makeReportListTip: false,
      fenyetotalData: 0,
      fenyetotalData1: 0,
      errorReportListTip: '',
      errorReport: false
    }
  },
  mounted () {
    api(`/auth/findButtonByUserCodeAndPage?userId=${this.$store.state.login.loginUserId}&page=寿险保监会报表`, 'get').then(result => {
      console.log(result)
      if (result.data.code === '000000') {
        for (let i = 0; i < result.data.data.length; i++) {
          this.quanxian[result.data.data[i].code] = false
        }
      }
    }).catch((e) => {
      console.log(e)
    })
  },
  watch: {
  },
  methods: {
    ...mapActions([
      'contiListCheckDialogDataGet1'
    ]),
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          console.log('submit!')
          this.exportData()
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    // toast提示
    openToast (type, mesg, time = 0) {
      this.$message({
        showClose: true,
        message: mesg,
        type: type,
        duration: time
      })
    },
    comDialogClosing () {
      this.initshuangjiDialog()
      this.comDialog1 = false
      this.fenxiaoMonthlyBillList.companyCode = ''
    },
    dialogBackData1 (data) {
      this.initshuangjiDialog()
      this.comDialog1 = false
      let temp = []
      temp = data.split('-')
      this.fenxiaoMonthlyBillList.companyCode = temp[0]
    },
    changeComdialogPage1 (data) {
      this.orgQueryInfo.currentPage = data
      this.openComDialog()
    },
    changeComdialogPageSize1 (data) {
      this.orgQueryInfo.currentPage = 1
      this.orgQueryInfo.pageSize = data
      this.openComDialog()
    },
    initshuangjiDialog () {
      this.orgQueryInfo = {
        clickType: '2',
        comCodeOrName: '',
        currentPage: 1,
        pageSize: 10
      }
    },
    queryData () {
      // api('/lcReportManage/lcReportResultQuery', 'post', this.fenxiaoMonthlyBillList).then(result => {
      //   console.log(result)
      //   // if (result.data.code !== '000000') {
      //   //   this.openToast('warning', result.data.msg)
      //   // } else {
      //   //   this.totalRecords = result.data.data.totalElements
      //   //   this.tableData = result.data.data.content
      //   // }
      // }).catch((e) => {
      //   console.log(e)
      // })
    },
    exportData () {
      window.open(`/tabycore/lcReportManage/lifeDownload?year=${this.fenxiaoMonthlyBillList.year}&type=${this.fenxiaoMonthlyBillList.type}`)
    },
    makeReportList () {
      this.Loading()
      this.errorReportListTip = ''
      api(`/lcReportManage/lifeReportExecuteQuery?year=${this.fenxiaoMonthlyBillList.year}&type=${this.fenxiaoMonthlyBillList.type}`, 'get').then(result => {
        console.log(result)
        this.closeLoading()
        if (IsEmpty(result.data.msg)) {
          this.makeReportListTip = true
        } else {
          // this.openToast('warning', result.data.msg)
          this.errorReportListTip = result.data.msg
          this.errorReport = true
        }
      }).catch((e) => {
        console.log(e)
      })
    },
    goMakeReportList () {
      this.makeReportListTip = false
      api(`/lcReportManage/lifeReportExecuteNew?year=${this.fenxiaoMonthlyBillList.year}`, 'get').then(result => {
        console.log(result)
        if (result.data.code !== '000000' && !IsEmpty(result.data.code)) {
          this.openToast('warning', result.data.msg, 0)
        } else {
          this.openToast('success', '生成成功', 0)
        }
      }).catch((e) => {
        console.log(e)
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
    openComDialog () {
      this.orgQueryInfo.clickType = '2'
      this.orgQueryInfo.comCodeOrName = this.fenxiaoMonthlyBillList.companyCode
      this.contiListCheckDialogDataGet1(this.orgQueryInfo).then(
        (res) => {
          if (res.data.code !== '000000' && !IsEmpty(res.data.code)) {
            this.openToast('warning', res.data.msg, 0)
          } else {
            this.tempTableData1 = res.data.data.data
            this.fenyetotalData = res.data.data.totalRecords
            this.comDialog1 = true
            this.comDialogCom1 = true
            this.comDialogworker1 = false
            for (let i = 0; i < this.tempTableData1.length; i++) {
              this.tempTableData1[i]['renderData'] = `${this.tempTableData1[i].comCode}-${this.tempTableData1[i].comCName}`
            }
          }
        }
      )
    },
    opensingleComDialog () {
      if (!(this.comDialog1)) {
        this.orgQueryInfo.clickType = '1'
        this.orgQueryInfo.comCodeOrName = this.fenxiaoMonthlyBillList.companyCode
        this.contiListCheckDialogDataGet1(this.orgQueryInfo).then(
        (res) => {
          if (res.data.code !== '000000' && !IsEmpty(res.data.code)) {
            this.openToast('warning', res.data.msg, 0)
          } else {
            if (res.data.data.data.length === 1) {
              this.fenxiaoMonthlyBillList.companyCode = res.data.data.data[0].comCode
            }
          }
        })
      }
    },
    handleSizeChange (val) {
      this.fenxiaoMonthlyBillList.pageNo = 1
      this.fenxiaoMonthlyBillList.pageSize = val
      this.queryData()
    }
  },

  components: {
    [NoticeBar.name]: NoticeBar,
    [LineTittle.name]: LineTittle,
    [LabelText.name]: LabelText,
    ComDialog
  },
  created () {
  },
  computed: {
  }
}
</script>

<style>
#orgadd {
  padding-left: 30px;
  padding-right: 30px;
}
.btn-container{
  text-align: center;
  margin-bottom: 30px;
  margin-top: 60px;
}
.center{
  text-align: center;
}
.ri-line{
  margin-top: 10px;
  margin-bottom: 10px;
}
</style>
