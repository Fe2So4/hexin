<template>
	<div class="wrap">
		<ui-notice-bar slot="breadcast">
			<el-breadcrumb slot="location" separator=">">
				<el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
				<el-breadcrumb-item>财险业务管理</el-breadcrumb-item>
				<el-breadcrumb-item>产险批单查询</el-breadcrumb-item>
			</el-breadcrumb>
		</ui-notice-bar>
		<el-form class="verify-content" :model="info" ref="ruleForm">
			<el-row v-for="(item, index) in queryList" :key="index">
				<el-col :span="12" v-for="i in item" :key="i.arrId">
					<el-form-item :prop="i.model" :rules="i.rules">
						<ui-label-text labelWidth="150" :label="i.label+':'">
							<el-select v-model="info[i.model]" slot="text" v-if="i.arrId === 11" placeholder="请选择">
								<el-option v-for="oitem in options" :key="oitem.value" :label="oitem.label" :value="oitem.value">
								</el-option>
							</el-select>
							<el-input v-else v-model="info[i.model]" slot="text" :placeholder="i.hint" clearable :disabled="i.disabled"
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
			<el-table :data="tableData" style="width: 100%" stripe>
				<el-table-column v-for="(item, index) in tabelColumList" v-if="index > 0" :key="index" :prop="item.prop" :label="item.label"
				 :sortable="item.sortable">
					<!-- <el-table-column
            v-if="item.circul"
            v-for="(i, index) in item.child"
            :key="index"
            :prop="i.prop"
            :label="i.label"
            width="120">
          </el-table-column> -->
				</el-table-column>
				<el-table-column v-else :prop="item.prop" :label="item.label" :sortable="item.sortable" width="180">
					<template slot-scope="scope">
						<p class="download" :date-code="scope.row[item.prop]" @click="onbillDetails(scope)">{{scope.row[item.prop]}}</p>
					</template>
				</el-table-column>
			</el-table>
			<el-pagination  @size-change="handleSizeChange" @current-change="handleDiaCurrentChange" :current-page="tablePage.currentPage" :page-size="tablePage.size"
			 :page-sizes="tablePage.sizes" layout="total, sizes, prev, pager, next, jumper" :total="tablePage.total">
			</el-pagination>
		</div>
		<!-- billDetails -->
		<el-dialog append-to-body center title="详情" :visible.sync="detailVisible" width="70%">
			<ui-line-tittle class="dis-bottom" :collapsible="true" v-for="(item, index) in carInsurance" :key="index" v-if="item.type === type || item.type === 'all'">
				<span slot="title">
					<i class="font_family icon-jy-menu-4"></i>
					<span>{{item.name}}</span>
				</span>
				<div slot="content">
					<el-row class="dis-bottom" v-for="(i, idx) in item.billDetailList" :key="idx">
						<el-col :span="12" v-for="j in i" :key="j.id">
							<ui-label-text labelWidth="150" :label="j.label+':'">
								<el-input v-model="carDetailResp[item.data][j.prop]" :disabled="true" slot="text" clearable :data-arr="j.arrId">
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
      			<el-table-column prop="riskName" label="险种名称" width="200" show-overflow-tooltip>
      			</el-table-column>
      			<el-table-column prop="poundage" label="含增值税保费" width="200" show-overflow-tooltip>
      			</el-table-column>
      			<el-table-column prop="poundageNotTaTx" label="不含增值税保费" width="200" show-overflow-tooltip>
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
        perfEndPolicyMainCondition: {
          policyno: '',
          partPolicyNo: '',
          alterno: '',
          partAlternoNo: '',
          startdate: '',
          policyEnd: '',
          checkPolicyPrintDate: '',
          checkPolicyApprovalStartDate: '',
          checkPolicyCreateDate: '',
          checkPolicyApprovalDate: '',
          checkNo: '',
          policyDocument: '',
          companyComCode: '',
          companyComName: '',
          policyBillDocument: '',
          approvalNo: '',
          approvalNoStateDate: '',
          approvalNoEndDate: '',
          approvalNoRemark: '',
          inputDate: '',
          checkverifier: '',
          verifier: '',
          operatorCode: '',
          level: '',
          single: '',
          operator: '',
          policySingle: '',
          agentComCode: '',
          agentCode: '',
          manageDitch: '',
          businessDitch: '',
          nationwideCode: '',
          nationwideName: '',
          insureMan: '',
          businessStatisticsCode: ''
        },
        perfEndBaseRiskCondition: {
          partPolicyNo: '',
          riskCode: '',
          riskName: '',
          poundage: '',
          insurance: '',
          dutyAmount: '',
          poundageNotTaTx: '',
          feeNotTax: '',
          feeTax: '',
          feeRate: '',
          businessPerf: '',
          businessPerfRate: '',
          businessUpkeep: '',
          businessUpkeepRate: '',
          clientFee: '',
          clientFeeRate: '',
          businessFee: '',
          businessFeeRate: '',
          checkFee: '',
          checkCoverage: '',
          TaCoverage: '',
          checkFeeNotTax: '',
          parities: '',
          masterCoverage: '',
          checkType: '',
          checkPrintNo: '',
          fare: '',
          adjustCoefficient: ''
        },
        perfEndCarCondition: {
          carKind: '',
          VIN: '',
          vinNo: '',
          carNature: '',
          label: '',
          carNo: '',
          RegistrationDate: '',
          model: '',
          CarNewPrice: '',
          seat: '',
          ton: '',
          carType: ''
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
      options: [{ label: '车险', value: 1 }, { label: '非车险', value: 2 }],
      queryList: [
        [
          {
            label: '保单号',
            model: 'mergeNo',
            prop: 'mergeNo',
            hint: '请填写',
            arrId: 1
          },
          {
            label: '产险类型',
            model: 'insuranceType',
            prop: 'insuranceType',
            hint: '请填写',
            arrId: 11
          }
        ],
        [
          {
            label: '投保人名称',
            model: 'appliName',
            prop: 'appliName',
            hint: '请填写',
            arrId: 2
          },
          {
            label: '分单号',
            model: 'policyNo',
            prop: 'policyNo',
            hint: '请填写',
            arrId: 22
          }
        ],
        [
          {
            label: '被保人名称',
            model: 'insuredName',
            prop: 'insuredName',
            hint: '请填写',
            arrId: 3,
            disabled: true
          },
          {
            label: '车架号',
            model: 'carNo',
            prop: 'carNo',
            hint: '请填写',
            arrId: 33,
            disabled: false
          }
        ]
      ],
      // table
      tableData: [],
      tabelColumList: [
        { label: '保单号', prop: 'mergeNo' },
        { label: '分单号', prop: 'policyNo' },
        { label: '批单号', prop: 'alterNo' },
        { label: '分批单号', prop: 'partAlterNo' },
        { label: '投保人姓名', prop: 'appliName' },
        { label: '被保人姓名', prop: 'insuredName' },
        { label: '所属保险公司名称', prop: 'companyName' },
        { label: '佰盈机构名称', prop: 'comName' }
      ],
      tablePage: {
        currentPage: 1,
        total: 0,
        size: 5,
        sizes: [5, 10, 30, 50]
      },
      // dialog
      type: 'car',
      carInsurance: [
        {
          type: 'all',
          name: '保单基本信息',
          data: 'perfEndPolicyMainCondition',
          billDetailList: [
            [
              { label: '保单号', prop: 'policyno' },
              { label: '分保单号', prop: 'partPolicyNo' }
            ],
            [
              { label: '批单号', prop: 'alterno' },
              { label: '分批单号', prop: 'partAlternoNo' }
            ],
            [
              { label: '保单生效日期', prop: 'startdate' },
              { label: '保单终止日期', prop: 'policyEnd' }
            ],
            [
              { label: '批单打印日期', prop: 'checkPolicyPrintDate' },
              { label: '批单生效日期', prop: 'checkPolicyApprovalStartDate' }
            ],
            [
              { label: '批单生成日期', prop: 'checkPolicyCreateDate' },
              { label: '核批通过日期', prop: 'checkPolicyApprovalDate' }
            ],
            [
              { label: '批单序号', prop: 'checkNo' },
              { label: '批单单证号', prop: 'policyDocument' }
            ],
            [
              { label: '所属保险公司机构代码', prop: 'companyComCode' },
              { label: '所属保险公司机构名称', prop: 'companyComName' }
            ],
            [
              { label: '批单发票单证号', prop: 'policyBillDocument' },
              { label: '特批号', prop: 'approvalNo' }
            ],
            [
              { label: '特批号生效日期', prop: 'approvalNoStateDate' },
              { label: '特批号失效日期', prop: 'approvalNoEndDate' }
            ],
            [
              { label: '特批号备注', prop: 'approvalNoRemark' },
              { label: '录入日期', prop: 'inputDate' }
            ],
            [
              { label: '最终批改人名称', prop: 'checkverifier' },
              { label: '最终核保人名称', prop: 'verifier' }
            ],
            [
              { label: '保单经办人代码', prop: 'operatorCode' },
              { label: '创盈业务层级', prop: 'level' }
            ],
            [
              { label: '制单人', prop: 'single' },
              { label: '保单经办人', prop: 'operator' }
            ],
            [
              { label: '保单制单人', prop: 'policySingle' },
              { label: '中介机构代码', prop: 'agentComCode' }
            ],
            [
              { label: '中介机构', prop: 'agentCode' },
              { label: '管理渠道', prop: 'manageDitch' }
            ],
            [
              { label: '业务渠道', prop: 'businessDitch' },
              { label: '全国性经代公司代码', prop: 'nationwideCode' }
            ],
            [
              { label: '全国性经代公司名称', prop: 'nationwideName' },
              { label: '投保人名称', prop: 'insureMan' }
            ],
            [{ label: '被保险人名称', prop: 'insuredMan' }]
            // 空格
          ]
        },
        //         {
        //           type: 'all',
        //           name: '险种信息',
        //           data: 'perfEndBaseRiskCondition',
        //           billDetailList: [
        //             [{label: '分保单号', prop: 'partPolicyNo'}],
        //             [{label: '险种代码', prop: 'riskCode'}, {label: '险种名称', prop: 'riskName'}],
        //             [{label: '应缴保费', prop: 'poundage'}, {label: '保险金额', prop: 'insurance'}],
        //             [{label: '责任限额', prop: 'dutyAmount'}, {label: '保费_不含税', prop: 'poundageNotTaTx'}],
        //             [{label: '手续费_不含税', prop: 'feeNotTax'}, {label: '手续费_含税', prop: 'feeTax'}],
        //             [{label: '手续费比例', prop: 'feeRate'}, {label: '业务绩效', prop: 'businessPerf'}],
        //             [{label: '业务绩效比例', prop: 'businessPerfRate'}, {label: '业务维护费', prop: 'businessUpkeep'}],
        //             [{label: '业务维护费比例', prop: 'businessUpkeepRate'}, {label: '客服服务费', prop: 'clientFee'}],
        //             [{label: '客户服务费比例', prop: 'clientFeeRate'}, {label: '业务拓展费', prop: 'businessFee'}],
        //             [{label: '业务拓展费比例', prop: 'businessFeeRate'}, {label: '批改变化保费', prop: 'checkFee'}],
        //             [{label: '批改变化保额', prop: 'checkCoverage'}, {label: '天安共保份额', prop: 'TaCoverage'}],
        //             [{label: '批改变化保费_不含税', prop: 'checkFeeNotTax'}, {label: '汇率', prop: 'parities'}],
        //             [{label: '主联保份额', prop: 'masterCoverage'}, {label: '批改类型名称', prop: 'checkType'}],
        //             [{label: '批改印刷号', prop: 'checkPrintNo'}, {label: '车船金额', prop: 'fare'}],
        //             [{label: '总调整系数', prop: 'adjustCoefficient'}]
        //           ]
        //         },
        {
          type: 'car',
          name: '车辆信息',
          data: 'perfEndCarCondition',
          billDetailList: [
            [
              { label: '车辆种类', prop: 'carKind' },
              { label: '车架号', prop: 'vin' }
            ],
            [
              { label: '发动机号', prop: 'vinNo' },
              { label: '使用性质', prop: 'carNature' }
            ],
            [
              { label: '厂商', prop: 'label' },
              { label: '车牌号', prop: 'carNo' }
            ],
            [
              { label: '登记日期', prop: 'registrationDate' },
              { label: '车型', prop: 'model' }
            ],
            [
              { label: '新车重置价格', prop: 'carNewPrice' },
              { label: '座位', prop: 'seat' }
            ],
            [
              { label: '吨位', prop: 'ton' },
              { label: '车辆用途', prop: 'carType' }
            ]
          ]
        }
      ],
      billDetailColumn: [
        { label: '佰盈机构代码', prop: 'date' },
        { label: '佰盈机构名称', prop: 'name' },
        { label: '合作经代机构代码', prop: 'name' },
        { label: '合作经代机构名称', prop: 'name' },
        { label: '保单号', prop: 'name' },
        { label: '险种代码', prop: 'name', sortable: true },
        { label: '缴费年期', prop: 'name' },
        { label: '实收保费', prop: 'name' },
        { label: '首年基础服务费', prop: 'name' },
        { label: '补充手续费', prop: 'date' },
        { label: '平台奖励费用', prop: 'name' },
        { label: '增值专票扣费税', prop: 'name' },
        { label: '续期基础服务费', prop: 'name' },
        { label: '续期服务津贴', prop: 'name' },
        { label: '继续率奖金', prop: 'name' }
      ],
      dbSelect: [],
      fileList: [],
      detailVisible: false,
      tableVisible: false,
      selectRow: {},
      riskInfos: {}
    }
  },
  methods: {
    ...mapActions(['api']),
    handleBlur () {},
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
      let info = Object.assign(this.info, {
        currentPage: e,
        pageSize: this.tablePage.size
      })
      this.Loading()
      api('/car/perfEndPolicyQuery', 'post', info).then(res => {
        this.closeLoading()
        if (res.data.code === '000000') {
          if (this.info.insuranceType === 1) {
            this.type = 'car'
          } else {
            this.type = 'noCar'
          }
          this.tableVisible = true
          this.tableData = res.data.data.content
          this.tablePage.total = res.data.data.totalElements
        } else {
          this.$message({
            message: res.data.msg,
            type: 'error'
          })
        }
      })
    },
    onbillDetails (e) {
      let info = {
        mergeNo: e.row.mergeNo,
        policyNo: e.row.policyNo,
        alterNo: e.row.alterNo,
        partAlterNo: e.row.partAlterNo,
        type: this.info.insuranceType
      }
      api('/car/proEndPolicyInfoQuery', 'post', info).then(res => {
        this.detailVisible = true
        if (res.data.code === '000000') {
          console.log(res)
          this.detailVisible = true
          this.riskInfos = res.data.data.perfEndBaseRiskConditionList
          this.carDetailResp.perfEndPolicyMainCondition =
            res.data.data.perfEndPolicyMainCondition
          //           if (res.data.data.perfEndBaseRiskConditionList.length > 0) {
          //             this.carDetailResp.perfEndBaseRiskCondition = res.data.data.perfEndBaseRiskConditionList[0]
          //           }
          if (
            this.info.insuranceType === 1 &&
            res.data.data.perfEndCarConditionList.length > 0
          ) {
            this.carDetailResp.perfEndCarCondition =
              res.data.data.perfEndCarConditionList[0]
          }
          console.log(this.carDetailResp[0])
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
.wrap {
  padding-left: 30px;
  padding-right: 30px;
}

.verify-content {
  padding: 20px 0;
}

.btn {
  text-align: center;
}

.btn .el-button {
  margin-right: 10px;
}

.table {
  margin: 20px 0;
}

.btn-export {
  margin: 10px auto;
}

.upload-content {
  width: 100%;
  text-align: center;
}

.red-color {
  color: red;
}

.download {
  color: blue;
  cursor: pointer;
}

.dis-top {
  margin-top: 10px;
}

.dis-bottom {
  margin-bottom: 10px;
}
</style>
