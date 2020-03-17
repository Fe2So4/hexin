<template>
  <div class="wrap">
    <ui-notice-bar slot="breadcast" >
      <el-breadcrumb slot="location" separator=">">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>继续率报表管理</el-breadcrumb-item>
        <el-breadcrumb-item>运营合作经代继续率</el-breadcrumb-item>
      </el-breadcrumb>
    </ui-notice-bar>
    <el-form class="verify-content" :model="info" :rules="rules" ref="ruleForm">
      <el-row class="ri-line" v-for="(item, index) in queryList" :key="index">
        <el-col :span="12" v-for="i in item" :key="i.arrId">
          <el-form-item :prop="i.model">
            <ui-label-text labelWidth="200" :label="i.label+':'" >
              <el-input
                v-model="info[i.model]"
                slot="text"
                placeholder="双击可选择"
                clearable
                @clear="onClearInput(i.arrId)"
                @blur="handleBlur(i.arrId)"
                @dblclick.native="dbqueryCom(i.arrId)">
              </el-input>
            </ui-label-text>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item prop="jixilvFlag">
            <ui-label-text labelWidth="200" label="继续率类型:" required=true>
              <el-select v-model="info.jixilvFlag" slot="text" placeholder="请选择">
                <el-option
                  v-for="item in options"
                  :key="item.jixilvFlag"
                  :label="item.label"
                  :value="item.jixilvFlag">
                </el-option>
              </el-select>
            </ui-label-text>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item prop="cRateMonthStart">
            <ui-label-text labelWidth="200" label="继续率起期:" required=true>
              <el-date-picker
                v-model="info.cRateMonthStart"
                slot="text"
                type="month"
                value-format="yyyy-MM"
                @blur="onDataStart"
                placeholder="选择月">
              </el-date-picker>
            </ui-label-text>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item prop="cRateMonthEnd">
            <ui-label-text labelWidth="200" label="继续率止期:" required=true>
              <el-date-picker
                v-model="info.cRateMonthEnd"
                slot="text"
                type="month"
                value-format="yyyy-MM"
                @blur="onDataEnd"
                placeholder="选择月">
              </el-date-picker>
            </ui-label-text>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <div class="btn">
      <el-button type="primary" @click="onquery">查询</el-button>
      <el-button type="primary" @click="onexportQuery">导出</el-button>
    </div>
    <!-- table -->
    <div class="table">
      <el-table
        v-show="tableVisible"
        :data="tableData"
        height="300"
        style="width: 100%">
        <el-table-column
          v-for="(item, index) in tabelColumList"
          v-if="index < 7"
          :key="index"
          :prop="item.prop"
          :label="item.label"
          width="180">
        </el-table-column>
        <el-table-column
          v-else
          :key="index"
          :prop="item.prop"
          :label="item.label"
          width="180">
          <template slot-scope="scope">
            <el-button type="primary" @click="ondownloadDetail(scope.row)">下载明细</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- <el-pagination
        v-show="tablePage.total!=0"
        @current-change="handleDiaCurrentChange"
        @size-change="handleSizeChange"
        :current-page="tablePage.currentPage"
        :page-size="tablePage.size"
        :page-sizes="tablePage.sizes"
        layout="total, sizes, prev, pager, next, jumper"
        :total="tablePage.total">
      </el-pagination> -->
    </div>
    <el-dialog
      append-to-body
      center
      title="请点击选择"
      :visible.sync="dialogVisible"
      width="50%"
      >
      <!-- db-select-dialog -->
      <div class="btn">
        <el-table
          :data="dbDialogData"
          highlight-current-row
          @row-click="onselectTabelRow"
          style="width: 100%">
          <el-table-column
            v-for="(item, index) in dbSelect"
            :key="index"
            :prop="item.prop === 'coocompanyCode' ? 'introduceType' : item.prop"
            :label="item.label">
          </el-table-column>
        </el-table>
        <el-pagination
          v-show="dbPage.total!=0"
          @current-change="handleDiaCurrentChangeDb"
          @size-change="handleSizeChangeDb"
          :current-page="dbPage.currentPage"
          :page-size="dbPage.size"
          :page-sizes="dbPage.sizes"
          layout="total, sizes, prev, pager, next, jumper"
          :total="dbPage.total">
        </el-pagination>
      </div>
    </el-dialog>
    <!-- 导出slsx -->
    <el-table
      v-show="false"
      id="exportTable"
      :data="exportDataList"
      ref="multipleTable"
      highlight-current-row
      style="width: 100%">
      <el-table-column
        v-for="(item, index) in tabelColumList"
        v-if="index < 7"
        :key="index"
        :prop="item.prop"
        :label="item.label"
        width="300">
      </el-table-column>
    </el-table>
    <!-- exportDetail-slsx -->
    <el-table
      v-show="false"
      id="exportTableDetail"
      :data="exportDataList"
      ref="multipleTable"
      highlight-current-row
      style="width: 100%">
      <el-table-column
        v-for="(item, index) in tabelColumDetailList"
        :key="index"
        :prop="item.prop"
        :label="item.label"
        width="300">
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import NoticeBar from '@/components/notice-bar'
import LabelText from '@/components/label-text'
import api from '@/api/agreeRate_mgr/util/zxcrequest'
export default {
  components: {
    [NoticeBar.name]: NoticeBar,
    [LabelText.name]: LabelText
  },
  data () {
    return {
      // from
      info: {
        companyCode: '',
        companyName: '',
        upComCode: '',
        upComName: '',
        coocompanyCode: '',
        coocompanyName: '',
        jixilvFlag: '',
        cRateMonthStart: '',
        cRateMonthEnd: ''
      },
      pageSize: 5,
      queryList: [
        [{label: '保险公司代码', model: 'companyCode', prop: 'insurercode', arrId: 1}, {label: '保险公司名称', model: 'companyName', prop: 'insurername', arrId: 11}],
        [{label: '省级分公司机构代码', model: 'upComCode', prop: 'comCode', arrId: 2}, {label: '省级分公司机构名称', model: 'upComName', prop: 'comCName', arrId: 22}],
        [{label: '合作经代公司简称', model: 'coocompanyCode', prop: 'coocompanyCode', arrId: 3}, {label: '合作经代寿险公司名称', model: 'coocompanyName', prop: 'companyName', arrId: 33}]
      ],
      options: [
        {label: 'R13', jixilvFlag: 1},
        {label: 'R25', jixilvFlag: 2},
        {label: 'R37', jixilvFlag: 3}
      ],
      rules: {
        jixilvFlag: {required: true, message: '继续率类型不能为空'},
        cRateMonthStart: {required: true, message: '继续率起期不能为空'},
        cRateMonthEnd: {required: true, message: '继续率止期不能为空'}
      },
      // table
      tableVisible: false,
      tableData: [],
      loading: '',
      tabelColumList: [
        {label: '省级分公司名称', prop: 'upComName'},
        {label: '合作经代公司简称', prop: 'coocompanyCode'},
        {label: '合作经代公司名称', prop: 'coocompanyName'},
        {label: '当月值', prop: 'r13DuringMonth'},
        {label: '中月值', prop: 'r13FollowingMonth'},
        {label: '宽末值', prop: 'r13EndMonth'},
        {label: '累计继续率', prop: 'leijiRate'},
        {label: '下载明细', prop: 'date'}
      ],
      tabelColumDetailList: [
        {label: '保单号', prop: 'policyNo'},
        {label: '险种代码', prop: 'riskCode'},
        {label: '险种名称', prop: 'riskName'},
        {label: '缴费年期', prop: 'paymentPeriod'},
        {label: '应收日期', prop: 'paidDate'},
        {label: '生效日期', prop: 'generateDate'},
        {label: '主/附险标识', prop: 'mainoRextrFlag'},
        {label: '寿险公司', prop: 'companyName'},
        {label: '省级分公司名称', prop: 'upComName'},
        {label: '合作经代寿险公司名称', prop: 'coocompanyName'},
        {label: '投保人', prop: 'partyName'},
        {label: '保单状态', prop: 'policyStatus'},
        {label: '首期业务员代码', prop: 'handlerCode'},
        {label: '首期业务员名称', prop: 'handlerName'},
        {label: '首期业务员在职状态', prop: 'oldValidStatus'},
        {label: '首期业务员离职时间', prop: 'outtime'},
        {label: '首期业务员归属机构', prop: 'handlerComName'},
        {label: '当前业务员代码', prop: 'agentCode2'},
        {label: '当前业务员名称', prop: 'agentName2'},
        {label: '当前业务员在职状态', prop: 'newValidStatus'},
        {label: '当前业务员离职时间', prop: 'agentName2ComName'},
        {label: '当前业务员归属机构', prop: 'oldTime'},
        {label: '首期录入保费', prop: 'premium'},
        {label: '首期实收保费', prop: 'paidPremium'},
        {label: '续期1保费', prop: 'xqPaidPremium'},
        {label: '续期1标识', prop: 'xqFlag'},
        {label: 'R13月份', prop: 'r13cRateMouth'},
        {label: 'R25月份', prop: 'r25cRateMouth'},
        {label: 'R37月份', prop: 'r37cRateMouth'},
        {label: '续期1实收日期', prop: 'xqpaidDate'},
        {label: '续期1递归日期', prop: 'recursionTime'},
        {label: '续期2业务员代码', prop: 'agentCode3'},
        {label: '续期2业务员名称', prop: 'agentName3'},
        {label: '续期2业务员在职状态', prop: 'oldStatus'},
        {label: '续期2业务员归属机构', prop: 'agentCode3ComName'},
        {label: '续期2实收保费', prop: 'paidPremium3'},
        {label: '续期2标识', prop: 'xqflag3'},
        {label: '续期2实收日期', prop: 'xccreatetime3'},
        {label: '续期2递归时间', prop: 'lacreatetime3'},
        {label: '续期3业务员代码', prop: 'lacreatetime4'},
        {label: '续期3业务员姓名', prop: 'lacreatetime4'},
        {label: '续期3业务员在职状态', prop: 'lacreatetime4'},
        {label: '续期3业务员归属机构', prop: 'lacreatetime4'},
        {label: '续期3实收保费', prop: 'lacreatetime4'},
        {label: '续期3标识', prop: 'xqflag4'},
        {label: '续期3实收日期', prop: 'xccreatetime4'},
        {label: '续期3递归时间', prop: 'lacreatetime4'}
      ],
      tablePage: {
        currentPage: 1,
        total: 0,
        size: 5,
        sizes: [5, 10, 20, 50]
      },
      // dialog
      dbDialogData: [],
      dbPage: {
        currentPage: 1,
        total: 0,
        size: 5,
        sizes: [5, 10, 20, 50]
      },
      dbSelect: [],
      dialogVisible: false,
      dbSelectArrId: '',
      // 导出
      exportDataList: []
    }
  },
  methods: {
    getQueryPersistencyOperationReport (currentPage = 1) {
      this.Loading()
      this.tableData = []
      this.tablePage.total = 0
      let info = {}
      info = Object.assign(this.info)
      api('/cooRenewRate/queryPersistencyOperationReport', 'post', info).then(r => {
        console.log(r)
        this.closeLoading()
        if (r.data.code === '000000') {
          this.tableData = r.data.data.data
          this.tablePage.total = r.data.data.totalRecords
        } else {
          this.$message({
            message: r.data.msg,
            type: 'error'
          })
        }
        this.tableVisible = true
      })
    },
    exportDataDetail (type, row) {
      let info = {
        companyCode: row.companyCode,
        companyName: row.companyName,
        upComCode: row.upComCode,
        upComName: row.upComName,
        coocompanyCode: row.coocompanyCode,
        coocompanyName: row.coocompanyName,
        jixilvFlag: row.jixilvFlag,
        cRateMonthStart: row.cRateMonthStart,
        cRateMonthEnd: row.cRateMonthEnd
      }
      info = Object.assign(info)
      Object.keys(info).forEach(function (key) {
        if (info[key] == null) {
          info[key] = ''
        }
      })
      window.open(`/tabycore/cooRenewRate/downDetails?jixilvFlag=` + info.jixilvFlag + `&cRateMonthStart=` + info.cRateMonthStart + `&cRateMonthEnd=` + info.cRateMonthEnd + `&companyCode=` + info.companyCode + `&companyName=` + info.companyName + `&upComCode=` + info.upComCode + `&upComName=` + info.upComName + `&coocompanyCode=` + info.coocompanyCode + `&coocompanyName=` + info.coocompanyName)
//       api('/cooRenewRate/downDetails', 'get', info).then(r => {
//       })
    },
    // 保险代码
    getInsures (currentPage = 1, clickType = 2) {
      api('/bankReports/getInsures', 'post', {
        currentPage,
        clickType,
        insurerCode: this.info.companyCode,
        insurerName: this.info.companyName,
        type: 2,
        pageSize: this.dbPage.size
      }).then(r => {
        console.log(r)
        let length = r.data.data.length
        if (length < 1) {
          this.$message({
            message: '无此查询',
            type: 'warning'
          })
          this.info.companyCode = ''
          this.info.companyName = ''
        } else if (length === 1 && clickType === 1) {
          this.info.companyCode = r.data.data.data[0].insurercode
          this.info.companyName = r.data.data.data[0].insurername
        } else {
          this.dbPage.total = r.data.data.totalRecords
          this.dbDialogData = r.data.data.data
        }
      })
    },
    // 省级分公司
    getAllComP (currentPage = 1, clickType = 2) {
      let queryTemp = ''
      if (this.info.upComCode === '') {
        queryTemp = this.info.upComName
      } else {
        queryTemp = this.info.upComCode
      }
      api('/persistency/getAllComP', 'post', {
        clickType,
        currentPage,
        comCodeOrName: queryTemp,
        pageSize: this.dbPage.size
      }).then(r => {
        console.log(r)
        if (r.data.code === '000000') {
          if (clickType === 2) {
            this.dbDialogData = r.data.data.data
            this.dbPage.total = r.data.data.totalRecords
          } else {
            let prop0 = this.dbSelect[0].prop
            let prop1 = this.dbSelect[1].prop
            let model0 = this.dbSelect[0].model
            let model1 = this.dbSelect[1].model
            this.info[model0] = r.data.data.data[0][prop0]
            this.info[model1] = r.data.data.data[0][prop1]
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
              type: 'error'
            })
            let model0 = this.dbSelect[0].model
            let model1 = this.dbSelect[1].model
            this.info[model0] = ''
            this.info[model1] = ''
          }
        }
      })
    },
    getAllComC (currentPage = 1, clickType = 2) {
      let queryTemp = ''
      if (this.info.coocompanyCode === '') {
        queryTemp = this.info.coocompanyName
      } else {
        queryTemp = this.info.coocompanyCode
      }
      api('/baseCooagencyCompany/findByCodeOrName2', 'post', {
        clickType,
        current: currentPage,
        companyCodeOrName: queryTemp,
        pageSize: this.dbPage.size
      }).then(r => {
        console.log(r)
        if (r.data.code === '000000') {
          if (clickType === 2) {
            this.dbDialogData = r.data.data.data
            this.dbPage.total = r.data.data.totalRecords
          } else {
            let prop0 = this.dbSelect[0].prop
            let prop1 = this.dbSelect[1].prop
            let model0 = this.dbSelect[0].model
            let model1 = this.dbSelect[1].model
            this.info[model0] = prop0 === 'coocompanyCode' ? r.data.data.data[0]['introduceType'] : r.data.data.data[0][prop0]
            this.info[model1] = r.data.data.data[0][prop1]
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
              type: 'error'
            })
            let model0 = this.dbSelect[0].model
            let model1 = this.dbSelect[1].model
            this.info[model0] = ''
            this.info[model1] = ''
          }
        }
      })
    },
    // changeDbSelect () {
    //   for (let i = 0; i < this.dbSelect.length; i++) {
    //     if (this.dbSelect[i] instanceof Array) {
    //       for (let j = 0; j < this.dbSelect[i].length; j++) {
    //         for (const key in this.dbSelect[i][j]) {
    //           if (this.dbSelect[i][j].hasOwnProperty(key)) {
    //             for (let p1 in this.dbSelect[i][j]) {
    //               if (this.dbSelect[i][j].hasOwnProperty(p1) && String(p1) === 'model' && this.dbSelect[i][j][`${p1}`] === 'coocompanyCode') {
    //                 this.dbSelect[i][j][`${p1}`] = 'introduceType'
    //               }
    //             }
    //           }
    //         }
    //       }
    //     } else if (this.dbSelect[i] instanceof Object) {
    //       for (const key in this.dbSelect[i]) {
    //         if (this.dbSelect[i].hasOwnProperty(key)) {
    //           for (let p1 in this.dbSelect[i]) {
    //             if (this.dbSelect[i].hasOwnProperty(p1) && String(p1) === 'model' && this.dbSelect[i][`${p1}`] === 'coocompanyCode') {
    //               this.dbSelect[i][`${p1}`] = 'introduceType'
    //             }
    //           }
    //         }
    //       }
    //     }
    //   }
    // },
    // 换页失焦校验
    dbqueryCom (e) {
      this.dbDialogData = []
      this.dbPage.size = 5
      this.dbPage.currentPage = 1
      this.dbPage.total = 0
      console.log(this.dbPage)
      let arrId = e.toString().substr(0, 1)
      this.dbSelectArrId = arrId
      console.log(arrId)
      this.dbSelect = this.queryList[arrId - 1]
      if (arrId === '1') {
        this.getInsures()
        this.dialogVisible = true
      } else if (arrId === '2') {
        this.getAllComP()
        this.dialogVisible = true
      } else if (arrId === '3') {
        this.getAllComC()
        this.dialogVisible = true
      }
    },
    handleBlur (e) {
      let arrId = e.toString().substr(0, 1)
      console.log(arrId)
      this.dbSelect = this.queryList[arrId - 1]
      if (this.dialogVisible === false) {
        if (arrId === '1' && this.info.companyCode !== '') {
          this.getInsures(1, 1)
        } else if (arrId === '2' && this.info.upComCode !== '') {
          this.getAllComP(1, 1)
        } else if (arrId === '3' && this.info.coocompanyCode !== '') {
          this.getAllComC(1, 1)
        }
      }
    },
    // 双向清除
    onClearInput (e) {
      console.log(e)
      let arrId = e.toString().substr(0, 1)
      this.dbSelect = this.queryList[arrId - 1]
      let model0 = this.dbSelect[0].model
      let model1 = this.dbSelect[1].model
      this.info[model0] = ''
      this.info[model1] = ''
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
    handleDiaCurrentChange (e) {
      console.log(e)
      this.getQueryPersistencyOperationReport(e)
    },
    handleSizeChange (e) {
      this.pageSize = e
      this.getQueryPersistencyOperationReport()
    },
    handleDiaCurrentChangeDb (e) {
      let arrId = this.dbSelectArrId
      if (arrId === '1') {
        this.getInsures(e)
      } else if (arrId === '2') {
        this.getAllComP(e)
      } else {
        this.getAllComC(e)
      }
    },
    handleSizeChangeDb (e) {
      this.dbPage.size = e
      let arrId = this.dbSelectArrId
      if (arrId === '1') {
        this.getInsures()
      } else if (arrId === '2') {
        this.getAllComP()
      } else {
        this.getAllComC()
      }
    },
    // 查询和导出
    onquery () {
      let e = 1
      this.submitForm(e)
    },
    submitForm (e) {
      this.$refs['ruleForm'].validate((valid) => {
        if (valid) {
          if (e === 1) {
            this.getQueryPersistencyOperationReport()
            console.log('1')
          } else {
            this.onexport('List')
            console.log('2')
          }
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    onexportQuery () {
      let e = 2
      this.submitForm(e)
    },
    onexport (e, row) {
      this.$confirm('此过程可能比较缓慢，导出过程中请勿关闭浏览器, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$message({
          type: 'success',
          message: `即将下载`
        })
        if (e === 'List') {
          window.open(`/tabycore/cooRenewRate/exportPersistencyOperationReport?jixilvFlag=` + this.info.jixilvFlag + `&cRateMonthStart=` + this.info.cRateMonthStart + `&cRateMonthEnd=` + this.info.cRateMonthEnd + `&companyCode=` + this.info.companyCode + `&companyName=` + this.info.companyName + `&upComCode=` + this.info.upComCode + `&upComName=` + this.info.upComName + `&coocompanyCode=` + this.info.coocompanyCode + `&coocompanyName=` + this.info.coocompanyName)
        } else {
          console.log('1')
          this.exportDataDetail(e, row)
        }
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消下载'
        })
      })
    },
    ondownloadDetail (e) {
      let type = 0
      if (e.upComCode.length === '2' || e.upComCode.length === '0') {
        type = 1
      } else if (e.upComCode.length === '6' && e.coocompanyCode.length === '0') {
        type = 2
      } else {
        type = 3
      }
      this.onexport(type, e)
      // this.exportDataDetail(type)
    },
    onselectTabelRow (row) {
      console.log(this.info)
      let before = this.dbSelect[0].model
      let later = this.dbSelect[1].model
      // console.log(before, later)
      this.info[before] = row[this.dbSelect[0].prop === 'coocompanyCode' ? 'introduceType' : this.dbSelect[0].prop]
      this.info[later] = row[this.dbSelect[1].prop]
      this.dialogVisible = false
    },
    // 开始时间不能大于结束时间
    onDataStart () {
      if (this.info.cRateMonthStart !== '') {
        let start = this.info.cRateMonthStart.slice(0, 4).concat(this.info.cRateMonthStart.slice(5))
        let end = this.info.cRateMonthEnd.slice(0, 4).concat(this.info.cRateMonthEnd.slice(5))
        if (this.info.cRateMonthEnd !== '') {
          if (parseInt(start) > parseInt(end)) {
            this.$message({
              message: '继续率止期不得早于继续率起期',
              type: 'warning'
            })
            this.info.cRateMonthStart = ''
          }
        }
      }
    },
    onDataEnd () {
      if (this.info.cRateMonthEnd !== '') {
        let start = this.info.cRateMonthStart.slice(0, 4).concat(this.info.cRateMonthStart.slice(5))
        let end = this.info.cRateMonthEnd.slice(0, 4).concat(this.info.cRateMonthEnd.slice(5))
        if (this.info.cRateMonthStart !== '') {
          if (parseInt(start) > parseInt(end)) {
            this.$message({
              message: '继续率止期不得早于继续率起期',
              type: 'warning'
            })
            this.info.cRateMonthEnd = ''
          }
        }
      }
    }
  }
}
</script>

<style lang="scss">
.wrap{
  .el-table__empty-block{
    justify-content: flex-start;
    text-align: left;
    margin-left: 490px;
  }
}
</style>

<style lang="scss" scoped type="text/css">
.wrap{
  padding-left: 30px;
  padding-right: 30px;
}
.verify-content{
  padding: 20px 0;
}
.btn{
  text-align: center;
}
.btn .el-button{
  margin-right: 10px;
}
.table{
  margin: 20px 0;
}
.btn-export{
  margin: 10px auto;
}
.upload-content{
  width: 100%;
  text-align: center;
}
.red-color{
  color: red;
}
.download{
  color:blue;
  cursor:pointer;
}
.dis-top{
  margin-top: 10px;
}
</style>
