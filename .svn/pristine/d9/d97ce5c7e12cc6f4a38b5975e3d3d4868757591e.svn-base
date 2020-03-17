<template>
  <div class="marginTB">
    <el-form :rules="lifePartyTConditionListRules" ref="lifePartyTConditionListForm" :model="lifePartyTConditionListForm">
      <ul>
        <li v-for="(item, index) of death" :key="index"  style="list-style-type:none;">
          <el-row>       
            <el-col :span="12">
              <el-form-item  prop="partyName">
                <ui-label-text  label="姓名:" :required="true" labelWidth="120">
                  <el-input v-model="item.partyName" slot="text" ></el-input>
                </ui-label-text>
              </el-form-item>
            </el-col>        
            <el-col :span="12">
              <el-form-item  prop="identifyType">
                <ui-label-text label="证件类型:" :required="true" labelWidth="120">
                  <el-select v-model="item.identifyType" slot="text" placeholder="请选择">
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
              <el-form-item  prop="identifyNumber" >
                <ui-label-text label="证件号码:" :required="true" labelWidth="120">
                  <el-input slot="text" v-model="item.identifyNumber"></el-input>
                </ui-label-text>
              </el-form-item>
            </el-col>        
            <el-col :span="12">
              <el-form-item  prop="identifyValiddate" >
                <div class="datestyle" :required="false" labelWidth="120">证件有效期:</div> 
                <el-date-picker 
                  value-format="yyyy-MM-dd"
                  ref="timepiker" 
                  :required="true" 
                  :disabled="item.longFlagTag"
                  style="width:167px;margin-left:121px;position:absolute;margin-top:-40px" 
                  v-model="item.identifyValiddate" 
                  type="date" 
                  placeholder="选择日期"></el-date-picker>     
              </el-form-item>
            </el-col>     
            <el-col :span="4">     
              <el-checkbox 
                class="datestyle"
                ref="timer"  
                @change="handleValidClick(index, $event)" 
                v-model="item.longFlagTag" 
                style="margin-top:-50px;position:absolute;margin-left:82%"
                label='false' >永久有效</el-checkbox>
            </el-col>    
          </el-row>
          <el-row>       
            <el-col :span="12">
              <el-form-item  prop="sex"  >
                <ui-label-text label="性别:" :required="true" labelWidth="120">
                  <el-select v-model="item.sex" slot="text" placeholder="请选择">
                    <el-option label="男" value="0"></el-option>
                    <el-option label="女" value="1"></el-option>
                  </el-select> 
                </ui-label-text>
              </el-form-item>
            </el-col>        
            <el-col :span="12">
                <el-form-item  prop="birthdate"  >
                <ui-label-text label="出生日期:" :required="true" labelWidth="120">
                    <el-date-picker value-format="yyyy-MM-dd" slot="text" v-model="item.birthdate" type="date" placeholder="选择日期"> </el-date-picker>
                </ui-label-text>
                </el-form-item>
            </el-col> 
          </el-row>
          <el-row>        
            <el-col :span="12">
                <el-form-item  prop="sex" >
                <ui-label-text label="备注:" :required="true" labelWidth="120">
                  <el-input slot="text"  v-model="item.remark"></el-input>
                </ui-label-text>
              </el-form-item>
            </el-col>               
          </el-row>
          <el-row>       
            <el-col :span="12">
              <el-form-item  prop="beneficialOrder"  >
                <ui-label-text label="受益排序:" :required="true" labelWidth="120">
                  <el-select v-model="item.beneficialOrder" slot="text" placeholder="请选择">
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
              <el-form-item  prop="benefitShare" >
                <ui-label-text label="收益份额%:" :required="true" labelWidth="120">
                  <el-input slot="text"  v-model="item.benefitShare"></el-input>
                </ui-label-text>
              </el-form-item>
            </el-col>              
          </el-row>
          <el-row>          
            <el-col :span="12">
              <el-form-item  prop="insuredrType">
                <ui-label-text label="与被保险人关系:" :required="true" labelWidth="120">
                  <el-select v-model="item.insuredrType" slot="text" placeholder="请选择">
                    <el-option label="本人" value="1"></el-option>
                    <el-option label="配偶" value="2"></el-option>
                    <el-option label="子女" value="3"></el-option>
                    <el-option label="父母" value="4"></el-option>
                    <el-option label="其他" value="5"></el-option>
                  </el-select> 
                </ui-label-text>
              </el-form-item>
            </el-col>
            <div v-if="item.insuredrType === '5'">
              <el-col :span="12">
                <el-form-item  prop="insuredrName">            
                  <ui-label-text label="关系名称:" :required="true" labelWidth="120">
                    <el-input slot="text"  v-model="item.insuredrName"></el-input>
                  </ui-label-text>         
                </el-form-item>
              </el-col> 
            </div>                    
          </el-row>
          <el-row>   
            <el-col :span="12">
              <el-form-item  prop="phone">
                <ui-label-text label="联系方式:" :required="false" labelWidth="120">
                  <el-input slot="text"  v-model="item.phone"></el-input>
                </ui-label-text>  
              </el-form-item>
            </el-col>     
            <el-col :span="12">
              <el-form-item  prop="habitualResidence" >
                <ui-label-text label="经常居住地:" :required="false" labelWidth="120">
                  <el-input slot="text" v-model="item.habitualResidence"></el-input>
                </ui-label-text>
              </el-form-item>
            </el-col>   
                
          </el-row>  
          <div style="margin-bottom:20px;margin-top:10px;text-align:right">
            <el-button  type="danger" @click.native.prevent="delInfo(index)">删除</el-button>
          </div>  
        </li> 
        <div style="margin-bottom:20px;margin-top:10px;text-align:right">
          <el-button type="primary" @click.native.prevent="addInsureantInfo()">增加</el-button>
        </div> 
      </ul>
    </el-form>
  </div>
</template>

<script>
import NoticeBar from '@/components/notice-bar'
import LabelText from '@/components/label-text'
import LineTittle from '@/components/line-tittle'

export default {
  name: '',
  data () {
    const { noEmptyValidator } = this.$store.getters.validators
    return {
      // 新增的表单验证
      lifePartyTConditionListForm: {
        partyName: '',
        identifyType: '',
        identifyNumber: '',
        sex: '',
        birthdate: '',
        beneficialOrder: '',
        benefitShare: '',
        insuredrType: '',
        insuredrName: '',
        remark: ''
      },
      lifePartyTConditionListRules: {
        partyName: noEmptyValidator,
        identifyType: noEmptyValidator,
        identifyNumber: noEmptyValidator,
        sex: noEmptyValidator,
        birthdate: noEmptyValidator,
        beneficialOrder: noEmptyValidator,
        benefitShare: noEmptyValidator,
        insuredrType: noEmptyValidator,
        insuredrName: noEmptyValidator,
        remark: noEmptyValidator
      },
      disabledEdit: false,
      longFlag1: false,
      lifePconDist: [],
      dblindex: ''
    }
  },
  props: ['death'],
  mounted () {
    // console.log(JSON.stringify(this.$store.state.proposalForm.lifePartyTConditionList))
    // this.lifePconDist = this.$store.state.proposalForm.lifePartyTConditionList

    this.lifePconDist = this.$store.state.proposalForm.lifePartyTConditionList
    this.dblindex = Number(this.dblindex)
    this.lifePartyTConditionListForm = this.lifePconDist[this.dblindex]
    console.log('身故受益人' + JSON.stringify(this.death))
    this.death.forEach((item, index) => {
      this.$set(item, 'longFlagTag', false)
      if (item.longFlag === '1' || item.longFlag === 1) {
        this.$set(item, 'longFlagTag', true)
      } else {
        this.$set(item, 'longFlagTag', false)
      }

      if (item.identifyValiddate === null) {
        item.identifyValiddate = ''
      }
    })
  },
  methods: {
    addInsureantInfo () {
      let postData = {
        partyName: '',
        identifyType: '',
        identifyNumber: '',
        identifyValiddate: '',
        sex: '',
        birthdate: '',
        remark: '',
        beneficialOrder: '',
        benefitShare: '',
        insuredrType: '',
        insuredrName: '',
        phone: '',
        habitualResidence: '',
        longFlagTag: false,
        longFlag: ''
      }
      this.death.push(postData)
      // thia.lifePconDist.insureNoD.push
    },
    deldeathBenefitInfo: function () {
      this.$emit('deldeathBenefitInfo', this.index)
    },
    delInfo (index) {
      if (this.lifePconDist.length > 0) {
        this.lifePconDist.splice(index, 1)
        // console.log(JSON.stringify(this.InsureantInfos))
      }
    },
    validateForm () {
      let flag = false
      this.$refs.lifePartyTConditionListForm.validate((valid) => {
        flag = valid
      })
      return flag
    },
    handleValidClick (index, event) {
      console.log('tag:' + event)
      console.log('修改前   identifyValiddate:' + JSON.stringify(this.death[index].identifyValiddate))

      if (event) {
        this.death[index].longFlag = '1'
        this.death[index].identifyValiddate = ''
      } else {
        this.death[index].longFlag = '0'
        this.death[index].identifyValiddate = ''
        this.open('error', '请选择证件有效期')
      }
      console.log('修改后   longFlag:' + JSON.stringify(this.death[index].longFlag))
      console.log('修改后   identifyValiddate:' + JSON.stringify(this.death[index].identifyValiddate))
    },
    open (type, mesg) {
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
  }
}
</script>

<style lang="scss" scoped type="text/css">
 .ri-line { margin-bottom: 10px; }
 .center{text-align: center}
 .marginTB{margin:15px 0;}
 .datestyle{color: #717171}
</style>
