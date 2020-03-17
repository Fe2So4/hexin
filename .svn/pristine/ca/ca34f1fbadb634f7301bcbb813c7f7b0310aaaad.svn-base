<template>
  <div id="billView" >
      <ui-notice-bar slot="breadcast" >
        <el-breadcrumb slot="location" separator=">">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>对账单管理</el-breadcrumb-item>
            <el-breadcrumb-item>寿险对账单管理</el-breadcrumb-item>
            <el-breadcrumb-item>运营部审核</el-breadcrumb-item>
          </el-breadcrumb>
      </ui-notice-bar>
      <div class="ri-content" slot="content" >
        <el-form :model="info" :rules="queryrules" ref="queryForm" >
        <el-row class="ri-line">
          <el-col :span="12">
          <el-form-item class="comCode" prop="comCode">
            <ui-label-text :required="true" labelWidth="180" label="佰盈机构代码：" >
              <el-input v-model="info.comCode" slot="text" ref="baiyingCodeText" @input="baiyingchange(1)" @dblclick.native.prevent="dbQuery(1,'by')" placeholder="双击可选择" @blur='opensingleComDialog(1)' clearable></el-input>
            </ui-label-text>
          </el-form-item>
          </el-col>
          <el-col :span="12">
          <el-form-item class="comName" prop="comName">
            <ui-label-text :required="true" labelWidth="180" label="佰盈机构名称:" >
              <el-input v-model="info.comName" slot="text" ref="baiyingNameText" @input="baiyingchange(2)" @dblclick.native.prevent="dbQuery(1,'by')" placeholder="双击可选择" @blur='opensingleComDialog(1)' clearable></el-input>
            </ui-label-text>
          </el-form-item>
          </el-col>
        </el-row>
        <el-row class="ri-line">
          <el-col :span="12">
            <ui-label-text labelWidth="180" label="保险公司代码：" >
              <el-input v-model="info.companyCode" slot="text" ref="baoxianCodeText" @change="baoxianChange(1)" @dblclick.native="dbQueryCom(1,'com')" placeholder="双击可选择" @blur='opensingleComDialog(0)' clearable></el-input>
            </ui-label-text>
          </el-col>
          <el-col :span="12">
            <ui-label-text labelWidth="180" label="保险公司名称：" >
              <el-input v-model="info.companyName" slot="text" ref="baoxianNameText" @change="baoxianChange(2)" @dblclick.native="dbQueryCom(1,'com')" placeholder="双击可选择" @blur='opensingleComDialog(0)' clearable></el-input>
            </ui-label-text>
          </el-col>
        </el-row>
        <el-row class="ri-line">
          <el-col :span="12">
            <ui-label-text labelWidth="180" label="审核状态:" >
              <el-select v-model="info.verifyStatus" slot="text" placeholder="请选择">
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
          </el-col>
          <el-col :span="12">
            <ui-label-text labelWidth="180" label="结算状态:" >
              <el-select v-model="info.status" slot="text" placeholder="请选择">
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
          </el-col>
        </el-row>
        <el-row class="ri-line">
          <el-col :span="24">
             <ui-label-text labelWidth="180" label="对账单生成日期:" >
               <div slot="text" class="datestyle">
                <el-date-picker v-model="info.startDate" type="date" value-format="yyyy-MM-dd" placeholder="选择开始日期"></el-date-picker>
                  <span class="datestyle1" labelWidth="150">至</span>
                <el-date-picker v-model="info.endDate" type="date" value-format="yyyy-MM-dd" placeholder="选择结束日期"></el-date-picker>
               </div>
            </ui-label-text>
          </el-col>
        </el-row>
        <el-row class="ri-line">
          <el-col :span="12">
          <el-form-item class="yearMouth" prop="yearMouth">
             <ui-label-text labelWidth="180" label="结算年月（轨迹查询专用）:" >
               <el-input v-model="info.yearMouth" slot="text" placeholder="范例：YYYYMM(201706)"></el-input>
            </ui-label-text>
          </el-form-item>
          </el-col>
          <el-col :span="12">
          <el-form-item class="batch" prop="batch">
             <ui-label-text :required="true" labelWidth="180" label="批次:" >
               <el-select v-model="info.batch" slot="text" placeholder="请选择">
                <el-option
                  v-for="item in batchList"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
            </el-select>
            </ui-label-text>
          </el-form-item>
          </el-col>
        </el-row>
        </el-form>
      </div>
      <div class="btn-container" slot="controlbar" >
        <el-button type="primary" @click.native.prevent="handleQuery()" :disabled="quanxian.query">查询</el-button>
        <el-button type="primary" @click.native.prevent="handleExport()" :disabled="quanxian.export">导出Excel</el-button>
        <el-button type="primary" @click.native.prevent="handleTrack()" :disabled="quanxian.trace">轨迹查询</el-button>
        <el-button type="primary" @click.native.prevent="handleCheck()" :disabled="quanxian.review">审核</el-button>
      </div>
      <!-- 表格 -->
      <div class="bill-table" v-show="isTableShow">
        <el-table
          :data="billQueryData"
          @selection-change="handleSelectionChange"
          stripe
          style="width: 100%">
          <el-table-column
            type="selection"
            width="55">
          </el-table-column>
          <el-table-column
            label="对账单号"
            width="200">
            <template slot-scope="scope">
              <span @click="handleDetail(scope.row)" class="tableButton">{{ scope.row.batchNo }}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="保险公司"
            width="180">
            <template slot-scope="scope">
              <span style="margin-left: 10px">{{ scope.row.companyName }}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="佰盈公司"
            width="180">
            <template slot-scope="scope">
              <span style="margin-left: 10px">{{ scope.row.comName }}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="奖金类型"
            width="180">
            <template slot-scope="scope">
              <span style="margin-left: 10px">{{ scope.row.type }}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="对账金额">
            <el-table-column
              label="首期手续费"
              width="180">
              <template slot-scope="scope">
                <span style="margin-left: 10px">{{ scope.row.firstPoundage }}</span>
              </template>
            </el-table-column>
            <el-table-column
              label="首期总对总方案手续费"
              width="180">
              <template slot-scope="scope">
                <span style="margin-left: 10px">{{ scope.row.alltoallPoundage }}</span>
              </template>
            </el-table-column>
            <el-table-column
              label="首期分对分方案手续费"
              width="180">
              <template slot-scope="scope">
                <span style="margin-left: 10px">{{ scope.row.fentofenPoundage }}</span>
              </template>
            </el-table-column>
            <el-table-column
              label="续期手续费"
              width="180">
              <template slot-scope="scope">
                <span style="margin-left: 10px">{{ scope.row.xqCalHandMount }}</span>
              </template>
            </el-table-column>
            <el-table-column
              label="继续率奖金"
              width="180">
              <template slot-scope="scope">
                <span style="margin-left: 10px">{{ scope.row.jxljj }}</span>
              </template>
            </el-table-column>
            <el-table-column
              label="对账合计金额"
              width="180">
              <template slot-scope="scope">
                <span style="margin-left: 10px">{{ scope.row.calHandMount }}</span>
              </template>
            </el-table-column>
          </el-table-column>
          <el-table-column
            label="对账单生成日期"
            width="180">
            <template slot-scope="scope">
              <span style="margin-left: 10px">{{ scope.row.reconinsertDateStr }}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="是否结算"
            width="180">
            <template slot-scope="scope">
              <span style="margin-left: 10px">{{ scope.row.status }}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="是否审核"
            width="180">
            <template slot-scope="scope">
              <span style="margin-left: 10px">{{ scope.row.verifyStatus }}</span>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination
          v-if="totalRecords!=0"
          @current-change="handleCurrentChange"
          @size-change="handleSizeChange"
          :current-page="tablePage.currentPage"
          :page-sizes="[10, 20, 50]"
          :page-size="tablePage.size"
          layout="total, sizes, prev, pager, next, jumper"
          :total="totalRecords ? totalRecords : tablePage.total">
        </el-pagination>
      </div>
      <!-- 双击弹框 -->
      <el-dialog :append-to-body="true" width="60%" center title="佰盈机构" stripe :visible.sync="dialogTableVisibleCode" :before-close="dialogOnclose">
      <el-table ref="multipleTable" @row-click="handleRowChange" :data="dbcomData" tooltip-effect="dark" style="width: 100%">
        <el-table-column prop="comCode" label="佰盈机构代码" show-overflow-tooltip>
        </el-table-column>
        <el-table-column prop="comCName" label="佰盈机构名称" show-overflow-tooltip>
        </el-table-column>
      </el-table>
      <el-pagination
        @current-change="handleDialogCurrentChange"
        :current-page="dialogPage.currentPage"
        @size-change="handledbSizeChange"
        :page-sizes="[10, 20, 50]"
        :page-size="dialogPage.size"
        layout="total, sizes, prev, pager, next, jumper"
        :total="dbcomTotal ? dbcomTotal : dialogPage.total">
      </el-pagination>
    </el-dialog>
    <el-dialog :append-to-body="true" width="60%" center title="保险公司" :visible.sync="dialogTableVisibleCode1" :before-close="dialogOnclose1">
      <el-table ref="multipleTable" stripe @row-click="handleInsRowChange" :data="insComData" tooltip-effect="dark" style="width: 100%">
        <el-table-column prop="insurercode" label="保险公司代码" show-overflow-tooltip>
        </el-table-column>
        <el-table-column prop="insurername" label="保险公司名称" show-overflow-tooltip>
        </el-table-column>
      </el-table>
      <el-pagination
        @current-change="handleComDialogCurrentChange"
        :current-page="dialogPage.currentPage"
        @size-change="handledbInsSizeChange"
        :page-sizes="[10, 20, 50]"
        :page-size="dialogPage.size"
        layout="total, sizes, prev, pager, next, jumper"
        :total="dbtotalRecords ? dbtotalRecords : dialogPage.total">
      </el-pagination>
    </el-dialog>

    <!-- 详情 -->
    <el-dialog :append-to-body="true" width="85%" title="详情" :visible.sync="dialogDetailVisibleCode">
      <ui-line-tittle :collapsible="true" >
        <span slot="title" >
            <i class="font_family icon-jy-menu-4" ></i>对账单详细信息
        </span>
        <div class="ri-content" slot="content" >
          <el-row class="ri-line">
            <el-col :span="12">
              <ui-label-text labelWidth="120" label="对账单号：" >
                <el-input v-model="billDetailData.batchNo" slot="text"></el-input>
              </ui-label-text>
            </el-col>
            <el-col :span="12">
              <ui-label-text labelWidth="120" label="对账单状态:" >
                <el-input v-model="billDetailData.verifyStatus" slot="text"></el-input>
              </ui-label-text>
            </el-col>
          </el-row>
          <el-row class="ri-line">
            <el-col :span="12">
              <ui-label-text labelWidth="120" label="保险公司代码：" >
                <el-input v-model="billDetailData.companyCode" slot="text"></el-input>
              </ui-label-text>
            </el-col>
            <el-col :span="12">
              <ui-label-text labelWidth="120" label="保险公司名称：" >
                <el-input v-model="billDetailData.companyName" slot="text"></el-input>
              </ui-label-text>
            </el-col>
          </el-row>
          <el-row class="ri-line">
            <el-col :span="12">
              <ui-label-text labelWidth="120" label="保险公司机构代码：" >
                <el-input v-model="billDetailData.companyComCode" slot="text"></el-input>
              </ui-label-text>
            </el-col>
            <el-col :span="12">
              <ui-label-text labelWidth="120" label="保险公司机构名称：" >
                <el-input v-model="billDetailData.companyComName" slot="text"></el-input>
              </ui-label-text>
            </el-col>
          </el-row>
          <el-row class="ri-line">
            <el-col :span="12">
              <ui-label-text labelWidth="120" label="对账单生成人代码：" >
                <el-input v-model="billDetailData.reconinsertCode" slot="text"></el-input>
              </ui-label-text>
            </el-col>
            <el-col :span="12">
              <ui-label-text labelWidth="120" label="对账单生成人名称：" >
                <el-input v-model="billDetailData.reconinsertName" slot="text"></el-input>
              </ui-label-text>
            </el-col>
          </el-row>
          <el-row class="ri-line">
            <el-col :span="12">
              <ui-label-text labelWidth="120" label="对账单生成日期:" >
                <el-input v-model="billDetailData.reconinsertDateStr" slot="text"></el-input>
              </ui-label-text>
            </el-col>
            <el-col :span="12">
              <ui-label-text labelWidth="120" label="收款日期:" >
                <el-input slot="text" v-model="billDetailData.reconinsertDateStr"></el-input>
              </ui-label-text>
            </el-col>
          </el-row>
          <el-row class="ri-line">
            <el-col :span="12">
              <ui-label-text labelWidth="120" label="对账总手续费（不含税）:" >
                <el-input v-model="billDetailData.calNoHandMount" slot="text"></el-input>
              </ui-label-text>
            </el-col>
            <el-col :span="12">
              <ui-label-text labelWidth="120" label="对账总手续费（含税）：" >
                <el-input v-model="billDetailData.calHandMount" slot="text"></el-input>
              </ui-label-text>
            </el-col>
          </el-row>
          <el-row class="ri-line">
            <el-col :span="12">
              <ui-label-text labelWidth="120" label="对账总手续费税额：" >
                <el-input v-model="billDetailData.caltaxMount" slot="text"></el-input>
              </ui-label-text>
            </el-col>
            <el-col :span="12">
              <ui-label-text labelWidth="120" label="奖金类型：">
                <el-input value="手续费" slot="text"></el-input>
              </ui-label-text>
            </el-col>
          </el-row>
          <el-row class="ri-line">
            <el-col :span="12">
              <ui-label-text labelWidth="120" label="首期总手续费：" >
                <el-input v-model="billDetailData.sqCalHandMount" slot="text"></el-input>
              </ui-label-text>
            </el-col>
          </el-row>
          <el-row class="ri-line">
            <el-col :span="12">
              <ui-label-text labelWidth="120" label="首期手续费：" >
                <el-input v-model="billDetailData.firstPoundage" slot="text"></el-input>
              </ui-label-text>
            </el-col>
            <el-col :span="12">
              <ui-label-text labelWidth="120" label="首期总对总方案手续费：" >
                <el-input v-model="billDetailData.alltoallPoundage" slot="text"></el-input>
              </ui-label-text>
            </el-col>
          </el-row>
          <el-row class="ri-line">
            <el-col :span="12">
              <ui-label-text labelWidth="120" label="首期分对分方案手续费：" >
                <el-input v-model="billDetailData.fentofenPoundage" slot="text"></el-input>
              </ui-label-text>
            </el-col>
            <el-col :span="12">
              <ui-label-text labelWidth="120" label="续期手续费：" >
                <el-input v-model="billDetailData.xqCalHandMount" slot="text"></el-input>
              </ui-label-text>
            </el-col>
          </el-row>
          <el-row class="ri-line">
            <el-col :span="12">
              <ui-label-text labelWidth="120" label="继续率奖金：" >
                <el-input v-model="billDetailData.jxljj" slot="text"></el-input>
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
          <el-table ref="multipleTable" stripe :data="DialogTableShowData" tooltip-effect="dark" style="width: 100%">
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
          <div>
            <el-pagination
              :current-page="detailCurrentPage"
              @current-change="detailHandleCurrentChange"
              @size-change="detailHandleSizeChange"
              :page-sizes="[10,20,50]"
              :page-size="detailPageSize"
              layout="total, sizes, prev, pager, next, jumper"
              :total="fenyetotalData1"
              >
            </el-pagination>
          </div>
        </div>
      </ui-line-tittle>
      <span slot="footer" class="dialog-footer">
        <!-- <el-button @click="dialogDetailVisibleCode = false">返 回</el-button> -->
      </span>
    </el-dialog>

    <!-- 审核 -->
    <el-dialog
      title="审核"
      :visible.sync="isCheckDialogShow"
      :append-to-body="true"
      width="50%"
      center>
      <div class="check-dialog-wrapper">
        <el-form ref="form" :model="checkInfo" label-width="80px">
          <el-form-item label="审核结果">
            <el-radio-group v-model="checkInfo.status">
              <el-radio label="审核通过" value="2"></el-radio>
              <el-radio label="审核不通过" value="9"></el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="审核意见">
            <el-input type="textarea" v-model="checkInfo.remark"></el-input>
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="isCheckDialogShow = false">取 消</el-button>
        <el-button type="primary" @click='check()'>审 核</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import NoticeBar from '@/components/notice-bar'
import LineTittle from '@/components/line-tittle'
import LabelText from '@/components/label-text'
import { mapActions } from 'vuex'
import IsEmpty from '@/utils/IsEmpty'
import {
  api
} from '@/api/lifeInsur_mgr/lifeInsureBillMake.js'
export default {
  name: '',
  data () {
    return {
      info: {
        comCode: '',
        comName: '',
        companyCode: '',
        companyName: '',
        yearMouth: '',
        batch: '',
        currentPage: 1,
        pageSize: 10
      },
      quanxian: {
        query: true,
        export: true,
        trace: true,
        review: true
      },
      dialogTableVisibleCode: false, // 双击
      dialogTableVisibleCode1: false, // 双击
      dialogDetailVisibleCode: false, // 详情
      dialogTrackVisibleCode: false,
      fileList: [],
      tableData: [],
      dbselected: {},
      multipleSelection: [], // 查询结果选中数据
      insCom: [],
      checkInfo: {
        status: '',
        remark: ''
      },
      isTableShow: false,
      tablePage: {
        currentPage: 1,
        total: 0,
        size: 10
      },
      dialogPage: {
        currentPage: 1,
        total: 0,
        size: 10
      },
      batchList: [{
        value: '01',
        label: '01'
      }, {
        value: '02',
        label: '02'
      }, {
        value: '03',
        label: '03'
      }, {
        value: '04',
        label: '04'
      }],
      loading: '',
      orgQueryInfo: {
        clickType: '2',
        comCodeOrName: '',
        currentPage: 1,
        pageSize: 10
      },
      companyQueryInfo: {
        type: '2',
        clickType: '2',
        insurerCode: '',
        insurerName: '',
        currentPage: 1,
        pageSize: 10
      },
      isCheckDialogShow: false,
      detailPageSize: 10,
      detailCurrentPage: 1,
      DialogTableAllData: [],
      DialogTableShowData: [],
      queryrules: {
        comCode: [
          { required: true, message: '请输入佰盈公司代码', trigger: 'change' }
        ],
        comName: [
          { required: true, message: '请输入佰盈公司名称', trigger: 'change' }
        ],
        batch: [
          { required: true, message: '请输入批次', trigger: 'blur' }
        ]
      }
    }
  },
  mounted () {
    api(`/auth/findButtonByUserCodeAndPage?userId=${this.$store.state.login.loginUserId}&page=寿险运营部审核`, 'get').then(result => {
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
    opensingleComDialog (index) {
      if (!(this.dialogTableVisibleCode || this.dialogTableVisibleCode1)) {
        switch (index) {
          case 0:
            this.companyQueryInfo.clickType = '1'
            this.companyQueryInfo.insurerCode = this.info.companyCode
            this.companyQueryInfo.insurerName = this.info.companyName
            this.commissionConfigdblqueryCom1(this.companyQueryInfo).then(
              (res) => {
                if (res.data.code !== '000000' && !IsEmpty(res.data.code)) {
                  this.openToast('warning', res.data.msg)
                } else {
                  if (res.data.data.data.length === 1) {
                    this.info.companyCode = res.data.data.data[0].insurercode
                    this.info.companyName = res.data.data.data[0].insurername
                  }
                }
              }
            )
            break
          case 1:
            this.orgQueryInfo.clickType = '1'
            if (!IsEmpty(this.info.comCode)) {
              this.orgQueryInfo.comCodeOrName = this.info.comCode
            } else if (!IsEmpty(this.info.comName)) {
              this.orgQueryInfo.comCodeOrName = this.info.comName
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
                    this.info.comCode = res.data.data.data[0].comCode
                    this.info.comName = res.data.data.data[0].comCName
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
    // toast提示
    openToast (type, mesg) {
      this.$message({
        showClose: true,
        message: mesg,
        type: type
      })
    },
    dbSubmit () {
      this.info = this.dbselected
      this.dialogTableVisibleCode = false
    },
    // 1. 接口、返回数据显示
    dbQuery (flag) {
      if (flag === 1) {
        this.dialogPage.currentPage = 1
        this.dialogPage.pageSize = 10
        this.info.currentPage = 1
        this.info.pageSize = 10
      } else {
        this.info.currentPage = this.dialogPage.currentPage
        this.info.pageSize = this.dialogPage.pageSize
      }
      this.orgQueryInfo.clickType = '2'
      if (!IsEmpty(this.info.comCode)) {
        this.orgQueryInfo.comCodeOrName = this.info.comCode
      } else if (!IsEmpty(this.info.comName)) {
        this.orgQueryInfo.comCodeOrName = this.info.comName
      } else {
        this.orgQueryInfo.comCodeOrName = ''
      }
      this.orgQueryInfo.currentPage = this.dialogPage.currentPage
      this.orgQueryInfo.pageSize = this.dialogPage.pageSize
      this.getComBillView(this.orgQueryInfo).then(
        () => {
          if (!IsEmpty(this.$store.state.billView.comData)) {
            if (this.$store.state.billView.comData.code !== '000000' && !IsEmpty(this.$store.state.billView.comData.code)) {
              this.openToast('warning', this.$store.state.billView.comData.msg)
            } else {
              this.dialogTableVisibleCode = true
            }
          }
        }
      )
    },
    dbQueryCom (flag) {
      if (flag === 1) {
        this.dialogPage.currentPage = 1
        this.dialogPage.pageSize = 10
        this.info.currentPage = 1
        this.info.pageSize = 10
      } else {
        this.info.currentPage = this.dialogPage.currentPage
        this.info.pageSize = this.dialogPage.pageSize
      }
      this.companyQueryInfo.clickType = '2'
      this.companyQueryInfo.currentPage = this.dialogPage.currentPage
      this.companyQueryInfo.pageSize = this.dialogPage.pageSize
      this.companyQueryInfo.insurerCode = this.info.companyCode
      this.companyQueryInfo.insurerName = this.info.insurerName
      this.getInsuranceCom(this.companyQueryInfo).then(
        () => {
          if (!IsEmpty(this.$store.state.riskMgr.riskAllDataCheck)) {
            if (this.$store.state.riskMgr.riskAllDataCheck.code !== '000000' && !IsEmpty(this.$store.state.riskMgr.riskAllDataCheck.code)) {
              this.openToast('warning', this.$store.state.riskMgr.riskAllDataCheck.msg)
            } else {
              this.dialogTableVisibleCode1 = true
            }
          }
        }
      )
    },
    dbComSubmit () {
      this.info = this.dbselected
      this.dialogTableVisibleCode1 = false
    },
    handleRowChange (row) {
      this.dbselected.comCode = row.comCode
      this.dbselected.comName = row.comCName
      this.dbSubmit()
    },
    handleInsRowChange (row) {
      this.dbselected.companyCode = row.insurercode
      this.dbselected.companyName = row.insurername
      this.dbComSubmit()
    },
    handleQuery () {
      this.tablePage.currentPage = 1
      this.tablePage.pageSize = 10
      this.getHandleQuery()
    },
    getHandleQuery () {
      this.Loading()
      this.info.currentPage = this.tablePage.currentPage
      this.info.pageSize = this.tablePage.pageSize
      this.$refs['queryForm'].validate((valid) => {
        if (valid) {
          this.isTableShow = true
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
            batch: '',
            currentPage: '',
            pageSize: ''}
          temp.comCode = this.info.comCode
          temp.comName = this.info.comName
          temp.companyCode = this.info.companyCode
          temp.companyName = this.info.companyName
          temp.verifyStatus = this.info.verifyStatus
          temp.status = this.info.status
          temp.yearMouth = this.info.yearMouth
          temp.startDate = IsEmpty(this.info.startDate) ? null : this.info.startDate
          temp.endDate = IsEmpty(this.info.endDate) ? null : this.info.endDate
          temp.batch = this.info.batch
          temp.currentPage = this.info.currentPage
          temp.pageSize = this.info.pageSize
          this.queryBillView(temp).then(
            () => {
              this.closeLoading()
            }
          )
        } else {
          this.closeLoading()
          console.log('error submit!!')
          return false
        }
      })
    },
    handleExport () {
      this.$refs['queryForm'].validate((valid) => {
        if (valid) {
          let expData = {
            comCode: '',
            comName: '',
            companyCode: '',
            companyName: '',
            verifyStatus: '',
            status: '',
            startDate: '',
            endDate: '',
            batch: ''}
          expData.companyCode = this.info.companyCode ? this.info.companyCode : ''
          expData.companyName = this.info.companyName ? this.info.companyName : ''
          expData.comCode = this.info.comCode ? this.info.comCode : ''
          expData.comName = this.info.comName ? this.info.comName : ''
          expData.batch = this.info.batch ? this.info.batch : ''
          expData.verifyStatus = this.info.verifyStatus ? this.info.verifyStatus : ''
          expData.startDate = this.info.startDate ? this.info.startDate : null
          expData.endDate = this.info.endDate ? this.info.endDate : null
          expData.status = this.info.status ? this.info.status : ''
          window.open('/tabycore/lifeCharge/downloadLifeChargePoundageRecons?companyCode=' + expData.companyCode + '&companyName=' + expData.companyName + '&comCode=' + expData.comCode + '&comName=' + expData.comName + '&batch=' + expData.batch + '&verifyStatus=' + expData.verifyStatus + '&startDate=' + expData.startDate + '&endDate=' + expData.endDate + '&status=' + expData.status)
          // this.expBillView(this.info)
        } else {
          return false
        }
      })
    },
    handleTrack () {
      if (IsEmpty(this.info.yearMouth)) {
        this.openToast('warning', '请输入结算年月')
        return
      } else if (this.info.yearMouth.length !== 6) {
        this.openToast('warning', '结算年月格式不正确')
      } else {
        let temp1 = false
        if (this.info.yearMouth.slice(0, 1) !== '2') {
          temp1 = true
        }
        if (this.info.yearMouth.slice(1, 2) !== '0') {
          temp1 = true
        }
        if (parseInt(this.info.yearMouth.slice(4, 5)) > 1) {
          temp1 = true
        }
        if (temp1) {
          this.openToast('warning', '结算年月格式不正确')
          return
        }
      }
      if (IsEmpty(this.info.companyCode)) {
        this.openToast('warning', '请输入保险公司代码')
      } else if (IsEmpty(this.info.companyName)) {
        this.openToast('warning', '请输入保险公司名称')
      } else if (this.info.comCode === '01' || this.info.comName === '总公司') {
        this.openToast('warning', '当前查询佰盈机构为总公司，无法进行轨迹查询')
        this.info.comCode = ''
        this.info.comName = ''
      } else {
        this.$refs['queryForm'].validate((valid) => {
          if (valid) {
            let temp = {
              comCode: '',
              comName: '',
              companyCode: '',
              companyName: '',
              verifyStatus: '',
              status: '',
              startDate: '',
              endDate: '',
              batch: '',
              yearMouth: ''}
            temp.comCode = this.info.comCode
            temp.comName = this.info.comName
            temp.companyCode = this.info.companyCode
            temp.companyName = this.info.companyName
            temp.verifyStatus = this.info.verifyStatus
            temp.status = this.info.status
            temp.startDate = IsEmpty(this.info.startDate) ? null : this.info.startDate
            temp.endDate = IsEmpty(this.info.endDate) ? null : this.info.endDate
            temp.batch = this.info.batch
            temp.yearMouth = this.info.yearMouth
            this.queryTrack(temp).then(
              () => {
                this.openToast('success', `轨迹查询结果：${this.msg}`)
              })
          } else {
            return false
          }
        })
      }
    },
    handleCheck () {
      if (this.multipleSelection.length === 0) {
        this.$message({
          showClose: true,
          message: '请先选择数据记录！',
          type: 'error'
        })
      } else {
        let arr = []
        this.multipleSelection.forEach((ele, index) => {
          // to do 已结算、已审核
          if (ele.verifyStatus !== '待审核') {
            this.isCheckDialogShow = false
            this.$message({
              showClose: true,
              message: '仅可对待审核的记录进行审核',
              type: 'error'
            })
          } else {
            this.isCheckDialogShow = true
            arr.push(this.multipleSelection[index].batchNo)
            this.checkInfo.reconno = arr.join()
            this.checkInfo.remark = ''
          }
        })
      }
    },
    dialogOnclose () {
      this.info.comCode = ''
      this.info.comName = ''
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
      // switch (index) {
      //   case 0:
      //     this.info.comCode = ''
      //     this.info.comName = ''
      //     break
      //   case 1:
      //     this.info.companyCode = ''
      //     this.info.companyName = ''
      //     break
      //   default:
      //     break
      // }
      this.dialogTableVisibleCode = false
      this.dialogTableVisibleCode1 = false
    },
    dialogOnclose1 () {
      this.info.companyCode = ''
      this.info.companyName = ''
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
      this.dialogTableVisibleCode = false
      this.dialogTableVisibleCode1 = false
    },
    handleCurrentChange (val) {
      this.tablePage.currentPage = val
      this.getHandleQuery()
    },
    handleSizeChange (val) {
      this.tablePage.pageSize = val
      this.tablePage.currentPage = 1
      this.getHandleQuery()
    },
    handledbSizeChange (val) {
      this.dialogPage.currentPage = 1
      this.dialogPage.pageSize = val
      this.dbQuery(2)
    },
    handledbInsSizeChange (val) {
      this.dialogPage.currentPage = 1
      this.dialogPage.pageSize = val
      this.dbQueryCom(2)
    },
    handleDialogCurrentChange (val) {
      this.dialogPage.currentPage = val
      this.dbQuery(2)
    },
    handleComDialogCurrentChange (val) {
      this.dialogPage.currentPage = val
      this.dbQueryCom(2)
    },
    ...mapActions([
      'getInsuranceCom',
      'queryTrack',
      'queryBillView',
      'getBillDetail',
      'checkBillView',
      'expBillView',
      'getComBillView',
      'commissionConfigdblqueryCom1',
      'contiListCheckDialogDataGet1'
    ]),
    handleSelectionChange (val) {
      this.multipleSelection = val
    },
    handleDetail (row) {
      let currentBatchNo = {}
      currentBatchNo.batchNO = row.batchNo
      this.getBillDetail(row.batchNo).then(
        () => {
          this.dialogDetailVisibleCode = true
          this.DialogTableAllData = this.$store.state.billView.billDetailData.lifeChargeCompareDetail
          if (this.DialogTableAllData.length > 10) {
            this.DialogTableShowData = this.DialogTableAllData.slice(0, 9)
          } else {
            this.DialogTableShowData = this.DialogTableAllData
          }
        }
      )
    },
    baiyingchange (index) { // 清空佰盈name或code
      switch (index) {
        case 1:
          if (IsEmpty(this.info.comCode)) {
            this.info.comName = ''
            this.$refs.baiyingNameText.value = ''
          }
          break
        case 2:
          if (IsEmpty(this.info.comName)) {
            this.info.comCode = ''
            this.$refs.baiyingCodeText.value = ''
          }
          break
        default:
          break
      }
    },
    baoxianChange (index) { // 清空保险公司name或code
      switch (index) {
        case 1:
          if (IsEmpty(this.info.companyCode)) {
            this.info.companyName = ''
            this.$refs.baoxianNameText.value = ''
          }
          break
        case 2:
          if (IsEmpty(this.info.companyName)) {
            this.info.companyCode = ''
            this.$refs.baoxianCodeText.value = ''
          }
          break
        default:
          break
      }
    },
    detailHandleCurrentChange (val) {
      this.detailCurrentPage = val
      this.DialogTableShowData = this.DialogTableAllData.slice((parseInt(val) * parseInt(this.detailPageSize) - parseInt(this.detailPageSize)), (parseInt(val) * parseInt(this.detailPageSize) - 1))
    },
    detailHandleSizeChange (val) {
      this.detailCurrentPage = 1
      this.detailPageSize = val
      this.DialogTableShowData = this.DialogTableAllData.slice(0, this.detailPageSize - 1)
    },
    check () {
      if (IsEmpty(this.checkInfo.status)) {
        this.openToast('warning', '请勾选审核结果')
      } else {
        if (this.checkInfo.status === '审核通过') {
          this.checkInfo.status = 2
        } else if (this.checkInfo.status === '审核不通过') {
          this.checkInfo.status = 9
        }
        let param = {}
        param.LifeChargeVerifyVO = {
          status: this.checkInfo.status,
          remark: this.checkInfo.remark
        }
        param.reconno = this.checkInfo.reconno
        if (this.checkInfo.status !== 2 && this.checkInfo.status !== 9) {
          this.openToast('warning', '请勾选审核结果')
        } else {
          this.Loading()
          this.checkBillView(this.checkInfo).then(
            (res) => {
              this.isCheckDialogShow = false
              if (res.data === '操作成功!') {
                this.openToast('success', res.data)
              } else {
                this.openToast('warning', res.data)
              }
            }
          ).then(
            () => {
              this.tablePage.currentPage = 1
              this.getHandleQuery()
            }
          )
        }
        this.isCheckDialogShow = false
      }
    }
  },
  components: {
    [NoticeBar.name]: NoticeBar,
    [LineTittle.name]: LineTittle,
    [LabelText.name]: LabelText
  },
  created () {
  },
  computed: {
    fenyetotalData1 () {
      return this.DialogTableAllData.length
    },
    billQueryData () {
      return this.$store.state.billView.billQueryData
    },
    msg () {
      return this.$store.state.billView.msg
    },
    totalRecords () {
      return parseInt(this.$store.state.billView.billTotalRecords)
    },
    insComData () {
      if (IsEmpty(this.$store.state.riskMgr.insComData)) {
        return []
      } else {
        return this.$store.state.riskMgr.insComData
      }
    },
    billDetailData () {
      let temp = this.$store.state.billView.billDetailData
      switch (temp.verifyStatus) {
        case '1':
          temp.verifyStatus = '运营待审核'
          break
        case '2':
          // if (temp.status === '1') {
          //   temp.verifyStatus = '财务未审核'
          // }
          // if (temp.status === '2') {
          //   temp.verifyStatus = '财务复核通过'
          // }
          // if (temp.status === '3') {
          //   temp.verifyStatus = '财务审核通过'
          // }
          // console.log(temp.status)
          temp.verifyStatus = temp.status
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
    dbtotalRecords () {
      return parseInt(this.$store.state.riskMgr.dbtotalRecords)
    },
    dbcomData () {
      if (IsEmpty(this.$store.state.billView.comData)) {
        return []
      } else {
        return this.$store.state.billView.comData.data.data
      }
    },
    dbcomTotal () {
      if (IsEmpty(this.$store.state.billView.comData)) {
        return 0
      } else {
        return this.$store.state.billView.comData.data.totalRecords
      }
    }
  }
}
</script>

<style lang="scss" scoped type="text/css">
#billView {
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
.datestyle {
  display: inline-block;
}
.el-pagination {
  text-align: right;
  margin-top: 10px;
}
.tableButton {
  cursor: pointer;
  color: #66B1FF;
}
</style>
