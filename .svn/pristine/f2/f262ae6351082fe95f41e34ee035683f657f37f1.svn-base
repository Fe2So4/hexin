<template>
  <div class="wrap">
    <ui-notice-bar slot="breadcast" >
      <el-breadcrumb slot="location" separator=">">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>协议费率管理</el-breadcrumb-item>
        <el-breadcrumb-item>合作经代公司寿险对账单管理</el-breadcrumb-item>
        <el-breadcrumb-item>合作经代公司手续费率导入</el-breadcrumb-item>
      </el-breadcrumb>
    </ui-notice-bar>
    <el-form class="verify-content" :model="info" >
      <el-row class="ri-line" v-for="(item, index) in queryList" :key="index">
        <el-col :span="12" v-for="i in item" :key="i.id">
          <el-form-item :prop="i.midel">
            <ui-label-text labelWidth="200" :label="i.label+':'" >
              <el-input
              v-model="info[i.model]"
              slot="text"
              placeholder="双击可选择"
              clearable
              :data-arr="i.arrId"
              @clear="onClearInput(i.arrId)"
              @dblclick.native="dbqueryCom"
              @blur="onBlurVerify(i.arrId)"></el-input>
            </ui-label-text>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <div class="btn">
      <el-button type="primary" @click="onquery">查询</el-button>
      <el-button type="primary" @click="onserviceExport">手续费率导入</el-button>
      <el-button type="primary" @click="onexcelExport">导出</el-button>
    </div>
    <!-- table -->
    <div class="table" v-show="isTableShow">
      <el-table
        :data="tableData"
        ref="multipleTable"
        highlight-current-row
        @selection-change="handleSelectionChange"
        style="width: 100%">
        <el-table-column
          type="selection"
          width="55">
        </el-table-column>
        <el-table-column
          v-for="(item, index) in tabelColumList"
          :key="index"
          :prop="item.prop"
          :label="item.label"
          width="180">
        </el-table-column>
      </el-table>
      <div v-show="info.total!=0">
        <el-pagination
          @current-change="handleDiaCurrentChange"
          @size-change="handleSizeChange"
          :current-page="info.currentPage"
          :page-size="info.size"
          :page-sizes="info.sizes"
          layout="total, sizes, prev, pager, next, jumper"
          :total="info.total">
        </el-pagination>
        <div class="btn dis-top">
          <el-button type="primary" @click="toggleSelection(tableData)">全选</el-button>
          <el-button type="primary" @click="onBatchDelete">批量删除</el-button>
        </div>
      </div>
    </div>
    <el-dialog append-to-body center :title="dialogTitle.title"
      :visible.sync="dialogVisible" width="60%">
      <!-- upload -dailog-->
      <div class="upload-content" v-show="dialogSelect">
        <el-upload
          class="upload-content" ref="excelUpload"
          action="/tabycore/baseCooagencyCompany/procedureRatesImport"
          :before-remove="beforeRemove"
          :limit="1"
          :on-exceed="handleExceed"
          :on-success="handleEXLSuccess"
          :file-list="fileList"
          center>
          <el-button size="small" type="primary">选择文件</el-button>
          <div slot="tip" class="red-color">
            <p>* 请您耐心等待，导入结果将会以excel的形式进行显示！<a class="download" @click="ondownloadDemo">(模板下载)</a>
            </p>
          </div>
        </el-upload>
      </div>
      <!-- db-select-dialog -->
      <div class="btn" v-show="!dialogSelect">
        <el-table
          :data="dbTableData"
          highlight-current-row
          @row-click="onselectTabelRow"
          style="width: 100%">
          <el-table-column
            v-for="(item, index) in dbSelect"
            :key="index"
            :prop="item.prop"
            :label="item.label">
          </el-table-column>
        </el-table>
        <el-pagination
          v-show="this.dbPage.total!=0"
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
  </div>
</template>

<script>
import NoticeBar from '@/components/notice-bar'
import LabelText from '@/components/label-text'
import api from '@/api/agreeRate_mgr/util/zxcrequest'
// import FileSaver from 'file-saver'
export default {
  components: {
    [NoticeBar.name]: NoticeBar,
    [LabelText.name]: LabelText
  },
  data () {
    return {
      // from
      info: {
        cooperationCode: '',
        cooperationName: '',
        cooperationComCode: '',
        cooperationComName: '',
        comCode: '',
        comName: '',
        currentPage: 1,
        total: 0,
        size: 5,
        sizes: [5, 10, 20, 50]
      },
      queryList: [
        [{label: '合作经代公司代码', model: 'cooperationCode', prop: 'companyCode', arrId: '1'}, {label: '合作经代公司名称', model: 'cooperationName', prop: 'companyName', arrId: '11'}],
        [],
        // [{label: '合作经代公司机构代码', model: 'cooperationComCode', prop: 'orgCode', arrId: '2'}, {label: '合作经代公司机构名称', model: 'cooperationComName', prop: 'orgName', arrId: '22'}],
        [{label: '佰盈机构代码', model: 'comCode', prop: 'comCode', arrId: '3'}, {label: '佰盈机构名称', model: 'comName', prop: 'comCName', arrId: '33'}]
      ],
      // table
      tableData: [],
      tabelColumList: [
        {label: '协议代码', prop: 'agreementNumber'},
        {label: '合作经代公司代码', prop: 'cooperationCode'},
        {label: '合作经代公司名称', prop: 'cooperationName'},
        // {label: '合作经代公司机构代码', prop: 'cooperationComCode'},
        // {label: '合作经代公司机构名称', prop: 'cooperationComName'},
        {label: '佰盈机构代码', prop: 'comCode'},
        {label: '佰盈机构名称', prop: 'comName'},
        {label: '险种代码', prop: 'riskCode'},
        {label: '险种名称', prop: 'riskName'},
        {label: '费用类别', prop: 'expenseCategory'},
        {label: '费率是否与继续率/标准保费有关', prop: 'continuationRate'},
        {label: '适用范围起', prop: 'suitableRangStart'},
        {label: '适用范围止', prop: 'suitableRangEnd'},
        {label: '缴费年期起', prop: 'paymentperiod'},
        {label: '缴费年期止', prop: 'paymentperiodTop'},
        {label: '保单年度起', prop: 'yearStart'},
        {label: '保单年度止', prop: 'yearEnd'},
        {label: '费率(%)', prop: 'rate'},
        {label: '操作日期', prop: 'updateTime'}
      ],
      isTableShow: false,
      multipleSelection: [],
      // dialog
      dbTableData: [],
      dbPage: {
        currentPage: 1,
        total: 0,
        size: 5,
        sizes: [5, 10, 20, 50]
      },
      dbSelect: [],
      dialogVisible: false,
      fileList: [],
      dialogSelect: false,
      dialogTitle: { title: '佰盈机构' },
      dbArrId: ''
    }
  },
  methods: {
    getProcedureRatesQuery () {
      api('/baseCooagencyCompany/procedureRatesQuery', 'post', this.info).then(r => {
        this.isTableShow = true
        this.tableData = r.data.data.content
        this.info.total = r.data.data.totalElements
      })
    },
    getProcedureRatesBatchDelete (info) {
      api('/baseCooagencyCompany/procedureRatesBatchDelete', 'post', info).then(r => {
        if (r.data.code === '000000') {
          this.$message({
            showClose: true,
            message: '删除成功!',
            type: 'success'
          })
          this.getProcedureRatesQuery()
        } else {
          this.$message({
            showClose: true,
            message: r.data.msg,
            type: 'error'
          })
        }
      })
    },
    showDialog () { // 显示数据弹窗
      this.dialogVisible = true
      this.dialogSelect = false
    },
     // 佰盈
    getAllCom (obj, clickType = 2) {
      this.dialogTitle.title = '佰盈机构'
      let CodeOrName = obj.comCode
      if (obj.comCode === '' && obj.comName !== '') {
        CodeOrName = obj.comName
      }
      api('/baseCompany/getAllCom', 'post', {
        comCodeOrName: CodeOrName,
        clickType,
        currentPage: this.dbPage.currentPage,
        pageSize: this.dbPage.size
      }).then(r => {
        if (r.data.code === '000000') {
          if (clickType === 2) {
            this.showDialog()
            this.dbTableData = r.data.data.data
            this.dbPage.total = r.data.data.totalRecords
          } else {
            let model0 = this.dbSelect[0].model
            let model1 = this.dbSelect[1].model
            this.info[model0] = r.data.data.data[0][model0]
            this.info[model1] = r.data.data.data[0][model1]
          }
        } else {
          if (clickType === 1 || clickType === 2) {
            if (this.dialogVisible === false) {
              this.$message({
                message: r.data.msg,
                type: 'error'
              })
            }
          } else {
            this.info.comCode = ''
            this.info.comName = ''
            this.$message({
              message: '无次查询',
              type: 'error'
            })
          }
        }
      })
    },
      // 公司代码
    getFindByCodeOrName (obj, clickType = 2) {
      this.dialogTitle.title = '合作经代公司'
      let CodeOrName = obj.cooperationCode
      if (obj.cooperationCode === '' && obj.cooperationCode !== '') {
        CodeOrName = obj.cooperationName
      }
      api('/baseCooagencyCompany/findByCodeOrName2', 'post', {
        companyCodeOrName: CodeOrName,
        clickType,
        current: this.dbPage.currentPage,
        pageSize: this.dbPage.size
      }).then(r => {
        if (r.data.code === '000000') {
          if (clickType === 2) {
            this.showDialog()
            this.dbTableData = r.data.data.data
            this.dbPage.total = r.data.data.totalRecords
          } else {
            let model0 = this.dbSelect[0].model
            let model1 = this.dbSelect[1].model
            this.info[model0] = r.data.data.data[0][model0]
            this.info[model1] = r.data.data.data[0][model1]
          }
        } else {
          if (clickType === 1 || clickType === 2) {
            if (this.dialogVisible === false) {
              this.$message({
                message: r.data.msg,
                type: 'error'
              })
            }
          } else {
            this.info.cooperationCode = ''
            this.info.cooperationName = ''
            this.$message({
              message: '无次查询',
              type: 'error'
            })
          }
        }
      })
    },
    // 公司机构代码
    getFindByOrgCodeOrName (obj, clickType = 2) {
      this.dialogTitle.title = '合作经代公司机构'
      let CodeOrName = obj.cooperationComCode
      if (obj.cooperationComCode === '' && obj.cooperationComName !== '') {
        CodeOrName = obj.cooperationComName
      }
      api('/baseCooagencyOrganization/findByOrgCodeOrName', 'post', {
        orgCodeOrName: CodeOrName,
        clickType,
        companyCode: this.info.cooperationCode,
        current: this.dbPage.currentPage,
        pageSize: this.dbPage.size
      }).then(r => {
        if (r.data.code === '000000') {
          if (clickType === 2) {
            this.showDialog()
            this.dbTableData = r.data.data.data
            this.dbPage.total = r.data.data.totalRecords
          } else {
            let model0 = this.dbSelect[0].model
            let model1 = this.dbSelect[1].model
            this.info[model0] = r.data.data.data[0][model0]
            this.info[model1] = r.data.data.data[0][model1]
          }
        } else {
          if (clickType === 1 || clickType === 2) {
            if (this.dialogVisible === false) {
              this.$message({
                message: r.data.msg,
                type: 'error'
              })
            }
          } else {
            this.info.cooperationComCode = ''
            this.info.cooperationComName = ''
            this.$message({
              message: '无次查询',
              type: 'error'
            })
          }
        }
      })
    },
    onquery () {
      this.handleDiaCurrentChange(1)
    },
    ondownloadDemo () {
      window.open('/tabycore/baseCooagencyCompany/downloadModel')
    },
    onserviceExport () {
      this.dialogTitle.title = '合作经代公司手续费率导入'
      this.dialogVisible = true
      this.dialogSelect = true
      this.$nextTick(() => {
        this.$refs.excelUpload.clearFiles()
      })
    },
    onexcelExport () {
      api('/baseCooagencyCompany/procedureRatesExport', 'get', {
        cooperationCode: this.info.cooperationCode,
        cooperationName: this.info.cooperationName,
        cooperationComCode: '',
        cooperationComName: '',
        comCode: this.info.comCode,
        comName: this.info.comName
      }).then(res => {
        window.open(`/tabycore/baseCooagencyCompany/procedureRatesExport?cooperationCode=${this.info.cooperationCode}&cooperationName=${this.info.cooperationName}&cooperationComCode=${this.info.cooperationComCode}&cooperationComName=${this.info.cooperationComName}&comCode=${this.info.comCode}&comName=${this.info.comName}`)
      })
    },
    dbqueryCom (e) {
      this.dbPage.currentPage = 1
      this.dbPage.siza = 5
      this.dbPage.total = 0
      this.dbTableData = []
      let arrId = e.target.dataset.arr.substr(0, 1)
      this.dbArrId = arrId
      let companyCode = this.info.cooperationCode
      console.log(arrId)
      this.dbSelect = this.queryList[arrId - 1]
      if (arrId === '1') {
        this.getFindByCodeOrName(this.info)
      } else if (arrId === '2' && companyCode !== '') {
        this.getFindByOrgCodeOrName(this.info)
      } else if (arrId === '3') {
        this.getAllCom(this.info)
      } else {
        this.$message({
          message: '请选择合作经代公司代码',
          type: 'warning'
        })
      }
    },
    onBlurVerify (e) {
      if (this.dialogVisible === false) { // 模糊查询 限制失焦事件
        let arrId = e.substr(0, 1)
        let companyCode = this.info.cooperationCode
        this.dbSelect = this.queryList[arrId - 1]
        if (this.dialogVisible === false) {
          if (arrId === '3') {
            if (this.info.comCode !== '' || this.info.comName !== '') {
              this.getAllCom(this.info, 1)
            }
          } else if (arrId === '1') {
            if (companyCode !== '' || this.info.cooperationName !== '') {
              this.getFindByCodeOrName(this.info, 1)
            }
          } else if (arrId === '2') {
            if (this.info.cooperationComCode !== '' || this.info.cooperationComName !== '') {
              if (companyCode === '') {
                this.$message({
                  message: '请选择合作经代公司代码',
                  type: 'warning'
                })
                this.info.cooperationComCode = ''
                this.info.cooperationComName = ''
              } else {
                this.getFindByOrgCodeOrName(this.info, 1)
              }
            }
          }
        }
      }
    },
    // 双向清除
    onClearInput (e) {
      let arrId = e.substr(0, 1)
      this.dbSelect = this.queryList[arrId - 1]
      let model0 = this.dbSelect[0].model
      let model1 = this.dbSelect[1].model
      this.info[model0] = ''
      this.info[model1] = ''
    },
    handleDiaCurrentChange (val) {
      this.info.currentPage = val
      this.getProcedureRatesQuery()
    },
    handleSizeChange (val) {
      this.info.pageSize = val
      this.getProcedureRatesQuery()
    },
    handleDiaCurrentChangeDb (val) {
      this.dbPage.currentPage = val
      let arrId = this.dbArrId
      if (arrId === '1') {
        this.getFindByCodeOrName(this.info)
      } else if (arrId === '2') {
        this.getFindByOrgCodeOrName(this.info)
      } else {
        this.getAllCom(this.info)
      }
    },
    handleSizeChangeDb (val) {
      this.dbPage.size = val
      let arrId = this.dbArrId
      if (arrId === '1') {
        this.getFindByCodeOrName(this.info)
      } else if (arrId === '2') {
        this.getFindByOrgCodeOrName(this.info)
      } else {
        this.getAllCom(this.info)
      }
    },
    onexport () {
      this.$confirm('此过程可能比较缓慢，导出过程中请勿关闭浏览器, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$message({
          type: 'success',
          message: `即将下载合作经代公司手续费率`
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消下载'
        })
      })
    },
    handleExceed (files, fileList) {
      this.$message.warning(`当前限制选择 1 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`)
    },
    beforeRemove (file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`)
    },
    onselectTabelRow (row) {
      let before = this.dbSelect[0].model
      let later = this.dbSelect[1].model
      this.info[before] = row[this.dbSelect[0].prop]
      this.info[later] = row[this.dbSelect[1].prop]
      this.dialogVisible = false
    },
    handleEXLSuccess (response, file, fileList) {
      console.log(response)
      if (response.code === '000000') {
        this.$message({
          showClose: true,
          message: response.msg,
          type: 'success'
        })
        setTimeout(() => {
          this.dialogVisible = false
        }, 1000)
      } else {
        this.$message({
          showClose: true,
          message: response.msg,
          type: 'error'
        })
      }
    },
    toggleSelection (rows) {
      rows.forEach(row => {
        this.$refs.multipleTable.toggleRowSelection(row)
      })
    },
    onBatchDelete (response) {
      let deleteArr = []
      let deleteObj = {}
      this.multipleSelection.forEach(item => {
        deleteArr = deleteArr.concat(item.id)
      })
      deleteObj.ids = deleteArr
      this.getProcedureRatesBatchDelete(deleteObj)
    },
    handleSelectionChange (val) {
      this.multipleSelection = val
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
