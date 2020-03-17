<template>
  <div id="orgadd" >
      <ui-notice-bar slot="breadcast" >
        <el-breadcrumb slot="location" separator=">">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>继续率报表管理</el-breadcrumb-item>
            <el-breadcrumb-item>人管继续率</el-breadcrumb-item>
          </el-breadcrumb>
      </ui-notice-bar>
      <div class="ri-content" slot="content" >
        <el-form  ref="queryInfo" :rules="rules" :model="queryInfo">
          <el-row class="ri-line">
            <el-col :span="8">
              <el-form-item prop='persistencyDate'>
                <ui-label-text labelWidth="120" label="继续率月份：" :required="true">
                  <el-date-picker
                      v-model="queryInfo.persistencyDate"
                      value-format="yyyy-MM"
                      type="month"
                      slot="text"
                    >
                  </el-date-picker>
                </ui-label-text>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item prop='provinceComCode'>
                <ui-label-text labelWidth="120" label="省级分公司代码：" >
                  <el-input v-model="queryInfo.provinceComCode" slot="text" clearable placeholder="双击可选择" @dblclick.native="openComDialog(0)" @blur='opensingleComDialog(0)'></el-input>
                </ui-label-text>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item prop='provinceComName'>
                <ui-label-text labelWidth="120" label="省级分公司名称：" >
                  <el-input v-model="queryInfo.provinceComName" slot="text" clearable placeholder="双击可选择" @dblclick.native="openComDialog(0)" @blur='opensingleComDialog(0)'></el-input>
                </ui-label-text>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row class="ri-line">
            <el-col :span="8">
              <el-form-item prop='comCode'>
                <ui-label-text labelWidth="120" label="地市级分公司代码：" >
                  <el-input v-model="queryInfo.comCode" slot="text" placeholder="双击可选择" clearable @dblclick.native="openComDialog(1)" @blur='opensingleComDialog(1)'></el-input>
                </ui-label-text>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item prop='comName'>
                <ui-label-text labelWidth="120" label="地市级分公司名称：" >
                  <el-input v-model="queryInfo.comName" slot="text" placeholder="双击可选择" clearable @dblclick.native="openComDialog(1)" @blur='opensingleComDialog(1)'></el-input>
                </ui-label-text>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item prop='jobType'>
                <ui-label-text labelWidth="120" label="人员类型：" >
                  <el-select v-model="queryInfo.jobType" slot="text">
                    <el-option
                      label="全部"
                      value="-1">
                    </el-option>
                    <el-option
                      label="合同制"
                      value="1">
                    </el-option>
                    <el-option
                      label="代理制"
                      value="3">
                    </el-option>
                    <el-option
                      label="代理制-昆仑"
                      value="6">
                    </el-option>
                    <el-option
                      label="出单工号"
                      value="2">
                    </el-option>
                    <el-option
                      label="劳务派遣"
                      value="4">
                    </el-option>
                    <el-option
                      label="内勤合同制"
                      value="5">
                    </el-option>
                  </el-select>
                </ui-label-text>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row class="ri-line">
            <el-col :span=8>
              <el-form-item prop='jixilvFlag'>
                <ui-label-text labelWidth="120" label="继续率类型：" :required="true">
                  <el-select v-model="queryInfo.jixilvFlag" slot="text">
                    <el-option
                        label="R13"
                        value="1">
                    </el-option>
                    <el-option
                        label="R25"
                        value="2">
                    </el-option>
                    <el-option
                        label="R37"
                        value="3">
                    </el-option>
                  </el-select>
                </ui-label-text>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
      <div class="btn-container" slot="controlbar">
        <el-button type="primary" @click.native.prevent="submitForm('queryInfo',0)">查询</el-button>
        <el-button type="primary" @click.native.prevent="submitForm('queryInfo',1)">导出</el-button>
      </div>
      <div v-if='tableShowOrNot'>
        <el-table stripe ref="multipleTable" :data="tableData" tooltip-effect="dark" style="width: 100%" >
          <el-table-column prop="persistencyDate" label="继续率月份"  width="220" show-overflow-tooltip></el-table-column>
          <el-table-column prop="provinceComCode" label="省级分公司代码" width="220" show-overflow-tooltip></el-table-column>
          <el-table-column prop="provinceComName" label="省级分公司名称" width="220" show-overflow-tooltip></el-table-column>
          <el-table-column prop="comCode" label="地市级分公司代码" width="220" show-overflow-tooltip></el-table-column>
          <el-table-column prop="comName" label="地市级分公司名称" width="220" show-overflow-tooltip></el-table-column>
          <el-table-column prop="agentCode" label="业务员代码" width="220" show-overflow-tooltip></el-table-column>
          <el-table-column prop="agentName" label="业务员名称" width="220" show-overflow-tooltip></el-table-column>
          <el-table-column prop="jobGrade" label="职级" width="220" show-overflow-tooltip></el-table-column>
          <el-table-column prop="jobType" label="人员属性" width="220" show-overflow-tooltip></el-table-column>
          <el-table-column prop="instructCode" label="增员人代码" width="220" show-overflow-tooltip></el-table-column>
          <el-table-column prop="instructName" label="增员人名称" width="220" show-overflow-tooltip></el-table-column>
          <el-table-column prop="person13" label="第13个月个人考核继续率" width="220" show-overflow-tooltip></el-table-column>
          <el-table-column prop="team13" label="第13个月团队继续率" width="220" show-overflow-tooltip></el-table-column>
          <el-table-column prop="self13" label="第13个月个人佣金继续率" width="220" show-overflow-tooltip></el-table-column>
          <el-table-column prop="person25" label="第25个月个人考核继续率" width="220" show-overflow-tooltip></el-table-column>
          <el-table-column prop="team25" label="第25个月团队继续率" width="220" show-overflow-tooltip></el-table-column>
          <el-table-column prop="self25" label="第25个月个人佣金继续率" width="220" show-overflow-tooltip></el-table-column>
          <el-table-column prop="person37" label="第37个月个人考核继续率" width="220" show-overflow-tooltip></el-table-column>
          <el-table-column prop="team37" label="第37个月团队继续率" width="220" show-overflow-tooltip></el-table-column>
          <el-table-column prop="self37" label="第37个月个人佣金继续率" width="220" show-overflow-tooltip></el-table-column>
        </el-table>
        <div class="block">
          <el-pagination
              @current-change="handleCurrentChange"
              @size-change="queryPageSize"
              :current-page="queryInfo.currentPage"
              :page-size ="queryInfo.pageSize"
              :page-sizes="[10,20,50]"
              layout="total, sizes, prev, pager, next, jumper"
              :total="totalRecords"
              >
            </el-pagination>
        </div>
      </div>
      <ComDialog :vis='comDialog' :workerVis='comDialogworker' :comVis='comDialogCom' :newTableData='comDialogData' @onClose='comDialogClosing(1)' @selectDialog='dialogBackData' @comdialogChangePageFunction='changeComdialogPage1' @comdialogChangePageSizeFunction='changeComdialogPageSize1' :fenyetotal='fenyetotalData'/>
      <ComDialog :vis='comDialog1' :workerVis='comDialogworker1' :comVis='comDialogCom1' :newTableData='comDialogData1' @onClose='comDialogClosing(2)' @selectDialog='dialogBackData1' @comdialogChangePageFunction='changeComdialogPage2' @comdialogChangePageSizeFunction='changeComdialogPageSize2' :fenyetotal='fenyetotalData'/>
  </div>
</template>

<script>
import NoticeBar from '@/components/notice-bar'
import LineTittle from '@/components/line-tittle'
import LabelText from '@/components/label-text'
import IsEmpty from '@/utils/IsEmpty'
import { mapActions } from 'vuex'
import ComDialog from '@/components/comDialog'
import {
  api
} from '@/api/lifeInsur_mgr/lifeInsureBillMake.js'
export default {
  name: '',
  data () {
    return {
      queryInfo: {
        persistencyDate: '',
        provinceComCode: '',
        provinceComName: '',
        comCode: '',
        comName: '',
        jixilvFlag: '1',
        jobType: '-1',
        currentPage: 1,
        pageSize: 10
      },
      exportInfo: {
        policyNo: '',
        name: '',
        identityType: '',
        identityNum: '',
        startDate: '',
        endDate: ''
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
      rules: {
        persistencyDate: [{required: true, message: '请输入继续率月份', trigger: 'change'}],
        jixilvFlag: [{required: true, message: '请输入继续率类型', trigger: 'change'}]
      },
      loading: '',
      comDialog: false,
      comDialogworker: true,
      comDialogCom: false,
      comDialog1: false,
      comDialogworker1: true,
      comDialogCom1: false,
      tableData: [],
      fenyetotalData: 0,
      tempTableData1: [],
      tempTableData2: [],
      tableShowOrNot: false,
      totalRecords: 0
    }
  },
  mounted () {
  },
  watch: {
    'queryInfo.provinceComCode' () {
      if (this.queryInfo.provinceComCode === '') {
        this.queryInfo.provinceComName = ''
      }
    },
    'queryInfo.provinceComName' () {
      if (this.queryInfo.provinceComName === '') {
        this.queryInfo.provinceComCode = ''
      }
    },
    'queryInfo.comCode' () {
      if (this.queryInfo.comCode === '') {
        this.queryInfo.comName = ''
        this.queryInfo.provinceComCode = ''
        this.queryInfo.provinceComName = ''
      }
    },
    'queryInfo.comName' () {
      if (this.queryInfo.comName === '') {
        this.queryInfo.comCode = ''
        this.queryInfo.provinceComCode = ''
        this.queryInfo.provinceComName = ''
      }
    }
  },
  methods: {
    submitForm (formName, index) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          console.log('submit!')
          switch (index) {
            case 0:
              this.tableShowOrNot = true
              this.totalRecords = 0
              this.queryInfo.currentPage = 1
              this.queryData(this.queryInfo)
              break
            case 1:
              this.exportData(this.queryInfo)
              break
            default:
              break
          }
        } else {
          console.log('error submit!!')
          return false
        }
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
    queryData (info) {
      console.log(info)
      this.Loading()
      this.tableData = []
      api('/persistency/queryPersistency', 'post', info).then(res => {
        this.closeLoading()
        console.log(res)
        if (res.data.code !== '000000' && !IsEmpty(res.data.code)) {
          this.openToast('warning', res.data.msg)
        } else {
          this.tableData = res.data.data.data
          this.totalRecords = res.data.data.totalRecords
        }
      }).catch((e) => {
        console.log(e)
      })
    },
    exportData (info) {
      window.open(`/tabycore/persistency/exportPersistency?persistencyDate=${info.persistencyDate}&provinceComCode=${info.provinceComCode}&provinceComName=${info.provinceComName}&comCode=${info.comCode}&comName=${info.comName}&jixilvFlag=${info.jixilvFlag}&jobType=${info.jobType}`)
    },
    handleCurrentChange (val) {
      this.queryInfo.currentPage = val
      this.queryData(this.queryInfo)
    },
    queryPageSize (val) {
      this.queryInfo.currentPage = 1
      this.queryInfo.pageSize = val
      this.queryData(this.queryInfo)
    },
    // toast提示
    openToast (type, mesg) {
      this.$message({
        showClose: true,
        message: mesg,
        type: type
      })
    },
    searchForCom1 (info) {
      this.contiListCheckDialogDataGet1(info).then(
        (res) => {
          if (res.data.code === '000000' || IsEmpty(res.data.code)) {
            this.tempTableData1 = res.data.data.data
            this.fenyetotalData = res.data.data.totalRecords
            this.comDialog = true
            this.comDialogCom = true
            this.comDialogworker = false
          } else {
            this.openToast('warning', res.data.msg)
          }
        })
    },
    searchForCom2 (info) {
      this.contiListCheckDialogDataGet2(info).then(
        (res) => {
          console.log(res)
          if (res.data.code === '000000' || IsEmpty(res.data.code)) {
            this.tempTableData2 = res.data.data.data
            this.fenyetotalData = res.data.data.totalRecords
            this.comDialog1 = true
            this.comDialogCom1 = true
            this.comDialogworker1 = false
          } else {
            this.openToast('warning', res.data.msg)
          }
        })
    },
    openComDialog (index) {
      switch (index) {
        case 0:
          this.shengjiQueryData.clickType = '2'
          if (!IsEmpty(this.queryInfo.provinceComCode) && IsEmpty(this.queryInfo.provinceComName)) {
            this.shengjiQueryData.comCodeOrName = this.queryInfo.provinceComCode
          } else if (IsEmpty(this.queryInfo.provinceComCode) && !IsEmpty(this.queryInfo.provinceComName)) {
            this.shengjiQueryData.comCodeOrName = this.queryInfo.provinceComName
          } else {
            this.shengjiQueryData.comCodeOrName = this.queryInfo.provinceComCode
          }
          this.searchForCom1(this.shengjiQueryData)
          break
        case 1:
          if (IsEmpty(this.queryInfo.provinceComCode) && IsEmpty(this.queryInfo.provinceComName)) {
            this.openToast('warning', '请先选择省级分公司')
          } else {
            this.dijiQueryData.clickType = '2'
            this.dijiQueryData.upperComCode = this.queryInfo.provinceComCode
            if (!IsEmpty(this.queryInfo.comCode) && IsEmpty(this.queryInfo.comName)) {
              this.dijiQueryData.comCodeOrName = this.queryInfo.comCode
            } else if (IsEmpty(this.queryInfo.comCode) && !IsEmpty(this.queryInfo.comName)) {
              this.dijiQueryData.comCodeOrName = this.queryInfo.comName
            } else {
              this.dijiQueryData.comCodeOrName = this.queryInfo.comCode
            }
            this.searchForCom2(this.dijiQueryData)
          }
          break
        default:
          break
      }
    },
    initDbDialog () {
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
    comDialogClosing (index) {
      this.initDbDialog()
      this.comDialog = false
      this.comDialog1 = false
      switch (index) {
        case 1:
          this.queryInfo.provinceComCode = ''
          this.queryInfo.provinceComName = ''
          this.queryInfo.comCode = ''
          this.queryInfo.comName = ''
          break
        case 2:
          this.queryInfo.comCode = ''
          this.queryInfo.comName = ''
          break
        default:
          break
      }
    },
    opensingleComDialog (index) {
      if (!(this.comDialog || this.comDialog1)) {
        switch (index) {
          case 0:
            this.shengjiQueryData.clickType = '1'
            if (!IsEmpty(this.queryInfo.provinceComCode)) {
              this.shengjiQueryData.comCodeOrName = this.queryInfo.provinceComCode
            } else if (!IsEmpty(this.queryInfo.provinceComName)) {
              this.shengjiQueryData.comCodeOrName = this.queryInfo.provinceComName
            } else {
              this.shengjiQueryData.comCodeOrName = ''
            }
            this.contiListCheckDialogDataGet1(this.shengjiQueryData).then(
              (res) => {
                if (res.data.code !== '000000' && !IsEmpty(res.data.code)) {
                  this.openToast('warning', res.data.msg)
                } else {
                  if (res.data.data.data.length === 1) {
                    this.queryInfo.provinceComCode = res.data.data.data[0].comCode
                    this.queryInfo.provinceComName = res.data.data.data[0].comCName
                  }
                }
              }
            )
            break
          case 1:
            this.dijiQueryData.clickType = '1'
            if (!IsEmpty(this.queryInfo.provinceComCode)) {
              this.dijiQueryData.upperComCode = this.queryInfo.provinceComCode
            } else if (!IsEmpty(this.queryInfo.provinceComName)) {
              this.dijiQueryData.upperComCode = this.queryInfo.provinceComName
            } else {
              this.dijiQueryData.upperComCode = ''
            }
            if (!IsEmpty(this.queryInfo.comCode)) {
              this.dijiQueryData.comCodeOrName = this.queryInfo.comCode
            } else if (!IsEmpty(this.queryInfo.comName)) {
              this.dijiQueryData.comCodeOrName = this.queryInfo.comName
            } else {
              this.dijiQueryData.comCodeOrName = ''
            }
            this.contiListCheckDialogDataGet2(this.dijiQueryData).then(
              (res) => {
                if (res.data.code !== '000000' && !IsEmpty(res.data.code)) {
                  this.openToast('warning', res.data.msg)
                } else {
                  if (res.data.data.data.length === 1) {
                    this.queryInfo.comCode = res.data.data.data[0].comCode
                    this.queryInfo.comName = res.data.data.data[0].comCName
                  }
                }
              })
            break
          default:
            break
        }
      }
    },
    dialogBackData (data) {
      this.initDbDialog()
      this.comDialog = false
      let temp = []
      temp = data.split('-')
      this.queryInfo.provinceComCode = temp[0]
      this.queryInfo.provinceComName = temp[1]
    },
    dialogBackData1 (data) {
      this.initDbDialog()
      this.comDialog1 = false
      let temp = []
      temp = data.split('-')
      this.queryInfo.comCode = temp[0]
      this.queryInfo.comName = temp[1]
    },
    changeComdialogPage1 (data) {
      this.shengjiQueryData.currentPage = data
      this.searchForCom1(this.shengjiQueryData)
    },
    changeComdialogPage2 (data) {
      this.dijiQueryData.currentPage = data
      this.searchForCom2(this.dijiQueryData)
    },
    changeComdialogPageSize1 (data) {
      this.shengjiQueryData.pageSize = data
      this.searchForCom1(this.shengjiQueryData)
    },
    changeComdialogPageSize2 (data) {
      this.dijiQueryData.pageSize = data
      this.searchForCom2(this.dijiQueryData)
    },
    ...mapActions([
      'contiListCheckDialogDataGet1', 'contiListCheckDialogDataGet2'
    ])
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
    comDialogData () {
      let temp = this.tempTableData1
      if (!IsEmpty(temp)) {
        if (!IsEmpty(temp[0].comCode) && !IsEmpty(temp[0].comCName)) {
          for (let i = 0; i < temp.length; i++) {
            temp[i]['renderData'] = `${temp[i].comCode}-${temp[i].comCName}`
          }
        }
      }
      return temp
    },
    comDialogData1 () {
      let temp = this.tempTableData2
      if (!IsEmpty(temp)) {
        if (!IsEmpty(temp[0].comCode) && !IsEmpty(temp[0].comCName)) {
          for (let i = 0; i < temp.length; i++) {
            temp[i]['renderData'] = `${temp[i].comCode}-${temp[i].comCName}`
          }
        }
      }
      return temp
    }
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
  margin-bottom: 30px;
}
.ri-line{
  margin-top: 10px;
  margin-bottom: 10px;
}
</style>
