<template>
  <div id="lifeInsListImp" >
    <ui-notice-bar slot="breadcast" >
      <el-breadcrumb slot="location" separator=">">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>寿险业务报表管理</el-breadcrumb-item>
        <el-breadcrumb-item>综拓清单报表</el-breadcrumb-item>
      </el-breadcrumb>
    </ui-notice-bar>
    <div class="ri-content" slot="content">
    <el-form ref="queryInfo" :rules="rules1" :model="queryInfo">
      <el-row class="ri-line">
        <el-col :span="12">
          <el-form-item prop='comCode'>
            <ui-label-text labelWidth="150" label="省级分公司名称:" >
              <el-input v-model="queryInfo.comCode" clearable slot="text" @dblclick.native="openComDialog(1)" placeholder="双击可选择" @blur='opensingleComDialog(1)' @change="clearDiji"></el-input>
            </ui-label-text>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item prop='orgCode'>
            <ui-label-text labelWidth="150" label="地市级分公司名称:" >
              <el-input v-model="queryInfo.orgCode" clearable slot="text" @dblclick.native="openComDialog(2)" placeholder="双击可选择" @blur='opensingleComDialog(2)'></el-input>
            </ui-label-text>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row class="ri-line">
        <el-col :span="12">
          <el-form-item prop='enddates'>
            <ui-label-text labelWidth="150" label="保险终止月份：" :required="true">
              <el-date-picker
                  v-model="queryInfo.enddates"
                  value-format="MM"
                  format="MM"
                  @click.native="noYearPick"
                  @blur="haveYearPick"
                  type="month"
                  slot="text"
                >
              </el-date-picker>
            </ui-label-text>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item prop='enddatee'>
            <ui-label-text labelWidth="150" label="至：">
              <el-date-picker
                  v-model="queryInfo.enddatee"
                  value-format="MM"
                  format="MM"
                  @click.native="noYearPick"
                  @blur.native="haveYearPick"
                  type="month"
                  slot="text"
                >
              </el-date-picker>
            </ui-label-text>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row class="ri-line">
        <el-col :span="12">
          <el-form-item prop='startDate'>
            <ui-label-text labelWidth="150" label="导入日期：">
              <el-date-picker
                  v-model="queryInfo.startDate"
                  value-format="yyyy-MM-dd"
                  type="date"
                  slot="text"
                >
              </el-date-picker>
            </ui-label-text>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item prop='endDate'>
            <ui-label-text labelWidth="150" label="至：">
              <el-date-picker
                  v-model="queryInfo.endDate"
                  value-format="yyyy-MM-dd"
                  type="date"
                  slot="text"
                >
              </el-date-picker>
            </ui-label-text>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row class="ri-line">
        <el-col :span="12">
          <el-form-item prop='listtype'>
            <ui-label-text labelWidth="150" label="名单类型:" :required="true">
              <el-input v-model="queryInfo.listtype" clearable slot="text" @dblclick.native="openComDialog(3)" placeholder="双击可选择" @blur='opensingleComDialog(3)'></el-input>
            </ui-label-text>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    </div>
    <div class="btn-container">
      <el-button type="primary" @click="submitForm('queryInfo',0)" v-if="!quanxian.query">查询</el-button>
      <el-button type="primary" @click="upload"  v-if="!quanxian.import">上传</el-button>
      <el-button type="primary" @click="submitForm('queryInfo',1)" v-if="!quanxian.export">导出</el-button>
    </div>
    <div v-show="isTableShow">
      <el-table stripe :data="tableData" style="width: 100%">
        <el-table-column prop="listtype" label="名单类型" width="140"></el-table-column>
        <el-table-column prop="name" label="客户姓名" width="140"></el-table-column>
        <el-table-column prop="idtype" label="证件类型" width="140" ></el-table-column>
        <el-table-column prop="idno" label="证件号码" width="140" ></el-table-column>
        <el-table-column prop="phone1" label="移动电话1" width="140" ></el-table-column>
        <el-table-column prop="phone2" label="联系电话2" width="140"></el-table-column>
        <el-table-column prop="address" label="联系地址" width="140" ></el-table-column>
        <el-table-column prop="comcname" label="机构代码" width="140" ></el-table-column>
        <el-table-column prop="carname" label="车主姓名" width="140" ></el-table-column>
        <el-table-column prop="carno" label="车牌号" width="140" ></el-table-column>
        <el-table-column prop="carframe" label="车架号" width="140" ></el-table-column>
        <el-table-column prop="engineno" label="发动机号" width="140" ></el-table-column>
        <el-table-column prop="label" label="厂牌型号" width="140" ></el-table-column>
        <el-table-column prop="registerdate" label="初次登记日期" width="140" ></el-table-column>
        <el-table-column prop="enddate" label="保险终止日期" width="140" ></el-table-column>
        <el-table-column prop="secom" label="二级机构" width="140" ></el-table-column>
        <el-table-column prop="thcom" label="三级机构" width="140" ></el-table-column>
      </el-table>
      <div class="block">
        <el-pagination
          @current-change="handleCurrentChange"
          @size-change="handleSizeChange"
          :current-page="queryInfo.currentPage"
          :page-size ="queryInfo.pageSize"
          :page-sizes="[10,20,50]"
          :total="totalRecords"
          layout="total, sizes, prev, pager, next, jumper"
          >
        </el-pagination>
      </div>
    </div>
    <ComDialog :vis='comDialog1' :workerVis='comDialogworker1' :comVis='comDialogCom1' :newTableData='tempTableData1' @onClose='comDialogClosing(1)' @selectDialog='dialogBackData1' @comdialogChangePageFunction='changeComdialogPage1' @comdialogChangePageSizeFunction='changeComdialogPageSize1' :fenyetotal='fenyetotalData'/>
    <ComDialog :vis='comDialog2' :workerVis='comDialogworker2' :comVis='comDialogCom2' :newTableData='tempTableData2' @onClose='comDialogClosing(2)' @selectDialog='dialogBackData2' @comdialogChangePageFunction='changeComdialogPage2' @comdialogChangePageSizeFunction='changeComdialogPageSize2' :fenyetotal='fenyetotalData'/>
    <ComDialog :vis='comDialog3' :workerVis='comDialogworker3' :comVis='comDialogCom3' :newTableData='tempTableData3' @onClose='comDialogClosing(3)' @selectDialog='dialogBackData3' @comdialogChangePageFunction='changeComdialogPage3' @comdialogChangePageSizeFunction='changeComdialogPageSize3' :fenyetotal='fenyetotalData'/>
    <el-dialog append-to-body center title="报表上传"
      :visible.sync="uploadVis" width="60%">
      <div class="upload-content">
        <el-upload
          class="upload-content" ref="excelUpload"
          action="/tabycore/ZongtRepoListReport/fileUpload"
          :limit="1"
          :on-success="handleEXLSuccess"
          :file-list="fileList"
          :before-upload="Loading"
          center>
          <el-button type="primary">点击选择</el-button>
          <!-- <div slot="tip" class="red-color">
            <p>* 请您耐心等待，导入结果将会以excel的形式进行显示！<a class="download" @click="ondownloadDemo">(模板下载)</a>
            </p>
          </div> -->
        </el-upload>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import NoticeBar from '@/components/notice-bar'
import LineTittle from '@/components/line-tittle'
import LabelText from '@/components/label-text'
import { mapActions } from 'vuex'
import IsEmpty from '@/utils/IsEmpty'
import {
  api
} from '@/api/lifeInsur_mgr/quitListMgr.js'
import ComDialog from '@/components/comDialog1'
export default {
  name: '',
  data () {
    return {
      oriDate: [],
      isTableShow: false,
      tableData: [],
      totalRecords: 0, // 分页总条数
      fileList: [],
      queryInfo: {
        comCode: '',
        orgCode: '',
        enddates: '',
        enddatee: '',
        startDate: '',
        endDate: '',
        listtype: '全部',
        currentPage: 1,
        pageSize: 10
      },
      companyQueryInfo: {
        clickType: '2',
        comCode: '',
        currentPage: 1,
        pageSize: 10
      },
      orgQueryInfo: {
        clickType: '2',
        orgCode: '',
        comCode: '',
        currentPage: 1,
        pageSize: 10
      },
      listQueryInfo: {
        clickType: '2',
        listtype: '',
        currentPage: 1,
        pageSize: 10
      },
      comDialog3: false,
      comDialogCom3: false,
      comDialogworker3: false,
      comDialog1: false,
      comDialogCom1: false,
      comDialogworker1: false,
      comDialog2: false,
      comDialogCom2: false,
      comDialogworker2: false,
      tempTableData1: [],
      tempTableData2: [],
      tempTableData3: [],
      fenyetotalData: 0,
      quanxian: {
        query: true,
        import: true,
        export: true
      },
      rules1: {
        enddates: [
          { required: true, message: '请输入保险终止月份起期', trigger: 'change' }
        ],
        enddatee: [
          { required: true, message: '请输入保险终止月份止期', trigger: 'change' }
        ],
        listtype: [
          { required: true, message: '请输入名单类型', trigger: 'change' }
        ]
      },
      uploadVis: false
    }
  },
  mounted () {
    api(`/auth/findButtonByUserCodeAndPage?userId=${this.$store.state.login.loginUserId}&page=综拓清单报表`, 'get').then(result => {
      console.log(result)
      if (result.data.code === '000000') {
        for (let i = 0; i < result.data.data.length; i++) {
          this.quanxian[result.data.data[i].code] = false
        }
      }
    }).catch((e) => {
      console.log(e)
    })
  },
  methods: {
    submitForm (formName, index) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          console.log('submit!')
          switch (index) {
            case 0:
              this.query()
              break
            case 1:
              this.onexport()
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
    query () {
      this.queryInfo.currentPage = 1
      this.queryData()
    },
    queryData () {
      this.Loading()
      this.tableData = []
      this.isEmptyDate()
      api('/ZongtRepoListReport/queryZongtRepoListReport', 'post', this.queryInfo).then((res) => {
        console.log(res)
        this.closeLoading()
        if (res.data.code !== '000000' && !IsEmpty(res.data.code)) {
          this.openToast('warning', res.data.msg)
        } else {
          this.tableData = res.data.data.content
          this.isTableShow = true
          this.totalRecords = res.data.data.totalElements
        }
      })
    },
    isEmptyDate () {
      if (IsEmpty(this.queryInfo.startDate)) {
        this.queryInfo.startDate = ''
      }
      if (IsEmpty(this.queryInfo.endDate)) {
        this.queryInfo.endDate = ''
      }
      if (IsEmpty(this.queryInfo.enddates)) {
        this.queryInfo.enddates = ''
      }
      if (IsEmpty(this.queryInfo.enddatee)) {
        this.queryInfo.enddatee = ''
      }
    },
    upload () {
      this.uploadVis = true
      if (this.$refs.excelUpload) {
        this.$refs.excelUpload.clearFiles()
      }
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
    clearDiji () {
      this.queryInfo.orgCode = ''
    },
    openComDialog (index) {
      this.Loading()
      this.tempTableData1 = []
      this.tempTableData2 = []
      this.tempTableData3 = []
      switch (index) {
        case 1:
          this.companyQueryInfo.clickType = '2'
          this.companyQueryInfo.comCode = this.queryInfo.comCode
          api('/ZongtRepoListReport/getSecom', 'post', this.companyQueryInfo).then((res) => {
            console.log(res)
            this.closeLoading()
            if (res.data.code !== '000000' && !IsEmpty(res.data.code)) {
              this.openToast('warning', res.data.msg)
            } else {
              for (let i = 0; i < res.data.data.data.length; i++) {
                let temp = {}
                res.data.data.data[i] = res.data.data.data[i].replace(/天安佰盈保险销售有限公司/, '')
                temp.renderData = res.data.data.data[i]
                this.tempTableData1.push(temp)
              }
              this.fenyetotalData = res.data.data.totalRecords
              this.comDialog1 = true
              this.comDialogCom1 = true
              this.comDialogworker1 = false
            }
          })
          break
        case 2:
          this.orgQueryInfo.clickType = '2'
          this.orgQueryInfo.comCode = this.queryInfo.comCode
          this.orgQueryInfo.orgCode = this.queryInfo.orgCode
          api('/ZongtRepoListReport/getThcom', 'post', this.orgQueryInfo).then((res) => {
            console.log(res)
            this.closeLoading()
            if (res.data.code !== '000000' && !IsEmpty(res.data.code)) {
              this.openToast('warning', res.data.msg)
            } else {
              for (let i = 0; i < res.data.data.data.length; i++) {
                let temp = {}
                res.data.data.data[i] = res.data.data.data[i].replace(/天安佰盈保险销售有限公司/, '')
                temp.renderData = res.data.data.data[i]
                this.tempTableData2.push(temp)
              }
              this.fenyetotalData = res.data.data.totalRecords
              this.comDialog2 = true
              this.comDialogCom2 = true
              this.comDialogworker2 = false
            }
          })
          break
        case 3:
          this.listQueryInfo.clickType = '2'
          this.listQueryInfo.listtype = this.queryInfo.listtype
          api('/ZongtRepoListReport/getListtype', 'post', this.listQueryInfo).then((res) => {
            console.log(res)
            this.closeLoading()
            if (res.data.code !== '000000' && !IsEmpty(res.data.code)) {
              this.openToast('warning', res.data.msg)
            } else {
              for (let i = 0; i < res.data.data.data.length; i++) {
                let temp = {}
                res.data.data.data[i] = res.data.data.data[i].replace(/天安佰盈保险销售有限公司/, '')
                temp.renderData = res.data.data.data[i]
                this.tempTableData3.push(temp)
              }
              this.fenyetotalData = res.data.data.totalRecords
              this.comDialog3 = true
              this.comDialogCom3 = true
              this.comDialogworker3 = false
            }
          })
          break
        default:
          break
      }
    },
    opensingleComDialog (index) {
      if (!(this.comDialog1 || this.comDialog2 || this.comDialog3)) {
        switch (index) {
          case 1:
            if (!IsEmpty(this.queryInfo.comCode)) {
              this.companyQueryInfo.clickType = '1'
              this.companyQueryInfo.comCode = this.queryInfo.comCode
              api('/ZongtRepoListReport/getSecom', 'post', this.companyQueryInfo).then((res) => {
                console.log(res)
                if (res.data.code !== '000000' && !IsEmpty(res.data.code)) {
                  // this.openToast('warning', res.data.msg)
                } else {
                  this.queryInfo.comCode = res.data.data.data[0]
                }
              })
            }
            break
          case 2:
            if (!IsEmpty(this.queryInfo.orgCode)) {
              this.orgQueryInfo.clickType = '1'
              this.orgQueryInfo.comCode = this.queryInfo.comCode
              this.orgQueryInfo.orgCode = this.queryInfo.orgCode
              api('/ZongtRepoListReport/getThcom', 'post', this.orgQueryInfo).then((res) => {
                console.log(res)
                if (res.data.code !== '000000' && !IsEmpty(res.data.code)) {
                  // this.openToast('warning', res.data.msg)
                } else {
                  this.queryInfo.orgCode = res.data.data.data[0]
                }
              })
            }
            break
          case 3:
            if (!IsEmpty(this.queryInfo.listtype)) {
              this.listQueryInfo.clickType = '1'
              this.listQueryInfo.listtype = this.queryInfo.listtype
              api('/ZongtRepoListReport/getListtype', 'post', this.listQueryInfo).then((res) => {
                console.log(res)
                if (res.data.code !== '000000' && !IsEmpty(res.data.code)) {
                  // this.openToast('warning', res.data.msg)
                } else {
                  this.queryInfo.listtype = res.data.data.data[0]
                }
              })
            }
            break
          default:
            break
        }
      }
    },
    comDialogClosing (index) {
      this.initDialogData()
      this.tempTableData1 = []
      this.tempTableData2 = []
      this.tempTableData3 = []
      switch (index) {
        case 1:
          this.queryInfo.comCode = ''
          this.queryInfo.orgCode = ''
          this.comDialog1 = false
          break
        case 2:
          this.queryInfo.orgCode = ''
          this.comDialog2 = false
          break
        case 3:
          this.queryInfo.listtype = ''
          this.comDialog3 = false
          break
        default:
          break
      }
    },
    dialogBackData1 (data) {
      this.initDialogData()
      this.comDialog1 = false
      let temp = []
      temp = data.split('-')
      this.queryInfo.comCode = temp[0]
    },
    dialogBackData2 (data) {
      this.initDialogData()
      this.comDialog2 = false
      let temp = []
      temp = data.split('-')
      this.queryInfo.orgCode = temp[0]
    },
    dialogBackData3 (data) {
      this.initDialogData()
      this.comDialog3 = false
      let temp = []
      temp = data.split('-')
      this.queryInfo.listtype = temp[0]
    },
    changeComdialogPage1 (data) {
      this.companyQueryInfo.currentPage = data
      this.openComDialog(1)
    },
    changeComdialogPage2 (data) {
      this.orgQueryInfo.currentPage = data
      this.openComDialog(2)
    },
    changeComdialogPage3 (data) {
      this.listQueryInfo.currentPage = data
      this.openComDialog(3)
    },
    changeComdialogPageSize1 (data) {
      this.companyQueryInfo.pageSize = data
      this.companyQueryInfo.currentPage = 1
      this.openComDialog(1)
    },
    changeComdialogPageSize2 (data) {
      this.orgQueryInfo.pageSize = data
      this.orgQueryInfo.currentPage = 1
      this.openComDialog(2)
    },
    changeComdialogPageSize3 (data) {
      this.listQueryInfo.pageSize = data
      this.listQueryInfo.currentPage = 1
      this.openComDialog(3)
    },
    noYearPick () {
      let current = document.getElementsByClassName('el-date-picker__header--bordered')
      for (let i = 0; i < current.length; i++) {
        current[i].style.display = 'none'
      }
    },
    haveYearPick () {
      let current = document.getElementsByClassName('el-date-picker__header--bordered')
      for (let i = 0; i < current.length; i++) {
        current[i].style.display = 'block'
      }
    },
    initDialogData () {
      this.companyQueryInfo = {
        clickType: '2',
        comCode: '',
        currentPage: 1,
        pageSize: 10
      }
      this.orgQueryInfo = {
        clickType: '2',
        orgCode: '',
        comCode: '',
        currentPage: 1,
        pageSize: 10
      }
      this.listQueryInfo = {
        clickType: '2',
        listtype: '',
        currentPage: 1,
        pageSize: 10
      }
    },
    handleCurrentChange (val) {
      this.queryInfo.currentPage = val
      this.queryData()
    },
    handleSizeChange (val) {
      this.queryInfo.currentPage = 1
      this.queryInfo.pageSize = val
      this.queryData()
    },
    handleEXLSuccess (response) {
      this.closeLoading()
      if (response.code === '000000') {
        this.openToast('success', response.msg, 0)
        this.uploadVis = false
      } else {
        this.openToast('error', response.msg, 0)
      }
      this.$refs.excelUpload.clearFiles()
      this.fileList = []
    },
    onexport () {
      this.isEmptyDate()
      window.open(`/tabycore/ZongtRepoListReport/exportZongtRepoListReport?currentPage=${this.queryInfo.currentPage}&pageSize=${this.queryInfo.pageSize}&comCode=${this.queryInfo.comCode}&orgCode=${this.queryInfo.orgCode}&enddates=${this.queryInfo.enddates}&enddatee=${this.queryInfo.enddatee}&startDate=${this.queryInfo.startDate}&endDate=${this.queryInfo.endDate}&listtype=${this.queryInfo.listtype}`)
    },
    open (types, mesg) { // 提示
      this.$message({
        message: mesg,
        type: types
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
    ...mapActions([
    ])
  },
  components: {
    [NoticeBar.name]: NoticeBar,
    [LineTittle.name]: LineTittle,
    [LabelText.name]: LabelText,
    ComDialog
  },
  created () {
  },
  computed: {
  },
  watch: {
    queryInfo: {
      handler (newValue, oldValue) {
        console.log(newValue.endDate > newValue.startDate)
        if (!IsEmpty(newValue.startDate) && !IsEmpty(newValue.endDate) && newValue.endDate < newValue.startDate) {
          this.queryInfo.endDate = ''
          this.openToast('warning', '结束日期必须大于开始日期')
        }
      },
      deep: true
    },
    'queryInfo.comCode' () {
      if (this.queryInfo.comCode === '') {
        this.queryInfo.orgCode = ''
      }
    }
  }
}
</script>

<style lang="scss">
#advance-index{
  .el-form-item__error{
    left: 148px;
  }
  .el-table__empty-block{
    justify-content: flex-start;
    text-align: left;
    margin-left: 490px;
  }
}
</style>


<style lang="scss" scoped type="text/css">
  #lifeInsListImp {
    padding: 0px 30px 30px 30px;
  }
  .rate-wrapper {
    width: 300px;
    margin: 20px auto;
  }
  .btn-container{
    text-align: center;
    margin-top: 30px;
    margin-bottom: 30px;
  }
  .ri-line{
    margin-top: 10px;
    margin-bottom: 10px;
  }
 .mesg_form {
    margin: 20px 0 ;
  }
  .pagination {
    text-align: right;
    margin: 20px auto;
  }
  .ri-content{
    margin-top: 30px;
    margin-bottom: 30px;
  }
  .upload-content{
    width: 100%;
    text-align: center;
  }
  // .el-picker-panel .el-date-picker .el-popper
  // .el-date-picker__header {
  //   display: none;
  // }
  // .el-date-picker table {
  //   margin-top: 10px !important;
  // }
  // .lable-text .el-input__inner{
  //   width: 120px;
  // }
</style>
<style>
  .mesg_form .required:before{
    font-size: 14px!important;
    top: 3px !important;
  }
  .el-date-picker table {
    margin-top: 10px
  }
  #lifeInsListImp .mesg_form .el-form-item__error { left: 150px;}
  .el-date-editor .el-range__close-icon { line-height: initial; }
</style>

