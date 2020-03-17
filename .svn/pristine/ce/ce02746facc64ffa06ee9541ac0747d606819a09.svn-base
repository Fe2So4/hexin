<template>
  <div class="marginTB">
    <el-form :rules="sellerRules" ref="sellerForm" :model="sellerForm">
      <el-row class="ri-line">
        <el-col :span="12">
          <el-form-item  prop="handlerCode">
            <ui-label-text  label="业务员代码:" :required="true" labelWidth="160">
              <el-input v-model="sellerForm.handlerCode" placeholder="双击搜索" @dblclick.native="searchOfSeller(1)" @blur="searchOfSeller1(1)" slot="text" ></el-input>
            </ui-label-text>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item  prop="handlerName">
            <ui-label-text  label="业务员名称:" :required="true" labelWidth="160">
              <el-input :disabled="true" v-model="sellerForm.handlerName"  slot="text" ></el-input>
            </ui-label-text>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row class="ri-line">
        <el-col :span="12">
          <el-form-item  prop="comCode">
            <ui-label-text  label="归属机构/部门代码:" :required="true" labelWidth="160">
              <el-input :disabled="true" v-model="sellerForm.comCode" readonly slot="text" ></el-input>
            </ui-label-text>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item  prop="comName">
            <ui-label-text  label="归属机构/部门名称:" :required="true" labelWidth="160">
              <el-input :disabled="true" v-model="sellerForm.comName" readonly slot="text" ></el-input>
            </ui-label-text>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row class="ri-line">
        <el-col :span="12">
          <el-form-item  prop="introduceType">
            <ui-label-text  label="介绍人类型:" :required="false" labelWidth="160">
              <el-input v-model="sellerForm.introduceType" slot="text" :disabled="true"></el-input>
            </ui-label-text>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row class="ri-line">
        <el-col :span="12">
          <el-form-item  prop="introduceCode">
            <ui-label-text  label="介绍人代码:" :required="false" labelWidth="160">
              <el-input v-model="sellerForm.introduceCode" slot="text" :disabled="sellerForm.agentType !== '5'"></el-input>
            </ui-label-text>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item  prop="introduceName">
            <ui-label-text  label="介绍人姓名:" :required="false" labelWidth="160">
              <el-input v-model="sellerForm.introduceName" slot="text" :disabled="sellerForm.agentType !== '5'"></el-input>
            </ui-label-text>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <!--业务员 的弹框-->
    <el-dialog :append-to-body="true" width="80%" center title="业务员查询" :before-close="dialogclose" :visible.sync="dialogSeller" >
        <el-row class="ri-line" >
          <el-col :span="12" style="margin-bottom:22px !important">
            <ui-label-text  label="业务员代码:"  labelWidth="160">
              <el-input v-model="searchcode.agentCode" slot="text" ></el-input>
            </ui-label-text>
          </el-col>
          <el-col :span="12">
            <ui-label-text  label="业务员名称:"  labelWidth="160">
              <el-input v-model="searchcode.agentName" slot="text" ></el-input>
            </ui-label-text>
          </el-col>
        </el-row>
        <el-row class="ri-line" style="margin-bottom:22px !important">
          <el-col :span="12">
            <ui-label-text  label="归属机构代码:"  labelWidth="160">
              <el-input v-model="searchcode.comCode" slot="text" ></el-input>
            </ui-label-text>
          </el-col>
          <el-col :span="12">
            <ui-label-text  label="归属机构名称:"  labelWidth="160">
              <el-input v-model="searchcode.comName" slot="text" ></el-input>
            </ui-label-text>
          </el-col>
        </el-row>
        <el-row class="ri-line" style="margin-bottom:22px !important">
          <el-col :span="24">
            <div class="center">
                <!-- <el-button  type="primary" @click.native.prevent="searchCode(searchcode)">查询</el-button> -->
                <el-button  type="primary" @click.native.prevent="chaxun(searchcode)">查询</el-button>
            </div>
          </el-col>
        </el-row>
        <el-table ref="multipleTable" stripe @row-click="handleRowSeller" :data="agentFind" tooltip-effect="dark" style="width: 100%">
          <el-table-column prop="agentCode"  label="业务员代码" show-overflow-tooltip>
          </el-table-column>
          <el-table-column prop="agentName" label="业务员名称" show-overflow-tooltip>
          </el-table-column>
          <el-table-column prop="comName" label="归属机构/部门名称" show-overflow-tooltip>
          </el-table-column>
        </el-table>
        <div class="block" style="margin-top:22px;padding-bottom:22px">
          <el-pagination
            @current-change="currentChangeval"
            :current-page.sync="info.currentPage"
            @size-change="handleSizeChange"
            :page-sizes="sizeList"
            :page-size="searchcode.pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="agentFindRecords === agentFindRecords ? agentFindRecords : 0">
          </el-pagination>
        </div>
    </el-dialog>



  </div>
</template>

<script>
import NoticeBar from '@/components/notice-bar'
import LabelText from '@/components/label-text'
import LineTittle from '@/components/line-tittle'
import Bus from './bus.js'
import { mapActions } from 'vuex'

export default {
  name: '',
  props: ['seller', 'isSuper'],
  data () {
    const {noEmptyValidator} = this.$store.getters.validators
    return {
      info: {
        currentPage: 1,
        pageSize: 5
      },
      // 新增的表单验证
      sellerForm: {
        handlerCode: '',
        handlerName: '',
        comCode: '',
        comName: '',
        introduceType: '',
        introduceCode: ''
      },
      sellerRules: {
        handlerCode: noEmptyValidator
      },
      page: '',
      dialogSeller: false,
      searchcode: {
        agentCode: '',
        agentName: '',
        comCode: '',
        comName: '',
        pageSize: 5,
        currentPage: 1
      },
      selleridNumber: '',  // 业务员证件号  需要传给基本信息组件里
      agentFind: [],
      sizeList: [5, 10, 20, 50],
      agentFindRecords: 0
    }
  },
  mounted () {
  },
  methods: {
    ...mapActions([
      'customerFind_1',
      'agentFind_1'
    ]),
    dialogclose () {
      this.searchcode = {
        agentCode: '',
        agentName: '',
        comCode: '',
        comName: '',
        pageSize: 5,
        currentPage: 1
      }
      this.info = {}
      this.sellerForm = {
        handlerCode: '',
        handlerName: '',
        comCode: '',
        comName: '',
        introduceType: '',
        introduceCode: '',
        agentType: '5'
      }
      this.dialogSeller = false
      this.sellerForm.introduceCode = ''
      this.sellerForm.introduceName = ''
      this.sizeList = []
      this.agentFind = []
      this.agentFindRecords = 0
    },
    chaxun (page) {
      this.sellerForm.introduceCode = ''
      this.sellerForm.introduceName = ''

      this.info.agentCode = this.searchcode.agentCode
      this.info.agentName = this.searchcode.agentName
      this.info.comCode = this.searchcode.comCode
      this.info.comName = this.searchcode.comName
      this.agentFind_1(this.info).then(result => {
        if (result.code === '000000') {
          this.dialogSeller = true
          this.agentFind = result.data.data
          this.agentFindRecords = result.data.totalRecords
        } else if (result.code === '000002') {
          this.dialogSeller = true
          this.agentFind = []
          this.agentFindRecords = 0
        } else {
          this.open('error', result.msg)
          this.sellerForm.handlerCode = ''
          this.sellerForm.handlerName = ''
          this.sellerForm.comCode = ''
          this.sellerForm.comName = ''
        }
      })
    },

    /** ******************开始********************** */
    handleSizeChange (val) {
      this.info.pageSize = val
      this.info.currentPage = 1
      this.agentFind_1(this.info).then(result => {
        if (result.code === '000000') {
          this.dialogSeller = true
          this.agentFind = result.data.data
          this.agentFindRecords = result.data.totalRecords
        } else if (result.code === '000002') {
          this.dialogSeller = true
          this.agentFind = []
          this.agentFindRecords = 0
        } else {
          this.open('error', result.msg)
          this.sellerForm.handlerCode = ''
          this.sellerForm.handlerName = ''
          this.sellerForm.comCode = ''
          this.sellerForm.comName = ''
        }
      })
    },
    // 业务员查询的分页 跳转至第几页
    currentChangeval (val) {
      this.info.currentPage = val
      this.agentFind_1(this.info).then(result => {
        if (result.code === '000000') {
          this.dialogSeller = true
          this.agentFind = result.data.data
          this.agentFindRecords = result.data.totalRecords
        } else if (result.code === '000002') {
          this.dialogSeller = true
          this.agentFind = []
          this.agentFindRecords = 0
        } else {
          this.open('error', result.msg)
          this.sellerForm.handlerCode = ''
          this.sellerForm.handlerName = ''
          this.sellerForm.comCode = ''
          this.sellerForm.comName = ''
        }
      })
    },
    /** ******************结束********************** */
    tableRowChange (row, event, column) {
      this.dialogTableVisibleQuery = true
      this.info.proposalNo = row.proposalNo
      // alert('proposalNo:' + this.info.proposalNo)
      this.info.currentPage = ''
    },
    // 客户所属机构点击
    handleRowSeller (row, event, column) {
      this.closeDailog().then(() => {
        this.sellerForm.handlerCode = row.agentCode
        this.sellerForm.handlerName = row.agentName
        this.sellerForm.comCode = row.comCode
        this.sellerForm.comName = row.comName
        this.sellerForm.agentType = row.agentType
        this.sellerForm.introduceCode = ''
        this.sellerForm.introduceName = ''
      // 将业务员id放入store里面
        this.$store.state.proposalForm.selleridNumber = row.identifyNumber

        Bus.$emit('val', row.identifyNumber)
        this.dialogSeller = false

        if (row.agentType === '5') {
          this.sellerForm.introduceType = row.remark1
        } else {
          this.sellerForm.introduceType = ''
        }
        this.searchcode.agentCode = ''
        this.searchcode.agentName = ''
        this.searchcode.comCode = ''
        this.searchcode.comName = ''
        this.agentFind = []
        this.agentFindRecords = 0
      })
    },
    closeDailog () {
      return new Promise((resolve, reject) => {
        this.show_dialog = false
        resolve()
      })
    },
    handleCurrentChangeCode (val) {
      this.info.currentPage = val
      // alert(JSON.stringify(this.info))
    },
    // toast提示
    open (type, mesg) {
      this.$message({
        showClose: true,
        message: mesg,
        type: type
      })
    },
    searchOfSeller (page) {  // 业务员查询 code 双击
      this.info.currentPage = page
      this.info.clickType = '2'
      this.info.pageSize = 5
      this.sizeList = [5, 10, 20, 50]
      this.info.agentCode = this.sellerForm.handlerCode
      this.searchcode.agentCode = this.sellerForm.handlerCode
      this.searchcode.agentName = this.sellerForm.handlerName

      this.agentFind_1(this.info).then(result => {
        if (result.code === '000000') {
          this.dialogSeller = true
          this.agentFind = result.data.data
          this.agentFindRecords = result.data.totalRecords
        } else if (result.code === '000002') {
          this.dialogSeller = true
          this.agentFind = []
          this.agentFindRecords = 0
        } else {
          this.open('error', result.msg)
          this.sellerForm.handlerCode = ''
          this.sellerForm.handlerName = ''
          this.sellerForm.comCode = ''
          this.sellerForm.comName = ''
        }
      })
    },
    searchOfSeller1 (page) {  // 业务员查询 code 失焦
      if (this.dialogSeller === true) {
        return false
      }
      //
      this.info.currentPage = page
      this.info.pageSize = 5
      this.info.clickType = '1'
      this.searchcode.agentCode = this.sellerForm.handlerCode
      if (this.sellerForm.handlerCode === '' || this.sellerForm.handlerCode === null || this.sellerForm.handlerCode === undefined) {
        return false
      }
      this.info.agentCode = this.sellerForm.handlerCode

      this.agentFind_1(this.info).then(result => {
        if (result.code === '000000') {
          //
          this.sellerForm.handlerCode = result.data.data[0].agentCode
          this.sellerForm.handlerName = result.data.data[0].agentName
          this.sellerForm.comCode = result.data.data[0].comCode
          this.sellerForm.comName = result.data.data[0].comName
        } else {
          this.open('error', result.msg)
          this.sellerForm.handlerCode = ''
          this.sellerForm.handlerName = ''
          this.sellerForm.comCode = ''
          this.sellerForm.comName = ''
        }
      })
    },
    searchOfSeller2 (page) {  // 业务员查询 name 双击
      //
      this.info.currentPage = page
      this.info.clickType = '2'
      this.info.pageSize = 5
      this.sizeList = [5, 10, 20, 50]
      this.info.agentName = this.sellerForm.handlerName
      this.agentFind_1(this.info).then(result => {
        if (result.code === '000000') {
          this.dialogSeller = true
          this.agentFind = result.data.data
          this.agentFindRecords = result.data.totalRecords
        } else if (result.code === '000002') {
          this.dialogSeller = true
          this.agentFind = []
          this.agentFindRecords = 0
        } else {
          this.open('error', result.msg)
          this.sellerForm.handlerCode = ''
          this.sellerForm.handlerName = ''
          this.sellerForm.comCode = ''
          this.sellerForm.comName = ''
        }
      })
    },
    searchOfSeller3 (page) {  // 业务员查询 code 失焦
      if (this.dialogSeller === true) {
        return false
      }
      //
      this.info.currentPage = page
      this.info.pageSize = 5
      this.info.clickType = '1'
      if (this.sellerForm.handlerName === '' || this.sellerForm.handlerName === null || this.sellerForm.handlerName === undefined) {
        return false
      }
      this.info.agentName = this.sellerForm.handlerName
      this.agentFind_1(this.info).then(result => {
        if (result.code === '000000') {
          this.sellerForm.handlerCode = result.data.data[0].agentCode
          this.sellerForm.handlerName = result.data.data[0].agentName
          this.sellerForm.comCode = result.data.data[0].comCode
          this.sellerForm.comName = result.data.data[0].comName
        } else {
          this.open('error', result.msg)
          this.sellerForm.handlerCode = ''
          this.sellerForm.handlerName = ''
          this.sellerForm.comCode = ''
          this.sellerForm.comName = ''
        }
      })
    },
    // 表单校验
    validateForm () {
      let flag = false
      this.$refs.sellerForm.validate((valid) => {
        flag = valid
      })
      return flag
    }
  },
  components: {
    [NoticeBar.name]: NoticeBar,
    [LabelText.name]: LabelText,
    [LineTittle.name]: LineTittle
  },
  computed: {
  },
  created () {
    if (this.seller !== undefined) {
      this.sellerForm = this.seller
      if (this.sellerForm.agentType !== '5') {
        this.sellerForm.introduceType = this.sellerForm.remark1
      }
    }
  },
  watch: {
    seller (val) {
      this.sellerForm = val
      if (this.sellerForm.agentType !== '5') {
        this.sellerForm.introduceType = this.sellerForm.remark1
      }
    }
  }
}
</script>

<style lang="scss" scoped type="text/css">
 .ri-line { margin-bottom: 10px; }
 .center{text-align: center}
 .marginTB{margin:15px 0;}
 .el-pagination{float: right;padding-right: 20px;padding-bottom: 15px}
</style>
