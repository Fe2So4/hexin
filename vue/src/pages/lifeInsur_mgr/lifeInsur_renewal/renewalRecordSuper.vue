<template>
  <div id="riskIndex" >
      <ui-notice-bar slot="breadcast" >
        <el-breadcrumb slot="location" separator=">">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>寿险业务管理</el-breadcrumb-item>
            <el-breadcrumb-item>寿险续期保单管理</el-breadcrumb-item>
            <el-breadcrumb-item>续期保单回录超级权限</el-breadcrumb-item>
          </el-breadcrumb>
      </ui-notice-bar>
      <el-form :model="recordData" :rules="queryrules" ref="queryForm" >
        <ui-line-tittle :collapsible="true" >
          <span slot="title" >
            <i class="font_family icon-jy-menu-4" ></i>基本信息
          </span>
          <div class="ri-content" slot="content" >
            <el-row class="ri-line">
              <el-col :span="12">
                <!-- :rules="[{ required: true, message: '请输入保单号', trigger: 'blur' }]" 校验的删除-->
                <el-form-item class="policyNo" prop="policyNo" >
                  <ui-label-text :required="true" labelWidth="130" label="保单号:" >
                    <el-input v-model="info.policyNo" size="mini" slot="text" placeholder="" clearable @blur="handleBulr"></el-input>
                  </ui-label-text>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <ui-label-text labelWidth="130" label="投保单号:" >
                  <span slot="text">{{recordData.lifeRenewalPolicyInfoVo.proposalNo}}</span>
                </ui-label-text>
              </el-col>
            </el-row>
            <el-row class="ri-line">
              <el-col :span="12">
              <ui-label-text labelWidth="130" label="承保日期:" >
                <span slot="text">{{recordData.lifeRenewalPolicyInfoVo.acceptDate}}</span>
                <!-- <el-input v-model="recordData.lifeRenewalPolicyInfoVo.acceptDate" slot="text" placeholder="" clearable></el-input> -->
              </ui-label-text>
              </el-col>
              <el-col :span="12">
              <ui-label-text labelWidth="130" label="生效日期:" >
                <span slot="text">{{recordData.lifeRenewalPolicyInfoVo.effectDate}}</span>
                <!-- <el-input v-model="recordData.lifeRenewalPolicyInfoVo.effectDate" slot="text" placeholder="" clearable></el-input> -->
              </ui-label-text>
              </el-col>
            </el-row>
            <el-row class="ri-line">
              <el-col :span="12">
              <ui-label-text labelWidth="130" label="投保日期:" >
                <span slot="text">{{recordData.lifeRenewalPolicyInfoVo.proposalDate}}</span>
                <!-- <el-input v-model="recordData.lifeRenewalPolicyInfoVo.proposalDate" slot="text" placeholder="" clearable></el-input> -->
              </ui-label-text>
              </el-col>
              <el-col :span="12">
              <ui-label-text labelWidth="130" label="保单状态:" >
                <!-- <span slot="text">{{recordData.lifeRenewalPolicyInfoVo.policyStatus}}</span> -->
                <el-select v-model="recordData.lifeRenewalPolicyInfoVo.policyStatus" slot="text" disabled>
                  <el-option
                    v-for="item in policyStatusList"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </ui-label-text>
              </el-col>
            </el-row>
            <el-row class="ri-line">
              <el-col :span="12">
              <ui-label-text labelWidth="130" label="归属保险公司代码:" >
                <span slot="text">{{recordData.lifeRenewalPolicyInfoVo.companyCode}}</span>
              </ui-label-text>
              </el-col>
              <el-col :span="12">
              <ui-label-text labelWidth="130" label="归属保险公司名称:" >
                <span slot="text">{{recordData.lifeRenewalPolicyInfoVo.companyName}}</span>
              </ui-label-text>
              </el-col>
            </el-row>
            <el-row class="ri-line">
              <el-col :span="12">
              <ui-label-text labelWidth="130" label="归属保险公司机构代码:" >
                <span slot="text">{{recordData.lifeRenewalPolicyInfoVo.companyComCode}}</span>
              </ui-label-text>
              </el-col>
              <el-col :span="12">
              <ui-label-text labelWidth="130" label="归属保险公司机构名称:" >
                <span slot="text">{{recordData.lifeRenewalPolicyInfoVo.companyComName}}</span>
              </ui-label-text>
              </el-col>
            </el-row>
            <el-row class="ri-line">
              <el-col :span="12">
              <ui-label-text labelWidth="130" label="新/续期标记:" >
                <span slot="text">{{recordData.lifeRenewalPolicyInfoVo.xqFlag}}</span>
              </ui-label-text>
              </el-col>
              <el-col :span="12">
              <ui-label-text labelWidth="130" label="缴至日期:" >
                <span slot="text">{{recordData.lifeRenewalPolicyInfoVo.jzDate}}</span>
                <!-- <el-input v-model="recordData.lifeRenewalPolicyInfoVo.jzDate" slot="text" placeholder="" clearable></el-input> -->
              </ui-label-text>
              </el-col>
            </el-row>
            <el-row class="ri-line">
              <el-col :span="12">
              <ui-label-text labelWidth="130" label="保单年度:" >
                <span slot="text">{{recordData.lifeRenewalPolicyInfoVo.bdYear}}</span>
              </ui-label-text>
              </el-col>
              <el-col :span="12">
              <ui-label-text labelWidth="130" label="更新日期:" >
                <!-- <span slot="text">{{recordData.lifeRenewalPolicyInfoVo.updateTime}}</span> -->
                <!--<span slot="text">{{info.updateTime}}</span>-->
                <el-date-picker :disabled='allInput' format="yyyy-MM-dd HH:mm:ss" value-format="timestamp" v-model="recordData.lifeRenewalPolicyInfoVo.updateTime" slot="text" type="date" placeholder="选择日期"></el-date-picker>
              </ui-label-text>
              </el-col>
            </el-row>
            <el-row class="ri-line">
              <el-col :span="12">
              <ui-label-text labelWidth="130" label="自保件:" >
                <span slot="text">{{recordData.lifeRenewalPolicyInfoVo.aaa}}</span>
              </ui-label-text>
              </el-col>
            </el-row>
          </div>
        </ui-line-tittle>
        <ui-line-tittle :collapsible="true" >
          <span slot="title" >
            <i class="font_family icon-jy-menu-4" ></i>投保人信息
          </span>
          <div class="ri-content" slot="content" >
            <el-row class="ri-line">
              <el-col :span="12">
              <ui-label-text labelWidth="130" label="投保人代码:" >
                <span slot="text">{{recordData.lifeRenewalPartyInfoVo.customerId}}</span>
              </ui-label-text>
              </el-col>
              <el-col :span="12">
                <ui-label-text labelWidth="130" label="投保人名称:" >
                  <span slot="text">{{recordData.lifeRenewalPartyInfoVo.customerName}}</span>
                </ui-label-text>
              </el-col>
            </el-row>
            <el-row class="ri-line">
              <el-col :span="12">
              <ui-label-text labelWidth="130" label="证件类型:" >
                <span slot="text">{{recordData.lifeRenewalPartyInfoVo.idType | certificateType}}</span>
              </ui-label-text>
              </el-col>
              <el-col :span="12">
              <ui-label-text labelWidth="130" label="证件号码:" >
                <span slot="text">{{recordData.lifeRenewalPartyInfoVo.idNo}}</span>
              </ui-label-text>
              </el-col>
            </el-row>
            <el-row class="ri-line">
              <el-col :span="12">
              <ui-label-text labelWidth="130" label="固定电话:" >
                <span slot="text">{{recordData.lifeRenewalPartyInfoVo.homePhone}}</span>
              </ui-label-text>
              </el-col>
              <el-col :span="12">
              <ui-label-text labelWidth="130" label="移动电话:" >
                <span slot="text">{{recordData.lifeRenewalPartyInfoVo.phone}}</span>
              </ui-label-text>
              </el-col>
            </el-row>
          </div>
        </ui-line-tittle>
        <ui-line-tittle :collapsible="true" >
          <span slot="title" >
            <i class="font_family icon-jy-menu-4" ></i>业务员信息
          </span>
          <div class="ri-content" slot="content" >
            <el-row class="ri-line">
              <el-col :span="12">
              <ui-label-text labelWidth="130" label="业务员代码:" >
                <span slot="text">{{recordData.lifeRenewalPolicyInfoVo.agentCode}}</span>
              </ui-label-text>
              </el-col>
              <el-col :span="12">
                <ui-label-text labelWidth="130" label="业务员名称:" >
                  <span slot="text">{{recordData.lifeRenewalPolicyInfoVo.agentName}}</span>
                </ui-label-text>
              </el-col>
            </el-row>
            <el-row class="ri-line">
              <el-col :span="12">
              <ui-label-text labelWidth="130" label="归属机构/部门代码:" >
                <span slot="text">{{recordData.lifeRenewalPolicyInfoVo.comCode}}</span>
              </ui-label-text>
              </el-col>
              <el-col :span="12">
              <ui-label-text labelWidth="130" label="归属机构/部门名称:" >
                <span slot="text">{{recordData.lifeRenewalPolicyInfoVo.comName}}</span>
              </ui-label-text>
              </el-col>
            </el-row>
            <el-row class="ri-line">
              <el-col :span="12">
              <ui-label-text labelWidth="130" label="介绍人类型:" >
                <span slot="text">{{recordData.lifeRenewalPolicyInfoVo.introduceType}}</span>
              </ui-label-text>
              </el-col>
              <el-col :span="12">
              <ui-label-text labelWidth="130" label="介绍人代码:" >
                <span slot="text">{{recordData.lifeRenewalPolicyInfoVo.introduceCode}}</span>
              </ui-label-text>
              </el-col>
            </el-row>
            <el-row class="ri-line">
              <el-col :span="12">
              <ui-label-text labelWidth="130" label="介绍人姓名:" >
                <span slot="text">{{recordData.lifeRenewalPolicyInfoVo.introduceName}}</span>
              </ui-label-text>
              </el-col>
              <el-col :span="12">
              <ui-label-text labelWidth="130" label="离职单服务人员:" >
                <span slot="text">{{recordData.lifeRenewalPolicyInfoVo.agentTypeName}}</span>
              </ui-label-text>
              </el-col>
            </el-row>
            <el-row class="ri-line">
              <el-col :span="12">
              <ui-label-text labelWidth="130" label="联系人电话:" >
                <span slot="text">{{recordData.lifeRenewalPolicyInfoVo.agentPhone}}</span>
              </ui-label-text>
              </el-col>
            </el-row>
          </div>
        </ui-line-tittle>
        <ui-line-tittle :collapsible="true" >
          <span slot="title" >
            <i class="font_family icon-jy-menu-4" ></i>险种信息
          </span>
          <div class="ri-content" slot="content" >
            <el-table
              :data="recordData.lifeRenewalRiskInfoListVo"
              style="width: 100%">
              <el-table-column
                label="险种代码"
                >
                <template slot-scope="scope">
                  <span style="margin-left: 10px">{{ scope.row.riskCode }}</span>
                </template>
              </el-table-column>
              <el-table-column
                label="险种名称"
                >
                <template slot-scope="scope">
                  <span style="margin-left: 10px">{{ scope.row.riskName }}</span>
                </template>
              </el-table-column>
              <el-table-column
                label="主/附险标记"
                >
                <template slot-scope="scope">
                  <span style="margin-left: 10px">{{ scope.row.mainFlag | mainFlagType }}</span>
                </template>
              </el-table-column>
              <el-table-column
                label="缴费年期"
                >
                <template slot-scope="scope">
                  <span style="margin-left: 10px">{{ scope.row.paymentperiod }}</span>
                </template>
              </el-table-column>
              <el-table-column
                label="缴费频率"
                >
                <template slot-scope="scope">
                  <span style="margin-left: 10px">{{ scope.row.payType | payFrequencyType}}</span>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </ui-line-tittle>
        <ui-line-tittle :collapsible="true" >
          <span slot="title" >
            <i class="font_family icon-jy-menu-4" ></i>缴费信息
          </span>
          <div class="ri-content spc-width" slot="content" >
            <el-table
              :data="recordData.lifeRenewalPolicyChargeListVo"
              style="width: 100%">
              <el-table-column
                label="险种代码"
              >
                <template slot-scope="scope">
                  <span style="margin-left: 10px">{{ scope.row.riskCode }}</span>
                </template>
              </el-table-column>
              <el-table-column
                label="险种名称"
              >
                <template slot-scope="scope">
                  <span style="margin-left: 10px">{{ scope.row.riskName }}</span>
                </template>
              </el-table-column>
              <el-table-column
                label="实收保费">
                <template slot-scope="scope">
                  <el-form-item
                    class="dis-center"
                    :prop="'lifeRenewalPolicyChargeListVo.' + scope.$index + '.paidPremium'"
                    :rules="[{ required: true, message: '请输入实收保费', trigger: 'blur' }]"
                    >
                    <ui-label-text :required="true" class="dis-center">
                      <el-input v-model="scope.row.paidPremium" size="mini" slot="text" placeholder="" @blur="onBlurPaidPremium"></el-input>
                    </ui-label-text>
                  </el-form-item>
                </template>
              </el-table-column>
              <el-table-column
                label="实收日期"
                center
                >
                <template slot-scope="scope" class="dis-center">
                  <!-- <span style="margin-left: 10px">{{ scope.row.riskName }}</span> -->
                  <el-date-picker v-model="scope.row.paidDate" type="date" placeholder="" value-format="yyyy-MM-dd"></el-date-picker>
                </template>
              </el-table-column>
              <el-table-column label="操作">
                <template slot-scope="scope" v-if="scope.row.mainFlag!=0">
                  <el-button
                    size="mini"
                    type="danger"
                    v-if ="scope.row.mainFlag!='1'"
                    @click="handleDelete(scope.$index, scope.row, recordData.lifeRenewalPolicyChargeListVo)">删除</el-button>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </ui-line-tittle>
        <ui-line-tittle :collapsible="true" >
          <span slot="title" >
            <i class="font_family icon-jy-menu-4" ></i>总计
          </span>
          <div class="ri-content" slot="content" >
            <el-row class="ri-line">
              <el-col :span="12">
              <ui-label-text labelWidth="130" label="应缴保费总计:" >
                <span slot="text">{{recordData.lifeRenewalPolicyInfoVo.sumPremium}}</span>
              </ui-label-text>
              </el-col>
              <el-col :span="12">
                <ui-label-text labelWidth="130" :required="true" label="实收保费总计:" >
                  <span slot="text">{{recordData.lifeRenewalPolicyInfoVo.paidPremium}}</span>
                </ui-label-text>
              </el-col>
            </el-row>
            <el-row class="ri-line">
              <el-col :span="12">
              <ui-label-text labelWidth="130" label="缴费状态:" >
                <el-select v-model="recordData.lifeRenewalPolicyInfoVo.paymentFlag" slot="text" placeholder="请选择">
                  <el-option
                    label="已缴费"
                    value="0">
                  </el-option>
                  <el-option
                    label="未缴费"
                    value="1">
                  </el-option>
                  <el-option
                    label="保费豁免"
                    value="2">
                  </el-option>
                  <el-option
                    label="缴费回退"
                    value="3">
                  </el-option>
                </el-select>
              </ui-label-text>
              </el-col>
            </el-row>
          </div>
        </ui-line-tittle>
      </el-form>
      <div class="btn-container" slot="controlbar" >
        <el-button type="primary" @click.native.prevent="handleSubmit()">保存</el-button>
        <el-button type="primary" @click.native.prevent="handleImport()">批量导入</el-button>
      </div>

    <el-dialog
      title="批量导入"
      :visible.sync="isUpDialogShow"
      :append-to-body="true"
      width="50%"
      center>
      <el-upload class="upload-demo" ref="upload" name="file" :on-success="handleEXLSuccess" :action="uploadUrl()" :limit="1" accept='xls' :data="uploadData" :file-list="fileList" :auto-upload="false">
        <el-button class="btn-container1" slot="trigger" size="small" type="primary">选取文件</el-button>
        <el-button type="text" @click="downTem()" size="small" >模板下载</el-button>
      </el-upload>
      <div class="download2">
        <el-button class="btn-container1" style="margin-left: 10px;" size="small" type="success" @click="submitUpload" >上传文件</el-button>
      </div>
    </el-dialog>

    <!-- 提示 -->
    <el-dialog
      title="提示"
      :visible.sync="isDialogShow"
      :append-to-body="true"
      width="50%"
      center>
      {{msg}}
      <span slot="footer" class="dialog-footer">
        <el-button @click="isDialogShow = false">取 消</el-button>
        <el-button type="primary" @click='handleDetermine()'>确定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import NoticeBar from '@/components/notice-bar'
import LineTittle from '@/components/line-tittle'
import LabelText from '@/components/label-text'
import RiskImport from '@/pages/goodsCommRate_mgr/riskImport'
import { mapActions } from 'vuex'
export default {
  name: '',
  data () {
    return {
      allInput: false,
      info: {
        policyNo: ''
      },
      loading: '',
      disabled: true,
      uploadData: {type: '2'},
      fileList: [],
      tableData: [
        {
          insurerCode: '00',
          insurerName: 'aa',
          riskCode: '123',
          riskName: 'aa'
        }
      ],
      policyStatusList: [
        {
          value: ':',
          label: ''
        },
        {
          value: '2',
          label: '有效'
        },
        {
          value: '3',
          label: '拒保'
        }
      ],
      msg: '',
      status: 0,
      uploadType: '2',
      empty: {
        lifeRenewalPolicyInfoVo: {},
        lifeRenewalPartyInfoVo: {},
        lifeRenewalPolicyChargeListVo: [],
        lifeRenewalRiskInfoListVo: []
      },
      isDialogShow: false, // 投保人
      isUpDialogShow: false, // 上传弹窗
      queryrules: {
        // policyNo: [
        //   { required: true, message: '请输入保单号', trigger: 'blur' }
        // ],
        paidPremium: [
          { required: true, message: '请输入实收保费', trigger: 'blur' },
          { type: 'number', message: '只能输入数字', trigger: 'blur' }
        ]
      }
    }
  },
  mounted () {
    this.$nextTick(function () {
      // 初始化数据
      console.log(this.info)
      this.getDate()
    // this.getSelectDataType()
    })
  },
  methods: {
    // initDate () {
    //   let currentDate = new` Date()
    //   let currentYear = currentDate.getFullYear()
    //   let currentMonth = currentDate.getMonth() + 1
    //   currentMonth = currentMonth > 9 ? currentMonth : '0' + currentMonth
    //   let currentDay = currentDate.getDate()
    //   this.info.updateTime = currentYear + '-' + currentMonth + '-' + currentDay
    // },
    submitUpload () {
      this.Loading()
      this.$refs.upload.submit()
    },
    handleBulr () {
      // 00015061681202036

      // 00090604889008088
      if (this.info.policyNo) {
        this.isBackRecord(this.info).then(resp => {
          console.log(resp)
          this.allInput = true
          this.isDialogShow = true
          this.status = resp.data.status
          this.msg = `您确定要续期保单回录吗？${resp.data.message}`
        })
      }
    },
    // todo
    handleDetermine () {
      // 是否满足条件
      this.isDialogShow = false
      this.getRecordInfo(this.info).then(resp => {
        this.getDate()
      })
    },
    handleSubmit () {
      // 续期保单的回录时间必须大于等于承保日期1年
      this.$refs['queryForm'].validate((valid) => {
        if (valid) {
          let paramJson = {
            lifeRenewalPolicyInfoVo: {},
            lifeRenewalPartyInfoVo: {},
            lifeRenewalPolicyChargeListVo: [],
            lifeRenewalRiskInfoListVo: []
          }
          paramJson.lifeRenewalPolicyInfoVo.acceptDate = this.info.lifeRenewalPolicyInfoVo.acceptDate
          paramJson.lifeRenewalPolicyInfoVo.agentCode = this.info.lifeRenewalPolicyInfoVo.agentCode
          paramJson.lifeRenewalPolicyInfoVo.agentName = this.info.lifeRenewalPolicyInfoVo.agentName
          paramJson.lifeRenewalPolicyInfoVo.agentPhone = this.info.lifeRenewalPolicyInfoVo.agentPhone
          paramJson.lifeRenewalPolicyInfoVo.bdYear = this.info.lifeRenewalPolicyInfoVo.bdYear
          paramJson.lifeRenewalPolicyInfoVo.comCode = this.info.lifeRenewalPolicyInfoVo.comCode
          paramJson.lifeRenewalPolicyInfoVo.comName = this.info.lifeRenewalPolicyInfoVo.comName
          paramJson.lifeRenewalPolicyInfoVo.companyCode = this.info.lifeRenewalPolicyInfoVo.companyCode
          paramJson.lifeRenewalPolicyInfoVo.companyComCode = this.info.lifeRenewalPolicyInfoVo.companyComCode
          paramJson.lifeRenewalPolicyInfoVo.companyComName = this.info.lifeRenewalPolicyInfoVo.companyComName
          paramJson.lifeRenewalPolicyInfoVo.companyName = this.info.lifeRenewalPolicyInfoVo.companyName
          paramJson.lifeRenewalPolicyInfoVo.effectDate = this.info.lifeRenewalPolicyInfoVo.effectDate
          paramJson.lifeRenewalPolicyInfoVo.introduceCode = this.info.lifeRenewalPolicyInfoVo.introduceCode
          paramJson.lifeRenewalPolicyInfoVo.introduceName = this.info.lifeRenewalPolicyInfoVo.introduceName
          paramJson.lifeRenewalPolicyInfoVo.introduceType = this.info.lifeRenewalPolicyInfoVo.introduceType
          paramJson.lifeRenewalPolicyInfoVo.jzDate = this.info.lifeRenewalPolicyInfoVo.jzDate
          paramJson.lifeRenewalPolicyInfoVo.paidPremium = this.info.lifeRenewalPolicyInfoVo.paidPremium // 定位总计
          paramJson.lifeRenewalPolicyInfoVo.paymentFlag = this.info.lifeRenewalPolicyInfoVo.paymentFlag
          paramJson.lifeRenewalPolicyInfoVo.policyNo = this.info.lifeRenewalPolicyInfoVo.policyNo
          paramJson.lifeRenewalPolicyInfoVo.policyStatus = this.info.lifeRenewalPolicyInfoVo.policyStatus
          paramJson.lifeRenewalPolicyInfoVo.proposalDate = this.info.lifeRenewalPolicyInfoVo.proposalDate
          paramJson.lifeRenewalPolicyInfoVo.proposalNo = this.info.lifeRenewalPolicyInfoVo.proposalNo
          paramJson.lifeRenewalPolicyInfoVo.sumPremium = this.info.lifeRenewalPolicyInfoVo.sumPremium // 定位实收
          paramJson.lifeRenewalPolicyInfoVo.Premium = this.info.lifeRenewalPolicyInfoVo.Premium // 定位实收
          paramJson.lifeRenewalPolicyInfoVo.teamCode = this.info.lifeRenewalPolicyInfoVo.teamCode
          paramJson.lifeRenewalPolicyInfoVo.teamName = this.info.lifeRenewalPolicyInfoVo.teamName
          paramJson.lifeRenewalPolicyInfoVo.updateTime = this.info.lifeRenewalPolicyInfoVo.updateTime
          paramJson.lifeRenewalPolicyInfoVo.xqFlag = this.info.lifeRenewalPolicyInfoVo.xqFlag
          paramJson.lifeRenewalPolicyInfoVo.agentTypeName = this.info.lifeRenewalPolicyInfoVo.agentTypeName

          paramJson.lifeRenewalPartyInfoVo.customerId = this.info.lifeRenewalPartyInfoVo.customerId
          paramJson.lifeRenewalPartyInfoVo.customerName = this.info.lifeRenewalPartyInfoVo.customerName
          paramJson.lifeRenewalPartyInfoVo.idType = this.info.lifeRenewalPartyInfoVo.idType
          paramJson.lifeRenewalPartyInfoVo.idNo = this.info.lifeRenewalPartyInfoVo.idNo
          paramJson.lifeRenewalPartyInfoVo.phone = this.info.lifeRenewalPartyInfoVo.phone
          paramJson.lifeRenewalPartyInfoVo.homePhone = this.info.lifeRenewalPartyInfoVo.homePhone

          this.info.lifeRenewalPolicyChargeListVo.forEach((element, i) => {
            paramJson.lifeRenewalPolicyChargeListVo.push(
              {
                riskCode: element.riskCode,
                riskName: element.riskName,
                paidPremium: element.paidPremium,
                paidDate: element.paidDate,
                jfStatus: element.jfStatus
              }
            )
          })

          this.info.lifeRenewalRiskInfoListVo.forEach((element, i) => {
            paramJson.lifeRenewalRiskInfoListVo.push(
              {
                riskCode: element.riskCode,
                riskName: element.riskName,
                mainFlag: element.mainFlag,
                paymentperiod: element.paymentperiod,
                payType: element.payType
              }
            )
          })
          this.submitRecordSave(paramJson).then(resp => {
            if (resp.data.code === '000000') {
              this.$message({
                showClose: true,
                message: resp.data.msg,
                type: 'success'
              })
              this.info = {policyNo: ''}
              this.$store.state.renewal.recordData = {policyNo: '', lifeRenewalPartyInfoVo: {}, lifeRenewalPolicyInfoVo: {}, lifeRenewalRiskInfoListVo: [], lifeRenewalPolicyChargeListVo: []}
            } else {
              this.$message({
                showClose: true,
                message: resp.data.msg,
                type: 'error'
              })
            }
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    ...mapActions([
      'isBackRecord',
      'getRecordInfo',
      'submitRecordSave',
      'deleteRecord',
      'getSelectDataType'
    ]),
    handleImport () {
      this.isUpDialogShow = true
    },
    handleDelete (index, row, tableCurrent) {
      console.log(row)
      // 主险不可删除
      if (row.mainFlag === 1) {
        this.$message({
          showClose: true,
          message: '主险不能进行删除操作，附加险可以',
          type: 'error'
        })
      } else {
        // this.deleteRecord(row)
        tableCurrent.splice(index, 1)
      }
    },
    uploadUrl () {
      return '/tabycore/policyBack/batchImport'
    },
    handleEXLSuccess (response, file, fileList) {
      console.log(response)
      this.closeLoading()
      if (response.code === '000000') {
        this.$message({
          message: response.msg,
          type: 'success'
        })
        this.fileList = []
      } else {
        this.$message({
          message: response.msg,
          type: 'error'
        })
        this.fileList = []
      }
    },
    onBlurPaidPremium (e) {
      let arr = this.info.lifeRenewalPolicyChargeListVo
      let sum = 0
      for (const key in arr) {
        sum += parseFloat(arr[key].paidPremium)
        console.log(sum)
      }
      sum = sum.toFixed(2)
      this.info.lifeRenewalPolicyInfoVo.paidPremium = sum
    },
    downTem () {
      window.open('/tabycore/policyBack/downloadModel?downType=model')
    },
    // 时间处理
    getDate () {
      var timestamp = new Date().getTime()
      this.recordData.lifeRenewalPolicyInfoVo.updateTime = timestamp
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
    }
  },
  components: {
    [NoticeBar.name]: NoticeBar,
    [LineTittle.name]: LineTittle,
    [LabelText.name]: LabelText,
    [RiskImport.name]: RiskImport
  },
  created () {
  },
  computed: {
    recordData: {
      get: function () {
        if (this.$store.state.renewal.recordData) {
          this.info = this.$store.state.renewal.recordData
          this.info.policyNo = this.$store.state.renewal.recordData.lifeRenewalPolicyInfoVo.policyNo
        }
        return this.info
      },
      set: function (value) {
        this.info = value
      }
    }
  }
}
</script>

<style lang="scss" scoped type="text/css">
#riskIndex {
  padding-left: 30px;
  padding-right: 30px;
}
.btn-container {
  text-align: center;
  margin-top: 60px;
  margin-bottom: 30px;
}
.ri-line {
  margin-top: 10px;
  margin-bottom: 10px;
}
.el-pagination {
  text-align: right;
  margin-top: 10px;
}
.dis-center{
  margin: 0;
  padding: 0;
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  .label-text{
    width: 100%;
    text-align: left;
    .el-input {
      width: 100%;
    }
  }
  .el-table{
    height: 23px;;
  }
}
.download {
  text-align: center;
}
</style>

<style lang="scss" type="text/css">
#riskIndex{
  .spc-width{
    .el-input__inner{
      width: 90% !important;
    }
  }
}
.btn-container1{
  margin-left: 15px;
}
.download1 {
  margin-left: 175px
}
.download2 {
  margin: 0 auto;
  text-align: center;
}
.upload-demo { margin-bottom: 20px; text-align: center; }
</style>
