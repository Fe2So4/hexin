<template>
  <div id="rate-index" >
    <ui-notice-bar slot="breadcast" >
      <el-breadcrumb slot="location" separator=">">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>折标系数管理</el-breadcrumb-item>
        <el-breadcrumb-item>总公司寿险折标系数管理</el-breadcrumb-item>
      </el-breadcrumb>
    </ui-notice-bar>
    <rate-upload :isImport="limt.import"></rate-upload>
    <ui-line-tittle :collapsible="true" >
        <span slot="title" >
          <i class="font_family icon-jy-menu-4" ></i>请输入折标系数查询条件
        </span>
        <div class="ri-content" slot="content" >
          <el-form :model="info" :rules="queryrules" ref="queryForm" >
          <el-row class="ri-line">
            <el-col :span="12">
            <ui-label-text labelWidth="120" label="折标系数类型:" >
              <el-select v-model="info.type" slot="text" placeholder="请选择">
                <el-option
                    label="佰盈业务折标系数"
                    value="v1">
                </el-option>
              </el-select>
            </ui-label-text>
            </el-col>
            <el-col :span="12">
            <ui-label-text labelWidth="120" label="缴费年期:" >
              <el-input v-model="info.period" slot="text" clearable></el-input>
            </ui-label-text>
            </el-col>
          </el-row>
          <el-row class="ri-line">
            <el-col :span="12">
              <!-- <el-form-item class="insurerCode" prop="insurerCode"> -->
                <ui-label-text labelWidth="120" label="保险公司代码:" >
                  <el-input v-model="info.insurerCode" slot="text" placeholder="双击可选择" clearable  @dblclick.native="dbqueryCom" ></el-input>
                </ui-label-text>
              <!-- </el-form-item> -->
            </el-col>
            <el-col :span="12">
              <!-- <el-form-item class="insurerName" prop="insurerName"> -->
              <ui-label-text labelWidth="120" label="保险公司名称:" >
                <el-input v-model="info.insurerName" slot="text" placeholder="双击可选择" clearable @dblclick.native="dbqueryCom" ></el-input>
              </ui-label-text>
              <!-- </el-form-item> -->
            </el-col>
          </el-row>
          <el-row class="ri-line">
            <el-col :span="12">
            <ui-label-text labelWidth="120" label="险种代码:" >
              <el-input v-model="info.riskCode" slot="text" placeholder="双击可选择" clearable @dblclick.native="dbqueryRisk"></el-input>
            </ui-label-text>
            </el-col>
            <el-col :span="12">
            <ui-label-text labelWidth="120" label=" 险种名称 :" >
              <el-input v-model="info.riskName" slot="text" placeholder="双击可选择" clearable @dblclick.native="dbqueryRisk" ></el-input>
            </ui-label-text>
            </el-col>
          </el-row>
          </el-form>
        </div>
    </ui-line-tittle>
    <div class="btn-container" slot="controlbar" >
      <el-button type="primary" :disabled="!limt.query" @click.native.prevent="handleQuery()">查询</el-button>
      <el-button type="primary" :disabled="!limt.review" @click.native.prevent="toCheck()">审核</el-button>
    </div>

    <!-- 表格 -->
    <div class="rate-table" v-show="isTableShow">
      <el-table
        :data="tableData"
        style="width: 100%">
        <el-table-column
          label="保险公司代码"
          width="180">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.insurerCode }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="保险公司名称"
          width="180">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.insurerName }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="险种代码"
          width="180">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.riskCode }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="险种名称"
          width="180">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.riskName }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="折标系数"
          width="180">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.rate }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="生效日期"
          width="180">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.effectiveDate }}</span>
          </template>
        </el-table-column>
        <el-table-column label="审核状态" width="160">
          <template slot-scope="scope">
            <span style="margin-left: 10px" >{{ scope.row.verifyStatusFor | rateCheckType }}</span>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        v-show="tablePage.total!=0"
        @current-change="handleCurrentChange"
        @size-change="handleSizeChange"
        :current-page="tablePage.currentPage"
        :page-size="tablePage.size"
        :page-sizes="[10, 20, 50]"
        layout="total, sizes, prev, pager, next, jumper"
        :total="tablePage.total">
      </el-pagination>
      <div class="btn-container" slot="controlbar" >
        <el-button type="primary" @click.native.prevent="exp()">导出</el-button>
        <a type="hidden" href="" ref="toExp"></a>
      </div>
    </div>

    <!-- 审核弹出框 -->
    <el-dialog
      :title="diaTitle"
      :visible.sync="isCheckDialogShow"
      :append-to-body="true"
      width="50%"
      center>
      <div class="rate-dialog-wrapper">
        <el-form ref="form" :model="checkInfo" label-width="80px">
          <el-form-item label="审核结果">
            <el-radio-group v-model="checkInfo.check" >
              <el-radio label="审核通过"></el-radio>
              <el-radio label="审核不通过"></el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="审核意见">
            <el-input type="textarea" v-model="checkInfo.extrac"></el-input>
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="isDialogShow = false">取 消</el-button>
        <el-button type="primary" @click='check()'>审 核</el-button>
      </span>
    </el-dialog>

    <!-- 双击弹框 -->
    <el-dialog :append-to-body="true" width="55%" title="保险公司" :visible.sync="dialogTableVisibleCode" center>
      <el-table ref="multipleTable" @row-click="handleRowChange" :data="insComData" tooltip-effect="dark" style="width: 100%">
        <el-table-column prop="insurercode" label="保险公司代码" show-overflow-tooltip>
        </el-table-column>
        <el-table-column prop="insurername" label="保险公司名称" show-overflow-tooltip>
        </el-table-column>
      </el-table>
      <el-pagination
          @current-change="handleDiaCurrentChange"
          :current-page="diaPage.currentPage"
          @size-change="handleDbSizeChange"
          :page-size="diaPage.size"
          :page-sizes="[10, 20, 50]"
          layout="total, sizes, prev, pager, next, jumper"
          :total="dbtotalRecords ? dbtotalRecords : diaPage.total">
        </el-pagination>
      <span slot="footer" class="dialog-footer">
        <!-- <el-button @click="dialogTableVisibleCode = false">取 消</el-button>
        <el-button type="primary" @click="dbSubmit">确 定</el-button> -->
      </span>
    </el-dialog>

    <el-dialog :append-to-body="true" width="55%" title="险种" :visible.sync="dialogTableVisibleCode1" center>
      <el-table ref="multipleTable" @row-click="handleRiskRowChange" :data="riskData" tooltip-effect="dark" style="width: 100%">
        <el-table-column width="140" prop="riskcode" label="险种代码" show-overflow-tooltip>
        </el-table-column>
        <el-table-column prop="riskname" label="险种名称" show-overflow-tooltip>
        </el-table-column>
      </el-table>
      <el-pagination
          @current-change="handleRiskDiaCurrentChange"
          :current-page="diaPage1.currentPage"
           @size-change="handleDbRiskSizeChange"
          :page-size="diaPage1.size"
          :page-sizes="[10, 20, 50]"
          layout="total, sizes, prev, pager, next, jumper"
          :total="dbtotalRecords ? dbtotalRecords : diaPage1.total">
        </el-pagination>
      <span slot="footer" class="dialog-footer">
        <!-- <el-button @click="dialogTableVisibleCode1 = false">取 消</el-button>
        <el-button type="primary" @click="dbRiskSubmit">确 定</el-button> -->
      </span>
    </el-dialog>
  </div>
</template>

<script>
import NoticeBar from '@/components/notice-bar'
import LineTittle from '@/components/line-tittle'
import LabelText from '@/components/label-text'
import RateUpload from '@/pages/rate_mgr/rateUpload'
import { getUserId } from '@/utils/cookie'
import { mapActions } from 'vuex'
export default {
  name: '',
  data () {
    return {
      info: {
        insurerCode: '',
        insurerName: '',
        riskCode: '',
        riskName: '',
        period: ''
      },
      loading: '',
      diaTitle: '',
      list: [],
      fileList: [],
      tableData: [],
      isTableShow: false,
      isDialogShow: false,
      isCheckDialogShow: false,
      dialogTableVisibleCode: false,
      dialogTableVisibleCode1: false,
      dbselected: {},
      tablePage: {
        currentPage: 1,
        total: 0,
        size: 10
      },
      diaPage: {
        currentPage: 1,
        total: 0,
        size: 10
      },
      diaPage1: {
        currentPage: 1,
        total: 0,
        size: 10
      },
      checkInfo: {
      },
      option: '',
      optionObj: {
        insurerCode: 'insurerCode',
        insurerName: 'insurerName',
        riskCode: 'riskCode',
        riskName: 'riskName'
      },
      num: 0,
      selectData: {},
      expData: {},
      queryrules: {
        // insurerCode: [
        //   { required: true, message: '请输入保险公司代码', trigger: 'blur' }
        // ],
        // insurerName: [
        //   { required: true, message: '请输入保险公司名称', trigger: 'blur' }
        // ]
      },
      limt: {
        import: false,
        query: false,
        review: false
      }
    }
  },
  mounted () {
    this.getBtnLimt()
  },
  methods: {
    getBtnLimt () { // 按钮权限
      let userId = getUserId()
      if (userId === null || userId === undefined) {
        userId = ''
      }
      let post = {
        'userId': userId,
        'page': '总公司寿险折标系数管理'
      }
      this.getBtnLimt_rate(post).then(resp => {
        if (resp.code === '000000') {
          resp.data.forEach((item, index) => {
            this.limt[item.code] = item.checked
          })
        }
      })
    },
    handleQuery () {
      this.tablePage.currentPage = 1
      this.tablePage.size = 10
      this.getHandleQuery()
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
    getHandleQuery () {
      this.$refs['queryForm'].validate((valid) => {
        if (valid) {
          this.info.insurerCode = this.info.insurerCode ? this.info.insurerCode : ''
          this.info.riskCode = this.info.riskCode ? this.info.riskCode : ''
          this.info.period = this.info.period ? this.info.period : ''
          this.info.currentPage = this.tablePage.currentPage
          this.info.pageSize = this.tablePage.size
          this.Loading()
          this.queryLifeRate(this.info).then(resp => {
            this.closeLoading()
            if (resp.data.code === '000000') {
              if (resp.data.data.content) {
                this.isTableShow = true
                this.tableData = resp.data.data.content
                this.tablePage.total = resp.data.data.totalElements
              }
            }
          })
        } else {
          // console.log('error submit!!')
          return false
        }
      })
    },
    dbqueryCom () {
      this.dialogTableVisibleCode = true
      this.diaPage.currentPage = 1
      this.diaPage.size = 10
      this.getdbqueryCom()
    },
    getdbqueryCom () {
      let jsonObj = Object.assign({}, this.info)
      jsonObj.currentPage = this.diaPage.currentPage
      jsonObj.pageSize = this.diaPage.size
      jsonObj.type = 2
      jsonObj.clickType = 2
      this.getRateInsuranceCom(jsonObj)
    },
    dbqueryRisk () {
      if (this.info.insurerCode) {
        this.dialogTableVisibleCode1 = true
        this.diaPage1.currentPage = 1
        this.diaPage1.size = 10
        this.diaPage1.clickType = 2
        this.getdbqueryRisk()
      } else {
        this.$message({
          showClose: true,
          message: '请先选择一个保险公司',
          type: 'error'
        })
      }
    },
    getdbqueryRisk () {
      let jsonObj = Object.assign({}, this.info)
      jsonObj.currentPage = this.diaPage1.currentPage
      jsonObj.pageSize = this.diaPage1.size
      jsonObj.clickType = this.diaPage1.clickType
      this.getRateRisk(jsonObj)
    },
    dbSubmit () {
      this.info.insurerCode = this.dbselected.insurerCode
      this.info.insurerName = this.dbselected.insurerName
      this.dialogTableVisibleCode = false
    },
    dbRiskSubmit () {
      this.info.riskCode = this.dbselected.riskCode
      this.info.riskName = this.dbselected.riskName
      this.dialogTableVisibleCode1 = false
    },
    handleRowChange (row, event, column) {
      this.dbselected.insurerCode = row.insurercode
      this.dbselected.insurerName = row.insurername
      this.dbSubmit()
    },
    handleRiskRowChange (row, event, column) {
      this.dbselected.riskCode = row.riskcode
      this.dbselected.riskName = row.riskname
      this.dbRiskSubmit()
    },
    handleDbSizeChange (val) {
      this.diaPage.size = val
      this.diaPage.currentPage = 1
      this.getdbqueryCom()
    },
    handleDbRiskSizeChange (val) {
      this.diaPage1.size = val
      this.diaPage1.currentPage = 1
      this.getdbqueryRisk()
    },
    ...mapActions([
      'queryLifeRate',
      'exportRate',
      'getRateRisk',
      'getRateInsuranceCom',
      'getBtnLimt_rate'
    ]),
    handleCurrentChange (val) {
      this.tablePage.currentPage = val
      this.info.currentPage = this.tablePage.currentPage
      this.getHandleQuery()
    },
    handleDiaCurrentChange (val) {
      this.diaPage.currentPage = val
      this.getdbqueryCom()
    },
    handleRiskDiaCurrentChange (val) {
      this.diaPage1.currentPage = val
      this.getdbqueryRisk()
    },
    syncData (index, id, name) {
      this.num = index
      this.selectUser.id = id
      this.selectUser.name = name
    },
    dbqueryData (data, op) {
      this.option = op
      let paramJson = {}
      paramJson.insurerCode = this.info.insurerCode
      paramJson.insurerName = this.info.insurerName
      paramJson.currentPage = this.dialogPage.currentPage
      if (this.option === 'insurerCode') {
        this.getRateInsuranceCom(this.info).then(resp => {
          this.list = resp.data
          this.dialogPage.total = resp.totalRecords
        })
        this.diaTitle = '保险公司列表'
      } else if (this.option === 'insurerName') {
        this.getRateInsuranceCom(this.info)
        this.diaTitle = '保险公司列表'
      } else if (this.option === 'riskCode' || this.option === 'riskName') {
        if (this.info.insurerCode) {
          this.getRiskcodes(paramJson)
        } else {
          this.$message({
            showClose: true,
            message: '请先选择一个保险公司',
            type: 'error'
          })
        }
        this.diaTitle = '险种列表'
      }
      this.isDialogShow = true
    },
    submit () {
      if (this.option === 'insurerCode') {
        this.info.insurerCode = this.selectData.id
        this.info.userName = this.selectData.name
        this.isDialogShow = false
      } else if (this.option === 'insurerName') {
        this.info.insurerCode = this.selectData.id
        this.info.userName = this.selectData.name
        this.isDialogShow = false
      } else if (this.option === 'riskCode') {
        this.info.riskCode = this.selectData.id
        this.info.riskName = this.selectData.name
        this.isDialogShow = false
      } else if (this.option === 'riskName') {
        this.info.riskCode = this.selectData.id
        this.info.riskName = this.selectData.name
        this.isDialogShow = false
      }
    },
    exp () {
      this.expData.insurerCode = this.info.insurerCode ? this.info.insurerCode : ''
      this.expData.riskCode = this.info.riskCode ? this.info.riskCode : ''
      this.expData.period = this.info.period ? this.info.period : ''
      window.open('/tabycore/rate/exportExcel?insurerCode=' + this.expData.insurerCode + '&riskCode=' + this.expData.riskCode + '&period=' + this.expData.period)
    },
    toCheck () {
      this.$router.push({ path: '/rate/rateCheck' })
    },
    handleSizeChange (val) {
      this.tablePage.size = val
      this.tablePage.currentPage = 1
      this.getHandleQuery()
    }
  },
  components: {
    [NoticeBar.name]: NoticeBar,
    [LineTittle.name]: LineTittle,
    [LabelText.name]: LabelText,
    [RateUpload.name]: RateUpload
  },
  created () {
  },
  watch: {
    'info.insurerCode' () {
      if (this.info.insurerCode === '') {
        this.info.insurerName = ''
      }
    },
    'info.insurerName' () {
      if (this.info.insurerName === '') {
        this.info.insurerCode = ''
      }
    },
    'info.riskCode' () {
      if (this.info.riskCode === '') {
        this.info.riskName = ''
      }
    },
    'info.riskName' () {
      if (this.info.riskName === '') {
        this.info.riskCode = ''
      }
    }
  },
  computed: {
    resultNum () {
      return this.num
    },
    insComData () {
      return this.$store.state.rateMgr.insComData
    },
    riskData () {
      return this.$store.state.rateMgr.riskData
    },
    dbtotalRecords () {
      return parseInt(this.$store.state.rateMgr.dbtotalRecords)
    }
  }
}
</script>

<style lang="scss" scoped type="text/css">
#rate-index {
  padding-left: 30px;
  padding-right: 30px;
}
.rate-wrapper {
  width: 300px;
  margin: 20px auto;
}
.btn-container{
  text-align: center;
  margin-top: 60px;
  margin-bottom: 30px;
}
.ri-line{
  margin-top: 10px;
  margin-bottom: 10px;
}
</style>
