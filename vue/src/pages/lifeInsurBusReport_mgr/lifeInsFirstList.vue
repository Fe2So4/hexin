<template>
  <div id="advance-index" >
    <ui-notice-bar slot="breadcast" >
      <el-breadcrumb slot="location" separator=">">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>寿险业务报表管理</el-breadcrumb-item>
        <el-breadcrumb-item>寿险导入承保清单</el-breadcrumb-item>
      </el-breadcrumb>
    </ui-notice-bar>
    <el-form class="mesg_form" style="margin-top: 20px; ">
      <el-row>
        <el-col :span="12">
          <el-form-item>
            <ui-label-text labelWidth="150" label="省级分公司代码:" >
              <el-input v-model="info.insurerCode" slot="text" placeholder="双击选择" clearable  @dblclick.native="dbqueryCom"></el-input>
            </ui-label-text>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item>
            <ui-label-text labelWidth="150" label="省级分公司名称:" >
              <el-input v-model="info.insurerCode" slot="text" placeholder="双击选择" clearable  @dblclick.native="dbqueryCom"></el-input>
            </ui-label-text>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item>
            <ui-label-text labelWidth="150" label="地市级分公司代码:" >
              <el-input v-model="info.insurerCode" slot="text" placeholder="双击选择" clearable  @dblclick.native="dbqueryCom"></el-input>
            </ui-label-text>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item>
            <ui-label-text labelWidth="150" label="地市级分公司名称:" >
              <el-input v-model="info.insurerCode" slot="text" placeholder="双击选择" clearable  @dblclick.native="dbqueryCom"></el-input>
            </ui-label-text>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item>
            <ui-label-text labelWidth="150" label="产品所属保险公司代码:" >
              <el-input v-model="info.insurerCode" slot="text" placeholder="双击选择" clearable  @dblclick.native="dbqueryCom"></el-input>
            </ui-label-text>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item>
            <ui-label-text labelWidth="150" label="产品所属保险公司名称:" >
              <el-input v-model="info.insurerName" slot="text" placeholder="双击选择" clearable @dblclick.native="dbqueryCom"></el-input>
            </ui-label-text>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item prop="insurerDate">
            <ui-label-text labelWidth="150" label="保单承保日期：">
              <el-date-picker slot="text" style="width: 56%;" v-model="info.insurerDate" type="daterange" value-format="yyyy-MM-dd" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期">
              </el-date-picker>
            </ui-label-text>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item>
            <ui-label-text labelWidth="150" label="缴费年期:" >
              <el-input v-model="info.insurerCode" slot="text" clearable ></el-input>
            </ui-label-text>
          </el-form-item>
        </el-col>
      </el-row>
      <div class="btn-container">
        <el-button type="primary" @click="query(info)">查询</el-button>
        <el-button type="primary" @click="onexport">导出</el-button>
      </div>
    </el-form>
    <!-- 表格 -->
    <div class="rate-table" v-show="isTableShow">
      <el-table stripe :data="tableData" style="width: 100%">
        <el-table-column prop="orgCode" label="月份" width="120"></el-table-column>
        <el-table-column prop="orgName" label="保单回录日期" width="120" ></el-table-column>
        <el-table-column prop="insurerName" label="投保日期" width="120" ></el-table-column>
        <el-table-column prop="insurerType" label="承保日期" width="120" ></el-table-column>
        <el-table-column prop="validStatus" label="生效日期" width="120"></el-table-column>
        <el-table-column prop="checkStatus" label="回执签收日期" width="120" ></el-table-column>
        <el-table-column prop="checkType" label="回执到期日期" width="120" ></el-table-column>
        <el-table-column prop="checkType" label="犹豫期撤保日期" width="120" ></el-table-column>
        <el-table-column prop="checkType" label="保单状态" width="120" ></el-table-column>
        <el-table-column prop="checkType" label="投保单号" width="120" ></el-table-column>
        <el-table-column prop="checkType" label="保单号" width="120" ></el-table-column>
        <el-table-column prop="checkType" label="省级分公司代码" width="120" ></el-table-column>
        <el-table-column prop="checkType" label="地市级分公司代码" width="120" ></el-table-column>
        <el-table-column prop="checkType" label="地市级分公司名称" width="120" ></el-table-column>
        <el-table-column prop="checkType" label="产品所属寿险公司" width="120" ></el-table-column>
        <el-table-column prop="checkType" label="险种名称" width="120" ></el-table-column>
        <el-table-column prop="checkType" label="投保人姓名" width="120" ></el-table-column>
        <el-table-column prop="checkType" label="被保险人姓名" width="120" ></el-table-column>
        <el-table-column prop="checkType" label="缴费年期" width="120" ></el-table-column>
        <el-table-column prop="checkType" label="保障年期" width="120" ></el-table-column>
        <el-table-column prop="checkType" label="保额" width="120" ></el-table-column>
        <el-table-column prop="checkType" label="规模保费（元）" width="120" ></el-table-column>
        <el-table-column prop="checkType" label="标准保费（元）" width="120" ></el-table-column>
        <el-table-column prop="checkType" label="主险/附加险" width="120" ></el-table-column>
        <el-table-column prop="checkType" label="业务员姓名" width="120" ></el-table-column>
        <el-table-column prop="checkType" label="业务员代码" width="120" ></el-table-column>
        <el-table-column prop="checkType" label="归属机构代码" width="120" ></el-table-column>
        <el-table-column prop="checkType" label="归属机构名称" width="120" ></el-table-column>
        <el-table-column prop="checkType" label="险种大类" width="120" ></el-table-column>
        <el-table-column prop="checkType" label="险种中类" width="120" ></el-table-column>
        <el-table-column prop="checkType" label="险种小类" width="120" ></el-table-column>
        <el-table-column prop="checkType" label="系统录入日期" width="120" ></el-table-column>
        <el-table-column prop="checkType" label="系统审核通过日期" width="120" ></el-table-column>
        <el-table-column prop="checkType" label="介绍人类型" width="120" ></el-table-column>
        <el-table-column prop="checkType" label="介绍人代码" width="120" ></el-table-column>
        <el-table-column prop="checkType" label="介绍人姓名" width="120" ></el-table-column>
      </el-table>
    </div>
    <!-- <el-dialog
      title="请选择"
      append-to-body
      center
      :visible.sync="dialogVisible"
      width="30%"
      >
      <div class="rate-table" v-show="isTableShow">
        <el-table
          :data="tableData"
          highlight-current-row
          @row-click="onselectColumn"
          style="width: 100%">
            <el-table-column
              v-for="(item, index) in dialogColumnList"
              :key="index"
              :label="item.label"
              :prop="item.prop"
              >
            </el-table-column>
        </el-table>
        <el-pagination
          v-show="tablePage.total!=0"
          @current-change="handleCurrentChange"
          :current-page="tablePage.currentPage"
          :page-size="tablePage.size"
          layout="total, prev, pager, next, jumper"
          :total="tablePage.total">
        </el-pagination>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="onconfirmSelect">确 定</el-button>
      </span>
    </el-dialog> -->
  </div>
</template>

<script>
import NoticeBar from '@/components/notice-bar'
import LineTittle from '@/components/line-tittle'
import LabelText from '@/components/label-text'
import RateUpload from '@/pages/rate_mgr/rateUpload'
import { mapActions } from 'vuex'
export default {
  name: '',
  data () {
    return {
      info: {},
      isTableShow: true,
      tableData: []
    }
  },
  mounted () {
  },
  methods: {
    ...mapActions([
      'queryRate',
      'exportRate'
    ]),
    query () {
      this.getVaildateForm()
    },
    getVaildateForm () {
      this.$refs['queryForm'].validate((valid) => {
        if (valid) {
          console.log(this.info)
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    handleCurrentChange (val) {
      this.tablePage.currentPage = val
      this.query()
    },
    dbqueryCom () {
      this.dialogVisible = true
    },
    onselectColumn (row) {
      this.selectColumn = row
    },
    onconfirmSelect () {
      this.info.insurerCode = this.selectColumn.name
      this.info.insurerName = this.selectColumn.code
      this.dialogVisible = false
    },
    onexport () {
      this.$confirm('此过程可能比较缓慢，导出过程中请勿关闭浏览器, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$message({
          type: 'success',
          message: `即将下载${this.Rvalue}的继续率调用系数`
        })
        this.exp()
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消下载'
        })
      })
    },
    exp () {
      this.expData.insurerCode = this.info.insurerCode ? this.info.insurerCode : ''
      this.expData.riskCode = this.info.riskCode ? this.info.riskCode : ''
      this.expData.period = this.info.period ? this.info.period : ''
      window.open('/tabycore/rate/exportExcel?insurerCode=' + this.expData.insurerCode + '&riskCode=' + this.expData.riskCode + '&period=' + this.expData.period)
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
  computed: {
    resultNum () {
      return this.num
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
  #advance-index {
    padding: 0px 30px 30px 30px;
  }
  .rate-wrapper {
    width: 300px;
    margin: 20px auto;
  }
  .btn-container{
    text-align: center;
    margin-top: 30px;
  }
  .ri-line{
    margin-top: 10px;
    margin-bottom: 10px;
  }
 .mesg_form {
    margin: 20px 0 ;
  }
</style>
<style>
  .mesg_form .required:before{
    font-size: 14px!important;
    top: 3px !important;
  }
</style>

