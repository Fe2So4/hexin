<template>
  <div id="proCommissionSet" >
    <ui-notice-bar slot="breadcast" >
      <el-breadcrumb slot="location" separator=">">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>产品、佣金率管理</el-breadcrumb-item>
          <el-breadcrumb-item>产险佣金率配置</el-breadcrumb-item>
        </el-breadcrumb>
    </ui-notice-bar>
    <el-form class="manage_form">
      <el-row>
        <el-col :span="12">
          <el-form-item>
            <ui-label-text label="佰盈机构代码：" labelWidth="120" >
              <el-input slot="text" clearable v-model="searchData.comCode" @dblclick.native="getOrg(1, 0, $event)" @blur="blurOrg($event, 0)"  placeholder="双击选择" ></el-input>
            </ui-label-text>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item >
            <ui-label-text label="佰盈机构名称：" labelWidth="120" >
              <el-input slot="text" clearable v-model="searchData.comName" @dblclick.native="getOrg(1, 0, $event)" placeholder="双击选择" @blur="blurOrg($event, 0)" ></el-input>
            </ui-label-text>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <div class='btn-container'>
      <el-button type="primary" @click.native.prevent="searchResult(1)" :disabled="quanxian.query">查询</el-button>
      <el-button type="primary" @click.native.prevent="addModifyBtn('add')" :disabled="quanxian.add">新增</el-button>
      <el-button type="primary" @click.native.prevent="addModifyBtn('modify')" :disabled="quanxian.modify">修改</el-button>
      <el-button type="danger"  @click.native.prevent="deleteBtn" :disabled="quanxian.del">删除</el-button>
      <el-button type="primary"  @click.native.prevent="importBtn" :disabled="quanxian.import">导入</el-button>
      <el-button type="primary"  @click.native.prevent="onexport" :disabled="quanxian.export">导出</el-button>
    </div>
    <!-- 查询结果 -->
    <el-table ref="multipleTable" :data="seachResultData" v-if='isShowTable' tooltip-effect="dark" style="width: 100%;" @selection-change="handleSelectionChange" >
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column prop="comCode" label="佰盈机构代码" ></el-table-column>
      <el-table-column prop="comName" label="佰盈机构名称"  > </el-table-column>
      <el-table-column prop="commissionRate" label="佣金率（%）"  > </el-table-column>
      <el-table-column prop="assessmentCommissionRate" label="考核佣金率（%）"  > </el-table-column>
    </el-table>
    <!-- 查询分页 -->
    <div class="pagination" v-if='isShowTable'>
      <el-pagination @size-change="searchSizeChange" @current-change='handleCurrentChange' :current-page.sync="current" :pager-count='5' :page-size='5' :page-sizes='[5, 10, 20, 50]' :total="totalRecords" layout="total, sizes, prev, pager, next, jumper" :page-count="totalPages"></el-pagination>
    </div>
    <!-- 新增机构 -->
    <el-dialog :append-to-body='true' :before-close="cleanContent" center width='70%' :title="title"  :visible.sync="isShowDialog" >
      <el-form class="mesg_form add_form" :rules="rules" :model="conditions" ref="conditions">
        <ui-line-tittle :collapsible="true" >
          <span slot="title" >
              <i class="font_family icon-jy-menu-4" ></i>{{title}}
          </span>
          <div class="ri-content" slot="content" >
            <el-row>
              <el-col :span="12">
                <el-form-item prop="comCode">
                  <ui-label-text labelWidth="130" :required="true" label="佰盈机构代码:" >
                    <el-input clearable @blur='blurOrg($event, 1)' placeholder="双击可选择" v-model="conditions.comCode" :disabled="!isDis"  @dblclick.native="getOrg(1, 1, $event)&&isDis" slot="text" ></el-input>
                  </ui-label-text>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item prop="comName">
                  <ui-label-text :required="true" labelWidth="130" label="佰盈机构名称:">
                    <el-input clearable @blur='blurOrg($event, 1)' placeholder="双击可选择" v-model="conditions.comName" :disabled="!isDis" @dblclick.native="getOrg(1, 1, $event)&&isDis" slot="text" ></el-input>
                  </ui-label-text>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item prop="commissionRate">
                  <ui-label-text labelWidth="130" :required="true" label="佣金率（%）:" >
                   <el-input clearable v-model="conditions.commissionRate"   slot="text" ></el-input>
                  </ui-label-text>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item prop="assessmentCommissionRate">
                  <ui-label-text labelWidth="130" :required="true" label="考核佣金率（%）:" >
                   <el-input clearable v-model="conditions.assessmentCommissionRate"   slot="text" ></el-input>
                  </ui-label-text>
                </el-form-item>
              </el-col>
            </el-row>
          </div>
        </ui-line-tittle>
      </el-form>
      <div class="operationBtn" >
          <el-button type="primary" @click.native.prevent="put()">提交</el-button>
      </div>
    </el-dialog>
    <!-- 导入弹框 -->
    <el-dialog :append-to-body='true' center width='55%' title="导入"  :visible.sync="isImport" :before-close='importDialogClose'>
      <!-- <div class="download">

        <a @click="downTemp()" href="javascript:void(0)" download>导入模板下载</a>
      </div> -->
      <div class="upLoad">
        <el-upload class="upload-demo" ref="upload" :data="postFile" :action="uploadUrl()" :limit="1" accept='xls' :on-success="handleEXLSuccess" :file-list="fileList" :auto-upload="false">
          <el-button  slot="trigger" size="small" type="primary">选取文件</el-button>
          <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload" >上传文件</el-button>
          <el-button type="primary" style="margin-left: 20px; "  @click.native.prevent="downTemp()">导入模板下载</el-button>
          <el-button type="primary" style="margin-left: 20px; "  @click.native.prevent="downBaiying()">佰盈信息下载</el-button>
          <!-- <el-button size="small" style="text-align: center; " type="primary">点击上传</el-button> -->
        </el-upload>
      </div>
    </el-dialog>
    <!-- 获取佰盈机构 -->
    <el-dialog :before-close='closeOrg' :append-to-body='true' :visible.sync="org_dialog" width="50%" center>
      <el-table stripe @row-click='selectRowOrg' ref="multipleTable" :data="searchOrgTableData" >
        <el-table-column prop="comCode" label="公司代码" center ></el-table-column>
        <el-table-column prop="comCName" label="公司名称" center ></el-table-column>
      </el-table>
      <div class="pagination" >
        <el-pagination @size-change="orgSizeChange" @current-change='orgCurrentChange' :current-page.sync="currentD" :pager-count='5' :page-size='5' :page-sizes='sizeListOrg'  :total="totalRecordsD" layout="total, sizes, prev, pager, next, jumper" > </el-pagination>
      </div>
    </el-dialog>
    <!-- 删除提示 -->
    <el-dialog title="提示" center :append-to-body='true' :visible.sync="isDelete" width="30%" >
      <p style="text-align: center; ">确定删除？</p>
      <span slot="footer" class="dialog-footer">
        <el-button @click="isDelete = false">取 消</el-button>
        <el-button type="primary" @click="deleteTrue">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import NoticeBar from '@/components/notice-bar'
import LineTittle from '@/components/line-tittle'
import LabelText from '@/components/label-text'
import { mapActions } from 'vuex'
import IsEmpty from '@/utils/IsEmpty'
import { api } from '@/api/lifeInsur_mgr/quitListMgr.js'
export default {
  name: '',
  data () {
    const inputlimtFirst = (rule, value, callback) => {
      var reg = /^[0-9]+([.]{1}[0-9]+){0,1}$/
      if (reg.test(value)) {
        if (this.conditions.commissionRate < 0) {
          callback(new Error('佣金率低于下线0%，请重新录入！'))
        } else if (this.conditions.commissionRate > 70) {
          callback(new Error('佣金率超过上限70%，请重新录入！'))
        } else {
          callback()
        }
      } else {
        callback(new Error('请输入数字！'))
      }
    }
    const inputlimtSecond = (rule, value, callback) => {
      var reg = /^[0-9]+([.]{1}[0-9]+){0,1}$/
      if (reg.test(value)) {
        if (this.conditions.assessmentCommissionRate < 0) {
          callback(new Error('考核佣金率低于下线0%，请重新录入！'))
        } else if (this.conditions.assessmentCommissionRate > 20) {
          callback(new Error('考核佣金率超过上限20%，请重新录入！'))
        } else {
          callback()
        }
      } else {
        callback(new Error('请输入数字！'))
      }
    }
    return {
      loading: '',
      searchData: {
        comCode: '',
        comName: ''
      },
      postList: {},
      current: 1,
      pageSize: 5,
      totalPages: 0,
      totalRecords: 0,
      seachResultData: [],
      selectData: [],
      isShowTable: false,
      comCodeOrName: '',
      isShowDialog: false,
      title: '',
      addModType: '',
      conditions: {
        comCode: '',
        comName: '',
        commissionRate: '',
        assessmentCommissionRate: ''
      },
      quanxian: {
        query: true,
        import: true,
        export: true,
        add: true,
        modify: true,
        del: true
      },
      id: '',
      isDis: true,
      rules: {
        comCode: [
          { required: true, message: '请输入佰盈机构代码', trigger: 'change' }
        ],
        comName: [
          { required: true, message: '请输入佰盈机构名称', trigger: 'change' }
        ],
        commissionRate: [
          { required: true, message: '请输入佣金率', trigger: 'change' },
          { validator: inputlimtFirst, trigger: 'blur' }
        ],
        assessmentCommissionRate: [
          { required: true, message: '请输入考核佣金率', trigger: 'change' },
          { validator: inputlimtSecond, trigger: 'blur' }
        ]
      },
      isImport: false,
      fileList: [],
      org_dialog: false,
      type: '',
      _event: '',
      searchOrgTableData: [],
      sizeListOrg: [],
      currentD: 1,
      pageSizeD: 5,
      totalPagesD: 0,
      totalRecordsD: 0,
      isDelete: false,
      deleteItem: [],
      postFile: {}
    }
  },
  mounted () {
    api(
      `/auth/findButtonByUserCodeAndPage?userId=${
        this.$store.state.login.loginUserId
      }&page=产险佣金率配置`,
      'get'
    )
      .then(result => {
        console.log(result)
        if (result.data.code === '000000') {
          for (let i = 0; i < result.data.data.length; i++) {
            this.quanxian[result.data.data[i].code] = false
          }
        }
      })
      .catch(e => {
        console.log(e)
      })
  },
  methods: {
    searchResult (page) { // 查询
      this.current = page
      this.searchData.currentPage = page
      this.searchData.pageSize = this.pageSize
      this.postList = JSON.parse(JSON.stringify(this.searchData))
      this.searchPost(this.searchData)
      this.Loading()
    },
    searchPost (data) {
      // this.sizeList = [5, 10, 20, 50]
      this.querySalarys(data).then(resp => {
        this.closeLoading()
        if (resp.code === '000000') {
          this.isShowTable = true
          this.seachResultData = resp.data.content
          this.totalRecords = resp.data.totalElements
        } else {
          this.open('error', resp.msg)
        }
      })
    },
    searchSizeChange (val) {
      this.pageSize = val
      this.current = 1
      this.postList.currentPage = 1
      this.postList.pageSize = val
      this.searchPost(this.postList)
    },
    handleCurrentChange (val) {
      this.current = val
      this.postList.currentPage = val
      this.searchPost(this.postList)
    },
    handleSelectionChange (row) {
      this.selectData = JSON.parse(JSON.stringify(row))
      console.log(this.selectData)
    },
    blurOrg (event, type) { // 判断机构是否存在
      if (event.target.value === '' || this.org_dialog) {
        return false
      }
      var dataOrg = {
        'comCodeOrName': event.target.value,
        'currentPage': '1',
        'pageSize': '5',
        'clickType': '1'
      }
      this.getAllOrg_ProCom(dataOrg).then(resp => {
        if (resp.code === '000000') {
          if (type === 0) {
            this.searchData.comCode = resp.data.data[0].comCode
            this.searchData.comName = resp.data.data[0].comCName
          } else {
            this.conditions.comCode = resp.data.data[0].comCode
            this.conditions.comName = resp.data.data[0].comCName
          }
        } else {
          if (type === 0) {
            this.searchData.comCode = ''
            this.searchData.comName = ''
          } else {
            this.conditions.comCode = ''
            this.conditions.comName = ''
          }
          this.open('error', resp.msg)
        }
      })
    },
    downBaiying () {
      window.open(`/tabycore/salaryCommissionProduct/exportComCodeExcel?comCode=${this.searchData.comCode}&comName=${this.searchData.comName}`)
    },
    getOrg (page, type, event) { // 获取佰盈机构
      this._event = event
      this.comCodeOrName = event.target.value
      this.sizeListOrg = [5, 10, 20, 50]
      this.type = type
      this.currentD = page
      var postData = {
        clickType: '2',
        comCodeOrName: this.comCodeOrName,
        currentPage: page,
        pageSize: this.pageSizeD
      }
      this.getAllOrg_ProCom(postData).then(resp => {
        if (resp.code === '000000') {
          this.searchOrgTableData = resp.data.data
          this.totalRecordsD = resp.data.totalRecords
          this.org_dialog = true
        } else {
          this.open('error', resp.msg)
        }
      })
    },
    closeOrg () {
      this.sizeListOrg = []
      this.pageSizeD = 5
      this.org_dialog = false
    },
    selectRowOrg (row) { // 公司选择
      this.closeDailog().then(() => {
        row = JSON.parse(JSON.stringify(row))
        if (this.type === 0) {
          this.searchData.comCode = row.comCode
          this.searchData.comName = row.comCName
        } else {
          this.conditions.comCode = row.comCode
          this.conditions.comName = row.comCName
        }
        this.org_dialog = false
      })
    },
    orgCurrentChange (val) { // 选择分页
      this.getOrg(val, this.type, this._event)
    },
    orgSizeChange (val) {
      this.pageSizeD = val
      this.getOrg(1, this.type, this._event)
    },
    closeDailog () {
      return new Promise((resolve, reject) => {
        this.pageSizeD = 5
        this.sizeListOrg = []
        this.org_dialog = false
        resolve()
      })
    },
    importDialogClose () {
      this.isImport = false
      this.fileList = []
    },
    addModifyBtn (type) { // 新增修改
      this.addModType = type
      if (type === 'add') { // 新增
        this.title = '新增配置'
        this.conditions = {
          comCode: '',
          comName: '',
          commissionRate: '',
          assessmentCommissionRate: ''
        }
        this.isShowDialog = true
        this.isDis = true
      } else { // 修改
        this.title = '修改配置'
        if (this.selectData.length === 0) {
          this.open('error', '请勾选一条数据！')
        } else if (this.selectData.length > 1) {
          this.open('error', '只能修改一条数据！')
        } else {
          this.isShowDialog = true
          this.id = this.selectData[0].id
          var post = {
            id: this.id
          }
          this.querySalaryDetail(post).then(resp => {
            if (resp.code === '000000') {
              this.conditions = {
                comCode: resp.data.comCode,
                comName: resp.data.comName,
                commissionRate: resp.data.commissionRate,
                assessmentCommissionRate: resp.data.assessmentCommissionRate
              }
              this.isDis = false
            } else {
              this.open('error', resp.msg)
            }
          })
        }
      }
    },
    put () {
      this.$refs['conditions'].validate(valid => {
        if (valid) {
          this.Loading()
          if (this.addModType === 'add') {
            this.addSalary(this.conditions).then(resp => {
              this.closeLoading()
              if (resp.code === '000000') {
                this.open('success', '添加成功')
                this.isShowDialog = false
                this.cleanContent()
              } else {
                this.open('error', resp.msg)
              }
            }).catch(() => {
              this.open('error', '系统错误，请刷新重试！')
              this.closeLoading()
            })
          } else {
            this.conditions.id = this.id
            this.modSalary(this.conditions).then(resp => {
              this.closeLoading()
              if (resp.code === '000000') {
                this.open('success', '修改成功')
                this.isShowDialog = false
                this.cleanContent()
              } else {
                this.open('error', resp.msg)
              }
            }).catch(() => {
              this.open('error', '系统错误，请刷新重试！')
              this.closeLoading()
            })
          }
        } else {
          return false
        }
      })
    },
    cleanContent () {
      this.$refs['conditions'].resetFields()
      this.isShowDialog = false
    },
    deleteBtn () {
      if (this.selectData.length < 0) {
        this.open('error', '请勾选一条数据！')
      } else {
        this.isDelete = true
        this.deleteItem = []
        this.selectData.forEach((item, index) => {
          this.deleteItem.push(item.id)
        })
      }
    },
    deleteTrue () {
      var post = {
        'ids': this.deleteItem
      }
      this.Loading()
      this.delSalary(post).then(resp => {
        this.closeLoading()
        if (resp.code === '000000') {
          this.open('success', '删除成功！')
          this.deleteItem = []
          this.isDelete = false
          this.current = 1
          this.postList.currentPage = 1
          this.searchPost(this.postList)
        } else {
          this.open('error', resp.msg)
        }
      })
    },
    importBtn () { // 导入
      this.isImport = true
    },
    downTemp () { // 下载模板
      window.open('/tabycore/salaryCommissionProduct/downloadModel')
    },
    uploadUrl () { // 上传地址
      return '/tabycore/salaryCommissionProduct/importSalarys'
    },
    submitUpload (fileData) {
      let list = document.querySelector('.is-ready')
      if (IsEmpty(list)) {
        list = []
      }
      if (list.length <= 0) {
        this.open('error', '请先选择文件')
        return false
      } else {
        this.$refs.upload.submit()
        this.Loading()
      }
    },
    handleEXLSuccess (resp) {
      this.closeLoading()
      if (resp.code === '000000') {
        this.open('success', '上传成功')
        this.fileList = []
      } else {
        this.open('error', resp.msg)
        this.fileList = []
      }
    },
    onexport () { // 导出
      window.open(`/tabycore/salaryCommissionProduct/exportSalaryExcel?comCode=${this.searchData.comCode}&comName=${this.searchData.comName}`)
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
    open (types, mesg) { // 提示
      this.$message({
        message: mesg,
        type: types
      })
    },
    ...mapActions([
      'querySalarys',
      'getAllOrg_ProCom',
      'addSalary',
      'modSalary',
      'querySalaryDetail',
      'delSalary'
    ])
  },
  components: {
    [NoticeBar.name]: NoticeBar,
    [LineTittle.name]: LineTittle,
    [LabelText.name]: LabelText
  },
  created () {},
  watch: {
    'searchData.comCode' () {
      if (this.searchData.comCode === '') {
        this.searchData.comName = ''
      }
    },
    'searchData.comName' () {
      if (this.searchData.comName === '') {
        this.searchData.comCode = ''
      }
    },
    'conditions.comCode' () {
      if (this.conditions.comCode === '') {
        this.conditions.comName = ''
      }
    },
    'conditions.comName' () {
      if (this.conditions.comName === '') {
        this.conditions.comCode = ''
      }
    }
  },
  computed: {
  }
}
</script>

<style lang="scss" scoped type="text/css">
  #proCommissionSet { padding: 0px 30px 30px 30px; }
  #proCommissionSet .manage_form { margin-top: 20px; }
  .btn-container { margin: 30px 0; text-align: center; }
  .operationBtn { text-align: center; }
  .upLoad { text-align: center; display: flex; justify-content: center; }
  .upLoad .upload-demo {}
</style>
