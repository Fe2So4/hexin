<template>
  <div id="orgadd" >
      <ui-notice-bar slot="breadcast" >
        <el-breadcrumb slot="location" separator=">">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>寿险业务报表管理</el-breadcrumb-item>
            <el-breadcrumb-item>内蒙古业绩报表</el-breadcrumb-item>
          </el-breadcrumb>
      </ui-notice-bar>
      <div class="ri-content" slot="content">
        <el-form ref="neiMengComProfitList" :rules="rules" :model="queryInfo">
          <el-row class="ri-line">
            <el-col :span="12">
              <el-form-item prop='type'>
                <ui-label-text label="报表维度：" :required="true" labelWidth="130" >
                  <el-select v-model="queryInfo.type" slot="text" placeholder="请选择">
                    <el-option label="中支" value="0"></el-option>
                    <el-option label="营业区" value="1"></el-option>
                  </el-select>
                </ui-label-text>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item prop='source'>
                <ui-label-text label="数据源：" :required="true" labelWidth="130" >
                  <el-select v-model="queryInfo.source" slot="text" placeholder="请选择">
                    <el-option label="首期承保数据" value="0"></el-option>
                    <el-option label="对账单数据" value="1"></el-option>
                  </el-select>
                </ui-label-text>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row class="ri-line">
            <el-col :span="12">
              <el-form-item prop='chengbaodate'>
                <ui-label-text label="承保日期："  labelWidth="130">
                  <el-date-picker v-model="queryInfo.chengbaodate" slot="text" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" value-format="yyyy-MM-dd"></el-date-picker>
                </ui-label-text>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item prop='statisticsDate'>
                <ui-label-text labelWidth="130" label="结算年月：">
                  <el-date-picker v-model="queryInfo.statisticsDate" slot="text" type="month" placeholder="选择结算年月" value-format="yyyy-MM"></el-date-picker>
                </ui-label-text>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row class="ri-line">
            <el-col :span="12">
              <el-form-item prop='ratetype'>
                <ui-label-text label="折标系数类型：" :required="true" labelWidth="130" >
                  <el-select v-model="queryInfo.ratetype" slot="text" placeholder="请选择">
                    <el-option label="佰盈业务折标系数" value="0"></el-option>
                    <el-option label="内蒙古基本法折标系数" value="1"></el-option>
                    <el-option label="内蒙古分级管理办法折标系数" value="2"></el-option>
                  </el-select>
                </ui-label-text>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item prop='statistical'>
                <ui-label-text label="是否包含附加险：" :required="true" labelWidth="130" >
                  <el-select v-model="queryInfo.statistical" slot="text" placeholder="请选择">
                    <el-option label="是" value="0"></el-option>
                    <el-option label="否" value="1"></el-option>
                  </el-select>
                </ui-label-text>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row class="ri-line">
            <el-col :span="12">
              <el-form-item prop='agentType'>
                <ui-label-text label="业绩渠道：" :required="true" labelWidth="130" >
                  <el-select v-model="queryInfo.agentType" slot="text" placeholder="请选择">
                    <el-option label="全部" value="0"></el-option>
                    <el-option label="经代公司业绩" value="1"></el-option>
                    <el-option label="非经代公司业绩" value="2"></el-option>
                  </el-select>
                </ui-label-text>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
      <div class="btn-container" slot="controlbar">
        <el-button type="primary" :disabled="quanxian.query" @click.native.prevent="submitForm('neiMengComProfitList', 0)">查询</el-button>
        <el-button type="primary" :disabled="quanxian.export" @click.native.prevent="submitForm('neiMengComProfitList', 1)">导出</el-button>
        <el-button type="primary" :disabled="quanxian.exportDetail" @click.native.prevent="submitForm('neiMengComProfitList', 2)">导出明细</el-button>
      </div>
      <div v-if="tableShowOrnot">
        <el-table stripe :data="tableData" class="ri-content1" style="width: 100%">
          <el-table-column :prop="tempType === '0' ? 'comName' : 'teamName'" :label="tempType === '0' ? '中支' : '营业区'"  width="150">
            <template slot-scope="scope" >
              <span @click="getDetailExamine(scope.row)" class="tableButton">{{ tempType === '0' ? scope.row.comName : scope.row.teamName }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="writtenPremiums" label="规模保费（万）" width="120"></el-table-column>
          <el-table-column prop="premiumStandard" label="标准保费（万）" width="120"></el-table-column>
          <el-table-column prop="hdrl" label="活动人力" width="120"></el-table-column>
          <el-table-column prop="hgrl" label="合格人力" width="120"></el-table-column>
          <el-table-column prop="zzrl" label="转正人力" width="120"></el-table-column>
          <el-table-column prop="lqrl" label="6000P人力" width="120"></el-table-column>
          <el-table-column prop="ywrl" label="10000P人力" width="120"></el-table-column>
          <el-table-column prop="bzrl" label="佰盈之星人力" width="120"></el-table-column>
          <el-table-column prop="bsrl" label="佰盈双星人力" width="120"></el-table-column>
        </el-table>
        <el-pagination
          @current-change="handleCurrentChange"
          @size-change="handleSizeChange"
          :current-page="queryInfo.currentPage"
          :page-size ="queryInfo.pageSize"
          :page-sizes="[5,10,20,50]"
          :total="totalRecords"
          layout="total, sizes, prev, pager, next, jumper"
          >
        </el-pagination>
      </div>
      <el-dialog title="业绩明细" center :append-to-body='true' :visible.sync="detailDialogVis" width="90%" :before-close='detailClosing'>
        <el-table stripe :data="detailData" class="ri-content1" style="width: 100%">
          <el-table-column v-if="tempType === '1'" prop="teamName" label="营业区" width="120"></el-table-column>
          <el-table-column prop="comName" label="中支" width="120"></el-table-column>
          <el-table-column v-if="tempType !== '1'" prop="teamName" label="营业区" width="120"></el-table-column>
          <el-table-column prop="policyNo" label="保单号" width="120"></el-table-column>
          <el-table-column prop="agentCode" label="业务员代码" width="120"></el-table-column>
          <el-table-column prop="agentName" label="业务员姓名" width="120"></el-table-column>
          <el-table-column prop="agentType" label="业务员渠道" width="120"></el-table-column>
          <el-table-column prop="jobGrade" label="业务员职级" width="120"></el-table-column>
          <el-table-column prop="introduceType" label="经代公司简称" width="120"></el-table-column>
          <el-table-column prop="acceptDate" label="承保日期" width="120"></el-table-column>
          <el-table-column prop="riskCode" label="险种代码" width="120"></el-table-column>
          <el-table-column prop="riskName" label="险种名称" width="120"></el-table-column>
          <el-table-column prop="mainFlag" label="主/附险" width="120"></el-table-column>
          <el-table-column prop="paymentperiod" label="缴费年期" width="120"></el-table-column>
          <el-table-column prop="writtenPremiums" label="规模保费（元）" width="120"></el-table-column>
          <el-table-column prop="premiumStandard" label="标准保费（元）" width="120"></el-table-column>
        </el-table>
        <el-pagination
          @current-change="handleCurrentChange1"
          @size-change="handleSizeChange1"
          :current-page="dialogTemp.currentPage"
          :page-size ="dialogTemp.pageSize"
          :page-sizes="[5,10,20,50]"
          :total="detailTotalRecords"
          layout="total, sizes, prev, pager, next, jumper"
          >
        </el-pagination>
        <div class="btn-container1">
          <el-button type="primary" :disabled="quanxian.exportDetail" @click.native.prevent="exportDetail">导出明细</el-button>
        </div>
      </el-dialog>
  </div>
</template>

<script>
import NoticeBar from '@/components/notice-bar'
import LineTittle from '@/components/line-tittle'
import LabelText from '@/components/label-text'
import IsEmpty from '@/utils/IsEmpty'
import { mapActions } from 'vuex'
import moment from 'moment'
import {
  api
} from '@/api/lifeInsur_mgr/quitListMgr.js'
export default {
  name: '',
  data () {
    return {
      tableShowOrNot: false,
      tableData: [],
      totalRecords: 0,
      openDialogID: '',
      tempType: '0',
      queryInfo: {
        type: '0',
        source: '0',
        statisticsDate: '',
        ratetype: '0',
        statistical: '0',
        agentType: '0',
        chengbaodate: [],
        startDate: '',
        endDate: '',
        currentPage: 1,
        pageSize: 5
      },
      rules: {
        type: [
          { required: true, message: '请输入报表维度', trigger: 'change' }
        ],
        source: [
          { required: true, message: '请输入数据源', trigger: 'change' }
        ],
        ratetype: [
          { required: true, message: '请输入折标系数类型', trigger: 'change' }
        ],
        statistical: [
          { required: true, message: '请输入是否包含附加险', trigger: 'change' }
        ],
        agentType: [
          { required: true, message: '请输入业绩渠道', trigger: 'change' }
        ]
      },
      quanxian: {
        query: false,
        export: false,
        exportDetail: false
      },
      detailData: [],
      dialogTemp: {
        currentPage: 1,
        pageSize: 10
      },
      tableShowOrnot: false,
      detailDialogVis: false,
      detailTotalRecords: 0
    }
  },
  mounted () {},
  watch: {
    queryInfo: {
      handler (newValue, oldValue) {
        if (IsEmpty(newValue.chengbaodate)) {
          this.queryInfo.startDate = ''
          this.queryInfo.endDate = ''
        } else {
          if (moment(newValue.chengbaodate[1]).format('X') - moment(newValue.chengbaodate[0]).format('X') > 63072000) {
            this.openToast('warning', '所选日期范围超过2年，请重新选择')
            this.queryInfo.chengbaodate = []
            return
          }
          this.queryInfo.startDate = newValue.chengbaodate[0]
          this.queryInfo.endDate = newValue.chengbaodate[1]
        }
      },
      deep: true
    }
  },
  methods: {
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
    submitForm (formName, index) {
      // if (index === 0) {
      //   this.queryInfo.currentPage = 1
      //   this.queryData()
      //   return
      // }
      if (this.queryInfo.source === '0') {
        if (this.queryInfo.chengbaodate === [] || IsEmpty(this.queryInfo.chengbaodate)) {
          this.openToast('warning', '当数据源选择首期承保数据时，必须选择承保日期！')
          return
        }
      } else if (this.queryInfo.source === '1') {
        if (IsEmpty(this.queryInfo.statisticsDate)) {
          this.openToast('warning', '当数据源选择对账单数据时，必须选择结算年月！')
          return
        }
      }
      this.$refs[formName].validate((valid) => {
        if (valid) {
          console.log('submit!')
          switch (index) {
            case 0:
              this.queryInfo.currentPage = 1
              this.tableData = []
              this.totalRecords = 0
              this.tempType = this.queryInfo.type
              this.queryData()
              break
            case 1:
              window.open(`/tabycore/lifeAcceptInsurancebranch/exportReportBranch?type=${this.queryInfo.type}&source=${this.queryInfo.source}&statisticsDate=${this.queryInfo.statisticsDate}&ratetype=${this.queryInfo.ratetype}&statistical=${this.queryInfo.statistical}&agentType=${this.queryInfo.agentType}&startDate=${this.queryInfo.startDate}&endDate=${this.queryInfo.endDate}`)
              break
            case 2:
              window.open(`/tabycore/lifeAcceptInsurancebranch/exportReportBranchDetail?type=${this.queryInfo.type}&source=${this.queryInfo.source}&statisticsDate=${this.queryInfo.statisticsDate}&ratetype=${this.queryInfo.ratetype}&statistical=${this.queryInfo.statistical}&agentType=${this.queryInfo.agentType}&startDate=${this.queryInfo.startDate}&endDate=${this.queryInfo.endDate}`)
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
    queryData () {
      this.Loading()
      // let temp = {
      //   type: this.queryInfo.type,
      //   source: this.queryInfo.source,
      //   statisticsDate: this.queryInfo.statisticsDate,
      //   ratetype: this.queryInfo.ratetype,
      //   statistical: this.queryInfo.statistical,
      //   agentType: this.queryInfo.agentType,
      //   startDate: this.queryInfo.startDate,
      //   endDate: this.queryInfo.endDate,
      //   currentPage: this.queryInfo.currentPage,
      //   pageSize: this.queryInfo.pageSize
      // }
      api('/lifeAcceptInsurancebranch/queryReportBranch', 'post', this.queryInfo).then((res) => {
        console.log(res)
        this.closeLoading()
        if (res.data.code !== '000000' && !IsEmpty(res.data.code)) {
          this.openToast('warning', res.data.msg)
        } else {
          this.tableData = res.data.data.content
          this.tableShowOrnot = true
          this.totalRecords = res.data.data.totalElements
        }
      })
    },
    handleCurrentChange (val) {
      this.queryInfo.currentPage = val
      this.queryData()
    },
    handleSizeChange (val) {
      this.queryInfo.pageSize = val
      this.queryInfo.currentPage = 1
      this.queryData()
    },
    handleCurrentChange1 (val) {
      this.dialogTemp.currentPage = val
      this.openDetail(this.dialogTemp)
    },
    handleSizeChange1 (val) {
      this.dialogTemp.pageSize = val
      this.dialogTemp.currentPage = 1
      this.openDetail(this.dialogTemp)
    },
    exportDetail () {
      if (this.queryInfo.type === '0') {
        window.open(`/tabycore/lifeAcceptInsurancebranch/exportReportBranchDetail?comCode=${this.openDialogID}&type=${this.queryInfo.type}&source=${this.queryInfo.source}&statisticsDate=${this.queryInfo.statisticsDate}&ratetype=${this.queryInfo.ratetype}&statistical=${this.queryInfo.statistical}&agentType=${this.queryInfo.agentType}&startDate=${this.queryInfo.startDate}&endDate=${this.queryInfo.endDate}`)
      } else {
        window.open(`/tabycore/lifeAcceptInsurancebranch/exportReportBranchDetail?teamCode=${this.openDialogID}&type=${this.queryInfo.type}&source=${this.queryInfo.source}&statisticsDate=${this.queryInfo.statisticsDate}&ratetype=${this.queryInfo.ratetype}&statistical=${this.queryInfo.statistical}&agentType=${this.queryInfo.agentType}&startDate=${this.queryInfo.startDate}&endDate=${this.queryInfo.endDate}`)
      }
    },
    getDetailExamine (data) {
      // data.batchNo
      if (this.tempType === '0') {
        this.dialogTemp.comCode = data.comCode
      } else {
        this.dialogTemp.teamCode = data.teamCode
      }
      Object.assign(this.dialogTemp, this.queryInfo)
      this.openDetail(this.dialogTemp)
    },
    openDetail (data) {
      api('/lifeAcceptInsurancebranch/queryReportBranchDetail', 'post', data).then((res) => {
        console.log(res)
        this.closeLoading()
        if (res.data.code !== '000000' && !IsEmpty(res.data.code)) {
          this.openToast('warning', res.data.msg)
        } else {
          this.detailData = res.data.data.content
          this.detailDialogVis = true
          this.detailTotalRecords = res.data.data.totalElements
          if (this.tempType === '0') {
            this.openDialogID = data.comCode
          } else {
            this.openDialogID = data.teamCode
          }
        }
      })
    },
    detailClosing () {
      this.detailData = []
      this.detailTotalRecords = 0
      this.openDialogID = ''
      this.dialogTemp = {
        currentPage: 1,
        pageSize: 10
      }
      this.detailDialogVis = false
    },
    // toast提示
    openToast (type, mesg, time = 0) {
      this.toastMessage = this.$message({
        showClose: true,
        message: mesg,
        type: type,
        duration: time
      })
    },
    ...mapActions([
      'commissionConfigdblqueryCom3'
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
.ri-content{
  margin-top: 30px;
  margin-bottom: 30px;
}
#orgadd {
  padding-left: 30px;
  padding-right: 30px;
}
.btn-container{
  text-align: center;
  margin-top: 30px;
  margin-bottom: 30px;
}
.btn-container1{
  text-align: center;
  margin-top: 30px;
  margin-bottom: 10px;
}
.ri-line{
  margin-top: 10px;
  margin-bottom: 10px;
}
.tableButton {
  cursor: pointer;
  color: #66B1FF;
}
.ri-content1{
  text-align: -webkit-center;
  margin-top: 30px;
  margin-bottom: 30px;
}
</style>
