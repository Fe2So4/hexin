<template>
  <div class="marginTB">
    <el-form :rules="inserTypeRules" ref="inserTypeForm" :model="inserTypeForm">
      <el-row class="ri-line">
        <el-col :span="12">
          <el-form-item  prop="riskCode"  >
            <ui-label-text  label="险种代码:" :required="true" labelWidth="160">
              <el-input v-model="inserTypeForm.riskCode" placeholder="双击查询" @dblclick.native="alertinsurType(1)" slot="text" ></el-input>
            </ui-label-text>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item  prop="riskName"  >
            <ui-label-text  label="险种名称:" :required="true" labelWidth="160">
              <el-input v-model="inserTypeForm.riskName" placeholder="双击查询" @dblclick.native="alertinsurType(1)" slot="text" ></el-input>
            </ui-label-text>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row class="ri-line">
        <el-col :span="12">
          <el-form-item  prop="mainFlag"  >
            <ui-label-text  label="主/附险标记:" :required="false" disabled labelWidth="160">
              <el-select v-model="inserTypeForm.mainFlag" disabled slot="text" placeholder="请选择">
                <el-option label="主险" value="1"></el-option>
                <el-option label="附险" value="2"></el-option>
                <el-option label="主/附险 " value="3"></el-option>
              </el-select>
            </ui-label-text>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item  prop="paymentPeriod" >
            <ui-label-text  label="缴费年期:" :required="false" labelWidth="160">
              <el-input v-model="inserTypeForm.paymentPeriod" readonly slot="text" ></el-input>
            </ui-label-text>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row class="ri-line">
        <el-col :span="12">
          <el-form-item  prop="payrate"  >
            <ui-label-text  label="缴费频率:" :required="false" labelWidth="160">
              <el-select v-model="inserTypeForm.payrate" slot="text" placeholder="请选择">
                <el-option label="天缴" value="0"></el-option>
                <el-option label="月缴" value="1"></el-option>
                <el-option label="季缴" value="2"></el-option>
                <el-option label="年缴" value="3"></el-option>
                <el-option label="趸缴" value="4"></el-option>
                <el-option label="半年缴" value="5"></el-option>
              </el-select>
            </ui-label-text>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item  prop="premium"  >
            <ui-label-text  label="应缴保费:" :required="true" labelWidth="160">
              <el-input v-model="inserTypeForm.premium" slot="text" ></el-input>
            </ui-label-text>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row class="ri-line">
        <el-col :span="12">
          <el-form-item  prop="riskPremium"  >
            <ui-label-text  label="保险金额:" :required="false" labelWidth="160">
              <el-input v-model="inserTypeForm.riskPremium" @blur="riskPremiumVail()" slot="text" ></el-input>
            </ui-label-text>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item  prop="number"  >
            <ui-label-text  label="份数:" :required="false" labelWidth="160">
              <el-input v-model="inserTypeForm.number" slot="text" ></el-input>
            </ui-label-text>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row class="ri-line">
        <el-col :span="12">
          <el-form-item  prop="addPremium"  >
            <ui-label-text  label="加费金额:" :required="false" labelWidth="160">
              <el-input v-model="inserTypeForm.addPremium" slot="text" ></el-input>
            </ui-label-text>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item  prop="freeDate" >
            <ui-label-text  label="豁免日期:" :required="false" labelWidth="160">
              <el-date-picker slot="text" v-model="inserTypeForm.freeDate" type="date" placeholder="选择日期"> </el-date-picker>
            </ui-label-text>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row class="ri-line">
        <el-col :span="18">
          <el-form-item  prop="identifyValiddateD">
            <div class="datestyle" :required="true" labelWidth="140">保险期间:</div>

          </el-form-item>
          <el-date-picker
                  class="datestyle"
                  ref="timepiker"
                  :required="false"
                  style="width:200px;position:absolute;margin-top:-57px;margin-left:170px"
                  v-model="inserTypeForm.startDate"
                  type="date"
                  placeholder="开始日期">
                  </el-date-picker>
          <el-date-picker
                  class="datestyle"
                  ref="timepiker"
                  :required="false"
                  :disabled="disabledEdit"
                  style="width:200px;position:absolute;margin-top:-57px;margin-left:425px"
                  v-model="inserTypeForm.endDate"
                  type="date"
                  placeholder="结束日期">
                  </el-date-picker>
        </el-col>
        <el-col :span="4">
          <el-checkbox
                  class="datestyle"
                  ref="timer"
                  style="position:absolute;margin-top:10px;margin-left:0"
                  @click.native="handleValidClick()"
                  v-model="longFlag1"
                  label='false' >是否终身
          </el-checkbox>
        </el-col>
      </el-row>
      <el-row class="ri-line">
        <el-col :span="12">
          <el-form-item  prop="identifyTypeD" >
            <ui-label-text label="豁免人:" :required="false" labelWidth="120"></ui-label-text>
              <el-checkbox class="touziren datestyle"   true-label="1" false-label="0"  v-model="inserTypeForm.tbrFreeFlag" label='1' >投保人</el-checkbox>
              <el-checkbox class="huomianren datestyle"  true-label="1" false-label="0"  v-model="inserTypeForm.bbrFreeFlag" label='1' >被保人</el-checkbox>
            </el-form-item>
        </el-col>
      </el-row>
    </el-form>

     <!-- 险种代码 的弹框 -->
    <el-dialog :append-to-body="true" width="50%" center title="险种代码" :visible.sync="insurTypeDialog">
        <el-row class="ri-line" >
          <el-col :span="24">
            <ui-label-text  label="险种代码/名称:"  labelWidth="160">
              <el-input v-model="insurerCode.riskCode" slot="text" ></el-input>
            </ui-label-text>
          </el-col>
        </el-row>
        <el-row class="ri-line" style="margin-top:20px;">
          <el-col :span="24">
            <div class="center">
                <el-button  type="primary" @click.native.prevent="searchCode()">查询</el-button>
            </div>
          </el-col>
        </el-row>
        <el-table  ref="multipleTable" stripe  @row-click="riskRowhandle" :data="riskCode" tooltip-effect="dark" style="width: 100%;margin-top:20px;">
          <el-table-column prop="riskcode"  label="险种代码" show-overflow-tooltip>
          </el-table-column>
          <el-table-column prop="riskname" label="险种名称" show-overflow-tooltip>
          </el-table-column>
        </el-table>
        <div class="block">
          <el-pagination
            @current-change="currentChangeval"
            @size-change="handleSizeChange"
            :current-page="insurerCode.currentPage"
            :page-sizes="[10,20,50]"
            :page-size="100"
            layout="total, sizes, prev, pager, next, jumper"
            :total="riskcodeTotals === riskcodeTotals ? riskcodeTotals : 0">
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
    const {noEmptyValidator,
          insurtypenumberValidator,
          insurtypeaddPremiumValidator} = this.$store.getters.validators
    return {
      // 新增的表单验证
      inserTypeForm: {
        riskCode: '',
        riskName: '',
        mainFlag: '', // 主/附险标记 1-主险 2-附险 3-主/附险"
        paymentPeriod: '',
        payrate: '', // 缴费频率:" 0-天缴 1-月缴 2-季缴 3-年缴 4-趸缴 5-半年缴
        premium: '',
        riskPremium: '',
        number: '',
        addPremium: '',
        freeDate: '',
        lifeFlag: '0',
        tbrFreeFlag: '',
        bbrFreeFlag: ''
      },
      inserTypeRules: {
        riskCode: noEmptyValidator,
        riskName: noEmptyValidator,
        premium: noEmptyValidator,
        number: insurtypenumberValidator,
        addPremium: insurtypeaddPremiumValidator
      },
      tbrFreeFlag: false,
      bbrFreeFlag: false,
      disabledEdit: false,
      disabledEdit1: false,
      longFlag1: false,
      insurTypeDialog: false,
      props: {
        companyCode: String
      },
      companyCode: '',
      insurerCode: {
        pageSize: '5',
        currentPage: ''
      },
      restaurants: [],
      state4: '',
      timeout: null,
      disab: ''
    }
  },

  // mounted: function () {
  //   let self = this
  //   Bus.$on('val', (e) => {
  //     self.companyCode = e
  //
  //     // alert(JSON.stringify(e))
  //     this.companyCode = e
  //   })
  // },
  // mounted () {
  //   this.restaurants = this.riskCode()
  // },
  methods: {
    ...mapActions([
      'riskcode_1'
    ]),
    currentChangeval (val) {
      this.insurerCode.currentPage = val

      this.riskcode_1(this.insurerCode)
    },
    handleSizeChange (val) {
      this.insurerCode.pageSize = val
      this.insurerCode.currentPage = 1
      this.riskcode_1(this.insurerCode)
    },
    alertinsurType (page) {
      this.insurerCode.currentPage = page
      this.companyCode = this.$store.state.proposalForm.companyCode
      this.insurerCode.insurerCode = this.companyCode
     // alert(JSON.stringify(this.insurerCode))
      if (this.companyCode === '' || this.companyCode === undefined || this.companyCode === null) {
        this.open('error', '请先输入保险公司代码！')
      } else {
        this.insurerCode.insurerCode = this.companyCode
      // alert('this.insurerCode:' + JSON.stringify(this.insurerCode))
        this.insurTypeDialog = true
        this.riskcode_1(this.insurerCode)
        // alert('接口调过后的insurerCode：' + JSON.stringify(this.insurerCode))
        this.companyCode = this.insurerCode.insurerCode
      }
    },
    searchCode () {
      this.insurerCode.currentPage = 1
      this.insurerCode.pageSize = 10
      this.riskcode_1(this.insurerCode)
    },
    handleValidClick () { // 选择是否永久
      if (this.longFlag1 === false) {
        // false  时间不能填 longFlag == 1 永久有效
        this.inserTypeForm.lifeFlag = '1'
        this.inserTypeForm.endDate = ''
        this.disabledEdit = true
      } else {
        // true 时间可以填 longFlag == 0 有效期
        this.inserTypeForm.lifeFlag = '0'
        this.disabledEdit = false
      }
    },
    // 校验
    validateForm () {
      let flag = false
      this.$refs.inserTypeForm.validate((valid) => {
        flag = valid
      })
      return flag
    },

    riskRowhandle (row, event, column) {
      this.inserTypeForm.riskCode = row.riskcode
      this.inserTypeForm.riskName = row.riskname
      this.inserTypeForm.mainFlag = row.mainorextrflag
      this.inserTypeForm.paymentPeriod = row.paymentperiod
      this.inserTypeForm.payrate = row.payway

      // this.disab = row.freeflag
      if (row.freeflag === 1) {
        this.disabledEdit1 = true
      } else {
        this.disabledEdit1 = false
      }
      this.insurTypeDialog = false
    },
    riskPremiumVail () {  // 保险金额的校验
      if (this.inserTypeForm.riskPremium === '0') {
        this.$confirm('此金额值不大于0，确定继续！', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
      } else if (this.inserTypeForm.riskPremium < 0) {
        this.open('error', '此金额值不能小于0，请仔细检查！')
      }
    },

    // toast提示
    open (type, mesg) {
      this.$message({
        showClose: true,
        message: mesg,
        type: type
      })
    }
    // 查询搜索功能
    // querySearchAsync (queryString, cb) {
    //   var restaurants = this.restaurants
    //   var results = queryString ? restaurants.filter(this.createStateFilter(queryString)) : restaurants

    //   clearTimeout(this.timeout)
    //   this.timeout = setTimeout(() => {
    //     cb(results)
    //   }, 3000 * Math.random())
    // },
    // createStateFilter (queryString) {
    //   return (state) => {
    //     return (state.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0)
    //   }
    // },
    // handleSelect (item) {
    //
    // }
  },
  computed: {
    riskCode () {
      return this.$store.state.proposalForm.riskcode
    },
    riskcodeTotals () {
      return parseInt(this.$store.state.proposalForm.riskcodeTotals)
    }
  },
  components: {
    [NoticeBar.name]: NoticeBar,
    [LabelText.name]: LabelText,
    [LineTittle.name]: LineTittle
  }
}
</script>

<style lang="scss" scoped type="text/css">
 .ri-line { margin-bottom: 10px; }
 .center{text-align: center}
 .marginTB{margin:15px 0;}
 .touziren{margin-left:170px;position:absolute;margin-top:-40px}
 .huomianren{margin-left:270px;position:absolute;margin-top:-40px}
 .datestyle{color: #717171}
  .el-pagination{float: right;padding-right: 30px;}
</style>




