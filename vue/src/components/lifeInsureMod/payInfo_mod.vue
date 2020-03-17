<template>
  <div class="marginTB">
    <el-form :rules="payInfoRules" ref="payInfoForm" :model="payInfoForm">
      <el-row class="ri-line">
        <el-col :span="12">
          <el-form-item  prop="paidDate"  >
            <ui-label-text  label="应缴日期:" :required="false" labelWidth="160">       
              <el-date-picker 
                value-format="yyyy-MM-dd"
                slot="text" 
                v-model="payinfo.paidDate" 
                type="date" 
                placeholder="选择日期"> </el-date-picker>
            </ui-label-text>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item  prop="firstal">
            <ui-label-text  label="缴费方式:" :required="false" labelWidth="160">
              <el-select v-model="payinfo.firstal" slot="text" placeholder="请选择">
                <el-option label="银行转账" value="1"></el-option>
                <el-option label="其他" value="2"></el-option>
              </el-select> 
            </ui-label-text>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row class="ri-line">
        <el-col :span="12">
          <el-form-item  prop="traBankFirstal"  >
            <ui-label-text  label="开户行名称:" :required="false" labelWidth="140">
              <el-autocomplete style="margin-left:20px" v-model="payinfo.configSetValueName" slot="text" :fetch-suggestions="querySearchAsync"  placeholder="请输入内容"  @select="handleProSelect" >
                <template slot-scope="{ item }">
                  <span class="code">{{ item.configSetValueCode }}</span>-
                  <span class="name">{{ item.configSetValueName }}</span>
                </template>
              </el-autocomplete>
            </ui-label-text>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item  prop="accountNameFirstal" >
            <ui-label-text  label="账户名:" :required="false" labelWidth="160">
              <el-input v-model="payinfo.accountNameFirstal" slot="text" ></el-input>
            </ui-label-text>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row class="ri-line">
        <el-col :span="12">
          <el-form-item  prop="accountFirstal" >
            <ui-label-text  label="账号:" :required="false" labelWidth="160">
              <el-input v-model="payinfo.accountFirstal" slot="text" ></el-input>
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
  data () {
    // const { noEmptyValidator } = this.$store.getters.validators
    return {
      info: {
        // current: 1
      },
      // 缴费信息
      payInfoForm: {
        paidDate: '',
        firstal: '',
        traBankFirstal: '',
        accountNameFirstal: '',
        accountFirstal: ''
      },
      payInfoRules: {

      }

    }
  },
  mounted () {
    // console.log(JSON.stringify(this.jiaofei))
    this.payInfoForm = this.jiaofei
  },
  props: ['payinfo'],
  methods: {
    ...mapActions([
      'getBank_1'
    ]),
    // toast提示
    open (type, mesg) {
      this.$message({
        showClose: true,
        message: mesg,
        type: type
      })
    },

     // 新增客户的提交表单
    _addCustom (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
         // alert('add成功!')
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    // 校验
    validateForm () {
      let flag = false
      this.$refs.payInfoForm.validate((valid) => {
        flag = valid
      })
      return flag
    },
    chaxun () {
      // this.getBank_1()
    },
    handleProSelect (payInfoForm) { // 省份选择
      console.log(payInfoForm.configSetValueCode)
      console.log(payInfoForm.configSetValueName)
      // console.log(payInfoForm)
      this.payInfoForm.configSetValueCode = payInfoForm.configSetValueCode
      this.payInfoForm.configSetValueName = payInfoForm.configSetValueName
    },
    querySearchAsync (queryString, cb) { // 查询省份 cb callBack方法
      this.getBank_1({'bankCodeOrName': queryString}).then(resp => {
        this.proSearch = resp
        cb(this.proSearch)
      })
    }
  },
  components: {
    [NoticeBar.name]: NoticeBar,
    [LabelText.name]: LabelText,
    [LineTittle.name]: LineTittle
  },
  computed: {
    jiaofei () {
      return this.$store.state.proposalForm.lifeFeeCondition
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
</style>
