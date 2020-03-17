<template>
  <div class="wrap">
    <ui-notice-bar slot="breadcast" >
      <el-breadcrumb slot="location" separator=">">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>人管处报表</el-breadcrumb-item>
        <el-breadcrumb-item>合伙人续期利益清单</el-breadcrumb-item>
      </el-breadcrumb>
    </ui-notice-bar>
    <el-form class="verify-content" :model="queryInfo" ref="queryInfo" :rules="rules">
      <el-row class="ri-line">
        <el-col :span=12>
          <el-form-item prop='comcode'>
            <ui-label-text labelWidth="180" label="省级分公司代码：">
              <el-input v-model="queryInfo.comcode" :disabled="userComCode !== '01'" slot="text" @dblclick.native="openComDialog(1)"  @blur='opensingleComDialog(1)' clearable placeholder="双击可选择" @change="clearDiji"></el-input>
            </ui-label-text>
          </el-form-item>
        </el-col>
        <el-col :span=12>
          <el-form-item prop='comname'>
            <ui-label-text labelWidth="180" label="省级分公司名称：">
              <el-input v-model="queryInfo.comname" :disabled="userComCode !== '01'" slot="text" @dblclick.native="openComDialog(1)"  @blur='opensingleComDialog(1)' clearable placeholder="双击可选择" @change="clearDiji"></el-input>
            </ui-label-text>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row class="ri-line">
        <el-col :span=12>
          <el-form-item prop='comcncode'>
            <ui-label-text labelWidth="180" label="地市级分公司代码：">
              <el-input v-model="queryInfo.comcncode" slot="text" @dblclick.native="openComDialog(2)"  @blur='opensingleComDialog(2)' clearable placeholder="双击可选择"></el-input>
            </ui-label-text>
          </el-form-item>
        </el-col>
        <el-col :span=12>
          <el-form-item prop='comcnname'>
            <ui-label-text labelWidth="180" label="地市级分公司名称：">
              <el-input v-model="queryInfo.comcnname" slot="text" @dblclick.native="openComDialog(2)"  @blur='opensingleComDialog(2)' clearable placeholder="双击可选择" ></el-input>
            </ui-label-text>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row class="ri-line">
        <el-col :span=12>
          <el-form-item prop='hhrcode'>
            <ui-label-text labelWidth="180" label="合伙人代码：">
              <el-input v-model="queryInfo.hhrcode" slot="text" @dblclick.native="openComDialog(3)"  @blur='opensingleComDialog(3)' clearable placeholder="双击可选择"></el-input>
            </ui-label-text>
          </el-form-item>
        </el-col>
        <el-col :span=12>
          <el-form-item prop='hhrname'>
            <ui-label-text labelWidth="180" label="合伙人名称：">
              <el-input v-model="queryInfo.hhrname" slot="text" @dblclick.native="openComDialog(3)"  @blur='opensingleComDialog(3)' clearable placeholder="双击可选择" ></el-input>
            </ui-label-text>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row class="ri-line">
        <el-col :span=12>
          <el-form-item prop='hhrrank'>
            <!-- 顶级创业合伙人、资深创业合伙人、高级创业合伙人、中级创业合伙人、初级创业合伙人 -->
            <ui-label-text label="合伙人职级:" labelWidth="180">
              <el-select v-model="queryInfo.hhrrank" slot="text" placeholder="请选择">
                <el-option label="初级创业合伙人" value="5"></el-option>
                <el-option label="中级创业合伙人" value="6"></el-option>
                <el-option label="高级创业合伙人" value="7"></el-option>
                <el-option label="资深创业合伙人" value="8"></el-option>
                <el-option label="顶级创业合伙人" value="9"></el-option>
              </el-select>
            </ui-label-text>
          </el-form-item>
        </el-col>
        <el-col :span=12>
          <el-form-item prop='hhrtype'>
            <ui-label-text label="合伙人类型:" labelWidth="180">
              <el-select v-model="queryInfo.hhrtype" slot="text" placeholder="请选择">
                <el-option label="代理制" value="3"></el-option>
                <el-option label="代理制-昆仑" value="6"></el-option>
              </el-select>
            </ui-label-text>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row class="ri-line">
        <el-col :span=12>
          <el-form-item prop='commissionMonth'>
            <ui-label-text labelWidth="180" label="工资月份:" :required="true">
              <el-date-picker
                  v-model="queryInfo.commissionMonth"
                  value-format="yyyy-MM"
                  type="month"
                  slot="text"
                >
              </el-date-picker>
            </ui-label-text>
          </el-form-item>
        </el-col>
        <el-col :span=12>
          <el-form-item prop='jxlmonth'>
            <ui-label-text labelWidth="180" label="继续率月份:">
              <el-date-picker
                  v-model="queryInfo.jxlmonth"
                  value-format="yyyy-MM"
                  type="month"
                  slot="text"
                >
              </el-date-picker>
            </ui-label-text>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row class="ri-line">
        <el-col :span=12>
          <el-form-item prop='type'>
            <!-- 顶级创业合伙人、资深创业合伙人、高级创业合伙人、中级创业合伙人、初级创业合伙人 -->
            <ui-label-text label="清单类型:" :required="true"  labelWidth="180">
              <el-select v-model="queryInfo.type" slot="text" placeholder="请选择">
                <el-option label="合伙人续期价值奖励" value="1"></el-option>
                <el-option label="合伙人育成续期价值奖励" value="2"></el-option>
              </el-select>
            </ui-label-text>
          </el-form-item>
        </el-col>
        <el-col :span=12>
          <el-form-item prop='ssdate'>
            <ui-label-text label="续1实收日期:" labelWidth="180">
              <el-select v-model="queryInfo.ssdate" slot="text" placeholder="请选择">
                <el-option label="全部" value="0"></el-option>
                <el-option label="空" value="1"></el-option>
                <el-option label="非空" value="2"></el-option>
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
    <div class="table" v-if="tableShowOrNot">
      <el-table v-if="queryInfo.type === '2'" :data="tableData" style="width: 100%">
        <!-- 合伙人育成续期价值奖励 -->
        <el-table-column prop="type" label="清单类型"  width="150"></el-table-column>
        <el-table-column prop="commissionMonth" label="工资月份"  width="150"></el-table-column>
        <!-- <el-table-column prop="jxlmonth" label="继续率月份"  width="150"></el-table-column> -->
        <el-table-column prop="comcode" label="省级分公司代码"  width="130"></el-table-column>
        <el-table-column prop="comname" label="省级分公司名称"  width="130"></el-table-column>
        <el-table-column prop="comcncode" label="地市级分公司代码"  width="130"></el-table-column>
        <el-table-column prop="comcnname" label="地市级分公司名称"  width="130"></el-table-column>
        <el-table-column prop="hhrcode" label="合伙人代码"  width="130"></el-table-column>
        <el-table-column prop="hhrname" label="合伙人姓名"  width="130"></el-table-column>
        <el-table-column prop="hhrrank" label="合伙人职级"  width="130"></el-table-column>
        <el-table-column prop="hhrtype" label="合伙人类型"  width="130"></el-table-column>
        <el-table-column prop="hhrisretire" label="是否离职"  width="130"></el-table-column>
        <el-table-column prop="hhrretiredate" label="离职日期"  width="130"></el-table-column>
        <el-table-column prop="xqjzjlxs1" label="一代育成续期价值奖励系数"  width="130"></el-table-column>
        <el-table-column prop="xqjzjlxs2" label="二代育成续期价值奖励系数"  width="130"></el-table-column>
        <el-table-column prop="xqjzjl1" label="一代育成续期价值奖励"  width="130"></el-table-column>
        <el-table-column prop="xqjzjl2" label="二代育成续期价值奖励"  width="130"></el-table-column>
        <el-table-column prop="comCode" label="一代被育成合伙人团队信息"  width="130">
          <el-table-column prop="agentcode1" label="业务员代码"  width="130"></el-table-column>
          <el-table-column prop="agentname1" label="业务员姓名"  width="130"></el-table-column>
          <el-table-column prop="agentrank1" label="业务员职级"  width="130"></el-table-column>
          <el-table-column prop="agenttype1" label="业务员类型"  width="130"></el-table-column>
          <el-table-column prop="highercode1" label="上级领导代码"  width="130"></el-table-column>
          <el-table-column prop="highername1" label="上级领导姓名"  width="130"></el-table-column>
          <el-table-column prop="isretire1" label="是否离职"  width="130"></el-table-column>
          <el-table-column prop="retiredate1" label="离职日期"  width="130"></el-table-column>
          <el-table-column prop="proposalno1" label="投保单号"  width="130"></el-table-column>
          <el-table-column prop="policyno1" label="保单号"  width="130"></el-table-column>
          <el-table-column prop="companycode1" label="保险公司代码"  width="130"></el-table-column>
          <el-table-column prop="companyname1" label="保险公司名称"  width="200"></el-table-column>
          <el-table-column prop="companycomcode1" label="保险机构代码"  width="130"></el-table-column>
          <el-table-column prop="companycomname1" label="保险机构名称"  width="200"></el-table-column>
          <el-table-column prop="riskcode1" label="险种代码"  width="130"></el-table-column>
          <el-table-column prop="riskname1" label="险种名称"  width="200"></el-table-column>
          <el-table-column prop="mainflag1" label="主/附险"  width="130"></el-table-column>
          <el-table-column prop="period1" label="缴费年期"  width="130"></el-table-column>
          <el-table-column prop="issinglie1" label="是否趸交"  width="130"></el-table-column>
          <el-table-column prop="acceptdate1" label="承保日期"  width="130"></el-table-column>
          <el-table-column prop="effectdate1" label="生效日期"  width="130"></el-table-column>
          <el-table-column prop="sqperimum1" label="首年实收保费"  width="130"></el-table-column>
          <el-table-column prop="sqcommission1" label="首年基础佣金"  width="130"></el-table-column>
          <el-table-column prop="xqperimum1" label="续1实收保费"  width="130"></el-table-column>
          <el-table-column prop="ssdate1" label="续1实收日期"  width="130"></el-table-column>
        </el-table-column>
        <el-table-column prop="comCode" label="二代被育成合伙人团队信息"  width="130">
          <el-table-column prop="agentcode2" label="业务员代码"  width="130"></el-table-column>
          <el-table-column prop="agentname2" label="业务员姓名"  width="130"></el-table-column>
          <el-table-column prop="agentrank2" label="业务员职级"  width="130"></el-table-column>
          <el-table-column prop="agenttype2" label="业务员类型"  width="130"></el-table-column>
          <el-table-column prop="highercode2" label="上级领导代码"  width="130"></el-table-column>
          <el-table-column prop="highername2" label="上级领导姓名"  width="130"></el-table-column>
          <el-table-column prop="isretire2" label="是否离职"  width="130"></el-table-column>
          <el-table-column prop="retiredate2" label="离职日期"  width="130"></el-table-column>
          <el-table-column prop="proposalno2" label="投保单号"  width="130"></el-table-column>
          <el-table-column prop="policyno2" label="保单号"  width="130"></el-table-column>
          <el-table-column prop="companycode2" label="保险公司代码"  width="130"></el-table-column>
          <el-table-column prop="companyname2" label="保险公司名称"  width="200"></el-table-column>
          <el-table-column prop="companycomcode2" label="保险机构代码"  width="130"></el-table-column>
          <el-table-column prop="companycomname2" label="保险机构名称"  width="200"></el-table-column>
          <el-table-column prop="riskcode2" label="险种代码"  width="130"></el-table-column>
          <el-table-column prop="riskname2" label="险种名称"  width="200"></el-table-column>
          <el-table-column prop="mainflag2" label="主/附险"  width="130"></el-table-column>
          <el-table-column prop="period2" label="缴费年期"  width="130"></el-table-column>
          <el-table-column prop="issinglie2" label="是否趸交"  width="130"></el-table-column>
          <el-table-column prop="acceptdate2" label="承保日期"  width="130"></el-table-column>
          <el-table-column prop="effectdate2" label="生效日期"  width="130"></el-table-column>
          <el-table-column prop="sqperimum2" label="首年实收保费"  width="130"></el-table-column>
          <el-table-column prop="sqcommission2" label="首年基础佣金"  width="130"></el-table-column>
          <el-table-column prop="xqperimum2" label="续1实收保费"  width="130"></el-table-column>
          <el-table-column prop="ssdate2" label="续1实收日期"  width="130"></el-table-column>
        </el-table-column>
      </el-table>
      <el-table v-if="queryInfo.type === '1'" :data="tableData" style="width: 100%">
        <!-- 合伙人续期价值奖励 -->
        <el-table-column prop="type" label="清单类型"  width="150"></el-table-column>
        <el-table-column prop="commissionMonth" label="工资月份"  width="150"></el-table-column>
        <el-table-column prop="jxlmonth" label="继续率月份"  width="150"></el-table-column>
        <el-table-column prop="comcode" label="省级分公司代码"  width="130"></el-table-column>
        <el-table-column prop="comname" label="省级分公司名称"  width="130"></el-table-column>
        <el-table-column prop="comcncode" label="地市级分公司代码"  width="130"></el-table-column>
        <el-table-column prop="comcnname" label="地市级分公司名称"  width="130"></el-table-column>
        <el-table-column prop="hhrcode" label="合伙人代码"  width="130"></el-table-column>
        <el-table-column prop="hhrname" label="合伙人姓名"  width="130"></el-table-column>
        <el-table-column prop="hhrrank" label="合伙人职级"  width="130"></el-table-column>
        <el-table-column prop="hhrtype" label="合伙人类型"  width="130"></el-table-column>
        <el-table-column prop="hhrisretire" label="是否离职"  width="130"></el-table-column>
        <el-table-column prop="hhrretiredate" label="离职日期"  width="130"></el-table-column>
        <el-table-column prop="xqjzjlxs" label="续期价值奖励系数"  width="130"></el-table-column>
        <el-table-column prop="hhrr13jxl" label="合伙人R13团队"  width="130"></el-table-column>
        <el-table-column prop="comCode" label="继续率"  width="130">
          <el-table-column prop="jxltjxs" label="继续率调节系数"  width="130"></el-table-column>
          <el-table-column prop="xqjzjl" label="合伙人续期价值奖励"  width="130"></el-table-column>
        </el-table-column>
        <el-table-column prop="comCode" label="合伙人团队信息"  width="130">
          <el-table-column prop="agentcode" label="业务员代码"  width="130"></el-table-column>
          <el-table-column prop="agentname" label="业务员姓名"  width="130"></el-table-column>
          <el-table-column prop="agentrank" label="业务员职级"  width="130"></el-table-column>
          <el-table-column prop="agenttype" label="业务员类型"  width="130"></el-table-column>
          <el-table-column prop="highercode" label="上级领导代码"  width="130"></el-table-column>
          <el-table-column prop="highername" label="上级领导姓名"  width="130"></el-table-column>
          <el-table-column prop="isretire" label="是否离职"  width="130"></el-table-column>
          <el-table-column prop="retiredate" label="离职日期"  width="130"></el-table-column>
          <el-table-column prop="proposalno" label="投保单号"  width="130"></el-table-column>
          <el-table-column prop="policyno" label="保单号"  width="130"></el-table-column>
          <el-table-column prop="companycode" label="保险公司代码"  width="130"></el-table-column>
          <el-table-column prop="companyname" label="保险公司名称"  width="200"></el-table-column>
          <el-table-column prop="companycomcode" label="保险机构代码"  width="130"></el-table-column>
          <el-table-column prop="companycomname" label="保险机构名称"  width="200"></el-table-column>
          <el-table-column prop="riskcode" label="险种代码"  width="130"></el-table-column>
          <el-table-column prop="riskname" label="险种名称"  width="200"></el-table-column>
          <el-table-column prop="mainflag" label="主/附险"  width="130"></el-table-column>
          <el-table-column prop="period" label="缴费年期"  width="130"></el-table-column>
          <el-table-column prop="issinglie" label="是否趸交"  width="130"></el-table-column>
          <el-table-column prop="acceptdate" label="承保日期"  width="130"></el-table-column>
          <el-table-column prop="effectdate" label="生效日期"  width="130"></el-table-column>
          <el-table-column prop="sqperimum" label="首年实收保费"  width="130"></el-table-column>
          <el-table-column prop="sqcommission" label="首年基础佣金"  width="130"></el-table-column>
          <el-table-column prop="xqperimum" label="续1实收保费"  width="130"></el-table-column>
          <el-table-column prop="ssdate" label="续1实收日期"  width="130"></el-table-column>
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
    <ComDialog :vis='comDialog1' :workerVis='comDialogworker1' :comVis='comDialogCom1' :newTableData='tempTableData1' @onClose='comDialogClosing(1)' @selectDialog='dialogBackData1' @comdialogChangePageFunction='changeComdialogPage1' @comdialogChangePageSizeFunction='changeComdialogPageSize1' :fenyetotal='fenyetotalData'/>
    <ComDialog :vis='comDialog2' :workerVis='comDialogworker2' :comVis='comDialogCom2' :newTableData='tempTableData2' @onClose='comDialogClosing(2)' @selectDialog='dialogBackData2' @comdialogChangePageFunction='changeComdialogPage2' @comdialogChangePageSizeFunction='changeComdialogPageSize2' :fenyetotal='fenyetotalData'/>
    <ComDialog :vis='comDialog3' :workerVis='comDialogworker3' :comVis='comDialogCom3' :newTableData='tempTableData3' @onClose='comDialogClosing(3)' @selectDialog='dialogBackData3' @comdialogChangePageFunction='changeComdialogPage3' @comdialogChangePageSizeFunction='changeComdialogPageSize3' :fenyetotal='fenyetotalData'/>
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
      // userComCode: '01',
      queryInfo: {
        type: '', // 清单类型
        commissionMonth: '', // 结佣月份(工资月份)
        jxlmonth: '', // 继续率月份
        comname: '', // 省级分公司名称
        comcode: '', // 省级分公司代码
        comcnname: '', // 地市级分公司名称
        comcncode: '', // 地市级分公司代码
        hhrtype: '', // 合伙人类型
        hhrrank: '', // 合伙人职级
        hhrcode: '', // 合伙人代码
        hhrname: '', // 合伙人名称
        ssdate: '', // 续1实收日期
        currentPage: 1,
        pageSize: 10
      },
      rules: {
        commissionMonth: [
          { required: true, message: '请输入工资月份', trigger: 'change' }
        ],
        type: [
          { required: true, message: '请输入清单类型', trigger: 'change' }
        ]
      },
      tableShowOrNot: false,
      tableData: [],
      fenyetotalData: 0,
      totalRecords: 0,
      comDialog1: false,
      comDialogCom1: false,
      comDialogworker1: false,
      comDialog2: false,
      comDialogCom2: false,
      comDialogworker2: false,
      comDialog3: false,
      comDialogCom3: false,
      comDialogworker3: false,
      tempTableData1: [],
      tempTableData2: [],
      tempTableData3: [],
      quanxian: {
        query: true,
        export: true
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
      baiyingUpperWorkerData: {
        agentCode: '',
        agentName: '',
        comCode: '',
        comName: '',
        clickType: 2,
        currentPage: 1,
        pageSize: 10
      }
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
    this.shengjiQueryData.clickType = '1'
    this.shengjiQueryData.comCodeOrName = this.userComCode
    this.contiListCheckDialogDataGet1(this.shengjiQueryData).then(
      (res) => {
        this.initshuangjiDialog()
        if (res.data.code !== '000000' && !IsEmpty(res.data.code)) {
          this.openToast('warning', res.data.msg)
        } else {
          if (res.data.data.data.length === 1) {
            this.queryInfo.comcode = res.data.data.data[0].comCode
            this.queryInfo.comname = res.data.data.data[0].comCName.replace(/天安佰盈保险销售有限公司/, '')
          }
        }
      }
    )
    api(`/auth/findButtonByUserCodeAndPage?userId=${this.$store.state.login.loginUserId}&page=合伙人续期利益清单`, 'get').then(result => {
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
    queryInfo: {
      handler (newValue, oldValue) {
        this.tableShowOrNot = false
      },
      deep: true
    },
    'queryInfo.comname' () {
      if (this.queryInfo.comname === '') {
        this.queryInfo.comcode = ''
      }
    },
    'queryInfo.comcode' () {
      if (this.queryInfo.comcode === '') {
        this.queryInfo.comname = ''
      }
    },
    'queryInfo.comcnname' () {
      if (this.queryInfo.comcnname === '') {
        this.queryInfo.comcncode = ''
      }
    },
    'queryInfo.comcncode' () {
      if (this.queryInfo.comcncode === '') {
        this.queryInfo.comcnname = ''
      }
    },
    'queryInfo.hhrcode' () {
      if (this.queryInfo.hhrcode === '') {
        this.queryInfo.comcncode = ''
      }
    },
    'queryInfo.hhrname' () {
      if (this.queryInfo.hhrname === '') {
        this.queryInfo.hhrcode = ''
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
    // toast提示
    openToast (type, mesg) {
      this.$message({
        showClose: true,
        message: mesg,
        type: type
      })
    },
    submitForm (formName, index) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          console.log('submit!')
          switch (index) {
            case 0:
              this.queryInfo.currentPage = 1
              this.totalRecords = 0
              this.queryData()
              break
            case 1:
              this.exportData()
              break
          }
        }
      })
    },
    clearDiji () {
      this.queryInfo.comcncode = ''
      this.queryInfo.comcnname = ''
    },
    ...mapActions(['contiListCheckDialogDataGet1', 'contiListCheckDialogDataGet2', 'partnerRenewalProListWorkerQuery']),
    openComDialog (index) {
      switch (index) {
        case 1:
          if (this.userComCode === '01') {
            this.shengjiQueryData.clickType = '2'
            if (IsEmpty(this.queryInfo.comcode)) {
              this.shengjiQueryData.comCodeOrName = this.queryInfo.comname
            } else {
              this.shengjiQueryData.comCodeOrName = this.queryInfo.comcode
            }
            this.contiListCheckDialogDataGet1(this.shengjiQueryData).then(
              (res) => {
                if (res.data.code !== '000000' && !IsEmpty(res.data.code)) {
                  this.openToast('warning', res.data.msg)
                } else {
                  for (let i = 0; i < res.data.data.data.length; i++) {
                    res.data.data.data[i].comCName = res.data.data.data[i].comCName.replace(/天安佰盈保险销售有限公司/, '')
                  }
                  this.tempTableData1 = res.data.data.data
                  this.fenyetotalData = res.data.data.totalRecords
                  for (let i = 0; i < this.tempTableData1.length; i++) {
                    this.tempTableData1[i]['renderData'] = `${this.tempTableData1[i].comCode}-${this.tempTableData1[i].comCName}`
                  }
                  this.comDialog1 = true
                  this.comDialogCom1 = true
                  this.comDialogworker1 = false
                }
              })
          }
          break
        case 2:
          if (IsEmpty(this.queryInfo.comcode)) {
            this.openToast('warning', '请先选择省级分公司！')
          } else if (this.queryInfo.comcode === '01') {
            this.openToast('warning', '当您在省级分公司输入框处为总公司不可选择分公司！')
          } else {
            this.dijiQueryData.clickType = '2'
            this.dijiQueryData.upperComCode = this.queryInfo.comcode
            if (IsEmpty(this.queryInfo.comcncode)) {
              this.dijiQueryData.comCodeOrName = this.queryInfo.comcnname
            } else {
              this.dijiQueryData.comCodeOrName = this.queryInfo.comcncode
            }
            this.contiListCheckDialogDataGet2(this.dijiQueryData).then(
              (res) => {
                if (res.data.code !== '000000' && !IsEmpty(res.data.code)) {
                  this.openToast('warning', res.data.msg)
                } else {
                  for (let i = 0; i < res.data.data.data.length; i++) {
                    res.data.data.data[i].comCName = res.data.data.data[i].comCName.replace(/天安佰盈保险销售有限公司/, '')
                  }
                  this.tempTableData2 = res.data.data.data
                  this.fenyetotalData = res.data.data.totalRecords
                  for (let i = 0; i < this.tempTableData2.length; i++) {
                    this.tempTableData2[i]['renderData'] = `${this.tempTableData2[i].comCode}-${this.tempTableData2[i].comCName}`
                  }
                  this.comDialog2 = true
                  this.comDialogCom2 = true
                  this.comDialogworker2 = false
                }
              })
          }
          break
        case 3:
          this.baiyingUpperWorkerData.clickType = '2'
          this.baiyingUpperWorkerData.agentCode = this.queryInfo.hhrcode
          this.baiyingUpperWorkerData.agentName = this.queryInfo.hhrname
          this.baiyingUpperWorkerData.comCode = IsEmpty(this.queryInfo.comcncode) ? this.queryInfo.comcode : this.queryInfo.comcncode
          this.baiyingUpperWorkerData.comName = IsEmpty(this.queryInfo.comcnname) ? this.queryInfo.comname : this.queryInfo.comcnname
          this.partnerRenewalProListWorkerQuery(this.baiyingUpperWorkerData).then(
            (res) => {
              if (res.data.code !== '000000' && !IsEmpty(res.data.code)) {
                this.openToast('warning', res.data.msg)
              } else {
                this.tempTableData3 = res.data.data.data
                this.fenyetotalData = res.data.data.totalRecords
                for (let i = 0; i < this.tempTableData3.length; i++) {
                  this.tempTableData3[i]['renderData'] = `${this.tempTableData3[i].agentCode}-${this.tempTableData3[i].agentName}`
                }
                this.comDialog3 = true
                this.comDialogCom3 = true
                this.comDialogworker3 = false
              }
            })
      }
    },
    opensingleComDialog (index) {
      if (!(this.comDialog1 || this.comDialog2 || this.comDialog3)) {
        switch (index) {
          case 1:
            if (this.userComCode === '01') {
              this.shengjiQueryData.clickType = '1'
              if (IsEmpty(this.queryInfo.comcode)) {
                this.shengjiQueryData.comCodeOrName = this.queryInfo.comname
              } else {
                this.shengjiQueryData.comCodeOrName = this.queryInfo.comcode
              }
              this.contiListCheckDialogDataGet1(this.shengjiQueryData).then(
                (res) => {
                  this.initshuangjiDialog()
                  if (res.data.code !== '000000' && !IsEmpty(res.data.code)) {
                    // this.openToast('warning', res.data.msg)
                  } else {
                    if (res.data.data.data.length === 1) {
                      this.queryInfo.comcode = res.data.data.data[0].comCode
                      this.queryInfo.comname = res.data.data.data[0].comCName.replace(/天安佰盈保险销售有限公司/, '')
                    }
                  }
                }
              )
            }
            break
          case 2:
            this.dijiQueryData.clickType = '1'
            this.dijiQueryData.upperComCode = this.queryInfo.comcode
            if (IsEmpty(this.queryInfo.comcncode)) {
              this.dijiQueryData.comCodeOrName = this.queryInfo.comcnname
            } else {
              this.dijiQueryData.comCodeOrName = this.queryInfo.comcncode
            }
            this.contiListCheckDialogDataGet2(this.dijiQueryData).then(
            (res) => {
              this.initshuangjiDialog()
              if (res.data.code !== '000000' && !IsEmpty(res.data.code)) {
                // this.openToast('warning', res.data.msg)
              } else {
                if (res.data.data.data.length === 1) {
                  this.queryInfo.comcncode = res.data.data.data[0].comCode
                  this.queryInfo.comcnname = res.data.data.data[0].comCName.replace(/天安佰盈保险销售有限公司/, '')
                }
              }
            })
            break
          case 3:
            this.baiyingUpperWorkerData.clickType = '1'
            this.baiyingUpperWorkerData.agentCode = this.queryInfo.hhrcode
            this.baiyingUpperWorkerData.agentName = this.queryInfo.hhrname
            this.partnerRenewalProListWorkerQuery(this.baiyingUpperWorkerData).then(
              (res) => {
                this.initshuangjiDialog()
                if (res.data.code !== '000000' && !IsEmpty(res.data.code)) {
                  // this.openToast('warning', res.data.msg)
                } else {
                  if (res.data.data.data.length === 1) {
                    this.queryInfo.hhrcode = res.data.data.data[0].agentCode
                    this.queryInfo.hhrname = res.data.data.data[0].agentName
                  }
                }
              })
            break
        }
      }
    },
    comDialogClosing (index) {
      this.comDialog1 = false
      this.comDialog2 = false
      this.comDialog3 = false
      this.initshuangjiDialog()
      switch (index) {
        case 1:
          this.queryInfo.comcode = ''
          this.queryInfo.comname = ''
          break
        case 2:
          this.queryInfo.comcncode = ''
          this.queryInfo.comcnname = ''
          break
        case 3:
          this.queryInfo.hhrcode = ''
          this.queryInfo.hhrname = ''
          break
      }
    },
    queryData () {
      this.tableData = []
      this.Loading()
      api('/partnerRenewedInterest/queryReport', 'post', this.queryInfo).then((res) => {
        console.log(res)
        this.closeLoading()
        if (res.data.code !== '000000' && !IsEmpty(res.data.code)) {
          this.openToast('warning', res.data.msg)
        } else {
          this.tableData = res.data.data.content
          this.tableShowOrNot = true
          this.totalRecords = res.data.data.totalElements
        }
      })
    },
    exportData () {
      window.open(`/tabycore/partnerRenewedInterest/exportReport?type=${this.queryInfo.type}&commissionMonth=${this.queryInfo.commissionMonth}&jxlmonth=${this.queryInfo.jxlmonth}&comname=${this.queryInfo.comname}&comcode=${this.queryInfo.comcode}&comcnname=${this.queryInfo.comcnname}&comcncode=${this.queryInfo.comcncode}&hhrtype=${this.queryInfo.hhrtype}&hhrrank=${this.queryInfo.hhrrank}&hhrcode=${this.queryInfo.hhrcode}&hhrname=${this.queryInfo.hhrrank}&ssdate=${this.queryInfo.hhrcode}`)
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
    dialogBackData1 (data) {
      this.initshuangjiDialog()
      this.comDialog1 = false
      let temp = []
      temp = data.split('-')
      this.queryInfo.comcode = temp[0]
      this.queryInfo.comname = temp[1]
    },
    dialogBackData2 (data) {
      this.initshuangjiDialog()
      this.comDialog2 = false
      let temp = []
      temp = data.split('-')
      this.queryInfo.comcncode = temp[0]
      this.queryInfo.comcnname = temp[1]
    },
    dialogBackData3 (data) {
      this.initshuangjiDialog()
      this.comDialog3 = false
      let temp = []
      temp = data.split('-')
      this.queryInfo.hhrcode = temp[0]
      this.queryInfo.hhrname = temp[1]
    },
    changeComdialogPage1 (data) {
      this.shengjiQueryData.currentPage = data
      this.openComDialog(1)
    },
    changeComdialogPage2 (data) {
      this.dijiQueryData.currentPage = data
      this.openComDialog(2)
    },
    changeComdialogPage3 (data) {
      this.baiyingUpperWorkerData.currentPage = data
      this.openComDialog(3)
    },
    changeComdialogPageSize1 (data) {
      this.shengjiQueryData.currentPage = 1
      this.shengjiQueryData.pageSize = data
      this.openComDialog(1)
    },
    changeComdialogPageSize2 (data) {
      this.dijiQueryData.currentPage = 1
      this.dijiQueryData.pageSize = data
      this.openComDialog(2)
    },
    changeComdialogPageSize3 (data) {
      this.baiyingUpperWorkerData.currentPage = 1
      this.baiyingUpperWorkerData.pageSize = data
      this.openComDialog(3)
    },
    initshuangjiDialog () {
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
      this.baiyingUpperWorkerData = {
        agentCode: '',
        agentName: '',
        comCode: '',
        comName: '',
        clickType: 2,
        currentPage: 1,
        pageSize: 10
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
</style>
