<template>
  <div class="wrap">
    <ui-notice-bar slot="breadcast" >
      <el-breadcrumb slot="location" separator=">">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>对账单管理</el-breadcrumb-item>
        <el-breadcrumb-item>合作经代对账单管理</el-breadcrumb-item>
        <el-breadcrumb-item>合作经代手续费审核(除继续率奖金外)</el-breadcrumb-item>
      </el-breadcrumb>
    </ui-notice-bar>
    <el-form class="verify-content" :model="queryInfo" ref="queryInfo" :rules="rules">
      <el-row class="ri-line">
        <el-col :span=12>
          <el-form-item prop='comCode'>
            <ui-label-text labelWidth="180" label="佰盈机构代码：">
              <el-input v-model="queryInfo.comCode" slot="text" @dblclick.native="openComDialog(2)"  @blur='opensingleComDialog(0)' clearable placeholder="双击可选择"></el-input>
            </ui-label-text>
          </el-form-item>
        </el-col>
        <el-col :span=12>
          <el-form-item prop='comName'>
            <ui-label-text labelWidth="180" label="佰盈机构名称：">
              <el-input v-model="queryInfo.comName" slot="text" @dblclick.native="openComDialog(2)"  @blur='opensingleComDialog(0)' clearable placeholder="双击可选择" ></el-input>
            </ui-label-text>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row class="ri-line">
        <el-col :span="12">
          <el-form-item prop='cooperationCode'>
            <ui-label-text labelWidth="180" label="合作经代公司代码：">
              <el-input v-model="queryInfo.cooperationCode" ref="jingdaiCompanyCodeText" slot="text" clearable @dblclick.native="openComDialog(0)" placeholder="双击可选择" @blur='opensingleComDialog(1)'></el-input>
            </ui-label-text>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item prop='cooperationName'>
            <ui-label-text labelWidth="180" label="合作经代公司名称：">
              <el-input v-model="queryInfo.cooperationName" ref="jingdaiCompanyNameText" slot="text" clearable @dblclick.native="openComDialog(0)" placeholder="双击可选择" @blur='opensingleComDialog(1)'></el-input>
            </ui-label-text>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row class="ri-line">
        <el-col :span=12>
          <el-form-item prop='yearMouth'>
            <ui-label-text labelWidth="180" :required="true" label="结算年月：" >
              <el-input v-model="queryInfo.yearMouth" slot="text" placeholder="范例：YYYYMM(201706)"></el-input>
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
      <el-button type="primary" :disabled="quanxian.createStatement" @click="makeBillList">生成对账单</el-button>
      <el-button type="primary" :disabled="quanxian.export" @click="submitForm('queryInfo',2)">导出</el-button>
    </div>
    <ComDialog :vis='comDialog' :workerVis='comDialogworker' :comVis='comDialogCom' :newTableData='tempTableData1' @onClose='comDialogClosing(0)' @selectDialog='dialogBackData' @comdialogChangePageFunction='changeComdialogPage1' @comdialogChangePageSizeFunction='changeComdialogPageSize1' :fenyetotal='fenyetotalData'/>
    <!-- <ComDialog :vis='comDialog1' :workerVis='comDialogworker1' :comVis='comDialogCom1' :newTableData='tempTableData2' @onClose='comDialogClosing(1)' @selectDialog='dialogBackData1' @comdialogChangePageFunction='changeComdialogPage2' @comdialogChangePageSizeFunction='changeComdialogPageSize2' :fenyetotal='fenyetotalData'/> -->
    <ComDialog :vis='comDialog2' :workerVis='comDialogworker2' :comVis='comDialogCom2' :newTableData='tempTableData3' @onClose='comDialogClosing(2)' @selectDialog='dialogBackData2' @comdialogChangePageFunction='changeComdialogPage3' @comdialogChangePageSizeFunction='changeComdialogPageSize3' :fenyetotal='fenyetotalData'/>
    <div class="table" v-if="tableShowOrnot">
      <el-table :data="tableData" style="width: 100%">
        <el-table-column prop="normalSettlementDate" label="结算年月"  width="140"></el-table-column>
          <el-table-column prop="reconno" label="对账单号"  width="300" >
            <template slot-scope="scope" >
              <span @click="getDetailExamine(scope.row.reconno, scope.row.beizhu)" class="tableButton">{{ scope.row.reconno }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="comCode" label="佰盈机构代码"  width="140"></el-table-column>
          <el-table-column prop="comName" label="佰盈机构名称"  width="300" show-overflow-tooltip></el-table-column>
          <el-table-column prop="companyCode" label="合作经代公司代码" width="140" show-overflow-tooltip></el-table-column>
          <el-table-column prop="companyName" label="合作经代公司名称" width="300" show-overflow-tooltip></el-table-column>
          <el-table-column label="奖金类型" width="120">
            <template>
              <span>手续费</span>
            </template>
          </el-table-column>
          <el-table-column label="手续费金额" >
            <el-table-column prop="initialFee" label="首期手续费" width="120"></el-table-column>
            <el-table-column prop="renewalFee" label="续期手续费(不含继续率奖金)" width="120"></el-table-column>
            <el-table-column prop="calHandMount" label="合计手续费" width="120"></el-table-column>
          </el-table-column>
          <el-table-column prop="reconinsertDateStr" label="对账单生成日期" width="120"></el-table-column>
          <el-table-column prop="verifyStatus" label="审核状态(除继续率奖金外)" width="120">
            <template slot-scope="scope" >
              <span v-if="scope.row.verifyStatus === '1'">待审核</span>
              <span v-else-if="scope.row.verifyStatus === '2'">复核通过</span>
              <span v-else-if="scope.row.verifyStatus === '3'">待复核</span>
              <span v-else-if="scope.row.verifyStatus === '9'">复核不通过</span>
            </template>
          </el-table-column>
          <el-table-column label="审核历史" width="120">
            <template slot-scope="scope" >
              <span @click="openExamHis(scope.row.reconno)" class="tableButton">查看</span>
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
            <!-- <div class="block">
              <el-pagination
                @current-change="handleCurrentChange2"
                @size-change="handleSizeChange2"
                :page-sizes="[10,20,50]"
                :total="totalRecords2"
                layout="total, sizes, prev, pager, next, jumper"
                >
              </el-pagination>
            </div> -->
          </div>
        </ui-line-tittle>
    </el-dialog>
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
                <ui-label-text label="续期手续费(不含继续率奖金)：" labelWidth="160" :text="detailDialogData.renewalFee">
                </ui-label-text>
              </el-col>
            </el-row>
            <el-row class="ri-line">
              <el-col :span="24">
                <ui-label-text labelWidth="160" label="备注:" >
                  <el-input type="textarea" :rows="5" v-model="beizhu" @blur="changeBeizhu" slot="text" ></el-input>
                </ui-label-text>
              </el-col>
            </el-row>
          </div>
        </ui-line-tittle>
        <ui-line-tittle :collapsible="true">
          <span slot="title" >
            <i class="font_family icon-jy-menu-4" ></i>
            <span>对账单明细</span>
          </span>
          <div slot="content">
            <el-table ref="multipleTable" tooltip-effect="dark" style="width: 100%" :data="dialogTableData">
              <el-table-column prop="comCode" label="佰盈机构代码" show-overflow-tooltip width="150"></el-table-column>
              <el-table-column prop="comName" label="佰盈机构名称" width="250" show-overflow-tooltip></el-table-column>
              <el-table-column prop="companyCode" label="合作经代公司代码" width="180" show-overflow-tooltip></el-table-column>
              <el-table-column prop="companyName" label="合作经代公司名称" width="250" show-overflow-tooltip></el-table-column>
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
              <el-table-column prop="basicServiceFeeRate" label="首年基础服务费率" width="140" show-overflow-tooltip>
              </el-table-column>
              <el-table-column prop="basicServiceFee" label="首年基础服务费" width="140" show-overflow-tooltip>
              </el-table-column>
              <el-table-column prop="xqJcFwfRate" label="续期基础服务费率" width="140" show-overflow-tooltip>
              </el-table-column>
              <el-table-column prop="xqJcFwf" label="续期基础服务费" width="140" show-overflow-tooltip>
              </el-table-column>
              <el-table-column prop="xqFwJtRate" label="续期服务津贴费率"  width="140" show-overflow-tooltip>
              </el-table-column>
              <el-table-column prop="xqFwJt" label="续期服务津贴"  width="140" show-overflow-tooltip>
              </el-table-column>
              <el-table-column prop="snAddPremiumA" label="首年加减费1" width="140" show-overflow-tooltip>
              </el-table-column>
              <el-table-column prop="snAddPremiumB" label="首年加减费2" width="140" show-overflow-tooltip>
              </el-table-column>
              <el-table-column prop="snAddPremiumC" label="首年加减费3" width="140" show-overflow-tooltip>
              </el-table-column>
              <el-table-column prop="xqAddPremiumA" label="续期加减费1" width="140" show-overflow-tooltip>
              </el-table-column>
              <el-table-column prop="xqAddPremiumB" label="续期加减费2" width="140" show-overflow-tooltip>
              </el-table-column>
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
              <!-- <el-button type="primary" @click="goSave">保存</el-button> -->
              <el-button type="primary" :disabled="quanxian.exportDetail" @click="exportDetail">导出对账单明细</el-button>
              <el-button type="primary" :disabled="quanxian.import" @click="importDetail">上传</el-button>
              <el-button type="primary" :disabled="quanxian.review" style="width:240px;" @click="operateExamine">审核(除继续率奖金外)</el-button>
              <!-- <el-button type="primary" @click="detailVisible = false">关闭</el-button> -->
            </div>
          </div>
        </ui-line-tittle>
      <!-- </div> -->
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
            :limit="1"
            name="fileName"
            :data="dialogImportData"
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
  components: {
    [NoticeBar.name]: NoticeBar,
    [LineTittle.name]: LineTittle,
    [LabelText.name]: LabelText,
    ComDialog
  },
  computed: {
    userComCode () {
      return this.$store.state.login.showComName.split('(')[1].split(')')[0]
    },
    detailDialogData () {
      let temp = JSON.parse(JSON.stringify(this.detailDialogData1))
      if (!IsEmpty(temp)) {
        switch (temp.verifyStatus) {
          case '1':
            temp.verifyStatus = '待审核'
            break
          case '2':
            temp.verifyStatus = '复核通过'
            break
          case '3':
            temp.verifyStatus = '待复核'
            break
          case '9':
            temp.verifyStatus = '复核不通过'
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
  },
  data () {
    return {
      // from
      isTip: false,
      totalRecords2: 0,
      traceTableData: [],
      traceReconno: '',
      queryInfo: {
        reconno: '',
        comCode: '',
        comName: '',
        cooperationCode: '',
        cooperationName: '',
        yearMouth: '',
        verifyStatus: '1',
        currentPage: 1,
        pageSize: 10
      },
      quanxian: {
        createStatement: true,
        query: true,
        review: true,
        export: true,
        exportDetail: true,
        import: true
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
      shenheNeedData: {
        reconno: '',
        verifyStatus: '',
        verifyContent: ''
      },
      dialogImportData: {
        reconno: ''
      },
      dialogVisible: false,
      fileList: [],
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
      examineNo: '',
      beizhu: '',
      checkTrace: false,
      dialogTableVisibleCheck: false,
      shenheInput: {
        checkCode: '',
        content: ''
      },
      rules: {
        // comCode: [
        //   { required: true, message: '请输入佰盈机构代码', trigger: 'change' }
        // ],
        // comName: [
        //   { required: true, message: '请输入佰盈机构名称', trigger: 'change' }
        // ]
        yearMouth: [
          { required: true, message: '请输入结算年月', trigger: 'change' }
        ]
      },
      tableData: [],
      dialogTableData: [],
      dialogTableDataVS: [],
      totalRecords: 0,
      totalRecords1: 0,
      fenyetotalData: 0,
      tempTableData1: [],
      tempTableData2: [],
      tempTableData3: [],
      detailDialogData1: {},
      tableShowOrnot: false,
      showImportDialog: false,
      traceData: {
        currentPage: 1,
        pageSize: 5,
        reconno: ''
      }
    }
  },
  mounted () {
    if (this.userComCode === '01') {
      this.queryInfo.verifyStatus = '3'
    } else {
      this.queryInfo.verifyStatus = '1'
    }
    api(`/auth/findButtonByUserCodeAndPage?userId=${this.$store.state.login.loginUserId}&page=合作经代手续费审核(除继续率奖金外)`, 'get').then(result => {
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
              if (IsEmpty(this.queryInfo.yearMouth)) {
                this.openToast('warning', '请输入结算年月')
              } else if (IsEmpty(this.queryInfo.cooperationCode)) {
                this.openToast('warning', '请输入合作经代公司')
              } else {
                this.makeBillList()
              }
              break
            case 2:
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
    importDetail () {
      // <span v-if="scope.row.verifyStatus === '1'">待审核</span>
      //         <span v-else-if="scope.row.verifyStatus === '2'">复核通过</span>
      //         <span v-else-if="scope.row.verifyStatus === '3'">待复核</span>
      //         <span v-else-if="scope.row.verifyStatus === '9'">复核不通过</span>
      if (this.detailDialogData1.verifyStatus === '9' || this.detailDialogData1.verifyStatus === '1') {
        this.showImportDialog = true
      } else {
        this.openToast('warning', '此状态不可进行上传操作')
      }
    },
    queryData () {
      this.Loading()
      this.tableData = []
      api('/cooperationCharge/queryCooperationCharge', 'post', this.queryInfo).then((res) => {
        console.log(res)
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
    exportDetail () {
      window.open(`/tabycore/cooperationCharge/downloadCoolifeChargePoundageReconVODetailNotJJL?reconno=${this.detailDialogData.reconno}`)
    },
    importDialogClose () {
      this.dialogImportData.reconno = ''
      this.showImportDialog = false
      this.fileList = []
    },
    handleCurrentChange2 (val) {
      this.traceData.currentPage = val
      this.openExamHis(this.traceReconno)
    },
    handleSizeChange2 (val) {
      this.traceData.currentPage = 1
      this.traceData.pageSize = val
      this.openExamHis(this.traceReconno)
    },
    examine () {
      if (IsEmpty(this.shenheInput.checkCode)) {
        this.openToast('warning', '请填写审核结果')
      } else {
        this.Loading()
        this.shenheNeedData.verifyStatus = this.shenheInput.checkCode
        this.shenheNeedData.verifyContent = this.shenheInput.content
        api('/cooperationCharge/checkNotRatebonus', 'post', this.shenheNeedData).then((res) => {
          console.log(res)
          this.closeLoading()
          this.dialogTableVisibleCheck = false
          this.shenheInput.checkCode = ''
          this.shenheInput.content = ''
          if (res.data.code !== '000000' && !IsEmpty(res.data.code)) {
            this.openToast('warning', res.data.msg)
          } else {
            if (res.data === '审核成功！') {
              this.openToast('success', res.data)
              this.getDetailExamine(this.examineNo, this.beizhu)
            } else {
              this.openToast('warning', res.data)
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
    // goSave () {
    //   // 进行校验和数据处理
    //   if (this.detailDialogData1.verifyStatus === '1' || this.detailDialogData1.verifyStatus === '2') {
    //     let saveData = {}
    //     saveData['reconno'] = this.examineNo
    //     let tempArray = []
    //     for (let i = 0; i < this.dialogTableData.length; i++) {
    //       let temp = {}
    //       temp['comCode'] = this.dialogTableData[i].comCode
    //       temp['comName'] = this.dialogTableData[i].comName
    //       temp['companyCode'] = this.dialogTableData[i].companyCode
    //       temp['companyName'] = this.dialogTableData[i].companyName
    //       temp['policyNo'] = this.dialogTableData[i].policyNo
    //       temp['riskCode'] = this.dialogTableData[i].riskCode
    //       temp['riskName'] = this.dialogTableData[i].riskName
    //       temp['paidpremium'] = this.dialogTableData[i].paidpremium
    //       temp['basicServiceFee'] = this.dialogTableData[i].basicServiceFee
    //       temp['supplementCharge'] = this.dialogTableData[i].supplementCharge
    //       temp['platformReward'] = this.dialogTableData[i].platformReward
    //       temp['deductionVATFee'] = this.dialogTableData[i].deductionVATFee
    //       temp['continueBasicServiceFee'] = this.dialogTableData[i].continueBasicServiceFee
    //       temp['xqJcFwf'] = this.dialogTableData[i].xqJcFwf
    //       temp['xqFwJt'] = this.dialogTableData[i].xqFwJt
    //       temp['hxlJj'] = this.dialogTableData[i].hxlJj
    //       tempArray.push(temp)
    //     }
    //     saveData['coolifeChargeDetailVO'] = tempArray
    //     this.operateSave(saveData)
    //   } else {
    //     this.openToast('warning', '该条记录不能进行保存操作')
    //   }
    // },
    // goExamine () {
    //   // 进行校验和数据处理examineNo
    //   if (this.detailDialogData1.verifyStatus === '2') {
    //     let temp = false
    //     for (let i = 0; i < this.dialogTableData.length; i++) {
    //       if (!this.contrastFunction(this.dialogTableData[i], this.dialogTableDataVS[i])) {
    //         temp = true
    //         break
    //       }
    //     }
    //     // 先进行两个数据比较如果不一样提示先保存再提交
    //     if (temp) {
    //       this.openToast('warning', '检测到您改变了数据，请先保存再提交审核')
    //     } else {
    //       this.operateExamine(this.examineNo)
    //     }
    //   } else if (this.detailDialogData1.verifyStatus === '1') {
    //     this.openToast('warning', '请先保存再提交审核')
    //   } else {
    //     this.openToast('warning', '该对账单已审核通过，不能重复审核！')
    //   }
    // },
    uploadUrl () {
      return '/tabycore/cooperationCharge/inportCoolifeChargePoundageReconVODetailNotJJLJJ'
    },
    handleEXLSuccess (response) {
      this.closeLoading()
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
    changeBeizhu () {
      let temp = {
        reconno: this.examineNo,
        beizhu: this.beizhu
      }
      api('/cooperationCharge/saveBeizhuNotJJLJJ', 'post', temp)
    },
    submitUpload () {
      this.$refs.upload.submit()
      this.isTip = false
      this.Loading()
    },
    goUpload () {
      this.dialogImportData.reconno = this.detailQueryData.reconno
      this.isTip = true
    },
    getDetailExamine (info, beizhu) {
      this.Loading()
      this.detailQueryData.reconno = info
      api('/cooperationCharge/queryCoolifeChargePoundageReconVODetail', 'post', this.detailQueryData).then((res) => {
        this.examineNo = info
        this.beizhu = beizhu
        this.closeLoading()
        if (res.data.code !== '000000' && !IsEmpty(res.data.code)) {
          this.openToast('warning', res.data.msg)
        } else {
          // 这里接详情数据
          this.shenheNeedData.reconno = info
          this.detailDialogData1 = res.data
          this.dialogTableData = res.data.coolifeChargeDetailVO.content
          this.dialogTableDataVS = res.data.coolifeChargeDetailVO.content
          this.totalRecords1 = res.data.coolifeChargeDetailVO.totalElements
          this.detailVisible = true
        }
      })
    },
    traceDialogClose () {
      this.initDialogData()
      this.checkTrace = false
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
      this.getDetailExamine(this.examineNo, this.beizhu)
    },
    handleSizeChange1 (val) {
      this.detailQueryData.currentPage = 1
      this.detailQueryData.pageSize = val
      this.getDetailExamine(this.examineNo, this.beizhu)
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
    contrastFunction (obj1, obj2) {
      if (Object.keys(obj1).length !== Object.keys(obj2).length) {
        return false
      } else {
        for (let x in obj1) {
          if (obj2.hasOwnProperty(x)) {
            if (obj1[x] !== obj2[x]) {
              return false
            }
          } else {
            return false
          }
        }
      }
      return true
    },
    initDialogData () {
      this.detailDialogData1 = {}
      this.dialogTableData = []
      this.traceData = {
        reconno: '',
        currentPage: 1,
        pageSize: 5
      }
      this.detailQueryData = {
        reconno: '',
        pageSize: 10,
        currentPage: 1
      }
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
      this.shenheNeedData = {
        reconno: '',
        verifyStatus: '',
        verifyContent: ''
      }
    },
    detailDialogClose () {
      this.detailVisible = false
      this.detailDialogData1 = {}
      this.dialogTableData = []
      this.examineNo = ''
      this.beizhu = ''
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
          this.queryInfo.cooperationCode = ''
          this.queryInfo.cooperationName = ''
          break
        case 2:
          this.queryInfo.comCode = ''
          this.queryInfo.comName = ''
          break
        default:
          break
      }
    },
    makeBillList () {
      let cooperationChargeVO = {
        cooperationCode: '',
        cooperationName: '',
        comCode: '',
        comName: '',
        yearMouth: '',
        verifyStatus: ''
      }
      cooperationChargeVO.cooperationCode = this.queryInfo.cooperationCode
      cooperationChargeVO.cooperationName = this.queryInfo.cooperationName
      cooperationChargeVO.comCode = this.queryInfo.comCode
      cooperationChargeVO.comName = this.queryInfo.comName
      cooperationChargeVO.yearMouth = this.queryInfo.yearMouth
      cooperationChargeVO.verifyStatus = this.queryInfo.verifyStatus
      this.Loading()
      api('/cooperationCharge/poundageReconCommitCheck', 'post', cooperationChargeVO).then((res) => {
        this.renderTableData = []
        if (res.data === 1) {
          api('/cooperationCharge/addCooperationCharge', 'post', cooperationChargeVO).then(res => {
            this.closeLoading()
            if (res.data === '操作成功!') {
              this.openToast('success', res.data)
              this.initAll()
            } else {
              if (typeof (res.data) === 'string') {
                this.openToast('warning', res.data)
              } else {
                this.openToast('warning', res.data.msg)
              }
            }
          }).catch((e) => {
            console.log(e)
          })
        } else {
          // 已存在待审核或审核通过的对账单
          this.closeLoading()
          this.openToast('warning', res.data)
        }
      })
    },
    exportData () {
      window.open(`/tabycore/cooperationCharge/downloadCoolifeChargePoundageReconVO?cooperationCode=${this.queryInfo.cooperationCode}&cooperationName=${this.queryInfo.cooperationName}&comCode=${this.queryInfo.comCode}&comName=${this.queryInfo.comName}&yearMouth=${this.queryInfo.yearMouth}&verifyStatus=${this.queryInfo.verifyStatus}`)
    },
    openExamHis (reconno) {
      this.Loading()
      this.traceReconno = reconno
      this.traceData['reconno'] = reconno
      api('/cooperationCharge/queryCheckNotRatebonus', 'post', this.traceData).then(res => {
        console.log(res.data.data.content)
        this.traceTableData = res.data.data.content
        this.totalRecords2 = res.data.data.totalElements
        this.closeLoading()
      }).catch((e) => {
        console.log(e)
      })
      this.checkTrace = true
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
    operateSave (info) {
      this.Loading()
      api('/cooperationCharge/saveCoolifeChargePoundageDatil', 'post', info).then((res) => {
        console.log(res)
        this.closeLoading()
        if (res.data.code !== '000000' && !IsEmpty(res.data.code)) {
          this.openToast('warning', res.data.msg)
        } else {
          if (res.data === '保存成功') {
            this.openToast('success', res.data)
            this.getDetailExamine(this.examineNo, this.beizhu)
          } else {
            if (typeof (res.data) === 'string') {
              this.openToast('warning', res.data)
            } else {
              this.openToast('warning', res.data.msg)
            }
          }
        }
      })
    },
    operateExamine () {
      if (this.detailDialogData1.verifyStatus === '2') {
        this.openToast('warning', '目前状态无法审核！')
        return
      }
      if (this.userComCode === '01' && this.detailDialogData1.verifyStatus === '1') {
        this.openToast('warning', '该审核节点为分公司待审核！')
        return
      }
      if (this.userComCode !== '01' && this.detailDialogData1.verifyStatus === '3') {
        this.openToast('warning', '该审核节点为总公司待复核！')
        return
      }
      this.dialogTableVisibleCheck = true
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
.center{text-align: center}
.ri-line{margin-top: 10px;margin-bottom: 10px;}
.label-text textarea{
  width: 40rem !important
}
</style>
