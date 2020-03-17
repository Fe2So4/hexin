<template>
  <div id="orgadd" >
      <ui-notice-bar slot="breadcast" >
        <el-breadcrumb slot="location" separator=">">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>寿险佣金管理</el-breadcrumb-item>
            <el-breadcrumb-item>寿险续期佣金管理</el-breadcrumb-item>
            <el-breadcrumb-item>人管继续率、续佣跑批</el-breadcrumb-item>
          </el-breadcrumb>
      </ui-notice-bar>
      <div class="ri-content" slot="content" >
        <el-form ref="queryInfo" :rules="rules1" :model="queryInfo">
          <el-row class="ri-line">
            <el-col :span="8">
              <el-form-item prop='persistencyDate'>
                <ui-label-text labelWidth="120" label="继续率月份：" :required="true">
                  <el-date-picker
                      v-model="queryInfo.persistencyDate"
                      value-format="yyyy-MM"
                      type="month"
                      slot="text"
                    >
                  </el-date-picker>
                </ui-label-text>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item prop='comCode'>
                <ui-label-text labelWidth="120" label="机构代码：" >
                  <el-input v-model="queryInfo.comCode" slot="text" placeholder="双击可选择" @dblclick.native="openComDialog(1)" @blur='opensingleComDialog()'></el-input>
                </ui-label-text>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item prop='comName'>
                <ui-label-text labelWidth="120" label="机构名称：" >
                  <el-input v-model="queryInfo.comName" slot="text" placeholder="双击可选择" @dblclick.native="openComDialog(1)" @blur='opensingleComDialog()'></el-input>
                </ui-label-text>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
      <div class="btn-container" slot="controlbar" >
        <el-button type="primary" @click.native.prevent="submitForm('queryInfo')">执行批处理</el-button>
      </div>
      <ComDialog :vis='comDialog' :workerVis='comDialogworker' :comVis='comDialogCom' :newTableData='tempTableData' @onClose='comDialogClosing()' @selectDialog='dialogBackData' @comdialogChangePageFunction='changeComdialogPage1' @comdialogChangePageSizeFunction='changeComdialogPageSize1' :fenyetotal='fenyetotalData'/>
  </div>
</template>

<script>
import NoticeBar from '@/components/notice-bar'
import LineTittle from '@/components/line-tittle'
import LabelText from '@/components/label-text'
import IsEmpty from '@/utils/IsEmpty'
import { mapActions } from 'vuex'
import ComDialog from '@/components/comDialog'
import replaceStr from '@/utils/myFunction'
import {
  api
} from '@/api/lifeInsur_mgr/quitListMgr.js'
export default {
  name: '',
  data () {
    return {
      comDialog: false,
      comDialogCom: false,
      comDialogworker: false,
      tempTableData: [],
      fenyetotalData: 0,
      toastMessage: '',
      queryInfo: {
        persistencyDate: '',
        comCode: '',
        comName: ''
      },
      loading: '',
      rules1: {},
      orgQueryInfo: {
        currentPage: 1
      }
    }
  },
  mounted () {
  },
  methods: {
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          console.log('submit!')
          this.doBatch()
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
    openToast (type, mesg, time = 0) {
      this.toastMessage = this.$message({
        showClose: true,
        message: mesg,
        type: type,
        duration: time
      })
    },
    doBatch () {
      this.Loading()
      if (this.toastMessage) {
        this.toastMessage.close()
      }
      api('/persistency/batchTask', 'post', this.queryInfo).then(result => {
        console.log(result)
        this.closeLoading()
        if (result.data.code !== '000000') {
          this.openToast('warning', result.data.msg, 0)
        } else {
          this.openToast('success', `${result.data.msg}`, 0)
        }
      }).catch((e) => {
        console.log(e)
      })
    },
    opensingleComDialog () {
      if (!this.comDialog) {
        let comCodeOrName = ''
        if (!IsEmpty(this.queryInfo.comCode)) {
          comCodeOrName = this.queryInfo.comCode
        } else if (!IsEmpty(this.queryInfo.comName)) {
          comCodeOrName = this.queryInfo.comName
        } else {
          comCodeOrName = this.queryInfo.comCode
        }
        let temp = {
          comCodeOrName: comCodeOrName,
          clickType: '1',
          currentPage: 1,
          pageSize: 10
        }
        this.contiListCheckDialogDataGet1(temp).then(
          (res) => {
            console.log(res)
            if (res.data.code !== '000000' && !IsEmpty(res.data.code)) {
              this.openToast('warning', res.data.msg)
              this.queryInfo.comCode = ''
              this.queryInfo.comName = ''
            } else {
              for (let i = 0; i < res.data.data.data.length; i++) {
                res.data.data.data[i].comCName = replaceStr(res.data.data.data[i].comCName)
              }
              if (res.data.data.data.length === 1) {
                this.queryInfo.comCode = res.data.data.data[0].comCode
                this.queryInfo.comName = res.data.data.data[0].comCName
              } else {
                this.queryInfo.comCode = ''
                this.queryInfo.comName = ''
              }
            }
          })
      }
    },
    openComDialog (page) {
      let comCodeOrName = ''
      if (!IsEmpty(this.queryInfo.comCode)) {
        comCodeOrName = this.queryInfo.comCode
      } else if (!IsEmpty(this.queryInfo.comName)) {
        comCodeOrName = this.queryInfo.comName
      } else {
        comCodeOrName = this.queryInfo.comCode
      }
      this.orgQueryInfo.currentPage = page
      let temp = {
        comCodeOrName: comCodeOrName,
        clickType: '2',
        currentPage: page,
        pageSize: 10
      }
      this.contiListCheckDialogDataGet1(temp).then(
        (res) => {
          console.log(res)
          if (res.data.code === '000000' || IsEmpty(res.data.code)) {
            for (let i = 0; i < res.data.data.data.length; i++) {
              res.data.data.data[i].comCName = replaceStr(res.data.data.data[i].comCName)
            }
            this.fenyetotalData = res.data.data.totalRecords
            this.tempTableData = res.data.data.data
            this.comDialog = true
            this.comDialogCom = true
            this.comDialogworker = false
            for (let i = 0; i < this.tempTableData.length; i++) {
              this.tempTableData[i]['renderData'] = `${this.tempTableData[i].comCode}-${this.tempTableData[i].comCName}`
            }
          } else {
            this.openToast('warning', res.data.msg)
          }
        }
      )
    },
    comDialogClosing () {
      this.comDialog = false
      this.orgQueryInfo.currentPage = 1
      this.queryInfo.comCode = ''
      this.queryInfo.comName = ''
    },
    dialogBackData (data) {
      this.comDialog = false
      let temp = []
      temp = data.split('-')
      this.queryInfo.comCode = temp[0]
      this.queryInfo.comName = temp[1]
    },
    changeComdialogPage1 (data) {
      this.orgQueryInfo.currentPage = data
      this.openComDialog(data)
    },
    changeComdialogPageSize1 (data) {
      this.orgQueryInfo.pageSize = data
      this.openComDialog(1)
    },
    ...mapActions([
      'contiListCheckDialogDataGet1'
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
    comDialogData () {
      let temp = this.tempTableData1
      if (!IsEmpty(temp)) {
        if (!IsEmpty(temp[0].comCode) && !IsEmpty(temp[0].comName)) {
          for (let i = 0; i < temp.length; i++) {
            temp[i]['renderData'] = `${temp[i].comCode}-${temp[i].comName}`
          }
        }
      }
      return temp
    }
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
  margin-bottom: 30px;
}
.ri-line{
  margin-top: 10px;
  margin-bottom: 10px;
}
</style>
