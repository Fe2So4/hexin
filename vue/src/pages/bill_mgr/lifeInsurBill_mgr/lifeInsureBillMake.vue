<template>
  <div id="orgadd" >
      <ui-notice-bar slot="breadcast" >
        <el-breadcrumb slot="location" separator=">">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>对账单管理</el-breadcrumb-item>
            <el-breadcrumb-item>寿险对账单管理</el-breadcrumb-item>
            <el-breadcrumb-item>手续费对账单手动生成</el-breadcrumb-item>
          </el-breadcrumb>
      </ui-notice-bar>
      <div class="ri-content" slot="content" >
        <el-form  ref="lifeChargeVO" :rules="rules" :model="lifeChargeVO">
          <el-row class="ri-line">
            <el-col :span=12>
              <el-form-item prop='companyCode'>
                <ui-label-text labelWidth="180" label="保险公司代码：" :required="true">
                  <el-input v-model="lifeChargeVO.companyCode" slot='text' placeholder="双击可选择" clearable @dblclick.native="openComDialog(0)" @blur='opensingleComDialog(0)'></el-input>
                </ui-label-text>
              </el-form-item>
            </el-col>
            <el-col :span=12>
              <el-form-item prop='companyName'>
                <ui-label-text labelWidth="180" label="保险公司名称：" :required="true">
                  <el-input v-model="lifeChargeVO.companyName" slot='text' placeholder="双击可选择" clearable @dblclick.native="openComDialog(0)" @blur='opensingleComDialog(0)'></el-input>
                </ui-label-text>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row class="ri-line">
            <el-col :span=12>
              <el-form-item prop='comCode'>
                <ui-label-text labelWidth="180" label="佰盈机构代码：" :required="true">
                  <el-input v-model="lifeChargeVO.comCode" slot='text' placeholder="双击可选择" clearable @dblclick.native="openComDialog(1)" @blur='opensingleComDialog(1)'></el-input>
                </ui-label-text>
              </el-form-item>
            </el-col>
            <el-col :span=12>
              <el-form-item prop='comName'>
                <ui-label-text labelWidth="180" label="佰盈机构名称：" :required="true">
                  <el-input v-model="lifeChargeVO.comName" slot='text' placeholder="双击可选择" clearable @dblclick.native="openComDialog(1)" @blur='opensingleComDialog(1)'></el-input>
                </ui-label-text>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row class="ri-line">
            <el-col :span=12>
              <el-form-item prop='yearMouth'>
                <ui-label-text labelWidth="180" label="结算年月：" :required="true">
                  <el-input v-model="lifeChargeVO.yearMouth" slot='text' placeholder="范例：YYYYMM(201706)"></el-input>
                </ui-label-text>
              </el-form-item>
            </el-col>
            <el-col :span=12>
              <el-form-item prop='type'>
                <ui-label-text labelWidth="180" label="差异类型：" >
                  <el-select v-model="lifeChargeVO.type" slot="text" placeholder="请选择差异类型：">
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
                  <el-select v-model="lifeChargeVO.batch" slot="text" placeholder="请选择批次">
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
              <el-button type="primary" @click="submitForm('lifeChargeVO',0)" :disabled="quanxian.createStatement">生成对账单</el-button>
              <el-button type="primary" @click="submitForm('lifeChargeVO',1)" :disabled="quanxian.query">查询</el-button>
              <el-button type="primary" @click="submitForm('lifeChargeVO',2)" :disabled="quanxian.review">提交审核</el-button>
              <el-button type="primary" @click="submitForm('lifeChargeVO',3)" :disabled="quanxian.export">导出Excel</el-button>
              <el-button type="primary" @click="importList" :disabled="quanxian.import">导入保险对账单</el-button>
            </el-form-item>
          </div>
        </el-form>
      </div>
      <el-dialog title="错误信息" center :append-to-body='true' :visible.sync='afterQueryInfo'>
        <span class="center">
          <ul>
            <li v-for="(item, index) in afterQueryDialogData" :key="index">
              {{item}}
            </li>
          </ul>
        </span>
        <div class="btn-container">
          <el-button @click="afterQueryInfo = false">取消</el-button>
        </div>
      </el-dialog>
      <el-dialog title="错误信息" center :append-to-body='true' :visible.sync='afterQueryInfo1'>
        <span class="center">{{afterQueryDialogData1}}</span>
        <div class="btn-container">
          <el-button @click="afterQueryInfo1 = false">取消</el-button>
        </div>
      </el-dialog>
      <div v-if='tableShowOrNot'>
        <el-table id="dataTable" stripe :data="renderTableData" ref="multipleTable" tooltip-effect="dark" style="width: 100%"
        >
          <el-table-column prop="difference_type" label="差异类型"  width="140">
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
          <el-table-column label="投保单号" width="150">
            <el-table-column prop="proposalNo1" label="佰盈" width="150">
            </el-table-column>
            <el-table-column prop="proposalNo2" label="保险公司" width="150">
          </el-table-column>
          </el-table-column>
          <el-table-column label="险种代码" width="300">
            <el-table-column prop="riskCode1" label="佰盈" width="300">
            </el-table-column>
            <el-table-column prop="riskCode2" label="保险公司" width="300">
            </el-table-column>
          </el-table-column>
          <el-table-column label="险种名称" width="300">
            <el-table-column prop="riskName1" label="佰盈" width="300">
            </el-table-column>
            <el-table-column prop="riskName2" label="保险公司" width="300">
            </el-table-column>
          </el-table-column>
          <el-table-column label="主/附险" width="150">
            <el-table-column prop="mainflag1" label="佰盈" width="150">
            </el-table-column>
            <el-table-column prop="mainflag2" label="保险公司" width="150">
            </el-table-column>
          </el-table-column>
          <el-table-column label="缴费期限(年)" width="150">
            <el-table-column prop="paymentperiod1" label="佰盈" width="150">
            </el-table-column>
            <el-table-column prop="paymentperiod2" label="保险公司" width="150">
            </el-table-column>
          </el-table-column>
          <el-table-column label="回执日期" width="150">
            <el-table-column prop="receiptDate1" label="佰盈" width="150">
            </el-table-column>
            <el-table-column prop="receiptDate2" label="保险公司" width="150">
            </el-table-column>
          </el-table-column>
          <el-table-column label="承保日期" width="150">
            <el-table-column prop="acceptDate1" label="佰盈" width="150">
            </el-table-column>
            <el-table-column prop="acceptDate2" label="保险公司" width="150">
            </el-table-column>
          </el-table-column>
          <el-table-column label="手续费" width="150">
            <el-table-column prop="poundage1" label="佰盈" width="150">
            </el-table-column>
            <el-table-column prop="poundage2" label="保险公司" width="150">
            </el-table-column>
          </el-table-column>
        </el-table>
        <div class="block">
          <el-pagination
            :pager-count="5"
            @current-change="handleCurrentChange"
            @size-change="handleSizeChange"
            :current-page="lifeChargeVO.currentPage"
            :page-size ="lifeChargeVO.pageSize"
            :page-sizes="[10,20,50]"
            :total="totalRecords1"
            layout="total, sizes, prev, pager, next, jumper"
            >
          </el-pagination>
        </div>
      </div>
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
            :data='dialogLifeChargeVO'
            :file-list="fileList">
            <el-button size="small" type="primary">选取文件</el-button>
            <div slot="tip" class="el-upload__tip"></div>
          </el-upload>
          <el-button type="success" @click="goUpload" >上传文件</el-button>
          <el-button type="primary" @click.native.prevent="downloadModal()" class='moban'>新模板下载</el-button>
        </div>
        <el-form ref="dialogLifeChargeVO" :rules="dialogRules" :model="dialogLifeChargeVO">
          <el-row class="ri-line">
            <el-col :span=12>
              <el-form-item prop='yearMouth'>
                <ui-label-text labelWidth="120" label="结算年月：" :required="true">
                  <el-input v-model="dialogLifeChargeVO.yearMouth" slot='text' clearable placeholder="范例：YYYYMM(201706)"></el-input>
                </ui-label-text>
              </el-form-item>
            </el-col>
            <el-col :span=12>
              <el-form-item prop='batch'>
                <ui-label-text labelWidth="120" label="批次：" :required="true">
                  <el-select v-model="dialogLifeChargeVO.batch" slot="text" placeholder="请选择批次">
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
          <el-row class="ri-line">
            <el-col :span=12>
              <el-form-item prop='companyCode'>
                <ui-label-text labelWidth="120" label="保险公司代码：" :required="true">
                  <el-input v-model="dialogLifeChargeVO.companyCode" clearable slot='text' placeholder="双击可选择" @dblclick.native="openComDialog(2)" @blur='opensingleComDialog(2)'></el-input>
                </ui-label-text>
              </el-form-item>
            </el-col>
            <el-col :span=12>
              <el-form-item prop='companyName'>
                <ui-label-text labelWidth="120" label="保险公司名称：" :required="true">
                  <el-input v-model="dialogLifeChargeVO.companyName" clearable slot='text' placeholder="双击可选择" @dblclick.native="openComDialog(2)" @blur='opensingleComDialog(2)'></el-input>
                </ui-label-text>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span=12>
              <el-form-item prop='comCode'>
                <ui-label-text labelWidth="120" label="佰盈分公司代码：" :required="true">
                  <el-input v-model="dialogLifeChargeVO.comCode" clearable slot='text' placeholder="双击可选择" @dblclick.native="openComDialog(3)" @blur='opensingleComDialog(3)'></el-input>
                </ui-label-text>
              </el-form-item>
            </el-col>
            <el-col :span=12>
              <el-form-item prop='comName'>
                <ui-label-text labelWidth="120" label="佰盈分公司名称：" :required="true">
                  <el-input v-model="dialogLifeChargeVO.comName" clearable slot='text' placeholder="双击可选择" @dblclick.native="openComDialog(3)" @blur='opensingleComDialog(3)'></el-input>
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
      lifeChargeVO: {
        companyCode: '',
        companyName: '',
        comCode: '',
        comName: '',
        yearMouth: '',
        type: '',
        batch: '',
        currentPage: 1,
        pageSize: 10
      },
      dialogLifeChargeVO: {
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
        type: '2',
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
      rules: {
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
      isTip: false,
      tableShowOrNot: false,
      showImportDialog: false,
      comDialog: false,
      comDialogworker: false,
      comDialogCom: false,
      comDialog1: false,
      comDialogworker1: false,
      comDialogCom1: false,
      comDialog2: false,
      comDialogworker2: false,
      comDialogCom2: false,
      comDialog3: false,
      comDialogworker3: false,
      comDialogCom3: false,
      fileList: [],
      tempTableData1: [],
      tempTableData2: [],
      tempTableData3: [],
      tempTableData4: [],
      fenyetotalData: 0,
      renderTableData: [],
      totalRecords1: 0,
      loading: '',
      afterQueryInfo: false,
      afterQueryDialogData: [],
      afterQueryInfo1: false,
      afterQueryDialogData1: ''
    }
  },
  mounted () {
    api(`/auth/findButtonByUserCodeAndPage?userId=${this.$store.state.login.loginUserId}&page=寿险手续费对账单手动生成`, 'get').then(result => {
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
    'lifeChargeVO.companyCode' () {
      if (this.lifeChargeVO.companyCode === '') {
        this.lifeChargeVO.companyName = ''
      }
    },
    'lifeChargeVO.companyName' () {
      if (this.lifeChargeVO.companyName === '') {
        this.lifeChargeVO.companyCode = ''
      }
    },
    'lifeChargeVO.comCode' () {
      if (this.lifeChargeVO.comCode === '') {
        this.lifeChargeVO.comName = ''
      }
    },
    'lifeChargeVO.comName' () {
      if (this.lifeChargeVO.comName === '') {
        this.lifeChargeVO.comCode = ''
      }
    },
    'dialogLifeChargeVO.companyCode' () {
      if (this.dialogLifeChargeVO.companyCode === '') {
        this.dialogLifeChargeVO.companyName = ''
      }
    },
    'dialogLifeChargeVO.companyName' () {
      if (this.dialogLifeChargeVO.companyName === '') {
        this.dialogLifeChargeVO.companyCode = ''
      }
    },
    'dialogLifeChargeVO.comCode' () {
      if (this.dialogLifeChargeVO.comCode === '') {
        this.dialogLifeChargeVO.comName = ''
      }
    },
    'dialogLifeChargeVO.comName' () {
      if (this.dialogLifeChargeVO.comName === '') {
        this.dialogLifeChargeVO.comCode = ''
      }
    }
  },
  methods: {
    initshuangjiDialog () {
      this.companyQueryInfo = {
        type: '2',
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
    initAll () {
      this.dialogLifeChargeVO = {
        companyCode: '',
        companyName: '',
        comCode: '',
        comName: '',
        batch: '',
        yearMouth: ''
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
        type: '2',
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
    lifeInsureQueryData (info) {
      this.Loading()
      api('/lifeCharge/queryLifeChargeError', 'post', info).then(result => {
        this.renderTableData = []
        console.log(result)
        if (result.data !== 1 && result.data !== '1' && !IsEmpty(result.data)) {
          this.closeLoading()
          this.openToast('warning', result.data)
          this.afterQueryInfo = true
          this.afterQueryDialogData = result.data.split(';')
        } else {
          api('/lifeCharge/queryLifeChargeDetail', 'post', info).then(result => {
            console.log(result)
            if (result.data !== 1 && result.data !== '1' && !IsEmpty(result.data)) {
              this.closeLoading()
              this.openToast('warning', result.data)
              this.afterQueryInfo1 = true
              this.afterQueryDialogData1 = result.data
            } else {
              api('/lifeCharge/queryLifeChargeCompareDetail', 'post', info).then(result => {
                this.closeLoading()
                this.tableShowOrNot = true
                this.renderTableData = result.data.content
                this.totalRecords1 = result.data.totalElements
              }).catch((e) => {
                console.log(e)
              })
            }
          }).catch((e) => {
            console.log(e)
          })
        }
      }).catch((e) => {
        console.log(e)
      })
    },
    uploadUrl () {
      return '/tabycore/lifeCharge/lifeChargeInportCompanyStatement'
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
    beforeAvatarUpload (file) {
      let testmsg = file.name.substring(file.name.lastIndexOf('.') + 1)
      const extension = testmsg === 'xls'
      if (!extension) {
        this.openToast('warning', '上传文件只能是 xls格式')
        this.closeLoading()
      }
      return extension
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
              this.lifeChargeVO.currentPage = 1
              this.lifeInsureQueryData(this.lifeChargeVO)
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
    queryData () {
      this.lifeInsureQueryData(this.lifeChargeVO)
    },
    goUpload () {
      let list = document.querySelector('.is-ready')
      if (IsEmpty(list)) {
        list = []
      } else {
        list = [1]
      }
      if (IsEmpty(this.dialogLifeChargeVO.companyCode) || IsEmpty(this.dialogLifeChargeVO.companyName) || IsEmpty(this.dialogLifeChargeVO.comCode) || IsEmpty(this.dialogLifeChargeVO.comName) || IsEmpty(this.dialogLifeChargeVO.yearMouth)) {
        this.openToast('warning', '请填入相关必填项')
      } else if (this.dialogLifeChargeVO.yearMouth.length !== 6) {
        this.openToast('warning', '结算年月格式不正确')
      } else if (list.length <= 0) {
        this.openToast('warning', '请先选择文件')
      } else {
        let temp1 = false
        if (this.dialogLifeChargeVO.yearMouth.slice(0, 1) !== '2') {
          temp1 = true
        }
        if (this.dialogLifeChargeVO.yearMouth.slice(1, 2) !== '0') {
          temp1 = true
        }
        if (parseInt(this.dialogLifeChargeVO.yearMouth.slice(4, 5)) > 1) {
          temp1 = true
        }
        if (parseInt(this.dialogLifeChargeVO.yearMouth.slice(4, 5)) === 0 && parseInt(this.dialogLifeChargeVO.yearMouth.slice(5, 6)) === 0) {
          temp1 = true
        }
        if (temp1) {
          this.openToast('warning', '结算年月格式不正确')
        } else {
          this.isTip = true
        }
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
      let LifeChargeVO1 = {
        companyCode: '',
        companyName: '',
        comCode: '',
        comName: '',
        type: '',
        yearMouth: '',
        batch: ''
      }
      LifeChargeVO1.companyCode = this.lifeChargeVO.companyCode
      LifeChargeVO1.companyName = this.lifeChargeVO.companyName
      LifeChargeVO1.comCode = this.lifeChargeVO.comCode
      LifeChargeVO1.comName = this.lifeChargeVO.comName
      LifeChargeVO1.type = this.lifeChargeVO.type
      LifeChargeVO1.yearMouth = this.lifeChargeVO.yearMouth
      LifeChargeVO1.batch = this.lifeChargeVO.batch
      // 生成对账单
      this.makeBillList(LifeChargeVO1)
    },
    makeBillList (info) {
      this.Loading()
      api('/lifeCharge/lifeChargeCompanyStatement', 'post', info).then(result => {
        console.log(result)
        if (result.data === 1) {
          api('/lifeCharge/addLifeChargePoundageRecon', 'post', info).then(result => {
            this.closeLoading()
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
    submitUpload () {
      this.$refs.upload.submit()
      this.isTip = false
      this.$refs['dialogLifeChargeVO'].resetFields()
      this.initAll()
      this.Loading()
    },
    submitCheck () {
      // 提交审核
      this.goExamineLifeInsure(this.lifeChargeVO)
    },
    goExamineLifeInsure (info) {
      this.Loading()
      return api('/lifeCharge/updateLifeChargeCompareDetail', 'post', info).then(result => {
        console.log(result)
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
    importList () {
      this.showImportDialog = true
    },
    exportCheck () {
      let info = this.lifeChargeVO
      window.open(`/tabycore/lifeCharge/downloadLifeChargeCompareDetail?companyCode=${info.companyCode}&companyName=${info.companyName}&comCode=${info.comCode}&comName=${info.comName}&type=${info.type}&yearMouth=${info.yearMouth}&batch=${info.batch}`)
    },
    downloadModal () {
      window.open('/tabycore/rate/lifeChargeMould')
    },
    importDialogClose () {
      this.showImportDialog = false
      this.$refs['dialogLifeChargeVO'].resetFields()
      this.dialogLifeChargeVO = {
        companyCode: '',
        companyName: '',
        comCode: '',
        comName: '',
        yearMouth: '',
        batch: ''
      }
      this.fileList = []
    },
    openComDialog (index) {
      switch (index) {
        case 0:
          this.companyQueryInfo.clickType = '2'
          this.companyQueryInfo.insurerCode = this.lifeChargeVO.companyCode
          this.companyQueryInfo.insurerName = this.lifeChargeVO.companyName
          this.searchForCom1(this.companyQueryInfo)
          break
        case 1:
          this.orgQueryInfo.clickType = '2'
          if (!IsEmpty(this.lifeChargeVO.comCode)) {
            this.orgQueryInfo.comCodeOrName = this.lifeChargeVO.comCode
          } else if (!IsEmpty(this.lifeChargeVO.comName)) {
            this.orgQueryInfo.comCodeOrName = this.lifeChargeVO.comName
          } else {
            this.orgQueryInfo.comCodeOrName = ''
          }
          this.searchForCom2(this.orgQueryInfo)
          break
        case 2:
          this.companyQueryInfo.clickType = '2'
          this.companyQueryInfo.insurerCode = this.dialogLifeChargeVO.companyCode
          this.companyQueryInfo.insurerName = this.dialogLifeChargeVO.companyName
          this.searchForCom3(this.companyQueryInfo)
          break
        case 3:
          this.orgQueryInfo.clickType = '2'
          if (!IsEmpty(this.dialogLifeChargeVO.comCode)) {
            this.orgQueryInfo.comCodeOrName = this.dialogLifeChargeVO.comCode
          } else if (!IsEmpty(this.dialogLifeChargeVO.comName)) {
            this.orgQueryInfo.comCodeOrName = this.dialogLifeChargeVO.comName
          } else {
            this.orgQueryInfo.comCodeOrName = ''
          }
          this.searchForCom4(this.orgQueryInfo)
          break
        default:
          break
      }
    },
    opensingleComDialog (index) {
      if (!(this.comDialog || this.comDialog1 || this.comDialog2 || this.comDialog3)) {
        switch (index) {
          case 0:
            this.companyQueryInfo.clickType = '1'
            this.companyQueryInfo.insurerCode = this.lifeChargeVO.companyCode
            this.companyQueryInfo.insurerName = this.lifeChargeVO.companyName
            this.commissionConfigdblqueryCom1(this.companyQueryInfo).then(
              (res) => {
                if (res.data.code !== '000000' && !IsEmpty(res.data.code)) {
                  this.openToast('warning', res.data.msg)
                } else {
                  if (res.data.data.data.length === 1) {
                    this.lifeChargeVO.companyCode = res.data.data.data[0].insurercode
                    this.lifeChargeVO.companyName = res.data.data.data[0].insurername
                  }
                }
              }
            )
            break
          case 1:
            this.orgQueryInfo.clickType = '1'
            if (!IsEmpty(this.lifeChargeVO.comCode)) {
              this.orgQueryInfo.comCodeOrName = this.lifeChargeVO.comCode
            } else if (!IsEmpty(this.lifeChargeVO.comName)) {
              this.orgQueryInfo.comCodeOrName = this.lifeChargeVO.comName
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
                    this.lifeChargeVO.comCode = res.data.data.data[0].comCode
                    this.lifeChargeVO.comName = res.data.data.data[0].comCName
                  }
                }
              }
            )
            break
          case 2:
            this.companyQueryInfo.clickType = '1'
            this.companyQueryInfo.insurerCode = this.dialogLifeChargeVO.companyCode
            this.companyQueryInfo.insurerName = this.dialogLifeChargeVO.companyName
            this.commissionConfigdblqueryCom1(this.companyQueryInfo).then(
              (res) => {
                if (res.data.code !== '000000' && !IsEmpty(res.data.code)) {
                  this.openToast('warning', res.data.msg)
                } else {
                  if (res.data.data.data.length === 1) {
                    this.dialogLifeChargeVO.companyCode = res.data.data.data[0].insurercode
                    this.dialogLifeChargeVO.companyName = res.data.data.data[0].insurername
                  }
                }
              }
            )
            break
          case 3:
            this.orgQueryInfo.clickType = '1'
            if (!IsEmpty(this.dialogLifeChargeVO.comName)) {
              this.orgQueryInfo.comCodeOrName = this.dialogLifeChargeVO.comName
            } else if (!IsEmpty(this.dialogLifeChargeVO.comName)) {
              this.orgQueryInfo.comCodeOrName = this.dialogLifeChargeVO.comName
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
                    this.dialogLifeChargeVO.comCode = res.data.data.data[0].comCode
                    this.dialogLifeChargeVO.comName = res.data.data.data[0].comCName
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
    comDialogClosing (index) {
      switch (index) {
        case 0:
          this.lifeChargeVO.companyCode = ''
          this.lifeChargeVO.companyName = ''
          this.comDialog = false
          break
        case 1:
          this.lifeChargeVO.comCode = ''
          this.lifeChargeVO.comName = ''
          this.comDialog1 = false
          break
        case 2:
          this.dialogLifeChargeVO.companyCode = ''
          this.dialogLifeChargeVO.companyName = ''
          this.comDialog2 = false
          break
        case 3:
          this.dialogLifeChargeVO.comCode = ''
          this.dialogLifeChargeVO.comName = ''
          this.comDialog3 = false
          break
        default:
          break
      }
      this.initshuangjiDialog()
    },
    dialogBackData0 (data) {
      this.comDialogClosing(0)
      let temp = []
      temp = data.split('-')
      this.lifeChargeVO.companyCode = temp[0]
      this.lifeChargeVO.companyName = temp[1]
    },
    dialogBackData1 (data) {
      this.comDialogClosing(1)
      let temp = []
      temp = data.split('-')
      this.lifeChargeVO.comCode = temp[0]
      this.lifeChargeVO.comName = temp[1]
    },
    dialogBackData2 (data) {
      this.comDialogClosing(2)
      let temp = []
      temp = data.split('-')
      this.dialogLifeChargeVO.companyCode = temp[0]
      this.dialogLifeChargeVO.companyName = temp[1]
    },
    dialogBackData3 (data) {
      this.comDialogClosing(3)
      let temp = []
      temp = data.split('-')
      this.dialogLifeChargeVO.comCode = temp[0]
      this.dialogLifeChargeVO.comName = temp[1]
    },
    handleCurrentChange (val) {
      this.lifeChargeVO.currentPage = val
      this.lifeInsureQueryData(this.lifeChargeVO)
    },
    handleSizeChange (val) {
      this.lifeChargeVO.pageSize = val
      this.lifeChargeVO.currentPage = 1
      this.lifeInsureQueryData(this.lifeChargeVO)
    },
    // toast提示
    openToast (type, mesg) {
      this.$message({
        showClose: true,
        message: mesg,
        type: type
      })
    },
    ...mapActions([
      'commissionConfigdblqueryCom1', 'contiListCheckDialogDataGet1'
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
  margin-top: 30px;
  margin-bottom: 30px;
}
.ri-line{
  margin-top: 10px;
}
.moban{
  margin-top: 10px;
}
.center{
  text-align: center;
}
</style>
