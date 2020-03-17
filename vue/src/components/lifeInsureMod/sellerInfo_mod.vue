<template>
  <div class="marginTB">
    <el-form :rules="sellerRules" ref="sellerForm" :model="sellerForm">
      <el-row class="ri-line">
        <el-col :span="12">
          <el-form-item  prop="handlerCode">
            <ui-label-text  label="业务员代码:" :required="true" labelWidth="160">
              <el-input v-model="seller.handlerCode" placeholder="双击搜索" @dblclick.native="searchOfSeller(1)" slot="text" ></el-input>
            </ui-label-text>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item  prop="handlerName">
            <ui-label-text  label="业务员名称:" :required="true" labelWidth="160">
              <el-input v-model="seller.handlerName" readonly slot="text" ></el-input>
            </ui-label-text>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row class="ri-line">
        <el-col :span="12">
          <el-form-item  prop="comCode"  >
            <ui-label-text  label="归属机构/部门代码:" :required="true" labelWidth="160">
              <el-input v-model="seller.comCode" readonly slot="text" ></el-input>
            </ui-label-text>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item  prop="comName" >
            <ui-label-text  label="归属机构/部门名称:" :required="true" labelWidth="160">
              <el-input v-model="seller.comName" readonly slot="text" ></el-input>
            </ui-label-text>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row class="ri-line">
        <el-col :span="12">
          <el-form-item  prop="introduceType">
            <ui-label-text  label="介绍人类型:" :required="false" labelWidth="160">
              <el-input v-model="seller.introduceType" slot="text" ></el-input>
            </ui-label-text>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row class="ri-line">
        <el-col :span="12">
          <el-form-item  prop="introduceCode" >
            <ui-label-text  label="介绍人代码:" :required="false" labelWidth="160">
              <el-input v-model="seller.introduceCode" slot="text" ></el-input>
            </ui-label-text>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item  prop="introduceName" >
            <ui-label-text  label="介绍人姓名:" :required="false" labelWidth="160">
              <el-input v-model="seller.introduceName" slot="text" ></el-input>
            </ui-label-text>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <!--业务员 的弹框-->
    <el-dialog :append-to-body="true" width="60%" center title="业务员查询" :visible.sync="dialogSeller">
        <el-row class="ri-line" >
          <el-col :span="24">
            <ui-label-text  label="业务员代码:"  labelWidth="160">
              <el-input v-model="searchcode.agentCode" slot="text" ></el-input>
            </ui-label-text>
          </el-col>
        </el-row>
        <el-row class="ri-line" >
          <el-col :span="24">
            <ui-label-text  label="业务员名称:"  labelWidth="160">
              <el-input v-model="searchcode.agentName" slot="text" ></el-input>
            </ui-label-text>
          </el-col>
        </el-row>
        <el-row class="ri-line" >
          <el-col :span="24">
            <ui-label-text  label="归属机构代码:"  labelWidth="160">
              <el-input v-model="searchcode.comCode" slot="text" ></el-input>
            </ui-label-text>
          </el-col>
        </el-row>
        <el-row class="ri-line" >
          <el-col :span="24">
            <ui-label-text  label="归属机构名称:"  labelWidth="160">
              <el-input v-model="searchcode.comName" slot="text" ></el-input>
            </ui-label-text>
          </el-col>
        </el-row>
        <el-row class="ri-line" >
          <el-col :span="24">
            <div class="center">
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
        <div class="block">
          <el-pagination
            @current-change="currentChangeval"
            :current-page="info.currentPage"
            @size-change="handleSizeChange"
            :page-sizes="[5,10,15]"
            :page-size="100"
            layout="total, sizes, prev, pager, next, jumper"
            :total="agentFindRecords === agentFindRecords ? agentFindRecords : 0">
          </el-pagination>
        </div>
    </el-dialog>
    <!-- <div class="center">
        <el-button type="primary" @click.native.prevent="chaxun">查一下哈</el-button>
      </div> -->
  </div>
</template>

<script>
import NoticeBar from '@/components/notice-bar'
import LabelText from '@/components/label-text'
import LineTittle from '@/components/line-tittle'
import { mapActions } from 'vuex'

export default {
  name: '',
  data () {
    const { noEmptyValidator } = this.$store.getters.validators
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
        introduceType: ''
      },
      sellerRules: {
        handlerCode: noEmptyValidator,
        handlerName: noEmptyValidator,
        comCode: noEmptyValidator,
        comName: noEmptyValidator
      },
      page: '',
      dialogSeller: false,
      searchcode: {
        agentCode: '',
        agentName: '',
        comCode: '',
        comName: '',
        pageSize: '10',
        currentPage: '1'
      }
    }
  },
  mounted () {
   // alert('这是什么意思:' + JSON.stringify(this.$store.state.proposalForm.lifePCMainCondition.handlerCode))
    // this.sellerForm = this.$store.state.proposalForm.lifePCMainCondition
    this.$nextTick(function () {
      // 初始化数据
      this.sellerForm = this.$store.state.proposalForm.lifePCMainCondition
    })
  },
  props: ['seller'],
  methods: {
    ...mapActions([
      'customerFind_1',
      'agentFind_1'
    ]),
    chaxun (page) {
      console.log(this.searchcode.agentCode)
      console.log(this.searchcode.agentName)
      console.log(this.searchcode.comCode)
      console.log(this.searchcode.comName)
      // this.searchcode.currentPage = page
      // alert(JSON.stringify(page))
      this.agentFind_1(this.searchcode)
    },
    /** ******************开始********************** */
    handleSizeChange (val) {
      console.log(`每页 ${val} 条`)
      this.searchcode.pageSize = val
      this.searchcode.currentPage = 1
      this.agentFind_1(this.searchcode)
    },
    // 客户信息查询的分页 跳转至第几页
    currentChangeval (va) {
      this.searchcode.currentPage = va
      this.agentFind_1(this.searchcode)
    },
    /** ******************结束********************** */
    tableRowChange (row, event, column) {
      console.log(JSON.stringify(row))
      this.dialogTableVisibleQuery = true
      this.info.proposalNo = row.proposalNo
      this.info.currentPage = ''
    },
    // 客户所属机构点击
    handleRowSeller (row, event, column) {
      // alert(JSON.stringify(row))
      this.sellerForm.handlerCode = row.agentCode
      this.sellerForm.handlerName = row.agentName
      this.sellerForm.comCode = row.comCode
      this.sellerForm.comName = row.comName

      this.dialogSeller = false
    },
    // toast提示
    open (type, mesg) {
      this.$message({
        showClose: true,
        message: mesg,
        type: type
      })
    },

    // 客户所属机构的查询
    searchOfSeller (page) {
      // this.info.currentPage = page
      this.info.currentPage = page
      console.log('page:' + page)
      // this.info.comCodeOrName = this.addCustom.comCode

      console.log(this.info)
      console.log(typeof (customofOrg))
      this.dialogSeller = true

      // this.agentFind_1(this.info)
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
    // 业务员查询
    agentFind () {
      return this.$store.state.proposalForm.agentFind
    },
   // 客户所属机构查询出来的总条数
    agentFindRecords () {
      return parseInt(this.$store.state.proposalForm.agentFindRecords)
    }

  },
  created () {
  }
}
</script>

<style lang="scss" scoped type="text/css">
 .ri-line { margin-bottom: 10px; }
 .center{text-align: center}
 .marginTB{margin:15px 0;}
 .el-pagination{float: right;padding-right: 50px;}
</style>
