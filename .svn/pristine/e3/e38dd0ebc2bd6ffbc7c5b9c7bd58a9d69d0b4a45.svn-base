<template>
  <div id="insManage">
    <ui-notice-bar slot="breadcast" v-if="!isEdit">
      <el-breadcrumb slot="location" separator=">">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>寿险业务管理</el-breadcrumb-item>
        <el-breadcrumb-item>寿险投保单管理</el-breadcrumb-item>
        <el-breadcrumb-item>投保单修改</el-breadcrumb-item>
      </el-breadcrumb>
    </ui-notice-bar>
     <!--基本信息开始 子组件 -->
        <ui-line-tittle :collapsible="true" >
          <span slot="title" >
              <i class="font_family icon-jy-menu-4" ></i>基本信息
          </span>
          <div class="ri-content" slot="content">
            <basic-info-mod :basic="lifePCMain" ref="basicInfoMod"></basic-info-mod>
          </div>
        </ui-line-tittle>
        <!--投保人信息-->
        <ui-line-tittle :collapsible="true" >
          <span slot="title" >
              <i class="font_family icon-jy-menu-4" ></i>投保人信息
          </span>
          <div class="ri-content" slot="content">
            <insurer-mod :insur="lifeParty" ref="insurerMod"></insurer-mod>
            <div class="center">
              <el-button type="primary"  @click="dialogTableVisibleAdd = true">新增个人客户</el-button>
            </div>
          </div>
        </ui-line-tittle>
        <!--被保险人信息  子组件   -->
        <ui-line-tittle :collapsible="true" >
          <span slot="title" >
              <i class="font_family icon-jy-menu-4" ></i>被保险人信息
          </span>
          <div class="ri-content" slot="content">
                <insurant-info-mod :insurant="lifePconDist" ref="insurantInfoMod"></insurant-info-mod>
              <div class="center" style="margin-top:20px;margin-bottom:20px">
                <el-button type="primary" @click="dialogTableVisibleAdd = true">新增个人客户</el-button>
              </div>
          </div>
        </ui-line-tittle>
        <!--身故受益人信息-->
        <ui-line-tittle :collapsible="true" >
          <span slot="title" >
              <i class="font_family icon-jy-menu-4" ></i>身故受益人信息
          </span>
          <div class="ri-content" slot="content">
            <el-row class="ri-line">
              <el-col :span="24" style="text-align:center">
                <el-col :span="24">
                  <el-radio-group v-model="lifePCMain.sgFlag">
                    <el-radio :label='1' >法定受益人</el-radio>
                    <el-radio :label='2' >指定受益人</el-radio>
                  </el-radio-group>
                </el-col>
              </el-col>
            </el-row>
            <div v-if="lifePCMain.sgFlag =='1'"></div>
            <div v-if="lifePCMain.sgFlag =='2'">
                <death-benefit-info-mod  :death="lifePartyTList" ref="deathInfoMod"></death-benefit-info-mod>
            </div>
          </div>
        </ui-line-tittle>
        <!--生存受益人信息  子组件  -->
        <ui-line-tittle :collapsible="true" >
          <span slot="title" >
              <i class="font_family icon-jy-menu-4" ></i>生存受益人信息
          </span>
          <div class="ri-content" slot="content">
            <el-row class="ri-line">
              <el-col :span="24" style="text-align:center">
                <el-radio-group v-model="lifePCMain.scFlag">
                  <el-radio :label='1' >投保人</el-radio>
                  <el-radio :label='2' >被保险人</el-radio>
                  <el-radio :label='3' >其他</el-radio>
                </el-radio-group>
              </el-col>
            </el-row>
            <div v-if="lifePCMain.scFlag =='1'"></div>
            <div v-if="lifePCMain.scFlag =='2'"></div>
            <div v-if="lifePCMain.scFlag =='3'">
                <live-benefit-info-mod :live="lifePartyAConditionList" ref="lifeInfoMod" ></live-benefit-info-mod>
            </div>
          </div>
        </ui-line-tittle>
        <!--业务员信息  子组件  -->
        <ui-line-tittle :collapsible="true" >
          <span slot="title" >
              <i class="font_family icon-jy-menu-4" ></i>业务员信息
          </span>
          <div class="ri-content" slot="content">
              <seller-info-mod  :seller="lifePCMain" ref="sellerInfoMod"></seller-info-mod>
          </div>
        </ui-line-tittle>
        <!--险种信息 子组件  -->
        <el-form class="mesg_form" :model="xianzhong" ref="BillNoList" :rules="riskRules">
          <ui-line-tittle :collapsible="true" >
            <span slot="title" >
              <i class="font_family icon-jy-menu-4" ></i>险种信息
            </span>
            <div class="ri-content riskTable" slot="content" >
              <el-table border :data="xianzhong.lifeCItemKindConditionList" style="width: 100%">
                <el-table-column prop="riskCode" label="险种代码" width="150">
                  <template slot-scope="scope">
                    <el-form-item  :prop="'lifeCItemKindConditionList.' + scope.$index +'.riskCode'" :rules="riskRules.riskCode">
                      <ui-label-text :required="true" >
                        <el-input slot="text" size='mini' placeholder="双击可选择" clearable v-model="scope.row.riskCode" @dblclick.native="getRiskList(1, scope.$index, scope.row, 0)" ></el-input>
                      </ui-label-text>
                    </el-form-item>
                  </template>
                </el-table-column>
                <el-table-column prop="riskName" label="险种名称" width="200" >
                  <template slot-scope="scope">
                    <el-form-item :prop="'lifeCItemKindConditionList.' + scope.$index +'.riskName'" :rules="riskRules.riskName">
                      <ui-label-text :required="true" >
                        <!-- <el-tooltip placement="top" slot="text">
                          <div slot="content">{{scope.row.riskName}}</div>
                          <el-input size='mini' placeholder="双击可选择" clearable v-model="scope.row.riskName" ></el-input>
                        </el-tooltip> -->
                        <el-input slot="text" size='mini' placeholder="双击可选择" clearable v-model="scope.row.riskName" ></el-input>
                      </ui-label-text>
                    </el-form-item>
                  </template>
                </el-table-column>
                <el-table-column prop="mainFlag" label="主/附险标识" width="120">
                  <template slot-scope="scope" >
                    <el-select  size='mini' disabled v-model="scope.row.mainFlag" slot="text" placeholder="请选择">
                        <el-option label="主险" value="1"></el-option>
                        <el-option label="附加险" value="2"></el-option>
                        <el-option label="主/附险 " value="3"></el-option>
                      </el-select>
                  </template>
                </el-table-column>
                <el-table-column prop="paymentPeriod" label="缴费年期" width="150">
                  <template slot-scope="scope">
                    <el-form-item :prop="'lifeCItemKindConditionList.' + scope.$index +'.paymentPeriod'" :rules="riskRules.paymentPeriod">
                      <ui-label-text :required="true" >
                        <el-input :disabled='true' slot="text" size='mini'  v-model="scope.row.paymentPeriod" ></el-input>
                      </ui-label-text>
                    </el-form-item>
                  </template>
                </el-table-column>
                <el-table-column prop="payrate" label="缴费频率" width="150">
                  <template slot-scope="scope">
                    <el-form-item :prop="'lifeCItemKindConditionList.' + scope.$index +'.payrate'" :rules="riskRules.payrate">
                      <ui-label-text :required="true" >
                        <el-select  size='mini' v-model="scope.row.payrate" slot="text" placeholder="请选择">
                          <el-option label="天缴" value="0"></el-option>
                          <el-option label="月缴" value="1"></el-option>
                          <el-option label="季缴" value="2"></el-option>
                          <el-option label="年缴" value="3"></el-option>
                          <el-option label="趸缴" value="4"></el-option>
                          <el-option label="半年缴" value="5"></el-option>
                        </el-select>
                      </ui-label-text>
                    </el-form-item>
                  </template>
                </el-table-column>
                <el-table-column prop="premium" label="应缴保费" width="150">
                  <template slot-scope="scope">
                    <el-form-item  :prop="'lifeCItemKindConditionList.' + scope.$index +'.premium'" :rules="riskRules.premium">
                      <ui-label-text :required="true" >
                        <el-input size='mini'  slot="text" v-model="scope.row.premium" ></el-input>
                      </ui-label-text>
                    </el-form-item>
                  </template>
                </el-table-column>
                <el-table-column prop="riskPremium" label="保险金额" width="120">
                  <template slot-scope="scope">
                    <el-form-item  :prop="'lifeCItemKindConditionList.' + scope.$index +'.riskPremium'" >
                      <ui-label-text :required="true" >
                        <el-input size='mini'  slot="text" @blur="riskPremiumVail(scope.$index)" v-model="scope.row.riskPremium" ></el-input>
                      </ui-label-text>
                    </el-form-item>
                  </template>
                </el-table-column>
                <el-table-column prop="number" label="份数" width="120">
                  <template slot-scope="scope">
                    <el-form-item  :prop="'lifeCItemKindConditionList.' + scope.$index +'.number'" :rules="riskRules.number">
                      <ui-label-text :required="true" >
                        <el-input size='mini'  slot="text" v-model="scope.row.number" ></el-input>
                      </ui-label-text>
                    </el-form-item>
                  </template>
                </el-table-column>
                <el-table-column prop="addPremium" label="加费金额" width="120">
                  <template slot-scope="scope">
                    <el-form-item  :prop="'lifeCItemKindConditionList.' + scope.$index +'.addPremium'" :rules="riskRules.addPremium">
                      <ui-label-text :required="true" >
                        <el-input size='mini'  slot="text" v-model="scope.row.addPremium" ></el-input>
                      </ui-label-text>
                    </el-form-item>
                  </template>
                </el-table-column>
                <el-table-column prop="freeDate" label="豁免日期" width="200">
                  <template slot-scope="scope">
                    <el-date-picker value-format="yyyy-MM-dd" size="mini" style="width: 100%; "  v-model="scope.row.freeDate" :disabled="scope.row.feeFlagTag" slot="text" type="date" placeholder="选择日期"></el-date-picker>
                  </template>
                </el-table-column>
                <el-table-column prop="tbrFreeFlag" label="豁免人" width="200">
                  <template slot-scope="scope">
                    <el-checkbox :disabled="scope.row.feeFlagTag" size="mini" v-model="scope.row.tbrFreeFlag">投保人</el-checkbox>
                    <el-checkbox :disabled="scope.row.feeFlagTag" size='mini' v-model="scope.row.bbrFreeFlag" >被保人</el-checkbox>
                  </template>
                </el-table-column>
                <el-table-column prop="startDate" label="保险期间" width="350">
                  <template slot-scope="scope">
                    <el-date-picker value-format="yyyy-MM-dd" size="mini" style="width: 45%; margin-right: 2%; " v-model="scope.row.startDate" slot="text" type="date" placeholder="选择日期"></el-date-picker>至
                    <el-date-picker value-format="yyyy-MM-dd" size="mini" style="width: 45%; margin-right: 2%; " v-if='scope.row.lifeFlag == false' v-model="scope.row.endDate" slot="text" type="date" placeholder="选择日期"></el-date-picker>
                    <el-checkbox  size='mini' v-model="scope.row.lifeFlag" >终身</el-checkbox>
                  </template>
                </el-table-column>
                <el-table-column  fixed="right" label="操作">
                  <template slot-scope="scope">
                      <el-button type="danger" @click="deletRiskItem(scope.$index)">删除</el-button>
                  </template>
                </el-table-column>
              </el-table>
              <div class='addBtn' style="margin-top: 20px;" >
                <el-button type="primary" @click="addRiskItem">增加</el-button>
              </div>
            </div>
          </ui-line-tittle>
        </el-form>
        <!--缴费信息  子组件   -->
        <ui-line-tittle :collapsible="true" >
          <span slot="title" >
              <i class="font_family icon-jy-menu-4" ></i>缴费信息
          </span>
          <div class="ri-content" slot="content">
              <pay-info-mod :payinfo="lifeFeeCondition" ref="payInfoMod"></pay-info-mod>
          </div>
        </ui-line-tittle>


       <!--页面最底部提交方法-->
      <div class="center">
        <el-button type="primary" @click.native.prevent="riskForm()">险种</el-button>
        <el-button type="primary" @click.native.prevent="_insertForm('insertForm')">保存</el-button>
        <el-button type="primary" @click.native.prevent="_submitForm('insertForm')">提交审核</el-button>
      </div>

       <!--保险公司代码 的弹框-->
      <el-dialog :append-to-body="true" width="50%" center title="保险公司代码" :visible.sync="dialogTableVisibleCode">
          <el-table ref="multipleTable" @row-click="handleRowChange" :data="getInsurers" tooltip-effect="dark" style="width: 100%">
            <el-table-column prop="insurercode"  label="保险公司代码" show-overflow-tooltip>
            </el-table-column>
            <el-table-column prop="insurername" label="保险公司名称" show-overflow-tooltip>
            </el-table-column>
          </el-table>
          <div class="block">
            <el-pagination
              @current-change="handleCurrentChangeCode"
              :current-page="info.currentPage"
              :page-sizes="[5]"
              :page-size="100"
              layout="total, sizes, prev, pager, next, jumper"
              :total="totalrecords == totalrecords ? totalrecords : 0">
            </el-pagination>
          </div>
      </el-dialog>
       <!--保险机构代码 的弹框-->
      <el-dialog :append-to-body="true" width="50%" center title="保险机构代码" :visible.sync="dialogTableOrg">
          <el-table ref="multipleTable" @row-click="handleRowChangeOrg" :data="getInsurersOrg" tooltip-effect="dark" style="width: 100%">
            <el-table-column prop="orgcode"  label="保险机构代码" show-overflow-tooltip>
            </el-table-column>
            <el-table-column prop="orgname" label="保险机构名称" show-overflow-tooltip>
            </el-table-column>
          </el-table>
          <div class="block">
            <el-pagination
              @current-change="handleCurrentChangeCode"
              :current-page="info.currentPage"
              :page-sizes="[5]"
              :page-size="100"
              layout="total, sizes, prev, pager, next, jumper"
              :total="orgRecords == orgRecords ? orgRecords : 0">
            </el-pagination>
          </div>
      </el-dialog>
      <!--客户所属机构 的弹框-->
      <el-dialog :append-to-body="true" width="50%" center title="客户所属机构" :visible.sync="dialogsustomerOrg">
          <el-table ref="multipleTable" stripe @row-click="customerinOrg" :data="customOfOrg" tooltip-effect="dark" style="width: 100%">
            <el-table-column prop="comCode"  label="保险公司代码" show-overflow-tooltip>
            </el-table-column>
            <el-table-column prop="comCName" label="保险公司名称" show-overflow-tooltip>
            </el-table-column>
          </el-table>
          <div class="block">
            <el-pagination
              @current-change="cusCurrentChangeOrg"
              @size-change="cushandleSizeChangeOrg"
              :current-page="info.currentPage"
              :page-sizes="[10,20,50]"
              :page-size="100"
              layout="total, sizes, prev, pager, next, jumper"
              :total="totalsOrg == totalsOrg ? totalsOrg : 0">
            </el-pagination>
          </div>
      </el-dialog>
       <!--投保人代码 的弹框-->
      <el-dialog :append-to-body="true" width="50%" center title="投保人代码" :visible.sync="dialogInsurer">
          <el-row class="ri-line" >
            <el-col :span="24">
              <ui-label-text  label="客户代码或名称:"  labelWidth="160">
                <el-input v-model="searchcode.customerCodeOrName" slot="text" ></el-input>
              </ui-label-text>
            </el-col>
          </el-row>
          <el-row class="ri-line" >
            <el-col :span="24">
              <ui-label-text  label="证件号码:"  labelWidth="160">
                <el-input v-model="searchcode.idNumber" slot="text" ></el-input>
              </ui-label-text>
            </el-col>
          </el-row>
          <el-row class="ri-line" style="margin-top:20px">
            <el-col :span="24">
              <div class="center">
                 <el-button  type="primary" @click.native.prevent="searchCode(searchcode)">查询</el-button>
              </div>
            </el-col>
          </el-row>
          <el-table ref="multipleTable" @row-click="customerinOrg1" :data="customerfind" tooltip-effect="dark" style="width: 100%;margin-top:20px">
            <el-table-column prop="custId"  label="客户Id" show-overflow-tooltip>
            </el-table-column>
            <el-table-column prop="custName" label="客户姓名" show-overflow-tooltip>
            </el-table-column>
            <el-table-column prop="idNumber" label="客户身份证号" show-overflow-tooltip>
            </el-table-column>
          </el-table>
          <div class="block">
            <el-pagination
              @current-change="currentChangeval"
              :current-page="info.currentPage"
              @size-change="handleSizeChange"
              :page-sizes="[10,20,50]"
              :page-size="100"
              layout="total, sizes, prev, pager, next, jumper"
              :total="customerFindTotals === customerFindTotals ? customerFindTotals : 0">
            </el-pagination>
          </div>
      </el-dialog>
       <!--新增个人客户 的弹框-->
      <el-dialog :append-to-body="true" width="70%" center title="新增个人客户" :visible.sync="dialogTableVisibleAdd">
        <el-form :rules="addRules" ref="addCustom" :model="addCustom">
          <el-row class="ri-line">
            <el-col :span="12">
                <ui-label-text  label="客户编码:"  labelWidth="140"></ui-label-text>
                <ui-label-text style="margin-top:-32px;margin-left:140px"  label="系统自动生成"  labelWidth="160"></ui-label-text>
            </el-col>
            <el-col :span="12">
              <el-form-item  prop="custName"  >
                <ui-label-text  label="客户名称:" :required="true" labelWidth="140">
                  <el-input v-model="addCustom.custName" slot="text" ></el-input>
                </ui-label-text>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row class="ri-line">
            <el-col :span="12">
              <el-form-item  prop="comCode" >
                <ui-label-text  label="归属机构代码:" :required="true" labelWidth="140">
                  <el-input v-model="addCustom.comCode" placeholder="双击查询" @dblclick.native="searchOfOrg(1)" slot="text" ></el-input>
                </ui-label-text>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item  prop="comCName"  >
                <ui-label-text  label="归属机构名称:" :required="true" labelWidth="140">
                  <el-input v-model="addCustom.comCName" slot="text" ></el-input>
                </ui-label-text>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row class="ri-line">
            <el-col :span="12">
              <el-form-item  prop="paperworkType"  >
                <ui-label-text  label="证件类型:" :required="true" labelWidth="140">
                  <el-select v-model="addCustom.paperworkType" slot="text" placeholder="请选择">
                    <el-option label="身份证" value="1"></el-option>
                    <el-option label="户口本" value="2"></el-option>
                    <el-option label="军官证" value="3"></el-option>
                    <el-option label="驾驶证" value="4"></el-option>
                    <el-option label="护照" value="5"></el-option>
                    <el-option label="港澳居民来往大陆通行证" value="6"></el-option>
                    <el-option label="台湾居民来往大陆通行证" value="7"></el-option>
                    <el-option label="其他" value="8"></el-option>
                    <el-option label="出生医学证明" value="9"></el-option>
                  </el-select>
                </ui-label-text>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <div v-if="addCustom.paperworkType === '1'">
                <el-form-item  prop="idNumber" >
                  <ui-label-text  label="证件号码:" :required="true" labelWidth="140">
                    <el-input v-model="addCustom.idNumber" @blur="idtypeNumber()" slot="text" ></el-input>
                  </ui-label-text>
                </el-form-item>
              </div>
              <div v-else-if="addCustom.paperworkType === '2'">
                <el-form-item  prop="idNumber"  >
                  <ui-label-text  label="证件号码:" :required="true" labelWidth="140">
                    <el-input v-model="addCustom.idNumber" @blur="idtypeNumber1()" slot="text" ></el-input>
                  </ui-label-text>
                </el-form-item>
              </div>
              <div v-else>
                <el-form-item  prop="idNumber"  >
                  <ui-label-text  label="证件号码:" :required="true" labelWidth="140">
                    <el-input v-model="addCustom.idNumber"  slot="text" ></el-input>
                  </ui-label-text>
                </el-form-item>
              </div>

            </el-col>
          </el-row>
          <el-row class="ri-line">
            <el-col :span="12">
              <el-form-item  prop="sex"  >
                <ui-label-text  label="性别:" :required="false" labelWidth="140">
                  <el-select v-model="addCustom.sex" slot="text" placeholder="请选择">
                    <el-option label="男" value="0"></el-option>
                    <el-option label="女" value="1"></el-option>

                  </el-select>
                </ui-label-text>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item prop="identifyValiddate" >
                <ui-label-text :required="false"  label="证件有效期" labelWidth="140" >
                  <el-date-picker
                    value-format="yyyy-MM-dd"
                    slot="text"
                    v-model="addCustom.identifyValiddate"
                    type="date"
                    :disabled="disabledEdit"
                    style="position:absolute;width:170px"
                    placeholder="选择日期"> </el-date-picker>
                </ui-label-text>
              </el-form-item>
            </el-col>
            <el-col :span="4">
              <el-checkbox
                ref="timer"
                @change.native="handleValid()"
                v-model="longFlag2"

                label='false'
                style="margin-top:10px">永久有效</el-checkbox>
            </el-col>
          </el-row>
          <el-row class="ri-line">
            <el-col :span="12">
              <el-form-item prop="birthDate"  >
                <ui-label-text :required="true"  label="出生年月" labelWidth="140" >
                  <el-date-picker
                    value-format="yyyy-MM-dd"
                    slot="text"
                    v-model="addCustom.birthDate"
                    type="date"
                    :disabled="idnumberDisable"
                    placeholder="选择日期"> </el-date-picker>
                </ui-label-text>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item prop="familyName"  >
                <ui-label-text :required="false"  label="民族" labelWidth="140" >
                  <el-input v-model="addCustom.familyName" slot="text" ></el-input>
                </ui-label-text>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row class="ri-line">
            <el-col :span="12">
              <el-form-item prop="familyMembers"  >
                <ui-label-text :required="false"  label="家庭成员" labelWidth="140" >
                  <el-input v-model="addCustom.familyMembers" slot="text" ></el-input>
                </ui-label-text>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item prop="familyRelation"  >
                <ui-label-text :required="false"  label="所属关系" labelWidth="140" >
                  <el-input v-model="addCustom.familyRelation" slot="text" ></el-input>
                </ui-label-text>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row class="ri-line">
            <el-col :span="12">
              <el-form-item prop="maritalStatus"  >
                <ui-label-text  label="婚否:" :required="false" labelWidth="140">
                  <el-select v-model="addCustom.maritalStatus" slot="text" placeholder="请选择">
                    <el-option label="已婚" value="1"></el-option>
                    <el-option label="未婚" value="2"></el-option>
                    <el-option label="不明" value="3"></el-option>
                    <el-option label="离异" value="4"></el-option>
                  </el-select>
                </ui-label-text>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item prop="address">
                <ui-label-text :required="false"  label="地址" labelWidth="140" >
                  <el-input v-model="addCustom.address" slot="text" ></el-input>
                </ui-label-text>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row class="ri-line">
            <el-col :span="12">
              <el-form-item prop="zipCode">
                <ui-label-text :required="false"  label="邮政编码" labelWidth="140" >
                  <el-input v-model="addCustom.zipCode" slot="text" ></el-input>
                </ui-label-text>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item prop="education">
                <ui-label-text  label="学历:" :required="false" labelWidth="140">
                  <el-select v-model="addCustom.education" slot="text" placeholder="请选择">
                    <el-option label="小学" value="1"></el-option>
                    <el-option label="初中" value="2"></el-option>
                    <el-option label="高中" value="3"></el-option>
                    <el-option label="大专" value="4"></el-option>
                    <el-option label="本科" value="5"></el-option>
                    <el-option label="硕士" value="6"></el-option>
                    <el-option label="博士" value="7"></el-option>
                    <el-option label="其他" value="8"></el-option>
                  </el-select>
                </ui-label-text>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row class="ri-line">
            <el-col :span="12">
              <el-form-item prop="job"  >
                <ui-label-text :required="false"  label="职业" labelWidth="140" >
                  <el-input v-model="addCustom.job" slot="text" ></el-input>
                </ui-label-text>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item prop="modelsCode">
               <ui-label-text :required="false"  label="车型代码" labelWidth="140" >
                  <el-input v-model="addCustom.modelsCode" slot="text" ></el-input>
                </ui-label-text>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row class="ri-line">
            <el-col :span="12">
              <el-form-item prop="carNumber" >
                <ui-label-text :required="false"  label="车牌号" labelWidth="140" >
                  <el-input v-model="addCustom.carNumber" slot="text" ></el-input>
                </ui-label-text>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item prop="mobile">
               <ui-label-text :required="false"  label="手机" labelWidth="140" >
                  <el-input v-model="addCustom.mobile" slot="text" ></el-input>
                </ui-label-text>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row class="ri-line">
            <el-col :span="12">
              <el-form-item prop="phone">
                <ui-label-text :required="false"  label="固定电话" labelWidth="140" >
                  <el-input v-model="addCustom.phone" slot="text" ></el-input>
                </ui-label-text>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item prop="fax">
               <ui-label-text :required="false"  label="传真" labelWidth="140" >
                  <el-input v-model="addCustom.fax" slot="text" ></el-input>
                </ui-label-text>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row class="ri-line">
            <el-col :span="12">
              <el-form-item prop="email" >
                <ui-label-text :required="false"  label="E-mail" labelWidth="140" >
                  <el-input v-model="addCustom.email" slot="text" ></el-input>
                </ui-label-text>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item prop="status" >
                <ui-label-text  label="效力状态:" :required="false" labelWidth="140">
                  <el-select v-model="insertForm.status" slot="text" placeholder="请选择">
                    <el-option label="无效" value="0"></el-option>
                    <el-option label="有效" value="1"></el-option>
                  </el-select>
                </ui-label-text>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row class="ri-line">
            <el-col :span="12">
              <el-form-item prop="country" >
               <ui-label-text :required="false"  label="国籍" labelWidth="140" >
                  <el-input v-model="addCustom.country" slot="text" ></el-input>
                </ui-label-text>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item prop="birthplace">
               <ui-label-text :required="false"  label="籍贯" labelWidth="140" >
                  <el-input v-model="addCustom.birthplace" slot="text" ></el-input>
                </ui-label-text>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row class="ri-line">
            <el-col :span="12">
              <el-form-item prop="weChat" >
               <ui-label-text :required="false"  label="微信号" labelWidth="140" >
                  <el-input v-model="addCustom.weChat" slot="text" ></el-input>
                </ui-label-text>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item prop="workingUnit">
               <ui-label-text :required="false"  label="工作单位" labelWidth="140" >
                  <el-input v-model="addCustom.workingUnit" slot="text" ></el-input>
                </ui-label-text>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row class="ri-line">
            <el-col :span="12">
              <el-form-item prop="habitualResidence">
               <ui-label-text :required="false"  label="经常居住地" labelWidth="140" >
                  <el-input v-model="addCustom.habitualResidence" slot="text" ></el-input>
                </ui-label-text>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row class="ri-line">
            <el-col :span="18">
              <el-form-item prop="remark">
               <ui-label-text :required="false"  label="备注" labelWidth="140" >
                  <el-input type="textarea" v-model="addCustom.remark" slot="text" ></el-input>
                </ui-label-text>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
        <div class="center">
          <el-button type="primary" @click.native.prevent="_addCustom('addCustom')">提交</el-button>
        </div>
      </el-dialog>
      <!--险种代码 的弹框-->
      <el-dialog :append-to-body="true" width="50%" center title="险种代码" :visible.sync="insurTypeDialog">
        <el-row class="ri-line" >
          <el-col :span="24">
            <ui-label-text  label="险种代码/名称:"  labelWidth="160">
              <el-input v-model="insurerCode.riskCode" slot="text" ></el-input>
            </ui-label-text>
          </el-col>
        </el-row>
        <el-row class="ri-line" style="margin-top:20px;">
          <el-col :span="24">
            <div class="center">
                <el-button  type="primary" @click.native.prevent="searchCodeRisk()">查询</el-button>
            </div>
          </el-col>
        </el-row>
        <el-table  ref="multipleTable" stripe  @row-click="riskRowhandle" :data="riskCode" tooltip-effect="dark" style="width: 100%;margin-top:20px;">
          <el-table-column prop="riskcode"  label="险种代码" show-overflow-tooltip>
          </el-table-column>
          <el-table-column prop="riskname" label="险种名称" show-overflow-tooltip>
          </el-table-column>
        </el-table>
        <div class="block">
          <el-pagination
            @current-change="currentChangevalrisk"
            @size-change="handleSizeChangerisk"
            :current-page="insurerCode.currentPage"
            :page-sizes="[10,20,50]"
            :page-size="100"
            layout="total, sizes, prev, pager, next, jumper"
            :total="riskcodeTotals === riskcodeTotals ? riskcodeTotals : 0">
          </el-pagination>
        </div>
      </el-dialog>
  </div>
</template>

<script>
import NoticeBar from '@/components/notice-bar'
import LabelText from '@/components/label-text'
import LineTittle from '@/components/line-tittle'
import basicInfoMod from '@/components/lifeInsureMod/basicInfo_mod' // 基本信息
import InsurerMod from '@/components/lifeInsureMod/Insurer_mod' // 投保人信息
import InsurantInfoMod from '@/components/lifeInsureMod/InsurantInfo_mod' // 被保险人信息
import deathBenefitInfoMod from '@/components/lifeInsureMod/deathBenefitInfo_mod' // 身故受益人信息
import liveBenefitInfoMod from '@/components/lifeInsureMod/liveBenefitInfo_mod' // 生存受益人信息
import InsurTypeMod from '@/components/lifeInsureMod/InsurType_mod' // 险种信息
import payInfoMod from '@/components/lifeInsureMod/payInfo_mod' // 缴费信息
import sellerInfoMod from '@/components/lifeInsureMod/sellerInfo_mod' // 业务员信息
import { mapActions } from 'vuex'
import IsEmpty from '@/utils/IsEmpty'
export default {
  name: '',
  props: ['isEdit', 'num'],
  data () {
    const { noEmptyValidator,
            PostValidator,
            phoneValidator,
            phoneNumberValidator,
            emailValidator,
            insurtypeaddPremiumValidator,
            insurtypeaddPremiumValidator2,
            emptyValidator,
            insurtypenumberValidator } = this.$store.getters.validators
    return {
      InsureantInfos: ['1'], // 被保险人信息
      deathBenefitInfos: ['1'], // 身故受益人信息
      lifeBenefitInfos: ['1'], // 生存受益人信息
      insurTypeInfos: ['1'], // 险种信息
      info: {
        // current: 1

      },
      addCusInfo: {}, // 新增个人客户的查询
       // 新增个人客户
      addCustom: {
        custName: '',
        comCode: '',
        comCName: '',
        paperworkType: '',
        idNumber: '',
        birthDate: '',
        isLongFlag: '0',
        identifyValiddate: '',
        zipCode: '',
        phone: '',
        mobile: ''
      },
      addRules: {
        custName: noEmptyValidator,
        comCode: noEmptyValidator,
        comCName: noEmptyValidator,
        paperworkType: noEmptyValidator, // 证件类型
        idNumber: noEmptyValidator,
        birthDate: noEmptyValidator,
        zipCode: PostValidator,
        phone: phoneValidator,  // 固话校验
        mobile: phoneNumberValidator,
        email: emailValidator
      },
      sgFlag: '1',
      scFlag: '1',
      // 新增的表单验证
      insertForm: {
        proposalNo: '',
        proposalNo2: '',
        insuranceMark: '新保',
        businessNature: '佰盈销售',
        busiType: '直接业务',
        updateTime: '2018-11-08 11:11:11' // 有问题  需要改为当前时间
      },
      insertRules: {
        proposalNo: noEmptyValidator,
        proposalNo2: noEmptyValidator,
        proposalDate: noEmptyValidator,
        companyCode: noEmptyValidator,
        companyName: noEmptyValidator,
        companyComCode: noEmptyValidator,
        companyComName: noEmptyValidator,
        insuranceMark: noEmptyValidator,
        atuoAcceptFlag: noEmptyValidator,
        businessNature: noEmptyValidator,
        busiType: noEmptyValidator,
        byMyself: noEmptyValidator,
        singleMode: noEmptyValidator,
        identifyType: noEmptyValidator,
        identifyNumber: noEmptyValidator,
        insuredrType: noEmptyValidator,
        insureNameD: noEmptyValidator,
        identifyTypeD: noEmptyValidator,
        identifyNumberD: noEmptyValidator,
        partyName: noEmptyValidator
      },
      disabledEdit: false,
      longFlag1: false,
      dialogTableVisibleInsert: false,
      dialogTableVisibleQuery: false,
      dialogTableVisibleCode: false,
      dialogTableOrg: false,
      identifyValiddate: false,
      dialogInsurer: false, // 投保人代码
      dialogTableVisibleAdd: false, // 新增个人客户弹框
      dialogsustomerOrg: false, // 客户所属机构
      searchcode: {
        customerCodeOrName: '',
        idNumber: '',
        pageSize: '5'
      },
      insurerCode: {
        pageSize: '10'
      },
      longFlag2: false,
      idnumberDisable: false,
      searchcOrg: {}, // 客户所属机构的查询对象
      companyCode: '',
      insurantInfosValid: '', // 被保险人信息校验
      deathInfosValid: '', // 身故受益人信息校验
      liveInfosValid: '', // 生存受益人信息校验
      insuTypeInfosValid: '', // 险种信息校验
      insurTypeDialog: false, // 险种代码的弹框
      _basicInfo: '0',
      _insurer: '0',
      _insurered: '0',
      _death: '0',
      _live: '0',
      _seller: '0',
      _type: '0',
      _pay: '0',
      proposalNo: {},
      addcheck: {}, // 新增个人客户查询
      addCheckSame: {}, // 相似客户查询
      queryDetailed: {},
      proposalNo1: {},
      riskRules: {   // 险种信息校验  emptyValidator
        riskCode: emptyValidator,
        riskName: emptyValidator,
        paymentPeriod: emptyValidator,
        payrate: emptyValidator,
        premium: insurtypeaddPremiumValidator2,
        paidPremium: emptyValidator,
        number: insurtypenumberValidator,
        addPremium: insurtypeaddPremiumValidator
      },
      rule: {
        'lifePCMainCondition.policyNo': noEmptyValidator,
        'lifePCMainCondition.proposalDate': noEmptyValidator,
        'lifePCMainCondition.acceptDate': noEmptyValidator,
        'lifePCMainCondition.generateDate': noEmptyValidator,
        'lifePCMainCondition.companyCode': noEmptyValidator,
        'lifePCMainCondition.companyName': noEmptyValidator,
        'lifePCMainCondition.companyComCode': noEmptyValidator,
        'lifePCMainCondition.companyComName': noEmptyValidator,
        'lifePCMainCondition.byMyself': noEmptyValidator,
        'lifePCMainCondition.singleMode': noEmptyValidator,
        'lifePartyCondition.insureName': noEmptyValidator,
        'lifePartyCondition.identifyType': noEmptyValidator,
        'lifePartyCondition.identifyNumber': noEmptyValidator,
        'lifePartyCondition.insuredrType': noEmptyValidator,
        'lifePCMainCondition.handlerCode': noEmptyValidator
      },
      riskList: {},
      riskListData: [], // 险种数据
      riskIndex: '',
      riskmainFlag: '' // 判断主险个数
    }
  },
  mounted () {
    this.queryDetailed = this.$store.state.proposalForm.localStorage
    this.xianzhong.lifeCItemKindConditionList.forEach((item, index) => { // 险种信息
      if (item.tbrFreeFlag === '0') {
        item.tbrFreeFlag = false
      } else {
        item.tbrFreeFlag = true
      }
      if (item.bbrFreeFlag === '0') {
        item.bbrFreeFlag = false
      } else {
        item.bbrFreeFlag = true
      }
      if (item.lifeFlag === 0 || item.lifeFlag === '0') {
        item.lifeFlag = false
      } else {
        item.lifeFlag = true
      }
      if (item.freeFlag === '1') {
        item.feeFlagTag = true
      } else if (item.freeFlag === '0') {
        item.feeFlagTag = false
      }
    })
  },
  watch: {
  },
  methods: {
    ...mapActions([
      'queryproposalForm_1',
      'queryPolicyById_1',
      'getInsurers_1',
      'getInsurersOrg_1',
      'customerFind_1',
      'customerOfOrg_1',
      'customerAdd_1',
      'insurPolicyAdd_1',
      'ProposalNoIsExist_1',
      'checkCustomerIsExist_1',
      'checkCustomerSimilar_1',
      'update_1',
      'riskcode_1'
    ]),
    addRiskItem (index) { // 添加险种信息
      let addPost = {
        'riskCode': '',
        'riskName': '',
        'mainFlag': '',
        'paymentPeriod': '',
        'payrate': '',
        'premium': '',
        'riskPremium': '',
        'number': '',
        'addPremium': '',
        'freeDate': '',
        'tbrFreeFlag': '',
        'bbrFreeFlag': '',
        'startDate': '',
        'endDate': '',
        'lifeFlag': ''
      }
      this.xianzhong.lifeCItemKindConditionList.push(addPost)
    },
    deletRiskItem (index) { // 删除险种信息
      this.xianzhong.lifeCItemKindConditionList.splice(index, 1)
    },
    checkcusExist () { // 判断客户是否存在
      this.addcheck.paperworkType = this.addCustom.paperworkType
      this.addcheck.idNumber = this.addCustom.idNumber
      this.checkCustomerIsExist_1(this.addcheck).then(result => {
        if (result.flag === '0') {
          this.open('error', '该客户已存在，请重新录入！')
        }
      })
    },
    checkSame () {  // 判断相似客户
      this.addCheckSame.custName = this.addCustom.custName
      this.addCheckSame.sex = this.addCustom.sex
      this.addCheckSame.birthDate = this.addCustom.birthDate
      this.checkCustomerSimilar_1(this.addCheckSame).then(result => {
        if (result.flag === '0') {
          this.$confirm('该客户与系统中的某位客户相似, 是否继续录入?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            this.$message({
              type: 'success',
              message: '继续录入!'
            })
          }).catch(() => {
            this.$message({
              type: 'info',
              message: '取消继续录入!'
            })
          })
        }
      })
    },
    childByValue (companyCode) {
      this.companyCode = companyCode
    },
    handleCurrentChange (val) {
      console.log(`当前页: ${val}`)
      // this.info.currentPage = val
      console.log(this.info.currentPage)
      // this.query(val)
    },
    /** ******************开始********************** */
    handleSizeChange (val) {
      console.log(`每页 ${val} 条`)
      this.searchcode.pageSize = val
      this.searchcode.currentPage = 1
      // alert(JSON.stringify(this.searchcode))
      // this.searchCode()
      this.customerFind_1(this.searchcode)
    },
    // 客户信息查询的分页 跳转至第几页
    currentChangeval (va) {
      // alert('va:' + va)
      // this.searchcode.currentPage = va
      this.searchcode.currentPage = va
      // alert(JSON.stringify(this.searchcode))
      this.customerFind_1(this.searchcode)
    },
    /** ******************结束********************** */

    /** *******************************************增加的提交表单 ***********************************/

    _insertForm (formName) {
      // 基本信息传到父组件
      // let basicInfoMods = this.$refs.basicInfoMod
      // console.log(basicInfoMods.validateForm())
      // if (basicInfoMods.validateForm()) {
      //   console.log('基本信息校验--通过:' + JSON.stringify(basicInfoMods.lifePCMainConditionForm))
      //   this.info.lifePCMainCondition = basicInfoMods.lifePCMainConditionForm
      //   this._basicInfo = '1'
      // } else {
      //   console.log('基本信息校验--不通过:' + JSON.stringify(basicInfoMods.lifePCMainConditionForm))
      // }

      // // 投保人信息传到父组件
      // let insurerMods = this.$refs.insurerMod
      // if (insurerMods.validateForm()) {
      //   console.log('投保人校验---通过:' + JSON.stringify(insurerMods.lifePartyConditionForm))
      //   this.info.lifePartyCondition = insurerMods.lifePartyConditionForm
      //   this._insurer = '1'
      // } else {
      //   console.log('投保人校验--不通过:' + JSON.stringify(insurerMods.lifePartyConditionForm))
      // }
      // 被保险人信息传递给父组件
      console.log(this.$refs.insurantInfoMod.lifePconDist)
      this.info.lifePartyConditionDList = this.$refs.insurantInfoMod.lifePconDist
      console.log('被保险人:' + JSON.stringify(this.info.lifePartyConditionDList))
      // ----------------------------
      let insured = this.info.lifePartyConditionDList
      for (let i = 0; i < insured.length; i++) {
        if (IsEmpty(insured[i].identifyValiddateD) && (insured[i].longFlagD === '0' || IsEmpty(insured[i].longFlagD))) {
          // alert(1)
          this.open('error', '被保险人证件有效期未填写完整!')
        }
      }

      // 身故受益人信息传递给父组件
      // console.log(this.$refs.deathInfoMod.death)
      if (this.lifePCMain.sgFlag === '2') {
        this.info.lifePartyTConditionList = this.$refs.deathInfoMod.death
        console.log('身故受益人:' + JSON.stringify(this.info.lifePartyTConditionList))
      } else {
        this.info.lifePartyTConditionList = {}
      }

      // 生存受益人信息传递给父组件
      // console.log(this.$refs.lifeInfoMod.live)
      console.log(this.$refs.lifeInfoMod)
      if (this.lifePCMain.scFlag === '3') {
        this.info.lifePartyAConditionList = this.$refs.lifeInfoMod.live
        console.log('生存受益人:' + JSON.stringify(this.info.lifePartyAConditionList))
      } else {
        this.info.lifePartyAConditionList = {}
      }
      // this.info.lifePartyAConditionList = this.$refs.lifeInfoMod.live
      console.log('生存受益人:' + JSON.stringify(this.info.lifePartyAConditionList))

       // 业务员信息传到父组件
      let sellerInfo = this.$refs.sellerInfoMod
      console.log(sellerInfo.validateForm())
      if (sellerInfo.validateForm()) {
        console.log('业务员校验--通过:' + JSON.stringify(sellerInfo.sellerForm))
        this.info.lifePCMainCondition = sellerInfo.sellerForm

        this._seller = '1'
      } else {
        console.log('业务员信息校验--未通过:' + JSON.stringify(sellerInfo.sellerForm))
      }

      // 险种信息传递给父组件
      console.log(this.$refs.insurTypeMod)
      console.log(this.$refs.insurTypeMod.lifePconDist)
      this.info.lifeCItemKindConditionList = this.$refs.insurTypeMod.lifePconDist
      console.log('险种信息:' + JSON.stringify(this.info.lifeCItemKindConditionList))

       // 缴费信息传到父组件
      let payInfo = this.$refs.payInfoMod
      console.log(payInfo.validateForm())
      if (payInfo.validateForm()) {
        console.log('缴费信息校验--通过:' + JSON.stringify(payInfo.payInfoForm))
        this.info.lifeFeeCondition = payInfo.payInfoForm
        this._pay = '1'
      } else {
        console.log('缴费信息校验--未通过:' + JSON.stringify(payInfo.payInfoForm))
      }
      // 提交的表单
      console.log('总的info-------：' + JSON.stringify(this.info))
      this.update_1(this.info).then(result => {
        if (result.code === '000000') {
          this.open('success', '修改成功!')
        } else {
          this.open('error', result.msg)
        }
      })
    },
    // 提交审核的按钮
    _submitForm () {

    },
    getRiskList (page, index, row, tag) { // 获取险种信息
      this.riskList.currentPage = page
      this.riskList.pageSize = '10'
      this.riskIndex = index
      this.riskTag = tag
      this.riskList.insurerCode = this.$store.state.proposalForm.lifePCMainCondition.companyCode
      alert(JSON.stringify(this.riskList))
      this.riskcode_1(this.riskList)
      this.insurTypeDialog = true
    },
    open (type, mesg) {
      this.$message({
        showClose: true,
        message: mesg,
        type: type
      })
    },
    handleValid () {
      if (this.longFlag1 === false) {
        // false 时间不能填 longFlag == 1 永久有效
        // alert('有效')
        this.addCustom.isLongFlag = '1'
        console.log(this.addCustom.isLongFlag)
        this.addCustom.identifyValiddate = ''
        console.log('identifyValiddate:' + JSON.stringify(this.addCustom.identifyValiddate))

        this.disabledEdit = true
      } else {
        // true的话  时间可以填 longFlag == 0 有效期
        this.addCustom.isLongFlag = '0'
        this.disabledEdit = false
        console.log(this.addCustom.isLongFlag)
      }
    },
    // 保险公司代码
    alertDialogcomCode (page) {
      this.dialogTableVisibleCode = true
      this.info.currentPage = page
      console.log('page:' + page)
      this.info.currentPage = page
      console.log('info:' + JSON.stringify(this.info))
      this.getInsurers_1(this.info)
    },
    currentChangevalrisk (val) { // 险种的当前页查询
      console.log(`当前前页: ${val}`)
      this.insurerCode.currentPage = val
      this.insurerCode.insurerCode = this.$store.state.proposalForm.companyCode
      console.log(this.insurerCode.currentPage)
      console.log('info:' + JSON.stringify(this.insurerCode))
      this.riskcode_1(this.insurerCode)
    },
    handleSizeChangerisk (val) {  //  险种的每页条数改变
      console.log(`每页 ${val} 条`)
      this.insurerCode.pageSize = val
      this.insurerCode.currentPage = 1
      this.insurerCode.insurerCode = this.$store.state.proposalForm.companyCode
      this.riskcode_1(this.insurerCode)
    },
    searchCodeRisk () {
      this.insurerCode.currentPage = 1
      this.insurerCode.pageSize = 10
      this.insurerCode.insurerCode = this.$store.state.proposalForm.companyCode
      this.riskcode_1(this.insurerCode)
    },
    riskRowhandle (row, event, column) {
      // alert(JSON.stringify(row))
      this.xianzhong.lifeCItemKindConditionList[this.riskIndex].riskCode = row.riskcode
      this.xianzhong.lifeCItemKindConditionList[this.riskIndex].riskName = row.riskname
      this.xianzhong.lifeCItemKindConditionList[this.riskIndex].mainFlag = row.mainorextrflag
      this.xianzhong.lifeCItemKindConditionList[this.riskIndex].paymentPeriod = row.paymentperiod
      this.xianzhong.lifeCItemKindConditionList[this.riskIndex].payrate = row.payway

      if (row.freeflag === '1') {
        this.xianzhong.lifeCItemKindConditionList[this.riskIndex].feeFlagTag = false
      } else if (row.freeflag === '0') {
        this.xianzhong.lifeCItemKindConditionList[this.riskIndex].feeFlagTag = true
      }
      this.insurTypeDialog = false
    },
     // 新增客户的提交表单
    _addCustom (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // alert('add成功!')
          if (this.addCustom.phone === '' && this.addCustom.mobile === '') {
            this.open('warning', '联系方式请至少填写一个!')
          } else {
            if (this.addCustom.identifyValiddate === '' &&
              this.addCustom.isLongFlag === '0') {
              this.open('warning', '请先选择证件有效日期')
            } else {
            // alert(JSON.stringify(this.addCustom))
              this.$refs.multipleTable.clearSelection()
              this.dialogTableVisibleAdd = false

              this.customerAdd_1(this.addCustom).then(result => {
                if (result.code === '000000') {
                  this.open('success', '新增成功')
                } else {
                  this.open('error', result.msg)
                }
              })
            }
          }
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
   // 客户所属机构的查询
    searchOfOrg (page) {
      this.addCusInfo.currentPage = page
      this.addCusInfo.pageSize = 10
      this.addCusInfo.clickType = 2
      console.log('page:' + page)
      // this.info.comCodeOrName = this.addCustom.comCode
      alert(JSON.stringify(this.addCusInfo))
      console.log(this.addCusInfo)
      this.customerOfOrg_1(this.addCusInfo)
      console.log(typeof (customofOrg))
      this.dialogsustomerOrg = true
    },
    // 当前页码
    cusCurrentChangeOrg (val) {
      console.log(`当前前页: ${val}`)
      this.addCusInfo.currentPage = val
      this.addCusInfo.clickType = 2
      console.log('info:' + JSON.stringify(this.addCusInfo))
      this.customerOfOrg_1(this.addCusInfo)
    },
     // 客户所属机构每页条数
    cushandleSizeChangeOrg (val) {
      console.log(`每页 ${val} 条`)
      this.addCusInfo.pageSize = val
      this.addCusInfo.currentPage = 1
      this.addCusInfo.clickType = 2
      this.customerOfOrg_1(this.addCusInfo)
    },
    // ---------------------------------------------------------------------------------------------
    // 判断身份证年龄并带入到出生年月里
    idtypeNumber () {
      let _idTypehao = this.addCustom.idNumber.substr(6, 8)
      let idTypehao = _idTypehao.substring(0, 4) + '-' + _idTypehao.substring(4, 6) + '-' + _idTypehao.substr(6)
      this.addCustom.birthDate = idTypehao
      this.idnumberDisable = true

      this.checkcusExist()
      this.checkSame()
    },
    // 判断户口本
    idtypeNumber1 () {
      let _idTypehao = this.addCustom.idNumber.substr(6, 8)
      let idTypehao = _idTypehao.substring(0, 4) + '-' + _idTypehao.substring(4, 6) + '-' + _idTypehao.substr(6)
      // this.addCustom.birthDate = idTypehao
      this.jsGetAge(idTypehao)
      // alert(this.judgeage)
      if (this.judgeage > 18) {
        this.open('error', '大于18岁不能选择户口本，请重新选择!')
      }
    },
     // 保险机构代码
    alertDialogcomOrg (page) {
      this.info.currentPage = page
      console.log('page:' + page)
      this.info.currentPage = page
      console.log('info:' + JSON.stringify(this.info))

      // this.getInsurers_1(this.info)
      if (this.insertForm.companyCode === '' || this.insertForm.companyCode === undefined) {
        // this.openMseg('error', '请先输入保险公司代码！')
        // return false
        this.open('error', '请先输入保险公司代码！')
        return false
      } else {
        // alert(JSON.stringify(this.insertForm))
        // this.insertForm = ''
        this.dialogTableOrg = true
        this.info.insurerCode = this.insertForm.companyCode
        this.info.insurerName = this.insertForm.companyName
        // alert(JSON.stringify(this.info))
        this.getInsurersOrg_1(this.info)
      }
    },
    // 投保人代码
    alertDialoginsuCode (page) {
      // this.info.currentPage = page
      this.info.currentPage = page
      this.dialogInsurer = true
    },
    handleRowChange (row, event, column) {
      this.insertForm.companyCode = row.insurercode
      this.insertForm.companyName = row.insurername
      this.dialogTableVisibleCode = false
      this.dialogTableVisibleName = false
    },
    handleRowChangeOrg (row, event, column) {
      this.insertForm.companyCode = row.insurercode
      this.insertForm.companyName = row.insurername
      this.dialogTableVisibleCode = false
      this.dialogTableVisibleName = false
    },
    // 客户所属机构点击
    customerinOrg (row, event, column) {
      this.addCustom.comCode = row.comCode
      this.addCustom.comCName = row.comCName
      this.addCustom.comName = row.address
      this.dialogsustomerOrg = false
    },
    // 客户所属机构点击
    customerinOrg1 (row, event, column) {
      // alert(JSON.stringify(row))
      this.insertForm.insureName = row.custName
      this.insertForm.insureNameD = row.custName
      this.insertForm.identifyNumber = row.idNumber
      this.insertForm.insureAddress = row.address
      this.insertForm.postNo = row.zipCode
      this.insertForm.sexType = row.sex
      this.insertForm.country = row.country
      this.insertForm.birthDate = row.birthDate

      this.insertForm.educationCode = row.education
      // this.insertForm.idNumber = row.education
      this.insertForm.insureTel = row.phone
      this.insertForm.weixin = row.weChat
      this.insertForm.e_mail = row.email
      this.insertForm.job = row.job
      this.insertForm.workingUnit = row.workingUnit
      this.insertForm.identifyValiddate = row.identifyValiddate
      this.insertForm.habitualResidence = row.habitualResidence
      this.insertForm.insureNo = row.custId
      this.insertForm.marriage = row.maritalStatus
      this.insertForm.isLongFlag = row.isLongFlag

      this.insertForm.identifyType = row.paperworkType
      this.dialogInsurer = false

      // alert('identifyValiddate:' + JSON.stringify(this.insertForm.identifyValiddate))
      // alert('isLongFlag:' + JSON.stringify(this.insertForm.isLongFlag))
      if ((this.insertForm.identifyValiddate === '' ||
          this.insertForm.identifyValiddate === null ||
          this.insertForm.identifyValiddate === undefined) &&
          this.insertForm.isLongFlag === 1) {
        this.disabledEdit1 = true
        this.isdisabled = true
        this.longFlag2 = true
      } else {
        this.disabledEdit1 = false
      }
    },
    handleCurrentChangeCode (val) {
      console.log(`当前前页: ${val}`)
      this.info.currentPage = val
      // alert(JSON.stringify(this.info))
      console.log(this.info.currentPage)
      console.log('info:' + JSON.stringify(this.info))
      this.getInsurers_1(this.info)
    },

    /** ****************************子组件的增删操作******************************* */
    // 被保险人信息
    addInsureantInfo () {
      this.InsureantInfos.push('')
    },
    delInsureantInfo: function (index) {
      if (this.InsureantInfos.length > 1) {
        this.InsureantInfos.splice(index, 1)
      }
    },
    // 身故受益人
    adddeathBenefitInfo () {
      this.deathBenefitInfos.push('')
    },
    deldeathBenefitInfo: function (index) {
      if (this.deathBenefitInfos.length > 1) {
        this.deathBenefitInfos.splice(index, 1)
      }
    },
    // 生存受益人
    addliveBenefitInfo () {
      this.lifeBenefitInfos.push('')
    },
    delliveBenefitInfo: function (index) {
      if (this.lifeBenefitInfos.length > 1) {
        this.lifeBenefitInfos.splice(index, 1)
      }
    },
    /** ****************************子组件的增删操作结束******************************* */

    query (page) {
      this.info.current = page
      // alert(this.info.currentPage)
      this.queryproposalForm_1(this.info)
    },
    // handleSizeChange (val) {
    //   console.log(`每页 ${val} 条`)
    // },
    tableRowChange (row, event, column) {
      console.log(JSON.stringify(row))
      this.dialogTableVisibleQuery = true
      this.info.proposalNo = row.proposalNo
      // alert('proposalNo:' + this.info.proposalNo)
      this.info.current = ''
      this.queryPolicyById_1(this.info)
      console.log('queryPolicy:' + this.queryPolicy)
      // console.log('this.info:' + JSON.stringify(this.info))
    },
    // 增加的提交表单
    // _insertForm (formName) {
    //   this.$refs[formName].validate((valid) => {
    //     if (valid) {
    //       // alert('add成功!')
    //       if (this.addCustom.identifyValiddate === '' &&
    //           this.addCustom.isLongFlag === '0') {
    //         this.open('warning', '请先选择证件有效日期')
    //       } else {
    //         alert('addCustom:' + JSON.stringify(this.addCustom))
    //         this.$refs.multipleTable.clearSelection()
    //         this.dialogTableVisibleAdd = false
    //         this.customerAdd_1(this.addCustom).then(result => {
    //           if (result.code === '000000') {
    //             this.open('success', '新增个人账户成功!')
    //           } else {
    //             this.open('error', result.msg)
    //           }
    //         })
    //       }

    //       // 验证通过 提交表单
    //       alert('submit!')
    //     } else {
    //       console.log('error submit!!')
    //       return false
    //     }
    //   })
    // },
    handleValidClick () {
      if (this.longFlag1 === false) {
        // false的话  时间不能填 longFlag == 1 永久有效
        this.insertForm.longFlag = '1'
        console.log(this.insertForm.longFlag)
        console.log(this.insertForm.identifyValiddate)
        this.insertForm.identifyValiddate = ''
        this.disabledEdit = true
      } else {
        // true的话  时间可以填 longFlag == 0 有效期
        this.insertForm.longFlag = '0'
        this.disabledEdit = false
        console.log(this.insertForm.longFlag)
      }
    },
    addInfo () {
      // alert(this.items.length)
      this.items.push(this.inputValue)
    },
    handleaddInsureantInfo: function (index) {
      alert(1)
    },
    // 删除被保险人信息
    delInfo (index) {
      console.log(index)
      if (this.InsureantInfos.length > 1) {
        this.InsureantInfos.splice(index, 1)
        console.log(JSON.stringify(this.InsureantInfos))
      }
    },
    // 删除身故受益人信息
    deldeathInfo (index) {
      console.log(index)
      if (this.deathBenefitInfos.length > 1) {
        this.deathBenefitInfos.splice(index, 1)
        console.log(JSON.stringify(this.deathBenefitInfos))
      }
    },
    // 删除生存受益人信息
    delliveInfo (index) {
      console.log(index)
      if (this.lifeBenefitInfos.length > 1) {
        this.lifeBenefitInfos.splice(index, 1)
        console.log(JSON.stringify(this.lifeBenefitInfos))
      }
    }

  },
  components: {
    [NoticeBar.name]: NoticeBar,
    [LabelText.name]: LabelText,
    [LineTittle.name]: LineTittle,
    basicInfoMod,
    InsurerMod,
    InsurantInfoMod,
    deathBenefitInfoMod,
    liveBenefitInfoMod,
    InsurTypeMod,
    payInfoMod,
    sellerInfoMod
  },
  computed: {
    Queryproposal () {
      return this.$store.state.proposalForm.queryproposal
    },
    getInsurers () {
      return this.$store.state.InsuranceCo.getInsurers
    },
    getInsurersOrg () {
      return this.$store.state.InsuranceCo.getInsurersOrg
    },
    orgRecords () {
      return parseInt(this.$store.state.InsuranceCo.orgRecords)
    },
    customOfOrg () {
      return this.$store.state.proposalForm.customOfOrg
    },
    customerfind () {
      return this.$store.state.proposalForm.customerfind
    },
    customerFindTotals () {
      return parseInt(this.$store.state.proposalForm.customerFindTotals)
    },
    totalsOrg () {
      return this.$store.state.proposalForm.customOfOrg
    },
    totalrecords () {
      return parseInt(this.$store.state.proposalForm.totalredords)
    },
    totalRecords () {
      return parseInt(this.$store.state.proposalForm.proposaltotal)
    },
    lifePCMain () {
      return this.$store.state.proposalForm.lifePCMainCondition  // 基本信息  和 业务员信息
    },
    lifeParty () {
      return this.$store.state.proposalForm.lifePartyCondition  // 投保人信息
    },
    lifePconDist () {
      return this.$store.state.proposalForm.lifePartyConditionDList // 被保险人信息
    },
    lifePartyTList () {
      return this.$store.state.proposalForm.lifePartyTConditionList // 身故受益人
    },
    lifePartyAConditionList () {
      return this.$store.state.proposalForm.lifePartyAConditionList // 生存受益人
    },
    // lifeCItemKindConditionList () {
    //   return this.$store.state.proposalForm.lifeCItemKindConditionList  // 险种信息
    // },
    lifeFeeCondition () {
      return this.$store.state.proposalForm.lifeFeeCondition  // 缴费信息
    },
    riskCode () {
      return this.$store.state.proposalForm.riskcode
    },
    riskcodeTotals () {
      return parseInt(this.$store.state.proposalForm.riskcodeTotals)
    },
    xianzhong () {
      return this.$store.state.proposalForm  // 险种信息
    }
  },
  created () {
  }
}
</script>

<style lang="scss" scoped type="text/css">
  #insManage{ padding: 0px 30px 30px 30px;}
  .ri-line { margin-bottom: 10px; }
  .btn-container { margin-top: 30px; text-align: center}
  .el-form {margin: 20px 0 ;}
  .pagination {text-align: right;margin: 20px auto;}
  a { cursor: pointer;}
  .datestyle{ color: #717171;font-size: 0.875rem; display: inline-block;width: 120px;}
  .datestyle1{ color: #717171;font-size: 0.875rem;display: inline-block;text-align: center;width: 60px;}
  .el-pagination{float: right;padding-right: 50px;}
  .center{text-align: center}
</style>
<style>
.ri-line{margin-bottom:0 !important}
.riskTable .el-select { width: 90%; }
  .riskTable .label-text .el-input { width: 90%;  }
  .batch .el-button { width: inherit; height: inherit; line-height: inherit; font-size: inherit; padding: 10px; }
  .el-input__icon { line-height: inherit;}
  .mesg_form .required:before{
    font-size: 14px!important;
    top: 3px !important;
  }
  .el-table__body .el-button{
    line-height: 30px;
    height: 30px;
    width: 50px;
    font-size: 13px;
    padding: 0;
  }
  .mesg_form .el-form-item__error { left: 170px;}
  .riskTable .el-form-item__error { left: 0; padding: 0 !important}
  .cus_form .el-form-item__error { left: 130px;}
</style>
