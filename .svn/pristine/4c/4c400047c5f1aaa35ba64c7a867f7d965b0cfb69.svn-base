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
                v-model="payInfoForm.paidDate"
                type="date"
                placeholder="选择日期"> </el-date-picker>
            </ui-label-text>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item  prop="firstal" >
            <ui-label-text  label="缴费方式:" :required="false" labelWidth="160">
              <el-select v-model="payInfoForm.firstal" slot="text" placeholder="请选择">
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
            <ui-label-text  label="开户行名称:" :required="false" labelWidth="160">
              <!-- <el-input v-model="payInfoForm.traBankFirstal" slot="text" ></el-input> -->
              <!-- <el-select @visible-change="chaxun" v-model="payInfoForm.traBankFirstal" slot="text" placeholder="请选择">
                <el-option

                      v-for="item in blackListTypes"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
              </el-select> -->
              <el-autocomplete  v-model="payInfoForm.configSetValueName" slot="text" :fetch-suggestions="querySearchAsync"  placeholder="请输入内容"  @select="handleProSelect" >
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
              <el-input v-model="payInfoForm.accountNameFirstal" slot="text" ></el-input>
            </ui-label-text>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row class="ri-line">
        <el-col :span="12">
          <el-form-item  prop="accountFirstal"  >
            <ui-label-text  label="账号:" :required="false" labelWidth="160">
              <el-input v-model="payInfoForm.accountFirstal" slot="text" ></el-input>
            </ui-label-text>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item  prop="sumPremium"  >
            <ui-label-text  label="应缴保费合计:" :required="false" labelWidth="160">
              <el-input v-model="payInfoForm.sumPremium" disabled slot="text" ></el-input>
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
  props: ['payInfo', 'isSuper'],
  data () {
    // const { noEmptyValidator } = this.$store.getters.validators
    return {
      info: {
        // current: 1
      },
      blackListTypes: [{
        label: '黑名单',
        value: '黑名单'
      }, {
        label: '灰名单',
        value: '灰名单'
      }],
      // 缴费信息
      payInfoForm: {
        paidDate: '',
        firstal: '', // 缴费方式 1-银行转账 2-其他
        traBankFirstal: '',
        accountNameFirstal: '',
        accountFirstal: '',
        sumPremium: ''
      },
      payInfoRules: {
        // sumPremium: noEmptyValidator
      }

    }
  },
  mounted () {
  },
  methods: {
    ...mapActions([
      'getBank_1'
    ]),
    _riskadd () {

    },
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
      //
      this.payInfoForm.configSetValueCode = payInfoForm.configSetValueCode
      this.payInfoForm.configSetValueName = payInfoForm.configSetValueName
    },
    querySearchAsync (queryString, cb) { // 查询省份 cb callBack方法
      this.getBank_1({'bankCodeOrName': queryString}).then(resp => {
        this.proSearch = resp
        cb(this.proSearch)
      })
    },
    toDecimal2 (x) {
      let f = parseFloat(x)
      if (isNaN(f)) {
        return false
      }
      f = Math.round(x * 100) / 100
      let s = f.toString()
      let rs = s.indexOf('.')
      if (rs < 0) {
        rs = s.length
        s += '.'
      }
      while (s.length <= rs + 2) {
        s += '0'
      }
      return s
    }
  },
  components: {
    [NoticeBar.name]: NoticeBar,
    [LabelText.name]: LabelText,
    [LineTittle.name]: LineTittle
  },
  computed: {
    heji () {
      return this.$store.state.proposalForm.baofeiheji
    }
  },
  created () {
    if (this.payInfo !== undefined) {
      this.payInfoForm = this.payInfo
    }
  },
  watch: {
    payInfo (val) {
      this.payInfoForm = val
    },
    heji (val) {
      let val1 = this.toDecimal2(val)
      this.payInfoForm.sumPremium = val1
    }
  }
}
</script>

<style lang="scss" scoped type="text/css">
 .ri-line { margin-bottom: 10px; }
 .center{text-align: center}
 .marginTB{margin:15px 0;}
</style>
