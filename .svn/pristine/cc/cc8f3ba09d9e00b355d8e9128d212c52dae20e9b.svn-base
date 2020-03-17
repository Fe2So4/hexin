<template>
  <div id="author_index">
    <div class="tab-wrapper">
      <ui-notice-bar slot="breadcast" >
        <el-breadcrumb slot="location" separator=">">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>系统管理</el-breadcrumb-item>
            <el-breadcrumb-item>人员权限设置</el-breadcrumb-item>
            <el-breadcrumb-item>权限详细设置</el-breadcrumb-item>
          </el-breadcrumb>
      </ui-notice-bar>
      <div class="ri-content" slot="content" >
        <el-row class="ri-line">
          <el-col :span="12">
          <ui-label-text labelWidth="120" label="员工代码:" >
            <el-input v-model="info.code" clearable slot="text" @dblclick.native="queryAuthFun()" ></el-input>
          </ui-label-text>
          </el-col>
          <el-col :span="12">
            <ui-label-text labelWidth="120" :text="info.username" label="员工名称:" >
              <el-input v-model="info.userName" slot="text" disabled >{{info.orgname}}</el-input>
            </ui-label-text>
          </el-col>
        </el-row>
        <el-row class="ri-line">
          <el-col :span="12">
            <ui-label-text labelWidth="120" label="归属机构代码:" >
              <el-input v-model="info.orgId" clearable slot="text" @dblclick.native="queryOrgFun()" ></el-input>
            </ui-label-text>
          </el-col>
          <el-col :span="12">
            <ui-label-text labelWidth="120" :text="info.comName" label="归属机构名称:" >
              <el-input v-model="info.orgname" slot="text" disabled >{{info.orgname}}</el-input>
            </ui-label-text>
          </el-col>
        </el-row>
      </div>
      <div class="btn-container" slot="controlbar" >
        <el-button type="primary" @click.native.prevent="put()">提交</el-button>
      </div>
      <!-- 表格 -->
      <div class="author-table" v-show="isTableShow">
        <el-table
          :data="tableData"
          style="width: 100%">
          <el-table-column
            label="员工代码"
            width="180">
            <template slot-scope="scope">
              <span style="margin-left: 10px">{{ scope.row.agentCode }}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="员工名称"
            width="180">
            <template slot-scope="scope">
              <span style="margin-left: 10px">{{ scope.row.agentName }}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="归属机构代码"
            width="180">
            <template slot-scope="scope">
              <span style="margin-left: 10px">{{ scope.row.comCode }}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="有效标志"
            width="180">
            <template slot-scope="scope">
              <span style="margin-left: 10px">{{ scope.row.status }}</span>
            </template>
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button
                size="mini"
                @click="handleEdit(scope.$index, scope.row)">配置</el-button>
            </template>
          </el-table-column>
        </el-table>
        <!-- <ui-page ></ui-page> -->
        <el-pagination
          v-if="tablePage.total!=0"
          @current-change="handleCurrentChange"
          :current-page="tablePage.currentPage"
          :page-size="tablePage.size"
          layout="total, prev, pager, next, jumper"
          :total="tablePage.total">
        </el-pagination>
      </div>
    </div>
    <el-dialog title="员工岗位配置" :visible.sync="centerDialogVisible" :append-to-body="true" width="50%" center>
      <div class="author-dialog-wrapper">
        <ui-line-tittle :collapsible="true" >
          <span slot="title" >
              <i class="font_family icon-jy-menu-4" ></i>员工岗位
          </span>
          <div class="ri-content" slot="content" >
            <el-row class="ri-line">
              <el-col :span="12">
              <ui-label-text labelWidth="120" label="员工代码:" >
                <span slot="text">{{userInfo.agentCode}}</span>
              </ui-label-text>
              </el-col>
              <el-col :span="12">
                <ui-label-text labelWidth="120" label="员工名称:" >
                  <span slot="text">{{userInfo.agentName}}</span>
                </ui-label-text>
              </el-col>
            </el-row>
          </div>
        </ui-line-tittle>
        <ui-line-tittle :collapsible="true" >
          <span slot="title" >
              <i class="font_family icon-jy-menu-4" ></i>岗位列表
          </span>
          <div class="ri-content" slot="content" >
            <el-table ref="multipleTable" :data="gridData"  @selection-change="handleSelectionChange">
              <el-table-column property="date" label="岗位代码" width="120">
                <template slot-scope="scope">
                  <span style="margin-left: 10px">{{ scope.row.code }}</span>
                </template>
              </el-table-column>
              <el-table-column property="name" label="岗位名称" width="100">
                <template slot-scope="scope">
                  <span style="margin-left: 10px">{{ scope.row.name }}</span>
                </template>
              </el-table-column>
              <el-table-column property="checked" label="是否属于此员工" @selection-change="handleSelectionChange">
                 <template slot-scope="scope">
                  <el-checkbox v-model="scope.row.checked" :value='scope.row.code'></el-checkbox>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </ui-line-tittle>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="centerDialogVisible = false">取 消</el-button>
        <!-- <el-button type="primary" @click="centerDialogVisible = false">确 定</el-button> -->
        <el-button type="primary" @click='save()'>保 存</el-button>
      </span>
    </el-dialog>
    <!-- 员工代码 -->
    <el-dialog title="员工代码" :visible.sync="isDialogShow" :append-to-body="true" width="50%" center>
      <div class="author-dialog-wrapper">
        <div class="user-info">
          <ul class="author-dialog-list">
            <li v-for="(item, index) in userData" :class="resultNum === index?'active':''" :key="index" @click='syncUser(index,item.agentCode,item.agentName)'>
              {{item.agentCode}}-{{item.agentName}}
            </li>
          </ul>
          <el-pagination
            v-if="dialogPage.total!=0"
            @current-change="handleDialogCurrentChange"
            :current-page="dialogPage.currentPage"
            :page-size="dialogPage.size"
            layout="total, prev, pager, next, jumper"
            :total="dialogPage.total">
          </el-pagination>
          <div class="msg" v-if="dialogPage.total==0">无</div>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="isDialogShow = false">取 消</el-button>
        <!-- <el-button type="primary" @click="centerDialogVisible = false">确 定</el-button> -->
        <el-button type="primary" @click='submitUser()'>确 定</el-button>
      </span>
    </el-dialog>
    <!-- 归属机构代码 -->
    <el-dialog title="归属机构代码" :visible.sync="isOrgDialogShow" :append-to-body="true" width="50%" center>
      <div class="author-dialog-wrapper">
        <div class="user-info">
          <ul class="author-dialog-list">
          <li v-for="(item, index) in orgData" :key="index" :class="resultNum === index?'active':''" @click='syncOrg(index,item.comCode,item.comCName)'>
             {{item.comCode}}-{{item.comCName}}
          </li>
        </ul>
        <el-pagination
          v-if="dialogPage1.total!=0"
          @current-change="handleOrgCurrentChange"
          :current-page="dialogPage1.currentPage"
          :page-size="dialogPage1.size"
          layout="total, prev, pager, next, jumper"
          :total="dialogPage1.total">
        </el-pagination>
        <div class="msg" v-if="dialogPage1.total==0">无</div>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="isOrgDialogShow = false">取 消</el-button>
        <el-button type="primary" @click='submitOrg()'>确 定</el-button>
      </span>
    </el-dialog>
  </div>

</template>

<script>
import NoticeBar from '@/components/notice-bar'
import LineTittle from '@/components/line-tittle'
import LabelText from '@/components/label-text'
import UiPage from '@/components/page'
import { mapActions } from 'vuex'
export default {
  name: '',
  data () {
    return {
      activeName: 'first',
      info: {
        code: '',
        orgId: ''
      },
      selectUser: {},
      result: '',
      tableData: [],
      isTableShow: false,
      isDialogShow: false,
      isOrgDialogShow: false,
      centerDialogVisible: false,
      userInfo: {
      },
      gridData: [],
      userData: [],
      orgData: [],
      queryParam: {},
      postData: {},
      selectAuth: [],
      tablePage: {
        currentPage: 1,
        total: '',
        size: 5
      },
      dialogPage: {
        currentPage: 1,
        total: '',
        size: 5
      },
      dialogPage1: {
        currentPage: 1,
        total: '',
        size: 5
      },
      num: '',
      loading: ''
    }
  },
  mounted () {
  },
  watch: {
    'info.code' (newValue, oldValue) {
      if (newValue === '') {
        this.info.userName = ''
      }
    },
    'info.orgId' (newValue, oldValue) {
      if (newValue === '') {
        this.info.orgname = ''
      }
    }
  },
  methods: {
    handleClick (tab, event) {
      // console.log(tab, event);
    },
    put () { // 提交查询
      this.queryParam.agentCode = this.info.code ? this.info.code : ''
      this.queryParam.comCode = this.info.orgId ? this.info.orgId : ''
      this.queryParam.agentName = this.info.userName ? this.info.userName : ''
      this.queryParam.comName = this.info.orgname ? this.info.orgname : ''
      this.queryParam.currentPage = this.tablePage.currentPage
      this.queryParam.pageSize = this.tablePage.size
      this.queryParam.validStatus = '1'
      this.queryAuth(this.queryParam).then(resp => {
        if (resp.code === '000000') {
          this.tableData = resp.data.content
          console.log(this.tableData)
          this.isTableShow = true
          this.tableData.forEach((val, index, valarr) => {
            if (val.status === 0) {
              val.status = '无效'
            } else {
              val.status = '有效'
            }
          })
          this.tablePage.total = resp.data.totalElements
        } else {
          this.open('error', resp.msg)
        }
      }).catch(error => {
        return error
      })
    },
    ...mapActions([
      'queryAuth',
      'saveAuthor',
      'queryOrg',
      'getUserRole',
      'copyAllOrg'
    ]),
    syncUser (index, id, name) {
      this.num = index
      this.selectUser.id = id
      this.selectUser.name = name
    },
    syncOrg (index, id, name) {
      this.num = index
      this.selectUser.orgId = id
      this.selectUser.orgname = name
    },
    handleEdit (index, row) {
      this.centerDialogVisible = true
      this.userInfo = {}
      this.userInfo = row
      this.gridData = []
      this.selectAuth = []
      this.getUserRole(this.userInfo).then(resp => {
        if (resp.data.code === '000000') {
          this.gridData = resp.data.data
        }
      }).catch(error => {
        return error
      })
    },
    handleSelectionChange (val) {
      this.selectAuth = val
    },
    save () {
      this.gridData.forEach((val, index, valarr) => {
        if (val.checked === true) {
          this.selectAuth.push(val.id)
        }
      })
      this.userInfo.roleIds = []
      this.userInfo.roleIds = this.selectAuth
      this.saveAuthor(this.userInfo).then(resp => {
        if (resp.data.code === '000000') {
          this.centerDialogVisible = false
          this.open('success', resp.data.msg)
          this.gridData = []
          this.selectAuth = []
        } else {
          this.open('error', resp.data.msg)
        }
      }).catch(error => {
        return error
      })
    },
    submitUser () {
      this.info.code = this.selectUser.id
      this.info.userName = this.selectUser.name
      this.isDialogShow = false
    },
    submitOrg () {
      this.info.orgId = this.selectUser.orgId
      this.info.orgname = this.selectUser.orgname
      this.isOrgDialogShow = false
    },
    queryAuthFun () { // 查询业务员
      this.num = ''
      this.postData.agentCode = this.info.code ? this.info.code : ''
      this.postData.agentName = this.info.userName ? this.info.userName : ''
      this.postData.currentPage = this.dialogPage.currentPage
      this.postData.pageSize = this.dialogPage.size
      this.postData.validStatus = '1'
      this.postData.clickType = '2'
      this.queryAuth(this.postData).then(resp => {
        if (resp.code === '000000') {
          this.isDialogShow = true
          this.userData = resp.data.content
          this.dialogPage.total = resp.data.totalElements
        } else {
          this.open('error', resp.msg)
        }
      }).catch(error => {
        return error
      })
    },
    queryOrgFun () { // 查询机构
      this.num = ''
      this.queryParam.comCodeOrName = this.info.orgId ? this.info.orgId : ''
      this.queryParam.currentPage = this.dialogPage1.currentPage
      this.queryParam.pageSize = this.dialogPage1.size
      this.queryParam.clickType = '2'
      this.copyAllOrg(this.queryParam).then(resp => {
        if (resp.code === '000000') {
          this.isOrgDialogShow = true
          this.orgData = resp.data.data
          console.log(this.orgData)
          this.dialogPage1.total = resp.data.totalRecords
        } else {
          if (resp.data.code === '000002') {
            this.isOrgDialogShow = true
            this.orgData = []
            this.dialogPage1.total = 0
          } else {
            this.open('error', resp.data.msg)
          }
        }
      }).catch(error => {
        return error
      })
    },
    handleCurrentChange (val) {
      // console.log(`当前页: ${val}`);
      this.tablePage.currentPage = val
      this.put()
    },
    handleDialogCurrentChange (val) {
      this.dialogPage.currentPage = val
      this.queryAuthFun()
    },
    handleOrgCurrentChange (val) {
      this.dialogPage1.currentPage = val
      this.queryOrgFun()
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
    open (type, mesg) {
      this.$message({
        showClose: true,
        message: mesg,
        type: type
      })
    }
  },
  components: {
    [NoticeBar.name]: NoticeBar,
    [LabelText.name]: LabelText,
    [LineTittle.name]: LineTittle,
    [UiPage.name]: UiPage
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

<style lang="scss" type="text/css">
#author_index {
  padding-left: 30px;
  padding-right: 30px;
  .el-radio__input.is-checked .el-radio__inner {
    display: none
  }
  .el-pagination {
    // width: 50%;
    // margin: 10px auto;
    margin-top: 10px;
    text-align: right;
  }
  .el-dialog__wrapper .author-dialog-wrapper ul {
    list-style: none;
    li{
      padding: 4px 0;
      cursor: pointer;
      &.active, &:hover, &:active, &:focus {
        background: #ecf5ff;
      }
    }
  }
}

.author-dialog-list {
  list-style: none;
  padding: 0;
  li{
    padding: 4px 0;
    cursor: pointer;
    &.active, &:hover, &:active, &:focus {
      background: #ecf5ff;
    }
  }
}

.el-tabs #notice-bar {
  border:0;
}
.el-tabs .el-tabs__nav-wrap::after {
  background-image: -webkit-gradient(linear, left top, right top, from(#003CCE), to(#52CEFF));
  background-image: gradient(linear, left top, right top, from(#003CCE), to(#52CEFF));
}
.el-tabs .el-tabs__active-bar {
  background-color:transparent;
}
.el-tabs__item {
  text-align: center;
  border-radius: 10px;
}
.el-tabs--top .el-tabs__item.is-top:last-child {
  padding-right: 14px;
}
.el-tabs__item.is-active {
  color:#ffffff;
  background-color: transparent;
  background-image: -webkit-gradient(linear, left top, right top, from(#003CCE), to(#52CEFF));
  background-image: gradient(linear, left top, right top, from(#003CCE), to(#52CEFF));
}
.el-tabs--top .el-tabs__item.is-bottom:nth-child(2), .el-tabs--top .el-tabs__item.is-top:nth-child(2){
  padding-left: 14px;
}
.el-tabs__nav-wrap{
  padding-bottom: 3px;
}
.el-tabs__nav{
  margin-top: 10px;
  height: 40px;
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
