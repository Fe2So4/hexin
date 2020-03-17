<template>
  <div id="orgadd" >
      <ui-notice-bar slot="breadcast" >
        <el-breadcrumb slot="location" separator=">">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>对账单管理</el-breadcrumb-item>
            <el-breadcrumb-item>财险对账单管理</el-breadcrumb-item>
            <el-breadcrumb-item>手续费对账单手动生成</el-breadcrumb-item>
          </el-breadcrumb>
      </ui-notice-bar>
      <div class="ri-content" slot="content" >
        <el-form  ref="PropertyChargeVO" :rules="rules" :model="PropertyChargeVO">
          <el-row class="ri-line">
            <el-col :span=12>
              <el-form-item prop='companyCode'>
                <ui-label-text labelWidth="180" label="财险保险公司代码：" :required="true">
                  <el-input v-model="PropertyChargeVO.companyCode" slot='text' placeholder="双击可选择" @dblclick.native="openComDialog(0)" @blur='opensingleComDialog()' clearable></el-input>
                </ui-label-text>
              </el-form-item>
            </el-col>
            <el-col :span=12>
              <el-form-item prop='companyName'>
                <ui-label-text labelWidth="180" label="财险保险公司名称：" :required="true">
                  <el-input v-model="PropertyChargeVO.companyName" slot='text' placeholder="双击可选择" @dblclick.native="openComDialog(0)" @blur='opensingleComDialog()' clearable></el-input>
                </ui-label-text>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row class="ri-line">
            <el-col :span=12>
              <el-form-item prop='comCode'>
                <ui-label-text labelWidth="180" label="佰盈机构代码：" :required="true">
                  <el-input v-model="PropertyChargeVO.comCode" slot='text' placeholder="双击可选择" @dblclick.native="openComDialog(1)" @blur='opensingleComDialog()' clearable></el-input>
                </ui-label-text>
              </el-form-item>
            </el-col>
            <el-col :span=12>
              <el-form-item prop='comName'>
                <ui-label-text labelWidth="180" label="佰盈机构名称：" :required="true">
                  <el-input v-model="PropertyChargeVO.comName" slot='text' placeholder="双击可选择" @dblclick.native="openComDialog(1)" @blur='opensingleComDialog()' clearable></el-input>
                </ui-label-text>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row class="ri-line">
            <el-col :span=12>
              <el-form-item prop='yearMouth'>
                <ui-label-text labelWidth="180" label="结算年月：" :required="true">
                  <el-input v-model="PropertyChargeVO.yearMouth" slot='text' placeholder="范例：YYYYMM(201706)"></el-input>
                </ui-label-text>
              </el-form-item>
            </el-col>
            <el-col :span=12>
              <el-form-item prop='type'>
                <ui-label-text labelWidth="180" label="差异类型：" >
                  <el-select v-model="PropertyChargeVO.type" slot="text" placeholder="请选择差异类型：">
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
          <el-row class="ri-line">
            <el-col :span=12>
              <el-form-item prop='batch'>
                <ui-label-text labelWidth="180" label="批次：" :required="true">
                  <el-select v-model="PropertyChargeVO.batch" slot="text" placeholder="请选择批次">
                    <el-option
                        label="01"
                        value="01">
                    </el-option>
                    <el-option
                        label="02"
                        value="02">
                    </el-option>
                    <el-option
                        label="03"
                        value="03">
                    </el-option>
                    <el-option
                        label="04"
                        value="04">
                    </el-option>
                  </el-select>
                </ui-label-text>
              </el-form-item>
            </el-col>
          </el-row>
          <div class="btn-container">
            <el-form-item >
              <el-button type="primary" @click="submitForm('PropertyChargeVO',0)" :disabled="quanxian.createStatement">生成对账单</el-button>
              <el-button type="primary" @click="submitForm('PropertyChargeVO',1)" :disabled="quanxian.query">查询</el-button>
              <el-button type="primary" @click="submitForm('PropertyChargeVO',2)" :disabled="quanxian.review">提交审核</el-button>
              <el-button type="primary" @click="submitForm('PropertyChargeVO',3)" :disabled="quanxian.export">导出Excel</el-button>
              <el-button type="primary" @click="importList" :disabled="quanxian.import">导入保险对账单</el-button>
            </el-form-item>
          </div>
        </el-form>
      </div>
      <div v-if='tableShowOrNot'>
        <el-table stripe id="dataTable" :data="renderTableData" ref="multipleTable" tooltip-effect="dark" style="width: 100%"
        >
          <el-table-column prop="difference_type" label="差异类型"  width="150">
          </el-table-column>
          <el-table-column prop="comname" label="佰盈分公司" width="300" show-overflow-tooltip>
          </el-table-column>
          <el-table-column prop="comcomName" label="佰盈三级公司" width="300" show-overflow-tooltip>
          </el-table-column>
          <el-table-column label="保单号" width="300">
            <el-table-column prop="policyNo2" label="佰盈" width="300">
            </el-table-column>
            <el-table-column prop="policyNo" label="保险公司" width="300">
            </el-table-column>
          </el-table-column>
          <el-table-column prop="insurerBlackListType" label="险种代码" width="300">
            <el-table-column prop="riskCode2" label="佰盈" width="300">
            </el-table-column>
            <el-table-column prop="riskCode" label="保险公司" width="300">
            </el-table-column>
          </el-table-column>
          <el-table-column prop="listState" label="险种名称" width="300">
            <el-table-column prop="riskName2" label="佰盈" width="300">
            </el-table-column>
            <el-table-column prop="riskName" label="保险公司" width="300">
            </el-table-column>
          </el-table-column>
          <el-table-column prop="riskType" label="险种大类名称" width="300" show-overflow-tooltip>
          </el-table-column>
          <el-table-column prop="riskFlag" label="险种类型名称" width="300" show-overflow-tooltip>
          </el-table-column>
          <el-table-column prop="handlerCode" label="业务员代码" width="300" show-overflow-tooltip>
          </el-table-column>
          <el-table-column prop="handlerName" label="业务员名称" width="150" show-overflow-tooltip>
          </el-table-column>
          <el-table-column prop="signDate" label="签单日期" width="300" show-overflow-tooltip>
          </el-table-column>
          <el-table-column prop="insuranceStart" label="保险起期" width="200" show-overflow-tooltip>
          </el-table-column>
          <el-table-column prop="insuranceEnd" label="保险止期" width="200" show-overflow-tooltip>
          </el-table-column>
          <el-table-column prop="insureMan" label="投保人名称" width="200" show-overflow-tooltip>
          </el-table-column>
          <el-table-column prop="insureManType" label="投保人证件类型" width="200" show-overflow-tooltip>
          </el-table-column>
          <el-table-column prop="insureManNo" label="投保人证件号码" width="200" show-overflow-tooltip>
          </el-table-column>
          <el-table-column prop="insureManApp" label="投保人联系方式" width="200" show-overflow-tooltip>
          </el-table-column>
          <el-table-column prop="insuredMan" label="被保人名称" width="200" show-overflow-tooltip>
          </el-table-column>
          <el-table-column prop="insuredManType" label="被保险人证件类型" width="200" show-overflow-tooltip>
          </el-table-column>
          <el-table-column prop="insuredManNo" label="被保险人证件号码" width="300" show-overflow-tooltip>
          </el-table-column>
          <el-table-column prop="insuredManApp" label="被保险人联系方式" width="200" show-overflow-tooltip>
          </el-table-column>
          <el-table-column prop="agency" label="直接代理/转代理" width="200" show-overflow-tooltip>
          </el-table-column>
          <el-table-column prop="paidpremiumTax" label="保费（含增值税）" width="200" show-overflow-tooltip>
          </el-table-column>
          <el-table-column prop="paidpremiumNotTax" label="保费（不含增值税）" width="200" show-overflow-tooltip>
          </el-table-column>
          <el-table-column prop="rate" label="协议手续费比例（单位：%）" width="200" show-overflow-tooltip>
          </el-table-column>
          <el-table-column prop="poundage" label="协议手续费金额（含增值税" width="200" show-overflow-tooltip>
          </el-table-column>
          <el-table-column prop="subagentRate" label="转代理手续费比例（单位：%）" width="200" show-overflow-tooltip>
          </el-table-column>
          <el-table-column prop="subagentPoundage" label="转代理手续费金额（含增值税）" width="200" show-overflow-tooltip>
          </el-table-column>
          <el-table-column prop="poundageTax" label="应收手续费金额（含增值税）" width="200" show-overflow-tooltip>
          </el-table-column>
          <el-table-column prop="poundageNotTax" label="应收手续费金额（不含增值税）" width="200" show-overflow-tooltip>
          </el-table-column>
          <el-table-column prop="servPoundageTax" label="服务费（含增值税）" width="200" show-overflow-tooltip>
          </el-table-column>
          <el-table-column prop="servPoundageNotTax" label="服务费（不含增值税）" width="200" show-overflow-tooltip>
          </el-table-column>
          <el-table-column prop="allPoundageTax" label="对账合计金额（含增值税）" width="200" show-overflow-tooltip>
          </el-table-column>
          <el-table-column prop="allPoundageNotTax" label="对账合计金额（不含增值税）" width="200" show-overflow-tooltip>
          </el-table-column>
        </el-table>
        <div class="block">
          <el-pagination
            :pager-count="5"
            @current-change="handleCurrentChange"
            @size-change="handleSizeChange"
            :current-page="PropertyChargeVO.currentPage"
            :page-size ="PropertyChargeVO.pageSize"
            :page-sizes="[10,20,50]"
            :total="totalRecords1"
            layout="total, sizes, prev, pager, next, jumper"
            >
          </el-pagination>
        </div>
      </div>
      <el-dialog title="错误信息" center :append-to-body='true' :visible.sync='afterQueryInfo1'>
        <span class="center">{{afterQueryDialogData1}}</span>
        <div class="btn-container">
          <el-button @click="afterQueryInfo1 = false">取消</el-button>
        </div>
      </el-dialog>
      <el-dialog :append-to-body='true' center title="导入保险对账单" :visible.sync="showImportDialog" :before-close='importDialogClose'>
        <span>请选择文件路径</span>
        <div>
          <el-upload
            ref="upload"
            class="upload-rate"
            :action="uploadUrl()"
            :limit="1"
            name="fileName"
            :on-success="handleEXLSuccess"
            :auto-upload="false"
            :beforeUpload="beforeAvatarUpload"
            :data='dialogPropertyChargeVO'
            :file-list="fileList">
            <el-button size="small" type="primary">选取文件</el-button>
            <div slot="tip" class="el-upload__tip"></div>
          </el-upload>
          <el-button type="success" @click="goUpload" >上传文件</el-button>
          <el-button type="primary" @click.native.prevent="downloadModal()" class='moban'>新模板下载</el-button>
        </div>
        <el-form  ref="dialogPropertyChargeVO" :rules="dialogRules" :model="dialogPropertyChargeVO">
          <el-row class="ri-line">
            <el-col :span=12>
              <el-form-item prop='companyCode'>
                <ui-label-text labelWidth="120" label="保险公司代码：" :required="true">
                  <el-input v-model="dialogPropertyChargeVO.companyCode" clearable slot='text' placeholder="双击可选择" @dblclick.native="openComDialog(2)" @blur='opensingleComDialog()'></el-input>
                </ui-label-text>
              </el-form-item>
            </el-col>
            <el-col :span=12>
              <el-form-item prop='companyName'>
                <ui-label-text labelWidth="120" label="保险公司名称：" :required="true">
                  <el-input v-model="dialogPropertyChargeVO.companyName" clearable slot='text' placeholder="双击可选择" @dblclick.native="openComDialog(2)" @blur='opensingleComDialog()'></el-input>
                </ui-label-text>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row class="ri-line">
            <el-col :span=12>
              <el-form-item prop='comCode'>
                <ui-label-text labelWidth="120" label="佰盈分公司代码：" :required="true">
                  <el-input v-model="dialogPropertyChargeVO.comCode" clearable slot='text' placeholder="双击可选择" @dblclick.native="openComDialog(3)" @blur='opensingleComDialog()'></el-input>
                </ui-label-text>
              </el-form-item>
            </el-col>
            <el-col :span=12>
              <el-form-item prop='comName'>
                <ui-label-text labelWidth="120" label="佰盈分公司名称：" :required="true">
                  <el-input v-model="dialogPropertyChargeVO.comName" clearable slot='text' placeholder="双击可选择" @dblclick.native="openComDialog(3)" @blur='opensingleComDialog()'></el-input>
                </ui-label-text>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row class="ri-line">
            <el-col :span=12>
              <el-form-item prop='yearMouth'>
                <ui-label-text labelWidth="120" label="结算年月：" :required="true">
                  <el-input v-model="dialogPropertyChargeVO.yearMouth" clearable slot='text' placeholder="范例：YYYYMM(201706)"></el-input>
                </ui-label-text>
              </el-form-item>
            </el-col>
            <el-col :span=12>
              <el-form-item prop='batch'>
                <ui-label-text labelWidth="120" label="批次：" :required="true">
                  <el-select v-model="dialogPropertyChargeVO.batch" slot="text" placeholder="请选择批次">
                    <el-option
                        label="01"
                        value="01">
                    </el-option>
                    <el-option
                        label="02"
                        value="02">
                    </el-option>
                    <el-option
                        label="03"
                        value="03">
                    </el-option>
                    <el-option
                        label="04"
                        value="04">
                    </el-option>
                  </el-select>
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
import { mapActions } from 'vuex'
import IsEmpty from '@/utils/IsEmpty'
import {
  api
} from '@/api/lifeInsur_mgr/lifeInsureBillMake.js'
export default {
  name: '',
  data () {
    return {
      PropertyChargeVO: {
        companyCode: '',
        companyName: '',
        comCode: '',
        comName: '',
        yearMouth: '',
        batch: '',
        type: '',
        pageSize: 50,
        currentPage: 1
      },
      dialogPropertyChargeVO: {
        companyCode: '',
        companyName: '',
        comCode: '',
        comName: '',
        batch: '',
        yearMouth: ''
      },
      makeListData: {
        companyCode: '',
        companyName: '',
        comCode: '',
        comName: '',
        yearMouth: '',
        type: '',
        batch: ''
      },
      companyQueryInfo: {
        type: '1',
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
      rules: {
        companyCode: [
          { required: true, message: '请输入财险保险公司代码', trigger: 'change' }
        ],
        companyName: [
          { required: true, message: '请输入财险保险公司名称', trigger: 'change' }
        ],
        comCode: [
          { required: true, message: '请输入佰盈机构代码', trigger: 'change' }
        ],
        comName: [
          { required: true, message: '请输入佰盈机构名称', trigger: 'change' }
        ],
        yearMouth: [
          { required: true, message: '请输入结算年月', trigger: 'change' }
        ],
        batch: [
          { required: true, message: '请输入批次', trigger: 'change' }
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
        ],
        batch: [
          { required: true, message: '请输入批次', trigger: 'change' }
        ]
      },
      quanxian: {
        createStatement: true,
        query: true,
        review: true,
        export: true,
        import: true
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
      loading: '',
      isTip: false,
      afterQueryInfo1: false,
      afterQueryDialogData1: ''
    }
  },
  mounted () {
    api(`/auth/findButtonByUserCodeAndPage?userId=${this.$store.state.login.loginUserId}&page=产险手续费对账单手动生成`, 'get').then(result => {
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
    uploadUrl () {
      return '/tabycore/propertyCharge/propertyChargeInportCompanyStatement'
    },
    opensingleComDialog (index) {
      if (!(this.comDialog || this.comDialog1 || this.comDialog2 || this.comDialog3)) {
        switch (index) {
          case 0:
            this.companyQueryInfo.clickType = '1'
            this.companyQueryInfo.insurerCode = this.PropertyChargeVO.companyCode
            this.companyQueryInfo.insurerName = this.PropertyChargeVO.companyName
            this.commissionConfigdblqueryCom1(this.companyQueryInfo).then(
              (res) => {
                if (res.data.code !== '000000' && !IsEmpty(res.data.code)) {
                  this.openToast('warning', res.data.msg)
                } else {
                  // this.tempTableData1 = res.data.data.data
                  // for (let i = 0; i < this.tempTableData1.length; i++) {
                  //   this.tempTableData1[i]['renderData'] = `${this.tempTableData1[i].insurercode}-${this.tempTableData1[i].insurername}`
                  // }
                  // this.fenyetotalData = res.data.data.totalRecords
                  // this.comDialog = true
                  // this.comDialogCom = true
                  // this.comDialogworker = false
                  if (res.data.data.data.length === 1) {
                    this.PropertyChargeVO.companyCode = res.data.data.data[0].insurercode
                    this.PropertyChargeVO.companyName = res.data.data.data[0].insurername
                  }
                }
              }
            )
            break
          case 1:
            this.orgQueryInfo.clickType = '1'
            if (!IsEmpty(this.PropertyChargeVO.comCode)) {
              this.orgQueryInfo.comCodeOrName = this.PropertyChargeVO.comCode
            } else if (!IsEmpty(this.PropertyChargeVO.comName)) {
              this.orgQueryInfo.comCodeOrName = this.PropertyChargeVO.comName
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
                    this.PropertyChargeVO.comCode = res.data.data.data[0].comCode
                    this.PropertyChargeVO.comName = res.data.data.data[0].comCName
                  }
                }
              }
            )
            break
          case 2:
            this.companyQueryInfo.clickType = '1'
            this.companyQueryInfo.insurerCode = this.dialogPropertyChargeVO.companyCode
            this.companyQueryInfo.insurerName = this.dialogPropertyChargeVO.companyName
            this.commissionConfigdblqueryCom1(this.companyQueryInfo).then(
              (res) => {
                if (res.data.code !== '000000' && !IsEmpty(res.data.code)) {
                  this.openToast('warning', res.data.msg)
                } else {
                  if (res.data.data.data.length === 1) {
                    this.dialogPropertyChargeVO.companyCode = res.data.data.data[0].insurercode
                    this.dialogPropertyChargeVO.companyName = res.data.data.data[0].insurername
                  }
                }
              }
            )
            break
          case 3:
            this.orgQueryInfo.clickType = '1'
            if (!IsEmpty(this.dialogPropertyChargeVO.comCode)) {
              this.orgQueryInfo.comCodeOrName = this.dialogPropertyChargeVO.comCode
            } else if (!IsEmpty(this.dialogPropertyChargeVO.comName)) {
              this.orgQueryInfo.comCodeOrName = this.dialogPropertyChargeVO.comName
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
                    this.dialogPropertyChargeVO.comCode = res.data.data.data[0].comCode
                    this.dialogPropertyChargeVO.comName = res.data.data.data[0].comCName
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
              this.PropertyChargeVO.currentPage = 1
              this.propertyInsureQueryData(this.PropertyChargeVO)
              break
            case 2:
              this.submitCheck()
              break
            case 3:
              this.exportCheck()
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
      if (IsEmpty(this.dialogPropertyChargeVO.companyCode) || IsEmpty(this.dialogPropertyChargeVO.companyName) || IsEmpty(this.dialogPropertyChargeVO.comCode) || IsEmpty(this.dialogPropertyChargeVO.comName) || IsEmpty(this.dialogPropertyChargeVO.yearMouth)) {
        this.openToast('warning', '请填入相关必填项')
      } else if (this.dialogPropertyChargeVO.yearMouth.length !== 6) {
        this.openToast('warning', '结算年月格式错误')
      } else if (list.length <= 0) {
        this.openToast('warning', '请先选择文件')
      } else {
        let temp1 = false
        if (this.dialogPropertyChargeVO.yearMouth.slice(0, 1) !== '2') {
          temp1 = true
        }
        if (this.dialogPropertyChargeVO.yearMouth.slice(1, 2) !== '0') {
          temp1 = true
        }
        if (parseInt(this.dialogPropertyChargeVO.yearMouth.slice(4, 5)) > 1) {
          temp1 = true
        }
        if (parseInt(this.dialogPropertyChargeVO.yearMouth.slice(4, 5)) === 0 && parseInt(this.dialogPropertyChargeVO.yearMouth.slice(5, 6)) === 0) {
          temp1 = true
        }
        if (temp1) {
          this.openToast('warning', '结算年月格式不正确')
        } else {
          this.isTip = true
        }
      }
    },
    initAll () {
      this.dialogPropertyChargeVO = {
        companyCode: '',
        companyName: '',
        comCode: '',
        comName: '',
        yearMouth: '',
        batch: ''
      }
      this.makeListData = {
        companyCode: '',
        companyName: '',
        comCode: '',
        comName: '',
        yearMouth: '',
        type: '',
        batch: ''
      }
      this.companyQueryInfo = {
        type: '1',
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
    makeBillListMoneyInsure (info) {
      this.Loading()
      api('/propertyCharge/propertyChargeCompanyStatement', 'post', info).then(result => {
        this.closeLoading()
        if (result.data === 1) {
          api('/propertyCharge/addPropertyChargePoundageRecon', 'post', info).then(result => {
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
          this.openToast('warning', '已存在待审核或审核通过的对账单')
          this.closeLoading()
        } else if (result.data === 4) {
          this.openToast('warning', '正在生成对账单，请耐心等待!')
          this.closeLoading()
        } else if (result.data === 3) {
          this.openToast('warning', '请导入对账单模板')
          this.closeLoading()
        }
      })
    },
    makeList () {
      let PropertyChargeVO = {
        companyCode: '',
        companyName: '',
        comCode: '',
        comName: '',
        type: '',
        yearMouth: '',
        batch: ''
      }
      PropertyChargeVO.companyCode = this.PropertyChargeVO.companyCode
      PropertyChargeVO.companyName = this.PropertyChargeVO.companyName
      PropertyChargeVO.comCode = this.PropertyChargeVO.comCode
      PropertyChargeVO.comName = this.PropertyChargeVO.comName
      PropertyChargeVO.type = this.PropertyChargeVO.type
      PropertyChargeVO.yearMouth = this.PropertyChargeVO.yearMouth
      PropertyChargeVO.batch = this.PropertyChargeVO.batch
      // 生成对账单
      this.makeBillListMoneyInsure(PropertyChargeVO)
    },
    // toast提示
    openToast (type, mesg) {
      this.$message({
        showClose: true,
        message: mesg,
        type: type
      })
    },
    submitCheck () {
      let PropertyChargeVO = {
        companyCode: '',
        companyName: '',
        comCode: '',
        comName: '',
        type: '',
        yearMouth: ''
      }
      PropertyChargeVO.companyCode = this.PropertyChargeVO.companyCode
      PropertyChargeVO.companyName = this.PropertyChargeVO.companyName
      PropertyChargeVO.comCode = this.PropertyChargeVO.comCode
      PropertyChargeVO.comName = this.PropertyChargeVO.comName
      PropertyChargeVO.type = this.PropertyChargeVO.type
      PropertyChargeVO.yearMouth = this.PropertyChargeVO.yearMouth
      // 提交审核
      this.goExamineMoneyInsure(this.PropertyChargeVO)
    },
    goExamineMoneyInsure (info) {
      this.Loading()
      console.log(info)
      return api('/propertyCharge/updatePropertyChargeCompareDetail', 'post', info).then(result => {
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
      })
    },
    initshuangjiDialog () {
      this.companyQueryInfo = {
        type: '1',
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
    propertyInsureQueryData (info) {
      this.Loading()
      console.log(info)
      api('/propertyCharge/queryPropertyChargeDetail', 'post', info).then(result => {
        this.renderTableData = []
        // 1
        if (result.data !== 1 && result.data !== '1' && !IsEmpty(result.data)) {
          this.closeLoading()
          this.openToast('warning', result.data)
          this.afterQueryInfo1 = true
          this.afterQueryDialogData1 = result.data
        } else {
          api('/propertyCharge/queryPropertyChargeCompareDetail', 'post', info).then(result => {
            console.log(result.data)
            this.renderTableData = result.data.content
            this.totalRecords1 = result.data.totalElements
            this.tableShowOrNot = true
            this.closeLoading()
          }).catch((e) => {
            console.log(e)
          })
        }
      }).catch((e) => {
        console.log(e)
      })
    },
    importList () {
      this.showImportDialog = true
    },
    exportCheck () {
      window.open(`/tabycore/propertyCharge/downloadPropertyChargeCompareDetail?companyCode=${this.PropertyChargeVO.companyCode}&companyName=${this.PropertyChargeVO.companyName}&comCode=${this.PropertyChargeVO.comCode}&comName=${this.PropertyChargeVO.comName}&type=${this.PropertyChargeVO.type}&yearMouth=${this.PropertyChargeVO.yearMouth}&batch=${this.PropertyChargeVO.batch}`)
    },
    downloadModal () {
      window.open('/tabycore/rate/propertyChargeMould')
    },
    importDialogClose () {
      this.showImportDialog = false
      this.$refs['dialogPropertyChargeVO'].resetFields()
      this.dialogPropertyChargeVO = {
        companyCode: '',
        companyName: '',
        comCode: '',
        comName: '',
        yearMouth: '',
        batch: ''
      }
      this.fileList = []
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
    beforeAvatarUpload (file) {
      let testmsg = file.name.substring(file.name.lastIndexOf('.') + 1)
      const extension = testmsg === 'xls'
      if (!extension) {
        this.openToast('warning', '上传文件只能是 xls格式')
        this.closeLoading()
      }
      return extension
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
    openComDialog (index) {
      switch (index) {
        case 0:
          this.companyQueryInfo.clickType = '2'
          this.companyQueryInfo.insurerCode = this.PropertyChargeVO.companyCode
          this.companyQueryInfo.insurerName = this.PropertyChargeVO.companyName
          this.searchForCom1(this.companyQueryInfo)
          break
        case 1:
          this.orgQueryInfo.clickType = '2'
          if (!IsEmpty(this.PropertyChargeVO.comCode)) {
            this.orgQueryInfo.comCodeOrName = this.PropertyChargeVO.comCode
          } else if (!IsEmpty(this.PropertyChargeVO.comName)) {
            this.orgQueryInfo.comCodeOrName = this.PropertyChargeVO.comName
          } else {
            this.orgQueryInfo.comCodeOrName = ''
          }
          this.searchForCom2(this.orgQueryInfo)
          break
        case 2:
          this.companyQueryInfo.clickType = '2'
          this.companyQueryInfo.insurerCode = this.dialogPropertyChargeVO.companyCode
          this.companyQueryInfo.insurerName = this.dialogPropertyChargeVO.companyName
          this.searchForCom3(this.companyQueryInfo)
          break
        case 3:
          this.orgQueryInfo.clickType = '2'
          if (!IsEmpty(this.dialogPropertyChargeVO.comCode)) {
            this.orgQueryInfo.comCodeOrName = this.dialogPropertyChargeVO.comCode
          } else if (!IsEmpty(this.dialogPropertyChargeVO.comName)) {
            this.orgQueryInfo.comCodeOrName = this.dialogPropertyChargeVO.comName
          } else {
            this.orgQueryInfo.comCodeOrName = ''
          }
          this.searchForCom4(this.orgQueryInfo)
          break
        default:
          break
      }
    },
    comDialogClosing (index) {
      this.initshuangjiDialog()
      switch (index) {
        case 0:
          this.PropertyChargeVO.companyCode = ''
          this.PropertyChargeVO.companyName = ''
          this.comDialog = false
          break
        case 1:
          this.PropertyChargeVO.comCode = ''
          this.PropertyChargeVO.comName = ''
          this.comDialog1 = false
          break
        case 2:
          this.dialogPropertyChargeVO.companyCode = ''
          this.dialogPropertyChargeVO.companyName = ''
          this.comDialog2 = false
          break
        case 3:
          this.dialogPropertyChargeVO.comCode = ''
          this.dialogPropertyChargeVO.comName = ''
          this.comDialog3 = false
          break
        default:
          break
      }
    },
    submitUpload () {
      this.$refs.upload.submit()
      this.isTip = false
      this.$refs['dialogPropertyChargeVO'].resetFields()
      this.initAll()
      this.Loading()
    },
    dialogBackData0 (data) {
      this.comDialogClosing(0)
      let temp = []
      temp = data.split('-')
      this.PropertyChargeVO.companyCode = temp[0]
      this.PropertyChargeVO.companyName = temp[1]
    },
    dialogBackData1 (data) {
      this.comDialogClosing(1)
      let temp = []
      temp = data.split('-')
      this.PropertyChargeVO.comCode = temp[0]
      this.PropertyChargeVO.comName = temp[1]
    },
    dialogBackData2 (data) {
      this.comDialogClosing(2)
      let temp = []
      temp = data.split('-')
      this.dialogPropertyChargeVO.companyCode = temp[0]
      this.dialogPropertyChargeVO.companyName = temp[1]
    },
    dialogBackData3 (data) {
      this.comDialogClosing(3)
      let temp = []
      temp = data.split('-')
      this.dialogPropertyChargeVO.comCode = temp[0]
      this.dialogPropertyChargeVO.comName = temp[1]
    },
    handleCurrentChange (val) {
      this.PropertyChargeVO.currentPage = val
      this.propertyInsureQueryData(this.PropertyChargeVO)
    },
    handleSizeChange (val) {
      this.PropertyChargeVO.pageSize = val
      this.PropertyChargeVO.currentPage = 1
      this.propertyInsureQueryData(this.PropertyChargeVO)
    },
    ...mapActions([
      'commissionConfigdblqueryCom1', 'contiListCheckDialogDataGet1'
    ])
  },
  watch: {
    'PropertyChargeVO.companyCode' () {
      if (this.PropertyChargeVO.companyCode === '') {
        this.PropertyChargeVO.companyName = ''
      }
    },
    'PropertyChargeVO.companyName' () {
      if (this.PropertyChargeVO.companyName === '') {
        this.PropertyChargeVO.companyCode = ''
      }
    },
    'PropertyChargeVO.comCode' () {
      if (this.PropertyChargeVO.comCode === '') {
        this.PropertyChargeVO.comName = ''
      }
    },
    'PropertyChargeVO.comName' () {
      if (this.PropertyChargeVO.comName === '') {
        this.PropertyChargeVO.comCode = ''
      }
    },
    'dialogPropertyChargeVO.companyCode' () {
      if (this.dialogPropertyChargeVO.companyCode === '') {
        this.dialogPropertyChargeVO.companyName = ''
      }
    },
    'dialogPropertyChargeVO.companyName' () {
      if (this.dialogPropertyChargeVO.companyName === '') {
        this.dialogPropertyChargeVO.companyCode = ''
      }
    },
    'dialogPropertyChargeVO.comCode' () {
      if (this.dialogPropertyChargeVO.comCode === '') {
        this.dialogPropertyChargeVO.comName = ''
      }
    },
    'dialogPropertyChargeVO.comName' () {
      if (this.dialogPropertyChargeVO.comName === '') {
        this.dialogPropertyChargeVO.comCode = ''
      }
    }
  },
  computed: {
    comDialogData1 () {
      let temp = this.tempTableData1
      if (!IsEmpty(temp)) {
        for (let i = 0; i < temp.length; i++) {
          temp[i]['renderData'] = `${temp[i].insurercode}-${temp[i].insurername}`
        }
      }
      return temp
    },
    comDialogData2 () {
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
</style>
