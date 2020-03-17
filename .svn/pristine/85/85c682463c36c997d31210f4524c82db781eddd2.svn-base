<template>
  <div class="wrap">
    <ui-notice-bar slot="breadcast" >
      <el-breadcrumb slot="location" separator=">">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>财险业务管理</el-breadcrumb-item>
        <el-breadcrumb-item>产险保单查询</el-breadcrumb-item>
      </el-breadcrumb>
    </ui-notice-bar>
    <el-form class="verify-content" :model="info" ref="ruleForm" >
      <el-row v-for="(item, index) in queryList" :key="index">
        <el-col :span="12" v-for="i in item" :key="i.arrId">
          <el-form-item :prop="i.model" :rules="i.rules">
            <ui-label-text
             labelWidth="150"
             :label="i.label+':'" >
              <el-select v-model="info[i.model]" slot="text" v-if="i.arrId === 11" placeholder="请选择">
                <el-option
                  v-for="oitem in options"
                  :key="oitem.value"
                  :label="oitem.label"
                  :value="oitem.value">
                </el-option>
              </el-select>
              <el-input
                v-else
                v-model="info[i.model]"
                slot="text"
                :placeholder="i.hint"
                clearable
                :disabled="i.disabled"
                :data-arr="i.arrId">
              </el-input>
            </ui-label-text>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <div class="btn">
      <el-button type="primary" @click="onquery(1)">查询</el-button>
    </div>
    <div class="table" v-show="tableVisible">
      <el-table
        :data="tableData"
        stripe
        style="width: 100%">
        <el-table-column
          v-for="(item, index) in tabelColumList"
          v-if="index > 0"
          :key="index"
          :prop="item.prop"
          :label="item.label"
          :sortable="item.sortable"
          >
          <!-- <el-table-column
            v-if="item.circul"
            v-for="(i, index) in item.child"
            :key="index"
            :prop="i.prop"
            :label="i.label"
            width="120">
          </el-table-column> -->
        </el-table-column>
        <el-table-column
          v-else
          :prop="item.prop"
          :label="item.label"
          :sortable="item.sortable"
          width="180">
          <template slot-scope="scope" >
            <p class="download" :date-code="scope.row[item.prop]" @click="onbillDetails(scope.row)">{{scope.row[item.prop]}}</p>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleDiaCurrentChange"
        :current-page="tablePage.currentPage"
        :page-size="tablePage.size"
        :page-sizes="tablePage.sizes"
        layout="total, sizes, prev, pager, next, jumper"
        :total="tablePage.total">
      </el-pagination>
    </div>
    <!-- billDetails -->
    <el-dialog
      append-to-body
      center
      title="详情"
      :visible.sync="detailVisible"
      width="80%">
        <ui-line-tittle class="dis-bottom"
          :collapsible="true"
          v-for="(item, index) in carInsurance"
          :key="index"
          v-if="item.type === type || item.type === 'all'">
          <span slot="title" >
            <i class="font_family icon-jy-menu-4" ></i>
            <span>{{item.name}}</span>
          </span>
          <div slot="content">
            <el-row class="dis-bottom" v-for="(i, idx) in item.billDetailList" :key="idx">
              <el-col :span="12" v-for="j in i" :key="j.id">
                <ui-label-text
                labelWidth="150"
                :label="j.label+':'"
                  >
                  <el-input
                    v-model="carDetailResp[item.data][j.prop]"
                    :disabled="true"
                    slot="text"
                    clearable
                    :data-arr="j.arrId"
                  >
                  </el-input>
                </ui-label-text>
              </el-col>
            </el-row>
          </div>
        </ui-line-tittle>
      <ui-line-tittle :collapsible="true" >
        <span slot="title" >
            <i class="font_family icon-jy-menu-4" ></i>险种信息
        </span>
        <div class="ri-content" slot="content">
          <el-table ref="multipleTable" stripe  :data="riskInfos" tooltip-effect="dark"  >
            <el-table-column prop="riskCode" label="险种代码"  width="85" show-overflow-tooltip>
            </el-table-column>
            <el-table-column prop="riskname" label="险种名称" width="200" show-overflow-tooltip>
            </el-table-column>
            <el-table-column prop="amount" label="保险金额" width="200" show-overflow-tooltip>
            </el-table-column>
            <el-table-column prop="premium" label="含增值税保费" width="200" show-overflow-tooltip>
            </el-table-column>
            <el-table-column prop="poundageNotTaTx" label="不含增值税保费" width="200" show-overflow-tooltip>
            </el-table-column>
            <el-table-column prop="taPoundageNotTax" label="不含增值税天安保费" width="200" show-overflow-tooltip>
            </el-table-column>
            <el-table-column prop="feeNotTax" label="手续费_不含税" width="200" show-overflow-tooltip>
            </el-table-column>
            <el-table-column prop="feeTax" label="手续费_含税" width="200" show-overflow-tooltip>
            </el-table-column>
            <el-table-column prop="feeRate" label="手续费比例" width="200" show-overflow-tooltip>
            </el-table-column>
            <el-table-column prop="businessPerf" label="业务绩效" width="200" show-overflow-tooltip>
            </el-table-column>
            <el-table-column prop="businessPerfRate" label="业务绩效比例" width="200" show-overflow-tooltip>
            </el-table-column>
            <el-table-column prop="businessUpkeep" label="业务维护费" width="200" show-overflow-tooltip>
            </el-table-column>
            <el-table-column prop="businessUpkeepRate" label="业务维护费比例" width="200" show-overflow-tooltip>
            </el-table-column>
          </el-table>
        </div>
      </ui-line-tittle>
      <!-- </div> -->
    </el-dialog>
  </div>
</template>

<script>
import NoticeBar from '@/components/notice-bar'
import LineTittle from '@/components/line-tittle'
import LabelText from '@/components/label-text'
import { mapActions } from 'vuex'
import { api } from '@/api/bill_mgr/blackInsure'
export default {
  components: {
    [NoticeBar.name]: NoticeBar,
    [LineTittle.name]: LineTittle,
    [LabelText.name]: LabelText
  },
  data () {
    return {
      // from
      carDetailResp: {
        perfPolicyMainCondition: {
          proposalNo: '',
          mergeNo: '',
          approvalNo: '',
          policyNo: '',
          policyStatus: '',
          acceptDate: '',
          effectDate: '',
          uwYear: '',
          policyYear: '',
          companyComCode: '',
          companyComName: '',
          policyStart: '',
          policyEnd: '',
          passDate: '',
          printDate: '',
          tCompanyName: '',
          way: '',
          signingCode: '',
          policyDocument: '',
          policyBillDocument: '',
          agentComCode: '',
          approvalNoRemark: '',
          approvalNoStateDate: '',
          approvalNoEndDate: '',
          manageDitch: '',
          businessDitch: '',
          operatorCode: '',
          operator: '',
          single: '',
          level: '',
          flag: '',
          missionsFlag: '',
          missionsNo: '',
          interactionFlag: ''
        },
        perfPartyTCondition: {
          appliName: '',
          appliIDType: '',
          appliIDNo: ''
        },
        perfAgentCondition: {
          agentCode: '',
          agentName: '',
          comCode: '',
          comName: ''
        },
        perfCarInfoCondition: {
          registModelType: '',
          idType: '',
          idNo: '',
          registModelNo: '',
          domesticFlag: '',
          licenseNo: '',
          frameNo: '',
          useNature: '',
          carkindCode: '',
          newVehicle: '',
          vehicleBrand: '',
          vehicleAlias: ''
        },
        perfCarShipCondition: {
          policyNo: '',
          hyptFlag: '',
          taxDepartmentNo: '',
          taxType: '',
          taxStandard: '',
          taxStyle: '',
          carStyleCode: '',
          taxPayerName: '',
          taxPayerPhone: '',
          taxPayerIDType: '',
          taxPayerIDNo: '',
          deductionDueReason: '',
          deductionDueCode: '',
          deductionDueRate: '',
          deductionDueAmount: '',
          sumOverdue: '',
          vehicleAndVesselTax: ''
        },
        perfBaseRiskCondition: {
          policyNo: '',
          proposalNo: '',
          mergeNo: '',
          riskCode: '',
          riskname: '',
          insuranceTypeCode: '',
          insuranceTypeName: '',
          mainFlag: '',
          renew: '',
          payRate: '',
          premium: '',
          amount: '',
          num: '',
          addAmount: '',
          lifelongFlag: '',
          startDate: '',
          endDate: '',
          effectFlag: '',
          uwYear: '',
          coinsurance: '',
          agentShipFlag: '',
          jqxFlag: '',
          kindFlag: '',
          deductibleAmount: '',
          dutyAmount: '',
          poundageFee: '',
          poundageNotTaTx: '',
          taPoundageNotTax: '',
          taRate: '',
          feeNotTax: '',
          feeTax: '',
          feeRate: '',
          businessPerf: '',
          businessPerfRate: '',
          businessUpkeep: '',
          businessUpkeepRate: '',
          clientFeeRate: '',
          clientFee: '',
          businessFee: '',
          businessFeeRate: '',
          mark: '',
          risktype: ''
        },
        perfPayInfoCondition: {
          totalPremium: '',
          totalIncomeAmount: '',
          totalRateAmount: '',
          nofeetotal: '',
          totalNoIncomeAmount: '',
          vehiclevesseltaxtotal: '',
          payStatus: ''
        }
      },
      info: {
        insuranceType: 1,
        mergeNo: '',
        policyNo: '',
        appliName: '',
        insuredName: '',
        carNo: ''
      },
      loading: '',
      options: [{label: '车险', value: 1}, {label: '非车险', value: 2}],
      queryList: [
        [{label: '保单号', model: 'mergeNo', prop: 'mergeNo', hint: '请填写', arrId: 1}, {label: '产险类型', model: 'insuranceType', prop: 'insuranceType', hint: '请填写', arrId: 11}],
        [{label: '投保人名称', model: 'appliName', prop: 'appliName', hint: '请填写', arrId: 2}, {label: '分单号', model: 'policyNo', prop: 'policyNo', hint: '请填写', arrId: 22}],
        [{label: '被保人名称', model: 'insuredName', prop: 'insuredName', hint: '请填写', arrId: 3, disabled: true}, {label: '车架号', model: 'carNo', prop: 'carNo', hint: '请填写', arrId: 33, disabled: false}]
      ],
      // table
      tableData: [],
      tabelColumList: [
        {label: '保单号', prop: 'mergeNo'},
        {label: '分单号', prop: 'policyNo'},
        {label: '投保人姓名', prop: 'appliName'},
        {label: '所属保险公司名称', prop: 'companyName'},
        {label: '佰盈机构名称', prop: 'comName'}
      ],
      tablePage: {
        currentPage: 1,
        total: 0,
        size: 5,
        sizes: [5, 10, 30, 50]
      },
      // dialog
      type: 'car',
      carList: [
        [{label: '制单人', prop: ''}, {label: '创盈业务层级', prop: ''}],
        [{label: '是否天安业务', prop: ''}, {label: '是否团车', prop: ''}],
        [{label: '团车协议号', prop: ''}, {label: '是否投保人车联动', prop: ''}]
      ],
      nonCarList: [
        [{label: '制单人', prop: ''}, {label: '缴费状态', prop: ''}],
        [{label: '创盈业务层级', prop: ''}]
      ],
      carInsurance: [
        {
          type: 'car',
          name: '保单基本信息',
          data: 'perfPolicyMainCondition',
          billDetailList: [
            [{label: '投保单号', prop: 'proposalNo'}, {label: '大保单号', prop: 'mergeNo'}],
            [{label: '分单号', prop: 'policyNo'}, {label: '特批号', prop: 'approvalNo'}],
            [{label: '保单年度', prop: 'uwYear'}, {label: '保单状态', prop: 'policyStatus'}],
            [{label: '承保日期', prop: 'acceptDate'}, {label: '生效日期', prop: 'effectDate'}],
            [{label: '归属保险公司机构代码', prop: 'companyComCode'}, {label: '归属保险公司机构名称', prop: 'companyComName'}],
            [{label: '保险起期', prop: 'policyStart'}, {label: '保险止期', prop: 'policyEnd'}],
            [{label: '核保通过日期', prop: 'passDate'}, {label: '核保打印日期', prop: 'printDate'}],
            [{label: '创盈业务层级', prop: 'level'}, {label: '签单机构', prop: 'signingCode'}],
            [{label: '保单单证号', prop: 'policyDocument'}, {label: '保单发票单证号', prop: 'policyBillDocument'}],
            [{label: '中介机构', prop: 'agentComCode'}, {label: '特批号备注', prop: 'approvalNoRemark'}],
            [{label: '特批号生效日期', prop: 'approvalNoStateDate'}, {label: '特批号失效日期', prop: 'approvalNoEndDate'}],
            [{label: '管理渠道', prop: 'manageDitch'}, {label: '业务来源', prop: 'businessDitch'}],
            [{label: '经办人代码', prop: 'operatorCode'}, {label: '经办人', prop: 'operator'}],
            [{label: '制单人', prop: 'single'}, {label: '业务类型', prop: 'way'}],
            [{label: '是否团车', prop: 'missionsFlag'}, {label: '团车协议号', prop: 'missionsNo'}],
            [{label: '是否投保人车联动', prop: 'interactionFlag'}, {label: '出单渠道', prop: 'tCompanyName'}]
            // 空格
          ]
        },
        {
          type: 'noCar',
          name: '保单基本信息',
          data: 'perfPolicyMainCondition',
          billDetailList: [
            [{label: '投保单号', prop: 'proposalNo'}],
            [{label: '分单号', prop: 'policyNo'}, {label: '特批号', prop: 'approvalNo'}],
            [{label: '保单年度', prop: 'uwYear'}, {label: '保单状态', prop: 'policyStatus'}],
            [{label: '承保日期', prop: 'acceptDate'}, {label: '生效日期', prop: 'effectDate'}],
            [{label: '归属保险公司机构代码', prop: 'companyComCode'}, {label: '归属保险公司机构名称', prop: 'companyComName'}],
            [{label: '保险起期', prop: 'policyStart'}, {label: '保险止期', prop: 'policyEnd'}],
            [{label: '核保通过日期', prop: 'passDate'}, {label: '核保打印日期', prop: 'printDate'}],
            [{label: '创盈业务层级', prop: 'level'}, {label: '签单机构', prop: 'signingCode'}],
            [{label: '保单单证号', prop: 'policyDocument'}, {label: '保单发票单证号', prop: 'policyBillDocument'}],
            [{label: '中介机构', prop: 'agentComCode'}, {label: '特批号备注', prop: 'approvalNoRemark'}],
            [{label: '特批号生效日期', prop: 'approvalNoStateDate'}, {label: '特批号失效日期', prop: 'approvalNoEndDate'}],
            [{label: '管理渠道', prop: 'manageDitch'}, {label: '业务来源', prop: 'businessDitch'}],
            [{label: '经办人代码', prop: 'operatorCode'}, {label: '经办人', prop: 'operator'}],
            [{label: '制单人', prop: 'single'}, {label: '业务类型', prop: 'way'}],
            [{label: '是否团车', prop: 'missionsFlag'}, {label: '团车协议号', prop: 'missionsNo'}],
            [{label: '是否投保人车联动', prop: 'interactionFlag'}, {label: '出单渠道', prop: 'tCompanyName'}]
            // 空格
          ]
        },
        {
          type: 'all',
          name: '投保人信息',
          data: 'perfPartyTCondition',
          billDetailList: [
            [{label: '投保人名称', prop: 'appliName'}],
            [{label: '证件类型', prop: 'appliIDType'}, {label: '证件号码', prop: 'appliIDNo'}]
          ]
        },
        {
          type: 'nonCar',
          data: 'perfPartyTCondition',
          name: '被保人信息',
          billDetailList: [
            [{label: '被保人名称', prop: 'appliName'}],
            [{label: '证件类型', prop: 'appliIDType'}, {label: '证件号码', prop: 'appliIDNo'}]
          ]
        },
        {
          type: 'all',
          name: '业务员信息',
          data: 'perfAgentCondition',
          billDetailList: [
            [{label: '业务员代码', prop: 'agentCode'}, {label: '业务员名称', prop: 'agentName'}],
            [{label: '归属机构代码', prop: 'comCode'}, {label: '归属机构名称', prop: 'comName'}]
          ]
        },
        {
          type: 'car',
          name: '车辆信息',
          data: 'perfCarInfoCondition',
          billDetailList: [
            [{label: '车主类型', prop: 'registModelType'}, {label: '车主证件类型', prop: 'idType'}],
            [{label: '车主证件号码', prop: 'idNo'}, {label: '行驶证号', prop: 'registModelNo'}],
            [{label: '国产/进口', prop: 'domesticFlag'}, {label: '号牌号码', prop: 'licenseNo'}],
            [{label: '车架号/VIN码', prop: 'frameNo'}, {label: '使用性质', prop: 'useNature'}],
            [{label: '车辆种类', prop: 'carkindCode'}, {label: '车龄', prop: 'newVehicle'}],
            [{label: '车辆品牌', prop: 'vehicleBrand'}, {label: '车系', prop: 'vehicleAlias'}]
          ]
        },
        {
          type: 'car',
          name: '车船税信息',
          data: 'perfCarShipCondition',
          billDetailList: [
            [{label: '分单号', prop: 'policyNo'}],
            [{label: '算税标志', prop: 'hyptFlag'}, {label: '税务登记号码', prop: 'taxDepartmentNo'}],
            [{label: '计税分类', prop: 'taxType'}, {label: '计税标准', prop: 'taxStandard'}],
            [{label: '计算方式', prop: 'taxStyle '}, {label: '车辆类型编码', prop: 'carStyleCode'}],
            [{label: '纳税人名称', prop: 'taxPayerName'}, {label: '纳税人电话号码', prop: 'taxPayerPhone'}],
            [{label: '纳税人证件类型', prop: 'taxPayerIDType'}, {label: '纳税人证件号码', prop: 'taxPayerIDNo'}],
            [{label: '减税说明/免税原因', prop: 'deductionDueReason'}, {label: '减免税方案代码', prop: 'deductionDueCode'}],
            [{label: '减税比例', prop: 'deductionDueRate'}, {label: '减免税金额', prop: 'deductionDueAmount'}],
            [{label: '滞纳金', prop: 'sumOverdue'}, {label: '车船税', prop: 'vehicleAndVesselTax'}]
          ]
        },
        {
          type: 'car',
          name: '缴费信息',
          data: 'perfPayInfoCondition',
          billDetailList: [
            [{label: '应缴保费合计', prop: 'totalPremium'}, {label: '实收保费合计', prop: 'totalIncomeAmount'}],
            [{label: '手续费金额总计', prop: 'totalRateAmount'}, {label: '不含税手续费总计', prop: 'nofeetotal'}],
            [{label: '不含税保费总计', prop: 'totalNoIncomeAmount'}, {label: '含税车船税总计', prop: 'vehiclevesseltaxtotal'}],
            [{label: '缴费状态', prop: 'payStatus'}]
          ]
        },
        {
          type: 'nonCar',
          name: '缴费明细',
          data: 'perfPayInfoCondition',
          billDetailList: [
            [{label: '实收保费', prop: 'totalIncomeAmount'}, {label: '实际手续费', prop: 'totalRateAmount'}],
            [{label: '实收日期', prop: 'payDate'}]
          ]
        }
      ],
      riskInfos: [],
      billDetailColumn: [
        {label: '佰盈机构代码', prop: 'date'},
        {label: '佰盈机构名称', prop: 'name'},
        {label: '合作经代机构代码', prop: 'name'},
        {label: '合作经代机构名称', prop: 'name'},
        {label: '保单号', prop: 'name'},
        {label: '险种代码', prop: 'name', sortable: true},
        {label: '缴费年期', prop: 'name'},
        {label: '实收保费', prop: 'name'},
        {label: '首年基础服务费', prop: 'name'},
        {label: '补充手续费', prop: 'date'},
        {label: '平台奖励费用', prop: 'name'},
        {label: '增值专票扣费税', prop: 'name'},
        {label: '续期基础服务费', prop: 'name'},
        {label: '续期服务津贴', prop: 'name'},
        {label: '继续率奖金', prop: 'name'}
      ],
      dbSelect: [],
      fileList: [],
      detailVisible: false,
      tableVisible: false,
      selectRow: {},
      enum: {
        flag: {
          '0': '非天安',
          '1': '天安'
        },
        isOrNo: {
          '0': '否',
          '1': '是'
        },
        domesticFlag: {
          '1': '国产车',
          '2': '进口车'
        },
        mainFlag: {
          '1': '主险',
          '2': '附加险'
        },
        payRate: {
          '0': '天缴',
          '1': '月缴',
          '2': '季缴',
          '3': '年缴',
          '4': '趸缴',
          '5': '半年缴'
        },
        coinsurance: {
          '0': '非共保',
          '1': '共保'
        },
        jqxFlag: {
          '0': '商业',
          '1': '交强'
        },
        payStatus: {
          '1': '已缴费',
          '2': '未缴费'
        },
        policyStatus: {
          '1': '已核保',
          '2': '已打印',
          '3': '已注销或全单退保'
        },
        way: {
          '1': '直接业务',
          '2': '间接业务'
        }
      }
    }
  },
  methods: {
    ...mapActions(['api']),
    handleBlur () {
    },
    handleDiaCurrentChange (e) {
      this.tablePage.currentPage = e
      this.onquery(this.tablePage.currentPage)
    },
    handleSizeChange (val) {
      this.tablePage.size = val
      this.onquery(this.tablePage.currentPage)
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
    onquery (e) {
      this.Loading()
      let info = Object.assign(this.info, { 'currentPage': e, 'pageSize': this.tablePage.size })
      api('/car/perfPolicyQuery', 'post', info).then(res => {
        this.closeLoading()
        if (res.data.code === '000000') {
          this.tableVisible = true
          this.tableData = res.data.data.content
          this.tablePage.total = res.data.data.totalElements
          if (this.info.insuranceType === 1) {
            this.type = 'car'
          } else {
            this.type = 'noCar'
          }
        } else {
          this.$message({
            message: res.data.msg,
            type: 'error'
          })
        }
      })
    },
    onbillDetails (e) {
      console.log(e)
      let info = {
        type: this.info.insuranceType,
        mergeNo: e.mergeNo,
        policyNo: e.policyNo
      }
      api('/car/proPolicyInfoQuery', 'post', info).then(res => {
        if (res.data.code === '000000') {
          this.detailVisible = true
          this.riskInfos = res.data.data.perfBaseRiskConditions
          this.carDetailResp.perfPolicyMainCondition = res.data.data.perfPolicyMainCondition
          // 枚举值转换
          this.carDetailResp.perfPolicyMainCondition.flag = this.enum.flag[this.carDetailResp.perfPolicyMainCondition.flag]
          this.carDetailResp.perfPolicyMainCondition.way = this.enum.way[this.carDetailResp.perfPolicyMainCondition.way]
          this.carDetailResp.perfPolicyMainCondition.missionsFlag = this.enum.isOrNo[this.carDetailResp.perfPolicyMainCondition.missionsFlag]
          this.carDetailResp.perfPolicyMainCondition.policyStatus = this.enum.policyStatus[this.carDetailResp.perfPolicyMainCondition.policyStatus]
          if (res.data.data.perfPartyTCondition !== null) {
            this.carDetailResp.perfPartyTCondition = res.data.data.perfPartyTCondition
          }
          if (res.data.data.perfAgentCondition !== null) {
            this.carDetailResp.perfAgentCondition = res.data.data.perfAgentCondition
          }
          if (res.data.data.perfCarInfoConditions !== null && res.data.data.perfCarInfoConditions.length > 0) {
            this.carDetailResp.perfCarInfoCondition = res.data.data.perfCarInfoConditions[0]
            // 枚举值转换
            this.carDetailResp.perfCarInfoCondition.domesticFlag = this.enum.domesticFlag[this.carDetailResp.perfCarInfoCondition.domesticFlag]
          }
          if (res.data.data.perfCarShipConditions !== null && res.data.data.perfCarShipConditions.length > 0) {
            this.carDetailResp.perfCarShipCondition = res.data.data.perfCarShipConditions[0]
          }
          if (res.data.data.perfBaseRiskConditions !== null && res.data.data.perfBaseRiskConditions.length > 0) {
            this.carDetailResp.perfBaseRiskCondition = res.data.data.perfBaseRiskConditions[0]
            // 枚举值转换
            this.carDetailResp.perfBaseRiskCondition.mainFlag = (this.carDetailResp.perfBaseRiskCondition.mainFlag === null ? '' : this.enum.mainFlag[this.carDetailResp.perfBaseRiskCondition.mainFlag])
            this.carDetailResp.perfBaseRiskCondition.payRate = this.enum.payRate[this.carDetailResp.perfBaseRiskCondition.payRate]
            this.carDetailResp.perfBaseRiskCondition.lifelongFlag = (this.carDetailResp.perfBaseRiskCondition.lifelongFlag === null ? '' : this.enum.isOrNo[this.carDetailResp.perfBaseRiskCondition.lifelongFlag])
            this.carDetailResp.perfBaseRiskCondition.effectFlag = this.enum.isOrNo[this.carDetailResp.perfBaseRiskCondition.effectFlag]
            this.carDetailResp.perfBaseRiskCondition.agentShipFlag = this.enum.isOrNo[this.carDetailResp.perfBaseRiskCondition.agentShipFlag]
            this.carDetailResp.perfBaseRiskCondition.kindFlag = this.enum.isOrNo[this.carDetailResp.perfBaseRiskCondition.kindFlag]
            this.carDetailResp.perfBaseRiskCondition.coinsurance = this.enum.coinsurance[this.carDetailResp.perfBaseRiskCondition.coinsurance]
            this.carDetailResp.perfBaseRiskCondition.jqxFlag = this.enum.jqxFlag[this.carDetailResp.perfBaseRiskCondition.jqxFlag]
            console.log(this.carDetailResp.perfBaseRiskCondition)
          }
          this.carDetailResp.perfPayInfoCondition = res.data.data.perfPayInfoCondition
          // 枚举值转换
          this.carDetailResp.perfPayInfoCondition.payStatus = this.enum.payStatus[this.carDetailResp.perfPayInfoCondition.payStatus]
        } else {
          this.$message({
            message: res.data.msg,
            type: 'error'
          })
        }
      })
    }
  },
  watch: {
    info: {
      handler () {
        if (this.info.insuranceType === 1) {
          this.queryList[2][0].disabled = true
          this.queryList[2][1].disabled = false
          this.queryList[2][0].hint = ''
          this.queryList[2][1].hint = '请填写'
          this.info.companyCode = ''
        } else {
          this.queryList[2][0].disabled = false
          this.queryList[2][1].disabled = true
          this.queryList[2][0].hint = '请填写'
          this.queryList[2][1].hint = ''
          this.info.companyName = ''
        }
      },
      deep: true
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
</style>
