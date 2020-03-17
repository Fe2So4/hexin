<template>
  <div class="marginTB">
    <el-form :rules="lifePartyConditionRules" ref="lifePartyConditionForm" :model="lifePartyConditionForm">
      <el-row class="ri-line">
        <el-col :span="12">
          <el-form-item  prop="insureNo">
            <ui-label-text  label="投保人代码:"  labelWidth="160">
              <el-input v-model="insur.insureNo" readonly slot="text" ></el-input>
            </ui-label-text>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item  prop="insureName" >
            <ui-label-text  label="投保人名称:"  labelWidth="160">
              <el-input v-model="insur.insureName"  readonly slot="text" ></el-input>
            </ui-label-text>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row class="ri-line">
        <el-col :span="12">
          <el-form-item  prop="insureAddress" >
            <ui-label-text  label="投保人地址:" :required="false" labelWidth="160">
              <el-input v-model="insur.insureAddress" readonly slot="text" ></el-input>
            </ui-label-text>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item  prop="postNo">
            <ui-label-text  label="邮政编码:" :required="false" labelWidth="160">
              <el-input v-model="insur.postNo" readonly slot="text" ></el-input>
            </ui-label-text>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row class="ri-line">
        <el-col :span="12">
          <el-form-item  prop="sexType" >
            <ui-label-text  label="性别:" :required="false" labelWidth="160">
              <el-select v-model="insur.sexType" disabled slot="text" placeholder="请选择">
                <el-option label="男"  value="0"></el-option>
                <el-option label="女"  value="1"></el-option>
              </el-select>
            </ui-label-text>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item  prop="country" >
            <ui-label-text  label="国籍:" :required="false" labelWidth="160">
              <el-input v-model="insur.country" readonly slot="text" ></el-input>
            </ui-label-text>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row class="ri-line">
        <el-col :span="12">
          <el-form-item  prop="birthDate" >
            <ui-label-text  label="出生日期:" :required="false" labelWidth="160">
              <el-date-picker
                value-format="yyyy-MM-dd"
                slot="text"
                readonly
                v-model="insur.birthDate"
                type="date"
                placeholder="选择日期"> </el-date-picker>
            </ui-label-text>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item  prop="remark" >
            <ui-label-text  label="备注:" :required="false" labelWidth="160">
              <el-input v-model="insur.remark" readonly slot="text" ></el-input>
            </ui-label-text>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row class="ri-line">
        <el-col :span="12">
          <el-form-item  prop="marriage">
            <ui-label-text  label="婚姻状况:" :required="false" labelWidth="160">
              <el-select v-model="insur.marriage" disabled slot="text" placeholder="请选择">
                <el-option label="已婚" value="1"></el-option>
                <el-option label="未婚" value="2"></el-option>
                <el-option label="不明" value="3"></el-option>
                <el-option label="离异" value="4"></el-option>
              </el-select>
            </ui-label-text>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item  prop="educationCode" >
            <ui-label-text  label="学历:" :required="false" labelWidth="160">
              <el-select v-model="insur.educationCode" disabled slot="text" placeholder="请选择">
                <el-option label="小学" value="1"></el-option>
                <el-option label="初中" value="2"></el-option>
                <el-option label="高中" value="3"></el-option>
                <el-option label="大专" value="4"></el-option>
                <el-option label="本科" value="5"></el-option>
                <el-option label="硕士" value="6"></el-option>
                <el-option label="博士" value="7"></el-option>
                <el-option label="其他" value="8"></el-option>
              </el-select>
            </ui-label-text>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row class="ri-line">
        <el-col :span="12">
          <el-form-item  prop="identifyType" >
            <ui-label-text  label="证件类型:" :required="true" labelWidth="160">
              <el-select v-model="insur.identifyType" disabled slot="text" placeholder="请选择">
                <el-option label="身份证" value="1"></el-option>
                <el-option label="户口本" value="2"></el-option>
                <el-option label="军官证" value="3"></el-option>
                <el-option label="驾驶证" value="4"></el-option>
                <el-option label="护照" value="5"></el-option>
                <el-option label="港澳居民来往大陆通行证" value="6"></el-option>
                <el-option label="台湾居民来往大陆通行证" value="7"></el-option>
                <el-option label="其他" value="8"></el-option>
                <el-option label="出生医学证明" value="9"></el-option>
              </el-select>
            </ui-label-text>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item  prop="identifyNumber" >
            <ui-label-text  label="证件号码:" :required="true" labelWidth="160">
              <el-input v-model="insur.identifyNumber" readonly slot="text" ></el-input>
            </ui-label-text>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row class="ri-line">
        <el-col :span="12">
          <el-form-item prop="identifyValiddate"  >
            <ui-label-text :required="false"  label="证件有效期：" labelWidth="160" >
              <el-date-picker
                value-format="yyyy-MM-dd"
                slot="text"
                v-model="insur.identifyValiddate"
                disabled
                type="date"
                style="position:absolute;width:170px"
                placeholder="选择日期"> </el-date-picker>
            </ui-label-text>
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-checkbox
            class="datestyle"
            ref="timer"
            v-model="longFlag2"
            disabled
            label='false'
            style="margin-top:10px;margin-left:-270px">永久有效</el-checkbox>
        </el-col>
      </el-row>
      <el-row class="ri-line">
        <el-col :span="12">
          <el-form-item  prop="insureTel"  >
            <ui-label-text  label="固定电话:" :required="false" labelWidth="160">
              <el-input v-model="insur.insureTel" readonly slot="text" ></el-input>
            </ui-label-text>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item  prop="workingUnit" >
            <ui-label-text  label="工作单位:" :required="false" labelWidth="160">
              <el-input v-model="insur.workingUnit" readonly slot="text" ></el-input>
            </ui-label-text>
          </el-form-item>
        </el-col>

      </el-row>
      <el-row class="ri-line">
        <el-col :span="12">
          <el-form-item  prop="job" >
            <ui-label-text  label="职业:" :required="false" labelWidth="160">
              <el-input v-model="insur.job" readonly slot="text" ></el-input>
            </ui-label-text>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item  prop="e_mail" >
            <ui-label-text  label="E-mail:" :required="false" labelWidth="160">
              <el-input v-model="insur.e_mail" readonly slot="text" ></el-input>
            </ui-label-text>
          </el-form-item>
        </el-col>

      </el-row>
      <el-row class="ri-line">
        <el-col :span="12">
          <el-form-item  prop="weixin" >
            <ui-label-text  label="微信号:" :required="false" labelWidth="160">
              <el-input v-model="insur.weixin" readonly slot="text" ></el-input>
            </ui-label-text>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item  prop="habitualResidence">
            <ui-label-text  label="经常居住地:" :required="false" labelWidth="160">
              <el-input v-model="insur.habitualResidence" readonly slot="text" ></el-input>
            </ui-label-text>
          </el-form-item>
        </el-col>

      </el-row>
      <el-col :span="12">
          <el-form-item  prop="insuredrType">
            <ui-label-text  label="证件类型:" :required="true" labelWidth="160">
              <el-select v-model="insur.insuredrType" slot="text" placeholder="请选择">
                <el-option label="本人" value="1"></el-option>
                <el-option label="配偶" value="2"></el-option>
                <el-option label="子女" value="3"></el-option>
                <el-option label="父母" value="4"></el-option>
                <el-option label="其他" value="5"></el-option>
              </el-select>
            </ui-label-text>
          </el-form-item>
        </el-col>
      <el-row class="ri-line" >
        <div v-if="insur.insuredrType ==='5' ">
          <el-col :span="12">
            <el-form-item  prop="insuredrName">
              <ui-label-text  label="关系名称:" :required="true" labelWidth="160">
                <el-input v-model="insur.insuredrName" slot="text" ></el-input>
              </ui-label-text>
            </el-form-item>
          </el-col>
        </div>
      </el-row>
    </el-form>
    <!--客户所属机构 的弹框-->
    <el-dialog :append-to-body="true" width="50%" center title="客户所属机构" :visible.sync="dialogsustomerOrg">
        <el-table ref="multipleTable" @row-click="customerinOrg" :data="customOfOrg" tooltip-effect="dark" style="width: 100%">
          <el-table-column prop="comCode"  label="保险公司代码" show-overflow-tooltip>
          </el-table-column>
          <el-table-column prop="comCName" label="保险公司名称" show-overflow-tooltip>
          </el-table-column>
        </el-table>
        <div class="block">
          <el-pagination
            @current-change="handleCurrentChangeCode"
            :current-page="info.currentPage"
            :page-sizes="[5]"
            :page-size="100"
            layout="total, sizes, prev, pager, next, jumper"
            :total="totalsOrg == totalsOrg ? totalsOrg : 0">
          </el-pagination>
        </div>

    </el-dialog>
    <!--投保人代码 的弹框-->
    <el-dialog :append-to-body="true" width="50%" center title="投保人代码" :visible.sync="dialogInsurer">
        <el-row class="ri-line" >
          <el-col :span="24">
            <ui-label-text  label="客户代码或名称:"  labelWidth="160">
              <el-input v-model="searchcode.customerCodeOrName" slot="text" ></el-input>
            </ui-label-text>
          </el-col>
        </el-row>
        <el-row class="ri-line" >
          <el-col :span="24">
            <ui-label-text  label="证件号码:"  labelWidth="160">
              <el-input v-model="searchcode.idNumber" slot="text" ></el-input>
            </ui-label-text>
          </el-col>
        </el-row>
        <el-row class="ri-line" >
          <el-col :span="24">
            <div class="center">
                <el-button  type="primary" @click.native.prevent="searchCode(searchcode)">查询</el-button>
            </div>
          </el-col>
        </el-row>
        <el-table ref="multipleTable" @row-click="customerinOrg1" :data="customerfind" tooltip-effect="dark" style="width: 100%">
          <el-table-column prop="custId"  label="客户代码" show-overflow-tooltip>
          </el-table-column>
          <el-table-column prop="custName" label="客户姓名" show-overflow-tooltip>
          </el-table-column>
          <el-table-column prop="idNumber" label="客户身份证号" show-overflow-tooltip>
          </el-table-column>
        </el-table>
        <div class="block">
          <el-pagination
            @current-change="currentChangeval"
            :current-page="info.currentPage"
            @size-change="handleSizeChange"
            :page-sizes="[5,10,15]"
            :page-size="100"
            layout="total, sizes, prev, pager, next, jumper"
            :total="customerFindTotals === customerFindTotals ? customerFindTotals : 0">
          </el-pagination>
        </div>
    </el-dialog>

  </div>
</template>

<script>
import NoticeBar from '@/components/notice-bar'
import LabelText from '@/components/label-text'
import LineTittle from '@/components/line-tittle'
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
      lifePartyConditionForm: {
        insureNo: '',
        insureName: '',
        insureAddress: '',
        postNo: '',
        sexType: '',
        country: '',
        birthDate: '',
        remark: '',
        marriage: '',
        educationCode: '',
        identifyType: '',
        identifyNumber: '',
        identifyValiddate: '',
        insureTel: '',
        workingUnit: '',
        job: '',
        weixin: '',
        e_mail: '',
        insuredrType: '',
        insuredrName: '',
        habitualResidence: '',
        updateTime: '', // 有问题  需要改为当前时间,
        longFlag: ''
      },
      lifePartyConditionRules: {
        proposalNo: noEmptyValidator,
        insureNo: noEmptyValidator,
        insureName: noEmptyValidator,
        postNo: noEmptyValidator,
        sexType: noEmptyValidator,
        country: noEmptyValidator,
        birthDate: noEmptyValidator,
        marriage: noEmptyValidator,
        educationCode: noEmptyValidator,
        identifyType: noEmptyValidator,
        identifyNumber: noEmptyValidator,
        identifyValiddate: noEmptyValidator,
        insuredrName: noEmptyValidator
      },
       // 新增个人客户
      addCustom: {
        custName: '',
        comCode: '',
        comCName: '',
        paperworkType: '',
        idNumber: '',
        birthDate: '',
        isLongFlag: '0',
        identifyValiddate: ''
      },
      addRules: {
        custName: noEmptyValidator,
        comCode: noEmptyValidator,
        comCName: noEmptyValidator,
        paperworkType: noEmptyValidator, // 证件类型
        idNumber: noEmptyValidator,
        birthDate: noEmptyValidator
      },
      page: '',
      disabledEdit: false,
      longFlag1: false,
      dialogInsurer: false,
      Benefit: '1',
      liveBenefit: '1',
      // disabledEdit: false,
      disabledEdit1: false,
      isdisabled: false,
      chec: false,
      // longFlag1: false,
      longFlag2: false,
      dialogTableVisibleInsert: false,
      dialogTableVisibleQuery: false,
      dialogTableVisibleCode: false,
      dialogTableOrg: false,
      identifyValiddate: false,
      // dialogInsurer: false, // 投保人代码
      dialogTableVisibleAdd: false, // 新增个人客户弹框
      dialogsustomerOrg: false, // 客户所属机构
      searchcode: {
        customerCodeOrName: '',
        idNumber: '',
        pageSize: '5'
      },

      searchcOrg: {} // 客户所属机构的查询对象
    }
  },
  mounted () {
    // alert(JSON.stringify(this.lifeParty))
    // alert('这是什么意思:' + JSON.stringify(this.$store.state.proposalForm.lifePartyCondition))
    this.lifePartyConditionForm = this.$store.state.proposalForm.lifePartyCondition
    console.log('投保人信息:' + JSON.stringify(this.lifePartyConditionForm))
    console.log('投保人信息有效期:' + JSON.stringify(this.lifePartyConditionForm.longFlag))
    if (this.lifePartyConditionForm.longFlag === 1 || this.lifePartyConditionForm.longFlag === '1') {
      this.longFlag2 = true
    }
  },
  props: ['insur'],
  methods: {
    ...mapActions([
      'queryproposalForm_1',
      'queryPolicyById_1',
      'getInsurers_1',
      'getInsurersOrg_1',
      'customerFind_1',
      'customerOfOrg_1',
      'customerAdd_1'
    ]),

    query (page) {
      // this.info.current = page
      // alert(this.info.currentPage)
      this.queryproposalForm_1(this.info)
    },
    handleCurrentChange (val) {
      console.log(`当前页: ${val}`)
      // this.info.currentPage = val
      console.log(this.info.currentPage)
      // this.query(val)
    },
    /** ******************开始********************** */
    handleSizeChange (val) {
      console.log(`每页 ${val} 条`)
      this.searchcode.pageSize = val
      // this.searchcode.currentPage = 1
      this.searchcode.currentPage = 1
      // alert(JSON.stringify(this.searchcode))
      // this.searchCode()
      this.customerFind_1(this.searchcode)
    },
    // 客户信息查询的分页 跳转至第几页
    currentChangeval (va) {
     // alert('va:' + va)
      // this.searchcode.currentPage = va
      this.searchcode.currentPage = va
     // alert(JSON.stringify(this.searchcode))
      this.customerFind_1(this.searchcode)
    },
    /** ******************结束********************** */
    // 增加的提交表单
    // _insertForm (formName) {
    //   this.$refs[formName].validate((valid) => {
    //     if (valid) {
    //       // 验证通过 提交表单
    //       alert('submit!')
    //     } else {
    //       console.log('error submit!!')
    //       return false
    //     }
    //   })
    // },
    handleValid () {
      if (this.longFlag1 === false) {
        // false的话  时间不能填 longFlag == 1 永久有效
        this.addCustom.isLongFlag = '1'
        console.log(this.addCustom.isLongFlag)
        this.addCustom.identifyValiddate = ''
        console.log('identifyValiddate:' + JSON.stringify(this.addCustom.identifyValiddate))

        this.disabledEdit = true
      } else {
        // true的话  时间可以填 longFlag == 0 有效期
        this.addCustom.isLongFlag = '0'
        this.disabledEdit = false
        console.log(this.addCustom.isLongFlag)
      }
    },
    // 保险公司代码
    alertDialogcomCode (page) {
      this.dialogTableVisibleCode = true
      // this.info.currentPage = page
      this.info.currentPage = page
      console.log('page:' + page)

      // this.info.currentPage = page
      this.info.currentPage = page
      console.log('info:' + JSON.stringify(this.info))
      this.getInsurers_1(this.info)

      // this.addCustom.comCode =
    },
     // 保险机构代码
    alertDialogcomOrg (page) {
      // this.info.currentPage = page
      this.info.currentPage = page
      console.log('page:' + page)

      // this.info.currentPage = page
      this.info.currentPage = page
      console.log('info:' + JSON.stringify(this.info))

      // this.getInsurers_1(this.info)
      if (this.insertForm.companyCode === '' || this.insertForm.companyCode === undefined) {
        // this.openMseg('error', '请先输入保险公司代码！')
        // return false
        this.open('error', '请先输入保险公司代码！')
        return false
      } else {
        // alert(JSON.stringify(this.insertForm))
        // this.insertForm = ''
        this.dialogTableOrg = true
        this.info.insurerCode = this.insertForm.companyCode
        this.info.insurerName = this.insertForm.companyName
        // alert(JSON.stringify(this.info))
        this.getInsurersOrg_1(this.info)
      }
    },
    // 投保人代码
    alertDialoginsuCode (page) {
      // this.info.currentPage = page
      this.info.currentPage = page
      this.dialogInsurer = true
    },
    // 客户所属机构点击
    customerinOrg (row, event, column) {
      this.addCustom.comCode = row.comCode
      this.addCustom.comCName = row.comCName
      this.addCustom.comName = row.address
      this.dialogsustomerOrg = false
    },
    // 客户所属机构点击
    customerinOrg1 (row, event, column) {
      // alert(JSON.stringify(row))
      this.lifePartyConditionForm.insureNo = row.insureNo
      this.lifePartyConditionForm.insureName = row.custName
      this.lifePartyConditionForm.identifyNumber = row.idNumber
      this.lifePartyConditionForm.insureAddress = row.address
      this.lifePartyConditionForm.postNo = row.zipCode
      this.lifePartyConditionForm.sexType = row.sex
      this.lifePartyConditionForm.country = row.country
      this.lifePartyConditionForm.birthDate = row.birthDate

      this.lifePartyConditionForm.educationCode = row.education
      // // this.insertForm.idNumber = row.education
      this.lifePartyConditionForm.insureTel = row.phone
      this.lifePartyConditionForm.weixin = row.weChat
      this.lifePartyConditionForm.e_mail = row.email
      this.lifePartyConditionForm.job = row.job
      this.lifePartyConditionForm.workingUnit = row.workingUnit
      this.lifePartyConditionForm.identifyValiddate = row.identifyValiddate
      this.lifePartyConditionForm.habitualResidence = row.habitualResidence
      this.lifePartyConditionForm.insureNo = row.custId
      this.lifePartyConditionForm.marriage = row.maritalStatus
      this.lifePartyConditionForm.isLongFlag = row.isLongFlag

      this.lifePartyConditionForm.identifyType = row.paperworkType
      this.dialogInsurer = false

      // alert('identifyValiddate:' + JSON.stringify(this.insertForm.identifyValiddate))
      // alert('isLongFlag:' + JSON.stringify(this.insertForm.isLongFlag))
      // if ((this.insertForm.identifyValiddate === '' ||
      //     this.insertForm.identifyValiddate === null ||
      //     this.insertForm.identifyValiddate === undefined) &&
      //     this.insertForm.isLongFlag === 1) {
      //   this.disabledEdit1 = true
      //   this.isdisabled = true
      //   this.longFlag2 = true
      // } else {
      //   this.disabledEdit1 = false
      // }
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
    /** *****客户信息查询********* */
    searchCode () {
      console.log(this.searchcode.customerCodeOrName)
      console.log(this.searchcode.idNumber)
      // this.searchcode.currentPage = this.info.currentPage
     // alert(JSON.stringify(this.info.currentPage))
      this.searchcode.currentPage = this.info.currentPage
      // alert(JSON.stringify(this.searchcode))
      this.customerFind_1(this.searchcode)
    },

    // 客户所属机构的查询
    searchOfOrg (page) {
      // this.info.currentPage = page
      this.info.currentPage = page
      console.log('page:' + page)
      this.info.comCodeOrName = this.addCustom.comCode

      console.log(this.info)
      this.customerOfOrg_1(this.info)
      console.log(typeof (customofOrg))
      this.dialogsustomerOrg = true
    },
     // 新增客户的提交表单
    // _addCustom (formName) {
    //   this.$refs[formName].validate((valid) => {
    //     if (valid) {
    //       alert('add成功!')
    //       if (this.addCustom.identifyValiddate === '' &&
    //           this.addCustom.isLongFlag === '0') {
    //         this.open('warning', '请先选择证件有效日期')
    //       } else {
    //         // alert(JSON.stringify(this.addCustom))
    //         this.$refs.multipleTable.clearSelection()
    //         this.dialogTableVisibleAdd = false

    //         this.customerAdd_1(this.addCustom)
    //         this.open('success', '新增成功')
    //       }
    //     } else {
    //       console.log('error submit!!')
    //       return false
    //     }
    //   })
    // },
    // 校验
    validateForm () {
      let flag = false
      this.$refs.lifePartyConditionForm.validate((valid) => {
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
    getInsurers () {
      return this.$store.state.InsuranceCo.getInsurers
    },
    totalrecords () {
      return parseInt(this.$store.state.InsuranceCo.totalRecords)
    },
    getInsurersOrg () {
      return this.$store.state.InsuranceCo.getInsurersOrg
    },
    orgRecords () {
      return parseInt(this.$store.state.InsuranceCo.orgRecords)
    },
        // 客户所属机构
    customOfOrg () {
      return this.$store.state.proposalForm.customOfOrg
    },
        // 客户所属机构查询出来的总条数
    totalsOrg () {
      return parseInt(this.$store.state.proposalForm.totalredords)
    },
        // 客户查询
    customerfind () {
      return this.$store.state.proposalForm.customerFind
    },
        // 客户所属机构查询出来的总条数
    customerFindTotals () {
      return parseInt(this.$store.state.proposalForm.customerFindTotals)
    }

  },
  created () {
  }
}
</script>

<style lang="scss" scoped type="text/css">
 .ri-line { margin-bottom: 10px; }
 .center{text-align: center}
 .marginTB{margin:15px 0;}
 .datestyle{color: #717171}
</style>
