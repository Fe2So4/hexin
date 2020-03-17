<template>
  <div class="marginTB">
    <!--被保险人信息组件-->
    <el-form :rules="insertRules1" ref="insertForm1" :model="insertForm1">
    <ul>
      <li v-for="(item, index) of insurant" :key="index" style="list-style-type:none;">
        <!-- <div v-for="(InsureantInfo,index) in InsureantInfos" :key="index"> -->
          <!-- <el-form :rules="insertRules1" ref="insertForm1" :model="insertForm1">     -->
            <el-row class="ri-line">
              <el-col :span="12">
                <el-form-item  prop="insureNoD" >
                  <ui-label-text  label="被保险人代码:" :required="false" labelWidth="160">
                    <el-input v-model="item.insureNoD" placeholder="双击选择" @dblclick.native="alertDialoginsuCode(1,index)" slot="text" ></el-input>
                  </ui-label-text>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item  prop="insureNameD">
                  <ui-label-text  label="被保险人名称:" :required="true" labelWidth="160">
                    <el-input v-model="item.insureNameD" slot="text" ></el-input>
                  </ui-label-text>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row class="ri-line">
              <el-col :span="12">
                <el-form-item  prop="insureAddressD" >
                  <ui-label-text  label="被保险人地址:" :required="false" labelWidth="160">
                    <el-input v-model="item.insureAddressD" slot="text" ></el-input>
                  </ui-label-text>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item  prop="postNoD">
                  <ui-label-text  label="邮政编码:" :required="false" labelWidth="160">
                    <el-input v-model="item.postNoD" slot="text" ></el-input>
                  </ui-label-text>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row class="ri-line">
              <el-col :span="12">
                <el-form-item  prop="sexTypeD"  >
                  <ui-label-text  label="性别:" :required="false" labelWidth="160">
                    <el-select v-model="item.sexTypeD" slot="text" placeholder="请选择">
                      <el-option label="男" value="0"></el-option>
                      <el-option label="女" value="1"></el-option>
                    </el-select>
                  </ui-label-text>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item  prop="countryD" >
                  <ui-label-text  label="国籍:" :required="false" labelWidth="160">
                    <el-input v-model="item.countryD" slot="text" ></el-input>
                  </ui-label-text>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row class="ri-line">
              <el-col :span="12">
                <el-form-item  prop="educationCodeD" >
                  <ui-label-text  label="学历:" :required="false" labelWidth="160">
                    <el-select v-model="item.educationCodeD" slot="text" placeholder="请选择">
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
              <el-col :span="12">
                <el-form-item  prop="marriageD"  >
                  <ui-label-text  label="婚姻状况:" :required="false" labelWidth="160">
                    <el-select v-model="item.marriageD" slot="text" placeholder="请选择">
                      <el-option label="已婚" value="1"></el-option>
                      <el-option label="未婚" value="2"></el-option>
                      <el-option label="不明" value="3"></el-option>
                      <el-option label="离异" value="4"></el-option>
                    </el-select>
                  </ui-label-text>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row class="ri-line">
              <el-col :span="12">
                <el-form-item  prop="birthDateD"  >
                  <ui-label-text  label="出生日期:" :required="false" labelWidth="160">
                    <el-date-picker value-format="yyyy-MM-dd" slot="text" v-model="item.birthDateD" type="date" ></el-date-picker>
                  </ui-label-text>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item  prop="remark"  >
                  <ui-label-text  label="备注:" :required="false" labelWidth="160">
                    <el-input v-model="item.remark" slot="text" ></el-input>
                  </ui-label-text>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row class="ri-line">
              <el-col :span="12">
                <el-form-item  prop="identifyTypeD" >
                  <ui-label-text  label="证件类型:" :required="true" labelWidth="160">
                    <el-select v-model="item.identifyTypeD" slot="text" placeholder="请选择">
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
                <el-form-item  prop="identifyNumberD">
                  <ui-label-text  label="证件号码:" :required="true" labelWidth="160">
                    <el-input v-model="item.identifyNumberD" slot="text" ></el-input>
                  </ui-label-text>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row class="ri-line">
              <el-col :span="8">
                <el-form-item  prop="identifyValiddateD">
                  <div class="datestyle" :required="false" labelWidth="140">证件有效期:</div>
                  <el-date-picker
                    value-format="yyyy-MM-dd"
                    ref="timepiker"
                    :required="false"
                    :disabled="item.longFlagTag"
                    style="width:167px;margin-left:161px;position:absolute;margin-top:-40px"
                    v-model="item.identifyValiddateD"
                    type="date"
                    placeholder="选择日期"></el-date-picker>
                </el-form-item>
              </el-col>
              <el-col :span="4">
                <el-checkbox
                  class="datestyle"
                  ref="timer"
                  @change="handleValid(index, $event)"
                  v-model="item.longFlagTag"
                  style="margin-top:10px;"
                  label='false' >永久有效</el-checkbox>
              </el-col>
              <el-col :span="12">
                <el-form-item  prop="insureTelD" :required="false" >
                  <ui-label-text  label="固定电话:" :required="false" labelWidth="160">
                    <el-input v-model="item.insureTelD" slot="text" ></el-input>
                  </ui-label-text>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row class="ri-line">
              <el-col :span="12">
                <el-form-item  prop="mobilePhoneD" >
                  <ui-label-text  label="移动电话:" :required="false" labelWidth="160">
                    <el-input v-model="item.mobilePhoneD" slot="text" ></el-input>
                  </ui-label-text>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item  prop="workingUnitD">
                  <ui-label-text  label="工作单位:" :required="false" labelWidth="160">
                    <el-input v-model="item.workingUnitD" slot="text" ></el-input>
                  </ui-label-text>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row class="ri-line">
              <el-col :span="12">
                <el-form-item  prop="jobD" >
                  <ui-label-text  label="职业:" :required="false" labelWidth="160">
                    <el-input v-model="item.jobD" slot="text" ></el-input>
                  </ui-label-text>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item  prop="e_mailD" >
                  <ui-label-text  label="E-mail:" :required="false" labelWidth="160">
                    <el-input v-model="item.e_mailD" slot="text" ></el-input>
                  </ui-label-text>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row class="ri-line">
              <el-col :span="12">
                <el-form-item  prop="weixinD">
                  <ui-label-text  label="微信号:" :required="false" labelWidth="160">
                    <el-input v-model="item.weixinD" slot="text" ></el-input>
                  </ui-label-text>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item  prop="habitualResidenceD" >
                  <ui-label-text  label="经常居住地:" :required="false" labelWidth="160">
                    <el-input v-model="item.habitualResidenceD" slot="text" ></el-input>
                  </ui-label-text>
                </el-form-item>
              </el-col>
            </el-row>

        <!-- </div> -->
        <div style="margin-bottom:20px;margin-top:10px;text-align:right">
          <el-button  type="danger" @click.native.prevent="delInfo(index)">删除</el-button>
        </div>
      </li>

      <div style="margin-bottom:20px;margin-top:10px;text-align:right">
        <el-button type="primary" @click.native.prevent="addInsureantInfo()">添加</el-button>
      </div>
    </ul>
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
    <!--被保人代码 的弹框-->
    <el-dialog :append-to-body="true" width="50%" center title="被保人代码" :visible.sync="dialogInsurer">
        <el-row class="ri-line" style="margin-bottom:22px !important">
          <el-col :span="24">
            <ui-label-text  label="客户代码或名称:"  labelWidth="160">
              <el-input v-model="searchcode.customerCodeOrName" slot="text" ></el-input>
            </ui-label-text>
          </el-col>
        </el-row>
        <el-row class="ri-line" style="margin-bottom:22px !important">
          <el-col :span="24">
            <ui-label-text  label="证件号码:"  labelWidth="160">
              <el-input v-model="searchcode.idNumber" slot="text" ></el-input>
            </ui-label-text>
          </el-col>
        </el-row>
        <el-row class="ri-line" style="margin-bottom:22px !important">
          <el-col :span="24">
            <div class="center">
                <el-button  type="primary" @click.native.prevent="_searchCode(searchcode)">查询</el-button>
            </div>
          </el-col>
        </el-row>
        <el-table ref="multipleTable" @row-click="customerinOrgMod" :data="customerfind" tooltip-effect="dark" style="width: 100%">
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
            :page-sizes="[10,20,50]"
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
    const { noEmptyValidator, PostValidator, phoneValidator, phoneNumberValidator, emailValidator } = this.$store.getters.validators
    return {
      info: {
        // current: 1
      },
      updateTime: '',
      insertForm: {
        proposalNo: '',
        proposalNo2: '',
        insureNo: '',
        insureName: '',
        insureAddress: '',
        postNo: '',
        sexType: '',
        country: '',
        birthDate: '',
        remark: '',
        educationCode: '',
        insureTel: '',
        weixin: '',
        e_mail: '',
        job: '',
        workingUnit: '',
        insuredrName: '',
        habitualResidence: '',
        marriage: '',
        identifyType: '',
        identifyValiddate: '',

        identifyNumber: '',
        insuranceMark: '新保',
        businessNature: '佰盈销售',
        busiType: '直接业务',
        updateTime: '' // 有问题  需要改为当前时间
      },
      insertRules: {
        proposalNo: noEmptyValidator,
        proposalNo2: noEmptyValidator,
        insureNo: noEmptyValidator,
        insureName: noEmptyValidator,
        insureAddress: noEmptyValidator,
        postNo: noEmptyValidator,
        sexType: noEmptyValidator,
        country: noEmptyValidator,
        birthDate: noEmptyValidator,
        educationCode: noEmptyValidator,
        insureTel: noEmptyValidator,
        weixin: noEmptyValidator,
        e_mail: noEmptyValidator,
        job: noEmptyValidator,
        workingUnit: noEmptyValidator,
        insuredrName: noEmptyValidator,
        habitualResidence: noEmptyValidator,
        marriage: noEmptyValidator,
        identifyType: noEmptyValidator,
        identifyValiddate: noEmptyValidator,

        proposalDate: noEmptyValidator,
        companyCode: noEmptyValidator,
        companyName: noEmptyValidator,
        companyComCode: noEmptyValidator,
        companyComName: noEmptyValidator,
        insuranceMark: noEmptyValidator,
        atuoAcceptFlag: noEmptyValidator,
        businessNature: noEmptyValidator,
        busiType: noEmptyValidator,
        byMyself: noEmptyValidator,
        singleMode: noEmptyValidator,
        identifyNumber: noEmptyValidator,
        insuredrType: noEmptyValidator,
        insureNameD: noEmptyValidator,
        identifyTypeD: noEmptyValidator,
        identifyNumberD: noEmptyValidator,
        partyName: noEmptyValidator
      },
      // 新增的表单验证
      insertForm1: {
        insureNoD: '',
        insureNameD: '',
        insureAddressD: '',
        postNoD: '',
        sexTypeD: '',
        countryD: '',
        educationCodeD: '',
        marriageD: '',
        birthDateD: '',
        remark: '',
        identifyTypeD: '',
        identifyNumberD: '',
        identifyValiddateD: '',
        insureTelD: '',
        mobilePhoneD: '',
        workingUnitD: '',
        jobD: '',
        e_mailD: '',
        weixinD: '',
        habitualResidenceD: ''
      },
      insertRules1: {
        insureNoD: noEmptyValidator,
        insureNameD: noEmptyValidator,
        insureAddressD: noEmptyValidator,
        sexTypeD: noEmptyValidator,
        countryD: noEmptyValidator,
        educationCodeD: noEmptyValidator,
        marriageD: noEmptyValidator,
        birthDateD: noEmptyValidator,
        remark: noEmptyValidator,
        identifyTypeD: noEmptyValidator,
        identifyNumberD: noEmptyValidator,
        // identifyValiddateD: noEmptyValidator,
        insureTelD: phoneValidator,  // 固话

        mobilePhoneD: phoneNumberValidator,  // 手机
        workingUnitD: noEmptyValidator,
        jobD: noEmptyValidator,
        e_mailD: emailValidator,
        weixinD: noEmptyValidator,

        postNoD: PostValidator

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

      searchcOrg: {}, // 客户所属机构的查询对象
      lifePconDist: [],
      InsureantInfos: [],
      item: {},
      dblindex: ''
    }
  },
  mounted () {
    // alert(JSON.stringify(this.$store.state.proposalForm.lifePartyConditionDList))
    // console.log(JSON.stringify(this.$store.state.proposalForm.lifePartyConditionDList))
    this.lifePconDist = this.$store.state.proposalForm.lifePartyConditionDList
    this.dblindex = Number(this.dblindex)
    this.insertForm1 = this.lifePconDist[this.dblindex]

    console.log('222222:' + JSON.stringify(this.lifePconDist))
    // if(this.lifePconDist[item])
    // console.log('44444:' + JSON.stringify(this.lifePconDist[i].longFlagD))
    this.lifePconDist.forEach((item, index) => {
      this.$set(item, 'longFlagTag', false)
      if (item.longFlagD === '1' || item.longFlagD === 1) {
        this.$set(item, 'longFlagTag', true)
      } else {
        this.$set(item, 'longFlagTag', false)
      }
      if (item.identifyValiddateD === null) {
        item.identifyValiddateD = ''
      }
      console.log('longFlagTag:' + JSON.stringify(item.longFlagTag))
    })
  },
  props: ['insurant'],
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

    delInfo (index) {
      if (this.lifePconDist.length > 1) {
        this.lifePconDist.splice(index, 1)
        // console.log(JSON.stringify(this.InsureantInfos))
      }
    },
    addInsureantInfo () {
      let postData = {
        insureNoD: '',
        insureNameD: '',
        insureAddressD: '',
        postNoD: '',
        sexTypeD: '',
        countryD: '',
        educationCodeD: '',
        marriageD: '',
        birthDateD: '',
        remark: '',
        identifyTypeD: '',
        identifyNumberD: '',
        identifyValiddateD: '',
        insureTelD: '',
        mobilePhoneD: '',
        workingUnitD: '',
        jobD: '',
        e_mailD: '',
        weixinD: '',
        habitualResidenceD: '',
        longFlagTag: false,
        longFlagD: ''
      }
      this.lifePconDist.push(postData)
      // thia.lifePconDist.insureNoD.push
    },
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
    tableRowChange (row, event, column) {
      console.log(JSON.stringify(row))
      this.dialogTableVisibleQuery = true
      this.info.proposalNo = row.proposalNo
      // alert('proposalNo:' + this.info.proposalNo)
      this.info.currentPage = ''
      this.queryPolicyById_1(this.info)
      console.log('queryPolicy:' + this.queryPolicy)
      // console.log('this.info:' + JSON.stringify(this.info))
    },
    handleValid (index, event) {
      console.log('tag:' + event)
      console.log('修改前   identifyValiddateD:' + JSON.stringify(this.insurant[index].identifyValiddateD))
      if (event) {
        this.insurant[index].longFlagD = '1'
        this.insurant[index].identifyValiddateD = ''
      } else {
        this.insurant[index].longFlagD = '0'
        this.insurant[index].identifyValiddateD = ''
        this.open('error', '请选择证件有效期')
      }
      console.log('修改后   longFlagD:' + JSON.stringify(this.insurant[index].longFlagD))
      console.log('修改后   identifyValiddateD:' + JSON.stringify(this.insurant[index].identifyValiddateD))
    },
    // 投保人代码
    alertDialoginsuCode (page, index) {
      this.dblindex = index
      this.info.currentPage = page
      this.info.pageSize = 10
      this.info.clickType = '2'
      this.info.customerCodeOrName = this.insertForm1.insureNo
      this.customerFind_1(this.info).then(result => {
        if (result.code === '000000') {
          this.dialogInsurer = true
        } else {
          this.open('error', result.msg)
        }
      })
    },

    // 客户所属机构点击
    customerinOrg (row, event, column) {
      this.addCustom.comCode = row.comCode
      this.addCustom.comCName = row.comCName
      this.addCustom.comName = row.address
      this.dialogsustomerOrg = false
    },
    // 客户所属机构点击
    customerinOrgMod (row, event, column) {
      // alert(JSON.stringify(row))
      this.dblindex = Number(this.dblindex)
      // alert(typeof (row.custId))
      alert(typeof (this.lifePconDist[this.dblindex]))
      this.lifePconDist[this.dblindex].insureNoD = row.custId
      this.lifePconDist[this.dblindex].insureNameD = row.custName
      this.lifePconDist[this.dblindex].identifyNumberD = row.idNumber
      this.lifePconDist[this.dblindex].insureAddressD = row.address
      this.lifePconDist[this.dblindex].postNoD = row.zipCode
      this.lifePconDist[this.dblindex].sexTypeD = row.sex
      this.lifePconDist[this.dblindex].countryD = row.country
      this.lifePconDist[this.dblindex].birthDateD = row.birthDate
      this.lifePconDist[this.dblindex].educationCodeD = row.education
      this.lifePconDist[this.dblindex].insureTelD = row.phone
      this.lifePconDist[this.dblindex].weixinD = row.weChat
      this.lifePconDist[this.dblindex].e_mailD = row.email
      this.lifePconDist[this.dblindex].jobD = row.job
      this.lifePconDist[this.dblindex].workingUnitD = row.workingUnit
      this.lifePconDist[this.dblindex].identifyValiddateD = row.identifyValiddate
      this.lifePconDist[this.dblindex].habitualResidenceD = row.habitualResidence
      this.lifePconDist[this.dblindex].insureNoD = row.custId
      this.lifePconDist[this.dblindex].marriageD = row.maritalStatus
      this.lifePconDist[this.dblindex].longFlagD = row.isLongFlag
      this.lifePconDist[this.dblindex].identifyTypeD = row.paperworkType
      // 这特娘的都是什么鬼逻辑
      this.insertForm1 = this.lifePconDist[this.dblindex]
      this.dialogInsurer = false

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

    /** *****客户信息查询********* */
    _searchCode () {
      console.log(this.searchcode.customerCodeOrName)
      console.log(this.searchcode.idNumber)
      // this.searchcode.currentPage = this.info.currentPage
    //  alert(JSON.stringify(this.info.currentPage))
      this.searchcode.currentPage = this.info.currentPage
      alert(JSON.stringify(this.searchcode))
      this.customerFind_1(this.searchcode)
    },

    // 客户所属机构的查询
    searchOfOrg (page) {
      this.info.currentPage = page
      console.log('page:' + page)
      this.info.comCodeOrName = this.addCustom.comCode

      console.log(this.info)
      this.customerOfOrg_1(this.info)
      console.log(typeof (customofOrg))
      this.dialogsustomerOrg = true
    },
    validateForm () {
      // for (let i = 0; i < this.lifePconDist.length; i++) {
      //   // this.lifePconDist[i]
      // }
      let flag = false
      this.$refs.insertForm1.validate((valid) => {
        flag = valid
        alert(JSON.stringify(this.insertForm1))
      })
      return flag
    },
    childMethod () {
      // console.log(JSON.stringify(this.lifePconDist))
      console.log(typeof (this.lifePconDist))
    }
  },
  components: {
    [NoticeBar.name]: NoticeBar,
    [LabelText.name]: LabelText,
    [LineTittle.name]: LineTittle
  },
  computed: {
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
