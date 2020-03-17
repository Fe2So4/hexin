<template>
  <div id="riskIndex" >
      <el-form :model="info" :rules="queryrules" ref="queryForm" >
        <ui-line-tittle :collapsible="true" >
          <span slot="title" >
            <i class="font_family icon-jy-menu-4" ></i>基本信息
          </span>
          <div class="ri-content" slot="content" >
            <el-row class="ri-line">
              <el-col :span="12">
                <el-form-item class="insurerCode" prop="insurerCode">
                  <ui-label-text :required="true" labelWidth="130" label="保单号:" >
                    <span slot="text">{{info.lifePCMainCondition.policyNo}}</span>
                  </ui-label-text>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <ui-label-text labelWidth="130" label="投保单号:" >
                  <span slot="text">{{info.lifePCMainCondition.proposalNo}}</span>
                </ui-label-text>
              </el-col>
            </el-row>
            <el-row class="ri-line">
              <el-col :span="12">
              <ui-label-text labelWidth="130" label="承保日期:" >
                <span slot="text">{{info.lifePCMainCondition.acceptDate}}</span>
              </ui-label-text>
              </el-col>
              <el-col :span="12">
              <ui-label-text labelWidth="130" label="生效日期:" >
                <span slot="text">{{info.lifePCMainCondition.generateDate}}</span>
              </ui-label-text>
              </el-col>
            </el-row>
            <el-row class="ri-line">
              <el-col :span="12">
              <ui-label-text labelWidth="130" label="投保日期:" >
                <span slot="text">{{info.lifePCMainCondition.proposalDate}}</span>
              </ui-label-text>
              </el-col>
              <el-col :span="12">
              <ui-label-text labelWidth="130" label="保单状态:" >
                <span slot="text">{{info.lifePCMainCondition.policyStatus}}</span>
              </ui-label-text>
              </el-col>
            </el-row>
            <el-row class="ri-line">
              <el-col :span="12">
              <ui-label-text labelWidth="130" label="归属保险公司代码:" >
                <span slot="text">{{info.lifePCMainCondition.companyCode}}</span>
              </ui-label-text>
              </el-col>
              <el-col :span="12">
              <ui-label-text labelWidth="130" label="归属保险公司名称:" >
                <span slot="text">{{info.lifePCMainCondition.companyName}}</span>
              </ui-label-text>
              </el-col>
            </el-row>
            <el-row class="ri-line">
              <el-col :span="12">
              <ui-label-text labelWidth="130" label="归属保险公司机构代码:" >
                <span slot="text">{{info.lifePCMainCondition.companyComCode}}</span>
              </ui-label-text>
              </el-col>
              <el-col :span="12">
              <ui-label-text labelWidth="130" label="归属保险公司机构名称:" >
                <span slot="text">{{info.lifePCMainCondition.companyComName}}</span>
              </ui-label-text>
              </el-col>
            </el-row>
            <el-row class="ri-line">
              <el-col :span="12">
              <ui-label-text labelWidth="130" label="新/续期标记:" >
                <span slot="text">{{info.lifePCMainCondition.insuranceMark}}</span>
              </ui-label-text>
              </el-col>
              <el-col :span="12">
              <ui-label-text labelWidth="130" label="缴至日期:" >
                <span slot="text">{{info.lifePCMainCondition.jzDate}}</span>
              </ui-label-text>
              </el-col>
            </el-row>
            <el-row class="ri-line">
              <el-col :span="12">
              <ui-label-text labelWidth="130" label="保单年度:" >
                <span slot="text">{{info.lifePCMainCondition.bdYear}}</span>
              </ui-label-text>
              </el-col>
              <el-col :span="12">
              <ui-label-text labelWidth="130" label="更新日期:" >
                <span slot="text">{{info.lifePCMainCondition.aaa}}</span>
              </ui-label-text>
              </el-col>
            </el-row>
          </div>
        </ui-line-tittle>
        <ui-line-tittle :collapsible="true" >
          <span slot="title" >
            <i class="font_family icon-jy-menu-4" ></i>投保人信息
          </span>
          <div class="ri-content" slot="content" >
            <el-row class="ri-line">
              <el-col :span="12">
              <ui-label-text labelWidth="130" label="投保人代码:" >
                <span slot="text">{{info.lifePartyCondition.insureNo}}</span>
              </ui-label-text>
              </el-col>
              <el-col :span="12">
                <ui-label-text labelWidth="130" label="投保人名称:" >
                  <el-input v-model="info.lifePartyCondition.insureName" slot="text" placeholder="" clearable></el-input>
                </ui-label-text>
              </el-col>
            </el-row>
            <el-row class="ri-line">
              <el-col :span="12">
              <ui-label-text labelWidth="130" label="证件类型:" >
                <el-select v-model="info.lifePartyCondition.identifyType" slot="text" placeholder="请选择">
                  <el-option label="身份证" value="1"></el-option>
                  <el-option label="户口簿" value="2"></el-option>
                  <el-option label="军官证" value="3"></el-option>
                  <el-option label="驾驶证" value="4"></el-option>
                  <el-option label="护照" value="5"></el-option>
                  <el-option label="港澳居民来往大陆通行证" value="6"></el-option>
                  <el-option label="台湾居民来往大陆通行证" value="7"></el-option>
                  <el-option label="其他" value="8"></el-option>
                  <el-option label="出生医学证明" value="9"></el-option>
                </el-select>
              </ui-label-text>
              </el-col>
              <el-col :span="12">
              <ui-label-text labelWidth="130" label="证件号码:" >
                <el-input v-model="info.lifePartyCondition.identifyNumber" slot="text" placeholder="" clearable></el-input>
              </ui-label-text>
              </el-col>
            </el-row>
            <el-row class="ri-line">
              <el-col :span="12">
              <ui-label-text labelWidth="130" label="固定电话:" >
                <el-input v-model="info.lifePartyCondition.insureTel" slot="text" placeholder="" clearable></el-input>
              </ui-label-text>
              </el-col>
              <el-col :span="12">
              <ui-label-text labelWidth="130" label="移动电话:" >
                <el-input v-model="info.lifePartyCondition.mobilePhone" slot="text" placeholder="" clearable></el-input>
              </ui-label-text>
              </el-col>
            </el-row>
          </div>
        </ui-line-tittle>

        <ui-line-tittle :collapsible="true" >
          <span slot="title" >
            <i class="font_family icon-jy-menu-4" ></i>业务员信息
          </span>
          <div class="ri-content" slot="content" >
            <el-row class="ri-line">
              <el-col :span="12">
              <ui-label-text labelWidth="130" label="业务员代码:" >
                <span slot="text">{{info.lifePCMainCondition.aaa}}</span>
              </ui-label-text>
              </el-col>
              <el-col :span="12">
                <ui-label-text labelWidth="130" label="业务员名称:" >
                  <span slot="text">{{info.aaa}}</span>
                </ui-label-text>
              </el-col>
            </el-row>
            <el-row class="ri-line">
              <el-col :span="12">
              <ui-label-text labelWidth="130" label="归属机构/部门代码:" >
                <span slot="text">{{info.aaa}}</span>
              </ui-label-text>
              </el-col>
              <el-col :span="12">
              <ui-label-text labelWidth="130" label="归属机构/部门名称:" >
                <span slot="text">{{info.aaa}}</span>
              </ui-label-text>
              </el-col>
            </el-row>
            <el-row class="ri-line">
              <el-col :span="12">
              <ui-label-text labelWidth="130" label="介绍人类型:" >
                <span slot="text">{{info.aaa}}</span>
              </ui-label-text>
              </el-col>
              <el-col :span="12">
              <ui-label-text labelWidth="130" label="介绍人代码:" >
                <span slot="text">{{info.aaa}}</span>
              </ui-label-text>
              </el-col>
            </el-row>
            <el-row class="ri-line">
              <el-col :span="12">
              <ui-label-text labelWidth="130" label="介绍人姓名:" >
                <span slot="text">{{info.aaa}}</span>
              </ui-label-text>
              </el-col>
              <el-col :span="12">
              <ui-label-text labelWidth="130" label="离职单服务人员:" >
                <span slot="text">{{info.aaa}}</span>
              </ui-label-text>
              </el-col>
            </el-row>
            <el-row class="ri-line">
              <el-col :span="12">
              <ui-label-text labelWidth="130" label="联系人电话:" >
                <span slot="text">{{info.aaa}}</span>
              </ui-label-text>
              </el-col>
            </el-row>
          </div>
        </ui-line-tittle>

        <ui-line-tittle :collapsible="true" >
          <span slot="title" >
            <i class="font_family icon-jy-menu-4" ></i>险种信息
          </span>
          <div class="ri-content" slot="content" >
            <el-table
              :data="tableData"
              style="width: 100%">
              <el-table-column
                label="险种代码"
                width="180">
                <template slot-scope="scope">
                  <el-input v-model="scope.row.riskCode" slot="text" placeholder="双击可选择" clearable @dblclick.native="dbqueryRisk(scope.row)"></el-input>
                </template>
              </el-table-column>
              <el-table-column
                label="险种名称"
                width="180">
                <template slot-scope="scope">
                  <span style="margin-left: 10px">{{ scope.row.insurerName }}</span>
                </template>
              </el-table-column>
              <el-table-column
                label="主/附险标记"
                width="180">
                <template slot-scope="scope">
                  <el-select v-model="info.identityType" slot="text" placeholder="请选择">
                    <el-option label="主险" value="1"></el-option>
                    <el-option label="附险" value="2"></el-option>
                    <el-option label="主/附险" value="3"></el-option>
                  </el-select>
                </template>
              </el-table-column>
              <el-table-column
                label="缴费年期"
                width="180">
                <template slot-scope="scope">
                  <span style="margin-left: 10px">{{ scope.row.riskName }}</span>
                </template>
              </el-table-column>
              <el-table-column
                label="缴费频率"
                width="180">
                <template slot-scope="scope">
                  <el-select v-model="info.identityType" slot="text" placeholder="请选择">
                    <el-option label="天缴" value="0"></el-option>
                      <el-option label="月缴" value="1"></el-option>
                      <el-option label="季缴" value="2"></el-option>
                      <el-option label="年缴" value="3"></el-option>
                      <el-option label="趸缴" value="4"></el-option>
                      <el-option label="半年缴" value="5"></el-option>
                  </el-select>
                </template>
              </el-table-column>
              <el-table-column label="操作" width="180">
                <template slot-scope="scope">
                  <el-button
                    size="mini"
                    type="danger"
                    @click="handleDelete(scope.$index, scope.row, tableData)">删除</el-button>
                </template>
              </el-table-column>
            </el-table>
            <el-button @click.prevent="addRow()">增加</el-button>
          </div>
        </ui-line-tittle>
        <ui-line-tittle :collapsible="true" >
          <span slot="title" >
            <i class="font_family icon-jy-menu-4" ></i>缴费信息
          </span>
          <div class="ri-content" slot="content" >
            <el-table
              :data="payData"
              style="width: 100%">
              <el-table-column
                label="险种代码"
                width="180">
                <template slot-scope="scope">
                  <el-input v-model="scope.row.riskCode" slot="text" placeholder="双击可选择" clearable @dblclick.native="dbqueryRisk(scope.row)"></el-input>
                </template>
              </el-table-column>
              <el-table-column
                label="险种名称"
                width="180">
                <template slot-scope="scope">
                  <span style="margin-left: 10px">{{ scope.row.insurerName }}</span>
                </template>
              </el-table-column>
              <el-table-column
                label="实收保费"
                width="280">
                <template slot-scope="scope">
                  <el-form-item class="insurerCode" prop="insurerCode">
                    <ui-label-text :required="true" labelWidth="280" >
                      <el-input v-model="info.insurerCode" slot="text" placeholder=""></el-input>
                    </ui-label-text>
                  </el-form-item>
                </template>
              </el-table-column>
              <el-table-column
                label="实收日期"
                width="260">
                <template slot-scope="scope">
                  <el-date-picker v-model="info.startTime" type="date" placeholder=""></el-date-picker>
                </template>
              </el-table-column>
              <el-table-column label="操作" width="180">
                <template slot-scope="scope">
                  <el-button
                    size="mini"
                    type="danger"
                    @click="handleDelete(scope.$index, scope.row, payData)">删除</el-button>
                </template>
              </el-table-column>
            </el-table>
            <el-button @click.prevent="addPayRow()">增加</el-button>
          </div>
        </ui-line-tittle>
        <ui-line-tittle :collapsible="true" >
          <span slot="title" >
            <i class="font_family icon-jy-menu-4" ></i>总计
          </span>
          <div class="ri-content" slot="content" >
            <el-row class="ri-line">
              <el-col :span="12">
              <ui-label-text labelWidth="130" label="应缴保费总计:" >
                <span slot="text"></span>
              </ui-label-text>
              </el-col>
              <el-col :span="12">
                <ui-label-text labelWidth="130" label="实收保费总计:" >
                  <span slot="text"></span>
                </ui-label-text>
              </el-col>
            </el-row>
            <el-row class="ri-line">
              <el-col :span="12">
              <ui-label-text labelWidth="130" label="缴费状态:" >
                <el-select v-model="info.type" slot="text" placeholder="请选择">
                  <el-option
                    label="已缴费"
                    value="1">
                  </el-option>
                  <el-option
                    label="未缴费"
                    value="2">
                  </el-option>
                  <el-option
                    label="保费豁免"
                    value="3">
                  </el-option>
                  <el-option
                    label="缴费回退"
                    value="4">
                  </el-option>
                </el-select>
              </ui-label-text>
              </el-col>
            </el-row>
          </div>
        </ui-line-tittle>
      </el-form>
      <div class="btn-container" slot="controlbar" >
        <el-button type="primary" @click.native.prevent="handleSubmit()">修改</el-button>
      </div>

      <!-- 双击险种 -->
    <el-dialog :append-to-body="true" width="35%" title="险种" :visible.sync="dialogTableVisibleCode">
      <el-table ref="multipleTable" @row-click="handleRowChange" :data="riskData" tooltip-effect="dark" style="width: 100%">
        <el-table-column prop="riskcode" label="险种代码" show-overflow-tooltip>
        </el-table-column>
        <el-table-column prop="riskname" label="险种名称" show-overflow-tooltip>
        </el-table-column>
      </el-table>
      <el-pagination
        @current-change="handleCurrentChange"
        :current-page="diaPage.currentPage"
        :page-size="diaPage.size"
        layout="total, prev, pager, next, jumper"
        :total="totalRecords ? totalRecords : diaPage.total">
      </el-pagination>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogTableVisibleCode = false">取 消</el-button>
        <el-button type="primary" @click="dbRiskSubmit">确 定</el-button>
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
  name: 'renewal-mod',
  props: ['info'],
  data () {
    return {
      disabled: true,
      dialogTableVisibleCode: false,
      fileList: [],
      diaPage: {
        currentPage: 1,
        total: 0,
        size: 5
      },
      tableData: [
        {
          insurerCode: '00',
          insurerName: 'aa',
          riskCode: '123',
          riskName: 'aa'
        }
      ],
      payData: [
        {
          insurerCode: '00',
          insurerName: 'aa',
          riskCode: '123',
          riskName: 'aa'
        }
      ],
      dbselected: [],
      queryrules: {
        // insurerCode: [
        //   { required: true, message: '请输入保险公司代码', trigger: 'blur' }
        // ]
      }
    }
  },
  mounted () {
  },
  methods: {
    addRow () {
      let list = {
        insurerCode: '1',
        insurerName: '1',
        riskCode: '1',
        riskName: '1'}
      this.tableData.unshift(list)
    },
    handleDelete (i, row, tableCurrent) {
      tableCurrent.splice(i, 1)
    },
    addPayRow () {
      let list = {
        insurerCode: '1',
        insurerName: '1',
        riskCode: '1',
        riskName: '1'}
      this.payData.unshift(list)
    },
    handleSubmit () {
      // 续期保单的回录时间必须大于等于承保日期1年
      // this.$refs['queryForm'].validate((valid) => {
      //   if (valid) {
      this.submitSave(this.info)
      //   } else {
      //     console.log('error submit!!')
      //     return false
      //   }
      // })
    },
    dbqueryRisk (row) {
      this.dialogTableVisibleCode = true
      this.getRiskcodes(row)
    },
    dbRiskSubmit () {
      this.info.riskCode = this.dbselected.riskcode
      this.info.riskName = this.dbselected.riskname
      this.dialogTableVisibleCode = false
    },
    handleRowChange (row, event, column) {
      this.dbselected.riskCode = row.riskcode
      this.dbselected.riskName = row.riskname
    },
    handleCurrentChange (val) {
      this.tablePage.currentPage = val
      this.dbqueryRisk()
    },
    ...mapActions([
      'getRiskcodes',
      'submitSave'
    ])
    // handleDelete (index, row) {
    //   // 主险不可删除
    //   if (row.status === 1) {
    //     this.$message({
    //       showClose: true,
    //       message: '主险不能进行删除操作，附加险可以',
    //       type: 'error'
    //     })
    //   } else {
    //     this.deleteRecord(row)
    //   }
    // }
  },
  components: {
    [NoticeBar.name]: NoticeBar,
    [LineTittle.name]: LineTittle,
    [LabelText.name]: LabelText
  },
  created () {
  },
  computed: {
    riskData () {
      return this.$store.state.riskMgr.riskData
    },
    totalRecords () {
      return parseInt(this.$store.state.riskMgr.riskTotalRecords)
    }
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
.upload-rate,
.download {
  text-align: center;
}
</style>

<style lang="scss" type="text/css">
.risk-dialog-wrapper .lt-label, .risk-dialog-wrapper .el-form-item {
  float: left;
  margin-bottom: 2px;
}
</style>
