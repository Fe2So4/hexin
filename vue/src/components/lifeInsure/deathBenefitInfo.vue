<template>
  <div class="marginTB">
    <el-form :rules="lifePartyTConditionListRules" ref="lifePartyTConditionListForm" :model="lifePartyTConditionListForm">
      <el-row>
        <el-col :span="12">
          <el-form-item  prop="partyName">
            <ui-label-text  label="姓名:" :required="false" labelWidth="230">
              <el-input v-model="lifePartyTConditionListForm.partyName" slot="text" ></el-input>
            </ui-label-text>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item  prop="identifyType" >
            <ui-label-text label="证件类型:" :required="false" labelWidth="230">
              <el-select v-model="lifePartyTConditionListForm.identifyType" @change="cIdentifyNumber1"  slot="text" placeholder="请选择">
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
      </el-row>
      <el-row>
        <el-col :span="12">
          <div v-if="lifePartyTConditionListForm.identifyType === '1'">
            <el-form-item  prop="identifyNumber"  >
              <ui-label-text label="证件号码:" :required="false" labelWidth="230">
                <el-input slot="text" v-model="lifePartyTConditionListForm.identifyNumber" @change="idtypeNumber()"></el-input>
              </ui-label-text>
            </el-form-item>
          </div>
          <div v-else-if="lifePartyTConditionListForm.identifyType === '2'">
            <el-form-item  prop="identifyNumber"  >
              <ui-label-text label="证件号码:" :required="false" labelWidth="230">
                <el-input slot="text" @change="idtypeNumber1()" v-model="lifePartyTConditionListForm.identifyNumber"></el-input>
              </ui-label-text>
            </el-form-item>
          </div>
          <div v-else>
            <el-form-item  prop="identifyNumber"  >
              <ui-label-text label="证件号码:" :required="false" labelWidth="230">
                <el-input slot="text" @change="idtypeNumber2()" v-model="lifePartyTConditionListForm.identifyNumber"></el-input>
              </ui-label-text>
            </el-form-item>
          </div>
        </el-col>
        <el-col :span="12">
          <!-- style="width:167px;margin-left:163px;position:absolute;margin-top:-40px"  -->
          <el-form-item  prop="identifyValiddate" >
            <!-- <div class="datestyle" :required="false" labelWidth="230">证件有效期:</div>  -->
            <ui-label-text :required="false" label="证件有效期:"  labelWidth="230">
              <el-date-picker
                value-format="yyyy-MM-dd"
                ref="timepiker"
                :required="false"
                :disabled="disabledEdit"
                slot="text"
                style="width: 24%; margin-right:5%"
                v-model="lifePartyTConditionListForm.identifyValiddate"
                type="date"
                placeholder="选择日期"></el-date-picker>

              <el-checkbox
                ref="timer"
                slot="text"
                size='mini'
                @change.native="handleValidClick()"
                v-model="longFlag1"
                :id='`deathBenefitInfo${createID}`'
                style="display: inline-block; "
                label='false' >永久有效</el-checkbox>
               </ui-label-text>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item  prop="sex">
            <ui-label-text label="性别:" :required="false" labelWidth="230">
              <el-select v-model="lifePartyTConditionListForm.sex" :disabled="dissex" slot="text" placeholder="请选择">
                <el-option label="男" value="0"></el-option>
                <el-option label="女" value="1"></el-option>
              </el-select>
            </ui-label-text>
          </el-form-item>
        </el-col>
        <el-col :span="12">
            <el-form-item  prop="birthdate"  >
              <ui-label-text label="出生日期:" :required="false" labelWidth="230">
                <el-date-picker format="yyyy-MM-dd" value-format="yyyy-MM-dd" slot="text" :disabled="Birthdate" v-model="lifePartyTConditionListForm.birthdate" type="date" placeholder="选择日期"> </el-date-picker>
              </ui-label-text>
            </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
            <el-form-item  prop="remark"  >
            <ui-label-text label="备注:" :required="false" labelWidth="230">
              <el-input slot="text"  v-model="lifePartyTConditionListForm.remark"></el-input>
            </ui-label-text>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
            <el-form-item  prop="beneficialOrder"  >
            <ui-label-text label="受益顺序:" :required="false" labelWidth="230">
              <el-select v-model="lifePartyTConditionListForm.beneficialOrder" slot="text" placeholder="请选择">
                <el-option label="1" value="1"></el-option>
                <el-option label="2" value="2"></el-option>
                <el-option label="3" value="3"></el-option>
                <el-option label="4" value="4"></el-option>
                <el-option label="5" value="5"></el-option>
              </el-select>
            </ui-label-text>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item  prop="benefitShare"  >
            <ui-label-text label="受益份额%:" :required="false" labelWidth="230">
              <el-input slot="text" placeholder="受益份额总和必须为100%" v-model="lifePartyTConditionListForm.benefitShare"></el-input>
            </ui-label-text>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item  prop="insuredrType"  >
            <ui-label-text label="与被保险人关系:" :required="false" labelWidth="230">
              <el-select v-model="lifePartyTConditionListForm.insuredrType" @change="relationship" slot="text" placeholder="请选择">
                <el-option label="本人" value="1"></el-option>
                <el-option label="配偶" value="2"></el-option>
                <el-option label="子女" value="3"></el-option>
                <el-option label="父母" value="4"></el-option>
                <el-option label="其他" value="5"></el-option>
              </el-select>
            </ui-label-text>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <!-- 当与被保险人关系为其他时需要填入关系名称 -->
          <div v-if="lifePartyTConditionListForm.insuredrType === '5'">
            <el-form-item  prop="insuredrName" :required="false" >
              <ui-label-text label="关系名称:" :required="false" labelWidth="230">
                <el-input slot="text"  v-model="lifePartyTConditionListForm.insuredrName"></el-input>
              </ui-label-text>
            </el-form-item>
          </div>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item  prop="phone"  >
            <ui-label-text label="联系方式:" :required="false" labelWidth="230">
              <el-input slot="text"  v-model="lifePartyTConditionListForm.phone"></el-input>
            </ui-label-text>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item  prop="habitualResidence"  >
            <ui-label-text label="经常居住地:" :required="false" labelWidth="230">
              <el-input slot="text" v-model="lifePartyTConditionListForm.habitualResidence"></el-input>
            </ui-label-text>
          </el-form-item>
        </el-col>

      </el-row>
    </el-form>
  </div>
</template>

<script>
import NoticeBar from '@/components/notice-bar'
import LabelText from '@/components/label-text'
import LineTittle from '@/components/line-tittle'
import { mapActions } from 'vuex'
export default {
  name: '',
  props: ['death', 'isSuper', 'createID'], // death为父组件传入的数据，isSuper在投保单超级权限修改时为true，createID为动态创建出来的身故受益人数组中此组件的排名,用于证件有效期checkbox赋值
  data () {
    // const { noEmptyValidator, IdValidator, benefitValidator } = this.$store.getters.validators
    const { IdValidator } = this.$store.getters.validators
    return {
      IdValidator: IdValidator,
      // noEmptyValidator: noEmptyValidator,
      // 新增的表单验证
      lifePartyTConditionListForm: {
        partyName: '',
        identifyType: '', // 证件类型 1-身份证 2-户口本 3-军官证 4-驾驶证 5-护照 6-港澳居民来往大陆通行证 7-台湾居民来往大陆通行证 8-其他 9-出生医学证明
        identifyNumber: '',
        sex: '', // 男-0 女-1
        birthdate: '',
        beneficialOrder: '',
        benefitShare: '',
        insuredrType: '', // 与被保险人关系 1-本人 2-配偶 3-子女 4-父母 5-其他
        insuredrName: '',
        identifyValiddate: '',
        remark: '',
        phone: '',
        habitualResidence: ''
      },
      lifePartyTConditionListRules: {
        // partyName: noEmptyValidator,
        // identifyType: noEmptyValidator,
        // identifyNumber: IdValidator,
        // sex: noEmptyValidator,
        // birthdate: noEmptyValidator,
        // beneficialOrder: noEmptyValidator,
        // benefitShare: benefitValidator,
        // insuredrType: noEmptyValidator,
        // insuredrName: noEmptyValidator
      },
      disabledEdit: false,
      longFlag1: false,
      longFlag3: false,
      addcheck: {},
      Birthdate: false,
      dissex: false
    }
  },
  mounted () {

  },
  watch: {
    death (val) {
      this.lifePartyTConditionListForm = val
      if (this.lifePartyTConditionListForm.longFlag === '1' || this.lifePartyTConditionListForm.longFlag === 1 || this.lifePartyTConditionListForm.longFlag === null) {
        this.longFlag1 = true
      } else {
        this.longFlag1 = false
      }
    }
  },
  methods: {
    ...mapActions([
      'checkCustomerIsExist_1'
    ]),
    // deldeathBenefitInfo: function () {
    //   this.$emit('deldeathBenefitInfo', this.index)
    // },
    validateForm () {
      let flag = false
      this.$refs.lifePartyTConditionListForm.validate((valid) => {
        flag = valid
      })
      return flag
    },
    handleValidClick () { // 证件有效期longFlag1传递
      if (this.longFlag1) {
        // false  时间不能填 longFlag == 1 永久有效
        this.lifePartyTConditionListForm.longFlag = '1'
        this.lifePartyTConditionListForm.identifyValiddate = ''

        this.disabledEdit = true
        this.longFlag3 = true
      } else {
        // true  时间可以填 longFlag == 0 有效期
        this.lifePartyTConditionListForm.longFlag = '0'
        this.disabledEdit = false
        this.longFlag3 = false
      }
    },
    relationship () {
      if (this.lifePartyTConditionListForm.insuredrType === '1') {
        this.open('warning', '身故受益人不能为本人,请重新选择!')
        this.lifePartyTConditionListForm.insuredrType = ''
        return false
      }
    },
    idtypeNumber2 () {
      if (this.lifePartyTConditionListForm.identifyType === '') {
        this.open('error', '请先选择证件类型！')
        this.lifePartyTConditionListForm.identifyNumber = ''
        return false
      }
    },
    idtypeNumber () { // 判断身份证年龄并带入到出生年月里
      let _idTypehao = this.lifePartyTConditionListForm.identifyNumber.substr(6, 8)
      let idTypehao = _idTypehao.substring(0, 4) + '-' + _idTypehao.substring(4, 6) + '-' + _idTypehao.substr(6)
      this.lifePartyTConditionListForm.birthdate = idTypehao
      this.Birthdate = true

      let _sex = this.lifePartyTConditionListForm.identifyNumber.substr(16, 1)

      if (_sex === '1' || _sex === '3' || _sex === '5' || _sex === '7' || _sex === '9') {
        this.lifePartyTConditionListForm.sex = '0'
        this.dissex = true
        this.Birthdate = true
      } else if (_sex === '2' || _sex === '4' || _sex === '6' || _sex === '8' || _sex === '0') {
        this.lifePartyTConditionListForm.sex = '1'
        this.dissex = true
        this.Birthdate = true
      }
      // this.checkcusExist()
      // this.checkSame()
    },
    // cIdentifyNumber () {   // blur
    //   this.lifePartyTConditionListForm.identifyNumber = ''
    //   this.lifePartyTConditionListForm.birthdate = ''
    //   this.lifePartyTConditionListForm.sex = ''
    //   this.$refs['lifePartyTConditionListForm'].resetFields() // 清空校验
    //   this.dissex = false
    //   this.Birthdate = false
    // },
    cIdentifyNumber1 (val) {  // change
      this.lifePartyTConditionListForm.identifyNumber = ''
      this.lifePartyTConditionListForm.birthdate = ''
      this.lifePartyTConditionListForm.sex = ''
      // this.$refs['lifePartyTConditionListForm'].resetFields() // 清空校验
      this.dissex = false
      this.Birthdate = false
      if (val === '1' || val === '2') {
        this.dissex = true
        this.Birthdate = true
        this.lifePartyTConditionListRules['identifyNumber'] = this.IdValidator
      } else {
        // this.lifePartyTConditionListRules['identifyNumber'] = this.noEmptyValidator
        this.lifePartyTConditionListRules['identifyNumber'] = ''
      }
    },
    checkcusExist () { // 判断客户是否存在
      this.addcheck.paperworkType = this.lifePartyTConditionListForm.identifyType
      this.addcheck.idNumber = this.lifePartyTConditionListForm.identifyNumber
      this.checkCustomerIsExist_1(this.addcheck).then(result => {
        if (result.flag === '0') {
          this.open('error', '该客户已存在，请重新录入！')
        }
      })
    },
    idtypeNumber1 () { // 判断户口本
      let _idTypehao = this.lifePartyTConditionListForm.identifyNumber.substr(6, 8)
      let idTypehao = _idTypehao.substring(0, 4) + '-' + _idTypehao.substring(4, 6) + '-' + _idTypehao.substr(6)
      this.lifePartyTConditionListForm.birthdate = idTypehao
      this.jsGetAge(idTypehao)
      let _sex = this.lifePartyTConditionListForm.identifyNumber.substr(16, 1)

      if (_sex === '1' || _sex === '3' || _sex === '5' || _sex === '7' || _sex === '9') {
        this.lifePartyTConditionListForm.sex = '0'
        this.dissex = true
        this.Birthdate = true
      } else if (_sex === '2' || _sex === '4' || _sex === '6' || _sex === '8' || _sex === '0') {
        this.lifePartyTConditionListForm.sex = '1'
        this.dissex = true
        this.Birthdate = true
      }
      // alert(this.judgeage)
      if (this.judgeage > 18) {
        this.open('error', '大于18岁不能选择户口本，请重新选择!')
        this.lifePartyTConditionListForm.identifyNumber = ''
        this.lifePartyTConditionListForm.sex = ''
        this.lifePartyTConditionListForm.birthdate = ''
        this.dissex = false
        this.Birthdate = false
      }
    },
    jsGetAge (strBirthday) {  // 根据出生日期判断年龄
      var returnAge
      var strBirthdayArr = strBirthday.split('-')
      var birthYear = strBirthdayArr[0]
      var birthMonth = strBirthdayArr[1]
      var birthDay = strBirthdayArr[2]

      var d = new Date()
      var nowYear = d.getFullYear()
      var nowMonth = d.getMonth() + 1
      var nowDay = d.getDate()

      if (nowYear === birthYear) {
        returnAge = 0// 同年 则为0岁
      } else {
        var ageDiff = nowYear - birthYear  // 年之差
        if (ageDiff > 0) {
          if (nowMonth === birthMonth) {
            var dayDiff = nowDay - birthDay// 日之差
            if (dayDiff < 0) {
              returnAge = ageDiff - 1
            } else {
              returnAge = ageDiff
            }
          } else {
            var monthDiff = nowMonth - birthMonth// 月之差
            if (monthDiff < 0) {
              returnAge = ageDiff - 1
            } else {
              returnAge = ageDiff
            }
          }
        } else {
          returnAge = -1// 返回-1 表示出生日期输入错误 晚于今天
        }
      }
      this.judgeage = returnAge
      return returnAge// 返回周岁年龄
    },
    open (type, mesg) { // toast提示
      this.$message({
        showClose: true,
        message: mesg,
        type: type
      })
    }

  },
  computed: {
    getrelationShip () {
      if (this.lifePartyTConditionListForm.identifyType === 5) {
       // alert(111)
      }
    }
  },
  components: {
    [NoticeBar.name]: NoticeBar,
    [LabelText.name]: LabelText,
    [LineTittle.name]: LineTittle
  },
  created () {
    if (this.death) { // 证件有效期赋值
      this.lifePartyTConditionListForm = this.death
      if (this.lifePartyTConditionListForm.longFlag === '1' || this.lifePartyTConditionListForm.longFlag === 1) {
        this.longFlag1 = true
      } else {
        this.longFlag1 = false
      }
    }
  }
}
</script>

<style lang="scss" scoped type="text/css">
 .ri-line { margin-bottom: 10px; }
 .center{text-align: center}
 .marginTB{margin:15px 0;}
 .datestyle{color: #717171}
</style>
<style>
 .el-form-item__error{padding-left: 160px !important}
</style>
