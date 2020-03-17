<template>
  <div id="orgadd" >
      <ui-notice-bar slot="breadcast" >
        <el-breadcrumb slot="location" separator=">">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>黑灰名单管理</el-breadcrumb-item>
            <el-breadcrumb-item>黑灰名单投保信息查询</el-breadcrumb-item>
          </el-breadcrumb>
      </ui-notice-bar>
      <div class="ri-content" slot="content" >
        <el-form ref="queryInfo" :rules="rules" :model="queryInfo">
          <el-row class="ri-line">
            <el-col :span=12>
              <el-form-item>
                <ui-label-text labelWidth="120" label="投保单号:" >
                  <el-input v-model="queryInfo.policyNo" slot='text'></el-input>
                </ui-label-text>
              </el-form-item>
            </el-col>
            <el-col :span=12>
              <el-form-item prop='name'>
                <ui-label-text labelWidth="120" label="姓名:">
                  <el-input v-model="queryInfo.name" slot='text'></el-input>
                </ui-label-text>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row class="ri-line">
            <el-col :span=12>
              <el-form-item>
                <ui-label-text labelWidth="120" label="证件类型:" >
                  <el-select v-model="queryInfo.identityType" slot="text" placeholder="请选择证件类型" @change="clearNum">
                    <el-option
                        label="身份证"
                        value="1">
                    </el-option>
                    <el-option
                        label="户口本"
                        value="2">
                    </el-option>
                    <el-option
                        label="军官证"
                        value="3">
                    </el-option>
                    <el-option
                        label="驾驶证"
                        value="4">
                    </el-option>
                    <el-option
                        label="护照"
                        value="5">
                    </el-option>
                    <el-option
                        label="港澳居民来往大陆通行证"
                        value="6">
                    </el-option>
                    <el-option
                        label="台湾居民来往大陆通行证"
                        value="7">
                    </el-option>
                    <el-option
                        label="其他"
                        value="8">
                    </el-option>
                    <el-option
                        label="出生医学证明"
                        value="9">
                    </el-option>
                  </el-select>
                </ui-label-text>
              </el-form-item>
            </el-col>
            <el-col :span=12>
              <el-form-item>
                <ui-label-text labelWidth="120" label="证件号码:" >
                  <el-input v-model="queryInfo.identityNum" slot='text' @change="clearType"></el-input>
                </ui-label-text>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row class="ri-line">
            <el-col :span=24>
              <el-form-item>
                <ui-label-text labelWidth="120" label="投保日期:" >
                  <el-date-picker
                    v-model="queryInfo.insurerDate"
                    type="daterange"
                    range-separator="至"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期"
                    value-format="yyyy-MM-dd"
                    slot='text'>
                  </el-date-picker>
                </ui-label-text>
              </el-form-item>
            </el-col>
          </el-row>
          <el-form-item class="btn-container">
            <el-button type="primary" @click="submitForm('queryInfo',0)">查询</el-button>
            <el-button type="primary" @click="submitForm('queryInfo',1)">导出</el-button>
          </el-form-item>
        </el-form>
      </div>
      <div v-if='tableShowOrNot'>
        <el-table ref="multipleTable" stripe :data='blackInsure' tooltip-effect="dark" style="width: 100%">
          <el-table-column prop="proposalNo" label="投保单号"  width="250">
            <!-- <template slot-scope="scope">{{ scope.row.date }}</template> -->
          </el-table-column>
          <el-table-column prop="companyCode" label="保险公司代码"  width="250">
          </el-table-column>
          <el-table-column prop="companyName" label="保险公司名称" width="250" show-overflow-tooltip>
          </el-table-column>
          <el-table-column prop="companyComCode" label="保险公司机构代码"  width="250">
          </el-table-column>
          <el-table-column prop="companyComName" label="保险公司机构名称" width="250" show-overflow-tooltip>
          </el-table-column>
          <el-table-column prop="name" label="姓名" width="150">
          </el-table-column>
          <el-table-column prop="identityType" label="证件类型" width="150">
          </el-table-column>
          <el-table-column prop="identityNum" label="证件号码" width="200">
          </el-table-column>
          <el-table-column prop="proDate" label="投保日期" width="150">
          </el-table-column>
          <el-table-column prop="blackListType" label="黑/灰名单类型" width="120">
          </el-table-column>
          <el-table-column prop="verifyStatus" label="投保单状态" width="120">
          </el-table-column>
        </el-table>
        <div class="block">
          <el-pagination
            @current-change="handleCurrentChange"
            @size-change="handleSizeChange"
            :page-sizes="[5,10,20,50]"
            :current-page="queryInfo.currentPage"
            :page-size="queryInfo.pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="totalRecords"
            >
          </el-pagination>
        </div>
      </div>
      <div v-show="false">
        <el-table id="exportTable" ref="multipleTable1" :data='exportData2' tooltip-effect="dark" style="width: 100%">
          <el-table-column prop="proposalNo" label="投保单号"  width="120">
          </el-table-column>
          <el-table-column prop="companyCode" label="保险公司代码"  width="150">
          </el-table-column>
          <el-table-column prop="companyName" label="保险公司名称" show-overflow-tooltip>
          </el-table-column>
          <el-table-column prop="companyComCode" label="保险机构代码"  width="300">
          </el-table-column>
          <el-table-column prop="companyComName" label="保险机构名称" width="300" show-overflow-tooltip>
          </el-table-column>
          <el-table-column prop="name" label="姓名" width="120">
          </el-table-column>
          <el-table-column prop="identityType" label="证件类型" width="120">
          </el-table-column>
          <el-table-column prop="identityNum" label="证件号码" width="120">
          </el-table-column>
          <el-table-column prop="proDate" label="投保日期" width="200">
          </el-table-column>
          <el-table-column prop="blackListType" label="黑/灰名单类型" width="120">
          </el-table-column>
          <el-table-column prop="verifyStatus" label="投保单状态" width="120">
          </el-table-column>
        </el-table>
      </div>
  </div>
</template>

<script>
import NoticeBar from '@/components/notice-bar'
import LineTittle from '@/components/line-tittle'
import LabelText from '@/components/label-text'
import IsEmpty from '@/utils/IsEmpty'
import { mapActions } from 'vuex'
// import FileSaver from 'file-saver'
import {
  api
} from '@/api/bill_mgr/blackInsure.js'
export default {
  name: '',
  data () {
    return {
      queryInfo: {
        name: '',
        policyNo: '',
        identityType: '',
        identityNum: '',
        startDate: '',
        endDate: '',
        currentPage: 1,
        pageSize: 5
      },
      loading: '',
      exportInfo: {
        policyNo: '',
        name: '',
        identityType: '',
        identityNum: '',
        startDate: '',
        endDate: ''
      },
      rules: {
      },
      tableShowOrNot: false,
      blackInsure: [],
      exportData2: [],
      totalRecords: 0
    }
  },
  mounted () {
  },
  methods: {
    submitForm (formName, index) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          switch (index) {
            case 0:
              console.log('submit!')
              this.tableShowOrNot = true
              this.queryInfo.currentPage = 1
              let temp = {
                name: '',
                policyNo: '',
                identityType: '',
                identityNum: '',
                startDate: '',
                endDate: ''
              }
              temp.name = this.queryInfo.name
              temp.policyNo = this.queryInfo.policyNo
              temp.identityType = this.queryInfo.identityType
              if (!IsEmpty(this.queryInfo.insurerDate)) {
                temp.startDate = this.queryInfo.insurerDate[0]
                temp.endDate = this.queryInfo.insurerDate[1]
              }
              temp.identityNum = this.queryInfo.identityNum
              temp.currentPage = this.queryInfo.currentPage
              this.totalRecords = 0
              this.blackInsureQueryData(temp)
              break
            case 1:
              this.exportData1()
              break
            default:
              break
          }
        } else {
          console.log('error submit!!')
          return false
        }
      })
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
    // toast提示
    openToast (type, mesg) {
      this.$message({
        showClose: true,
        message: mesg,
        type: type
      })
    },
    clearNum () {
      this.queryInfo.identityNum = ''
    },
    clearType () {
      if (IsEmpty(this.queryInfo.identityType)) {
        this.openToast('warning', '请先输入证件类型')
        this.queryInfo.identityNum = ''
      }
    },
    blackInsureQueryData (info) {
      this.Loading()
      this.blackInsure = []
      api('/blackList/blackListProQuery', 'post', info).then(result => {
        console.log(result)
        this.closeLoading()
        if (result.code === '000000' || IsEmpty(result.code)) {
          this.blackInsure = result.data.data.content
          this.totalRecords = result.data.data.totalElements
        } else {
          this.openToast('warning', result.msg)
        }
      }).catch((e) => {
        console.log(e)
      })
    },
    exportData1 () {
      window.open(`/tabycore/blackList/exportProBlackList?policyNo=${this.queryInfo.policyNo}&name=${this.queryInfo.name}&identityType=${this.queryInfo.identityType}&identityNum=${this.queryInfo.identityNum}&startDate=${this.queryInfo.startDate}&endDate=${this.queryInfo.endDate}`)
    },
    handleCurrentChange (val) {
      this.queryInfo.currentPage = val
      this.blackInsureQueryData(this.queryInfo)
    },
    handleSizeChange (val) {
      this.queryInfo.currentPage = 1
      this.queryInfo.pageSize = val
      this.blackInsureQueryData(this.queryInfo)
    },
    ...mapActions([
    ])
  },
  components: {
    [NoticeBar.name]: NoticeBar,
    [LineTittle.name]: LineTittle,
    [LabelText.name]: LabelText
  },
  created () {
  },
  computed: {
  }
}
</script>

<style lang="scss" scoped type="text/css">
#orgadd {
  padding-left: 30px;
  padding-right: 30px;
}
.btn-container{
  text-align: center;
  margin-top: 50px;
  margin-bottom: 30px;
}
.ri-line{
  margin-top: 10px;
  margin-bottom: 10px;
}
</style>
