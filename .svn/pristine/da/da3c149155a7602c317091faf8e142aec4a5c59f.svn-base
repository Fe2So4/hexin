<template>
  <div id="insManage">
    <ui-notice-bar slot="breadcast" >
      <el-breadcrumb slot="location" separator=">">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>供应商管理</el-breadcrumb-item>
        <el-breadcrumb-item>合作经代公司管理</el-breadcrumb-item>
      </el-breadcrumb>
    </ui-notice-bar>
    <!-- 条件查询 -->
    <el-form style="margin: 20px 0; ">
      <el-row>
        <el-col :span="12">
          <el-form-item>
            <ui-label-text label="合作经代公司代码:" labelWidth="120" >
              <el-input slot="text" clearable @blur="blurCom" v-model="cooComList.companyCode" @dblclick.native="getAllCooCom(1,0)"  placeholder="双击可选择" ></el-input>
            </ui-label-text>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item>
            <ui-label-text label="合作经代公司名称:" labelWidth="120"  @dblclick.native="getAllCooCom(1,1)"    >
              <el-input slot="text" placeholder="双击可选择" @blur="blurCom"  clearable v-model="cooComList.companyName" ></el-input>
            </ui-label-text>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item>
            <ui-label-text label="佰盈机构名称:" labelWidth="120"  @dblclick.native="!isDisplay&&getFilialeOrg(1)"    >
              <el-input slot="text" placeholder="双击可选择" :disabled="isDisplay" clearable v-model="cooComList.comName" ></el-input>
            </ui-label-text>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item>
            <ui-label-text class="selectList" label="审核状态:" labelWidth="120" >
              <el-select v-model="cooComList.verifyStatus" size='mini' slot="text" placeholder="请选择">
                <el-option label="审核通过" value="1"> </el-option>
                <el-option  label="审核不通过" value="2"> </el-option>
                <el-option label="待审核" value="3"> </el-option>
              </el-select>
            </ui-label-text>
          </el-form-item>
        </el-col>
      </el-row>
      <div class='btn-container'>
        <el-button type="primary" :disabled="!limt.query" @click.native.prevent="searchCom(1)" >查询</el-button>
        <el-button type="primary" :disabled="!limt.add" @click.native.prevent="isAdd = true; picData = []; provinceCode = ''; provinceName = ''; " >新增</el-button>
        <el-button size="primary" :disabled="!limt.modify" @click.native.prevent="verifyComcode(1)" >修改</el-button>
        <el-button type="danger" :disabled="!limt.del" @click.native.prevent="verifyComcode(2)" >删除</el-button>
        <el-button type="primary" :disabled="!limt.review" @click.native.prevent='verifyComcode(3)' >审核</el-button>
        <el-button type="primary" :disabled="!limt.export" @click.native.prevent='outImport' >导出</el-button>
      </div>
    </el-form>
    <el-table stripe ref="multipleTable" :data="cooTableData" v-if='isShowTable' tooltip-effect="dark" style="width: 100%;" @selection-change="handleSelectionChange"  >
      <el-table-column type="selection" width="55" :selectable="checkSelectable" >
      </el-table-column>
      <el-table-column prop="exaId" label="合作经代公司代码" width="160">
         <template slot-scope="scope">
           <a href="javascript:void(0)" @click="detail(scope.row)">{{scope.row.exaId}}</a>
          </template>
      </el-table-column>
      <el-table-column prop="title" label="合作经代公司名称" width="160"  ></el-table-column>
      <el-table-column prop="comName" label="佰盈机构名称" width="160"  ></el-table-column>
      <el-table-column prop="ext10" label="公司类型" >
        <template slot-scope="scope">
          {{ scope.row.ext10 === '1' ?  '保险经纪公司': '' }}
          {{ scope.row.ext10 === '2' ?  '保险代理公司': '' }}
        </template>
      </el-table-column>
      <el-table-column prop="ext9" label="有效状态"  >
        <template slot-scope="scope">
          {{ scope.row.ext9 === '0' ?  '失效': '' }}
          {{ scope.row.ext9 === '1' ?  '有效': '' }}
        </template>
      </el-table-column>
      <el-table-column prop="exaStatus" label="审核状态" >
        <template slot-scope="scope">
          {{ scope.row.exaStatus === '1' ?  '审核通过': '' }}
          {{ scope.row.exaStatus === '2' ?  '审核不通过': '' }}
          {{ scope.row.exaStatus === '3' ?  '待审核': '' }}
        </template>
      </el-table-column>
      <el-table-column prop="exaType" label="审核类型" >
        <template slot-scope="scope">
          {{ scope.row.exaType === '1' ?  '新增审核': '' }}
          {{ scope.row.exaType === '2' ?  '修改审核': '' }}
          {{ scope.row.exaType === '3' ?  '删除审核': '' }}
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
            <el-button type="primary" v-if="scope.row.exaType === '2' && scope.row.exaStatus === '3' " size='mini' @click="detailModify(scope.row)">查看</el-button>
        </template>
      </el-table-column>
      <el-table-column label="审核历史">
        <template slot-scope="scope">
            <el-button type="primary" size='mini' @click="detailAudit(scope.row)">查看</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="pagination" v-if='isShowTable'>
      <el-pagination @size-change="handleSizeChange" @current-change='handleCurrentChange' :current-page.sync="current" :pager-count='5' :page-size='5' :page-sizes='[5, 10, 20, 50]' :total="totalRecords" layout="total, sizes, prev, pager, next, jumper" :page-count="totalPages"></el-pagination>
    </div>
    <!-- 添加弹窗 -->
    <el-dialog :append-to-body='true' @close='closeAdd' center width='70%' title="合作经代公司新增"  :visible.sync="isAdd" class="insManage_dialog" >
      <el-form class="mesg_form" :model="addData" ref="addData" :rules="ruleAdd" >
        <ui-line-tittle :collapsible="true" >
          <span slot="title" >
              <i class="font_family icon-jy-menu-4" ></i>合作经代公司新增
          </span>
          <div class="ri-content" slot="content" >
            <el-row>
              <el-col :span="12">
                <el-form-item>
                  <ui-label-text labelWidth="160" label="合作经代公司代码:" v-model="addData.companyCode" text="系统自动编码" ></ui-label-text>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item prop="companyName">
                  <ui-label-text :required="true" labelWidth="160" label="合作经代公司名称:" >
                    <el-input clearable v-model="addData.companyName" slot="text" ></el-input>
                  </ui-label-text>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item prop="provinceName">
                  <ui-label-text :required="true"  labelWidth="160" label="所属省份:" >
                    <el-autocomplete  v-model="addData.provinceName" slot="text" :fetch-suggestions="querySearchAsync"  placeholder="请输入内容"  @select="handleProSelect" >
                      <template slot-scope="{ item }">
                        <span class="code">{{ item.configSetValueCode }}</span>-
                        <span class="name">{{ item.configSetValueName }}</span>
                      </template>
                    </el-autocomplete>
                  </ui-label-text>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item prop="belongingCity">
                  <ui-label-text :required="true"  labelWidth="160" label="所属城市:" >
                    <el-autocomplete  v-model="addData.belongingCity" slot="text" :fetch-suggestions="querySearchcity"  placeholder="请输入内容"  @select="handleCitySelect" >
                      <template slot-scope="{ item }">
                        <span class="code">{{ item.code }}</span>-
                        <span class="name">{{ item.name }}</span>
                      </template>
                    </el-autocomplete>
                  </ui-label-text>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item prop="companyType">
                  <ui-label-text :required="true"  labelWidth="160" label="公司类型:" >
                    <el-select v-model="addData.companyType" slot="text" placeholder="请选择">
                      <el-option label="保险经纪公司" value="1"></el-option>
                      <el-option label="保险代理公司" value="2"></el-option>
                    </el-select>
                  </ui-label-text>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item prop="valid">
                  <ui-label-text :required="true" labelWidth="160" label="状态:" >
                    <el-select v-model="addData.valid" slot="text" placeholder="请选择">
                      <el-option label="有效" value="1"></el-option>
                      <el-option label="无效" value="0"></el-option>
                    </el-select>
                  </ui-label-text>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row class="ri-line">
              <el-col :span="12">
                <el-form-item prop="introduceType">
                  <ui-label-text :required="true" labelWidth="160" label="经代公司简称:" >
                    <el-input v-model="addData.introduceType" slot="text" ></el-input>
                  </ui-label-text>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item>
                  <ui-label-text labelWidth="160" label="营业期限：" >
                    <!-- <el-input v-model="addData.validTimeBusiness"  slot="text" ></el-input> -->
                    <el-date-picker slot="text"  value-format="yyyy-MM-dd" v-model="addData.validTimeBusiness" type="date" placeholder="选择日期"></el-date-picker>
                  </ui-label-text>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item>
                  <ui-label-text labelWidth="160" label="营业执照/身份证号:" >
                    <el-input clearable v-model="addData.businessLicenseId" slot="text" ></el-input>
                  </ui-label-text>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item prop="registeredCapital">
                  <ui-label-text  labelWidth="160" label="注册资本:" >
                    <el-input clearable v-model="addData.registeredCapital" @blur="getDecimal(0)" slot="text" ></el-input>
                  </ui-label-text>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row class="ri-line">
              <el-col :span="12">
                <el-form-item>
                  <ui-label-text labelWidth="160" label="法人代表人/负责人:" >
                    <el-input v-model="addData.corporate" slot="text" ></el-input>
                  </ui-label-text>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item>
                  <ui-label-text labelWidth="160" label="联系人：" >
                    <el-input v-model="addData.contactPerson" slot="text" ></el-input>
                  </ui-label-text>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row class="ri-line">
              <el-col :span="12">
                <el-form-item prop="phoneNumber">
                  <ui-label-text labelWidth="160" label="联系电话：" >
                    <el-input v-model="addData.phoneNumber" slot="text" ></el-input>
                  </ui-label-text>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item>
                  <ui-label-text labelWidth="160" label="联系地址：" >
                    <el-input v-model="addData.contactAddress"  slot="text" ></el-input>
                  </ui-label-text>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row class="ri-line">
              <el-col :span="12">
                <el-form-item>
                  <ui-label-text :required="true" labelWidth="160" label="许可证/营业执照上传：" >
                    <el-button slot="text" @click="showFj(1)">附件管理</el-button>
                  </ui-label-text>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item prop="priceTax">
                  <ui-label-text :required="true" labelWidth="160" label="价格税率优惠方案:" >
                    <el-select v-model="addData.priceTax" size='mini' slot="text" placeholder="请选择">
                      <el-option label="0%" value="0"> </el-option>
                      <el-option label="3%" value="3"> </el-option>
                      <el-option label="6%" value="6"> </el-option>
                    </el-select>
                  </ui-label-text>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row class="ri-line">
              <el-col :span="12">
                <el-form-item>
                  <ui-label-text labelWidth="160" label="备注:" >
                    <el-input type="textarea" autosize  v-model="addData.remark" slot="text" ></el-input>
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
    <!-- 修改弹窗 -->
    <el-dialog :append-to-body='true' @close='closeMod' center width='70%' title="合作经代公司修改"  :visible.sync="isModify" class="insManage_dialog">
      <el-form class="mesg_form" :model="modifyData" ref="modifyData" :rules="ruleAdd" >
        <ui-line-tittle :collapsible="true" >
          <span slot="title" >
              <i class="font_family icon-jy-menu-4" ></i>合作经代公司修改
          </span>
          <div class="ri-content" slot="content" >
            <el-row>
              <el-col :span="12">
                <el-form-item>
                  <ui-label-text labelWidth="160" label="合作经代公司代码:" :text="modifyData.companyCode" ></ui-label-text>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item prop="companyName">
                  <ui-label-text :required="true" labelWidth="160" label="合作经代公司名称:" >
                    <el-input clearable v-model="modifyData.companyName" slot="text" ></el-input>
                  </ui-label-text>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item prop="provinceName">
                  <ui-label-text :required="true"  labelWidth="160" label="所属省份:" >
                    <el-autocomplete  v-model="modifyData.provinceName" slot="text" :fetch-suggestions="querySearchAsync"  placeholder="请输入内容"  @select="handleProSelect_mod" >
                      <template slot-scope="{ item }">
                        <span class="code">{{ item.configSetValueCode }}</span>-
                        <span class="name">{{ item.configSetValueName }}</span>
                      </template>
                    </el-autocomplete>
                  </ui-label-text>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item prop="belongingCity">
                  <ui-label-text :required="true"  labelWidth="160" label="所属城市:" >
                    <el-autocomplete  v-model="modifyData.belongingCity" slot="text" :fetch-suggestions="querySearchcity"  placeholder="请输入内容"  @select="handleCitySelect_mod" >
                      <template slot-scope="{ item }">
                        <span class="code">{{ item.code }}</span>-
                        <span class="name">{{ item.name }}</span>
                      </template>
                    </el-autocomplete>
                  </ui-label-text>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item prop="companyType">
                  <ui-label-text :required="true"  labelWidth="160" label="公司类型:" >
                    <el-select v-model="modifyData.companyType" slot="text" placeholder="请选择">
                      <el-option label="保险经纪公司" value="1"></el-option>
                      <el-option label="保险代理公司" value="2"></el-option>
                    </el-select>
                  </ui-label-text>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item prop="valid">
                  <ui-label-text :required="true" labelWidth="160" label="状态:" >
                    <el-select v-model="modifyData.valid" slot="text" placeholder="请选择">
                      <el-option label="有效" value="1"></el-option>
                      <el-option label="无效" value="0"></el-option>
                    </el-select>
                  </ui-label-text>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row class="ri-line">
              <el-col :span="12">
                <el-form-item prop="introduceType">
                  <ui-label-text :required="true" labelWidth="160" label="经代公司简称:" >
                    <el-input v-model="modifyData.introduceType" slot="text" ></el-input>
                  </ui-label-text>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item>
                  <ui-label-text labelWidth="160" label="营业期限：" >
                    <el-date-picker slot="text" value-format="yyyy-MM-dd"  v-model="modifyData.validTimeBusiness" type="date" placeholder="选择日期"></el-date-picker>
                    <!-- <el-input v-model="modifyData.validTimeBusiness"  slot="text" ></el-input> -->
                  </ui-label-text>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item>
                  <ui-label-text labelWidth="160" label="营业执照/身份证号:" >
                    <el-input clearable v-model="modifyData.businessLicenseId" slot="text" ></el-input>
                  </ui-label-text>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item prop="registeredCapital">
                  <ui-label-text  labelWidth="160" label="注册资本:" >
                    <el-input clearable v-model="modifyData.registeredCapital" @blur="getDecimal(1)" slot="text" ></el-input>
                  </ui-label-text>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row class="ri-line">
              <el-col :span="12">
                <el-form-item>
                  <ui-label-text labelWidth="160" label="法人代表人/负责人:" >
                    <el-input v-model="modifyData.corporate" slot="text" ></el-input>
                  </ui-label-text>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item>
                  <ui-label-text labelWidth="160" label="联系人：" >
                    <el-input v-model="modifyData.contactPerson" slot="text" ></el-input>
                  </ui-label-text>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row class="ri-line">
              <el-col :span="12">
                <el-form-item prop="phoneNumber">
                  <ui-label-text labelWidth="160" label="联系电话：" >
                    <el-input v-model="modifyData.phoneNumber" slot="text" ></el-input>
                  </ui-label-text>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item>
                  <ui-label-text labelWidth="160" label="联系地址：" >
                    <el-input v-model="modifyData.contactAddress"  slot="text" ></el-input>
                  </ui-label-text>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row class="ri-line">
              <el-col :span="12">
                <el-form-item>
                  <ui-label-text :required="true" labelWidth="160" label="许可证/营业执照上传：" >
                    <el-button slot="text" @click="showFj(1)">附件管理</el-button>
                  </ui-label-text>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item prop="priceTax">
                  <ui-label-text :required="true" labelWidth="160" label="价格税率优惠方案:" >
                    <el-select v-model="modifyData.priceTax" size='mini' slot="text" placeholder="请选择">
                      <el-option label="0%" value="0"> </el-option>
                      <el-option label="3%" value="3"> </el-option>
                      <el-option label="6%" value="6"> </el-option>
                    </el-select>
                  </ui-label-text>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row class="ri-line">
              <el-col :span="12">
                <el-form-item>
                  <ui-label-text labelWidth="160" label="备注:" >
                    <el-input type="textarea" autosize  v-model="modifyData.remark" slot="text" ></el-input>
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
    <!-- 审核弹框 -->
    <el-dialog title="合作经代公司审核" :append-to-body='true' :before-close="auditClose" center :visible.sync="audit_dialog">
       <ui-line-tittle :collapsible="true" >
         <span slot="title" >
            <i class="font_family icon-jy-menu-4" ></i>合作经代公司审核
          </span>
          <div class="ri-content" slot="content">
            <el-form :model="auditResult">
              <el-form-item label="审核结果:">
                <el-radio v-model="auditResult.verifyStatus" label="1">审核通过</el-radio>
                <el-radio v-model="auditResult.verifyStatus" label="2">审核不通过</el-radio>
              </el-form-item>
              <el-form-item label="审核意见:">
                <el-input type="textarea"  :rows='5' style="width: 85%; "  v-model="auditResult.reviews" ></el-input>
              </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
              <el-button @click="audit_dialog = false">返 回</el-button>
              <el-button type="primary" @click="auditPut">审 核</el-button>
            </div>
          </div>
       </ui-line-tittle>
    </el-dialog>
    <!-- 删除提示 -->
    <el-dialog title="提示" center :append-to-body='true' :visible.sync="isDelete" width="30%" >
      <p style='text-align: center; '>确定删除？</p>
      <span slot="footer" class="dialog-footer">
        <el-button @click="isDelete = false">取 消</el-button>
        <el-button type="primary" @click="deleteTrue">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 获取合作经代公司 -->
    <el-dialog title="合作经代公司" :before-close='closeDialog' :append-to-body='true' :visible.sync="com_dialog" width="50%" center>
      <el-table stripe @row-click='selectRowCom' ref="multipleTable" :data="searchComTableData" >
        <el-table-column prop="companyCode" label="合作经代公司代码" center ></el-table-column>
        <el-table-column prop="companyName" label="合作经代公司名称" center ></el-table-column>
      </el-table>
      <div class="pagination" >
        <el-pagination @size-change="cooSizeChange" @current-change='comCurrentChange' :current-page.sync="currentD" :page-count="totalPageD" :pager-count='5' :page-size='5' :page-sizes='sizeList' :total="totalRecordsD" layout="total, sizes, prev, pager, next, jumper" > </el-pagination>
      </div>
    </el-dialog>
    <!-- 详情弹窗 -->
    <el-dialog class="insManage_dialog" :append-to-body='true' center width='70%' title="合作经代公司详情"  :visible.sync="isDetail" >
      <ui-line-tittle :collapsible="true" >
        <span slot="title" >
            <i class="font_family icon-jy-menu-4" ></i>合作经代公司详情
        </span>
        <div class="ri-content" slot="content" >
          <el-row class="ri-line">
            <el-col :span="12">
              <ui-label-text labelWidth="160" label="合作经代公司代码:" :text="detailData.companyCode" ></ui-label-text>
            </el-col>
            <el-col :span="12">
              <ui-label-text labelWidth="160" label="合作经代公司名称:" >
                <el-input v-model="detailData.companyName" :disabled="true" slot="text" ></el-input>
              </ui-label-text>
            </el-col>
          </el-row>
          <el-row class="ri-line">
            <el-col :span="12">
              <ui-label-text  labelWidth="160" label="所属省份:" >
                <el-input v-model="detailData.provinceName" :disabled="true"  slot="text" ></el-input>
              </ui-label-text>
            </el-col>
            <el-col :span="12">
              <ui-label-text  labelWidth="160" label="所属城市:" >
                <el-input v-model="detailData.belongingCity" :disabled="true"  slot="text" ></el-input>
              </ui-label-text>
            </el-col>
          </el-row>
          <el-row class="ri-line">
            <el-col :span="12">
              <ui-label-text labelWidth="160" label="公司类型:" >
                <el-select v-model="detailData.companyType" disabled slot="text" placeholder="请选择">
                  <el-option label="保险经纪公司" value="1"></el-option>
                  <el-option label="保险代理公司" value="2"></el-option>
                </el-select>
              </ui-label-text>
            </el-col>
            <el-col :span="12">
              <ui-label-text labelWidth="160" label="状态:" >
                <el-select v-model="detailData.valid" disabled  slot="text" placeholder="请选择">
                  <el-option label="有效" value="1"></el-option>
                  <el-option label="无效" value="0"></el-option>
                </el-select>
              </ui-label-text>
            </el-col>
          </el-row>
          <el-row class="ri-line">
            <el-col :span="12">
              <ui-label-text labelWidth="160" label="经代公司简称:" >
                <el-input v-model="detailData.introduceType" :disabled="true" slot="text" ></el-input>
              </ui-label-text>
            </el-col>
            <el-col :span="12">
              <ui-label-text labelWidth="160" label="营业期限：" >
                <el-date-picker :disabled="true" slot="text"  value-format="yyyy-MM-dd" v-model="detailData.validTimeBusiness" type="date" placeholder="选择日期"></el-date-picker>
                <!-- <el-input v-model="detailData.validTimeBusiness" :disabled="true" slot="text" ></el-input> -->
              </ui-label-text>
            </el-col>
          </el-row>
          <el-row class="ri-line">
            <el-col :span="12">
              <ui-label-text  labelWidth="160" label="营业执照/身份证号：" >
                <el-input v-model="detailData.businessLicenseId"  :disabled="true" slot="text" ></el-input>
              </ui-label-text>
            </el-col>
            <el-col :span="12">
              <ui-label-text  labelWidth="160" label="注册资本：" >
                <el-input v-model="detailData.registeredCapital"  :disabled="true" slot="text" ></el-input>
              </ui-label-text>
            </el-col>
          </el-row>
          <el-row class="ri-line">
            <el-col :span="12">
              <ui-label-text labelWidth="160" label="法人代表人/负责人:" >
                <el-input v-model="detailData.corporate" :disabled="true" slot="text" ></el-input>
              </ui-label-text>
            </el-col>
            <el-col :span="12">
              <ui-label-text labelWidth="160" label="联系人：" >
                <el-input v-model="detailData.contactPerson" :disabled="true" slot="text" ></el-input>
              </ui-label-text>
            </el-col>
          </el-row>
          <el-row class="ri-line">
            <el-col :span="12">
              <ui-label-text labelWidth="160" label="联系电话：" >
                <el-input v-model="detailData.phoneNumber" :disabled="true" slot="text" ></el-input>
              </ui-label-text>
            </el-col>
            <el-col :span="12">
              <ui-label-text labelWidth="160" label="联系地址：" >
                <el-input v-model="detailData.contactAddress" :disabled="true" slot="text" ></el-input>
              </ui-label-text>
            </el-col>
          </el-row>
          <el-row class="ri-line">
            <el-col :span="12">
              <ui-label-text labelWidth="160" label="许可证/营业执照上传：" >
                <el-button slot="text" @click="showFj(0)">附件管理</el-button>
              </ui-label-text>
            </el-col>
            <el-col :span="12">
              <ui-label-text labelWidth="160" label="价格税率优惠方案:" >
                <el-select v-model="detailData.priceTax" :disabled="true" size='mini' slot="text" placeholder="请选择">
                  <el-option label="0%" value="0"> </el-option>
                  <el-option label="3%" value="3"> </el-option>
                  <el-option label="6%" value="6"> </el-option>
                </el-select>
              </ui-label-text>
            </el-col>
          </el-row>
          <el-row class="ri-line">
            <el-col :span="12">
              <ui-label-text labelWidth="160" label="备注:" >
                <el-input type="textarea" autosize :disabled="true"  v-model="detailData.remark" slot="text" ></el-input>
              </ui-label-text>
            </el-col>
          </el-row>
        </div>
      </ui-line-tittle>
    </el-dialog >
    <!-- 附件管理 -->
    <el-dialog title="附件管理" :before-close='closeupLoad' center :append-to-body='true' :visible.sync="isFj" width="70%" >
      <el-upload class="upload-demo" v-if="tag_4" accept='.jpg,.PDF,.png,.gif' :on-success='picSuccess' multiple :action='uploadUrl()' :file-list="fileList">
        <el-button size="small" type="primary" >点击上传</el-button>
      </el-upload>
      <el-table stripe ref="multipleTable" :data="picData"  tooltip-effect="dark" style="width: 100%;" >
        <el-table-column label="文件名" prop="fileName"></el-table-column>
        <el-table-column label="操作人" prop="operUser"></el-table-column>
        <el-table-column label="操作时间" prop="operTime"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="text" size="small" v-if="tag_1" @click="downPic(scope.row.fileName)">下载</el-button>
            <el-button type="text" size="small" v-if="tag_2" @click="checkPic(scope.row.fileName)">预览</el-button>
            <el-button type="text" size="small" v-if="tag_3" @click="delPic(scope.row.fileName, scope.$index)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-dialog>
    <!-- 获取机构 -->
    <el-dialog title="佰盈机构" :before-close='orgClose' :append-to-body='true' :visible.sync="show_org" width="50%" center>
      <el-table stripe @row-click='selectRow' ref="multipleTable" :data="orgTableData">
        <el-table-column prop="comCode" label="佰盈机构代码" center ></el-table-column>
        <el-table-column prop="comCName" label="佰盈机构代码名称" center ></el-table-column>
      </el-table>
      <div class="pagination">
        <el-pagination @size-change="orgSizeChange" small @current-change='orgCurrentChange' :page-sizes="sizeList" :page-count="totalPageD" :current-page.sync="currentD" layout="total, sizes, prev, pager, next, jumper" :total="totalRecordsD" :page-size="5"> </el-pagination>
      </div>
    </el-dialog>
    <!-- 审核历史 -->
    <el-dialog title="审核历史"  :append-to-body='true' :visible.sync="audit_his" width="70%" center>
      <el-table stripe  ref="multipleTable" :data="auditTableData">
        <el-table-column prop="verifyStatus" label="审核状态" center ></el-table-column>
        <el-table-column prop="verifyType" label="审核类型" center ></el-table-column>
        <el-table-column prop="verifyReview" label="审核意见" center ></el-table-column>
        <el-table-column prop="verifyTime" label="操作时间" center ></el-table-column>
        <el-table-column prop="verifyUser" label="操作员" center ></el-table-column>
      </el-table>
    </el-dialog>
  </div>
</template>

<script>
import NoticeBar from '@/components/notice-bar'
import LabelText from '@/components/label-text'
import LineTittle from '@/components/line-tittle'
import { getUserId } from '@/utils/cookie'
import IsEmpty from '@/utils/IsEmpty'
import { mapActions } from 'vuex'
export default {
  name: '',
  data () {
    const { PhoneValidator, decimalValidator } = this.$store.getters.validators
    return {
      sizeList: [],
      totalPageD: 0,
      ruleAdd: {
        companyName: [
          { required: true, message: '请输入合作经代公司名称', trigger: 'change' }
        ],
        companyType: [
          { required: true, message: '必填项不能为空', trigger: 'change' }
        ],
        corporate: [
          { required: true, message: '必填项不能为空', trigger: 'change' }
        ],
        provinceName: [
          { required: true, message: '必填项不能为空', trigger: 'change' }
        ],
        belongingCity: [
          { required: true, message: '必填项不能为空', trigger: 'change' }
        ],
        introduceType: [
          { required: true, message: '必填项不能为空', trigger: 'change' }
        ],
        valid: [
          { required: true, message: '状态不能为空', trigger: 'change' }
        ],
        priceTax: [
          { required: true, message: '必填项不能为空', trigger: 'change' }
        ],
        phoneNumber: PhoneValidator,
        registeredCapital: decimalValidator
      },
      cooComList: {
        companyCode: '',
        companyName: '',
        comCode: '',
        comName: '',
        verifyStatus: '1'
      }, // 查询条件
      postInfo: {},
      cooTableData: [], // 查询列表数据
      isShowTable: false, // 是否显示查询数据
      totalRecords: 0, // 分页总条数
      totalPages: '', // 分页总页数
      current: 1,
      pageSize: 5,
      pageSizeCom: 5,
      totalRecordsD: 0, // 分页总条数
      totalPagesD: '', // 分页总页数
      currentD: 1,
      selectItem: [], // 勾选条目
      isAdd: false, // 是否显示添加弹框
      addData: {
        companyCode: '',
        companyName: '',
        belongingCity: '',
        companyType: '',
        provinceName: '',
        corporate: '',
        businessLicenseId: '',
        validTimeOrganization: '',
        validTimeBusiness: '',
        introduceType: '',
        registeredCapital: '',
        contactPerson: '',
        contactAddress: '',
        priceTax: '',
        remark: '',
        valid: '1'
      }, //  添加公司提交数据
      isModify: false,
      modifyData: {
        companyCode: '',
        companyName: '',
        companyType: '',
        provinceName: '',
        corporate: '',
        businessLicenseId: '',
        validTimeOrganization: '',
        validTimeBusiness: '',
        introduceType: '',
        registeredCapital: '',
        contactPerson: '',
        contactAddress: '',
        priceTax: '',
        remark: '',
        valid: ''
      }, //  修改公司提交数据
      audit_dialog: false, // 是否显示审核弹框
      auditResult: {}, // 审核提交数据
      proSearch: [], //  省份数据
      citySearch: [],
      provinceName: '',
      provinceCode: '',
      isDelete: false,
      deleteItem: {},
      com_dialog: false, // 显示合作经代公司
      isComType: '',
      list: {}, // 获取合作经代公司
      searchComTableData: [],
      detailData: {}, // 详情数据
      isDetail: false,
      valueLog: '', // 弹框记录值
      loading: '',
      limt: {
        add: false,
        modify: false,
        review: false,
        query: false,
        del: false,
        export: false
      },
      isFj: false,
      fileList: [],
      picData: [],
      tag_1: false,
      tag_2: false,
      tag_3: false,
      tag_4: false,
      show_org: false,
      pageSizeD: 5,
      orgTableData: [],
      isDisplay: false,
      auditTableData: [],
      audit_his: false
    }
  },
  mounted () {
    this.getBtnLimt()
    this.$nextTick(function () {
      // 初始化数据
    })
  },
  methods: {
    getBtnLimt () { // 按钮权限
      let userId = getUserId()
      if (userId === null || userId === undefined) {
        userId = ''
      }
      let post = {
        'userId': userId,
        'page': '合作经代公司管理'
      }
      this.getBtnLimt_cooCom(post).then(resp => {
        if (resp.code === '000000') {
          resp.data.forEach((item, index) => {
            this.limt[item.code] = item.checked
          })
        }
      })
    },
    searchCom (page) { // 查询保险公司
      this.cooComList.current = page
      this.cooComList.pageSize = this.pageSize
      this.current = page
      this.postInfo = JSON.parse(JSON.stringify(this.cooComList))
      this.searchComPost(this.postInfo)
    },
    searchComPost (data) {
      this.Loading()
      this.getComList(data).then(resp => {
        this.closeLoading()
        if (resp.code === '000000') {
          this.cooTableData = resp.data.data
          this.isShowTable = true
          this.totalPages = resp.data.totalPages
          this.totalRecords = resp.data.totalRecords
        } else {
          if (resp.code === '000002') {
            this.cooTableData = resp.data.data
            this.isShowTable = true
            this.totalPages = resp.data.totalPages
            this.totalRecords = resp.data.totalRecords
          } else {
            this.openMseg('error', resp.msg)
          }
        }
      })
    },
    handleCurrentChange (val) { // 保险公司翻页
      this.postInfo.current = val
      this.current = val
      this.searchComPost(this.postInfo)
    },
    handleSelectionChange (val) { // 表格勾选
      this.selectItem = JSON.parse(JSON.stringify(val))
    },
    handleSizeChange (val) {
      this.pageSize = val
      this.postInfo.current = 1
      this.postInfo.pageSize = val
      this.current = 1
      console.log(this.postInfo)
      this.searchComPost(this.postInfo)
    },
    checkSelectable (row, index) { //  不可勾选
      if (row.exaType === '3' && row.exaStatus === '1') {
        return 0
      } else {
        return 1
      }
    },
    detail (row) { // 查询修改前详情
      this.Loading()
      this.getDetails({'companyCode': row.exaId}).then(resp => {
        this.closeLoading()
        if (resp.code === '000000') {
          this.detailData = resp.data
          var prov = resp.data.belongingProvince.split('-')
          this.detailData.provinceName = prov[1]
          this.picData = resp.data.pictureFiles
          this.isDetail = true
        } else {
          this.openMseg('error', resp.msg)
        }
      })
    },
    detailModify (row) { // 查看修改后的详情
      this.Loading()
      this.afterGetDetails({'companyCode': row.exaId}).then(resp => {
        this.closeLoading()
        if (resp.code === '000000') {
          this.detailData = resp.data
          var prov = resp.data.belongingProvince.split('-')
          this.detailData.provinceName = prov[1]
          if (!IsEmpty(resp.data.pictureFiles)) {
            this.picData = resp.data.pictureFiles
          }
          this.isDetail = true
        } else {
          this.open('error', resp.msg)
        }
      })
    },
    addPut () { // 添加保险公司
      this.addData.companyCode = ''
      this.addData.belongingProvince = this.provinceCode
      this.addData.pictureFiles = this.picData
      if (IsEmpty(this.addData.pictureFiles)) {
        this.openMseg('error', '必须上传许可证/营业执照')
        return false
      }
      this.$refs['addData'].validate((valid) => {
        if (valid) {
          this.Loading()
          this.addCom(this.addData).then(resp => {
            this.closeLoading()
            if (resp.code === '000000') {
              this.openMseg('success', resp.msg)
              this.isAdd = false
              this.addData = {}
              this.picData = []
              this.$refs['addData'].resetFields()
              this.addData.priceTax = ''
            } else {
              this.openMseg('error', resp.msg)
            }
          })
        } else {
          return false
        }
      })
    },
    handleProSelect (item) { // 省份选择
      this.provinceCode = item.configSetValueCode
      this.addData.provinceName = item.configSetValueName
    },
    handleProSelect_mod (item) { // 省份选择
      this.provinceCode = item.configSetValueCode
      this.$set(this.modifyData, 'provinceName', item.configSetValueName)
    },
    querySearchAsync (queryString, cb) { // 查询省份 cb callBack方法
      this.searchProCoo({'codeOrName': queryString, 'provinceOrCity': 'province'}).then(resp => {
        this.proSearch = resp
        cb(this.proSearch)
      })
    },
    handleCitySelect (item) { // 城市选择
      this.addData.belongingCity = item.name
    },
    handleCitySelect_mod (item) { // 城市选择
      this.$set(this.modifyData, 'belongingCity', item.name)
    },
    verifyComcode (operNum) {
      // 比对公司号
      let tempComCode = this.$store.state.login.showComName.split('(')[1].split(')')[0] // 拿到登录用户comcode
      for (let i = 0; i < this.selectItem.length; i++) {
        if (this.selectItem[i].comCode !== tempComCode && tempComCode !== '01') {
          this.openMseg('error', '您不能对本公司外的，其他公司的记录进行操作')
          return
        }
      }
      switch (operNum) {
        case 1:
          this.modifyCom()
          break
        case 2:
          this.deleteCom()
          break
        case 3:
          this.audit()
          break
        default:
          break
      }
    },
    querySearchcity (queryString, cb) { // 查询城市 cb callBack方法
      let isCon = false
      let name = ''
      if (this.isModify) {
        if (this.modifyData.provinceName !== '') {
          isCon = true
          name = this.modifyData.provinceName
        } else {
          this.openMseg('error', '请先选择省份！')
        }
      } else {
        if (this.addData.provinceName !== '') {
          isCon = true
          name = this.addData.provinceName
        } else {
          this.openMseg('error', '请先选择省份！')
        }
      }
      if (isCon) {
        this.getCooCity_cooCom({'codeOrName': queryString, 'provinceName': name}).then(resp => {
          this.citySearch = resp
          cb(this.citySearch)
        })
      }
    },
    modifyCom () { // 点击修改
      this.provinceCode = ''
      this.provinceName = ''
      if (this.selectItem.length === 1) {
        if (this.selectItem[0].exaStatus !== '3') {
          this.picData = []
          this.Loading()
          this.getDetails({'companyCode': this.selectItem[0].exaId}).then(resp => {
            this.closeLoading()
            if (resp.code === '000000') {
              this.modifyData = resp.data
              this.isModify = true
              var prov = resp.data.belongingProvince.split('-')
              this.provinceCode = prov[0]
              this.$set(this.modifyData, 'provinceName', prov[1])
              if (!IsEmpty(resp.data.pictureFiles)) {
                this.picData = resp.data.pictureFiles
              }
              console.log(this.modifyData.validTimeBusiness)
            }
          }).catch((e) => {
            this.closeLoading()
          })
        } else {
          this.openMseg('error', '仅可对审核通过、审核不通过的记录进行修改!')
        }
      } else {
        if (this.selectItem.length > 1) {
          this.openMseg('error', '只能勾选一条记录！')
        } else {
          this.openMseg('error', '请先勾选记录！')
        }
      }
    },
    modifyPut () { // 提交修改保险公司
      this.modifyData.belongingProvince = this.provinceCode
      this.$refs['modifyData'].validate((valid) => {
        if (valid) {
          this.modifyData.pictureFiles = this.picData
          if (IsEmpty(this.modifyData.pictureFiles)) {
            this.openMseg('error', '必须上传许可证/营业执照')
            return false
          }
          this.Loading()
          this.modifyCooCom(this.modifyData).then(resp => {
            this.closeLoading()
            if (resp.code === '000000') {
              this.isModify = false
              this.modifyData = {}
              this.openMseg('success', resp.msg)
            } else {
              this.openMseg('error', resp.msg)
            }
          }).catch((e) => {
            this.closeLoading()
          })
        } else {
          return false
        }
      })
    },
    audit () { // 保险公司审核
      this.auditResult = {}
      if (this.selectItem.length > 0) {
        let tagType = true
        this.selectItem.forEach((item, index) => {
          if (item.exaStatus === '3') {
          } else {
            tagType = false
            this.openMseg('error', '仅可对待审核状态进行审核！')
            this.audit_dialog = false
            return false
          }
        })
        if (tagType) {
          this.audit_dialog = true
        }
      } else {
        this.openMseg('error', '请先勾选记录！')
      }
    },
    auditPut () {
      var codeString = []
      for (var i = 0; i < this.selectItem.length; i++) {
        codeString[i] = this.selectItem[i].exaId
      }
      codeString = codeString.join(',')
      this.auditResult.companyCodes = codeString
      this.Loading()
      this.auditCooCom(this.auditResult).then(resp => {
        this.closeLoading()
        if (resp.code === '000000') {
          this.audit_dialog = false
          this.auditResult = {}
          this.openMseg('success', resp.msg)
          this.searchCom(1)
        } else {
          this.openMseg('error', resp.msg)
        }
      })
    },
    detailAudit (row) { // 历史审核记录
      let postData = {
        'companyCode': row.exaId
      }
      this.getAudit_cooCom(postData).then(resp => {
        if (resp.code === '000000' || resp.code === '000002') {
          this.audit_his = true
          this.auditTableData = resp.data
        }
      })
    },
    closeDailog () {
      return new Promise((resolve, reject) => {
        this.com_dialog = false
        resolve()
      })
    },
    auditClose () { // 关闭审核弹框时清空数据
      this.auditResult = {}
      this.audit_dialog = false
    },
    deleteCom () { // 删除保险公司
      if (this.selectItem.length > 0) {
        for (var i = 0; i < this.selectItem.length; i++) {
          if (this.selectItem[i].exaStatus === '3') {
            this.openMseg('error', '待审核不能删除！')
            return false
          } else {
            this.isDelete = true
          }
        }
      } else {
        this.openMseg('error', '请先勾选记录！')
      }
    },
    deleteTrue () { // 确认删除
      var codeString = []
      for (var i = 0; i < this.selectItem.length; i++) {
        codeString[i] = this.selectItem[i].exaId
      }
      codeString = codeString.join(',')
      this.deleteItem.companyCodes = codeString
      this.Loading()
      this.deleteCooCom(this.deleteItem).then(resp => {
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
    getAllCooCom (page, tag) { // 获取合作经代公司
      this.sizeList = [5, 10, 20, 50]
      this.isComType = tag
      if (tag === 0) {
        this.valueLog = this.cooComList.companyCode
      } else {
        this.valueLog = this.cooComList.companyName
      }
      let postData = {
        'current': page,
        'companyCodeOrName': this.valueLog,
        'pageSize': this.pageSizeCom,
        'clickType': '2'
      }
      this.getAllCom2(postData).then(resp => {
        if (resp.code === '000000' || resp.code === '000002') {
          if (resp.code === '000002') {
            this.searchComTableData = []
          } else {
            this.searchComTableData = resp.data.data
          }
          this.com_dialog = true
          this.totalPagesD = resp.data.totalPages
          this.totalRecordsD = resp.data.totalRecords
        }
      })
    },
    comCurrentChange (val) { // 选择保险公司分页
      this.getAllCooCom(val, this.isComType)
    },
    cooSizeChange (val) {
      this.pageSizeCom = val
      this.getAllCooCom(1, this.isComType)
    },
    selectRowCom (row) { // 公司选择
      this.closeDailog().then(() => {
        row = JSON.parse(JSON.stringify(row))
        this.cooComList.companyCode = row.companyCode
        this.cooComList.companyName = row.companyName
        this.com_dialog = false
      })
    },
    blurCom (event, tag) {
      if (event.target.value === '' || this.com_dialog) {
        return false
      }
      let postData = {
        'companyCodeOrName': event.target.value,
        'clickType': '1'
      }
      this.getAllCom2(postData).then(resp => {
        if (resp.code === '000000') {
          this.cooComList.companyCode = resp.data.data[0].companyCode
          this.cooComList.companyName = resp.data.data[0].companyName
        } else {
          this.cooComList.companyCode = ''
          this.cooComList.companyName = ''
          this.openMseg('error', resp.msg)
        }
      })
    },
    closeDialog () {
      this.sizeList = []
      this.pageSizeCom = 5
      this.cooComList.companyCode = ''
      this.cooComList.companyName = ''
      this.com_dialog = false
    },
    closeAdd () {
      this.$refs['addData'].resetFields()
      this.isAdd = false
      this.addData.priceTax = ''
      this.picData = []
    },
    closeMod () {
      this.isModify = false
    },
    getFilialeOrg (page) { // 获取分公司机构
      this.sizeList = [5, 10, 20, 50]
      this.currentD = page
      var postData = {
        'comCodeOrName': this.cooComList.comName,
        'currentPage': page,
        'pageSize': this.pageSizeD,
        'clickType': '2'
      }
      this.orgTableData = []
      this.getFiliale_cooCom2(postData).then(resp => {
        if (resp.code === '000000') {
          this.orgTableData = resp.data.data
          this.totalPageD = resp.data.totalPages
          this.totalRecordsD = resp.data.totalRecords
          this.show_org = true
        } else if (resp.code === '000002') { // 没有数据
          this.totalRecordsD = 0
          this.show_org = true
        } else {
          this.openMseg('error', resp.msg)
        }
      })
    },
    orgCurrentChange (val) {
      this.getFilialeOrg(val)
    },
    orgClose () {
      // 关闭弹窗
      this.sizeList = []
      this.pageSizeD = 5
      this.show_org = false
      this.cooComList.comCode = ''
      this.cooComList.comName = ''
    },
    orgSizeChange (size) {
      this.pageSizeD = size
      this.getFilialeOrg(1)
    },
    selectRow (row, event, column) {
      // 选择机构
      this.closeDailog().then(() => {
        row = JSON.parse(JSON.stringify(row))
        this.cooComList.comCode = row.comCode
        this.cooComList.comName = row.comCName
        this.show_org = false
      })
    },
    outImport () { // 导出
      window.open(`/tabycore/baseCooagencyCompany/exportCooagencyCompany?companyCode=${this.cooComList.companyCode}&companyName=${this.cooComList.companyName}&verifyStatus=${this.cooComList.verifyStatus}&comCode=${this.cooComList.comCode}`)
    },
    showFj (tag) {
      if (tag === 0) { // 详情
        this.tag_1 = true // 下载
        this.tag_2 = true // 预览
        this.tag_3 = false // 删除
        this.tag_4 = false // 上传
      }
      if (tag === 1) { // 添加
        this.tag_1 = false
        this.tag_2 = true
        this.tag_3 = true
        this.tag_4 = true
      }
      if (tag === 2) { // 修改
        this.tag_1 = true
        this.tag_2 = true
        this.tag_3 = true
        this.tag_4 = true
      }
      this.isFj = true
    },
    uploadUrl () { // 上传地址
      return '/tabycore/baseCooagencyCompany/pictureUpLoad'
    },
    picSuccess (resp) {
      console.log(resp)
      if (resp.code === '000000') {
        this.openMseg('success', resp.msg)
        this.picData.push(resp.data)
        this.fileList = []
      } else if (resp.code === '000002') {
        this.openMseg('warning', resp.msg)
        this.FjfileList = []
      }
    },
    checkPic (file) {
      window.open('/tabycore/baseCooagencyCompany/pictureYulan?fileName=' + file + '')
    },
    downPic (file) {
      const $a = document.createElement('a')
      $a.setAttribute('href', '/tabycore/baseCooagencyCompany/pictureDownLoad?fileName=' + file + '')
      $a.setAttribute('download', file)
      $a.click()
    },
    delPic (file, index) {
      this.picData.splice(index, 1)
    },
    closeupLoad () { // 关闭上传弹框
      this.isFj = false
      this.fileList = []
    },
    getDecimal (tag) {
      if (tag === 0) {
        this.addData.registeredCapital = this.toDecimal(this.addData.registeredCapital)
      } else {
        this.modifyData.registeredCapital = this.toDecimal(this.modifyData.registeredCapital)
      }
    },
    toDecimal (x) { // 补全小数点
      let f = parseFloat(x)
      if (isNaN(f)) {
        return ''
      }
      f = Math.round(x * 100) / 100
      let s = f.toString()
      let rs = s.indexOf('.')
      if (rs < 0) {
        rs = s.length
        s += '.'
      }
      while (s.length <= rs + 2) {
        s += '0'
      }
      return s
    },
    openMseg (types, mesg) { // 提示
      this.$message({
        message: mesg,
        type: types
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
      'getComList',
      'addCom',
      'searchProCoo',
      'searchDetailCom',
      'modifyCooCom',
      'auditCooCom',
      'deleteCooCom',
      'getDetails',
      'afterGetDetails',
      'getAllCom',
      'getAllCom2',
      'getBtnLimt_cooCom',
      'getCooCity_cooCom',
      'picDel_cooCom',
      'getFiliale_cooCom',
      'getFiliale_cooCom2',
      'getAudit_cooCom'
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
    getOrgCode () {
      return this.$store.state.login.showComCode
    },
    getOrgName () {
      return this.$store.state.login.orgName
    }
  },
  watch: {
    getOrgCode: {
      handler: function (val) {
        if (val === '01') { // 总公司
          this.isDisplay = false
          this.cooComList.comCode = val
        } else {
          this.cooComList.comCode = val
          this.cooComList.comName = this.$store.state.login.orgName
          this.isDisplay = true
        }
      }
    },
    'cooComList.companyCode' () {
      if (this.cooComList.companyCode === '') {
        this.cooComList.companyName = ''
      }
    },
    'cooComList.companyName' () {
      if (this.cooComList.companyName === '') {
        this.cooComList.companyCode = ''
      }
    },
    'cooComList.comName' () {
      if (this.cooComList.comName === '') {
        this.cooComList.comCode = ''
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
  .btn-container { text-align: center; margin-top: 30px; }
  .pagination {
    text-align: right;
    margin: 20px auto;
  }
  a { text-decoration: none; }
  .el-table__body .el-button{
    line-height: 30px;
    height: 30px;
    width: 50px;
    font-size: 13px;
    padding: 0;
}
.dialog-footer { text-align: center;}
.upload-demo { margin-bottom: 20px; text-align: center; }
</style>
<style>
  .mesg_form .required:before{
    font-size: 14px!important;
    top: 3px !important;
  }
  .insManage_dialog .mesg_form .el-form-item__error { left: 160px;}
</style>
