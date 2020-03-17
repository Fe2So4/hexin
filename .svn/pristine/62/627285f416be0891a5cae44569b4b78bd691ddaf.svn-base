<template>
  <div class="marginTB">
    <el-form :rules="lifePCMainConditionRules" ref="lifePCMainConditionForm" :model="lifePCMainConditionForm">
      <el-row class="ri-line">
        <el-col :span="12">
          <el-form-item  prop="proposalNo" >
            <ui-label-text label="投保单号:"  labelWidth="160">
              <el-input slot="text" readonly v-model="basic.proposalNo" ></el-input>
            </ui-label-text>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item prop="proposalDate">
            <ui-label-text :required="true"  label="投保日期：" labelWidth="160" >
              <el-date-picker value-format="yyyy-MM-dd" slot="text" v-model="basic.proposalDate" type="date" placeholder="选择日期"> </el-date-picker>
            </ui-label-text>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row class="ri-line">
        <el-col :span="12">
          <el-form-item  prop="companyCode" >
            <ui-label-text label="归属保险公司代码:"  labelWidth="160">
              <el-input slot="text" readonly v-model="basic.companyCode" ></el-input>
            </ui-label-text>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item  prop="companyName" >
            <ui-label-text  label="归属保险公司名称" labelWidth="160" >
              <el-input slot="text" readonly v-model="basic.companyName" ></el-input>
            </ui-label-text>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row class="ri-line">
        <el-col :span="12">
          <el-form-item  prop="companyComCode">
            <ui-label-text  label="归属保险公司机构代码:" :required="true" labelWidth="160">
              <el-input
                v-model="basic.companyComCode"
                placeholder="双击弹出保险公司机构代码"
                @dblclick.native="alertDialogcomOrg(1)"
                slot="text" ></el-input>
            </ui-label-text>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item  prop="companyComName" >
            <ui-label-text  label="归属保险公司机构名称:"  labelWidth="160">
              <el-input v-model="basic.companyComName" readonly slot="text" ></el-input>
            </ui-label-text>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row class="ri-line">
        <el-col :span="12">
          <el-form-item  prop="insuranceMark"  >
            <ui-label-text  label="新/续保标记:"  labelWidth="160">
              <el-input v-model="basic.insuranceMark" readonly slot="text" ></el-input>
            </ui-label-text>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item  prop="atuoAcceptFlag">
            <ui-label-text  label="是否自动续保:" :required="true" labelWidth="160">
                <el-select v-model="basic.atuoAcceptFlag" slot="text" placeholder="请选择">
                  <el-option label="是" value="1"></el-option>
                  <el-option label="否" value="0"></el-option>
                </el-select>
            </ui-label-text>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row class="ri-line">
        <el-col :span="12">
          <el-form-item  prop="businessNature"  >
            <ui-label-text  label="出单渠道:"  labelWidth="160">
                <!-- <el-input v-model="basic.businessNature" readonly slot="text" ></el-input> -->
              <el-select v-model="basic.businessNature" disabled slot="text" placeholder="请选择">
                <el-option label="佰盈销售" value="1"></el-option>
                <el-option label="同道" value="4"></el-option>
              </el-select>
            </ui-label-text>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item  prop="busiType"  >
            <ui-label-text  label="业务类型:"  labelWidth="160">
              <el-input v-model="basic.busiType" readonly slot="text" ></el-input>
            </ui-label-text>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row class="ri-line">
        <el-col :span="12">
          <el-form-item  prop="xjjzzddjbf" >
            <ui-label-text  label="现金价值自动垫缴保费:" :required="false" labelWidth="160">
                <el-select v-model="basic.xjjzzddjbf" slot="text" placeholder="请选择">
                  <el-option label="是" value="1"></el-option>
                  <el-option label="否" value="0"></el-option>
                </el-select>
            </ui-label-text>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item  prop="xjjzdjbff" >
            <ui-label-text  label="账户价值自动抵交保费:" :required="false" labelWidth="160">
                <el-select v-model="basic.xjjzdjbff" slot="text" placeholder="请选择">
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
            <ui-label-text  label="红利领取方式:" :required="false" labelWidth="160">
                <el-select v-model="basic.hllqfs" slot="text" placeholder="请选择">
                  <el-option label="累积生息" value="1"></el-option>
                  <el-option label="抵缴保费" value="2"></el-option>
                  <el-option label="增额交清" value="3"></el-option>
                  <el-option label="转万能账户" value="4"></el-option>
                </el-select>
            </ui-label-text>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item  prop="njlqfs">
            <ui-label-text  label="年金领取方式:" :required="false" labelWidth="160">
              <el-select v-model="basic.njlqfs" slot="text" placeholder="请选择">
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
          <el-form-item  prop="speAgreement">
            <ui-label-text  label="特别约定:" :required="false" labelWidth="160">
              <el-input v-model="basic.speAgreement" slot="text" ></el-input>
            </ui-label-text>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item  prop="updateTime" >
            <ui-label-text  label="更新时间:"  labelWidth="160">
              <el-input v-model="basic.updateTime" readonly slot="text" ></el-input>
            </ui-label-text>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row class="ri-line">
        <el-col :span="12">
          <el-form-item  prop="byMyself" >
            <ui-label-text  label="自保件:" :required="true" labelWidth="160">
              <el-select v-model="basic.byMyself" disabled slot="text" placeholder="请选择">
                  <el-option label="是" value="1"></el-option>
                  <el-option label="否" value="0"></el-option>
                </el-select>
            </ui-label-text>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item  prop="singleMode" >
            <ui-label-text  label="出单方式:" :required="true" labelWidth="160">
                <el-select v-model="basic.singleMode" slot="text" placeholder="请选择">
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
      <!--保险机构代码 的弹框-->
    <el-dialog :append-to-body="true" width="50%" center title="保险机构代码" :visible.sync="dialogTableOrg">
        <el-table ref="multipleTable" @row-click="handleRowChangeOrg" :data="getInsurersOrg" tooltip-effect="dark" style="width: 100%">
          <el-table-column prop="orgcode"  label="保险机构代码" show-overflow-tooltip>
          </el-table-column>
          <el-table-column prop="orgname" label="保险机构名称" show-overflow-tooltip>
          </el-table-column>
        </el-table>
        <div class="block">
          <el-pagination
            @current-change="handleCurrentChangeOrg"
            @size-change="SizeChangeOrg"
            :current-page="info.currentPage"
            :page-sizes="[10,20,50,]"
            :page-size="100"
            layout="total, sizes, prev, pager, next, jumper"
            :total="orgRecords == orgRecords ? orgRecords : 0">
          </el-pagination>
        </div>
    </el-dialog>

  </div>
</template>

<script>
import NoticeBar from '@/components/notice-bar'
import LabelText from '@/components/label-text'
import LineTittle from '@/components/line-tittle'
// import Bus from './bus.js'
import { mapActions } from 'vuex'

export default {
  name: '',
  data () {
    const { noEmptyValidator } = this.$store.getters.validators
    return {
      info: {
        // current: 1
      },
      updateTime: '',
      // 新增的表单验证
      lifePCMainConditionForm: {
        proposalNo: '',
        proposalDate: '',
        companyCode: '',
        companyName: '',
        companyComCode: '',
        companyComName: '',
        insuranceMark: '新保',
        atuoAcceptFlag: '',
        businessNature: '1',
        busiType: '直接业务',
        xjjzzddjbf: '',
        xjjzdjbff: '',
        hllqfs: '',
        njlqfs: '',
        speAgreement: '',
        updateTime: '',
        byMyself: '',
        singleMode: ''
      },
      lifePCMainConditionRules: {
        proposalDate: noEmptyValidator,
        // companyCode: noEmptyValidator,
        // companyName: noEmptyValidator,
        companyComCode: noEmptyValidator,
        companyComName: noEmptyValidator,
        insuranceMark: noEmptyValidator,
        atuoAcceptFlag: noEmptyValidator,
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
      dialogTableOrg: false,
      identifyValiddate: false,
      dialogsustomerOrg: false, // 客户所属机构
      searchcode: {
        pageSize: '5'
      },
      searchcOrg: {}, // 客户所属机构的查询对象
      checkproposalNo: {},
      copyproposalNo: {}
     // lifePCMain: {}
    }
  },
  mounted () {
    // console.log('这是什么意思:' + JSON.stringify(this.$store.state.proposalForm.lifePCMainCondition))

    this.$nextTick(function () {
      // 初始化数据
      this.lifePCMainConditionForm = this.$store.state.proposalForm.lifePCMainCondition
    })
  },
  props: ['basic'],
  methods: {
    ...mapActions([
      'queryproposalForm_1',
      'getInsurers_1',
      'getInsurersOrg_1',
      'ProposalNoIsExist_1'
    ]),
    check () {
      this.checkproposalNo.proposalNo = this.lifePCMainConditionForm.proposalNo
      this.ProposalNoIsExist_1(this.checkproposalNo)
      if (this.$store.state.proposalForm.chekflag === '0') {
        this.open('error', '此投保单号已存在，请重新输入！')
      }
    },
    checkopy () {
      // alert(JSON.stringify(this.copyproposalNo.proposalNo))
      if (this.copyproposalNo.proposalNo !== this.lifePCMainConditionForm.proposalNo) {
        this.open('error', '投保单号不一致！')
      }
    },
    query (page) {
      // this.info.current = page
      // alert(this.info.currentPage)
      // this.queryproposalForm_1(this.info)
    },
    handleCurrentChange (val) {
      console.log(`当前页: ${val}`)
      // this.info.currentPage = val
      console.log(this.info.currentPage)
      // this.query(val)
    },
    /** ******************开始********************** */
    handleCurrentChangeOrg (val) {
      console.log(`当前前页: ${val}`)
      this.info.currentPage = val
      console.log(this.info.currentPage)
      console.log('info:' + JSON.stringify(this.info))
      this.getInsurersOrg_1(this.info)
    },
     // 查询保险机构代码的分页条数
    SizeChangeOrg (val) {
      console.log(`每页 ${val} 条`)
      this.infoPage.pageSize = val
      this.infoPage.currentPage = 1
      this.getInsurersOrg_1(this.infoPage)
    },
    /** ******************结束********************** */
     // 保险机构代码
    alertDialogcomOrg (page) {
      console.log('page:' + page)
      this.info.currentPage = page
      console.log('info:' + JSON.stringify(this.info))
      // if (this.lifePCMain.companyCode === '' || this.lifePCMain.companyCode === undefined) {
      //   this.open('error', '请先输入保险公司代码！')
      //   return false
      // } else {
      //   this.dialogTableOrg = true
      //   this.info.insurerCode = this.lifePCMain.companyCode
      //   this.getInsurersOrg_1(this.info)
      // }
      this.info.insurerCode = this.lifePCMainConditionForm.companyCode
      this.info.pageSize = '10'
      this.getInsurersOrg_1(this.info)
      this.dialogTableOrg = true
    },
    // 投保人代码
    alertDialoginsuCode (page) {
      // this.info.currentPage = page
      this.info.currentPage = page
      this.dialogInsurer = true
    },
    // 保险机构代码和名称查询 选填 放到表单中
    handleRowChangeOrg (row, event, column) {
      this.lifePCMainConditionForm.companyComCode = row.orgcode
      this.lifePCMainConditionForm.companyComName = row.orgname
      this.dialogTableOrg = false
    },
    // 客户所属机构点击
    customerinOrg1 (row, event, column) {
      // alert(JSON.stringify(row))
      // this.insertForm1.insureNameD = row.custName

      // this.dialogInsurer = false

      // alert('identifyValiddate:' + JSON.stringify(this.insertForm.identifyValiddate))
      // alert('isLongFlag:' + JSON.stringify(this.insertForm.isLongFlag))

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
    handleCurrentChangeCode (val) {
      console.log(`当前前页: ${val}`)
      // this.info.currentPage = val
      // this.info.currentPage = val
      this.info.currentPage = val
      // alert(JSON.stringify(this.info))
      console.log(this.info.currentPage)
      console.log('info:' + JSON.stringify(this.info))
      this.getInsurers_1(this.info)
    },
    // toast提示
    open (type, mesg) {
      this.$message({
        showClose: true,
        message: mesg,
        type: type
      })
    },
    getTime () {
      var date = new Date()
      this.updateTime = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + (date.getDate() >= 10 ? date.getDate() : '0' + date.getDate()) + ' ' + (date.getHours() >= 10 ? date.getHours() : '0' + date.getHours()) + ':' + (date.getMinutes() >= 10 ? date.getMinutes() : '0' + date.getMinutes()) + ':' + (date.getSeconds() >= 10 ? date.getSeconds() : '0' + date.getSeconds())

      console.log(this.updateTime)
      this.lifePCMainConditionForm.updateTime = this.updateTime
    },
    validateForm () {
      let flag = false
      this.$refs.lifePCMainConditionForm.validate((valid) => {
        flag = valid
      })
      return flag
    }
  },
  components: {
    [NoticeBar.name]: NoticeBar,
    [LabelText.name]: LabelText,
    [LineTittle.name]: LineTittle
  },
  computed: {
    getInsurersOrg () {
      return this.$store.state.InsuranceCo.getInsurersOrg
    },
    orgRecords () {
      return parseInt(this.$store.state.InsuranceCo.orgRecords)
    },
    // 客户所属机构查询出来的总条数
    customerFindTotals () {
      return parseInt(this.$store.state.proposalForm.customerFindTotals)
    }
    // this.lifePCMainConditionForm = this.$store.state.proposalForm.lifePCMainCondition
    // lifePCMain () {
    //   return this.$store.state.proposalForm.lifePCMainCondition
    // }

  },
  created () {
    console.log(this.basic)
  }
}
</script>

<style lang="scss" scoped type="text/css">
 .ri-line { margin-bottom: 10px; }
 .center{text-align: center}
 .marginTB{margin:15px 0;}
 .el-pagination{float: right;padding-right: 50px;}
</style>
<style>
 .el-form-item__error{padding-left: 160px !important}
</style>
