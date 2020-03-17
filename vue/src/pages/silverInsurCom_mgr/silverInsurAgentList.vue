<template>
  <div id="advance-index" >
    <ui-notice-bar slot="breadcast" >
      <el-breadcrumb slot="location" separator=">">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>银保代理佣金管理</el-breadcrumb-item>
        <el-breadcrumb-item>银保代理算薪清单</el-breadcrumb-item>
      </el-breadcrumb>
    </ui-notice-bar>
      <div class="ri-content" slot="content" >
        <el-row class="ri-line">
            <el-col :span=12>
              <ui-label-text labelWidth="120" label="保单号:" >
                <el-input v-model="info.policyNo" slot='text' clearable></el-input>
              </ui-label-text>
            </el-col>
          </el-row>
        <el-row class="ri-line">
          <el-col :span="12">
            <ui-label-text labelWidth="120" label="分公司代码:" >
              <el-input
              v-model="info.comCode"
              slot="text"
              placeholder="双击选择"
              clearable
              @dblclick.native="dbqueryCom(info.comCode)"
              @blur="onDbBlur(info.comCode)"
              ></el-input>
            </ui-label-text>
          </el-col>
          <el-col :span="12">
            <ui-label-text labelWidth="120" label="分公司名称:" >
              <el-input v-model="info.comName"
              slot="text"
              placeholder="双击选择"
              clearable
              @dblclick.native="dbqueryCom(info.comName)"
              @blur="onDbBlur(info.comName)"
              ></el-input>
            </ui-label-text>
          </el-col>
        </el-row>
        <el-row class="ri-line">
          <el-col :span=12>
            <ui-label-text labelWidth="120" label="业务员代码：">
              <el-input v-model="info.agentCode" slot='text' @dblclick.native="openComDialog()" @blur="opensingleComDialog()" clearable placeholder="双击选择"></el-input>
            </ui-label-text>
          </el-col>
          <el-col :span=12>
            <ui-label-text labelWidth="120" label="业务员名称：">
              <el-input v-model="info.agentName" slot='text' @dblclick.native="openComDialog()" @blur="opensingleComDialog()" clearable placeholder="双击选择"></el-input>
            </ui-label-text>
          </el-col>
        </el-row>
        <el-row class="ri-line">
          <el-col :span="12">
            <ui-label-text labelWidth="120" label="业绩归属月份:" >
              <el-date-picker
                v-model="info.belongDate"
                slot="text"
                type="month"
                value-format="yyyy-MM"
                placeholder="选择月">
              </el-date-picker>
            </ui-label-text>
          </el-col>
        <el-col :span="12">
        <ui-label-text labelWidth="120" label="人员类型" >
          <el-select v-model="info.jobType" slot="text" placeholder="请选择">
            <el-option
                v-for="(item, index) in options"
                :key="index"
                :label="item.label"
                :value="item.value">
            </el-option>
          </el-select>
        </ui-label-text>
        </el-col>
      </el-row>
    </div>
    <div class="btn-container">
      <el-button type="primary" @click="query">查询</el-button>
      <el-button type="primary" @click="onexport">导出</el-button>
    </div>
    <!-- table -->
    <div class="rate-table" v-show="isTableShow">
      <el-table
        :data="tableData"
        style="width: 100%">
          <el-table-column
            v-for="(item, index) in tableColumnList"
            :key="index"
            :label="item.label"
            :prop="item.prop"
            width="180">
          </el-table-column>
      </el-table>
      <el-pagination
        v-show="tablePage.total!=0"
        @current-change="handleCurrentChange"
        @size-change="handleSizeChange"
        :current-page="tablePage.currentPage"
        :page-size="tablePage.size"
        :page-sizes="tablePage.sizes"
        layout="total, sizes, prev, pager, next, jumper"
        :total="tablePage.total">
      </el-pagination>
    </div>
    <!-- db-dialog -->
    <el-dialog
      append-to-body
      center
      :visible.sync="dialogVisible"
      width="50%"
      >
      <el-table
        :data="dbPopPageList"
        highlight-current-row
        @row-click="onselectColumn"
        style="width: 100%">
          <el-table-column
            v-for="(item, index) in dialogColumnList"
            :key="index"
            :label="item.label"
            :prop="item.prop"
            >
          </el-table-column>
      </el-table>
      <el-pagination
        v-show="dbPopPage.total!=0"
        @current-change="handleCurrentChangeDb"
        @size-change="handleSizeChangeDb"
        :current-page="dbPopPage.currentPage"
        :page-size="dbPopPage.size"
        :page-sizes="dbPopPage.sizes"
        layout="total, sizes, prev, pager, next, jumper"
        :total="dbPopPage.total">
      </el-pagination>
    </el-dialog>
    <ComDialog :vis='comDialog' :workerVis='comDialogworker' :comVis='comDialogCom' :newTableData='tempTableData' @onClose='comDialogClosing' @selectDialog='dialogBackData' @comdialogChangePageFunction='changeComdialogPage1' @comdialogChangePageSizeFunction='changeComdialogPageSize1' :fenyetotal='fenyetotalData'/>
  </div>
</template>

<script>
import replaceStr from '@/utils/myFunction'
import NoticeBar from '@/components/notice-bar'
import LabelText from '@/components/label-text'
import api from '@/api/agreeRate_mgr/util/zxcrequest'
import IsEmpty from '@/utils/IsEmpty'
import { mapActions } from 'vuex'
import ComDialog from '@/components/comDialog'
export default {
  components: {
    [NoticeBar.name]: NoticeBar,
    [LabelText.name]: LabelText,
    ComDialog
  },
  data () {
    return {
      info: {
        policyNo: '',
        comCode: '',
        comName: '',
        agentCode: '',
        agentName: '',
        belongDate: '',
        jobType: '0',
        pageSize: 5
      },
      workerInfo: {
        agentCode: '',
        agentName: '',
        comCode: '',
        comName: '',
        validStatus: '1',
        pageSize: 10,
        currentPage: 1,
        clickType: '2'
      },
      tableData: [],
      isTableShow: false,
      tablePage: {
        currentPage: 1,
        total: 0,
        size: 5,
        sizes: [5, 10, 20, 50]
      },
      num: 0,
      expData: {},
      dateValue: '',
      options: [
        { label: '全部', value: '0' },
        { label: '合同制', value: '1' },
        { label: '代理制', value: '3' },
        { label: '代理制-昆仑', value: '6' },
        { label: '出单工号', value: '2' },
        { label: '劳务派遣', value: '4' },
        { label: '内勤合同制', value: '5' }
      ],
      tableColumnList: [
        { label: '业绩归属月份', prop: 'belongDate' },
        { label: '结佣月份', prop: 'sendDate' },
        { label: '省级分公司代码', prop: 'comCNCode' },
        { label: '省级分公司名称', prop: 'comCNName' },
        { label: '地市级分公司代码', prop: 'comCode' },
        { label: '地市级分公司名称', prop: 'comName' },
        { label: '网点代码', prop: 'netCode' },
        { label: '网点名称', prop: 'netName' },
        { label: '寿险公司', prop: 'companyName' },
        { label: '银行渠道', prop: 'bankName' },
        { label: '险种代码', prop: 'riskCode' },
        { label: '险种名称', prop: 'riskName' },
        { label: '保单号', prop: 'policyNo' },
        { label: '缴费年期', prop: 'period' },
        { label: '主附险标志', prop: 'riskFlag' },
        { label: '规模保费', prop: 'premium' },
        { label: '保单状态', prop: 'policyStatus' },
        { label: '投保日期', prop: 'insureDate' },
        { label: '承保日期', prop: 'acceptDate' },
        { label: '回执签收日期', prop: 'signDate' },
        { label: '回访结果', prop: 'visitStatus' },
        { label: '投保人姓名', prop: 'insureName' },
        { label: '人员类型', prop: 'jobType' },
        { label: '增员人代码', prop: 'instructCode' },
        { label: '增员人名称', prop: 'instructName' },
        { label: '业务员代码', prop: 'agentCode' },
        { label: '业务员名称', prop: 'agentName' },
        { label: '绩效比例(%)', prop: 'firstCommissionRate' },
        { label: '绩效', prop: 'firstCommission' },
        { label: '考核绩效比例(%)', prop: 'assessmentCommissionRate' },
        { label: '考核绩效', prop: 'assessmentCommission' }
      ],
      // dialog
      dialogVisible: false,
      comDialog: false,
      comDialogworker: true,
      comDialogCom: false,
      tempTableData: [],
      fenyetotalData: 0,
      dialogColumnList: [
        { label: '分公司代码', prop: 'comCode' },
        { label: '分公司名称', prop: 'comCName' }
      ],
      dbPopPage: {
        currentPage: 1,
        total: 0,
        size: 5,
        sizes: [5, 10, 20, 50]
      },
      dbPopPageList: []
    }
  },
  mounted () {},
  methods: {
    getQueryBankCommissionList (currentPage = 1) {
      this.Loading()
      api('/salaryCommissionBank/queryBankCommissionList', 'post', {
        policyNo: this.info.policyNo,
        currentPage,
        agentCode: this.info.agentCode,
        agentName: this.info.agentName,
        pageSize: this.info.pageSize,
        jobType: this.info.jobType,
        comCode: this.info.comCode,
        comName: this.info.comName,
        belongDate: this.info.belongDate
      }).then(r => {
        this.closeLoading()
        console.log(r)
        this.isTableShow = true
        this.tableData = r.data.data
        this.tablePage.total = r.data.totalRecords
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
    comDialogClosing () {
      this.workerInfo = {
        agentCode: '',
        agentName: '',
        comCode: '',
        comName: '',
        validStatus: '1',
        pageSize: 10,
        currentPage: 1,
        clickType: '2'
      }
      this.comDialog = false
    },
    // 省级公司
    getBaseCompanyQuery (comCodeOrName, clickType = 2) {
      this.Loading()
      api('/persistency/getAllComP', 'post', {
        clickType,
        comCodeOrName,
        currentPage: this.dbPopPage.currentPage,
        pageSize: this.dbPopPage.size
      }).then(r => {
        this.closeLoading()
        // console.log(r)
        if (r.data.code === '000000') {
          for (let i = 0; i < r.data.data.data.length; i++) {
            r.data.data.data[i].comCName = replaceStr(r.data.data.data[i].comCName)
          }
          if (clickType === 2) {
            this.dbPopPage.total = r.data.data.totalRecords
            this.dbPopPageList = r.data.data.data
          } else {
            console.log(r)
            this.info.comCode = r.data.data.data[0].comCode
            this.info.comName = r.data.data.data[0].comCName
          }
        } else {
          if (clickType === 2) {
            this.$message({
              message: r.data.msg,
              type: 'error'
            })
          } else {
            this.$message({
              message: '无此查询',
              type: 'warning'
            })
            this.info.comCode = ''
            this.info.comName = ''
          }
        }
      })
    },
    changeComdialogPage1 (data) {
      this.workerInfo.currentPage = data
      this.openComDialog()
    },
    changeComdialogPageSize1 (data) {
      this.workerInfo.currentPage = 1
      this.workerInfo.pageSize = data
      this.openComDialog()
    },
    dialogBackData (data) {
      this.comDialog = false
      let temp = []
      temp = data.split('-')
      this.info.agentCode = temp[0]
      this.info.agentName = temp[1]
    },
    openComDialog () {
      this.workerInfo.agentCode = this.info.agentCode
      this.workerInfo.agentName = this.info.agentName
      this.workerInfo.clickType = '2'
      this.contiListCheckclickWorker(this.workerInfo).then(
        (res) => {
          if (res.data.code !== '000000' && !IsEmpty(res.data.code)) {
            this.openToast('warning', res.data.msg)
          } else {
            this.tempTableData = res.data.data.data
            this.fenyetotalData = res.data.data.totalRecords
            for (let i = 0; i < this.tempTableData.length; i++) {
              this.tempTableData[i]['renderData'] = `${this.tempTableData[i].agentCode}-${this.tempTableData[i].agentName}`
            }
            this.comDialog = true
            this.comDialogCom = true
            this.comDialogworker = false
          }
        })
    },
    opensingleComDialog () {
      if (!(this.comDialog)) {
        this.workerInfo.agentCode = this.info.agentCode
        this.workerInfo.agentName = this.info.agentName
        this.workerInfo.clickType = '1'
        this.contiListCheckclickWorker(this.workerInfo).then(
          (res) => {
            if (res.data.code !== '000000' && !IsEmpty(res.data.code)) {
              this.openToast('warning', res.data.msg)
              this.info.agentCode = ''
              this.info.agentName = ''
            } else {
              if (!IsEmpty(res.data.data.data) && res.data.data.data.length === 1) {
                this.info.agentCode = res.data.data.data[0].agentCode
                this.info.agentName = res.data.data.data[0].agentName
              } else {
                this.info.agentCode = ''
                this.info.agentName = ''
              }
            }
          })
      }
    },
    ...mapActions([
      'contiListCheckclickWorker'
    ]),
    // toast提示
    openToast (type, mesg) {
      this.$message({
        showClose: true,
        message: mesg,
        type: type
      })
    },
    query () {
      this.getQueryBankCommissionList()
    },
    handleCurrentChange (val) {
      this.getQueryBankCommissionList(val)
    },
    handleSizeChange (val) {
      this.info.pageSize = val
      this.getQueryBankCommissionList()
    },
    // dbDialog的分页
    handleCurrentChangeDb (val) {
      this.dbPopPage.currentPage = val
      this.getBaseCompanyQuery()
    },
    handleSizeChangeDb (val) {
      console.log(val)
      this.dbPopPage.size = val
      this.getBaseCompanyQuery()
    },
    dbqueryCom (e) {
      console.log(e)
      this.dbPopPage.total = 0
      this.dbPopPage.size = 5
      this.dbPopPage.currentPage = 1
      this.dialogVisible = true
      this.getBaseCompanyQuery(e)
    },
    onDbBlur (e) {
      if (this.isTableShow === false) {
        if (e === '') {
          console.log('1')
        } else {
          this.getBaseCompanyQuery(e, 1)
        }
      }
    },
    onselectColumn (row) {
      this.info.comCode = row.comCode
      this.info.comName = row.comCName
      this.dialogVisible = false
    },
    onexport () {
      this.$confirm(
        '此过程可能比较缓慢，导出过程中请勿关闭浏览器, 是否继续?',
        '提示',
        {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }
      )
        .then(() => {
          this.$message({
            type: 'success',
            message: `即将下载银保代理算薪清单`
          })
          this.exp()
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消下载'
          })
        })
    },
    exp () {
      window.open(`/tabycore/salaryCommissionBank/queryBankCommissionListImport?policyNo=${this.info.policyNo}&comCode=${
        this.info.comCode
      }&comName=${this.info.comName}&belongDate=${
        this.info.belongDate
      }&jobType=${this.info.jobType}&agentCode=${
        this.info.agentCode
      }&agentName=${this.info.agentName}`)
    }
  },
  watch: {
    'info.comCode' () {
      if (this.info.comCode === '') {
        this.info.comName = ''
      }
    },
    'info.comName' () {
      if (this.info.comName === '') {
        this.info.comCode = ''
      }
    },
    'info.agentCode' () {
      if (this.info.agentCode === '') {
        this.info.agentName = ''
      }
    },
    'info.agentName' () {
      if (this.info.agentName === '') {
        this.info.agentCode = ''
      }
    }
  },
  created () {},
  computed: {
    resultNum () {
      return this.num
    }
  }
}
</script>

<style lang="scss">
#advance-index {
  .el-form-item__error {
    left: 148px;
  }
  .el-table__empty-block {
    justify-content: flex-start;
    text-align: left;
    margin-left: 490px;
  }
}
</style>

<style lang="scss" scoped type="text/css">
#advance-index {
  padding-left: 30px;
  padding-right: 30px;
}
.btn-container {
  text-align: center;
  margin-top: 60px;
  margin-bottom: 30px;
}
.ri-line {
  margin-top: 10px;
  margin-bottom: 10px;
}
</style>
