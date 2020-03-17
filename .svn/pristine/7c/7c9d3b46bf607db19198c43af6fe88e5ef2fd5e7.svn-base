<template>
  <div class="wrap">
    <ui-notice-bar slot="breadcast" >
      <el-breadcrumb slot="location" separator=">">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>对账单管理</el-breadcrumb-item>
        <el-breadcrumb-item>合作经代对账单管理</el-breadcrumb-item>
        <el-breadcrumb-item>合作经代继续率奖金审核</el-breadcrumb-item>
      </el-breadcrumb>
    </ui-notice-bar>
    <el-form class="verify-content" :model="queryInfo" ref="queryInfo" :rules="rules">
      <el-row class="ri-line">
        <el-col :span=12>
          <el-form-item prop='comcode'>
            <ui-label-text labelWidth="180" label="佰盈机构代码：">
              <el-input v-model="queryInfo.comcode" slot="text" @dblclick.native="openComDialog(2)"  @blur='opensingleComDialog(0)' clearable placeholder="双击可选择"></el-input>
            </ui-label-text>
          </el-form-item>
        </el-col>
        <el-col :span=12>
          <el-form-item prop='comname'>
            <ui-label-text labelWidth="180" label="佰盈机构名称：">
              <el-input v-model="queryInfo.comname" slot="text" @dblclick.native="openComDialog(2)"  @blur='opensingleComDialog(0)' clearable placeholder="双击可选择" ></el-input>
            </ui-label-text>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row class="ri-line">
        <el-col :span="12">
          <el-form-item prop='orgcode'>
            <ui-label-text labelWidth="180" label="合作经代公司代码：">
              <el-input v-model="queryInfo.orgcode" ref="jingdaiCompanyCodeText" slot="text" clearable @dblclick.native="openComDialog(0)" placeholder="双击可选择" @blur='opensingleComDialog(1)'></el-input>
            </ui-label-text>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item prop='orgname'>
            <ui-label-text labelWidth="180" label="合作经代公司名称：">
              <el-input v-model="queryInfo.orgname" ref="jingdaiCompanyNameText" slot="text" clearable @dblclick.native="openComDialog(0)" placeholder="双击可选择" @blur='opensingleComDialog(1)'></el-input>
            </ui-label-text>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row class="ri-line">
        <el-col :span=12>
          <el-form-item prop='effectiveDate'>
            <ui-label-text :required="true" labelWidth="180" label="保单生效年月：" >
              <el-input v-model="queryInfo.effectiveDate" slot="text" placeholder="范例：YYYYMM(201706)"></el-input>
            </ui-label-text>
          </el-form-item>
        </el-col>
        <el-col :span=12>
          <el-form-item prop='verifyStatus'>
            <ui-label-text labelWidth="180" label="审核状态：">
              <el-select v-model="queryInfo.verifyStatus" slot="text" placeholder="请选择">
                <el-option label="待审核" value="1"></el-option>
                <el-option label="待复核" value="3"></el-option>
                <el-option label="复核不通过" value="9"></el-option>
                <el-option label="复核通过" value="2"></el-option>
              </el-select>
            </ui-label-text>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <div class="btn">
      <el-button type="primary" :disabled="quanxian.query" @click="submitForm('queryInfo',0)">查询</el-button>
      <el-button type="primary" :disabled="quanxian.export" @click="submitForm('queryInfo',1)">导出</el-button>
    </div>
    <ComDialog :vis='comDialog' :workerVis='comDialogworker' :comVis='comDialogCom' :newTableData='tempTableData1' @onClose='comDialogClosing(0)' @selectDialog='dialogBackData' @comdialogChangePageFunction='changeComdialogPage1' @comdialogChangePageSizeFunction='changeComdialogPageSize1' :fenyetotal='fenyetotalData'/>
    <ComDialog :vis='comDialog2' :workerVis='comDialogworker2' :comVis='comDialogCom2' :newTableData='tempTableData3' @onClose='comDialogClosing(2)' @selectDialog='dialogBackData2' @comdialogChangePageFunction='changeComdialogPage3' @comdialogChangePageSizeFunction='changeComdialogPageSize3' :fenyetotal='fenyetotalData'/>
    <div class="table" v-if="tableShowOrnot">
      <el-table :data="tableData" style="width: 100%">
        <el-table-column prop="effectiveDate" label="保单生效年月"  width="140">
          <template slot-scope="scope" >
            <span @click="getDetailExamine(scope.row)" class="tableButton">{{ scope.row.effectiveDate }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="reconno" label="对账单号"  width="300" ></el-table-column>
        <el-table-column prop="comcode" label="佰盈机构代码"  width="140"></el-table-column>
        <el-table-column prop="comname" label="佰盈机构名称"  width="300" show-overflow-tooltip></el-table-column>
        <el-table-column prop="orgcode" label="合作经代公司代码" width="140" show-overflow-tooltip></el-table-column>
        <el-table-column prop="orgname" label="合作经代公司名称" width="300" show-overflow-tooltip></el-table-column>
        <el-table-column prop="jxljj" label="继续率奖金" width="120"></el-table-column>
        <el-table-column prop="verifyStatus" label="审核状态(除继续率奖金外)" width="120"></el-table-column>
        <el-table-column prop="examHis" label="审核历史" width="120">
          <template slot-scope="scope" >
            <span @click="openExamHis(scope.row)" class="tableButton">查看</span>
          </template>
        </el-table-column>
      </el-table>
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
    </div>
    <el-dialog
      append-to-body
      center
      title="详情"
      :visible.sync="detailVisible"
      width="100%"
      :before-close='detailDialogClose'>
      <!-- <div class="upload-content"> -->
        <ui-line-tittle :collapsible="true">
          <span slot="title" >
            <i class="font_family icon-jy-menu-4" ></i>
            <span>手续费对账单详细信息</span>
          </span>
          <div class="ri-content" slot="content" >
            <el-row class="ri-line">
              <el-col :span="24">
                <ui-label-text  label="对账单号：" labelWidth="140" :text="detailDataShow.reconno">
                </ui-label-text>
              </el-col>
            </el-row>
            <el-row class="ri-line">
              <el-col :span="24">
                <ui-label-text  label="保单生效年月：" labelWidth="140" :text="detailDataShow.effectiveDate">
                </ui-label-text>
              </el-col>
            </el-row>
            <el-row class="ri-line">
              <el-col :span="24">
                <ui-label-text  label="继续率奖金（含税）：" labelWidth="140" :text="detailDataShow.jxljj ? detailDataShow.jxljj : '0'">
                </ui-label-text>
              </el-col>
            </el-row>
            <el-row class="ri-line">
              <el-col :span="24">
                <ui-label-text labelWidth="160" label="备注:" >
                  <el-input type="textarea" :rows="5" v-model="detailDataShow.beizhu"  @blur="changeBeizhu" slot="text" ></el-input>
                </ui-label-text>
              </el-col>
            </el-row>
          </div>
        </ui-line-tittle>
        <ui-line-tittle :collapsible="true">
          <div slot="content">
            <el-table ref="multipleTable" tooltip-effect="dark" style="width: 100%" :data="dialogTableData">
              <el-table-column prop="comCode" label="佰盈机构代码" show-overflow-tooltip width="150"></el-table-column>
              <el-table-column prop="comName" label="佰盈机构名称" width="250" show-overflow-tooltip></el-table-column>
              <el-table-column prop="orgCode" label="合作经代公司代码" width="180" show-overflow-tooltip></el-table-column>
              <el-table-column prop="orgName" label="合作经代公司名称" width="250" show-overflow-tooltip></el-table-column>
              <el-table-column prop="paystatus" label="首/续期" width="100" show-overflow-tooltip></el-table-column>
              <el-table-column prop="proposalno" label="投保单号" width="210" show-overflow-tooltip></el-table-column>
              <el-table-column prop="policyNo" label="保单号" width="210" show-overflow-tooltip></el-table-column>
              <el-table-column prop="insureName" label="投保人姓名" width="210" show-overflow-tooltip></el-table-column>
              <el-table-column prop="riskCode" label="险种代码" width="120" show-overflow-tooltip></el-table-column>
              <el-table-column prop="riskName" label="险种名称" show-overflow-tooltip width="240"></el-table-column>
              <el-table-column prop="paymentperiod" label="缴费年期" width="120"></el-table-column>
              <el-table-column prop="mainflag" label="主险/附加险" width="100" show-overflow-tooltip></el-table-column>
              <el-table-column prop="acceptdate" label="承保日期" width="120" show-overflow-tooltip></el-table-column>
              <el-table-column prop="effectiveDate" label="生效日期" width="120" show-overflow-tooltip></el-table-column>
              <el-table-column prop="receiptDate" label="回执日期" show-overflow-tooltip width="120"></el-table-column>
              <el-table-column prop="hfdate" label="回访日期" show-overflow-tooltip width="120"></el-table-column>
              <el-table-column prop="ssdate" label="实收日期" show-overflow-tooltip width="120"></el-table-column>
              <el-table-column prop="paidpremium" label="实收保费" width="140" show-overflow-tooltip></el-table-column>
              <el-table-column prop="bzPonudage" label="佰盈标保" show-overflow-tooltip width="120"></el-table-column>
              <el-table-column prop="fxPonudage" label="分销标保" show-overflow-tooltip width="120"></el-table-column>
              <el-table-column prop="hxlJjRate" label="继续率奖金率" show-overflow-tooltip width="120"></el-table-column>
              <el-table-column prop="nqhsxs" label="年期别换算系数" show-overflow-tooltip width="120"></el-table-column>
              <el-table-column prop="hxlJj" label="继续率奖金" show-overflow-tooltip width="120"></el-table-column>
              <el-table-column prop="xqAddPremiumC" label="续期加减费3" show-overflow-tooltip width="120"></el-table-column>
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
            <div class="btn dis-top">
              <el-button type="primary" :disabled="quanxian.exportDetail" @click="exportDetail">导出对账单明细</el-button>
              <el-button type="primary" :disabled="quanxian.import" @click="importDetail">上传</el-button>
              <el-button type="primary" :disabled="quanxian.review" style="width:200px" @click="verifyAward">审核(继续率奖金)</el-button>
            </div>
          </div>
        </ui-line-tittle>
    </el-dialog>
    <!-- 审核 的弹框-->
    <el-dialog :append-to-body="true" width="80%" center title="审核" :visible.sync="dialogTableVisibleCheck" :before-close="initShenheDialog">
      <el-row class="ri-line">
        <el-col :span="24">
          <el-radio v-if="userComCode !== '01'" v-model="shenheInput.checkCode" label='3' >审核通过</el-radio>
          <el-radio v-if="userComCode === '01'" v-model="shenheInput.checkCode" label='2' >复核通过</el-radio>
          <el-radio v-if="userComCode === '01'" v-model="shenheInput.checkCode" label='9' >复核不通过</el-radio>
        </el-col>
      </el-row>
      <el-row class="ri-line">
        <el-col :span="24">
          <ui-label-text labelWidth="90" label="审核意见:" >
            <el-input labelWidth="300" type="textarea" v-model="shenheInput.content" slot="text" ></el-input>
          </ui-label-text>
        </el-col>
      </el-row>
      <div class="center">
        <el-button type="primary" class="button_add" @click.native.prevent="examine()">提交审核</el-button>
        <el-button type="primary" class="button_add" @click.native.prevent="back()">返回</el-button>
      </div>
    </el-dialog>
    <el-dialog
      append-to-body
      center
      title="审核历史"
      :visible.sync="checkTrace"
      width="50%"
      :before-close='traceDialogClose'>
        <ui-line-tittle :collapsible="true">
          <span slot="title" >
            <i class="font_family icon-jy-menu-4" ></i>
            <span>审核历史</span>
          </span>
          <div slot="content">
            <el-table stripe style="width: 100%" :data="traceTableData">
              <el-table-column prop="verifyStatus" label="审核状态" width="150"></el-table-column>
              <el-table-column prop="content" label="审核意见" width="200"></el-table-column>
              <el-table-column prop="insertDate" label="操作时间" width="200"></el-table-column>
              <el-table-column prop="createUser" label="操作员" width="200"></el-table-column>
            </el-table>
            <div class="block">
              <el-pagination
                @current-change="handleCurrentChange2"
                @size-change="handleSizeChange2"
                :current-page="traceData.currentPage"
                :page-size ="traceData.pageSize"
                :page-sizes="[10,20,50]"
                :total="totalRecords2"
                layout="total, sizes, prev, pager, next, jumper"
                >
              </el-pagination>
            </div>
          </div>
        </ui-line-tittle>
    </el-dialog>
    <el-dialog :append-to-body='true' title="导入" center :visible.sync="showImportDialog" :before-close='importDialogClose'>
      <div class="dialogTip1">
        <span>请选择文件路径</span>
      </div>
      <div>
        <el-upload
          ref="upload"
          class="upload-rate"
          :action="uploadUrl()"
          :data='jxlImportData'
          :limit="1"
          name="fileName"
          :on-success="handleEXLSuccess"
          :auto-upload="false"
          :file-list="fileList">
          <el-button size="small" type="primary">选取文件</el-button>
          <div slot="tip" class="el-upload__tip"></div>
        </el-upload>
        <el-button type="success" @click="goUpload" >上传文件</el-button>
      </div>
    </el-dialog>
    <el-dialog title="提示" center :append-to-body='true' :visible.sync="isTip" width="30%" >
      <p style="text-align: center; ">如果数据量比较大，整个过程会很慢，请您耐心等待</p>
      <span slot="footer" class="dialog-footer">
        <el-button @click="isTip = false">取 消</el-button>
        <el-button type="primary" @click="submitUpload">确 定</el-button>
      </span>
    </el-dialog>
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
} from '@/api/lifeInsur_mgr/quitListMgr.js'
export default {
  data () {
    return {
      // from
      queryInfo: {
        comcode: '',
        comname: '',
        orgcode: '',
        orgname: '',
        effectiveDate: '',
        verifyStatus: '1',
        currentPage: 1,
        pageSize: 10
      },
      detailVisible: false,
      comDialog: false,
      comDialogCom: false,
      comDialogworker: false,
      comDialog1: false,
      comDialogCom1: false,
      comDialogworker1: false,
      comDialog2: false,
      comDialogCom2: false,
      comDialogworker2: false,
      showImportDialog: false,
      detailDataShow: {
        reconno: '',
        effectiveDate: '',
        comcode: '',
        comname: '',
        orgcode: '',
        orgname: '',
        jxljj: '',
        verifyStatus: '',
        beizhu: ''
      },
      jxlImportData: {
        comcode: '',
        orgcode: '',
        effectiveDate: '',
        reconno: ''
      },
      quanxian: {
        query: true,
        review: true,
        export: true,
        exportDetail: true,
        import: true
      },
      fileList: [],
      rules: {
        effectiveDate: [
          { required: true, message: '请输入保单生效年月', trigger: 'change' }
        ]
      },
      dialogTableVisibleCheck: false,
      shenheInput: {
        checkCode: '',
        content: ''
      },
      examineNo: '',
      tableData: [],
      totalRecords: 0,
      totalRecords1: 0,
      fenyetotalData: 0,
      tempTableData1: [],
      tempTableData2: [],
      tempTableData3: [],
      tableShowOrnot: false,
      checkTrace: false,
      tempTraceData: '',
      tempInfo: '',
      traceData: {
        currentPage: 1,
        pageSize: 5,
        reconno: '',
        effectiveDate: '',
        comcode: ''
      },
      detailQueryData: {
        effectiveDate: '',
        reconno: '',
        comcode: '',
        comname: '',
        orgcode: '',
        orgname: '',
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
      isTip: false,
      totalRecords2: 0,
      traceTableData: [],
      dialogTableData: []
    }
  },
  components: {
    [NoticeBar.name]: NoticeBar,
    [LineTittle.name]: LineTittle,
    [LabelText.name]: LabelText,
    ComDialog
  },
  computed: {
    userComCode () {
      return this.$store.state.login.showComName.split('(')[1].split(')')[0]
    }
  },
  mounted () {
    if (this.userComCode === '01') {
      this.queryInfo.verifyStatus = '3'
    } else {
      this.queryInfo.verifyStatus = '1'
    }
    api(`/auth/findButtonByUserCodeAndPage?userId=${this.$store.state.login.loginUserId}&page=合作经代继续率奖金审核`, 'get').then(result => {
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
    'queryInfo.comcode' () {
      if (this.queryInfo.comcode === '') {
        this.queryInfo.comname = ''
      }
    },
    'queryInfo.comname' () {
      if (this.queryInfo.comname === '') {
        this.queryInfo.comcode = ''
      }
    },
    'queryInfo.orgcode' () {
      if (this.queryInfo.orgcode === '') {
        this.queryInfo.orgname = ''
      }
    },
    'queryInfo.orgname' () {
      if (this.queryInfo.orgname === '') {
        this.queryInfo.orgcode = ''
      }
    }
  },
  methods: {
    verifyAward () {
      if (this.detailDataShow.verifyStatus === '2') {
        this.openToast('warning', '目前状态无法审核！')
        return
      }
      if (this.userComCode === '01' && this.detailDataShow.verifyStatus === '1') {
        this.openToast('warning', '该审核节点为分公司待审核！')
        return
      }
      if (this.userComCode !== '01' && this.detailDataShow.verifyStatus === '3') {
        this.openToast('warning', '该审核节点为总公司待复核！')
        return
      }
      this.dialogTableVisibleCheck = true
    },
    examine () {
      if (IsEmpty(this.shenheInput.checkCode)) {
        this.openToast('warning', '请填写审核结果')
      } else {
        this.Loading()
        let temp = {}
        temp['reconno'] = this.detailDataShow.reconno
        temp['effectiveDate'] = this.detailDataShow.effectiveDate
        temp['verifyStatus2'] = this.shenheInput.checkCode
        temp['verifyContent2'] = this.shenheInput.content
        temp['comCode'] = this.detailDataShow.comcode
        temp['comName'] = this.detailDataShow.comname
        api('/cooperationCharge/checkRatebonus', 'post', temp).then((res) => {
          console.log(res)
          this.closeLoading()
          this.shenheInput.checkCode = ''
          this.shenheInput.content = ''
          this.dialogTableVisibleCheck = false
          if (res.data.code !== '000000' && !IsEmpty(res.data.code)) {
            this.openToast('warning', res.data.msg)
          } else {
            if (res.data.code === '000000') {
              this.openToast('success', res.data.msg)
              this.getDetailExamine(this.tempInfo)
            } else {
              this.openToast('warning', res.data.msg)
            }
          }
        })
      }
    },
    back () {
      this.shenheInput.checkCode = ''
      this.shenheInput.content = ''
      this.dialogTableVisibleCheck = false
    },
    initShenheDialog () {
      this.shenheInput.checkCode = ''
      this.shenheInput.content = ''
      this.dialogTableVisibleCheck = false
    },
    handleCurrentChange2 (val) {
      this.traceData.currentPage = val
      this.openExamHis(this.tempTraceData)
    },
    handleSizeChange2 (val) {
      this.traceData.currentPage = 1
      this.traceData.pageSize = val
      this.openExamHis(this.tempTraceData)
    },
    changeComdialogPage3 (data) {
      this.orgQueryInfo.currentPage = data
      this.openComDialog(2)
    },
    changeComdialogPageSize3 (data) {
      this.orgQueryInfo.currentPage = 1
      this.orgQueryInfo.pageSize = data
      this.openComDialog(2)
    },
    importDetail () {
      if (this.detailDataShow.verifyStatus === '9' || this.detailDataShow.verifyStatus === '1') {
        this.showImportDialog = true
      } else {
        this.openToast('warning', '此状态不可进行上传操作')
      }
    },
    openExamHis (info) {
      this.Loading()
      this.tempTraceData = info
      this.traceData['reconno'] = info.reconno
      this.traceData['effectiveDate'] = info.effectiveDate
      this.traceData['comcode'] = info.comcode
      api('/cooperationCharge/queryCheckRatebonus', 'post', this.traceData).then(res => {
        console.log(res.data.data.content)
        this.traceTableData = res.data.data.content
        this.totalRecords2 = res.data.data.totalElements
        this.closeLoading()
      }).catch((e) => {
        console.log(e)
      })
      this.checkTrace = true
    },
    changeBeizhu () {
      let temp = {
        comcode: this.detailDataShow.comcode,
        effectiveDate: this.detailDataShow.effectiveDate,
        beizhu: this.detailDataShow.beizhu
      }
      api('/cooperationCharge/saveBeizhuJJLJJ', 'post', temp)
    },
    getDetailExamine (info) {
      this.Loading()
      this.tempInfo = info
      this.detailQueryData.reconno = info.reconno
      this.detailQueryData.effectiveDate = info.effectiveDate
      this.detailQueryData.comcode = info.comcode
      this.detailQueryData.comname = info.comname
      this.detailQueryData.orgcode = info.orgcode
      this.detailQueryData.orgname = info.orgname
      api('/cooperationCharge/queryRatebonusDetail', 'post', this.detailQueryData).then((res) => {
        console.log(res)
        if (res.data.code !== '000000' && !IsEmpty(res.data.code)) {
          this.openToast('warning', res.data.msg)
        } else {
          switch (info.verifyStatus) {
            case '待审核':
              this.detailQueryData.verifyStatus = '1'
              break
            case '待复核':
              this.detailQueryData.verifyStatus = '3'
              break
            case '复核不通过':
              this.detailQueryData.verifyStatus = '9'
              break
            case '复核通过':
              this.detailQueryData.verifyStatus = '2'
              break
            default:
              break
          }
          api('/cooperationCharge/queryRatebonusDetailNotJJLJJ', 'post', this.detailQueryData).then((res1) => {
            console.log(res1)
            this.examineNo = info.reconno
            this.closeLoading()
            if (res1.data.code !== '000000' && !IsEmpty(res1.data.code)) {
              // this.openToast('warning', res1.data.msg)
            } else {
              this.dialogTableData = res.data.data.content
              this.totalRecords1 = res.data.data.totalElements
              this.detailDataShow.reconno = res1.data.data.reconno
              this.detailDataShow.effectiveDate = res1.data.data.effectiveDate
              this.detailDataShow.jxljj = res1.data.data.jxljj
              console.log(res1.data.data.jxljj)
              this.detailDataShow.verifyStatus = res1.data.data.verifyStatus
              this.detailDataShow.beizhu = res1.data.data.beizhu
              this.detailDataShow.comcode = res1.data.data.comcode
              this.detailDataShow.comname = res1.data.data.comname
              this.detailDataShow.orgcode = res1.data.data.orgcode
              this.detailDataShow.orgname = res1.data.data.orgname
              this.detailVisible = true
            }
          })
        }
      })
    },
    traceDialogClose () {
      this.initDialogData()
      this.checkTrace = false
    },
    submitForm (formName, index) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          console.log('submit!')
          switch (index) {
            case 0:
              this.totalRecords = 0
              this.queryInfo.currentPage = 1
              this.queryData()
              break
            case 1:
              this.exportData()
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
    exportData () {
      window.open(`/tabycore/cooperationCharge/downloadRatebonus?comcode=${this.queryInfo.comcode}&comname=${this.queryInfo.comname}&orgcode=${this.queryInfo.orgcode}&orgname=${this.queryInfo.orgname}&effectiveDate=${this.queryInfo.effectiveDate}&verifyStatus=${this.queryInfo.verifyStatus}`)
    },
    uploadUrl () {
      return '/tabycore/cooperationCharge/inportCoolifeChargePoundageReconVODetailJJLJJ'
    },
    handleEXLSuccess (response) {
      this.closeLoading()
      this.fileList = []
      if (response.code === '000000') {
        this.$message({
          showClose: true,
          message: response.msg,
          type: 'success'
        })
        this.showImportDialog = false
      } else {
        this.$message({
          showClose: true,
          message: response.msg,
          type: 'error'
        })
      }
      this.fileList = []
    },
    submitUpload () {
      this.$refs.upload.submit()
      this.isTip = false
      this.Loading()
    },
    goUpload () {
      this.jxlImportData.comcode = this.detailQueryData.comcode
      this.jxlImportData.orgcode = this.detailQueryData.orgcode
      this.jxlImportData.effectiveDate = this.detailQueryData.effectiveDate
      this.jxlImportData.reconno = this.detailQueryData.reconno
      this.isTip = true
    },
    importDialogClose () {
      this.showImportDialog = false
      this.jxlImportData = {
        comcode: '',
        orgcode: '',
        effectiveDate: '',
        reconno: ''
      }
      this.fileList = []
    },
    queryData () {
      this.Loading()
      this.tableData = []
      api('/cooperationCharge/queryRatebonus', 'post', this.queryInfo).then((res) => {
        console.log(res)
        this.closeLoading()
        if (res.data.code !== '000000' && !IsEmpty(res.data.code)) {
          this.openToast('warning', res.data.msg)
        } else {
          this.tableData = res.data.data.content
          this.tableShowOrnot = true
          this.totalRecords = res.data.data.totalElements
        }
      })
    },
    exportDetail () {
      window.open(`/tabycore/cooperationCharge/downloadCoolifeChargePoundageReconVODetailJJL?reconno=${this.examineNo}&comcode=${this.detailQueryData.comcode}&orgcode=${this.detailQueryData.orgcode}&effectiveDate=${this.detailQueryData.effectiveDate}`)
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
      this.Loading()
      this.detailQueryData.currentPage = val
      api('/cooperationCharge/queryRatebonusDetail', 'post', this.detailQueryData).then((res) => {
        console.log(res)
        this.closeLoading()
        if (res.data.code !== '000000' && !IsEmpty(res.data.code)) {
          this.openToast('warning', res.data.msg)
        } else {
          this.dialogTableData = res.data.data.content
          this.totalRecords1 = res.data.data.totalElements
        }
      })
    },
    handleSizeChange1 (val) {
      this.Loading()
      this.detailQueryData.currentPage = 1
      this.detailQueryData.pageSize = val
      api('/cooperationCharge/queryRatebonusDetail', 'post', this.detailQueryData).then((res) => {
        console.log(res)
        this.closeLoading()
        if (res.data.code !== '000000' && !IsEmpty(res.data.code)) {
          this.openToast('warning', res.data.msg)
        } else {
          this.dialogTableData = res.data.data.content
          this.totalRecords1 = res.data.data.totalElements
        }
      })
    },
    changeComdialogPage1 (data) {
      this.coopComQueryData.current = data
      this.openComDialog(0)
    },
    changeComdialogPage2 (data) {
      this.coopOrgQueryData.current = data
      this.openComDialog(1)
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
    initDialogData () {
      this.dialogTableData = []
      this.coopComQueryData = {
        current: 1,
        companyCodeOrName: '',
        pageSize: 10,
        clickType: '2'
      }
      this.detailQueryData = {
        effectiveDate: '',
        reconno: '',
        comcode: '',
        comname: '',
        orgcode: '',
        orgname: '',
        currentPage: 1,
        pageSize: 10
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
    detailDialogClose () {
      this.detailVisible = false
      this.dialogTableData = []
      this.examineNo = ''
      this.queryData()
      this.initDialogData()
    },
    comDialogClosing (index) {
      this.comDialog = false
      this.comDialog1 = false
      this.comDialog2 = false
      this.initDialogData()
      switch (index) {
        case 0:
          this.queryInfo.orgcode = ''
          this.queryInfo.orgname = ''
          break
        case 2:
          this.queryInfo.comcode = ''
          this.queryInfo.comname = ''
          break
        default:
          break
      }
    },
    opensingleComDialog (index) {
      if (!(this.comDialog || this.comDialog1 || this.comDialog2)) {
        switch (index) {
          case 0:
            this.orgQueryInfo.clickType = '1'
            if (!IsEmpty(this.queryInfo.comcode)) {
              this.orgQueryInfo.comCodeOrName = this.queryInfo.comcode
            } else if (!IsEmpty(this.queryInfo.comname)) {
              this.orgQueryInfo.comCodeOrName = this.queryInfo.comname
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
                    this.queryInfo.comcode = res.data.data.data[0].comcode
                    this.queryInfo.comname = res.data.data.data[0].comCName
                  }
                }
              }
            )
            break
          case 1:
            this.coopComQueryData.clickType = '1'
            if (!IsEmpty(this.queryInfo.orgcode)) {
              this.coopComQueryData.companyCodeOrName = this.queryInfo.orgcode
            } else if (!IsEmpty(this.queryInfo.orgname)) {
              this.coopComQueryData.companyCodeOrName = this.queryInfo.orgname
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
                    this.queryInfo.orgcode = res.data.data.data[0].companyCode
                    this.queryInfo.orgname = res.data.data.data[0].companyName
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
    dialogBackData (data) {
      this.initDialogData()
      this.comDialog = false
      let temp = []
      temp = data.split('-')
      this.queryInfo.orgcode = temp[0]
      this.queryInfo.orgname = temp[1]
    },
    dialogBackData2 (data) {
      this.initDialogData()
      this.comDialog2 = false
      let temp = []
      temp = data.split('-')
      this.queryInfo.comcode = temp[0]
      this.queryInfo.comname = temp[1]
    },
    // toast提示
    openToast (type, mesg) {
      this.$message({
        showClose: true,
        message: mesg,
        type: type
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
    ...mapActions([
      'cooperInsureBillFinancedblqueryCom1', 'contiListCheckDialogDataGet1'
    ]),
    openComDialog (index) {
      switch (index) {
        case 0:
          this.coopComQueryData.clickType = '2'
          if (!IsEmpty(this.queryInfo.orgcode)) {
            this.coopComQueryData.companyCodeOrName = this.queryInfo.orgcode
          } else if (!IsEmpty(this.queryInfo.orgname)) {
            this.coopComQueryData.companyCodeOrName = this.queryInfo.orgname
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
        case 2:
          if (!IsEmpty(this.queryInfo.comcode)) {
            this.orgQueryInfo.comCodeOrName = this.queryInfo.comcode
          } else if (!IsEmpty(this.queryInfo.comname)) {
            this.orgQueryInfo.comCodeOrName = this.queryInfo.comname
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
    }
  }
}
</script>

<style lang="scss" scoped type="text/css">
.wrap{
  padding-left: 30px;
  padding-right: 30px;
}
.verify-content{
  padding: 20px 0;
}
.btn{
  text-align: center;
}
.btn .el-button{
  margin-right: 10px;
}
.table{
  margin: 20px 0;
}
.btn-export{
  margin: 10px auto;
}
.upload-content{
  width: 100%;
  text-align: center;
}
.red-color{
  color: red;
}
.download{
  color:blue;
  cursor:pointer;
}
.dis-top{
  margin-top: 10px;
}
.dis-bottom{
  margin-bottom: 10px;
}
.tableButton {
  cursor: pointer;
  color: #66B1FF;
}
.ri-line{margin-top: 10px;margin-bottom: 10px;}
.center{text-align: center}
.label-text textarea{
  width: 40rem !important
}
</style>
