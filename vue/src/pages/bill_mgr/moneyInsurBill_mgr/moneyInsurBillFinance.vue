<template>
  <div id="orgadd" >
      <ui-notice-bar slot="breadcast" >
        <el-breadcrumb slot="location" separator=">">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>对账单管理</el-breadcrumb-item>
            <el-breadcrumb-item>财险对账单管理</el-breadcrumb-item>
            <el-breadcrumb-item>财务部审核</el-breadcrumb-item>
          </el-breadcrumb>
      </ui-notice-bar>
      <div class="ri-content" slot="content" >
        <el-form ref="moneycaiwuExamine" :rules="rules" :model="queryInfo">
          <el-row class="ri-line">
            <el-col :span="12">
              <el-form-item prop='comCode'>
                <ui-label-text :required="true" labelWidth="180" label="佰盈机构代码：" >
                  <el-input v-model="queryInfo.comCode" @change="baiyingChange(1)" slot="text" @dblclick.native="openComDialog(0)" placeholder="双击可选择" @blur='opensingleComDialog(0)' clearable></el-input>
                </ui-label-text>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item prop='comName'>
                <ui-label-text labelWidth="180" label="佰盈机构名称:" >
                  <el-input v-model="queryInfo.comName" @change="baiyingChange(2)" slot="text" @dblclick.native="openComDialog(0)" placeholder="双击可选择" @blur='opensingleComDialog(0)' clearable></el-input>
                </ui-label-text>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row class="ri-line">
            <el-col :span="12">
              <el-form-item prop='companyCode'>
                <ui-label-text labelWidth="180" label="保险公司代码：" >
                  <el-input v-model="queryInfo.companyCode" @change="baoxianChange(1)" slot="text" @dblclick.native="openComDialog(1)" placeholder="双击可选择" @blur='opensingleComDialog(1)' clearable></el-input>
                </ui-label-text>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item prop='companyName'>
                <ui-label-text labelWidth="180" label="保险公司名称：" >
                  <el-input v-model="queryInfo.companyName" @change="baoxianChange(2)" slot="text" @dblclick.native="openComDialog(1)" placeholder="双击可选择" @blur='opensingleComDialog(1)' clearable></el-input>
                </ui-label-text>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row class="ri-line">
            <el-col :span="12">
              <el-form-item prop='verifyStatus'>
                  <ui-label-text labelWidth="180" label="对账单审核状态：" >
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
                <ui-label-text labelWidth="180" label="财务审核状态：" >
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
            <el-col :span=12>
              <el-form-item prop='batch'>
                <ui-label-text labelWidth="180" label="批次：" :required="true">
                  <el-select v-model="queryInfo.batch" slot="text" placeholder="请选择批次">
                    <el-option
                        label="01"
                        value="01">
                    </el-option>
                    <el-option
                        label="02"
                        value="02">
                    </el-option>
                    <el-option
                        label="03"
                        value="03">
                    </el-option>
                    <el-option
                        label="04"
                        value="04">
                    </el-option>
                  </el-select>
                </ui-label-text>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row class="ri-line">
            <el-col :span="24">
              <el-form-item>
                <div class="datestyle" labelWidth="150">对账单生成日期:</div>
                <el-date-picker v-model="queryInfo.startDate" type="date" placeholder="选择开始日期" value-format="yyyy-MM-dd"></el-date-picker>
                <div class="datestyle1" labelWidth="150">至</div>
                <el-date-picker v-model="queryInfo.endDate" type="date" placeholder="选择结束日期" value-format="yyyy-MM-dd"></el-date-picker>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
      <div class="btn-container" slot="controlbar" >
          <el-button type="primary" @click.native.prevent="submitForm('moneycaiwuExamine', 0)">查询</el-button>
          <!-- <el-button type="primary" @click.native.prevent="submitForm('moneycaiwuExamine', 1)">导出</el-button> -->
      </div>
      <div v-if="tableShowOrnot">
        <el-table stripe ref="multipleTable" tooltip-effect="dark" style="width: 100%" :data="tableData">
          <el-table-column prop="batchNo" label="对账单号"  width="180">
            <template slot-scope="scope" >
              <span @click="getDetailExamine(scope.row)" class="tableButton">{{ scope.row.batchNo }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="companyName" label="保险公司"  width="220"></el-table-column>
          <el-table-column prop="comName" label="佰盈公司" width="280"></el-table-column>
          <el-table-column prop="sumpoundageTax" label="应收手续费金额（含增值税）" width="120"></el-table-column>
          <el-table-column prop="sumpoundageNotTax" label="应收手续费金额（不含增值税）" width="120"></el-table-column>
          <el-table-column prop="servPoundageTax" label="服务费（含增值税）" width="120"></el-table-column>
          <el-table-column prop="servPoundageNotTax" label="服务费（不含增值税）" width="120"></el-table-column>
          <el-table-column prop="allPoundageTax" label="对账合计金额（含增值税）" width="120"></el-table-column>
          <el-table-column prop="allPoundageNotTax" label="对账合计金额（不含增值税）" width="120"></el-table-column>
          <el-table-column prop="reconinsertDateStr" label="对账单生成日期" width="120"></el-table-column>
          <el-table-column prop="checkDate" label="财务复核日期" width="150" show-overflow-tooltip></el-table-column>
          <el-table-column prop="verifyStatus" label="运营审核状态" width="120"></el-table-column>
          <el-table-column prop="status" label="财务审核状态" width="100"></el-table-column>
          <!-- <el-table-column prop="verifyDate" label="财务审核日期" width="150" show-overflow-tooltip></el-table-column> -->
        </el-table>
        <div class="block">
          <el-pagination
            :pager-count="5"
            @current-change="handleCurrentChange"
            :current-page="queryInfo.currentPage"
            :page-size ="queryInfo.pageSize"
            @size-change="handleSizeChange"
            :page-sizes="[10,20,50]"
            :total="totalRecords"
            layout="total, sizes, prev, pager, next, jumper"
            >
          </el-pagination>
        </div>
      </div>
      <el-dialog :append-to-body='true' :visible.sync='comDialog2' :before-close='childClose'>
        <div>
          <el-table stripe @row-click='changeData' ref="multipleTable" :data="tempTableData3">
            <el-table-column prop="ratepayercomcode" label="代码" center ></el-table-column>
            <el-table-column prop="ratepayername" label="名称" center ></el-table-column>
          </el-table>
          <div class="block">
            <el-pagination
              @current-change="handleCurrentChange1"
              @size-change="handleSizeChange1"
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
      <el-dialog :append-to-body='true' :visible.sync='comDialog3' :before-close='childClose1'>
        <div>
          <el-table stripe @row-click='changeData1' ref="multipleTable" :data="tempTableData4">
            <el-table-column prop="comCode" label="代码" center ></el-table-column>
            <el-table-column prop="comCName" label="名称" center ></el-table-column>
          </el-table>
          <div class="block">
            <el-pagination
              @current-change="handleCurrentChange2"
              @size-change="handleSizeChange2"
              :current-page="orgQueryInfo.currentPage"
              :page-size="orgQueryInfo.pageSize"
              :page-sizes="[10,20,50]"
              :pager-count="5"
              layout="total, sizes, prev, pager, next, jumper"
              :total="fenyetotalData"
              >
            </el-pagination>
          </div>
        </div>
      </el-dialog>
      <el-dialog :append-to-body='true' :visible.sync='comDialog4' :before-close='childClose2'>
        <div>
          <el-table stripe @row-click='changeData2' ref="multipleTable" :data="tempTableData5">
            <el-table-column prop="firmcode" label="代码" center ></el-table-column>
            <el-table-column prop="firmname" label="名称" center ></el-table-column>
          </el-table>
          <div class="block">
            <el-pagination
              @current-change="handleCurrentChange3"
              @size-change="handleSizeChange3"
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
      <el-dialog :append-to-body='true' :visible.sync='comDialog5' :before-close='childClose3'>
        <div>
          <el-table stripe @row-click='changeData3' ref="multipleTable" :data="tempTableData6">
            <el-table-column prop="clientcode" label="代码" center ></el-table-column>
            <el-table-column prop="clientname" label="名称" center ></el-table-column>
          </el-table>
          <div class="block">
            <el-pagination
              @current-change="handleCurrentChange4"
              @size-change="handleSizeChange4"
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
      <el-dialog append-to-body center title="开票信息导入"
        :visible.sync="importInvoiceVis" width="60%">
        <div class="upload-content">
          <el-upload
            class="upload-content" ref="importRef"
            name="fileName"
            action="/tabycore/propertyCharge/propertyChargeimportInvoice"
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
      <el-dialog :append-to-body='true' :visible.sync='comDialog6' :before-close='childClose4'>
        <div>
          <el-table stripe @row-click='changeData4' ref="multipleTable" :data="tempTableData7">
            <el-table-column prop="bankcode" label="代码" center ></el-table-column>
            <el-table-column prop="bankname" label="名称" center ></el-table-column>
          </el-table>
          <div class="block">
            <el-pagination
              @current-change="handleCurrentChange5"
              @size-change="handleSizeChange5"
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
      <ComDialog :vis='comDialog' :workerVis='comDialogworker' :comVis='comDialogCom' :newTableData='tempTableData1' @onClose='comDialogClosing(0)' @selectDialog='dialogBackData' @comdialogChangePageFunction='changeComdialogPage1' @comdialogChangePageSizeFunction='changeComdialogPageSize1' :fenyetotal='fenyetotalData'/>
      <ComDialog :vis='comDialog1' :workerVis='comDialogworker1' :comVis='comDialogCom1' :newTableData='tempTableData2' @onClose='comDialogClosing(1)' @selectDialog='dialogBackData1' @comdialogChangePageFunction='changeComdialogPage2' @comdialogChangePageSizeFunction='changeComdialogPageSize2' :fenyetotal='fenyetotalData'/>
      <el-dialog :append-to-body='true'  width="90%" :visible.sync='detailDialogVis' :before-close="detailClosing">
        <ui-line-tittle :collapsible="true" v-if="chargeType === 1 || chargeType === '1' || !chargeType">
          <span slot="title" >
            <i class="font_family icon-jy-menu-4" ></i>已开票公司
          </span>
          <div class="ri-content" slot="content" >
            <el-table stripe ref="multipleTable" tooltip-effect="dark" style="width: 100%" :data="kaipiaoTableData">
              <el-table-column prop="comcomname" label="开票机构名称" width="300"></el-table-column>
              <el-table-column prop="companyname" label="保险公司名称" width="300"></el-table-column>
              <el-table-column prop="companycomname" label="保险公司机构名称" width="120"></el-table-column>
              <el-table-column prop="firmname" label="公司段名称" width="120"></el-table-column>
              <el-table-column prop="ratepayername" label="纳税人名称" width="120"></el-table-column>
              <el-table-column prop="ratepayercode" label="纳税人身份" width="200"></el-table-column>
              <el-table-column prop="ratepayeradd" label="纳税人地址" width="200"></el-table-column>
              <el-table-column prop="ratepayerno" label="纳税人识别号" width="120"></el-table-column>
              <el-table-column prop="ratepayerphone" label="纳税人电话" width="120"></el-table-column>
              <el-table-column prop="ratepayerbankname" label="纳税人开户行" width="120"></el-table-column>
              <el-table-column prop="ratepayerbankcode" label="纳税人银行账号" width="120"></el-table-column>
              <el-table-column prop="type" label="商品类型" width="120"></el-table-column>
              <el-table-column prop="spsl" label="商品税率(%)" width="120"></el-table-column>
              <el-table-column prop="note" label="专票/普票" width="200"></el-table-column>
              <el-table-column prop="total" label="调整后税价合计" width="120"></el-table-column>
              <el-table-column prop="tzcost" label="调整后价款" width="120"></el-table-column>
              <el-table-column prop="tztaxation" label="调整后税款" width="120"></el-table-column>
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
        <ui-line-tittle :collapsible="true" >
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
                <ui-label-text  label="对账单财务审核状态：" labelWidth="140" :text="detailDialogData.status">
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
                <ui-label-text label="总应收手续费（不含增值税）:" labelWidth="160" :text="detailDialogData.sumpoundageNotTax">
                </ui-label-text>
              </el-col>
              <el-col :span="12">
                <ui-label-text label="总应收手续费（含增值税）:" labelWidth="160" :text="detailDialogData.sumpoundageTax">
                </ui-label-text>
              </el-col>
            </el-row>
            <el-row class="ri-line">
              <el-col :span="12">
                <ui-label-text label="总应收手续费3%（含增值税）：" labelWidth="160" :text="detailDialogData.spsl3Mount">
                </ui-label-text>
              </el-col>
              <el-col :span="12">
                <ui-label-text label="总应收手续费6%（含增值税）：" labelWidth="160" :text="detailDialogData.spsl6Mount">
                </ui-label-text>
              </el-col>
            </el-row>
            <el-row class="ri-line">
              <el-col :span="12">
                <ui-label-text label="总应收手续费税额：" labelWidth="160" :text="detailDialogData.sumTax">
                </ui-label-text>
              </el-col>
              <el-col :span="12">
                <ui-label-text  label="奖金类型：" labelWidth="140" :text="detailDialogData.type">
                </ui-label-text>
              </el-col>
            </el-row>
            <el-row class="ri-line">
              <el-col :span="12">
                <ui-label-text label="服务费（含增值税）：" labelWidth="160" :text="detailDialogData.servPoundageTax">
                </ui-label-text>
              </el-col>
              <el-col :span="12">
                <ui-label-text label="服务费（不含增值税）：" labelWidth="160" :text="detailDialogData.servPoundageNotTax">
                </ui-label-text>
              </el-col>
            </el-row>
            <el-row class="ri-line">
              <el-col :span="12">
                <ui-label-text label="调整后对账总手续费（含税）：" labelWidth="160" :text="detailDialogData.adjustHandMount">
                </ui-label-text>
              </el-col>
              <el-col :span="12">
                <ui-label-text label="调整后对账总手续费（不含税）：" labelWidth="160" :text="detailDialogData.adjustNoHandMount">
                </ui-label-text>
              </el-col>
            </el-row>
            <el-row class="ri-line">
              <el-col :span="12">
                <ui-label-text label="调整后对账总手续费（税额）：" labelWidth="160" :text="detailDialogData.adjusttaxMount">
                </ui-label-text>
              </el-col>
            </el-row>
          </div>
        </ui-line-tittle>
        <ui-line-tittle :collapsible="true" v-if="chargeType === 1 || chargeType === '1' || !chargeType">
          <span slot="title" >
            <i class="font_family icon-jy-menu-4"></i>开票信息
          </span>
          <div class="ri-content" slot="content">
            <div v-for="(item, index) of kaipInfo" :key="index">
              <span>发票详情信息</span>
              <el-form :ref="`detailDialogRefs${index}`" :rules="rules1" :model="kaipInfo[index]">
                <el-row class="ri-line">
                  <el-col :span="4">
                    <ui-label-text :required="true" labelWidth="120" label="开票机构代码：" >
                    </ui-label-text>
                  </el-col>
                  <el-col :span="8" class="testInput">
                    <el-form-item prop='comcomcode'>
                      <el-input v-model="item.comcomcode" :required="true" @dblclick.native="openComDialog(3, index)" placeholder="双击可选择"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="4">
                    <ui-label-text :required="true" labelWidth="120" label="开票机构名称：" >
                    </ui-label-text>
                  </el-col>
                  <el-col :span="8" class="testInput">
                    <el-form-item prop='comcomname'>
                      <el-input v-model="item.comcomname" @dblclick.native="openComDialog(3, index)" placeholder="双击可选择"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row class="ri-line">
                  <el-col :span="4">
                    <ui-label-text :required="true" labelWidth="120" label="公司段代码：" >
                    </ui-label-text>
                  </el-col>
                  <el-col :span="8" class="testInput">
                    <el-form-item prop='firmcode'>
                      <el-input v-model="item.firmcode" @dblclick.native="openComDialog(4, index)" placeholder="双击可选择"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="4">
                    <ui-label-text :required="true" labelWidth="120" label="公司段名称：" >
                    </ui-label-text>
                  </el-col>
                  <el-col :span="8" class="testInput">
                    <el-form-item prop='firmname'>
                      <el-input v-model="item.firmname" @dblclick.native="openComDialog(4, index)" placeholder="双击可选择"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <!-- <el-row class="ri-line">
                  <el-col :span="4">
                    <ui-label-text :required="true" labelWidth="120" label="客户段代码：" >
                    </ui-label-text>
                  </el-col>
                  <el-col :span="8" class="testInput">
                    <el-form-item prop='clientcode'>
                        <el-input v-model="item.clientcode" @dblclick.native="openComDialog(5, index)" placeholder="双击可选择"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="4">
                    <ui-label-text :required="true" labelWidth="120" label="客户段名称：" >
                    </ui-label-text>
                  </el-col>
                  <el-col :span="8" class="testInput">
                    <el-form-item prop='clientname'>
                        <el-input v-model="item.clientname" @dblclick.native="openComDialog(5, index)" placeholder="双击可选择"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row class="ri-line">
                  <el-col :span="4">
                    <ui-label-text :required="true" labelWidth="120" label="银行段代码：" >
                    </ui-label-text>
                  </el-col>
                  <el-col :span="8" class="testInput">
                    <el-form-item prop='bankcode'>
                      <el-input v-model="item.bankcode" @dblclick.native="openComDialog(6, index)" placeholder="双击可选择"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="4">
                    <ui-label-text :required="true" labelWidth="120" label="银行段名称：" >
                    </ui-label-text>
                  </el-col>
                  <el-col :span="8" class="testInput">
                    <el-form-item prop='bankname'>
                        <el-input v-model="item.bankname" @dblclick.native="openComDialog(6, index)" placeholder="双击可选择"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row> -->
                <el-row class="ri-line">
                  <el-col :span="4">
                    <ui-label-text :required="true" labelWidth="120" label="（客户）纳税人代码：" >
                    </ui-label-text>
                  </el-col>
                  <el-col :span="8" class="testInput">
                    <el-form-item prop='businessCode'>
                        <el-input v-model="item.businessCode" placeholder="双击可选择" @dblclick.native="openComDialog(2,index)"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="4">
                    <ui-label-text :required="true" labelWidth="120" label="（客户）纳税人名称：" >
                    </ui-label-text>
                  </el-col>
                  <el-col :span="8" class="testInput">
                    <el-form-item prop='businessName'>
                      <el-input v-model="item.businessName" placeholder="双击可选择" @dblclick.native="openComDialog(2,index)"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row class="ri-line">
                  <el-col :span="4">
                    <ui-label-text :required="true" labelWidth="120" label="（客户）纳税人身份：" >
                    </ui-label-text>
                  </el-col>
                  <el-col :span="8" class="testInput">
                    <el-form-item prop='taxpayerIden'>
                      <el-select v-model="item.taxpayerIden" placeholder="请选择">
                        <el-option label="增值税一般纳税人" value="1"></el-option>
                        <el-option label="增值税小规模纳税人" value="2"></el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :span="4">
                    <ui-label-text :required="theTaxCom" labelWidth="120" label="（客户）纳税人地址：" >
                    </ui-label-text>
                  </el-col>
                  <el-col :span="8" class="testInput">
                    <el-form-item prop='taxpayIdenAdd'>
                      <el-input v-model="item.taxpayIdenAdd" ></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row class="ri-line">
                  <el-col :span="4">
                    <ui-label-text :required="true" labelWidth="120" label="（客户）纳税人识别号：" >
                    </ui-label-text>
                  </el-col>
                  <el-col :span="8" class="testInput">
                    <el-form-item prop='taxpayIdenNo'>
                      <el-input v-model="item.taxpayIdenNo" ></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="4">
                    <ui-label-text :required="theTaxCom" labelWidth="120" label="（客户）纳税人电话：" >
                    </ui-label-text>
                  </el-col>
                  <el-col :span="8" class="testInput">
                    <el-form-item prop='taxpayIdenPhone'>
                        <el-input v-model="item.taxpayIdenPhone" ></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row class="ri-line">
                  <el-col :span="4">
                    <ui-label-text :required="theTaxCom" labelWidth="120" label="（客户）纳税人开户行：" >
                    </ui-label-text>
                  </el-col>
                  <el-col :span="8" class="testInput">
                    <el-form-item prop='taxpayIdenBank'>
                      <el-input v-model="item.taxpayIdenBank" ></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="4">
                    <ui-label-text :required="theTaxCom" labelWidth="120" label="（客户）纳税人银行账号：" >
                    </ui-label-text>
                  </el-col>
                  <el-col :span="8" class="testInput">
                    <el-form-item prop='taxpayIdenBankAcc'>
                      <el-input v-model="item.taxpayIdenBankAcc" ></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row class="ri-line">
                  <el-col :span="4">
                    <ui-label-text :required="true" labelWidth="120" label="商品名称：" >
                    </ui-label-text>
                  </el-col>
                  <el-col :span="8" class="testInput">
                    <el-form-item prop='type'>
                      <el-select v-model="kaipiaoInputData[index].type" placeholder="请选择">
                        <el-option label="手续费" value="1"></el-option>
                        <el-option label="服务费" value="2"></el-option>
                        <el-option label="其他经纪代理服务" value="3"></el-option>
                        <el-option label="保险代理手续费" value="5"></el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :span="4">
                    <ui-label-text :required="true" labelWidth="120" label="商品税率：" >
                    </ui-label-text>
                  </el-col>
                  <el-col :span="8" class="testInput">
                    <el-select v-model="kaipiaoInputData[index].spsl" placeholder="请选择">
                      <el-option label="0%" value="0"></el-option>
                      <el-option label="3%" value="3"></el-option>
                      <el-option label="6%" value="6"></el-option>
                    </el-select>
                  </el-col>
                </el-row>
              </el-form>
              <el-row class="ri-line">
                <el-col :span="4">
                  <span>发票类型</span>
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
                <el-col :span="4">
                  <span>调整后的税款</span>
                </el-col>
                <el-col :span="4">
                  <span>调整后的价款</span>
                </el-col>
              </el-row>
              <el-row class="ri-line">
                <el-col :span="4">
                  <span>普票</span>
                </el-col>
                <el-col :span="4" class="testInput">
                  <el-input type="number" v-model="kaipiaoInputData[index].allhandCal1" @blur='calHandCal(index,1)'></el-input>
                </el-col>
                <el-col :span="4" class="testInput">
                  <el-input type="number" v-model="kaipiaoInputData[index].shuiCal1" readonly></el-input>
                </el-col>
                <el-col :span="4" class="testInput">
                  <el-input type="number" v-model="kaipiaoInputData[index].priceCal1" readonly></el-input>
                </el-col>
                <el-col :span="4" class="testInput">
                  <el-input type="number" v-model="kaipiaoInputData[index].aftershuiCal1"></el-input>
                </el-col>
                <el-col :span="4" class="testInput">
                  <el-input type="number" v-model="kaipiaoInputData[index].afterpriceCal1"></el-input>
                </el-col>
              </el-row>
              <el-row class="ri-line">
                <el-col :span="4">
                  <span>专票</span>
                </el-col>
                <el-col :span="4" class="testInput">
                  <el-input type="number" v-model="kaipiaoInputData[index].allhandCal2" @blur='calHandCal(index,2)'></el-input>
                </el-col>
                <el-col :span="4" class="testInput">
                  <el-input type="number" v-model="kaipiaoInputData[index].shuiCal2" readonly></el-input>
                </el-col>
                <el-col :span="4" class="testInput">
                  <el-input type="number" v-model="kaipiaoInputData[index].priceCal2" readonly></el-input>
                </el-col>
                <el-col :span="4" class="testInput">
                  <el-input type="number" v-model="kaipiaoInputData[index].aftershuiCal2"></el-input>
                </el-col>
                <el-col :span="4" class="testInput">
                  <el-input type="number" v-model="kaipiaoInputData[index].afterpriceCal2"></el-input>
                </el-col>
              </el-row>
              <div>
                <el-button type="primary" @click.native.prevent="delDetailData(index)">删除</el-button>
              </div>
            </div>
            <div style="margin-bottom:20px;margin-top:10px;text-align:right">
              <el-button type="primary" @click.native.prevent="addDetailData()">添加</el-button>
              <!-- <el-button type="primary" @click.native.prevent="test()">test</el-button> -->
            </div>
          </div>
        </ui-line-tittle>
        <div class="btn-container" v-if="chargeType === 1 || chargeType === '1' || !chargeType">
          <el-button type="primary" @click="submitForm1(1)">审核通过</el-button>
          <el-button type="primary" @click="shenheNopass">审核不通过</el-button>
          <el-button type="primary" @click="closeDetailDialog">返回</el-button>
          <el-button type="primary" @click="fuhepass">复核通过</el-button>
          <el-button type="primary" @click="fuheNopass">复核不通过</el-button>
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
            <el-button type="primary" style="width:150px" @click="closeDetailDialog">返回</el-button>
            <el-button type="primary" style="width:150px" @click="fuhepass">复核通过</el-button>
            <el-button type="primary" style="width:150px" @click="fuheNopass">复核不通过</el-button>
          </el-row>
        </div>
      </el-dialog>
      <el-dialog title="导入结果" center :append-to-body='true' :visible.sync='importResVis'>
        <pre class="importResStyle">{{importRes}}</pre>
        <div class="btn-container">
          <el-button @click="importResVis = false">返回</el-button>
        </div>
      </el-dialog>
  </div>
</template>

<script>
import NoticeBar from '@/components/notice-bar'
import LineTittle from '@/components/line-tittle'
import LabelText from '@/components/label-text'
import { mapActions } from 'vuex'
import IsEmpty from '@/utils/IsEmpty'
import ComDialog from '@/components/comDialog'
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
        chargeType: '',
        currentPage: 1,
        pageSize: 10
      },
      fileList: [],
      rules: {
        comCode: [
          { required: true, message: '请输入佰盈机构代码', trigger: 'change' }
        ],
        batch: [
          { required: true, message: '请输入批次', trigger: 'change' }
        ]
      },
      rules1: {
        comcomcode: [
          { required: true, message: '请输入开票机构代码', trigger: 'change' }
        ],
        comcomname: [
          { required: true, message: '请输入开票机构名称', trigger: 'blur' }
        ],
        firmcode: [
          { required: true, message: '请输入公司段代码', trigger: 'change' }
        ],
        firmname: [
          { required: true, message: '请输入公司段名称', trigger: 'change' }
        ],
        // clientcode: [
        //   { required: true, message: '请输入客户段代码', trigger: 'change' }
        // ],
        // clientname: [
        //   { required: true, message: '请输入客户段名称', trigger: 'change' }
        // ],
        // bankcode: [
        //   { required: true, message: '请输入银行段代码', trigger: 'change' }
        // ],
        // bankname: [
        //   { required: true, message: '请输入银行段名称', trigger: 'change' }
        // ],
        businessCode: [
          { required: true, message: '请输入（客户）纳税人代码', trigger: 'change' }
        ],
        businessName: [
          { required: true, message: '请输入（客户）纳税人名称', trigger: 'change' }
        ],
        taxpayerIden: [
          { required: true, message: '请输入（客户）纳税人身份', trigger: 'change' }
        ],
        taxpayIdenAdd: [
          { required: true, message: '请输入（客户）纳税人地址', trigger: 'change' }
        ],
        taxpayIdenNo: [
          { required: true, message: '请输入（客户）纳税人识别号', trigger: 'change' }
        ],
        taxpayIdenPhone: [
          { required: true, message: '请输入（客户）纳税人电话', trigger: 'change' }
        ],
        taxpayIdenBank: [
          { required: true, message: '请输入（客户）纳税人开户行', trigger: 'change' }
        ],
        taxpayIdenBankAcc: [
          { required: true, message: '请输入（客户）纳税人银行账号', trigger: 'change' }
        ],
        type: [
          { required: true, message: '请输入商品名称', trigger: 'blur' }
        ],
        spsl: [
          { required: true, message: '请输入开票税率', trigger: 'blur' }
        ]
      },
      companyQueryInfo: {
        type: '1',
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
        currentPage: '',
        pageSize: ''
      },
      importRes: '',
      importResVis: false,
      chargeType: '2',
      importInvoiceVis: false,
      tableShowOrnot: false,
      detailDialogData1: {},
      detailDialogVis: false,
      tableData: [],
      kaipiaoTableData1: [],
      kaipiaoInputData: [],
      kaipInfo: [],
      tempTableData1: [],
      tempTableData2: [],
      tempTableData3: [],
      tempTableData4: [],
      tempTableData5: [],
      tempTableData6: [],
      tempTableData7: [],
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
      duizhangdanNo: '',
      nashuirenIndex: 0,
      detailDialogRefs: [],
      theTaxCom: true
    }
  },
  mounted () {
  },
  methods: {
    submitForm (formName, index) {
      if (!IsEmpty(this.queryInfo.startDate) && IsEmpty(this.queryInfo.endDate)) {
        this.openToast('warning', '请输入结束日期')
      } else if (IsEmpty(this.queryInfo.startDate) && !IsEmpty(this.queryInfo.endDate)) {
        this.openToast('warning', '请输入开始日期')
      } else {
        this.$refs[formName].validate((valid) => {
          if (valid) {
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
      window.open(`/tabycore/propertyCharge/downloadAllFinancePropertyChargePoundageRecon?companyCode=${this.queryInfo.companyCode}&companyName=${this.queryInfo.companyName}&comCode=${this.queryInfo.comCode}&comName=${this.queryInfo.comName}&verifyStatus=${this.queryInfo.verifyStatus}&startDate=${this.queryInfo.startDate}&endDate=${this.queryInfo.endDate}&status=${this.queryInfo.status}&chargeType=${this.queryInfo.chargeType}&batch=${this.queryInfo.batch}`)
    },
    submitForm1 (index) {
      switch (index) {
        case 1:
          let tempIsEmpty = false
          if (this.theTaxCom) {
            for (let i = 0; i < this.kaipInfo.length; i++) {
              if (IsEmpty(this.kaipInfo[i].comcomcode) ||
              IsEmpty(this.kaipInfo[i].comcomname) ||
              IsEmpty(this.kaipInfo[i].firmcode) ||
              IsEmpty(this.kaipInfo[i].firmname) ||
              // IsEmpty(this.kaipInfo[i].clientcode) ||
              // IsEmpty(this.kaipInfo[i].clientname) ||
              // IsEmpty(this.kaipInfo[i].bankcode) ||
              // IsEmpty(this.kaipInfo[i].bankname) ||
              IsEmpty(this.kaipInfo[i].businessCode) ||
              IsEmpty(this.kaipInfo[i].businessName) ||
              IsEmpty(this.kaipInfo[i].taxpayerIden) ||
              IsEmpty(this.kaipInfo[i].taxpayIdenAdd) ||
              IsEmpty(this.kaipInfo[i].taxpayIdenNo) ||
              IsEmpty(this.kaipInfo[i].taxpayIdenPhone) ||
              IsEmpty(this.kaipInfo[i].taxpayIdenBank) ||
              IsEmpty(this.kaipInfo[i].taxpayIdenBankAcc) ||
              IsEmpty(this.kaipiaoInputData[i].type) ||
              IsEmpty(this.kaipiaoInputData[i].spsl)) {
                tempIsEmpty = true
              }
            }
          } else {
            for (let i = 0; i < this.kaipInfo.length; i++) {
              if (IsEmpty(this.kaipInfo[i].comcomcode) ||
              IsEmpty(this.kaipInfo[i].comcomname) ||
              IsEmpty(this.kaipInfo[i].firmcode) ||
              IsEmpty(this.kaipInfo[i].firmname) ||
              // IsEmpty(this.kaipInfo[i].clientcode) ||
              // IsEmpty(this.kaipInfo[i].clientname) ||
              // IsEmpty(this.kaipInfo[i].bankcode) ||
              // IsEmpty(this.kaipInfo[i].bankname) ||
              IsEmpty(this.kaipInfo[i].businessCode) ||
              IsEmpty(this.kaipInfo[i].businessName) ||
              IsEmpty(this.kaipInfo[i].taxpayerIden) ||
              IsEmpty(this.kaipInfo[i].taxpayIdenNo) ||
              IsEmpty(this.kaipiaoInputData[i].type) ||
              IsEmpty(this.kaipiaoInputData[i].spsl)) {
                tempIsEmpty = true
              }
            }
          }
          if (!tempIsEmpty) {
            let temp = 0
            let temp1 = 0
            let temp2 = 0
            let fuwutemp = 0
            let fuwutemp1 = 0
            let fuwutemp2 = 0
            let tempfuwuOrNot = false
            for (let j = 0; j < this.kaipiaoInputData.length; j++) {
              if (Math.abs(parseFloat(this.kaipiaoInputData[j].aftershuiCal1)) > Math.abs(parseFloat(this.kaipiaoInputData[j].afterpriceCal1))) {
                this.openToast('warning', '发票类型：普票的调整后税款不能大于调整后的价款')
                return false
              }
              if (Math.abs(parseFloat(this.kaipiaoInputData[j].aftershuiCal2)) > Math.abs(parseFloat(this.kaipiaoInputData[j].afterpriceCal2))) {
                this.openToast('warning', '发票类型：专票的调整后税款不能大于调整后的价款')
                return false
              }
              if (this.kaipiaoInputData[j].type === '2') {
                if ((parseFloat(this.kaipiaoInputData[j].aftershuiCal1) + parseFloat(this.kaipiaoInputData[j].afterpriceCal1) - parseFloat(this.kaipiaoInputData[j].allhandCal1)) <= 1 && (parseFloat(this.kaipiaoInputData[j].allhandCal1) - parseFloat(this.kaipiaoInputData[j].aftershuiCal1) - parseFloat(this.kaipiaoInputData[j].afterpriceCal1)) <= 1) {
                  if ((parseFloat(this.kaipiaoInputData[j].aftershuiCal2) + parseFloat(this.kaipiaoInputData[j].afterpriceCal2) - parseFloat(this.kaipiaoInputData[j].allhandCal2)) <= 1 && (parseFloat(this.kaipiaoInputData[j].allhandCal2) - parseFloat(this.kaipiaoInputData[j].aftershuiCal2) - parseFloat(this.kaipiaoInputData[j].afterpriceCal2)) <= 1) {
                    tempfuwuOrNot = true
                    fuwutemp += (parseFloat(this.kaipiaoInputData[j].allhandCal1) + parseFloat(this.kaipiaoInputData[j].allhandCal2))
                    fuwutemp1 += (parseFloat(this.kaipiaoInputData[j].afterpriceCal1) + parseFloat(this.kaipiaoInputData[j].afterpriceCal2))
                    fuwutemp2 += (parseFloat(this.kaipiaoInputData[j].aftershuiCal1) + parseFloat(this.kaipiaoInputData[j].aftershuiCal2))
                  } else {
                    this.openToast('warning', '请校验发票类型：专票的调整后税款与调整后的价款之和是否是对账总手续费（含税）的1元范围')
                    return false
                  }
                } else {
                  this.openToast('warning', '请校验发票类型：普票的调整后税款与调整后的价款之和是否是对账总手续费（含税）的1元范围')
                  return false
                }
              } else {
                if ((parseFloat(this.kaipiaoInputData[j].aftershuiCal1) + parseFloat(this.kaipiaoInputData[j].afterpriceCal1) - parseFloat(this.kaipiaoInputData[j].allhandCal1)) <= 1 && (parseFloat(this.kaipiaoInputData[j].allhandCal1) - parseFloat(this.kaipiaoInputData[j].aftershuiCal1) - parseFloat(this.kaipiaoInputData[j].afterpriceCal1)) <= 1) {
                  if ((parseFloat(this.kaipiaoInputData[j].aftershuiCal2) + parseFloat(this.kaipiaoInputData[j].afterpriceCal2) - parseFloat(this.kaipiaoInputData[j].allhandCal2)) <= 1 && (parseFloat(this.kaipiaoInputData[j].allhandCal2) - parseFloat(this.kaipiaoInputData[j].aftershuiCal2) - parseFloat(this.kaipiaoInputData[j].afterpriceCal2)) <= 1) {
                    temp += (parseFloat(this.kaipiaoInputData[j].allhandCal1) + parseFloat(this.kaipiaoInputData[j].allhandCal2))
                    temp1 += (parseFloat(this.kaipiaoInputData[j].afterpriceCal1) + parseFloat(this.kaipiaoInputData[j].afterpriceCal2))
                    temp2 += (parseFloat(this.kaipiaoInputData[j].aftershuiCal1) + parseFloat(this.kaipiaoInputData[j].aftershuiCal2))
                  } else {
                    this.openToast('warning', '请校验发票类型：专票调整后税款与调整后的价款之和是否是对账总手续费（含税）的1元范围')
                    return false
                  }
                } else {
                  this.openToast('warning', '请校验发票类型：普票的调整后税款与调整后的价款之和是否是对账总手续费（含税）的1元范围')
                  return false
                }
              }
            }
            let fuwutemp3 = fuwutemp1 + fuwutemp2
            let temp3 = temp1 + temp2
            // eslint-disable-next-line eqeqeq
            if (tempfuwuOrNot && (IsEmpty(fuwutemp))) {
              this.openToast('warning', '请输入开票金额')
              return false
            }
            if (IsEmpty(temp)) {
              this.openToast('warning', '请输入开票金额')
              return false
            }
            if (tempfuwuOrNot) {
              if (fuwutemp - parseFloat(this.detailDialogData.servPoundageTax) >= -1 && fuwutemp - parseFloat(this.detailDialogData.servPoundageTax) <= 1) { // 对账总手续费（含税）总额
                if (fuwutemp3 - parseFloat(this.detailDialogData.servPoundageTax) >= -1 && fuwutemp3 - parseFloat(this.detailDialogData.servPoundageTax) <= 1) { // 调整后总额
                } else {
                  this.openToast('warning', '请校验调整后的税款加上调整后的价款总额是否是服务费（含增值税）的1元范围')
                  return false
                }
              } else {
                this.openToast('warning', '请校验对账总手续费（含税）总额是否是服务费（含增值税）的1元范围')
                return false
              }
            }
            if (temp + fuwutemp - parseFloat(this.detailDialogData.sumpoundageTax) >= -1 && temp + fuwutemp - parseFloat(this.detailDialogData.sumpoundageTax) <= 1) {
              if (temp3 + fuwutemp3 - parseFloat(this.detailDialogData.sumpoundageTax) >= -1 && temp3 + fuwutemp3 - parseFloat(this.detailDialogData.sumpoundageTax) <= 1) {
              } else {
                this.openToast('warning', '请校验调整后的税款加上调整后的价款总额是否是总应收手续费（含增值税）的1元范围')
                return false
              }
            } else {
              this.openToast('warning', '请校验对账总手续费（含税）总额是否是总应收手续费（含增值税）的1元范围')
              return false
            }
            this.shenhepass()
          } else {
            this.openToast('warning', '请输入相关必填项')
            return false
          }
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
    },
    initKaipiaoData () {
      this.kaipiaoTableData1 = []
      this.kaipiaoInputData = []
      this.kaipInfo = []
      this.detailDialogData1 = {}
    },
    childClose () {
      this.comDialog2 = false
      this.kaipInfo[this.nashuirenIndex].businessCode = ''
      this.kaipInfo[this.nashuirenIndex].businessName = ''
      this.kaipInfo[this.nashuirenIndex].taxpayIdenAdd = ''
      this.kaipInfo[this.nashuirenIndex].taxpayIdenNo = ''
      this.kaipInfo[this.nashuirenIndex].taxpayIdenPhone = ''
      this.kaipInfo[this.nashuirenIndex].taxpayIdenBank = ''
      this.kaipInfo[this.nashuirenIndex].taxpayIdenBankAcc = ''
      this.initshuangjiDialog()
    },
    childClose1 () {
      this.comDialog3 = false
      this.kaipInfo[this.nashuirenIndex].comcomcode = ''
      this.kaipInfo[this.nashuirenIndex].comcomname = ''
      this.initshuangjiDialog()
    },
    childClose2 () {
      this.comDialog4 = false
      this.kaipInfo[this.nashuirenIndex].firmcode = ''
      this.kaipInfo[this.nashuirenIndex].firmname = ''
      this.initshuangjiDialog()
    },
    childClose3 () {
      this.comDialog5 = false
      this.kaipInfo[this.nashuirenIndex].clientcode = ''
      this.kaipInfo[this.nashuirenIndex].clientname = ''
      this.initshuangjiDialog()
    },
    childClose4 () {
      this.comDialog6 = false
      this.kaipInfo[this.nashuirenIndex].bankcode = ''
      this.kaipInfo[this.nashuirenIndex].bankname = ''
      this.initshuangjiDialog()
    },
    detailClosing () {
      this.detailDialogVis = false
      this.queryData()
      this.initKaipiaoData()
    },
    changeData (row) {
      this.comDialog2 = false
      this.kaipInfo[this.nashuirenIndex].businessCode = row.ratepayercomcode
      this.kaipInfo[this.nashuirenIndex].businessName = row.ratepayername
      this.kaipInfo[this.nashuirenIndex].taxpayIdenAdd = row.ratepayeradd
      this.kaipInfo[this.nashuirenIndex].taxpayerIden = row.ratepayercode
      this.kaipInfo[this.nashuirenIndex].taxpayIdenNo = row.ratepayerno
      this.kaipInfo[this.nashuirenIndex].taxpayIdenPhone = row.ratepayerphone
      this.kaipInfo[this.nashuirenIndex].taxpayIdenBank = row.ratepayerbankname
      this.kaipInfo[this.nashuirenIndex].taxpayIdenBankAcc = row.ratepayerbankcode
    },
    changeData1 (row) {
      this.comDialog3 = false
      this.kaipInfo[this.nashuirenIndex].comcomcode = row.comCode
      this.kaipInfo[this.nashuirenIndex].comcomname = row.comCName
    },
    changeData2 (row) {
      this.comDialog4 = false
      this.kaipInfo[this.nashuirenIndex].firmcode = row.firmcode
      this.kaipInfo[this.nashuirenIndex].firmname = row.firmname
    },
    changeData3 (row) {
      this.comDialog5 = false
      this.kaipInfo[this.nashuirenIndex].clientcode = row.clientcode
      this.kaipInfo[this.nashuirenIndex].clientname = row.clientname
    },
    changeData4 (row) {
      this.comDialog6 = false
      this.kaipInfo[this.nashuirenIndex].bankcode = row.bankcode
      this.kaipInfo[this.nashuirenIndex].bankname = row.bankname
    },
    changeComdialogPage1 (data) {
      this.companyQueryInfo.currentPage = data
      this.openComDialog(1)
    },
    changeComdialogPage2 (data) {
      this.orgQueryInfo.currentPage = data
      this.openComDialog(0)
    },
    changeComdialogPageSize1 (data) {
      this.companyQueryInfo.pageSize = data
      this.companyQueryInfo.currentPage = 1
      this.openComDialog(1)
    },
    changeComdialogPageSize2 (data) {
      this.orgQueryInfo.pageSize = data
      this.orgQueryInfo.currentPage = 1
      this.openComDialog(0)
    },
    queryData () {
      this.Loading()
      this.tableData = []
      api('/propertyCharge/queryAllFinancePropertyChargePoundageRecon', 'post', this.queryInfo).then((res) => {
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
    getDuizhangdanDetail (data) {
      console.log(data)
      this.Loading()
      this.duizhangdanNo = data
      if (this.chargeType === 1 || this.chargeType === '1' || IsEmpty(this.chargeType)) {
        api('/propertyCharge/queryFinancePropertyChargePoundageRecon', 'post', `reconno=${data}`).then((res) => {
          console.log(res)
          this.closeLoading()
          if (res.data.code !== '000000' && !IsEmpty(res.data.code)) {
            this.openToast('warning', res.data.msg)
          } else {
            this.detailDialogData1 = res.data
            this.kaipiaoTableData1 = this.detailDialogData1.propertyChargeInvoice
            this.detailDialogVis = true
          }
        })
      } else {
        api('/propertyCharge/newqueryFinancePropertyChargePoundageRecon', 'post', `reconno=${data}`).then((res) => {
          console.log(res)
          this.closeLoading()
          if (res.data.code !== '000000' && !IsEmpty(res.data.code)) {
            this.openToast('warning', res.data.msg)
          } else {
            this.detailDialogData1 = res.data
            this.kaipiaoTableData1 = this.detailDialogData1.propertyChargeInvoice
            this.detailDialogVis = true
          }
        })
      }
    },
    // toast提示
    openToast (type, mesg, time = 0) {
      this.$message({
        showClose: true,
        message: mesg,
        type: type,
        duration: time
      })
    },
    handleExceed (files, fileList) {
      this.$message.warning(`当前限制选择 1 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length} 个文件`)
    },
    handleEXLSuccess (response) {
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
    opensingleComDialog (index) {
      if (!(this.comDialog || this.comDialog1)) {
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
              console.log(this.tempTableData2)
            }
          )
            break
          case 1:
            this.companyQueryInfo.clickType = '1'
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
    openComDialog (index, index2) {
      switch (index) {
        case 0:
          this.orgQueryInfo.clickType = '2'
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
                this.tempTableData2 = res.data.data.data
                this.fenyetotalData = res.data.data.totalRecords
                this.comDialog1 = true
                this.comDialogCom1 = true
                this.comDialogworker1 = false
                this.nashuirenIndex = index2
                for (let i = 0; i < this.tempTableData2.length; i++) {
                  this.tempTableData2[i]['renderData'] = `${this.tempTableData2[i].comCode}-${this.tempTableData2[i].comCName}`
                }
              }
              console.log(this.tempTableData2)
            }
          )
          break
        case 1:
          this.companyQueryInfo.insurerCode = this.queryInfo.companyCode
          this.companyQueryInfo.insurerName = this.queryInfo.companyName
          this.companyQueryInfo.clickType = '2'
          this.commissionConfigdblqueryCom1(this.companyQueryInfo).then(
            (res) => {
              if (res.data.code !== '000000' && !IsEmpty(res.data.code)) {
                this.openToast('warning', res.data.msg)
              } else {
                this.tempTableData1 = res.data.data.data
                this.fenyetotalData = res.data.data.totalRecords
                this.comDialog = true
                this.comDialogCom = true
                this.comDialogworker = false
                this.nashuirenIndex = index2
                for (let i = 0; i < this.tempTableData1.length; i++) {
                  this.tempTableData1[i]['renderData'] = `${this.tempTableData1[i].insurercode}-${this.tempTableData1[i].insurername}`
                }
              }
            }
          )
          break
        case 2:
//         ratepayercomcode;// 纳税人代码
// ratepayername;// 纳税人名称',
// ratepayercode;// 纳税人身份',
// ratepayeradd;// 纳税人地址',
// ratepayerno;// 纳税人识别号',
// ratepayerphone;// 纳税人电话',
// ratepayerbankname;// 纳税人开户行',
// ratepayerbankcode;// 纳税人银行账号',
// currentPage;//
// pageSize;//
          this.nashuirenInfo.ratepayercomcode = this.kaipInfo[index2].businessCode
          this.nashuirenInfo.ratepayername = this.kaipInfo[index2].businessName
          this.nashuirenInfo.ratepayeradd = this.kaipInfo[index2].taxpayIdenAdd
          this.nashuirenInfo.ratepayerno = this.kaipInfo[index2].taxpayIdenNo
          this.nashuirenInfo.ratepayerphone = this.kaipInfo[index2].taxpayIdenPhone
          this.nashuirenInfo.ratepayerbankname = this.kaipInfo[index2].ratepayerbankname
          this.nashuirenInfo.ratepayerbankcode = this.kaipInfo[index2].ratepayerbankcode
          this.lifeInsureBillFinanceNashuiPeopleQuery(this.nashuirenInfo).then(
            (res) => {
              console.log(res)
              if (res.data.code !== '000000' && !IsEmpty(res.data.code)) {
                this.openToast('warning', res.data.msg)
              } else {
                this.tempTableData3 = res.data.content
                this.fenyetotalData = res.data.totalElements
                this.nashuirenIndex = index2
                this.comDialog2 = true
                this.comDialogCom2 = true
                this.comDialogworker2 = false
              }
            }
          )
          break
        case 3:
          this.orgQueryInfo.clickType = '2'
          if (!IsEmpty(this.queryInfo.comCode)) {
            this.orgQueryInfo.comCodeOrName = this.kaipInfo[index2].comcomcode
          } else if (!IsEmpty(this.queryInfo.comName)) {
            this.orgQueryInfo.comCodeOrName = this.kaipInfo[index2].comcomname
          } else {
            this.orgQueryInfo.comCodeOrName = ''
          }
          this.contiListCheckDialogDataGet3(this.orgQueryInfo).then(
            (res) => {
              if (res.data.code !== '000000' && !IsEmpty(res.data.code)) {
                this.openToast('warning', res.data.msg)
              } else {
                this.tempTableData4 = res.data.data.data
                this.fenyetotalData = res.data.data.totalRecords
                this.comDialog3 = true
                this.comDialogCom3 = true
                this.comDialogworker3 = false
                this.nashuirenIndex = index2
              }
            }
          )
          break
        case 4:
      //     gongsiduanInfo: {
      //   firmcode: '',
      //   firmname: '',
      //   currentPage: 1,
      //   pageSize: 10
      // },
          this.gongsiduanInfo.firmcode = this.kaipInfo[index2].firmcode
          this.gongsiduanInfo.firmname = this.kaipInfo[index2].firmname
          this.lifeInsureBillFinanceFirmQuery(this.gongsiduanInfo).then(
            (res) => {
              if (res.data.code !== '000000' && !IsEmpty(res.data.code)) {
                this.openToast('warning', res.data.msg)
              } else {
                this.tempTableData5 = res.data.content
                this.fenyetotalData = res.data.totalElements
                this.comDialog4 = true
                this.comDialogCom4 = true
                this.comDialogworker4 = false
                this.nashuirenIndex = index2
              }
            }
          )
          break
        case 5:
      //   kehuduanInfo: {
      //   clientcode: '',
      //   clientname: '',
      //   currentPage: 1,
      //   pageSize: 10
      // },
          this.kehuduanInfo.clientcode = this.kaipInfo[index2].clientcode
          this.kehuduanInfo.clientname = this.kaipInfo[index2].clientname
          this.lifeInsureBillFinanceClientQuery(this.kehuduanInfo).then(
            (res) => {
              if (res.data.code !== '000000' && !IsEmpty(res.data.code)) {
                this.openToast('warning', res.data.msg)
              } else {
                this.tempTableData6 = res.data.content
                this.fenyetotalData = res.data.totalElements
                this.comDialog5 = true
                this.comDialogCom5 = true
                this.comDialogworker5 = false
                this.nashuirenIndex = index2
              }
            }
          )
          break
        case 6:
      // yinhangduanInfo: {
      //   bankcode: '',
      //   bankname: '',
      //   currentPage: '',
      //   pageSize: ''
      // },
          this.yinhangduanInfo.bankcode = this.kaipInfo[index2].bankcode
          this.yinhangduanInfo.bankname = this.kaipInfo[index2].bankname
          this.lifeInsureBillFinanceBankQuery(this.yinhangduanInfo).then(
            (res) => {
              if (res.data.code !== '000000' && !IsEmpty(res.data.code)) {
                this.openToast('warning', res.data.msg)
              } else {
                this.tempTableData7 = res.data.content
                this.fenyetotalData = res.data.totalElements
                this.comDialog6 = true
                this.comDialogCom6 = true
                this.comDialogworker6 = false
                this.nashuirenIndex = index2
              }
            }
          )
      }
    },
    baiyingChange (index) {
      switch (index) {
        case 1:
          if (IsEmpty(this.queryInfo.comCode)) {
            this.queryInfo.comName = ''
          }
          break
        case 2:
          if (IsEmpty(this.queryInfo.comName)) {
            this.queryInfo.comCode = ''
          }
          break
        default:
          break
      }
    },
    baoxianChange (index) {
      switch (index) {
        case 1:
          if (IsEmpty(this.queryInfo.companyCode)) {
            this.queryInfo.companyName = ''
          }
          break
        case 2:
          if (IsEmpty(this.queryInfo.companyName)) {
            this.queryInfo.companyCode = ''
          }
          break
        default:
          break
      }
    },
    addDetailData () {
      // 数据从详情接口返回
      let temp = {
        comcomcode: this.detailDialogData.comCode,
        comcomname: this.detailDialogData.comName,
        firmcode: this.detailDialogData.firmCode,
        firmname: this.detailDialogData.firmName,
        // clientcode: this.detailDialogData.clientCode,
        // clientname: this.detailDialogData.clientName,
        // bankcode: this.detailDialogData.bankCode,
        // bankname: this.detailDialogData.bankName,
        businessCode: this.detailDialogData.businessCode,
        businessName: this.detailDialogData.businessName,
        taxpayerIden: this.detailDialogData.taxpayerIden,
        taxpayIdenAdd: this.detailDialogData.taxpayIdenAdd,
        taxpayIdenNo: this.detailDialogData.taxpayIdenNo,
        taxpayIdenPhone: this.detailDialogData.taxpayIdenPhone,
        taxpayIdenBank: this.detailDialogData.taxpayIdenBank,
        taxpayIdenBankAcc: this.detailDialogData.taxpayIdenBankAcc
      }
      let temp1 = {
        type: '',
        spsl: '6',
        allhandCal1: 0,
        allhandCal2: 0,
        shuiCal1: 0,
        shuiCal2: 0,
        priceCal1: 0,
        priceCal2: 0,
        aftershuiCal1: 0,
        aftershuiCal2: 0,
        afterpriceCal1: 0,
        afterpriceCal2: 0
      }
      let temp2 = this.kaipInfo
      let temp3 = this.kaipiaoInputData
      temp2.push(temp)
      temp3.push(temp1)
      this.kaipInfo = temp2
      this.kaipiaoInputData = temp3
      console.log(this.kaipInfo)
    },
    delDetailData (index) {
      let temp2 = this.kaipInfo
      let temp3 = this.kaipiaoInputData
      temp2.splice(index, 1)
      temp3.splice(index, 1)
      this.kaipInfo = temp2
      this.kaipiaoInputData = temp3
    },
    initshuangjiDialog () {
      this.companyQueryInfo = {
        type: '1',
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
    handleSizeChange (val) {
      this.queryInfo.currentPage = 1
      this.queryInfo.pageSize = val
      this.queryData()
    },
    handleSizeChange1 (val) {
      this.nashuirenInfo.pageSize = val
      this.nashuirenInfo.currentPage = 1
      this.openComDialog(2, this.nashuirenIndex)
    },
    handleSizeChange2 (val) {
      this.orgQueryInfo.pageSize = val
      this.orgQueryInfo.currentPage = 1
      this.openComDialog(3, this.nashuirenIndex)
    },
    handleSizeChange3 (val) {
      this.gongsiduanInfo.pageSize = val
      this.gongsiduanInfo.currentPage = 1
      this.openComDialog(4, this.nashuirenIndex)
    },
    handleSizeChange4 (val) {
      this.kehuduanInfo.pageSize = val
      this.kehuduanInfo.currentPage = 1
      this.openComDialog(5, this.nashuirenIndex)
    },
    handleSizeChange5 (val) {
      this.yinhangduanInfo.pageSize = val
      this.yinhangduanInfo.currentPage = 1
      this.openComDialog(6, this.nashuirenIndex)
    },
    getDetailExamine (data) {
      if (data.verifyStatus === '审核通过') {
        if ((data.companyCode === '00086' || data.companyName === '天安财产保险股份有限公司') && (data.comCode === 'BY0142' || data.comName === '天安佰盈保险销售有限公司吉林分公司')) {
          this.theTaxCom = false
        } else {
          this.theTaxCom = true
        }
        this.chargeType = data.chargeType
        this.getDuizhangdanDetail(data.batchNo)
      } else {
        this.openToast('warning', '该对账单未提交财务审核')
      }
    },
    comDialogClosing (index) {
      this.initshuangjiDialog()
      this.comDialog = false
      this.comDialog1 = false
      switch (index) {
        case 0:
          this.queryInfo.companyCode = ''
          this.queryInfo.companyName = ''
          break
        case 1:
          this.queryInfo.comCode = ''
          this.queryInfo.comName = ''
          break
        default:
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
    calHandCal (index, handCalIndex) {
      switch (this.kaipiaoInputData[index].spsl) {
        case '0':
          switch (handCalIndex) {
            case 1:
              this.kaipiaoInputData[index].priceCal1 = (Math.round(this.kaipiaoInputData[index].allhandCal1 * 100) / 100).toFixed(2)
              this.kaipiaoInputData[index].shuiCal1 = 0.00
              break
            case 2:
              this.kaipiaoInputData[index].priceCal2 = (Math.round(this.kaipiaoInputData[index].allhandCal2 * 100) / 100).toFixed(2)
              this.kaipiaoInputData[index].shuiCal2 = 0.00
              break
            default:
              break
          }
          break
        case '3':
          switch (handCalIndex) {
            case 1:
              this.kaipiaoInputData[index].priceCal1 = (Math.round(this.kaipiaoInputData[index].allhandCal1 * 100) / 103).toFixed(2)
              this.kaipiaoInputData[index].shuiCal1 = (this.kaipiaoInputData[index].allhandCal1 - this.kaipiaoInputData[index].priceCal1).toFixed(2)
              break
            case 2:
              this.kaipiaoInputData[index].priceCal2 = (Math.round(this.kaipiaoInputData[index].allhandCal2 * 100) / 103).toFixed(2)
              this.kaipiaoInputData[index].shuiCal2 = (this.kaipiaoInputData[index].allhandCal2 - this.kaipiaoInputData[index].priceCal2).toFixed(2)
              break
            default:
              break
          }
          break
        case '6':
          switch (handCalIndex) {
            case 1:
              this.kaipiaoInputData[index].priceCal1 = (Math.round(this.kaipiaoInputData[index].allhandCal1 * 100) / 106).toFixed(2)
              this.kaipiaoInputData[index].shuiCal1 = (this.kaipiaoInputData[index].allhandCal1 - this.kaipiaoInputData[index].priceCal1).toFixed(2)
              break
            case 2:
              this.kaipiaoInputData[index].priceCal2 = (Math.round(this.kaipiaoInputData[index].allhandCal2 * 100) / 106).toFixed(2)
              this.kaipiaoInputData[index].shuiCal2 = (this.kaipiaoInputData[index].allhandCal2 - this.kaipiaoInputData[index].priceCal2).toFixed(2)
              break
            default:
              break
          }
          break
        default:
          break
      }
    },
    closeDetailDialog () {
      this.detailDialogVis = false
      this.kaipiaoTableData = []
      this.kaipiaoInputData = []
      this.kaipInfo = []
    },
    shenhepass () {
      let temp = {}
      let tempArr = []
      temp['batchNo'] = this.duizhangdanNo
      for (let i = 0; i < this.kaipiaoInputData.length; i++) {
        let tempJson = {}
        tempJson['type'] = this.kaipiaoInputData[i].type
        tempJson['companycode'] = this.detailDialogData.companyCode
        tempJson['companyname'] = this.detailDialogData.companyName
        tempJson['companycomcode'] = this.detailDialogData.companyComCode
        tempJson['companycomname'] = this.detailDialogData.companyComName
        tempJson['comcomcode'] = this.kaipInfo[i].comcomcode
        tempJson['comcomname'] = this.kaipInfo[i].comcomname
        tempJson['firmCode'] = this.kaipInfo[i].firmcode
        tempJson['firmName'] = this.kaipInfo[i].firmname
        // tempJson['clientCode'] = this.kaipInfo[i].clientcode
        // tempJson['clientName'] = this.kaipInfo[i].clientname
        // tempJson['bankCode'] = this.kaipInfo[i].bankcode
        // tempJson['bankName'] = this.kaipInfo[i].bankname
        tempJson['taxpayerIden'] = this.kaipInfo[i].taxpayerIden
        tempJson['businessCode'] = this.kaipInfo[i].businessCode
        tempJson['businessName'] = this.kaipInfo[i].businessName
        tempJson['taxpayIdenAdd'] = this.kaipInfo[i].taxpayIdenAdd
        tempJson['taxpayIdenNo'] = this.kaipInfo[i].taxpayIdenNo
        tempJson['taxpayIdenPhone'] = this.kaipInfo[i].taxpayIdenPhone
        tempJson['taxpayIdenBank'] = this.kaipInfo[i].taxpayIdenBank
        tempJson['taxpayIdenBankAcc'] = this.kaipInfo[i].taxpayIdenBankAcc
        tempJson['spsl'] = this.kaipiaoInputData[i].spsl
        tempJson['sjhj1'] = this.kaipiaoInputData[i].allhandCal1
        tempJson['jkwctz1'] = this.kaipiaoInputData[i].afterpriceCal1
        tempJson['skwctz1'] = this.kaipiaoInputData[i].aftershuiCal1
        tempJson['sjhj2'] = this.kaipiaoInputData[i].allhandCal2
        tempJson['jkwctz2'] = this.kaipiaoInputData[i].afterpriceCal2
        tempJson['skwctz2'] = this.kaipiaoInputData[i].aftershuiCal2
        tempArr.push(tempJson)
      }
      temp['propertyChargeInvoicerateVO'] = tempArr
      if (this.detailDialogData.status === '财务复核通过') {
        this.openToast('warning', '该对账单已经复核通过，不允许审核通过！')
      } else if (this.detailDialogData.status === '财务审核通过') {
        this.openToast('warning', '该条记录已被审核通过，不允许审核通过！')
      } else {
        this.Loading()
        api('/propertyCharge/propertyChargePoundageReconUpdateRevamp', 'post', temp).then((res) => {
          console.log(res)
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
    fuhepass () {
      if (this.detailDialogData.status === '财务复核通过') {
        this.openToast('warning', '该对账单已经复核通过，不允许复核通过！')
      } else if (this.detailDialogData.status === '财务未审核') {
        this.openToast('warning', '该条记录财务未审核不能进行复核')
      } else {
        this.Loading()
        let temp = {}
        temp['reconno'] = this.duizhangdanNo
        if (this.chargeType === 1 || this.chargeType === '1' || IsEmpty(this.chargeType)) {
          api('/propertyCharge/propertyChargePoundageReconUpdate', 'post', temp).then((res) => {
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
          api('/propertyCharge/newPropertyChargePoundageReconUpdate', 'post', temp).then((res) => {
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
    shenheNopass () {
      if (this.detailDialogData.status === '财务复核通过') {
        this.openToast('warning', '该对账单已经复核通过，不允许审核不通过！')
      } else if (this.detailDialogData.status === '财务审核通过') {
        this.openToast('warning', '该对账单已经审核通过，不允许审核不通过！')
      } else {
        this.Loading()
        let temp = {}
        temp['reconno'] = this.duizhangdanNo
        if (this.chargeType === 1 || this.chargeType === '1' || IsEmpty(this.chargeType)) {
          api('/propertyCharge/propertyChargePoundageReconDelectRevamp', 'post', temp).then((res) => {
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
          api('/propertyCharge/newPropertyChargePoundageReconDelectRevamp', 'post', temp).then((res) => {
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
    fuheNopass () {
      if (this.detailDialogData.status === '财务复核通过') {
        this.openToast('warning', '该对账单已经复核通过，不允许复核不通过！')
      } else if (this.detailDialogData.status === '财务未审核') {
        this.openToast('warning', '该条记录财务未审核不能进行复核')
      } else {
        this.Loading()
        let temp = {}
        temp['reconno'] = this.duizhangdanNo
        if (this.chargeType === 1 || this.chargeType === '1' || IsEmpty(this.chargeType)) {
          api('/propertyCharge/propertyChargePoundageReconDelect', 'post', temp).then((res) => {
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
          api('/propertyCharge/newPropertyChargePoundageReconDelect', 'post', temp).then((res) => {
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
      window.open(`/tabycore/propertyCharge/downloadPropertyChargeImportRecord?reconno=${this.duizhangdanNo}`)
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
    kaipiaoInfoExport () {
      // 开票信息导出
      window.open(`/tabycore/propertyCharge/downloadPropertyChargeInvoice?reconno=${this.duizhangdanNo}`)
    },
    errorInfoExport () {
      // 错误信息导出
      window.open(`/tabycore/propertyCharge/inportInvoiceError?reconno=${this.duizhangdanNo}`)
    },
    newshenhepass () {
      if (this.detailDialogData.status === '财务复核通过') {
        this.openToast('warning', '该对账单已经复核通过，不允许审核通过！')
      } else if (this.detailDialogData.status === '财务审核通过') {
        this.openToast('warning', '该条记录已被审核通过，不允许审核通过！')
      } else {
        this.Loading()
        this.detailDialogData1['reconno'] = this.duizhangdanNo
        api('/propertyCharge/newPropertyChargePoundageReconUpdateRevamp', 'post', this.detailDialogData1).then((res) => {
          console.log(res)
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
    dialogBackData (data) {
      this.initshuangjiDialog()
      this.comDialog = false
      let temp = []
      temp = data.split('-')
      this.queryInfo.companyCode = temp[0]
      this.queryInfo.companyName = temp[1]
    },
    dialogBackData1 (data) {
      this.initshuangjiDialog()
      this.comDialog1 = false
      let temp = []
      temp = data.split('-')
      this.queryInfo.comCode = temp[0]
      this.queryInfo.comName = temp[1]
    },
    handleCurrentChange (val) {
      this.queryInfo.currentPage = val
      this.queryData()
    },
    handleCurrentChange1 (val) {
      this.nashuirenInfo.currentPage = val
      this.openComDialog(2, this.nashuirenIndex)
    },
    handleCurrentChange2 (val) {
      this.orgQueryInfo.currentPage = val
      this.openComDialog(3, this.nashuirenIndex)
    },
    handleCurrentChange3 (val) {
      this.gongsiduanInfo.currentPage = val
      this.openComDialog(4, this.nashuirenIndex)
    },
    handleCurrentChange4 (val) {
      this.kehuduanInfo.currentPage = val
      this.openComDialog(5, this.nashuirenIndex)
    },
    handleCurrentChange5 (val) {
      this.yinhangduanInfo.currentPage = val
      this.openComDialog(6, this.nashuirenIndex)
    },
    ...mapActions([
      'commissionConfigdblqueryCom1', 'commissionConfigdblqueryCom2', 'contiListCheckDialogDataGet1', 'contiListCheckDialogDataGet3', 'lifeInsureBillFinanceNashuiPeopleQuery', 'lifeInsureBillFinanceFirmQuery', 'lifeInsureBillFinanceClientQuery', 'lifeInsureBillFinanceBankQuery'
    ]),
    handleSelectionChange (val) {
      this.multipleSelection = val
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
        switch (temp.type) {
          case '1':
            temp.type = '手续费'
            break
          case '2':
            temp.type = '服务费'
            break
          case '3':
            temp.type = '其他经纪代理服务'
            break
          case '5':
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
        }
        return temp
      } else {
        return []
      }
    },
    kaipInfo1 () {
      let temp = this.kaipInfo
      for (let i = 0; i < temp.length; i++) {
        if (temp[i].ratepayercode === '0') {
          temp[i].ratepayercode = '增值税一般纳税人'
        } else {
          temp[i].ratepayercode = '增值税小规模纳税人'
        }
      }
      return temp
    }
  }
}
</script>

<style lang="scss" scoped type="text/css">
#orgadd {
  padding-left: 30px;
  padding-right: 30px;
}
.btn-container{
  text-align: center;
  margin-top: 60px;
  margin-bottom: 30px;
}
.center{
  text-align: center
}
.importResStyle{
  text-align: center;
  color: red;
  white-space: pre-wrap;
}
.ri-line{
  margin-top: 10px;
  margin-bottom: 10px;
}
.datestyle{
  color: #717171;
  font-size: 0.875rem;
  display: inline-block;
  width: 120px;
}
.datestyle1{
  color: #717171;
  font-size: 0.875rem;
  display: inline-block;
  text-align: center;
  width: 60px;
}
.el-pagination{
  float: right;
  padding-right: 50px;
}
.testInput{
  padding-right: 18px
}
.tableButton {
  cursor: pointer;
  color: #66B1FF;
}
</style>
