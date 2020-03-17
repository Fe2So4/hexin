<template>
  <div id="orgadd" >
      <ui-notice-bar slot="breadcast" >
        <el-breadcrumb slot="location" separator=">">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>保监会报表</el-breadcrumb-item>
            <el-breadcrumb-item>深圳保监中介业务</el-breadcrumb-item>
          </el-breadcrumb>
      </ui-notice-bar>
      <div class="ri-content" slot="content" >
        <el-form ref="fenxiaoMonthlyBillList" :rules="rules" :model="fenxiaoMonthlyBillList">
          <el-row class="ri-line">
            <el-col :span="12">
              <el-form-item prop='comCode'>
                <ui-label-text labelWidth="120" label="佰盈机构代码:" text="BY0120"></ui-label-text>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item prop='comName'>
                <ui-label-text labelWidth="120" label="佰盈机构名称:" text="天安佰盈保险销售有限公司深圳分公司"></ui-label-text>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row class="ri-line">
            <el-col :span="12">
              <el-form-item prop='companyCode'>
                <ui-label-text labelWidth="120" label="机构名称：" :required="true">
                  <el-input v-model="fenxiaoMonthlyBillList.companyCode" slot='text' clearable @blur='comIsReal()'></el-input>
                </ui-label-text>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item prop="year">
                <ui-label-text labelWidth="120" label="上报日期:" required=true>
                  <el-date-picker
                    v-model="fenxiaoMonthlyBillList.year"
                    slot="text"
                    type="month"
                    value-format="yyyy-MM">
                  </el-date-picker>
                </ui-label-text>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
        <div class="btn-container">
          <el-button type="primary" :disabled="quanxian.query" @click="submitForm('fenxiaoMonthlyBillList',0)">查询</el-button>
          <el-button type="primary" :disabled="quanxian.baojianPush" @click="submitForm('fenxiaoMonthlyBillList',1)">推送</el-button>
          <el-button type="primary" :disabled="quanxian.import" @click="import1">导入</el-button>
        </div>
      </div>
      <div v-if='tableShowOrNot1'>
          <el-table id="dataTable" :data="tableData" ref="multipleTable" tooltip-effect="dark" style="width: 100%" @selection-change="handleSelectionChange"
        >
          <el-table-column type="selection" width="55"></el-table-column>
          <el-table-column prop="deptcode" show-overflow-tooltip label="上报机构"  width="140">
          </el-table-column>
          <el-table-column prop="year" label="填报年份"  width="150">
          </el-table-column>
          <el-table-column prop="month" label="填报月份" width="150">
          </el-table-column>
          <el-table-column prop="deptname" label="中介机构名称"  width="140">
          </el-table-column>
          <el-table-column prop="deptpeoplenow" label="机构人数-本季度末"  width="150">
          </el-table-column>
          <el-table-column prop="deptpeoplepre" label="机构人数-上年同期" width="150">
          </el-table-column>
          <el-table-column prop="certificatepeoplenow" label="持证人数-本季度末"  width="140">
          </el-table-column>
          <el-table-column prop="certificatepeoplepre" label="持证人数-上年同期"  width="140">
          </el-table-column>
          <el-table-column prop="premiumnowsum" label="保费金额-本年累计"  width="140">
          </el-table-column>
          <el-table-column prop="premiumpre" label="保费金额-上年同期"  width="150">
          </el-table-column>
          <el-table-column prop="turnovernow" label="佣金金额-本年累计" width="150">
          </el-table-column>
          <el-table-column prop="turnoverpre" label="佣金金额-上年同期"  width="140">
          </el-table-column>
          <el-table-column prop="profitnow" label="利润金额-本年累计"  width="150">
          </el-table-column>
          <el-table-column prop="profitpre" label="利润金额-上年同期" width="150">
          </el-table-column>
          <el-table-column prop="arearange" label="区域范围"  width="140">
          </el-table-column>
          <el-table-column prop="insname" label="保险公司名称"  width="150">
          </el-table-column>
          <el-table-column prop="insurancename" label="险种名称" width="150">
          </el-table-column>
          <el-table-column prop="premiumnow" label="本期新单保费"  width="140">
          </el-table-column>
          <el-table-column prop="premiumsurrender" label="退保保费-本期"  width="140">
          </el-table-column>
          <el-table-column prop="premiumadd" label="批增保费-本期"  width="150">
          </el-table-column>
          <el-table-column prop="premiumminus" label="批减保费-本期" width="150">
          </el-table-column>
          <el-table-column prop="premiumpresum" label="保费-累计"  width="140">
          </el-table-column>
          <el-table-column prop="commissionnow" label="佣金-本期"  width="150">
          </el-table-column>
          <el-table-column prop="commissionsurrender" label="退保佣金-本期" width="150">
          </el-table-column>
          <el-table-column prop="commissionadd" label="批增佣金-本期"  width="140">
          </el-table-column>
          <el-table-column prop="commissionminus" label="批减佣金-本期" width="150">
          </el-table-column>
          <el-table-column prop="commissionreinsurance" label="再保佣金-本期" width="150">
          </el-table-column>
          <el-table-column prop="commissionpre" label="佣金-累计"  width="140">
          </el-table-column>
          <el-table-column prop="premiumnet" label="本期网销保费"  width="150">
          </el-table-column>
          <el-table-column prop="premiumtel" label="本期电销保费" width="150">
          </el-table-column>
        </el-table>
        <el-row class="ri-line1">
          <el-col :span="12">
            <el-button type="danger" @click.native.prevent="deleteData()" class="btn-rowGroup">删除</el-button>
          </el-col>
          <el-col :span="12">
            <div class="block">
              <el-pagination
                @current-change="handleCurrentChange"
                @size-change="handleSizeChange"
                :current-page="fenxiaoMonthlyBillList.pageNo"
                :page-size ="fenxiaoMonthlyBillList.pageSize"
                :page-sizes="[10,20,50]"
                layout="total, sizes, prev, pager, next, jumper"
                :total="totalRecords"
                >
              </el-pagination>
            </div>
          </el-col>
        </el-row>
      </div>
      <ComDialog :vis='comDialog' :workerVis='comDialogworker' :comVis='comDialogCom' :newTableData='tempTableData' @onClose='comDialogClosing' @selectDialog='dialogBackData' @comdialogChangePageFunction='changeComdialogPage' @comdialogChangePageSizeFunction='changeComdialogPageSize' :fenyetotal='fenyetotalData'/>
      <div v-if='tableShowOrNot2'>
        <el-table id="dataTable" :data="tableData" ref="multipleTable" tooltip-effect="dark" style="width: 100%" @selection-change="handleSelectionChange"
        >
          <el-table-column type="selection" width="55"></el-table-column>
          <el-table-column prop="deptcode" show-overflow-tooltip label="上报机构"  width="140">
          </el-table-column>
          <el-table-column prop="year" label="填报年份"  width="150">
          </el-table-column>
          <el-table-column prop="month" label="填报月份" width="150">
          </el-table-column>
          <el-table-column prop="deptname" label="中介机构名称"  width="140">
          </el-table-column>
          <el-table-column prop="deptpeoplenow" label="机构人数-本季度末"  width="150">
          </el-table-column>
          <el-table-column prop="deptpeoplepre" label="机构人数-上年同期" width="150">
          </el-table-column>
          <el-table-column prop="certificatepeoplenow" label="持证人数-本季度末"  width="140">
          </el-table-column>
          <el-table-column prop="certificatepeoplepre" label="持证人数-上年同期"  width="140">
          </el-table-column>
          <el-table-column prop="premiumnowsum" label="保费金额-本年累计"  width="140">
          </el-table-column>
          <el-table-column prop="premiumpre" label="保费金额-上年同期"  width="150">
          </el-table-column>
          <el-table-column prop="turnovernow" label="佣金金额-本年累计" width="150">
          </el-table-column>
          <el-table-column prop="turnoverpre" label="佣金金额-上年同期"  width="140">
          </el-table-column>
          <el-table-column prop="profitnow" label="利润金额-本年累计"  width="150">
          </el-table-column>
          <el-table-column prop="profitpre" label="利润金额-上年同期" width="150">
          </el-table-column>
          <el-table-column prop="arearange" label="区域范围"  width="140">
          </el-table-column>
          <el-table-column prop="insname" label="保险公司名称"  width="150">
          </el-table-column>
          <el-table-column prop="insurancename" label="险种名称" width="150">
          </el-table-column>
          <el-table-column prop="premiumnow" label="本期新单保费"  width="140">
          </el-table-column>
          <el-table-column prop="premiumpresum" label="累计新单保费"  width="150">
          </el-table-column>
          <el-table-column prop="premiumrenewalnow" label="本期续期保费" width="150">
          </el-table-column>
          <el-table-column prop="premiumrenewalpre" label="累计续期保费"  width="140">
          </el-table-column>
          <el-table-column prop="commissionnow" label="本期新单佣金"  width="150">
          </el-table-column>
          <el-table-column prop="commissionpre" label="累计新单佣金" width="150">
          </el-table-column>
          <el-table-column prop="commissionrenewalnow" label="本期续期佣金" width="150">
          </el-table-column>
          <el-table-column prop="commissionrenewalpre" label="累计续期佣金"  width="140">
          </el-table-column>
          <el-table-column prop="premiumnet" label="保费-网销"  width="150">
          </el-table-column>
          <el-table-column prop="commissionpre" label="保费-电销" width="150">
          </el-table-column>
        </el-table>
        <el-row class="ri-line1">
          <el-col :span="12">
            <el-button type="danger" @click.native.prevent="deleteData()" class="btn-rowGroup">删除</el-button>
          </el-col>
          <el-col :span="12">
            <div class="block">
              <el-pagination
                @current-change="handleCurrentChange"
                @size-change="handleSizeChange"
                :current-page="fenxiaoMonthlyBillList.pageNo"
                :page-size ="fenxiaoMonthlyBillList.pageSize"
                :page-sizes="[10,20,50]"
                layout="total, sizes, prev, pager, next, jumper"
                :total="totalRecords"
                >
              </el-pagination>
            </div>
          </el-col>
        </el-row>
      </div>
      <el-dialog title="提示" center :append-to-body='true' :visible.sync="isTip" width="30%" >
        <p style="text-align: center; ">如果数据量比较大，整个过程会很慢，请您耐心等待</p>
        <span slot="footer" class="dialog-footer">
          <el-button @click="isTip = false">取 消</el-button>
          <el-button type="primary" @click="submitUpload">确 定</el-button>
        </span>
      </el-dialog>
      <el-dialog :append-to-body='true' :visible.sync='importDialog' :before-close='shangchuanDialogClose'>
        <div class="rate-wrapper">
          <div class="ri-content" slot="content" >
            <el-row class="ri-line">
              <el-col :span="12">
                <ui-label-text labelWidth="200" label="上报日期:" required=true>
                  <el-date-picker
                    v-model="dialogChooseDate"
                    @change="changeUploadData"
                    slot="text"
                    type="month"
                    value-format="yyyy-MM">
                  </el-date-picker>
                </ui-label-text>
              </el-col>
            </el-row>
            <span>请选择文件路径</span>
            <el-upload
              class="upload-rate"
              :action="uploadUrl()"
              :limit="1"
              :auto-upload="false"
              name="fileName"
              ref="upload"
              :on-success="handleEXLSuccess"
              :beforeUpload="beforeAvatarUpload"
              :data='uploadData'
              accept='xls'
              :file-list="fileList">
              <el-button size="small" type="primary" class="dialog-filePicker">选取文件</el-button>
              <div slot="tip" class="el-upload__tip"></div>
            </el-upload>
            <span slot="footer" class="dialog-footer">
              <el-button @click="importDialog = false">取 消</el-button>
              <el-button type="success" @click="goUpload" >上传文件</el-button>
            </span>

          </div>
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
import ComDialog from '@/components/comDialog'
import {
  api
} from '@/api/lifeInsur_mgr/quitListMgr.js'
export default {
  data () {
    return {
      rules: {
        companyCode: [
          { required: true, message: '请输入机构名称', trigger: 'change' }
        ],
        year: [
          { required: true, message: '请输入上报日期', trigger: 'change' }
        ]
      },
      quanxian: {
        query: true,
        baojianPush: true,
        import: true
      },
      fenxiaoMonthlyBillList: {
        year: '',
        companyCode: '',
        comCode: '',
        comName: '',
        pageNo: 1,
        pageSize: 10
      },
      tableShowOrNot1: false,
      tableShowOrNot2: false,
      orgQueryInfo: {
        clickType: '2',
        comCodeOrName: '',
        currentPage: 1,
        pageSize: 10
      },
      multipleSelection: [],
      tempTableData1: [],
      comDialog1: false,
      comDialogCom1: false,
      comDialogworker1: false,
      fenyetotalData: 0,
      fenyetotalData1: 0,
      tableData: [],
      importDialog: false,
      fileList: [],
      uploadData: {},
      dialogChooseDate: '',
      comDialog: false,
      comDialogworker: false,
      comDialogCom: false,
      tempTableData: [],
      isTip: false
    }
  },
  mounted () {
    api(`/auth/findButtonByUserCodeAndPage?userId=${this.$store.state.login.loginUserId}&page=深圳保监中介业务`, 'get').then(result => {
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
  watch: {
    'fenxiaoMonthlyBillList.comCode' () {
      if (this.fenxiaoMonthlyBillList.comCode === '') {
        this.fenxiaoMonthlyBillList.comName = ''
      }
    },
    'fenxiaoMonthlyBillList.comName' () {
      if (this.fenxiaoMonthlyBillList.comName === '') {
        this.fenxiaoMonthlyBillList.comCode = ''
      }
    }
  },
  methods: {
    ...mapActions([
      'commissionConfigdblqueryCom3'
    ]),
    changeUploadData (val) {
      console.log(val)
      let temp = val.split('-')
      this.uploadData['year'] = temp[0]
      this.uploadData['month'] = temp[1]
    },
    submitForm (formName, index) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          console.log('submit!')
          switch (index) {
            case 0:
              this.totalRecords = 0
              this.queryData()
              break
            case 1:
              this.pushData()
              break
            case 2:
              this.exportData()
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
    handleSelectionChange (val) {
      console.log(val)
      this.multipleSelection = val
    },
    // toast提示
    openToast (type, mesg, time = 0) {
      this.$message({
        showClose: true,
        message: mesg,
        type: type,
        duration: time
      })
    },
    beforeAvatarUpload (file) {
      let testmsg = file.name.substring(file.name.lastIndexOf('.') + 1)
      const extension = testmsg === 'xls'
      if (!extension) {
        this.openToast('warning', '上传文件只能是 xls格式', 0)
        this.closeLoading()
      }
      return extension
    },
    goUpload () {
      let list = document.querySelector('.is-ready')
      if (IsEmpty(list)) {
        list = []
      } else {
        list = [1]
      }
      if (IsEmpty(this.uploadData)) {
        this.openToast('warning', '请填入相关必填项', 0)
      } else if (list.length <= 0) {
        this.openToast('warning', '请先选择文件', 0)
      } else {
        let tempArr = this.fenxiaoMonthlyBillList.year.split('-')
        api(`/szbjimport/checkExist?year=${tempArr[0]}&month=${tempArr[1]}`, 'get').then(result => {
          console.log(result)
          if (result.data.msg === 'true') {
            this.openToast('warning', '已存在该年份+月份数据', 0)
          }
        }).catch((e) => {
          console.log(e)
        })
        this.isTip = true
      }
    },
    submitUpload () {
      this.$refs.upload.submit()
      this.isTip = false
      this.importDialog = false
      this.Loading()
    },
    dialogBackData (data) {
      this.comDialogClosing()
      let temp = []
      temp = data.split('-')
      this.fenxiaoMonthlyBillList.comCode = temp[0]
      this.fenxiaoMonthlyBillList.comName = temp[1]
    },
    changeComdialogPage (data) {
      this.orgQueryInfo.currentPage = data
      this.openComDialog()
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
    changeComdialogPageSize (data) {
      this.orgQueryInfo.pageSize = data
      this.orgQueryInfo.currentPage = 1
      this.openComDialog()
    },
    comDialogClosing () {
      this.comDialog = false
      this.orgQueryInfo = {
        clickType: '2',
        comCodeOrName: '',
        currentPage: 1,
        pageSize: 10
      }
      this.fenxiaoMonthlyBillList.comCode = ''
      this.fenxiaoMonthlyBillList.comName = ''
    },
    opensingleComDialog () {
      if (!(this.comDialog)) {
        if (!IsEmpty(this.fenxiaoMonthlyBillList.comCode)) {
          this.orgQueryInfo.comCodeOrName = this.fenxiaoMonthlyBillList.comCode
        } else if (!IsEmpty(this.fenxiaoMonthlyBillList.comName)) {
          this.orgQueryInfo.comCodeOrName = this.fenxiaoMonthlyBillList.comName
        } else {
          this.orgQueryInfo.comCodeOrName = ''
        }
        this.orgQueryInfo.clickType = '1'
        this.commissionConfigdblqueryCom3(this.orgQueryInfo).then(
          (res) => {
            if (res.data.code !== '000000' && !IsEmpty(res.data.code)) {
              this.openToast('warning', res.data.msg)
            } else {
              if (res.data.data.data.length === 1) {
                this.fenxiaoMonthlyBillList.comCode = res.data.data.data[0].comCode
                this.fenxiaoMonthlyBillList.comName = res.data.data.data[0].comCName
              }
            }
          }
        )
      }
    },
    openComDialog () {
      if (!IsEmpty(this.fenxiaoMonthlyBillList.comCode)) {
        this.orgQueryInfo.comCodeOrName = this.fenxiaoMonthlyBillList.comCode
      } else if (!IsEmpty(this.fenxiaoMonthlyBillList.comName)) {
        this.orgQueryInfo.comCodeOrName = this.fenxiaoMonthlyBillList.comName
      } else {
        this.orgQueryInfo.comCodeOrName = ''
      }
      this.orgQueryInfo.clickType = '2'
      this.commissionConfigdblqueryCom3(this.orgQueryInfo).then(
        (res) => {
          console.log(res)
          if (res.data.code !== '000000' && !IsEmpty(res.data.code)) {
            this.openToast('warning', res.data.msg)
          } else {
            this.tempTableData = res.data.data.data
            for (let i = 0; i < this.tempTableData.length; i++) {
              this.tempTableData[i]['renderData'] = `${this.tempTableData[i].comCode}-${this.tempTableData[i].comCName}`
            }
            this.fenyetotalData = res.data.data.totalRecords
            this.comDialog = true
            this.comDialogCom = true
            this.comDialogworker = false
          }
        }
      )
    },
    comIsReal () {
      api(`/szbjimport/checkExist2?insuredName=${this.fenxiaoMonthlyBillList.companyCode}`, 'get').then(result => {
        console.log(result)
        console.log(this.fenxiaoMonthlyBillList.companyCode)
        if (result.data.msg !== 'false') {
          this.openToast('warning', '该保险公司不存在', 0)
          // this.fenxiaoMonthlyBillList.companyCode = ''
        }
      }).catch((e) => {
        console.log(e)
      })
    },
    shangchuanDialogClose () {
      this.importDialog = false
      this.fileList = []
    },
    handleSizeChange (val) {
      this.fenxiaoMonthlyBillList.pageNo = 1
      this.fenxiaoMonthlyBillList.pageSize = val
      this.queryData()
    },
    handleCurrentChange (val) {
      this.fenxiaoMonthlyBillList.pageNo = 1
      this.queryData()
    },
    queryData () {
      this.Loading()
      this.tableData = []
      let tempArr = this.fenxiaoMonthlyBillList.year.split('-')
      api(`/szbjimport/companyCheck?insuredName=${this.fenxiaoMonthlyBillList.companyCode}`, 'get').then(result => {
        console.log(result)
        if (result.data.msg === '1') { //
          api(`/szbjimport/szBjDataQueryCx?insuredName=${this.fenxiaoMonthlyBillList.companyCode}&year=${tempArr[0]}&month=${tempArr[1]}&pageNo=${this.fenxiaoMonthlyBillList.pageNo}&pageSize=${this.fenxiaoMonthlyBillList.pageSize}`, 'get').then(result => {
            console.log(result)
            this.closeLoading()
            if (result.data.code !== '000000' && !IsEmpty(result.data.code)) {
              this.openToast('warning', result.data.msg, 0)
            } else {
              this.totalRecords = result.data.totalElements
              this.tableData = result.data.content
              this.tableShowOrNot2 = false
              this.tableShowOrNot1 = true
            }
          }).catch((e) => {
            console.log(e)
          })
        } else {
          api(`/szbjimport/szBjDataQuerySx?insuredName=${this.fenxiaoMonthlyBillList.companyCode}&year=${tempArr[0]}&month=${tempArr[1]}&pageNo=${this.fenxiaoMonthlyBillList.pageNo}&pageSize=${this.fenxiaoMonthlyBillList.pageSize}`, 'get').then(result => {
            console.log(result)
            this.closeLoading()
            if (result.data.code !== '000000' && !IsEmpty(result.data.code)) {
              this.openToast('warning', result.data.msg, 0)
            } else {
              this.totalRecords = result.data.totalElements
              this.tableData = result.data.content
              this.tableShowOrNot1 = false
              this.tableShowOrNot2 = true
            }
          }).catch((e) => {
            console.log(e)
          })
        }
      }).catch((e) => {
        console.log(e)
      })
    },
    uploadUrl () {
      return '/tabycore/szbjimport/szBjDataImport'
    },
    handleEXLSuccess (res) {
      this.closeLoading()
      if (res.code !== '000000') {
        this.openToast('error', res.msg, 0)
        this.fileList = []
      } else {
        this.openToast('success', res.msg, 0)
      }
    },
    pushData () {
      let tempArr = this.fenxiaoMonthlyBillList.year.split('-')
      api(`/szbjimport/pushData?year=${tempArr[0]}&month=${tempArr[1]}`, 'get').then(result => {
        console.log(result)
        if (result.data.code !== '000000' && !IsEmpty(result.data.code)) {
          this.openToast('warning', result.data.msg, 0)
        } else {
          this.openToast('warning', result.data.msg, 0)
        }
      }).catch((e) => {
        console.log(e)
      })
    },
    import1 () {
      this.importDialog = true
    },
    deleteData () {
      let temp = []
      for (let i = 0; i < this.multipleSelection.length; i++) {
        temp.push(this.multipleSelection[i].id)
      }
      api(`/szbjimport/deleteData?insuredName=${this.fenxiaoMonthlyBillList.companyCode}&ids=${temp}`, 'get').then(result => {
        console.log(result)
        if (result.data.msg === 'true') {
          this.openToast('success', '删除成功', 0)
        } else {
          this.openToast('warning', result.data.msg, 0)
        }
      }).catch((e) => {
        console.log(e)
      })
    }
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
  }
}
</script>

<style>
#orgadd {
  padding-left: 30px;
  padding-right: 30px;
}
.btn-container{
  text-align: center;
  margin-bottom: 30px;
  margin-top: 60px;
}
.upload-rate,
.download,
.download1 {
  text-align: center;
}
.rate-wrapper {
  width: 300px;
  margin: 100px auto;
}
.ri-line{
  margin-top: 10px;
  margin-bottom: 10px;
}
.ri-line1{
  margin-top: 30px;
  margin-bottom: 10px;
}
.dialog-filePicker{
  margin-bottom: 20px;
}
.dialog-footer{
  margin-left: 15px;
}
</style>
