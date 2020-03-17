<template>
  <div class="marginTB">
    <el-form :rules="lifePCMainConditionRules" ref="lifePCMainConditionForm" :model="lifePCMainConditionForm">
      <el-row class="ri-line">
        <el-col :span="12">
          <el-form-item  prop="proposalNo">
            <ui-label-text  label="投保单号:" :required="true" labelWidth="230">
              <el-input :disabled="!isSuper" v-model="lifePCMainConditionForm.proposalNo" @change="check()" placeholder="必填" slot="text" ></el-input>
            </ui-label-text>
          </el-form-item>
          <el-form-item  prop="proposalNo4" v-show="false" >
          	<ui-label-text  label="原投保单号:" :required="true" labelWidth="230">
          		<el-input  v-model="lifePCMainConditionForm.proposalNo4" slot="text" ></el-input>
          	</ui-label-text>
          </el-form-item>
        </el-col>
        <el-col :span="12" v-if="!isEdit">
          <el-form-item  prop="proposalNo1">
            <ui-label-text  label="投保单号:" :required="true" labelWidth="230">
              <el-input v-model="lifePCMainConditionForm.proposalNo1" onpaste="return false" @blur="checkopy()" placeholder="必填" slot="text" ></el-input>
            </ui-label-text>
          </el-form-item>
        </el-col>
        <el-col :span="12" v-else>
        	<el-form-item prop="proposalDate">
        		<ui-label-text :required="true"  label="投保日期：" labelWidth="230" >
        			<el-date-picker value-format="yyyy-MM-dd" slot="text" v-model="lifePCMainConditionForm.proposalDate" type="date" placeholder="选择日期"> </el-date-picker>
        		</ui-label-text>
        	</el-form-item>
        </el-col>
      </el-row>
      <el-row class="ri-line">
        <el-col :span="12">
          <el-form-item prop="proposalDate" v-if="!isEdit">
            <ui-label-text :required="true"  label="投保日期：" labelWidth="230" >
              <el-date-picker value-format="yyyy-MM-dd" slot="text" v-model="lifePCMainConditionForm.proposalDate" type="date" placeholder="选择日期"> </el-date-picker>
            </ui-label-text>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row class="ri-line">
        <el-col :span="12">
          <el-form-item  prop="companyCode"  >
            <ui-label-text  label="归属保险公司代码:" :required="true" labelWidth="230">
              <el-input
                v-model="lifePCMainConditionForm.companyCode"
                :disabled="true"
                slot="text"
                @change="companyCodeChange"></el-input>
            </ui-label-text>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item  prop="companyName"  >
            <ui-label-text  label="归属保险公司名称:" :required="true" labelWidth="230">
              <el-input v-model="lifePCMainConditionForm.companyName"
                :disabled = "isEdit"
                placeholder="双击弹出保险公司名称"
                @dblclick.native="alertDialogcomCode2(1)"
                slot="text" ></el-input>
            </ui-label-text>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row class="ri-line">
        <el-col :span="12">
          <el-form-item  prop="companyComCode"  >
            <ui-label-text  label="归属保险公司机构代码:" :required="true" labelWidth="230">
              <el-input
                v-model="lifePCMainConditionForm.companyComCode"
                :disabled="true"
                slot="text" ></el-input>
            </ui-label-text>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item  prop="companyComName"  >
            <ui-label-text  label="归属保险公司机构名称:" :required="true" labelWidth="230">
              <el-input v-model="lifePCMainConditionForm.companyComName"
              :disabled="true"
               slot="text" ></el-input>
            </ui-label-text>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row class="ri-line">
        <el-col :span="12">
          <el-form-item  prop="insuranceMark"  >
            <ui-label-text  label="新/续保标记:" :required="true" labelWidth="230">
              <el-select v-model="lifePCMainConditionForm.insuranceMark" :disabled="true" slot="text" placeholder="请选择">
              	<el-option label="新保" value="1"></el-option>
              	<el-option label="续保" value="0"></el-option>
              </el-select>
            </ui-label-text>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item  prop="atuoAcceptFlag"  >
            <ui-label-text  label="是否自动续保:" :required="false" labelWidth="230">
                <el-select v-model="lifePCMainConditionForm.atuoAcceptFlag" slot="text" placeholder="请选择">
                  <el-option label="是" value="1"></el-option>
                  <el-option label="否" value="0"></el-option>
                </el-select>
            </ui-label-text>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row class="ri-line">
        <el-col :span="12">
          <el-form-item  prop="businessNature">
            <ui-label-text  label="出单渠道:" :required="true" labelWidth="230">
              <!-- <el-input v-model="lifePCMainConditionForm.businessNature" slot="text" ></el-input> -->
              <el-select v-model="lifePCMainConditionForm.businessNature" :disabled="chudanchannel" slot="text" placeholder="请选择">
                  <el-option label="佰盈销售" value="1"></el-option>
                  <el-option label="同道" value="4"></el-option>
                </el-select>
            </ui-label-text>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item  prop="busiType"  >
            <ui-label-text  label="业务类型:" :required="true" labelWidth="230">
              <el-select v-model="lifePCMainConditionForm.busiType" :disabled="true" slot="text" placeholder="请选择">
              		<el-option label="直接业务" value="1"></el-option>
                  <el-option label="间接业务" value="2"></el-option>
              	</el-select>
            </ui-label-text>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row class="ri-line">
        <el-col :span="12">
          <el-form-item  prop="xjjzzddjbf" >
            <ui-label-text  label="现金价值自动垫缴保费:" :required="false" labelWidth="230">
                <el-select v-model="lifePCMainConditionForm.xjjzzddjbf" slot="text" placeholder="请选择">
                  <el-option label="是" value="1"></el-option>
                  <el-option label="否" value="0"></el-option>
                </el-select>
            </ui-label-text>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item  prop="xjjzdjbff"  >
            <ui-label-text  label="账户价值自动抵交保费:" :required="false" labelWidth="230">
                <el-select v-model="lifePCMainConditionForm.xjjzdjbff" slot="text" placeholder="请选择">
                  <el-option label="是" value="1"></el-option>
                  <el-option label="否" value="0"></el-option>
                </el-select>
            </ui-label-text>
          </el-form-item>
        </el-col>

      </el-row>
      <el-row class="ri-line">
        <el-col :span="12">
          <el-form-item  prop="hllqfs" >
            <ui-label-text  label="红利领取方式:" :required="false" labelWidth="230">
                <el-select v-model="lifePCMainConditionForm.hllqfs" slot="text" placeholder="请选择">
                  <el-option label="累积生息" value="1"></el-option>
                  <el-option label="抵缴保费" value="2"></el-option>
                  <el-option label="增额交清" value="3"></el-option>
                  <el-option label="转万能账户" value="4"></el-option>
                </el-select>
            </ui-label-text>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item  prop="njlqfs"  >
            <ui-label-text  label="年金领取方式:" :required="false" labelWidth="230">
                <el-select v-model="lifePCMainConditionForm.njlqfs" slot="text" placeholder="请选择">
                  <el-option label="累积生息" value="1"></el-option>
                  <el-option label="抵缴保费" value="2"></el-option>
                  <el-option label="增额交清" value="3"></el-option>
                  <el-option label="转万能账户" value="4"></el-option>
                </el-select>
            </ui-label-text>
          </el-form-item>
        </el-col>

      </el-row>
      <el-row class="ri-line">
        <el-col :span="12">
          <el-form-item  prop="speAgreement"  >
            <ui-label-text  label="特别约定:" :required="false" labelWidth="230">
              <el-input v-model="lifePCMainConditionForm.speAgreement" slot="text" ></el-input>
            </ui-label-text>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item  prop="updateTime" >
            <ui-label-text  label="更新时间:" :required="true" labelWidth="230">
              <!-- <el-input v-model="lifePCMainConditionForm.updateTime" slot="text" ></el-input> -->
              <el-input readonly v-model="this.updateTime" slot="text" ></el-input>
            </ui-label-text>
          </el-form-item>
        </el-col>

      </el-row>
      <el-row class="ri-line">
        <el-col :span="12">
          <el-form-item  prop="byMyself" >
            <ui-label-text  label="自保件:" :required="true" labelWidth="230">
              <!-- <el-select v-model="lifePCMainConditionForm.byMyself" @change="byMyself" slot="text" placeholder="请选择"> -->
              <el-select v-model="lifePCMainConditionForm.byMyself"  disabled slot="text" placeholder="请选择">
                <el-option label="是" value="1"></el-option>
                <el-option label="否" value="0"></el-option>
              </el-select>
            </ui-label-text>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item  prop="singleMode" >
            <ui-label-text  label="出单方式:" :required="true" labelWidth="230">
                <el-select v-model="lifePCMainConditionForm.singleMode" slot="text" placeholder="请选择">
                  <el-option label="同道" value="1"></el-option>
                  <el-option label="微/电投" value="2"></el-option>
                  <el-option label="纸质投保" value="3"></el-option>
                  <el-option label="其他" value="4"></el-option>
                </el-select>
            </ui-label-text>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <!--保险公司代码 的弹框-->
    <el-dialog :append-to-body="true" width="60%" :before-close="companyClose" center title="保险公司" :visible.sync="dialogTableVisibleCode">
      <el-table ref="multipleTable" @row-click="handleRowChange" :data="getInsurers" tooltip-effect="dark" style="width: 100%">
        <el-table-column prop="insurercode"  label="保险公司代码" show-overflow-tooltip>
        </el-table-column>
        <el-table-column prop="insurername" label="保险公司名称" show-overflow-tooltip>
        </el-table-column>
      </el-table>
      <div class="block" style="margin-top:15px;padding-bottom:15px">
        <el-pagination
          @current-change="handleCurrentChangeCode"
          @size-change="SizeChangeCom"
          :current-page.sync="info.currentPage"
          :page-sizes="sizeList"
          :page-size="100"
          layout="total, sizes, prev, pager, next, jumper"
          :total="totalrecords == totalrecords ? totalrecords : 0">
        </el-pagination>
      </div>
    </el-dialog>
      <!--保险机构代码 的弹框-->
    <el-dialog :append-to-body="true" width="60%" :before-close="orgClose" center title="保险机构" :visible.sync="dialogTableOrg">
        <el-table ref="multipleTable" @row-click="handleRowChangeOrg" :data="getInsurersOrg" tooltip-effect="dark" style="width: 100%">
          <el-table-column prop="orgcode"  label="保险机构代码" show-overflow-tooltip>
          </el-table-column>
          <el-table-column prop="orgname" label="保险机构名称" show-overflow-tooltip>
          </el-table-column>
        </el-table>
    </el-dialog>

  </div>
</template>

<script>
import NoticeBar from '@/components/notice-bar'
import LabelText from '@/components/label-text'
import LineTittle from '@/components/line-tittle'
import Bus from './bus.js'
import { mapActions } from 'vuex'
import {
  api
} from '@/api/lifeInsur_mgr/quitListMgr.js'

export default {
  name: '',
  props: ['isEdit', 'basic', 'isSuper'], // isEdit在投保单修改时为true,basic为父组件传入的数据，isSuper在投保单超级权限修改时为true
  data () {
    const {noEmptyValidator, letterNumberValidator} = this.$store.getters.validators
    return {
      oldNo: '', // 用于判断投保单号是否改变的标识
      info: {
        // current: 1
      },
      stopDate:'',
      infoPage: {},
      updateTime: '',
      // 新增的表单验证
      lifePCMainConditionForm: {
        proposalNo: '',
        proposalNo1: '',
        proposalNo4: '',
        proposalDate: '',
        companyCode: '',
        companyName: '',
        companyComCode: '',
        companyComName: '',
        insuranceMark: '新保',
        atuoAcceptFlag: '',
        businessNature: '1',
        busiType: '直接业务',
        xjjzzddjbf: '', // 现金价值自动垫缴保费 1-是 0-否
        xjjzdjbff: '', // 账户价值自动抵交保费 1-是 0-否
        hllqfs: '', // 红利领取方式 1-累积生息 2-抵缴保费 3-增额交清 4-转万能账户
        njlqfs: '', // 年金领取方式 1-累积生息 2-抵缴保费 3-增额交清 4-转万能账户
        speAgreement: '',
        updateTime: '',
        byMyself: '0', // 自保件 1-是 0-否
        singleMode: '2'// 出单方式 1-同道 2-微/电投 3-纸质投保 4-其他
      },
      lifePCMainConditionRules: {
        proposalNo: letterNumberValidator,
        proposalNo1: noEmptyValidator,
        proposalNo2: noEmptyValidator,
        proposalDate: noEmptyValidator,
        companyCode: noEmptyValidator,
        companyName: noEmptyValidator,
        companyComCode: noEmptyValidator,
        companyComName: noEmptyValidator,
        insuranceMark: noEmptyValidator,
        businessNature: noEmptyValidator,
        busiType: noEmptyValidator,
        updateTime: noEmptyValidator,
        byMyself: noEmptyValidator,
        singleMode: noEmptyValidator
      },
      page: '',
      disabledEdit: false,
      longFlag1: false,
      dialogInsurer: false,
      // disabledEdit: false,
      disabledEdit1: false,
      isdisabled: false,
      // longFlag1: false,
      longFlag2: false,
      dialogTableVisibleCode: false,
      dialogTableOrg: false,
      identifyValiddate: false,
      dialogsustomerOrg: false, // 客户所属机构
      searchcode: {
        pageSize: '5'
      },
      searchcOrg: {}, // 客户所属机构的查询对象
      checkproposalNo: {},
      copyproposalNo: {
        proposalNo: '',
        proposalNo4: ''
      },
      infoOrg: {}, // 查询机构的信息
      selfflag: '0',
      getInsurers: [], // 保险公司查询出来的数据
      totalrecords: 0,
      sizeList: [5, 10, 20, 50], // 公司
      getInsurersOrg: [], // 保险机构查询出来的数据
      orgRecords: 0,
      sizeListOrg: [5, 10, 20, 50],  // 机构
      chudanchannel: true
    }
  },
  mounted () {
    this.getTime() // 自动填入更新时间
    // Bus.$on('val', (data) => {
    //   // alert(data)
    // })
    this.reqStopDate()
  },

  methods: {
    ...mapActions([
      'queryproposalForm_1',
      'getInsurers_1',
      'getInsurersOrg_1',
      'ProposalNoIsExist_1',
      'getInsurersCom',
      'getStopDate_1'
    ]),
    //获取截止投保时间
    reqStopDate() {
      this.getStopDate_1().then((res)=>{
        this.stopDate = res.data.AcceptDate
      })
    },

    check () { // 调用后台查询投保单号是否已存在
      if (this.oldNo !== this.lifePCMainConditionForm.proposalNo) {
        // this.lifePCMainConditionForm.proposalNo1 = this.lifePCMainConditionForm.proposalNo
        this.ProposalNoIsExist_1(this.lifePCMainConditionForm).then(result => {
          // alert(JSON.stringify(result.flag))
          if (result.flag === '0') {
            this.open('error', '投保单号已使用，不可重复录入')
            this.lifePCMainConditionForm.proposalNo = ''
          } else if (result.flag === '1') {
            if ((this.lifePCMainConditionForm.proposalNo1 !== '') && (this.lifePCMainConditionForm.proposalNo1 !== this.lifePCMainConditionForm.proposalNo)) {
              this.open('error', '投保单号不一致！')
              this.lifePCMainConditionForm.proposalNo1 = ''
            }
          }
        })
      }
    },
    checkopy () {
      if (this.lifePCMainConditionForm.proposalNo1 !== this.lifePCMainConditionForm.proposalNo) {
        this.open('error', '投保单号不一致！')
        this.lifePCMainConditionForm.proposalNo1 = ''
      }
    },
    alertDialogcomCode (page) { // 保险公司code   双击
      if (!this.isEdit) {
        this.info.currentPage = page
        this.info.pageSize = '5'
        this.sizeList = [5, 10, 20, 50]
        this.info.type = '2'
        this.info.clickType = '2'

        this.info.insurerCode = this.lifePCMainConditionForm.companyCode
        this.info.insurerName = this.lifePCMainConditionForm.companyName

        this.getInsurers = []
        this.getInsurers_1(this.info).then(result => {
          if (result.code === '000000') {
            this.getInsurers = result.data.data
            this.totalrecords = result.data.totalRecords
            // this.open('success', '查询成功!')
            this.dialogTableVisibleCode = true
          } else if (result.code === '000003') {
            this.dialogTableVisibleCode = true
          } else {
            this.open('error', result.msg)
            this.lifePCMainConditionForm.companyCode = ''
            this.lifePCMainConditionForm.companyName = ''
          }
        })
      }
    },
    alertDialogcomCode1 (page) { // 保险公司code   失焦
      if (!this.isEdit) {
        if (this.dialogTableVisibleCode === true) {
          return false
        }
        this.lifePCMainConditionForm.companyName = ''
        this.lifePCMainConditionForm.companyComCode = ''
        this.lifePCMainConditionForm.companyComName = ''
        this.info.currentPage = page
        this.info.pageSize = '10'
        this.info.type = '2'
        this.info.clickType = '1'

        if (this.lifePCMainConditionForm.companyCode === '' || this.lifePCMainConditionForm.companyCode === null || this.lifePCMainConditionForm.companyCode === undefined) {
          return false
        }
        this.info.insurerCode = this.lifePCMainConditionForm.companyCode
        this.getInsurers_1(this.info).then(result => {
          if (result.code === '000000') {
            this.lifePCMainConditionForm.companyCode = result.data.insurercode
            this.lifePCMainConditionForm.companyName = result.data.insurername
          } else {
            this.open('error', result.msg)
            this.lifePCMainConditionForm.companyCode = ''
            this.lifePCMainConditionForm.companyName = ''
            this.info.insurerCode = ''
            this.info.insurerName = ''
          }
        })
      }
    },
    alertDialogcomCode2 (page) { // 保险公司name   双击
      if (!this.isEdit) {
        this.info.currentPage = page
        this.info.pageSize = '5'
        this.sizeList = [5, 10, 20, 50]
        this.info.type = '2'
        this.info.clickType = '2'

        this.info.insurerCode = this.lifePCMainConditionForm.companyCode
        this.info.insurerName = this.lifePCMainConditionForm.companyName
        this.getInsurers = []
        this.getInsurers_1(this.info).then(result => {
          if (result.code === '000000') {
            this.getInsurers = result.data.data
            this.totalrecords = result.data.totalRecords
            // this.open('success', '查询成功!')
            this.dialogTableVisibleCode = true
          } else if (result.code === '000003') {
            this.dialogTableVisibleCode = true
          } else {
            this.open('error', result.msg)
            this.lifePCMainConditionForm.companyCode = ''
            this.lifePCMainConditionForm.companyName = ''
          }
        })
      }
    },
    alertDialogcomCode3 (page) { // 保险公司code   失焦
      if (!this.isEdit) {
        if (this.dialogTableVisibleCode === true) {
          return false
        }
        this.lifePCMainConditionForm.companyCode = ''
        this.lifePCMainConditionForm.companyComCode = ''
        this.lifePCMainConditionForm.companyComName = ''
        this.info.currentPage = page
        this.info.pageSize = '10'
        this.info.type = '2'
        this.info.clickType = '1'

        if (this.lifePCMainConditionForm.companyName === '' || this.lifePCMainConditionForm.companyName === null || this.lifePCMainConditionForm.companyName === undefined) {
          return false
        }
        this.info.insurerName = this.lifePCMainConditionForm.companyName
        this.getInsurers_1(this.info).then(result => {
          if (result.code === '000000') {
            this.lifePCMainConditionForm.companyCode = result.data.insurercode
            this.lifePCMainConditionForm.companyName = result.data.insurername
          } else {
            this.open('error', result.msg)
            this.lifePCMainConditionForm.companyCode = ''
            this.lifePCMainConditionForm.companyName = ''
            this.info.insurerCode = ''
            this.info.insurerName = ''
          }
        })
      }
    },
    // 保险公司分页条数
    SizeChangeCom (val) {
      this.info.pageSize = val
      this.info.currentPage = 1
      this.getInsurers_1(this.info).then(result => {
        if (result.code === '000000') {
          this.getInsurers = result.data.data
          this.totalrecords = result.data.totalRecords
          // this.open('success', '查询成功!')
          this.dialogTableVisibleCode = true
        } else if (result.code === '000003') {
          this.dialogTableVisibleCode = true
        } else {
          this.open('error', result.msg)
          this.lifePCMainConditionForm.companyCode = ''
          this.lifePCMainConditionForm.companyName = ''
        }
      })
    },
     // 查询保险机构代码的分页条数
    SizeChangeOrg (val) {
      this.info.pageSize = val
      this.info.currentPage = 1
      // this.infoPage.
      // this.getInsurersOrg_1(this.infoPage)
      this.getInsurersOrg_1(this.info).then(result => {
        if (result.code === '000000') {
          this.getInsurersOrg = result.data.data
          this.orgRecords = result.data.totalRecords
        }
      })
    },
     // 保险机构代码 -------------------------------- 开始
    alertDialogcomOrg (page) {
      this.info.currentPage = page
      this.info.pageSize = '5'
      this.info.clickType = '2'
      this.sizeListOrg = [5, 10, 20, 50]

      this.info.insurerCode = this.lifePCMainConditionForm.companyCode
      this.info.orgCode = this.lifePCMainConditionForm.companyComCode
      this.info.orgName = this.lifePCMainConditionForm.companyComName
      if (this.lifePCMainConditionForm.companyCode === '' || this.lifePCMainConditionForm.companyCode === undefined) {
        this.open('error', '请先输入保险公司代码！')
        return false
      } else {
        this.dialogTableOrg = true
        this.info.insurerCode = this.lifePCMainConditionForm.companyCode
        this.getInsurersOrg_1(this.info).then(result => {
          if (result.code === '000000') {
            this.getInsurersOrg = result.data.data
            this.orgRecords = result.data.totalRecords
          } else if (result.code === '000002') {
            this.getInsurersOrg = []
            this.orgRecords = 0
          }
        })
      }
    },
    // ----------------------------------------------------------------
    alertDialogcomOrg1 (page) { // 保险公司code   失焦
      if (this.dialogTableOrg === true) {
        return false
      }
      this.info.currentPage = page
      this.info.pageSize = '5'
      this.info.type = '2'
      this.info.insurerCode = this.lifePCMainConditionForm.companyCode
      this.info.clickType = '1'

      if (this.lifePCMainConditionForm.companyComCode === '' || this.lifePCMainConditionForm.companyComCode === null || this.lifePCMainConditionForm.companyComCode === undefined) {
        return false
      }
      this.info.orgCode = this.lifePCMainConditionForm.companyComCode
      this.getInsurersOrg_1(this.info).then(result => {
        if (result.code === '000000') {
          this.lifePCMainConditionForm.companyComCode = result.data.data[0].orgcode
          this.lifePCMainConditionForm.companyComName = result.data.data[0].orgname
        } else if (result.code === '000002') {
          this.open('error', result.msg)
          this.lifePCMainConditionForm.companyComCode = ''
          this.lifePCMainConditionForm.companyComName = ''
        }
      })
    },
    alertDialogcomOrg2 (page) {
      this.info.currentPage = page
      this.info.pageSize = '5'
      this.info.clickType = '2'
      this.info.insurerCode = this.lifePCMainConditionForm.companyCode
      this.sizeListOrg = [5, 10, 20, 50]

      this.info.insurerCode = this.lifePCMainConditionForm.companyCode
      this.info.orgCode = this.lifePCMainConditionForm.companyComCode
      this.info.orgName = this.lifePCMainConditionForm.companyComName
      if (this.lifePCMainConditionForm.companyCode === '' || this.lifePCMainConditionForm.companyCode === undefined) {
        this.open('error', '请先输入保险公司代码！')
        return false
      } else {
        this.dialogTableOrg = true
        this.info.insurerCode = this.lifePCMainConditionForm.companyCode
        this.getInsurersOrg_1(this.info).then(result => {
          if (result.code === '000000') {
            this.getInsurersOrg = result.data.data
            this.orgRecords = result.data.totalRecords
          } else if (result.code === '000002') {
            this.getInsurersOrg = []
            this.orgRecords = 0
          }
        })
      }
    },
    alertDialogcomOrg3 (page) { // 保险公司code   失焦
      if (this.dialogTableOrg === true) {
        return false
      }
      this.info.currentPage = page
      this.info.pageSize = '5'
      this.info.type = '2'
      this.info.clickType = '1'

      this.info.insurerCode = this.lifePCMainConditionForm.companyCode
      if (this.lifePCMainConditionForm.companyComName === '' || this.lifePCMainConditionForm.companyComName === null || this.lifePCMainConditionForm.companyComName === undefined) {
        return false
      }
      this.info.orgName = this.lifePCMainConditionForm.companyComName
      this.getInsurersOrg_1(this.info).then(result => {
        if (result.code === '000000') {
          this.lifePCMainConditionForm.companyComCode = result.data.data[0].orgcode
          this.lifePCMainConditionForm.companyComName = result.data.data[0].orgname
        } else if (result.code === '000002') {
          this.open('error', result.msg)
          this.lifePCMainConditionForm.companyComCode = ''
          this.lifePCMainConditionForm.companyComName = ''
        }
      })
    },
    // 保险机构代码 -------------------------------- 结束
    // 投保人代码
    alertDialoginsuCode (page) {
      this.info.currentPage = page
      this.dialogInsurer = true
    },
    // 保险公司代码和名称查询 选填 放到表单中
    handleRowChange (row, event, column) {
      let temp = {
        'companyCode': row.insurercode
      }
      api('/proposalForm/findProvince', 'post', temp).then((res) => {
        if (res.data.length > 1) {
          this.dialogTableOrg = true
          this.getInsurersOrg = res.data
        } else {
          this.lifePCMainConditionForm.companyComCode = res.data[0].orgcode
          this.lifePCMainConditionForm.companyComName = res.data[0].orgname
        }
      })
      this.closeDailog().then(() => {
        this.lifePCMainConditionForm.companyCode = row.insurercode
        this.lifePCMainConditionForm.companyName = row.insurername
        this.dialogTableVisibleCode = false
        var companyCode = this.lifePCMainConditionForm.companyCode
      // alert('22:' + companyCode)
      // 向父组件传递值
      // this.$emit('childByValue', companyCode)
      // 兄弟组件之间传值
        Bus.$emit('val', companyCode)

        this.$store.state.proposalForm.companyCode = companyCode
        this.info = {}
        this.info.insurerCode = ''
        this.info.insurerName = ''
        this.sizeList = []
        this.getInsurers = []
        this.totalrecords = 0
      })
    },
    companyClose () {  // 保险公司关闭弹框清除数据
      this.lifePCMainConditionForm.companyCode = ''
      this.lifePCMainConditionForm.companyName = ''
      this.lifePCMainConditionForm.companyComCode = ''
      this.lifePCMainConditionForm.companyComName = ''
      this.$store.state.proposalForm.companyCode = ''
      // 清除查询的数据
      this.info.insurerCode = ''
      this.info.insurerName = ''
      this.sizeList = []
      this.totalrecords = 0
      this.dialogTableVisibleCode = false
    },
    // 保险机构代码和名称查询 选填 放到表单中
    handleRowChangeOrg (row, event, column) {
      this.closeDailog().then(() => {
        this.lifePCMainConditionForm.companyComCode = row.orgcode
        this.lifePCMainConditionForm.companyComName = row.orgname
        this.dialogTableOrg = false
        this.sizeListOrg = []
        this.info.orgCode = ''
        this.info.orgName = ''
        // this.getInsurersOrg = []
        this.orgRecords = 0
        this.info = {}
      })
    },
    orgClose () {  // 保险公司关闭弹框清除数据
      this.lifePCMainConditionForm.companyComCode = ''
      this.lifePCMainConditionForm.companyComName = ''

      this.info.orgCode = ''
      this.info.orgName = ''
      this.sizeListOrg = []
      this.orgRecords = 0
      // this.info = {}
      this.dialogTableOrg = false
    },
    // 客户所属机构点击
    customerinOrg1 (row, event, column) {
      if ((this.insertForm.identifyValiddate === '' ||
          this.insertForm.identifyValiddate === null ||
          this.insertForm.identifyValiddate === undefined) &&
          this.insertForm.isLongFlag === 1) {
        this.disabledEdit1 = true
        this.isdisabled = true
        this.longFlag2 = true
      } else {
        this.disabledEdit1 = false
      }
    },
    handleCurrentChangeCode (val) { // 1111111111111111111111111    公司的页面跳转查询
      this.info.currentPage = val

      this.getInsurers_1(this.info).then(result => {
        if (result.code === '000000') {
          this.getInsurers = result.data.data
          this.totalrecords = result.data.totalRecords
          // this.open('success', '查询成功!')
          this.dialogTableVisibleCode = true
        } else if (result.code === '000003') {
          this.dialogTableVisibleCode = true
        } else {
          this.open('error', result.msg)
          this.lifePCMainConditionForm.companyCode = ''
          this.lifePCMainConditionForm.companyName = ''
        }
      })
    },
    handleCurrentChangeOrg (val) {   // 222222222222222222222222222   机构的页面跳转查询
      this.info.currentPage = val

      this.getInsurersOrg_1(this.info).then(result => {
        if (result.code === '000000') {
          this.getInsurersOrg = result.data.data
          this.orgRecords = result.data.totalRecords
        }
      })
    },
    open (type, mesg) { // toast提示
      this.$message({
        showClose: true,
        message: mesg,
        type: type
      })
    },
    getTime () { // 查询当前时间
      var date = new Date()
      this.updateTime = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + (date.getDate() >= 10 ? date.getDate() : '0' + date.getDate()) + ' ' + (date.getHours() >= 10 ? date.getHours() : '0' + date.getHours()) + ':' + (date.getMinutes() >= 10 ? date.getMinutes() : '0' + date.getMinutes()) + ':' + (date.getSeconds() >= 10 ? date.getSeconds() : '0' + date.getSeconds())

      this.lifePCMainConditionForm.updateTime = this.updateTime
    },
    validateForm () {
      let flag = false
      this.$refs.lifePCMainConditionForm.validate((valid) => {
        flag = valid
      })
      return flag
    },
    closeDailog () {
      return new Promise((resolve, reject) => {
        this.show_dialog = false
        resolve()
      })
    },
    companyCodeChange (val) {
      this.$store.state.proposalForm.companyCode = this.lifePCMainConditionForm.companyCode
    }
  },
  components: {
    [NoticeBar.name]: NoticeBar,
    [LabelText.name]: LabelText,
    [LineTittle.name]: LineTittle
  },
  computed: {
    // 客户所属机构查询出来的总条数
    customerFindTotals () {
      return parseInt(this.$store.state.proposalForm.customerFindTotals)
    },
    // 自保件
    byMyself1 () {
      return this.$store.state.proposalForm.selfFlag
    }

  },
  watch: {
    byMyself1 (val) {  // 这才是自保件
      this.selfflag = val
      if (this.selfflag === 1 || this.selfflag === '1') {
        this.lifePCMainConditionForm.byMyself = '1'
      } else {
        this.lifePCMainConditionForm.byMyself = '0'
      }
    },
    basic (val) {
      this.lifePCMainConditionForm = val
      this.lifePCMainConditionForm.proposalNo4 = val.proposalNo
      this.oldNo = this.lifePCMainConditionForm.proposalNo
    }
  },
  created () {
    if (this.basic !== undefined) {
      this.lifePCMainConditionForm = this.basic
      this.lifePCMainConditionForm.proposalNo4 = this.basic.proposalNo
      this.oldNo = this.lifePCMainConditionForm.proposalNo
      this.$store.state.proposalForm.companyCode = this.lifePCMainConditionForm.companyCode
    }
  }
}
</script>

<style lang="scss" scoped type="text/css">
 .ri-line { margin-bottom: 10px; }
 .center{text-align: center}
 .marginTB{margin:15px 0;}
 .el-pagination{float: right;padding-bottom: 15px;}

</style>
<style>
 .el-form-item__error{padding-left: 160px !important}
</style>

