<template>
  <div id="orgManage">
    <ui-notice-bar slot="breadcast" >
      <el-breadcrumb slot="location" separator=">">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>公司管理</el-breadcrumb-item>
        <el-breadcrumb-item>佰盈机构管理</el-breadcrumb-item>
      </el-breadcrumb>
    </ui-notice-bar>
    <el-form style="margin-top: 20px; ">
      <el-row>
        <el-col :span="8">
          <el-form-item>
            <ui-label-text label="机构代码:" labelWidth="130" >
              <el-input slot="text" clearable v-model="condition.comCode" @dblclick.native="getInfo(1, 0, $event)"  @blur='blurCom(0, $event)'  placeholder="双击可选择"></el-input>
            </ui-label-text>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item>
            <ui-label-text label="机构名称:" labelWidth="130" >
              <el-input slot="text" clearable @dblclick.native="getInfo(1,0,$event)"  v-model="condition.comCName" placeholder="双击可选择" @blur='blurCom(0, $event)'  ></el-input>
            </ui-label-text>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item>
            <ui-label-text label="机构级别:" labelWidth="130" >
              <el-select v-model="condition.comLevel" size='mini'   slot="text" placeholder="请选择">
                <el-option label="全部" value=""></el-option>
                <el-option label="总公司" value="1"></el-option>
                <el-option label="省级分公司" value="2"></el-option>
                <el-option label="地市级分公司" value="3"></el-option>
              </el-select>
            </ui-label-text>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-form-item>
            <ui-label-text label="上级机构代码:" labelWidth="130" >
              <el-input slot="text" clearable @dblclick.native="getInfo(1,3,$event)"  v-model="condition.upperComcode" @blur='blurCom(3, $event)' placeholder="双击可选择"  ></el-input>
            </ui-label-text>
          </el-form-item>
        </el-col>
        <el-col :span="8">
            <ui-label-text label="上级机构名称:" labelWidth="130" >
              <el-input slot="text" clearable @blur='blurCom(3, $event)' @dblclick.native="getInfo(1,3,$event)" v-model="condition.upperComName" placeholder="双击可选择"  ></el-input>
            </ui-label-text>
        </el-col>
          <el-col :span="8">
            <ui-label-text label="审核状态:" labelWidth="130" >
              <el-select v-model="condition.verifyStatus" size='mini' slot="text" placeholder="请选择">
                <el-option label="待审核" value="9"></el-option>
                <el-option label="审核通过" value="1"></el-option>
                <el-option label="审核不通过" value="2"></el-option>
              </el-select>
            </ui-label-text>
          </el-col>
      </el-row>
      <div class='btn-container'>
        <el-button type="primary" :disabled="!limt.query" @click.native.prevent="searchOrgList(1)" class="searchBtn" >查询</el-button>
        <el-button type="primary" :disabled="!limt.add" @click.native.prevent="add">新增</el-button>
        <el-button type="primary" :disabled="!limt.modify" @click.native='modifyEdit' >修改</el-button>
        <el-button type="primary" :disabled="!limt.review" @click.native='goAudit' >审核</el-button>
        <el-button type="primary" :disabled="!limt.export" @click.native='outImport' >批量导出</el-button>
      </div>
    </el-form>
    <el-table stripe ref="multipleTable" :data="comTableData" tooltip-effect="dark" style="width: 100%" @selection-change="handleSelectionChange" v-if='isList' >
        <el-table-column type="selection" width="55">
        </el-table-column>
        <el-table-column prop="comCode" label="机构代码">
          <template slot-scope="scope">
            <a href="javascript:void(0)" @click.prevent="detailMsg(scope.row)">{{scope.row.comCode}}</a>
          </template>
        </el-table-column>
        <el-table-column prop="comCName" label="机构名称"></el-table-column>
        <el-table-column prop="comLevel" label="机构级别">
          <template slot-scope="scope">
            {{ scope.row.comLevel === '1' ?  '总公司': '' }}
            {{ scope.row.comLevel === '2' ?  '省级分公司': '' }}
            {{ scope.row.comLevel === '3' ?  '地市级分公司': '' }}
          </template>
        </el-table-column>
        <el-table-column prop="currentStatus" label="当前状态"></el-table-column>
        <!-- <el-table-column prop="validStatus" label="有效状态">
          <template slot-scope="scope">
            {{ scope.row.validStatus === '0' ?  '失效': '有效' }}
          </template>
        </el-table-column> -->
        <el-table-column prop="verifyStatus" label="审核状态">
          <template slot-scope="scope">
            {{ scope.row.verifyStatus === '9' ?  '待审核': '' }}
            {{ scope.row.verifyStatus === '1' ?  '审核通过': '' }}
            {{ scope.row.verifyStatus === '2' ?  '审核不通过': '' }}
          </template>
        </el-table-column>
        <el-table-column prop="verifyType" label="审核类型">
          <template slot-scope="scope">
            {{ scope.row.verifyType === '1' ?  '机构新增': '' }}
            {{ scope.row.verifyType === '2' ?  '机构修改': '' }}
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
              <el-button type="primary" v-if="scope.row.verifyStatus === '9' && scope.row.verifyType === '2' " size='mini' @click="detail(scope.row)">查看</el-button>
          </template>
        </el-table-column>
    </el-table>
    <div class="pagination" v-if='isPage'>
        <el-pagination @size-change="handleSizeChange" @current-change='handleCurrentChange' :current-page.sync="current"  :page-sizes="[5, 10, 20, 50]" :page-size='5' :pager-count='5' :total="totalRecords" layout="total, sizes, prev, pager, next, jumper" :page-count="totalPages"></el-pagination>
    </div>
    <!-- 机构详情 -->
    <el-dialog :append-to-body='true' center width='70%' title="机构详情"  :visible.sync="isDetail" >
      <el-form class="mesg_form">
        <ui-line-tittle :collapsible="true" >
          <span slot="title" >
              <i class="font_family icon-jy-menu-4" ></i>机构详情
          </span>
          <div class="ri-content" slot="content" >
            <el-row>
              <el-col :span="12">
                <el-form-item prop='comcode'>
                  <ui-label-text labelWidth="130" label="机构代码:" :text="detailData.comCode" ></ui-label-text>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item prop='comCName'>
                  <ui-label-text :required="true" labelWidth="130" label="机构名称:" >
                    <el-input clearable :disabled="true" v-model="detailData.comCName" slot="text" ></el-input>
                  </ui-label-text>
                </el-form-item>
              </el-col>
            </el-row>
           <el-row>
              <el-col :span="12">
                <el-form-item>
                  <ui-label-text   labelWidth="130" label="所属省份:" >
                    <el-input v-model="detailData.provinceName" :disabled="true" slot="text" ></el-input>
                  </ui-label-text>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item>
                  <ui-label-text  labelWidth="130" label="所属城市:" >
                    <el-input v-model="detailData.cityName" :disabled="true" slot="text" ></el-input>
                  </ui-label-text>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item prop="upperComcode">
                  <ui-label-text labelWidth="130" :required="true" label="上级机构代码:" >
                    <el-input :disabled="true" clearable v-model="detailData.upperComcode" slot="text" ></el-input>
                  </ui-label-text>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item prop="upperComname">
                  <ui-label-text :required="true" labelWidth="130" label="上级机构名称:" >
                    <el-input clearable :disabled="true" v-model="detailData.upperComname" slot="text" ></el-input>
                  </ui-label-text>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item prop="comLevel">
                  <ui-label-text labelWidth="130" :required="true" label="机构级别:" >
                    <el-select :disabled="true" v-model="detailData.comLevel"  slot="text" placeholder="请选择">
                      <el-option label="总公司" value="1"></el-option>
                      <el-option label="省级分公司" value="2"></el-option>
                      <el-option label="地市级分公司" value="3"></el-option>
                    </el-select>
                  </ui-label-text>
                </el-form-item>
              </el-col>
            <el-col :span="12">
                <el-form-item >
                  <ui-label-text labelWidth="130" :required="true" label="设立日期:" >
                    <el-date-picker :disabled="true" value-format="yyyy-MM-dd"  v-model="detailData.foundDate" slot="text" type="date" placeholder="选择日期"></el-date-picker>
                  </ui-label-text>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item >
                  <ui-label-text labelWidth="130" label="关闭日期:" >
                   <el-date-picker :disabled="true" value-format="yyyy-MM-dd"  v-model="detailData.closeDate" slot="text" type="date" placeholder="选择日期"></el-date-picker>
                  </ui-label-text>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item >
                  <ui-label-text :required="true"  labelWidth="130" label="当前状态:" >
                   <el-select :disabled="true" v-model="detailData.currentStatus"  slot="text" placeholder="请选择">
                      <el-option label="存续" value="存续"></el-option>
                      <el-option label="关闭注销" value="关闭注销"></el-option>
                    </el-select>
                  </ui-label-text>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item prop="basiclLawId">
                  <ui-label-text :required="true" labelWidth="130" label="财富基本法:" >
                    <el-input clearable :disabled="true" v-model="detailData.basiclLawId" slot="text" ></el-input>
                  </ui-label-text>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item prop="basicLawXxdlId">
                  <ui-label-text :required="true" labelWidth="130" label="线下代理人基本法:" >
                    <el-input clearable :disabled="true" v-model="detailData.basicLawXxdlId" slot="text" ></el-input>
                  </ui-label-text>
                </el-form-item>
              </el-col>

            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item prop="basiclLawId">
                  <ui-label-text :required="true" labelWidth="130" label="同道基本法:" >
                    <el-input clearable :disabled="true" v-model="detailData.basicLawTdId" slot="text" ></el-input>
                  </ui-label-text>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item prop="basicLawXxdlId">
                  <ui-label-text :required="true" labelWidth="130" label="银保人员基本法:" >
                    <el-input clearable :disabled="true" v-model="detailData.basicLawYbId" slot="text" ></el-input>
                  </ui-label-text>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item>
                  <ui-label-text labelWidth="130" label="备注:" >
                    <el-input type="textarea" autosize :disabled="true" v-model="detailData.remark" slot="text" ></el-input>
                  </ui-label-text>
                </el-form-item>
              </el-col>
            </el-row>
          </div>
        </ui-line-tittle>
        <ui-line-tittle>
          <span slot="title" >
              <i class="font_family icon-jy-menu-4" ></i>营改增信息
          </span>
          <div class="ri-content" slot="content" >
            <el-row>
              <el-col :span="12">
                <el-form-item>
                  <ui-label-text labelWidth="130" label="纳税人身份:" >
                    <el-select :disabled="true" v-model="detailData.taxpayerIden" slot="text" placeholder="请选择">
                      <el-option label="增值税一般纳税人" value="1"></el-option>
                      <el-option label="增值税小规模纳税人" value="2"></el-option>
                      <el-option label="非独立纳税人" value="3"></el-option>
                    </el-select>
                  </ui-label-text>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item>
                  <ui-label-text labelWidth="130" label="适用税率:" >
                    <el-select :disabled="true" v-model="detailData.appliTaxRate" slot="text" placeholder="请选择">
                      <el-option label="3%" value="3"></el-option>
                      <el-option label="6%" value="6"></el-option>
                    </el-select>
                  </ui-label-text>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item>
                  <ui-label-text labelWidth="130" label="纳税人识别号:" >
                    <el-input :disabled="true" clearable v-model="detailData.taxpayIdenNo" slot="text" ></el-input>
                  </ui-label-text>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item>
                  <ui-label-text labelWidth="130" label="纳税人地址:" >
                    <el-input :disabled="true" clearable v-model="detailData.taxpayIdenAdd" slot="text" ></el-input>
                  </ui-label-text>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item>
                  <ui-label-text labelWidth="130" label="纳税人电话:" >
                    <el-input :disabled="true" clearable v-model="detailData.taxpayIdenPhone" slot="text" ></el-input>
                  </ui-label-text>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item>
                  <ui-label-text labelWidth="130" label="纳税人开户行:" >
                    <el-input :disabled="true" clearable v-model="detailData.taxpayIdenBank" slot="text" ></el-input>
                  </ui-label-text>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item>
                  <ui-label-text labelWidth="130" label="纳税人银行卡号:" >
                    <el-input :disabled="true" clearable v-model="detailData.taxpayIdenBankAcc" slot="text" ></el-input>
                  </ui-label-text>
                </el-form-item>
              </el-col>
            </el-row>
          </div>
        </ui-line-tittle>
      </el-form>
    </el-dialog>
    <!-- 新增机构 -->
    <el-dialog :append-to-body='true' center width='70%' :before-close = "cleanContent" title="新增机构"  :visible.sync="isAdd" >
      <el-form class="mesg_form add_form orgManage_module" :rules="ruleAdd" :model="conditions" ref="conditions">
        <ui-line-tittle :collapsible="true" >
          <span slot="title" >
              <i class="font_family icon-jy-menu-4" ></i>机构新增
          </span>
          <div class="ri-content" slot="content" >
            <el-row>
              <el-col :span="12">
                <el-form-item prop='comcode'>
                  <ui-label-text labelWidth="130"  label="机构代码:" text="系统自动编码" ></ui-label-text>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item prop='comCName'>
                  <ui-label-text :required="true" labelWidth="130" label="机构名称:" >
                    <el-input clearable v-model="conditions.comCName" slot="text" ></el-input>
                  </ui-label-text>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item prop='provinceName'>
                  <ui-label-text :required="true"  labelWidth="130" label="所属省份:" >
                    <el-autocomplete v-model="conditions.provinceName" @focus="focusInput(0)" slot="text" :fetch-suggestions="querySearchAsync"  placeholder="请输入内容"  @select="handleProSelect" >
                      <template slot-scope="{ item }">
                        <span class="code">{{ item.configSetValueCode }}</span>-
                        <span class="name">{{ item.configSetValueName }}</span>
                      </template>
                    </el-autocomplete>
                  </ui-label-text>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item prop='cityName'>
                  <ui-label-text :required="true"  labelWidth="130" label="所属城市:" >
                    <el-autocomplete  v-model="conditions.cityName" slot="text" :fetch-suggestions="querySearchCity"  placeholder="请输入内容"  @select="handleCitySelect" >
                      <template slot-scope="{ item }">
                        <span class="code">{{ item.configSetValueCode }}</span>-
                        <span class="name">{{ item.configSetValueName }}</span>
                      </template>
                    </el-autocomplete>
                  </ui-label-text>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item prop="upperComcode">
                  <ui-label-text labelWidth="130" :required="true" label="上级机构代码:" >
                    <el-input clearable @blur='blurCom(1, $event)' placeholder="双击可选择" v-model="conditions.upperComcode"  @dblclick.native="getInfo(1, 1, $event)" slot="text" ></el-input>
                  </ui-label-text>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item prop="upperComName">
                  <ui-label-text :required="true" labelWidth="130" label="上级机构名称:">
                    <el-input clearable @blur='blurCom(1, $event)' placeholder="双击可选择" v-model="conditions.upperComName"  @dblclick.native="getInfo(1, 1, $event)" slot="text" ></el-input>
                  </ui-label-text>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item prop="comLevel">
                  <ui-label-text labelWidth="130" :required="true" label="机构级别:" >
                    <el-select v-model="conditions.comLevel"  slot="text" placeholder="请选择">
                      <el-option label="总公司" value="1"></el-option>
                      <el-option label="省级分公司" value="2"></el-option>
                      <el-option label="地市级分公司" value="3"></el-option>
                    </el-select>
                  </ui-label-text>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item prop="foundDate">
                  <ui-label-text labelWidth="130" :required="true" label="设立日期:" >
                   <el-date-picker  value-format="yyyy-MM-dd"  v-model="conditions.foundDate" slot="text" type="date" placeholder="选择日期"></el-date-picker>
                  </ui-label-text>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item >
                  <ui-label-text labelWidth="130" label="关闭日期:" >
                   <el-date-picker  value-format="yyyy-MM-dd"  v-model="conditions.closeDate" slot="text" type="date" placeholder="选择日期"></el-date-picker>
                  </ui-label-text>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item prop="currentStatus">
                  <ui-label-text :required="true" labelWidth="130" label="当前状态:" >
                   <el-select v-model="conditions.currentStatus"  slot="text" placeholder="请选择">
                      <el-option label="存续" value="存续"></el-option>
                      <el-option label="关闭注销" value="关闭注销"></el-option>
                    </el-select>
                  </ui-label-text>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item>
                  <ui-label-text labelWidth="130" label="备注:" >
                    <el-input type="textarea" autosize  v-model="conditions.remark" slot="text" ></el-input>
                  </ui-label-text>
                </el-form-item>
              </el-col>
            </el-row>
          </div>
        </ui-line-tittle>
        <ui-line-tittle :collapsible="true" >
          <span slot="title" >
              <i class="font_family icon-jy-menu-4" ></i>营改增信息
          </span>
          <div class="ri-content" slot="content" >
            <el-row>
              <el-col :span="12">
                <el-form-item>
                  <ui-label-text labelWidth="130" label="纳税人身份:" >
                    <el-select v-model="conditions.taxpayerIden" slot="text" placeholder="请选择">
                      <el-option label="增值税一般纳税人" value="1"></el-option>
                      <el-option label="增值税小规模纳税人" value="2"></el-option>
                      <el-option label="非独立纳税人" value="3"></el-option>
                    </el-select>
                  </ui-label-text>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item>
                  <ui-label-text labelWidth="130" label="适用税率:" >
                    <el-select v-model="conditions.appliTaxRate" slot="text" placeholder="请选择">
                      <el-option label="3%" value="3"></el-option>
                      <el-option label="6%" value="6"></el-option>
                    </el-select>
                  </ui-label-text>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item>
                  <ui-label-text labelWidth="130" label="纳税人识别号:" >
                    <el-input clearable v-model="conditions.taxpayIdenNo" slot="text" ></el-input>
                  </ui-label-text>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item>
                  <ui-label-text labelWidth="130" label="纳税人地址:" >
                    <el-input clearable v-model="conditions.taxpayIdenAdd" slot="text" ></el-input>
                  </ui-label-text>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item>
                  <ui-label-text labelWidth="130" label="纳税人电话:" >
                    <el-input clearable v-model="conditions.taxpayIdenPhone" slot="text" ></el-input>
                  </ui-label-text>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item>
                  <ui-label-text labelWidth="130" label="纳税人开户行:" >
                    <el-input clearable v-model="conditions.taxpayIdenBank" slot="text" ></el-input>
                  </ui-label-text>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item>
                  <ui-label-text labelWidth="130" label="纳税人银行卡号:" >
                    <el-input clearable v-model="conditions.taxpayIdenBankAcc" slot="text" ></el-input>
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
    <!-- 修改机构 -->
    <el-dialog class='orgManage_module' :append-to-body='true' center width='70%' title="机构修改"  :visible.sync="isModify" >
      <el-form class="mesg_form add_form" :rules="ruleMod" :model="modifyList" ref="modifyList">
        <ui-line-tittle :collapsible="true" >
          <span slot="title" >
              <i class="font_family icon-jy-menu-4" ></i>机构修改
          </span>
          <div class="ri-content" slot="content" >
            <el-row>
              <el-col :span="12">
                <el-form-item prop='comcode'>
                  <ui-label-text labelWidth="130" label="机构代码:" :text="modifyList.comCode" ></ui-label-text>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item prop='comCName'>
                  <ui-label-text :required="true" labelWidth="130" label="机构名称:" >
                    <el-input clearable v-model="modifyList.comCName" slot="text" ></el-input>
                  </ui-label-text>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item prop='provinceName'>
                  <ui-label-text :required="true"  labelWidth="130" label="所属省份:" >
                    <el-autocomplete :disabled="true" v-model="modifyList.provinceName" slot="text" :fetch-suggestions="querySearchAsync" @clear='clearInput(1, 0)'  placeholder="请输入内容"  @select="handleProSelect_mod" >
                      <template slot-scope="{ item }">
                        <span class="code">{{ item.configSetValueCode }}</span>-
                        <span class="name">{{ item.configSetValueName }}</span>
                      </template>
                    </el-autocomplete>
                  </ui-label-text>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item prop='cityName'>
                  <ui-label-text :required="true"  labelWidth="130" label="所属城市:" >
                    <el-autocomplete :disabled="true" v-model="modifyList.cityName" slot="text" :fetch-suggestions="querySearchCity"  placeholder="请输入内容"  @select="handleCitySelect_mod" >
                      <template slot-scope="{ item }">
                        <span class="code">{{ item.configSetValueCode }}</span>-
                        <span class="name">{{ item.configSetValueName }}</span>
                      </template>
                    </el-autocomplete>
                  </ui-label-text>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item prop="upperComcode">
                  <ui-label-text labelWidth="130" :required="true" label="上级机构代码:" >
                    <el-input clearable @blur='blurCom(2, $event)' placeholder="双击可选择" v-model="modifyList.upperComcode"  @dblclick.native="getInfo(1, 2, $event)" slot="text" ></el-input>
                  </ui-label-text>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item prop="upperComname">
                  <ui-label-text :required="true" labelWidth="130" label="上级机构名称:" >
                    <el-input clearable @blur='blurCom(2, $event)' placeholder="双击可选择" v-model="modifyList.upperComname"  @dblclick.native="getInfo(1, 2, $event)" slot="text" ></el-input>
                  </ui-label-text>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item prop="comLevel">
                  <ui-label-text labelWidth="130" :required="true" label="机构级别:" >
                    <el-select v-model="modifyList.comLevel"  slot="text" placeholder="请选择">
                      <el-option label="总公司" value="1"></el-option>
                      <el-option label="省级分公司" value="2"></el-option>
                      <el-option label="地市级分公司" value="3"></el-option>
                    </el-select>
                  </ui-label-text>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item prop="foundDate">
                  <ui-label-text labelWidth="130" :required="true" label="设立日期:" >
                    <el-date-picker  value-format="yyyy-MM-dd"  v-model="modifyList.foundDate" slot="text" type="date" placeholder="选择日期"></el-date-picker>
                  </ui-label-text>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item >
                  <ui-label-text labelWidth="130" label="关闭日期:" >
                   <el-date-picker  value-format="yyyy-MM-dd"  v-model="modifyList.closeDate" slot="text" type="date" placeholder="选择日期"></el-date-picker>
                  </ui-label-text>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item prop="currentStatus">
                  <ui-label-text :required="true" labelWidth="130" label="当前状态:" >
                   <el-select v-model="modifyList.currentStatus"  slot="text" placeholder="请选择">
                      <el-option label="存续" value="存续"></el-option>
                      <el-option label="关闭注销" value="关闭注销"></el-option>
                    </el-select>
                  </ui-label-text>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item prop="basiclLawId">
                  <ui-label-text :required="true" labelWidth="130" label="财富基本法:" >
                    <el-input clearable :disabled="true" v-model="modifyList.basiclLawId" slot="text" ></el-input>
                  </ui-label-text>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item prop="basicLawXxdlId">
                  <ui-label-text :required="true" labelWidth="130" label="线下代理人基本法:" >
                    <el-input clearable :disabled="true" v-model="modifyList.basicLawXxdlId" slot="text" ></el-input>
                  </ui-label-text>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item prop="basiclLawId">
                  <ui-label-text :required="true" labelWidth="130" label="同道基本法:" >
                    <el-input clearable :disabled="true" v-model="modifyList.basicLawTdId" slot="text" ></el-input>
                  </ui-label-text>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item prop="basicLawXxdlId">
                  <ui-label-text :required="true" labelWidth="130" label="银保人员基本法:" >
                    <el-input clearable :disabled="true" v-model="modifyList.basicLawYbId" slot="text" ></el-input>
                  </ui-label-text>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item>
                  <ui-label-text labelWidth="130" label="备注:" >
                    <el-input type="textarea" autosize v-model="modifyList.remark" slot="text" ></el-input>
                  </ui-label-text>
                </el-form-item>
              </el-col>
            </el-row>
          </div>
        </ui-line-tittle>
        <ui-line-tittle :collapsible="true" >
          <span slot="title" >
              <i class="font_family icon-jy-menu-4" ></i>营改增信息
          </span>
          <div class="ri-content" slot="content" >
            <el-row>
              <el-col :span="12">
                <el-form-item>
                  <ui-label-text labelWidth="130" label="纳税人身份:" >
                    <el-select v-model="modifyList.taxpayerIden" slot="text" placeholder="请选择">
                      <el-option label="增值税一般纳税人" value="1"></el-option>
                      <el-option label="增值税小规模纳税人" value="2"></el-option>
                      <el-option label="非独立纳税人" value="3"></el-option>
                    </el-select>
                  </ui-label-text>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item>
                  <ui-label-text labelWidth="130" label="适用税率:" >
                    <el-select v-model="modifyList.appliTaxRate" slot="text" placeholder="请选择">
                      <el-option label="3%" value="3"></el-option>
                      <el-option label="6%" value="6"></el-option>
                    </el-select>
                  </ui-label-text>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item>
                  <ui-label-text labelWidth="130" label="纳税人识别号:" >
                    <el-input clearable v-model="modifyList.taxpayIdenNo" slot="text" ></el-input>
                  </ui-label-text>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item>
                  <ui-label-text labelWidth="130" label="纳税人地址:" >
                    <el-input clearable v-model="modifyList.taxpayIdenAdd" slot="text" ></el-input>
                  </ui-label-text>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item>
                  <ui-label-text labelWidth="130" label="纳税人电话:" >
                    <el-input clearable v-model="modifyList.taxpayIdenPhone" slot="text" ></el-input>
                  </ui-label-text>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item>
                  <ui-label-text labelWidth="130" label="纳税人开户行:" >
                    <el-input clearable v-model="modifyList.taxpayIdenBank" slot="text" ></el-input>
                  </ui-label-text>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item>
                  <ui-label-text labelWidth="130" label="纳税人银行卡号:" >
                    <el-input clearable v-model="modifyList.taxpayIdenBankAcc" slot="text" ></el-input>
                  </ui-label-text>
                </el-form-item>
              </el-col>
            </el-row>
          </div>
        </ui-line-tittle>
      </el-form>
      <div class="operationBtn">
          <el-button type="primary"  @click.native.prevent="modifyListPost">提交</el-button>
      </div>
    </el-dialog>
    <!-- 获取机构 -->
    <el-dialog title="机构" :before-close='orgClose' :append-to-body='true' :visible.sync="show_dialog" width="50%" center>
      <el-table stripe @row-click='selectRow' ref="multipleTable" :data="orgTableData" v-if='isOrg' >
        <el-table-column prop="comCode" label="机构代码" center ></el-table-column>
        <el-table-column prop="comCName" label="机构代码名称" center ></el-table-column>
      </el-table>
      <div class="pagination" v-if='isOrg'>
        <el-pagination @size-change="orgSizeChange" small @current-change='orgCurrentChange' :page-sizes="sizelist" :current-page.sync="currentD" :page-count="totalPageD" layout="total, sizes, prev, pager, next, jumper" :total="totalRecordD" :page-size="5"> </el-pagination>
      </div>
    </el-dialog>
    <!-- 审核弹框 -->
    <el-dialog title="佰盈机构审核" :before-close='auditClose' :append-to-body='true' center :visible.sync="audit_dialog">
      <ui-line-tittle :collapsible="true" >
        <span slot="title" >
            <i class="font_family icon-jy-menu-4" ></i>佰盈机构审核
        </span>
        <div class="ri-content" slot="content" >
          <el-form :model="auditResult">
            <el-form-item label="审核结果:">
              <el-radio v-model="auditResult.verifyStatus" label="1">审核通过</el-radio>
              <el-radio v-model="auditResult.verifyStatus" label="2">审核不通过</el-radio>
            </el-form-item>
            <el-form-item label="审核意见:">
              <el-input type="textarea"  :rows='5' style="width: 85%; "  v-model="auditResult.reviews" ></el-input>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer" style="text-align: center; ">
            <el-button @click="audit_dialog = false">返 回</el-button>
            <el-button type="primary" @click="auditItem">审 核</el-button>
          </div>
        </div>
      </ui-line-tittle>
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
      ruleAdd: {
        comCName: [
          { required: true, message: '请输入机构名称', trigger: 'change' }
        ],
        upperComcode: [
          { required: true, message: '请输入上级机构代码', trigger: 'change' }
        ],
        upperComName: [
          { required: true, message: '请输入上级机构名称', trigger: 'change' }
        ],
        provinceName: [
          { required: true, message: '请输入省份', trigger: 'change' }
        ],
        cityName: [
          { required: true, message: '请输入城市', trigger: 'change' }
        ],
        comLevel: [
          { required: true, message: '请输入机构级别', trigger: 'change' }
        ],
        foundDate: [
          { required: true, message: '请输入设立时间', trigger: 'change' }
        ],
        basiclLawId: [
          { required: true, message: '请输入财富基本法', trigger: 'change' }
        ],
        basicLawXxdlId: [
          {
            required: true,
            message: '请输入线下代理人基本法',
            trigger: 'change'
          }
        ],
        currentStatus: [
          { required: true, message: '请输入当前状态', trigger: 'change' }
        ]
      },
      ruleMod: {
        comCName: [
          { required: true, message: '请输入机构名称', trigger: 'change' }
        ],
        upperComcode: [
          { required: true, message: '请输入上级机构代码', trigger: 'change' }
        ],
        upperComname: [
          { required: true, message: '请输入上级机构名称', trigger: 'change' }
        ],
        provinceName: [
          { required: true, message: '请输入省份', trigger: 'change' }
        ],
        cityName: [
          { required: true, message: '请输入城市', trigger: 'change' }
        ],
        comLevel: [
          { required: true, message: '请输入机构级别', trigger: 'change' }
        ],
        basiclLawId: [
          { required: true, message: '请输入财富基本法', trigger: 'change' }
        ],
        foundDate: [
          { required: true, message: '请输入设立时间', trigger: 'change' }
        ],
        basicLawXxdlId: [
          {
            required: true,
            message: '请输入线下代理人基本法',
            trigger: 'change'
          }
        ],
        validStatus: [
          { required: true, message: '请输入有效状态', trigger: 'change' }
        ],
        currentStatus: [
          { required: true, message: '请输入当前状态', trigger: 'change' }
        ]
      },
      audit_dialog: false, // 显示审核弹框
      auditData: [], // 选中的审核数据
      auditResult: {}, // 审核
      isOrg: false,
      orgTableData: [],
      condition: {
        current: 1,
        comCode: '',
        comCName: '',
        upperComcode: '',
        upperComName: '',
        comLevel: '',
        verifyStatus: '1',
        verifyType: ''
      }, // 查询条件
      show_dialog: false, // 显示搜索弹框
      isPage: false, // 是否显示分页
      isList: false, // 显示查询结果
      totalRecords: 0, // 分页总条数
      totalPages: 0, // 分页总页数
      current: 1,
      pageSize: '5', // 当前显示条数
      totalRecordD: 0, // 分页总条数
      totalPageD: 0, // 分页总页数
      currentD: 1,
      pageSizeD: 5,
      sizelist: [],
      comTableData: [],
      info: [],
      isModify: false,
      isAdd: false, // 是否新增
      conditions: {
        // 添加机构信息
        comCode: '',
        comCName: '',
        province: '',
        upperComName: '',
        upperComcode: '',
        comLevel: '',
        basiclLawId: '',
        basicLawXxdlId: '',
        provinceName: '',
        cityName: '',
        appliTaxRate: ''
      },
      provinceName: '',
      provinceCode: '',
      cityCode: '',
      cityName: '',
      postData: {},
      proSearch: [],
      citySearch: [],
      modifyList: {
        // 修改提交信息
        comCode: '',
        comCName: '',
        province: '',
        upperComname: '',
        upperComcode: '',
        comLevel: '',
        basiclLawId: '',
        basicLawXxdlId: '',
        provinceName: '',
        cityName: '',
        validStatus: ''
      },
      modifyOrg: [], // 修改机构
      modifyOrgadd: [], // 修改营增
      isModule: '', // 判断什么地方调用查询机构 0查询 1添加 2修改 备注 添加修改时都是获取上级机构 3 查询上级机构
      isDetail: false, // 是否显示详情
      detailData: {
        comCode: '',
        comCName: '',
        province: '',
        upperComname: '',
        upperComcode: '',
        comLevel: '',
        basiclLawId: '',
        basicLawXxdlId: '',
        provinceName: '',
        cityName: '',
        validStatus: ''
      }, // 详情数据
      comCodeOrName: '', // 双击获取输入框数据
      isTag: '',
      limt: {
        add: false,
        modify: false,
        review: false,
        query: false,
        export: false
      },
      postOrgList: {},
      loading: ''
    }
  },
  mounted () {
    this.$nextTick(function () {})
    this.getBtnLimt()
  },
  watch: {
    'condition.comCode' () {
      if (this.condition.comCode === '') {
        this.condition.comCName = ''
      }
    },
    'condition.comCName' () {
      if (this.condition.comCName === '') {
        this.condition.comCode = ''
      }
    },
    'condition.upperComcode' () {
      if (this.condition.upperComcode === '') {
        this.condition.upperComName = ''
      }
    },
    'condition.upperComName' () {
      if (this.condition.upperComName === '') {
        this.condition.upperComcode = ''
      }
    },
    'conditions.upperComcode' () {
      if (this.conditions.upperComcode === '') {
        this.conditions.upperComName = ''
      }
    },
    'conditions.upperComName' () {
      if (this.conditions.upperComName === '') {
        this.conditions.upperComcode = ''
      }
    },
    'modifyList.upperComcode' () {
      if (this.modifyList.upperComcode === '') {
        this.modifyList.upperComname = ''
      }
    },
    'modifyList.upperComname' () {
      if (this.modifyList.upperComname === '') {
        this.modifyList.upperComcode = ''
      }
    },
    'conditions.provinceName' () {
      if (this.conditions.provinceName === '') {
        this.conditions.cityName = ''
      }
    },
    'modifyList.provinceName' () {
      if (this.modifyList.provinceName === '') {
        this.modifyList.cityName = ''
      }
    }
  },
  methods: {
    getBtnLimt () {
      // 按钮权限
      let userId = getUserId()
      if (userId === null || userId === undefined) {
        userId = ''
      }
      let post = {
        userId: userId,
        page: '佰盈机构管理'
      }
      this.getBtnLimt_Org(post).then(resp => {
        if (resp.code === '000000') {
          resp.data.forEach((item, index) => {
            this.limt[item.code] = item.checked
          })
        }
      })
    },
    handleSelectionChange (val) {
      this.auditData = val
      console.log(this.auditData)
    },
    goAudit () {
      // 点击出现审核弹框
      if (this.auditData.length > 0) {
        let count = true
        for (var i = 0; i < this.auditData.length; i++) {
          console.log(this.auditData[i].verifyStatus)
          if (this.auditData[i].verifyStatus === '9') {
          } else {
            count = false
          }
        }
        if (count) {
          this.audit_dialog = true
        } else {
          this.open('error', '仅可对待审核的记录进行审核！')
        }
      } else {
        this.open('error', '请先勾选记录！')
        return false
      }
    },
    auditItem () {
      // 审核
      if (this.auditData.length > 0) {
        var codeString = []
        for (var i = 0; i < this.auditData.length; i++) {
          codeString[i] = this.auditData[i].comCode
        }
        codeString = codeString.join(',')
        this.auditResult.comCode = codeString
        this.Loading()
        this.auditOrgItem(this.auditResult)
          .then(resp => {
            this.closeLoading()
            if (resp.code === '000000') {
              this.audit_dialog = false
              this.auditResult = {}
              this.open('success', '审核成功！')
            } else {
              this.open('error', resp.msg)
            }
          })
          .catch(() => {
            this.open('error', '系统错误，请刷新重试！')
            this.closeLoading()
          })
      } else {
        this.open('error', '请先勾选记录！')
        return false
      }
    },
    modifyEdit () {
      // 选中修改
      if (this.auditData.length === 0) {
        this.open('error', '请先勾选记录！')
        return false
      }
      if (this.auditData.length > 1) {
        this.open('error', '仅可选一条记录进行修改操作！')
        return false
      } else {
        if (this.auditData[0].verifyStatus === '9') {
          this.open('error', '仅可对审核通过、审核不通过的记录进行修改')
        } else {
          this.beforeModify({ comCode: this.auditData[0].comCode }).then(
            resp => {
              if (resp.code === '000000') {
                this.modifyList = resp.data
                this.isModify = true
                this.$set(
                  this.modifyList,
                  'basicLawXxdlId',
                  resp.data.basicLawXxdlId.toString()
                )
                this.$set(
                  this.modifyList,
                  'basiclLawId',
                  resp.data.basiclLawId.toString()
                )
                resp.data.province = resp.data.province.split('-')
                resp.data.city = resp.data.city.split('-')
                this.$set(
                  this.modifyList,
                  'provinceName',
                  resp.data.province[1]
                )
                this.modifyList.province = resp.data.province[0]
                this.$set(this.modifyList, 'cityName', resp.data.city[1])
                this.modifyList.city = resp.data.city[0]
                this.provinceName = resp.data.province[1]
                this.provinceCode = resp.data.province[0]
                this.cityName = resp.data.city[1]
                this.cityCode = resp.data.city[0]
              } else {
                this.open('error', resp.msg)
              }
            }
          )
        }
      }
    },
    searchOrgList (page) {
      // 查询机构
      this.condition.current = page
      this.condition.pageSize = this.pageSize
      this.current = page
      this.postOrgList = JSON.parse(JSON.stringify(this.condition))
      this.postOrg(this.postOrgList)
    },
    postOrg (post) {
      // 查询机构
      this.Loading()
      this.searchOrg(post)
        .then(resp => {
          this.closeLoading()
          if (resp.code === '000000' || resp.code === '000002') {
            this.isList = true
            if (resp.code === '000002') {
              this.comTableData = []
            } else {
              this.comTableData = resp.data.data
            }
            this.isPage = true
            this.totalPages = resp.data.totalPages
            this.totalRecords = resp.data.totalRecords
          } else {
            this.open('error', resp.msg)
          }
        })
        .catch(() => {
          this.open('error', '系统错误，请刷新重试！')
          this.closeLoading()
        })
    },
    handleCurrentChange (val) {
      // 分页页码改变时
      this.current = val
      this.postOrgList.current = val
      this.postOrgList.pageSize = this.pageSize
      this.postOrg(this.postOrgList)
    },
    handleSizeChange (val) {
      // 调整每页显示条数
      this.pageSize = val
      this.current = 1
      this.postOrgList.current = 1
      this.postOrgList.pageSize = this.pageSize
      this.postOrg(this.postOrgList)
    },
    orgCurrentChange (val) {
      this.getMesg(val)
    },
    orgClose () {
      // 关闭弹窗
      this.sizelist = []
      this.pageSizeD = 5
      this.show_dialog = false
      if (this.isModule === 0) {
        // 查询
        this.condition.comCode = ''
        this.condition.comCName = ''
      } else if (this.isModule === 3) {
        // 查询上级机构
        this.$set(this.condition, 'upperComcode', '')
        this.$set(this.condition, 'upperComName', '')
      } else if (this.isModule === 1) {
        // 添加查询
        this.$set(this.conditions, 'upperComcode', '')
        this.$set(this.conditions, 'upperComName', '')
      } else if (this.isModule === 2) {
        // 修改查询
        this.$set(this.modifyList, 'upperComcode', '')
        this.$set(this.modifyList, 'upperComname', '')
      }
    },
    orgSizeChange (size) {
      // 保险机构
      this.pageSizeD = size
      this.getMesg(1)
    },
    getInfo (page, type, event) {
      // 弹框查询机构
      this.sizelist = [5, 10, 20, 50]
      this.condition.current = page
      this.isModule = type
      this.currentD = page
      this.comCodeOrName = event.target.value
      this.getMesg(page)
    },
    getMesg (page) {
      this.currentD = page
      this.allOrg({
        comCodeOrName: this.comCodeOrName,
        currentPage: page,
        pageSize: this.pageSizeD,
        clickType: '2'
      }).then(resp => {
        if (resp.code === '000000' || resp.code === '000002') {
          if (resp.code === '000002') {
            this.orgTableData = []
          } else {
            this.orgTableData = resp.data.data
          }
          this.isOrg = true
          this.totalPageD = resp.data.totalPages
          this.totalRecordD = resp.data.totalRecords
          this.show_dialog = true
        }
      })
    },
    closeDailog () {
      return new Promise((resolve, reject) => {
        this.show_dialog = false
        resolve()
      })
    },
    selectRow (row, event, column) {
      // 选择机构
      this.closeDailog().then(() => {
        row = JSON.parse(JSON.stringify(row))
        if (this.isModule === 0) {
          // 查询
          this.condition.comCode = row.comCode
          this.condition.comCName = row.comCName
        } else if (this.isModule === 3) {
          // 查询上级机构
          this.$set(this.condition, 'upperComcode', row.comCode)
          this.$set(this.condition, 'upperComName', row.comCName)
        } else if (this.isModule === 1) {
          // 添加查询
          this.$set(this.conditions, 'upperComcode', row.comCode)
          this.$set(this.conditions, 'upperComName', row.comCName)
        } else if (this.isModule === 2) {
          // 修改查询
          this.$set(this.modifyList, 'upperComcode', row.comCode)
          this.$set(this.modifyList, 'upperComname', row.comCName)
        }
        this.show_dialog = false
      })
    },
    blurCom (tag, event) {
      // 失去焦点判断
      this.isModule = tag
      if (this.show_dialog || event.target.value === '') {
        return false
      }
      this.comCodeOrName = event.target.value
      var data = {
        comCodeOrName: this.comCodeOrName,
        clickType: '1'
      }
      this.allOrg(data).then(resp => {
        if (resp.code === '000000') {
          if (this.isModule === 0) {
            // 查询
            this.condition.comCode = resp.data.data[0].comCode
            this.condition.comCName = resp.data.data[0].comCName
          } else if (this.isModule === 3) {
            // 查询上级机构
            this.$set(this.condition, 'upperComcode', resp.data.data[0].comCode)
            this.$set(
              this.condition,
              'upperComName',
              resp.data.data[0].comCName
            )
          } else if (this.isModule === 1) {
            // 添加查询
            this.$set(
              this.conditions,
              'upperComcode',
              resp.data.data[0].comCode
            )
            this.$set(
              this.conditions,
              'upperComName',
              resp.data.data[0].comCName
            )
          } else if (this.isModule === 2) {
            // 修改查询
            this.$set(
              this.modifyList,
              'upperComcode',
              resp.data.data[0].comCode
            )
            this.$set(
              this.modifyList,
              'upperComname',
              resp.data.data[0].comCName
            )
          }
        } else {
          if (this.isModule === 0) {
            // 查询
            this.condition.comCode = ''
            this.condition.comCName = ''
          } else if (this.isModule === 3) {
            // 查询上级机构
            this.$set(this.condition, 'upperComcode', '')
            this.$set(this.condition, 'upperComName', '')
          } else if (this.isModule === 1) {
            // 添加查询
            this.$set(this.conditions, 'upperComcode', '')
            this.$set(this.conditions, 'upperComName', '')
          } else if (this.isModule === 2) {
            // 修改查询
            this.$set(this.modifyList, 'upperComcode', '')
            this.$set(this.modifyList, 'upperComname', '')
          }
          this.open('error', '代码或名称不存在')
        }
      })
    },
    add () {
      this.conditions = {}
      this.$set(this.conditions, 'taxpayerIden', '1')
      this.$set(this.conditions, 'appliTaxRate', '6')
      this.isAdd = true
    },
    put () {
      // 添加提交
      this.$refs['conditions'].validate(valid => {
        if (valid) {
          this.Loading()
          this.addOrg(this.conditions)
            .then(resp => {
              this.closeLoading()
              if (resp.code === '000000') {
                this.open('success', '添加成功')
                this.isAdd = false
                this.conditions = {}
                this.cleanContent()
              } else {
                this.open('error', resp.msg)
              }
            })
            .catch(() => {
              this.open('error', '系统错误，请刷新重试！')
              this.closeLoading()
            })
        } else {
          return false
        }
      })
    },
    cleanContent () {
      this.$refs['conditions'].resetFields()
      this.isAdd = false
    },
    querySearchAsync (queryString, cb) {
      // 查询省份 cb callBack方法
      this.searchPro({
        codeOrName: queryString,
        provinceOrCity: 'province'
      }).then(resp => {
        this.proSearch = resp
        cb(this.proSearch)
      })
    },
    querySearchCity (queryString, cb) {
      // 查询城市
      if (this.isTag === 0) {
        this.provinceName = this.conditions.provinceName
      } else {
        this.provinceName = this.modifyList.provinceName
      }
      if (this.provinceName !== '') {
        if (queryString === '' || queryString === undefined) {
          queryString = this.provinceName
        }
        this.searchPro({
          codeOrName: queryString,
          provinceOrCity: 'city'
        }).then(resp => {
          this.citySearch = resp
          cb(this.citySearch)
        })
      } else {
        this.open('warning', '请先选择省份')
        this.citySearch = []
        cb(this.citySearch)
      }
    },
    searchProCity (name, type) {
      this.searchPro({ codeOrName: name, provinceOrCity: type }).then(resp => {
        this.proSearch = resp
      })
    },
    handleProSelect (item) {
      this.conditions.provinceName = item.configSetValueName
      this.conditions.province = item.configSetValueCode
      this.provinceCode = item.configSetValueCode
      this.provinceName = item.configSetValueName
    },
    handleCitySelect (item) {
      this.conditions.city = item.configSetValueCode
      this.conditions.cityName = item.configSetValueName
      this.cityCode = item.configSetValueCode
      this.cityName = item.configSetValueName
    },
    handleProSelect_mod (item) {
      this.modifyList.provinceName = item.configSetValueName
      this.modifyList.province = item.configSetValueCode
      this.provinceCode = item.configSetValueCode
      this.provinceName = item.configSetValueName
    },
    handleCitySelect_mod (item) {
      this.modifyList.city = item.configSetValueCode
      this.modifyList.cityName = item.configSetValueName
      this.cityCode = item.configSetValueCode
      this.cityName = item.configSetValueName
    },
    modifyListPost () {
      // 修改机构
      this.$refs['modifyList'].validate(valid => {
        if (valid) {
          this.Loading()
          this.searchModify(this.modifyList)
            .then(resp => {
              this.closeLoading()
              if (resp.code === '000000') {
                this.isModify = false
                this.open('success', '修改成功！')
              } else {
                this.open('error', resp.msg)
              }
            })
            .catch(() => {
              this.open('error', '系统错误，请刷新重试！')
              this.closeLoading()
            })
        } else {
          return false
        }
      })
    },
    detailMsg (row) {
      // 查看修改前数据
      this.Loading()
      this.beforeModify({ comCode: row.comCode })
        .then(resp => {
          this.closeLoading()
          if (resp.code === '000000') {
            this.detailData = resp.data
            // this.detailData.basiclLawId = this.detailData.basiclLawId.toString()
            // this.detailData.basicLawXxdlId = this.detailData.basicLawXxdlId.toString()
            resp.data.province = resp.data.province.split('-')
            resp.data.city = resp.data.city.split('-')
            this.detailData.provinceName = resp.data.province[1]
            this.detailData.cityName = resp.data.city[1]
            this.isDetail = true
          } else {
            this.open('error', resp.msg)
          }
        })
        .catch(() => {
          this.open('error', '系统错误，请刷新重试！')
          this.closeLoading()
        })
    },
    detail (row) {
      // 查看修改后数据
      this.Loading()
      this.afterModify({ comCode: row.comCode })
        .then(resp => {
          this.closeLoading()
          if (resp.code === '000000') {
            this.detailData = resp.data
            resp.data.province = resp.data.province.split('-')
            resp.data.city = resp.data.city.split('-')
            this.detailData.provinceName = resp.data.province[1]
            // this.detailData.basiclLawId = this.detailData.basiclLawId.toString()
            // this.detailData.basicLawXxdlId = this.detailData.basicLawXxdlId.toString()
            // this.provinceCode = resp.province[0]
            this.detailData.cityName = resp.data.city[1]
            // this.cityCode = resp.city[0]
            this.isDetail = true
          } else {
            this.open('error', resp.msg)
          }
        })
        .catch(() => {
          this.open('error', '系统错误，请刷新重试！')
          this.closeLoading()
        })
    },
    focusInput (tag) {
      this.isTag = tag
    },
    outImport () { // 导出
      console.log(this.condition)
      this.condition.verifyType = ''
      window.open(`/tabycore/baseCompany/exportCompany?comCode=${this.condition.comCode}&comCName=${this.condition.comCName}&upperComcode=${this.condition.upperComcode}&upperComName=${this.condition.upperComName}&comLevel=${this.condition.comLevel}&verifyStatus=${this.condition.verifyStatus}&verifyType=${this.condition.verifyType}`)
    },
    auditClose () {
      this.audit_dialog = false
      this.auditResult = {}
    },
    open (type, mesg) { // 提示
      this.$message({
        showClose: true,
        message: mesg,
        type: type
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
      'searchOrg',
      'addOrg',
      'searchPro',
      'searchDetail',
      'searchModify',
      'auditOrgItem',
      'beforeModify',
      'afterModify',
      'allOrg',
      'getBtnLimt_Org'
    ])
  },
  components: {
    [NoticeBar.name]: NoticeBar,
    [LabelText.name]: LabelText,
    [LineTittle.name]: LineTittle
  },
  created () {}
}
</script>

<style lang="scss" type="text/css" scoped>
#orgManage {
  padding: 0px 30px 30px 30px;
}
.ri-line {
  margin-bottom: 10px;
}
.operationBtn {
  margin-top: 30px;
  text-align: center;
}
.searchBtn {
  margin-bottom: 20px;
}
/*分页*/
.pagination {
  text-align: right;
  margin: 20px auto;
}
.btn-container {
  text-align: center;
  margin-top: 30px;
}
.el-table__body .el-button {
  line-height: 30px;
  height: 30px;
  width: 50px;
  font-size: 13px;
  padding: 0;
}
a {
  text-decoration: none;
}
.mesg_form .required:before {
  font-size: 14px !important;
  top: 3px !important;
}
.el-button + .el-button {
  margin-left: 20px;
}

</style>
<style lang="scss" type="text/css">
  .orgManage_module .el-form-item__error {
    left: 130px;
  }
</style>

