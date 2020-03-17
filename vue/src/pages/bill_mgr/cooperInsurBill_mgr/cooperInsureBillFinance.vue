<template>
  <div id="orgadd" >
      <ui-notice-bar slot="breadcast" >
        <el-breadcrumb slot="location" separator=">">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>对账单管理</el-breadcrumb-item>
            <el-breadcrumb-item>合作经代对账单管理</el-breadcrumb-item>
            <el-breadcrumb-item>合作经代财务部审核</el-breadcrumb-item>
          </el-breadcrumb>
      </ui-notice-bar>
      <div class="ri-content" slot="content" >
        <el-form ref="moneycaiwuExamine" :rules="rules" :model="queryInfo">
          <el-row class="ri-line">
            <el-col :span="12">
              <el-form-item prop="comCode">
                <ui-label-text :required="true" labelWidth="180" label="佰盈机构代码：" >
                  <el-input v-model="queryInfo.comCode" slot="text" clearable @dblclick.native="openComDialog(2)" placeholder="双击可选择" @blur='opensingleComDialog(0)'></el-input>
                </ui-label-text>
              </el-form-item>
              </el-col>
              <el-col :span="12">
              <el-form-item prop="comName">
                <ui-label-text :required="true" labelWidth="180" label="佰盈机构名称:" >
                  <el-input v-model="queryInfo.comName" slot="text" clearable @dblclick.native="openComDialog(2)" placeholder="双击可选择" @blur='opensingleComDialog(0)'></el-input>
                </ui-label-text>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row class="ri-line">
            <el-col :span="12">
              <el-form-item prop='cooperationCode'>
                <ui-label-text labelWidth="180" label="合作经代公司代码：" >
                  <el-input v-model="queryInfo.cooperationCode" ref="jingdaiCompanyCodeText" slot="text" clearable @dblclick.native="openComDialog(0)" placeholder="双击可选择" @blur='opensingleComDialog(1)'></el-input>
                </ui-label-text>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item prop='cooperationName'>
                <ui-label-text labelWidth="180" label="合作经代公司名称：" >
                  <el-input v-model="queryInfo.cooperationName" ref="jingdaiCompanyNameText" slot="text" clearable @dblclick.native="openComDialog(0)" placeholder="双击可选择" @blur='opensingleComDialog(1)'></el-input>
                </ui-label-text>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row class="ri-line">
            <el-col :span="12">
              <el-form-item prop='verifyStatus'>
                <ui-label-text labelWidth="180" label="财务审核状态：" >
                  <el-select v-model="queryInfo.verifyStatus" slot="text" placeholder="请选择">
                    <el-option label="未提交审核" value="0"></el-option>
                    <el-option label="待审核" value="2"></el-option>
                    <el-option label="审核通过" value="3"></el-option>
                    <el-option label="不通过" value="4"></el-option>
                  </el-select>
                </ui-label-text>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row class="ri-line">
            <el-col :span="24">
              <el-form-item prop='insurerName'>
                <div class="datestyle" labelWidth="150">对账单生成日期:</div>
                <el-date-picker v-model="queryInfo.startDate" type="date" value-format="yyyy-MM-dd" placeholder="选择开始日期" @change="dateCheck1"></el-date-picker>
                <div class="datestyle1" labelWidth="150">至</div>
                <el-date-picker v-model="queryInfo.endDate" type="date" value-format="yyyy-MM-dd" placeholder="选择结束日期" @change="dateCheck2"></el-date-picker>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
      <div class="btn-container" slot="controlbar" >
          <el-button type="primary" @click.native.prevent="submitForm('moneycaiwuExamine')">查询</el-button>
          <el-button type="primary" @click.native.prevent="moneycaiwuExamine" class="btn-rowGroup">审核</el-button>
      </div>
      <div v-if="tableShowOrnot">
        <el-table ref="multipleTable" tooltip-effect="dark" @selection-change="handleSelectionChange" :data="tableData" style="width: 100%">
          <el-table-column type="selection" width="50" :selectable="checkSelectable"></el-table-column>
          <el-table-column prop="normalSettlementDate" label="结算年月"  width="150"></el-table-column>
          <el-table-column prop="reconno" label="对账单号"  width="400" >
            <template slot-scope="scope" >
              <span @click="getDetailExamine(scope.row.reconno)" class="tableButton">{{ scope.row.reconno }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="comCode" label="佰盈机构代码"  width="150"></el-table-column>
          <el-table-column prop="comName" label="佰盈机构名称"  width="300" show-overflow-tooltip></el-table-column>
          <el-table-column label="奖金类型" width="120">
            <template>
              <span>手续费</span>
            </template>
          </el-table-column>
          <el-table-column label="对账金额" >
            <el-table-column prop="initialFee" label="首期手续费" width="120"></el-table-column>
            <el-table-column prop="renewalFee" label="续期手续费" width="120"></el-table-column>
            <el-table-column prop="calHandMount" label="对账合计金额" width="120"></el-table-column>
          </el-table-column>
          <el-table-column prop="reconinsertDateStr" label="对账单生成日期" width="120"></el-table-column>
          <el-table-column prop="verifyStatus" label="对账单审核状态" width="120">
            <template slot-scope="scope" >
              <span v-if="scope.row.verifyStatus === '0'">未提交审核</span>
              <span v-else-if="scope.row.verifyStatus === '1'">未提交审核</span>
              <span v-else-if="scope.row.verifyStatus === '2'">待审核</span>
              <span v-else-if="scope.row.verifyStatus === '3'">审核通过</span>
              <span v-else-if="scope.row.verifyStatus === '4'">不通过</span>
            </template>
          </el-table-column>
        </el-table>
        <el-row class="ri-line1">
          <el-col :span="12">
            <div class="block">
              <el-pagination
                @current-change="handleCurrentChange"
                @size-change="handleSizeChange"
                :current-page="queryInfo.currentPage"
                :page-size ="queryInfo.pageSize"
                :page-sizes="[10,20,50]"
                :total="totalRecords"
                layout="total, sizes, prev, pager, next, jumper"
                >
              </el-pagination>
            </div>
          </el-col>
        </el-row>
      </div>
      <ComDialog :vis='comDialog' :workerVis='comDialogworker' :comVis='comDialogCom' :newTableData='tempTableData1' @onClose='comDialogClosing(0)' @selectDialog='dialogBackData' @comdialogChangePageFunction='changeComdialogPage1' @comdialogChangePageSizeFunction='changeComdialogPageSize1' :fenyetotal='fenyetotalData'/>
      <ComDialog :vis='comDialog1' :workerVis='comDialogworker1' :comVis='comDialogCom1' :newTableData='tempTableData2' @onClose='comDialogClosing(1)' @selectDialog='dialogBackData1' @comdialogChangePageFunction='changeComdialogPage2' @comdialogChangePageSizeFunction='changeComdialogPageSize2' :fenyetotal='fenyetotalData'/>
      <ComDialog :vis='comDialog2' :workerVis='comDialogworker2' :comVis='comDialogCom2' :newTableData='tempTableData3' @onClose='comDialogClosing(2)' @selectDialog='dialogBackData2' @comdialogChangePageFunction='changeComdialogPage3' @comdialogChangePageSizeFunction='changeComdialogPageSize3' :fenyetotal='fenyetotalData'/>
      <el-dialog :append-to-body="true" width="96%" center title="对账单详细信息" :visible.sync="detailDialogVis" :before-close='detailDialogClose'>
        <ui-line-tittle :collapsible="true">
          <span slot="title" >
            <i class="font_family icon-jy-menu-4" ></i>手续费对账单详细信息
          </span>
          <div class="ri-content" slot="content" >
            <el-row class="ri-line">
              <el-col :span="12">
                <ui-label-text  label="对账单号：" labelWidth="140" :text="detailDialogData.reconno">
                </ui-label-text>
              </el-col>
              <el-col :span="12">
                <ui-label-text  label="对账单生成日期：" labelWidth="140" :text="detailDialogData.reconinsertDateStr">
                </ui-label-text>
              </el-col>
            </el-row>
            <el-row class="ri-line">
              <el-col :span="12">
                <ui-label-text  label="合作经代公司代码：" labelWidth="140" :text="detailDialogData.companyCode">
                </ui-label-text>
              </el-col>
              <el-col :span="12">
                <ui-label-text  label="合作经代公司名称：" labelWidth="140" :text="detailDialogData.companyName">
                </ui-label-text>
              </el-col>
            </el-row>
            <el-row class="ri-line">
              <el-col :span="12">
                <ui-label-text  label="对账总手续费（含税）：" labelWidth="140" :text="detailDialogData.calHandMount">
                </ui-label-text>
              </el-col>
              <el-col :span="12">
                <ui-label-text  label="对账总手续费（不含税）：" labelWidth="140" :text="detailDialogData.calNoHandMount">
                </ui-label-text>
              </el-col>
            </el-row>
            <el-row class="ri-line">
              <el-col :span="12">
                <ui-label-text  label="对账总手续费税额:" labelWidth="140" :text="detailDialogData.caltaxMount">
                </ui-label-text>
              </el-col>
              <el-col :span="12">
                <ui-label-text  label="奖金类型：" labelWidth="140" text="手续费">
                </ui-label-text>
              </el-col>
            </el-row>
            <el-row class="ri-line">
              <el-col :span="12">
                <ui-label-text label="首期手续费：" labelWidth="160" :text="detailDialogData.initialFee">
                </ui-label-text>
              </el-col>
              <el-col :span="12">
                <ui-label-text label="续期手续费：" labelWidth="160" :text="detailDialogData.renewalFee">
                </ui-label-text>
              </el-col>
            </el-row>
          </div>
        </ui-line-tittle>
        <ui-line-tittle :collapsible="true">
          <span slot="title" >
            <i class="font_family icon-jy-menu-4" ></i>手续费对账单详细信息
          </span>
          <div class="ri-content" slot="content" >
            <el-table ref="multipleTable" tooltip-effect="dark" style="width: 100%" :data="dialogTableData">
              <el-table-column prop="comCode" label="佰盈机构代码"  width="160" show-overflow-tooltip></el-table-column>
              <el-table-column prop="comName" label="佰盈机构名称" width="300" show-overflow-tooltip></el-table-column>
              <el-table-column prop="policyNo" label="保单号" width="250" show-overflow-tooltip></el-table-column>
              <el-table-column prop="riskCode" label="险种代码" width="120" show-overflow-tooltip></el-table-column>
              <el-table-column prop="riskName" label="险种名称" width="300" show-overflow-tooltip></el-table-column>
              <el-table-column prop="paymentperiod" label="缴费年期"  width="120" show-overflow-tooltip></el-table-column>
              <el-table-column prop="paidpremium" label="实收保费" width="150" show-overflow-tooltip></el-table-column>
              <el-table-column prop="basicServiceFee" label="首年基础服务费" width="150" show-overflow-tooltip></el-table-column>
              <el-table-column prop="supplementCharge" label="补充手续费" width="150" show-overflow-tooltip></el-table-column>
              <el-table-column prop="platformReward" label="平台奖励费用" width="150" show-overflow-tooltip></el-table-column>
              <el-table-column prop="deductionVATFee" label="增值税专票抵扣费用" width="150" show-overflow-tooltip></el-table-column>
              <el-table-column prop="xqJcFwf" label="续期基础服务费" width="150" show-overflow-tooltip></el-table-column>
              <el-table-column prop="xqFwJt" label="续期服务津贴" width="150" show-overflow-tooltip></el-table-column>
              <el-table-column prop="hxlJj" label="继续率奖金" width="150" show-overflow-tooltip></el-table-column>
            </el-table>
            <div class="block">
              <el-pagination
                @current-change="handleCurrentChange1"
                @size-change="handleSizeChange1"
                :current-page="detailQueryData.currentPage"
                :page-size ="detailQueryData.pageSize"
                :page-sizes="[10,20,50]"
                :total="totalRecords1"
                layout="total, sizes, prev, pager, next, jumper"
                >
              </el-pagination>
            </div>
          </div>
        </ui-line-tittle>
        <div class="btn-container">
          <el-button type="primary" @click="detailDialogVis = false">返回</el-button>
        </div>
      </el-dialog>
      <!--审核 的弹框-->
      <el-dialog :append-to-body="true" width="80%" center title="审核" :visible.sync="examineDialog">
        <el-row class="ri-line">
          <el-col :span="24">
            <el-radio v-model="shenheResult" label='1' >审核通过</el-radio>
            <el-radio v-model="shenheResult" label='9' >审核不通过</el-radio>
          </el-col>
        </el-row>
        <div class="center">
          <el-button type="primary" class="button_add" @click.native.prevent="examine()">提交审核</el-button>
        </div>
      </el-dialog>
    </div>
</template>

<script>
import NoticeBar from '@/components/notice-bar'
import LineTittle from '@/components/line-tittle'
import LabelText from '@/components/label-text'
import { mapActions } from 'vuex'
import IsEmpty from '@/utils/IsEmpty'
import ComDialog from '@/components/comDialog'
import {
  api
} from '@/api/lifeInsur_mgr/quitListMgr.js'

export default {
  name: '',
  data () {
    return {
      queryInfo: {
        comCode: '', // 佰盈分公司代码
        comName: '', // 佰盈分公司名称
        cooperationCode: '', // 合作经代公司代码
        cooperationName: '', //  合作经代公司名称
        startDate: '',
        endDate: '',
        verifyStatus: '',
        currentPage: 1,
        pageSize: 10
      },
      coopComQueryData: {
        current: 1,
        companyCodeOrName: '',
        pageSize: 10,
        clickType: '2'
      },
      coopOrgQueryData: {
        current: 1,
        orgCodeOrName: '',
        companyCode: '',
        pageSize: 10,
        clickType: '2'
      },
      orgQueryInfo: {
        clickType: '2',
        comCodeOrName: '',
        currentPage: 1,
        pageSize: 10
      },
      detailQueryData: {
        reconno: '',
        pageSize: 10,
        currentPage: 1
      },
      rules: {
        comCode: [
          { required: true, message: '请输入佰盈机构代码', trigger: 'change' }
        ],
        comName: [
          { required: true, message: '请输入佰盈机构名称', trigger: 'change' }
        ]
      },
      fileList: [],
      tableShowOrnot: false,
      comDialog: false,
      comDialogCom: false,
      comDialogworker: false,
      comDialog1: false,
      comDialogCom1: false,
      comDialogworker1: false,
      comDialog2: false,
      comDialogCom2: false,
      comDialogworker2: false,
      dialogTableVisibleCheck: false,
      detailDialogVis: false,
      fenyetotalData: 0,
      tempTableData1: [],
      tempTableData2: [],
      tempTableData3: [],
      dialogTableData: [],
      examineNo: '',
      tableData: [],
      multipleSelection: [],
      shenheResult: '',
      detailDialogData1: {},
      totalRecords1: 0,
      examineDialog: false
    }
  },
  mounted () {
  },
  watch: {
    'queryInfo.comCode' () {
      if (this.queryInfo.comCode === '') {
        this.queryInfo.comName = ''
      }
    },
    'queryInfo.comName' () {
      if (this.queryInfo.comName === '') {
        this.queryInfo.comCode = ''
      }
    },
    'queryInfo.cooperationCode' () {
      if (this.queryInfo.cooperationCode === '') {
        this.queryInfo.cooperationName = ''
      }
    },
    'queryInfo.cooperationName' () {
      if (this.queryInfo.cooperationName === '') {
        this.queryInfo.cooperationCode = ''
      }
    }
  },
  methods: {
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.totalRecords = 0
          this.queryInfo.currentPage = 1
          this.queryData()
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
    opensingleComDialog (index) {
      if (!(this.comDialog || this.comDialog1 || this.comDialog2)) {
        switch (index) {
          case 0:
            this.orgQueryInfo.clickType = '1'
            if (!IsEmpty(this.queryInfo.comCode)) {
              this.orgQueryInfo.comCodeOrName = this.queryInfo.comCode
            } else if (!IsEmpty(this.queryInfo.comName)) {
              this.orgQueryInfo.comCodeOrName = this.queryInfo.comName
            } else {
              this.orgQueryInfo.comCodeOrName = ''
            }
            this.contiListCheckDialogDataGet1(this.orgQueryInfo).then(
              (res) => {
                console.log(res)
                if (res.data.code !== '000000' && !IsEmpty(res.data.code)) {
                  this.openToast('warning', res.data.msg)
                } else {
                  if (res.data.data.data.length === 1) {
                    this.queryInfo.comCode = res.data.data.data[0].comCode
                    this.queryInfo.comName = res.data.data.data[0].comCName
                  }
                }
              }
            )
            break
          case 1:
            this.coopComQueryData.clickType = '1'
            if (!IsEmpty(this.queryInfo.cooperationCode)) {
              this.coopComQueryData.companyCodeOrName = this.queryInfo.cooperationCode
            } else if (!IsEmpty(this.queryInfo.cooperationName)) {
              this.coopComQueryData.companyCodeOrName = this.queryInfo.cooperationName
            } else {
              this.coopComQueryData.companyCodeOrName = ''
            }
            this.cooperInsureBillFinancedblqueryCom1(this.coopComQueryData).then(
              (res) => {
                console.log(res)
                if (res.data.code !== '000000' && !IsEmpty(res.data.code)) {
                  this.openToast('warning', res.data.msg)
                } else {
                  if (res.data.data.data.length === 1) {
                    this.queryInfo.cooperationCode = res.data.data.data[0].companyCode
                    this.queryInfo.cooperationName = res.data.data.data[0].companyName
                  }
                }
              }
            )
            break
          // case 2:
          //   if (IsEmpty(this.queryInfo.cooperationCode) && IsEmpty(this.queryInfo.cooperationName)) {
          //     this.openToast('warning', '请先输入合作经代公司')
          //     this.queryInfo.cooperationComCode = ''
          //     this.queryInfo.cooperationComName = ''
          //   } else {
          //     this.coopOrgQueryData.companyCode = this.queryInfo.cooperationCode
          //     if (!IsEmpty(this.queryInfo.cooperationComCode)) {
          //       this.coopOrgQueryData.orgCodeOrName = this.queryInfo.cooperationComCode
          //     } else if (!IsEmpty(this.queryInfo.cooperationComName)) {
          //       this.coopOrgQueryData.orgCodeOrName = this.queryInfo.cooperationComName
          //     } else {
          //       this.coopOrgQueryData.orgCodeOrName = ''
          //     }
          //     this.coopOrgQueryData.clickType = '1'
          //     this.cooperInsureBillFinancedblqueryCom2(this.coopOrgQueryData).then(
          //       (res) => {
          //         console.log(res)
          //         if (res.data.code !== '000000' && !IsEmpty(res.data.code)) {
          //           this.openToast('warning', res.data.msg)
          //         } else {
          //           if (res.data.data.data.length === 1) {
          //             this.queryInfo.cooperationComCode = res.data.data.data[0].orgCode
          //             this.queryInfo.cooperationComName = res.data.data.data[0].orgName
          //           }
          //         }
          //       }
          //     )
          //   }
          //   break
          default:
            break
        }
      }
    },
    moneycaiwuExamine () {
      if (this.multipleSelection.length === 0) {
        this.openToast('warning', '请先选择一条数据')
      } else {
        this.examineDialog = true
      }
    },
    openComDialog (index) {
      switch (index) {
        case 0:
          this.coopComQueryData.clickType = '2'
          if (!IsEmpty(this.queryInfo.cooperationCode)) {
            this.coopComQueryData.companyCodeOrName = this.queryInfo.cooperationCode
          } else if (!IsEmpty(this.queryInfo.cooperationName)) {
            this.coopComQueryData.companyCodeOrName = this.queryInfo.cooperationName
          } else {
            this.coopComQueryData.companyCodeOrName = ''
          }
          this.cooperInsureBillFinancedblqueryCom1(this.coopComQueryData).then(
            (res) => {
              console.log(res)
              if (res.data.code !== '000000' && !IsEmpty(res.data.code)) {
                this.openToast('warning', res.data.msg)
              } else {
                this.tempTableData1 = res.data.data.data
                for (let i = 0; i < this.tempTableData1.length; i++) {
                  this.tempTableData1[i]['renderData'] = `${this.tempTableData1[i].companyCode}-${this.tempTableData1[i].companyName}`
                }
                this.fenyetotalData = res.data.data.totalRecords
                this.comDialog = true
                this.comDialogCom = true
                this.comDialogworker = false
              }
            }
          )
          break
        // case 1:
        //   if (IsEmpty(this.queryInfo.cooperationCode) && IsEmpty(this.queryInfo.cooperationName)) {
        //     this.openToast('warning', '请先输入合作经代公司')
        //     this.queryInfo.cooperationComCode = ''
        //     this.queryInfo.cooperationComName = ''
        //   } else {
        //     this.coopOrgQueryData.companyCode = this.queryInfo.cooperationCode
        //     if (!IsEmpty(this.queryInfo.cooperationComCode)) {
        //       this.coopOrgQueryData.orgCodeOrName = this.queryInfo.cooperationComCode
        //     } else if (!IsEmpty(this.queryInfo.cooperationComName)) {
        //       this.coopOrgQueryData.orgCodeOrName = this.queryInfo.cooperationComName
        //     } else {
        //       this.coopOrgQueryData.orgCodeOrName = ''
        //     }
        //     this.coopOrgQueryData.clickType = '2'
        //     this.cooperInsureBillFinancedblqueryCom2(this.coopOrgQueryData).then(
        //       (res) => {
        //         console.log(res)
        //         if (res.data.code !== '000000' && !IsEmpty(res.data.code)) {
        //           this.openToast('warning', res.data.msg)
        //         } else {
        //           this.tempTableData2 = res.data.data.data
        //           for (let i = 0; i < this.tempTableData2.length; i++) {
        //             this.tempTableData2[i]['renderData'] = `${this.tempTableData2[i].orgCode}-${this.tempTableData2[i].orgName}`
        //           }
        //           this.fenyetotalData = res.data.data.totalRecords
        //           this.comDialog1 = true
        //           this.comDialogCom1 = true
        //           this.comDialogworker1 = false
        //         }
        //       }
        //     )
        //   }
        //   break
        case 2:
          if (!IsEmpty(this.queryInfo.comCode)) {
            this.orgQueryInfo.comCodeOrName = this.queryInfo.comCode
          } else if (!IsEmpty(this.queryInfo.comName)) {
            this.orgQueryInfo.comCodeOrName = this.queryInfo.comName
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
                this.tempTableData3 = res.data.data.data
                for (let i = 0; i < this.tempTableData3.length; i++) {
                  this.tempTableData3[i]['renderData'] = `${this.tempTableData3[i].comCode}-${this.tempTableData3[i].comCName}`
                }
                this.fenyetotalData = res.data.data.totalRecords
                this.comDialog2 = true
                this.comDialogCom2 = true
                this.comDialogworker2 = false
              }
            }
          )
          break
        default:
          break
      }
    },
    dateCheck1 (e) {
      if (!IsEmpty(this.queryInfo.startDate) && !IsEmpty(this.queryInfo.endDate)) {
        if (e > this.queryInfo.endDate) {
          this.openToast('warning', '开始日期不能大于结束日期')
          this.queryInfo.endDate = ''
        }
      }
    },
    dateCheck2 (e) {
      if (!IsEmpty(this.queryInfo.startDate) && !IsEmpty(this.queryInfo.endDate)) {
        if (e < this.queryInfo.startDate) {
          this.openToast('warning', '开始日期不能大于结束日期')
          this.queryInfo.endDate = ''
        }
      }
    },
    detailDialogClose () {
      this.detailDialogVis = false
      this.detailDialogData1 = {}
      this.dialogTableData = []
      this.examineNo = ''
      this.initDialogData()
    },
    changeComdialogPage1 (data) {
      this.coopComQueryData.current = data
      this.openComDialog(0)
    },
    changeComdialogPage2 (data) {
      this.coopOrgQueryData.current = data
      this.openComDialog(1)
    },
    changeComdialogPage3 (data) {
      this.orgQueryInfo.currentPage = data
      this.openComDialog(2)
    },
    changeComdialogPageSize1 (data) {
      this.coopComQueryData.current = 1
      this.coopComQueryData.pageSize = data
      this.openComDialog(0)
    },
    changeComdialogPageSize2 (data) {
      this.coopOrgQueryData.current = 1
      this.coopOrgQueryData.pageSize = data
      this.openComDialog(1)
    },
    changeComdialogPageSize3 (data) {
      this.orgQueryInfo.currentPage = 1
      this.orgQueryInfo.pageSize = data
      this.openComDialog(2)
    },
    handleSelectionChange (val) {
      this.multipleSelection = val
    },
    checkSelectable (row, index) {
      if (row.verifyStatus === '2') {
        return 1
      } else { // 不可勾选
        return 0
      }
    },
    initDialogData () {
      this.detailDialogData1 = {}
      this.dialogTableData = []
      this.coopComQueryData = {
        current: 1,
        companyCodeOrName: '',
        pageSize: 10,
        clickType: '2'
      }
      this.coopOrgQueryData = {
        current: 1,
        orgCodeOrName: '',
        companyCode: '',
        pageSize: 10,
        clickType: '2'
      }
      this.detailQueryData = {
        reconno: '',
        pageSize: 10,
        currentPage: 1
      }
      this.orgQueryInfo = {
        clickType: '2',
        comCodeOrName: '',
        currentPage: 1,
        pageSize: 10
      }
    },
    comDialogClosing (index) {
      this.comDialog = false
      this.comDialog1 = false
      this.comDialog2 = false
      this.initDialogData()
      switch (index) {
        case 0:
          this.queryInfo.companyCode = ''
          this.queryInfo.companyName = ''
          break
        case 1:
          this.queryInfo.orgCode = ''
          this.queryInfo.orgName = ''
          break
        case 2:
          this.queryInfo.comCode = ''
          this.queryInfo.comName = ''
          break
        default:
          break
      }
    },
    dialogBackData (data) {
      this.initDialogData()
      this.comDialog = false
      let temp = []
      temp = data.split('-')
      this.queryInfo.cooperationCode = temp[0]
      this.queryInfo.cooperationName = temp[1]
    },
    // dialogBackData1 (data) {
    //   this.initDialogData()
    //   this.comDialog1 = false
    //   let temp = []
    //   temp = data.split('-')
    //   this.queryInfo.cooperationComCode = temp[0]
    //   this.queryInfo.cooperationComName = temp[1]
    // },
    dialogBackData2 (data) {
      this.initDialogData()
      this.comDialog2 = false
      let temp = []
      temp = data.split('-')
      this.queryInfo.comCode = temp[0]
      this.queryInfo.comName = temp[1]
    },
    queryData () {
      this.Loading()
      this.tableData = []
      api('/cooperationCharge/queryCooperationCharge', 'post', this.queryInfo).then((res) => {
        this.closeLoading()
        if (res.data.code !== '000000' && !IsEmpty(res.data.code)) {
          this.openToast('warning', res.data.msg)
        } else {
          this.tableData = res.data.content
          this.tableShowOrnot = true
          this.totalRecords = res.data.totalElements
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
    handleCurrentChange (val) {
      this.queryInfo.currentPage = val
      this.queryData()
    },
    handleSizeChange (val) {
      this.queryInfo.currentPage = 1
      this.queryInfo.pageSize = val
      this.queryData()
    },
    handleCurrentChange1 (val) {
      this.detailQueryData.currentPage = val
      this.getDetailExamine(this.examineNo)
    },
    handleSizeChange1 (val) {
      this.detailQueryData.currentPage = 1
      this.detailQueryData.pageSize = val
      this.getDetailExamine(this.examineNo)
    },
    getDetailExamine (info) {
      // 财务查看详情
      this.Loading()
      this.examineNo = info
      this.detailQueryData.reconno = info
      api('/cooperationCharge/queryCoolifeChargePoundageReconVODetail', 'post', this.detailQueryData).then((res) => {
        console.log(res)
        this.closeLoading()
        if (res.data.code !== '000000' && !IsEmpty(res.data.code)) {
          this.openToast('warning', res.data.msg)
        } else {
          // 这里接详情数据
          this.detailDialogData1 = res.data
          this.dialogTableData = res.data.coolifeChargeDetailVO.content
          this.totalRecords1 = res.data.coolifeChargeDetailVO.totalElements
          this.detailDialogVis = true
        }
      })
    },
    initAll () {
      this.coopComQueryData = {
        current: 1,
        companyCodeOrName: '',
        pageSize: 10,
        clickType: '2'
      }
      this.coopOrgQueryData = {
        current: 1,
        orgCodeOrName: '',
        companyCode: '',
        pageSize: 10,
        clickType: '2'
      }
      this.orgQueryInfo = {
        clickType: '2',
        comCodeOrName: '',
        currentPage: 1,
        pageSize: 10
      }
    },
    examine () {
      // 财务审核
      if (IsEmpty(this.shenheResult)) {
        this.openToast('warning', '请勾选审核结论')
      } else {
        let temp = {}
        temp['reconno'] = ''
        for (let i = 0; i < this.multipleSelection.length; i++) {
          temp['reconno'] += `${this.multipleSelection[i].reconno},`
        }
        temp['status'] = this.shenheResult
        api('/cooperationCharge/saveCoolifeChargePoundageReconn', 'post', temp).then((res) => {
          console.log(res)
          this.examineDialog = false
          if (res.data === '操作成功!') {
            this.openToast('success', res.data)
            this.queryInfo.currentPage = 1
            this.queryInfo.pageSize = 10
            this.queryData()
            this.initAll()
          } else {
            if (typeof (res.data) === 'string') {
              this.openToast('warning', res.data)
            } else {
              this.openToast('warning', res.data.msg)
            }
          }
        })
      }
    },
    ...mapActions([
      'cooperInsureBillFinancedblqueryCom1', 'contiListCheckDialogDataGet1'
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
    detailDialogData () {
      let temp = JSON.parse(JSON.stringify(this.detailDialogData1))
      if (!IsEmpty(temp)) {
        switch (temp.verifyStatus) {
          case '0':
            temp.verifyStatus = '未提交审核'
            break
          case '1':
            temp.verifyStatus = '未提交审核'
            break
          case '2':
            temp.verifyStatus = '待审核'
            break
          case '3':
            temp.verifyStatus = '审核通过'
            break
          case '4':
            temp.verifyStatus = '不通过'
            break
          default:
            break
        }
        switch (temp.type) {
          case '0':
            temp.type = '手续费'
            break
          case '1':
            temp.type = '服务费'
            break
          case '2':
            temp.type = '其他经纪代理服务'
            break
          case '3':
            temp.type = '保险代理手续费'
            break
          default:
            break
        }
        switch (temp.status) {
          case '0':
            temp.status = '生成对账单'
            break
          case '1':
            temp.status = '生成结算单'
            break
          case '2':
            temp.status = '付款确认'
            break
          case '3':
            temp.status = '账单删除'
            break
          default:
            break
        }
        return temp
      } else {
        return []
      }
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
  margin-top: 60px;
  margin-bottom: 30px;
}
.ri-line{
  margin-top: 10px;
  margin-bottom: 10px;
}
.datestyle{
  color: #717171;
  font-size: 0.875rem;
  display: inline-block;
  width: 120px;
}
.datestyle1{
  color: #717171;
  font-size: 0.875rem;
  display: inline-block;
  text-align: center;
  width: 60px;
}
.el-pagination{
  float: right;
  padding-right: 50px;
}
.testInput{
  padding-right: 18px
}
.ri-line1{
  margin-top: 30px;
  margin-bottom: 10px;
}
.center{text-align: center}
.tableButton {
  cursor: pointer;
  color: #66B1FF;
}
</style>
