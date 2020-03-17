<template>
  <div id="riskIndex" >
      <ui-notice-bar slot="breadcast" >
        <el-breadcrumb slot="location" separator=">">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>产品、佣金率管理</el-breadcrumb-item>
            <el-breadcrumb-item>产品管理</el-breadcrumb-item>
          </el-breadcrumb>
      </ui-notice-bar>
      <div class="ri-content" slot="content" >
        <el-form :model="info" :rules="queryrules" ref="queryForm" >
        <el-row class="ri-line">
          <el-col :span="12">
            <!-- :text="info.typeName" -->
          <ui-label-text :required="true" labelWidth="130" label="产品类别:" prop="typeName">
            <el-select v-model="info.type" slot="text" placeholder="请选择">
              <el-option
                v-for="item in cplbList"
                :key="item.index"
                :label="item.label"
                :value="item.value">
              </el-option>
              </el-select>
          </ui-label-text>
          </el-col>
        </el-row>
        <el-row class="ri-line">
          <el-col :span="12">
          <el-form-item class="insurerCode" prop="insurerCode">
          <ui-label-text :required="false" labelWidth="130" label="保险公司代码:" >
            <el-input v-model="info.insurerCode" slot="text" placeholder="双击可选择" clearable @dblclick.native="dbqueryCom('query')"></el-input>
          </ui-label-text>
          </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item class="insurerName" prop="insurerName">
            <ui-label-text :required="false" labelWidth="130" label="保险公司名称:" >
              <el-input v-model="info.insurerName" slot="text" placeholder="双击可选择" clearable @dblclick.native="dbqueryCom('query')"></el-input>
            </ui-label-text>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row class="ri-line">
          <el-col :span="12">
          <ui-label-text labelWidth="130" label="险种代码:">
            <el-input v-model="info.riskCode" slot="text" placeholder="双击可选择" clearable @dblclick.native="dbqueryRisk('query')"></el-input>
          </ui-label-text>
          </el-col>
          <el-col :span="12">
          <ui-label-text labelWidth="130" label=" 险种名称:">
            <el-input v-model="info.riskName" slot="text" placeholder="双击可选择" clearable @dblclick.native="dbqueryRisk('query')" ></el-input>
          </ui-label-text>
          </el-col>
        </el-row>

        <el-row class="ri-line">
          <el-col :span="12">
          <ui-label-text labelWidth="130" label="险种类别（大类）:" >
            <el-select v-model="info.classBigCode" slot="text" placeholder="请选择" @change="indexSelect($event)">
              <el-option
                v-for="item in classBigNameList"
                :key="item.index"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </ui-label-text>
          </el-col>
          <el-col :span="12">
          <ui-label-text labelWidth="130" label="险种类别（小类）:" >
            <el-select v-model="info.classSmallCode" slot="text" placeholder="请选择">
              <el-option
                v-for="item in classSmallNameList"
                :key="item.index"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </ui-label-text>
          </el-col>
        </el-row>
        <el-row class="ri-line">
          <el-col :span="12">
          <ui-label-text labelWidth="130" label="险种类型:" >
            <el-select v-model="info.classTypeCode" slot="text" placeholder="请选择" :disabled='disabled'>
              <el-option
                v-for="item in classTypeNameList"
                :key="item.index"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </ui-label-text>
          </el-col>
          <el-col :span="12">
          <ui-label-text labelWidth="130" label="主险/附加险:" >
            <el-select v-model="info.mainOrExtrFlagCode" slot="text" placeholder="请选择" :disabled='disabled'>
              <el-option
                v-for="item in mainOrExtrList"
                :key="item.index"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </ui-label-text>
          </el-col>
        </el-row>
        <el-row class="ri-line">
          <el-col :span="12">
          <ui-label-text labelWidth="130" label="长期/短期:" >
            <el-select v-model="info.longShortFlagCode" slot="text" placeholder="请选择" :disabled='disabled'>
              <el-option
                v-for="item in longShortList1"
                :key="item.index"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </ui-label-text>
          </el-col>
          <el-col :span="12">
          <ui-label-text labelWidth="130" label="审核状态:" >
            <el-select v-model="info.checkStatusCode" slot="text" placeholder="请选择">
              <el-option
                v-for="item in valistatusList"
                :key="item.index"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </ui-label-text>
          </el-col>
        </el-row>
        </el-form>
      </div>
      <div class="btn-container" slot="controlbar" >
        <el-button type="primary" @click.native.prevent="handleQuery()" :disabled="quanxian.query">查询</el-button>
        <el-button type="primary" @click.native.prevent="handleAdd()" :disabled="quanxian.add">新增</el-button>
        <el-button type="primary" @click.native.prevent="handleUpdate()" :disabled="quanxian.modify">修改</el-button>
        <el-button type="danger" @click.native.prevent="handleDelete()" :disabled="quanxian.del">删除</el-button>
        <el-button type="primary" @click.native.prevent="handleCheck()" :disabled="quanxian.review">审核</el-button>
        <el-button type="primary" @click.native.prevent="handleImport()"
        :disabled="quanxian.import">批量导入</el-button>
        <el-button type="primary"  @click.native.prevent="outImport"
        :disabled="quanxian.export">批量导出</el-button>
      </div>
      <!-- 表格 -->
      <div class="risk-table" v-show="isTableShow">
        <el-table stripe
          :data="riskQueryData"
          @selection-change="handleSelectionChange"
          style="width: 100%">
          <el-table-column
            type="selection"
            width="55">
          </el-table-column>
          <el-table-column
            label="产品类型"
            width="180">
            <template slot-scope="scope">
              <span style="margin-left: 10px">{{ scope.row.typeName }}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="险种代码"
            width="180">
            <template slot-scope="scope">
              <span style="margin-left: 10px; cursor: pointer; color: #409EFF;" @click="handleDetail(scope.row)">{{ scope.row.riskCode }}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="险种名称"
            width="180">
            <template slot-scope="scope">
              <span style="margin-left: 10px">{{ scope.row.riskName }}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="险种ID"
            v-if="idColumn"
            width="180">
            <template slot-scope="scope">
              <span style="margin-left: 10px">{{ scope.row.riskid }}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="险种类别（大类）"
            width="180">
            <template slot-scope="scope">
              <span style="margin-left: 10px">{{ scope.row.classBigCode === '1' && (scope.row.typeCode === '2' || scope.row.typeCode === '3')  ? '人寿保险' : '' }}
                {{ scope.row.classBigCode === '2' && (scope.row.typeCode === '2' || scope.row.typeCode === '3') ? '健康保险' : '' }}
                {{ scope.row.classBigCode === '3' && (scope.row.typeCode === '2' || scope.row.typeCode === '3') ? '意外伤害保险' : '' }}
                {{ scope.row.classBigCode === '4' && (scope.row.typeCode === '2' || scope.row.typeCode === '3') ? '其他类别' : '' }}
                {{ scope.row.classBigCode === '1' && scope.row.typeCode === '1' ? '企业财产保险' : '' }}
                {{ scope.row.classBigCode === '2' && scope.row.typeCode === '1' ? '家庭财产保险' : '' }}
                {{ scope.row.classBigCode === '3' && scope.row.typeCode === '1' ? '机动车辆保险' : '' }}
                {{ scope.row.classBigCode === '4' && scope.row.typeCode === '1' ? '工程保险' : '' }}
                {{ scope.row.classBigCode === '5' && scope.row.typeCode === '1' ? '责任保险' : '' }}
                {{ scope.row.classBigCode === '6' && scope.row.typeCode === '1' ? '信用保险' : '' }}
                {{ scope.row.classBigCode === '7' && scope.row.typeCode === '1' ? '保证保险' : '' }}
                {{ scope.row.classBigCode === '8' && scope.row.typeCode === '1' ? '船舶保险' : '' }}
                {{ scope.row.classBigCode === '9' && scope.row.typeCode === '1' ? '货物运输保险' : '' }}
                {{ scope.row.classBigCode === '10' && scope.row.typeCode === '1' ? '特殊风险保险' : '' }}
                {{ scope.row.classBigCode === '11' && scope.row.typeCode === '1' ? '农业保险' : '' }}
                {{ scope.row.classBigCode === '12' && scope.row.typeCode === '1' ? '健康险' : '' }}
                {{ scope.row.classBigCode === '13' && scope.row.typeCode === '1' ? '意外伤害保险' : '' }}
                {{ scope.row.classBigCode === '14' && scope.row.typeCode === '1' ? '其他险' : '' }}
              </span>
            </template>
          </el-table-column>
          <el-table-column
            label="险种类别（小类）"
            width="180">
            <template slot-scope="scope">
              <span style="margin-left: 10px">{{ scope.row.classBigCode === '1' && scope.row.classSmallCode === '1' && (scope.row.typeCode === '2' || scope.row.typeCode === '3') ? '定期保险' : ''}}
                {{ scope.row.classBigCode === '1' && scope.row.classSmallCode === '2' && (scope.row.typeCode === '2' || scope.row.typeCode === '3') ? '终身保险' : ''}}
                {{ scope.row.classBigCode === '1' && scope.row.classSmallCode === '3' && (scope.row.typeCode === '2' || scope.row.typeCode === '3') ? '两全保险' : ''}}
                {{ scope.row.classBigCode === '1' && scope.row.classSmallCode === '4' && (scope.row.typeCode === '2' || scope.row.typeCode === '3') ? '年金保险' : ''}}
                {{ scope.row.classBigCode === '2' && scope.row.classSmallCode === '5' && (scope.row.typeCode === '2' || scope.row.typeCode === '3') ? '疾病保险' : ''}}
                {{ scope.row.classBigCode === '2' && scope.row.classSmallCode === '6' && (scope.row.typeCode === '2' || scope.row.typeCode === '3') ? '医疗保险' : ''}}
                {{ scope.row.classBigCode === '2' && scope.row.classSmallCode === '7' && (scope.row.typeCode === '2' || scope.row.typeCode === '3') ? '失能收入损失险' : ''}}
                {{ scope.row.classBigCode === '2' && scope.row.classSmallCode === '8' && (scope.row.typeCode === '2' || scope.row.typeCode === '3') ? '护理保险' : ''}}
                {{ scope.row.classBigCode === '3' && scope.row.classSmallCode === '9' && (scope.row.typeCode === '2' || scope.row.typeCode === '3') ? '意外伤害保险' : ''}}
                {{ scope.row.classBigCode === '4' && scope.row.classSmallCode === '0' && (scope.row.typeCode === '2' || scope.row.typeCode === '3') ? '其他' : ''}}
                {{ scope.row.classBigCode === '2' && scope.row.classSmallCode === '1' && scope.row.typeCode === '1' ? '投资型家财险' : ''}}
                {{ scope.row.classBigCode === '2' && scope.row.classSmallCode === '7' && scope.row.typeCode === '1' ? '其他险' : ''}}
                {{ scope.row.classBigCode === '3' && scope.row.classSmallCode === '2' && scope.row.typeCode === '1' ? '交强险' : ''}}
                {{ scope.row.classBigCode === '3' && scope.row.classSmallCode === '7' && scope.row.typeCode === '1' ? '其他险' : ''}}
                {{ scope.row.classBigCode === '7' && scope.row.classSmallCode === '3' && scope.row.typeCode === '1' ? '机动车辆消费贷款保证保险' : ''}}
                {{ scope.row.classBigCode === '7' && scope.row.classSmallCode === '4' && scope.row.typeCode === '1' ? '个人贷款抵押房屋保证保险' : ''}}
                {{ scope.row.classBigCode === '7' && scope.row.classSmallCode === '7' && scope.row.typeCode === '1' ? '其他险' : ''}}
                {{ scope.row.classBigCode === '12' && scope.row.classSmallCode === '5' && scope.row.typeCode === '1' ? '投资性健康险' : ''}}
                {{ scope.row.classBigCode === '12' && scope.row.classSmallCode === '7' && scope.row.typeCode === '1' ? '其他险' : ''}}
                {{ scope.row.classBigCode === '13' && scope.row.classSmallCode === '7' && scope.row.typeCode === '1' ? '其他险' : ''}}
                {{ scope.row.classBigCode === '13' && scope.row.classSmallCode === '6' && scope.row.typeCode === '1' ? '投资性意外险' : ''}}
              </span>
            </template>
          </el-table-column>
          <el-table-column
            label="缴费年期"
            width="180">
            <template slot-scope="scope">
              <span style="margin-left: 10px">{{ scope.row.paymentperiod }}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="险种类型"
            width="180">
            <template slot-scope="scope">
              <span style="margin-left: 10px">
                {{ scope.row.classTypeCode === '0' ? '全部' : ''}}
                {{ scope.row.classTypeCode === '1' ? '普通型' : ''}}
                {{ scope.row.classTypeCode === '2' ? '利差返还型' : ''}}
                {{ scope.row.classTypeCode === '3' ? '分红型' : ''}}
                {{ scope.row.classTypeCode === '4' ? '万能型' : ''}}
                {{ scope.row.classTypeCode === '5' ? '投资连结型' : ''}}
                {{ scope.row.classTypeCode === '6' ? '其他' : ''}}
              </span>
            </template>
          </el-table-column>
          <el-table-column
            label="主险/附加险"
            width="180">
            <template slot-scope="scope">
              <span style="margin-left: 10px">{{ scope.row.mainOrExtrFlagName }}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="有效状态"
            width="180">
            <template slot-scope="scope">
              <span style="margin-left: 10px">{{ scope.row.valistatusName }}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="审核状态"
            width="180">
            <template slot-scope="scope">
              <span style="margin-left: 10px">{{ scope.row.checkStatusCode | checkType }}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="审核类型"
            width="180">
            <template slot-scope="scope">
              <span style="margin-left: 10px">{{ scope.row.checkType }}</span>
            </template>
          </el-table-column>
          <el-table-column label="查看" width="180">
            <template slot-scope="scope">
              <el-button
                size="mini"
                v-if="scope.row.checkType==='修改审核' && scope.row.checkStatus==='待审核'"
                @click="handleEdit(scope.$index, scope.row)">修改详情</el-button>
            </template>
          </el-table-column>
        </el-table>
      <!-- <div class="pagination" v-if='isPage'> -->
        <el-pagination
          v-if="(totalRecords ? totalRecords : tablePage.total)!=0"
          @current-change="handleCurrentChange"
          @size-change="handleSizeChange"
          :current-page="tablePage.currentPage"
          :page-sizes="[ 5 , 10, 20, 50]"
          :page-size="tablePage.pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="totalRecords ? totalRecords : tablePage.total">
        </el-pagination>
      <!-- </div> -->
      </div>
      <!-- 添加 -->
      <el-dialog
      title="新增险种"
      :visible.sync="addDialogVisible"
      :before-close="closeAddDia"
      append-to-body
      width="76%"
      center>
      <risk-form ref="addDia" :info='addInfo' :option='add' @getSubmitData='checkSubmit'></risk-form>
    </el-dialog>

    <!-- 修改 -->
    <el-dialog
      title="修改险种"
      :visible.sync="modDialogVisible"
      :append-to-body="true"
      width="76%"
      center>
      <risk-form ref="modDia" :info='modInfo' :option='mod' @getSubmitData='checkSubmit'></risk-form>
    </el-dialog>

    <!-- 详情 -->
    <el-dialog
      title="险种详情"
      :visible.sync="detailDialogVisible"
      :append-to-body="true"
      width="76%"
      center>
      <risk-form ref="detDia" :info='detailInfo' :option='detail'></risk-form>
    </el-dialog>

    <!-- 审核 -->
    <el-dialog
      title="险种审核"
      :visible.sync="isCheckDialogShow"
      :append-to-body="true"
      width="50%"
      center>
      <div class="check-dialog-wrapper">
        <el-form ref="form" :model="checkInfo" label-width="80px">
          <el-form-item label="审核结果">
            <el-radio-group v-model="checkInfo.checkCode" @change='handleCheckchange()'>
              <el-radio label="审核通过" value="1"></el-radio>
              <el-radio label="审核不通过" value="2"></el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="审核意见">
            <el-input type="textarea" v-model="checkInfo.checkConent"></el-input>
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="isCheckDialogShow = false">取 消</el-button>
        <el-button type="primary" @click='check()'>审 核</el-button>
      </span>
    </el-dialog>

    <!-- 双击弹框 -->
    <el-dialog :append-to-body="true" width="65%" title="保险公司代码" :before-close='comClose' :visible.sync="dialogTableVisibleCode" center>
      <el-table ref="multipleTable" @row-click="handleRowChange" :data="insComData" tooltip-effect="dark" style="width: 100%">
        <el-table-column prop="insurercode" label="保险公司代码" show-overflow-tooltip>
        </el-table-column>
        <el-table-column prop="insurername" label="保险公司名称" show-overflow-tooltip>
        </el-table-column>
      </el-table>
      <el-pagination
          @current-change="handleDiaCurrentChange"
          :current-page="currentPage"
          @size-change="handleDbSizeChange"
          :page-size="pageSize"
          :page-sizes="[ 5 , 10 , 20, 50]"
          layout="total, sizes, prev, pager, next, jumper"
          :total="dbtotalRecords ? dbtotalRecords : diaPage.total">
        </el-pagination>
      <span slot="footer" class="dialog-footer">
      </span>
    </el-dialog>

    <el-dialog :append-to-body="true" width="65%" title="险种代码" :before-close='orgClose' :visible.sync="dialogTableVisibleCode1" center>
      <el-table ref="multipleTable" @row-click="handleRiskRowChange" :data="riskData" tooltip-effect="dark" style="width: 100%">
        <el-table-column prop="riskcode" label="险种代码" show-overflow-tooltip>
        </el-table-column>
        <el-table-column prop="riskname" label="险种名称" show-overflow-tooltip>
        </el-table-column>
      </el-table>
      <el-pagination
          @current-change="handleRiskDialogCurrentChange"
          :current-page="currentPage"
          @size-change="handleDbRiskSizeChange"
          :page-size="pageSize"
          :page-sizes="[ 5 , 10 , 20, 50]"
          layout="total, sizes, prev, pager, next, jumper"
          :total="dbtotalRecords ? dbtotalRecords : diaPage1.total">
        </el-pagination>
      <span slot="footer" class="dialog-footer">
      </span>
    </el-dialog>

    <!-- 导入 -->
    <el-dialog
      title="批量导入"
      :visible.sync="isUpDialogShow"
      :append-to-body="true"
      width="50%"
      center>
      <risk-import></risk-import>
      <span slot="footer" class="dialog-footer">
      </span>
    </el-dialog>
  </div>
</template>

<script>
import NoticeBar from '@/components/notice-bar'
import LineTittle from '@/components/line-tittle'
import LabelText from '@/components/label-text'
import RiskImport from '@/pages/goodsCommRate_mgr/riskImport'
import RiskForm from '@/pages/goodsCommRate_mgr/riskForm'
import RiskDb from '@/pages/goodsCommRate_mgr/riskdbDia'
import { mapActions } from 'vuex'
import { api } from '@/api/lifeInsur_mgr/quitListMgr.js'
export default {
  name: '',
  data () {
    return {
      // isPage: false, // 是否显示分页
      loading: '',
      // totalRecords: 0,
      exportInfo: {
        typeName: '2',
        insurerCode: '',
        insurerName: '',
        riskCode: '',
        riskName: '',
        classBigCode: '',
        classSmallCode: '',
        classTypeCode: '',
        mainOrExtrFlagCode: '',
        longShortFlagCode: '',
        checkStatusCode: '1'
      },
      quanxian: {
        query: true,
        add: true,
        del: true,
        modify: true,
        import: true,
        review: true,
        export: true
      },
      info: {
        // insurerCode: '',
        // insurerName: '',
        // classSmallCode: '',
        // checkStatusCode: '1',
        // typeName: '2',
        // riskCode: '',
        // riskName: ''
        type: '2',
        insurerCode: '',
        insurerName: '',
        riskCode: '',
        riskName: '',
        classBigCode: '',
        classSmallCode: '',
        classTypeCode: '',
        mainOrExtrFlagCode: '',
        longShortFlagCode: '',
        checkStatusCode: '1',
        insurertype: ''
      },
      dbInfo: '',
      mod: 'mod',
      add: 'add',
      detail: 'detail',
      addInfo: {
        insurerCode: '',
        insurerName: '',
        riskCode: '',
        riskName: '',
        typeName: '',
        classBigCode: '',
        classSmallCode: '',
        classTypeCode: '',
        mainOrExtrFlagCode: '',
        longShortFlagCode: '',
        freeFlag: '',
        sexscopeCode: '',
        payCycleCode: '',
        paywayCode: '',
        tovalueratio: '',
        paymentperiod: '',
        payagetoplimit: '',
        agescopetop: '',
        agescopelow: '',
        cxCode: '',
        cxName: '',
        flagCode: '',
        type: '2'
      },
      modInfo: {},
      detailInfo: {},
      disabled: false, // 查询时输入框，下拉菜单无效
      disabled_1: false, // 弹出框内不是寿险，输入框，下拉菜单无效
      disabled_2: false, // 弹出框内输入框，下拉菜单无效
      disabled_3: false, // 弹出框内输入框，下拉菜单无效
      fileList: [],
      tableData: [],
      multipleSelection: [], // 查询结果选中数据
      dbselected: [], // 双击选中数据
      opt: '', // 新增或修改双击
      checkInfo: {},
      isTableShow: false,
      tablePage: {
        currentPage: 1,
        total: 0,
        size: 10
      },
      diaPage: {
        currentPage: 1,
        total: 0,
        size: 10
      },
      diaPage1: {
        currentPage: 1,
        total: 0,
        size: 10
      },
      idColumn: false, // 险种ID的列
      addDialogVisible: false, // 新增弹窗
      modDialogVisible: false, // 修改弹窗
      isCheckDialogShow: false, // 审核弹窗
      detailDialogVisible: false, // 详情弹框
      dialogTableVisibleCode: false, // 双击弹窗
      dialogTableVisibleCode1: false, // 双击弹窗
      isUpDialogShow: false, // 上传弹窗
      classBigNameList: [],
      classSmallNameList: [],
      paymentList: [],
      queryrules: {
        insurerCode: [
          { required: false, message: '请输入保险公司代码', trigger: 'change' }
        ],
        insurerName: [
          { required: false, message: '请输入保险公司名称', trigger: 'change' }
        ],
        typeName: [
          { required: true, message: '请选择产品类别', trigger: 'change' }
        ]
      },
      classTypeNameList: [
        {
          value: '0',
          label: '全部'
        },
        {
          value: '1',
          label: '普通型'
        },
        {
          value: '2',
          label: '利差返还型'
        },
        {
          value: '3',
          label: '分红型'
        },
        {
          value: '4',
          label: '万能型'
        },
        {
          value: '5',
          label: '投资连结型'
        },
        {
          value: '6',
          label: '其他'
        }
      ],
      mainOrExtrList: [
        {
          value: '1',
          label: '主险'
        },
        {
          value: '2',
          label: '附加险'
        },
        {
          value: '3',
          label: '主/附险'
        }
      ],
      // longShortList: [
      //   {label: '长期/短期标志'}
      // ],
      longShortList1: [
        {
          value: '0',
          label: '极短期'
        },
        {
          value: '1',
          label: '短期'
        },
        {
          value: '2',
          label: '长期'
        }
      ],
      longShortList2: [
        {
          value: '0',
          label: '极短期'
        },
        {
          value: '1',
          label: '短期'
        },
        {
          value: '2',
          label: '长期'
        }
      ],
      valistatusList: [
        {
          value: '1',
          label: '审核通过'
        },
        {
          value: '2',
          label: '审核不通过'
        },
        {
          value: '3',
          label: '待审核'
        }
      ],
      cplbList: [
        {
          value: '1',
          label: '财险'
        },
        {
          value: '2',
          label: '寿险'
        },
        {
          value: '3',
          label: '银保代理'
        }
      ],
      riskSelectData: {
        select_1: [
          {
            value: '1',
            label: '人寿保险',
            sub_select: [
              {
                value: '1',
                label: '定期保险'
              },
              {
                value: '2',
                label: '终身保险'
              },
              {
                value: '3',
                label: '两全保险'
              },
              {
                value: '4',
                label: '年金保险'
              }
            ]
          },
          {
            value: '2',
            label: '健康保险',
            sub_select: [
              {
                value: '5',
                label: '疾病保险'
              },
              {
                value: '6',
                label: '医疗保险'
              },
              {
                value: '7',
                label: '失能收入损失险'
              },
              {
                value: '8',
                label: '护理保险'
              }
            ]
          },
          {
            value: '3',
            label: '意外伤害保险',
            sub_select: [
              {
                value: '9',
                label: '意外伤害保险'
              }
            ]
          },
          {
            value: '4',
            label: '其他类别',
            sub_select: [
              {
                value: '0',
                label: '其他'
              }
            ]
          }
        ],
        select_2: [
          {
            value: '1',
            label: '企业财产保险'
          },
          {
            value: '2',
            label: '家庭财产保险',
            sub_select: [
              {
                value: '1',
                label: '投资型家财险'
              },
              {
                value: '7',
                label: '其他险'
              }
            ]
          },
          {
            value: '3',
            label: '机动车辆保险',
            sub_select: [
              {
                value: '2',
                label: '交强险'
              },
              {
                value: '7',
                label: '其他险'
              }
            ]
          },
          {
            value: '4',
            label: '工程保险'
          },
          {
            value: '5',
            label: '责任保险'
          },
          {
            value: '6',
            label: '信用保险'
          },
          {
            value: '7',
            label: '保证保险',
            sub_select: [
              {
                value: '3',
                label: '机动车辆消费贷款保证保险'
              },
              {
                value: '4',
                label: '个人贷款抵押房屋保证保险'
              },
              {
                value: '7',
                label: '其他险'
              }
            ]
          },
          {
            value: '8',
            label: '船舶保险'
          },
          {
            value: '9',
            label: '货物运输保险'
          },
          {
            value: '10',
            label: '特殊风险保险'
          },
          {
            value: '11',
            label: '农业保险'
          },
          {
            value: '12',
            label: '健康险',
            sub_select: [
              {
                value: '5',
                label: '投资性健康险'
              },
              {
                value: '7',
                label: '其他险'
              }
            ]
          },
          {
            value: '13',
            label: '意外伤害险',
            sub_select: [
              {
                value: '6',
                label: '投资性意外险'
              },
              {
                value: '7',
                label: '其他险'
              }
            ]
          },
          {
            value: '7',
            label: '其他险'
          }
        ]
      },
      selectedOpt: '1',
      paymentList_1: [
        {
          value: '1',
          label: '趸缴'
        },
        {
          value: '2',
          label: '期缴'
        },
        {
          value: '3',
          label: '不定期'
        },
        {
          value: '4',
          label: '缴至年龄'
        }
      ],
      paymentList_2: [
        {
          value: '1',
          label: '趸缴'
        },
        {
          value: '2',
          label: '期缴'
        },
        {
          value: '3',
          label: '不定期'
        }
      ],
      isyearshow: false,
      iswayshow: false,
      isageshow: false
    }
  },
  mounted () {
    api(
      `/auth/findButtonByUserCodeAndPage?userId=${
        this.$store.state.login.loginUserId
      }&page=产品管理`,
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
    comClose () {
      // 关闭弹窗
      // this.orgComSize = []
      this.dialogTableVisibleCode = false
      this.info.insurerCode = ''
      this.info.insurerName = ''
    },
    orgClose () {
      // 关闭弹窗
      // this.orgComSize = []
      this.dialogTableVisibleCode1 = false
      this.info.riskCode = ''
      this.info.riskName = ''
    },
    outImport () {
      // let delFlag = true
      // if (delFlag) {
      //   this.outImport(this.multipleSelection).then(resp => {
      //     if (resp.data.code === '000004') {
      //       this.$message({
      //         showClose: true,
      //         message: resp.data.msg,
      //         type: 'error'
      //       })
      //     }
      //   })
      // }
      // 批量导出
      if (
        this.info.checkStatusCode === '2' ||
        this.info.checkStatusCode === '3'
      ) {
        this.$message({
          showClose: true,
          message: '仅可对审核通过的数据进行导出',
          type: 'error'
        })
        return false
      }
      window.open(`/tabycore/lifeInsurance/exportExcel?typeName=${
        this.info.type
      }&insurerCode=${this.info.insurerCode}&insurerName=${
        this.info.insurerName
      }&riskcode=${this.info.riskCode}&riskname=${
        this.info.riskName
      }&classBigCode=${this.info.classBigCode}&classSmallCode=${
        this.info.classSmallCode
      }&classTypeCode=${this.info.classTypeCode}&mainOrExtrFlagCode=${
        this.info.mainOrExtrFlagCode
      }&longShortFlagCode=${this.info.longShortFlagCode}&checkStatusCode=${
        this.info.checkStatusCode
      }`)
    },
    indexSelect (event) {
      this.info.classSmallCode = ''
      this.classSmallNameList = this.riskFilter(this.info.classBigCode)
    },
    handleQuery () {
      this.tablePage.currentPage = 1
      this.tablePage.pageSize = 5
      this.gethandleQuery()
    },
    gethandleQuery () {
      // this.isPage = true
      // this.info.totalRecords = this.tablePage.totalRecords
      this.info.currentPage = this.tablePage.currentPage
      this.info.pageSize = this.tablePage.pageSize
      this.$refs['queryForm'].validate(valid => {
        if (valid) {
          this.Loading()
          this.queryRisk(this.info).then(() => {
            this.isTableShow = true
            this.closeLoading()
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    riskFilter (type) {
      let result = ''
      if (this.info.typeName === '寿险' || this.info.typeName === '银保代理') {
        for (let i = 0; i < this.riskSelectData.select_1.length; i++) {
          if (this.riskSelectData.select_1[i].value === type) {
            result = this.riskSelectData.select_1[i].sub_select
              ? this.riskSelectData.select_1[i].sub_select
              : []
          }
        }
      } else if (this.info.typeName === '财险') {
        for (let i = 0; i < this.riskSelectData.select_2.length; i++) {
          if (this.riskSelectData.select_2[i].value === type) {
            result = this.riskSelectData.select_2[i].sub_select
              ? this.riskSelectData.select_2[i].sub_select
              : []
          }
        }
      }
      return result
    },
    ...mapActions([
      'queryRisk',
      'getInsurers_1',
      'modRisk',
      'delRisk',
      'addRisk',
      'getRiskcodes',
      'getInsuranceCom',
      'checkRisk',
      'getRiskDetail'
    ]),
    handleAdd () {
      this.addDialogVisible = true
    },
    handleUpdate () {
      if (this.multipleSelection.length > 1) {
        this.$message({
          showClose: true,
          message: '仅可选一条记录进行修改操作！',
          type: 'error'
        })
      } else if (this.multipleSelection.length === 0) {
        this.$message({
          showClose: true,
          message: '请先选择数据记录！',
          type: 'error'
        })
      } else if (this.multipleSelection[0].checkStatusCode !== '3') {
        this.modDialogVisible = true
        this.modInfo = JSON.parse(JSON.stringify(this.multipleSelection[0]))
        this.$nextTick(() => {
          this.$refs.modDia.clearValidate()
          this.$refs.modDia.selectOption()
        })
      } else {
        this.$message({
          showClose: true,
          message: '仅可对审核通过、审核不通过的记录进行修改',
          type: 'error'
        })
      }
    },
    handleDelete () {
      let delFlag = true
      if (this.multipleSelection.length === 0) {
        this.$message({
          showClose: true,
          message: '请先选择数据记录！',
          type: 'error'
        })
      } else {
        this.multipleSelection.forEach(ele => {
          if (ele.checkStatusCode === '3') {
            this.$message({
              showClose: true,
              message: '仅可对审核通过、审核不通过的记录进行删除',
              type: 'error'
            })
            delFlag = false
          } else {
            if (delFlag) {
              this.delRisk(this.multipleSelection).then(resp => {
                if (resp.data.code === '000000') {
                  this.$message({
                    showClose: true,
                    message: resp.data.msg,
                    type: 'success'
                  })
                  this.gethandleQuery()
                } else {
                  this.$message({
                    showClose: true,
                    message: resp.data.msg,
                    type: 'error'
                  })
                }
              })
            }
          }
        })
      }
    },
    handleCheck () {
      this.checkInfo = {}
      if (this.multipleSelection.length === 0) {
        this.$message({
          showClose: true,
          message: '请先选择数据记录！',
          type: 'error'
        })
      } else {
        this.multipleSelection.forEach(ele => {
          if (ele.checkStatusCode !== '3') {
            this.isCheckDialogShow = false
            this.$message({
              showClose: true,
              message: '仅可对待审核的记录进行审核',
              type: 'error'
            })
          } else {
            this.isCheckDialogShow = true
            this.checkInfo.checkConent = ''
          }
        })
      }
    },
    handleDetail (row) {
      this.detailDialogVisible = true
      this.detailInfo = JSON.parse(JSON.stringify(row))
      this.$nextTick(() => {
        this.$refs.detDia.selectOption()
      })
    },
    handleEdit (i, row) {
      let paramJson = {}
      paramJson.id = row.id
      this.getRiskDetail(paramJson).then(resp => {
        this.detailDialogVisible = true
        this.detailInfo = JSON.parse(JSON.stringify(resp.data))
        this.$nextTick(() => {
          this.$refs.detDia.selectOption()
        })
      })
    },
    dbqueryCom (opt) {
      this.dialogTableVisibleCode = true
      this.diaPage.currentPage = 1
      this.diaPage.pageSize = 5
      this.getdbqueryCom()
    },
    getdbqueryCom () {
      let jsonObj = Object.assign({}, this.info)
      jsonObj.currentPage = this.diaPage.currentPage
      jsonObj.pageSize = this.diaPage.pageSize
      this.getInsuranceCom(jsonObj)
    },
    dbSubmit () {
      this.info.type = this.dbselected.insurertype
      this.info.insurerCode = this.dbselected.insurerCode
      this.info.insurerName = this.dbselected.insurerName
      this.info.insurertype = this.dbselected.insurertype
      if (this.info.insurertype === '1') {
        this.info.typeName = '财险'
        this.classBigNameList = this.riskSelectData.select_2
        this.disabled = false
        this.idColumn = false
      } else if (this.info.insurertype === '2') {
        this.info.typeName = '寿险'
        this.classBigNameList = this.riskSelectData.select_1
        this.disabled = false
        this.disabled_1 = true
        this.paymentList = this.paymentList_1
        this.longShortList = this.longShortList1
        this.idColumn = true
      } else if (this.info.insurertype === '3') {
        this.info.typeName = '银保代理'
        this.classBigNameList = this.riskSelectData.select_1
        this.paymentList = this.paymentList_2
        this.longShortList = this.longShortList2
        this.disabled = false
        this.idColumn = false
      }
      this.dialogTableVisibleCode = false
    },
    dbqueryRisk () {
      if (this.info.insurerCode) {
        this.dialogTableVisibleCode1 = true
        this.diaPage1.currentPage = 1
        this.diaPage1.pageSize = 5
        this.getdbqueryRisk()
      } else {
        this.$message({
          showClose: true,
          message: '请先选择一个保险公司',
          type: 'error'
        })
      }
    },
    getdbqueryRisk () {
      let jsonObj = Object.assign({}, this.info)
      jsonObj.currentPage = this.diaPage1.currentPage
      jsonObj.pageSize = this.diaPage1.pageSize
      this.getRiskcodes(jsonObj)
    },
    dbRiskSubmit () {
      this.info.riskCode = this.dbselected.riskCode
      this.info.riskName = this.dbselected.riskName
      this.dialogTableVisibleCode1 = false
    },
    handleRowChange (row, event, column) {
      this.dbselected.insurerCode = row.insurercode
      this.dbselected.insurerName = row.insurername
      this.dbselected.insurertype = row.insurertype
      // this.dbselected.riskCode = row.riskcode
      // this.dbselected.riskName = row.riskname
      this.dbSubmit()
    },
    handleRiskRowChange (row, event, column) {
      this.dbselected.riskCode = row.riskcode
      this.dbselected.riskName = row.riskname
      this.dbRiskSubmit()
    },
    paymentSelect () {
      if (this.addInfo.payCycleCode === 2) {
        this.isyearshow = true
        this.iswayshow = true
      } else if (this.addInfo.payCycleCode === 4) {
        this.isageshow = true
        this.iswayshow = true
      } else {
        this.isyearshow = false
        this.iswayshow = false
        this.isageshow = false
      }
    },
    handleCurrentChange (val) {
      this.tablePage.currentPage = val
      this.gethandleQuery()
    },
    handleDiaCurrentChange (val) {
      this.diaPage.currentPage = val
      this.getdbqueryCom()
    },
    handleRiskDialogCurrentChange (val) {
      this.diaPage1.currentPage = val
      this.getdbqueryRisk()
    },
    // 新增、修改提交审核
    checkSubmit (opt, data) {
      if (opt === 'add') {
        this.addRisk(data).then(resp => {
          if (resp.data.code === '000000') {
            this.$message({
              showClose: true,
              message: resp.data.msg,
              type: 'success'
            })
            this.gethandleQuery()
          } else {
            this.$message({
              showClose: true,
              message: resp.data.msg,
              type: 'error'
            })
          }
        })
        this.addDialogVisible = false
      } else if (opt === 'mod') {
        this.modRisk(data).then(resp => {
          if (resp.data.code === '000000') {
            this.$message({
              showClose: true,
              message: resp.data.msg,
              type: 'success'
            })
            this.gethandleQuery()
          } else {
            this.$message({
              showClose: true,
              message: resp.data.msg,
              type: 'error'
            })
          }
        })
        this.modDialogVisible = false
      }
    },
    handleImport () {
      // this.$router.push('/risk/upload')
      this.isUpDialogShow = true
    },
    handleSelectionChange (val) {
      this.multipleSelection = val
    },
    handleCheckchange () {},
    check () {
      if (this.checkInfo.checkCode) {
        if (this.checkInfo.checkCode === '审核通过') {
          this.checkInfo.checkCode = 1
        } else if (this.checkInfo.checkCode === '审核不通过') {
          this.checkInfo.checkCode = 2
        }
        this.checkInfo.list = this.multipleSelection
        this.checkRisk(this.checkInfo).then(resp => {
          if (resp.data.code === '000000') {
            this.$message({
              showClose: true,
              message: resp.data.msg,
              type: 'success'
            })
            this.gethandleQuery()
          } else {
            this.$message({
              showClose: true,
              message: resp.data.msg,
              type: 'error'
            })
          }
        })
        this.isCheckDialogShow = false
      } else {
        this.$message({
          showClose: true,
          message: '请勾选审核结果',
          type: 'error'
        })
      }
    },
    closeAddDia () {
      this.addDialogVisible = false
      this.$refs.addDia.resetForm()
    },
    handleSizeChange (val) {
      this.tablePage.pageSize = val
      this.tablePage.currentPage = 1
      this.gethandleQuery()
    },
    handleDbSizeChange (val) {
      this.diaPage.pageSize = val
      this.diaPage.currentPage = 1
      this.getdbqueryCom()
    },
    handleDbRiskSizeChange (val) {
      this.diaPage1.pageSize = val
      this.diaPage1.currentPage = 1
      this.getdbqueryRisk()
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
    }
  },
  components: {
    [NoticeBar.name]: NoticeBar,
    [LineTittle.name]: LineTittle,
    [LabelText.name]: LabelText,
    [RiskImport.name]: RiskImport,
    [RiskForm.name]: RiskForm,
    [RiskDb.name]: RiskDb
  },
  created () {},
  watch: {
    'info.insurerCode' () {
      if (this.info.insurerCode === '') {
        this.info.insurerName = ''
        // this.info.typeName = ''
        this.info.riskCode = ''
        this.info.riskName = ''
      }
    },
    'info.type' () {
      if (this.info.type === '1') {
        this.info.insurerCode = ''
        this.info.insurerName = ''
        this.info.riskCode = ''
        this.info.riskName = ''
      }
      if (this.info.type === '2') {
        this.info.insurerCode = ''
        this.info.insurerName = ''
        this.info.riskCode = ''
        this.info.riskName = ''
      }
      if (this.info.type === '3') {
        this.info.insurerCode = ''
        this.info.insurerName = ''
        this.info.riskCode = ''
        this.info.riskName = ''
      }
    },
    'info.insurerName' () {
      if (this.info.insurerName === '') {
        this.info.insurerCode = ''
        // this.info.typeName = ''
      }
    },
    'info.riskCode' () {
      if (this.info.riskCode === '') {
        this.info.riskName = ''
      }
    }
  },
  computed: {
    riskQueryData () {
      return this.$store.state.riskMgr.riskQueryData
    },
    getInsurers () {
      return this.$store.state.InsuranceCo.getInsurers
    },
    totalRecords () {
      return parseInt(this.$store.state.riskMgr.riskTotalRecords)
    },
    dbtotalRecords () {
      return parseInt(this.$store.state.riskMgr.dbtotalRecords)
    },
    insComData () {
      return this.$store.state.riskMgr.insComData
    },
    riskData () {
      return this.$store.state.riskMgr.riskData
    },
    currentPage () {
      return this.$store.state.riskMgr.currentPage
    },
    pageSize () {
      return this.$store.state.riskMgr.pageSize
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
/*分页*/
// .pagination {
//   text-align: right;
//   margin: 20px auto;
// }
</style>

<style lang="scss" type="text/css" scoped>
.risk-dialog-wrapper .lt-label,
.risk-dialog-wrapper .el-form-item {
  float: left;
  margin-bottom: 2px;
}
</style>
>>>>>>> .r53472
