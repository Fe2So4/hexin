<template>
  <div id="orgadd" >
      <ui-notice-bar slot="breadcast" >
        <el-breadcrumb slot="location" separator=">">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>寿险业务管理</el-breadcrumb-item>
            <el-breadcrumb-item>离职单批导结果查询</el-breadcrumb-item>
          </el-breadcrumb>
      </ui-notice-bar>
      <div class="ri-content" slot="content" >
      <el-form  ref="queryInfo" :rules="rules" :model="queryInfo">
        <el-row class="ri-line">
          <el-col :span=12>
            <el-form-item prop='policyNo'>
              <ui-label-text labelWidth="150" label="保单号：">
                <el-input v-model="queryInfo.policyNo" slot='text' clearable></el-input>
              </ui-label-text>
            </el-form-item>
          </el-col>
          <el-col :span=12>
            <el-form-item prop='message'>
              <ui-label-text labelWidth="180" label="操作结果：">
                <el-select v-model="queryInfo.message" slot="text" placeholder="请选择">
                  <el-option
                      label="成功"
                      value="1">
                  </el-option>
                  <el-option
                      label="失败"
                      value="2">
                  </el-option>
                </el-select>
              </ui-label-text>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row class="ri-line">
          <el-col :span=12>
            <el-form-item prop='comCode'>
              <ui-label-text labelWidth="150" label="省级分公司机构：" >
                <el-input v-model="queryInfo.comCode" slot="text" @dblclick.native="openComDialog(0)" placeholder="双击可选择" clearable></el-input>
              </ui-label-text>
            </el-form-item>
          </el-col>
          <el-col :span=12>
            <el-form-item prop='comComCode'>
              <ui-label-text labelWidth="180" label="地市级分公司机构：" >
                <el-input v-model="queryInfo.comComCode" slot="text" @dblclick.native="openComDialog(1)" placeholder="双击可选择" clearable></el-input>
              </ui-label-text>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row class="ri-line">
          <el-col :span=12>
            <el-form-item prop='time'>
              <ui-label-text labelWidth="180" label="操作时间：" >
                <el-date-picker
                  v-model="queryInfo.time"
                  type="daterange"
                  slot="text"
                  value-format="yyyy-MM-dd"
                  range-separator="至"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期">
                </el-date-picker>
              </ui-label-text>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      </div>
      <ComDialog :vis='comDialog' :workerVis='comDialogworker' :comVis='comDialogCom' :newTableData='tempTableData1' @onClose='comDialogClosing(0)' @selectDialog='dialogBackData' @comdialogChangePageFunction='changeComdialogPage1' @comdialogChangePageSizeFunction='changeComdialogPageSize1' :fenyetotal='fenyetotalData'/>
      <ComDialog :vis='comDialog1' :workerVis='comDialogworker1' :comVis='comDialogCom1' :newTableData='tempTableData2' @onClose='comDialogClosing(1)' @selectDialog='dialogBackData1' @comdialogChangePageFunction='changeComdialogPage2' @comdialogChangePageSizeFunction='changeComdialogPageSize2' :fenyetotal='fenyetotalData'/>
      <div class="btn-container" slot="controlbar" >
          <el-button type="primary" @click.native.prevent="submitForm('queryInfo')">查询</el-button>
          <el-button type="primary" @click.native.prevent="export1()">导出</el-button>
      </div>
      <div v-if='tableShowOrNot'>
        <el-table stripe ref="multipleTable" tooltip-effect="dark" style="width: 100%" :data='tableData'
        >
          <el-table-column prop="policyno" label="保单号"  width="350" show-overflow-tooltip>
            <!-- <template slot-scope="scope">{{ scope.row.date }}</template> -->
          </el-table-column>
          <el-table-column prop="comcomcode" label="所属机构代码"  width="150" show-overflow-tooltip>
            <!-- <template slot-scope="scope">{{ scope.row.date }}</template> -->
          </el-table-column>
          <el-table-column prop="comcomname" label="所属机构名称" width="390" show-overflow-tooltip>
          </el-table-column>
          <el-table-column prop="oldagentcode" label="原业务员代码" width="120" show-overflow-tooltip>
          </el-table-column>
          <el-table-column prop="oldagentname" label="原业务员名称" width="120" show-overflow-tooltip>
          </el-table-column>
          <el-table-column prop="agentcode" label="新业务员代码" width="120" show-overflow-tooltip>
          </el-table-column>
          <el-table-column prop="agentname" label="新业务员名称" width="200" show-overflow-tooltip>
          </el-table-column>
          <el-table-column prop="agenttypename" label="服务人员姓名" width="120" show-overflow-tooltip>
          </el-table-column>
          <el-table-column prop="agenttype" label="人员类型" width="120" show-overflow-tooltip>
          </el-table-column>
          <el-table-column prop="createusername" label="操作人" width="120" show-overflow-tooltip>
          </el-table-column>
          <el-table-column prop="datestr" label="操作时间" width="350" show-overflow-tooltip>
          </el-table-column>
          <el-table-column prop="message" label="操作结果" width="120" show-overflow-tooltip>
          </el-table-column>
          <el-table-column prop="messageinfo" label="失败原因" width="350" show-overflow-tooltip>
          </el-table-column>
        </el-table>
        <div class="block">
          <el-pagination
            @current-change="handleCurrentChange"
            :current-page="queryInfo.currentPage"
            :page-size ="queryInfo.pageSize"
            @size-change="handleSizeChange"
            :page-sizes="[10,20,50]"
            :total="fenyetotalData1"
            layout="total, sizes, prev, pager, next, jumper"
            >
          </el-pagination>
        </div>
      </div>
  </div>
</template>

<script>
import NoticeBar from '@/components/notice-bar'
import LineTittle from '@/components/line-tittle'
import LabelText from '@/components/label-text'
import { mapActions } from 'vuex'
import ComDialog from '@/components/comDialog'
import IsEmpty from '@/utils/IsEmpty'
import {
  api
} from '@/api/lifeInsur_mgr/batchImportCheck.js'
export default {
  name: '',
  data () {
    return {
      queryInfo: {
        policyNo: '',
        message: '',
        comCode: '',
        comComCode: '',
        time: [],
        currentPage: 1,
        pageSize: 10
      },
      exportInfo: {
        policyNo: '',
        message: '',
        comCode: '',
        comComCode: '',
        createTime: '',
        updateTime: ''
      },
      findComInfo: {
        type: ''
      },
      findWorkerInfo: {
        agentCode: '',
        agentName: '',
        comCode: '',
        comName: '',
        validStatus: '0'
      },
      shengjiQueryData: {
        clickType: '2',
        comCodeOrName: '',
        currentPage: 1,
        pageSize: 10
      },
      dijiQueryData: {
        clickType: '2',
        upperComCode: '',
        comCodeOrName: '',
        currentPage: 1,
        pageSize: 10
      },
      tableData: [],
      tableShowOrNot: false,
      fileList: [],
      rules: {},
      comDialog: false,
      comDialogworker: true,
      comDialogCom: false,
      comDialog1: false,
      comDialogworker1: true,
      comDialogCom1: false,
      tempTableData1: [],
      tempTableData2: [],
      fenyetotalData: 0,
      fenyetotalData1: 0
    }
  },
  mounted () {
  },
  methods: {
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          console.log('submit!')
          this.tableShowOrNot = true
          this.fenyetotalData1 = 0
          this.batchImportQueryData(this.queryInfo)
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    // toast提示
    openToast (type, mesg) {
      this.$message({
        showClose: true,
        message: mesg,
        type: type
      })
    },
    initDbClickDialog () {
      this.shengjiQueryData = {
        clickType: '2',
        comCodeOrName: '',
        currentPage: 1,
        pageSize: 10
      }
      this.dijiQueryData = {
        clickType: '2',
        upperComCode: '',
        comCodeOrName: '',
        currentPage: 1,
        pageSize: 10
      }
    },
    opensingleComDialog (index) {
      if (!(this.comDialog || this.comDialog1)) {
        switch (index) {
          case 0:
            this.shengjiQueryData.clickType = '1'
            this.commissionConfigdblqueryCom1(this.companyQueryInfo).then(
              (res) => {
                if (res.data.code !== '000000' && !IsEmpty(res.data.code)) {
                  this.openToast('warning', res.data.msg)
                } else {
                  if (res.data.data.data.length === 1) {
                    this.queryInfo.insurerCode = res.data.data.data[0].insurercode
                    this.queryInfo.insurerName = res.data.data.data[0].insurername
                  }
                }
              }
            )
            break
          case 1:
            this.dijiQueryData.clickType = '1'
            this.dijiQueryData.comCodeOrName = this.queryInfo.comCode2
            this.dijiQueryData.upperComCode = this.queryInfo.comCode
            console.log(this.dijiQueryData)
            this.searchForCom2(this.dijiQueryData)
            break
          default:
            break
        }
      }
    },
    batchImportQueryData (info) {
      this.Loading()
      this.tableData = []
      // this.fenyetotalData1 = 0
      api('/leaveAgent/leaveAgentReportQuery', 'post', info).then(result => {
        console.log(result)
        this.closeLoading()
        if (result.data.code !== '000000' && !IsEmpty(result.data.code)) {
          this.openToast('warning', result.data.msg)
        } else {
          this.fenyetotalData1 = result.data.data.totalElements
          this.tableData = result.data.data.content
        }
      }).catch((e) => {
        console.log(e)
      })
    },
    batchImportExport (info) {
      window.open(`/tabycore/leaveAgent/leaveAgentReportExportQuery?policyNo=${info.policyNo}&message=${info.message}&comCode=${info.comCode}&comComCode=${info.comComCode}&createTime=${info.createTime}&updateTime=${info.updateTime}`)
    },
    export1 () {
      this.exportInfo.policyNo = this.queryInfo.policyNo
      this.exportInfo.message = this.queryInfo.message
      this.exportInfo.comCode = this.queryInfo.comCode
      this.exportInfo.comComCode = this.queryInfo.comComCode
      if (IsEmpty(this.queryInfo.time)) {
        this.queryInfo.time = []
        this.exportInfo.createTime = ''
        this.exportInfo.updateTime = ''
      } else {
        this.exportInfo.createTime = this.queryInfo.time[0]
        this.exportInfo.updateTime = this.queryInfo.time[1]
      }
      this.batchImportExport(this.exportInfo)
    },
    openComDialog (index) {
      switch (index) {
        case 0:
          this.shengjiQueryData.clickType = '2'
          this.shengjiQueryData.comCodeOrName = this.queryInfo.comCode
          this.contiListCheckDialogDataGet1(this.shengjiQueryData).then(
            (res) => {
              console.log(res)
              if (res.data.code !== '000000' && !IsEmpty(res.data.code)) {
                this.openToast('warning', res.data.msg)
              } else {
                this.tempTableData1 = res.data.data.data
                this.fenyetotalData = res.data.data.totalRecords
                for (let i = 0; i < this.tempTableData1.length; i++) {
                  this.tempTableData1[i]['renderData'] = `${this.tempTableData1[i].comCode}-${this.tempTableData1[i].comCName}`
                }
                this.comDialog = true
                this.comDialogCom = true
                this.comDialogworker = false
              }
            })
          break
        case 1:
          this.dijiQueryData.clickType = '2'
          this.dijiQueryData.upperComCode = this.queryInfo.comCode
          this.dijiQueryData.comCodeOrName = this.queryInfo.comComCode
          this.contiListCheckDialogDataGet2(this.dijiQueryData).then(
          (res) => {
            console.log(res)
            if (res.data.code === '000000' || IsEmpty(res.data.code)) {
              this.tempTableData2 = res.data.data.data
              this.fenyetotalData = res.data.data.totalRecords
              for (let i = 0; i < this.tempTableData2.length; i++) {
                this.tempTableData2[i]['renderData'] = `${this.tempTableData2[i].comCode}-${this.tempTableData2[i].comCName}`
              }
              this.comDialog1 = true
              this.comDialogCom1 = true
              this.comDialogworker1 = false
            } else {
              this.openToast('warning', res.data.msg)
            }
          })
          break
        default:
          break
      }
    },
    changeComdialogPage1 (data) {
      this.shengjiQueryData.currentPage = data
      this.openComDialog(0)
    },
    changeComdialogPage2 (data) {
      this.dijiQueryData.currentPage = data
      this.openComDialog(1)
    },
    changeComdialogPageSize1 (data) {
      this.shengjiQueryData.pageSize = data
      this.shengjiQueryData.currentPage = 1
      this.openComDialog(0)
    },
    changeComdialogPageSize2 (data) {
      this.dijiQueryData.currentPage = data
      this.dijiQueryData.currentPage = 1
      this.openComDialog(1)
    },
    handleSizeChange (val) {
      this.queryInfo.currentPage = 1
      this.queryInfo.pageSize = val
      this.batchImportQueryData(this.queryInfo)
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
    comDialogClosing (index) {
      this.initDbClickDialog()
      switch (index) {
        case 0:
          this.queryInfo.comCode = ''
          break
        case 1:
          this.queryInfo.comComCode = ''
          break
        default:
          break
      }
      this.comDialog = false
      this.comDialog1 = false
    },
    dialogBackData (data) {
      this.initDbClickDialog()
      this.comDialog = false
      let temp = []
      temp = data.split('-')
      this.queryInfo.comCode = temp[0]
    },
    dialogBackData1 (data) {
      this.initDbClickDialog()
      this.comDialog1 = false
      let temp = []
      temp = data.split('-')
      this.queryInfo.comComCode = temp[0]
    },
    handleCurrentChange (val) {
      this.queryInfo.currentPage = val
      this.batchImportQueryData(this.queryInfo)
    },
    ...mapActions([
      'contiListCheckDialogDataGet1', 'contiListCheckDialogDataGet2'
    ])
  },
  computed: {
  },
  components: {
    [NoticeBar.name]: NoticeBar,
    [LineTittle.name]: LineTittle,
    [LabelText.name]: LabelText,
    ComDialog
  },
  created () {
  }
}
</script>

<style lang="scss" scoped type="text/css">
#orgadd {
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
</style>
