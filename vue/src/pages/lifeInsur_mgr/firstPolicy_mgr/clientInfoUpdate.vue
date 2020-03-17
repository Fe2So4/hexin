<template>
  <div id="orgadd" >
    <ui-notice-bar slot="breadcast" >
      <el-breadcrumb slot="location" separator=">">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>寿险业务管理</el-breadcrumb-item>
          <el-breadcrumb-item>寿险首期保单管理</el-breadcrumb-item>
          <el-breadcrumb-item>客户信息补录</el-breadcrumb-item>
        </el-breadcrumb>
    </ui-notice-bar>
    <div slot="content">
      <el-row class="ri-line">
        <el-col :span="12">
          <ui-label-text labelWidth="220" label="佰盈省级分公司代码:">
            <el-input v-model="queryInfo.comcode" clearable slot="text" @dblclick.native="openComDialog(1)" placeholder="双击可选择" @blur='opensingleComDialog(1)' @change="clearDiji"></el-input>
          </ui-label-text>
        </el-col>
        <el-col :span="12">
          <ui-label-text labelWidth="220" label="佰盈省级分公司名称:" >
            <el-input v-model="queryInfo.comname" clearable slot="text" @dblclick.native="openComDialog(1)" placeholder="双击可选择" @blur='opensingleComDialog(1)' @change="clearDiji"></el-input>
          </ui-label-text>
        </el-col>
      </el-row>
      <el-row class="ri-line">
        <el-col :span="12">
          <ui-label-text labelWidth="220" label="佰盈地市级分公司代码:">
            <el-input v-model="queryInfo.comcomcode" clearable slot="text" @dblclick.native="openComDialog(2)" placeholder="双击可选择" @blur='opensingleComDialog(2)'></el-input>
          </ui-label-text>
        </el-col>
        <el-col :span="12">
          <ui-label-text labelWidth="220" label="佰盈地市级分公司名称:" >
            <el-input v-model="queryInfo.comcomname" clearable slot="text" @dblclick.native="openComDialog(2)" placeholder="双击可选择" @blur='opensingleComDialog(2)'></el-input>
          </ui-label-text>
        </el-col>
      </el-row>
      <el-row class="ri-line">
        <el-col :span="12">
          <ui-label-text labelWidth="220" label="保单号:">
            <el-input v-model="queryInfo.policyno" slot="text"></el-input>
          </ui-label-text>
        </el-col>
      </el-row>
    </div>
    <div class="btn-container" slot="controlbar">
      <el-button type="primary" @click.native.prevent="downmoban">模板下载</el-button>
      <el-button type="primary" @click.native.prevent="uploadVis = true">选取文件</el-button>
      <el-button type="primary" @click.native.prevent="goUpload">上传文件</el-button>
      <el-button type="primary" @click.native.prevent="checkRes">查看结果</el-button>
      <el-button type="primary" @click.native.prevent="exportResult">导出</el-button>
    </div>
    <div v-if="tableShowOrNot">
      <el-table :data="tableData" style="width: 100%;text-align: -webkit-center;">
        <el-table-column prop="comcode" label="佰盈省级分公司代码"  width="180" ></el-table-column>
        <el-table-column prop="comname" label="佰盈省级分公司名称"  width="180" ></el-table-column>
        <el-table-column prop="comcomcode" label="佰盈地市级分公司代码"  width="180" ></el-table-column>
        <el-table-column prop="comcomname" label="佰盈地市级分公司名称"  width="180" ></el-table-column>
        <el-table-column prop="policyno" label="保单号"  width="180" ></el-table-column>
        <el-table-column prop="result" label="结果"  width="180" ></el-table-column>
      </el-table>
      <div class="block">
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
    </div>
    <el-dialog append-to-body center title="客户信息补录上传"
      :visible.sync="uploadVis" width="60%">
      <div class="upload-content">
        <el-upload
          class="upload-content" ref="uploadRef"
          :action="uploadUrl()"
          name="fileName"
          :on-success="handleEXLSuccess"
          :file-list="fileList"
          :auto-upload="false"
          center>
          <el-button type="primary">点击选择</el-button>
          <!-- <div slot="tip" class="red-color">
            <p>* 请您耐心等待，导入结果将会以excel的形式进行显示！<a class="download" @click="ondownloadDemo">(模板下载)</a>
            </p>
          </div> -->
        </el-upload>
      </div>
    </el-dialog>
    <el-dialog title="查看结果" center :append-to-body='true' :visible.sync='checkResInfoVis'>
        <span class="center">
          {{checkResInfo}}
        </span>
        <div class="btn-container">
          <el-button @click="checkResInfoVis = false">确定</el-button>
        </div>
      </el-dialog>
    <ComDialog :vis='comDialog1' :workerVis='comDialogworker1' :comVis='comDialogCom1' :newTableData='tempTableData1' @onClose='comDialogClosing(1)' @selectDialog='dialogBackData1' @comdialogChangePageFunction='changeComdialogPage1' @comdialogChangePageSizeFunction='changeComdialogPageSize1' :fenyetotal='fenyetotalData'/>
    <ComDialog :vis='comDialog2' :workerVis='comDialogworker2' :comVis='comDialogCom2' :newTableData='tempTableData2' @onClose='comDialogClosing(2)' @selectDialog='dialogBackData2' @comdialogChangePageFunction='changeComdialogPage2' @comdialogChangePageSizeFunction='changeComdialogPageSize2' :fenyetotal='fenyetotalData'/>
  </div>
</template>

<script>
import NoticeBar from '@/components/notice-bar'
import LineTittle from '@/components/line-tittle'
import LabelText2 from '@/components/label-text2'
import LabelText from '@/components/label-text'
import { mapActions } from 'vuex'
import ComDialog from '@/components/comDialog'
import IsEmpty from '@/utils/IsEmpty'
// import moment from 'moment'
// import {downloadUrl} from 'download.js'
import {
  api
} from '@/api/lifeInsur_mgr/quitListMgr.js'
export default {
  name: '',
  data () {
    return {
      comDialog1: false,
      comDialogCom1: false,
      comDialogworker1: false,
      comDialog2: false,
      comDialogCom2: false,
      comDialogworker2: false,
      tempTableData1: [],
      tempTableData2: [],
      tableData: [],
      fileList: [],
      fenyetotalData: 0,
      tableShowOrNot: false,
      uploadVis: false,
      totalRecords: 0,
      checkResInfoVis: false,
      checkResInfo: '',
      shengjiQueryData: {
        clickType: '2',
        comCodeOrName: '',
        currentPage: 1,
        pageSize: 10
      },
      dijiQueryData: {
        clickType: '2',
        upperComCode: '',
        comCodeOrName: '',
        currentPage: 1,
        pageSize: 10
      },
      queryInfo: {
        comcode: '',
        comname: '',
        comcomcode: '',
        comcomname: '',
        policyno: '',
        currentPage: 1,
        pageSize: 5
      }
    }
  },
  methods: {
    ...mapActions([
      'contiListCheckDialogDataGet1', 'contiListCheckDialogDataGet2'
    ]),
    downmoban () {
      window.open(`/tabycore/customerEntry/customerMould`)
    },
    exportResult () {
      window.open(`/tabycore/customerEntry/exportResult?comcode=${this.queryInfo.comcode}&comname=${this.queryInfo.comname}&comcomcode=${this.queryInfo.comcomcode}&comcomname=${this.queryInfo.comcomname}&policyno=${this.queryInfo.policyno}`)
    },
    uploadUrl () {
      return `/tabycore/customerEntry/addCustomer?comcode=${this.queryInfo.comcode}&comname=${this.queryInfo.comname}&comcomcode=${this.queryInfo.comcomcode}&comcomname=${this.queryInfo.comcomname}&policyno=${this.queryInfo.policyno}`
    },
    goUpload () {
      if (this.$refs.uploadRef && this.$refs.uploadRef.uploadFiles.length > 0) {
        this.Loading()
        this.$refs.uploadRef.submit()
      } else {
        this.openToast('warning', '请先选取文件')
      }
    },
    handleEXLSuccess (response) {
      this.closeLoading()
      this.$refs.uploadRef.clearFiles()
      if (response.code === '000000') {
        this.$message({
          showClose: true,
          message: response.msg,
          type: 'success',
          duration: 0
        })
      } else {
        this.checkResInfoVis = true
        this.checkResInfo = response.msg
      }
    },
    handleCurrentChange (val) {
      this.queryInfo.currentPage = val
      this.Loading()
      api('/customerEntry/findResult', 'post', this.queryInfo).then((res) => {
        this.closeLoading()
        if (res.data.code !== '000000' && !IsEmpty(res.data.code)) {
          this.openToast('warning', res.data.msg)
        } else {
          this.tableData = res.data.data.data
          this.totalRecords = res.data.data.totalRecords
        }
      })
    },
    handleSizeChange (val) {
      this.queryInfo.currentPage = 1
      this.queryInfo.pageSize = val
      this.Loading()
      api('/customerEntry/findResult', 'post', this.queryInfo).then((res) => {
        this.closeLoading()
        if (res.data.code !== '000000' && !IsEmpty(res.data.code)) {
          this.openToast('warning', res.data.msg)
        } else {
          this.tableData = res.data.data.data
          this.totalRecords = res.data.data.totalRecords
        }
      })
    },
    checkRes () {
      this.Loading()
      this.queryInfo.currentPage = 1
      api('/customerEntry/findResult', 'post', this.queryInfo).then((res) => {
        this.closeLoading()
        this.tableShowOrNot = true
        if (res.data.code !== '000000' && !IsEmpty(res.data.code)) {
          this.openToast('warning', res.data.msg)
        } else {
          this.tableData = res.data.data.data
          this.totalRecords = res.data.data.totalRecords
          this.checkResInfo = `成功补录客户信息${res.data.success ? res.data.success : 0}条，失败${res.data.fail ? res.data.fail : 0}条，可在结果列中查询失败原因！`
          this.checkResInfoVis = true
        }
      })
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
    initshuangjiDialog () {
      this.shengjiQueryData = {
        clickType: '2',
        comCodeOrName: '',
        currentPage: 1,
        pageSize: 10
      }
      this.dijiQueryData = {
        clickType: '2',
        upperComCode: '',
        comCodeOrName: '',
        currentPage: 1,
        pageSize: 10
      }
    },
    clearDiji () {
      this.queryInfo.comcode = ''
      this.queryInfo.comname = ''
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
    openComDialog (index) {
      switch (index) {
        case 1:
          this.shengjiQueryData.clickType = '2'
          if (IsEmpty(this.queryInfo.comcode)) {
            this.shengjiQueryData.comCodeOrName = this.queryInfo.comname
          } else {
            this.shengjiQueryData.comCodeOrName = this.queryInfo.comcode
          }
          this.contiListCheckDialogDataGet1(this.shengjiQueryData).then(
            (res) => {
              if (res.data.code !== '000000' && !IsEmpty(res.data.code)) {
                this.openToast('warning', res.data.msg)
              } else {
                // for (let i = 0; i < res.data.data.data.length; i++) {
                //   res.data.data.data[i].comCName = res.data.data.data[i].comCName.replace(/天安佰盈保险销售有限公司/, '')
                // }
                this.tempTableData1 = res.data.data.data
                this.fenyetotalData = res.data.data.totalRecords
                for (let i = 0; i < this.tempTableData1.length; i++) {
                  this.tempTableData1[i]['renderData'] = `${this.tempTableData1[i].comCode}-${this.tempTableData1[i].comCName}`
                }
                this.comDialog1 = true
                this.comDialogCom1 = true
                this.comDialogworker1 = false
              }
            })
          break
        case 2:
          if (IsEmpty(this.queryInfo.comcode)) {
            this.openToast('warning', '请先选择省级分公司！')
          } else if (this.queryInfo.comcode === '01') {
            this.openToast('warning', '当您在省级分公司输入框处为总公司不可选择分公司！')
          } else {
            this.dijiQueryData.clickType = '2'
            this.dijiQueryData.upperComCode = this.queryInfo.comcode
            if (IsEmpty(this.queryInfo.comcomcode)) {
              this.dijiQueryData.comCodeOrName = this.queryInfo.comcomname
            } else {
              this.dijiQueryData.comCodeOrName = this.queryInfo.comcomcode
            }
            this.contiListCheckDialogDataGet2(this.dijiQueryData).then(
              (res) => {
                if (res.data.code !== '000000' && !IsEmpty(res.data.code)) {
                  this.openToast('warning', res.data.msg)
                } else {
                  // for (let i = 0; i < res.data.data.data.length; i++) {
                  //   res.data.data.data[i].comCName = res.data.data.data[i].comCName.replace(/天安佰盈保险销售有限公司/, '')
                  // }
                  this.tempTableData2 = res.data.data.data
                  this.fenyetotalData = res.data.data.totalRecords
                  for (let i = 0; i < this.tempTableData2.length; i++) {
                    this.tempTableData2[i]['renderData'] = `${this.tempTableData2[i].comCode}-${this.tempTableData2[i].comCName}`
                  }
                  this.comDialog2 = true
                  this.comDialogCom2 = true
                  this.comDialogworker2 = false
                }
              })
          }
          break
      }
    },
    opensingleComDialog (index) {
      if (!(this.comDialog1 || this.comDialog2)) {
        switch (index) {
          case 1:
            this.shengjiQueryData.clickType = '1'
            if (IsEmpty(this.queryInfo.comcode)) {
              this.shengjiQueryData.comCodeOrName = this.queryInfo.comname
            } else {
              this.shengjiQueryData.comCodeOrName = this.queryInfo.comcode
            }
            this.contiListCheckDialogDataGet1(this.shengjiQueryData).then(
              (res) => {
                if (res.data.code !== '000000' && !IsEmpty(res.data.code)) {
                } else {
                  if (res.data.data.data.length === 1) {
                    this.queryInfo.comcode = res.data.data.data[0].comCode
                    this.queryInfo.comname = res.data.data.data[0].comCName
                  }
                }
              }
            )
            break
          case 2:
            this.dijiQueryData.clickType = '1'
            this.dijiQueryData.upperComCode = this.queryInfo.comcode
            if (IsEmpty(this.queryInfo.comcomcode)) {
              this.dijiQueryData.comCodeOrName = this.queryInfo.comcomname
            } else {
              this.dijiQueryData.comCodeOrName = this.queryInfo.comcomcode
            }
            this.contiListCheckDialogDataGet2(this.dijiQueryData).then(
            (res) => {
              if (res.data.code !== '000000' && !IsEmpty(res.data.code)) {
              } else {
                if (res.data.data.data.length === 1) {
                  this.queryInfo.comcomcode = res.data.data.data[0].comCode
                  this.queryInfo.comcomname = res.data.data.data[0].comCName
                }
              }
            })
            break
        }
      }
    },
    comDialogClosing (index) {
      this.comDialog1 = false
      this.comDialog2 = false
      this.initshuangjiDialog()
      switch (index) {
        case 1:
          this.queryInfo.comcode = ''
          this.queryInfo.comname = ''
          break
        case 2:
          this.queryInfo.comcomcode = ''
          this.queryInfo.comcomname = ''
          break
      }
    },
    dialogBackData1 (data) {
      this.initshuangjiDialog()
      this.comDialog1 = false
      let temp = []
      temp = data.split('-')
      this.queryInfo.comcode = temp[0]
      this.queryInfo.comname = temp[1]
    },
    dialogBackData2 (data) {
      this.initshuangjiDialog()
      this.comDialog2 = false
      let temp = []
      temp = data.split('-')
      this.queryInfo.comcomcode = temp[0]
      this.queryInfo.comcomname = temp[1]
    },
    changeComdialogPage1 (data) {
      this.shengjiQueryData.currentPage = data
      this.openComDialog(1)
    },
    changeComdialogPage2 (data) {
      this.dijiQueryData.currentPage = data
      this.openComDialog(2)
    },
    changeComdialogPageSize1 (data) {
      this.shengjiQueryData.currentPage = 1
      this.shengjiQueryData.pageSize = data
      this.openComDialog(1)
    },
    changeComdialogPageSize2 (data) {
      this.dijiQueryData.currentPage = 1
      this.dijiQueryData.pageSize = data
      this.openComDialog(2)
    }
  },
  computed: {},
  mounted () {
    let agentComId = this.$store.state.login.showComName.split('(')[1].split(')')[0]
    this.shengjiQueryData.clickType = '2'
    this.shengjiQueryData.comCodeOrName = agentComId.substring(0, 6)
    this.contiListCheckDialogDataGet1(this.shengjiQueryData).then(
      (res) => {
        if (res.data.code !== '000000' && !IsEmpty(res.data.code)) {
        } else {
          this.queryInfo.comcode = res.data.data.data[0].comCode
          this.queryInfo.comname = res.data.data.data[0].comCName
          if (agentComId.length > 6) {
            this.dijiQueryData.clickType = '2'
            this.dijiQueryData.upperComCode = this.queryInfo.comcode
            this.dijiQueryData.comCodeOrName = agentComId
            this.contiListCheckDialogDataGet2(this.dijiQueryData).then(
            (res) => {
              if (res.data.code !== '000000' && !IsEmpty(res.data.code)) {
              } else {
                this.queryInfo.comcomcode = res.data.data.data[0].comCode
                this.queryInfo.comcomname = res.data.data.data[0].comCName
              }
            })
          }
        }
      }
    )
  },
  watch: {
    'queryInfo.comcode' () {
      if (this.queryInfo.comcode === '') {
        this.queryInfo.comname = ''
        this.queryInfo.comcomcode = ''
        this.queryInfo.comcomname = ''
      }
    },
    'queryInfo.comname' () {
      if (this.queryInfo.comname === '') {
        this.queryInfo.comcode = ''
        this.queryInfo.comcomcode = ''
        this.queryInfo.comcomname = ''
      }
    },
    'queryInfo.comcomcode' () {
      if (this.queryInfo.comcomcode === '') {
        this.queryInfo.comcomname = ''
      }
    },
    'queryInfo.comcomname' () {
      if (this.queryInfo.comcomname === '') {
        this.queryInfo.comcomcode = ''
      }
    }
  },
  components: {
    [NoticeBar.name]: NoticeBar,
    [LineTittle.name]: LineTittle,
    [LabelText.name]: LabelText,
    [LabelText2.name]: LabelText2,
    ComDialog
  }
}
</script>

<style lang="scss" scoped type="text/css">
#orgadd {padding-left: 30px;padding-right: 30px;}
.btn-container{text-align: center;margin-top: 60px;margin-bottom: 30px;}
.ri-line{margin-top: 10px;margin-bottom: 10px;}
.datestyle{color: #717171;font-size: 0.875rem;display: inline-block;width: 120px;}
.datestyle1{color: #717171;font-size: 0.875rem;display: inline-block;text-align: center;width: 60px;}
.el-pagination{float: right;padding-right: 20px;}
.center{text-align: center}
.orgInfoTable{text-align: center}
.orgInfoTable tr{height: 40px}
.orgInfoTable td{ width: 15%;height: 2rem}
.head{background: #d3e7fa;color: #2585e6;height: 40px}
.IDRequired:before{
    content: '*';
    font-size: 24px;
    font-weight: bolder;
    color: #ff7777;
    position: relative;
    top: 7px;
}
.IDRequired {
  color: #717171;
  font-size: 0.83rem;
  display: inline-block;
  width: 6rem;
}
.IDNotRequired {
  color: #717171;
  font-size: 0.83rem;
  display: inline-block;
  width: 6rem;
}
.tableButton {
  cursor: pointer;
  color: #66B1FF;
}
.upload-content{
  width: 100%;
  text-align: center;
  }
.block {
  position: relative;
  bottom: 10px;
  margin-top: 40px;

}
</style>

