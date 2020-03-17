<template>
    <div id="home_index">
      <ui-notice-bar slot="breadcast" >
          <el-breadcrumb slot="location" separator=">">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>供应商管理</el-breadcrumb-item>
            <el-breadcrumb-item>保险公司管理</el-breadcrumb-item>
          </el-breadcrumb>
      </ui-notice-bar>
        <el-form ref="Insurance_Co" :rules="rules" :model="info">
          <el-row class="ri-line">
            <el-col :span="12">
              <ui-label-text  label="保险公司类型:" labelWidth="120" >
                <el-select v-model="info.insurerTypeCode" slot="text" placeholder="请选择保险公司类型">
                    <el-option
                        label="财险"
                        value="1">
                    </el-option>
                    <el-option
                        label="寿险"
                        value="2">
                    </el-option>
                    <el-option
                        label="银保代理"
                        value="3">
                    </el-option>
                  </el-select>
              </ui-label-text>
            </el-col>
          </el-row>
          <el-row class="ri-line">
            <el-col :span="12">
              <ui-label-text  label="保险公司代码:" labelWidth="120" >
                <el-input v-model="info.insurerCode" slot="text" @change="clearTheOther(0)" clearable placeholder="双击可选择" @dblclick.native="openComDialog"></el-input>
              </ui-label-text>
            </el-col>
            <el-col :span="12">
              <ui-label-text  label="保险公司名称:" labelWidth="120">
                <el-input v-model="info.insurerName" slot="text" @change="clearTheOther(1)" clearable placeholder="双击可选择" @dblclick.native="openComDialog"></el-input>
              </ui-label-text>
            </el-col>
          </el-row>
          <el-row class="ri-line">
            <el-col :span="24">
              <el-form-item prop='checkStatusCode'>
                <ui-label-text  label="审核状态:" labelWidth="120">
                  <el-select  v-model="info.checkStatusCode" slot="text" placeholder="请选择">
                    <el-option label="待审核" value="3"> </el-option>
                    <el-option label="审核通过" value="1"></el-option>
                    <el-option label="审核不通过" value="2"></el-option>
                  </el-select>
                </ui-label-text>
              </el-form-item>
            </el-col>
          </el-row>
      </el-form>
      <div class="btn-container" slot="controlbar" labelWidth="20" :span="4">
          <el-button type="primary" :disabled="quanxian.query" @click.native.prevent="submitForm('Insurance_Co')">查询</el-button>
      </div>
      <div class="btn-container" slot="controlbar" labelWidth="20" :span="4">
          <el-button type="primary" :disabled="quanxian.add" @click="dialogTableVisibleAdd = true">新增</el-button>
      </div>
      <div class="btn-container" slot="controlbar" labelWidth="20" :span="4">
          <el-button type="primary" :disabled="quanxian.modify" @click="modDialog()">修改</el-button>
      </div>
      <div class="btn-container" slot="controlbar" labelWidth="20" :span="4">
          <el-button type="danger" :disabled="quanxian.del" @click="delDialog()">删除</el-button>
      </div>
      <div class="btn-container" slot="controlbar" labelWidth="20" :span="4">
          <el-button type="primary" :disabled="quanxian.review" @click="checkDialog()">审核</el-button>
      </div>
      <div class="btn-container"  slot="controlbar" labelWidth="20" :span="4">
        <el-upload class="upload-rate" :disabled="quanxian.import" :action="uploadUrl()" :limit="10" name="fileName" :on-success="handleEXLSuccess" accept='xls'
          :file-list="fileList">
          <el-button size="small" style="text-align:center" :disabled="quanxian.import" type="primary">批量导入</el-button>
          <div slot="tip" class="el-upload__tip"></div>
        </el-upload>
        <a @click="downTem()" href="javascript:void(0)" download>导入模板下载</a>
      </div>
      <div v-if='tableShowOrNot'>
        <el-table ref="multipleTable" @selection-change="handleSelectionChange" :data="InsuranceCo" tooltip-effect="dark" style="width: 100%" >
          <el-table-column type="selection" width="55" :selectable="checkSelectable"></el-table-column>
          <el-table-column prop="insurerCode" label="保险公司代码"  width="220" show-overflow-tooltip>
            <template slot-scope="scope" >
              <el-button type="text" @click="tableRowChange(scope.row)" size="small" >{{ scope.row.insurerCode }}</el-button>
            </template>
          </el-table-column>
          <el-table-column prop="insurerName" label="保险公司名称" width="220"></el-table-column>
          <el-table-column prop="insurerType" label="保险公司类型" width="150"></el-table-column>
          <el-table-column prop="validStatus" label="有效状态" width="150"></el-table-column>
          <el-table-column prop="checkStatus" label="审核状态" width="150"></el-table-column>
          <el-table-column prop="checkType" label="审核状态" width="150"></el-table-column>
          <el-table-column width="300" show-overflow-tooltip>
            <template slot-scope="scope" v-if="checkChangeDetail(scope.row)">
              <el-button type="text" @click="openChangeDetail(scope.row)" size="small">查看修改详情</el-button>
            </template>
          </el-table-column>
        </el-table>
        <div class="block">
          <el-pagination
              @current-change="handleCurrentChange1"
              @size-change="queryPageSize1"
              :current-page="info.currentPage"
              :page-size="info.pageSize"
              :page-sizes="[10,20,50]"
              layout="total, sizes, prev, pager, next, jumper"
              :total="totalRecords1"
              >
            </el-pagination>
        </div>
      </div>
      <!--查询 的弹框-->
      <el-dialog :append-to-body="true" width="80%" center title="查询保险公司信息" :visible.sync="dialogTableVisibleQuery">
        <ui-line-tittle :collapsible="true">
          <span slot="title" >
              <i class="font_family icon-jy-menu-4"></i>保险公司新增
          </span>
          <div class="ri-content" slot="content">
            <el-row class="ri-line">
              <el-col :span="12">
                <ui-label-text  label="保险公司代码:" labelWidth="120">
                  <span slot="text">{{detailInfo.insurerCode}}</span>
                </ui-label-text>
              </el-col>
              <el-col :span="12">
                <ui-label-text  label="保险公司名称:" labelWidth="120">
                  <el-input v-model="detailInfo.insurerName" readonly slot="text" ></el-input>
                </ui-label-text>
              </el-col>
            </el-row>
            <el-row class="ri-line">
              <!-- <el-col :span="12">
                <ui-label-text  label="简称:" labelWidth="120">
                  <el-input v-model="detailInfo.shortName" readonly slot="text" ></el-input>
                </ui-label-text>
              </el-col> -->
              <el-col :span="12">
                <ui-label-text labelWidth="120" label="保险公司类型:" >
                  <el-input v-model="detailInfo.insurerType" readonly slot="text"></el-input>
                </ui-label-text>
              </el-col>
            </el-row>
            <el-row class="ri-line">
              <el-col :span="12">
                <ui-label-text labelWidth="120" label="所属省份:" >
                  <el-input v-model="detailInfo.provinceName" readonly slot="text"></el-input>
                </ui-label-text>
              </el-col>
              <el-col :span="12">
                <ui-label-text labelWidth="120" label="状态:" >
                  <el-input v-model="detailInfo.validStatus" readonly slot="text"></el-input>
                </ui-label-text>
              </el-col>
            </el-row>
            <el-row class="ri-line">
              <el-col :span="24">
                <ui-label-text labelWidth="120" label="备注:" >
                  <el-input labelWidth="300" type="textarea" readonly v-model="detailInfo.remark" slot="text"></el-input>
                </ui-label-text>
              </el-col>
            </el-row>
          </div>
        </ui-line-tittle>
        <ui-line-tittle :collapsible="true" >
          <span slot="title" >
              <i class="font_family icon-jy-menu-4" ></i>营改增信息
          </span>
          <div class="ri-content" slot="content">
            <el-row class="ri-line">
              <el-col :span="24">
                <el-radio v-model="detailInfo.isCheck" label='1' >总对总</el-radio>
                <el-radio v-model="detailInfo.isCheck" label='2' >分对分</el-radio>
              </el-col>
            </el-row>
            <div v-if="detailInfo.isCheck =='1'">
              <el-row class="ri-line">
                <el-col :span="12">
                  <ui-label-text labelWidth="120" label="纳税人身份:" >
                    <el-input v-model="detailInfo.taxpayerIden" readonly slot="text" ></el-input>
                  </ui-label-text>
                </el-col>
                <el-col :span="12">
                  <ui-label-text labelWidth="120" label="使用税率:" >
                    <el-input v-model="detailInfo.appliTaxRate" readonly slot="text" ></el-input>
                  </ui-label-text>
                </el-col>
              </el-row>
              <el-row class="ri-line">
                <el-col :span="12">
                  <ui-label-text  label="纳税人识别号:" labelWidth="120">
                    <el-input v-model="detailInfo.taxpayIdenNo" readonly slot="text" ></el-input>
                  </ui-label-text>
                </el-col>
                <el-col :span="12">
                  <ui-label-text  label="纳税人地址:" labelWidth="120">
                    <el-input v-model="detailInfo.taxpayIdenAdd" readonly slot="text" ></el-input>
                  </ui-label-text>
                </el-col>
              </el-row>
              <el-row class="ri-line">
                <el-col :span="12">
                  <ui-label-text  label="纳税人电话:" labelWidth="120">
                    <el-input v-model="detailInfo.taxpayIdenPhone" readonly slot="text" ></el-input>
                  </ui-label-text>
                </el-col>
                <el-col :span="12">
                  <ui-label-text  label="纳税人开户行:" labelWidth="120">
                    <el-input v-model="detailInfo.taxpayIdenBank" readonly slot="text" ></el-input>
                  </ui-label-text>
                </el-col>
              </el-row>
              <el-row class="ri-line">
                <el-col :span="12">
                  <ui-label-text  label="纳税人银行账号:" labelWidth="120">
                    <el-input v-model="detailInfo.taxpayIdenBankAcc" readonly slot="text" ></el-input>
                  </ui-label-text>
                </el-col>
              </el-row>
            </div>
            <div v-if="detailInfo.isCheck =='2'"></div>
          </div>
        </ui-line-tittle>
          <!-- <el-button class="button_add" @click.native.prevent="add()">提交审核</el-button> -->
          <div class="center">
              <el-button class="button_add" type="primary" @click.native.prevent="back()">返回</el-button>
          </div>
      </el-dialog>
      <!--新增 的弹框-->
      <el-dialog :append-to-body="true" width="80%" center title="保险公司新增" :visible.sync="dialogTableVisibleAdd" :before-close="addClose">
        <el-form :rules="addRules" ref="addForm" :model="addForm">
        <ui-line-tittle :collapsible="true" >
          <span slot="title" >
              <i class="font_family icon-jy-menu-4" ></i>保险公司新增
          </span>
          <div class="ri-content" slot="content">
              <el-row class="ri-line">
                <el-col :span="12">
                  <ui-label-text  label="保险公司代码:" labelWidth="140" text="系统自动编码">
                  </ui-label-text>
                </el-col>
                <el-col :span="12">
                  <el-form-item  prop="insurerName" >
                    <ui-label-text  label="保险公司名称:" :required="true" labelWidth="140">
                      <el-input v-model="addForm.insurerName" slot="text" ></el-input>
                    </ui-label-text>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row class="ri-line">
                <!-- <el-col :span="12">
                  <el-form-item  prop="shortName" >
                    <ui-label-text  label="简称:" :required="true" labelWidth="140">
                      <el-input v-model="addForm.shortName" slot="text" ></el-input>
                    </ui-label-text>
                  </el-form-item>
                </el-col> -->
                <el-col :span="12">
                  <el-form-item  prop="insurerTypeCode" >
                    <ui-label-text  label="保险公司类型:" :required="true" labelWidth="140">
                      <el-select v-model="addForm.insurerTypeCode" slot="text" placeholder="请选择">
                        <el-option label="财险" value="1"></el-option>
                        <el-option label="寿险" value="2"></el-option>
                        <el-option label="银保代理" value="3"></el-option>
                      </el-select>
                    </ui-label-text>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row class="ri-line">
                <el-col :span="12">
                  <el-form-item  prop="province" >
                    <ui-label-text :required="true"  labelWidth="120" label="所属省份:" >
                      <el-autocomplete style="margin-left:20px" v-model="addForm.province" slot="text" :fetch-suggestions="querySearchAsync"  placeholder="请输入内容"  @select="handleProSelect" >
                        <template slot-scope="{ item }">
                          <span class="code">{{ item.configSetValueCode }}</span>-
                          <span class="name">{{ item.configSetValueName }}</span>
                        </template>
                      </el-autocomplete>
                    </ui-label-text>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item  prop="validStatusCode" >
                    <ui-label-text labelWidth="140" :required="true" label="状态:" >
                        <el-select v-model="addForm.validStatusCode" slot="text" placeholder="请选择">
                          <el-option label="有效" value="1"></el-option>
                          <el-option label="无效" value="0"></el-option>
                        </el-select>
                    </ui-label-text>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row class="ri-line">
                <el-col :span="24">
                  <el-form-item  prop="remark" :required="false">
                    <ui-label-text labelWidth="140" :required="false" label="备注:" >
                      <el-input labelWidth="300" type="textarea" v-model="addForm.remark" slot="text" ></el-input>
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
          <div class="ri-content" slot="content">
              <el-row class="ri-line">
                <el-col :span="24">
                  <el-radio v-model="addForm.isCheck" label='1' >总对总</el-radio>
                  <el-radio v-model="addForm.isCheck" label='2' >分对分</el-radio>
                </el-col>
              </el-row>
              <div v-if="addForm.isCheck =='1'">
                  <el-row class="ri-line">
                    <el-col :span="12">
                      <el-form-item  prop="taxpayerIden" >
                        <ui-label-text labelWidth="140" :required="true" label="纳税人身份:" >
                          <el-select v-model="addForm.taxpayerIden" slot="text" placeholder="请选择">
                            <el-option label="增值税一般纳税人" value="1"></el-option>
                            <el-option label="增值税小规模纳税人" value="2"></el-option>
                            <el-option label="非独立纳税人" value="3"></el-option>
                          </el-select>
                        </ui-label-text>
                      </el-form-item>
                    </el-col>
                    <!-- <el-col :span="12">
                      <el-form-item  prop="appliTaxRateCode" >
                        <ui-label-text labelWidth="140" :required="true" label="适用税率:" >
                          <el-select v-model="addForm.appliTaxRateCode" slot="text" placeholder="请选择">
                            <el-option label="3%" value="1"></el-option>
                            <el-option label="6%" value="2"></el-option>
                          </el-select>
                        </ui-label-text>
                      </el-form-item>
                    </el-col> -->
                  </el-row>
                  <el-row class="ri-line">
                    <el-col :span="12">
                      <el-form-item  prop="taxpayIdenNo" >
                        <ui-label-text  label="纳税人识别号:" :required="true" labelWidth="140">
                          <el-input v-model="addForm.taxpayIdenNo" slot="text" ></el-input>
                        </ui-label-text>
                      </el-form-item>
                    </el-col>
                    <el-col :span="12">
                      <el-form-item  prop="taxpayIdenAdd" >
                        <ui-label-text  label="纳税人地址:" :required="true" labelWidth="140">
                          <el-input v-model="addForm.taxpayIdenAdd" slot="text" ></el-input>
                        </ui-label-text>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row class="ri-line">
                    <el-col :span="12">
                      <el-form-item  prop="taxpayIdenPhone" >
                        <ui-label-text  label="纳税人电话:" :required="true" labelWidth="140">
                          <el-input v-model="addForm.taxpayIdenPhone" slot="text" ></el-input>
                        </ui-label-text>
                      </el-form-item>
                    </el-col>
                    <el-col :span="12">
                      <el-form-item  prop="taxpayIdenBank" >
                        <ui-label-text  label="纳税人开户行:" :required="true" labelWidth="140">
                          <el-input v-model="addForm.taxpayIdenBank" slot="text" ></el-input>
                        </ui-label-text>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row class="ri-line">
                    <el-col :span="12">
                      <el-form-item  prop="taxpayIdenBankAcc" >
                        <ui-label-text  label="纳税人银行账号:" :required="true" labelWidth="140">
                          <el-input v-model="addForm.taxpayIdenBankAcc" slot="text" ></el-input>
                        </ui-label-text>
                      </el-form-item>
                    </el-col>
                  </el-row>
              </div>
              <div v-if="addForm.isCheck =='2'"></div>
        </div>
        </ui-line-tittle>
         </el-form>
          <div class="center">
            <el-button class="button_add" type="primary" @click.native.prevent="_addForm('addForm')">提交审核</el-button>
          </div>
      </el-dialog>
      <ComDialog :vis='comDialog' :workerVis='comDialogworker' :comVis='comDialogCom' :newTableData='comDialogData' @onClose='comDialogClosing' @selectDialog='dialogBackData' @comdialogChangePageFunction='changeComdialogPage1' @comdialogChangePageSizeFunction='changeComdialogPageSize1' :fenyetotal='fenyetotalData'/>
      <!--修改 的弹框-->
      <el-dialog :append-to-body="true" width="80%" center title="保险公司修改" :visible.sync="dialogTableVisibleMod" :before-close="changeClose">
        <el-form :rules="addRules" ref="modForm" :model="modForm">
          <ui-line-tittle :collapsible="true" >
            <span slot="title">
                <i class="font_family icon-jy-menu-4" ></i>保险公司修改
            </span>
            <div class="ri-content" slot="content">
                <el-row class="ri-line">
                  <el-col :span="12">
                    <ui-label-text  label="保险公司代码:" labelWidth="140">
                      <el-input v-model="modForm.insurerCode" slot="text" ></el-input>
                    </ui-label-text>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item  prop="insurerName" >
                      <ui-label-text  label="保险公司名称:" :required="true" labelWidth="140">
                        <el-input v-model="modForm.insurerName" slot="text" ></el-input>
                      </ui-label-text>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row class="ri-line">
                  <!-- <el-col :span="12">
                    <el-form-item  prop="shortName" >
                      <ui-label-text  label="简称:" :required="true" labelWidth="140">
                        <el-input v-model="modForm.shortName" slot="text" ></el-input>
                      </ui-label-text>
                    </el-form-item>
                  </el-col> -->
                  <el-col :span="12">
                    <el-form-item  prop="insurerTypeCode" >
                      <ui-label-text  label="保险公司类型:" :required="true" labelWidth="140">
                        <el-select v-model="modForm.insurerTypeCode" slot="text" placeholder="请选择">
                          <el-option label="财险" value="1"></el-option>
                          <el-option label="寿险" value="2"></el-option>
                          <el-option label="银保代理" value="3"></el-option>
                        </el-select>
                      </ui-label-text>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row class="ri-line">
                  <el-col :span="12">
                    <el-form-item  prop="province" :required="false">
                      <ui-label-text :required="false"  labelWidth="140" label="所属省份:" >
                        <el-autocomplete v-model="modForm.province" slot="text" :fetch-suggestions="querySearchAsync"  placeholder="请输入内容"  @select="_handleProSelect" >
                          <template slot-scope="{ item }">
                            <span class="code">{{ item.configSetValueCode }}</span>-
                            <span class="name">{{ item.configSetValueName }}</span>
                          </template>
                        </el-autocomplete>
                      </ui-label-text>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item  prop="validStatusCode" >
                      <ui-label-text labelWidth="140" :required="true" label="状态:" >
                          <el-select v-model="modForm.validStatusCode" slot="text" placeholder="请选择">
                            <el-option label="有效" value="1"></el-option>
                            <el-option label="无效" value="0"></el-option>
                          </el-select>
                      </ui-label-text>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row class="ri-line">
                  <el-col :span="24">
                    <el-form-item  prop="remark" :required="false">
                      <ui-label-text labelWidth="140" :required="false" label="备注:" >
                        <el-input labelWidth="300" type="textarea" v-model="modForm.remark" slot="text" ></el-input>
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
            <div class="ri-content" slot="content">
                <el-row class="ri-line">
                  <el-col :span="24">
                    <el-radio v-model="modForm.isCheck" label='1' >总对总</el-radio>
                    <el-radio v-model="modForm.isCheck" label='2' >分对分</el-radio>
                  </el-col>
                </el-row>
                <div v-if="modForm.isCheck =='1'">
                    <el-row class="ri-line">
                      <el-col :span="12">
                        <el-form-item  prop="taxpayerIden" >
                          <ui-label-text labelWidth="140" :required="true" label="纳税人身份:" >
                            <el-select v-model="modForm.taxpayerIden" slot="text" placeholder="请选择">
                              <el-option label="增值税一般纳税人" value="1"></el-option>
                              <el-option label="增值税小规模纳税人" value="2"></el-option>
                              <el-option label="非独立纳税人" value="3"></el-option>
                            </el-select>
                          </ui-label-text>
                        </el-form-item>
                      </el-col>
                      <!-- <el-col :span="12">
                        <el-form-item  prop="appliTaxRateCode" >
                          <ui-label-text labelWidth="140" :required="true" label="适用税率:" >
                            <el-select v-model="modForm.appliTaxRateCode" slot="text" placeholder="请选择">
                              <el-option label="3%" value="1"></el-option>
                              <el-option label="6%" value="2"></el-option>
                            </el-select>
                          </ui-label-text>
                        </el-form-item>
                      </el-col> -->
                    </el-row>
                    <el-row class="ri-line">
                      <el-col :span="12">
                        <el-form-item  prop="taxpayIdenNo" >
                          <ui-label-text  label="纳税人识别号:" :required="true" labelWidth="140">
                            <el-input v-model="modForm.taxpayIdenNo" slot="text" ></el-input>
                          </ui-label-text>
                        </el-form-item>
                      </el-col>
                      <el-col :span="12">
                        <el-form-item  prop="taxpayIdenAdd" >
                          <ui-label-text  label="纳税人地址:" :required="true" labelWidth="140">
                            <el-input v-model="modForm.taxpayIdenAdd" slot="text" ></el-input>
                          </ui-label-text>
                        </el-form-item>
                      </el-col>
                    </el-row>
                    <el-row class="ri-line">
                      <el-col :span="12">
                        <el-form-item  prop="taxpayIdenPhone" >
                          <ui-label-text  label="纳税人电话:" :required="true" labelWidth="140">
                            <el-input v-model="modForm.taxpayIdenPhone" slot="text" ></el-input>
                          </ui-label-text>
                        </el-form-item>
                      </el-col>
                      <el-col :span="12">
                        <el-form-item  prop="taxpayIdenBank" >
                          <ui-label-text  label="纳税人开户行:" :required="true" labelWidth="140">
                            <el-input v-model="modForm.taxpayIdenBank" slot="text" ></el-input>
                          </ui-label-text>
                        </el-form-item>
                      </el-col>
                    </el-row>
                    <el-row class="ri-line">
                      <el-col :span="12">
                        <el-form-item  prop="taxpayIdenBankAcc" >
                          <ui-label-text  label="纳税人银行账号:" :required="true" labelWidth="140">
                            <el-input v-model="modForm.taxpayIdenBankAcc" slot="text" ></el-input>
                          </ui-label-text>
                        </el-form-item>
                      </el-col>
                  </el-row>
              </div>
              <div v-if="modForm.isCheck =='2'"></div>
          </div>
          </ui-line-tittle>
         </el-form>
          <div class="center">
            <el-button class="button_add" type="primary" @click.native.prevent="_modForm('modForm')">提交审核</el-button>
          </div>
      </el-dialog>
      <!-- 查看修改详情的弹框 -->
      <el-dialog :append-to-body="true" width="80%" center title="查看修改详情" :visible.sync="changeDetailDialogVis">
        <ui-line-tittle :collapsible="true">
          <span slot="title" >
              <i class="font_family icon-jy-menu-4"></i>保险公司修改
          </span>
          <div class="ri-content" slot="content">
            <el-row class="ri-line">
              <el-col :span="12">
                <ui-label-text  label="保险公司代码:" labelWidth="120">
                  <el-input v-model="changeDetailInfo.shortName" readonly slot="text"></el-input>
                </ui-label-text>
              </el-col>
              <el-col :span="12">
                <ui-label-text  label="保险公司名称:" labelWidth="120">
                  <el-input v-model="changeDetailInfo.insurerName" readonly slot="text" ></el-input>
                </ui-label-text>
              </el-col>
            </el-row>
            <el-row class="ri-line">
              <!-- <el-col :span="12">
                <ui-label-text  label="简称:" labelWidth="120">
                  <el-input v-model="changeDetailInfo.shortName" readonly slot="text"></el-input>
                </ui-label-text>
              </el-col> -->
              <el-col :span="12">
                <ui-label-text labelWidth="120" label="保险公司类型:" >
                  <el-input v-model="changeDetailInfo.insurerType" readonly slot="text"></el-input>
                </ui-label-text>
              </el-col>
            </el-row>
            <el-row class="ri-line">
              <el-col :span="12">
                <ui-label-text labelWidth="120" label="所属省份:" >
                  <el-input v-model="changeDetailInfo.province" readonly slot="text"></el-input>
                </ui-label-text>
              </el-col>
              <el-col :span="12">
                <ui-label-text labelWidth="120" label="状态:" >
                  <el-input v-model="changeDetailInfo.validStatus" readonly slot="text"></el-input>
                </ui-label-text>
              </el-col>
            </el-row>
            <el-row class="ri-line">
              <el-col :span="24">
                <ui-label-text labelWidth="120" label="备注:" >
                  <el-input labelWidth="300" type="textarea" readonly v-model="changeDetailInfo.remark" slot="text"></el-input>
                </ui-label-text>
              </el-col>
            </el-row>
          </div>
        </ui-line-tittle>
        <ui-line-tittle :collapsible="true" >
          <span slot="title" >
              <i class="font_family icon-jy-menu-4" ></i>营改增信息
          </span>
          <div class="ri-content" slot="content">
            <el-row class="ri-line">
              <el-col :span="24">
                <el-radio v-model="changeDetailInfo.isCheck" label='1' >总对总</el-radio>
                <el-radio v-model="changeDetailInfo.isCheck" label='2' >分对分</el-radio>
              </el-col>
            </el-row>
            <div v-if="changeDetailInfo.isCheck =='1'">
              <el-row class="ri-line">
                <el-col :span="12">
                  <ui-label-text labelWidth="120" label="纳税人身份:" >
                    <el-input v-model="changeDetailInfo.taxpayerIden" readonly slot="text" ></el-input>
                  </ui-label-text>
                </el-col>
                <el-col :span="12">
                  <ui-label-text labelWidth="120" label="使用税率:" >
                    <el-input v-model="changeDetailInfo.appliTaxRate" readonly slot="text" ></el-input>
                  </ui-label-text>
                </el-col>
              </el-row>
              <el-row class="ri-line">
                <el-col :span="12">
                  <ui-label-text  label="纳税人识别号:" labelWidth="120">
                    <el-input v-model="changeDetailInfo.taxpayIdenNo" readonly slot="text" ></el-input>
                  </ui-label-text>
                </el-col>
                <el-col :span="12">
                  <ui-label-text  label="纳税人地址:" labelWidth="120">
                    <el-input v-model="changeDetailInfo.taxpayIdenAdd" readonly slot="text" ></el-input>
                  </ui-label-text>
                </el-col>
              </el-row>
              <el-row class="ri-line">
                <el-col :span="12">
                  <ui-label-text  label="纳税人电话:" labelWidth="120">
                    <el-input v-model="changeDetailInfo.taxpayIdenPhone" readonly slot="text" ></el-input>
                  </ui-label-text>
                </el-col>
                <el-col :span="12">
                  <ui-label-text  label="纳税人开户行:" labelWidth="120">
                    <el-input v-model="changeDetailInfo.taxpayIdenBank" readonly slot="text" ></el-input>
                  </ui-label-text>
                </el-col>
              </el-row>
              <el-row class="ri-line">
                <el-col :span="12">
                  <ui-label-text  label="纳税人银行账号:" labelWidth="120">
                    <el-input v-model="changeDetailInfo.taxpayIdenBankAcc" readonly slot="text" ></el-input>
                  </ui-label-text>
                </el-col>
              </el-row>
            </div>
            <div v-if="changeDetailInfo.isCheck =='2'"></div>
          </div>
        </ui-line-tittle>
          <div class="center">
              <el-button class="button_add" type="primary" @click.native.prevent="back()">返回</el-button>
          </div>
      </el-dialog>
      <el-dialog :append-to-body="true" width="50%" center title="确认删除" :visible.sync="delComfirmDialog">
        <el-row class="ri-line">
          <el-col :span="12" class="center">
            <el-button class="button_add" type="primary" @click.native.prevent="del()">确认</el-button>
          </el-col>
          <el-col :span="12" class="center">
            <el-button class="button_add" type="primary" @click.native.prevent="back()">取消</el-button>
          </el-col>
        </el-row>
      </el-dialog>
      <!--审核 的弹框-->
      <el-dialog :append-to-body="true" width="80%" center title="审核" :visible.sync="dialogTableVisibleCheck">
        <el-row class="ri-line">
          <el-col :span="24">
            <el-radio v-model="shenheInput.checkCode" label='1' >审核通过</el-radio>
            <el-radio v-model="shenheInput.checkCode" label='2' >审核不通过</el-radio>
          </el-col>
        </el-row>
        <el-row class="ri-line">
          <el-col :span="24">
            <ui-label-text labelWidth="90" label="审核意见:" >
              <el-input labelWidth="300" type="textarea" v-model="shenheInput.checkConent" slot="text" ></el-input>
            </ui-label-text>
          </el-col>
        </el-row>
        <div class="center">
          <el-button type="primary" class="button_add" @click.native.prevent="examine()">提交审核</el-button>
          <el-button type="primary" class="button_add" @click.native.prevent="back()">返回</el-button>
        </div>
      </el-dialog>
  </div>
</template>

<script>
import NoticeBar from '@/components/notice-bar'
import LineTittle from '@/components/line-tittle'
import LabelText from '@/components/label-text'
import IsEmpty from '@/utils/IsEmpty'
import { mapActions } from 'vuex'
import {
  api
} from '@/api/lifeInsur_mgr/quitListMgr.js'
import ComDialog from '@/components/comDialog'
export default {
  name: '',
  data () {
    return {
      info: {
        insurerTypeCode: '',
        insurerCode: '',
        insurerName: '',
        taxrate: '',
        checkStatusCode: '1',
        currentPage: 1,
        pageSize: 10
      },
      shenheInput: {},
      shenheInfo: {},
      loading: '',
      addForm: {
        name: '',
        shortName: '',
        insurerTypeCode: '',
        province: '',
        provinceName: '',
        validStatusCode: '',
        taxpayIdenNo: '',
        taxpayIdenAdd: '',
        taxpayIdenPhone: '',
        taxpayIdenBank: '',
        taxpayIdenBankAcc: '',
        insurerName: '',
        isCheck: '1',
        taxpayerIden: '1',
        appliTaxRateCode: '2'
      },
      addRules: {
        name: [{ required: true, message: '请输入保险公司名称', trigger: 'blur' }],
        insurerName: [{ required: true, message: '请输入保险公司名称', trigger: 'blur' }],
        // shortName: [{ required: true, message: '请输入简称', trigger: 'blur' }],
        insurerTypeCode: [{ required: true, message: '请输入保险公司类型', trigger: 'blur' }],
        province: [{ required: true, message: '请输入所属省份', trigger: 'change' }],
        provinceName: [{ required: true, message: '请输入所属省份', trigger: 'change' }],
        validStatusCode: [{ required: true, message: '请输入状态', trigger: 'blur' }],
        taxpayerIden: [{ required: true, message: '请输入纳税人身份', trigger: 'blur' }],
        // appliTaxRateCode: [{ required: true, message: '请输入适用税率', trigger: 'blur' }],
        taxpayIdenNo: [{ required: true, message: '请输入纳税人识别号', trigger: 'blur' }],
        taxpayIdenAdd: [{ required: true, message: '请输入纳税人地址', trigger: 'blur' }],
        taxpayIdenPhone: [{ required: true, message: '请输入纳税人电话', trigger: 'blur' }],
        taxpayIdenBank: [{ required: true, message: '请输入纳税人开户行', trigger: 'blur' }],
        taxpayIdenBankAcc: [{ required: true, message: '请输入纳税人银行账号', trigger: 'blur' }]
      },
      detailInfo: {},
      changeDetailInfo: {},
      quanxian: {
        query: true,
        add: true,
        modify: true,
        del: true,
        review: true,
        import: true
      },
      modForm: {
        insurerType: '',
        name: '',
        insurerName: '',
        shortName: '',
        isCheck: '1',
        // insurerTypeCode: '',
        province: '',
        provinceName: '',
        validStatusCode: '',
        taxpayerIden: '1',
        appliTaxRateCode: '2',
        taxpayIdenNo: '',
        taxpayIdenAdd: '',
        taxpayIdenPhone: '',
        taxpayIdenBank: '',
        taxpayIdenBankAcc: ''
      },
      rules: {
        checkStatusCode: [
          { required: true, message: '请输入审核状态', trigger: 'change' }
        ]
      },
      companyQueryInfo: {
        type: '',
        clickType: '2',
        insurerCode: '',
        insurerName: '',
        currentPage: 1,
        pageSize: 10
      },
      totalRecords1: 0,
      totalRecords2: 0,
      result: '',
      fileList: [],
      comDialog: false,
      comDialogworker: false,
      comDialogCom: false,
      multipleSelection: [],
      value1: '',
      value2: '',
      checkCode: '1',
      exId: [],
      compotempData: '',
      changeDetailDialogVis: false,
      dialogTableVisibleQuery: false,
      dialogTableVisibleCode: false,
      dialogTableVisibleName: false,
      dialogTableVisibleAdd: false,
      dialogTableVisibleMod: false,
      dialogTableVisibleCheck: false,
      dialogTableVisible3: false,
      dialogTableVisible4: false,
      dialogTableVisibleImport: false,
      tableShowOrNot: false,
      delComfirmDialog: false,
      fenyetotalData: 0,
      tempTableData1: []
    }
  },
  mounted () {
    this.info.checkCode = '1'
    api(`/auth/findButtonByUserCodeAndPage?userId=${this.$store.state.login.loginUserId}&page=保险公司管理`, 'get').then(result => {
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
    'info.insurerCode' () {
      if (this.info.insurerCode === '') {
        this.info.insurerName = ''
      }
    },
    'info.insurerName' () {
      if (this.info.insurerName === '') {
        this.info.insurerCode = ''
      }
    }
  },
  methods: {
    ...mapActions([
      'queryInsuranceCo',
      'addInsurance_1',
      'delInsurance_1',
      'modInsurance_1',
      'queryInsurance_1',
      'examineInsurance_1',
      '_searchProIns',
      'getInsurers_1',
      'commissionConfigdblqueryCom1'
    ]),
    openComDialog () {
      this.companyQueryInfo.insurerCode = this.info.insurerCode
      this.companyQueryInfo.insurerName = this.info.insurerName
      this.companyQueryInfo.type = this.info.insurerTypeCode
      this.info.insurerCode = ''
      this.info.insurerName = ''
      this.searchForCom1(this.companyQueryInfo)
    },
    searchForCom1 (info) {
      this.commissionConfigdblqueryCom1(info).then(
        (res) => {
          if (res.data.code !== '000000' && !IsEmpty(res.data.code)) {
            this.openToast('warning', res.data.msg)
          } else {
            this.tempTableData1 = res.data.data.data
            this.fenyetotalData = res.data.data.totalRecords
            this.comDialog = true
            this.comDialogCom = true
            this.comDialogworker = false
          }
        }
      )
    },
    comDialogClosing () {
      this.companyQueryInfo = {
        type: '',
        clickType: '2',
        insurerCode: '',
        insurerName: '',
        currentPage: 1,
        pageSize: 10
      }
      this.comDialog = false
      this.info.insurerCode = ''
      this.info.insurerName = ''
    },
    dialogBackData (data) {
      this.companyQueryInfo = {
        type: '',
        clickType: '2',
        insurerCode: '',
        insurerName: '',
        currentPage: 1,
        pageSize: 10
      }
      this.comDialog = false
      let temp = []
      temp = data.split('-')
      this.info.insurerCode = temp[0]
      this.info.insurerName = temp[1]
    },
    changeComdialogPage1 (data) {
      this.companyQueryInfo.currentPage = data
      this.searchForCom1(this.companyQueryInfo)
    },
    changeComdialogPageSize1 (data) {
      this.companyQueryInfo.pageSize = data
      this.searchForCom1(this.companyQueryInfo)
    },
    handleCurrentChange1 (val) {
      console.log(val)
      this.info.currentPage = val
      this.query(val)
    },
    handleCurrentChange2 (val) {
      this.getInsurers_1(this.info)
    },
    addClose () {
      this.$refs['addForm'].resetFields()
      this.addForm = {
        // name: ''
        isCheck: '1',
        taxpayerIden: '1',
        appliTaxRateCode: '2'
      }
      this.dialogTableVisibleAdd = false
    },
    changeClose () {
      this.$refs['modForm'].resetFields()
      this.modForm = {
        insurerType: '',
        name: '',
        insurerName: '',
        shortName: '',
        isCheck: '1',
        // insurerTypeCode: '',
        province: '',
        provinceName: '',
        validStatusCode: '',
        taxpayerIden: '1',
        appliTaxRateCode: '2',
        taxpayIdenNo: '',
        taxpayIdenAdd: '',
        taxpayIdenPhone: '',
        taxpayIdenBank: '',
        taxpayIdenBankAcc: ''
      }
      this.dialogTableVisibleMod = false
    },
    submitForm (formName, index) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          console.log('submit!')
          this.query(1)
        } else {
          console.log('error submit!!')
          return false
        }
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
    query (page) {
      this.info.currentPage = page
      this.tableShowOrNot = true
      this.Loading()
      this.queryInsurance_1(this.info).then(
        (res) => {
          console.log(res)
          this.closeLoading()
          if (res.data.code !== '000000' && !IsEmpty(res.data.code)) {
            this.openToast('warning', res.data.msg)
          } else {
            this.totalRecords1 = this.$store.state.InsuranceCo.totalRecords
          }
        }
      )
    },
    queryPageSize1 (pageSize) {
      this.info.pageSize = pageSize
      this.query(1)
    },
    queryPageSize2 (pageSize) {
      this.info.pageSize = pageSize
      this.info.currentPage = 1
      this.queryInsurance_1(this.info).then(
        (res) => {
          console.log(res)
          if (res.data.code !== '000000' && !IsEmpty(res.data.code)) {
            this.openToast('warning', res.data.msg)
          } else {
            this.totalRecords1 = this.$store.state.InsuranceCo.totalRecords
          }
        }
      )
    },
    openChangeDetail (data) {
      console.log(data)
      let temp = {}
      temp['insurerCode'] = data.insurerCode
      api('/insurer/queryInsurerDetail', 'post', temp).then((res) => {
        this.changeDetailInfo = res.data
        this.changeDetailDialogVis = true
      })
    },
    add () {
      this.addInsurance_1(this.info).then((res) => {
        if (res.data.code !== '000000' && !IsEmpty(res.data.code)) {
          this.open('warning', res.data.msg)
        } else {
          this.open('success', res.data.msg)
          this.$refs['addForm'].resetFields()
          this.addForm = {
            // name: ''
            isCheck: '1',
            taxpayerIden: '1',
            appliTaxRateCode: '2'
          }
        }
      })
      this.dialogTableVisibleAdd = false
      this.info = {
        insurerCode: '',
        insurerName: '',
        taxrate: '',
        checkStatusCode: '1',
        currentPage: 1,
        pageSize: 10
      }
      this.info.pageSize = 10
      this.info.currentPage = 1
      this.query(1)
    },
    del () {
      if (this.multipleSelection.length > 0) {
        this.delComfirmDialog = false
        this.delInsurance_1(this.multipleSelection).then((res) => {
          console.log(res.data.code)
          console.log(res)
          if (res.data.code !== '000000' && !IsEmpty(res.data.code)) {
            this.open('warning', res.data.msg)
          } else {
            this.open('success', res.data.msg)
          }
        })
        this.$refs.multipleTable.clearSelection()
        this.info = {
          insurerCode: '',
          insurerName: '',
          taxrate: '',
          checkStatusCode: '1',
          currentPage: 1,
          pageSize: 10
        }
        this.info.pageSize = 10
        this.info.currentPage = 1
        this.query(1)
      }
    },
    mod () {
      this.modInsurance_1(this.info).then((res) => {
        console.log(res)
        if (res.data.code !== '000000' && !IsEmpty(res.data.code)) {
          this.openToast('warning', res.data.msg)
        } else {
          this.open('success', res.data.msg)
          this.$refs['modForm'].resetFields()
          this.modForm = {
            insurerType: '',
            name: '',
            insurerName: '',
            shortName: '',
            isCheck: '1',
            // insurerTypeCode: '',
            province: '',
            provinceName: '',
            validStatusCode: '',
            taxpayerIden: '1',
            appliTaxRateCode: '2',
            taxpayIdenNo: '',
            taxpayIdenAdd: '',
            taxpayIdenPhone: '',
            taxpayIdenBank: '',
            taxpayIdenBankAcc: ''
          }
        }
      })
      this.dialogTableVisibleMod = false
      this.$refs.multipleTable.clearSelection()
      this.info = {
        insurerCode: '',
        insurerName: '',
        taxrate: '',
        checkStatusCode: '1',
        currentPage: 1,
        pageSize: 10
      }
      this.info.pageSize = 10
      this.info.currentPage = 1
      this.query(1)
    },
    checkSelectable (row, index) { //  不可勾选
      if (row.checkType === '删除审核' && row.checkStatus === '通过') {
        return 0
      } else {
        return 1
      }
    },
    // 点击保险公司代码超链接s
    tableRowChange (row, event, column) {
      console.log(row)
      this.detailInfo = row
      let temp = row.province
      if (temp.indexOf('-') !== -1) {
        let tempArr = temp.split('-')
        this.detailInfo.provinceName = tempArr[1]
        this.compotempData = tempArr[1]
      } else {
        this.detailInfo.provinceName = this.compotempData
      }
      this.dialogTableVisibleQuery = true
    },
    // 审核
    examine () {
      console.log(this.multipleSelection)
      if (this.shenheInput.checkCode === '2' && IsEmpty(this.shenheInput.checkConent)) {
        this.open('warning', '需填入审核意见')
      } else if (IsEmpty(this.shenheInput.checkCode)) {
        this.open('warning', '请输入审核结果')
      } else {
        let tempArr = []
        this.shenheInfo['checkCode'] = this.shenheInput.checkCode
        this.shenheInfo['checkConent'] = this.shenheInput.checkConent
        for (let i = 0; i < this.multipleSelection.length; i++) {
          tempArr.push(this.multipleSelection[i].exId)
        }
        this.shenheInfo['exId'] = tempArr
        this.examineInsurance_1(this.shenheInfo).then((res) => {
          console.log(res)
          if (res.data.code !== '000000' && !IsEmpty(res.data.code)) {
            this.open('warning', res.data.msg)
          } else {
            this.open('success', res.data.msg)
          }
          this.shenheInput = {}
          this.query(1)
        })
        this.multipleSelection = []
        this.dialogTableVisibleCheck = false
        this.$refs.multipleTable.clearSelection()
      }
    },
    // 返回
    back () {
      this.changeDetailDialogVis = false
      this.dialogTableVisibleCheck = false
      this.dialogTableVisibleQuery = false
      this.delComfirmDialog = false
    },
    // 修改弹框是否弹出
    modDialog () {
      console.log(this.multipleSelection)
      if (this.multipleSelection.length === 1) {
        this.modForm = this.multipleSelection[0]
        if (this.multipleSelection[0].province.indexOf('-') !== -1) {
          let tempArr = this.multipleSelection[0].province.split('-')
          this.modForm.provinceName = tempArr[1]
          this.compotempData = tempArr[1]
        } else {
          this.modForm.provinceName = this.compotempData
        }
        if (this.modForm.checkStatus === '待审核') {
          this.open('warning', '待审核的不能修改')
        } else {
          this.dialogTableVisibleMod = true
        }
      } else if (this.multipleSelection.length > 1) {
        this.open('warning', '只能修改单条数据！')
      } else if (this.multipleSelection.length === 0) {
        this.open('warning', '必须勾选一条记录后才能修改')
      }
    },
    // 删除弹框是否弹出
    delDialog () {
      if (this.multipleSelection.length > 0) {
        this.modForm = this.multipleSelection[0]
        if (this.multipleSelection[0].province.indexOf('-') !== -1) {
          let tempArr = this.multipleSelection[0].province.split('-')
          this.modForm.provinceName = tempArr[1]
          this.compotempData = tempArr[1]
        } else {
          this.modForm.provinceName = this.compotempData
        }
        if (this.modForm.checkStatus === '待审核') {
          this.open('warning', '待审核的不能删除')
        } else {
          this.delComfirmDialog = true
        }
      } else {
        this.open('warning', '必须勾选一条记录后才能删除')
      }
    },
    // 审核弹框是否弹出
    checkDialog () {
      let tempFlag = true
      if (this.multipleSelection.length > 0) {
        for (let i = 0; i < this.multipleSelection.length; i++) {
          if (this.multipleSelection[i].checkStatus !== '待审核') {
            tempFlag = false
          }
        }
        if (tempFlag) {
          this.dialogTableVisibleCheck = true
        } else {
          this.open('warning', '只有待审核的记录能操作审核')
        }
      } else {
        this.open('warning', '必须勾选至少一条记录后才能审核')
      }
    },
    handleSelectionChange (val) {
      this.multipleSelection = val
    },
    // 新增的提交表单
    _addForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.addInsurance_1(this.addForm).then((res) => {
            console.log(res)
            if (res.data.code !== '000000' && !IsEmpty(res.data.code)) {
              this.openToast('warning', res.data.msg)
            } else {
              this.openToast('success', res.data.msg)
              this.$refs['addForm'].resetFields()
              this.info = {
                insurerCode: '',
                insurerName: '',
                taxrate: '',
                checkStatusCode: '1',
                currentPage: 1,
                pageSize: 10
              }
              this.addForm = {
                // name: ''
                isCheck: '1',
                taxpayerIden: '1',
                appliTaxRateCode: '2'
              }
            }
          })
          this.dialogTableVisibleAdd = false
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    // 修改的提交表单
    _modForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.info = this.modForm
          this.mod()
          this.$refs.multipleTable.clearSelection()
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    // toast提示
    openToast (type, mesg) {
      this.$message({
        showClose: true,
        message: mesg,
        type: type
      })
    },
    clearTheOther (index) {
      switch (index) {
        case 0:
          if (IsEmpty(this.info.insurerCode)) {
            this.info.insurerName = ''
          }
          break
        case 1:
          if (IsEmpty(this.info.insurerName)) {
            this.info.insurerCode = ''
          }
          break
        default:
          break
      }
    },
    handleProSelect (addForm) { // 省份选择
      console.log(addForm)
      this.addForm.province = `${addForm.configSetValueCode}-${addForm.configSetValueName}`
      this.addForm.provinceName = addForm.configSetValueName
    },
    _handleProSelect (modForm) { // 省份选择
      console.log(modForm)
      // this.tempData = modForm.configSetValueName
      this.modForm.provinceName = `${modForm.configSetValueName}`
      this.modForm.province = `${modForm.configSetValueCode}-${modForm.configSetValueName}`
      console.log(this.modForm)
    },
    querySearchAsync (queryString, cb) { // 查询省份 cb callBack方法
      let temp = ''
      if (!IsEmpty(queryString)) {
        if (queryString.indexOf('-') !== -1) {
          let tempArr = queryString.split('-')
          for (let i = 0; i < tempArr.length; i++) {
            if (!IsEmpty(tempArr[i])) {
              temp = tempArr[i]
            }
          }
        } else {
          temp = queryString
        }
      }
      this._searchProIns({'codeOrName': temp, 'provinceOrCity': 'province'}).then(resp => {
        this.proSearch = resp
        cb(this.proSearch)
      })
    },
    uploadUrl () {
      return '/tabycore/insurer/importInsurers'
    },
    downTem () {
      window.open('/tabycore/rate/downloadModel?downType=basesupplyinsurance')
    },
    handleEXLSuccess (res) {
      if (res.code !== '000000') {
        this.openToast('error', res.msg)
        this.fileList = []
      } else {
        this.openToast('success', res.msg)
      }
    },
    // toast提示
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
    [LineTittle.name]: LineTittle,
    [LabelText.name]: LabelText,
    ComDialog
  },
  created () {
  },
  computed: {
    comDialogData () {
      let temp = this.tempTableData1
      if (!IsEmpty(temp)) {
        if (!IsEmpty(temp[0].insurercode) && !IsEmpty(temp[0].insurername)) {
          for (let i = 0; i < temp.length; i++) {
            temp[i]['renderData'] = `${temp[i].insurercode}-${temp[i].insurername}`
          }
        }
      }
      return temp
    },
    InsuranceCo () {
      return this.$store.state.InsuranceCo.Insurance
    },
    getInsurers () {
      return this.$store.state.InsuranceCo.getInsurers
    },
    totalRecords () {
      return parseInt(this.$store.state.InsuranceCo.totalRecords)
    },
    checkChangeDetail (data) {
      return function (data) {
        if (data.checkStatus === '待审核' && data.checkType === '修改审核') {
          return true
        }
        return false
      }
    }
  }
}
</script>

<style lang="scss" scoped type="text/css">
#home_index{padding: 0px 30px 30px 30px;}
#orgadd {padding-left: 30px;padding-right: 30px;}
.ri-content{margin: 1.25rem 0;}
.btn-container{width: 100px;float: left;text-align: center;margin-top: 40px;margin-bottom: 30px;margin-left: 20px;padding-left: 40px;}
.ri-line{margin-top: 10px;margin-bottom: 10px;}
.datestyle{color: #717171;font-size: 0.875rem;display: inline-block;width: auto;}
.el-pagination{float: right;padding-right: 50px;}
.rate-wrapper {text-align: center}
.center{text-align: center}
.download{
  text-align: center
}
</style>
