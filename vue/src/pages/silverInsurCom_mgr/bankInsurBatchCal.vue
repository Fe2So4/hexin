<template>
  <div id="orgadd" >
      <ui-notice-bar slot="breadcast" >
        <el-breadcrumb slot="location" separator=">">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>银保代理佣金管理</el-breadcrumb-item>
            <el-breadcrumb-item>银代佣金结算跑批</el-breadcrumb-item>
          </el-breadcrumb>
      </ui-notice-bar>
      <div class="ri-content" slot="content">
        <el-form ref="queryInfo" :model="queryInfo" :rules="rules">
          <el-row class="ri-line">
            <el-col :span="8">
              <el-form-item prop='month'>
                <ui-label-text labelWidth="120" label="业绩归属月份：" :required="true">
                  <el-date-picker
                      v-model="queryInfo.month"
                      type="month"
                      slot="text"
                      value-format="yyyy-MM"
                    >
                  </el-date-picker>
                </ui-label-text>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item prop='comCode'>
                <ui-label-text labelWidth="120" label="机构代码：" >
                  <el-input v-model="queryInfo.comCode" slot="text" placeholder="双击可选择" clearable @dblclick.native="openComDialog(1)"></el-input>
                </ui-label-text>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item prop='comCName'>
                <ui-label-text labelWidth="120" label="机构名称：" >
                  <el-input v-model="queryInfo.comCName" slot="text" placeholder="双击可选择" clearable @dblclick.native="openComDialog(1)"></el-input>
                </ui-label-text>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
      <div class="btn-container" slot="controlbar" >
        <el-button type="primary" @click.native.prevent="submitForm('queryInfo')">执行批处理</el-button>
      </div>
     <ComDialog :vis='comDialog' :workerVis='comDialogworker' :comVis='comDialogCom' :newTableData='tempTableData' @onClose='comDialogClosing(0)' @selectDialog='dialogBackData' @comdialogChangePageFunction='changeComdialogPage0' @comdialogChangePageSizeFunction='changeComdialogPageSize0' :fenyetotal='fenyetotalData'/>
  </div>
</template>

<script>
import replaceStr from '@/utils/myFunction'
import NoticeBar from '@/components/notice-bar'
import LineTittle from '@/components/line-tittle'
import LabelText from '@/components/label-text'
import IsEmpty from '@/utils/IsEmpty'
import { mapActions } from 'vuex'
import {
  api
} from '@/api/lifeInsur_mgr/quitListMgr.js'
import ComDialog from '@/components/comDialog'
export default {
  name: '',
  data () {
    return {
      tempTableData: [],
      comDialog: false,
      comDialogworker: false,
      comDialogCom: false,
      fenyetotalData: 0,
      loading: '',
      toastMessage: '',
      rules: {
        month: [
          { required: true, message: '请输入业绩归属月份', trigger: 'change' }
        ]
      },
      queryInfo: {
        comCode: '',
        comCName: '',
        month: ''
      },
      orgQueryInfo: {
        clickType: '2',
        comCodeOrName: '',
        currentPage: 1,
        pageSize: 10
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
          this.queryData1()
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
    queryData1 () {
      this.Loading()
      if (this.toastMessage) {
        this.toastMessage.close()
      }
      api('/salaryCommissionBank/saveSalaryBatch', 'post', this.queryInfo).then((res) => {
        this.closeLoading()
        if (res.data.code !== '000000' && !IsEmpty(res.data.code)) {
          this.openToast('warning', res.data.msg, 0)
        } else {
          this.openToast('success', res.data.msg, 0)
        }
      })
    },
    changeComdialogPage0 (data) {
      this.orgQueryInfo.currentPage = data
      this.openComDialog(data)
    },
    changeComdialogPageSize0 (data) {
      this.orgQueryInfo.pageSize = data
      this.openComDialog(1)
    },
    opensingleComDialog (index) {
      if (!(this.comDialog)) {
        if (!IsEmpty(this.queryInfo.comCode)) {
          this.orgQueryInfo.comCodeOrName = this.queryInfo.comCode
        } else if (!IsEmpty(this.queryInfo.comCName)) {
          this.orgQueryInfo.comCodeOrName = this.queryInfo.comCName
        } else {
          this.orgQueryInfo.comCodeOrName = ''
        }
        this.orgQueryInfo.clickType = '1'
        this.contiListCheckDialogDataGet1(this.orgQueryInfo).then(
          (res) => {
            console.log(res)
            if (res.data.code !== '000000' && !IsEmpty(res.data.code)) {
              this.openToast('warning', res.data.msg)
            } else {
              if (res.data.data.data.length === 1) {
                for (let i = 0; i < res.data.data.data.length; i++) {
                  res.data.data.data[i].comCName = replaceStr(res.data.data.data[i].comCName)
                }
                this.queryInfo.comCode = res.data.data.data[0].comCode
                this.queryInfo.comCName = res.data.data.data[0].comCName
              }
            }
          }
        )
      }
    },
    openComDialog (page) {
      if (!IsEmpty(this.queryInfo.comCode)) {
        this.orgQueryInfo.comCodeOrName = this.queryInfo.comCode
      } else if (!IsEmpty(this.queryInfo.comName)) {
        this.orgQueryInfo.comCodeOrName = this.queryInfo.comName
      } else {
        this.orgQueryInfo.comCodeOrName = ''
      }
      this.orgQueryInfo.currentPage = page
      this.contiListCheckDialogDataGet1(this.orgQueryInfo).then(
        (res) => {
          console.log(res)
          if (res.data.code !== '000000' && !IsEmpty(res.data.code)) {
            this.openToast('warning', res.data.msg)
          } else {
            for (let i = 0; i < res.data.data.data.length; i++) {
              res.data.data.data[i].comCName = replaceStr(res.data.data.data[i].comCName)
            }
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
    comDialogClosing () {
      this.comDialog = false
      this.queryInfo.comCode = ''
      this.queryInfo.comCName = ''
    },
    dialogBackData (data) {
      this.comDialog = false
      let temp = []
      temp = data.split('-')
      this.queryInfo.comCode = temp[0]
      this.queryInfo.comCName = temp[1]
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
    // comDialogData () {
    //   let temp = this.$store.state.commissionConfig.commissionConfigdblComData3
    //   if (!IsEmpty(temp)) {
    //     if (!IsEmpty(temp[0].comCode) && !IsEmpty(temp[0].comCName)) {
    //       for (let i = 0; i < temp.length; i++) {
    //         temp[i]['renderData'] = `${temp[i].comCode}-${temp[i].comCName}`
    //       }
    //     }
    //   }
    //   return temp
    // }
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
