<template>
  <div id="batchHandle">
    <ui-notice-bar slot="breadcast" >
      <el-breadcrumb slot="location" separator=">">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>寿险业务管理</el-breadcrumb-item>
        <el-breadcrumb-item>寿险首期保单管理</el-breadcrumb-item>
        <el-breadcrumb-item>寿险承保数据批处理</el-breadcrumb-item>
      </el-breadcrumb>
    </ui-notice-bar>
    <div class="content">
      <el-form class="mesg_form" :model="coverData" ref="coverData" :rules="rule">
        <el-row>
          <el-form-item prop="batchDate">
            <ui-label-text :required="true" label="批处理日期：" labelWidth="100" >
              <el-date-picker slot="text" value-format="yyyy-MM-dd" v-model="coverData.batchDate" type="date" placeholder="选择日期"> </el-date-picker>
            </ui-label-text>
          </el-form-item>
        </el-row>
      </el-form>
      <el-row class="ri-line batch" >
        <el-transfer :titles="['保险公司', '保险公司']" ref="trans" v-model="coverDataList" :data="batchComData"></el-transfer>
      </el-row>
      <div class='btn-container'>
        <el-button type="primary" :disabled="!limt.query" @click.prevent="searchBatch(1)" >查询</el-button>
        <el-button type="primary" :disabled="!limt.cover" @click.prevent="queryfiveCovery"  style="width: auto; padding: 0 15px;">保险公司数据覆盖</el-button>
      </div>
      <!-- 查询结果 -->
      <el-table ref="multipleTable" :data="batchTableData" v-if='isShowTable' tooltip-effect="dark" style="width: 100%;"  >
        <el-table-column prop="companyName" label="保险公司名称" ></el-table-column>
        <el-table-column prop="createTime" label="批处理日期" ></el-table-column>
        <el-table-column prop="dealStatus" label="批处理状态"  > </el-table-column>
      </el-table>
      <!-- 查询分页 -->
      <div class="pagination" v-if='isShowTable'>
        <el-pagination @size-change="searchSizeChange" @current-change='handleCurrentChange' :current-page.sync="current" :pager-count='5' :page-size='5' :page-sizes='sizeList' :total="totalRecords" layout="total, sizes, prev, pager, next, jumper" :page-count="totalPages"></el-pagination>
      </div>
    </div>
    <!-- 导入提示 -->
    <el-dialog title="提示" center :append-to-body='true' :visible.sync="isTip" width="30%" >
      <p style="text-align: center; ">提交批处理完成！请等待结果！</p>
      <span slot="footer" class="dialog-footer">
        <el-button @click="isTip = false">取 消</el-button>
        <el-button type="primary" @click="tipTrue">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import NoticeBar from '@/components/notice-bar'
import LabelText from '@/components/label-text'
import LineTittle from '@/components/line-tittle'
import { getUserId } from '@/utils/cookie'
import { mapActions } from 'vuex'
export default {
  name: '',
  data () {
    return {
      postData: {},
      coverData: {
        batchDate: ''
      },
      rule: {
        batchDate: [
          { required: true, message: '请输入批处理日期', trigger: 'change' }
        ]
      },
      coverDataList: [],
      batchComData: [],
      current: 1, // 当前页
      totalRecords: 0, // 总条数
      totalPages: 0, // 总页数
      batchTableData: [], // 查询批处理结果
      isShowTable: false, // 是否显示查询结果
      loading: '',
      isTip: false,
      timer: '',
      toastMessage: '',
      limt: {
        query: false,
        cover: false
      },
      sizeList: [5, 10, 20, 50],
      pageSize: 5
    }
  },
  mounted () {
    this.$nextTick(function () {
      // 初始化数据
      this.searchNeedBatch()
      this.getBtnLimt()
    })
  },
  watch: {
  },
  methods: {
    getBtnLimt () { // 按钮权限
      let userId = getUserId()
      if (userId === null || userId === undefined) {
        userId = ''
      }
      let post = {
        'userId': userId,
        'page': '寿险承保数据批处理'
      }
      this.getBtnLimt_batch(post).then(resp => {
        if (resp.code === '000000') {
          resp.data.forEach((item, index) => {
            this.limt[item.code] = item.checked
          })
        }
      })
    },
    searchBatch (page) { // 查询
      this.postData.currentPage = page
      this.postData.pageSize = this.pageSize
      this.current = page
      this.Loading()
      this.queryBatch(this.postData).then(resp => {
        this.closeLoading()
        this.batchTableData = resp.data
        this.totalRecords = resp.totalRecords
        this.totalPages = resp.totalPages
      }).catch(() => {
        this.open('error', '系统错误，请刷新重试！')
        this.closeLoading()
      })
      this.isShowTable = true
    },
    handleCurrentChange (val) {
      this.current = val
      this.searchBatch(val)
    },
    searchSizeChange (val) {
      this.pageSize = val
      this.searchBatch(1)
    },
    searchNeedBatch () { // 查询批处理公司
      this.batchComData = []
      this.coverDataList = []
      this.queryNeedForBatch({}).then(resp => {
        const dataTrans = []
        resp.forEach((asset, index) => {
          dataTrans.push({
            label: asset.companyCode + '-' + asset.companyName,
            key: asset.companyCode + '-' + asset.companyName,
            index: index
          })
        })
        this.batchComData = dataTrans
      })
    },
    queryfiveCovery () { // 提交批处理覆盖数据
      let listData = []
      if (this.toastMessage) {
        this.toastMessage.close()
      }
      if (this.coverDataList.length > 0) {
        this.coverDataList.forEach((item, index) => {
          item = item.split('-')
          listData.push({
            companyCode: item[0],
            companyName: item[1]
          })
        })
      } else {
        this.open('error', '请选择一家保险公司！')
        return false
      }
      let postdata = {
        list: listData,
        batchDate: this.coverData.batchDate
      }
      this.$refs['coverData'].validate((valid) => {
        if (valid) {
          this.Loading()
          let _this = this
          this.timer = setTimeout(function () {
            _this.closeLoading()
          }, 500)
          this.$confirm('提交批处理完成！请等待结果！', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            this.fiveCovery(postdata).then(resp => {
              if (resp.code === '000000') {
              } else {
                this.open('error', resp.msg, 0)
              }
            }).catch(() => {
              this.closeLoading()
            })
            clearTimeout(this.timer)
            this.timer = setTimeout(function () {
              _this.searchNeedBatch()
            }, 500)
          }).catch(() => {
            this.fiveCovery(postdata).then(resp => {
              if (resp.code === '000000') {
              } else {
                this.open('error', resp.msg, 0)
              }
            }).catch(() => {
              this.closeLoading()
            })
            clearTimeout(this.timer)
            this.timer = setTimeout(function () {
              _this.searchNeedBatch()
            }, 1000)
          })
        } else {
          return false
        }
      })
    },
    tipTrue () {
      window.location.reload()
    },
    open (type, mesg, time = 3000) {
      this.toastMessage = this.$message({
        showClose: true,
        message: mesg,
        type: type,
        duration: time
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
      'queryBatch',
      'queryNeedForBatch',
      'fiveCovery',
      'getBtnLimt_batch'
    ])
  },
  components: {
    [NoticeBar.name]: NoticeBar,
    [LabelText.name]: LabelText,
    [LineTittle.name]: LineTittle
  },
  created () {
  }
}
</script>

<style lang="scss" scoped type="text/css">
  #batchHandle{
    padding: 0px 30px 30px 30px;
  }
  .content { margin-top: 20px; }
  .ri-line { margin-bottom: 10px; }
  .selectItem { margin-top: 20px; }
  .checkBtn { margin: 20px 0; text-align: center; }
</style>
<style>
  .btn-container { margin: 30px 0; text-align: center; }
  .pagination {
    text-align: right;
    margin: 20px auto;
  }
  .batch .el-button { width: inherit; height: inherit; line-height: inherit; font-size: inherit; padding: 10px; }
  .el-input__icon { line-height: inherit;}
  .mesg_form .required:before{
    font-size: 14px!important;
    top: 3px !important;
  }
  #batchHandle .el-transfer-panel { width: 300px; }
  .mesg_form .el-form-item__error { left: 110px;}
</style>

