<template>
  <div id="cooOrg">
    <ui-notice-bar slot="breadcast" >
      <el-breadcrumb slot="location" separator=">">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>供应商管理</el-breadcrumb-item>
        <el-breadcrumb-item>合作经代机构管理</el-breadcrumb-item>
      </el-breadcrumb>
    </ui-notice-bar>
    <!-- 条件查询 -->
    <el-form class="mesg_form search_form" :model="cooOrgList" ref="cooOrgList" :rules="rules">
      <el-row>
        <el-col :span="12">
          <el-form-item prop="companyCode">
            <ui-label-text :required='true' label="合作经代公司代码:" labelWidth="130" >
              <el-input slot="text"  @blur="blurCom($event, 0)"  placeholder="双击可选择" clearable v-model="cooOrgList.companyCode" @dblclick.native="getAllCooCom(1,0, $event)" ></el-input>
            </ui-label-text>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item prop="companyName">
            <ui-label-text :required='true' label="合作经代公司名称:" labelWidth="130"  >
              <el-input slot="text" @blur="blurCom($event, 0)"  @dblclick.native="getAllCooCom(1,0, $event)"  placeholder="双击可选择" clearable v-model="cooOrgList.companyName" ></el-input>
            </ui-label-text>
          </el-form-item>
        </el-col>          
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item>
            <ui-label-text label="合作经代机构代码:" labelWidth="130" >
              <el-input slot="text" placeholder="双击可选择" @blur="blurOrg($event, 0)" v-model="cooOrgList.orgCode" clearable @dblclick.native="getAllOrg_Coo(1,0)" ></el-input>
            </ui-label-text>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item>
            <ui-label-text label="合作经代机构名称:" labelWidth="130"   @dblclick.native="getAllOrg_Coo(1,0)" >
              <el-input slot="text" placeholder="双击可选择" @blur="blurOrg($event, 0)" v-model="cooOrgList.orgName" clearable ></el-input>
            </ui-label-text>
          </el-form-item>
        </el-col>          
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item>
            <ui-label-text class="selectList" label="审核状态:" labelWidth="130" >
              <el-select v-model="cooOrgList.verifyStatus" size='mini' slot="text" placeholder="请选择">
                <el-option label="审核通过" value="1"> </el-option>
                <el-option  label="审核不通过" value="2"> </el-option>
                <el-option label="待审核" value="3"> </el-option>
              </el-select>
            </ui-label-text>
          </el-form-item>
        </el-col>
      </el-row>
      <div class='btn-container'>
        <el-button type="primary" :disabled="!limt.query" @click.native.prevent="searchOrg(1)" >查询</el-button>
        <el-button type="primary" :disabled="!limt.add" @click.native.prevent="addOrg" >新增</el-button>
        <el-button size="primary" :disabled="!limt.modify" @click.native.prevent="modifyOrg" >修改</el-button>
        <el-button type="danger" :disabled="!limt.del" @click.native.prevent="deleteOrg" >删除</el-button>
        <el-button type="primary" :disabled="!limt.review" @click.native.prevent='audit' >审核</el-button>
      </div>
    </el-form>
    <el-table stripe ref="multipleTable" :data="cooTableData" v-if='isShowTable' tooltip-effect="dark" style="width: 100%;" @selection-change="handleSelectionChange"  >
      <el-table-column type="selection" width="55" :selectable="checkSelectable" >
      </el-table-column>
      <el-table-column prop="exaId" label="合作经代机构代码" >
         <template slot-scope="scope">
           <a href="javascript:void(0)" @click="detailBefor(scope.row)">{{scope.row.exaId}}</a>
          </template>
      </el-table-column>
      <el-table-column prop="title" label="合作经代机构名称" ></el-table-column>
      <el-table-column prop="ext11" label="合作经代公司名称"  > </el-table-column>
      <el-table-column prop="ext9" label="有效状态">
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
            <el-button type="primary" v-if="scope.row.exaType === '2' && scope.row.exaStatus === '3' " size='mini' @click="detail(scope.row)">查看</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="pagination" v-if='isShowTable'>
      <el-pagination @size-change="handleSizeChange"  @current-change='handleCurrentChange' :current-page.sync="current" :pager-count='5' :page-size='5' :page-sizes='[5, 10, 20, 50]' :total="totalRecords" layout="total, sizes, prev, pager, next, jumper" :page-count="totalPages"></el-pagination>
    </div>
    <!-- 添加弹窗 -->
    <el-dialog :append-to-body='true' @close='closeAdd' center width='70%' title="合作经代机构新增"  :visible.sync="isAdd" >
      <el-form class="mesg_form add_form" :model="addData" ref="addData" :rules="rules" > 
        <ui-line-tittle :collapsible="true" >
          <span slot="title" >
              <i class="font_family icon-jy-menu-4" ></i>合作经代机构新增
          </span>
          <div class="ri-content" slot="content" >
            <el-row>
              <el-col :span="12">
                <el-form-item>
                  <ui-label-text labelWidth="160" label="合作经代机构代码:" v-model="addData.orgCode" text="系统自动编码" ></ui-label-text>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item prop="orgName">
                  <ui-label-text :required="true" labelWidth="160" label="合作经代机构名称:" >
                    <el-input v-model="addData.orgName" clearable slot="text" ></el-input>
                  </ui-label-text>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item prop="companyCode">
                  <ui-label-text :required="true" labelWidth="160" label="所属合作经代公司代码:" >
                     <el-input v-model="addData.companyCode" clearable placeholder="双击选择" @dblclick.native="getAllCooCom(1,1, $event)" @blur="blurCom($event, 1)"  slot="text" ></el-input>
                  </ui-label-text>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item prop="companyName">
                  <ui-label-text :required="true" labelWidth="160" label="所属合作经代公司名称:" >
                    <el-input v-model="addData.companyName" clearable placeholder="双击选择"  @dblclick.native="getAllCooCom(1,1, $event)" @blur="blurCom($event, 1)"  slot="text" ></el-input>
                  </ui-label-text>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item prop="provinceName">
                  <ui-label-text :required="true"  labelWidth="160" label="经代机构所属省份:" >
                    <el-autocomplete v-model="addData.provinceName" slot="text" :fetch-suggestions="querySearchAsync"  placeholder="请输入内容"  @select="handleProSelect" >
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
                  <ui-label-text :required="true"  labelWidth="160" label="经代机构所属城市:" >
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
                <el-form-item prop="orgType">
                  <ui-label-text :required="true"  labelWidth="160" label="机构类型:" >
                    <el-select v-model="addData.orgType" slot="text" placeholder="请选择">
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
            <el-row>
              <el-col :span="12">
                <el-form-item>
                  <ui-label-text labelWidth="160" label="营业执照身份证号:" >
                    <el-input clearable v-model="addData.businessLicenseId" slot="text" ></el-input>
                  </ui-label-text>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item>
                  <ui-label-text labelWidth="160" label="营业期限：" >
                    <el-date-picker slot="text"  value-format="yyyy-MM-dd" v-model="addData.validTimeBusiness" type="date" placeholder="选择日期"></el-date-picker>
                    <!-- <el-input v-model="addData.validTimeBusiness"  slot="text" ></el-input> -->
                  </ui-label-text>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item>
                  <ui-label-text labelWidth="160" label="法人代表人/负责人:" >
                    <el-input clearable v-model="addData.corporate" slot="text" ></el-input>
                  </ui-label-text>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item prop="registeredCapital">
                  <ui-label-text  labelWidth="160" label="注册资本:" >
                    <el-input clearable v-model="addData.registeredCapital" slot="text" @blur="getDecimal(0)"></el-input>
                  </ui-label-text>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item prop="phoneNumber">
                  <ui-label-text labelWidth="160" label="联系电话：" >
                    <el-input v-model="addData.phoneNumber" slot="text" ></el-input>
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
            <el-row>
              <el-col :span="12">
                <el-form-item>
                  <ui-label-text labelWidth="160" label="联系地址：" >
                    <el-input v-model="addData.contactAddress"  slot="text" ></el-input>
                  </ui-label-text>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item>
                  <ui-label-text labelWidth="160" label="许可证/营业执照上传：" >
                    <el-button slot="text" @click="showFj(1)">附件管理</el-button>
                  </ui-label-text>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <ui-label-text labelWidth="160" label="备注:" >
                  <el-input clearable type="textarea" autosize  v-model="addData.remark" slot="text" ></el-input>
                </ui-label-text>
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
    <el-dialog :append-to-body='true' @close='closeMod' center width='70%' title="保险机构修改"  :visible.sync="isModify" >
      <el-form class="mesg_form add_form" :model="modifyData" ref="modifyData" :rules="rules" > 
        <ui-line-tittle :collapsible="true" >
          <span slot="title" >
              <i class="font_family icon-jy-menu-4" ></i>合作经代机构新增
          </span>
          <div class="ri-content" slot="content" >
            <el-row>
              <el-col :span="12">
                <el-form-item>
                  <ui-label-text labelWidth="160" label="合作经代机构代码:" :text="modifyData.orgCode" ></ui-label-text>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item prop="orgName">
                  <ui-label-text :required="true" labelWidth="160" label="合作经代机构名称:" >
                    <el-input v-model="modifyData.orgName" clearable slot="text" ></el-input>
                  </ui-label-text>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item prop="companyCode">
                  <ui-label-text :required="true" labelWidth="160" label="所属合作经代公司代码:" >
                     <el-input v-model="modifyData.companyCode" clearable placeholder="双击选择" @dblclick.native="getAllCooCom(1,1, $event)" @blur="blurCom($event, 1)"  slot="text" ></el-input>
                  </ui-label-text>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item prop="companyName">
                  <ui-label-text :required="true" labelWidth="160" label="所属合作经代公司名称:" >
                    <el-input v-model="modifyData.companyName" clearable placeholder="双击选择"  @dblclick.native="getAllCooCom(1,1, $event)" @blur="blurCom($event, 1)"  slot="text" ></el-input>
                  </ui-label-text>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item prop="provinceName">
                  <ui-label-text :required="true"  labelWidth="160" label="经代机构所属省份:" >
                    <el-autocomplete v-model="modifyData.provinceName" slot="text" :fetch-suggestions="querySearchAsync"  placeholder="请输入内容"  @select="handleProSelect" >
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
                  <ui-label-text :required="true"  labelWidth="160" label="经代机构所属城市:" >
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
                <el-form-item prop="orgType">
                  <ui-label-text :required="true"  labelWidth="160" label="机构类型:" >
                    <el-select v-model="modifyData.orgType" slot="text" placeholder="请选择">
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
            <el-row>
              <el-col :span="12">
                <el-form-item>
                  <ui-label-text labelWidth="160" label="营业执照身份证号:" >
                    <el-input clearable v-model="modifyData.businessLicenseId" slot="text" ></el-input>
                  </ui-label-text>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item>
                  <ui-label-text labelWidth="160" label="营业期限：" >
                    <el-date-picker slot="text"  value-format="yyyy-MM-dd" v-model="modifyData.validTimeBusiness" type="date" placeholder="选择日期"></el-date-picker>
                    <!-- <el-input v-model="modifyData.validTimeBusiness"  slot="text" ></el-input> -->
                  </ui-label-text>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item>
                  <ui-label-text labelWidth="160" label="法人代表人/负责人:" >
                    <el-input clearable v-model="modifyData.corporate" slot="text" ></el-input>
                  </ui-label-text>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item prop="registeredCapital">
                  <ui-label-text  labelWidth="160" label="注册资本:" >
                    <el-input clearable v-model="modifyData.registeredCapital" @blur="getDecimal(1)"  slot="text" ></el-input>
                  </ui-label-text>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item prop="phoneNumber">
                  <ui-label-text labelWidth="160" label="联系电话：" >
                    <el-input v-model="modifyData.phoneNumber" slot="text" ></el-input>
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
            <el-row>
              <el-col :span="12">
                <el-form-item>
                  <ui-label-text labelWidth="160" label="联系地址：" >
                    <el-input v-model="modifyData.contactAddress" slot="text" ></el-input>
                  </ui-label-text>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item>
                  <ui-label-text labelWidth="160" label="许可证/营业执照上传：" >
                    <el-button slot="text" @click="showFj(2)">附件管理</el-button>
                  </ui-label-text>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <ui-label-text labelWidth="160" label="备注:" >
                  <el-input clearable type="textarea" autosize  v-model="modifyData.remark" slot="text" ></el-input>
                </ui-label-text>
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
     <el-dialog title="合作经代机构审核" :append-to-body='true' :before-close="auditClose" center :visible.sync="audit_dialog">
       <ui-line-tittle :collapsible="true" >
         <span slot="title" >
            <i class="font_family icon-jy-menu-4" ></i>合作经代机构审核
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
            <div slot="footer" class="btn-container">
              <el-button @click="audit_dialog = false">返 回</el-button>
              <el-button type="primary" @click="auditPut">审 核</el-button>
            </div>
          </div>
       </ui-line-tittle>
    </el-dialog>
    <!-- 删除提示 -->
    <el-dialog title="提示" :append-to-body='true' :visible.sync="isDelete" width="30%" >
      <span>确定删除？</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="isDelete = false">取 消</el-button>
        <el-button type="primary" @click="deleteTrue">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 获取合作经代公司 -->
    <el-dialog title="合作经代公司" @close='closeDialog' :append-to-body='true' :visible.sync="com_dialog" width="50%" center>
      <el-table stripe @row-click='selectRowCom' ref="multipleTable" :data="searchComTableData" >
        <el-table-column prop="companyCode" label="合作经代公司代码" center ></el-table-column>
        <el-table-column prop="companyName" label="合作经代公司名称" center ></el-table-column>
      </el-table>
      <div class="pagination" >
        <el-pagination @size-change="cooSizeChange" @current-change='comCurrentChange' :current-page.sync="currentD" :pager-count='5' :page-size='5' :page-sizes='sizeList'  :total="totalRecordsD" layout="total, sizes, prev, pager, next, jumper" > </el-pagination>
      </div>
    </el-dialog>
     <!-- 获取合作经代机构 -->
    <el-dialog title="合作经代机构" @close='closeOrgDialog' :append-to-body='true' :visible.sync="org_dialog" width="50%" center>
      <el-table stripe @row-click='selectRowOrg' ref="multipleTable" :data="searchOrgTableData" >
        <el-table-column prop="orgCode" label="合作经代机构代码" center ></el-table-column>
        <el-table-column prop="orgName" label="合作经代机构名称" center ></el-table-column>
      </el-table>
      <div class="pagination" >
        <el-pagination @size-change="orgSizeChange" @current-change='orgCurrentChange' :current-page.sync="currentD" :pager-count='5' :page-size='5' :page-sizes='sizeList'  :total="totalRecordsD" layout="total, sizes, prev, pager, next, jumper" > </el-pagination>
      </div>
    </el-dialog>
    <!-- 详情弹窗 -->
    <el-dialog :append-to-body='true' center width='70%' title="合作经代机构详情"  :visible.sync="isDetail" >
      <el-form class="mesg_form add_form" :model="detailData" ref="detailData"> 
        <ui-line-tittle :collapsible="true" >
          <span slot="title" >
              <i class="font_family icon-jy-menu-4" ></i>合作经代机构新增
          </span>
          <div class="ri-content" slot="content" >
            <el-row>
              <el-col :span="12">
                <el-form-item>
                  <ui-label-text labelWidth="160" label="合作经代机构代码:" :text="detailData.orgCode" ></ui-label-text>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item prop="orgName">
                  <ui-label-text :required="true" labelWidth="160" label="合作经代机构名称:" >
                    <el-input :disabled="true" v-model="detailData.orgName" clearable slot="text" ></el-input>
                  </ui-label-text>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item prop="companyCode">
                  <ui-label-text :required="true" labelWidth="160" label="所属合作经代公司代码:" >
                     <el-input :disabled="true"  v-model="detailData.companyCode" clearable slot="text" ></el-input>
                  </ui-label-text>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item prop="companyName">
                  <ui-label-text :required="true" labelWidth="160" label="所属合作经代公司名称:" >
                    <el-input :disabled="true" v-model="detailData.companyName" clearable   slot="text" ></el-input>
                  </ui-label-text>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item prop="provinceName">
                  <ui-label-text :required="true"  labelWidth="160" label="经代机构所属省份:" >
                    <el-autocomplete disabled v-model="detailData.provinceName" slot="text" :fetch-suggestions="querySearchAsync"  placeholder="请输入内容"  @select="handleProSelect" >
                      <template slot-scope="{ item }">
                        <span class="code">{{ item.configSetValueCode }}</span>-
                        <span class="name">{{ item.configSetValueName }}</span>
                      </template>
                    </el-autocomplete>
                  </ui-label-text>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <ui-label-text  labelWidth="160" label="经代机构所属城市:" >
                  <el-input v-model="detailData.belongingCity" :disabled="true"  slot="text" ></el-input>
                </ui-label-text>
              </el-col>
            </el-row>
            <el-row class="ri-line">
              <el-col :span="12">
                <ui-label-text labelWidth="160" label="机构类型:" >
                  <el-select v-model="detailData.orgType" disabled slot="text" placeholder="请选择">
                    <el-option label="保险经纪公司" value="1"></el-option>
                    <el-option label="保险代理公司" value="2"></el-option>
                  </el-select>
                </ui-label-text>             
              </el-col>
              <el-col :span="12">
                <ui-label-text labelWidth="160" label="状态:" >
                  <el-select v-model="detailData.valid" disabled  slot="text" placeholder="请选择">
                    <el-option label="有效" value="1"></el-option>
                    <el-option label="无效" value="2"></el-option>
                  </el-select>
                </ui-label-text>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item prop="businessLicenseId">
                  <ui-label-text :required="true"  labelWidth="160" label="营业执照身份证号:" >
                    <el-input :disabled="true" clearable v-model="detailData.businessLicenseId" slot="text" ></el-input>
                  </ui-label-text>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item>
                  <ui-label-text labelWidth="160" label="营业期限：" >
                    <el-date-picker slot="text"  value-format="yyyy-MM-dd" :disabled="true" v-model="detailData.validTimeBusiness" type="date" placeholder="选择日期"></el-date-picker>
                    <!-- <el-input v-model="detailData.validTimeBusiness" :disabled="true" slot="text" ></el-input> -->
                  </ui-label-text>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row class="ri-line">
              <el-col :span="12">
                <el-form-item>
                  <ui-label-text labelWidth="160" label="法人代表人/负责人:" >
                    <el-input v-model="detailData.corporate" :disabled="true" slot="text" ></el-input>
                  </ui-label-text>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item>
                  <ui-label-text  labelWidth="160" label="注册资本：" >
                    <el-input v-model="detailData.registeredCapital"  :disabled="true" slot="text" ></el-input>
                  </ui-label-text>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row class="ri-line">
              <el-col :span="12">
                <el-form-item>
                  <ui-label-text labelWidth="160" label="联系电话：" >
                    <el-input v-model="detailData.phoneNumber" :disabled="true" slot="text" ></el-input>
                  </ui-label-text>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item>
                  <ui-label-text labelWidth="160" label="联系人：" >
                    <el-input v-model="detailData.contactPerson" :disabled="true" slot="text" ></el-input>
                  </ui-label-text>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item>
                  <ui-label-text labelWidth="160" label="联系地址：" >
                    <el-input v-model="detailData.contactAddress" :disabled="true" slot="text" ></el-input>
                  </ui-label-text>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item>
                  <ui-label-text labelWidth="160" label="许可证/营业执照上传：" >
                    <el-button slot="text" @click="showFj(0)">附件管理</el-button>
                  </ui-label-text>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item>
                  <ui-label-text labelWidth="160" label="备注:" >
                    <el-input disabled clearable type="textarea" autosize  v-model="detailData.remark" slot="text" ></el-input>
                  </ui-label-text>
                </el-form-item>
              </el-col>
            </el-row>
          </div>
        </ui-line-tittle>
      </el-form>
    </el-dialog>
    <!-- 上传附件 -->
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
    const { emptyValidator, PhoneValidator, decimalValidator } = this.$store.getters.validators
    return {
      rules: {
        companyCode: [
          { required: true, message: '合作经代公司代码不能为空', trigger: 'change' }
        ],
        companyName: [
          { required: true, message: '合作经代公司名称不能为空', trigger: 'change' }
        ],
        orgName: [
          { required: true, message: '合作经代机构名称不能为空', trigger: 'change' }
        ],
        orgType: emptyValidator,
        corporate: emptyValidator,
        provinceName: emptyValidator,
        belongingCity: emptyValidator,
        businessLicenseId: emptyValidator,
        validTimeOrganization: emptyValidator,
        validTimeBusiness: emptyValidator,
        valid: emptyValidator,
        provincename: emptyValidator,
        phoneNumber: PhoneValidator,
        registeredCapital: decimalValidator
      },
      cooOrgList: {
        companyCode: '',
        companyName: '',
        orgCode: '',
        orgName: '',
        verifyStatus: '1'
      }, // 查询条件
      cooTableData: [], // 查询列表数据
      isShowTable: false, // 是否显示查询数据
      totalRecords: 0, // 分页总条数
      totalPages: 0, // 分页总页数
      current: 1,
      totalRecordsD: 0, // 分页总条数
      totalPagesD: 0, // 分页总页数
      currentD: 1,
      sizeList: [5, 10, 20, 50],
      pageSize: 5,
      pageSizeD: 5,
      selectItem: [], // 勾选条目
      isAdd: false, // 是否显示添加弹框
      addData: {
        companyCode: '',
        companyName: '',
        orgCode: '',
        orgName: '',
        orgType: '',
        provinceName: '',
        belongingCity: '',
        corporate: '',
        businessLicenseId: '',
        validTimeBusiness: '',
        registeredCapital: '',
        valid: '1'
      }, //  添加公司提交数据
      isModify: false,
      modifyData: {
        companyCode: '',
        companyName: '',
        orgCode: '',
        orgName: '',
        orgType: '',
        provinceName: '',
        belongingCity: '',
        corporate: '',
        businessLicenseId: '',
        validTimeBusiness: '',
        registeredCapital: '',
        valid: ''
      }, //  修改公司提交数据
      audit_dialog: false, // 是否显示审核弹框
      auditResult: {}, // 审核提交数据
      proSearch: [], //  省份数据
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
      org_dialog: false,
      searchOrgTableData: [],
      isBtn: false,
      loading: '',
      _event: '',
      limt: {
        add: false,
        modify: false,
        review: false,
        query: false,
        del: false
      },
      isFj: false,
      fileList: [],
      picData: [],
      tag_1: false,
      tag_2: false,
      tag_3: false,
      tag_4: false
    }
  },
  mounted () {
    this.getBtnLimt()
  },
  computed: {
    newComCode () {
      return this.cooOrgList.companyCode
    },
    newComName () {
      return this.cooOrgList.companyName
    },
    newOrgCode () {
      return this.cooOrgList.orgCode
    },
    newOrgName () {
      return this.cooOrgList.orgName
    },
    addCode () {
      return this.addData.companyCode
    }
  },
  watch: {
    'cooOrgList.companyCode' (newValue, oldValue) {
      if (newValue === '') {
        this.cooOrgList.companyName = ''
      }
    },
    'cooOrgList.companyName' (newValue, oldValue) {
      if (newValue === '') {
        this.cooOrgList.companyCode = ''
      }
    },
    'cooOrgList.orgCode' (newValue, oldValue) {
      if (newValue === '') {
        this.cooOrgList.orgName = ''
      }
    },
    'cooOrgList.orgName' (newValue, oldValue) {
      if (newValue === '') {
        this.cooOrgList.orgCode = ''
      }
    },
    'addData.companyCode' (newValue, oldValue) {
      if (newValue === '') {
        this.addData.companyName = ''
      }
    },
    'addData.companyName' (newValue, oldValue) {
      if (newValue === '') {
        this.addData.companyName = ''
      }
    },
    'modifyData.companyCode' (newValue, oldValue) {
      if (newValue === '') {
        this.modifyData.companyName = ''
      }
    },
    'modifyData.companyName' (newValue, oldValue) {
      if (newValue === '') {
        this.modifyData.companyCode = ''
      }
    }
  },
  methods: {
    getBtnLimt () { // 按钮权限
      let userId = getUserId()
      if (userId === null || userId === undefined) {
        userId = ''
      }
      let post = {
        'userId': userId,
        'page': '合作经代机构管理'
      }
      this.getBtnLimt_cooOrg(post).then(resp => {
        if (resp.code === '000000') {
          resp.data.forEach((item, index) => {
            this.limt[item.code] = item.checked
          })
        }
      })
    },
    searchOrg (page) { // 查询
      this.cooOrgList.current = page
      this.cooOrgList.pageSize = this.pageSize
      this.current = page
      this.$refs['cooOrgList'].validate((valid) => {
        if (valid) {
          this.Loading()
          this.getOrgList(this.cooOrgList).then(resp => {
            this.closeLoading()
            if (resp.code === '000000' || resp.code === '000002') {
              this.cooTableData = resp.data.data
              this.isShowTable = true
              this.totalPages = resp.data.totalPages
              this.totalRecords = resp.data.totalRecords
            } else {
            }
          })
        } else {
          return false
        }
      })
    },
    handleCurrentChange (val) { // 翻页
      this.searchOrg(val)
    },
    handleSizeChange (val) {
      this.pageSize = val
      this.searchOrg(1)
    },
    handleSelectionChange (val) { // 表格勾选
      console.log(val)
      this.selectItem = JSON.parse(JSON.stringify(val))
    },
    checkSelectable (row, index) { //  不可勾选
      if (row.exaType === '3' && row.exaStatus === '1') {
        return 0
      } else {
        return 1
      }
    },
    detail (row) { // 查看修改后的
      this.Loading()
      this.picData = []
      this.searchDetailAfterOrg({'orgCode': row.exaId}).then(resp => {
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
          this.open('errpr', resp.msg)
        }
      })
    },
    detailBefor (row) { // 修改前的
      this.Loading()
      this.picData = []
      this.searchDetailOrg({'orgCode': row.exaId}).then(resp => {
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
    getAllCooCom (page, tag, event) { // 获取合作经代公司
      this.sizeList = [5, 10, 20, 50]
      this.isComType = tag
      this.currentD = page
      this._event = event
      this.valueLog = event.target.value
      let postData = {
        'current': page,
        'companyCodeOrName': this.valueLog,
        'pageSize': this.pageSizeD,
        'clickType': '2'
      }
      this.getAllCom_Org(postData).then(resp => {
        if (resp.code === '000000' || resp.code === '000002') {
          this.searchComTableData = resp.data.data
          this.com_dialog = true
          console.log(resp.data.totalRecords)
          this.totalPagesD = resp.data.totalPages
          this.totalRecordsD = resp.data.totalRecords
        } else {
          this.open('error', resp.msg)
        }
      })
    },
    cooSizeChange (val) {
      this.pageSizeD = val
      this.getAllCooCom(1, this.isComType, this._event)
    },
    comCurrentChange (val) { // 选择保险公司分页
      this.getAllCooCom(val, this.isComType, this._event)
    },
    closeDialog () {
      this.sizeList = []
      this.pageSizeD = 5
      this.com_dialog = false
      this.org_dialog = false
    },
    selectRowCom (row) { // 公司选择
      if (this.isComType === 0) {
        this.cooOrgList.companyCode = row.companyCode
        this.cooOrgList.companyName = row.companyName
      } else if (this.isComType === 1) {
        this.addData.companyCode = row.companyCode
        this.addData.companyName = row.companyName
      } else if (this.isComType === 2) {
        this.modifyData.companyCode = row.companyCode
        this.modifyData.companyName = row.companyName
      }
      this.com_dialog = false
    },
    blurCom (event, tag) {
      if (event.target.value === '' || this.com_dialog) {
        return false
      }
      let postData = {
        'companyCodeOrName': event.target.value,
        'clickType': '1'
      }
      this.getAllCom_Org(postData).then(resp => {
        if (resp.code === '000000') {
          if (tag === 0) { // 查询
            this.cooOrgList.companyCode = resp.data.data[0].companyCode
            this.cooOrgList.companyName = resp.data.data[0].companyName
          } else if (tag === 1) { // 添加查询
            this.addData.companyCode = resp.data.data[0].companyCode
            this.addData.companyName = resp.data.data[0].companyName
          } else if (tag === 2) { // 修改查询
            this.modifyData.companyCode = resp.data.data[0].companyCode
            this.modifyData.companyName = resp.data.data[0].companyName
          }
        } else {
          if (tag === 0) { // 查询
            this.cooOrgList.companyCode = ''
            this.cooOrgList.companyName = ''
          } else if (tag === 1) { // 添加查询
            this.addData.companyCode = ''
            this.addData.companyName = ''
          } else if (tag === 2) { // 修改查询
            this.modifyData.companyCode = ''
            this.modifyData.companyName = ''
          }
          this.open('error', resp.msg)
        }
      })
    },
    getAllOrg_Coo (page, tag) { // 获取合作经代机构
      this.sizeList = [5, 10, 20, 50]
      this.isComType = tag
      this.currentD = page
      let val = ''
      if (tag === 0) {
        val = this.cooOrgList.orgCode
      } else {
        val = this.cooOrgList.orgName
      }
      if (this.cooOrgList.companyCode === '') {
        this.open('error', '请先选择合作经代公司代码！')
        return false
      }
      let postData = {
        'current': page,
        'orgCodeOrName': val,
        'companyCode': this.cooOrgList.companyCode,
        'pageSize': this.pageSizeD,
        'clickType': '2'
      }
      this.getAllCooOrg(postData).then(resp => {
        if (resp.code === '000000' || resp.code === '000002') {
          this.searchOrgTableData = resp.data.data
          this.org_dialog = true
          this.totalPagesD = resp.data.totalPages
          this.totalRecordsD = resp.data.totalRecords
        } else {
          this.open('error', resp.msg)
        }
      })
    },
    orgSizeChange (val) {
      this.pageSizeD = val
      this.getAllOrg_Coo(1, this.isComType)
    },
    orgCurrentChange (val) { // 选择保险公司分页
      this.getAllOrg_Coo(val, this.isComType)
    },
    closeOrgDialog () {
      this.sizeList = []
      this.pageSizeD = 5
      this.org_dialog = false
    },
    selectRowOrg (row) { // 公司选择
      this.cooOrgList.orgCode = row.orgCode
      this.cooOrgList.orgName = row.orgName
      this.org_dialog = false
    },
    blurOrg (event, tag) {
      if (event.target.value === '' || this.org_dialog) {
        return false
      }
      if (this.cooOrgList.companyCode === '') {
        this.open('error', '请先选择合作经代公司代码！')
        return false
      }
      let postData = {
        'companyCode': this.cooOrgList.companyCode,
        'orgCodeOrName': event.target.value,
        'clickType': '1'
      }
      this.getAllCooOrg(postData).then(resp => {
        if (resp.code === '000000') {
          this.cooOrgList.orgCode = resp.data.data[0].orgCode
          this.cooOrgList.orgName = resp.data.data[0].orgName
        } else {
          if (tag === 0) { // 查询
            this.cooOrgList.orgCode = ''
            this.cooOrgList.orgName = ''
          } else if (tag === 1) { // 添加查询
          } else if (tag === 2) { // 修改查询
          }
          this.open('error', resp.msg)
        }
      })
    },
    addOrg () {
      this.isAdd = true
      this.provinceCode = ''
      this.provinceName = ''
      this.picData = []
    },
    addPut () { // 添加机构
      this.addData.belongingProvince = this.provinceCode
      this.addData.pictureFiles = this.picData
      this.$refs['addData'].validate((valid) => {
        if (valid) {
          // this.isBtn = true
          this.Loading()
          this.addCooOrg(this.addData).then(resp => {
            this.closeLoading()
            if (resp.code === '000000') {
              this.isAdd = false
              this.$refs['addData'].resetFields()
              this.addData = {
                companyCode: '',
                companyName: '',
                orgCode: '',
                orgName: '',
                orgType: '',
                provinceName: '',
                corporate: '',
                businessLicenseId: '',
                validTimeBusiness: '',
                registeredCapital: '',
                valid: '1'
              }
              this.open('success', resp.msg)
            } else {
              // this.$refs['addData'].resetFields()
              this.open('error', resp.msg)
            }
            // this.isBtn = false
          })
        } else {
          return false
        }
      })
    },
    closeAdd () {
      this.isAdd = false
      this.addData = {
        companyCode: '',
        companyName: '',
        orgCode: '',
        orgName: '',
        orgType: '',
        provinceName: '',
        corporate: '',
        businessLicenseId: '',
        valid: '1'
      }
      this.$refs['addData'].resetFields()
    },
    closeMod () {
      this.isModify = false
      this.modifyData = {
        companyCode: '',
        companyName: '',
        orgCode: '',
        orgName: '',
        orgType: '',
        provinceName: '',
        corporate: '',
        businessLicenseId: '',
        valid: ''
      }
      this.$refs['modifyData'].resetFields()
    },
    handleProSelect (item) { // 省份选择
      this.provinceCode = item.configSetValueCode
      this.addData.provinceName = item.configSetValueName
      this.provinceName = item.configSetValueName
    },
    handleProSelect_mod (item) { // 省份选择
      this.provinceCode = item.configSetValueCode
      this.$set(this.modifyData, 'provinceName', item.configSetValueName)
      this.provinceName = item.configSetValueName
      console.log(this.modifyData.provinceName)
    },
    querySearchAsync (queryString, cb) { // 查询省份 cb callBack方法
      this.searchProCooOrg({'codeOrName': queryString, 'provinceOrCity': 'province'}).then(resp => {
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
    querySearchcity (queryString, cb) { // 查询城市 cb callBack方法
      let isCon = false
      let name = ''
      if (this.isModify) {
        if (this.modifyData.provinceName !== '') {
          isCon = true
          name = this.modifyData.provinceName
        } else {
          this.open('error', '请先选择省份！')
        }
      } else {
        if (this.addData.provinceName !== '') {
          isCon = true
          name = this.addData.provinceName
        } else {
          this.open('error', '请先选择省份！')
        }
      }
      if (isCon) {
        this.getCooCity_cooOrg({'codeOrName': queryString, 'provinceName': name}).then(resp => {
          this.citySearch = resp
          cb(this.citySearch)
        })
      }
    },
    modifyOrg () { // 点击修改
      this.provinceCode = ''
      this.provinceName = ''
      if (this.selectItem.length === 1) {
        if (this.selectItem[0].exaStatus !== '3') {
          this.picData = []
          this.Loading()
          this.searchDetailOrg({'orgCode': this.selectItem[0].exaId}).then(resp => {
            this.closeLoading()
            if (resp.code === '000000') {
              this.modifyData = resp.data
              var prov = resp.data.belongingProvince.split('-')
              this.provinceCode = prov[0]
              if (!IsEmpty(resp.data.pictureFiles)) {
                this.picData = resp.data.pictureFiles
              }
              this.$set(this.modifyData, 'provinceName', prov[1])
              this.isModify = true
            } else {
              this.open('error', resp.msg)
            }
          }).catch((e) => {
            this.closeLoading()
          })
        } else {
          this.open('error', '仅可对审核通过、审核不通过的记录进行修改!')
        }
      } else {
        if (this.selectItem.length > 1) {
          this.open('error', '只能勾选一条记录！')
        } else {
          this.open('error', '请先勾选记录！')
        }
      }
    },
    modifyPut () { // 提交修改保险公司
      this.modifyData.belongingProvince = this.provinceCode
      this.$refs['modifyData'].validate((valid) => {
        if (valid) {
          this.Loading()
          this.modifyData.pictureFiles = this.picData
          this.modifyCooOrg(this.modifyData).then(resp => {
            this.closeLoading()
            if (resp.code === '000000') {
              this.isModify = false
              this.modifyData = {
                companyCode: '',
                companyName: '',
                orgCode: '',
                orgName: '',
                orgType: '',
                provinceName: '',
                corporate: '',
                businessLicenseId: '',
                validTimeOrganization: '',
                validTimeBusiness: '',
                valid: ''
              }
              this.$refs['modifyData'].resetFields()
              this.open('success', resp.msg)
            } else {
              this.open('error', resp.msg)
            }
          })
        } else {
          return false
        }
      })
    },
    audit () { // 保险公司审核
      if (this.selectItem.length > 0) {
        let tagType = true
        this.selectItem.forEach((item, index) => {
          if (item.exaStatus === '3') {
          } else {
            tagType = false
            this.open('error', '仅可对待审核状态进行审核！')
            this.audit_dialog = false
            return false
          }
        })
        if (tagType) {
          this.audit_dialog = true
        }
      } else {
        this.open('error', '请先勾选记录！')
      }
    },
    auditPut () {
      var codeString = []
      for (var i = 0; i < this.selectItem.length; i++) {
        codeString[i] = this.selectItem[i].exaId
      }
      codeString = codeString.join(',')
      this.auditResult.orgCodes = codeString
      console.log(this.auditResult)
      this.Loading()
      this.auditCooOrg(this.auditResult).then(resp => {
        this.closeLoading()
        if (resp.code === '000000') {
          this.audit_dialog = false
          this.auditResult = {}
          this.open('success', resp.msg)
        } else {
          this.open('error', resp.msg)
        }
      })
    },
    auditClose () { // 关闭审核弹框时清空数据
      this.auditResult = {}
      this.audit_dialog = false
    },
    deleteOrg () { // 删除保险公司
      if (this.selectItem.length > 0) {
        let tagType = true
        this.selectItem.forEach((item, index) => {
          if (item.verifyStatus === '3') {
            tagType = false
            this.open('error', '待审核不能删除！')
            return false
          } else {
          }
          if (tagType) {
            this.isDelete = true
          }
        })
      } else {
        this.open('error', '请先勾选记录！')
      }
    },
    deleteTrue () { // 确认删除
      var codeString = []
      for (var i = 0; i < this.selectItem.length; i++) {
        codeString[i] = this.selectItem[i].exaId
      }
      codeString = codeString.join(',')
      this.deleteItem.orgCodes = codeString
      this.Loading()
      this.deleteCooOrg(this.deleteItem).then(resp => {
        this.closeLoading()
        if (resp.code === '000000') {
          this.isDelete = false
          this.deleteItem = {}
          this.open('success', resp.msg)
        } else {
          this.open('error', resp.msg)
        }
      })
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
        this.open('success', resp.msg)
        this.fileList = []
        this.picData.push(resp.data)
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
    open (types, mesg) { // 提示
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
      'getOrgList',
      'getAllCom_Org',
      'getAllCooOrg',
      'searchProCooOrg',
      'addCooOrg',
      'modifyCooOrg',
      'searchDetailOrg',
      'auditCooOrg',
      'deleteCooOrg',
      'searchDetailAfterOrg',
      'getBtnLimt_cooOrg',
      'getCooCity_cooOrg',
      'picDel_cooOrg'
    ])
  },
  components: {
    [NoticeBar.name]: NoticeBar,
    [LabelText.name]: LabelText,
    [LineTittle.name]: LineTittle
  },
  created () {
  }
}
</script>

<style lang="scss" scoped type="text/css">
  #cooOrg{
    padding: 0px 30px 30px 30px;
  }
  .ri-line { margin-bottom: 10px; }
  .btn-container { text-align: center; margin-top: 30px; }
  .search_form {
    margin: 20px 0 ;
  }
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
  .upload-demo { margin-bottom: 20px; text-align: center; }
</style>
<style  lang="scss" >
  .mesg_form .required:before{
    font-size: 14px!important;
    top: 3px !important;
  }
  .mesg_form .el-input__icon { line-height: initial; }
  .add_form .el-form-item__error { left: 160px;}
  #cooOrg {
    .search_form .el-form-item__error { left: 130px;}
  }
</style>
