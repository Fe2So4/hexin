<template>
  <div id="insManage">
    <ui-notice-bar slot="breadcast" >
      <el-breadcrumb slot="location" separator=">">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>供应商管理</el-breadcrumb-item>
        <el-breadcrumb-item>保险机构管理</el-breadcrumb-item>
      </el-breadcrumb>
   </ui-notice-bar>
    <!-- 条件查询 -->
    <el-form class="mesg_form" :model="searchList" ref="searchList" :rules="rule">
      <el-row>
        <el-col :span="12">
          <el-form-item prop="insurerCode">
            <ui-label-text :required="true"  label="保险公司代码:" labelWidth="100" >
              <el-input slot="text" placeholder="双击可选择" v-model="searchList.insurerCode" clearable @dblclick.native="getComInfo(1, 0, 5)" @blur="blurCom($event, 0, 0)" ></el-input>
            </ui-label-text>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item prop="insurerName">
            <ui-label-text  :required="true" label="保险公司名称:" labelWidth="100" >
              <el-input slot="text" placeholder="双击可选择" clearable v-model="searchList.insurerName" @dblclick.native="getComInfo(1, 0, 5)" @blur="blurCom($event, 0, 0)" ></el-input>
            </ui-label-text>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item>
            <ui-label-text class="selectList" label="保险公司类型:" labelWidth="100" >
              <el-select v-model="searchList.insurerTypeCode" size='mini' slot="text" placeholder="请选择">
                <el-option label="财险" value="1"> </el-option>
                <el-option  label="寿险" value="2"> </el-option>
                <el-option label="银保代理" value="3"> </el-option>
              </el-select>
            </ui-label-text>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item class="no-margin">
            <ui-label-text label="保险机构代码:" labelWidth="100" >
              <el-input clearable placeholder="双击可选择" slot="text"  v-model="searchList.orgCode" @dblclick.native="getOrgInfo(1, 0, 5)" @blur="blurOrg($event, 0)" ></el-input>
            </ui-label-text>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item>
            <ui-label-text label="保险机构名称:" labelWidth="100" >
              <el-input clearable placeholder="双击可选择" slot="text" v-model="searchList.orgName" @dblclick.native="getOrgInfo(1, 0, 5)"  @blur="blurOrg($event, 0)" ></el-input>
            </ui-label-text>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item>
            <ui-label-text class="selectList" label="审核状态:" labelWidth="100" >
              <el-select v-model="searchList.checkStatusCode" size='mini' slot="text" placeholder="请选择">
                <el-option label="审核通过" value="1"> </el-option>
                <el-option  label="审核不通过" value="2"> </el-option>
                <el-option label="待审核" value="3"> </el-option>
              </el-select>
            </ui-label-text>
          </el-form-item>
        </el-col>
      </el-row>
      <div class='btn-container'>
        <el-button type="primary" :disabled="!limt.query" @click.native.prevent="searchInsList(1)" class="searchBtn" >查询</el-button>
        <el-button type="primary" :disabled="!limt.add" @click.native.prevent="add_dialog = true"  >新增</el-button>
        <el-button size="primary" :disabled="!limt.modify" @click.native.prevent="modifyOrg"  >修改</el-button>
        <el-button type="danger" :disabled="!limt.del" @click.native.prevent="deleteOrg" >删除</el-button>
        <el-button type="primary" :disabled="!limt.review" @click.native.prevent='audit' >审核</el-button>
        <el-button type='primary' :disabled="!limt.import" @click.native.prevent="isImport = true">批量导入</el-button>
      </div>
    </el-form>
    <el-table stripe ref="multipleTable" :data="insTableData" v-if='isShowTable' tooltip-effect="dark" style="width: 100%" @selection-change="handleSelectionChange" >
      <el-table-column type="selection" :selectable="checkSelectable" width="55">
      </el-table-column>
      <el-table-column prop="orgCode" label="保险机构代码" width="120">
         <template slot-scope="scope">
           <a href="javascript:void(0)" @click="detailOrg(scope.row)">{{scope.row.orgCode}}</a>
          </template>
      </el-table-column>
      <el-table-column prop="orgName" label="保险机构名称"></el-table-column>
      <el-table-column prop="insurerName" label="所属保险公司名称" ></el-table-column>
      <el-table-column prop="insurerType" label="保险机构类型" ></el-table-column>
      <el-table-column prop="validStatus" label="有效状态"></el-table-column>
      <el-table-column prop="checkStatus" label="审核状态" >
        <template slot-scope="scope">
          {{ scope.row.checkStatusCode === '1' ?  '审核通过': '' }}
          {{ scope.row.checkStatusCode === '2' ?  '审核不通过': '' }}
          {{ scope.row.checkStatusCode === '3' ?  '待审核': '' }}
        </template>
      </el-table-column>
      <el-table-column prop="checkTypeCode" label="审核类型" >
        <template slot-scope="scope">
          {{ scope.row.checkTypeCode === '1' ?  '新增审核': '' }}
          {{ scope.row.checkTypeCode === '2' ?  '修改审核': '' }}
          {{ scope.row.checkTypeCode === '3' ?  '删除审核': '' }}
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
            <el-button type="primary" v-if="scope.row.checkTypeCode === '2' && scope.row.checkStatusCode === '3' " size='mini' @click="detailOrgBefor(scope.row)">查看</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="pagination" v-if='isShowTable'>
      <el-pagination @size-change="searchSizeChange" @current-change='handleCurrentChange'  :current-page.sync="current"  :pager-count='5' :page-size='5' :total="seaTotalRecords" :page-sizes="sizeNum" layout="total, sizes, prev, pager, next, jumper" :page-count="seaTotalPages"></el-pagination>
    </div>
    <!-- 添加弹框 -->
    <el-dialog class="cooMange" title="保险机构新增" center @close='closeAdd' :append-to-body='true'  width="70%" :visible.sync="add_dialog">
      <el-form class="add_form" :model="addinfo" ref="addinfo" :rules="ruleAdd">
        <ui-line-tittle :collapsible="true" >
          <span slot="title" >
              <i class="font_family icon-jy-menu-4" ></i>保险机构新增
          </span>
          <div class="ri-content" slot="content">
            <el-row>
              <el-col :span="12">
                <el-form-item>
                  <ui-label-text labelWidth="130" label="保险机构代码:" text="系统自动编码" ></ui-label-text>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item prop="orgName">
                  <ui-label-text :required="true" labelWidth="130"  label="保险机构名称:" >
                    <el-input clearable v-model="addinfo.orgName" slot="text" ></el-input>
                  </ui-label-text>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item prop="insurerCode">
                  <ui-label-text :required="true" labelWidth="130" label="所属保险公司代码:" >
                    <el-input clearable placeholder="双击选择" v-model="addinfo.insurerCode" @dblclick.native="getComInfo(1, 1, 5)" @blur="blurCom($event, 1, 0)" slot="text" ></el-input>
                  </ui-label-text>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item prop="insurerName">
                  <ui-label-text :required="true" labelWidth="130" label="所属保险公司名称:" >
                    <el-input clearable placeholder="双击选择" v-model="addinfo.insurerName" @dblclick.native="getComInfo(1, 1, 5)" @blur="blurCom($event, 1, 1)" slot="text" ></el-input>
                  </ui-label-text>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item prop="insurerTypeCode">
                  <ui-label-text :required="true" labelWidth="130" label="保险机构类型:" >
                      <el-select v-model="addinfo.insurerTypeCode" slot="text" placeholder="请选择">
                      <el-option label="财险" value="1"></el-option>
                      <el-option label="寿险" value="2"></el-option>
                      <el-option label="银保代理" value="3"></el-option>
                    </el-select>
                  </ui-label-text>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item prop="provinceName">
                  <ui-label-text :required="true"  labelWidth="130" label="所属省份:" >
                    <el-autocomplete v-model="addinfo.provinceName" slot="text" :fetch-suggestions="querySearchAsync"  placeholder="请输入内容"  @select="handleProSelect" >
                      <template slot-scope="{ item }">
                        <span class="code">{{ item.configSetValueCode }}</span>-
                        <span class="name">{{ item.configSetValueName }}</span>
                      </template>
                    </el-autocomplete>
                  </ui-label-text>
                </el-form-item>
              </el-col>
            </el-row>
              <el-row class="ri-line">
                <el-col :span="12">
                  <el-form-item prop="validStatusCode">
                    <ui-label-text  :required="true" labelWidth="130" label="状态:" >
                        <el-select v-model="addinfo.validStatusCode" slot="text" placeholder="请选择">
                        <el-option label="有效" value="1"></el-option>
                        <el-option label="无效" value="0"></el-option>
                      </el-select>
                    </ui-label-text>
                </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item>
                    <ui-label-text labelWidth="130" label="备注:" >
                      <el-input clearable type="textarea" autosize  v-model="addinfo.remark" slot="text" ></el-input>
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
                <el-form-item prop="taxpayerIdenCode">
                  <ui-label-text :required="true"  labelWidth="130" label="纳税人身份:" >
                      <el-select v-model="addinfo.taxpayerIdenCode" slot="text" placeholder="请选择">
                      <el-option label="增值税一般纳税人" value="1"></el-option>
                      <el-option label="增值税小规模纳税人" value="2"></el-option>
                      <el-option label="非独立纳税人" value="3"></el-option>
                    </el-select>
                  </ui-label-text>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item prop="taxpayIdenNo">
                  <ui-label-text :required="true"  labelWidth="130" label="纳税人识别号:" >
                    <el-input clearable v-model="addinfo.taxpayIdenNo" slot="text" ></el-input>
                  </ui-label-text>
                </el-form-item>
              </el-col>
              <!-- <el-col :span="12">
                <el-form-item prop="appliTaxRateCode">
                  <ui-label-text :required="true"  labelWidth="130" label="适用税率:" >
                    <el-select v-model="addinfo.appliTaxRateCode" slot="text" placeholder="请选择">
                      <el-option label="3%" value="1"></el-option>
                      <el-option label="6%" value="2"></el-option>
                    </el-select>
                  </ui-label-text>
                </el-form-item>
              </el-col> -->
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item prop="taxpayIdenAdd">
                  <ui-label-text :required="true"  labelWidth="130" label="纳税人地址:" >
                    <el-input clearable v-model="addinfo.taxpayIdenAdd" slot="text" ></el-input>
                  </ui-label-text>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item prop="taxpayIdenPhone">
                  <ui-label-text :required="true"  labelWidth="130" label="纳税人电话:" >
                    <el-input clearable v-model="addinfo.taxpayIdenPhone" slot="text" ></el-input>
                  </ui-label-text>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item prop="taxpayIdenBank">
                  <ui-label-text :required="true"  labelWidth="130" label="纳税人开户行:" >
                    <el-input clearable v-model="addinfo.taxpayIdenBank" slot="text" ></el-input>
                  </ui-label-text>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item prop="taxpayIdenBankAcc">
                  <ui-label-text :required="true"  labelWidth="130" label="纳税人银行卡号:" >
                    <el-input clearable v-model="addinfo.taxpayIdenBankAcc" slot="text" ></el-input>
                  </ui-label-text>
                </el-form-item>
              </el-col>
            </el-row>
          </div>
        </ui-line-tittle>
      </el-form>
      <div style="text-align: center; margin-top: 30px;" >
        <el-button type='primary' @click.native.prevent="addPut">提交</el-button>
      </div>
    </el-dialog>
    <!-- 审核弹框 -->
    <el-dialog title="保险机构审核"  :append-to-body='true'  center :visible.sync="audit_dialog">
      <ui-line-tittle :collapsible="true" >
        <span slot="title" >
          <i class="font_family icon-jy-menu-4" ></i>保险机构审核
        </span>
        <div class="ri-content" slot="content">
          <el-form :model="auditResult">
            <el-form-item label="审核结果:">
              <el-radio v-model="auditResult.checkCode" label="1">审核通过</el-radio>
              <el-radio v-model="auditResult.checkCode" label="2">审核不通过</el-radio>
            </el-form-item>
            <el-form-item label="审核意见:">
              <el-input type="textarea"  :rows='5' style="width: 85%; "  v-model="auditResult.checkConent" ></el-input>
            </el-form-item>
          </el-form>
          <div slot="footer" style="text-align: center; ">
            <el-button @click="audit_dialog = false">返 回</el-button>
            <el-button type="primary" @click="auditPut">审 核</el-button>
          </div>
        </div>
      </ui-line-tittle>
    </el-dialog>
    <!-- 修改弹窗 -->
    <el-dialog class="cooMange" title="保险机构修改"  @close='closeMod' center :append-to-body='true' width="70%" :visible.sync="modify_dialog">
      <el-form class="add_form" :model="modifyinfo" ref="modifyinfo" :rules="ruleAdd">
        <ui-line-tittle :collapsible="true" >
          <span slot="title" >
              <i class="font_family icon-jy-menu-4" ></i>保险机构新增
          </span>
          <div class="ri-content" slot="content">
            <el-row>
              <el-col :span="12">
                <el-form-item>
                  <ui-label-text labelWidth="130" label="保险机构代码:" :text="modifyinfo.orgCode" ></ui-label-text>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item prop="orgName">
                  <ui-label-text :required="true" labelWidth="130"  label="保险机构名称:" >
                    <el-input clearable v-model="modifyinfo.orgName" slot="text" ></el-input>
                  </ui-label-text>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item prop="insurerCode">
                  <ui-label-text :required="true" labelWidth="130" label="所属保险公司代码:" >
                    <el-input clearable placeholder="双击选择" v-model="modifyinfo.insurerCode" @dblclick.native="getComInfo(1, 2, 5)" @blur="blurCom($event, 2, 0)" slot="text" ></el-input>
                  </ui-label-text>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item prop="insurerName">
                  <ui-label-text :required="true" labelWidth="130" label="所属保险公司名称:" >
                    <el-input clearable placeholder="双击选择" @blur="blurCom($event, 2, 1)" v-model="modifyinfo.insurerName" @dblclick.native="getComInfo(1, 2, 5)" slot="text" ></el-input>
                  </ui-label-text>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item prop="insurerTypeCode">
                  <ui-label-text :required="true" labelWidth="130" label="保险机构类型:" >
                      <el-select v-model="modifyinfo.insurerTypeCode" slot="text" placeholder="请选择">
                      <el-option label="财险" value="1"></el-option>
                      <el-option label="寿险" value="2"></el-option>
                      <el-option label="银保代理" value="3"></el-option>
                    </el-select>
                  </ui-label-text>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item prop="provinceName">
                  <ui-label-text :required="true"  labelWidth="130" label="所属省份:" >
                    <el-autocomplete v-model="modifyinfo.provinceName" slot="text" :fetch-suggestions="querySearchAsync"  placeholder="请输入内容"  @select="handleProSelect_mod" >
                      <template slot-scope="{ item }">
                        <span class="code">{{ item.configSetValueCode }}</span>-
                        <span class="name">{{ item.configSetValueName }}</span>
                      </template>
                    </el-autocomplete>
                  </ui-label-text>
                </el-form-item>
              </el-col>
            </el-row>
              <el-row class="ri-line">
                <el-col :span="12">
                  <el-form-item prop="validStatusCode">
                    <ui-label-text  :required="true" labelWidth="130" label="状态:" >
                        <el-select v-model="modifyinfo.validStatusCode" slot="text" placeholder="请选择">
                        <el-option label="有效" value="1"></el-option>
                        <el-option label="无效" value="0"></el-option>
                      </el-select>
                    </ui-label-text>
                </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item>
                    <ui-label-text labelWidth="130" label="备注:" >
                      <el-input clearable type="textarea" autosize  v-model="modifyinfo.remark" slot="text" ></el-input>
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
                <el-form-item prop="taxpayerIdenCode">
                  <ui-label-text :required="true"  labelWidth="130" label="纳税人身份:" >
                      <el-select v-model="modifyinfo.taxpayerIdenCode" slot="text" placeholder="请选择">
                      <el-option label="增值税一般纳税人" value="1"></el-option>
                      <el-option label="增值税小规模纳税人" value="2"></el-option>
                      <el-option label="非独立纳税人" value="3"></el-option>
                    </el-select>
                  </ui-label-text>
                </el-form-item>
              </el-col>
              <!-- <el-col :span="12">
                <el-form-item prop="appliTaxRateCode">
                  <ui-label-text :required="true"  labelWidth="130" label="适用税率:" >
                    <el-select v-model="modifyinfo.appliTaxRateCode" slot="text" placeholder="请选择">
                      <el-option label="3%" value="1"></el-option>
                      <el-option label="6%" value="2"></el-option>
                    </el-select>
                  </ui-label-text>
                </el-form-item>
              </el-col> -->
              <el-col :span="12">
                <el-form-item prop="taxpayIdenNo">
                  <ui-label-text :required="true"  labelWidth="130" label="纳税人识别号:" >
                    <el-input clearable v-model="modifyinfo.taxpayIdenNo" slot="text" ></el-input>
                  </ui-label-text>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item prop="taxpayIdenAdd">
                  <ui-label-text :required="true"  labelWidth="130" label="纳税人地址:" >
                    <el-input clearable v-model="modifyinfo.taxpayIdenAdd" slot="text" ></el-input>
                  </ui-label-text>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item prop="taxpayIdenPhone">
                  <ui-label-text :required="true"  labelWidth="130" label="纳税人电话:" >
                    <el-input clearable v-model="modifyinfo.taxpayIdenPhone" slot="text" ></el-input>
                  </ui-label-text>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item prop="taxpayIdenBank">
                  <ui-label-text :required="true"  labelWidth="130" label="纳税人开户行:" >
                    <el-input clearable v-model="modifyinfo.taxpayIdenBank" slot="text" ></el-input>
                  </ui-label-text>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item prop="taxpayIdenBankAcc">
                  <ui-label-text :required="true"  labelWidth="130" label="纳税人银行卡号:" >
                    <el-input clearable v-model="modifyinfo.taxpayIdenBankAcc" slot="text" ></el-input>
                  </ui-label-text>
                </el-form-item>
              </el-col>
            </el-row>
          </div>
        </ui-line-tittle>
      </el-form>
      <div style="text-align: center; margin-top: 30px;" >
        <el-button type='primary' @click.native.prevent="modifyPut">提交</el-button>
      </div>
    </el-dialog>
    <!-- 删除提示 -->
    <el-dialog title="提示" center :append-to-body='true' :visible.sync="isDelete" width="30%" >
      <p style="text-align: center; ">确定删除？</p>
      <span slot="footer" class="dialog-footer">
        <el-button @click="isDelete = false">取 消</el-button>
        <el-button type="primary" @click="deleteTrue">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 获取保险公司 -->
    <el-dialog title="保险公司" :before-close='comClose'  center :append-to-body='true' :visible.sync="com_dialog" width="50%">
      <el-table stripe @row-click='selectRowCom' ref="multipleTable" :data="insComTableData" >
        <el-table-column prop="insurercode" label="保险公司代码" center ></el-table-column>
        <el-table-column prop="insurername" label="保险公司名称" center ></el-table-column>
      </el-table>
      <div class="pagination" >
        <el-pagination @size-change="comSizeChange" @current-change='comCurrentChange' :page-sizes='orgComSize' :current-page.sync="currentD" layout="total, sizes, prev, pager, next, jumper" :pager-count='5' :total="totalRecordD" :page-count="totalPageD" :page-size="5"> </el-pagination>
      </div>
    </el-dialog>
    <!-- 获取保险公司机构 -->
    <el-dialog title="保险公司机构" :before-close='orgClose'  :append-to-body='true' :visible.sync="org_dialog" width="50%" center>
      <el-table stripe @row-click='selectRowOrg' ref="multipleTable" :data="insOrgTableData" >
        <el-table-column prop="orgcode" label="保险机构代码" center ></el-table-column>
        <el-table-column prop="orgname" label="保险机构名称" center ></el-table-column>
      </el-table>
      <div class="pagination" >
        <el-pagination @size-change="orgSizeChange" @current-change='orgCurrentChange' :page-sizes='orgComSize' :current-page.sync="currentD" layout="total, sizes, prev, pager, next, jumper" :pager-count='5' :total="totalRecordD" :page-size="5" :page-count="totalPageD"> </el-pagination>
      </div>
    </el-dialog>
    <!-- 详情弹窗 -->
    <el-dialog title="保险机构详情" center  :append-to-body='true' width="70%" :visible.sync="detail_dialog">
      <el-form class="add_form">
        <ui-line-tittle :collapsible="true" >
          <span slot="title" >
              <i class="font_family icon-jy-menu-4" ></i>保险机构
          </span>
          <div class="ri-content" slot="content">
            <el-row>
              <el-col :span="12">
                <el-form-item>
                  <ui-label-text :required="true" labelWidth="130" label="保险机构代码:" :text="detailData.orgCode" ></ui-label-text>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item>
                  <ui-label-text :required="true" labelWidth="130"  label="保险机构名称:" >
                    <el-input v-model="detailData.orgName" :disabled="true" slot="text" ></el-input>
                  </ui-label-text>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row class="ri-line">
              <el-col :span="12">
                <el-form-item>
                  <ui-label-text :required="true" labelWidth="130" label="所属保险公司代码:" >
                    <el-input v-model="detailData.insurerCode" :disabled="true" slot="text" ></el-input>
                  </ui-label-text>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item>
                  <ui-label-text labelWidth="130" label="所属保险公司名称:" >
                    <el-input v-model="detailData.insurerName" :disabled="true" slot="text" ></el-input>
                  </ui-label-text>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row class="ri-line">
              <el-col :span="12">
                <el-form-item>
                  <ui-label-text :required="true" labelWidth="130" label="保险机构类型:" >
                      <el-select v-model="detailData.insurerTypeCode" disabled slot="text" placeholder="请选择">
                      <el-option label="财险" value="1"></el-option>
                      <el-option label="寿险" value="2"></el-option>
                      <el-option label="银保代理" value="3"></el-option>
                    </el-select>
                  </ui-label-text>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item>
                  <ui-label-text :required="true" labelWidth="130" label="所属省份:" >
                    <el-input v-model="detailData.provinceName" :disabled="true" slot="text" ></el-input>
                  </ui-label-text>
                </el-form-item>
              </el-col>
            </el-row>
              <el-row class="ri-line">
                <el-col :span="12">
                  <el-form-item>
                    <ui-label-text :required="true" labelWidth="130" label="状态:" >
                        <el-select v-model="detailData.validStatusCode" disabled slot="text" placeholder="请选择">
                        <el-option label="有效" value="1"></el-option>
                        <el-option label="无效" value="0"></el-option>
                      </el-select>
                    </ui-label-text>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item>
                    <ui-label-text  labelWidth="130" label="备注:" >
                      <el-input type="textarea" autosize :disabled="true"  v-model="detailData.remark" slot="text" ></el-input>
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
            <el-row class="ri-line">
              <el-col :span="12">
                <el-form-item>
                  <ui-label-text :required="true"  labelWidth="130" label="纳税人身份:" >
                      <el-select v-model="detailData.taxpayerIdenCode" disabled slot="text" placeholder="请选择">
                      <el-option label="增值税一般纳税人" value="1"></el-option>
                      <el-option label="增值税小规模纳税人" value="2"></el-option>
                      <el-option label="非独立纳税人" value="3"></el-option>
                    </el-select>
                  </ui-label-text>
                </el-form-item>
              </el-col>
              <!-- <el-col :span="12">
                <el-form-item>
                  <ui-label-text :required="true" labelWidth="130" label="适用税率:" >
                    <el-select v-model="detailData.appliTaxRateCode" disabled slot="text" placeholder="请选择">
                      <el-option label="3%" value="1"></el-option>
                      <el-option label="6%" value="2"></el-option>
                    </el-select>
                  </ui-label-text>
                </el-form-item>
              </el-col> -->
              <el-col :span="12">
                <el-form-item>
                  <ui-label-text :required="true" labelWidth="130" label="纳税人识别号:" >
                    <el-input v-model="detailData.taxpayIdenNo" :disabled="true" slot="text" ></el-input>
                  </ui-label-text>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row class="ri-line">
              <el-col :span="12">
                <el-form-item>
                  <ui-label-text :required="true" labelWidth="130" label="纳税人地址:" >
                    <el-input v-model="detailData.taxpayIdenAdd" :disabled="true" slot="text" ></el-input>
                  </ui-label-text>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item>
                  <ui-label-text :required="true" labelWidth="130" label="纳税人电话:" >
                    <el-input v-model="detailData.taxpayIdenPhone" :disabled="true" slot="text" ></el-input>
                  </ui-label-text>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row class="ri-line">
              <el-col :span="12">
                <el-form-item>
                  <ui-label-text :required="true" labelWidth="130" label="纳税人开户行:" >
                    <el-input v-model="detailData.taxpayIdenBank" :disabled="true" slot="text" ></el-input>
                  </ui-label-text>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item>
                  <ui-label-text :required="true" labelWidth="130" label="纳税人银行卡号:" >
                    <el-input v-model="detailData.taxpayIdenBankAcc" :disabled="true" slot="text" ></el-input>
                  </ui-label-text>
                </el-form-item>
              </el-col>
            </el-row>
          </div>
        </ui-line-tittle>
      </el-form>
    </el-dialog>
    <!-- 上传弹框 -->
    <el-dialog :append-to-body='true' center width='40%' title="保险机构导入"  :visible.sync="isImport" >
      <ui-line-tittle :collapsible="true" >
          <span slot="title" >
              <i class="font_family icon-jy-menu-4" ></i>保险机构导入
          </span>
          <div class="ri-content" slot="content">
            <div class="download">
              <a @click="downTemp()" href="javascript:void(0)" download>模板下载</a>
            </div>
            <div class="upLoad">
              <el-upload class="upload-demo" :action="uploadUrl()" name="fileName" :limit="1" accept='xls' :on-success="handleEXLSuccess" :file-list="fileList">
                <el-button size="small" style="text-align: center; " type="primary">点击上传</el-button>
              </el-upload>
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
      sizeList: [5, 10, 20, 50],
      orgComSize: [5, 10, 20, 50],
      sizeNum: [],
      fileList: [],
      rule: {
        insurerCode: [
          { required: true, message: '请输入保险公司代码', trigger: 'change' }
        ],
        insurerName: [
          { required: true, message: '请输入保险公司名称', trigger: 'change' }
        ]
      },
      ruleAdd: {
        orgName: [
          { required: true, message: '请输入保险机构名称', trigger: 'change' }
        ],
        insurerCode: [
          { required: true, message: '请输入保险公司代码', trigger: 'change' }
        ],
        insurerName: [
          { required: true, message: '请输入保险公司名称', trigger: 'change' }
        ],
        provinceName: [
          { required: true, message: '请输入省份', trigger: 'change' }
        ],
        insurerTypeCode: [
          { required: true, message: '请输入公司类型', trigger: 'change' }
        ],
        validStatusCode: [
          { required: true, message: '必填项不能为空', trigger: 'change' }
        ],
        taxpayerIdenCode: [
          { required: true, message: '必填项不能为空', trigger: 'change' }
        ],
        taxpayIdenNo: [
          { required: true, message: '必填项不能为空', trigger: 'change' }
        ],
        taxpayIdenAdd: [
          { required: true, message: '必填项不能为空', trigger: 'change' }
        ],
        taxpayIdenBankAcc: [
          { required: true, message: '必填项不能为空', trigger: 'change' }
        ],
        taxpayIdenPhone: [
          { required: true, message: '必填项不能为空', trigger: 'change' }
        ],
        taxpayIdenBank: [
          { required: true, message: '必填项不能为空', trigger: 'change' }
        ]
      },
      flag: '',
      searchList: {
        insurerCode: '',
        insurerName: '',
        orgCode: '',
        orgName: '',
        checkStatusCode: '1',
        insurerTypeCode: '2'
      }, // 查询条件
      postList: {},
      isShowTable: false, // 是否显示查询列表
      seaTotalRecords: 0, // 分页总条数
      seaTotalPages: 0, // 分页总页数
      totalRecords: 0, // 分页总条数
      totalPages: 0, // 分页总页数
      current: 1,
      pageSize: 5,
      totalRecordD: 0, // 分页总条数
      totalPageD: 0, // 分页总页数
      currentD: 1,
      pageSizeD: 5,
      pageSizeCom: 5,
      pageSizeOrg: 5,
      info: {},
      insTableData: [], // 查询数据
      auditResult: {}, // 审核数据
      auditList: [],
      audit_dialog: false, // 是否显示审核弹框
      modify_dialog: false, // 是否显示修改弹框
      add_dialog: false, // 是否显示添加弹框
      addinfo: {
        insurerCode: '',
        insurerName: '',
        validStatusCode: '1',
        taxpayerIdenCode: '1',
        appliTaxRateCode: '2',
        insurerType: '',
        insurerTypeCode: '',
        taxpayIdenNo: '',
        taxpayIdenAdd: '',
        taxpayIdenBankAcc: '',
        taxpayIdenPhone: '',
        taxpayIdenBank: ''
      }, // 添加提交数据
      proSearch: [], // 省份列表
      provinceName: '', // 记录省份
      selectItem: [], // 勾选条目
      modifyinfo: {
        orgName: '',
        insurerCode: '',
        insurerName: '',
        provinceName: '',
        insurerType: '',
        insurerTypeCode: '',
        validStatusCode: '',
        taxpayerIdenCode: '',
        appliTaxRateCode: '',
        taxpayIdenNo: '',
        taxpayIdenAdd: '',
        taxpayIdenBankAcc: '',
        taxpayIdenPhone: '',
        taxpayIdenBank: ''
      }, // 添加提交数据
      isDelete: false, // 是否显示提示弹框
      deleteItem: [], // 删除条目
      com_dialog: false, // 是否显示公司弹框
      insComTableData: [], // 保险公司数据
      isComType: '',
      org_dialog: false, // 是否显示机构弹框
      insOrgTableData: [], // 保险机构数据
      isOrgType: '',
      detailData: {},
      detail_dialog: false,
      isImport: false,
      loading: '',
      limt: {
        add: false,
        modify: false,
        review: false,
        query: false,
        import: false,
        del: false
      }
    }
  },
  mounted () {
    this.getBtnLimt()
  },
  methods: {
    getBtnLimt () { // 按钮权限
      let userId = getUserId()
      if (userId === null || userId === undefined) {
        userId = ''
      }
      let post = {
        'userId': userId,
        'page': '保险机构管理'
      }
      this.getBtnLimt_InsOrg(post).then(resp => {
        if (resp.code === '000000') {
          resp.data.forEach((item, index) => {
            this.limt[item.code] = item.checked
          })
        }
      })
    },
    searchInsList (page) { // 查询列表
      this.current = page
      this.sizeNum = [5, 10, 20, 50]
      this.searchList.currentPage = page
      this.searchList.pageSize = this.pageSize
      this.$refs['searchList'].validate((valid) => {
        if (valid) {
          this.postList = JSON.parse(JSON.stringify(this.searchList))
          this.postIns(this.postList)
        } else {
          return false
        }
      })
    },
    postIns (data) {
      this.Loading()
      this.getInsList(data).then(resp => {
        this.closeLoading()
        this.insTableData = resp.data
        this.seaTotalPages = resp.totalPages
        this.seaTotalRecords = resp.totalRecords
        this.isShowTable = true
      })
    },
    handleCurrentChange (val) { // 查询分页页码跳转
      this.postList.currentPage = val
      this.postList.pageSize = this.pageSize
      this.current = val
      this.postIns(this.postList)
    },
    searchSizeChange (size) { // 查询
      this.pageSize = size
      this.postList.pageSize = this.pageSize
      this.postList.currentPage = 1
      this.current = 1
      this.postIns(this.postList)
    },
    handleSelectionChange (val) { // 表格勾选
      console.log(val)
      this.selectItem = JSON.parse(JSON.stringify(val))
    },
    checkSelectable (row, index) { //  不可勾选
      console.log(row.checkTypeCode)
      if (row.checkTypeCode === '3' && row.checkStatusCode === '1') {
        return 0
      } else {
        return 1
      }
    },
    detailOrg (row) { // 获取详情
      console.log(row)
      this.detailData = JSON.parse(JSON.stringify(row))
      let pro = JSON.parse(JSON.stringify(row)).province.split('-')
      this.$set(this.detailData, 'province', pro[0])
      this.$set(this.detailData, 'provinceName', pro[1])
      this.detail_dialog = true
    },
    detailOrgBefor (row) { // 获取详情
      this.getInsOrgDetail({'orgCode': row.orgCode}).then(resp => {
        // if (resp.code === '000000') {
        //   this.detailData = resp
        //   let pro = resp.province.split('-')
        //   this.$set(this.detailData, 'province', pro[0])
        //   this.$set(this.detailData, 'provinceName', pro[1])
        //   console.log(this.detailData.provinceName)
        //   this.detail_dialog = true
        // } else {
        //   this.openMseg('error', resp.msg)
        // }
        this.detailData = resp
        let pro = resp.province.split('-')
        this.$set(this.detailData, 'province', pro[0])
        this.$set(this.detailData, 'provinceName', pro[1])
        console.log(this.detailData.provinceName)
        this.detail_dialog = true
      })
    },
    handleProSelect (item) { // 省份选择
      this.addinfo.province = item.configSetValueCode
      this.addinfo.provinceName = item.configSetValueName
      this.provinceName = item.configSetValueName
    },
    handleProSelect_mod (item) { // 省份选择
      this.modifyinfo.province = item.configSetValueCode
      this.$set(this.modifyinfo, 'provinceName', item.configSetValueName)
      this.provinceName = item.configSetValueName
    },
    querySearchAsync (queryString, cb) { // 查询省份 cb callBack方法
      this.searchProIns({'codeOrName': queryString, 'provinceOrCity': 'province'}).then(resp => {
        this.proSearch = resp
        cb(this.proSearch)
      })
    },
    addPut () { // 添加新增保险机构
      this.addinfo.orgCode = ''
      this.$refs['addinfo'].validate((valid) => {
        if (valid) {
          this.Loading()
          this.addInsOrg(this.addinfo).then(resp => {
            this.closeLoading()
            if (resp.code === '000000') {
              this.add_dialog = false
              this.openMseg('success', resp.msg)
              this.addinfo = {
                insurerCode: '',
                insurerName: '',
                validStatusCode: '1',
                taxpayerIdenCode: '1',
                appliTaxRateCode: '2',
                insurerType: '',
                insurerTypeCode: '',
                taxpayIdenNo: '',
                taxpayIdenAdd: '',
                taxpayIdenBankAcc: '',
                taxpayIdenPhone: '',
                taxpayIdenBank: '',
                remark: ''
              }
              this.$refs['addinfo'].resetFields()
            } else {
              this.openMseg('error', resp.msg)
            }
          })
        } else {
          return false
        }
      })
    },
    modifyOrg () { // 修改保险机构
      if (this.selectItem.length === 1) {
        let tagType = true
        this.selectItem.forEach((item, index) => {
          if (item.checkStatusCode === '3') {
            tagType = false
            this.openMseg('error', '仅可对审核通过、审核不通过的记录进行修改！')
            this.isDelete = false
            return false
          }
        })
        if (tagType) {
          this.modifyinfo = JSON.parse(JSON.stringify(this.selectItem[0]))
          let tempArr = JSON.parse(JSON.stringify(this.selectItem[0])).province.split('-')
          console.log(tempArr)
          this.$set(this.modifyinfo, 'province', tempArr[0])
          this.$set(this.modifyinfo, 'provinceName', tempArr[1])
          this.modify_dialog = true
        }
      } else {
        if (this.selectItem.length > 1) {
          this.openMseg('error', '只能勾选一条记录！')
        } else {
          this.openMseg('error', '请先勾选记录！')
        }
      }
    },
    modifyPut () { // 提交修改
      this.$refs['modifyinfo'].validate((valid) => {
        if (valid) {
          this.Loading()
          this.modifyInsOrg(this.modifyinfo).then(resp => {
            this.closeLoading()
            if (resp.code === '000000') {
              this.modify_dialog = false
              this.modifyinfo = {}
              this.openMseg('success', resp.msg)
            } else {
              this.openMseg('error', resp.msg)
            }
          })
        } else {
          return false
        }
      })
    },
    deleteOrg () { // 删除保险机构
      if (this.selectItem.length > 0) {
        let tagType = true
        this.selectItem.forEach((item, index) => {
          if (item.checkStatusCode === '3') {
            tagType = false
            this.openMseg('error', '仅可对审核通过、审核不通过的记录进行删除！')
            this.isDelete = false
            return false
          }
        })
        if (tagType) {
          this.isDelete = true
          this.deleteItem = this.selectItem
        }
      } else {
        this.openMseg('error', '请先勾选记录！')
      }
    },
    deleteTrue () { // 确认删除
      this.Loading()
      this.deleteInsOrg(this.deleteItem).then(resp => {
        this.closeLoading()
        if (resp.code === '000000') {
          this.isDelete = false
          this.deleteItem = {}
          this.openMseg('success', resp.msg)
        } else {
          this.openMseg('error', resp.msg)
        }
      })
    },
    audit () { // 保险机构审核
      this.auditResult = {}
      if (this.selectItem.length > 0) {
        let tagType = true
        this.selectItem.forEach((item, index) => {
          if (item.checkStatusCode === '3') {
          } else {
            tagType = false
            this.openMseg('error', '仅可对待审核状态进行审核！')
            this.audit_dialog = false
            return false
          }
        })
        if (tagType) {
          this.audit_dialog = true
          this.auditResult.orgList = []
          this.auditResult.orgList = this.selectItem
        }
      } else {
        this.openMseg('error', '请先勾选记录！')
      }
    },
    auditPut () {
      this.Loading()
      this.auditInsOrg(this.auditResult).then(resp => {
        this.closeLoading()
        if (resp.code === '000000') {
          this.openMseg('success', resp.msg)
          this.audit_dialog = false
          this.auditResult = {}
        } else {
          this.openMseg('error', resp.msg)
        }
      })
    },
    openMseg (types, mesg) { // 提示
      this.$message({
        message: mesg,
        type: types
      })
    },
    closeDailog () {
      return new Promise((resolve, reject) => {
        this.com_dialog = false
        this.org_dialog = false
        resolve()
      })
    },
    selectRowCom (row) { // 保险公司选择
      this.closeDailog().then(() => {
        if (this.isComType === 0) { // 查询
          this.searchList.insurerCode = row.insurercode
          this.searchList.insurerName = row.insurername
        } else if (this.isComType === 1) { // 添加
          this.addinfo.insurerCode = row.insurercode
          this.addinfo.insurerName = row.insurername
          this.addinfo.insurerTypeCode = row.insurertype
        } else if (this.isComType === 2) { // 修改
          this.modifyinfo.insurerCode = row.insurercode
          this.modifyinfo.insurerName = row.insurername
          this.modifyinfo.insurerTypeCode = row.insurertype
        }
        this.com_dialog = false
      })
    },
    comCurrentChange (val) { // 选择保险公司分页
      this.getComInfo(val, this.isComType, this.pageSizeCom)
    },
    getComInfo (page, type, size) { // 保险公司查询
      this.orgComSize = [5, 10, 20, 50]
      this.isComType = type
      this.currentD = page
      this.pageSizeCom = size
      var data = {}
      if (type === 0) {
        data = {
          'insurerCode': this.searchList.insurerCode,
          'insurerName': this.searchList.insurerName,
          'insurerTypeCode': this.searchList.insurerTypeCode,
          'currentPage': page
        }
      } else if (type === 1) {
        data = {
          'insurerCode': this.addinfo.insurerCode,
          'insurerName': this.addinfo.insurerName,
          'currentPage': page
        }
      } else if (type === 2) {
        data = {
          'insurerCode': this.modifyinfo.insurerCode,
          'insurerName': this.modifyinfo.insurerName,
          'currentPage': page
        }
      }
      data.pageSize = size
      data.clickType = '2'
      this.insComTableData = []
      this.totalRecordD = 0
      this.getInsCom(data).then(resp => {
        this.com_dialog = true
        if (resp.code === '000000') {
          this.insComTableData = resp.data.data
          this.totalRecordD = resp.data.totalRecords
        } else {
          if (resp.code === '000002') {
            this.insComTableData = []
            this.totalRecordD = 0
          } else {
            this.openMseg('error', resp.msg)
          }
        }
      })
    },
    blurCom (event, type, tag) {
      if (event.target.value === '' || this.com_dialog) {
        return false
      }
      let code = ''
      let name = ''
      let insurerType = ''
      this.isComType = type
      if (type === 0) {
        code = this.searchList.insurerCode
        name = this.searchList.insurerName
        insurerType = this.searchList.insurerTypeCode
      } else if (type === 1) {
        code = this.addinfo.insurerCode
        name = this.addinfo.insurerName
      } else if (type === 2) {
        code = this.modifyinfo.insurerCode
        name = this.modifyinfo.insurerName
      }
      let postData = {
        'insurerCode': code,
        'insurerName': name,
        'currentPage': '1',
        'pageSize': '5',
        'clickType': '1',
        'insurerTypeCode': insurerType
      }
      this.getInsCom(postData).then(resp => {
        if (resp.code === '000000') {
          if (type === 0) { // 查询
            this.searchList.insurerCode = resp.data.data[0].insurercode
            this.searchList.insurerName = resp.data.data[0].insurername
          } else if (type === 1) { // 添加查询
            this.addinfo.insurerCode = resp.data.data[0].insurercode
            this.addinfo.insurerName = resp.data.data[0].insurername
          } else if (type === 2) { // 修改查询
            this.modifyinfo.insurerCode = resp.data.data[0].insurercode
            this.modifyinfo.insurerName = resp.data.data[0].insurername
          }
        } else {
          if (type === 0) { // 查询
            this.searchList.insurerCode = ''
            this.searchList.insurerName = ''
          } else if (type === 1) { // 添加查询
            this.addinfo.insurerCode = ''
            this.addinfo.insurerName = ''
          } else if (type === 2) { // 修改查询
            this.modifyinfo.insurerCode = ''
            this.modifyinfo.insurerName = ''
          }
          this.openMseg('error', '该代码或名称不存在！')
        }
      })
    },
    getOrgInfo (page, type, size) { // 保险机构查询
      this.pageSizeOrg = size
      this.orgComSize = [5, 10, 20, 50]
      this.currentD = page
      var dataOrg = {
        'insurerCode': this.searchList.insurerCode,
        'insurerName': this.searchList.insurerName,
        'orgCode': this.searchList.orgCode,
        'orgName': this.searchList.orgName,
        'currentPage': page,
        'pageSize': size,
        'clickType': '2'
      }
      if (this.searchList.insurerCode === '' || this.searchList.insurerCode === undefined) {
        this.openMseg('error', '请先输入保险公司代码！')
        return false
      } else {
        this.isOrgType = type
      }
      this.insOrgTableData = []
      this.totalRecordD = 0
      this.totalPageD = 0
      this.getInsOrg(dataOrg).then(resp => {
        this.org_dialog = true
        this.insOrgTableData = resp.data.data
        this.totalRecordD = resp.data.totalRecords
        this.totalPageD = resp.data.totalPages
      })
    },
    blurOrg (event, tag) {
      if (event.target.value === '' || this.org_dialog) {
        return false
      }
      let code = ''
      let name = ''
      let insurerCode = this.searchList.insurerCode
      if (insurerCode === '') {
        this.openMseg('error', '请先输入保险公司代码！')
        this.searchList.orgCode = ''
        this.searchList.orgName = ''
        return false
      }
      if (tag === '0') {
        code = event.target.value
      } else {
        name = event.target.value
      }
      let postData = {
        'insurerCode': insurerCode,
        'orgCode': code,
        'orgName': name,
        'currentPage': '1',
        'pageSize': '5',
        'clickType': '1'
      }
      this.getInsOrg(postData).then(resp => {
        if (resp.code === '000000') {
          this.searchList.orgCode = resp.data.data[0].orgcode
          this.searchList.orgName = resp.data.data[0].orgname
        } else {
          this.searchList.orgCode = ''
          this.searchList.orgName = ''
          this.openMseg('error', '该代码或名称不存在！')
        }
      })
    },
    selectRowOrg (row) { // 保险机构选择
      this.closeDailog().then(() => {
        if (this.isOrgType === 0) { // 查询
          this.searchList.orgCode = row.orgcode
          this.searchList.orgName = row.orgname
        }
        this.org_dialog = false
      })
    },
    orgCurrentChange (val) { // 选择保险机构分页
      this.getOrgInfo(val, this.isComType, this.pageSizeOrg)
    },
    orgSizeChange (size) { // 保险机构
      this.pageSizeOrg = size
      this.getOrgInfo(1, this.isComType, this.pageSizeOrg)
    },
    comSizeChange (size) { // 保险公司
      this.pageSizeCom = size
      this.getComInfo(1, this.isComType, this.pageSizeCom)
    },
    comClose () { // 关闭弹窗
      this.com_dialog = false
      if (this.isComType === 0) { // 查询
        this.searchList.insurerCode = ''
        this.searchList.insurerName = ''
      } else if (this.isComType === 1) { // 添加
        this.addinfo.insurerCode = ''
        this.addinfo.insurerName = ''
      } else if (this.isComType === 2) { // 修改
        this.modifyinfo.insurerCode = ''
        this.modifyinfo.insurerName = ''
      }
    },
    orgClose () { // 关闭弹窗
      this.org_dialog = false
      this.searchList.orgCode = ''
      this.searchList.orgName = ''
    },
    closeAdd () {
      this.add_dialog = false
      this.addinfo = {
        insurerCode: '',
        insurerName: '',
        validStatusCode: '1',
        taxpayerIdenCode: '1',
        appliTaxRateCode: '2',
        insurerType: '',
        insurerTypeCode: '',
        taxpayIdenNo: '',
        taxpayIdenAdd: '',
        taxpayIdenBankAcc: '',
        taxpayIdenPhone: '',
        taxpayIdenBank: '',
        remark: ''
      }
      this.$refs['addinfo'].resetFields()
    },
    closeMod () {
    },
    uploadUrl () {
      return '/tabycore/organization/importOrganizations'
    },
    handleEXLSuccess (resp) {
      if (resp.code === '000000') {
        this.openMseg('success', '上传成功')
        this.isImport = false
        this.fileList = []
      } else {
        this.openMseg('error', resp.msg)
        this.fileList = []
      }
    },
    downTemp () { // 下载模板
      window.open('/tabycore/rate/downloadModel?downType=basesupplyprovince')
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
      'getInsList',
      'addInsOrg',
      'searchProIns',
      'modifyInsOrg',
      'deleteInsOrg',
      'auditInsOrg',
      'getInsCom',
      'getInsOrg',
      'getInsOrgDetail',
      'getBtnLimt_InsOrg'
    ])
  },
  components: {
    [NoticeBar.name]: NoticeBar,
    [LabelText.name]: LabelText,
    [LineTittle.name]: LineTittle
  },
  created () {
  },
  computed: {
    getPro () {
      return this.$store.state.insurance.proList
    }
  },
  watch: {
    'searchList.insurerCode' () {
      if (this.searchList.insurerCode === '') {
        this.searchList.insurerName = ''
      }
    },
    'searchList.insurerName' () {
      if (this.searchList.insurerName === '') {
        this.searchList.insurerCode = ''
      }
    },
    'searchList.orgCode' () {
      if (this.searchList.orgCode === '') {
        this.searchList.orgName = ''
      }
    },
    'searchList.orgName' () {
      if (this.searchList.orgName === '') {
        this.searchList.orgCode = ''
      }
    },
    'addinfo.insurerCode' () {
      if (this.addinfo.insurerCode === '') {
        this.addinfo.insurerName = ''
      }
    },
    'addinfo.insurerName' () {
      if (this.addinfo.insurerName === '') {
        this.addinfo.insurerCode = ''
      }
    },
    'modifyinfo.insurerCode' () {
      if (this.modifyinfo.insurerCode === '') {
        this.modifyinfo.insurerName = ''
      }
    },
    'modifyinfo.insurerName' () {
      if (this.modifyinfo.insurerName === '') {
        this.modifyinfo.insurerCode = ''
      }
    }
  }
}
</script>

<style lang="scss" scoped type="text/css">
  #insManage{
    padding: 0px 30px 30px 30px;
  }
  .ri-line { margin-bottom: 10px; }
  .btn-container { text-align: center; margin-top: 20px; }
  .mesg_form {
    margin: 20px 0 ;
  }
  a { text-decoration: none; cursor: pointer; }
  .no-margin { margin-bottom: 0; }
  .el-table__body .el-button{
    line-height: 30px;
    height: 30px;
    width: 50px;
    font-size: 13px;
    padding: 0;
  }
  .download { text-align: center; margin-bottom: 10px; }
  .upLoad { text-align: center; }
</style>


<style lang="scss" >
  /*分页*/
  .pagination {
    text-align: right;
    margin: 20px auto;
  }
  .operationBtn { margin-top: 20px; }
  .mesg_form .required:before, .add_form .required:before{
    font-size: 14px!important;
    top: 3px !important;
  }
  #insManage .mesg_form .el-form-item__error { left: 100px;}
  .cooMange .add_form .el-form-item__error { left: 130px;}
</style>

