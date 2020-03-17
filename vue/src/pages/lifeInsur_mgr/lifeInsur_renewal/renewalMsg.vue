<template>
  <div id="riskIndex" >
    <ui-notice-bar slot="breadcast" >
      <el-breadcrumb slot="location" separator=">">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>寿险业务管理</el-breadcrumb-item>
        <el-breadcrumb-item>寿险续期保单管理</el-breadcrumb-item>
        <el-breadcrumb-item>续期短信提醒下载</el-breadcrumb-item>
      </el-breadcrumb>
    </ui-notice-bar>
    <el-form :model="info" :rules="queryrules" ref="queryForm" >
      <div class="ri-content">
        <el-row class="ri-line">
          <el-col :span="12">
            <el-form-item prop="type">
            <ui-label-text labelWidth="120" label="提醒类型:" >
              <el-select v-model="info.type" slot="text" placeholder="">
                <el-option
                  label="提示"
                  value="1">
                </el-option>
                <el-option
                  label="催缴"
                  value="2">
                </el-option>
                <el-option
                  label="宽末"
                  value="3">
                </el-option>
              </el-select>
            </ui-label-text>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row class="ri-line">
          <el-col :span="24">
          <ui-label-text labelWidth="120" label="生成日期:" >
               <div class="datestyle" slot="text">
                <el-date-picker v-model="info.createTimeBegin" type="date" placeholder="选择开始日期" value-format="yyyy-MM-dd"></el-date-picker>
                  <span class="datestyle1" labelWidth="150">至</span>
                <el-date-picker v-model="info.createTimeEnd" type="date" placeholder="选择结束日期" value-format="yyyy-MM-dd"></el-date-picker>
               </div>
            </ui-label-text>
          </el-col>
        </el-row>
        <el-row class="ri-line">
          <el-col :span="24">
            <ui-label-text labelWidth="120" label="保单生效日期:" >
               <div  class="datestyle" slot="text">
                <el-date-picker v-model="info.generateDateBegin" type="date" placeholder="选择开始日期" value-format="yyyy-MM-dd"></el-date-picker>
                  <span class="datestyle1" labelWidth="150">至</span>
                <el-date-picker v-model="info.generateDateEnd" type="date" placeholder="选择结束日期" value-format="yyyy-MM-dd"></el-date-picker>
               </div>
            </ui-label-text>
          </el-col>
        </el-row>
      </div>
    </el-form>
    <div class="btn-container" slot="controlbar" >
      <el-button type="primary" @click.native.prevent="handleDownload()">下载</el-button>
    </div>
  </div>
</template>

<script>
import NoticeBar from '@/components/notice-bar'
import LineTittle from '@/components/line-tittle'
import LabelText from '@/components/label-text'
import IsEmpty from '@/utils/IsEmpty'
import { mapActions } from 'vuex'
export default {
  name: '',
  data () {
    return {
      info: {
        type: '1',
        createTimeBegin: '',
        createTimeEnd: '',
        generateDateBegin: '',
        generateDateEnd: ''
      },
      fileList: [],
      queryrules: {
        type: [
          { required: true, message: '请选择提醒类型', trigger: 'blur' }
        ]
      }
    }
  },
  mounted () {
  },
  methods: {
    handleDownload () {
      // this.downloadMsg(this.info)
      this.$refs['queryForm'].validate((valid) => {
        if (valid) {
          // let type = ''
          if (IsEmpty(this.info.createTimeBegin)) {
            this.info.createTimeBegin = ''
          }
          if (IsEmpty(this.info.createTimeEnd)) {
            this.info.createTimeEnd = ''
          }
          if (IsEmpty(this.info.generateDateBegin)) {
            this.info.generateDateBegin = ''
          }
          if (IsEmpty(this.info.generateDateEnd)) {
            this.info.generateDateEnd = ''
          }
          window.open('/tabycore/renewalSmsInfo/downLoad?type=' + this.info.type + '&createTimeBegin=' + this.info.createTimeBegin + '&createTimeEnd=' + this.info.createTimeEnd + '&generateDateBegin=' + this.info.generateDateBegin + '&generateDateEnd=' + this.info.generateDateEnd)
        } else {
          return false
        }
      })
    },
    ...mapActions([
      // 'downloadMsg'
    ])
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
#riskIndex {
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
.el-pagination {
  text-align: right;
  margin-top: 10px;
}
</style>

<style lang="scss" type="text/css">
.risk-dialog-wrapper .lt-label, .risk-dialog-wrapper .el-form-item {
  float: left;
  margin-bottom: 2px;
}
.datestyle {
  display: inline-block;
}
</style>
