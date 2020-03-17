<template>
  <div id="home_index" >
      <ui-notice-bar slot="breadcast" >
        <el-breadcrumb slot="location" separator=">">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>财务报表管理</el-breadcrumb-item>
            <el-breadcrumb-item>财务认领状态报表</el-breadcrumb-item>
          </el-breadcrumb>
      </ui-notice-bar>
      <div class="ri-content" slot="content" >
        <el-form ref="caiwuAdmitList" :rules="rules" :model="caiwuAdmitList">
          <el-row>
            <el-col :span="12">
              <el-form-item prop='type'>
                <ui-label-text labelWidth="100" label="对账单类型:" >
                  <el-select v-model="caiwuAdmitList.statementType" slot="text" placeholder="请选择对账单类型：">
                    <!-- 全部、寿险、银保代理、产险 -->
                    <el-option
                        label="全部"
                        value="0">
                    </el-option>
                    <el-option
                        label="银保代理"
                        value="1">
                    </el-option>
                    <el-option
                        label="寿险"
                        value="2">
                    </el-option>
                    <el-option
                        label="产险"
                        value="3">
                    </el-option>
                  </el-select>
                </ui-label-text>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item prop='dateRange'>
                <ui-label-text labelWidth="110" label="对账单生成日期:" :required="true">
                  <el-date-picker
                    v-model="caiwuAdmitList.dateRange"
                    value-format="yyyy-MM-dd"
                    slot="text"
                    type="daterange"
                    range-separator="至"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期">
                  </el-date-picker>
                </ui-label-text>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="12">
              <el-form-item prop='type'>
              <ui-label-text labelWidth="100" label="对账单号:" >
                <el-input v-model="caiwuAdmitList.batchNo" slot="text" clearable placeholder="请输入对账单号"></el-input>
              </ui-label-text>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item prop='type'>
              <ui-label-text labelWidth="110" label="财务认领状态:" >
                <el-select v-model="caiwuAdmitList.reconnoStatus" slot="text" placeholder="请选择财务认领状态：">
                  <!--  1 - 已开票
                        2 - 已作废
                        3 - 已红冲
                        4 - 已收款
                        5 - 历史状态 -->
                  <el-option
                      label="已开票"
                      value="1">
                  </el-option>
                  <el-option
                      label="已作废"
                      value="2">
                  </el-option>
                  <el-option
                      label="已红冲"
                      value="3">
                  </el-option>
                  <el-option
                      label="已收款"
                      value="4">
                  </el-option>
                  <el-option
                      label="历史状态"
                      value="5">
                  </el-option>
                </el-select>
              </ui-label-text>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="12">
              <el-form-item prop='type'>
              <ui-label-text labelWidth="100" label="省级分公司代码:" >
                <el-input v-model="caiwuAdmitList.comCode" slot="text" clearable @blur='opensingleComDialog(1)' @dblclick.native="openComDialog(1)" placeholder="双击可选择"></el-input>
              </ui-label-text>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item prop='type'>
              <ui-label-text labelWidth="110" label="省级分公司名称:" >
                <el-input v-model="caiwuAdmitList.comName" slot="text" clearable @blur='opensingleComDialog(1)' @dblclick.native="openComDialog(1)" placeholder="双击可选择"></el-input>
              </ui-label-text>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="12">
              <el-form-item prop='type'>
              <ui-label-text labelWidth="100" label="开票机构代码:" >
                <el-input v-model="caiwuAdmitList.comComCode" slot="text" clearable @blur='opensingleComDialog(2)' @dblclick.native="openComDialog(2)" placeholder="双击可选择"></el-input>
              </ui-label-text>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item prop='type'>
              <ui-label-text labelWidth="110" label="开票机构名称:" >
                <el-input v-model="caiwuAdmitList.comComName" slot="text" clearable @blur='opensingleComDialog(2)' @dblclick.native="openComDialog(2)" placeholder="双击可选择"></el-input>
              </ui-label-text>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="12">
              <el-form-item prop='type'>
              <ui-label-text labelWidth="100" label="保险公司代码:" >
                <el-input v-model="caiwuAdmitList.companyCode" slot="text" clearable @blur='opensingleComDialog(3)' @dblclick.native="openComDialog(3)" placeholder="双击可选择"></el-input>
              </ui-label-text>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item prop='type'>
              <ui-label-text labelWidth="110" label="保险公司名称:" >
                <el-input v-model="caiwuAdmitList.companyName" slot="text" clearable @blur='opensingleComDialog(3)' @dblclick.native="openComDialog(3)" placeholder="双击可选择"></el-input>
              </ui-label-text>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="8">
              <ui-label-text3 labelWidth="100" label="子结算单金额:" >
                <el-input v-model.trim="caiwuAdmitList.startTotal" @blur="checkBlur" type="number" slot="text" clearable></el-input>
              </ui-label-text3>
            </el-col>
            <el-col :span="8">
              <ui-label-text3 labelWidth="20" label="至:" >
                <el-input v-model.trim="caiwuAdmitList.endTotal" @blur="checkBlur" type="number" slot="text" clearable></el-input>
              </ui-label-text3>
            </el-col>
          </el-row>

        </el-form>
      </div>
      <div class="btn-container">
        <el-button type="primary" :disabled="quanxian.query" @click="submitForm('caiwuAdmitList',0)">查询</el-button>
        <el-button type="primary" :disabled="quanxian.export" @click="submitForm('caiwuAdmitList',1)">导出</el-button>
        <el-button type="primary" :disabled="quanxian.import" @click="uploadDialogVis = true">导入</el-button>
        <!-- <el-button type="primary" @click="submitForm('caiwuAdmitList',0)">查询</el-button>
        <el-button type="primary" @click="submitForm('caiwuAdmitList',1)">导出</el-button>
        <el-button type="primary" @click="uploadDialogVis = true">导入</el-button> -->
      </div>
      <el-dialog append-to-body center title="财务认领状态报表导入"
        :visible.sync="uploadDialogVis" width="60%">
        <div class="upload-content">
          <el-upload
            class="upload-content" ref="uploadDialog"
            action="/tabycore/financialClaim/import"
            :before-upload="Loading"
            :on-success="handleEXLSuccess"
            :file-list="fileList"
            center>
            <el-button type="primary">点击选择</el-button>
            <div slot="tip" class="red-color">
              <p>* 请您耐心等待<a class="download" @click="ondownloadDemo">(模板下载)</a>
              </p>
            </div>
          </el-upload>
        </div>
      </el-dialog>
      <ComDialog :vis='comDialog1' :workerVis='comDialogworker1' :comVis='comDialogCom1' :newTableData='tempTableData1' @onClose='comDialogClosing(1)' @selectDialog='dialogBackData1' @comdialogChangePageFunction='changeComdialogPage1' @comdialogChangePageSizeFunction='changeComdialogPageSize1' :fenyetotal='fenyetotalData'/>
      <ComDialog :vis='comDialog2' :workerVis='comDialogworker2' :comVis='comDialogCom2' :newTableData='tempTableData2' @onClose='comDialogClosing(2)' @selectDialog='dialogBackData2' @comdialogChangePageFunction='changeComdialogPage2' @comdialogChangePageSizeFunction='changeComdialogPageSize2' :fenyetotal='fenyetotalData'/>
      <ComDialog :vis='comDialog3' :workerVis='comDialogworker3' :comVis='comDialogCom3' :newTableData='tempTableData3' @onClose='comDialogClosing(3)' @selectDialog='dialogBackData3' @comdialogChangePageFunction='changeComdialogPage3' @comdialogChangePageSizeFunction='changeComdialogPageSize3' :fenyetotal='fenyetotalData'/>
      <div v-if='tableShowOrNot' class="tableStyle">
        <el-table stripe id="dataTable" :data="tableData" ref="multipleTable" tooltip-effect="dark" style="width: 100%">
          <el-table-column prop="statementType" label="对账单类型"  width="180" ></el-table-column>
          <el-table-column prop="batchNo" label="对账单号"  width="180" ></el-table-column>
          <el-table-column prop="reconnoNo" label="子结算单号"  width="180" ></el-table-column>
          <el-table-column prop="batchNoDate" label="对账单生成日期"  width="180" ></el-table-column>
          <el-table-column prop="creatDate" label="财务复核通过日期"  width="180" ></el-table-column>
          <el-table-column prop="companyCode" label="保险公司代码"  width="180" ></el-table-column>
          <el-table-column prop="companyName" label="保险公司名称"  width="180" ></el-table-column>
          <el-table-column prop="comCode" label="省级分公司代码"  width="180" ></el-table-column>
          <el-table-column prop="comName" label="省级分公司名称"  width="180" ></el-table-column>
          <el-table-column prop="comComCode" label="开票机构代码"  width="180" ></el-table-column>
          <el-table-column prop="comComName" label="开票机构名称"  width="180" ></el-table-column>
          <el-table-column prop="total" label="子结算单金额"  width="180" ></el-table-column>
          <el-table-column prop="reconnoStatus" label="认领状态"  width="180" ></el-table-column>
          <el-table-column prop="claimName" label="状态来源"  width="180" ></el-table-column>
        </el-table>
        <div class="block">
          <el-pagination
            @current-change="handleCurrentChange"
            @size-change="handleSizeChange"
            :current-page="caiwuAdmitList.currentPage"
            :page-size ="caiwuAdmitList.pageSize"
            :page-sizes="[10,20,50]"
            layout="total, sizes, prev, pager, next, jumper"
            :total="totalRecords"
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
import LabelText3 from '@/components/label-text3'
import { mapActions } from 'vuex'
import {
  api
} from '@/api/lifeInsur_mgr/quitListMgr.js'
import IsEmpty from '@/utils/IsEmpty'
import ComDialog from '@/components/comDialog'
import replaceStr from '@/utils/myFunction'
export default {
  data () {
    return {
      quanxian: {
        query: true,
        export: true,
        import: true
      },
      caiwuAdmitList: {
        statementType: '2',
        startDate: '',
        endDate: '',
        batchNo: '',
        reconnoStatus: '',
        comCode: '',
        comName: '',
        comComCode: '',
        comComName: '',
        companyCode: '',
        companyName: '',
        startTotal: '',
        endTotal: '',
        currentPage: 1,
        pageSize: 10
      },
      orgQueryInfo: {
        clickType: '2',
        comCodeOrName: '',
        currentPage: 1,
        pageSize: 10
      },
      companyQueryInfo: {
        type: '',
        clickType: '2',
        insurerCode: '',
        insurerName: '',
        currentPage: 1,
        pageSize: 10
      },
      rules: {
        dateRange: [
          { required: true, message: '请输入对账单日期', trigger: 'change' }
        ]
      },
      tempTableData1: [],
      tempTableData2: [],
      tempTableData3: [],
      tableData: [],
      fileList: [],
      tableShowOrNot: false,
      uploadDialogVis: false,
      comDialog1: false,
      comDialogCom1: false,
      comDialogworker1: false,
      comDialog2: false,
      comDialogCom2: false,
      comDialogworker2: false,
      comDialog3: false,
      comDialogCom3: false,
      comDialogworker3: false,
      fenyetotalData: 0,
      totalRecords: 0
    }
  },
  mounted () {
    this.orgQueryInfo.clickType = '1'
    this.orgQueryInfo.comCodeOrName = this.userComCode
    this.contiListCheckDialogDataGet1(this.orgQueryInfo).then(
      (res) => {
        this.initshuangjiDialog()
        if (res.data.code !== '000000' && !IsEmpty(res.data.code)) {
          this.openToast('warning', res.data.msg)
        } else {
          if (res.data.data.data.length === 1) {
            this.caiwuAdmitList.comCode = res.data.data.data[0].comCode
            this.caiwuAdmitList.comName = res.data.data.data[0].comCName.replace(/天安佰盈保险销售有限公司/, '')
          }
        }
      }
    )
    api(`/auth/findButtonByUserCodeAndPage?userId=${this.$store.state.login.loginUserId}&page=财务认领状态报表`, 'get').then(result => {
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
    caiwuAdmitList: {
      handler (newValue, oldValue) {
        if (newValue.dateRange && newValue.dateRange.length === 2) {
          this.caiwuAdmitList.startDate = newValue.dateRange[0]
          this.caiwuAdmitList.endDate = newValue.dateRange[1]
        }
        let reg = /^(-)?(0|[1-9]\d*)(\s|$|\.\d{1,2}\b)/
        if (!reg.test(newValue.startTotal)) {
          this.caiwuAdmitList.startTotal = newValue.startTotal.slice(0, -1)
        }
        if (!reg.test(newValue.endTotal)) {
          this.caiwuAdmitList.endTotal = newValue.endTotal.slice(0, -1)
        }
      },
      deep: true
    },
    'caiwuAdmitList.comCode' () {
      if (this.caiwuAdmitList.comCode === '') {
        this.caiwuAdmitList.comName = ''
      }
    },
    'caiwuAdmitList.comName' () {
      if (this.caiwuAdmitList.comName === '') {
        this.caiwuAdmitList.comCode = ''
      }
    },
    'caiwuAdmitList.comComCode' () {
      if (this.caiwuAdmitList.comComCode === '') {
        this.caiwuAdmitList.comComName = ''
      }
    },
    'caiwuAdmitList.comComName' () {
      if (this.caiwuAdmitList.comComName === '') {
        this.caiwuAdmitList.comComCode = ''
      }
    },
    'caiwuAdmitList.companyCode' () {
      if (this.caiwuAdmitList.companyCode === '') {
        this.caiwuAdmitList.companyName = ''
      }
    },
    'caiwuAdmitList.companyName' () {
      if (this.caiwuAdmitList.companyName === '') {
        this.caiwuAdmitList.companyCode = ''
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
    checkBlur () {
      if (!IsEmpty(this.caiwuAdmitList.startTotal) && !IsEmpty(this.caiwuAdmitList.endTotal)) {
        if (parseFloat(this.caiwuAdmitList.startTotal) > parseFloat(this.caiwuAdmitList.endTotal)) {
          this.openToast('warning', '子结算单起始金额范围不正确')
          this.caiwuAdmitList.startTotal = ''
          this.caiwuAdmitList.endTotal = ''
        }
      }
    },
    openComDialog (index) {
      switch (index) {
        case 1:
          if (!IsEmpty(this.caiwuAdmitList.comCode)) {
            this.orgQueryInfo.comCodeOrName = this.caiwuAdmitList.comCode
          } else if (!IsEmpty(this.caiwuAdmitList.comName)) {
            this.orgQueryInfo.comCodeOrName = this.caiwuAdmitList.comName
          } else {
            this.orgQueryInfo.comCodeOrName = ''
          }
          this.orgQueryInfo.clickType = '2'
          this.contiListCheckDialogDataGet1(this.orgQueryInfo).then(
            (res) => {
              console.log(res)
              if (res.data.code !== '000000' && !IsEmpty(res.data.code)) {
                this.openToast('warning', res.data.msg)
              } else {
                for (let i = 0; i < res.data.data.data.length; i++) {
                  res.data.data.data[i].comCName = replaceStr(res.data.data.data[i].comCName)
                }
                this.tempTableData1 = res.data.data.data
                for (let i = 0; i < this.tempTableData1.length; i++) {
                  this.tempTableData1[i]['renderData'] = `${this.tempTableData1[i].comCode}-${this.tempTableData1[i].comCName}`
                }
                this.fenyetotalData = res.data.data.totalRecords
                this.comDialog1 = true
                this.comDialogCom1 = true
                this.comDialogworker1 = false
              }
            }
          )
          break
        case 2:
          this.orgQueryInfo.clickType = '2'
          if (!IsEmpty(this.caiwuAdmitList.comComCode)) {
            this.orgQueryInfo.comCodeOrName = this.caiwuAdmitList.comComCode
          } else if (!IsEmpty(this.caiwuAdmitList.comComName)) {
            this.orgQueryInfo.comCodeOrName = this.caiwuAdmitList.comComName
          } else {
            this.orgQueryInfo.comCodeOrName = ''
          }
          this.contiListCheckDialogDataGet3(this.orgQueryInfo).then(
            (res) => {
              if (res.data.code !== '000000' && !IsEmpty(res.data.code)) {
                this.openToast('warning', res.data.msg)
              } else {
                for (let i = 0; i < res.data.data.data.length; i++) {
                  res.data.data.data[i].comCName = replaceStr(res.data.data.data[i].comCName)
                }
                this.tempTableData2 = res.data.data.data
                for (let i = 0; i < this.tempTableData2.length; i++) {
                  this.tempTableData2[i]['renderData'] = `${this.tempTableData2[i].comCode}-${this.tempTableData2[i].comCName}`
                }
                this.fenyetotalData = res.data.data.totalRecords
                this.comDialog2 = true
                this.comDialogCom2 = true
                this.comDialogworker2 = false
              }
            }
          )
          break
        case 3:
          this.companyQueryInfo.insurerCode = this.caiwuAdmitList.companyCode
          this.companyQueryInfo.insurerName = this.caiwuAdmitList.companyName
          this.companyQueryInfo.clickType = '2'
          this.commissionConfigdblqueryCom1(this.companyQueryInfo).then(
            (res) => {
              if (res.data.code !== '000000' && !IsEmpty(res.data.code)) {
                this.openToast('warning', res.data.msg)
              } else {
                this.tempTableData3 = res.data.data.data
                for (let i = 0; i < this.tempTableData3.length; i++) {
                  this.tempTableData3[i]['renderData'] = `${this.tempTableData3[i].insurercode}-${this.tempTableData3[i].insurername}`
                }
                this.fenyetotalData = res.data.data.totalRecords
                this.comDialog3 = true
                this.comDialogCom3 = true
                this.comDialogworker3 = false
              }
            }
          )
          break
        default:
          break
      }
    },
    opensingleComDialog (index) {
      if (!(this.comDialog1 || this.comDialog2 || this.comDialog3)) {
        switch (index) {
          case 1:
            this.orgQueryInfo.clickType = '1'
            if (IsEmpty(this.caiwuAdmitList.comCode)) {
              this.orgQueryInfo.comCodeOrName = this.caiwuAdmitList.comName
            } else {
              this.orgQueryInfo.comCodeOrName = this.caiwuAdmitList.comCode
            }
            this.contiListCheckDialogDataGet1(this.orgQueryInfo).then(
              (res) => {
                if (res.data.code !== '000000' && !IsEmpty(res.data.code)) {
                  // this.openToast('warning', res.data.msg)
                } else {
                  for (let i = 0; i < res.data.data.data.length; i++) {
                    res.data.data.data[i].comCName = replaceStr(res.data.data.data[i].comCName)
                  }
                  if (res.data.data.data.length === 1) {
                    this.caiwuAdmitList.comCode = res.data.data.data[0].comCode
                    this.caiwuAdmitList.comName = res.data.data.data[0].comCName
                  }
                }
              }
            )
            break
          case 2:
            this.orgQueryInfo.clickType = '1'
            if (!IsEmpty(this.caiwuAdmitList.comComCode)) {
              this.orgQueryInfo.comCodeOrName = this.caiwuAdmitList.comComCode
            } else if (!IsEmpty(this.caiwuAdmitList.comComName)) {
              this.orgQueryInfo.comCodeOrName = this.caiwuAdmitList.comComName
            } else {
              this.orgQueryInfo.comCodeOrName = ''
            }
            this.contiListCheckDialogDataGet3(this.orgQueryInfo).then(
              (res) => {
                if (res.data.code !== '000000' && !IsEmpty(res.data.code)) {
                  // this.openToast('warning', res.data.msg)
                } else {
                  for (let i = 0; i < res.data.data.data.length; i++) {
                    res.data.data.data[i].comCName = replaceStr(res.data.data.data[i].comCName)
                  }
                  if (res.data.data.data.length === 1) {
                    this.caiwuAdmitList.comCode = res.data.data.data[0].comCode
                    this.caiwuAdmitList.comName = res.data.data.data[0].comCName
                  }
                }
              }
            )
            break
          case 3:
            this.companyQueryInfo.insurerCode = this.caiwuAdmitList.companyCode
            this.companyQueryInfo.insurerName = this.caiwuAdmitList.companyName
            this.companyQueryInfo.clickType = '2'
            this.commissionConfigdblqueryCom1(this.companyQueryInfo).then(
              (res) => {
                if (res.data.code !== '000000' && !IsEmpty(res.data.code)) {
                  // this.openToast('warning', res.data.msg)
                } else {
                  if (res.data.data.data.length === 1) {
                    this.caiwuAdmitList.companyCode = res.data.data.data[0].insurercode
                    this.caiwuAdmitList.companyName = res.data.data.data[0].insurername
                  }
                }
              }
            )
            break
          default:
            break
        }
      }
    },
    ondownloadDemo () {
      window.open(`/tabycore/financialClaim/exportTemplate`)
    },
    handleEXLSuccess (response) {
      this.closeLoading()
      if (response.code === '000000') {
        this.$message({
          showClose: true,
          message: response.msg,
          type: 'success'
        })
      } else {
        this.$message({
          showClose: true,
          message: response.msg,
          type: 'error'
        })
      }
      this.$refs.uploadDialog.clearFiles()
      this.uploadDialogVis = false
    },
    initshuangjiDialog () {
      this.orgQueryInfo = {
        clickType: '2',
        comCodeOrName: '',
        currentPage: 1,
        pageSize: 10
      }
      this.companyQueryInfo = {
        type: '',
        clickType: '2',
        insurerCode: '',
        insurerName: '',
        currentPage: 1,
        pageSize: 10
      }
    },
    comDialogClosing (index) {
      this.comDialog1 = false
      this.comDialog2 = false
      this.comDialog3 = false
      this.initshuangjiDialog()
      switch (index) {
        case 1:
          this.caiwuAdmitList.comCode = ''
          this.caiwuAdmitList.comName = ''
          break
        case 2:
          this.caiwuAdmitList.comComCode = ''
          this.caiwuAdmitList.comComName = ''
          break
        case 3:
          this.caiwuAdmitList.companyCode = ''
          this.caiwuAdmitList.companyName = ''
          break
        default:
          break
      }
    },
    dialogBackData1 (data) {
      this.initshuangjiDialog()
      this.comDialog1 = false
      let temp = []
      temp = data.split('-')
      this.caiwuAdmitList.comCode = temp[0]
      this.caiwuAdmitList.comName = temp[1]
    },
    dialogBackData2 (data) {
      this.initshuangjiDialog()
      this.comDialog2 = false
      let temp = []
      temp = data.split('-')
      this.caiwuAdmitList.comComCode = temp[0]
      this.caiwuAdmitList.comComName = temp[1]
    },
    dialogBackData3 (data) {
      this.initshuangjiDialog()
      this.comDialog3 = false
      let temp = []
      temp = data.split('-')
      this.caiwuAdmitList.companyCode = temp[0]
      this.caiwuAdmitList.companyName = temp[1]
    },
    changeComdialogPage1 (data) {
      this.orgQueryInfo.currentPage = data
      this.openComDialog(1)
    },
    changeComdialogPageSize1 (data) {
      this.orgQueryInfo.currentPage = 1
      this.orgQueryInfo.pageSize = data
      this.openComDialog(1)
    },
    changeComdialogPage2 (data) {
      this.orgQueryInfo.currentPage = data
      this.openComDialog(2)
    },
    changeComdialogPageSize2 (data) {
      this.orgQueryInfo.currentPage = 1
      this.orgQueryInfo.pageSize = data
      this.openComDialog(2)
    },
    changeComdialogPage3 (data) {
      this.companyQueryInfo.currentPage = data
      this.openComDialog(3)
    },
    changeComdialogPageSize3 (data) {
      this.companyQueryInfo.currentPage = 1
      this.companyQueryInfo.pageSize = data
      this.openComDialog(3)
    },
    // toast提示
    openToast (type, mesg, time = 0) {
      this.toastMessage = this.$message({
        showClose: true,
        message: mesg,
        type: type,
        duration: time
      })
    },
    submitForm (formName, index) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          console.log('submit!')
          switch (index) {
            case 0:
              this.caiwuAdmitList.currentPage = 1
              this.totalRecords = 0
              this.queryData()
              break
            case 1:
              this.exportData()
              break
            case 2:
              this.uploadDialogVis = true
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
    queryData () {
      this.Loading()
      this.tableData = []
      if (!IsEmpty(this.caiwuAdmitList.startTotal) && !IsEmpty(this.caiwuAdmitList.endTotal)) {
        if (parseFloat(this.caiwuAdmitList.startTotal) > parseFloat(this.caiwuAdmitList.endTotal)) {
          this.openToast('warning', '子结算单起始金额范围不正确')
          this.caiwuAdmitList.startTotal = ''
          this.caiwuAdmitList.endTotal = ''
          return
        }
      }
      api('/financialClaim/queryClaimReport', 'post', this.caiwuAdmitList).then(result => {
        this.closeLoading()
        if (result.data.code !== '000000' && !IsEmpty(result.data.code)) {
          this.openToast('warning', result.data.msg)
        } else {
          this.totalRecords = result.data.data.totalElements
          this.tableData = result.data.data.content
          this.tableShowOrNot = true
        }
      }).catch((e) => {
        console.log(e)
      })
    },
    handleCurrentChange (val) {
      this.caiwuAdmitList.currentPage = val
      this.queryData()
    },
    handleSizeChange (val) {
      this.caiwuAdmitList.pageSize = val
      this.caiwuAdmitList.currentPage = 1
    },
    exportData () {
      window.open(`/tabycore/financialClaim/exportReport?statementType=${this.caiwuAdmitList.statementType}&startDate=${this.caiwuAdmitList.startDate}&endDate=${this.caiwuAdmitList.endDate}&batchNo=${this.caiwuAdmitList.batchNo}&reconnoStatus=${this.caiwuAdmitList.reconnoStatus}&comCode=${this.caiwuAdmitList.comCode}&comName=${this.caiwuAdmitList.comName}&comComCode=${this.caiwuAdmitList.comComCode}&comComName=${this.caiwuAdmitList.comComName}&companyCode=${this.caiwuAdmitList.companyCode}&companyName=${this.caiwuAdmitList.companyName}&startTotal=${this.caiwuAdmitList.startTotal}&endTotal=${this.caiwuAdmitList.endTotal}`)
    },
    ...mapActions([
      'contiListCheckDialogDataGet1', 'contiListCheckDialogDataGet3', 'commissionConfigdblqueryCom1'
    ])
  },
  components: {
    [NoticeBar.name]: NoticeBar,
    [LineTittle.name]: LineTittle,
    [LabelText.name]: LabelText,
    [LabelText3.name]: LabelText3,
    ComDialog
  },
  created () {
  },
  computed: {
    userComCode () {
      return this.$store.state.login.showComName.split('(')[1].split(')')[0]
    }
  }
}
</script>

<style>
#home_index{padding: 0px 30px 30px 30px;}
.ri-content{margin-top: 10px;margin-bottom: 10px;}
.btn-container{
  text-align: center;margin-top: 60px;
}
.tableStyle{
  margin-top: 10px
}
  .ri-line{
    margin-top: 10px;
    margin-bottom: 10px;
  }
.download{
  color:blue;
  cursor:pointer;
}
.upload-content {
  text-align: center
}
</style>
