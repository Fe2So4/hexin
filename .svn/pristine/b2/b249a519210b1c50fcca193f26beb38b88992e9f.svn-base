<template>
  <div id="orgadd" >
      <ui-notice-bar slot="breadcast" >
        <el-breadcrumb slot="location" separator=">">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>对账单管理</el-breadcrumb-item>
            <el-breadcrumb-item>银保代理对账单管理</el-breadcrumb-item>
            <el-breadcrumb-item>财务部审核</el-breadcrumb-item>
          </el-breadcrumb>
      </ui-notice-bar>
      <div class="ri-content" slot="content" >
        <el-form ref="bankcaiwuExamine" :rules="rules" :model="queryInfo">
          <el-row class="ri-line">
            <el-col :span="12">
              <el-form-item prop='comCode'>
                <ui-label-text :required="true" labelWidth="180" label="佰盈机构代码：">
                  <el-input v-model="queryInfo.comCode" clearable slot="text" @dblclick.native="openComDialog(4)" placeholder="双击可选择" @blur='opensingleComDialog(1)'></el-input>
                </ui-label-text>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item prop='comName'>
                <ui-label-text labelWidth="180" label="佰盈机构名称:" >
                  <el-input v-model="queryInfo.comName" clearable slot="text" @dblclick.native="openComDialog(4)" placeholder="双击可选择" @blur='opensingleComDialog(1)'></el-input>
                </ui-label-text>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row class="ri-line">
            <el-col :span="12">
              <el-form-item prop='companyCode'>
                <ui-label-text labelWidth="180" label="保险公司代码：">
                  <el-input v-model="queryInfo.companyCode" clearable slot="text" @dblclick.native="openComDialog(5)" placeholder="双击可选择" @blur='opensingleComDialog(0)'></el-input>
                </ui-label-text>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item prop='companyName'>
                <ui-label-text labelWidth="180" label="保险公司名称：">
                  <el-input v-model="queryInfo.companyName" clearable slot="text" @dblclick.native="openComDialog(5)" placeholder="双击可选择" @blur='opensingleComDialog(0)'></el-input>
                </ui-label-text>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row class="ri-line">
            <el-col :span="12">
              <el-form-item prop='verifyStatus'>
                  <ui-label-text labelWidth="180" label="对账单审核状态：">
                    <el-select v-model="queryInfo.verifyStatus" slot="text" placeholder="请选择">
                      <el-option label="待审核" value="1"></el-option>
                      <el-option label="审核通过" value="2"></el-option>
                      <el-option label="不通过" value="9"></el-option>
                    </el-select>
                  </ui-label-text>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item prop='status'>
                <ui-label-text labelWidth="180" label="财务审核状态：">
                  <el-select v-model="queryInfo.status" slot="text" placeholder="请选择">
                    <el-option label="未审核" value="1"></el-option>
                    <el-option label="审核通过" value="3"></el-option>
                    <el-option label="复核通过" value="2"></el-option>
                  </el-select>
                </ui-label-text>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row class="ri-line">
            <el-col :span="24">
              <el-form-item prop='insurerName'>
                <div class="datestyle" labelWidth="150">对账单生成日期:</div>
                <el-date-picker v-model="queryInfo.startDate" type="date" placeholder="选择开始日期" value-format="yyyy-MM-dd"></el-date-picker>
                <div class="datestyle1" labelWidth="150">至</div>
                <el-date-picker v-model="queryInfo.endDate" type="date" placeholder="选择结束日期" value-format="yyyy-MM-dd"></el-date-picker>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
      <div class="btn-container" slot="controlbar">
          <el-button type="primary" @click.native.prevent="submitForm('bankcaiwuExamine', 0)">查询</el-button>
          <!-- <el-button type="primary" @click.native.prevent="submitForm('bankcaiwuExamine', 1)">导出</el-button> -->
      </div>
      <div v-if="tableShowOrnot">
        <el-table stripe ref="multipleTable" tooltip-effect="dark" style="width: 100%" :data="tableData">
          <el-table-column prop="batchNo" label="对账单号"  width="300" show-overflow-tooltip>
            <template slot-scope="scope" >
              <span @click="getDetailExamine(scope.row)" class="tableButton">{{ scope.row.batchNo }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="companyName" label="保险公司"  width="300" show-overflow-tooltip></el-table-column>
          <el-table-column prop="comName" label="佰盈公司" width="300" show-overflow-tooltip></el-table-column>
          <el-table-column prop="type" label="奖金类型" width="120" show-overflow-tooltip></el-table-column>
          <el-table-column prop="calHandMount" label="对账金额" width="120" show-overflow-tooltip></el-table-column>
          <el-table-column prop="reconinsertDateStr" label="对账单生成日期" width="120" show-overflow-tooltip></el-table-column>
          <el-table-column prop="checkDate" label="财务复核日期" width="150" show-overflow-tooltip></el-table-column>
          <el-table-column prop="verifyStatus" label="运营审核状态" width="120" show-overflow-tooltip></el-table-column>
          <el-table-column prop="status" label="财务审核状态" width="200" show-overflow-tooltip></el-table-column>
        </el-table>
        <div class="block">
          <el-pagination
            :pager-count="5"
            @current-change="handleCurrentChange"
            :current-page="queryInfo.currentPage"
            @size-change="handleSizeChange"
            :page-size="queryInfo.pageSize"
            :page-sizes="[10,20,50]"
            :total="totalRecords"
            layout="total, sizes, prev, pager, next, jumper"
            >
          </el-pagination>
        </div>
      </div>
      <!--银保代理对账单信息明细  弹框-->
      <el-dialog :append-to-body="true" width="80%" center title="银保代理对账单信息明细" :visible.sync="detailDialogVis" :before-close="detailClosing">
        <ui-line-tittle :collapsible="true"  v-if="chargeType === 1 || chargeType === '1' || !chargeType">
          <span slot="title" >
            <i class="font_family icon-jy-menu-4" ></i>已开票公司
          </span>
          <div class="ri-content" slot="content">
            <el-table stripe ref="multipleTable" tooltip-effect="dark" style="width: 100%" :data="kaipiaoTableData">
              <el-table-column prop="comcomname" label="开票机构名称" width="120"></el-table-column>
              <el-table-column prop="companyname" label="保险公司名称" width="120"></el-table-column>
              <el-table-column prop="type" label="商品类型" width="120"></el-table-column>
              <el-table-column prop="note" label="发票类型" width="200"></el-table-column>
              <el-table-column prop="total" label="调整后税价款" width="120"></el-table-column>
              <el-table-column prop="tzcost" label="调整后价款" width="120"></el-table-column>
              <el-table-column prop="tztaxation" label="调整后税款" width="300"></el-table-column>
            </el-table>
          </div>
        </ui-line-tittle>
        <ui-line-tittle :collapsible="true"  v-if="chargeType === 2 || chargeType === '2'">
          <span slot="title" >
            <i class="font_family icon-jy-menu-4" ></i>子结算单信息
          </span>
          <div class="ri-content" slot="content" >
            <el-table ref="multipleTable" stripe tooltip-effect="dark" style="width: 100%" :data="kaipiaoTableData">
              <el-table-column prop="normStatus" label="标准结算" width="200"></el-table-column>
              <el-table-column prop="reconnoNo" label="子结算单号" width="200"></el-table-column>
              <el-table-column prop="comcomcode" label="开票机构名称" width="200"></el-table-column>
              <el-table-column prop="firmname" label="公司段名称" width="200"></el-table-column>
              <el-table-column prop="ratepayername" label="客户名称" width="200"></el-table-column>
              <el-table-column prop="ratepayercode" label="客户身份" width="150"></el-table-column>
              <el-table-column prop="ratepayeradd" label="客户地址" width="200"></el-table-column>
              <el-table-column prop="ratepayerno" label="客户识别号" width="200"></el-table-column>
              <el-table-column prop="ratepayerphone" label="客户电话" width="200"></el-table-column>
              <el-table-column prop="ratepayerbankname" label="客户开户行" width="200"></el-table-column>
              <el-table-column prop="ratepayerbankcode" label="客户银行账号" width="200"></el-table-column>
              <el-table-column prop="type" label="商品名称" width="120"></el-table-column>
              <el-table-column prop="spsl" label="开票税率" width="120"></el-table-column>
              <el-table-column prop="note" label="发票类型" width="120"></el-table-column>
              <el-table-column prop="tzcost" label="调整后价款" width="150"></el-table-column>
              <el-table-column prop="tztaxation" label="调整后税款" width="150"></el-table-column>
              <el-table-column prop="total" label="调整后价税合计" width="150"></el-table-column>
              <el-table-column prop="reconnoStatus" label="财务认领状态" width="120"></el-table-column>
              <el-table-column prop="claimName" label="状态来源" width="120"></el-table-column>
            </el-table>
          </div>
        </ui-line-tittle>
        <!--对账单详细信息-->
        <ui-line-tittle :collapsible="true">
          <span slot="title" >
            <i class="font_family icon-jy-menu-4" ></i>对账单详细信息
          </span>
          <div class="ri-content" slot="content" >
            <el-row class="ri-line">
              <el-col :span="12">
                <ui-label-text  label="对账单号：" labelWidth="140" :text="detailDialogData.batchNo">
                </ui-label-text>
              </el-col>
              <el-col :span="12">
                <ui-label-text  label="对账单状态：" labelWidth="140" :text="detailDialogData.status">
                </ui-label-text>
              </el-col>
            </el-row>
            <el-row class="ri-line">
              <el-col :span="12">
                <ui-label-text  label="保险公司代码：" labelWidth="140" :text="detailDialogData.companyCode">
                </ui-label-text>
              </el-col>
              <el-col :span="12">
                <ui-label-text  label="保险公司名称：" labelWidth="140" :text="detailDialogData.companyName">
                </ui-label-text>
              </el-col>
            </el-row>
            <el-row class="ri-line">
              <el-col :span="12">
                <ui-label-text  label="保险公司机构代码：" labelWidth="140" :text="detailDialogData.companyComCode">
                </ui-label-text>
              </el-col>
              <el-col :span="12">
                <ui-label-text  label="保险公司机构名称：" labelWidth="140" :text="detailDialogData.companyComName">
                </ui-label-text>
              </el-col>
            </el-row>
            <el-row class="ri-line">
              <el-col :span="12">
                <ui-label-text  label="对账单生成人代码：" labelWidth="140" :text="detailDialogData.reconinsertCode">
                </ui-label-text>
              </el-col>
              <el-col :span="12">
                <ui-label-text  label="对账单生成人名称：" labelWidth="140" :text="detailDialogData.reconinsertName">
                </ui-label-text>
              </el-col>
            </el-row>
            <el-row class="ri-line">
              <el-col :span="12">
                <ui-label-text  label="对账单生成日期:" labelWidth="140" :text="detailDialogData.reconinsertDateStr">
                </ui-label-text>
              </el-col>
              <el-col :span="12">
                <ui-label-text  label="收款日期:" labelWidth="140" :text="detailDialogData.reconinsertDateStr">
                </ui-label-text>
              </el-col>
            </el-row>
            <el-row class="ri-line">
              <el-col :span="12">
                <ui-label-text label="对账总手续费（不含税）:" labelWidth="160" :text="detailDialogData.calNoHandMount">
                </ui-label-text>
              </el-col>
              <el-col :span="12">
                <ui-label-text label="对账总手续费（含税）：" labelWidth="160" :text="detailDialogData.calHandMount">
                </ui-label-text>
              </el-col>
            </el-row>
            <el-row class="ri-line">
              <el-col :span="12">
                <ui-label-text label="对账总手续费税额：" labelWidth="160" :text="detailDialogData.caltaxMount">
                </ui-label-text>
              </el-col>
              <el-col :span="12">
                <ui-label-text  label="奖金类型：" labelWidth="140" :text="detailDialogData.type">
                </ui-label-text>
              </el-col>
            </el-row>
            <el-row class="ri-line">
              <el-col :span="12">
                <ui-label-text label="首期手续费：" labelWidth="160" :text="detailDialogData.sqCalHandMount">
                </ui-label-text>
              </el-col>
              <el-col :span="12">
                <ui-label-text label="续期手续费：" labelWidth="160" :text="detailDialogData.xqCalHandMount">
                </ui-label-text>
              </el-col>
            </el-row>
            <el-row class="ri-line">
              <el-col :span="12">
                <ui-label-text label="调整对账总手续费（含税）：" labelWidth="160" :text="detailDialogData.actualHandMount">
                </ui-label-text>
              </el-col>
              <el-col :span="12">
                <ui-label-text label="调整后对账总手续费（不含税）：" labelWidth="160" :text="detailDialogData.actualNoHandMount">
                </ui-label-text>
              </el-col>
            </el-row>
            <el-row class="ri-line">
              <el-col :span="12">
                <ui-label-text label="调整后对账总手续费（税额）：" labelWidth="160" :text="detailDialogData.actualtaxMount">
                </ui-label-text>
              </el-col>
            </el-row>
          </div>
        </ui-line-tittle>
        <div  v-if="chargeType === 1 || chargeType === '1' || !chargeType">
          <!--机构映射信息-->
          <ui-line-tittle :collapsible="true" >
            <span slot="title" >
              <i class="font_family icon-jy-menu-4" ></i>机构映射信息
            </span>
            <div class="ri-content" slot="content">
              <el-row class="ri-line">
                <el-col :span="12">
                  <ui-label-text label="开票机构代码:" :required="true"  labelWidth="210">
                    <el-input slot="text"  placeholder="双击可选择" @dblclick.native="openComDialog(7)" clearable v-model="kaipInfo.comCode"></el-input>
                  </ui-label-text>
                </el-col>
                <el-col :span="12">
                  <ui-label-text  label="开票机构名称:" :required="true" labelWidth="210" >
                    <el-input slot="text"  placeholder="双击可选择" @dblclick.native="openComDialog(7)" clearable v-model="kaipInfo.comName"></el-input>
                  </ui-label-text>
                </el-col>
              </el-row>
              <el-row class="ri-line">
                <el-col :span="12">
                  <ui-label-text label="公司段代码:" :required="true" labelWidth="210">
                    <el-input slot="text" @dblclick.native="openComDialog(1)" placeholder="双击可选择" clearable v-model="kaipInfo.firmcode" ></el-input>
                  </ui-label-text>
                </el-col>
                <el-col :span="12">
                  <ui-label-text  label="公司段名称:" :required="true" labelWidth="210" >
                    <el-input slot="text" @dblclick.native="openComDialog(1)" placeholder="双击可选择" clearable v-model="kaipInfo.firmname" ></el-input>
                  </ui-label-text>
                </el-col>
              </el-row>
              <!-- <el-row class="ri-line">
                <el-col :span="12">
                  <ui-label-text label="客户段代码:" :required="true" labelWidth="210">
                    <el-input slot="text" @dblclick.native="openComDialog(2)" placeholder="双击可选择" clearable v-model="kaipInfo.clientcode" ></el-input>
                  </ui-label-text>
                </el-col>
                <el-col :span="12">
                  <ui-label-text  label="客户段名称:" :required="true" labelWidth="210" >
                    <el-input slot="text" @dblclick.native="openComDialog(2)" placeholder="双击可选择" clearable v-model="kaipInfo.clientname" ></el-input>
                  </ui-label-text>
                </el-col>
              </el-row>
              <el-row class="ri-line">
                <el-col :span="12">
                  <ui-label-text label="银行段代码:" :required="true" labelWidth="210">
                    <el-input slot="text" @dblclick.native="openComDialog(3)" placeholder="双击可选择" clearable v-model="kaipInfo.bankcode" ></el-input>
                  </ui-label-text>
                </el-col>
                <el-col :span="12">
                  <ui-label-text  label="银行段名称:" :required="true" labelWidth="210">
                    <el-input slot="text" @dblclick.native="openComDialog(3)" placeholder="双击可选择" clearable v-model="kaipInfo.bankname" ></el-input>
                  </ui-label-text>
                </el-col>
              </el-row> -->
            </div>
          </ui-line-tittle>
          <!--发票信息-->
          <ui-line-tittle :collapsible="true" >
            <span slot="title" >
              <i class="font_family icon-jy-menu-4"></i>发票信息
            </span>
            <div class="ri-content" slot="content">
              <el-row class="ri-line">
                <!-- <el-col :span="12">
                  <ui-label-text label="纳税人代码:"  labelWidth="210" :text="detailDialogData.ratepayercomcode">
                  </ui-label-text>
                </el-col> -->
                <el-col :span="4">
                  <ui-label-text :required="true" labelWidth="120" label="纳税人代码：" >
                  </ui-label-text>
                </el-col>
                <el-col :span="8" class="testInput">
                  <el-input v-model="kaipInfo.ratepayercomcode" clearable placeholder="双击可选择" @dblclick.native="openComDialog(6)"></el-input>
                </el-col>
                <!-- <el-col :span="12">
                  <ui-label-text label="纳税人名称:"  labelWidth="210" :text="detailDialogData.ratepayername">
                  </ui-label-text>
                </el-col> -->
                <el-col :span="4">
                  <ui-label-text :required="true" labelWidth="120" label="纳税人名称：" >
                  </ui-label-text>
                </el-col>
                <el-col :span="8" class="testInput">
                  <el-input v-model="kaipInfo.ratepayername" clearable placeholder="双击可选择" @dblclick.native="openComDialog(6)"></el-input>
                </el-col>
              </el-row>
              <el-row class="ri-line">
                <!-- <el-col :span="12">
                  <ui-label-text  label="纳税人身份:" labelWidth="210" :text="kaipInfo.ratepayercode">
                  </ui-label-text>
                </el-col> -->
                <el-col :span="4">
                  <ui-label-text :required="true" labelWidth="120" label="纳税人身份：" >
                  </ui-label-text>
                </el-col>
                <el-col :span="8" class="testInput">
                  <el-select v-model="kaipInfo.ratepayercode" placeholder="请选择">
                    <el-option label="增值税一般纳税人" value="1"></el-option>
                    <el-option label="增值税小规模纳税人" value="2"></el-option>
                  </el-select>
                </el-col>
                <!-- <el-col :span="12">
                  <ui-label-text label="纳税人地址:"  labelWidth="210" :text="kaipInfo.ratepayeradd">
                  </ui-label-text>
                </el-col> -->
                <el-col :span="4">
                  <ui-label-text :required="true" labelWidth="120" label="纳税人地址：" >
                  </ui-label-text>
                </el-col>
                <el-col :span="8" class="testInput">
                  <el-input v-model="kaipInfo.ratepayeradd"></el-input>
                </el-col>
              </el-row>
              <el-row class="ri-line">
                <!-- <el-col :span="12">
                  <ui-label-text  label="纳税人识别号:" labelWidth="210" :text="kaipInfo.ratepayerno">
                  </ui-label-text>
                </el-col> -->
                <el-col :span="4">
                  <ui-label-text :required="true" labelWidth="120" label="纳税人识别号：" >
                  </ui-label-text>
                </el-col>
                <el-col :span="8" class="testInput">
                  <el-input v-model="kaipInfo.ratepayerno"></el-input>
                </el-col>
                <!-- <el-col :span="12">
                  <ui-label-text label="纳税人电话:"  labelWidth="210" :text="kaipInfo.ratepayerphone">
                  </ui-label-text>
                </el-col> -->
                <el-col :span="4">
                  <ui-label-text :required="true" labelWidth="120" label="纳税人电话：" >
                  </ui-label-text>
                </el-col>
                <el-col :span="8" class="testInput">
                  <el-input v-model="kaipInfo.ratepayerphone"></el-input>
                </el-col>
              </el-row>
              <el-row class="ri-line">
                <!-- <el-col :span="12">
                  <ui-label-text  label="纳税人开户行:" labelWidth="210" :text="kaipInfo.ratepayerbankname">
                  </ui-label-text>
                </el-col> -->
                <el-col :span="4">
                  <ui-label-text :required="true" labelWidth="120" label="纳税人开户行：" >
                  </ui-label-text>
                </el-col>
                <el-col :span="8" class="testInput">
                  <el-input v-model="kaipInfo.ratepayerbankname"></el-input>
                </el-col>
                <!-- <el-col :span="12">
                  <ui-label-text label="纳税人银行账号:"  labelWidth="210" :text="kaipInfo.ratepayerbankcode">
                  </ui-label-text>
                </el-col> -->
                <el-col :span="4">
                  <ui-label-text :required="true" labelWidth="120" label="纳税人银行账号：" >
                  </ui-label-text>
                </el-col>
                <el-col :span="8" class="testInput">
                  <el-input v-model="kaipInfo.ratepayerbankcode"></el-input>
                </el-col>
              </el-row>
            </div>
          </ui-line-tittle>
          <!--商品信息  type -->
          <ui-line-tittle :collapsible="true" >
            <span slot="title" >
              <i class="font_family icon-jy-menu-4" ></i>商品信息
            </span>
            <div class="ri-content" slot="content">
              <ui-label-text  label="商品名称:" :required="true" labelWidth="160">
                <el-select v-model="kaipiaoInputData.type" slot="text" placeholder="请选择">
                  <el-option label="手续费" value="1"></el-option>
                  <el-option label="服务费" value="2"></el-option>
                  <el-option label="其他经纪代理服务" value="3"></el-option>
                  <el-option label="保险代理手续费" value="5"></el-option>
                </el-select>
              </ui-label-text>
            </div>
          </ui-line-tittle>
          <ui-line-tittle :collapsible="true" >
            <span slot="title" >
              <i class="font_family icon-jy-menu-4" ></i>税收信息
            </span>
            <div class="ri-content" slot="content">
              <el-row class="ri-line">
                <el-col :span="3">
                  <span>发票类型</span>
                </el-col>
                <el-col :span="3">
                  <span>首/续保标记</span>
                </el-col>
                <el-col :span="4">
                  <span>对账总手续费（含税）</span>
                </el-col>
                <el-col :span="4">
                  <span>税款</span>
                </el-col>
                <el-col :span="4">
                  <span>价款</span>
                </el-col>
                <el-col :span="3">
                  <span>调整后的税款</span>
                </el-col>
                <el-col :span="3">
                  <span>调整后的价款</span>
                </el-col>
              </el-row>
              <el-row class="ri-line">
                <el-col :span="3">
                  <span>普票</span>
                </el-col>
                <el-col :span="3">
                  <span>新保</span>
                </el-col>
                <el-col :span="4" class="testInput">
                  <el-input type="number" v-model="kaipiaoInputData.allhandCal1" @blur='calHandCal(1)'></el-input>
                </el-col>
                <el-col :span="4" class="testInput">
                  <el-input type="number" v-model="kaipiaoInputData.shuiCal1" readonly></el-input>
                </el-col>
                <el-col :span="4" class="testInput">
                  <el-input type="number" v-model="kaipiaoInputData.priceCal1" readonly></el-input>
                </el-col>
                <el-col :span="3" class="testInput">
                  <el-input type="number" v-model="kaipiaoInputData.aftershuiCal1"></el-input>
                </el-col>
                <el-col :span="3" class="testInput">
                  <el-input type="number" v-model="kaipiaoInputData.afterpriceCal1"></el-input>
                </el-col>
              </el-row>
              <el-row class="ri-line">
                <el-col :span="3">
                  <span>普票</span>
                </el-col>
                <el-col :span="3">
                  <span>续保</span>
                </el-col>
                <el-col :span="4" class="testInput">
                  <el-input type="number" v-model="kaipiaoInputData.allhandCal2" @blur='calHandCal(2)'></el-input>
                </el-col>
                <el-col :span="4" class="testInput">
                  <el-input type="number" v-model="kaipiaoInputData.shuiCal2" readonly></el-input>
                </el-col>
                <el-col :span="4" class="testInput">
                  <el-input type="number" v-model="kaipiaoInputData.priceCal2" readonly></el-input>
                </el-col>
                <el-col :span="3" class="testInput">
                  <el-input type="number" v-model="kaipiaoInputData.aftershuiCal2"></el-input>
                </el-col>
                <el-col :span="3" class="testInput">
                  <el-input type="number" v-model="kaipiaoInputData.afterpriceCal2"></el-input>
                </el-col>
              </el-row>
              <el-row class="ri-line">
                <el-col :span="3">
                  <span>专票</span>
                </el-col>
                <el-col :span="3">
                  <span>新保</span>
                </el-col>
                <el-col :span="4" class="testInput">
                  <el-input type="number" v-model="kaipiaoInputData.allhandCal3" @blur='calHandCal(3)'></el-input>
                </el-col>
                <el-col :span="4" class="testInput">
                  <el-input type="number" v-model="kaipiaoInputData.shuiCal3" readonly></el-input>
                </el-col>
                <el-col :span="4" class="testInput">
                  <el-input type="number" v-model="kaipiaoInputData.priceCal3" readonly></el-input>
                </el-col>
                <el-col :span="3" class="testInput">
                  <el-input type="number" v-model="kaipiaoInputData.aftershuiCal3"></el-input>
                </el-col>
                <el-col :span="3" class="testInput">
                  <el-input type="number" v-model="kaipiaoInputData.afterpriceCal3"></el-input>
                </el-col>
              </el-row>
              <el-row class="ri-line">
                <el-col :span="3">
                  <span>专票</span>
                </el-col>
                <el-col :span="3">
                  <span>续保</span>
                </el-col>
                <el-col :span="4" class="testInput">
                  <el-input type="number" v-model="kaipiaoInputData.allhandCal4" @blur='calHandCal(4)'></el-input>
                </el-col>
                <el-col :span="4" class="testInput">
                  <el-input type="number" v-model="kaipiaoInputData.shuiCal4" readonly></el-input>
                </el-col>
                <el-col :span="4" class="testInput">
                  <el-input type="number" v-model="kaipiaoInputData.priceCal4" readonly></el-input>
                </el-col>
                <el-col :span="3" class="testInput">
                  <el-input type="number" v-model="kaipiaoInputData.aftershuiCal4"></el-input>
                </el-col>
                <el-col :span="3" class="testInput">
                  <el-input type="number" v-model="kaipiaoInputData.afterpriceCal4"></el-input>
                </el-col>
              </el-row>
            </div>

          </ui-line-tittle>
        </div>
        <div class="center" v-if="chargeType === 1 || chargeType === '1' || !chargeType">
          <el-button type="primary" @click.native.prevent="noEmptyCheck(1)">审核通过</el-button>
          <el-button type="primary" @click.native.prevent="shenheNopass()">审核不通过</el-button>
          <el-button type="primary" @click.native.prevent="back()">返回</el-button>
          <el-button type="primary" @click.native.prevent="fuhepass()">复核通过</el-button>
          <el-button type="primary" @click.native.prevent="fuheNopass()">复核不通过</el-button>
        </div>
        <div class="btn-container" v-if="chargeType === 2 || chargeType === '2'">
          <el-row class="ri-line">
            <el-button type="primary" style="width:150px" @click="kaipiaoBasicInfoExport">开票基本信息导出</el-button>
            <el-button type="primary" style="width:150px" @click="kaipiaoOriginInfoExport">原始开票信息导出</el-button>
            <el-button type="primary" style="width:150px" @click="checkKaipiaoBasicInfo">开票信息导入</el-button>
            <el-button type="primary" style="width:150px" @click="kaipiaoInfoExport">开票信息导出</el-button>
            <el-button type="primary" style="width:150px" @click="errorInfoExport">错误信息导出</el-button>
          </el-row>
          <el-row class="ri-line">
            <el-button type="primary" style="width:150px" @click="newshenhepass">审核通过</el-button>
            <el-button type="primary" style="width:150px" @click="shenheNopass">审核不通过</el-button>
            <el-button type="primary" style="width:150px" @click="back">返回</el-button>
            <el-button type="primary" style="width:150px" @click="fuhepass">复核通过</el-button>
            <el-button type="primary" style="width:150px" @click="fuheNopass">复核不通过</el-button>
          </el-row>
        </div>
      </el-dialog>
      <el-dialog :append-to-body='true' :visible.sync='comDialog1' :before-close='childClose1'>
        <div>
          <el-table stripe @row-click='changeData1' ref="multipleTable" :data="tempTableData1">
            <el-table-column prop="firmcode" label="代码" center ></el-table-column>
            <el-table-column prop="firmname" label="名称" center ></el-table-column>
          </el-table>
          <div class="block">
            <el-pagination
              @current-change="handleCurrentChange1"
              @size-change="handleSizeChange1"
              :current-page="gongsiduanInfo.currentPage"
              :page-size="gongsiduanInfo.pageSize"
              :page-sizes="[10,20,50]"
              :pager-count="5"
              layout="total, sizes, prev, pager, next, jumper"
              :total="fenyetotalData"
              >
            </el-pagination>
          </div>
        </div>
      </el-dialog>
      <el-dialog :append-to-body='true' :visible.sync='comDialog2' :before-close='childClose2'>
        <div>
          <el-table stripe @row-click='changeData2' ref="multipleTable" :data="tempTableData2">
            <el-table-column prop="clientcode" label="代码" center ></el-table-column>
            <el-table-column prop="clientname" label="名称" center ></el-table-column>
          </el-table>
          <div class="block">
            <el-pagination
              @current-change="handleCurrentChange2"
              @size-change="handleSizeChange2"
              :current-page="kehuduanInfo.currentPage"
              :page-size="kehuduanInfo.pageSize"
              :page-sizes="[10,20,50]"
              :pager-count="5"
              layout="total, sizes, prev, pager, next, jumper"
              :total="fenyetotalData"
              >
            </el-pagination>
          </div>
        </div>
      </el-dialog>
      <el-dialog :append-to-body='true' :visible.sync='comDialog3' :before-close='childClose3'>
        <div>
          <el-table stripe @row-click='changeData3' ref="multipleTable" :data="tempTableData3">
            <el-table-column prop="bankcode" label="代码" center ></el-table-column>
            <el-table-column prop="bankname" label="名称" center ></el-table-column>
          </el-table>
          <div class="block">
            <el-pagination
              @current-change="handleCurrentChange3"
              @size-change="handleSizeChange3"
              :current-page="yinhangduanInfo.currentPage"
              :page-size="yinhangduanInfo.pageSize"
              :page-sizes="[10,20,50]"
              :pager-count="5"
              layout="total, sizes, prev, pager, next, jumper"
              :total="fenyetotalData"
              >
            </el-pagination>
          </div>
        </div>
      </el-dialog>
      <el-dialog :append-to-body='true' :visible.sync='comDialog6' :before-close='childClose4'>
        <div>
          <el-table stripe @row-click='dialogBackData2' ref="multipleTable" :data="tempTableData6">
            <el-table-column prop="ratepayercomcode" label="代码" center ></el-table-column>
            <el-table-column prop="ratepayername" label="名称" center ></el-table-column>
          </el-table>
          <div class="block">
            <el-pagination
              @current-change="handleCurrentChange4"
              @size-change="handleSizeChange4"
              :current-page="nashuirenInfo.currentPage"
              :page-size="nashuirenInfo.pageSize"
              :page-sizes="[10,20,50]"
              :pager-count="5"
              layout="total, sizes, prev, pager, next, jumper"
              :total="fenyetotalData"
              >
            </el-pagination>
          </div>
        </div>
      </el-dialog>
      <el-dialog append-to-body center title="开票信息导入"
        :visible.sync="importInvoiceVis" width="60%">
        <div class="upload-content">
          <el-upload
            class="upload-content" ref="importRef"
            name="fileName"
            action="/tabycore/bankCharge/bankChargeimportInvoice"
            :limit="1"
            :on-exceed="handleExceed"
            :on-success="handleEXLSuccess"
            :before-upload="Loading"
            :data="{'reconno': duizhangdanNo}"
            :file-list="fileList"
            center>
            <el-button type="primary">点击选择</el-button>
            <!-- <div slot="tip" class="red-color">
              <p>* 请您耐心等待，导入结果将会以excel的形式进行显示！<a class="download" @click="ondownloadDemo">(模板下载)</a>
              </p>
            </div> -->
          </el-upload>
        </div>
      </el-dialog>
      <el-dialog title="导入结果" center :append-to-body='true' :visible.sync='importResVis'>
        <pre class="importResStyle">{{importRes}}</pre>
        <div class="btn-container">
          <el-button @click="importResVis = false">返回</el-button>
        </div>
      </el-dialog>
      <ComDialog :vis='comDialog4' :workerVis='comDialogworker4' :comVis='comDialogCom4' :newTableData='tempTableData4' @onClose='comDialogClosing(4)' @selectDialog='dialogBackData' @comdialogChangePageFunction='changeComdialogPage1' @comdialogChangePageSizeFunction='changeComdialogPageSize1' :fenyetotal='fenyetotalData'/>
      <ComDialog :vis='comDialog5' :workerVis='comDialogworker5' :comVis='comDialogCom5' :newTableData='tempTableData5' @onClose='comDialogClosing(5)' @selectDialog='dialogBackData1' @comdialogChangePageFunction='changeComdialogPage2' @comdialogChangePageSizeFunction='changeComdialogPageSize2' :fenyetotal='fenyetotalData'/>
      <ComDialog :vis='comDialog7' :workerVis='comDialogworker7' :comVis='comDialogCom7' :newTableData='tempTableData7' @onClose='comDialogClosing(7)' @selectDialog='dialogBackData3' @comdialogChangePageFunction='changeComdialogPage3' @comdialogChangePageSizeFunction='changeComdialogPageSize3' :fenyetotal='fenyetotalData'/>
  </div>
</template>

<script>
import NoticeBar from '@/components/notice-bar'
import LineTittle from '@/components/line-tittle'
import LabelText from '@/components/label-text'
import { mapActions } from 'vuex'
import ComDialog from '@/components/comDialog'
import IsEmpty from '@/utils/IsEmpty'
import {
  api
} from '@/api/lifeInsur_mgr/quitListMgr.js'
export default {
  name: '',
  data () {
    return {
      queryInfo: {
        companyCode: '',
        companyName: '',
        comCode: '',
        comName: '',
        verifyStatus: '',
        startDate: '',
        endDate: '',
        status: '',
        batch: '',
        chargeType: '', // chargeType 显示的详情类型 1-可在前台修改各项钱款 2-不可修改
        currentPage: 1,
        pageSize: 10
      },
      companyQueryInfo: {
        type: '3',
        clickType: '2',
        insurerCode: '',
        insurerName: '',
        currentPage: 1,
        pageSize: 10
      },
      orgQueryInfo: {
        clickType: '2',
        comCodeOrName: '',
        currentPage: 1,
        pageSize: 10
      },
      gongsiduanInfo: {
        firmcode: '',
        firmname: '',
        currentPage: 1,
        pageSize: 10
      },
      kehuduanInfo: {
        clientcode: '',
        clientname: '',
        currentPage: 1,
        pageSize: 10
      },
      yinhangduanInfo: {
        bankcode: '',
        bankname: '',
        currentPage: 1,
        pageSize: 10
      },
      nashuirenInfo: {
        ratepayercomcode: '',
        ratepayername: '',
        ratepayercode: '',
        ratepayeradd: '',
        ratepayerno: '',
        ratepayerphone: '',
        ratepayerbankname: '',
        ratepayerbankcode: '',
        currentPage: 1,
        pageSize: 10
      },
      importRes: '', // 导入结果
      importResVis: false,
      chargeType: '2',
      detailDialogData1: {}, // 对账单详情数据
      importInvoiceVis: false, // 开票信息导入dialog对应visable
      detailDialogVis: false, // 对账单详情dialog对应visable
      fileList: [],
      bankBillDetail: false,
      dialogsustomerOrg: false,
      isShowTable: false,
      comAlert: false,
      cusAlert: false,
      bankAlert: false,
      fenyetotalData: 0,
      totalRecords: 0,
      comDialog: false,
      comDialogCom: false,
      comDialogworker: false,
      comDialog1: false,
      comDialogCom1: false,
      comDialogworker1: false,
      comDialog2: false,
      comDialogCom2: false,
      comDialogworker2: false,
      comDialog3: false,
      comDialogCom3: false,
      comDialogworker3: false,
      comDialog4: false,
      comDialogCom4: false,
      comDialogworker4: false,
      comDialog5: false,
      comDialogCom5: false,
      comDialogworker5: false,
      comDialog6: false,
      comDialogCom6: false,
      comDialogworker6: false,
      comDialog7: false,
      comDialogCom7: false,
      comDialogworker7: false,
      tableData: [],
      tempTableData1: [],
      tempTableData2: [],
      tempTableData3: [],
      tempTableData4: [],
      tempTableData5: [],
      tempTableData6: [],
      tempTableData7: [],
      kaipInfo: {}, // 开票信息数据
      tableShowOrnot: false,
      kaipiaoTableData1: [],
      duizhangdanNo: '',
      kaipiaoInputData: { // 相关钱款数据
        type: '',
        spsl: '6',
        allhandCal1: 0,
        allhandCal2: 0,
        allhandCal3: 0,
        allhandCal4: 0,
        shuiCal1: 0,
        shuiCal2: 0,
        shuiCal3: 0,
        shuiCal4: 0,
        priceCal1: 0,
        priceCal2: 0,
        priceCal3: 0,
        priceCal4: 0,
        aftershuiCal1: 0,
        aftershuiCal2: 0,
        aftershuiCal3: 0,
        aftershuiCal4: 0,
        afterpriceCal1: 0,
        afterpriceCal2: 0,
        afterpriceCal3: 0,
        afterpriceCal4: 0
      },
      rules: {
        comCode: [
          { required: true, message: '请输入佰盈机构代码', trigger: 'change' }
        ]
        // batch: [
        //   { required: true, message: '请输入批次', trigger: 'change' }
        // ]
      },
      rules1: {
        firmCode: [
          { required: true, message: '请输入公司段代码', trigger: 'change' }
        ],
        firmName: [
          { required: true, message: '请输入公司段名称', trigger: 'change' }
        ],
        // clientCode: [
        //   { required: true, message: '请输入客户段代码', trigger: 'change' }
        // ],
        // clientName: [
        //   { required: true, message: '请输入客户段名称', trigger: 'change' }
        // ],
        // bankCode: [
        //   { required: true, message: '请输入银行段代码', trigger: 'change' }
        // ],
        // bankName: [
        //   { required: true, message: '请输入银行段名称', trigger: 'change' }
        // ],
        type: [
          { required: true, message: '请输入商品名称', trigger: 'blur' }
        ]
      }
    }
  },
  mounted () {
  },
  watch: {
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
    'queryInfo.companyCode' () {
      if (this.queryInfo.companyCode === '') {
        this.queryInfo.companyName = ''
      }
    },
    'queryInfo.companyName' () {
      if (this.queryInfo.companyName === '') {
        this.queryInfo.companyCode = ''
      }
    },
    'kaipInfo.comCode' () {
      if (this.kaipInfo.comCode === '') {
        this.kaipInfo.comName = ''
      }
    },
    'kaipInfo.comName' () {
      if (this.kaipInfo.comName === '') {
        this.kaipInfo.comCode = ''
      }
    },
    'kaipInfo.firmcode' () {
      if (this.kaipInfo.firmcode === '') {
        this.kaipInfo.firmname = ''
      }
    },
    'kaipInfo.firmname' () {
      if (this.kaipInfo.firmname === '') {
        this.kaipInfo.firmcode = ''
      }
    },
    // 'kaipInfo.clientcode' () {
    //   if (this.kaipInfo.clientcode === '') {
    //     this.kaipInfo.clientname = ''
    //   }
    // },
    // 'kaipInfo.clientname' () {
    //   if (this.kaipInfo.clientname === '') {
    //     this.kaipInfo.clientcode = ''
    //   }
    // },
    // 'kaipInfo.bankcode' () {
    //   if (this.kaipInfo.bankcode === '') {
    //     this.kaipInfo.bankname = ''
    //   }
    // },
    // 'kaipInfo.bankname' () {
    //   if (this.kaipInfo.bankname === '') {
    //     this.kaipInfo.bankcode = ''
    //   }
    // },
    'kaipInfo.ratepayername' () {
      if (this.kaipInfo.ratepayername === '') {
        this.kaipInfo.ratepayercomcode = ''
        this.kaipInfo.ratepayeradd = ''
        this.kaipInfo.ratepayercode = ''
        this.kaipInfo.ratepayerno = ''
        this.kaipInfo.ratepayerphone = ''
        this.kaipInfo.ratepayerbankname = ''
        this.kaipInfo.ratepayerbankcode = ''
      }
    },
    'kaipInfo.ratepayercomcode' () {
      if (this.kaipInfo.ratepayercomcode === '') {
        this.kaipInfo.ratepayername = ''
        this.kaipInfo.ratepayeradd = ''
        this.kaipInfo.ratepayercode = ''
        this.kaipInfo.ratepayerno = ''
        this.kaipInfo.ratepayerphone = ''
        this.kaipInfo.ratepayerbankname = ''
        this.kaipInfo.ratepayerbankcode = ''
      }
    }
  },
  methods: {
    ...mapActions([
      'commissionConfigdblqueryCom1', 'commissionConfigdblqueryCom2', 'contiListCheckDialogDataGet1', 'contiListCheckDialogDataGet3', 'lifeInsureBillFinanceNashuiPeopleQuery', 'lifeInsureBillFinanceFirmQuery', 'lifeInsureBillFinanceClientQuery', 'lifeInsureBillFinanceBankQuery'
    ]),
    submitForm1 () {
      let temp = parseFloat(this.kaipiaoInputData.allhandCal1) + parseFloat(this.kaipiaoInputData.allhandCal2) + parseFloat(this.kaipiaoInputData.allhandCal3) + parseFloat(this.kaipiaoInputData.allhandCal4)
      let temp1 = parseFloat(this.kaipiaoInputData.aftershuiCal1) + parseFloat(this.kaipiaoInputData.aftershuiCal2) + parseFloat(this.kaipiaoInputData.aftershuiCal3) + parseFloat(this.kaipiaoInputData.aftershuiCal4)
      let temp2 = parseFloat(this.kaipiaoInputData.afterpriceCal1) + parseFloat(this.kaipiaoInputData.afterpriceCal2) + parseFloat(this.kaipiaoInputData.afterpriceCal3) + parseFloat(this.kaipiaoInputData.afterpriceCal4)
      let temp3 = temp2 + temp1
      if (IsEmpty(temp)) {
        this.openToast('warning', '请输入开票金额')
        return false
      }
      // 发票类型和首/续保标记各不相同，调整后税款与调整后的价款之和必须是对账总手续费（含税）的1元之内
      if ((parseFloat(this.kaipiaoInputData.aftershuiCal1) + parseFloat(this.kaipiaoInputData.afterpriceCal1) - parseFloat(this.kaipiaoInputData.allhandCal1)) <= 1 && (parseFloat(this.kaipiaoInputData.allhandCal1) - parseFloat(this.kaipiaoInputData.aftershuiCal1) - parseFloat(this.kaipiaoInputData.afterpriceCal1)) <= 1) {
        if ((parseFloat(this.kaipiaoInputData.aftershuiCal2) + parseFloat(this.kaipiaoInputData.afterpriceCal2) - parseFloat(this.kaipiaoInputData.allhandCal2)) <= 1 && (parseFloat(this.kaipiaoInputData.allhandCal2) - parseFloat(this.kaipiaoInputData.aftershuiCal2) - parseFloat(this.kaipiaoInputData.afterpriceCal2)) <= 1) {
          if ((parseFloat(this.kaipiaoInputData.aftershuiCal3) + parseFloat(this.kaipiaoInputData.afterpriceCal3) - parseFloat(this.kaipiaoInputData.allhandCal3)) <= 1 && (parseFloat(this.kaipiaoInputData.allhandCal3) - parseFloat(this.kaipiaoInputData.aftershuiCal3) - parseFloat(this.kaipiaoInputData.afterpriceCal3)) <= 1) {
            if ((parseFloat(this.kaipiaoInputData.aftershuiCal4) + parseFloat(this.kaipiaoInputData.afterpriceCal4) - parseFloat(this.kaipiaoInputData.allhandCal4)) <= 1 && (parseFloat(this.kaipiaoInputData.allhandCal4) - parseFloat(this.kaipiaoInputData.aftershuiCal4) - parseFloat(this.kaipiaoInputData.afterpriceCal4)) <= 1) {
              if ((temp - parseFloat(this.detailDialogData.calHandMount)) <= 1 && (temp - parseFloat(this.detailDialogData.calHandMount)) >= -1) {
                if ((temp3 - parseFloat(this.detailDialogData.calHandMount)) >= -1 && (temp3 - parseFloat(this.detailDialogData.calHandMount)) <= 1) {
                  this.shenhepass()
                } else {
                  this.openToast('warning', '请校验调整后税款与调整后的价款之和是否是调整后对账总手续费（含税）的1元范围')
                  return false
                }
              } else {
                this.openToast('warning', '请校验调整后税款与调整后的价款之和是否是调整后对账总手续费（含税）的1元范围')
                return false
              }
            } else {
              this.openToast('warning', '请校验发票类型：专票，首/续保标记：续保调整后税款与调整后的价款之和是否是对账总手续费（含税）的1元范围')
              return false
            }
          } else {
            this.openToast('warning', '请校验发票类型：专票，首/续保标记：新保调整后税款与调整后的价款之和是否是对账总手续费（含税）的1元范围')
            return false
          }
        } else {
          this.openToast('warning', '请校验发票类型：普票，首/续保标记：续保调整后税款与调整后的价款之和是否是对账总手续费（含税）的1元范围')
          return false
        }
      } else {
        this.openToast('warning', '请校验发票类型：普票，首/续保标记：新保的调整后税款与调整后的价款之和是否是对账总手续费（含税）的1元范围')
        return false
      }
    },
    submitForm (formName, index) {
      if (!IsEmpty(this.queryInfo.startDate) && IsEmpty(this.queryInfo.endDate)) {
        this.openToast('warning', '请输入结束日期')
      } else if (IsEmpty(this.queryInfo.startDate) && !IsEmpty(this.queryInfo.endDate)) {
        this.openToast('warning', '请输入开始日期')
      } else {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            console.log('submit!')
            switch (index) {
              case 0:
                this.totalRecords = 0
                this.queryInfo.currentPage = 1
                this.queryData()
                break
              case 1:
                this.exportData()
                break
              default:
                break
            }
          } else {
            console.log('error submit!!')
            return false
          }
        })
      }
    },
    exportData () {
      window.open(`/tabycore/bankCharge/downloadAllFinanceBankChargePoundageRecon?companyCode=${this.queryInfo.companyCode}&companyName=${this.queryInfo.companyName}&comCode=${this.queryInfo.comCode}&comName=${this.queryInfo.comName}&verifyStatus=${this.queryInfo.verifyStatus}&startDate=${this.queryInfo.startDate}&endDate=${this.queryInfo.endDate}&status=${this.queryInfo.status}&chargeType=${this.queryInfo.chargeType}&batch=${this.queryInfo.batch}`)
    },
    queryData () {
      this.Loading()
      this.tableData = []
      api('/bankCharge/queryAllFinanceBankChargePoundageRecon', 'post', this.queryInfo).then((res) => {
        console.log(res)
        this.closeLoading()
        if (res.data.code !== '000000' && !IsEmpty(res.data.code)) {
          this.openToast('warning', res.data.msg)
        } else {
          this.tableData = res.data.content
          this.tableShowOrnot = true
          this.totalRecords = res.data.totalElements
        }
      })
    },
    back () {
      this.detailDialogVis = false
      this.kaipiaoTableData = []
      this.kaipiaoInputData = {
        type: '',
        spsl: '6',
        allhandCal1: 0,
        allhandCal2: 0,
        allhandCal3: 0,
        allhandCal4: 0,
        shuiCal1: 0,
        shuiCal2: 0,
        shuiCal3: 0,
        shuiCal4: 0,
        priceCal1: 0,
        priceCal2: 0,
        priceCal3: 0,
        priceCal4: 0,
        aftershuiCal1: 0,
        aftershuiCal2: 0,
        aftershuiCal3: 0,
        aftershuiCal4: 0,
        afterpriceCal1: 0,
        afterpriceCal2: 0,
        afterpriceCal3: 0,
        afterpriceCal4: 0
      }
      this.kaipInfo = []
    },
    detailClosing () {
      this.detailDialogVis = false
      this.queryData()
      this.initKaipiaoData()
    },
    initKaipiaoData () {
      this.kaipiaoTableData1 = []
      this.kaipiaoInputData = {
        type: '',
        spsl: '6',
        allhandCal1: 0,
        allhandCal2: 0,
        allhandCal3: 0,
        allhandCal4: 0,
        shuiCal1: 0,
        shuiCal2: 0,
        shuiCal3: 0,
        shuiCal4: 0,
        priceCal1: 0,
        priceCal2: 0,
        priceCal3: 0,
        priceCal4: 0,
        aftershuiCal1: 0,
        aftershuiCal2: 0,
        aftershuiCal3: 0,
        aftershuiCal4: 0,
        afterpriceCal1: 0,
        afterpriceCal2: 0,
        afterpriceCal3: 0,
        afterpriceCal4: 0
      }
      this.kaipInfo = []
      this.detailDialogData1 = {}
    },
    noEmptyCheck (index) {
      let temp = true
      if (IsEmpty(this.kaipiaoInputData.type) ||
          IsEmpty(this.kaipInfo.ratepayercomcode) ||
          IsEmpty(this.kaipInfo.ratepayername) ||
          IsEmpty(this.kaipInfo.ratepayercode) ||
          IsEmpty(this.kaipInfo.ratepayeradd) ||
          IsEmpty(this.kaipInfo.ratepayerno) ||
          IsEmpty(this.kaipInfo.ratepayerphone) ||
          IsEmpty(this.kaipInfo.ratepayerbankname) ||
          IsEmpty(this.kaipInfo.ratepayerbankcode) ||
          IsEmpty(this.kaipInfo.firmcode) ||
          IsEmpty(this.kaipInfo.firmname) ||
          // IsEmpty(this.kaipInfo.clientcode) ||
          // IsEmpty(this.kaipInfo.clientname) ||
          // IsEmpty(this.kaipInfo.bankcode) ||
          // IsEmpty(this.kaipInfo.bankname) ||
          IsEmpty(this.kaipInfo.comCode) ||
          IsEmpty(this.kaipInfo.comName)) {
        temp = false
      }
      if (temp) {
        switch (index) {
          case 1:
            this.submitForm1()
            break
          case 2:
            this.shenheNopass()
            break
          case 3:
            this.fuhepass()
            break
          case 4:
            this.fuheNopass()
            break
          default:
            break
        }
      } else {
        this.openToast('warning', '请输入相关必填项')
      }
    },
    getDuizhangdanDetail (data) { // 获取对账单详情
      this.Loading()
      console.log(data)
      this.duizhangdanNo = data
      let temp = {}
      temp['reconno'] = data
      if (this.chargeType === 1 || this.chargeType === '1' || IsEmpty(this.chargeType)) {
        api('/bankCharge/queryFinanceBankChargePoundageRecon', 'post', temp).then((res) => {
          console.log(res)
          this.closeLoading()
          if (res.data.code !== '000000' && !IsEmpty(res.data.code)) {
            this.openToast('warning', res.data.msg)
          } else {
            this.detailDialogData1 = res.data
            this.kaipiaoTableData1 = res.data.bankChargeInvoice
            this.kaipInfo = {
              comCode: this.detailDialogData.comCode,
              comName: this.detailDialogData.comName,
              firmcode: this.detailDialogData.firmcode,
              firmname: this.detailDialogData.firmname,
              // clientcode: this.detailDialogData.clientcode,
              // clientname: this.detailDialogData.clientname,
              // bankcode: this.detailDialogData.bankcode,
              // bankname: this.detailDialogData.bankname,
              ratepayercomcode: this.detailDialogData.ratepayercomcode,
              ratepayername: this.detailDialogData.ratepayername,
              ratepayercode: this.detailDialogData.ratepayercode,
              ratepayeradd: this.detailDialogData.ratepayeradd,
              ratepayerno: this.detailDialogData.ratepayerno,
              ratepayerphone: this.detailDialogData.ratepayerphone,
              ratepayerbankname: this.detailDialogData.ratepayerbankname,
              ratepayerbankcode: this.detailDialogData.ratepayerbankcode
            }
            this.detailDialogVis = true
          }
        })
      } else {
        api('/bankCharge/newqueryFinanceBankChargePoundageRecon', 'post', `reconno=${data}`).then((res) => {
          console.log(res)
          this.closeLoading()
          if (res.data.code !== '000000' && !IsEmpty(res.data.code)) {
            this.openToast('warning', res.data.msg)
          } else {
            this.detailDialogData1 = res.data
            this.kaipiaoTableData1 = res.data.bankChargeInvoice
            this.detailDialogVis = true
          }
        })
      }
    },
    comDialogClosing (index) {
      this.initshuangjiDialog()
      this.comDialog4 = false
      this.comDialog5 = false
      this.comDialog7 = false
      switch (index) {
        case 4:
          this.queryInfo.companyCode = ''
          this.queryInfo.companyName = ''
          break
        case 5:
          this.queryInfo.comCode = ''
          this.queryInfo.comName = ''
          break
        case 7:
          this.kaipInfo.comName = ''
          this.kaipInfo.comName = ''
          break
        default:
          break
      }
    },
    initshuangjiDialog () {
      this.companyQueryInfo = {
        type: '3',
        clickType: '2',
        insurerCode: '',
        insurerName: '',
        currentPage: 1,
        pageSize: 10
      }
      this.orgQueryInfo = {
        clickType: '2',
        comCodeOrName: '',
        currentPage: 1,
        pageSize: 10
      }
      this.nashuirenInfo = {
        ratepayercomcode: '',
        ratepayername: '',
        ratepayercode: '',
        ratepayeradd: '',
        ratepayerno: '',
        ratepayerphone: '',
        ratepayerbankname: '',
        ratepayerbankcode: '',
        currentPage: 1,
        pageSize: 10
      }
      this.gongsiduanInfo = {
        firmcode: '',
        firmname: '',
        currentPage: 1,
        pageSize: 10
      }
      this.kehuduanInfo = {
        clientcode: '',
        clientname: '',
        currentPage: 1,
        pageSize: 10
      }
      this.yinhangduanInfo = {
        bankcode: '',
        bankname: '',
        currentPage: 1,
        pageSize: 10
      }
    },
    dialogBackData2 (row) {
      this.initshuangjiDialog()
      this.comDialog6 = false
      this.kaipInfo.ratepayercomcode = row.ratepayercomcode
      this.kaipInfo.ratepayername = row.ratepayername
      this.kaipInfo.ratepayeradd = row.ratepayeradd
      this.kaipInfo.ratepayerno = row.ratepayerno
      this.kaipInfo.ratepayercode = row.ratepayercode
      this.kaipInfo.ratepayerphone = row.ratepayerphone
      this.kaipInfo.ratepayerbankname = row.ratepayerbankname
      this.kaipInfo.ratepayerbankcode = row.ratepayerbankcode
    },
    changeComdialogPage1 (data) {
      this.orgQueryInfo.currentPage = data
      this.openComDialog(4)
    },
    changeComdialogPage2 (data) {
      this.companyQueryInfo.currentPage = data
      this.openComDialog(5)
    },
    changeComdialogPage3 (data) {
      this.orgQueryInfo.currentPage = data
      this.openComDialog(7)
    },
    changeComdialogPageSize1 (data) {
      this.orgQueryInfo.currentPage = 1
      this.orgQueryInfo.pageSize = data
      this.openComDialog(4)
    },
    changeComdialogPageSize2 (data) {
      this.companyQueryInfo.currentPage = 1
      this.companyQueryInfo.pageSize = data
      this.openComDialog(5)
    },
    changeComdialogPageSize3 (data) {
      this.orgQueryInfo.currentPage = 1
      this.orgQueryInfo.pageSize = data
      this.openComDialog(7)
    },
    handleCurrentChange (val) {
      this.queryInfo.currentPage = val
      this.queryData(this.queryInfo)
    },
    handleSizeChange (val) {
      this.queryInfo.pageSize = val
      this.queryInfo.currentPage = 1
      this.queryData(this.queryInfo)
    },
    calHandCal (handCalIndex) { // 自动计算调整后税款和调整后价款，税率为6%
      switch (handCalIndex) {
        case 1:
          this.kaipiaoInputData.priceCal1 = (Math.round(this.kaipiaoInputData.allhandCal1 * 100) / 106).toFixed(2)
          this.kaipiaoInputData.shuiCal1 = (this.kaipiaoInputData.allhandCal1 - this.kaipiaoInputData.priceCal1).toFixed(2)
          break
        case 2:
          this.kaipiaoInputData.priceCal2 = (Math.round(this.kaipiaoInputData.allhandCal2 * 100) / 106).toFixed(2)
          this.kaipiaoInputData.shuiCal2 = (this.kaipiaoInputData.allhandCal2 - this.kaipiaoInputData.priceCal2).toFixed(2)
          break
        case 3:
          this.kaipiaoInputData.priceCal3 = (Math.round(this.kaipiaoInputData.allhandCal3 * 100) / 106).toFixed(2)
          this.kaipiaoInputData.shuiCal3 = (this.kaipiaoInputData.allhandCal3 - this.kaipiaoInputData.priceCal3).toFixed(2)
          break
        case 4:
          this.kaipiaoInputData.priceCal4 = (Math.round(this.kaipiaoInputData.allhandCal4 * 100) / 106).toFixed(2)
          this.kaipiaoInputData.shuiCal4 = (this.kaipiaoInputData.allhandCal4 - this.kaipiaoInputData.priceCal4).toFixed(2)
          break
      }
    },
    openComDialog (index) {
      switch (index) {
        case 4:
          this.orgQueryInfo.clickType = '2'
          if (!IsEmpty(this.queryInfo.comCode)) {
            this.orgQueryInfo.comCodeOrName = this.queryInfo.comCode
          } else if (!IsEmpty(this.queryInfo.comName)) {
            this.orgQueryInfo.comCodeOrName = this.queryInfo.comName
          } else {
            this.orgQueryInfo.comCodeOrName = ''
          }
          this.contiListCheckDialogDataGet1(this.orgQueryInfo).then(
            (res) => { // 佰盈机构双击
              if (res.data.code !== '000000' && !IsEmpty(res.data.code)) {
                this.openToast('warning', res.data.msg)
              } else {
                this.tempTableData4 = res.data.data.data
                this.fenyetotalData = res.data.data.totalRecords
                this.comDialog4 = true
                this.comDialogCom4 = true
                this.comDialogworker4 = false
                for (let i = 0; i < this.tempTableData4.length; i++) {
                  this.tempTableData4[i]['renderData'] = `${this.tempTableData4[i].comCode}-${this.tempTableData4[i].comCName}`
                }
              }
            }
          )
          break
        case 5:
          this.companyQueryInfo.insurerCode = this.queryInfo.companyCode
          this.companyQueryInfo.insurerName = this.queryInfo.companyName
          this.companyQueryInfo.clickType = '2'
          this.commissionConfigdblqueryCom1(this.companyQueryInfo).then(
            (res) => { // 保险公司双击
              if (res.data.code !== '000000' && !IsEmpty(res.data.code)) {
                this.openToast('warning', res.data.msg)
              } else {
                this.tempTableData5 = res.data.data.data
                this.fenyetotalData = res.data.data.totalRecords
                this.comDialog5 = true
                this.comDialogCom5 = true
                this.comDialogworker5 = false
                for (let i = 0; i < this.tempTableData5.length; i++) {
                  this.tempTableData5[i]['renderData'] = `${this.tempTableData5[i].insurercode}-${this.tempTableData5[i].insurername}`
                }
              }
            }
          )
          break
        case 6:
// ratepayercomcode: this.detailDialogData.ratepayercomcode,
//             ratepayername: this.detailDialogData.ratepayername,
//             ratepayercode: this.detailDialogData.ratepayercode,
//             ratepayeradd: this.detailDialogData.ratepayeradd,
//             ratepayerno: this.detailDialogData.ratepayerno,
//             ratepayerphone: this.detailDialogData.ratepayerphone,
//             ratepayerbankname: this.detailDialogData.ratepayerbankname,
//             ratepayerbankcode: this.detailDialogData.ratepayerbankcode
          this.nashuirenInfo.ratepayercomcode = this.kaipInfo.ratepayercomcode
          this.nashuirenInfo.ratepayername = this.kaipInfo.ratepayername
          this.nashuirenInfo.ratepayercode = this.kaipInfo.ratepayercode
          this.nashuirenInfo.ratepayeradd = this.kaipInfo.ratepayeradd
          this.nashuirenInfo.ratepayerno = this.kaipInfo.ratepayerno
          this.nashuirenInfo.ratepayerphone = this.kaipInfo.ratepayerphone
          this.nashuirenInfo.ratepayerbankname = this.kaipInfo.ratepayerbankname
          this.nashuirenInfo.ratepayerbankcode = this.kaipInfo.ratepayerbankcode
          this.lifeInsureBillFinanceNashuiPeopleQuery(this.nashuirenInfo).then(
            (res) => { // 详情中纳税人双击
              console.log(res)
              if (res.data.code !== '000000' && !IsEmpty(res.data.code)) {
                this.openToast('warning', res.data.msg)
              } else {
                this.tempTableData6 = res.data.content
                this.fenyetotalData = res.data.totalElements
                this.comDialog6 = true
                this.comDialogCom6 = true
                this.comDialogworker6 = false
              }
            }
          )
          break
        case 7:
          this.orgQueryInfo.clickType = '2'
          if (!IsEmpty(this.kaipInfo.comCode)) {
            this.orgQueryInfo.comCodeOrName = this.kaipInfo.comCode
          } else if (!IsEmpty(this.kaipInfo.comName)) {
            this.orgQueryInfo.comCodeOrName = this.kaipInfo.comName
          } else {
            this.orgQueryInfo.comCodeOrName = ''
          }
          this.contiListCheckDialogDataGet3(this.orgQueryInfo).then(
            (res) => { // 详情中开票机构双击
              if (res.data.code !== '000000' && !IsEmpty(res.data.code)) {
                this.openToast('warning', res.data.msg)
              } else {
                this.tempTableData7 = res.data.data.data
                this.fenyetotalData = res.data.data.totalRecords
                this.comDialog7 = true
                this.comDialogCom7 = true
                this.comDialogworker7 = false
                for (let i = 0; i < this.tempTableData7.length; i++) {
                  this.tempTableData7[i]['renderData'] = `${this.tempTableData7[i].comCode}-${this.tempTableData7[i].comCName}`
                }
              }
            }
          )
          break
        case 1:
      //     gongsiduanInfo: {
      //   firmcode: '',
      //   firmname: '',
      //   currentPage: 1,
      //   pageSize: 10
      // },
          this.gongsiduanInfo.firmcode = this.kaipInfo.firmcode
          this.gongsiduanInfo.firmname = this.kaipInfo.firmname
          this.lifeInsureBillFinanceFirmQuery(this.gongsiduanInfo).then(
            (res) => { // 详情中公司段双击
              if (res.data.code !== '000000' && !IsEmpty(res.data.code)) {
                this.openToast('warning', res.data.msg)
              } else {
                this.tempTableData1 = res.data.content
                this.fenyetotalData = res.data.totalElements
                this.comDialog1 = true
                this.comDialogCom1 = true
                this.comDialogworker1 = false
              }
            }
          )
          break
        case 2:
      //   kehuduanInfo: {
      //   clientcode: '',
      //   clientname: '',
      //   currentPage: 1,
      //   pageSize: 10
      // },
          this.kehuduanInfo.clientcode = this.kaipInfo.clientcode
          this.kehuduanInfo.clientname = this.kaipInfo.clientname
          this.lifeInsureBillFinanceClientQuery(this.kehuduanInfo).then(
            (res) => { // 详情中客户段双击
              if (res.data.code !== '000000' && !IsEmpty(res.data.code)) {
                this.openToast('warning', res.data.msg)
              } else {
                this.tempTableData2 = res.data.content
                this.fenyetotalData = res.data.totalElements
                this.comDialog2 = true
                this.comDialogCom2 = true
                this.comDialogworker2 = false
              }
            }
          )
          break
        case 3:
      // yinhangduanInfo: {
      //   bankcode: '',
      //   bankname: '',
      //   currentPage: '',
      //   pageSize: ''
      // },
          this.yinhangduanInfo.bankcode = this.kaipInfo.bankcode
          this.yinhangduanInfo.bankname = this.kaipInfo.bankname
          this.lifeInsureBillFinanceBankQuery(this.yinhangduanInfo).then(
            (res) => { // 详情中银行段双击
              if (res.data.code !== '000000' && !IsEmpty(res.data.code)) {
                this.openToast('warning', res.data.msg)
              } else {
                this.tempTableData3 = res.data.content
                this.fenyetotalData = res.data.totalElements
                this.comDialog3 = true
                this.comDialogCom3 = true
                this.comDialogworker3 = false
              }
            }
          )
          break
      }
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
    opensingleComDialog (index) {
      if (!(this.comDialog4 || this.comDialog5)) {
        switch (index) {
          case 0:
            this.orgQueryInfo.clickType = '1'
            if (!IsEmpty(this.queryInfo.comCode)) {
              this.orgQueryInfo.comCodeOrName = this.queryInfo.comCode
            } else if (!IsEmpty(this.queryInfo.comName)) {
              this.orgQueryInfo.comCodeOrName = this.queryInfo.comName
            } else {
              this.orgQueryInfo.comCodeOrName = ''
            }
            this.contiListCheckDialogDataGet1(this.orgQueryInfo).then(
            (res) => {
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
          case 1:
            this.companyQueryInfo.clickType = '2'
            this.companyQueryInfo.insurerCode = this.queryInfo.companyCode
            this.companyQueryInfo.insurerName = this.queryInfo.companyName
            this.commissionConfigdblqueryCom1(this.companyQueryInfo).then(
            (res) => {
              if (res.data.code !== '000000' && !IsEmpty(res.data.code)) {
                this.openToast('warning', res.data.msg)
              } else {
                if (res.data.data.data.length === 1) {
                  this.queryInfo.companyCode = res.data.data.data[0].insurercode
                  this.queryInfo.companyName = res.data.data.data[0].insurername
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
    newshenhepass () {
      if (this.detailDialogData.status === '财务复核通过') {
        this.openToast('warning', '该对账单已经复核通过，不允许审核通过！')
      } else if (this.detailDialogData.status === '财务审核通过') {
        this.openToast('warning', '该条记录已审核通过，不允许审核通过！')
      } else {
        this.Loading()
        this.detailDialogData1['reconno'] = this.duizhangdanNo
        api('/bankCharge/newbankChargePoundageReconUpdateRevamp', 'post', this.detailDialogData1).then((res) => {
          this.closeLoading()
          if (res.data === '操作成功!') {
            this.openToast('success', res.data)
            this.initKaipiaoData()
            this.getDuizhangdanDetail(this.duizhangdanNo)
            this.handleCurrentChange(1)
          } else {
            this.openToast('warning', res.data)
          }
        })
      }
    },
    shenhepass () { // 审核通过
      let temp = false
      if (IsEmpty(this.kaipiaoInputData.type)) {
        temp = true
      }
      if (!temp) {
        if (parseFloat(this.kaipiaoInputData.allhandCal1) - parseFloat(this.kaipiaoInputData.afterpriceCal1) - parseFloat(this.kaipiaoInputData.aftershuiCal1) <= 1 && parseFloat(this.kaipiaoInputData.allhandCal1) - parseFloat(this.kaipiaoInputData.afterpriceCal1) - parseFloat(this.kaipiaoInputData.aftershuiCal1) >= -1) {
          if (parseFloat(this.kaipiaoInputData.allhandCal2) - parseFloat(this.kaipiaoInputData.afterpriceCal2) - parseFloat(this.kaipiaoInputData.aftershuiCal2) <= 1 && parseFloat(this.kaipiaoInputData.allhandCal2) - parseFloat(this.kaipiaoInputData.afterpriceCal2) - parseFloat(this.kaipiaoInputData.aftershuiCal2) >= -1) {
            if (parseFloat(this.kaipiaoInputData.allhandCal3) - parseFloat(this.kaipiaoInputData.afterpriceCal3) - parseFloat(this.kaipiaoInputData.aftershuiCal3) <= 1 && parseFloat(this.kaipiaoInputData.allhandCal3) - parseFloat(this.kaipiaoInputData.afterpriceCal3) - parseFloat(this.kaipiaoInputData.aftershuiCal3) >= -1) {
              if (parseFloat(this.kaipiaoInputData.allhandCal4) - parseFloat(this.kaipiaoInputData.afterpriceCal4) - parseFloat(this.kaipiaoInputData.aftershuiCal4) <= 1 && parseFloat(this.kaipiaoInputData.allhandCal4) - parseFloat(this.kaipiaoInputData.afterpriceCal4) - parseFloat(this.kaipiaoInputData.aftershuiCal4) >= -1) {
                let tempJson = {}
                tempJson['batchno'] = this.duizhangdanNo
                tempJson['ratepayercomcode'] = this.kaipInfo.ratepayercomcode
                tempJson['ratepayername'] = this.kaipInfo.ratepayername
                tempJson['ratepayercode'] = this.kaipInfo.ratepayercode
                tempJson['ratepayeradd'] = this.kaipInfo.ratepayeradd
                tempJson['ratepayerno'] = this.kaipInfo.ratepayerno
                tempJson['ratepayerphone'] = this.kaipInfo.ratepayerphone
                tempJson['ratepayerbankname'] = this.kaipInfo.ratepayerbankname
                tempJson['ratepayerbankcode'] = this.kaipInfo.ratepayerbankcode
                tempJson['type'] = this.kaipiaoInputData.type
                tempJson['companycode'] = this.detailDialogData.companyCode
                tempJson['companyname'] = this.detailDialogData.companyName
                tempJson['companycomcode'] = this.detailDialogData.companyComCode
                tempJson['companycomname'] = this.detailDialogData.companyComName
                tempJson['comcomcode'] = this.kaipInfo.comCode
                tempJson['comcomname'] = this.kaipInfo.comName
                tempJson['firmcode'] = this.kaipInfo.firmcode
                tempJson['firmname'] = this.kaipInfo.firmname
                // tempJson['clientcode'] = this.kaipInfo.clientcode
                // tempJson['clientname'] = this.kaipInfo.clientname
                // tempJson['bankcode'] = this.kaipInfo.bankcode
                // tempJson['bankname'] = this.kaipInfo.bankname
                tempJson['sjhj1'] = this.kaipiaoInputData.allhandCal1
                tempJson['jkwctz1'] = this.kaipiaoInputData.afterpriceCal1
                tempJson['skwctz1'] = this.kaipiaoInputData.aftershuiCal1
                tempJson['sjhj2'] = this.kaipiaoInputData.allhandCal2
                tempJson['jkwctz2'] = this.kaipiaoInputData.afterpriceCal2
                tempJson['skwctz2'] = this.kaipiaoInputData.aftershuiCal2
                tempJson['sjhj3'] = this.kaipiaoInputData.allhandCal3
                tempJson['jkwctz3'] = this.kaipiaoInputData.afterpriceCal3
                tempJson['skwctz3'] = this.kaipiaoInputData.aftershuiCal3
                tempJson['sjhj4'] = this.kaipiaoInputData.allhandCal4
                tempJson['jkwctz4'] = this.kaipiaoInputData.afterpriceCal4
                tempJson['skwctz4'] = this.kaipiaoInputData.aftershuiCal4
                if (this.detailDialogData.status === '财务复核通过') {
                  this.openToast('warning', '该对账单已经复核通过，不允许审核通过！')
                } else if (this.detailDialogData.status === '财务审核通过') {
                  this.openToast('warning', '该条记录已审核通过，不允许审核通过！')
                } else {
                  // 发票类型和首/续保标记各不相同，调整后税款与调整后的价款之和必须是对账总手续费（含税）的1元之内
                  if (Math.abs(parseFloat(this.kaipiaoInputData.aftershuiCal4)) <= Math.abs(parseFloat(this.kaipiaoInputData.afterpriceCal4))) {
                    if (Math.abs(parseFloat(this.kaipiaoInputData.aftershuiCal3)) <= Math.abs(parseFloat(this.kaipiaoInputData.afterpriceCal3))) {
                      if (Math.abs(parseFloat(this.kaipiaoInputData.aftershuiCal2)) <= Math.abs(parseFloat(this.kaipiaoInputData.afterpriceCal2))) {
                        if (Math.abs(parseFloat(this.kaipiaoInputData.aftershuiCal1)) <= Math.abs(parseFloat(this.kaipiaoInputData.afterpriceCal1))) {
                          this.Loading()
                          api('/bankCharge/bankChargePoundageReconUpdateRevamp', 'post', tempJson).then((res) => {
                            this.closeLoading()
                            if (res.data === '操作成功!') {
                              this.openToast('success', res.data)
                              this.initKaipiaoData()
                              this.getDuizhangdanDetail(this.duizhangdanNo)
                              this.handleCurrentChange(1)
                            } else {
                              this.openToast('warning', res.data)
                            }
                          })
                        } else {
                          this.openToast('warning', '发票类型：普票，首/续保标记：新保的税款不能大于价款')
                        }
                      } else {
                        this.openToast('warning', '发票类型：普票，首/续保标记：续保的税款不能大于价款')
                      }
                    } else {
                      this.openToast('warning', '发票类型：专票，首/续保标记：新保的税款不能大于价款')
                    }
                  } else {
                    this.openToast('warning', '发票类型：专票，首/续保标记：续保的税款不能大于价款')
                  }
                }
              } else {
                this.openToast('warning', '请校验发票类型：专票，首/续保标记：续保的调整后税款与调整后的价款之和是否是调整后对账总手续费（含税）的1元范围')
                return false
              }
            } else {
              this.openToast('warning', '请校验发票类型：专票，首/续保标记：新保的调整后税款与调整后的价款之和是否是调整后对账总手续费（含税）的1元范围')
              return false
            }
          } else {
            this.openToast('warning', '请校验发票类型：普票，首/续保标记：续保的调整后税款与调整后的价款之和是否是调整后对账总手续费（含税）的1元范围')
            return false
          }
        } else {
          this.openToast('warning', '请校验发票类型：普票，首/续保标记：新保的调整后税款与调整后的价款之和是否是调整后对账总手续费（含税）的1元范围')
          return false
        }
      } else {
        this.openToast('warning', '请输入相关必填项')
      }
    },
    fuhepass () { // 复核通过
      if (this.detailDialogData.status === '财务复核通过') {
        this.openToast('warning', '该对账单已经复核通过，不允许复核通过！')
      } else if (this.detailDialogData.status === '财务未审核') {
        this.openToast('warning', '该条记录财务未审核不能进行复核')
      } else {
        this.Loading()
        let temp = {}
        temp['reconno'] = this.duizhangdanNo
        if (this.chargeType === 1 || this.chargeType === '1' || IsEmpty(this.chargeType)) {
          api('/bankCharge/bankChargePoundageReconUpdate', 'post', temp).then((res) => {
            this.closeLoading()
            console.log(res)
            if (res.data === '操作成功!') {
              this.openToast('success', res.data)
              this.initKaipiaoData()
              this.handleCurrentChange(1)
              this.getDuizhangdanDetail(this.duizhangdanNo)
            } else {
              this.openToast('warning', res.data)
            }
          })
        } else {
          api('/bankCharge/newbankChargePoundageReconUpdate', 'post', temp).then((res) => {
            this.closeLoading()
            console.log(res)
            if (res.data === '操作成功!') {
              this.openToast('success', res.data)
              this.initKaipiaoData()
              this.handleCurrentChange(1)
              this.getDuizhangdanDetail(this.duizhangdanNo)
            } else {
              this.openToast('warning', res.data)
            }
          })
        }
      }
    },
    shenheNopass () { // 审核不通过
      if (this.detailDialogData.status === '财务复核通过') {
        this.openToast('warning', '该对账单已经复核通过，不允许审核不通过！')
      } else if (this.detailDialogData.status === '财务审核通过') {
        this.openToast('warning', '该对账单已经审核通过，不允许审核不通过！')
      } else {
        this.Loading()
        let temp = {}
        temp['reconno'] = this.duizhangdanNo
        if (this.chargeType === 1 || this.chargeType === '1' || IsEmpty(this.chargeType)) {
          api('/bankCharge/bankChargePoundageReconDelectRevamp', 'post', temp).then((res) => {
            this.closeLoading()
            if (res.data === '操作成功!') {
              this.openToast('success', res.data)
              this.initKaipiaoData()
              this.handleCurrentChange(1)
              this.getDuizhangdanDetail(this.duizhangdanNo)
            } else {
              this.openToast('warning', res.data)
            }
          })
        } else {
          api('/bankCharge/newbankChargePoundageReconDelectRevamp', 'post', temp).then((res) => {
            this.closeLoading()
            if (res.data === '操作成功!') {
              this.openToast('success', res.data)
              this.initKaipiaoData()
              this.handleCurrentChange(1)
              this.getDuizhangdanDetail(this.duizhangdanNo)
            } else {
              this.openToast('warning', res.data)
            }
          })
        }
      }
    },
    fuheNopass () { // 复核不通过
      if (this.detailDialogData.status === '财务复核通过') {
        this.openToast('warning', '该对账单已经复核通过，不允许复核不通过！')
      } else if (this.detailDialogData.status === '财务未审核') {
        this.openToast('warning', '该条记录财务未审核不能进行复核')
      } else {
        this.Loading()
        let temp = {}
        temp['reconno'] = this.duizhangdanNo
        if (this.chargeType === 1 || this.chargeType === '1' || IsEmpty(this.chargeType)) {
          api('/bankCharge/bankChargePoundageReconDelect', 'post', temp).then((res) => {
            console.log(res)
            this.closeLoading()
            if (res.data === '操作成功!') {
              this.openToast('success', res.data)
              this.initKaipiaoData()
              this.handleCurrentChange(1)
              this.getDuizhangdanDetail(this.duizhangdanNo)
            } else {
              this.openToast('warning', res.data)
            }
          })
        } else {
          api('/bankCharge/newbankChargePoundageReconDelect', 'post', temp).then((res) => {
            console.log(res)
            this.closeLoading()
            if (res.data === '操作成功!') {
              this.openToast('success', res.data)
              this.initKaipiaoData()
              this.handleCurrentChange(1)
              this.getDuizhangdanDetail(this.duizhangdanNo)
            } else {
              this.openToast('warning', res.data)
            }
          })
        }
      }
    },
    kaipiaoBasicInfoExport () {
      // 开票基本信息导出
      window.open(`/tabycore/Charge/downloadInvoice?reconno=${this.duizhangdanNo}`)
    },
    kaipiaoOriginInfoExport () {
      // 原始开票信息导出
      window.open(`/tabycore/bankCharge/downloadBankChargeImportRecord?reconno=${this.duizhangdanNo}`)
    },
    checkKaipiaoBasicInfo () {
      // 开票信息导入
      if (this.detailDialogData1.status === '财务审核通过') {
        this.openToast('warning', '该对账单目前处于财务审核通过状态，不可导入开票信息')
      } else if (this.detailDialogData1.status === '财务复核通过') {
        this.openToast('warning', '该对账单目前处于财务复核通过状态，不可导入开票信息')
      } else {
        this.importInvoiceVis = true
        this.importRes = ''
      }
    },
    handleExceed (files, fileList) {
      this.$message.warning(`当前限制选择 1 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length} 个文件`)
    },
    handleEXLSuccess (response) {
      // 开票信息导入成功后回调函数
      console.log(response)
      this.closeLoading()
      this.$refs.importRef.clearFiles()
      if (response === '解析成功') {
        this.openToast('success', '导入成功', 0)
      } else {
        response = response.split(';')
        response = response.join('\n')
        this.importRes = response
        this.importResVis = true
        this.importInvoiceVis = false
      }
    },
    kaipiaoInfoExport () {
      // 开票信息导出
      window.open(`/tabycore/bankCharge/downloadBankChargeInvoice?reconno=${this.duizhangdanNo}`)
    },
    errorInfoExport () {
      // 错误信息导出
      window.open(`/tabycore/bankCharge/inportInvoiceError?reconno=${this.duizhangdanNo}`)
    },
    getDetailExamine (data) { // 点击对账单号
      if (data.verifyStatus === '审核通过') {
        this.chargeType = data.chargeType
        this.getDuizhangdanDetail(data.batchNo)
      } else {
        this.openToast('warning', '该对账单未提交财务审核')
      }
    },
    childClose1 () {
      this.comDialog1 = false
      this.kaipInfo.firmcode = ''
      this.kaipInfo.firmname = ''
      this.initshuangjiDialog()
    },
    childClose2 () {
      this.comDialog2 = false
      this.kaipInfo.clientcode = ''
      this.kaipInfo.clientname = ''
      this.initshuangjiDialog()
    },
    childClose3 () {
      this.comDialog3 = false
      this.kaipInfo.bankcode = ''
      this.kaipInfo.bankname = ''
      this.initshuangjiDialog()
    },
    childClose4 () {
      this.comDialog6 = false
      this.kaipInfo.ratepayercomcode = ''
      this.kaipInfo.ratepayername = ''
      this.kaipInfo.ratepayercode = ''
      this.kaipInfo.ratepayeradd = ''
      this.kaipInfo.ratepayerno = ''
      this.kaipInfo.ratepayerphone = ''
      this.kaipInfo.ratepayerbankname = ''
      this.kaipInfo.ratepayerbankcode = ''
      this.initshuangjiDialog()
    },
    changeData1 (row) {
      this.comDialog1 = false
      this.kaipInfo.firmcode = row.firmcode
      this.kaipInfo.firmname = row.firmname
    },
    changeData2 (row) {
      this.comDialog2 = false
      this.kaipInfo.clientcode = row.clientcode
      this.kaipInfo.clientname = row.clientname
    },
    changeData3 (row) {
      this.comDialog3 = false
      this.kaipInfo.bankcode = row.bankcode
      this.kaipInfo.bankname = row.bankname
    },
    handleSizeChange1 (val) {
      this.gongsiduanInfo.pageSize = val
      this.gongsiduanInfo.currentPage = 1
      this.openComDialog(1)
    },
    handleSizeChange2 (val) {
      this.kehuduanInfo.pageSize = val
      this.kehuduanInfo.currentPage = 1
      this.openComDialog(2)
    },
    handleSizeChange3 (val) {
      this.yinhangduanInfo.pageSize = val
      this.yinhangduanInfo.currentPage = 1
      this.openComDialog(3)
    },
    handleSizeChange4 (val) {
      this.nashuirenInfo.pageSize = val
      this.nashuirenInfo.currentPage = 1
      this.openComDialog(6)
    },
    handleCurrentChange1 (val) {
      this.gongsiduanInfo.currentPage = val
      this.openComDialog(1)
    },
    handleCurrentChange2 (val) {
      this.kehuduanInfo.currentPage = val
      this.openComDialog(2)
    },
    handleCurrentChange3 (val) {
      this.yinhangduanInfo.currentPage = val
      this.openComDialog(3)
    },
    handleCurrentChange4 (val) {
      this.nashuirenInfo.currentPage = val
      this.openComDialog(6)
    },
    handleCurrentChangeBank (val) {  // 当前页
      console.log(`当前前页: ${val}`)
      this.cusInfo.currentPage = val
      this.queryBank_1(this.cusInfo)
    },
    dialogBackData (data) {
      this.initshuangjiDialog()
      this.comDialog4 = false
      let temp = []
      temp = data.split('-')
      this.queryInfo.comCode = temp[0]
      this.queryInfo.comName = temp[1]
    },
    dialogBackData1 (data) {
      this.initshuangjiDialog()
      this.comDialog5 = false
      let temp = []
      temp = data.split('-')
      this.queryInfo.companyCode = temp[0]
      this.queryInfo.companyName = temp[1]
    },
    dialogBackData3 (row) {
      this.initshuangjiDialog()
      this.comDialog7 = false
      let temp = []
      temp = row.split('-')
      this.kaipInfo.comCode = temp[0]
      this.kaipInfo.comName = temp[1]
    },
    openToast (type, mesg, time = 0) {
      this.$message({
        showClose: true,
        message: mesg,
        type: type,
        duration: time
      })
    }
  },
  components: {
    [NoticeBar.name]: NoticeBar,
    [LineTittle.name]: LineTittle,
    [LabelText.name]: LabelText,
    ComDialog
  },
  computed: {
    detailDialogData () {
      let temp = this.detailDialogData1
      if (!IsEmpty(temp)) {
        switch (temp.status) {
          case '1':
            temp.status = '财务未审核'
            break
          case '2':
            temp.status = '财务复核通过'
            break
          case '3':
            temp.status = '财务审核通过'
            break
          default:
            break
        }
        switch (temp.ratepayercode) {
          case '1':
            temp.ratepayercode = '增值税一般纳税人'
            break
          case '2':
            temp.ratepayercode = '增值税小规模纳税人'
            break
          default:
            break
        }
        switch (temp.type) {
          case '0':
            temp.type = '手续费'
            break
          case '1':
            temp.type = '服务费'
            break
          case '2':
            temp.type = '其他经纪代理服务'
            break
          case '3':
            temp.type = '保险代理手续费'
            break
          default:
            break
        }
        // 1-待审核；2-审核通过；9-不通过
        switch (temp.verifyStatus) {
          case '1':
            temp.verifyStatus = '待审核'
            break
          case '2':
            temp.verifyStatus = '审核通过'
            break
          case '9':
            temp.verifyStatus = '不通过'
            break
          default:
            break
        }
        return temp
      } else {
        return {}
      }
    },
    kaipiaoTableData () {
      let temp = this.kaipiaoTableData1
      if (!IsEmpty(temp)) {
        for (let i = 0; i < temp.length; i++) {
          switch (temp[i].type) {
            case '1':
              temp[i].type = '手续费'
              break
            case '2':
              temp[i].type = '服务费'
              break
            case '3':
              temp[i].type = '其他经纪代理服务'
              break
            case '4':
              temp[i].type = '保险代理手续费'
              break
            default:
              break
          }
          switch (temp[i].status) {
            case '1':
              temp[i].status = '未开票'
              break
            case '2':
              temp[i].status = '开票'
              break
            default:
              break
          }
          switch (temp[i].note) {
            case '0':
              temp[i].note = '专票'
              break
            case '1':
              temp[i].note = '普票'
              break
            default:
              break
          }
          switch (temp[i].policyyear) {
            case '1':
              temp[i].policyyear = '首年'
              break
            case '2':
              temp[i].policyyear = '续年'
              break
            default:
              break
          }
          switch (temp[i].status) {
            case '0':
              temp[i].status = '未开票'
              break
            case '1':
              temp[i].status = '开票'
              break
            default:
              break
          }
          switch (temp[i].ratepayercode) {
            case '0':
              temp[i].ratepayercode = '增值税一般纳税人'
              break
            case '1':
              temp[i].ratepayercode = '增值税小规模纳税人'
              break
            default:
              break
          }
          switch (temp[i].mainflag) {
            case '0':
              temp[i].mainflag = '主险'
              break
            case '1':
              temp[i].mainflag = '附加险'
              break
            default:
              break
          }
        }
        return temp
      } else {
        return []
      }
    }
  },
  created () {
  }
}
</script>

<style lang="scss" scoped type="text/css">
#orgadd {padding-left: 30px;padding-right: 30px;}
.btn-container{text-align: center;margin-top: 60px;margin-bottom: 30px;}
.ri-line{margin-top: 10px;margin-bottom: 10px;}
.datestyle{color: #717171;font-size: 0.875rem;display: inline-block;width: 120px;}
.datestyle1{color: #717171;font-size: 0.875rem;display: inline-block;text-align: center;width: 60px;}
.el-pagination{float: right;padding-right: 20px;}
.center{text-align: center}
.importResStyle{
  text-align: center;
  color: red;
  white-space: pre-wrap;
}
.orgInfoTable{text-align: center}
.orgInfoTable tr{height: 40px}
.orgInfoTable td{ width: 15%;height: 2rem}
.head{background: #d3e7fa;color: #2585e6;height: 40px}
.testInput{
  padding-right: 18px
}
.tableButton {
  cursor: pointer;
  color: #66B1FF;
}
#ticketDetail .el-input {
  margin-top: 7px;
}
</style>
