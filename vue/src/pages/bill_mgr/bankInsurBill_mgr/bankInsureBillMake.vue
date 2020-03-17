<template>
  <div id="orgadd" >
      <ui-notice-bar slot="breadcast" >
        <el-breadcrumb slot="location" separator=">">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>对账单管理</el-breadcrumb-item>
            <el-breadcrumb-item>银保代理对账单管理</el-breadcrumb-item>
            <el-breadcrumb-item>手续费对账单手动生成</el-breadcrumb-item>
          </el-breadcrumb>
      </ui-notice-bar>
      <div class="ri-content" slot="content" >
        <el-form ref="bankChargeVO" :rules="rules" :model="bankChargeVO">
          <el-row class="ri-line">
            <el-col :span=12>
              <el-form-item prop='companyCode'>
                <ui-label-text labelWidth="180" label="银保代理保险公司代码：" :required="true">
                  <el-input v-model="bankChargeVO.companyCode" slot='text' placeholder="双击可选择" @dblclick.native="openComDialog(0)" @blur='opensingleComDialog(0)' clearable></el-input>
                </ui-label-text>
              </el-form-item>
            </el-col>
            <el-col :span=12>
              <el-form-item prop='companyName'>
                <ui-label-text labelWidth="180" label="银保代理保险公司名称：" :required="true">
                  <el-input v-model="bankChargeVO.companyName" slot='text' placeholder="双击可选择" @dblclick.native="openComDialog(0)" @blur='opensingleComDialog(0)' clearable></el-input>
                </ui-label-text>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row class="ri-line">
            <el-col :span=12>
              <el-form-item prop='comCode'>
                <ui-label-text labelWidth="180" label="佰盈机构代码：" :required="true">
                  <el-input v-model="bankChargeVO.comCode" slot='text' placeholder="双击可选择" @dblclick.native="openComDialog(1)" @blur='opensingleComDialog(1)' clearable></el-input>
                </ui-label-text>
              </el-form-item>
            </el-col>
            <el-col :span=12>
              <el-form-item prop='comName'>
                <ui-label-text labelWidth="180" label="佰盈机构名称：" :required="true">
                  <el-input v-model="bankChargeVO.comName" slot='text' placeholder="双击可选择" @dblclick.native="openComDialog(1)" @blur='opensingleComDialog(1)' clearable></el-input>
                </ui-label-text>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row class="ri-line">
            <el-col :span=12>
              <el-form-item prop='yearMouth'>
                <ui-label-text labelWidth="180" label="结算年月：" :required="true">
                  <el-input v-model="bankChargeVO.yearMouth" slot='text' placeholder="范例：YYYYMM(201706)"></el-input>
                </ui-label-text>
              </el-form-item>
            </el-col>
            <el-col :span=12>
              <el-form-item prop='type'>
                <ui-label-text labelWidth="180" label="差异类型：" >
                  <el-select v-model="bankChargeVO.type" slot="text" placeholder="请选择差异类型：">
                    <el-option
                        label="全部"
                        value="0">
                    </el-option>
                    <el-option
                        label="无差异"
                        value="1">
                    </el-option>
                    <el-option
                        label="差异"
                        value="2">
                    </el-option>
                  </el-select>
                </ui-label-text>
              </el-form-item>
            </el-col>
          </el-row>
          <div class="btn-container">
            <el-form-item >
              <el-button type="primary" @click="submitForm('bankChargeVO',0)" :disabled="quanxian.createStatement">生成对账单</el-button>
              <el-button type="primary" @click="submitForm('bankChargeVO',1)" :disabled="quanxian.query">查询</el-button>
              <el-button type="primary" @click="submitForm('bankChargeVO',2)" :disabled="quanxian.review">提交审核</el-button>
              <el-button type="primary" @click="submitForm('bankChargeVO',3)" :disabled="quanxian.export">导出Excel</el-button>
              <el-button type="primary" @click="importList" :disabled="quanxian.import">导入保险对账单</el-button>
            </el-form-item>
          </div>
        </el-form>
      </div>
      <el-dialog title="错误信息" center :append-to-body='true' :visible.sync='afterQueryInfo1'>
        <span class="center">{{afterQueryDialogData1}}</span>
        <div class="btn-container">
          <el-button @click="afterQueryInfo1 = false">取消</el-button>
        </div>
      </el-dialog>
      <div v-if='tableShowOrNot'>
        <el-table stripe id="dataTable" :data="renderTableData" ref="multipleTable" tooltip-effect="dark" style="width: 100%"
        >
          <el-table-column prop="difference_type" label="差异类型"  width="150">
          </el-table-column>
          <el-table-column prop="policyYear" label="保单年度"  width="150">
          </el-table-column>
          <el-table-column prop="comName" label="佰盈分公司" width="350" show-overflow-tooltip>
          </el-table-column>
          <el-table-column label="保单号" width="150">
            <el-table-column prop="policyNo1" label="佰盈" width="150">
            </el-table-column>
            <el-table-column prop="policyNo2" label="保险公司" width="150">
            </el-table-column>
          </el-table-column>
          <el-table-column label="险种代码" width="300">
            <el-table-column prop="riskCode2" label="佰盈" width="300">
            </el-table-column>
            <el-table-column prop="riskCode1" label="保险公司" width="300">
            </el-table-column>
          </el-table-column>
          <el-table-column label="主/副险" width="150">
            <el-table-column prop="mainflag2" label="佰盈" width="150">
            </el-table-column>
            <el-table-column prop="mainflag1" label="保险公司" width="150">
            </el-table-column>
          </el-table-column>
          <el-table-column label="缴费期限(年)" width="150">
            <el-table-column prop="paymentperiod2" label="佰盈" width="150">
            </el-table-column>
            <el-table-column prop="paymentperiod1" label="保险公司" width="150">
            </el-table-column>
          </el-table-column>
          <el-table-column label="实收保费" width="150">
            <el-table-column prop="paidpremium2" label="佰盈" width="150">
            </el-table-column>
            <el-table-column prop="paidpremium1" label="保险公司" width="150">
            </el-table-column>
          </el-table-column>
          <el-table-column label="佣金" width="150">
            <el-table-column prop="brokerageCharge2" label="佰盈" width="150">
            </el-table-column>
            <el-table-column prop="brokerageCharge1" label="保险公司" width="150">
            </el-table-column>
          </el-table-column>
          <el-table-column label="方案奖金" width="150">
            <el-table-column prop="programAward2" label="佰盈" width="150">
            </el-table-column>
            <el-table-column prop="programAward1" label="保险公司" width="150">
            </el-table-column>
          </el-table-column>
          <el-table-column label="销售奖金" width="150">
            <el-table-column prop="persistencyAward2" label="佰盈" width="150">
            </el-table-column>
            <el-table-column prop="persistencyAward1" label="保险公司" width="150">
            </el-table-column>
          </el-table-column>
          <el-table-column label="续年服务津贴" width="150">
            <el-table-column prop="continueBrokerageCharge2" label="佰盈" width="150">
            </el-table-column>
            <el-table-column prop="continueBrokerageCharge1" label="保险公司" width="150">
            </el-table-column>
          </el-table-column>
          <el-table-column label="继续率奖金" width="150">
            <el-table-column prop="continueServiceReward2" label="佰盈" width="150">
            </el-table-column>
            <el-table-column prop="continueServiceReward1" label="保险公司" width="150">
            </el-table-column>
          </el-table-column>
          <el-table-column label="续年服务津贴" width="150">
            <el-table-column prop="continueBrokerageCharge2" label="佰盈" width="150">
            </el-table-column>
            <el-table-column prop="continueBrokerageCharge1" label="保险公司" width="150">
            </el-table-column>
          </el-table-column>
          <el-table-column label="综合费用" width="150">
            <el-table-column prop="comprehensiveCharge2" label="佰盈" width="150">
            </el-table-column>
            <el-table-column prop="comprehensiveCharge1" label="保险公司" width="150">
            </el-table-column>
          </el-table-column>
          <el-table-column label="手续费" width="150">
            <el-table-column prop="poundage2" label="佰盈" width="150">
            </el-table-column>
            <el-table-column prop="poundage1" label="保险公司" width="150">
            </el-table-column>
          </el-table-column>
        </el-table>
        <div class="block">
          <el-pagination
            :pager-count="5"
            @current-change="handleCurrentChange"
            @size-change="handleSizeChange"
            :current-page="bankChargeVO.currentPage"
            :page-size ="bankChargeVO.pageSize"
            :page-sizes="[10,20,50]"
            :total="totalRecords1"
            layout="total, sizes, prev, pager, next, jumper"
            >
          </el-pagination>
        </div>
      </div>
      <el-dialog :append-to-body='true' title="导入保险对账单" center :visible.sync="showImportDialog" :before-close='importDialogClose'>
        <div class="dialogTip1">
          <span>请选择文件路径</span>
        </div>
        <div>
          <el-upload
            ref="upload"
            class="upload-rate"
            :action="uploadUrl()"
            :limit="1"
            name="fileName"
            :on-success="handleEXLSuccess"
            accept='xls'
            :auto-upload="false"
            :beforeUpload="beforeAvatarUpload"
            :data='dialogbankChargeVO'
            :file-list="fileList">
            <el-button size="small" type="primary">选取文件</el-button>
            <div slot="tip" class="el-upload__tip"></div>
          </el-upload>
          <el-button type="success" @click="goUpload" >上传文件</el-button>
          <el-button type="primary" @click.native.prevent="downloadModal()" class='moban'>新模板下载</el-button>
        </div>
        <el-form  ref="dialogbankChargeVO" :rules="dialogRules" :model="dialogbankChargeVO">
          <el-row class="ri-line">
            <el-col :span=12>
              <el-form-item prop='yearMouth'>
                <ui-label-text labelWidth="120" label="结算年月：" :required="true">
                  <el-input v-model="dialogbankChargeVO.yearMouth" clearable slot='text'></el-input>
                </ui-label-text>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row class="ri-line">
            <el-col :span=12>
              <el-form-item prop='companyCode'>
                <ui-label-text labelWidth="120" label="保险公司代码：" :required="true">
                  <el-input v-model="dialogbankChargeVO.companyCode" clearable slot='text' placeholder="双击可选择" @dblclick.native="openComDialog(2)" @blur='opensingleComDialog(2)'></el-input>
                </ui-label-text>
              </el-form-item>
            </el-col>
            <el-col :span=12>
              <el-form-item prop='companyName'>
                <ui-label-text labelWidth="120" label="保险公司名称：" :required="true">
                  <el-input v-model="dialogbankChargeVO.companyName" clearable slot='text' placeholder="双击可选择" @dblclick.native="openComDialog(2)" @blur='opensingleComDialog(2)'></el-input>
                </ui-label-text>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span=12>
              <el-form-item prop='comCode'>
                <ui-label-text labelWidth="120" label="佰盈分公司代码：" :required="true">
                  <el-input v-model="dialogbankChargeVO.comCode" clearable slot='text' placeholder="双击可选择" @dblclick.native="openComDialog(3)" @blur='opensingleComDialog(3)'></el-input>
                </ui-label-text>
              </el-form-item>
            </el-col>
            <el-col :span=12>
              <el-form-item prop='comName'>
                <ui-label-text labelWidth="120" label="佰盈分公司名称：" :required="true">
                  <el-input v-model="dialogbankChargeVO.comName" clearable slot='text' placeholder="双击可选择" @dblclick.native="openComDialog(3)" @blur='opensingleComDialog(3)'></el-input>
                </ui-label-text>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </el-dialog>
      <!-- 导入提示 -->
      <el-dialog title="提示" center :append-to-body='true' :visible.sync="isTip" width="30%" >
        <p style="text-align: center; ">如果数据量比较大，整个过程会很慢，请您耐心等待</p>
        <span slot="footer" class="dialog-footer">
          <el-button @click="isTip = false">取 消</el-button>
          <el-button type="primary" @click="submitUpload">确 定</el-button>
        </span>
      </el-dialog>
      <ComDialog :vis='comDialog' :workerVis='comDialogworker' :comVis='comDialogCom' :newTableData='tempTableData1' @onClose='comDialogClosing(0)' @selectDialog='dialogBackData0' @comdialogChangePageFunction='changeComdialogPage0' @comdialogChangePageSizeFunction='changeComdialogPageSize0' :fenyetotal='fenyetotalData'/>
      <ComDialog :vis='comDialog1' :workerVis='comDialogworker1' :comVis='comDialogCom1' :newTableData='tempTableData2' @onClose='comDialogClosing(1)' @selectDialog='dialogBackData1' @comdialogChangePageFunction='changeComdialogPage1' @comdialogChangePageSizeFunction='changeComdialogPageSize1' :fenyetotal='fenyetotalData'/>
      <ComDialog :vis='comDialog2' :workerVis='comDialogworker2' :comVis='comDialogCom2' :newTableData='tempTableData3' @onClose='comDialogClosing(2)' @selectDialog='dialogBackData2' @comdialogChangePageFunction='changeComdialogPage2' @comdialogChangePageSizeFunction='changeComdialogPageSize2' :fenyetotal='fenyetotalData'/>
      <ComDialog :vis='comDialog3' :workerVis='comDialogworker3' :comVis='comDialogCom3' :newTableData='tempTableData4' @onClose='comDialogClosing(3)' @selectDialog='dialogBackData3' @comdialogChangePageFunction='changeComdialogPage3' @comdialogChangePageSizeFunction='changeComdialogPageSize3' :fenyetotal='fenyetotalData'/>
  </div>
</template>

<script>
import NoticeBar from '@/components/notice-bar'
import LineTittle from '@/components/line-tittle'
import LabelText from '@/components/label-text'
import ComDialog from '@/components/comDialog'
import IsEmpty from '@/utils/IsEmpty'
import { mapActions } from 'vuex'
import {
  api
} from '@/api/lifeInsur_mgr/lifeInsureBillMake.js'
export default {
  name: '',
  data () {
    return {
      bankChargeVO: {
        companyCode: '',
        companyName: '',
        comCode: '',
        comName: '',
        yearMouth: '',
        type: '',
        currentPage: 1,
        pageSize: 10
      },
      dialogbankChargeVO: {
        companyCode: '',
        companyName: '',
        comCode: '',
        comName: '',
        yearMouth: ''
      },
      makeListData: {
        companyCode: '',
        companyName: '',
        comCode: '',
        comName: '',
        yearMouth: '',
        type: ''
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
      quanxian: {
        createStatement: true,
        query: true,
        review: true,
        export: true,
        import: true
      },
      afterQueryInfo1: false,
      afterQueryDialogData1: '',
      isTip: false,
      rules: {
        companyCode: [
          { required: true, message: '请输入银保代理保险公司代码', trigger: 'change' }
        ],
        // companyName: [
        //   { required: true, message: '请输入银保代理保险公司名称', trigger: 'change' }
        // ],
        comCode: [
          { required: true, message: '请输入佰盈机构代码', trigger: 'change' }
        ],
        // comName: [
        //   { required: true, message: '请输入佰盈机构名称', trigger: 'change' }
        // ],
        yearMouth: [
          { required: true, message: '请输入结算年月', trigger: 'change' }
        ]
      },
      dialogRules: {
        companyCode: [
          { required: true, message: '请输入保险公司代码', trigger: 'change' }
        ],
        companyName: [
          { required: true, message: '请输入保险公司名称', trigger: 'change' }
        ],
        comCode: [
          { required: true, message: '请输入佰盈机构代码', trigger: 'change' }
        ],
        comName: [
          { required: true, message: '请输入佰盈机构名称', trigger: 'change' }
        ],
        yearMouth: [
          { required: true, message: '请输入结算年月', trigger: 'change' }
        ]
      },
      tableShowOrNot: false,
      showImportDialog: false,
      comDialog: false,
      comDialogCom: false,
      comDialogworker: false,
      comDialog1: false,
      comDialogCom1: false,
      comDialogworker1: false,
      comDialog2: false,
      comDialogCom2: false,
      comDialogworker2: false,
      comDialog3: false,
      comDialogCom3: false,
      comDialogworker3: false,
      fileList: [],
      tempTableData1: [],
      tempTableData2: [],
      tempTableData3: [],
      tempTableData4: [],
      fenyetotalData: 0,
      renderTableData: [],
      totalRecords1: 0,
      loading: ''
    }
  },
  mounted () {
    api(`/auth/findButtonByUserCodeAndPage?userId=${this.$store.state.login.loginUserId}&page=银代手续费对账单手动生成`, 'get').then(result => {
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
    initshuangjiDialog () {
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
    uploadUrl () {
      return '/tabycore/bankCharge/bankChargeInportCompanyStatement'
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
    handleEXLSuccess (response) {
      this.closeLoading()
      if (typeof (response) === 'string') {
        if (response === '导入对账单成功') {
          this.openToast('success', response)
        } else {
          this.openToast('warning', response)
        }
      } else if (typeof (response) === 'object') {
        this.openToast('warning', response.msg)
      }
      this.fileList = []
      this.showImportDialog = false
    },
    opensingleComDialog (index) {
      if (!(this.comDialog || this.comDialog1 || this.comDialog2 || this.comDialog3)) {
        switch (index) {
          case 0:
            this.companyQueryInfo.clickType = '1'
            this.companyQueryInfo.insurerCode = this.bankChargeVO.companyCode
            this.companyQueryInfo.insurerName = this.bankChargeVO.companyName
            this.commissionConfigdblqueryCom1(this.companyQueryInfo).then(
              (res) => {
                if (res.data.code !== '000000' && !IsEmpty(res.data.code)) {
                  this.openToast('warning', res.data.msg)
                } else {
                  if (res.data.data.data.length === 1) {
                    this.bankChargeVO.companyCode = res.data.data.data[0].insurercode
                    this.bankChargeVO.companyName = res.data.data.data[0].insurername
                  }
                }
              }
            )
            break
          case 1:
            this.orgQueryInfo.clickType = '1'
            if (!IsEmpty(this.bankChargeVO.comCode)) {
              this.orgQueryInfo.comCodeOrName = this.bankChargeVO.comCode
            } else if (!IsEmpty(this.bankChargeVO.comName)) {
              this.orgQueryInfo.comCodeOrName = this.bankChargeVO.comName
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
                    this.bankChargeVO.comCode = res.data.data.data[0].comCode
                    this.bankChargeVO.comName = res.data.data.data[0].comCName
                  }
                }
              }
            )
            break
          case 2:
            this.companyQueryInfo.clickType = '1'
            this.companyQueryInfo.insurerCode = this.dialogbankChargeVO.companyCode
            this.companyQueryInfo.insurerName = this.dialogbankChargeVO.companyName
            this.commissionConfigdblqueryCom1(this.companyQueryInfo).then(
              (res) => {
                if (res.data.code !== '000000' && !IsEmpty(res.data.code)) {
                  this.openToast('warning', res.data.msg)
                } else {
                  if (res.data.data.data.length === 1) {
                    this.dialogbankChargeVO.companyCode = res.data.data.data[0].insurercode
                    this.dialogbankChargeVO.companyName = res.data.data.data[0].insurername
                  }
                }
              }
            )
            break
          case 3:
            this.orgQueryInfo.clickType = '1'
            if (!IsEmpty(this.dialogbankChargeVO.comCode)) {
              this.orgQueryInfo.comCodeOrName = this.dialogbankChargeVO.comCode
            } else if (!IsEmpty(this.dialogbankChargeVO.comName)) {
              this.orgQueryInfo.comCodeOrName = this.dialogbankChargeVO.comName
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
                    this.dialogbankChargeVO.comCode = res.data.data.data[0].comCode
                    this.dialogbankChargeVO.comName = res.data.data.data[0].comCName
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
    submitForm (formName, index) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          console.log('submit!')
          switch (index) {
            case 0:
              this.makeList()
              break
            case 1:
              this.totalRecords1 = 0
              this.bankChargeVO.currentPage = 1
              this.bankInsureQueryData(this.bankChargeVO)
              break
            case 2:
              this.submitCheck()
              break
            case 3:
              this.exportCheck()
              break
            case 4:
              this.importList()
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
    goUpload () {
      let list = document.querySelector('.is-ready')
      if (IsEmpty(list)) {
        list = []
      } else {
        list = [1]
      }
      if (IsEmpty(this.dialogbankChargeVO.companyCode) || IsEmpty(this.dialogbankChargeVO.companyName) || IsEmpty(this.dialogbankChargeVO.comCode) || IsEmpty(this.dialogbankChargeVO.comName) || IsEmpty(this.dialogbankChargeVO.yearMouth)) {
        this.openToast('warning', '请填入相关必填项')
      } else if (this.dialogbankChargeVO.yearMouth.length !== 6) {
        this.openToast('warning', '结算年月格式错误')
      } else if (list.length <= 0) {
        this.openToast('warning', '请先选择文件')
      } else {
        let temp1 = false
        if (this.dialogbankChargeVO.yearMouth.slice(0, 1) !== '2') {
          temp1 = true
        }
        if (this.dialogbankChargeVO.yearMouth.slice(1, 2) !== '0') {
          temp1 = true
        }
        if (parseInt(this.dialogbankChargeVO.yearMouth.slice(4, 5)) > 1) {
          temp1 = true
        }
        if (parseInt(this.dialogbankChargeVO.yearMouth.slice(4, 5)) === 0 && parseInt(this.dialogbankChargeVO.yearMouth.slice(5, 6)) === 0) {
          temp1 = true
        }
        if (temp1) {
          this.openToast('warning', '结算年月格式不正确')
        } else {
          this.isTip = true
        }
      }
    },
    changeComdialogPage0 (data) {
      this.companyQueryInfo.currentPage = data
      this.openComDialog(0)
    },
    changeComdialogPage1 (data) {
      this.orgQueryInfo.currentPage = data
      this.openComDialog(1)
    },
    changeComdialogPage2 (data) {
      this.companyQueryInfo.currentPage = data
      this.openComDialog(2)
    },
    changeComdialogPage3 (data) {
      this.orgQueryInfo.currentPage = data
      this.openComDialog(3)
    },
    changeComdialogPageSize0 (data) {
      this.companyQueryInfo.pageSize = data
      this.openComDialog(0)
    },
    changeComdialogPageSize1 (data) {
      this.orgQueryInfo.pageSize = data
      this.openComDialog(1)
    },
    changeComdialogPageSize2 (data) {
      this.companyQueryInfo.pageSize = data
      this.openComDialog(2)
    },
    changeComdialogPageSize3 (data) {
      this.orgQueryInfo.pageSize = data
      this.openComDialog(3)
    },
    makeList () {
      let bankChargeVO = {
        companyCode: '',
        companyName: '',
        comCode: '',
        comName: '',
        type: '',
        yearMouth: ''
      }
      bankChargeVO.companyCode = this.bankChargeVO.companyCode
      bankChargeVO.companyName = this.bankChargeVO.companyName
      bankChargeVO.comCode = this.bankChargeVO.comCode
      bankChargeVO.comName = this.bankChargeVO.comName
      bankChargeVO.type = this.bankChargeVO.type
      bankChargeVO.yearMouth = this.bankChargeVO.yearMouth
      // 生成对账单
      this.bankmakeBillList(bankChargeVO)
    },
    submitCheck () {
      // 提交审核
      this.bankgoExamine(this.bankChargeVO)
    },
    importList () {
      this.showImportDialog = true
    },
    exportCheck () {
      window.open(`/tabycore/bankCharge/downloadBankChargeCompareDetail?companyCode=${this.bankChargeVO.companyCode}&companyName=${this.bankChargeVO.companyName}&comCode=${this.bankChargeVO.comCode}&comName=${this.bankChargeVO.comName}&type=${this.bankChargeVO.type}&yearMouth=${this.bankChargeVO.yearMouth}`)
    },
    downloadModal () {
      window.open('/tabycore/rate/bankChargeMould')
    },
    importDialogClose () {
      this.showImportDialog = false
      this.$refs['dialogbankChargeVO'].resetFields()
      this.dialogbankChargeVO = {
        companyCode: '',
        companyName: '',
        comCode: '',
        comName: '',
        yearMouth: ''
      }
      this.fileList = []
    },
    bankInsureQueryData (info) {
      console.log(info)
      this.Loading()
      api('/bankCharge/queryBankChargeDetail', 'post', info).then(result => {
        this.renderTableData = []
        // 1
        if (result.data !== 1 && result.data !== '1' && !IsEmpty(result.data)) {
          this.closeLoading()
          this.afterQueryInfo1 = true
          this.afterQueryDialogData1 = result.data
        } else {
          api('/bankCharge/queryBankChargeCompareDetail', 'post', info).then(result => {
            this.closeLoading()
            console.log(result)
            this.renderTableData = result.data.content
            this.totalRecords1 = result.data.totalElements
            this.tableShowOrNot = true
          }).catch((e) => {
            console.log(e)
          })
        }
      }).catch((e) => {
        console.log(e)
      })
    },
    initAll () {
      this.dialogbankChargeVO = {
        companyCode: '',
        companyName: '',
        comCode: '',
        comName: '',
        yearMouth: ''
      }
      this.makeListData = {
        companyCode: '',
        companyName: '',
        comCode: '',
        comName: '',
        yearMouth: '',
        type: ''
      }
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
    bankmakeBillList (info) {
      this.Loading()
      api('/bankCharge/bankChargeCompanyStatement', 'post', info).then(result => {
        this.closeLoading()
        this.renderTableData = []
        if (result.data === 1) {
          api('/bankCharge/addBankChargePoundageRecon', 'post', info).then(result => {
            if (result.data === '任务提交成功！') {
              this.openToast('success', result.data)
              this.initAll()
            } else {
              if (typeof (result.data) === 'string') {
                this.openToast('warning', result.data)
              } else {
                this.openToast('warning', result.data.msg)
              }
            }
          }).catch((e) => {
            console.log(e)
          })
        } else if (result.data === 2) {
          // 已存在待审核或审核通过的对账单
          this.closeLoading()
          this.openToast('warning', '已存在待审核或审核通过的对账单')
        } else if (result.data === 4) {
          // 正在生成对账单，请耐心等待!
          this.closeLoading()
          this.openToast('warning', '正在生成对账单，请耐心等待!')
        } else if (result.data === 3) {
          // "请导入对账单模板"
          this.closeLoading()
          this.openToast('warning', '请导入对账单模板')
        }
      }).catch((e) => {
        console.log(e)
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
    bankgoExamine (info) {
      this.Loading()
      api('/bankCharge/updateBankChargeCompareDetail', 'post', info).then(result => {
        this.closeLoading()
        if (result.data === '操作成功!') {
          this.openToast('success', '操作成功!')
          this.initAll()
        } else {
          if (typeof (result.data) === 'string') {
            this.openToast('warning', result.data)
          } else {
            this.openToast('warning', result.data.msg)
          }
        }
      }).catch((e) => {
        console.log(e)
      })
    },
    openComDialog (index) {
      switch (index) {
        case 0:
          this.companyQueryInfo.clickType = '2'
          this.companyQueryInfo.insurerCode = this.bankChargeVO.companyCode
          this.companyQueryInfo.insurerName = this.bankChargeVO.companyName
          this.searchForCom1(this.companyQueryInfo)
          break
        case 1:
          this.orgQueryInfo.clickType = '2'
          if (!IsEmpty(this.bankChargeVO.comCode)) {
            this.orgQueryInfo.comCodeOrName = this.bankChargeVO.comCode
          } else if (!IsEmpty(this.bankChargeVO.comName)) {
            this.orgQueryInfo.comCodeOrName = this.bankChargeVO.comName
          } else {
            this.orgQueryInfo.comCodeOrName = ''
          }
          this.searchForCom2(this.orgQueryInfo)
          break
        case 2:
          this.companyQueryInfo.clickType = '2'
          this.companyQueryInfo.insurerCode = this.dialogbankChargeVO.companyCode
          this.companyQueryInfo.insurerName = this.dialogbankChargeVO.companyName
          this.searchForCom3(this.companyQueryInfo)
          break
        case 3:
          this.orgQueryInfo.clickType = '2'
          if (!IsEmpty(this.dialogbankChargeVO.comCode)) {
            this.orgQueryInfo.comCodeOrName = this.dialogbankChargeVO.comCode
          } else if (!IsEmpty(this.dialogbankChargeVO.comName)) {
            this.orgQueryInfo.comCodeOrName = this.dialogbankChargeVO.comName
          } else {
            this.orgQueryInfo.comCodeOrName = ''
          }
          this.searchForCom4(this.orgQueryInfo)
          break
        default:
          break
      }
    },
    beforeAvatarUpload (file) {
      console.log(file)
      let testmsg = file.name.substring(file.name.lastIndexOf('.') + 1)
      const extension = testmsg === 'xls'
      if (!extension) {
        this.openToast('warning', '上传文件只能是 xls格式')
        this.closeLoading()
      }
      return extension
    },
    comDialogClosing (index) {
      this.initshuangjiDialog()
      switch (index) {
        case 0:
          this.bankChargeVO.companyCode = ''
          this.bankChargeVO.companyName = ''
          this.comDialog = false
          break
        case 1:
          this.bankChargeVO.comCode = ''
          this.bankChargeVO.comName = ''
          this.comDialog1 = false
          break
        case 2:
          this.dialogbankChargeVO.companyCode = ''
          this.dialogbankChargeVO.companyName = ''
          this.comDialog2 = false
          break
        case 3:
          this.dialogbankChargeVO.comCode = ''
          this.dialogbankChargeVO.comName = ''
          this.comDialog3 = false
          break
        default:
          break
      }
    },
    searchForCom1 (info) {
      this.commissionConfigdblqueryCom1(info).then(
        (res) => {
          if (res.data.code !== '000000' && !IsEmpty(res.data.code)) {
            this.openToast('warning', res.data.msg)
          } else {
            this.tempTableData1 = res.data.data.data
            for (let i = 0; i < this.tempTableData1.length; i++) {
              this.tempTableData1[i]['renderData'] = `${this.tempTableData1[i].insurercode}-${this.tempTableData1[i].insurername}`
            }
            this.fenyetotalData = res.data.data.totalRecords
            this.comDialog = true
            this.comDialogCom = true
            this.comDialogworker = false
          }
        }
      )
    },
    searchForCom2 (info) {
      this.contiListCheckDialogDataGet1(info).then(
        (res) => {
          console.log(res)
          if (res.data.code !== '000000' && !IsEmpty(res.data.code)) {
            this.openToast('warning', res.data.msg)
          } else {
            this.fenyetotalData = res.data.data.totalRecords
            this.tempTableData2 = res.data.data.data
            for (let i = 0; i < this.tempTableData2.length; i++) {
              this.tempTableData2[i]['renderData'] = `${this.tempTableData2[i].comCode}-${this.tempTableData2[i].comCName}`
            }
            this.comDialog1 = true
            this.comDialogCom1 = true
            this.comDialogworker1 = false
          }
        }
      )
    },
    searchForCom3 (info) {
      this.commissionConfigdblqueryCom1(info).then(
        (result) => {
          console.log(result)
          if (result.data.code !== '000000' && !IsEmpty(result.data.code)) {
            this.openToast('warning', result.data.msg)
          } else {
            this.tempTableData3 = result.data.data.data
            for (let i = 0; i < this.tempTableData3.length; i++) {
              this.tempTableData3[i]['renderData'] = `${this.tempTableData3[i].insurercode}-${this.tempTableData3[i].insurername}`
            }
            this.fenyetotalData = result.data.data.totalRecords
            this.comDialog2 = true
            this.comDialogCom2 = true
            this.comDialogworker2 = false
          }
        }
      )
    },
    searchForCom4 (info) {
      this.contiListCheckDialogDataGet1(info).then(
        (result) => {
          console.log(result)
          if (result.data.code !== '000000' && !IsEmpty(result.data.code)) {
            this.openToast('warning', result.data.msg)
          } else {
            this.fenyetotalData = result.data.data.totalRecords
            this.tempTableData4 = result.data.data.data
            for (let i = 0; i < this.tempTableData4.length; i++) {
              this.tempTableData4[i]['renderData'] = `${this.tempTableData4[i].comCode}-${this.tempTableData4[i].comCName}`
            }
            this.comDialog3 = true
            this.comDialogCom3 = true
            this.comDialogworker3 = false
          }
        }
      )
    },
    dialogBackData0 (data) {
      this.comDialogClosing(0)
      let temp = []
      temp = data.split('-')
      this.bankChargeVO.companyCode = temp[0]
      this.bankChargeVO.companyName = temp[1]
    },
    dialogBackData1 (data) {
      this.comDialogClosing(1)
      let temp = []
      temp = data.split('-')
      this.bankChargeVO.comCode = temp[0]
      this.bankChargeVO.comName = temp[1]
    },
    dialogBackData2 (data) {
      this.comDialogClosing(2)
      let temp = []
      temp = data.split('-')
      this.dialogbankChargeVO.companyCode = temp[0]
      this.dialogbankChargeVO.companyName = temp[1]
    },
    dialogBackData3 (data) {
      this.comDialogClosing(3)
      let temp = []
      temp = data.split('-')
      this.dialogbankChargeVO.comCode = temp[0]
      this.dialogbankChargeVO.comName = temp[1]
    },
    handleCurrentChange (val) {
      this.bankChargeVO.currentPage = val
      this.bankInsureQueryData(this.bankChargeVO)
    },
    handleSizeChange (val) {
      this.bankChargeVO.pageSize = val
      this.bankChargeVO.currentPage = 1
      this.bankInsureQueryData(this.bankChargeVO)
    },
    submitUpload () {
      this.$refs.upload.submit()
      this.isTip = false
      this.$refs['dialogbankChargeVO'].resetFields()
      this.initAll()
      this.Loading()
    },
    ...mapActions([
      'commissionConfigdblqueryCom1', 'contiListCheckDialogDataGet1'
    ])
  },
  watch: {
    'bankChargeVO.companyCode' () {
      if (this.bankChargeVO.companyCode === '') {
        this.bankChargeVO.companyName = ''
      }
    },
    'bankChargeVO.companyName' () {
      if (this.bankChargeVO.companyName === '') {
        this.bankChargeVO.companyCode = ''
      }
    },
    'bankChargeVO.comCode' () {
      if (this.bankChargeVO.comCode === '') {
        this.bankChargeVO.comName = ''
      }
    },
    'bankChargeVO.comName' () {
      if (this.bankChargeVO.comName === '') {
        this.bankChargeVO.comCode = ''
      }
    },
    'dialogbankChargeVO.companyCode' () {
      if (this.dialogbankChargeVO.companyCode === '') {
        this.dialogbankChargeVO.companyName = ''
      }
    },
    'dialogbankChargeVO.companyName' () {
      if (this.dialogbankChargeVO.companyName === '') {
        this.dialogbankChargeVO.companyCode = ''
      }
    },
    'dialogbankChargeVO.comCode' () {
      if (this.dialogbankChargeVO.comCode === '') {
        this.dialogbankChargeVO.comName = ''
      }
    },
    'dialogbankChargeVO.comName' () {
      if (this.dialogbankChargeVO.comName === '') {
        this.dialogbankChargeVO.comCode = ''
      }
    }
  },
  computed: {
    comDialogData () {
      let temp = this.tempTableData1
      if (!IsEmpty(temp)) {
        for (let i = 0; i < temp.length; i++) {
          temp[i]['renderData'] = `${temp[i].insurercode}-${temp[i].insurername}`
        }
      }
      return temp
    },
    comDialogData1 () {
      let temp = this.tempTableData2
      if (!IsEmpty(temp)) {
        for (let i = 0; i < temp.length; i++) {
          temp[i]['renderData'] = `${temp[i].comCode}-${temp[i].comCName}`
        }
      }
      return temp
    }
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
  margin-top: 30px;
  margin-bottom: 30px;
}
.ri-line{
  margin-top: 10px;
}
.moban{
  margin-top: 10px;
}
.dialogTip{
  font-size: 14px;
}
.dialogTip1{
  margin-bottom: 20px;
}
</style>
