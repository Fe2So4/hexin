<template>
  <div id="orgadd" >
      <ui-notice-bar slot="breadcast" >
        <el-breadcrumb slot="location" separator=">">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>对账单管理</el-breadcrumb-item>
            <el-breadcrumb-item>银保代理对账单管理</el-breadcrumb-item>
            <el-breadcrumb-item>运营部审核</el-breadcrumb-item>
          </el-breadcrumb>
      </ui-notice-bar>
      <!--审核 的弹框-->
      <el-dialog :append-to-body="true" width="80%" center title="审核" :visible.sync="shenheDialogVis">
        <el-row class="ri-line">
          <el-col :span="24">
            <el-radio v-model="shenheResult.status" label='2' >审核通过</el-radio>
            <el-radio v-model="shenheResult.status" label='9' >审核不通过</el-radio>
          </el-col>
        </el-row>
        <el-row class="ri-line">
          <el-col :span="24">
            <ui-label-text labelWidth="90" label="审核意见:" >
              <el-input labelWidth="300" type="textarea" v-model="shenheResult.remark" slot="text" ></el-input>
            </ui-label-text>
          </el-col>
        </el-row>
        <div class="center">
          <el-button type="primary" class="button_add" @click.native.prevent="examine()">提交审核</el-button>
        </div>
      </el-dialog>
      <div class="ri-content" slot="content" >
        <div class="ri-content" slot="content" >
          <el-form ref="bankChargeCheck" :rules="rules" :model="queryInfo">
            <el-row class="ri-line">
              <el-col :span=12>
                <el-form-item prop='comCode'>
                  <ui-label-text :required="true" labelWidth="180" label="佰盈机构代码：">
                    <el-input v-model="queryInfo.comCode" slot="text" @dblclick.native="openComDialog(0)"  @blur='opensingleComDialog(1)' clearable placeholder="双击可选择"></el-input>
                  </ui-label-text>
                </el-form-item>
              </el-col>
              <el-col :span=12>
                <el-form-item prop='comName'>
                  <ui-label-text labelWidth="180" :required="true" label="佰盈机构名称：">
                    <el-input v-model="queryInfo.comName" slot="text" @dblclick.native="openComDialog(0)"  @blur='opensingleComDialog(1)' clearable placeholder="双击可选择" ></el-input>
                  </ui-label-text>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row class="ri-line">
              <el-col :span=12>
                <el-form-item prop='companyCode'>
                  <ui-label-text labelWidth="180" label="保险公司代码：" >
                    <el-input v-model="queryInfo.companyCode" slot="text" @dblclick.native="openComDialog(1)" @blur='opensingleComDialog(0)' clearable placeholder="双击可选择"></el-input>
                  </ui-label-text>
                </el-form-item>
              </el-col>
              <el-col :span=12>
                <el-form-item prop='companyName'>
                  <ui-label-text labelWidth="180" label="保险公司名称：" >
                    <el-input v-model="queryInfo.companyName" slot="text" @dblclick.native="openComDialog(1)" @blur='opensingleComDialog(0)' clearable placeholder="双击可选择"></el-input>
                  </ui-label-text>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row class="ri-line">
              <el-col :span=12>
                <el-form-item prop='verifyStatus'>
                  <ui-label-text labelWidth="180" label="审核状态：" >
                    <el-select v-model="queryInfo.verifyStatus" slot="text" placeholder="请选择">
                      <el-option
                          label="待审核"
                          value="1">
                      </el-option>
                      <el-option
                          label="审核通过"
                          value="2">
                      </el-option>
                      <el-option
                          label="不通过"
                          value="9">
                      </el-option>
                    </el-select>
                  </ui-label-text>
                </el-form-item>
              </el-col>
              <el-col :span=12>
                <el-form-item prop='status'>
                  <ui-label-text labelWidth="180" label="结算状态：" >
                    <el-select v-model="queryInfo.status" slot="text" placeholder="请选择">
                      <el-option
                          label="未审核"
                          value="1">
                      </el-option>
                      <el-option
                          label="复核通过"
                          value="2">
                      </el-option>
                      <el-option
                          label="审核通过"
                          value="3">
                      </el-option>
                    </el-select>
                  </ui-label-text>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row class="ri-line">
              <el-col :span=12>
                <el-form-item prop='status'>
                  <ui-label-text labelWidth="180" label="对账单生成年月：" >
                    <el-date-picker
                      v-model="queryInfo.makeTime"
                      type="daterange"
                      value-format="yyyy-MM-dd"
                      slot="text"
                      range-separator="至"
                      start-placeholder="开始日期"
                      end-placeholder="结束日期">
                    </el-date-picker>
                  </ui-label-text>
                </el-form-item>
              </el-col>
              <el-col :span=12>
                <el-form-item prop='yearMouth'>
                  <ui-label-text labelWidth="180" label="结算年月(轨迹查询专用)：" >
                    <el-input v-model="queryInfo.yearMouth" slot="text" placeholder="范例：YYYYMM(201706)"></el-input>
                  </ui-label-text>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </div>
        <div class="btn-container" slot="controlbar" >
            <el-button type="primary" @click.native.prevent="submitForm('bankChargeCheck',0)" :disabled="quanxian.query">查询</el-button>
            <el-button type="primary" @click.native.prevent="submitForm('bankChargeCheck',1)" :disabled="quanxian.export">导出Excel</el-button>
            <el-button type="primary" @click.native.prevent="submitForm('bankChargeCheck',2)" :disabled="quanxian.trace">轨迹查询</el-button>
            <el-button type="primary" @click.native.prevent="bankgoExamine()" :disabled="quanxian.review">审核</el-button>
        </div>
        <ComDialog :vis='comDialog' :workerVis='comDialogworker' :comVis='comDialogCom' :newTableData='tempTableData1' @onClose='comDialogClosing' @selectDialog='dialogBackData'  @comdialogChangePageFunction='changeComdialogPage1' @comdialogChangePageSizeFunction='changeComdialogPageSize1' :fenyetotal='fenyetotalData'/>
        <ComDialog :vis='comDialog1' :workerVis='comDialogworker1' :comVis='comDialogCom1' :newTableData='tempTableData2' @onClose='comDialogClosing' @selectDialog='dialogBackData1' @comdialogChangePageFunction='changeComdialogPage2' @comdialogChangePageSizeFunction='changeComdialogPageSize2' :fenyetotal='fenyetotalData'/>
      </div>
      <div v-if="tableShowOrNot">
        <el-table stripe ref="multipleTable" :data="tabledata" tooltip-effect="dark" style="width: 100%"  @selection-change="handleSelectionChange">
            <el-table-column type="selection" width="55"></el-table-column>
            <el-table-column prop="batchNo" label="对账单号" width="350" show-overflow-tooltip>
              <template slot-scope="scope" >
                <span @click="openlifeInsureBillDetail(scope.row.batchNo)" class="tableButton">{{ scope.row.batchNo }}</span>
              </template>
            </el-table-column>
            <el-table-column prop="companyName" label="保险公司"  width="300">
            </el-table-column>
            <el-table-column prop="comName" label="佰盈公司" width="300" show-overflow-tooltip>
            </el-table-column>
            <el-table-column label="对账金额" width="180">
              <el-table-column prop="firstBrokerageCharge" label="首期佣金" width="180">
              </el-table-column>
              <el-table-column prop="programAward" label="方案奖励" width="180">
              </el-table-column>
              <el-table-column prop="sellAward" label="销售奖金" width="180">
              </el-table-column>
              <el-table-column prop="firstComprehensiveCharge" label="首年综合管理费" width="180">
              </el-table-column>
              <el-table-column prop="sqCalHandMount" label="首期手续费" width="180">
              </el-table-column>
              <el-table-column prop="continueBrokerageCharge" label="续年佣金" width="180">
              </el-table-column>
              <el-table-column prop="continueServiceReward" label="续年服务津贴" width="180">
              </el-table-column>
              <el-table-column prop="persistencyAward" label="继续率奖金" width="180">
              </el-table-column>
              <el-table-column prop="continueComprehensiveCharge" label="续年综合管理费" width="180">
              </el-table-column>
              <el-table-column prop="xqCalHandMount" label="续期手续费" width="180">
              </el-table-column>
              <el-table-column prop="calHandMount" label="对账合计金额" width="180">
              </el-table-column>
            </el-table-column>
            <el-table-column prop="reconinsertDateStr" label="对账单生成日期" width="350">
            </el-table-column>
            <el-table-column prop="status" label="是否结算" width="120">
            </el-table-column>
            <el-table-column prop="verifyStatus" label="是否审核" width="120">
            </el-table-column>
          </el-table>
          <div>
            <el-pagination
              @current-change="handleCurrentChange"
              :current-page="queryInfo.currentPage"
              :page-size ="queryInfo.pageSize"
              @size-change="handleSizeChange"
              :page-sizes="[10,20,50]"
              layout="total, sizes, prev, pager, next, jumper"
              :total="fenyetotalData1"
              >
            </el-pagination>
          </div>
      </div>
      <!-- 详情 -->
      <el-dialog :append-to-body="true" width="85%" title="详情" :visible.sync="dialogDetailVisibleCode" :before-close='tableDetailClose'>
        <ui-line-tittle :collapsible="true" >
          <span slot="title" >
              <i class="font_family icon-jy-menu-4" ></i>对账单详细信息
          </span>
          <div class="ri-content" slot="content" >
            <el-row class="ri-line">
              <el-col :span="12">
                <ui-label-text labelWidth="120" label="对账单号：" >
                  <el-input v-model="billDetailData.batchNo" slot="text" readonly></el-input>
                </ui-label-text>
              </el-col>
              <el-col :span="12">
                <ui-label-text labelWidth="120" label="对账单运营审核状态:" >
                  <el-input v-model="billDetailData.verifyStatus" slot="text" readonly></el-input>
                </ui-label-text>
              </el-col>
            </el-row>
            <el-row class="ri-line">
              <el-col :span="12">
                <ui-label-text labelWidth="120" label="保险公司代码：" >
                  <el-input v-model="billDetailData.companyCode" slot="text" readonly></el-input>
                </ui-label-text>
              </el-col>
              <el-col :span="12">
                <ui-label-text labelWidth="120" label="保险公司名称：" >
                  <el-input v-model="billDetailData.companyName" slot="text" readonly></el-input>
                </ui-label-text>
              </el-col>
            </el-row>
            <el-row class="ri-line">
              <el-col :span="12">
                <ui-label-text labelWidth="120" label="保险公司机构代码：" >
                  <el-input v-model="billDetailData.companyComCode" slot="text" readonly></el-input>
                </ui-label-text>
              </el-col>
              <el-col :span="12">
                <ui-label-text labelWidth="120" label="保险公司机构名称：" >
                  <el-input v-model="billDetailData.companyComName" slot="text" readonly></el-input>
                </ui-label-text>
              </el-col>
            </el-row>
            <el-row class="ri-line">
              <el-col :span="12">
                <ui-label-text labelWidth="120" label="对账单生成人代码：" >
                  <el-input v-model="billDetailData.reconinsertCode" slot="text" readonly></el-input>
                </ui-label-text>
              </el-col>
              <el-col :span="12">
                <ui-label-text labelWidth="120" label="对账单生成人名称：" >
                  <el-input v-model="billDetailData.reconinsertName" slot="text" readonly></el-input>
                </ui-label-text>
              </el-col>
            </el-row>
            <el-row class="ri-line">
              <el-col :span="12">
                <ui-label-text labelWidth="120" label="对账单生成日期:" >
                  <el-input v-model="billDetailData.reconinsertDateStr" slot="text" readonly></el-input>
                </ui-label-text>
              </el-col>
              <el-col :span="12">
                <ui-label-text labelWidth="120" label="收款日期:" >
                  <el-input slot="text" v-model="billDetailData.reconinsertDateStr" readonly></el-input>
                </ui-label-text>
              </el-col>
            </el-row>
            <el-row class="ri-line">
              <el-col :span="12">
                <ui-label-text labelWidth="120" label="对账总手续费（不含税）:" >
                  <el-input v-model="billDetailData.calNoHandMount" slot="text" readonly></el-input>
                </ui-label-text>
              </el-col>
              <el-col :span="12">
                <ui-label-text labelWidth="120" label="对账总手续费（含税）：" >
                  <el-input v-model="billDetailData.calHandMount" slot="text" readonly></el-input>
                </ui-label-text>
              </el-col>
            </el-row>
            <el-row class="ri-line">
              <el-col :span="12">
                <ui-label-text labelWidth="120" label="对账总手续费税额：" >
                  <el-input v-model="billDetailData.caltaxMount" slot="text" readonly></el-input>
                </ui-label-text>
              </el-col>
              <el-col :span="12">
                <ui-label-text labelWidth="120" label="奖金类型：" >
                  <el-input v-model="billDetailData.type" slot="text" readonly></el-input>
                </ui-label-text>
              </el-col>
            </el-row>
            <el-row class="ri-line">
              <el-col :span="12">
                <ui-label-text labelWidth="120" label="首期手续费：" >
                  <el-input v-model="billDetailData.sqCalHandMount" slot="text" readonly></el-input>
                </ui-label-text>
              </el-col>
            </el-row>
            <el-row class="ri-line">
              <el-col :span="12">
                <ui-label-text labelWidth="120" label="续期手续费：" >
                  <el-input v-model="billDetailData.xqCalHandMount" slot="text" readonly></el-input>
                </ui-label-text>
              </el-col>
            </el-row>
          </div>
        </ui-line-tittle>
        <ui-line-tittle :collapsible="true" >
          <span slot="title" >
              <i class="font_family icon-jy-menu-4" ></i>对账单明细
          </span>
          <div class="ri-content" slot="content" >
            <el-table stripe ref="multipleTable" :data="dialogTableData" tooltip-effect="dark" style="width: 100%">
              <el-table-column
                label="佰盈机构代码"
                width="180">
                <template slot-scope="scope">
                  <span style="margin-left: 10px">{{ scope.row.comcode }}</span>
                </template>
              </el-table-column>
              <el-table-column
                label="佰盈机构名称"
                width="180">
                <template slot-scope="scope">
                  <span style="margin-left: 10px">{{ scope.row.comname }}</span>
                </template>
              </el-table-column>
              <el-table-column
                label="保单号"
                width="180">
                <template slot-scope="scope">
                  <span style="margin-left: 10px">{{ scope.row.policyno }}</span>
                </template>
              </el-table-column>
              <el-table-column
                label="险种代码">
                <el-table-column
                  label="佰盈"
                  width="180">
                  <template slot-scope="scope">
                    <span style="margin-left: 10px">{{ scope.row.riskcode }}</span>
                  </template>
                </el-table-column>
                <el-table-column
                  label="保险公司"
                  width="180">
                  <template slot-scope="scope">
                    <span style="margin-left: 10px">{{ scope.row.riskcode2 }}</span>
                  </template>
                </el-table-column>
              </el-table-column>
              <el-table-column
                label="实收保费">
                <el-table-column
                  label="佰盈"
                  width="180">
                  <template slot-scope="scope">
                    <span style="margin-left: 10px">{{ scope.row.paidpremium }}</span>
                  </template>
                </el-table-column>
                <el-table-column
                  label="保险公司"
                  width="180">
                  <template slot-scope="scope">
                    <span style="margin-left: 10px">{{ scope.row.paidpremium2 }}</span>
                  </template>
                </el-table-column>
              </el-table-column>
              <el-table-column
                label="手续费">
                <el-table-column
                  label="佰盈"
                  width="180">
                  <template slot-scope="scope">
                    <span style="margin-left: 10px">{{ scope.row.poundage }}</span>
                  </template>
                </el-table-column>
                <el-table-column
                  label="保险公司"
                  width="180">
                  <template slot-scope="scope">
                    <span style="margin-left: 10px">{{ scope.row.poundage2 }}</span>
                  </template>
                </el-table-column>
              </el-table-column>
            </el-table>
          </div>
        </ui-line-tittle>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogDetailVisibleCode = false">返 回</el-button>
        </span>
      </el-dialog>
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
} from '@/api/lifeInsur_mgr/lifeInsureBillMake.js'
export default {
  name: '',
  data () {
    return {
      queryInfo: {
        comCode: '',
        comName: '',
        companyCode: '',
        companyName: '',
        verifyStatus: '',
        status: '',
        makeTime: '',
        yearMouth: '',
        currentPage: 1,
        pageSize: 10
      },
      quanxian: {
        query: true,
        export: true,
        trace: true,
        review: true
      },
      loading: '',
      rules: {
        comCode: [
          { required: true, message: '请输入佰盈公司代码', trigger: 'change' }
        ],
        comName: [
          { required: true, message: '请输入佰盈公司名称', trigger: 'change' }
        ]
      },
      tempTableData1: [],
      tempTableData2: [],
      tableShowOrNot: false,
      comDialog: false,
      comDialogworker: false,
      comDialogCom: false,
      comDialog1: false,
      comDialogworker1: false,
      comDialogCom1: false,
      shenheDialogVis: false,
      dialogDetailVisibleCode: false,
      fileList: [],
      multipleSelection: [],
      shenheResult: {
        status: '',
        remark: ''
      },
      companyQueryInfo: {
        type: '3',
        clickType: '2',
        insurerCode: '',
        insurerName: '',
        currentPage: 1,
        pageSize: 10
      },
      orgQueryInfo: {
        clickType: '2',
        comCodeOrName: '',
        currentPage: 1,
        pageSize: 10
      },
      tabledata: [],
      fenyetotalData: 0,
      fenyetotalData1: 0,
      billDetailData1: {},
      dialogTableData: []
    }
  },
  mounted () {
    api(`/auth/findButtonByUserCodeAndPage?userId=${this.$store.state.login.loginUserId}&page=银代运营部审核`, 'get').then(result => {
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
  methods: {
    submitForm (formName, index) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          console.log('submit!')
          switch (index) {
            case 0:
              this.queryInfo.currentPage = 1
              this.fenyetotalData1 = 0
              this.queryData()
              break
            case 1:
              this.exportExcel()
              break
            case 2:
              this.checktrail()
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
    initDialog () {
      this.companyQueryInfo = {
        type: '3',
        clickType: '2',
        insurerCode: '',
        insurerName: '',
        currentPage: 1,
        pageSize: 10
      }
      this.orgQueryInfo = {
        clickType: '2',
        comCodeOrName: '',
        currentPage: 1,
        pageSize: 10
      }
    },
    queryData () {
      let temp = {
        comCode: '',
        comName: '',
        companyCode: '',
        companyName: '',
        verifyStatus: '',
        status: '',
        startDate: '',
        endDate: '',
        yearMouth: '',
        currentPage: '',
        pageSize: ''}
      temp.comCode = this.queryInfo.comCode
      temp.comName = this.queryInfo.comName
      temp.companyCode = this.queryInfo.companyCode
      temp.companyName = this.queryInfo.companyName
      temp.verifyStatus = this.queryInfo.verifyStatus
      temp.status = this.queryInfo.status
      temp.startDate = IsEmpty(this.queryInfo.makeTime[0]) ? null : this.queryInfo.makeTime[0]
      temp.endDate = IsEmpty(this.queryInfo.makeTime[1]) ? null : this.queryInfo.makeTime[1]
      temp.yearMouth = this.queryInfo.yearMouth
      temp.currentPage = this.queryInfo.currentPage
      temp.pageSize = this.queryInfo.pageSize
      this.tableShowOrNot = true
      this.bankCheckInsureQueryData(temp)
    },
    bankCheckInsureQueryData (info) {
      this.Loading()
      this.tableData = []
      api('/bankCharge/queryAllBankChargePoundageRecon', 'post', info).then(result => {
        this.closeLoading()
        this.tabledata = result.data.content
        this.fenyetotalData1 = result.data.totalElements
      }).catch((e) => {
        console.log(e)
      })
    },
    exportExcel () {
      let temp = {
        comCode: '',
        comName: '',
        companyCode: '',
        companyName: '',
        verifyStatus: '',
        status: '',
        startDate: '',
        endDate: '',
        yearMouth: ''}
      temp.comCode = this.queryInfo.comCode
      temp.comName = this.queryInfo.comName
      temp.companyCode = this.queryInfo.companyCode
      temp.companyName = this.queryInfo.companyName
      temp.verifyStatus = this.queryInfo.verifyStatus
      temp.status = this.queryInfo.status
      temp.startDate = IsEmpty(this.queryInfo.makeTime[0]) ? null : this.queryInfo.makeTime[0]
      temp.endDate = IsEmpty(this.queryInfo.makeTime[1]) ? null : this.queryInfo.makeTime[1]
      temp.yearMouth = this.queryInfo.yearMouth
      this.exportbankCheckInsure(temp)
    },
    checktrail () {
      let temp = {
        comCode: '',
        comName: '',
        companyCode: '',
        companyName: '',
        verifyStatus: '',
        status: '',
        startDate: '',
        endDate: '',
        yearMouth: ''}
      temp.comCode = this.queryInfo.comCode
      temp.comName = this.queryInfo.comName
      temp.companyCode = this.queryInfo.companyCode
      temp.companyName = this.queryInfo.companyName
      temp.verifyStatus = this.queryInfo.verifyStatus
      temp.status = this.queryInfo.status
      temp.startDate = IsEmpty(this.queryInfo.makeTime[0]) ? null : this.queryInfo.makeTime[0]
      temp.endDate = IsEmpty(this.queryInfo.makeTime[1]) ? null : this.queryInfo.makeTime[1]
      temp.yearMouth = this.queryInfo.yearMouth
      this.bankChecktrail(temp)
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
      if (!(this.comDialog || this.comDialog1)) {
        switch (index) {
          case 0:
            this.companyQueryInfo.clickType = '1'
            this.companyQueryInfo.insurerCode = this.queryInfo.companyCode
            this.companyQueryInfo.insurerName = this.queryInfo.companyName
            this.commissionConfigdblqueryCom1(this.companyQueryInfo).then(
              (res) => {
                if (res.data.code !== '000000' && !IsEmpty(res.data.code)) {
                  this.openToast('warning', res.data.msg)
                } else {
                  if (res.data.data.data.length === 1) {
                    this.queryInfo.companyCode = res.data.data.data[0].insurercode
                    this.queryInfo.companyName = res.data.data.data[0].insurername
                  }
                }
              }
            )
            break
          case 1:
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
          default:
            break
        }
      }
    },
    tableDetailClose () {
      this.dialogDetailVisibleCode = false
    },
    changeComdialogPage1 (data) {
      this.orgQueryInfo.currentPage = data
      this.openComDialog(0)
    },
    changeComdialogPage2 (data) {
      this.companyQueryInfo.currentPage = data
      this.openComDialog(1)
    },
    changeComdialogPageSize1 (data) {
      this.orgQueryInfo.pageSize = data
      this.orgQueryInfo.currentPage = 1
      this.openComDialog(0)
    },
    changeComdialogPageSize2 (data) {
      this.companyQueryInfo.pageSize = data
      this.companyQueryInfo.currentPage = 1
      this.openComDialog(1)
    },
    examine () {
      if (IsEmpty(this.shenheResult.status)) {
        this.openToast('warning', '请勾选审核结果')
      } else if (this.shenheResult.status !== '2' && this.shenheResult.status !== '9') {
        this.openToast('warning', '请勾选审核结果')
      } else {
        let tempJson = {}
        let reconnos = ''
        for (let i = 0; i < this.multipleSelection.length; i++) {
          reconnos += this.multipleSelection[i].batchNo + ','
        }
        tempJson['reconno'] = reconnos
        tempJson['status'] = this.shenheResult.status
        tempJson['remark'] = this.shenheResult.remark
        this.shenheDialogVis = false
        this.bankCheckShenHe(tempJson)
      }
    },
    bankgoExamine () {
      if (this.multipleSelection.length === 0) {
        this.openToast('warning', '请选择一条数据')
      } else {
        this.shenheDialogVis = true
      }
    },
    openComDialog (index) {
      switch (index) {
        case 0:
          this.orgQueryInfo.clickType = '2'
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
                this.tempTableData1 = res.data.data.data
                for (let i = 0; i < this.tempTableData1.length; i++) {
                  this.tempTableData1[i]['renderData'] = `${this.tempTableData1[i].comCode}-${this.tempTableData1[i].comCName}`
                }
                this.fenyetotalData = res.data.data.totalRecords
                this.comDialog = true
                this.comDialogCom = true
                this.comDialogworker = false
              }
            }
          )
          break
        case 1:
          this.companyQueryInfo.clickType = '2'
          this.companyQueryInfo.insurerCode = this.queryInfo.companyCode
          this.companyQueryInfo.insurerName = this.queryInfo.companyName
          this.commissionConfigdblqueryCom1(this.companyQueryInfo).then(
            (res) => {
              console.log(res)
              if (res.data.code !== '000000' && !IsEmpty(res.data.code)) {
                this.openToast('warning', res.data.msg)
              } else {
                this.tempTableData2 = res.data.data.data
                for (let i = 0; i < this.tempTableData2.length; i++) {
                  this.tempTableData2[i]['renderData'] = `${this.tempTableData2[i].insurercode}-${this.tempTableData2[i].insurername}`
                }
                console.log(this.tempTableData2)
                this.fenyetotalData = res.data.data.totalRecords
                this.comDialog1 = true
                this.comDialogCom1 = true
                this.comDialogworker1 = false
              }
            }
          )
          break
        default:
          break
      }
    },
    comDialogClosing () {
      this.initDialog()
      this.comDialog = false
      this.comDialog1 = false
    },
    closeDetailDialog () {
      this.dialogDetailVisibleCode = false
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
    bankCheckShenHe (info) {
      this.Loading()
      api('/bankCharge/updateBankChargePoundageRecon', 'post', info).then(result => {
        console.log(result)
        this.closeLoading()
        this.shenheDialogVis = false
        if (result.data === '操作成功!') {
          this.openToast('success', result.data)
        } else {
          this.openToast('warning', result.data)
        }
      }).then(
        () => {
          this.handleCurrentChange(1)
        }
      ).catch((e) => {
        console.log(e)
      })
    },
    bankChecktrail (info) {
      if (IsEmpty(this.queryInfo.yearMouth)) {
        this.openToast('warning', '请输入结算年月')
        return
      } else if (this.queryInfo.yearMouth.length !== 6) {
        this.openToast('warning', '结算年月格式不正确')
      } else {
        let temp1 = false
        if (this.queryInfo.yearMouth.slice(0, 1) !== '2') {
          temp1 = true
        }
        if (this.queryInfo.yearMouth.slice(1, 2) !== '0') {
          temp1 = true
        }
        if (parseInt(this.queryInfo.yearMouth.slice(4, 5)) > 1) {
          temp1 = true
        }
        if (temp1) {
          this.openToast('warning', '结算年月格式不正确')
          return
        }
      }
      if (IsEmpty(this.queryInfo.companyCode)) {
        this.openToast('warning', '请输入保险公司代码')
      } else if (IsEmpty(this.queryInfo.companyName)) {
        this.openToast('warning', '请输入保险公司名称')
      } else if (this.queryInfo.comCode === '01' || this.queryInfo.comName === '总公司') {
        this.openToast('warning', '当前查询佰盈机构为总公司，无法进行轨迹查询')
        this.queryInfo.comCode = ''
        this.queryInfo.comName = ''
      } else {
        this.Loading()
        api('/bankCharge/queryBankChargeOperatetrack', 'post', info).then(result => {
          this.openToast('success', result.data)
          this.closeLoading()
        }).catch((e) => {
          console.log(e)
        })
      }
    },
    bankCheckDetailDataQuery (info) {
      console.log(info)
      this.Loading()
      api('/bankCharge/queryBankChargePoundageRecon', 'post', `batchNO=${info}`).then(result => {
        console.log(result)
        this.closeLoading()
        this.billDetailData1 = result.data
        this.dialogTableData = this.billDetailData1.bankChargeCompareDetail
        this.dialogDetailVisibleCode = true
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
    exportbankCheckInsure (info) {
      window.open(`/tabycore/bankCharge/downloadBankChargePoundageRecons?companyCode=${info.companyCode}&companyName=${info.companyName}&comCode=${info.comCode}&comName=${info.comName}&verifyStatus=${info.verifyStatus}&status=${info.status}&startDate=${info.startDate}&endDate=${info.endDate}&yearMouth=${info.yearMouth}`)
    },
    ...mapActions([
      'contiListCheckDialogDataGet1', 'commissionConfigdblqueryCom1'
    ]),
    handleSelectionChange (val) {
      this.multipleSelection = val
      console.log(this.multipleSelection)
    },
    openlifeInsureBillDetail (policyNo) {
      this.Loading()
      this.bankCheckDetailDataQuery(policyNo)
    },
    dialogBackData (data) {
      this.initDialog()
      this.comDialog = false
      let temp = []
      temp = data.split('-')
      this.queryInfo.comCode = temp[0]
      this.queryInfo.comName = temp[1]
    },
    dialogBackData1 (data) {
      this.initDialog()
      this.comDialog1 = false
      let temp = []
      temp = data.split('-')
      this.queryInfo.companyCode = temp[0]
      this.queryInfo.companyName = temp[1]
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
  watch: {
    'queryInfo.companyCode' () {
      if (this.queryInfo.companyCode === '') {
        this.queryInfo.companyName = ''
      }
    },
    'queryInfo.companyName' () {
      if (this.queryInfo.companyName === '') {
        this.queryInfo.companyCode = ''
      }
    },
    'queryInfo.comCode' () {
      if (this.queryInfo.comCode === '') {
        this.queryInfo.comName = ''
      }
    },
    'queryInfo.comName' () {
      if (this.queryInfo.comName === '') {
        this.queryInfo.comCode = ''
      }
    }
  },
  computed: {
    billDetailData () {
      let temp = this.billDetailData1
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
      switch (temp.verifyStatus) {
        case '1':
          temp.verifyStatus = '运营待审核'
          break
        case '2':
          switch (temp.status) {
            case '1':
              temp.verifyStatus = '财务未审核'
              break
            case '2':
              temp.verifyStatus = '财务复核通过'
              break
            case '3':
              temp.verifyStatus = '财务审核通过'
              break
            default:
              break
          }
          break
        case '9':
          temp.verifyStatus = '运营审核不通过'
          break
        default:
          temp.verifyStatus = '运营未提交审核'
          break
      }
      return temp
    },
    comDialogData () {
      let temp = this.$store.state.propertyInsureBillMake.propertyInsureBillMakedblComData2
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
      let temp = this.$store.state.propertyInsureBillMake.propertyInsureBillMakedblComData1
      if (!IsEmpty(temp)) {
        if (!IsEmpty(temp[0].insurercode) && !IsEmpty(temp[0].insurername)) {
          for (let i = 0; i < temp.length; i++) {
            temp[i]['renderData'] = `${temp[i].insurercode}-${temp[i].insurername}`
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
  margin-top: 60px;
  margin-bottom: 30px;
}
.ri-line{
  margin-top: 10px;
  margin-bottom: 10px;
}
.tableButton {
  cursor: pointer;
  color: #66B1FF;
}
</style>
