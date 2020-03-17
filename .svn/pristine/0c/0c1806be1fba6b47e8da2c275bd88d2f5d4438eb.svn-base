<template>
  <div id="orgadd" >
      <ui-notice-bar slot="breadcast" >
        <el-breadcrumb slot="location" separator=">">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>佣金率管理</el-breadcrumb-item>
            <el-breadcrumb-item>银代首/续佣率配置</el-breadcrumb-item>
          </el-breadcrumb>
      </ui-notice-bar>
      <div class="ri-content" slot="content" >
        <el-form ref="queryInfo" :rules="rules1" :model="queryInfo">
          <el-row class="ri-line1">
            <el-col :span="12">
              <el-form-item prop='insurerCode'>
                <ui-label-text labelWidth="120" label="保险公司代码:" >
                  <el-input v-model="queryInfo.insurerCode" slot="text" clearable @blur='opensingleComDialog(0)' @dblclick.native="openComDialog(0)" placeholder="双击可选择"></el-input>
                </ui-label-text>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item prop='insurerName'>
                <ui-label-text labelWidth="120" label="保险公司名称:" >
                  <el-input v-model="queryInfo.insurerName" slot="text" clearable @blur='opensingleComDialog(0)'  @dblclick.native="openComDialog(0)" placeholder="双击可选择"></el-input>
                </ui-label-text>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row class="ri-line">
            <el-col :span="12">
              <el-form-item prop='orgCode'>
                <ui-label-text labelWidth="120" label="保险机构代码:" >
                  <el-input v-model="queryInfo.orgCode" slot="text" clearable @blur='opensingleComDialog(1)'  @dblclick.native="openComDialog(1)" placeholder="双击可选择"></el-input>
                </ui-label-text>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item prop='orgName'>
                <ui-label-text labelWidth="120" label="保险机构名称:" >
                  <el-input v-model="queryInfo.orgName" slot="text"  clearable @blur='opensingleComDialog(1)' @dblclick.native="openComDialog(1)" placeholder="双击可选择"></el-input>
                </ui-label-text>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row class="ri-line">
            <el-col :span="12">
              <el-form-item prop='comCode'>
                <ui-label-text labelWidth="120" label="佰盈机构代码:" >
                  <el-input v-model="queryInfo.comCode" slot="text"  clearable @blur='opensingleComDialog(2)' @dblclick.native="openComDialog(2)" placeholder="双击可选择"></el-input>
                </ui-label-text>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item prop='comName'>
                <ui-label-text labelWidth="120" label="佰盈机构名称:" >
                  <el-input v-model="queryInfo.comName" slot="text"  clearable @blur='opensingleComDialog(2)' @dblclick.native="openComDialog(2)" placeholder="双击可选择"></el-input>
                </ui-label-text>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
      <div class="btn-container" slot="controlbar" >
          <el-button type="primary" :disabled="quanxian.query" @click.native.prevent="submitForm('queryInfo',0)">查询</el-button>
          <el-button type="primary" :disabled="quanxian.import" @click.native.prevent="shangchuanDialogOpen()">首/续佣率导入</el-button>
      </div>
      <div v-if='tableShowOrNot'>
        <el-table stripe ref="multipleTable" :data="commissionQueryData" tooltip-effect="dark" style="width: 100%"  @selection-change="handleSelectionChange">
          <el-table-column type="selection" width="55"></el-table-column>
          <el-table-column prop="insureCode" label="保险公司代码"  width="150">
          </el-table-column>
          <el-table-column prop="insureName" label="保险公司名称" width="300" show-overflow-tooltip>
          </el-table-column>
          <el-table-column prop="orgCode" label="保险机构代码"  width="150">
          </el-table-column>
          <el-table-column prop="orgName" label="保险机构名称" width="300" show-overflow-tooltip>
          </el-table-column>
          <el-table-column prop="comCode" label="佰盈机构代码"  width="150">
          </el-table-column>
          <el-table-column prop="comName" label="佰盈机构名称" width="300" show-overflow-tooltip>
          </el-table-column>
          <el-table-column prop="riskCode" label="险种代码"  width="150">
          </el-table-column>
          <el-table-column prop="riskName" label="险种名称" width="300" show-overflow-tooltip>
          </el-table-column>
          <el-table-column prop="period" label="缴费年期" width="120">
          </el-table-column>
          <el-table-column prop="firstcommissionrate" label="首年基础佣金率(%)" width="120">
          </el-table-column>
          <el-table-column prop="continuedCommission2" label="第二年度佣金率（%）" width="120">
          </el-table-column>
          <el-table-column prop="continuedCommission3" label="第三年度佣金率（%）" width="120">
          </el-table-column>
          <el-table-column prop="continuedCommission4" label="第四年度佣金率（%）" width="120">
          </el-table-column>
          <el-table-column prop="continuedCommission5" label="第五年度佣金率（%）" width="120">
          </el-table-column>
          <el-table-column prop="assessmentcommissionrate" label="考核绩效比例（%）" width="120">
          </el-table-column>
          <el-table-column prop="bankCode" label="银行渠道代码" width="120">
          </el-table-column>
          <el-table-column prop="bankName" label="银行渠道名称" width="300">
          </el-table-column>
        </el-table>
        <el-row class="ri-line">
          <el-col :span="12">
            <el-button type="primary" @click.native.prevent="openAddDialog()" class="btn-rowGroup" :disabled="quanxian.add">新增</el-button>
            <el-button type="primary" @click.native.prevent="openXiugaiDialog()" class="btn-rowGroup" :disabled="quanxian.modify">修改</el-button>
            <el-button type="danger" @click.native.prevent="deleteData()" class="btn-rowGroup" :disabled="quanxian.del">删除</el-button>
          </el-col>
          <el-col :span="12">
            <div>
              <el-pagination
                @current-change="handleCurrentChange"
                @size-change="handleSizeChange"
                :current-page="queryInfo.currentPage"
                :page-size ="queryInfo.pageSize"
                :page-sizes="[10,20,50]"
                layout="total, sizes, prev, pager, next, jumper"
                :total="totalRecords"
                >
              </el-pagination>
            </div>
          </el-col>
        </el-row>
      </div>
      <el-dialog :append-to-body='true' :visible.sync='shangchuanDialog' :before-close='shangchuanDialogClose'>
        <div class="rate-wrapper">
          <div class="ri-content" slot="content" >
            <span>请选择文件路径</span>
            <el-upload
              class="upload-rate"
              :action="uploadUrl()"
              :limit="1"
              name="fileName"
              :auto-upload="false"
              ref="upload"
              :on-success="handleEXLSuccess"
              accept='xls'
              :file-list="fileList">
              <el-button size="small" type="primary">选取文件</el-button>
              <div slot="tip" class="el-upload__tip"></div>
            </el-upload>
            <el-button type="success" @click="goUpload" >上传文件</el-button>
            <a @click="downModal()" href="javascript:void(0)" download>导入模板下载</a>
          </div>
        </div>
      </el-dialog>
    <el-dialog :append-to-body='true' center title="新增配置" :visible.sync='addDialog' :before-close='addDialogClose'>
      <el-form ref="queryInfoAdddialog" :rules="rules2" :model="queryInfoAdddialog">
        <el-row class="ri-line">
          <el-col :span="12">
            <el-form-item prop='insureCode'>
              <ui-label-text labelWidth="120" label="保险公司代码:"  :required="true">
                <el-input v-model="queryInfoAdddialog.insureCode" slot="text" @dblclick.native="openComDialog(3)"  clearable @blur='opensingleComDialog(3)' placeholder="双击可选择" ></el-input>
              </ui-label-text>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item prop='insureName'>
              <ui-label-text labelWidth="120" label="保险公司名称:"  :required="true">
                <el-input v-model="queryInfoAdddialog.insureName" slot="text"  @dblclick.native="openComDialog(3)"  clearable @blur='opensingleComDialog(3)' placeholder="双击可选择" ></el-input>
              </ui-label-text>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row class="ri-line">
          <el-col :span="12">
            <el-form-item prop='orgCode'>
              <ui-label-text labelWidth="120" label="保险机构代码:"  :required="true">
                <el-input v-model="queryInfoAdddialog.orgCode" slot="text"  @dblclick.native="openComDialog(4)"  clearable @blur='opensingleComDialog(4)' placeholder="双击可选择" ></el-input>
              </ui-label-text>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item prop='orgName'>
              <ui-label-text labelWidth="120" label="保险机构名称:"  :required="true">
                <el-input v-model="queryInfoAdddialog.orgName" slot="text"  @dblclick.native="openComDialog(4)"  clearable @blur='opensingleComDialog(4)' placeholder="双击可选择" ></el-input>
              </ui-label-text>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row class="ri-line">
          <el-col :span="12">
            <el-form-item prop='comCode'>
              <ui-label-text labelWidth="120" label="佰盈机构代码:"  :required="true">
                <el-input v-model="queryInfoAdddialog.comCode" slot="text"  @dblclick.native="openComDialog(5)"  clearable @blur='opensingleComDialog(5)' placeholder="双击可选择" ></el-input>
              </ui-label-text>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item prop='comName'>
              <ui-label-text labelWidth="120" label="佰盈机构名称:"  :required="true">
                <el-input v-model="queryInfoAdddialog.comName" slot="text"  @dblclick.native="openComDialog(5)"  clearable @blur='opensingleComDialog(5)' placeholder="双击可选择" ></el-input>
              </ui-label-text>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row class="ri-line">
          <el-col :span="12">
            <el-form-item prop='riskcode'>
              <ui-label-text labelWidth="120" label="险种代码:"  :required="true">
                <el-input v-model="queryInfoAdddialog.riskcode" slot="text" @dblclick.native="openComDialog(11)" clearable @blur='opensingleComDialog(9)' placeholder="双击可选择"></el-input>
              </ui-label-text>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item prop='riskname'>
              <ui-label-text labelWidth="120" label="险种名称:"  :required="true">
                <el-input v-model="queryInfoAdddialog.riskname" slot="text" @dblclick.native="openComDialog(11)" clearable @blur='opensingleComDialog(9)' placeholder="双击可选择"></el-input>
              </ui-label-text>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row class="ri-line">
          <el-col :span="12">
            <el-form-item prop='bankCode'>
              <ui-label-text labelWidth="120" label="银行渠道代码:" >
                <el-select v-model="bankData" slot="text" placeholder="请选择">
                  <el-option label="ZX" value="ZX-直销"></el-option>
                  <el-option label="CITIC" value="CITIC-中信银行"></el-option>
                  <el-option label="ABC" value="ABC-中国农业银行"></el-option>
                  <el-option label="ICBC" value="ICBC-中国工商银行"></el-option>
                  <el-option label="CCB" value="CCB-中国建设银行"></el-option>
                  <el-option label="PSBC" value="PSBC-中国邮政储蓄银行有限公司"></el-option>
                  <el-option label="BOC" value="BOC-中国银行"></el-option>
                  <el-option label="BOCOM" value="BOCOM-交通银行"></el-option>
                  <el-option label="CMB" value="CMB-招商银行"></el-option>
                </el-select>
              </ui-label-text>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item prop='bankName'>
              <ui-label-text labelWidth="120" label="银行渠道名称:" >
                <el-select v-model="bankData" slot="text" placeholder="请选择">
                  <el-option label="直销" value="ZX-直销"></el-option>
                  <el-option label="中信银行" value="CITIC-中信银行"></el-option>
                  <el-option label="中国农业银行" value="ABC-中国农业银行"></el-option>
                  <el-option label="中国工商银行" value="ICBC-中国工商银行"></el-option>
                  <el-option label="中国建设银行" value="CCB-中国建设银行"></el-option>
                  <el-option label="中国邮政储蓄银行有限公司" value="PSBC-中国邮政储蓄银行有限公司"></el-option>
                  <el-option label="中国银行" value="BOC-中国银行"></el-option>
                  <el-option label="交通银行" value="BOCOM-交通银行"></el-option>
                  <el-option label="招商银行" value="CMB-招商银行"></el-option>
                </el-select>
              </ui-label-text>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row class="ri-line">
          <el-col :span="12">
            <el-form-item prop='period'>
              <ui-label-text labelWidth="120" label="缴费年期:"  :required="true">
                <el-input v-model="queryInfoAdddialog.period" slot="text" ></el-input>
              </ui-label-text>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item prop='firstcommissionrate'>
              <ui-label-text labelWidth="120" label="首年基础佣金率（%）:"  :required="true">
                <el-input v-model="queryInfoAdddialog.firstcommissionrate" slot="text" ></el-input>
              </ui-label-text>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row class="ri-line">
          <el-col :span="12">
            <el-form-item prop='continuedCommission2'>
              <ui-label-text labelWidth="120" label="第二年度佣金率(%):" >
                <el-input v-model="queryInfoAdddialog.continuedCommission2" slot="text"></el-input>
              </ui-label-text>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item prop='continuedCommission3'>
              <ui-label-text labelWidth="120" label="第三年度佣金率(%):" >
                <el-input v-model="queryInfoAdddialog.continuedCommission3" slot="text"></el-input>
              </ui-label-text>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row class="ri-line">
          <el-col :span="12">
            <el-form-item prop='continuedCommission4'>
              <ui-label-text labelWidth="120" label="第四年度佣金率(%):" >
                <el-input v-model="queryInfoAdddialog.continuedCommission4" slot="text"></el-input>
              </ui-label-text>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item prop='continuedCommission5'>
              <ui-label-text labelWidth="120" label="第五年度佣金率(%):" >
                <el-input v-model="queryInfoAdddialog.continuedCommission5" slot="text"></el-input>
              </ui-label-text>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row class="ri-line">
          <el-col :span="12">
            <el-form-item prop='assessmentcommissionrate'>
              <ui-label-text labelWidth="120" label="考核绩效比例（%）" >
                <el-input v-model="queryInfoAdddialog.assessmentcommissionrate" slot="text"></el-input>
              </ui-label-text>
            </el-form-item>
          </el-col>
        </el-row>
        <div class="btn-container">
          <el-form-item>
            <el-button type="primary" @click="submitForm('queryInfoAdddialog',2)">提交</el-button>
          </el-form-item>
        </div>
      </el-form>
    </el-dialog>
    <el-dialog :append-to-body='true' center title="修改配置" :visible.sync='xiugaiDialog' :before-close='xiugaiDialogClose'>
      <el-form  ref="queryInfoXiugaiDialog" :rules="rules3" :model="queryInfoXiugaiDialog">
        <el-row class="ri-line">
          <el-col :span="12">
            <el-form-item prop='insureCode'>
              <ui-label-text labelWidth="120" label="保险公司代码:"  :required="true">
                <el-input v-model="queryInfoXiugaiDialog.insureCode" readonly slot="text"  placeholder="双击可选择" ></el-input>
              </ui-label-text>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item prop='insureName'>
              <ui-label-text labelWidth="120" label="保险公司名称:"  :required="true">
                <el-input v-model="queryInfoXiugaiDialog.insureName" readonly slot="text"  placeholder="双击可选择" ></el-input>
              </ui-label-text>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row class="ri-line">
          <el-col :span="12">
            <el-form-item prop='orgCode'>
              <ui-label-text labelWidth="120" label="保险机构代码:"  :required="true">
                <el-input v-model="queryInfoXiugaiDialog.orgCode" readonly slot="text"  ></el-input>
              </ui-label-text>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item prop='orgName'>
              <ui-label-text labelWidth="120" label="保险机构名称:"  :required="true">
                <el-input v-model="queryInfoXiugaiDialog.orgName" readonly slot="text" ></el-input>
              </ui-label-text>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row class="ri-line">
          <el-col :span="12">
            <el-form-item prop='comCode'>
              <ui-label-text labelWidth="120" label="佰盈机构代码:"  :required="true">
                <el-input v-model="queryInfoXiugaiDialog.comCode" readonly slot="text" ></el-input>
              </ui-label-text>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item prop='comName'>
              <ui-label-text labelWidth="120" label="佰盈机构名称:"  :required="true">
                <el-input v-model="queryInfoXiugaiDialog.comName" readonly slot="text"></el-input>
              </ui-label-text>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row class="ri-line">
          <el-col :span="12">
            <el-form-item prop='riskcode'>
              <ui-label-text labelWidth="120" label="险种代码:"  :required="true">
                <el-input v-model="queryInfoXiugaiDialog.riskcode" readonly slot="text"></el-input>
              </ui-label-text>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item prop='riskname'>
              <ui-label-text labelWidth="120" label="险种名称:"  :required="true">
                <el-input v-model="queryInfoXiugaiDialog.riskname" readonly slot="text"></el-input>
              </ui-label-text>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row class="ri-line">
          <el-col :span="12">
            <el-form-item prop='bankData'>
              <ui-label-text labelWidth="120" label="银行渠道代码:" >
                <el-select v-model="bankData" slot="text" placeholder="请选择">
                  <el-option label="ZX" value="ZX-直销"></el-option>
                  <el-option label="CITIC" value="CITIC-中信银行"></el-option>
                  <el-option label="ABC" value="ABC-中国农业银行"></el-option>
                  <el-option label="ICBC" value="ICBC-中国工商银行"></el-option>
                  <el-option label="CCB" value="CCB-中国建设银行"></el-option>
                  <el-option label="PSBC" value="PSBC-中国邮政储蓄银行有限公司"></el-option>
                  <el-option label="BOC" value="BOC-中国银行"></el-option>
                  <el-option label="BOCOM" value="BOCOM-交通银行"></el-option>
                  <el-option label="CMB" value="CMB-招商银行"></el-option>
                </el-select>
              </ui-label-text>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item prop='bankData'>
              <ui-label-text labelWidth="120" label="银行渠道名称:" >
                <el-select v-model="bankData" slot="text" placeholder="请选择">
                  <el-option label="直销" value="ZX-直销"></el-option>
                  <el-option label="中信银行" value="CITIC-中信银行"></el-option>
                  <el-option label="中国农业银行" value="ABC-中国农业银行"></el-option>
                  <el-option label="中国工商银行" value="ICBC-中国工商银行"></el-option>
                  <el-option label="中国建设银行" value="CCB-中国建设银行"></el-option>
                  <el-option label="中国邮政储蓄银行有限公司" value="PSBC-中国邮政储蓄银行有限公司"></el-option>
                  <el-option label="中国银行" value="BOC-中国银行"></el-option>
                  <el-option label="交通银行" value="BOCOM-交通银行"></el-option>
                  <el-option label="招商银行" value="CMB-招商银行"></el-option>
                </el-select>
              </ui-label-text>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row class="ri-line">
          <el-col :span="12">
            <el-form-item prop='period'>
              <ui-label-text labelWidth="120" label="缴费年期:"  :required="true">
                <el-input v-model="queryInfoXiugaiDialog.period" readonly slot="text" ></el-input>
              </ui-label-text>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item prop='firstcommissionrate'>
              <ui-label-text labelWidth="120" label="首年基础佣金率（%）" >
                <el-input v-model="queryInfoXiugaiDialog.firstcommissionrate" slot="text"></el-input>
              </ui-label-text>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row class="ri-line">
          <el-col :span="12">
            <el-form-item prop='continuedCommission2'>
              <ui-label-text labelWidth="120" label="第二年度佣金率(%):" >
                <el-input v-model="queryInfoXiugaiDialog.continuedCommission2" slot="text"></el-input>
              </ui-label-text>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item prop='continuedCommission3'>
              <ui-label-text labelWidth="120" label="第三年度佣金率(%):" >
                <el-input v-model="queryInfoXiugaiDialog.continuedCommission3" slot="text"></el-input>
              </ui-label-text>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row class="ri-line">
          <el-col :span="12">
            <el-form-item prop='continuedCommission4'>
              <ui-label-text labelWidth="120" label="第四年度佣金率(%):" >
                <el-input v-model="queryInfoXiugaiDialog.continuedCommission4" slot="text"></el-input>
              </ui-label-text>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item prop='continuedCommission5'>
              <ui-label-text labelWidth="120" label="第五年度佣金率(%):" >
                <el-input v-model="queryInfoXiugaiDialog.continuedCommission5" slot="text"></el-input>
              </ui-label-text>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row class="ri-line">
          <el-col :span="12">
            <el-form-item prop='assessmentcommissionrate'>
              <ui-label-text labelWidth="120" label="考核绩效比例（%）:" >
                <el-input v-model="queryInfoXiugaiDialog.assessmentcommissionrate" slot="text"></el-input>
              </ui-label-text>
            </el-form-item>
          </el-col>
        </el-row>
        <div class="btn-container">
          <el-form-item>
            <el-button type="primary" @click="submitForm('queryInfoXiugaiDialog',3)">修改</el-button>
          </el-form-item>
        </div>
      </el-form>
    </el-dialog>
    <el-dialog :append-to-body='true' :visible.sync='comDialog12' :before-close='childClose12'>
        <div>
          <el-table stripe @row-click='changeData12' :data="tempTableData12">
            <el-table-column prop="riskcode" label="代码" center ></el-table-column>
            <el-table-column prop="riskname" label="名称" center ></el-table-column>
          </el-table>
          <div class="block">
            <el-pagination
              @current-change="handleCurrentChange12"
              @size-change="handleSizeChange12"
              :current-page="xianzhongInfo.currentPage"
              :page-size ="xianzhongInfo.pageSize"
              :page-sizes="[10,20,50]"
              :pager-count="5"
              layout="total, sizes, prev, pager, next, jumper"
              :total="fenyetotalData"
              >
            </el-pagination>
          </div>
        </div>
      </el-dialog>
      <el-dialog title="提示" center :append-to-body='true' :visible.sync="isTip" width="30%" >
        <p style="text-align: center; ">如果数据量比较大，整个过程会很慢，请您耐心等待</p>
        <span slot="footer" class="dialog-footer">
          <el-button @click="isTip = false">取 消</el-button>
          <el-button type="primary" @click="submitUpload">确 定</el-button>
        </span>
      </el-dialog>
    <ComDialog :vis='comDialog' :workerVis='comDialogworker' :comVis='comDialogCom' :newTableData='tempTableData1' @onClose='comDialogClosing(0)' @selectDialog='dialogBackData0' @comdialogChangePageFunction='changeComdialogPage0' @comdialogChangePageSizeFunction='changeComdialogPageSize0' :fenyetotal='fenyetotalData'/>
    <ComDialog :vis='comDialog1' :workerVis='comDialogworker1' :comVis='comDialogCom1' :newTableData='tempTableData2' @onClose='comDialogClosing(1)' @selectDialog='dialogBackData1' @comdialogChangePageFunction='changeComdialogPage1' @comdialogChangePageSizeFunction='changeComdialogPageSize1' :fenyetotal='fenyetotalData'/>
    <ComDialog :vis='comDialog2' :workerVis='comDialogworker2' :comVis='comDialogCom2' :newTableData='tempTableData3' @onClose='comDialogClosing(2)' @selectDialog='dialogBackData2' @comdialogChangePageFunction='changeComdialogPage2' @comdialogChangePageSizeFunction='changeComdialogPageSize2' :fenyetotal='fenyetotalData'/>
    <ComDialog :vis='comDialog3' :workerVis='comDialogworker3' :comVis='comDialogCom3' :newTableData='tempTableData4' @onClose='comDialogClosing(3)' @selectDialog='dialogBackData3' @comdialogChangePageFunction='changeComdialogPage3' @comdialogChangePageSizeFunction='changeComdialogPageSize3' :fenyetotal='fenyetotalData'/>
    <ComDialog :vis='comDialog4' :workerVis='comDialogworker4' :comVis='comDialogCom4' :newTableData='tempTableData5' @onClose='comDialogClosing(4)' @selectDialog='dialogBackData4' @comdialogChangePageFunction='changeComdialogPage4' @comdialogChangePageSizeFunction='changeComdialogPageSize4' :fenyetotal='fenyetotalData'/>
    <ComDialog :vis='comDialog5' :workerVis='comDialogworker5' :comVis='comDialogCom5' :newTableData='tempTableData6' @onClose='comDialogClosing(5)' @selectDialog='dialogBackData5' @comdialogChangePageFunction='changeComdialogPage5' @comdialogChangePageSizeFunction='changeComdialogPageSize5' :fenyetotal='fenyetotalData'/>
    <ComDialog :vis='comDialog6' :workerVis='comDialogworker6' :comVis='comDialogCom6' :newTableData='tempTableData7' @onClose='comDialogClosing(6)' @selectDialog='dialogBackData6' @comdialogChangePageFunction='changeComdialogPage6' @comdialogChangePageSizeFunction='changeComdialogPageSize6' :fenyetotal='fenyetotalData'/>
    <ComDialog :vis='comDialog7' :workerVis='comDialogworker7' :comVis='comDialogCom7' :newTableData='tempTableData8' @onClose='comDialogClosing(7)' @selectDialog='dialogBackData7' @comdialogChangePageFunction='changeComdialogPage7' @comdialogChangePageSizeFunction='changeComdialogPageSize7' :fenyetotal='fenyetotalData'/>
    <ComDialog :vis='comDialog8' :workerVis='comDialogworker8' :comVis='comDialogCom8' :newTableData='tempTableData9' @onClose='comDialogClosing(8)' @selectDialog='dialogBackData8' @comdialogChangePageFunction='changeComdialogPage8' @comdialogChangePageSizeFunction='changeComdialogPageSize8' :fenyetotal='fenyetotalData'/>
  </div>
</template>

<script>
import NoticeBar from '@/components/notice-bar'
import LineTittle from '@/components/line-tittle'
import LabelText from '@/components/label-text'
import IsEmpty from '@/utils/IsEmpty'
import ComDialog from '@/components/comDialog'
import { mapActions } from 'vuex'
import { api } from '@/api/lifeInsur_mgr/quitListMgr.js'
export default {
  name: '',
  data () {
    let checkxiaoshu = (rule, value, callback) => {
      let y = String(value).indexOf('.') + 1// 整数位数
      let count = String(value).length
      if (IsEmpty(value.match(/^\d+(?=\.{0,1}\d+$|$)/)) && !IsEmpty(value)) {
        callback(new Error('只能输入数字'))
      } else if (count - y > 2 && y !== 0) {
        callback(new Error('输入的数字不能超过两位小数'))
      } else {
        callback()
      }
    }
    return {
      queryInfo: {
        insurerCode: '',
        insurerName: '',
        orgCode: '',
        orgName: '',
        comCode: '',
        comName: '',
        currentPage: 1,
        pageSize: 10
      },
      exportInfo: {
        policyNo: '',
        name: '',
        identityType: '',
        identityNum: '',
        startDate: '',
        endDate: ''
      },
      isTip: false,
      queryInfoAdddialog: {
        insureCode: '',
        insureName: '',
        orgCode: '',
        orgName: '',
        comCode: '',
        comName: '',
        riskcode: '',
        riskname: '',
        bankCode: '',
        bankName: '',
        period: '',
        firstcommissionrate: '',
        assessmentcommissionrate: '',
        continuedCommission2: '',
        continuedCommission3: '',
        continuedCommission4: '',
        continuedCommission5: ''
      },
      queryInfoXiugaiDialog: {
        insureCode: '',
        insureName: '',
        orgCode: '',
        orgName: '',
        comCode: '',
        comName: '',
        riskcode: '',
        riskname: '',
        bankCode: '',
        bankName: '',
        period: '',
        firstyearjcyj: '',
        firstyearjlyjlzb: '',
        firstyearjlyj: '',
        recommendertjblzb: '',
        recommendertjbl: '',
        id: '',
        firstcommissionrate: '',
        assessmentcommissionrate: '',
        continuedCommission2: '',
        continuedCommission3: '',
        continuedCommission4: '',
        continuedCommission5: ''
      },
      rules1: {},
      rules2: {
        insureCode: [
          { required: true, message: '请输入保险公司代码', trigger: 'change' }
        ],
        insureName: [
          { required: true, message: '请输入保险公司名称', trigger: 'change' }
        ],
        orgCode: [
          { required: true, message: '请输入保险机构代码', trigger: 'change' }
        ],
        orgName: [
          { required: true, message: '请输入保险机构名称', trigger: 'change' }
        ],
        comCode: [
          { required: true, message: '请输入佰盈机构代码', trigger: 'change' }
        ],
        comName: [
          { required: true, message: '请输入佰盈机构名称', trigger: 'change' }
        ],
        riskcode: [
          { required: true, message: '请输入险种代码', trigger: 'change' }
        ],
        riskname: [
          { required: true, message: '请输入险种名称', trigger: 'change' }
        ],
        period: [
          { required: true, message: '请输入缴费年期', trigger: 'change' }
        ],
        firstcommissionrate: [
          { validator: checkxiaoshu, trigger: 'change' }
        ],
        continuedCommission2: [
          { validator: checkxiaoshu, trigger: 'change' }
        ],
        continuedCommission3: [
          { validator: checkxiaoshu, trigger: 'change' }
        ],
        continuedCommission4: [
          { validator: checkxiaoshu, trigger: 'change' }
        ],
        continuedCommission5: [
          { validator: checkxiaoshu, trigger: 'change' }
        ],
        firstyearjcyj: [
          { validator: checkxiaoshu, trigger: 'change' }
        ],
        firstyearjlyjlzb: [
          { validator: checkxiaoshu, trigger: 'change' }
        ],
        firstyearjlyj: [
          { validator: checkxiaoshu, trigger: 'change' }
        ],
        recommendertjblzb: [
          { validator: checkxiaoshu, trigger: 'change' }
        ],
        recommendertjbl: [
          { validator: checkxiaoshu, trigger: 'change' }
        ],
        assessmentcommissionrate: [
          { validator: checkxiaoshu, trigger: 'change' }
        ]
      },
      rules3: {
        insureCode: [
          { required: true, message: '请输入保险公司代码', trigger: 'change' }
        ],
        insureName: [
          { required: true, message: '请输入保险公司名称', trigger: 'change' }
        ],
        orgCode: [
          { required: true, message: '请输入保险机构代码', trigger: 'change' }
        ],
        orgName: [
          { required: true, message: '请输入保险机构名称', trigger: 'change' }
        ],
        comCode: [
          { required: true, message: '请输入佰盈机构代码', trigger: 'change' }
        ],
        comName: [
          { required: true, message: '请输入佰盈机构名称', trigger: 'change' }
        ],
        riskcode: [
          { required: true, message: '请输入险种代码', trigger: 'change' }
        ],
        riskname: [
          { required: true, message: '请输入险种名称', trigger: 'change' }
        ],
        period: [
          { required: true, message: '请输入缴费年期', trigger: 'change' }
        ],
        firstcommissionrate: [
          { validator: checkxiaoshu, trigger: 'change' }
        ],
        continuedCommission2: [
          { validator: checkxiaoshu, trigger: 'change' }
        ],
        continuedCommission3: [
          { validator: checkxiaoshu, trigger: 'change' }
        ],
        continuedCommission4: [
          { validator: checkxiaoshu, trigger: 'change' }
        ],
        continuedCommission5: [
          { validator: checkxiaoshu, trigger: 'change' }
        ],
        firstyearjcyj: [
          { validator: checkxiaoshu, trigger: 'change' }
        ],
        firstyearjlyjlzb: [
          { validator: checkxiaoshu, trigger: 'change' }
        ],
        firstyearjlyj: [
          { validator: checkxiaoshu, trigger: 'change' }
        ],
        recommendertjblzb: [
          { validator: checkxiaoshu, trigger: 'change' }
        ],
        recommendertjbl: [
          { validator: checkxiaoshu, trigger: 'change' }
        ],
        assessmentcommissionrate: [
          { validator: checkxiaoshu, trigger: 'change' }
        ]
      },
      loading: '',
      tableShowOrNot: false,
      comDialog: false,
      comDialogworker: false,
      comDialogCom: false,
      comDialog1: false,
      comDialogworker1: false,
      comDialogCom1: false,
      comDialog2: false,
      comDialogworker2: false,
      comDialogCom2: false,
      comDialog3: false,
      comDialogworker3: false,
      comDialogCom3: false,
      comDialog4: false,
      comDialogworker4: false,
      comDialogCom4: false,
      comDialog5: false,
      comDialogworker5: false,
      comDialogCom5: false,
      comDialog6: false,
      comDialogworker6: false,
      comDialogCom6: false,
      comDialog7: false,
      comDialogworker7: false,
      comDialogCom7: false,
      comDialog8: false,
      comDialogworker8: false,
      comDialogCom8: false,
      comDialog9: false,
      comDialogworker9: false,
      comDialogCom9: false,
      comDialog10: false,
      comDialogworker10: false,
      comDialogCom10: false,
      comDialog12: false,
      xiugaiDialog: false,
      shangchuanDialog: false,
      fileList: [],
      commissionQueryData: [],
      multipleSelection: [],
      totalRecords1: 0,
      bankData: '',
      companyQueryInfo: {
        type: '3',
        clickType: '2',
        insurerCode: '',
        insurerName: '',
        currentPage: 1,
        pageSize: 10
      },
      insureOrgQueryInfo: {
        clickType: '2',
        insurerCode: '',
        orgCode: '',
        orgName: '',
        currentPage: 1,
        pageSize: 10
      },
      orgQueryInfo: {
        clickType: '2',
        comCodeOrName: '',
        currentPage: 1,
        pageSize: 10
      },
      xianzhongInfo: {
        clickType: '2',
        insurerCode: '',
        riskCode: '',
        riskName: '',
        currentPage: 1,
        pageSize: 10
      },
      quanxian: {
        add: true,
        modify: true,
        del: true,
        query: true,
        import: true
      },
      addDialog: false,
      tempTableData1: [],
      tempTableData2: [],
      tempTableData3: [],
      tempTableData4: [],
      tempTableData5: [],
      tempTableData6: [],
      tempTableData7: [],
      tempTableData8: [],
      tempTableData9: [],
      tempTableData10: [],
      tempTableData11: [],
      tempTableData12: [],
      fenyetotalData: 0,
      totalRecords: 0
    }
  },
  mounted () {
    api(`/auth/findButtonByUserCodeAndPage?userId=${this.$store.state.login.loginUserId}&page=银代首/续佣率配置`, 'get').then(result => {
      console.log(result)
      if (result.data.code === '000000') {
        for (let i = 0; i < result.data.data.length; i++) {
          this.quanxian[result.data.data[i].code] = false
        }
      }
    }).catch((e) => {
      console.log(e)
    })
  },
  watch: {
    'queryInfo.insurerCode' () {
      if (this.queryInfo.insurerCode === '') {
        this.queryInfo.insurerName = ''
      }
    },
    'queryInfo.insurerName' () {
      if (this.queryInfo.insurerName === '') {
        this.queryInfo.insurerCode = ''
      }
    },
    'queryInfo.orgCode' () {
      if (this.queryInfo.orgCode === '') {
        this.queryInfo.orgName = ''
      }
    },
    'queryInfo.orgName' () {
      if (this.queryInfo.orgName === '') {
        this.queryInfo.orgCode = ''
      }
    },
    'queryInfo.comCode' () {
      if (this.queryInfo.comCode === '') {
        this.queryInfo.comName = ''
      }
    },
    'queryInfo.comName' () {
      if (this.queryInfo.comName === '') {
        this.queryInfo.comCode = ''
      }
    },
    'queryInfoAdddialog.insureCode' () {
      if (this.queryInfoAdddialog.insureCode === '') {
        this.queryInfoAdddialog.insureName = ''
      }
    },
    'queryInfoAdddialog.insureName' () {
      if (this.queryInfoAdddialog.insureName === '') {
        this.queryInfoAdddialog.insureCode = ''
      }
    },
    'queryInfoAdddialog.orgCode' () {
      if (this.queryInfoAdddialog.orgCode === '') {
        this.queryInfoAdddialog.orgName = ''
      }
    },
    'queryInfoAdddialog.orgName' () {
      if (this.queryInfoAdddialog.orgName === '') {
        this.queryInfoAdddialog.orgCode = ''
      }
    },
    'queryInfoAdddialog.comCode' () {
      if (this.queryInfoAdddialog.comCode === '') {
        this.queryInfoAdddialog.comName = ''
      }
    },
    'queryInfoAdddialog.comName' () {
      if (this.queryInfoAdddialog.comName === '') {
        this.queryInfoAdddialog.comCode = ''
      }
    },
    'queryInfoAdddialog.riskcode' () {
      if (this.queryInfoAdddialog.riskcode === '') {
        this.queryInfoAdddialog.riskname = ''
        this.queryInfoAdddialog.period = ''
      }
    },
    'queryInfoAdddialog.riskname' () {
      if (this.queryInfoAdddialog.riskname === '') {
        this.queryInfoAdddialog.riskcode = ''
        this.queryInfoAdddialog.period = ''
      }
    },
    'queryInfoXiugaidialog.insureCode' () {
      if (this.queryInfoXiugaidialog.insureCode === '') {
        this.queryInfoXiugaidialog.insureName = ''
      }
    },
    'queryInfoXiugaidialog.insurerName' () {
      if (this.queryInfoXiugaidialog.insurerName === '') {
        this.queryInfoXiugaidialog.insureCode = ''
      }
    },
    'queryInfoXiugaidialog.orgCode' () {
      if (this.queryInfoXiugaidialog.orgCode === '') {
        this.queryInfoXiugaidialog.orgName = ''
      }
    },
    'queryInfoXiugaidialog.orgName' () {
      if (this.queryInfoXiugaidialog.orgName === '') {
        this.queryInfoXiugaidialog.orgCode = ''
      }
    },
    'queryInfoXiugaidialog.comCode' () {
      if (this.queryInfoXiugaidialog.comCode === '') {
        this.queryInfoXiugaidialog.comName = ''
      }
    },
    'queryInfoXiugaidialog.comName' () {
      if (this.queryInfoXiugaidialog.comName === '') {
        this.queryInfoXiugaidialog.comCode = ''
      }
    },
    'queryInfoXiugaidialog.riskcode' () {
      if (this.queryInfoXiugaidialog.riskcode === '') {
        this.queryInfoXiugaidialog.riskname = ''
      }
    },
    'queryInfoXiugaidialog.riskname' () {
      if (this.queryInfoXiugaidialog.riskname === '') {
        this.queryInfoXiugaidialog.riskcode = ''
      }
    }
  },
  methods: {
    initshaungjiDialog () {
      this.companyQueryInfo = {
        type: '3',
        clickType: '2',
        insurerCode: '',
        insurerName: '',
        currentPage: 1,
        pageSize: 10
      }
      this.insureOrgQueryInfo = {
        clickType: '2',
        insurerCode: '',
        orgCode: '',
        orgName: '',
        currentPage: 1,
        pageSize: 10
      }
      this.orgQueryInfo = {
        clickType: '2',
        comCodeOrName: '',
        currentPage: 1,
        pageSize: 10
      }
      this.xianzhongInfo = {
        clickType: '2',
        insurerCode: '',
        riskCode: '',
        riskName: '',
        currentPage: 1,
        pageSize: 10
      }
    },
    initDialog () {
      this.bankData = ''
      this.queryInfoAdddialog = {
        insureCode: '',
        insureName: '',
        orgCode: '',
        orgName: '',
        comCode: '',
        comName: '',
        riskcode: '',
        riskname: '',
        bankCode: '',
        bankName: '',
        period: '',
        firstcommissionrate: '',
        assessmentcommissionrate: '',
        continuedCommission2: '',
        continuedCommission3: '',
        continuedCommission4: '',
        continuedCommission5: ''
      }
      this.queryInfoXiugaiDialog = {
        insureCode: '',
        insureName: '',
        orgCode: '',
        orgName: '',
        comCode: '',
        comName: '',
        riskcode: '',
        riskname: '',
        bankCode: '',
        bankName: '',
        period: '',
        firstyearjcyj: '',
        firstyearjlyjlzb: '',
        firstyearjlyj: '',
        recommendertjblzb: '',
        recommendertjbl: '',
        id: '',
        firstcommissionrate: '',
        assessmentcommissionrate: '',
        continuedCommission2: '',
        continuedCommission3: '',
        continuedCommission4: '',
        continuedCommission5: ''
      }
      this.companyQueryInfo = {
        type: '3',
        clickType: '2',
        insurerCode: '',
        insurerName: '',
        currentPage: 1,
        pageSize: 10
      }
      this.insureOrgQueryInfo = {
        clickType: '2',
        insurerCode: '',
        orgCode: '',
        orgName: '',
        currentPage: 1,
        pageSize: 10
      }
      this.orgQueryInfo = {
        clickType: '2',
        comCodeOrName: '',
        currentPage: 1,
        pageSize: 10
      }
      this.xianzhongInfo = {
        clickType: '2',
        insurerCode: '',
        riskCode: '',
        riskName: '',
        currentPage: 1,
        pageSize: 10
      }
    },
    childClose12 () {
      this.comDialog12 = false
      this.queryInfoAdddialog.riskname = ''
      this.queryInfoAdddialog.riskcode = ''
      this.queryInfoAdddialog.period = ''
    },
    handleSizeChange12 (val) {
      this.xianzhongInfo.pageSize = val
      this.xianzhongInfo.currentPage = 1
      this.openComDialog(11)
    },
    handleCurrentChange12 (val) {
      this.xianzhongInfo.currentPage = val
      this.openComDialog(11)
    },
    changeData12 (row) {
      this.comDialog12 = false
      this.queryInfoAdddialog.riskname = row.riskname
      this.queryInfoAdddialog.riskcode = row.riskcode
      this.queryInfoAdddialog.period = row.paymentperiod
    },
    submitForm (formName, index) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          console.log('submit!')
          switch (index) {
            case 0:
              this.totalRecords = 0
              this.queryInfo.currentPage = 1
              this.queryData()
              break
            case 2:
              this.addData()
              break
            case 3:
              this.changeData()
              break
            default:
              break
          }
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    queryData () {
      this.Loading()
      this.commissionQueryData = []
      api('/salaryCommissionBank/querySalarys', 'post', this.queryInfo).then(result => {
        if (result.data.code !== '000000' && !IsEmpty(result.data.code)) {
          this.openToast('warning', result.data.msg)
          this.closeLoading()
        } else {
          this.tableShowOrNot = true
          this.commissionQueryData = result.data.data
          this.totalRecords = result.data.totalRecords
          this.closeLoading()
        }
      }).catch((e) => {
        console.log(e)
      })
    },
    addData () {
      let temp = this.bankData.split('-')
      this.queryInfoAdddialog.bankCode = temp[0]
      this.queryInfoAdddialog.bankName = temp[1]
      api('/salaryCommissionBank/addSalary', 'post', this.queryInfoAdddialog).then(result => {
        if (result.data.code !== '000000' && !IsEmpty(result.data.code)) {
          this.openToast('warning', result.data.msg)
        } else {
          this.addDialog = false
          this.openToast('success', result.data.msg)
          this.$refs['queryInfoAdddialog'].resetFields()
          this.queryInfoAdddialog = {
            insureCode: '',
            insureName: '',
            orgCode: '',
            orgName: '',
            comCode: '',
            comName: '',
            riskcode: '',
            riskname: '',
            bankCode: '',
            bankName: '',
            period: '',
            firstcommissionrate: '',
            assessmentcommissionrate: '',
            continuedCommission2: '',
            continuedCommission3: '',
            continuedCommission4: '',
            continuedCommission5: ''
          }
          this.queryInfo = {
            insurerCode: '',
            insurerName: '',
            orgCode: '',
            orgName: '',
            comCode: '',
            comName: '',
            currentPage: 1,
            pageSize: 10
          }
          this.initDialog()
          this.queryData()
        }
      }).catch((e) => {
        console.log(e)
      })
    },
    changeData () {
      let temp = this.bankData.split('-')
      this.queryInfoXiugaiDialog.bankCode = temp[0]
      this.queryInfoXiugaiDialog.bankName = temp[1]
      api('/salaryCommissionBank/modSalary', 'post', this.queryInfoXiugaiDialog).then(result => {
        if (result.data.code !== '000000' && !IsEmpty(result.data.code)) {
          this.openToast('warning', result.data.msg)
        } else {
          this.openToast('success', result.data.msg)
          this.xiugaiDialog = false
          this.queryInfo = {
            insurerCode: '',
            insurerName: '',
            orgCode: '',
            orgName: '',
            comCode: '',
            comName: '',
            currentPage: 1,
            pageSize: 10
          }
          this.$refs['queryInfoXiugaiDialog'].resetFields()
          this.initDialog()
          this.queryData()
        }
      }).catch((e) => {
        console.log(e)
      })
    },
    deleteData () {
      api('/salaryCommissionBank/delSalary', 'post', this.multipleSelection).then(result => {
        if (result.data.code !== '000000' && !IsEmpty(result.data.code)) {
          this.openToast('warning', result.data.msg)
        } else {
          this.openToast('success', result.data.msg)
          this.queryInfo = {
            insurerCode: '',
            insurerName: '',
            orgCode: '',
            orgName: '',
            comCode: '',
            comName: '',
            currentPage: 1,
            pageSize: 10
          }
          this.queryData()
        }
      }).catch((e) => {
        console.log(e)
      })
    },
    uploadUrl () {
      return '/tabycore/salaryCommissionBank/importSalarys'
    },
    downModal () {
      window.open('/tabycore/rate/downloadModel?downType=commissionYbdl')
    },
    handleSelectionChange (val) {
      console.log(val)
      this.multipleSelection = val
    },
    handleCurrentChange (val) {
      console.log(`当前页: ${val}`)
      this.queryInfo.currentPage = val
      this.commissionQueryData = []
      this.queryData()
    },
    handleSizeChange (val) {
      this.queryInfo.pageSize = val
      this.queryInfo.currentPage = 1
      this.commissionQueryData = []
      this.queryData()
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
      'commissionConfigdblqueryCom1', 'commissionConfigdblqueryCom2', 'commissionConfigdblqueryCom3', 'commissionConfigdblqueryXianzhong'
    ]),
    comDialogClosing (index) {
      switch (index) {
        case 0:
          this.queryInfo.insurerCode = ''
          this.queryInfo.insurerName = ''
          this.comDialog = false
          break
        case 1:
          this.queryInfo.orgCode = ''
          this.queryInfo.orgName = ''
          this.comDialog1 = false
          break
        case 2:
          this.queryInfo.comCode = ''
          this.queryInfo.comName = ''
          this.comDialog2 = false
          break
        case 3:
          this.queryInfoAdddialog.insureCode = ''
          this.queryInfoAdddialog.insureName = ''
          this.comDialog3 = false
          break
        case 4:
          this.queryInfoAdddialog.orgCode = ''
          this.queryInfoAdddialog.orgName = ''
          this.comDialog4 = false
          break
        case 5:
          this.queryInfoAdddialog.comCode = ''
          this.queryInfoAdddialog.comName = ''
          this.comDialog5 = false
          break
        case 6:
          this.queryInfoXiugaiDialog.insureCode = ''
          this.queryInfoXiugaiDialog.insureName = ''
          this.comDialog6 = false
          break
        case 7:
          this.queryInfoXiugaiDialog.orgCode = ''
          this.queryInfoXiugaiDialog.orgName = ''
          this.comDialog7 = false
          break
        case 8:
          this.queryInfoXiugaiDialog.comCode = ''
          this.queryInfoXiugaiDialog.comName = ''
          this.comDialog8 = false
          break
        case 9:
          this.queryInfoAdddialog.riskcode = ''
          this.queryInfoAdddialog.riskname = ''
          this.comDialog9 = false
          break
        case 10:
          this.queryInfoXiugaiDialog.riskcode = ''
          this.queryInfoXiugaiDialog.riskname = ''
          this.comDialog10 = false
          break
        default:
          break
      }
      this.initshaungjiDialog()
    },
    // toast提示
    openToast (type, mesg) {
      this.$message({
        showClose: true,
        message: mesg,
        type: type
      })
    },
    openComDialog (index) {
      switch (index) {
        case 0:
          this.companyQueryInfo.insurerCode = this.queryInfo.insurerCode
          this.companyQueryInfo.insurerName = this.queryInfo.insurerName
          this.companyQueryInfo.clickType = '2'
          this.commissionConfigdblqueryCom1(this.companyQueryInfo).then(
            (res) => {
              console.log(res)
              if (res.data.code !== '000000' && !IsEmpty(res.data.code)) {
                this.openToast('warning', res.data.msg)
              } else {
                this.tempTableData1 = res.data.data.data
                for (let i = 0; i < this.tempTableData1.length; i++) {
                  this.tempTableData1[i]['renderData'] = `${this.tempTableData1[i].insurercode}-${this.tempTableData1[i].insurername}`
                }
                console.log(this.tempTableData1)
                this.fenyetotalData = res.data.data.totalRecords
                this.comDialog = true
                this.comDialogCom = true
                this.comDialogworker = false
              }
            }
          )
          break
        case 1:
          this.insureOrgQueryInfo.insurerCode = this.queryInfo.insurerCode
          this.insureOrgQueryInfo.orgCode = this.queryInfo.orgCode
          this.insureOrgQueryInfo.orgName = this.queryInfo.orgName
          this.insureOrgQueryInfo.clickType = '2'
          this.commissionConfigdblqueryCom2(this.insureOrgQueryInfo).then(
            (res) => {
              if (IsEmpty(this.queryInfo.insurerCode)) {
                this.openToast('warning', '请先选择一个保险公司')
              } else if (res.data.code !== '000000' && !IsEmpty(res.data.code)) {
                this.openToast('warning', res.data.msg)
              } else {
                this.tempTableData2 = res.data.data.data
                for (let i = 0; i < this.tempTableData2.length; i++) {
                  this.tempTableData2[i]['renderData'] = `${this.tempTableData2[i].orgcode}-${this.tempTableData2[i].orgname}`
                }
                this.fenyetotalData = res.data.data.totalRecords
                this.comDialog1 = true
                this.comDialogCom1 = true
                this.comDialogworker1 = false
              }
            }
          )
          break
        case 2:
          if (!IsEmpty(this.queryInfo.comCode)) {
            this.orgQueryInfo.comCodeOrName = this.queryInfo.comCode
          } else if (!IsEmpty(this.queryInfo.comName)) {
            this.orgQueryInfo.comCodeOrName = this.queryInfo.comName
          } else {
            this.orgQueryInfo.comCodeOrName = ''
          }
          this.orgQueryInfo.clickType = '2'
          this.commissionConfigdblqueryCom3(this.orgQueryInfo).then(
            (res) => {
              console.log(res)
              if (res.data.code !== '000000' && !IsEmpty(res.data.code)) {
                this.openToast('warning', res.data.msg)
              } else {
                this.tempTableData3 = res.data.data.data
                for (let i = 0; i < this.tempTableData3.length; i++) {
                  this.tempTableData3[i]['renderData'] = `${this.tempTableData3[i].comCode}-${this.tempTableData3[i].comCName}`
                }
                this.fenyetotalData = res.data.data.totalRecords
                this.comDialog2 = true
                this.comDialogCom2 = true
                this.comDialogworker2 = false
              }
            }
          )
          break
        case 3:
          this.companyQueryInfo.insurerCode = this.queryInfoAdddialog.insureCode
          this.companyQueryInfo.insurerName = this.queryInfoAdddialog.insureName
          this.companyQueryInfo.clickType = '2'
          this.commissionConfigdblqueryCom1(this.companyQueryInfo).then(
            (res) => {
              if (res.data.code !== '000000' && !IsEmpty(res.data.code)) {
                this.openToast('warning', res.data.msg)
              } else {
                this.tempTableData4 = res.data.data.data
                for (let i = 0; i < this.tempTableData4.length; i++) {
                  this.tempTableData4[i]['renderData'] = `${this.tempTableData4[i].insurercode}-${this.tempTableData4[i].insurername}`
                }
                this.fenyetotalData = res.data.data.totalRecords
                this.comDialog3 = true
                this.comDialogCom3 = true
                this.comDialogworker3 = false
              }
            }
          )
          break
        case 4:
          this.insureOrgQueryInfo.insurerCode = this.queryInfoAdddialog.insureCode
          this.insureOrgQueryInfo.orgCode = this.queryInfoAdddialog.orgCode
          this.insureOrgQueryInfo.orgName = this.queryInfoAdddialog.orgName
          this.insureOrgQueryInfo.clickType = '2'
          this.commissionConfigdblqueryCom2(this.insureOrgQueryInfo).then(
            (res) => {
              if (res.data.code !== '000000' && !IsEmpty(res.data.code)) {
                this.openToast('warning', res.data.msg)
              } else {
                this.tempTableData5 = res.data.data.data
                for (let i = 0; i < this.tempTableData5.length; i++) {
                  this.tempTableData5[i]['renderData'] = `${this.tempTableData5[i].orgcode}-${this.tempTableData5[i].orgname}`
                }
                this.fenyetotalData = res.data.data.totalRecords
                this.comDialog4 = true
                this.comDialogCom4 = true
                this.comDialogworker4 = false
              }
            }
          )
          break
        case 5:
          if (!IsEmpty(this.queryInfoAdddialog.comCode)) {
            this.orgQueryInfo.comCodeOrName = this.queryInfoAdddialog.comCode
          } else if (!IsEmpty(this.queryInfoAdddialog.comName)) {
            this.orgQueryInfo.comCodeOrName = this.queryInfoAdddialog.comName
          } else {
            this.orgQueryInfo.comCodeOrName = ''
          }
          this.orgQueryInfo.clickType = '2'
          this.commissionConfigdblqueryCom3(this.orgQueryInfo).then(
            (res) => {
              if (res.data.code !== '000000' && !IsEmpty(res.data.code)) {
                this.openToast('warning', res.data.msg)
              } else {
                this.tempTableData6 = res.data.data.data
                for (let i = 0; i < this.tempTableData6.length; i++) {
                  this.tempTableData6[i]['renderData'] = `${this.tempTableData6[i].comCode}-${this.tempTableData6[i].comCName}`
                }
                this.fenyetotalData = res.data.data.totalRecords
                this.comDialog5 = true
                this.comDialogCom5 = true
                this.comDialogworker5 = false
              }
            }
          )
          break
        case 6:
          this.companyQueryInfo.insurerCode = this.queryInfo.insurerCode
          this.companyQueryInfo.insurerName = this.queryInfo.insurerName
          this.companyQueryInfo.clickType = '2'
          this.commissionConfigdblqueryCom1(this.companyQueryInfo).then(
            (res) => {
              if (res.data.code !== '000000' && !IsEmpty(res.data.code)) {
                this.openToast('warning', res.data.msg)
              } else {
                this.tempTableData7 = res.data.data.data
                for (let i = 0; i < this.tempTableData7.length; i++) {
                  this.tempTableData7[i]['renderData'] = `${this.tempTableData7[i].insurercode}-${this.tempTableData7[i].insurername}`
                }
                this.fenyetotalData = res.data.data.totalRecords
                this.comDialog6 = true
                this.comDialogCom6 = true
                this.comDialogworker6 = false
              }
            }
          )
          break
        case 7:
          this.insureOrgQueryInfo.insurerCode = this.queryInfo.insurerCode
          this.insureOrgQueryInfo.orgCode = this.queryInfo.orgCode
          this.insureOrgQueryInfo.orgName = this.queryInfo.orgName
          this.insureOrgQueryInfo.clickType = '2'
          this.commissionConfigdblqueryCom2(this.insureOrgQueryInfo).then(
            (res) => {
              if (res.data.code !== '000000' && !IsEmpty(res.data.code)) {
                this.openToast('warning', res.data.msg)
              } else {
                this.tempTableData8 = res.data.data.data
                for (let i = 0; i < this.tempTableData8.length; i++) {
                  this.tempTableData8[i]['renderData'] = `${this.tempTableData8[i].orgcode}-${this.tempTableData8[i].orgname}`
                }
                this.fenyetotalData = res.data.data.totalRecords
                this.comDialog7 = true
                this.comDialogCom7 = true
                this.comDialogworker7 = false
              }
            }
          )
          break
        case 8:
          if (!IsEmpty(this.queryInfo.comCode)) {
            this.orgQueryInfo.comCodeOrName = this.queryInfo.comCode
          } else if (!IsEmpty(this.queryInfo.comName)) {
            this.orgQueryInfo.comCodeOrName = this.queryInfo.comName
          } else {
            this.orgQueryInfo.comCodeOrName = ''
          }
          this.orgQueryInfo.clickType = '2'
          this.commissionConfigdblqueryCom3(this.orgQueryInfo).then(
            (res) => {
              if (res.data.code !== '000000' && !IsEmpty(res.data.code)) {
                this.openToast('warning', res.data.msg)
              } else {
                this.tempTableData9 = res.data.data.data
                for (let i = 0; i < this.tempTableData9.length; i++) {
                  this.tempTableData9[i]['renderData'] = `${this.tempTableData9[i].comCode}-${this.tempTableData9[i].comCName}`
                }
                this.fenyetotalData = res.data.data.totalRecords
                this.comDialog8 = true
                this.comDialogCom8 = true
                this.comDialogworker8 = false
              }
            }
          )
          break
        case 9:
          this.xianzhongInfo.insurerCode = this.queryInfoAdddialog.insureCode
          this.xianzhongInfo.riskCode = this.queryInfoAdddialog.riskcode
          this.xianzhongInfo.riskName = this.queryInfoAdddialog.riskname
          this.xianzhongInfo.clickType = '2'
          this.commissionConfigdblqueryXianzhong(this.xianzhongInfo).then(
            (res) => {
              if (res.data.code !== '000000' && !IsEmpty(res.data.code)) {
                this.openToast('warning', res.data.msg)
              } else {
                this.tempTableData11 = res.data.data.data
                for (let i = 0; i < this.tempTableData11.length; i++) {
                  this.tempTableData11[i]['renderData'] = `${this.tempTableData10[i].riskcode}-${this.tempTableData10[i].riskname}`
                }
                this.fenyetotalData = res.data.data.totalRecords
                this.comDialog9 = true
                this.comDialogCom9 = true
                this.comDialogworker9 = false
              }
            }
          )
          break
        case 10:
          this.xianzhongInfo.insurerCode = this.queryInfoXiugaiDialog.insureCode
          this.xianzhongInfo.riskCode = this.queryInfoXiugaiDialog.riskcode
          this.xianzhongInfo.riskName = this.queryInfoXiugaiDialog.riskname
          this.xianzhongInfo.clickType = '2'
          this.commissionConfigdblqueryXianzhong(this.xianzhongInfo).then(
            (res) => {
              if (res.data.code !== '000000' && !IsEmpty(res.data.code)) {
                this.openToast('warning', res.data.msg)
              } else {
                this.tempTableData11 = res.data.data.data
                for (let i = 0; i < this.tempTableData11.length; i++) {
                  this.tempTableData11[i]['renderData'] = `${this.tempTableData11[i].riskcode}-${this.tempTableData11[i].riskname}`
                }
                this.fenyetotalData = res.data.data.totalRecords
                this.comDialog10 = true
                this.comDialogCom10 = true
                this.comDialogworker10 = false
              }
            }
          )
          break
        case 11:
          this.xianzhongInfo.insurerCode = this.queryInfoAdddialog.insureCode
          this.xianzhongInfo.riskcode = this.queryInfoAdddialog.riskcode
          this.xianzhongInfo.riskname = this.queryInfoAdddialog.riskname
          this.xianzhongInfo.clickType = '2'
          this.commissionConfigdblqueryXianzhong(this.xianzhongInfo).then(
            (res) => {
              // paymentperiod
              if (res.data.code !== '000000' && !IsEmpty(res.data.code)) {
                this.openToast('warning', res.data.msg)
              } else {
                this.tempTableData12 = res.data.data.data
                this.fenyetotalData = res.data.data.totalRecords
                this.comDialog12 = true
              }
            }
          )
          break
        default:
          break
      }
    },
    goUpload () {
      this.isTip = true
    },
    submitUpload () {
      this.$refs.upload.submit()
      this.isTip = false
      this.Loading()
    },
    changeComdialogPage0 (data) {
      this.companyQueryInfo.currentPage = data
      this.openComDialog(0)
    },
    changeComdialogPage1 (data) {
      this.insureOrgQueryInfo.currentPage = data
      this.openComDialog(1)
    },
    changeComdialogPage2 (data) {
      this.orgQueryInfo.currentPage = data
      this.openComDialog(2)
    },
    changeComdialogPage3 (data) {
      this.companyQueryInfo.currentPage = data
      this.openComDialog(3)
    },
    changeComdialogPage4 (data) {
      this.insureOrgQueryInfo.currentPage = data
      this.openComDialog(4)
    },
    changeComdialogPage5 (data) {
      this.orgQueryInfo.currentPage = data
      this.openComDialog(5)
    },
    changeComdialogPage6 (data) {
      this.companyQueryInfo.currentPage = data
      this.openComDialog(6)
    },
    changeComdialogPage7 (data) {
      this.insureOrgQueryInfo.currentPage = data
      this.openComDialog(7)
    },
    changeComdialogPage8 (data) {
      this.orgQueryInfo.currentPage = data
      this.openComDialog(8)
    },
    changeComdialogPage9 (data) {
      this.xianzhongInfo.currentPage = data
      this.openComDialog(9)
    },
    changeComdialogPage10 (data) {
      this.xianzhongInfo.currentPage = data
      this.openComDialog(10)
    },
    changeComdialogPageSize0 (data) {
      this.companyQueryInfo.pageSize = data
      this.openComDialog(0)
    },
    changeComdialogPageSize1 (data) {
      this.insureOrgQueryInfo.pageSize = data
      this.openComDialog(1)
    },
    changeComdialogPageSize2 (data) {
      this.orgQueryInfo.pageSize = data
      this.openComDialog(2)
    },
    changeComdialogPageSize3 (data) {
      this.companyQueryInfo.pageSize = data
      this.openComDialog(3)
    },
    changeComdialogPageSize4 (data) {
      this.insureOrgQueryInfo.pageSize = data
      this.openComDialog(4)
    },
    changeComdialogPageSize5 (data) {
      this.orgQueryInfo.pageSize = data
      this.openComDialog(5)
    },
    changeComdialogPageSize6 (data) {
      this.companyQueryInfo.pageSize = data
      this.openComDialog(6)
    },
    changeComdialogPageSize7 (data) {
      this.insureOrgQueryInfo.pageSize = data
      this.openComDialog(7)
    },
    changeComdialogPageSize8 (data) {
      this.orgQueryInfo.pageSize = data
      this.openComDialog(8)
    },
    changeComdialogPageSize9 (data) {
      this.xianzhongInfo.pageSize = data
      this.openComDialog(9)
    },
    changeComdialogPageSize10 (data) {
      this.xianzhongInfo.pageSize = data
      this.openComDialog(10)
    },
    dialogBackData0 (data) {
      this.initshaungjiDialog()
      this.comDialog = false
      let temp = []
      temp = data.split('-')
      this.queryInfo.insurerCode = temp[0]
      this.queryInfo.insurerName = temp[1]
    },
    dialogBackData1 (data) {
      this.initshaungjiDialog()
      this.comDialog1 = false
      let temp = []
      temp = data.split('-')
      this.queryInfo.orgCode = temp[0]
      this.queryInfo.orgName = temp[1]
    },
    dialogBackData2 (data) {
      this.initshaungjiDialog()
      this.comDialog2 = false
      let temp = []
      temp = data.split('-')
      this.queryInfo.comCode = temp[0]
      this.queryInfo.comName = temp[1]
    },
    dialogBackData3 (data) {
      this.initshaungjiDialog()
      this.comDialog3 = false
      let temp = []
      temp = data.split('-')
      this.queryInfoAdddialog.insureCode = temp[0]
      this.queryInfoAdddialog.insureName = temp[1]
    },
    dialogBackData4 (data) {
      this.initshaungjiDialog()
      this.comDialog4 = false
      let temp = []
      temp = data.split('-')
      this.queryInfoAdddialog.orgCode = temp[0]
      this.queryInfoAdddialog.orgName = temp[1]
    },
    dialogBackData5 (data) {
      this.initshaungjiDialog()
      this.comDialog5 = false
      let temp = []
      temp = data.split('-')
      this.queryInfoAdddialog.comCode = temp[0]
      this.queryInfoAdddialog.comName = temp[1]
    },
    dialogBackData6 (data) {
      this.initshaungjiDialog()
      this.comDialog6 = false
      let temp = []
      temp = data.split('-')
      this.queryInfoXiugaiDialog.insureCode = temp[0]
      this.queryInfoXiugaiDialog.insureName = temp[1]
    },
    dialogBackData7 (data) {
      this.initshaungjiDialog()
      this.comDialog7 = false
      let temp = []
      temp = data.split('-')
      this.queryInfoXiugaiDialog.orgCode = temp[0]
      this.queryInfoXiugaiDialog.orgName = temp[1]
    },
    dialogBackData8 (data) {
      this.initshaungjiDialog()
      this.comDialog8 = false
      let temp = []
      temp = data.split('-')
      this.queryInfoXiugaiDialog.comCode = temp[0]
      this.queryInfoXiugaiDialog.comName = temp[1]
    },
    dialogBackData9 (data) {
      this.initshaungjiDialog()
      this.comDialog9 = false
      let temp = []
      temp = data.split('-')
      this.queryInfoAddgaiDialog.riskcode = temp[0]
      this.queryInfoAddgaiDialog.riskname = temp[1]
    },
    dialogBackData10 (data) {
      this.initshaungjiDialog()
      this.comDialog10 = false
      let temp = []
      temp = data.split('-')
      this.queryInfoXiugaiDialog.riskcode = temp[0]
      this.queryInfoXiugaiDialog.riskname = temp[1]
    },
    opensingleComDialog (index) {
      if (!(this.comDialog || this.comDialog1 || this.comDialog2 || this.comDialog3 || this.comDialog4 || this.comDialog5 || this.comDialog6 || this.comDialog7 || this.comDialog8 || this.comDialog9 || this.comDialog10)) {
        switch (index) {
          case 0:
            this.companyQueryInfo.insurerCode = this.queryInfo.insurerCode
            this.companyQueryInfo.insurerName = this.queryInfo.insurerName
            this.companyQueryInfo.clickType = '1'
            this.commissionConfigdblqueryCom1(this.companyQueryInfo).then(
              (res) => {
                console.log(res)
                if (res.data.code !== '000000' && !IsEmpty(res.data.code)) {
                  this.openToast('warning', res.data.msg)
                } else {
                  if (res.data.data.data.length === 1) {
                    this.queryInfo.insurerCode = res.data.data.data[0].insurercode
                    this.queryInfo.insurerName = res.data.data.data[0].insurername
                  }
                }
              }
            )
            break
          case 1:
            this.insureOrgQueryInfo.insurerCode = this.queryInfo.insurerCode
            this.insureOrgQueryInfo.orgCode = this.queryInfo.orgCode
            this.insureOrgQueryInfo.orgName = this.queryInfo.orgName
            this.insureOrgQueryInfo.clickType = '1'
            this.commissionConfigdblqueryCom2(this.insureOrgQueryInfo).then(
              (res) => {
                if (res.data.code !== '000000' && !IsEmpty(res.data.code)) {
                  this.openToast('warning', res.data.msg)
                } else {
                  if (res.data.data.data.length === 1) {
                    this.queryInfo.orgcode = res.data.data.data[0].orgcode
                    this.queryInfo.orgname = res.data.data.data[0].orgname
                  }
                }
              }
            )
            break
          case 2:
            if (!IsEmpty(this.queryInfo.comCode)) {
              this.orgQueryInfo.comCodeOrName = this.queryInfo.comCode
            } else if (!IsEmpty(this.queryInfo.comName)) {
              this.orgQueryInfo.comCodeOrName = this.queryInfo.comName
            } else {
              this.orgQueryInfo.comCodeOrName = ''
            }
            this.orgQueryInfo.clickType = '1'
            this.commissionConfigdblqueryCom3(this.orgQueryInfo).then(
              (res) => {
                console.log(res)
                if (res.data.code !== '000000' && !IsEmpty(res.data.code)) {
                  this.openToast('warning', res.data.msg)
                } else {
                  if (res.data.data.data.length === 1) {
                    this.queryInfo.comCode = res.data.data.data[0].comCode
                    this.queryInfo.comName = res.data.data.data[0].comCName
                  }
                }
              }
            )
            break
          case 3:
            this.companyQueryInfo.insurerCode = this.queryInfoAdddialog.insurerCode
            this.companyQueryInfo.insurerName = this.queryInfoAdddialog.insurerName
            this.companyQueryInfo.clickType = '1'
            this.commissionConfigdblqueryCom1(this.companyQueryInfo).then(
              (res) => {
                console.log(res)
                if (res.data.code !== '000000' && !IsEmpty(res.data.code)) {
                  this.openToast('warning', res.data.msg)
                } else {
                  if (res.data.data.data.length === 1) {
                    this.queryInfoAdddialog.insureCode = res.data.data.data[0].insurercode
                    this.queryInfoAdddialog.insureName = res.data.data.data[0].insurername
                  }
                }
              }
            )
            break
          case 4:
            this.insureOrgQueryInfo.insurerCode = this.queryInfoAdddialog.insurerCode
            this.insureOrgQueryInfo.orgCode = this.queryInfoAdddialog.orgCode
            this.insureOrgQueryInfo.orgName = this.queryInfoAdddialog.orgName
            this.insureOrgQueryInfo.clickType = '1'
            this.commissionConfigdblqueryCom2(this.insureOrgQueryInfo).then(
              (res) => {
                if (res.data.code !== '000000' && !IsEmpty(res.data.code)) {
                  this.openToast('warning', res.data.msg)
                } else {
                  if (res.data.data.data.length === 1) {
                    this.queryInfoAdddialog.orgCode = res.data.data.data[0].orgcode
                    this.queryInfoAdddialog.orgName = res.data.data.data[0].orgname
                  }
                }
              }
            )
            break
          case 5:
            if (!IsEmpty(this.queryInfoAdddialog.comCode)) {
              this.orgQueryInfo.comCodeOrName = this.queryInfoAdddialog.comCode
            } else if (!IsEmpty(this.queryInfoAdddialog.comName)) {
              this.orgQueryInfo.comCodeOrName = this.queryInfoAdddialog.comName
            } else {
              this.orgQueryInfo.comCodeOrName = ''
            }
            this.orgQueryInfo.clickType = '1'
            this.commissionConfigdblqueryCom3(this.orgQueryInfo).then(
              (res) => {
                console.log(res)
                if (res.data.code !== '000000' && !IsEmpty(res.data.code)) {
                  this.openToast('warning', res.data.msg)
                } else {
                  if (res.data.data.data.length === 1) {
                    this.queryInfoAdddialog.comCode = res.data.data.data[0].comCode
                    this.queryInfoAdddialog.comName = res.data.data.data[0].comCName
                  }
                }
              }
            )
            break
          case 6:
            this.companyQueryInfo.insurerCode = this.queryInfo.insurerCode
            this.companyQueryInfo.insurerName = this.queryInfo.insurerName
            this.companyQueryInfo.clickType = '1'
            this.commissionConfigdblqueryCom1(this.companyQueryInfo).then(
              (res) => {
                console.log(res)
                if (res.data.code !== '000000' && !IsEmpty(res.data.code)) {
                  this.openToast('warning', res.data.msg)
                } else {
                  if (res.data.data.data.length === 1) {
                    this.queryInfoXiugaiDialog.insurerCode = res.data.data.data[0].insurercode
                    this.queryInfoXiugaiDialog.insurerName = res.data.data.data[0].insurername
                  }
                }
              }
            )
            break
          case 7:
            this.insureOrgQueryInfo.insurerCode = this.queryInfo.insurerCode
            this.insureOrgQueryInfo.orgCode = this.queryInfo.orgCode
            this.insureOrgQueryInfo.orgName = this.queryInfo.orgName
            this.insureOrgQueryInfo.clickType = '1'
            this.commissionConfigdblqueryCom2(this.insureOrgQueryInfo).then(
              (res) => {
                if (res.data.code !== '000000' && !IsEmpty(res.data.code)) {
                  this.openToast('warning', res.data.msg)
                } else {
                  if (res.data.data.data.length === 1) {
                    this.queryInfoXiugaiDialog.orgcode = res.data.data.data[0].orgcode
                    this.queryInfoXiugaiDialog.orgname = res.data.data.data[0].orgname
                  }
                }
              }
            )
            break
          case 8:
            if (!IsEmpty(this.queryInfo.comCode)) {
              this.orgQueryInfo.comCodeOrName = this.queryInfo.comCode
            } else if (!IsEmpty(this.queryInfo.comName)) {
              this.orgQueryInfo.comCodeOrName = this.queryInfo.comName
            } else {
              this.orgQueryInfo.comCodeOrName = ''
            }
            this.orgQueryInfo.clickType = '1'
            this.commissionConfigdblqueryCom3(this.orgQueryInfo).then(
              (res) => {
                if (res.data.code !== '000000' && !IsEmpty(res.data.code)) {
                  this.openToast('warning', res.data.msg)
                } else {
                  if (res.data.data.data.length === 1) {
                    this.queryInfoXiugaiDialog.comCode = res.data.data.data[0].comCode
                    this.queryInfoXiugaiDialog.comCName = res.data.data.data[0].comCName
                  }
                }
              }
            )
            break
          case 9:
            this.xianzhongInfo.insurerCode = this.queryInfoAdddialog.insureCode
            this.xianzhongInfo.riskCode = this.queryInfoAdddialog.riskcode
            this.xianzhongInfo.riskName = this.queryInfoAdddialog.riskname
            this.xianzhongInfo.clickType = '1'
            this.commissionConfigdblqueryXianzhong(this.xianzhongInfo).then(
              (res) => {
                if (res.data.code !== '000000' && !IsEmpty(res.data.code)) {
                  this.openToast('warning', res.data.msg)
                } else {
                  if (res.data.data.data.length === 1) {
                    this.queryInfoAdddialog.riskcode = res.data.data.data[0].riskcode
                    this.queryInfoAdddialog.riskname = res.data.data.data[0].riskname
                    this.queryInfoAdddialog.period = res.data.data.data[0].paymentperiod
                  }
                }
              }
            )
            break
          case 10:
            this.xianzhongInfo.insurerCode = this.queryInfoXiugaiDialog.insureCode
            this.xianzhongInfo.riskCode = this.queryInfoXiugaiDialog.riskcode
            this.xianzhongInfo.riskName = this.queryInfoXiugaiDialog.riskname
            this.xianzhongInfo.clickType = '1'
            this.commissionConfigdblqueryXianzhong(this.xianzhongInfo).then(
              (res) => {
                if (res.data.code !== '000000' && !IsEmpty(res.data.code)) {
                  this.openToast('warning', res.data.msg)
                } else {
                  if (res.data.data.data.length === 1) {
                    this.queryInfoXiugaiDialog.riskcode = res.data.data.data[0].riskcode
                    this.queryInfoXiugaiDialog.riskname = res.data.data.data[0].riskname
                  }
                }
              }
            )
            break
          default:
            break
        }
      }
    },
    openAddDialog () {
      this.addDialog = true
    },
    openXiugaiDialog () {
      console.log(this.multipleSelection)
      if (this.multipleSelection.length > 1) {
        this.openToast('warning', '只能修改一条记录')
      } else if (this.multipleSelection.length === 0) {
        this.openToast('warning', '请选择一条记录')
      } else {
        this.xiugaiDialog = true
        this.queryInfoXiugaiDialog.insureCode = this.multipleSelection[0].insureCode
        this.queryInfoXiugaiDialog.insureName = this.multipleSelection[0].insureName
        this.queryInfoXiugaiDialog.orgCode = this.multipleSelection[0].orgCode
        this.queryInfoXiugaiDialog.orgName = this.multipleSelection[0].orgName
        this.queryInfoXiugaiDialog.comCode = this.multipleSelection[0].comCode
        this.queryInfoXiugaiDialog.comName = this.multipleSelection[0].comName
        this.queryInfoXiugaiDialog.riskcode = this.multipleSelection[0].riskCode
        this.queryInfoXiugaiDialog.period = this.multipleSelection[0].period
        this.queryInfoXiugaiDialog.firstyearjcyj = this.multipleSelection[0].firstyearjcyj
        this.queryInfoXiugaiDialog.firstyearjlyjlzb = this.multipleSelection[0].firstyearjlyjlzb
        this.queryInfoXiugaiDialog.firstyearjlyj = this.multipleSelection[0].firstyearjlyj
        this.queryInfoXiugaiDialog.recommendertjblzb = this.multipleSelection[0].recommendertjblzb
        this.queryInfoXiugaiDialog.recommendertjbl = this.multipleSelection[0].recommendertjbl
        this.queryInfoXiugaiDialog.firstcommissionrate = this.multipleSelection[0].firstcommissionrate
        this.queryInfoXiugaiDialog.assessmentcommissionrate = this.multipleSelection[0].assessmentcommissionrate
        this.queryInfoXiugaiDialog.id = this.multipleSelection[0].id
        this.queryInfoXiugaiDialog.riskname = this.multipleSelection[0].riskName
        this.queryInfoXiugaiDialog.continuedCommission2 = this.multipleSelection[0].continuedCommission2
        this.queryInfoXiugaiDialog.continuedCommission3 = this.multipleSelection[0].continuedCommission3
        this.queryInfoXiugaiDialog.continuedCommission4 = this.multipleSelection[0].continuedCommission4
        this.queryInfoXiugaiDialog.continuedCommission5 = this.multipleSelection[0].continuedCommission5
        this.bankData = `${this.multipleSelection[0].bankCode}-${this.multipleSelection[0].bankName}`
      }
    },
    addDialogClose () {
      this.addDialog = false
      this.bankData = ''
      this.$refs['queryInfoAdddialog'].resetFields()
      this.queryInfoAdddialog = {
        insureCode: '',
        insureName: '',
        orgCode: '',
        orgName: '',
        comCode: '',
        comName: '',
        riskcode: '',
        riskname: '',
        bankCode: '',
        bankName: '',
        period: '',
        firstcommissionrate: '',
        assessmentcommissionrate: '',
        continuedCommission2: '',
        continuedCommission3: '',
        continuedCommission4: '',
        continuedCommission5: ''
      }
    },
    xiugaiDialogClose () {
      this.xiugaiDialog = false
      this.bankData = ''
    },
    shangchuanDialogClose () {
      this.shangchuanDialog = false
    },
    shangchuanDialogOpen () {
      this.shangchuanDialog = true
    },
    handleEXLSuccess (res) {
      this.closeLoading()
      if (res.code !== '000000') {
        this.openToast('error', res.msg)
        this.fileList = []
      } else {
        this.openToast('success', res.msg)
        this.fileList = []
        this.shangchuanDialog = false
        this.queryData()
      }
    }
  },
  components: {
    [NoticeBar.name]: NoticeBar,
    [LineTittle.name]: LineTittle,
    [LabelText.name]: LabelText,
    ComDialog
  },
  created () {
  },
  computed: {
    comDialogData1 () {
      let temp = this.$store.state.commissionConfig.commissionConfigdblComData1
      if (!IsEmpty(temp)) {
        if (!IsEmpty(temp[0].insurercode) && !IsEmpty(temp[0].insurername)) {
          for (let i = 0; i < temp.length; i++) {
            temp[i]['renderData'] = `${temp[i].insurercode}-${temp[i].insurername}`
          }
        }
      }
      return temp
    },
    comDialogData2 () {
      let temp = this.$store.state.commissionConfig.commissionConfigdblComData2
      if (!IsEmpty(temp)) {
        if (!IsEmpty(temp[0].orgcode) && !IsEmpty(temp[0].orgname)) {
          for (let i = 0; i < temp.length; i++) {
            temp[i]['renderData'] = `${temp[i].orgcode}-${temp[i].orgname}`
          }
        }
      }
      return temp
    },
    comDialogData3 () {
      let temp = this.$store.state.commissionConfig.commissionConfigdblComData3
      if (!IsEmpty(temp)) {
        if (!IsEmpty(temp[0].comCode) && !IsEmpty(temp[0].comCName)) {
          for (let i = 0; i < temp.length; i++) {
            temp[i]['renderData'] = `${temp[i].comCode}-${temp[i].comCName}`
          }
        }
      }
      return temp
    },
    comDialogData4 () {
      let temp = this.$store.state.commissionConfig.commissionConfigdblXianzhongData
      if (!IsEmpty(temp)) {
        if (!IsEmpty(temp[0].riskcode) && IsEmpty(temp[0].comCName)) {
          for (let i = 0; i < temp.length; i++) {
            temp[i]['renderData'] = `${temp[i].riskcode}-`
          }
        } else if (!IsEmpty(temp[0].riskcode) && !IsEmpty(temp[0].comCName)) {
          for (let i = 0; i < temp.length; i++) {
            temp[i]['renderData'] = `${temp[i].riskcode}-${temp[i].riskname}`
          }
        }
      }
      return temp
    }
  }
}
</script>

<style lang="scss" scoped type="text/css">
.upload-rate,
.download,
.download1 {
  text-align: center;
}
.rate-wrapper {
  width: 300px;
  margin: 100px auto;
}
#orgadd {
  padding-left: 30px;
  padding-right: 30px;
}
.btn-container{
  text-align: center;
  margin-bottom: 30px;
  margin-top: 60px;
}
.btn-rowGroup{
  margin-left: 30px
}
.ri-line{
  margin-top: 10px;
  margin-bottom: 10px;
}
.ri-line1{
  margin-top: 25px;
  margin-bottom: 10px;
}
</style>
