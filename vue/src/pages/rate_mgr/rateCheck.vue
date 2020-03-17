<template>
  <div id="rate-check" >
    <ui-notice-bar slot="breadcast" >
      <el-breadcrumb slot="location" separator=">">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>折标系数管理</el-breadcrumb-item>
        <el-breadcrumb-item>总公司寿险折标系数管理</el-breadcrumb-item>
      </el-breadcrumb>
    </ui-notice-bar>
    <div class="ri-content" slot="content" >
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
        <ui-label-text labelWidth="120" label="批次号:" >
          <el-input v-model="info.batchNo" slot="text" clearable></el-input>
        </ui-label-text>
        </el-col>
      </el-row>
    </div>
    <div class="btn-container" slot="controlbar" >
      <el-button type="primary" @click.native.prevent="query()">查询</el-button>
    </div>

    <!-- 表格 -->
    <div class="rate-table" v-show="isTableShow">
      <el-table
        :data="tableData"
        style="width: 100%">
        <el-table-column
          label="批次号"
          width="180">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.batchNo }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="附件"
          width="180">
          <template slot-scope="scope">
            <a @click="down(scope.row.fileId)" href="javascript:void(0)">附件</a>
          </template>
        </el-table-column>
        <el-table-column
          label="导入日期"
          width="180">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.createTime }}</span>
          </template>
        </el-table-column>
        <el-table-column label="审核">
          <template slot-scope="scope">
            <el-button
              type="primary"
              size="mini"
              @click="handleCheck(scope.$index, scope.row)">审核</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <!-- 审核弹出框 -->
    <el-dialog
      title=""
      :visible.sync="isCheckDialogShow"
      :append-to-body="true"
      width="50%"
      center>
      <div class="rate-dialog-wrapper">
        <el-form ref="form" :model="checkInfo" label-width="80px">
          <el-form-item label="审核结果">
            <el-radio-group v-model="checkInfo.verifyStatus" @change='handlehange()'>
              <el-radio label="审核通过" value="2"></el-radio>
              <el-radio label="审核不通过" value="3"></el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="审核意见">
            <el-input type="textarea" v-model="checkInfo.remark"></el-input>
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="isCheckDialogShow = false">取 消</el-button>
        <el-button type="primary" @click='check()'>审 核</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import NoticeBar from '@/components/notice-bar'
import LineTittle from '@/components/line-tittle'
import LabelText from '@/components/label-text'
import { mapActions } from 'vuex'
export default {
  name: '',
  data () {
    return {
      info: {
      },
      tableData: [],
      isTableShow: true,
      isCheckDialogShow: false,
      checkInfo: {
      }
    }
  },
  mounted () {
  },
  methods: {
    query () {
      let batchNo = this.info.batchNo ? this.info.batchNo : ''
      this.queryCheck(batchNo).then(resp => {
        if (resp.data.code === '000000') {
          resp.data.data[0].createTime = this.formatdate(resp.data.data[0].createTime)
          this.tableData = resp.data.data
        } else {
          this.tableData = []
        }
      }).catch(error => {
        return error
      })
    },
    formatdate (timestamp) {
      let result = ''
      if (isNaN(timestamp) && !isNaN(Date.parse(timestamp))) {
        result = timestamp
      } else {
        let date = new Date(timestamp)
        let year = date.getFullYear()
        let month = ('0' + (date.getMonth() + 1)).slice(-2)
        let day = ('0' + date.getDate()).slice(-2)
        result = year + '-' + month + '-' + day + ' ' + date.toTimeString().substr(0, 8)
      }
      return result
    },
    ...mapActions([
      'queryCheck',
      'checkRate'
    ]),
    down (fileId) {
      window.open('/tabycore/rate/rateDownload?fileId=' + fileId)
    },
    handleCheck (index, row) {
      this.isCheckDialogShow = true
      this.checkInfo.batchNo = row.batchNo
    },
    check () {
      if (this.checkInfo.verifyStatus) {
        if (this.checkInfo.verifyStatus === '审核通过') {
          this.checkInfo.verifyStatus = 2
        } else if (this.checkInfo.verifyStatus === '审核不通过') {
          this.checkInfo.verifyStatus = 3
        }
        this.checkRate(this.checkInfo).then(resp => {
          this.isCheckDialogShow = false
          if (resp.data.code === '000000') {
            this.$message({
              message: resp.data.msg,
              type: 'success'
            })
            this.query()
          } else {
            this.$message({
              message: resp.data.msg,
              type: 'error'
            })
          }
        }).catch(error => {
          return error
        })
      } else {
        this.$message({
          message: '请先勾选审核结果',
          type: 'error'
        })
      }
    },
    handlehange () {}
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
#rate-check {
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
