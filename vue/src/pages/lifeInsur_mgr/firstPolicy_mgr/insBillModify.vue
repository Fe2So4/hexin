<template>
  <div id="billModify">
    <ui-notice-bar slot="breadcast" >
      <el-breadcrumb slot="location" separator=">">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>寿险业务管理</el-breadcrumb-item>
        <el-breadcrumb-item>寿险首期保单管理</el-breadcrumb-item>
        <el-breadcrumb-item>保单修改</el-breadcrumb-item>
      </el-breadcrumb>
    </ui-notice-bar>
    <el-form class="manage_form">
      <el-row>
        <el-col :span="12">
          <el-form-item >
            <ui-label-text label="保单号：" labelWidth="160" >
              <el-input slot="text" v-model="searchData.policyNo" ></el-input>
            </ui-label-text>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item>
            <ui-label-text label="业务员代码：" labelWidth="160" >
              <el-input slot="text" clearable v-model="searchData.handlerCode" @dblclick.native="getInfoAgent(1)"  placeholder="双击选择" @blur="blurAgent(0, $event)" ></el-input>
            </ui-label-text>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item >
            <ui-label-text label="业务员名称：" labelWidth="160" >
              <el-input slot="text" clearable v-model="searchData.handlerName" @dblclick.native="getInfoAgent(1)" placeholder="双击选择" @blur="blurAgent(1, $event)" ></el-input>
            </ui-label-text>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item>
            <ui-label-text label="归属机构代码：" labelWidth="160" >
              <el-input slot="text" clearable v-model="searchData.comCode" @dblclick.native="getOrgInfo(1,$event,0)" placeholder="双击选择" @blur="blurOrg($event, 0)" ></el-input>
            </ui-label-text>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item >
            <ui-label-text label="归属机构名称：" labelWidth="160" >
              <el-input slot="text" clearable v-model="searchData.comName" @dblclick.native="getOrgInfo(1,$event,0)" placeholder="双击选择" @blur="blurOrg($event, 0)"></el-input>
            </ui-label-text>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item>
            <ui-label-text label="投保人名称：" labelWidth="160" >
              <el-input slot="text" clearable v-model="searchData.insureName" ></el-input>
            </ui-label-text>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item >
            <ui-label-text label="被保险人名称：" labelWidth="160" >
              <el-input slot="text" clearable v-model="searchData.insureNameD" ></el-input>
            </ui-label-text>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row >
        <el-col :span="12">
          <el-form-item >
            <ui-label-text label="出单渠道：" labelWidth="160" >
              <el-select slot="text" v-model="searchData.businessNature" placeholder="请选择">
                <el-option label="佰盈销售" value="1"></el-option>
                <el-option label="富新财富" value="2"></el-option>
                <el-option label="其他" value="3"></el-option>
                <el-option label="同道" value="4"></el-option>
              </el-select>
            </ui-label-text>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item name='comCode' prop="comCode">
            <ui-label-text label="保单状态：" labelWidth="160" >
              <el-select slot="text" v-model="searchData.policyStatus" placeholder="请选择">
                <el-option label="失效" value="0"></el-option>
                <el-option label="未承保" value="1"></el-option>
                <el-option label="有效" value="2"></el-option>
                <el-option label="拒保" value="3"></el-option>
                <el-option label="退保" value="4"></el-option>
                <el-option label="犹退" value="5"></el-option>
                <el-option label="永久失效" value="7"></el-option>
                <el-option label="理赔中" value="8"></el-option>
                <el-option label="理赔终止" value="9"></el-option>
                <el-option label="减额交清" value="10"></el-option>
                <el-option label="交清" value="11"></el-option>
                <el-option label="冻结" value="12"></el-option>
                <el-option label="到期终止" value="13"></el-option>
                <el-option label="死亡理赔" value="14"></el-option>
              </el-select>
            </ui-label-text>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item name='companyCode' prop="companyCode">
            <ui-label-text label="归属保险公司代码：" labelWidth="160" >
              <el-input slot="text" clearable v-model="searchData.companyCode" placeholder="双击选择"  @dblclick.native="getComInfo(1, 0)" @blur="blurInsCom($event, 0, 0)" ></el-input>
            </ui-label-text>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item name='companyName' prop="companyName">
            <ui-label-text label="归属保险公司名称：" labelWidth="160" >
              <el-input slot="text" clearable @dblclick.native="getComInfo(1, 0, 1)" @blur="blurInsCom($event, 0)"  placeholder="双击选择" v-model="searchData.companyName" ></el-input>
            </ui-label-text>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form-item name='comCode' prop="comCode">
            <ui-label-text label="保单承保日期：" labelWidth="160" >
               <el-date-picker slot="text" unlink-panels v-model="searchData.daterange" type="daterange" value-format="yyyy-MM-dd" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" placeholder="选择日期"></el-date-picker>
            </ui-label-text>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <!-- 基础操作 -->
    <div class='btn-container'>
      <el-button type="primary" @click.native.prevent="searchBillResult(1)" >查询</el-button>
      <el-button type="primary" @click.native.prevent="modifyBtn" >修改</el-button>
      <el-button type="danger"  @click.native.prevent="deleteBtn">删除</el-button>
    </div>
    <!-- 查询结果 -->
    <el-table stripe ref="multipleTable" :data="billTableData" v-if='isShowTable' tooltip-effect="dark" style="width: 100%;" @selection-change="handleSelectionChange"   >
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column prop="policyNo" label="保单号" ></el-table-column>
      <el-table-column prop="handlerName" label="业务员姓名" ></el-table-column>
      <el-table-column prop="insureName" label="投保人名称"  > </el-table-column>
      <el-table-column prop="insuredName" label="被保险人名称"  > </el-table-column>
      <el-table-column prop="companyName" label="所属保险公司名称"  > </el-table-column>
      <el-table-column prop="comName" label="所属机构名称"  > </el-table-column>
      <el-table-column prop="updateTime" label="更新时间"  > </el-table-column>
    </el-table>
    <!-- 查询分页 -->
    <div class="pagination" v-if='isShowTable'>
      <el-pagination @size-change="searchSizeChange" @current-change='handleCurrentChange' :current-page.sync="current" :pager-count='5' :page-size='5' :page-sizes='[5, 10, 20, 50]' :total="totalRecords" layout="total, sizes, prev, pager, next, jumper" :page-count="totalPages"></el-pagination>
    </div>
    <!-- 修改开始 -->
    <el-dialog :append-to-body='true' @close='closeModify' center width='70%' title="保单修改"  :visible.sync="isModify" >
      <el-form class="mesg_form" :model="BillNoList" ref="BillNoList" :rules="rule">
        <!-- 基本信息 -->
        <ui-line-tittle :collapsible="true" >
          <span slot="title" >
            <i class="font_family icon-jy-menu-4" ></i>基本信息
          </span>
          <div class="ri-content" slot="content" >
            <el-row >
              <el-col :span="12">
                <el-form-item prop="lifePCMainCondition.proposalNo4">
                  <ui-label-text :required="true" label="投保单号：" labelWidth="160" >
                    <el-input slot="text" clearable v-model="BillNoList.lifePCMainCondition.proposalNo4" ></el-input>
                  </ui-label-text>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item prop="lifePCMainCondition.policyNo4">
                  <ui-label-text :required="true" label="保单号：" labelWidth="160" >
                    <el-input slot="text" clearable v-model="BillNoList.lifePCMainCondition.policyNo4" ></el-input>
                  </ui-label-text>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row >
              <el-col :span="12">
                <el-form-item>
                  <ui-label-text label="保单状态：" labelWidth="160" >
                    <el-select slot="text"  v-model="BillNoList.lifePCMainCondition.policyStatus" placeholder="请选择">
                      <el-option label="失效" value="0"></el-option>
                      <el-option label="未承保" value="1"></el-option>
                      <el-option label="有效" value="2"></el-option>
                      <el-option label="拒保" value="3"></el-option>
                      <el-option label="退保" value="4"></el-option>
                      <el-option label="犹退" value="5"></el-option>
                      <el-option label="永久失效" value="7"></el-option>
                      <el-option label="理赔中" value="8"></el-option>
                      <el-option label="理赔终止" value="9"></el-option>
                      <el-option label="减额交清" value="10"></el-option>
                      <el-option label="交清" value="11"></el-option>
                      <el-option label="冻结" value="12"></el-option>
                      <el-option label="到期终止" value="13"></el-option>
                      <el-option label="死亡理赔" value="14"></el-option>
                    </el-select>
                  </ui-label-text>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item prop="lifePCMainCondition.proposalDate">
                  <ui-label-text :required="true"   label="投保日期：" labelWidth="160" >
                    <el-date-picker v-model="BillNoList.lifePCMainCondition.proposalDate" slot="text" type="date" placeholder="选择日期" value-format="yyyy-MM-dd"></el-date-picker>
                  </ui-label-text>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row >
              <el-col :span="12">
                <el-form-item prop="lifePCMainCondition.acceptDate">
                  <ui-label-text :required="true"  label="承保日期：" labelWidth="160" >
                    <el-date-picker v-model="BillNoList.lifePCMainCondition.acceptDate" slot="text" type="date" placeholder="选择日期" value-format="yyyy-MM-dd"></el-date-picker>
                  </ui-label-text>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item prop="lifePCMainCondition.generateDate">
                  <ui-label-text :required="true" label="生效日期：" labelWidth="160" >
                    <el-date-picker v-model="BillNoList.lifePCMainCondition.generateDate" slot="text" type="date" placeholder="选择日期" value-format="yyyy-MM-dd"></el-date-picker>
                  </ui-label-text>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row >
              <el-col :span="12">
                <el-form-item>
                  <ui-label-text label="缴至日期：" labelWidth="160" >
                    <el-date-picker v-model="BillNoList.lifePCMainCondition.jzDate" slot="text" type="date" placeholder="选择日期" value-format="yyyy-MM-dd"></el-date-picker>
                  </ui-label-text>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item>
                  <ui-label-text label="保单年度：" labelWidth="160" >
                    <el-input slot="text" v-model="BillNoList.lifePCMainCondition.bdYear" ></el-input>
                  </ui-label-text>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row >
              <el-col :span="12">
                <el-form-item prop="lifePCMainCondition.companyCode">
                  <ui-label-text :required="true" label="归属保险公司代码：" labelWidth="160" >
                    <el-input slot="text" clearable placeholder="双击选择" @dblclick.native="getComInfo(1, 1)" v-model="BillNoList.lifePCMainCondition.companyCode" @blur="blurInsCom($event, 1, 0)"></el-input>
                  </ui-label-text>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item prop="lifePCMainCondition.companyName">
                  <ui-label-text :required="true" label="归属保险公司名称：" labelWidth="160" >
                    <el-input slot="text" :disabled="true" @blur="blurInsCom($event, 1, 0)" v-model="BillNoList.lifePCMainCondition.companyName" ></el-input>
                  </ui-label-text>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row >
              <el-col :span="12">
                <el-form-item prop="lifePCMainCondition.companyComCode">
                  <ui-label-text :required="true" label="归属保险公司机构代码：" labelWidth="160" >
                    <el-input slot="text" placeholder="双击选择" clearable @dblclick.native="getInsOrgInfo(1)" v-model="BillNoList.lifePCMainCondition.companyComCode"></el-input>
                  </ui-label-text>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item prop="lifePCMainCondition.companyComName">
                  <ui-label-text :required="true" label="归属保险公司机构名称：" labelWidth="160" >
                    <el-input slot="text" :disabled="true"  v-model="BillNoList.lifePCMainCondition.companyComName" ></el-input>
                  </ui-label-text>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row >
              <el-col :span="12">
                <el-form-item>
                  <ui-label-text label="新/续保标记：" labelWidth="160" >
                    <!-- <el-input slot="text" clearable v-model="BillNoList.lifePCMainCondition.insuranceMark"></el-input> -->
                    <el-select slot="text" disabled  v-model="BillNoList.lifePCMainCondition.insuranceMark" placeholder="请选择">
                      <el-option label="新保" value="1"></el-option>
                      <el-option label="续保" value="2"></el-option>
                    </el-select>
                  </ui-label-text>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item>
                  <ui-label-text label="是否续保：" labelWidth="160" >
                    <el-select slot="text" clearable v-model="BillNoList.lifePCMainCondition.atuoAcceptFlag" placeholder="请选择">
                      <el-option label="是" value="1"></el-option>
                      <el-option label="否" value="0"></el-option>
                    </el-select>
                  </ui-label-text>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row >
              <el-col :span="12">
                <el-form-item>
                  <ui-label-text label="出单渠道：" labelWidth="160" >
                    <el-select slot="text"  v-model="BillNoList.lifePCMainCondition.businessNature" placeholder="请选择">
                      <el-option label="佰盈销售" value="1"></el-option>
                      <el-option label="富新财富" value="2"></el-option>
                      <el-option label="其他" value="3"></el-option>
                      <el-option label="同道" value="4"></el-option>
                    </el-select>
                  </ui-label-text>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item>
                  <ui-label-text label="业务类型：" labelWidth="160" >
                    <el-select disabled slot="text" v-model="BillNoList.lifePCMainCondition.busiType" placeholder="请选择">
                      <el-option label="直接业务" value="1"></el-option>
                      <el-option label="间接业务" value="2"></el-option>
                    </el-select>
                  </ui-label-text>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row >
              <el-col :span="12">
                <el-form-item>
                  <ui-label-text label="现金价值自动垫缴保费：" labelWidth="160" >
                    <el-select slot="text" v-model="BillNoList.lifePCMainCondition.xjjzzddjbf" placeholder="请选择">
                      <el-option label="是" value="1"></el-option>
                      <el-option label="否" value="0"></el-option>
                    </el-select>
                  </ui-label-text>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item>
                  <ui-label-text label="账户价值自动抵交保费：" labelWidth="160" >
                    <el-select slot="text" v-model="BillNoList.lifePCMainCondition.xjjzdjbff" placeholder="请选择">
                      <el-option label="是" value="1"></el-option>
                      <el-option label="否" value="0"></el-option>
                    </el-select>
                  </ui-label-text>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row >
              <el-col :span="12">
                <el-form-item >
                  <ui-label-text label="红利领取方式：" labelWidth="160" >
                    <el-select slot="text" v-model="BillNoList.lifePCMainCondition.hllqfs" placeholder="请选择">
                      <el-option label="累积生息" value="1"></el-option>
                      <el-option label="抵缴保费" value="2"></el-option>
                      <el-option label="增额交清" value="3"></el-option>
                      <el-option label="转万能账户" value="4"></el-option>
                    </el-select>
                  </ui-label-text>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item >
                  <ui-label-text label="年金领取方式：" labelWidth="160" >
                    <el-select slot="text" v-model="BillNoList.lifePCMainCondition.njlqfs" placeholder="请选择">
                      <el-option label="累积生息" value="1"></el-option>
                      <el-option label="抵缴保费" value="2"></el-option>
                      <el-option label="增额交清" value="3"></el-option>
                      <el-option label="转万能账户" value="4"></el-option>
                    </el-select>
                  </ui-label-text>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row >
              <el-col :span="12">
                <el-form-item >
                  <ui-label-text label="特别约定：" labelWidth="160" >
                    <el-input slot="text" clearable  v-model="BillNoList.lifePCMainCondition.speAgreement" ></el-input>
                  </ui-label-text>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item >
                  <ui-label-text label="回执签收日期：" labelWidth="160" >
                    <el-date-picker  v-model="BillNoList.lifePCMainCondition.backMsgSignDate" slot="text" type="date" placeholder="选择日期" value-format="yyyy-MM-dd"></el-date-picker>
                  </ui-label-text>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row >
              <el-col :span="12">
                <el-form-item >
                  <ui-label-text label="回访状态：" labelWidth="160" >
                    <el-select slot="text" v-model="BillNoList.lifePCMainCondition.hfStatus" placeholder="请选择">
                      <el-option label="未回访" value="1"></el-option>
                      <el-option label="成功" value="2"></el-option>
                      <el-option label="失败" value="3"></el-option>
                    </el-select>
                  </ui-label-text>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item >
                  <ui-label-text label="回访日期：" labelWidth="160" >
                    <el-date-picker value-format="yyyy-MM-dd" v-model="BillNoList.lifePCMainCondition.hfDate" slot="text" type="date" placeholder="选择日期" ></el-date-picker>
                  </ui-label-text>
                </el-form-item>
              </el-col>
            </el-row>
             <el-row >
              <el-col :span="12">
                <el-form-item >
                  <ui-label-text label="更新时间: " labelWidth="160" >
                    <el-date-picker disabled v-model="BillNoList.lifePCMainCondition.updateTime" slot="text" type="date" placeholder="选择日期" format="yyyy-MM-dd HH:mm:ss" ></el-date-picker>
                  </ui-label-text>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item prop="lifePCMainCondition.singleMode">
                  <ui-label-text :required="true" label="出单方式：" labelWidth="160" >
                    <el-select slot="text"  v-model="BillNoList.lifePCMainCondition.singleMode" placeholder="请选择">
                      <el-option label="同道" value="1"></el-option>
                      <el-option label="微/电投" value="2"></el-option>
                      <el-option label="纸质投保" value="3"></el-option>
                      <el-option label="其他" value="4"></el-option>
                    </el-select>
                  </ui-label-text>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row >
              <el-col :span="12">
                <el-form-item prop="lifePCMainCondition.byMyself">
                  <ui-label-text :required="true" label="自保件：" labelWidth="160" >
                    <el-select slot="text" disabled  v-model="BillNoList.lifePCMainCondition.byMyself" placeholder="请选择">
                      <el-option label="是" value="1"></el-option>
                      <el-option label="否" value="0"></el-option>
                    </el-select>
                  </ui-label-text>
                </el-form-item>
              </el-col>
            </el-row>
          </div>
        </ui-line-tittle>
        <!--投保人信息 -->
        <ui-line-tittle :collapsible="true" >
          <span slot="title" >
            <i class="font_family icon-jy-menu-4" ></i>投保人信息
          </span>
          <div class="ri-content" slot="content" >
            <el-row>
              <el-col :span="12">
                <el-form-item>
                  <ui-label-text label="投保人代码：" labelWidth="160" >
                    <el-input slot="text" placeholder="双击选择"  clearable :readonly='true' v-model="BillNoList.lifePartyCondition.insureNo" @dblclick.native="customerFindIns(1, 0, $event)"></el-input>
                  </ui-label-text>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item prop="lifePartyCondition.insureName">
                  <ui-label-text :required='true' label="投保人名称：" labelWidth="160" >
                    <el-input slot="text" :readonly='isInput' placeholder="双击选择" clearable @dblclick.native="customerFindIns(1, 0, $event)" v-model="BillNoList.lifePartyCondition.insureName" ></el-input>
                  </ui-label-text>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item >
                  <ui-label-text label="投保人地址：" labelWidth="160" >
                    <el-input slot="text" :disabled='isInput' clearable v-model="BillNoList.lifePartyCondition.insureAddress" ></el-input>
                  </ui-label-text>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item prop="lifePartyCondition.postNo">
                  <ui-label-text label="邮政编码：" labelWidth="160" >
                    <el-input slot="text" :disabled='isInput' clearable v-model="BillNoList.lifePartyCondition.postNo" ></el-input>
                  </ui-label-text>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row >
              <el-col :span="12">
                <el-form-item >
                  <ui-label-text label="性别：" labelWidth="160" >
                    <el-select slot="text" :disabled='isInput' clearable  v-model="BillNoList.lifePartyCondition.sexType" placeholder="请选择">
                      <el-option label="男" value="0"></el-option>
                      <el-option label="女" value="1"></el-option>
                    </el-select>
                  </ui-label-text>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item >
                  <ui-label-text label="国籍：" labelWidth="160" >
                    <el-input slot="text" :disabled='isInput' clearable v-model="BillNoList.lifePartyCondition.country" ></el-input>
                  </ui-label-text>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row >
              <el-col :span="12">
                <el-form-item >
                  <ui-label-text label="出生日期：" labelWidth="160" >
                    <el-date-picker :disabled='isInput' value-format="timestamp" v-model="BillNoList.lifePartyCondition.birthDate" slot="text" type="date" placeholder="选择日期"></el-date-picker>
                  </ui-label-text>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item >
                  <ui-label-text  label="备注：" labelWidth="160" >
                    <el-input slot="text" clearable v-model="BillNoList.lifePartyCondition.remark" ></el-input>
                  </ui-label-text>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row >
              <el-col :span="12">
                <el-form-item >
                  <ui-label-text label="婚姻状况：" labelWidth="160" >
                    <el-select slot="text" :disabled='isInput'  v-model="BillNoList.lifePartyCondition.marriage" placeholder="请选择">
                      <el-option label="已婚 " value="1"></el-option>
                      <el-option label="未婚" value="2"></el-option>
                      <el-option label="离异" value="3"></el-option>
                      <el-option label="不明" value="4"></el-option>
                    </el-select>
                  </ui-label-text>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item >
                  <ui-label-text label="学历：" labelWidth="160" >
                    <el-select slot="text" :disabled='isInput'  v-model="BillNoList.lifePartyCondition.educationCode" placeholder="请选择">
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
            <el-row >
              <el-col :span="12">
                <el-form-item prop="lifePartyCondition.identifyType" >
                  <ui-label-text :required='true' label="证件类型：" labelWidth="160" >
                    <el-select @change="idNumChange" slot="text" :disabled='isInput'  v-model="BillNoList.lifePartyCondition.identifyType" placeholder="请选择">
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
                <el-form-item prop="lifePartyCondition.identifyNumber">
                  <ui-label-text :required='true' label="证件号码：" labelWidth="160" >
                    <el-input clearable slot="text" :disabled='isInput' v-model="BillNoList.lifePartyCondition.identifyNumber" ></el-input>
                  </ui-label-text>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row >
              <el-col :span="12" >
                <el-form-item prop='lifePartyCondition.identifyValiddate' ref='dateForm'>
                  <ui-label-text :required='true' label="证件有效期：" labelWidth="160" >
                    <el-date-picker style="width: 40%; margin-right: 9%; " :disabled="BillNoList.lifePartyCondition.longFlagTag" v-model="BillNoList.lifePartyCondition.identifyValiddate" slot="text" type="date" placeholder="选择日期" ></el-date-picker>
                    <el-checkbox style="display: inline-block; " slot="text"  size='mini' v-model="BillNoList.lifePartyCondition.longFlagtag" :disabled='isInput' @change="checkChange" >终身</el-checkbox>
                  </ui-label-text>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row >
              <el-col :span="12">
                <el-form-item prop="lifePartyCondition.insureTel">
                  <ui-label-text  label="固定电话：" labelWidth="160" >
                    <el-input slot="text" clearable :disabled='isInput'  v-model="BillNoList.lifePartyCondition.insureTel" ></el-input>
                  </ui-label-text>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item prop="lifePartyCondition.mobilePhone">
                  <ui-label-text  label="移动电话：" labelWidth="160" >
                    <el-input slot="text" clearable :disabled='isInput' v-model="BillNoList.lifePartyCondition.mobilePhone" ></el-input>
                  </ui-label-text>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row >
              <el-col :span="12">
                <el-form-item >
                  <ui-label-text label="工作单位：" labelWidth="160" >
                    <el-input slot="text" clearable :disabled='isInput'  v-model="BillNoList.lifePartyCondition.workingUnit" ></el-input>
                  </ui-label-text>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item >
                  <ui-label-text label="职业：" labelWidth="160" >
                    <el-input slot="text" :disabled='isInput' clearable v-model="BillNoList.lifePartyCondition.job" ></el-input>
                  </ui-label-text>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row >
              <el-col :span="12">
                <el-form-item prop="lifePartyCondition.e_mail">
                  <ui-label-text label="Email：" labelWidth="160" >
                    <el-input slot="text" :disabled='isInput' v-model="BillNoList.lifePartyCondition.e_mail" ></el-input>
                  </ui-label-text>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item >
                  <ui-label-text label="微信号：" labelWidth="160" >
                    <el-input slot="text" clearable :disabled='isInput' v-model="BillNoList.lifePartyCondition.weixin" ></el-input>
                  </ui-label-text>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row >
              <el-col :span="12">
                <el-form-item >
                  <ui-label-text label="经常居住地：" labelWidth="160" >
                    <el-input slot="text" clearable :disabled='isInput' v-model="BillNoList.lifePartyCondition.habitualResidence" ></el-input>
                  </ui-label-text>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item prop="lifePartyCondition.insuredrType" >
                  <ui-label-text :required='true' label="与被保险人关系：" labelWidth="160" >
                    <el-select @change="relChange" slot="text"  v-model="BillNoList.lifePartyCondition.insuredrType" placeholder="请选择">
                      <el-option label="本人" value="1"></el-option>
                      <el-option label="配偶" value="2"></el-option>
                      <el-option label="子女" value="3"></el-option>
                      <el-option label="父母" value="4"></el-option>
                      <el-option label="其他" value="5"></el-option>
                    </el-select>
                  </ui-label-text>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row >
              <el-col :span="12">
                <el-form-item prop="lifePartyCondition.insuredrName" ref='insNForm'>
                  <ui-label-text :required='!isEdit' label="关系名称：" labelWidth="160" >
                    <el-input slot="text" :disabled="isEdit" clearable v-model="BillNoList.lifePartyCondition.insuredrName" ></el-input>
                  </ui-label-text>
                </el-form-item>
              </el-col>
            </el-row>
            <div class='addBtn'>
              <el-button type="primary" @click="isAddCus = true" >新增个人客户</el-button>
            </div>
          </div>
        </ui-line-tittle>
        <!-- 被保险人信息 -->
        <ui-line-tittle :collapsible="true" >
          <span slot="title" >
            <i class="font_family icon-jy-menu-4" ></i>被保险人信息
          </span>
          <div class="ri-content" slot="content" >
            <div v-for="(item, index) in BillNoList.lifePartyConditionDList" :key='index' class='splice-line'>
              <el-row>
                <el-col :span="12">
                  <el-form-item >
                    <ui-label-text label="被保险人代码：" labelWidth="160" >
                      <el-input slot="text" :disabled='item.isInput' @dblclick.native="customerFindIns(1, 1, $event, index)" :readonly="true" placeholder="双击选择" v-model="item.insureNoD" clearable ></el-input>
                    </ui-label-text>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item :prop="'lifePartyConditionDList.' + index +'.insureNameD'" :rules="rules.name" >
                    <ui-label-text :required="true" label="被保险人名称：" labelWidth="160" >
                      <el-input  slot="text" @dblclick.native="customerFindIns(1, 1, $event, index)" :readonly='item.isInput' placeholder="双击选择" :disabled='item.isclick' v-model="item.insureNameD" clearable ></el-input>
                    </ui-label-text>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="12">
                  <el-form-item >
                    <ui-label-text label="被保险人地址：" labelWidth="160" >
                      <el-input slot="text" :disabled='item.isInput' clearable v-model="item.insureAddressD" ></el-input>
                    </ui-label-text>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item :prop="'lifePartyConditionDList.' + index +'.postNoD'" :rules="rules.postNoD" >
                    <ui-label-text label="邮政编码：" labelWidth="160" >
                      <el-input slot="text" clearable :disabled='item.isInput' v-model="item.postNoD" ></el-input>
                    </ui-label-text>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row >
                <el-col :span="12">
                  <el-form-item >
                    <ui-label-text label="性别：" labelWidth="160" >
                      <el-select slot="text" :disabled='item.isInput'  v-model="item.sexTypeD" placeholder="请选择">
                        <el-option label="男" value="0"></el-option>
                        <el-option label="女" value="1"></el-option>
                      </el-select>
                    </ui-label-text>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item >
                    <ui-label-text label="国籍：" labelWidth="160" >
                      <el-input slot="text" :disabled='item.isInput' clearable  v-model="item.countryD" ></el-input>
                    </ui-label-text>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row >
                <el-col :span="12">
                  <el-form-item >
                    <ui-label-text label="出生日期：" labelWidth="160" >
                      <el-date-picker :disabled='item.isInput' value-format="timestamp"  v-model="item.birthDateD" slot="text" type="date" placeholder="选择日期"></el-date-picker>
                    </ui-label-text>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item >
                    <ui-label-text  label="备注：" labelWidth="160" >
                      <el-input slot="text" clearable  v-model="item.remark" ></el-input>
                    </ui-label-text>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row >
                <el-col :span="12">
                  <el-form-item >
                    <ui-label-text label="婚姻状况：" labelWidth="160" >
                      <el-select slot="text" :disabled='item.isInput' v-model="item.marriageD" placeholder="请选择">
                        <el-option label="已婚" value="1"></el-option>
                        <el-option label="未婚" value="2"></el-option>
                        <el-option label="离异" value="3"></el-option>
                        <el-option label="不明" value="4"></el-option>
                      </el-select>
                    </ui-label-text>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item >
                    <ui-label-text label="学历：" labelWidth="160" >
                      <el-select slot="text" :disabled='item.isInput' v-model="item.educationCodeD" placeholder="请选择">
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
              <el-row >
                <el-col :span="12">
                  <el-form-item :prop="'lifePartyConditionDList.' + index +'.identifyTypeD'" :rules="rules.typeD">
                    <ui-label-text :required="true" label="证件类型：" labelWidth="160" >
                      <el-select slot="text" :disabled='item.isInput'  v-model="item.identifyTypeD" placeholder="请选择">
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
                  <el-form-item :prop="'lifePartyConditionDList.' + index +'.identifyNumberD'" :rules="rules.identifyNumberD" >
                    <ui-label-text :required="true" label="证件号码：" labelWidth="160" >
                      <el-input slot="text" :disabled='item.isInput' clearable v-model="item.identifyNumberD" ></el-input>
                    </ui-label-text>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row >
                <el-col :span="12">
                  <el-form-item>
                    <ui-label-text :required="true" label="证件有效期：" labelWidth="160" >
                      <el-date-picker style="width: 40%; margin-right: 9%; " :disabled="item.longFlagTag" v-model="item.identifyValiddateD" slot="text" type="date" placeholder="选择日期"></el-date-picker>
                      <el-checkbox  style="display: inline-block; " :disabled='item.isInput' slot="text"  size='mini' v-model="item.longFlagtag" @change="checkChangeItem($event, index, 0)" >终身</el-checkbox>
                    </ui-label-text>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row >
                <el-col :span="12">
                  <el-form-item :prop="'lifePartyConditionDList.' + index +'.insureTelD'" :rules="rules.insureTelD">
                    <ui-label-text  label="固定电话：" labelWidth="160" >
                      <el-input slot="text" :disabled='item.isInput' clearable v-model="item.insureTelD"  ></el-input>
                    </ui-label-text>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item :prop="'lifePartyConditionDList.' + index +'.mobilePhoneD'" :rules="rules.mobilePhoneD">
                    <ui-label-text  label="移动电话：" labelWidth="160" >
                      <el-input slot="text" :disabled='item.isInput' clearable v-model="item.mobilePhoneD" ></el-input>
                    </ui-label-text>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row >
                <el-col :span="12">
                  <el-form-item >
                    <ui-label-text label="工作单位：" labelWidth="160" >
                      <el-input slot="text" :disabled='item.isInput' clearable  v-model="item.workingUnitD" ></el-input>
                    </ui-label-text>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item >
                    <ui-label-text label="职业：" labelWidth="160" >
                      <el-input slot="text" :disabled='item.isInput' clearable  v-model="item.jobD" ></el-input>
                    </ui-label-text>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row >
                <el-col :span="12">
                  <el-form-item >
                    <ui-label-text label="Email：" labelWidth="160" >
                      <el-input slot="text" :disabled='item.isInput' clearable v-model="item.e_mailD" ></el-input>
                    </ui-label-text>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item >
                    <ui-label-text label="微信号：" labelWidth="160" >
                      <el-input slot="text" :disabled='item.isInput' clearable v-model="item.weixinD" ></el-input>
                    </ui-label-text>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row >
                <el-col :span="12">
                  <el-form-item >
                    <ui-label-text label="经常居住地：" labelWidth="160" >
                      <el-input slot="text" :disabled='item.isInput' clearable v-model="item.habitualResidenceD" ></el-input>
                    </ui-label-text>
                  </el-form-item>
                </el-col>
              </el-row>
              <div class='addBtn' style="text-align: right; ">
                <el-button type="danger" @click="deletInsured(index)">删除</el-button>
              </div>
            </div>
            <div class='addBtn'>
              <el-button type="primary" @click="addInsured">增加</el-button>
              <el-button type="primary" @click="isAddCus = true" >新增个人客户</el-button>
            </div>
          </div>
        </ui-line-tittle>
        <!-- 身故受益人信息 -->
        <ui-line-tittle :collapsible="true" >
          <span slot="title" >
            <i class="font_family icon-jy-menu-4" ></i>身故受益人信息
          </span>
          <div class="ri-content" slot="content" >
            <el-row >
              <el-col :span="12">
                <el-form-item>
                  <ui-label-text>
                    <el-radio-group  slot="text" v-model="BillNoList.lifePCMainCondition.sgFlag" >
                      <el-radio :label="1">法定受益人</el-radio>
                      <el-radio :label="2">指定受益人</el-radio>
                    </el-radio-group>
                  </ui-label-text>
                </el-form-item>
              </el-col>
            </el-row>
            <div class='tabShow splice-line' v-if='BillNoList.lifePCMainCondition.sgFlag == 2'>
              <div v-for='(item, index) in BillNoList.lifePartyTConditionList' :key='index' >
                <el-row>
                  <el-col :span="12">
                    <el-form-item :prop="'lifePartyTConditionList.' + index +'.partyName'" :rules="sgRules.partyName">
                      <ui-label-text :required="true" label="姓名："  labelWidth="160" >
                        <el-input clearable slot="text" v-model="item.partyName" ></el-input>
                      </ui-label-text>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item :prop="'lifePartyTConditionList.' + index +'.identifyType'" :rules="sgRules.identifyType" >
                      <ui-label-text :required="true" label="证件类型：" labelWidth="160" >
                        <el-select @change="idNumChangeItem($event, index, 1)" slot="text" v-model="item.identifyType" placeholder="请选择">
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
                </el-row>
                <el-row>
                  <el-col :span="12">
                    <el-form-item :prop="'lifePartyTConditionList.' + index +'.identifyNumber'" :rules="sgRules.identifyNumber"  >
                      <ui-label-text :required="true" label="证件号码："  labelWidth="160" >
                        <el-input clearable slot="text" v-model="item.identifyNumber" ></el-input>
                      </ui-label-text>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item>
                      <ui-label-text :required="true" label="证件有效期：" labelWidth="160" >
                        <el-date-picker style="width: 40%; margin-right: 9%; " :disabled="item.longFlagtag" v-model="item.identifyValiddate" slot="text" type="date" placeholder="选择日期"  value-format="yyyy-MM-dd" ></el-date-picker>
                        <el-checkbox @change="checkChangeItem($event, index, 1)" style="display: inline-block; " slot="text"  size='mini' v-model="item.longFlagtag" >终身</el-checkbox>
                      </ui-label-text>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="12">
                    <el-form-item :prop="'lifePartyTConditionList.' + index +'.sex'" :rules="sgRules.sex">
                      <ui-label-text :required="true" label="性别："  labelWidth="160" >
                        <el-select  slot="text" v-model="item.sex" placeholder="请选择">
                          <el-option label="男" value="0"></el-option>
                          <el-option label="女" value="1"></el-option>
                        </el-select>
                      </ui-label-text>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item :prop="'lifePartyTConditionList.' + index +'.birthdate'" :rules="sgRules.birthdate">
                      <ui-label-text :required="true" label="出生日期："  labelWidth="160" >
                        <el-date-picker style="width: 40%; margin-right: 9%; " v-model="item.birthdate" slot="text" type="date" placeholder="选择日期"  value-format="yyyy-MM-dd" ></el-date-picker>
                      </ui-label-text>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="12">
                    <el-form-item >
                      <ui-label-text  label="备注：" labelWidth="160" >
                        <el-input clearable  slot="text" v-model="item.remark" ></el-input>
                      </ui-label-text>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="12">
                    <el-form-item :prop="'lifePartyTConditionList.' + index +'.beneficialOrder'" :rules="sgRules.beneficialOrder" >
                      <ui-label-text :required="true" label="受益顺序："  labelWidth="160" >
                        <el-select  slot="text" v-model="item.beneficialOrder" placeholder="请选择">
                          <el-option label="1" value="1"></el-option>
                          <el-option label="2" value="2"></el-option>
                          <el-option label="3" value="3"></el-option>
                          <el-option label="4" value="4"></el-option>
                          <el-option label="5" value="5"></el-option>
                        </el-select>
                      </ui-label-text>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item :prop="'lifePartyTConditionList.' + index +'.benefitShare'" :rules="sgRules.benefitShare">
                      <ui-label-text :required="true" label="受益份额（%）："  labelWidth="160" >
                        <el-input clearable slot="text" v-model="item.benefitShare" ></el-input>
                      </ui-label-text>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="12">
                    <el-form-item :prop="'lifePartyTConditionList.' + index +'.insuredrType'" :rules="sgRules.insuredrType">
                      <ui-label-text :required="true" label="与被保险人关系：" labelWidth="160" >
                        <el-select @change="sgRelstionShip(index, $event)"  slot="text" v-model="item.insuredrType" placeholder="请选择">
                          <el-option label="本人" value="1"></el-option>
                          <el-option label="配偶" value="2"></el-option>
                          <el-option label="子女" value="3"></el-option>
                          <el-option label="父母" value="4"></el-option>
                          <el-option label="其他" value="5"></el-option>
                        </el-select>
                      </ui-label-text>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item :prop="'lifePartyTConditionList.' + index +'.insuredrName'" :rules="sgRules.insuredrName">
                      <ui-label-text label="关系名称：" labelWidth="160" >
                        <el-input :disabled="item.isEdit" clearable slot="text" v-model="item.insuredrName" ></el-input>
                      </ui-label-text>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="12">
                    <el-form-item  >
                      <ui-label-text label="联系方式：" labelWidth="160" >
                        <el-input clearable slot="text" v-model="item.phone" ></el-input>
                      </ui-label-text>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item >
                      <ui-label-text label="经常居住地：" labelWidth="160" >
                        <el-input clearable slot="text" v-model="item.habitualResidence" ></el-input>
                      </ui-label-text>
                    </el-form-item>
                  </el-col>
                </el-row>
                <div class='addBtn' style="text-align: right; ">
                  <el-button type="danger" @click="deletSgItem(index)">删除</el-button>
                </div>
              </div>
            </div>
            <div class='addBtn'>
              <el-button type="primary" @click="addSgItem" v-if="BillNoList.lifePCMainCondition.sgFlag == 2" >增加</el-button>
              <el-button type="info" v-else-if="BillNoList.lifePCMainCondition.sgFlag == 1" >增加</el-button>
            </div>
          </div>
        </ui-line-tittle>
        <!-- 生存受益人信息 -->
        <ui-line-tittle :collapsible="true" >
          <span slot="title" >
            <i class="font_family icon-jy-menu-4" ></i>生存受益人信息
          </span>
          <div class="ri-content" slot="content" >
            <el-row>
              <el-col :span="12">
                <el-form-item>
                  <ui-label-text>
                    <el-radio-group  slot="text" v-model="BillNoList.lifePCMainCondition.scFlag">
                      <el-radio :label="1">投保人</el-radio>
                      <el-radio :label="2">被保险人</el-radio>
                      <el-radio :label="3">其他</el-radio>
                    </el-radio-group>
                  </ui-label-text>
                </el-form-item>
              </el-col>
            </el-row>
            <div class='tabShow' v-if='BillNoList.lifePCMainCondition.scFlag == 3' >
              <div v-for='(item, index) in BillNoList.lifePartyAConditionList' :key='index'>
                <el-row>
                  <el-col :span="12">
                    <el-form-item :prop="'lifePartyAConditionList.' + index +'.partyName'" :rules="sgRules.partyName">
                      <ui-label-text :required="true" label="姓名："  labelWidth="160" >
                        <el-input clearable slot="text" v-model="item.partyName" ></el-input>
                      </ui-label-text>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item :prop="'lifePartyAConditionList.' + index +'.identifyType'" :rules="sgRules.identifyType">
                      <ui-label-text :required="true"  label="证件类型：" labelWidth="160" >
                        <el-select  @change="idNumChangeItem($event, index, 2)"  slot="text" v-model="item.identifyType" placeholder="请选择">
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
                </el-row>
                <el-row>
                  <el-col :span="12">
                    <el-form-item :prop="'lifePartyAConditionList.' + index +'.identifyNumber'" :rules="sgRules.identifyNumber">
                      <ui-label-text :required="true" label="证件号码："  labelWidth="160" >
                        <el-input clearable slot="text" v-model="item.identifyNumber" ></el-input>
                      </ui-label-text>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item>
                      <ui-label-text :required="true" label="证件有效期：" labelWidth="160" >
                        <el-date-picker style="width: 40%; margin-right: 9%; " :disabled="item.longFlagtag" v-model="item.identifyValiddate" slot="text" type="date" placeholder="选择日期"  value-format="yyyy-MM-dd" ></el-date-picker>
                        <el-checkbox @change="checkChangeItem($event, index, 2)" style="display: inline-block; " slot="text"  size='mini' v-model="item.longFlagtag" >终身</el-checkbox>
                      </ui-label-text>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="12">
                    <el-form-item :prop="'lifePartyAConditionList.' + index +'.sex'" :rules="sgRules.sex">
                      <ui-label-text :required="true" label="性别："  labelWidth="160" >
                        <el-select clearable slot="text" v-model="item.sex" placeholder="请选择">
                          <el-option label="男" value="1"></el-option>
                          <el-option label="女" value="2"></el-option>
                        </el-select>
                      </ui-label-text>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item :prop="'lifePartyAConditionList.' + index +'.birthdate'" :rules="sgRules.birthdate">
                      <ui-label-text :required="true" label="出生日期："  labelWidth="160" >
                        <el-date-picker v-model="item.birthdate"  value-format="yyyy-MM-dd"  slot="text" type="date" placeholder="选择日期"></el-date-picker>
                      </ui-label-text>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="12">
                    <el-form-item >
                      <ui-label-text  label="备注：" labelWidth="160" >
                        <el-input clearable slot="text" v-model="item.remark" ></el-input>
                      </ui-label-text>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="12">
                    <el-form-item :prop="'lifePartyAConditionList.' + index +'.beneficialOrder'" :rules="sgRules.beneficialOrder">
                      <ui-label-text :required="true" label="受益顺序："  labelWidth="160" >
                        <el-select  slot="text" v-model="item.beneficialOrder" placeholder="请选择">
                          <el-option label="1" value="1"></el-option>
                          <el-option label="2" value="2"></el-option>
                          <el-option label="3" value="3"></el-option>
                          <el-option label="4" value="4"></el-option>
                          <el-option label="5" value="5"></el-option>
                        </el-select>
                      </ui-label-text>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item :prop="'lifePartyAConditionList.' + index +'.benefitShare'" :rules="sgRules.benefitShare">
                      <ui-label-text :required="true" label="受益份额（%）："  labelWidth="160" >
                        <el-input clearable slot="text" v-model="item.benefitShare" ></el-input>
                      </ui-label-text>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="12">
                    <el-form-item :prop="'lifePartyAConditionList.' + index +'.insuredrType'" :rules="sgRules.insuredrType">
                      <ui-label-text :required="true"  label="与被保险人关系：" labelWidth="160" >
                        <el-select  slot="text" v-model="item.insuredrType" placeholder="请选择">
                          <el-option label="本人" value="1"></el-option>
                          <el-option label="配偶" value="2"></el-option>
                          <el-option label="子女" value="3"></el-option>
                          <el-option label="父母" value="4"></el-option>
                          <el-option label="其他" value="5"></el-option>
                        </el-select>
                      </ui-label-text>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item  >
                      <ui-label-text label="关系名称：" labelWidth="160" >
                        <el-input clearable slot="text" v-model="item.insuredrName" ></el-input>
                      </ui-label-text>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="12">
                    <el-form-item  >
                      <ui-label-text label="联系方式：" labelWidth="160" >
                        <el-input clearable slot="text" v-model="item.phone" ></el-input>
                      </ui-label-text>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item >
                      <ui-label-text label="经常居住地：" labelWidth="160" >
                        <el-input clearable slot="text" v-model="item.habitualResidenc" ></el-input>
                      </ui-label-text>
                    </el-form-item>
                  </el-col>
                </el-row>
                <div class='addBtn' style="text-align: right; ">
                  <el-button type="danger" @click="deletScItem(index)">删除</el-button>
                </div>
              </div>
            </div>
            <div class='addBtn'>
              <el-button type="primary" @click="addScBenefit" v-if="BillNoList.lifePCMainCondition.scFlag == 3" >增加</el-button>
              <el-button type="info" v-else-if="BillNoList.lifePCMainCondition.sgFlag == 1 || BillNoList.lifePCMainCondition.sgFlag == 2" >增加</el-button>
            </div>
          </div>
        </ui-line-tittle>
        <!-- 业务员信息 -->
        <ui-line-tittle :collapsible="true" >
          <span slot="title" >
            <i class="font_family icon-jy-menu-4" ></i>业务员信息
          </span>
          <div class="ri-content" slot="content" >
            <el-row>
              <el-col :span="12">
                <el-form-item prop="lifePCMainCondition.handlerCode">
                  <ui-label-text :required="true" label="业务员代码:" labelWidth="160" >
                    <el-input slot="text" placeholder="双击选择" clearable @dblclick.native="getAgentCodeName(1)" v-model="BillNoList.lifePCMainCondition.handlerCode" ></el-input>
                  </ui-label-text>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item   >
                  <ui-label-text label="业务员名称:"  labelWidth="160" >
                    <el-input :disabled="true" slot="text"  v-model="BillNoList.lifePCMainCondition.handlerName" ></el-input>
                  </ui-label-text>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item   >
                  <ui-label-text label="归属机构/部门代码："  labelWidth="160" >
                    <el-input :disabled="true" slot="text"  v-model="BillNoList.lifePCMainCondition.comCode" ></el-input>
                  </ui-label-text>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item  >
                  <ui-label-text  label="归属机构/部门名：" labelWidth="160" >
                    <el-input :disabled="true" slot="text"  v-model="BillNoList.lifePCMainCondition.comName" ></el-input>
                  </ui-label-text>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item >
                  <ui-label-text label="介绍人类型："  labelWidth="160" >
                    <el-input slot="text"  v-model="BillNoList.lifePCMainCondition.introduceType" ></el-input>
                  </ui-label-text>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item >
                  <ui-label-text label="介绍人代码："  labelWidth="160" >
                    <el-input slot="text"  v-model="BillNoList.lifePCMainCondition.introduceCode" ></el-input>
                  </ui-label-text>
                </el-form-item>
              </el-col>
              <!-- <el-col :span="12">
                <el-form-item >
                  <ui-label-text label="介绍人状态："  labelWidth="160" >
                    <el-select v-model="BillNoList.lifePCMainCondition.agentStatus" slot="text" placeholder="请选择">
                      <el-option label="离职" value="0"></el-option>
                      <el-option label="在职" value="1"></el-option>
                    </el-select>
                  </ui-label-text>
                </el-form-item>
              </el-col>     -->
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item >
                  <ui-label-text label="介绍人姓名："  labelWidth="160" >
                    <el-input slot="text"  v-model="BillNoList.lifePCMainCondition.introduceName" ></el-input>
                  </ui-label-text>
                </el-form-item>
              </el-col>
            </el-row>
          </div>
        </ui-line-tittle>
        <!-- 险种信息 -->
        <ui-line-tittle :collapsible="true" >
          <span slot="title" >
            <i class="font_family icon-jy-menu-4" ></i>险种信息
          </span>
          <div class="ri-content riskTable" slot="content" >
            <el-table stripe border :data="BillNoList.lifeCItemKindConditionList" style="width: 100%">
              <el-table-column prop="riskCode" label="险种代码" width="150">
                <template slot-scope="scope">
                  <el-form-item  :prop="'lifeCItemKindConditionList.' + scope.$index +'.riskCode'" :rules="riskRules.riskCode">
                    <ui-label-text :required="true" >
                      <el-input slot="text" :readonly="true" size='mini' placeholder="双击可选择" clearable v-model="scope.row.riskCode" @dblclick.native="getRiskList(1, scope.$index, scope.row, 0)" ></el-input>
                    </ui-label-text>
                  </el-form-item>
                </template>
              </el-table-column>
              <el-table-column prop="riskName" label="险种名称" width="250" >
                <template slot-scope="scope">
                  <el-form-item :prop="'lifeCItemKindConditionList.' + scope.$index +'.riskName'" :rules="riskRules.riskName">
                    <ui-label-text :required="true" >
                      <!-- <el-tooltip placement="top" slot="text">
                        <div slot="content">{{scope.row.riskName}}</div>
                        <el-input :readonly="true" size='mini' placeholder="双击可选择" clearable v-model="scope.row.riskName" @dblclick.native="getRiskList(1, scope.$index, scope.row, 0)"></el-input>
                      </el-tooltip>   -->
                      <el-input :readonly="true" slot="text" size='mini' placeholder="双击可选择" clearable v-model="scope.row.riskName" @dblclick.native="getRiskList(1, scope.$index, scope.row, 0)"></el-input>
                    </ui-label-text>
                  </el-form-item>
                </template>
              </el-table-column>
              <el-table-column prop="mainFlag" label="主/附险标识" width="150">
                <template slot-scope="scope" >
                  <el-form-item>
                    <ui-label-text>
                      <el-select  size='mini' disabled v-model="scope.row.mainFlag" slot="text" placeholder="请选择">
                        <el-option label="附加险" value="0"></el-option>
                        <el-option label="主险" value="1"></el-option>
                        <el-option label="主/附险" value="3"></el-option>
                      </el-select>
                    </ui-label-text>
                  </el-form-item>
                </template>
              </el-table-column>
              <el-table-column prop="paymentPeriod" label="缴费年期" width="150">
                <template slot-scope="scope">
                  <el-form-item >
                    <ui-label-text :required="true" >
                      <el-input :disabled='true' slot="text" size='mini'  v-model="scope.row.paymentPeriod" ></el-input>
                    </ui-label-text>
                  </el-form-item>
                </template>
              </el-table-column>
              <el-table-column prop="payrate" label="缴费频率" width="150">
                <template slot-scope="scope">
                  <el-form-item >
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
              <el-table-column prop="premium" label="应缴保费" width="200">
                <template slot-scope="scope">
                  <el-form-item  :prop="'lifeCItemKindConditionList.' + scope.$index +'.premium'" :rules="riskRules.premium">
                    <ui-label-text :required="true" >
                      <el-input size='mini' @blur='addpremium'  @change="addFloat(scope.$index, 0, 0)"   slot="text" v-model="scope.row.premium" ></el-input>
                    </ui-label-text>
                  </el-form-item>
                </template>
              </el-table-column>
              <el-table-column prop="riskPremium" label="保险金额" width="200">
                <template slot-scope="scope">
                  <el-form-item :prop="'lifeCItemKindConditionList.' + scope.$index +'.riskPremium'" :rules="riskRules.riskPremium">
                    <ui-label-text>
                      <el-input size='mini' @blur='checkNumber(scope.$index, $event)'  slot="text" v-model="scope.row.riskPremium"  @change="addFloat(scope.$index, 0, 1)" ></el-input>
                    </ui-label-text>
                  </el-form-item>
                </template>
              </el-table-column>
              <el-table-column prop="number" label="份数" width="120">
                <template slot-scope="scope">
                  <el-form-item>
                    <ui-label-text>
                      <el-input size='mini'  slot="text" @blur="addFloat(scope.$index, 0, 2)"  v-model="scope.row.number" ></el-input>
                    </ui-label-text>
                  </el-form-item>
                </template>
              </el-table-column>
              <el-table-column prop="addPremium" label="加费金额" width="120">
                <template slot-scope="scope">
                  <el-form-item :prop="'lifeCItemKindConditionList.' + scope.$index +'.addPremium'" :rules="riskRules.addPremium">
                    <ui-label-text>
                      <el-input size='mini'  slot="text" @change="addFloat(scope.$index, 0, 3)" v-model="scope.row.addPremium" ></el-input>
                    </ui-label-text>
                  </el-form-item>
                </template>
              </el-table-column>
              <el-table-column prop="freeDate" label="豁免日期" width="200">
                <template slot-scope="scope">
                  <el-form-item>
                    <ui-label-text>
                      <el-date-picker size="mini"  v-model="scope.row.freeDate" :disabled="scope.row.isHmRisk" slot="text" type="date" placeholder="选择日期"  value-format="yyyy-MM-dd" ></el-date-picker>
                    </ui-label-text>
                  </el-form-item>
                </template>
              </el-table-column>
              <el-table-column prop="tbrFreeFlag" label="豁免人" width="200">
                <template slot-scope="scope">
                  <el-form-item>
                    <ui-label-text>
                      <el-checkbox slot="text" :disabled="scope.row.isHmRisk" size="mini" v-model="scope.row.tbrFreeFlagtag">投保人</el-checkbox>
                      <el-checkbox  slot="text" :disabled="scope.row.isHmRisk" size='mini' v-model="scope.row.bbrFreeFlagtag" >被保人</el-checkbox>
                    </ui-label-text>
                  </el-form-item>
                </template>
              </el-table-column>
              <el-table-column prop="startDate" label="保险期间" width="350">
                <template slot-scope="scope">
                  <el-form-item>
                    <ui-label-text>
                      <el-date-picker size="mini" style="width: 45%; margin-right: 2%; " v-model="scope.row.startDate" slot="text" type="date" placeholder="选择日期"  value-format="yyyy-MM-dd" ></el-date-picker>至
                      <el-date-picker size="mini" style="width: 45%; margin-right: 2%; " v-if='scope.row.lifeFlagtag == false'  value-format="yyyy-MM-dd"  v-model="scope.row.endDate" slot="text" type="date" placeholder="选择日期"></el-date-picker>
                      <el-checkbox  size='mini' slot="text" v-model="scope.row.lifeFlagtag" >终身</el-checkbox>
                    </ui-label-text>
                  </el-form-item>
                </template>
              </el-table-column>
              <el-table-column  fixed="right" label="操作">
                <template slot-scope="scope">
                    <el-button type="danger" @click="deletRiskItem(scope.$index)">删除</el-button>
                </template>
              </el-table-column>
              <!-- <el-table-column prop="riskStatus" label="险种状态" width="120">
                <template slot-scope="scope">
                  {{ scope.row.riskStatus === '0' ?  '失效': '' }}
                  {{ scope.row.riskStatus === '1' ?  '有效': '' }}
                  {{ scope.row.riskStatus === '2' ?  '拒保': '' }}
                  {{ scope.row.riskStatus === '3' ?  '退保': '' }}
                  {{ scope.row.riskStatus === '4' ?  '犹退': '' }}
                  {{ scope.row.riskStatus === '5' ?  '失效': '' }}
                  {{ scope.row.riskStatus === '6' ?  '永久失效': '' }}
                  {{ scope.row.riskStatus === '7' ?  '理赔中': '' }}
                  {{ scope.row.riskStatus === '8' ?  '理赔终止': '' }}
                  {{ scope.row.riskStatus === '9' ?  '减额交清': '' }}
                  {{ scope.row.riskStatus === '10' ?  '交清': '' }}
                  {{ scope.row.riskStatus === '11' ?  '冻结': '' }}
                  {{ scope.row.riskStatus === '12' ?  '到期终止': '' }}
                  {{ scope.row.riskStatus === '13' ?  '死亡理赔': '' }}
                </template>
              </el-table-column> -->
            </el-table>
            <div class='addBtn' style="margin-top: 20px;" >
              <el-button type="primary" @click="addRiskItem">增加</el-button>
            </div>
          </div>
        </ui-line-tittle>
        <!-- 缴费信息 -->
        <ui-line-tittle :collapsible="true" >
          <span slot="title" style="margin-top: 20px; ">
            <i class="font_family icon-jy-menu-4" ></i>缴费信息
          </span>
          <div class="ri-content" slot="content" >
            <el-row>
              <el-col :span="12">
                <el-form-item>
                  <ui-label-text label="应缴日期：" labelWidth="160" >
                    <el-date-picker  slot="text" v-model="BillNoList.lifeFeeCondition.paidDate" type="date" placeholder="选择日期"></el-date-picker>
                  </ui-label-text>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item  >
                  <ui-label-text label="缴费方式："  labelWidth="160" >
                    <el-select  v-model="BillNoList.lifeFeeCondition.firstal" slot="text" placeholder="请选择">
                      <el-option label="银行转账" value="1"></el-option>
                      <el-option label="其他" value="2"></el-option>
                    </el-select>
                  </ui-label-text>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item  >
                  <ui-label-text label="开户行名称：" labelWidth="160" >
                    <el-autocomplete clearable v-model="BillNoList.lifeFeeCondition.bankName" slot="text" :fetch-suggestions="querySearchAsync"  placeholder="请输入内容"  @select="bankSelect" >
                      <template slot-scope="{ item }">
                        <span class="code">{{ item.configSetValueCode }}</span>-
                        <span class="name">{{ item.configSetValueName }}</span>
                      </template>
                    </el-autocomplete>
                    <!-- <el-select  v-model="BillNoList.lifeFeeCondition.bankName" slot="text" placeholder="请选择">
                      <el-option label="中国银行" value="1"></el-option>
                      <el-option label="其他" value="2"></el-option>
                    </el-select> -->
                  </ui-label-text>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item >
                  <ui-label-text label="账户名：" labelWidth="160" >
                    <el-input  slot="text" v-model="BillNoList.lifeFeeCondition.accountNameFirstal" ></el-input>
                  </ui-label-text>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item >
                  <ui-label-text label="账号：" labelWidth="160" >
                    <el-input  slot="text" v-model="BillNoList.lifeFeeCondition.accountFirstal" ></el-input>
                  </ui-label-text>
                </el-form-item>
              </el-col>
            </el-row>
          </div>
        </ui-line-tittle>
        <!-- 缴费明细 -->
        <ui-line-tittle :collapsible="true" >
          <span slot="title" >
            <i class="font_family icon-jy-menu-4" ></i>缴费明细
          </span>
          <div class="ri-content" slot="content" >
            <el-table stripe border :data="BillNoList.lifeChargeConditionList" style="width: 100%" class="riskTable">
              <el-table-column prop="riskCode" label="险种代码" width='170'>
                <template slot-scope="scope">
                  <el-form-item :prop="'lifeChargeConditionList.' + scope.$index +'.riskCode'" :rules="riskRules.riskCode">
                    <ui-label-text :required="true" >
                      <el-input slot="text" :readonly="true" size='mini' placeholder="双击可选择" clearable v-model="scope.row.riskCode"  @dblclick.native="getRiskList(1, scope.$index, scope.row, 1)"  ></el-input>
                    </ui-label-text>
                  </el-form-item>
                </template>
              </el-table-column>
              <el-table-column prop="riskName" label="险种名称" width='200'>
                <template slot-scope="scope">
                  <el-form-item :prop="'lifeChargeConditionList.' + scope.$index +'.riskName'" :rules="riskRules.riskName">
                    <ui-label-text :required="true" >
                      <!-- <el-tooltip placement="top" slot="text">
                        <div slot="content">{{scope.row.riskName}}</div>
                        <el-input :readonly="true" size='mini' placeholder="双击可选择" clearable v-model="scope.row.riskName" @dblclick.native="getRiskList(1, scope.$index, scope.row, 1)" ></el-input>
                      </el-tooltip> -->
                      <el-input :readonly="true" slot="text" size='mini' placeholder="双击可选择" clearable v-model="scope.row.riskName" @dblclick.native="getRiskList(1, scope.$index, scope.row, 1)" ></el-input>
                    </ui-label-text>
                  </el-form-item>
                </template>
              </el-table-column>
              <el-table-column prop="paidPremium" label="实收保费"  width='150'>
                <template slot-scope="scope">
                  <el-form-item :prop="'lifeChargeConditionList.' + scope.$index +'.paidPremium'" :rules="riskRules.paidPremium">
                    <ui-label-text :required="true" >
                      <el-input slot="text" @blur='addNum' size='mini' clearable v-model="scope.row.paidPremium" @change="addFloat(scope.$index, 1, 0)" ></el-input>
                    </ui-label-text>
                  </el-form-item>
                </template>
              </el-table-column>
              <el-table-column prop="payDate" label="实收日期" width='200'>
                <template slot-scope="scope">
                  <el-form-item prop="payDate">
                    <ui-label-text>
                      <el-date-picker size="mini" slot="text" v-model="scope.row.payDate" align="right" type="date" placeholder="选择日期"  value-format="yyyy-MM-dd" ></el-date-picker>
                    </ui-label-text>
                  </el-form-item>
                </template>
              </el-table-column>
              <el-table-column prop="riskStatus" label="险种状态"  width='150'>
                <template slot-scope="scope">
                  <el-form-item prop="payDate">
                    <ui-label-text >
                      <el-select  size='mini' v-model="scope.row.riskStatus" slot="text" placeholder="请选择">
                        <el-option label="失效" value="0"></el-option>
                        <el-option label="有效" value="2"></el-option>
                        <el-option label="拒保" value="3"></el-option>
                        <el-option label="退保" value="4"></el-option>
                        <el-option label="犹退" value="5"></el-option>
                        <el-option label="失效" value="6"></el-option>
                        <el-option label="永久失效" value="7"></el-option>
                        <el-option label="理赔中" value="8"></el-option>
                        <el-option label="理赔终止" value="9"></el-option>
                        <el-option label="减额交清" value="10"></el-option>
                        <el-option label="交清" value="11"></el-option>
                        <el-option label="冻结" value="12"></el-option>
                        <el-option label="到期终止" value="13"></el-option>
                        <el-option label="死亡理赔" value="14"></el-option>
                      </el-select>
                    </ui-label-text>
                  </el-form-item>
                </template>
              </el-table-column>
              <el-table-column fixed="right"  label="操作">
                <template slot-scope="scope">
                    <el-button type="danger" @click="deletFeeItem(scope.$index)" >删除</el-button>
                </template>
              </el-table-column>
            </el-table>
            <div class='addBtn' style="margin-top: 20px;" >
              <el-button type="primary" @click="addFeeItem" >增加</el-button>
            </div>
            <el-row style="margin-top: 20px;">
              <el-col :span="12">
                <el-form-item  >
                  <ui-label-text label="应缴保费总计：" labelWidth="160" >
                    <el-input :disabled="true" slot="text" v-model="BillNoList.lifeFeeCondition.sumPremium" ></el-input>
                  </ui-label-text>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item >
                  <ui-label-text label="实收保费总计: " labelWidth="160" >
                    <el-input :disabled="true" slot="text" v-model="BillNoList.lifeFeeCondition.paidPremium" ></el-input>
                  </ui-label-text>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item  >
                  <ui-label-text label="缴费状态：" labelWidth="160" >
                    <el-select  v-model="BillNoList.lifeFeeCondition.paymentFlag" slot="text" placeholder="请选择">
                      <el-option label="已缴费" value="1"></el-option>
                      <el-option label="未缴费" value="2"></el-option>
                      <el-option label="保费豁免" value="3"></el-option>
                      <el-option label="缴费回退" value="4"></el-option>
                    </el-select>
                  </ui-label-text>
                </el-form-item>
              </el-col>
            </el-row>
          </div>
        </ui-line-tittle>
        <!-- 提交修改 -->
        <div class="btn-container">
          <el-button type="primary" @click.prevent="modifyPut" >提交</el-button>
        </div>
      </el-form>
    </el-dialog>
    <!-- 修改结束 -->
    <!-- 获取业务员 -->
    <el-dialog title="业务员" :before-close='closeAgent' :append-to-body='true' :visible.sync="agent_dialog" width="50%" center>
      <el-table stripe @row-click='selectRowAgent' ref="multipleTable" :data="agentTableData" >
        <el-table-column prop="agentCode" label="业务员代码" center ></el-table-column>
        <el-table-column prop="agentName" label="业务员名称" center ></el-table-column>
        <el-table-column prop="comName" label="归属机构名称" center ></el-table-column>
      </el-table>
      <div class="pagination" >
        <el-pagination @size-change="agentSizeChange" @current-change='agentCurrentChange' :current-page.sync="dailogCurrent" :pager-count='5' :page-size='5' :page-sizes='sizeList' :total="dailogRecords" layout="total, sizes, prev, pager, next, jumper" > </el-pagination>
      </div>
    </el-dialog>
    <!-- 获取公司机构 -->
    <el-dialog title="归属机构" :before-close='orgClose'  :append-to-body='true' :visible.sync="org_dialog" width="50%" center>
      <el-table stripe @row-click='selectRowOrg' ref="multipleTable" :data="orgTableData" >
        <el-table-column prop="comCode" label="机构代码" center ></el-table-column>
        <el-table-column prop="comCName" label="机构名称" center ></el-table-column>
      </el-table>
      <div class="pagination" >
        <el-pagination @size-change="orgSizeChange" @current-change='orgCurrentChange' :page-sizes='sizeList' :current-page.sync="dailogCurrent" layout="total, sizes, prev, pager, next, jumper" :pager-count='5' :total="dailogRecords" :page-size="5" :page-count="dailogPages"> </el-pagination>
      </div>
    </el-dialog>
    <!-- 获取保险公司 -->
    <el-dialog title="保险公司" :before-close='comClose'  center :append-to-body='true' :visible.sync="com_dialog" width="50%">
      <el-table stripe @row-click='selectRowCom' ref="multipleTable" :data="insComTableData" >
        <el-table-column prop="insurercode" label="保险公司代码" center ></el-table-column>
        <el-table-column prop="insurername" label="保险公司名称" center ></el-table-column>
      </el-table>
      <div class="pagination" >
        <el-pagination @size-change="comSizeChange" @current-change='comCurrentChange' :page-sizes='sizeList' :current-page.sync="dailogCurrent" layout="total, sizes, prev, pager, next, jumper" :pager-count='5' :total="dailogRecords" :page-count="dailogPages" :page-size="5"> </el-pagination>
      </div>
    </el-dialog>
    <!-- 获取保险公司机构 -->
    <el-dialog title="保险公司机构" :before-close='insOrgClose'  :append-to-body='true' :visible.sync="insorg_dialog" width="50%" center>
      <el-table stripe @row-click='selectRowInsOrg' ref="multipleTable" :data="insOrgTableData" >
        <el-table-column prop="orgcode" label="保险机构代码" center ></el-table-column>
        <el-table-column prop="orgname" label="保险机构名称" center ></el-table-column>
      </el-table>
      <div class="pagination" >
        <el-pagination @size-change="insOrgSizeChange" @current-change='insOrgCurrentChange' :page-sizes='sizeList' :current-page.sync="dailogCurrent" layout="total, sizes, prev, pager, next, jumper" :pager-count='5' :total="dailogRecords" :page-size="5" :page-count="dailogPages"> </el-pagination>
      </div>
    </el-dialog>
    <!-- 获取投保人代码 -->
    <el-dialog title="投保人或被保人" :before-close='insManClose' :append-to-body='true' :visible.sync="insMan_dialog" width="50%" center>
      <el-form>
        <el-row >
          <el-col :span="24">
            <el-form-item>
              <ui-label-text label="客户代码或名称：" labelWidth="130" >
                <el-input slot="text" clearable v-model="searchInsMan.customerCodeOrName" ></el-input>
              </ui-label-text>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item>
              <ui-label-text label="证件号码：" labelWidth="130">
                <el-input slot="text"  clearable v-model="searchInsMan.idNumber" ></el-input>
              </ui-label-text>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div style="text-align: center; margin-bottom: 20px; "><el-button type="primary" @click.native.prevent="searchCus(1)" >查询</el-button></div>
      <el-table stripe @row-click='selectRowInsMan' ref="multipleTable" :data="insManListData">
        <el-table-column prop="custId"  label="客户Id" show-overflow-tooltip></el-table-column>
        <el-table-column prop="custName" label="客户姓名" show-overflow-tooltip></el-table-column>
        <el-table-column prop="idNumber" label="客户身份证号" show-overflow-tooltip></el-table-column>
      </el-table>
      <div class="pagination" >
        <el-pagination @size-change="insManSizeChange" small @current-change='insManCurrentChange' :current-page.sync="dailogCurrent" :pager-count='5' :page-size='5' :page-sizes='sizeList'  :total="dailogRecords" layout="total, sizes, prev, pager, next, jumper" :page-count="dailogPages"></el-pagination>
      </div>
    </el-dialog>
    <!-- 获取业务员 -->
    <el-dialog title="归属业务员" :before-close='agentClose' :append-to-body='true' :visible.sync="agentIns_dialog" width="70%" center>
      <el-form class="agent_manage_form">
        <el-row >
          <el-col :span="12">
            <el-form-item>
              <ui-label-text label="业务员代码：" labelWidth="130" >
                <el-input slot="text" clearable v-model="agentData.agentCode" ></el-input>
              </ui-label-text>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item >
              <ui-label-text label="业务员名称：" labelWidth="130" >
                <el-input slot="text"  clearable v-model="agentData.agentName" ></el-input>
              </ui-label-text>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row >
          <el-col :span="12">
            <el-form-item>
              <ui-label-text label="归属机构代码：" labelWidth="130" >
                <el-input slot="text"  clearable v-model="agentData.comCode" ></el-input>
              </ui-label-text>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item >
              <ui-label-text label="归属机构代码名称：" labelWidth="130" >
                <el-input slot="text"  v-model="agentData.comName" ></el-input>
              </ui-label-text>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div style="text-align: center; margin-bottom: 20px; "><el-button type="primary" @click.native.prevent="getAgentList(1)" >查询</el-button></div>
      <el-table stripe @row-click='selectRowAgentMod' ref="multipleTable" :data="agentListData">
        <el-table-column prop="agentCode" label="归属业务员代码" center ></el-table-column>
        <el-table-column prop="agentName" label="归属业务员名称" center ></el-table-column>
      </el-table>
      <div class="pagination" >
        <el-pagination @size-change="agentModSizeChange" small @current-change='agentModCurrentChange' :current-page.sync="dailogCurrent" :pager-count='5' :page-size='5' :page-sizes='sizeList'  :total="dailogRecords" layout="total, sizes, prev, pager, next, jumper" :page-count="dailogPages"></el-pagination>
      </div>
    </el-dialog>
    <!-- 获取险种代码 -->
    <el-dialog title="险种" :before-close='riskClose' :append-to-body='true' :visible.sync="risk_dialog" width="50%" center>
      <el-form>
        <el-row >
          <el-col :span="24">
            <el-form-item>
              <ui-label-text label="险种代码或名称：" labelWidth="130" >
                <el-input slot="text" clearable v-model="riskList.codeOrName" ></el-input>
              </ui-label-text>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div style="text-align: center; margin-bottom: 20px; "><el-button type="primary" @click.native.prevent="searchRisk(1)" >查询</el-button></div>
      <el-table @row-click='selectRowRisk' ref="multipleTable" :data="riskListData">
        <el-table-column prop="riskcode"  label="险种代码" show-overflow-tooltip></el-table-column>
        <el-table-column prop="riskname" label="险种名称" show-overflow-tooltip></el-table-column>
      </el-table>
      <div class="pagination" >
        <el-pagination @size-change="riskSizeChange" small @current-change='riskCurrentChange' :current-page.sync="dailogCurrent" :pager-count='5' :page-size='5' :page-sizes='sizeList'  :total="dailogRecords" layout="total, sizes, prev, pager, next, jumper" :page-count="dailogPages"></el-pagination>
      </div>
    </el-dialog>
    <!--新增个人客户 的弹框-->
    <el-dialog :append-to-body="true" @close='closeCus' width="70%" center title="新增个人客户" :visible.sync="isAddCus">
      <el-form :rules="addRules" ref="addCustom" :model="addCustom" class="mesg_form cus_form">
        <el-row>
          <el-col :span="12">
              <ui-label-text  label="客户编码:"  labelWidth="130"></ui-label-text>
              <ui-label-text style="margin-top:-32px;margin-left:140px"  label="系统自动生成"  labelWidth="160"></ui-label-text>
          </el-col>
          <el-col :span="12">
            <el-form-item  prop="custName" >
              <ui-label-text  :required="true"   label="客户名称:" labelWidth="130">
                <el-input clearable v-model="addCustom.custName" slot="text" ></el-input>
              </ui-label-text>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row >
          <el-col :span="12">
            <el-form-item  prop="comCode" >
              <ui-label-text  label="归属机构代码:" :required="true" labelWidth="130">
                <el-input clearable  placeholder="双击选择" @dblclick.native="getOrgInfo(1,$event,1)"  v-model="addCustom.comCode" @blur="blurOrg($event, 1)" slot="text" ></el-input>
              </ui-label-text>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item  prop="comCName" >
              <ui-label-text  label="归属机构名称:" :required="true" labelWidth="130">
                <el-input clearable :disabled="true" @blur="blurOrg($event, 1)"  v-model="addCustom.comCName" slot="text" ></el-input>
              </ui-label-text>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row >
          <el-col :span="12">
            <el-form-item  prop="paperworkType" >
              <ui-label-text  label="证件类型:" :required="true" labelWidth="130">
                <el-select @change="idNumChangeCus" v-model="addCustom.paperworkType" slot="text" placeholder="请选择">
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
            <el-form-item  prop="idNumber" >
              <ui-label-text  label="证件号码:" :required="true" labelWidth="130">
                <el-input clearable @blur="isHasCustom" v-model="addCustom.idNumber" slot="text" ></el-input>
              </ui-label-text>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row >
          <el-col :span="12">
            <el-form-item  prop="sex" >
              <ui-label-text  label="性别:"  labelWidth="130">
                <el-select v-model="addCustom.sex" slot="text" placeholder="请选择">
                  <el-option label="男" value="0"></el-option>
                  <el-option label="女" value="1"></el-option>
                </el-select>
              </ui-label-text>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item prop="identifyValiddate">
              <ui-label-text :required='true' label="证件有效期：" labelWidth="130" >
                <el-date-picker value-format="timestamp" style="width: 40%; margin-right: 9%; " :disabled="addCustom.longFlagtag" v-model="addCustom.identifyValiddate" slot="text" type="date" placeholder="选择日期"></el-date-picker>
                <el-checkbox style="display: inline-block; " slot="text" :disabled='isInput'  size='mini' v-model="addCustom.longFlagtag" @change="checkChangeCus" >终身</el-checkbox>
              </ui-label-text>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row >
          <el-col :span="12">
            <el-form-item prop="birthDate" >
              <ui-label-text :required="true"  label="出生年月" labelWidth="130" >
                <el-date-picker
                  slot="text"
                  v-model="addCustom.birthDate"
                  type="date"
                  value-format="timestamp"
                  placeholder="选择日期"> </el-date-picker>
              </ui-label-text>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item prop="familyName"  >
              <ui-label-text label="民族" labelWidth="130" >
                <el-input clearable v-model="addCustom.familyName" slot="text" ></el-input>
              </ui-label-text>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row >
          <el-col :span="12">
            <el-form-item prop="familyMembers" >
              <ui-label-text label="家庭成员" labelWidth="130" >
                <el-input clearable v-model="addCustom.familyMembers" slot="text" ></el-input>
              </ui-label-text>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item prop="familyRelation" >
              <ui-label-text label="所属关系" labelWidth="130" >
                <el-input clearable v-model="addCustom.familyRelation" slot="text" ></el-input>
              </ui-label-text>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row >
          <el-col :span="12">
            <el-form-item prop="maritalStatus"  >
              <ui-label-text  label="婚否:" labelWidth="130">
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
            <el-form-item prop="address"  >
              <ui-label-text label="地址" labelWidth="130" >
                <el-input clearable v-model="addCustom.address" slot="text" ></el-input>
              </ui-label-text>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row >
          <el-col :span="12">
            <el-form-item prop="zipCode"  >
              <ui-label-text   label="邮政编码" labelWidth="130" >
                <el-input clearable v-model="addCustom.zipCode" slot="text" ></el-input>
              </ui-label-text>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item prop="education"  >
              <ui-label-text  label="学历:"  labelWidth="130">
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
        <el-row >
          <el-col :span="12">
            <el-form-item prop="job"  >
              <ui-label-text   label="职业" labelWidth="130" >
                <el-input clearable v-model="addCustom.job" slot="text" ></el-input>
              </ui-label-text>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item prop="modelsCode"  >
              <ui-label-text   label="车型代码" labelWidth="130" >
                <el-input clearable v-model="addCustom.modelsCode" slot="text" ></el-input>
              </ui-label-text>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row >
          <el-col :span="12">
            <el-form-item prop="carNumber"  >
              <ui-label-text   label="车牌号" labelWidth="130" >
                <el-input clearable v-model="addCustom.carNumber" slot="text" ></el-input>
              </ui-label-text>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item prop="mobile"  >
              <ui-label-text   label="手机" labelWidth="130" >
                <el-input clearable v-model="addCustom.mobile" slot="text" ></el-input>
              </ui-label-text>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row >
          <el-col :span="12">
            <el-form-item prop="phone"  >
              <ui-label-text   label="固定电话" labelWidth="130" >
                <el-input clearable v-model="addCustom.phone" slot="text" ></el-input>
              </ui-label-text>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item prop="fax"  >
              <ui-label-text   label="传真" labelWidth="130" >
                <el-input clearable v-model="addCustom.fax" slot="text" ></el-input>
              </ui-label-text>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row >
          <el-col :span="12">
            <el-form-item prop="email"  >
              <ui-label-text   label="E-mail" labelWidth="130" >
                <el-input clearable v-model="addCustom.email" slot="text" ></el-input>
              </ui-label-text>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item prop="status"  >
              <ui-label-text  label="效力状态:"  labelWidth="130">
                <el-select v-model="addCustom.status" slot="text" placeholder="请选择">
                  <el-option label="无效" value="0"></el-option>
                  <el-option label="有效" value="1"></el-option>
                </el-select>
              </ui-label-text>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row >
          <el-col :span="12">
            <el-form-item prop="country"  >
              <ui-label-text   label="国籍" labelWidth="130" >
                <el-input clearable v-model="addCustom.country" slot="text" ></el-input>
              </ui-label-text>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item prop="birthplace"  >
              <ui-label-text   label="籍贯" labelWidth="130" >
                <el-input clearable v-model="addCustom.birthplace" slot="text" ></el-input>
              </ui-label-text>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row >
          <el-col :span="12">
            <el-form-item prop="weChat"  >
              <ui-label-text   label="微信号" labelWidth="130" >
                <el-input clearable v-model="addCustom.weChat" slot="text" ></el-input>
              </ui-label-text>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item prop="workingUnit"  >
              <ui-label-text   label="工作单位" labelWidth="130" >
                <el-input clearable v-model="addCustom.workingUnit" slot="text" ></el-input>
              </ui-label-text>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row >
          <el-col :span="12">
            <el-form-item prop="habitualResidence"  >
              <ui-label-text   label="经常居住地" labelWidth="130" >
                <el-input clearable v-model="addCustom.habitualResidence" slot="text" ></el-input>
              </ui-label-text>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row >
          <el-col :span="18">
            <el-form-item prop="remark"  >
              <ui-label-text   label="备注" labelWidth="130" >
                <el-input clearable type="textarea" v-model="addCustom.remark" slot="text" ></el-input>
              </ui-label-text>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div class="btn-container">
        <el-button type="primary" @click="postAddCustom">提交</el-button>
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
    <!-- 金额提示 -->
    <el-dialog title="提示" center :append-to-body='true' :visible.sync="isTrue" width="30%" >
      <p style="text-align: center; ">此金额值不大于0，确定继续?</p>
      <span slot="footer" class="dialog-footer">
        <el-button @click="calBtn">取 消</el-button>
        <el-button type="primary" @click="trueBtn">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import NoticeBar from '@/components/notice-bar'
import LabelText from '@/components/label-text'
import LineTittle from '@/components/line-tittle'
import IsEmpty from '@/utils/IsEmpty'
import moment from 'moment'
import { mapActions } from 'vuex'
export default {
  name: '',
  data () {
    const { emptyValidator, noValidator, nameValidator, letterNumber, PostValidator, IdValidator, insurtypeaddPremiumValidator2, insModPremiumValidator, PhoneValidator, phoneNumberValidator, emailValidator } = this.$store.getters.validators
    return {
      isContinue: true,
      isTrue: false,
      isEdit: true,
      IdValidator: IdValidator,
      emptyValidator: emptyValidator,
      noValidator: noValidator,
      rule: {
        'lifePCMainCondition.proposalNo4': letterNumber,
        'lifePCMainCondition.policyNo4': emptyValidator,
        'lifePCMainCondition.proposalDate': emptyValidator,
        'lifePCMainCondition.acceptDate': emptyValidator,
        'lifePCMainCondition.generateDate': emptyValidator,
        'lifePCMainCondition.companyCode': emptyValidator,
        'lifePCMainCondition.companyName': emptyValidator,
        'lifePCMainCondition.companyComCode': emptyValidator,
        'lifePCMainCondition.companyComName': emptyValidator,
        'lifePCMainCondition.byMyself': emptyValidator,
        'lifePCMainCondition.singleMode': emptyValidator,
        'lifePartyCondition.insureName': emptyValidator, // 投保人
        'lifePartyCondition.postNo': PostValidator, // 邮编
        'lifePartyCondition.identifyType': emptyValidator, // 身份证类型
        'lifePartyCondition.identifyNumber': IdValidator, // 身份证号
        'lifePartyCondition.identifyValiddate': emptyValidator, // 出生日期
        'lifePartyCondition.insuredrName': [], // 关系名称
        'lifePartyCondition.insuredrType': emptyValidator,
        'lifePCMainCondition.handlerCode': emptyValidator,
        'lifePartyCondition.insureTel': PhoneValidator,
        'lifePartyCondition.mobilePhone': phoneNumberValidator,
        'lifePartyCondition.e_mail': emailValidator
      },
      rules: {
        name: emptyValidator,
        typeD: emptyValidator,
        identifyNumberD: emptyValidator,
        identifyValiddateD: emptyValidator,
        insureTelD: PhoneValidator,
        mobilePhoneD: phoneNumberValidator,
        postNoD: PostValidator
      },
      sgRules: {
        partyName: nameValidator,
        identifyType: emptyValidator,
        identifyNumber: emptyValidator,
        identifyValiddate: emptyValidator,
        sex: emptyValidator,
        birthdate: emptyValidator,
        beneficialOrder: emptyValidator,
        benefitShare: emptyValidator,
        insuredrType: emptyValidator,
        insuredrName: []
      },
      riskRules: {
        riskCode: emptyValidator,
        riskName: emptyValidator,
        paymentPeriod: emptyValidator,
        payrate: emptyValidator,
        premium: insurtypeaddPremiumValidator2,
        paidPremium: insurtypeaddPremiumValidator2,
        riskPremium: insModPremiumValidator,
        addPremium: insModPremiumValidator
      },
      searchData: {
        handlerCode: '',
        handlerName: '',
        comCode: '',
        comName: '',
        companyCode: '',
        companyName: '',
        daterange: [],
        acceptDate1: '',
        acceptDate2: ''
      }, // 查询条件
      postList: {},
      billTableData: [], // 查询批处理结果
      isShowTable: false, // 是否显示查询结果
      current: 1, // 当前页
      totalRecords: 0, // 总条数
      totalPages: 0, // 总页数
      pageSize: 5, // 每页显示条数
      selectItem: [], // 选中数据
      isModify: false, // 是否修改
      BillNoList: { // 保单详情
        lifePCMainCondition: {
          policyNo: '',
          proposalDate: '',
          acceptDate: '',
          generateDate: '',
          companyCode: '',
          companyName: '',
          companyComCode: '',
          companyComName: '',
          byMyself: '',
          singleMode: '',
          handlerCode: ''
        }, // 基本信息
        lifePartyCondition: {
          postNo: '',
          insureTel: '',
          identifyNumber: '',
          identifyType: '',
          identifyValiddate: '',
          insuredrName: '',
          serialNo: '1'
        }, // 投保人信息
        lifePartyConditionDList: [
          { insureNameD: '', longFlagTag: false, identifyTypeD: '', identifyNumberD: '', identifyValiddate: '', insureTelD: '' }
        ], // 被保险人
        lifePartyTConditionList: [
          {
            'partyName': '',
            'identifyType': '',
            'identifyNumber': '',
            'identifyValiddate': '',
            'sex': '',
            'longFlag': 0,
            'longFlagtag': false,
            'longFlagTag': false,
            'birthdate': '',
            'remark': '',
            'beneficialOrder': '',
            'benefitShare': '',
            'insuredrType': '',
            'insuredrName': ''
          }
        ], // 身故受益人
        lifePartyAConditionList: [], // 生存受益人
        lifeCItemKindConditionList: [], // 险种信息
        lifeFeeCondition: {}, // 缴费信息
        lifeChargeConditionList: [] // 缴费明细
      }, // 保单号信息
      agent_dialog: false, // 业务员弹框
      agentTableData: [], // 业务员数据
      sizeList: [], // 每页显示条数
      dailogRecords: 0,
      dailogPages: 0,
      dailogSize: 5,
      dailogCurrent: 1,
      org_dialog: false,
      orgTableData: [],
      comCodeOrName: '',
      insComTableData: [],
      com_dialog: false,
      isComType: '', // 归属保险公司
      insorg_dialog: false,
      insOrgTableData: [],
      isInput: false,
      insMan_dialog: false,
      searchInsMan: {
      }, // 投保人弹框信息
      insManListData: [], // 投保人弹框数据
      insManType: '',
      itemIndex: '', // 记录点击
      agentIns_dialog: false,
      agentData: {},
      agentListData: [],
      risk_dialog: false, // 是否显示险种弹框
      riskList: {},
      riskListData: [], // 险种数据
      riskIndex: '',
      riskTag: '',
      isAddCus: false,
      loading: '',
      addCustom: {
        custName: '',
        comCode: '',
        comCName: '',
        paperworkType: '',
        idNumber: '',
        birthDate: '',
        isLongFlag: '0',
        longFlagtag: false,
        identifyValiddate: '',
        zipCode: '',
        phone: '',
        mobile: ''
      },
      addRules: {
        custName: nameValidator,
        comCode: emptyValidator,
        comCName: emptyValidator,
        idNumber: emptyValidator,
        birthDate: emptyValidator,
        phone: PhoneValidator,
        mobile: phoneNumberValidator
      },
      orgTag: '',
      bankSearch: [], //  银行数据
      isDelete: false
    }
  },
  mounted () {
    this.$nextTick(function () {
      // 初始化数据
      this.getDate()
    })
  },
  methods: {
    searchBillResult (page) { // 保单查询
      if (!IsEmpty(this.searchData.daterange)) {
        this.searchData.acceptDate1 = this.searchData.daterange[0]
        this.searchData.acceptDate2 = this.searchData.daterange[1]
      } else {
        this.searchData.acceptDate1 = ''
        this.searchData.acceptDate2 = ''
      }
      this.current = page
      this.searchData.currentPage = page
      this.searchData.pageSize = this.pageSize
      this.postList = JSON.parse(JSON.stringify(this.searchData))
      this.searchPost(this.searchData)
    },
    searchPost (data) {
      this.Loading()
      this.searchBillList_Mod({'lifePCMainCondition': data}).then(resp => {
        this.closeLoading()
        if (resp.code === '000000') {
          this.billTableData = resp.data.content
          this.isShowTable = true
          this.totalRecords = resp.data.totalElements
          this.totalPages = resp.data.totalPages
        } else {
          this.open('error', resp.msg)
        }
      }).catch(() => {
        // this.open('error', '系统错误，请刷新重试！')
        this.closeLoading()
      })
    },
    handleCurrentChange (val) {
      this.current = val
      this.postList.currentPage = val
      this.searchPost(this.postList)
    },
    searchSizeChange (val) {
      this.pageSize = val
      this.current = 1
      this.postList.currentPage = 1
      this.postList.pageSize = val
      this.searchPost(this.postList)
    },
    handleSelectionChange (row) {
      this.selectItem = JSON.parse(JSON.stringify(row))
    },
    deleteBtn () {
      if (this.selectItem.length > 0) {
        this.isDelete = true
      } else {
        this.open('error', '请选择一条记录！')
      }
    },
    deleteTrue () {
      let postData = []
      this.selectItem.forEach((item, index) => {
        postData.push(item.policyNo)
      })
      this.Loading()
      this.deletePolicy({'policyNos': postData}).then(resp => {
        this.closeLoading()
        if (resp.code === '000000') {
          this.open('success', '删除成功')
          this.isDelete = false
        } else {
          this.open('error', resp.msg)
        }
      })
    },
    modifyBtn () { // 点击修改
      if (this.selectItem.length > 0 && this.selectItem.length < 2) {
        this.Loading()
        this.searchBillNoDetail({'policyNo': this.selectItem[0].policyNo}).then(resp => {
          this.closeLoading()
          if (resp.code === '000000') {
            this.isModify = true
            this.BillNoList.lifePCMainCondition = resp.data.lifePCMainCondition // 基本信息
            if (this.BillNoList.lifePCMainCondition.hfStatus === '未回访') {
              this.BillNoList.lifePCMainCondition.hfStatus = ''
            }
            this.getDate()
            this.BillNoList.lifePartyCondition = resp.data.lifePartyCondition // 投保人信息
            if (this.BillNoList.lifePartyCondition.insuredrType === '5') {
              this.isEdit = false
              this.rule['lifePartyCondition.insuredrName'] = this.emptyValidator
            } else {
              this.isEdit = true
              this.rule['lifePartyCondition.insuredrName'] = []
            }
            this.BillNoList.lifePartyCondition.longFlagTag = false
            if (this.BillNoList.lifePartyCondition.longFlag === 0 || IsEmpty(this.BillNoList.lifePartyCondition.longFlag)) { // 身份证是否长 期有效
              this.$set(this.BillNoList.lifePartyCondition, 'longFlagtag', false)
              this.rule['lifePartyCondition.identifyValiddate'] = this.emptyValidator
              // item.longFlag = false
            } else {
              this.rule['lifePartyCondition.identifyValiddate'] = []
              this.$set(this.BillNoList.lifePartyCondition, 'longFlagtag', true)
              // item.longFlag = true
            }
            if (!IsEmpty(resp.data.lifePartyConditionDList)) {
              this.BillNoList.lifePartyConditionDList = resp.data.lifePartyConditionDList // 被保险人信息
              this.BillNoList.lifePartyConditionDList.forEach((item, index) => {
                if (this.BillNoList.lifePartyCondition.insuredrType === '1') { // 与投保人关系为本人
                  // this.$set(item, 'longFlagTag', true)
                  this.$set(item, 'isInput', true)
                  this.$set(item, 'isclick', true)
                } else {
                  this.$set(item, 'isInput', false)
                  this.$set(item, 'isclick', false)
                }
                if (item.longFlagD === 0 || IsEmpty(item.longFlagD)) { // 身份证是否长 期有效
                  this.$set(item, 'longFlagtag', false)
                  this.$set(item, 'longFlagTag', false)
                } else {
                  this.$set(item, 'longFlagtag', true)
                  this.$set(item, 'longFlagTag', true)
                }
              })
            } else {
              this.BillNoList.lifePartyConditionDList = []
              this.addInsured()
            }
            if (!IsEmpty(resp.data.lifePartyTConditionList)) {
              this.BillNoList.lifePartyTConditionList = resp.data.lifePartyTConditionList // 身故受益人信息
              this.BillNoList.lifePartyTConditionList.forEach((item, index) => {
                if (item.longFlag === 0 || IsEmpty(item.longFlag)) { // 身份证是否长 期有效
                  this.$set(item, 'longFlagtag', false)
                  // item.longFlag = false
                } else {
                  this.$set(item, 'longFlagtag', true)
                  // item.longFlag = true
                }
                if (item.insuredrType === '5') { // 关系名称
                  this.$set(item, 'isEdit', false)
                  // item.longFlag = false
                } else {
                  this.$set(item, 'isEdit', true)
                }
              })
            }
            if (!IsEmpty(resp.data.lifePartyAConditionList)) {
              this.BillNoList.lifePartyAConditionList = resp.data.lifePartyAConditionList // 生存收益人信息
              this.BillNoList.lifePartyAConditionList.forEach((item, index) => {
                if (item.longFlag === 0 || IsEmpty(item.longFlag)) { // 身份证是否长 期有效
                  this.$set(item, 'longFlagtag', false)
                  // item.longFlag = false
                } else {
                  this.$set(item, 'longFlagtag', true)
                  // item.longFlag = true
                }
              })
            }
            if (!IsEmpty(resp.data.lifeCItemKindConditionList)) {
              resp.data.lifeCItemKindConditionList.forEach((item, index) => { // 险种
                if (item.freeFlag === '1') { // 是否是豁免险
                  this.$set(item, 'isHmRisk', false)
                } else {
                  this.$set(item, 'isHmRisk', true)
                }
                if (item.tbrFreeFlag === '0' || item.tbrFreeFlag === null || item.tbrFreeFlag === 'null') {
                  item.tbrFreeFlagtag = false
                } else {
                  item.tbrFreeFlagtag = true
                }
                if (item.bbrFreeFlag === '0' || item.bbrFreeFlag === null || item.bbrFreeFlag === 'null') {
                  item.bbrFreeFlagtag = false
                } else {
                  item.bbrFreeFlagtag = true
                }
                if (item.lifeFlag === 0 || item.lifeFlag === null || item.lifeFlag === 'null') {
                  this.$set(item, 'lifeFlagtag', false)
                } else {
                  this.$set(item, 'lifeFlagtag', true)
                }
                if (item.addPremium === null) {
                  item.addPremium = ''
                }
                // if (item.feeFlag === 0 || item.feeFlag === null) {
                //   this.$set(item, 'feeFlagTag', false)
                //   // item.feeFlag = false
                // } else {
                //   this.$set(item, 'feeFlagTag', true)
                //   // item.feeFlag = true
                // }
              })
              this.BillNoList.lifeCItemKindConditionList = resp.data.lifeCItemKindConditionList // 险种信息
            }
            this.BillNoList.lifeFeeCondition = resp.data.lifeFeeCondition // 缴费信息
            if (this.BillNoList.lifeFeeCondition === null) {
              this.BillNoList.lifeFeeCondition = {}
            }
            this.BillNoList.lifeChargeConditionList = resp.data.lifeChargeConditionList // 缴费明细
          } else {
            this.open('error', resp.msg)
          }
        }).catch(() => {
          // this.open('error', '系统错误，请刷新重试！')
          this.closeLoading()
        })
      } else {
        if (this.selectItem.length === 0) {
          this.open('error', '请选择一条记录！')
        } else if (this.selectItem.length > 1) {
          this.open('error', '只能勾选一条记录！')
        }
      }
    },
    modifyPut () { // 确认修改
      this.isContinue = true
      // 基本信息
      if (this.BillNoList.lifePCMainCondition.policyStatus === '3') { // 拒保
        if (this.BillNoList.lifePCMainCondition.proposalNo !== this.BillNoList.lifePCMainCondition.policyNo) {
          this.open('error', '拒保操作时，投保单号和保单号必须一致，请调整！')
          return false
        }
      }
      // 投保人
      this.BillNoList.lifePartyCondition.serialNo = '1'
      let insureAge = this.GetAge(this.BillNoList.lifePartyCondition.identifyNumber)
      if (insureAge < 18) {
        this.open('error', '投保人必须年满18岁!')
        return false
      }
      if (insureAge >= 18 && this.BillNoList.lifePartyCondition.identifyType === '2') {
        this.open('error', '年满18周岁不能选择户口本！')
        return false
      }
      let sexInsure = this.GetSex(this.BillNoList.lifePartyCondition.identifyNumber)
      let birthInsure = this.GetBirth(this.BillNoList.lifePartyCondition.identifyNumber)
      if (sexInsure !== '2') {
        if (sexInsure !== this.BillNoList.lifePartyCondition.sexType) {
          this.open('error', '投保人性别与身份证号不一致，请检查！')
          return false
        }
      }
      if (birthInsure !== 0) {
        birthInsure = birthInsure.replace('-', '/')
        birthInsure = new Date(birthInsure)
        birthInsure = birthInsure.getTime()
        if (birthInsure !== this.BillNoList.lifePartyCondition.birthDate) {
          this.open('error', '投保人出生日期与身份证号不一致，请检查！')
          this.isContinue = false
          return false
        }
      }
      if (this.BillNoList.lifePartyCondition.longFlagtag) { // 身份证是否长 期有效 投保人
        this.BillNoList.lifePartyCondition.longFlag = 1
      } else {
        this.BillNoList.lifePartyCondition.longFlag = 0
      }
      let regIdCard = /^(^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$)|(^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])((\d{4})|\d{3}[Xx])$)$/
      let insured = 0
      this.BillNoList.lifePartyConditionDList.forEach((item, index) => { // 被保险人
        if (item.longFlagtag) { // 身份证是否长期有效
          item.longFlag = 1
        } else {
          if (item.identifyValiddateD === '' || item.identifyValiddateD === undefined || item.identifyValiddateD === null) {
            // this.open('error', '第' + num + '个被保险人证件有效期必填！')
            this.isContinue = false
            insured = 1
            return false
          }
          item.longFlag = 0
        }
        if (item.identifyTypeD === '1' || item.identifyTypeD === '2') {
          if (!regIdCard.test(item.identifyNumberD)) {
            // this.open('error', '第' + num + '个被保险人身份证号格式错误！')
            this.isContinue = false
            insured = 2
            return false
          }
        }
        let insuredAge = this.GetAge(item.identifyNumberD)
        if (insuredAge >= 18 && item.identifyTypeD === '2') {
          // this.open('error', '年满18周岁不能选择户口本！')
          insured = 3
          this.isContinue = false
          return false
        }
        if (item.identifyTypeD === '2' || item.identifyTypeD === '1') {
          let sexInsured = this.GetSex(item.identifyNumberD)
          let birthInsured = this.GetBirth(item.identifyNumberD)
          // birthInsured = birthInsured.replace('-', '/')
          if (sexInsured !== '2') {
            if (sexInsured !== item.sexTypeD) {
              // this.open('error', '被保险人性别与身份证号不一致，请检查！')
              insured = 4
              this.isContinue = false
              return false
            }
          }
          if (birthInsured !== 0) {
            let temp1 = new Date(item.birthDateD)
            let uibirthDateD = moment(temp1).format('YYYY-MM-DD')
            console.log(uibirthDateD)
            console.log(birthInsured)
            if (birthInsured !== uibirthDateD) {
              insured = 5
              // this.open('error', '被保险人出生日期与身份证号不一致，请检查！')
              this.isContinue = false
              return false
            }
          }
        }
      })
      if (insured === 1) {
        this.open('error', '保险人证件有效期必填')
        this.isContinue = false
        return false
      } else if (insured === 2) {
        this.open('error', '被保险人身份证号格式错误！')
        this.isContinue = false
        return false
      } else if (insured === 3) {
        this.open('error', '年满18周岁不能选择户口本！')
        this.isContinue = false
        return false
      } else if (insured === 4) {
        this.open('error', '被保险人性别与身份证号不一致，请检查！')
        this.isContinue = false
        return false
      } else if (insured === 5) {
        this.open('error', '被保险人出生日期与身份证号不一致，请检查！')
        this.isContinue = false
        return false
      }
      let countAll = [0, 0, 0, 0, 0]
      let countIndex = []
      let sgTag = 0
      if (this.BillNoList.lifePCMainCondition.sgFlag === 2) { // 指定受益人
        if (!IsEmpty(this.BillNoList.lifePartyTConditionList)) {
          this.BillNoList.lifePartyTConditionList.forEach((item, index) => { // 身故受益人
            // let sgNum = index + 1
            if (item.insuredrType === '5' || item.insuredrType === 5) {
              if (item.insuredrName === '') {
                // this.open('error', '身故受益人关系名称必填！')
                sgTag = 1
                this.isContinue = false
                return false
              }
            }
            let sexSg = this.GetSex(item.identifyNumber)
            let birthSg = this.GetBirth(item.identifyNumber)
            if (item.identifyType === '1' || item.identifyType === '2') {
              if (!regIdCard.test(item.identifyNumber)) {
                // this.open('error', '身故受益人身份证号格式错误！')
                sgTag = 2
                this.isContinue = false
                return false
              }
              if (sexSg !== '2') {
                if (sexSg !== item.sex) {
                  sgTag = 3
                  // this.open('error', '身故受益人性别与身份证号不一致，请检查！')
                  this.isContinue = false
                  return false
                }
              }
              if (birthSg !== 0) {
                if (birthSg !== item.birthdate) {
                  sgTag = 4
                  // this.open('error', '身故受益人出生日期与身份证号不一致，请检查！')
                  this.isContinue = false
                  return false
                }
              }
            }
            let sgAge = this.GetAge(item.identifyNumber)
            if (sgAge >= 18 && item.identifyType === '2') {
              // this.open('error', '年满18周岁不能选择户口本！')
              sgTag = 5
              this.isContinue = false
              return false
            }
            if (item.longFlagtag) {
              item.longFlag = 1
            } else {
              item.longFlag = 0
              if (item.identifyValiddate === '' || item.identifyValiddate === undefined || item.identifyValiddate === null) {
                // this.open('error', '身故受益人证件有效期必填！')
                sgTag = 6
                this.isContinue = false
                return false
              }
            }
            countIndex.push(Number(item.beneficialOrder) - 1)
            switch (item.beneficialOrder) {
              case '1':
                countAll[0] += isNaN(parseFloat(item.benefitShare)) ? 0 : parseFloat(item.benefitShare)
                break
              case '2':
                countAll[1] += isNaN(parseFloat(item.benefitShare)) ? 0 : parseFloat(item.benefitShare)
                break
              case '3':
                countAll[2] += isNaN(parseFloat(item.benefitShare)) ? 0 : parseFloat(item.benefitShare)
                break
              case '4':
                countAll[3] += isNaN(parseFloat(item.benefitShare)) ? 0 : parseFloat(item.benefitShare)
                break
              case '5':
                countAll[4] += isNaN(parseFloat(item.benefitShare)) ? 0 : parseFloat(item.benefitShare)
                break
              default:
                break
            }
          })
          if (sgTag === 1) {
            this.open('error', '身故受益人关系名称必填！')
            this.isContinue = false
            return false
          } else if (sgTag === 2) {
            this.open('error', '身故受益人身份证号格式错误！')
            this.isContinue = false
            return false
          } else if (sgTag === 3) {
            this.open('error', '身故受益人性别与身份证号不一致，请检查！')
            this.isContinue = false
            return false
          } else if (sgTag === 4) {
            this.open('error', '身故受益人出生日期与身份证号不一致，请检查！')
            this.isContinue = false
            return false
          } else if (sgTag === 5) {
            this.open('error', '年满18周岁不能选择户口本！')
            this.isContinue = false
            return false
          } else if (sgTag === 6) {
            this.open('error', '身故受益人证件有效期必填！')
            this.isContinue = false
            return false
          }
          for (let i = 0; i < countAll.length; i++) {
            if (countAll[i] !== 100 && countIndex.indexOf(i) !== -1) {
              this.isContinue = false
              this.open('error', '身故受益人同一受益顺序的受益份额整合必须为100%！')
              return false
            }
          }
        } else {
          this.open('error', '请添加指定受益人信息！')
          return false
        }
      } else {
        this.BillNoList.lifePartyTConditionList = []
      }
      let countAllSc = [0, 0, 0, 0, 0]
      let countIndexSc = []
      let scTag = 0
      if (this.BillNoList.lifePCMainCondition.scFlag === 3) {
        this.BillNoList.lifePartyAConditionList.forEach((item, index) => { // 生存受益人
          if (item.identifyType === '1' || item.identifyType === '2') {
            if (!regIdCard.test(item.identifyNumber)) {
              this.isContinue = false
              scTag = 1
              return false
            }
            let sexSc = this.GetSex(item.identifyNumber)
            let birthSc = this.GetBirth(item.identifyNumber)
            if (sexSc !== '2') {
              if (sexSc !== item.sex) {
                this.isContinue = false
                scTag = 2
                return false
              }
            }
            if (birthSc !== 0) {
              if (birthSc !== item.birthdate) {
                this.isContinue = false
                scTag = 3
                return false
              }
            }
          }
          let scAge = this.GetAge(item.identifyNumber)
          if (scAge >= 18 && item.identifyType === '2') {
            scTag = 4
            return false
          }
          if (item.longFlagtag) {
            item.longFlag = 1
          } else {
            item.longFlag = 0
            if (item.identifyValiddate === '' || item.identifyValiddate === undefined || item.identifyValiddate === null) {
              scTag = 5 // 生存受益人证件有效期必填
              return
            }
          }
          countIndexSc.push(Number(item.beneficialOrder) - 1)
          switch (item.beneficialOrder) {
            case '1':
              countAllSc[0] += isNaN(parseFloat(item.benefitShare)) ? 0 : parseFloat(item.benefitShare)
              break
            case '2':
              countAllSc[1] += isNaN(parseFloat(item.benefitShare)) ? 0 : parseFloat(item.benefitShare)
              break
            case '3':
              countAllSc[2] += isNaN(parseFloat(item.benefitShare)) ? 0 : parseFloat(item.benefitShare)
              break
            case '4':
              countAllSc[3] += isNaN(parseFloat(item.benefitShare)) ? 0 : parseFloat(item.benefitShare)
              break
            case '5':
              countAllSc[4] += isNaN(parseFloat(item.benefitShare)) ? 0 : parseFloat(item.benefitShare)
              break
            default:
              break
          }
        })
        if (scTag === 1) {
          this.open('error', '生存受益人身份证号格式错误')
          this.isContinue = false
          return false
        } else if (scTag === 2) {
          this.open('error', '生存受益人性别与身份证号不一致，请检查！')
          this.isContinue = false
          return false
        } else if (scTag === 3) {
          this.open('error', '生存受益人出生日期与身份证号不一致，请检查！')
          this.isContinue = false
          return false
        } else if (scTag === 4) {
          this.open('error', '年满18周岁不能选择户口本！')
          this.isContinue = false
          return false
        } else if (scTag === 5) {
          this.open('error', '生存受益人证件有效期必填！')
          this.isContinue = false
          return false
        }
        for (let i = 0; i < countAllSc.length; i++) {
          if (countAllSc[i] !== 100 && countIndexSc.indexOf(i) !== -1) {
            this.isContinue = false
            this.open('error', '生存受益人同一受益顺序的受益份额整合必须为100%！')
            return false
          }
        }
      } else {
        this.BillNoList.lifePartyAConditionList = []
      }
      let mainRisk = [] // 主险
      let fjRisk = [] // 附加险
      let hmRisk = [] // 豁免险
      if (this.BillNoList.lifeCItemKindConditionList.length <= 0) {
        this.open('error', '请选择一个险种信息！')
        return false
      } else {
        this.BillNoList.lifeCItemKindConditionList.forEach((item, index) => { // 险种
          if (item.mainFlag === '1') {
            mainRisk.push(item)
          } else if (item.mainFlag === '0') { // 附加险
            fjRisk.push(item)
          }
          if (item.startDate === '' || item.startDate === undefined || item.startDate === null) {
            this.open('error', '险种保险期间开始时间必填！')
            this.isContinue = false
            return false
          } else if (item.lifeFlagtag === false && item.endDate === '') {
            this.isContinue = false
            this.open('error', '险种保险期间结束时间必填！')
            return false
          } else if (item.endDate !== '' && item.lifeFlagtag === false) {
            if ((item.startDate > item.endDate)) {
              this.open('error', '险种保险期间开始时间不能大于结束时间！')
              this.isContinue = false
              return false
            }
          }
          if (item.lifeFlagtag === true) {
            item.lifeFlag = '1'
          } else {
            item.lifeFlag = '0'
          }
          if (item.tbrFreeFlagtag === true) {
            item.tbrFreeFlag = '1'
          } else {
            item.tbrFreeFlag = '0'
          }
          if (item.bbrFreeFlagtag === true) {
            item.bbrFreeFlag = '1'
          } else {
            item.bbrFreeFlag = '0'
          }
          if (item.freeFlag === '1') { // 豁免险
            item.feeFlag = '1'
            if (!item.tbrFreeFlagtag && !item.bbrFreeFlagtag) {
              this.open('error', '豁免险豁免人需勾选一个！')
              this.isContinue = false
              return false
            }
            if (item.mainFlag !== '1') {
              hmRisk.push(item)
            }
          }
        })
        if (!this.isContinue) {
          return false
        }
      }
      if (mainRisk.length <= 0) {
        this.open('error', '必须选择一个主险！')
        this.isContinue = false
        return false
      }
      let fjContinue = true
      let hmContinue = true
      fjRisk.forEach((item, index) => {
        mainRisk.forEach((list, i) => {
          var fjItem = item.paymentPeriod
          var mainItem = list.paymentPeriod
          if (Number(fjItem) > Number(mainItem)) { // 附加险大于主险期限
            fjContinue = false
          }
        })
      })
      hmRisk.forEach((item, index) => {
        if (item.feeFlagTag) {
        }
        mainRisk.forEach((list, i) => {
          if ((list.paymentPeriod - item.paymentPeriod) < 1) { // 附加险大于主险期限
            hmContinue = false
          }
        })
      })
      if (!fjContinue) {
        this.$confirm('附加险缴费年期不能超过主险缴费年期, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          if (!hmContinue) {
            this.$confirm('豁免险的缴费年期需要比主险缴费年期至少小一年, 是否继续?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              this.postBill()
            }).catch(() => {
            })
          } else {
            this.postBill()
          }
        }).catch(() => {
        })
      } else if (!hmContinue) {
        this.$confirm('豁免险的缴费年期需要比主险缴费年期至少小一年, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.postBill()
        })
      } else {
        this.postBill()
      }
    },
    postBill () {
      this.$refs['BillNoList'].validate((valid) => {
        if (valid && this.isContinue) {
          if (this.BillNoList.lifePCMainCondition.sgFlag === '1') {
            this.BillNoList.lifePartyTConditionList = []
          }
          if (this.BillNoList.lifePCMainCondition.scFlag === '1' || this.BillNoList.lifePCMainCondition.scFlag === '2') {
            this.BillNoList.lifePartyAConditionList = []
          }
          this.Loading()
          this.firstPolicyModify(this.BillNoList).then(resp => {
            this.closeLoading()
            if (resp.code === '000000') {
              this.isModify = false
              this.open('success', '修改成功！')
            } else {
              this.open('error', resp.msg)
            }
          }).catch(() => {
            // this.open('error', '系统错误，请刷新重试！')
            this.closeLoading()
          })
        } else {
          this.open('error', '页面信息填写有误，请检查！')
        }
      })
    },
    addInsured () { // 添加被保险人
      let addPost = {
        insureNoD: '',
        isInput: false,
        isclick: false,
        insureNameD: '',
        insureAddressD: '',
        identifyTypeD: '',
        identifyNumberD: '',
        identifyValiddate: '',
        postNoD: '',
        sexTypeD: '',
        countryD: '',
        educationCodeD: '',
        marriageD: '',
        birthDateD: '',
        remark: '',
        identifyNameD: '',
        longFlagD: '',
        insureTelD: '',
        serialNoD: '2',
        mobilePhoneD: '',
        workingUnitD: '',
        jobD: '',
        e_mailD: '',
        weixinD: '',
        habitualResidenceD: ''
      }
      this.BillNoList.lifePartyConditionDList.push(addPost)
    },
    deletInsured (index) { // 删除被保险人
      if (index === 0) {
        this.open('error', '至少保留一个被保险人！')
        return false
      }
      this.BillNoList.lifePartyConditionDList.splice(index, 1)
    },
    addSgItem () { // 添加身故人信息
      let addPost = {
        'partyName': '',
        'identifyType': '',
        'identifyNumber': '',
        'identifyValiddate': '',
        'sex': '',
        'longFlag': 0,
        'longFlagtag': false,
        'isEdit': false,
        'birthdate': '',
        'remark': '',
        'beneficialOrder': '',
        'benefitShare': '',
        'insuredrType': '',
        'insuredrName': ''
      }
      this.BillNoList.lifePartyTConditionList.push(addPost)
    },
    addScBenefit () { // 添加生存受益人信息
      let addPost = {
        'partyName': '',
        'identifyType': '',
        'identifyNumber': '',
        'identifyValiddate': '',
        'longFlag': 0,
        'longFlagtag': false,
        'sex': '',
        'birthdate': '',
        'remark': '',
        'beneficialOrder': '',
        'benefitShare': '',
        'insuredrType': '',
        'insuredrName': '',
        'phone': '',
        'habitualResidence': ''
      }
      this.BillNoList.lifePartyAConditionList.push(addPost)
      console.log(this.BillNoList.lifePartyTConditionList)
    },
    addRiskItem (index) { // 添加险种信息
      let addPost = {
        'riskCode': '',
        'riskName': '',
        'mainFlag': '',
        'paymentPeriod': '',
        'payrate': '',
        'premium': '',
        'riskPremium': '',
        'number': 0,
        'addPremium': '',
        'freeDate': '',
        'tbrFreeFlag': '',
        'bbrFreeFlag': '',
        'startDate': '',
        'endDate': '',
        'lifeFlag': '',
        'lifeFlagtag': false
      }
      this.BillNoList.lifeCItemKindConditionList.push(addPost)
    },
    addFeeItem (index) { // 添加险种信息
      let addPost = {
        'riskCode': '',
        'riskName': '',
        'paidPremium': '',
        'payDate': '',
        'pariskStatusyrate': ''
      }
      this.BillNoList.lifeChargeConditionList.push(addPost)
    },
    deletSgItem (index) { // 删除身故人信息
      this.BillNoList.lifePartyTConditionList.splice(index, 1)
    },
    deletScItem (index) { // 删除生存人信息
      this.BillNoList.lifePartyAConditionList.splice(index, 1)
    },
    deletRiskItem (index) { // 删除险种信息
      console.log(index)
      this.BillNoList.lifeCItemKindConditionList.splice(index, 1)
    },
    deletFeeItem (index) { // 删除缴费明细信息
      this.BillNoList.lifeChargeConditionList.splice(index, 1)
    },
    closeDailog () {
      return new Promise((resolve, reject) => {
        this.agent_dialog = false
        this.com_dialog = false
        this.org_dialog = false
        this.risk_dialog = false
        resolve()
      })
    },
    getInfoAgent (page) { // 获取业务员
      this.dailogCurrent = page
      let postData = {
        'agentCode': this.searchData.handlerCode,
        'agentName': this.searchData.handlerName,
        'comCode': '',
        'comName': '',
        'currentPage': page,
        'pageSize': this.dailogSize,
        'clickType': '2'
      }
      this.agentFind(postData).then(resp => {
        if (resp.code === '000000') {
          this.sizeList = [5, 10, 20, 50]
          this.agent_dialog = true
          this.agentTableData = resp.data.data
          this.dailogRecords = resp.data.totalRecords
          this.dailogPages = resp.data.totalPages
        } else {
          this.open('error', resp.msg)
        }
      })
    },
    blurAgent (tag, event) { // 判断业务员是否存在
      if (event.target.value === '' || this.agent_dialog) {
        return false
      }
      let code = ''
      let name = ''
      if (tag === 0) {
        code = this.searchData.handlerCode
      } else {
        name = this.searchData.handlerName
      }
      let postData = {
        'agentCode': code,
        'agentName': name,
        'comCode': '',
        'comName': '',
        'currentPage': '1',
        'pageSize': '5',
        'clickType': '1'
      }
      this.agentFind(postData).then(resp => {
        if (resp.code === '000000') {
          this.searchData.handlerCode = resp.data.data[0].agentCode
          this.searchData.handlerName = resp.data.data[0].agentName
          this.searchData.comCode = resp.data.data[0].comCode
          this.searchData.comName = resp.data.data[0].comName
        } else {
          this.searchData.handlerCode = ''
          this.searchData.handlerName = ''
          this.searchData.comCode = ''
          this.searchData.comName = ''
          this.open('error', resp.msg)
        }
      })
    },
    agentSizeChange (val) { // 业务员每页显示条数
      this.dailogSize = val
      this.getInfoAgent(1)
    },
    agentCurrentChange (val) { // 业务员翻页
      this.dailogCurrent = val
      this.getInfoAgent(val)
    },
    selectRowAgent (row) { // 业务员选择
      this.closeDailog().then(() => {
        row = JSON.parse(JSON.stringify(row))
        this.searchData.handlerCode = row.agentCode
        this.searchData.handlerName = row.agentName
        this.searchData.comCode = row.comCode
        this.searchData.comName = row.comName
        this.agent_dialog = false
      })
    },
    closeAgent () { // 关闭弹窗
      this.sizeList = []
      this.agent_dialog = false
      this.searchData.handlerCode = ''
      this.searchData.handlerName = ''
      this.searchData.comCode = ''
      this.searchData.comName = ''
    },
    getOrgInfo (page, event, tag) { // 机构查询
      this.sizeList = [5, 10, 20, 50]
      this.dailogCurrent = page
      this.orgTag = tag
      if (event) {
        this.comCodeOrName = event.target.value
      }
      var dataOrg = {
        'comCodeOrName': this.comCodeOrName,
        'currentPage': page,
        'pageSize': this.dailogSize,
        'clickType': '2'
      }
      this.getOrg_bill(dataOrg).then(resp => {
        this.org_dialog = true
        this.orgTableData = resp.data.data
        this.dailogRecords = resp.data.totalRecords
        this.dailogPages = resp.data.totalPages
      })
    },
    blurOrg (event, type) { // 判断业务员是否存在
      if (event.target.value === '' || this.org_dialog) {
        return false
      }
      this.orgTag = type
      var dataOrg = {
        'comCodeOrName': event.target.value,
        'currentPage': '1',
        'pageSize': '5',
        'clickType': '1'
      }
      this.getOrg_bill(dataOrg).then(resp => {
        if (resp.code === '000000') {
          if (this.orgTag === 0) {
            this.searchData.comCode = resp.data.data[0].comCode
            this.searchData.comName = resp.data.data[0].comCName
            console.log(this.searchData.comCode)
          } else {
            this.addCustom.comCode = resp.data.data[0].comCode
            this.addCustom.comName = resp.data.data[0].comCName
          }
        } else {
          if (this.orgTag === 0) {
            this.searchData.comCode = ''
            this.searchData.comName = ''
          } else {
            this.addCustom.comCode = ''
            this.addCustom.comName = ''
          }
          this.open('error', resp.msg)
        }
      })
    },
    selectRowOrg (row) { // 公司机构选择
      this.closeDailog().then(() => {
        if (this.orgTag === 0) {
          this.$set(this.searchData, 'comCode', row.comCode)
          this.$set(this.searchData, 'comName', row.comCName)
        } else {
          this.$set(this.addCustom, 'comCode', row.comCode)
          this.$set(this.addCustom, 'comCName', row.comCName)
        }
        this.org_dialog = false
      })
    },
    orgCurrentChange (val) { // 选择机构分页
      this.getOrgInfo(val)
    },
    orgSizeChange (size) { // 保险机构
      this.dailogSize = size
      this.getOrgInfo(1)
    },
    orgClose () { // 关闭弹窗
      this.sizeList = []
      this.org_dialog = false
      this.dailogSize = 5
      if (this.orgTag === 0) {
        this.searchData.comCode = ''
        this.searchData.comName = ''
      } else {
        this.addCustom.comCode = ''
        this.addCustom.comName = ''
      }
    },
    insManClose () { // 关闭投保人弹框
      this.sizeList = []
      this.insMan_dialog = false
      this.dailogSize = 5
      this.isInput = false
      if (this.insManType === 0) {
        this.BillNoList.lifePartyCondition.isInput = false
        this.BillNoList.lifePartyCondition.insureNo = ''
        this.BillNoList.lifePartyCondition.insureName = ''
        this.BillNoList.lifePartyCondition.insureAddress = ''
        this.BillNoList.lifePartyCondition.postNo = ''
        this.BillNoList.lifePartyCondition.sexType = ''
        this.BillNoList.lifePartyCondition.country = ''
        this.BillNoList.lifePartyCondition.educationCode = ''
        this.BillNoList.lifePartyCondition.marriage = ''
        this.BillNoList.lifePartyCondition.birthDate = ''
        this.BillNoList.lifePartyCondition.identifyType = ''
        this.BillNoList.lifePartyCondition.identifyNumber = ''
        this.BillNoList.lifePartyCondition.identifyValiddate = ''
        this.BillNoList.lifePartyCondition.insureTel = ''
        this.BillNoList.lifePartyCondition.mobilePhone = ''
        this.BillNoList.lifePartyCondition.workingUnit = ''
        this.BillNoList.lifePartyCondition.job = ''
        this.BillNoList.lifePartyCondition.e_mail = ''
        this.BillNoList.lifePartyCondition.weixin = ''
        this.BillNoList.lifePartyCondition.habitualResidence = ''
        this.BillNoList.lifePartyCondition.insuredrType = ''
        this.BillNoList.lifePartyCondition.insuredrName = ''
        this.$set(this.BillNoList.lifePartyCondition, 'longFlagtag', false)
      } else {
        console.log(this.itemIndex)
        this.BillNoList.lifePartyConditionDList[this.itemIndex].isInput = false
        this.BillNoList.lifePartyConditionDList[this.itemIndex].insureNoD = ''
        this.BillNoList.lifePartyConditionDList[this.itemIndex].insureNameD = ''
        this.BillNoList.lifePartyConditionDList[this.itemIndex].insureAddressD = ''
        this.BillNoList.lifePartyConditionDList[this.itemIndex].postNoD = ''
        this.BillNoList.lifePartyConditionDList[this.itemIndex].sexTypeD = ''
        this.BillNoList.lifePartyConditionDList[this.itemIndex].countryD = ''
        this.BillNoList.lifePartyConditionDList[this.itemIndex].educationCodeD = ''
        this.BillNoList.lifePartyConditionDList[this.itemIndex].marriageD = ''
        this.BillNoList.lifePartyConditionDList[this.itemIndex].birthDateD = ''
        this.BillNoList.lifePartyConditionDList[this.itemIndex].identifyTypeD = ''
        this.BillNoList.lifePartyConditionDList[this.itemIndex].identifyNumberD = ''
        this.BillNoList.lifePartyConditionDList[this.itemIndex].identifyValiddateD = ''
        this.BillNoList.lifePartyConditionDList[this.itemIndex].insureTelD = ''
        this.BillNoList.lifePartyConditionDList[this.itemIndex].mobilePhoneD = ''
        this.BillNoList.lifePartyConditionDList[this.itemIndex].workingUnitD = ''
        this.BillNoList.lifePartyConditionDList[this.itemIndex].jobD = ''
        this.BillNoList.lifePartyConditionDList[this.itemIndex].e_mailD = ''
        this.BillNoList.lifePartyConditionDList[this.itemIndex].weixinD = ''
        this.BillNoList.lifePartyConditionDList[this.itemIndex].habitualResidenceD = ''
        this.$set(this.BillNoList.lifePartyConditionDList[this.itemIndex], 'longFlagtag', false)
      }
    },
    getComInfo (page, type) { // 保险公司查询
      this.sizeList = [5, 10, 20, 50]
      this.dailogCurrent = page
      this.isComType = type
      let insurerCode = ''
      let insurerName = ''
      if (this.isComType === 0) { // 查询
        insurerCode = this.searchData.companyCode
        insurerName = this.searchData.companyName
      } else { // 修改
        insurerCode = this.BillNoList.lifePCMainCondition.companyCode
        insurerName = this.BillNoList.lifePCMainCondition.companyName
      }
      var data = {}
      data = {
        'insurerCode': insurerCode,
        'insurerName': insurerName,
        'currentPage': page,
        'clickType': '2',
        'type': '2',
        'pageSize': this.dailogSize
      }
      this.getInsCom_bill(data).then(resp => {
        if (resp.code === '000000') {
          this.com_dialog = true
          this.insComTableData = resp.data.data
          this.dailogRecords = resp.data.totalRecords
          this.dailogPages = resp.data.totalPages
        } else {
          this.open('error', resp.msg)
        }
      })
    },
    blurInsCom (event, type, tag) { // 判断保险公司是否存在
      if (event.target.value === '' || this.com_dialog) {
        return false
      }
      let insurerCode = ''
      let insurerName = ''
      this.isComType = type
      if (tag === 0) { // 查询
        insurerCode = event.target.value
      } else { // 修改
        insurerName = event.target.value
      }
      var dataCom = {
        'insurerCode': insurerCode,
        'insurerName': insurerName,
        'currentPage': '1',
        'clickType': '1',
        'type': '2',
        'pageSize': '5'
      }
      this.getInsCom_bill(dataCom).then(resp => {
        if (resp.code === '000000') {
          if (this.isComType === 0) {
            this.searchData.companyCode = resp.data.data[0].insurercode
            this.searchData.companyName = resp.data.data[0].insurername
          } else {
            this.BillNoList.lifePCMainCondition.companyCode = resp.data.data[0].insurercode
            this.BillNoList.lifePCMainCondition.companyName = resp.data.data[0].insurername
          }
        } else {
          if (this.isComType === 0) {
            this.searchData.companyCode = ''
            this.searchData.companyName = ''
          } else {
            this.BillNoList.lifePCMainCondition.companyCode = ''
            this.BillNoList.lifePCMainCondition.companyName = ''
          }
          this.open('error', '改代码或名称不存在！')
        }
      })
    },
    comSizeChange (size) { // 保险公司
      this.dailogSize = size
      this.getComInfo(1, this.isComType)
    },
    selectRowCom (row) { // 保险公司选择
      this.closeDailog().then(() => {
        if (this.isComType === 0) {
          this.searchData.companyCode = row.insurercode
          this.searchData.companyName = row.insurername
        } else {
          this.BillNoList.lifePCMainCondition.companyCode = row.insurercode
          this.BillNoList.lifePCMainCondition.companyName = row.insurername
        }
        this.com_dialog = false
      })
    },
    comCurrentChange (val) { // 选择保险公司分页
      this.getComInfo(val, this.isComType)
    },
    comClose () { // 关闭弹窗
      this.sizeList = []
      this.com_dialog = false
      this.dailogSize = 5
      if (this.isComType === 0) {
        this.searchData.companyCode = ''
        this.searchData.companyName = ''
      } else {
        this.BillNoList.lifePCMainCondition.companyCode = ''
        this.BillNoList.lifePCMainCondition.companyName = ''
      }
    },
    getInsOrgInfo (page) { // 保险机构查询
      this.sizeList = [5, 10, 20, 50]
      var dataOrg = {
        'insurerCode': this.BillNoList.lifePCMainCondition.companyCode,
        'insurerName': this.BillNoList.lifePCMainCondition.companyName,
        'orgCode': this.BillNoList.lifePCMainCondition.companyComCode,
        'orgName': this.BillNoList.lifePCMainCondition.companyComName,
        'currentPage': page,
        'clickType': '2',
        'pageSize': this.dailogSize
      }
      if (this.BillNoList.lifePCMainCondition.companyCode === '' || this.BillNoList.lifePCMainCondition.companyCode === undefined) {
        this.open('error', '请先输入保险公司代码！')
        return false
      }
      this.getInsOrg_bill(dataOrg).then(resp => {
        if (resp.code === '000000') {
          this.insorg_dialog = true
          this.insOrgTableData = resp.data.data
          this.dailogRecords = resp.data.totalRecords
          this.dailogPages = resp.data.totalPages
        }
      })
    },
    blurOrgIns () {
    },
    selectRowInsOrg (row) { // 保险机构选择
      this.closeDailog().then(() => {
        this.BillNoList.lifePCMainCondition.companyComCode = row.orgcode
        this.BillNoList.lifePCMainCondition.companyComName = row.orgname
        this.insorg_dialog = false
      })
    },
    insOrgCurrentChange (val) { // 选择保险机构分页
      this.getInsOrgInfo(val)
    },
    insOrgSizeChange (size) { // 保险机构
      this.dailogSize = size
      this.getInsOrgInfo(1)
    },
    customerFindIns (page, tag, event, index) { // 获取投保人被保险人
      this.sizeList = [5, 10, 20, 50]
      this.insManType = tag
      if (index >= 0) {
        this.itemIndex = index
      } else {
        this.itemIndex = 0
      }
      let CodeOrName
      // if (this.insManType === 0) { // 投保人
      //   CodeOrName = this.BillNoList.lifePartyCondition.insureNo
      // } else {
      //   CodeOrName = this.BillNoList.lifePartyConditionDList[index].insureNoD
      // }
      CodeOrName = event.target.value
      this.searchInsMan = {
        'customerCodeOrName': CodeOrName,
        'idNumber': '',
        'currentPage': page,
        'pageSize': this.dailogSize,
        'clickType': '2'
      }
      this.customerFindBill(this.searchInsMan)
    },
    customerFindBill (data) {
      this.customerFind_bill(data).then(resp => {
        if (resp.code === '000000') {
          this.insMan_dialog = true
          this.insManListData = resp.data.data
          this.dailogRecords = resp.data.totalRecords
          this.dailogPages = resp.data.totalPages
        } else {
          if (resp.code === '000002') {
            this.insMan_dialog = true
            this.insManListData = []
            this.dailogRecords = resp.data.totalRecords
            this.dailogPages = resp.data.totalPages
          } else {
            this.open('error', resp.msg)
          }
        }
      })
    },
    insManCurrentChange (val) { // 选择投保人被保险人分页
      this.searchInsMan.currentPage = val
      this.customerFindBill(this.searchInsMan)
    },
    insManSizeChange (size) { // 获取投保人被保险人
      this.dailogSize = size
      this.searchInsMan.pageSize = size
      this.customerFindBill(this.searchInsMan)
    },
    selectRowInsMan (row) { // 选择投保人或被保险人
      this.closeDailog().then(() => {
        if (this.insManType === 0) {
          this.isInput = true
          this.BillNoList.lifePartyCondition.longFlagTag = true
          this.BillNoList.lifePartyCondition.insureNo = row.custId
          this.BillNoList.lifePartyCondition.insureName = row.custName
          this.BillNoList.lifePartyCondition.insureAddress = row.address
          this.BillNoList.lifePartyCondition.postNo = row.zipCode
          this.BillNoList.lifePartyCondition.sexType = row.sex
          this.BillNoList.lifePartyCondition.country = row.country
          this.BillNoList.lifePartyCondition.educationCode = row.education
          this.BillNoList.lifePartyCondition.marriage = row.maritalStatus
          this.BillNoList.lifePartyCondition.birthDate = row.birthDate
          this.BillNoList.lifePartyCondition.identifyType = row.paperworkType
          this.BillNoList.lifePartyCondition.identifyNumber = row.idNumber
          this.BillNoList.lifePartyCondition.identifyValiddate = row.identifyValiddate
          this.BillNoList.lifePartyCondition.insureTel = row.phone
          this.BillNoList.lifePartyCondition.mobilePhone = row.mobile
          this.BillNoList.lifePartyCondition.workingUnit = row.workingUnit
          this.BillNoList.lifePartyCondition.job = row.job
          this.BillNoList.lifePartyCondition.e_mail = row.email
          this.BillNoList.lifePartyCondition.weixin = row.weChat
          this.BillNoList.lifePartyCondition.habitualResidence = row.habitualResidence
          if (row.isLongFlag === 0 || IsEmpty(row.isLongFlag)) { // 身份证是否长 期有效
            this.$set(this.BillNoList.lifePartyCondition, 'longFlagtag', false)
          } else {
            this.$set(this.BillNoList.lifePartyCondition, 'longFlagtag', true)
          }
          this.byMyself()
        } else {
          this.BillNoList.lifePartyConditionDList[this.itemIndex].longFlagTag = true
          this.BillNoList.lifePartyConditionDList[this.itemIndex].isInput = true
          this.BillNoList.lifePartyConditionDList[this.itemIndex].insureNoD = row.custId
          this.BillNoList.lifePartyConditionDList[this.itemIndex].insureNameD = row.custName
          this.BillNoList.lifePartyConditionDList[this.itemIndex].insureAddressD = row.address
          this.BillNoList.lifePartyConditionDList[this.itemIndex].postNoD = row.zipCode
          this.BillNoList.lifePartyConditionDList[this.itemIndex].sexTypeD = row.sex
          this.BillNoList.lifePartyConditionDList[this.itemIndex].countryD = row.country
          this.BillNoList.lifePartyConditionDList[this.itemIndex].educationCodeD = row.education
          this.BillNoList.lifePartyConditionDList[this.itemIndex].marriageD = row.maritalStatus
          this.BillNoList.lifePartyConditionDList[this.itemIndex].birthDateD = row.birthDate
          this.BillNoList.lifePartyConditionDList[this.itemIndex].identifyTypeD = row.paperworkType
          this.BillNoList.lifePartyConditionDList[this.itemIndex].identifyNumberD = row.idNumber
          this.BillNoList.lifePartyConditionDList[this.itemIndex].identifyValiddateD = row.identifyValiddate
          this.BillNoList.lifePartyConditionDList[this.itemIndex].insureTelD = row.phone
          this.BillNoList.lifePartyConditionDList[this.itemIndex].mobilePhoneD = row.mobile
          this.BillNoList.lifePartyConditionDList[this.itemIndex].workingUnitD = row.workingUnit
          this.BillNoList.lifePartyConditionDList[this.itemIndex].jobD = row.job
          this.BillNoList.lifePartyConditionDList[this.itemIndex].e_mailD = row.email
          this.BillNoList.lifePartyConditionDList[this.itemIndex].weixinD = row.weChat
          this.BillNoList.lifePartyConditionDList[this.itemIndex].habitualResidenceD = row.habitualResidence
          if (row.isLongFlag === 0 || IsEmpty(row.isLongFlag)) { // 身份证是否长 期有效
            this.$set(this.BillNoList.lifePartyConditionDList[this.itemIndex], 'longFlagtag', false)
          } else {
            this.$set(this.BillNoList.lifePartyConditionDList[this.itemIndex], 'longFlagtag', true)
          }
        }
        this.insMan_dialog = false
      })
    },
    searchCus (page) { // 查询客户
      this.searchInsMan.currentPage = page
      this.searchInsMan.pageSize = this.dailogSize
      this.customerFindBill(this.searchInsMan)
    },
    insOrgClose () { // 关闭弹窗
      this.sizeList = []
      this.dailogSize = 5
      this.insorg_dialog = false
      this.BillNoList.lifePCMainCondition.companyComCode = ''
      this.BillNoList.lifePCMainCondition.companyComName = ''
    },
    getAgentCodeName (page) { // 归属业务员查询
      this.agentData = {
        'agentCode': this.BillNoList.lifePCMainCondition.handlerCode,
        'agentName': this.BillNoList.lifePCMainCondition.handlerName,
        'comCode': '',
        'comName': '',
        'clickType': '2',
        'currentPage': page,
        'pageSize': this.dailogSize
      }
      this.postAgent(this.agentData)
    },
    postAgent (data) {
      this.sizeList = [5, 10, 20, 50]
      this.agentBillFind(data).then(resp => {
        if (resp.code === '000000' || resp.code === '000002') {
          this.agentIns_dialog = true
          this.agentListData = resp.data.data
          this.dailogPages = resp.data.totalPages
          this.dailogRecords = resp.data.totalRecords
        }
      })
    },
    getAgentList (page) {
      this.agentData.currentPage = page
      this.agentData.pageSize = this.dailogSize
      this.postAgent(this.agentData)
    },
    selectRowAgentMod (row) { // 修改选择业务员
      this.BillNoList.lifePCMainCondition.handlerCode = row.agentCode
      this.BillNoList.lifePCMainCondition.handlerName = row.agentName
      this.BillNoList.lifePCMainCondition.comCode = row.comCode
      this.BillNoList.lifePCMainCondition.comName = row.comName
      this.BillNoList.lifePCMainCondition.agentIdNumber = row.identifyNumber
      this.byMyself()
      this.agentIns_dialog = false
      this.sizeList = []
      this.dailogSize = 5
    },
    agentModCurrentChange (val) { // 选择业务员分页
      this.agentData.currentPage = val
      this.postAgent(this.agentData)
    },
    agentModSizeChange (size) { // 选择业务员每页显示条数
      this.dailogSize = size
      this.agentData.pageSize = size
      this.postAgent(this.agentData)
    },
    agentClose () { // 关闭业务员弹框
      this.sizeList = []
      this.dailogSize = 5
      this.agentIns_dialog = false
    },
    getRiskList (page, index, row, tag) { // 获取险种信息
      this.riskList.currentPage = page
      this.riskList.pageSize = this.dailogSize
      this.riskIndex = index
      this.riskTag = tag
      this.dailogCurrent = page
      if (this.BillNoList.lifePCMainCondition.companyCode === '') {
        this.open('error', '请先输入保险公司代码！')
        return false
      } else {
        this.riskList.riskCode = row.riskCode
        this.riskList.insurerCode = this.BillNoList.lifePCMainCondition.companyCode
        this.postRisk(this.riskList)
      }
    },
    postRisk (data) {
      this.sizeList = [5, 10, 20, 50]
      this.riskcodeBill(data).then(resp => {
        if (resp.code === '000000') {
          this.risk_dialog = true
          this.riskListData = resp.data.data
          this.dailogPages = resp.data.totalPages
          this.dailogRecords = resp.data.totalRecords
        } else {
          this.open('error', resp.msg)
        }
      })
    },
    searchRisk (page) {
      this.riskList.riskCode = this.riskList.codeOrName
      this.postRisk(this.riskList)
    },
    selectRowRisk (row) { // 修改选择险种
      this.closeDailog().then(() => {
        if (this.riskTag === 0) { // 险种信息
          let risktag = false
          let riskArr = JSON.parse(JSON.stringify(this.BillNoList.lifeCItemKindConditionList))
          console.log(this.riskIndex)
          riskArr.splice(this.riskIndex, 1)
          console.log(riskArr)
          riskArr.forEach((item, index) => {
            if (row.riskcode === item.riskCode) {
              risktag = true
            }
          })
          if (risktag) {
            this.open('error', '险种信息不能重复！')
            this.risk_dialog = false
            return false
          }
          if (row.freeflag === '1') { // 判断是否是豁免险 1 是 0 否
            this.BillNoList.lifeCItemKindConditionList[this.riskIndex].isHmRisk = false
          } else {
            this.BillNoList.lifeCItemKindConditionList[this.riskIndex].isHmRisk = true
          }
          this.BillNoList.lifeCItemKindConditionList[this.riskIndex].freeFlag = row.freeflag
          this.BillNoList.lifeCItemKindConditionList[this.riskIndex].riskCode = row.riskcode
          this.BillNoList.lifeCItemKindConditionList[this.riskIndex].riskName = row.riskname
          if (row.mainorextrflag === '2') {
            row.mainorextrflag = '0'
          }
          this.BillNoList.lifeCItemKindConditionList[this.riskIndex].mainFlag = row.mainorextrflag
          // this.BillNoList.lifeCItemKindConditionList[this.riskIndex].paymentPeriod = row.paymentperiod
          // this.BillNoList.lifeCItemKindConditionList[this.riskIndex].payrate = row.payway
          // 新添加字段
          if (row.paycycle === '3') { // 不定期
            this.BillNoList.lifeCItemKindConditionList[this.riskIndex].paymentPeriod = ''
          } else {
            this.BillNoList.lifeCItemKindConditionList[this.riskIndex].paymentPeriod = row.paymentperiod
          }
          this.BillNoList.lifeCItemKindConditionList[this.riskIndex].payCycle = row.paycycle
          this.BillNoList.lifeCItemKindConditionList[this.riskIndex].ageScopeTop = row.agescopetop
          this.BillNoList.lifeCItemKindConditionList[this.riskIndex].ageScopeLow = row.agescopelow
          this.BillNoList.lifeCItemKindConditionList[this.riskIndex].sexScope = row.sexscope
          this.BillNoList.lifeCItemKindConditionList[this.riskIndex].payAgeTopLimit = row.payagetoplimit
          if (row.paycycle === '1') { // 趸缴
            this.BillNoList.lifeCItemKindConditionList[this.riskIndex].payrate = '4'
          } else {
            this.BillNoList.lifeCItemKindConditionList[this.riskIndex].payrate = row.payway
          }
        } else {
          let riskTag = false
          let isRiskTag = false
          let riskArr = JSON.parse(JSON.stringify(this.BillNoList.lifeChargeConditionList))
          riskArr.splice(this.riskIndex, 1)
          this.BillNoList.lifeCItemKindConditionList.forEach((item, index) => {
            if (row.riskcode === item.riskCode) {
              riskTag = true
            }
          })
          riskArr.forEach((item, index) => {
            if (row.riskcode === item.riskCode) {
              isRiskTag = true
            }
          })
          if (isRiskTag) {
            this.open('error', '险种信息不能重复！')
            this.BillNoList.lifeChargeConditionList[this.riskIndex].riskCode = ''
            this.BillNoList.lifeChargeConditionList[this.riskIndex].riskName = ''
          } else if (riskTag) {
            this.BillNoList.lifeChargeConditionList[this.riskIndex].riskCode = row.riskcode
            this.BillNoList.lifeChargeConditionList[this.riskIndex].riskName = row.riskname
          } else {
            this.open('error', '险种必须为险种信息中已经选择的信息！')
            this.BillNoList.lifeChargeConditionList[this.riskIndex].riskCode = ''
            this.BillNoList.lifeChargeConditionList[this.riskIndex].riskName = ''
          }
        }
        this.risk_dialog = false
      })
    },
    riskCurrentChange (val) { // 选择险种分页
      this.dailogCurrent = val
      this.riskList.currentPage = val
      this.postRisk(this.riskList)
    },
    riskSizeChange (size) { // 选择险种每页显示条数
      this.dailogSize = size
      this.riskList.pageSize = size
      this.riskList.currentPage = 1
      this.postRisk(this.riskList)
    },
    riskClose () { // 关闭险种弹框
      this.sizeList = []
      this.dailogSize = 5
      this.risk_dialog = false
      if (this.riskTag === 0) { // 险种信息
        this.BillNoList.lifeCItemKindConditionList[this.riskIndex].feeFlagTag = false
        this.BillNoList.lifeCItemKindConditionList[this.riskIndex].riskCode = ''
        this.BillNoList.lifeCItemKindConditionList[this.riskIndex].riskName = ''
        this.BillNoList.lifeCItemKindConditionList[this.riskIndex].mainFlag = ''
        this.BillNoList.lifeCItemKindConditionList[this.riskIndex].paymentPeriod = ''
        this.BillNoList.lifeCItemKindConditionList[this.riskIndex].payrate = ''
      } else {
        this.BillNoList.lifeChargeConditionList[this.riskIndex].riskCode = ''
        this.BillNoList.lifeChargeConditionList[this.riskIndex].riskName = ''
      }
      this.riskList.codeOrName = ''
    },
    // 新增客户的提交表单
    postAddCustom () {
      this.$refs['addCustom'].validate((valid) => {
        if (valid) {
          let scAge = this.GetAge(this.addCustom.idNumber)
          if (scAge >= 18 && this.addCustom.paperworkType === '2') {
            this.open('error', '年满18周岁不能选择户口本！')
            return false
          }
          let sexCus = this.GetSex(this.addCustom.idNumber)
          let birthCus = this.GetBirth(this.addCustom.idNumber)
          let isCon = true
          if (this.addCustom.paperworkType === '1' || this.addCustom.paperworkType === '2') {
            if (sexCus !== '2') {
              if (sexCus !== this.addCustom.sex) {
                this.open('error', '新增客户性别与身份证号不一致，请检查！')
                isCon = false
                return false
              }
            } else {
              this.open('error', '新增客户身份证号错误，请检查！')
              isCon = false
              return false
            }
            if (birthCus !== 0) {
              birthCus = new Date(birthCus)
              birthCus = birthCus.getTime()
              if (birthCus !== this.addCustom.birthDate) {
                this.open('error', '新增客户出生日期与身份证号不一致，请检查！')
                isCon = false
                return false
              }
            } else {
              this.open('error', '新增客户身份证号错误，请检查！')
              isCon = false
              return false
            }
          }
          if (!isCon) {
            return false
          }
          if (this.addCustom.mobile === '' && this.addCustom.phone === '') {
            this.open('error', '手机号与固话必填一个！')
            return false
          }
          let post = {
            'custName': this.addCustom.custName,
            'sex': this.addCustom.sex,
            'birthDate': this.addCustom.birthDate
          }
          this.customerSimilar(post).then(resp => {
            if (resp.flag === '0') {
              this.$confirm('该客户与系统中的某位客户相似, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
              }).then(() => {
                this.postCustom()
              }).catch(() => {
              })
            } else if (resp.flag === '1') {
              this.postCustom()
            } else {
              this.open('error', resp.msg)
            }
          })
        } else {
          return false
        }
      })
    },
    postCustom () {
      if (this.addCustom.mobile === '' && this.addCustom.phone === '') {
        this.open('error', '手机号与固话必填一个！')
        return false
      }
      if (this.addCustom.longFlagtag) {
        this.addCustom.isLongFlag = '1'
      } else {
        this.addCustom.isLongFlag = '0'
      }
      this.Loading()
      this.customerAdd_Mod(this.addCustom).then(result => {
        this.closeLoading()
        if (result.code === '000000') {
          this.isAddCus = false
          this.$refs.multipleTable.clearSelection()
          this.open('success', '新增成功')
        } else {
          this.open('error', result.msg)
        }
      }).catch(() => {
        this.closeLoading()
      })
    },
    bankSelect (item) { // 银行选择
      this.BillNoList.lifeFeeCondition.traBankFirstal = item.configSetValueCode
      this.BillNoList.lifeFeeCondition.bankName = item.configSetValueName
    },
    querySearchAsync (queryString, cb) { // 银行选择
      this.getAllBankBill({'bankCodeOrName': queryString}).then(resp => {
        this.bankSearch = resp
        cb(this.bankSearch)
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
    closeCus () { // 关闭新增客户
      this.isAddCus = false
      this.$refs['addCustom'].resetFields()
    },
    isHasCustom () { // 是否存在客户
      let postD = {
        'paperworkType': this.addCustom.paperworkType,
        'idNumber': this.addCustom.idNumber
      }
      this.customerIsExist(postD).then(resp => {
        if (resp.flag === '0') {
          this.addCustom.idNumber = ''
          this.open('error', '该客户已存在！')
        }
      })
    },
    // 逻辑处理
    byMyself () { // 关于自保件
      if (this.BillNoList.lifePartyCondition.identifyNumber === this.BillNoList.lifePCMainCondition.agentIdNumber) {
        this.BillNoList.lifePCMainCondition.byMyself = '0'
      } else {
        this.BillNoList.lifePCMainCondition.byMyself = '1'
      }
    },
    idNumChange (val) { // 验证身份证号码 （投保人）
      if (val === '1' || val === '2') {
        this.rule['lifePartyCondition.identifyNumber'] = this.IdValidator
      } else {
        this.rule['lifePartyCondition.identifyNumber'] = this.emptyValidator
      }
      this.BillNoList.lifePartyCondition.identifyNumber = ''
    },
    idNumChangeCus (val) { // 验证身份证号码 (新增客户)
      if (val === '1' || val === '2') {
        this.addRules['idNumber'] = this.IdValidator
      } else {
        this.addRules['idNumber'] = this.emptyValidator
      }
    },
    checkChange (val) { // 勾选终身（投保人）
      if (val) {
        this.rule['lifePartyCondition.identifyValiddate'] = this.noValidator
        this.BillNoList.lifePartyCondition.identifyValiddate = ''
        this.BillNoList.lifePartyCondition.longFlagTag = true
        this.$refs['dateForm'].clearValidate()
      } else {
        this.BillNoList.lifePartyCondition.longFlagTag = false
        this.rule['lifePartyCondition.identifyValiddate'] = this.emptyValidator
      }
    },
    checkChangeCus (val) { // 勾选终身（新增客户）
      if (val) {
        this.addCustom.identifyValiddate = ''
        this.addRules['identifyValiddate'] = this.noValidator
        this.addCustom.longFlagtag = true
      } else {
        this.addCustom.longFlagtag = false
        this.addRules['identifyValiddate'] = this.emptyValidator
      }
    },
    relChange (val) { // 与被保险关系（投保人）
      console.log(val)
      if (val === '1') { // 选择本人
        if (this.BillNoList.lifePartyConditionDList.length > 1) {
          this.BillNoList.lifePartyConditionDList.splice(1, this.BillNoList.lifePartyConditionDList.length)
        }
        this.BillNoList.lifePartyConditionDList[0].longFlagTag = true
        this.BillNoList.lifePartyConditionDList[0].isInput = true
        this.BillNoList.lifePartyConditionDList[0].isclick = true
        this.BillNoList.lifePartyConditionDList[0].insureNoD = this.BillNoList.lifePartyCondition.insureNo
        this.BillNoList.lifePartyConditionDList[0].insureNameD = this.BillNoList.lifePartyCondition.insureName
        this.BillNoList.lifePartyConditionDList[0].insureAddressD = this.BillNoList.lifePartyCondition.insureAddress
        this.BillNoList.lifePartyConditionDList[0].postNoD = this.BillNoList.lifePartyCondition.postNo
        this.BillNoList.lifePartyConditionDList[0].sexTypeD = this.BillNoList.lifePartyCondition.sexType
        this.BillNoList.lifePartyConditionDList[0].countryD = this.BillNoList.lifePartyCondition.country
        this.BillNoList.lifePartyConditionDList[0].educationCodeD = this.BillNoList.lifePartyCondition.educationCode
        this.BillNoList.lifePartyConditionDList[0].marriageD = this.BillNoList.lifePartyCondition.marriage
        this.BillNoList.lifePartyConditionDList[0].birthDateD = this.BillNoList.lifePartyCondition.birthDate
        this.BillNoList.lifePartyConditionDList[0].identifyTypeD = this.BillNoList.lifePartyCondition.identifyType
        console.log(this.BillNoList.lifePartyConditionDList[0].identifyTypeD)
        this.BillNoList.lifePartyConditionDList[0].identifyNumberD = this.BillNoList.lifePartyCondition.identifyNumber
        this.BillNoList.lifePartyConditionDList[0].identifyValiddateD = this.BillNoList.lifePartyCondition.identifyValiddate
        this.BillNoList.lifePartyConditionDList[0].insureTelD = this.BillNoList.lifePartyCondition.insureTel
        this.BillNoList.lifePartyConditionDList[0].mobilePhoneD = this.BillNoList.lifePartyCondition.mobilePhone
        this.BillNoList.lifePartyConditionDList[0].workingUnitD = this.BillNoList.lifePartyCondition.workingUnit
        this.BillNoList.lifePartyConditionDList[0].jobD = this.BillNoList.lifePartyCondition.job
        this.BillNoList.lifePartyConditionDList[0].e_mailD = this.BillNoList.lifePartyCondition.e_mail
        this.BillNoList.lifePartyConditionDList[0].weixinD = this.BillNoList.lifePartyCondition.weixin
        this.BillNoList.lifePartyConditionDList[0].habitualResidenceD = this.BillNoList.lifePartyCondition.habitualResidence
        this.BillNoList.lifePartyConditionDList[0].longFlagtag = this.BillNoList.lifePartyCondition.longFlagtag
        if (this.BillNoList.lifePartyConditionDList[0].longFlagtag) {
          this.rules['identifyValiddateD'] = []
        } else {
          this.rules['identifyValiddateD'] = this.emptyValidator
        }
        this.BillNoList.lifePartyCondition.insuredrName = ''
        this.rule['lifePartyCondition.insuredrName'] = []
        this.isEdit = true
      } else {
        if (this.BillNoList.lifePartyConditionDList.length > 1) {
          this.BillNoList.lifePartyConditionDList.splice(1, this.BillNoList.lifePartyConditionDList.length)
        }
        this.BillNoList.lifePartyConditionDList[0].longFlagTag = false
        this.BillNoList.lifePartyConditionDList[0].isInput = ''
        this.BillNoList.lifePartyConditionDList[0].insureNoD = ''
        this.BillNoList.lifePartyConditionDList[0].insureNameD = ''
        this.BillNoList.lifePartyConditionDList[0].insureAddressD = ''
        this.BillNoList.lifePartyConditionDList[0].postNoD = ''
        this.BillNoList.lifePartyConditionDList[0].sexTypeD = ''
        this.BillNoList.lifePartyConditionDList[0].countryD = ''
        this.BillNoList.lifePartyConditionDList[0].educationCodeD = ''
        this.BillNoList.lifePartyConditionDList[0].marriageD = ''
        this.BillNoList.lifePartyConditionDList[0].birthDateD = ''
        this.BillNoList.lifePartyConditionDList[0].identifyTypeD = ''
        this.BillNoList.lifePartyConditionDList[0].identifyNumberD = ''
        this.BillNoList.lifePartyConditionDList[0].identifyValiddateD = ''
        this.BillNoList.lifePartyConditionDList[0].insureTelD = ''
        this.BillNoList.lifePartyConditionDList[0].mobilePhoneD = ''
        this.BillNoList.lifePartyConditionDList[0].workingUnitD = ''
        this.BillNoList.lifePartyConditionDList[0].jobD = ''
        this.BillNoList.lifePartyConditionDList[0].e_mailD = ''
        this.BillNoList.lifePartyConditionDList[0].weixinD = ''
        this.BillNoList.lifePartyConditionDList[0].habitualResidenceD = ''
        this.BillNoList.lifePartyConditionDList[0].longFlagtag = false
        this.BillNoList.lifePartyConditionDList[0].isInput = false
        this.BillNoList.lifePartyConditionDList[0].isclick = false
        if (val === '5' || val === 5) {
          this.isEdit = false
          this.BillNoList.lifePartyCondition.insuredrName = ''
          this.rule['lifePartyCondition.insuredrName'] = this.emptyValidator
        } else {
          this.rule['lifePartyCondition.insuredrName'] = []
          this.$refs['insNForm'].clearValidate()
          this.BillNoList.lifePartyCondition.insuredrName = ''
          this.isEdit = true
        }
      }
    },
    sgRelstionShip (index, event) { // 与被保险关系（身故受益人）
      if (event === '1') {
        this.BillNoList.lifePartyTConditionList[index].insuredrType = ''
        this.open('error', '身故受益人不能为被保险人！')
      }
      if (event === '5' || event === 5) {
        this.BillNoList.lifePartyTConditionList[index].isEdit = false
        // this.sgRules['insuredrName'] = this.emptyValidator
      } else {
        this.sgRules['insuredrName'] = []
        this.BillNoList.lifePartyTConditionList[index].insuredrName = ''
        this.BillNoList.lifePartyTConditionList[index].isEdit = true
      }
    },
    idNumChangeItem (val, index, tag) { // 被保险人身份证验证
      if (val === '1' || val === '2') {
        if (tag === 0) {
          this.rules['identifyTypeD'] = this.IdValidator
        } else if (tag === 1 || tag === 2) {
          this.sgRules['identifyNumber'] = this.IdValidator
        }
      } else {
        if (tag === 0) {
          this.rules['identifyTypeD'] = this.emptyValidator
        } else if (tag === 1 || tag === 2) {
          this.sgRules['identifyNumber'] = this.emptyValidator
        }
      }
    },
    checkChangeItem (val, index, tag) {
      if (val) {
        if (tag === 0) { // 被保险人
          this.BillNoList.lifePartyConditionDList[index].longFlagTag = true
          this.BillNoList.lifePartyConditionDList[index].identifyValiddateD = ''
        } else if (tag === 1) { // 身故受益人
          // this.BillNoList.lifePartyTConditionList[index].longFlagTag = true
          this.BillNoList.lifePartyTConditionList[index].identifyValiddate = ''
        } else if (tag === 2) {
          // this.BillNoList.lifePartyAConditionList[index].longFlagTag = true
          this.BillNoList.lifePartyAConditionList[index].identifyValiddate = ''
        }
      } else {
        if (tag === 0) {
          this.BillNoList.lifePartyConditionDList[index].longFlagTag = false
          this.rules['identifyValiddateD'] = this.emptyValidator
        } else if (tag === 1) { // 身故受益人
          // this.BillNoList.lifePartyTConditionList[index].longFlagTag = false
          this.sgRules['identifyValiddateD'] = this.emptyValidator
        } else if (tag === 2) {
          // this.BillNoList.lifePartyAConditionList[index].longFlagTag = false
          this.sgRules['identifyValiddateD'] = this.emptyValidator
        }
      }
    },
    checkNumber (index, event) {
      if (event.target.value !== '' && Number(event.target.value) === 0) {
        this.isTrue = true
      }
    },
    trueBtn () {
      this.isTrue = false
    },
    calBtn () {
      this.isTrue = false
      this.BillNoList.lifeCItemKindConditionList[this.riskIndex].riskPremium = ''
    },
    addNum () { // 实收保费
      let countAll = 0
      this.BillNoList.lifeChargeConditionList.forEach(item => {
        countAll = countAll + Number(item.paidPremium)
      })
      if (!isNaN(countAll)) {
        this.BillNoList.lifeFeeCondition.paidPremium = countAll
      } else {
        this.BillNoList.lifeFeeCondition.paidPremium = ''
      }
    },
    addpremium () { // 应缴保费总计
      let countAll = 0
      this.BillNoList.lifeCItemKindConditionList.forEach(item => {
        countAll = countAll + Number(item.premium)
      })
      if (!isNaN(countAll)) {
        this.BillNoList.lifeFeeCondition.sumPremium = countAll
      } else {
        this.BillNoList.lifeFeeCondition.sumPremium = ''
      }
    },
    GetAge (identityCard) {
      var len = (identityCard + '').length
      if (len === 0) {
        return 0
      } else {
        if ((len !== 15) && (len !== 18)) {
          return 0
        }
      }
      var strBirthday = ''
      if (len === 18) { // 处理18位的身份证号码从号码中得到生日和性别代码
        strBirthday = identityCard.substr(6, 4) + '/' + identityCard.substr(10, 2) + '/' + identityCard.substr(12, 2)
      }
      if (len === 15) {
        strBirthday = '19' + identityCard.substr(6, 2) + '/' + identityCard.substr(8, 2) + '/' + identityCard.substr(10, 2)
      }
      var birthDate = new Date(strBirthday)
      var nowDateTime = new Date()
      var age = nowDateTime.getFullYear() - birthDate.getFullYear()
      if (nowDateTime.getMonth() < birthDate.getMonth() || (nowDateTime.getMonth() === birthDate.getMonth() && nowDateTime.getDate() < birthDate.getDate())) {
        age--
      }
      return age
    },
    GetBirth (idCard) { // 获取出生年月
      var len = (idCard + '').length
      if (len === 0) {
        return 0
      } else {
        if ((len !== 15) && (len !== 18)) {
          return 0
        }
      }
      var strBirthday = ''
      if (len === 18) { // 处理18位的身份证号码从号码中得到生日和性别代码
        strBirthday = idCard.substr(6, 4) + '-' + idCard.substr(10, 2) + '-' + idCard.substr(12, 2)
      }
      if (len === 15) {
        strBirthday = '19' + idCard.substr(6, 2) + '-' + idCard.substr(8, 2) + '-' + idCard.substr(10, 2)
      }
      return strBirthday
    },
    GetSex (idCard) { // 获取性别
      // 0男 1女
      var sexno, sex
      if (idCard.length === 18) {
        sexno = idCard.substring(16, 17)
      } else if (idCard.length === 15) {
        sexno = idCard.substring(14, 15)
      } else {
        this.open('error', '身份证号码格式错误，请检查！')
        return '2'
      }
      var tempid = sexno % 2
      if (tempid === 0) {
        sex = '1'
      } else {
        sex = '0'
      }
      return sex
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
    addFloat (index, tag, type) {
      // tag 0 险种信息 1缴费信息
      // type 0 应缴保费 1 保险金额 2分数 3 加费金额
      if (tag === 0) {
        if (type === 0) {
          this.BillNoList.lifeCItemKindConditionList[index].premium = this.toDecimal(this.BillNoList.lifeCItemKindConditionList[index].premium)
        }
        if (type === 1) {
          this.BillNoList.lifeCItemKindConditionList[index].riskPremium = this.toDecimal(this.BillNoList.lifeCItemKindConditionList[index].riskPremium)
        }
        if (type === 2) {
          this.BillNoList.lifeCItemKindConditionList[index].number = parseFloat(this.BillNoList.lifeCItemKindConditionList[index].number)
          this.BillNoList.lifeCItemKindConditionList[index].number = this.toDecimal(this.BillNoList.lifeCItemKindConditionList[index].number)
        }
        if (type === 3) {
          this.BillNoList.lifeCItemKindConditionList[index].addPremium = this.toDecimal(this.BillNoList.lifeCItemKindConditionList[index].addPremium)
        }
      } else {
        if (tag === 1) {
          if (type === 0) {
            this.BillNoList.lifeChargeConditionList[index].paidPremium = this.toDecimal(this.BillNoList.lifeChargeConditionList[index].paidPremium)
          }
        }
      }
    },
    getDate () {
      var timestamp = new Date().getTime()
      this.BillNoList.lifePCMainCondition.updateTime = timestamp
    },
    closeModify () {
      this.isModify = false
      this.$refs['BillNoList'].resetFields()
    },
    open (types, mesg) { // 提示
      this.$message({
        message: mesg,
        type: types
      })
    },
    ...mapActions([
      'searchBillList_Mod',
      'searchBillNoDetail',
      'firstPolicyModify',
      'agentFind',
      'deletePolicy',
      'getOrg_bill',
      'getInsCom_bill',
      'getInsOrg_bill',
      'customerFind_bill',
      'agentBillFind',
      'riskcodeBill',
      'getAllBankBill',
      'customerAdd_Mod',
      'customerIsExist',
      'customerSimilar'
    ])
  },
  components: {
    [NoticeBar.name]: NoticeBar,
    [LabelText.name]: LabelText,
    [LineTittle.name]: LineTittle
  },
  computed: {
    newHandlerCode () {
      return this.searchData.handlerCode
    },
    newHandlerName () {
      return this.searchData.handlerName
    },
    newComCode () {
      return this.BillNoList.lifePCMainCondition.companyCode
    },
    newComOrgCode () {
      return this.BillNoList.lifePCMainCondition.companyComCode
    },
    newAgentCode () {
      return this.BillNoList.lifePCMainCondition.handlerCode
    }
  },
  watch: {
    newHandlerCode (newValue, oldValue) {
      if (newValue === '') {
        this.searchData.handlerName = ''
        this.searchData.comCode = ''
        this.searchData.comName = ''
      }
    },
    newHandlerName (newValue, oldValue) {
      if (newValue === '') {
        this.searchData.handlerCode = ''
        this.searchData.comCode = ''
        this.searchData.comName = ''
      }
    },
    newComCode (newValue, oldValue) {
      if (newValue === '') {
        this.BillNoList.lifePCMainCondition.companyName = ''
      }
    },
    newComOrgCode (newValue, oldValue) {
      if (newValue === '') {
        this.BillNoList.lifePCMainCondition.companyComName = ''
      }
    },
    newAgentCode (newValue, oldValue) {
      if (newValue === '') {
        this.BillNoList.lifePCMainCondition.handlerName = ''
        this.BillNoList.lifePCMainCondition.comCode = ''
        this.BillNoList.lifePCMainCondition.comName = ''
      }
    },
    'searchData.comCode' (newValue, oldValue) {
      if (newValue === '') {
        this.searchData.comName = ''
      }
    },
    'searchData.comName' (newValue, oldValue) {
      if (newValue === '') {
        this.searchData.comCode = ''
      }
    },
    'searchData.companyCode' (newValue, oldValue) {
      if (newValue === '') {
        this.searchData.companyName = ''
      }
    },
    'searchData.companyName' (newValue, oldValue) {
      if (newValue === '') {
        this.searchData.companyCode = ''
      }
    },
    'addCustom.comCode' (newValue, oldValue) {
      if (newValue === '') {
        this.addCustom.comCName = ''
      }
    }
  },
  created () {
  }
}
</script>

<style lang="scss" scoped type="text/css">
  #billModify{
    padding: 0px 30px 30px 30px;
  }
  .manage_form { margin-top: 20px; }
  .ri-line { margin-bottom: 10px; }
  .selectItem { margin-top: 20px; }
  .checkBtn { margin: 20px 0; text-align: center; }
  .addBtn { text-align: center; margin-bottom: 20px; }
  .splice-line { border-bottom: 1px solid #e4e7ed; margin-bottom: 10px; }
  .splice-line:last-child { border-bottom: 0; }
</style>
<style>
  .btn-container { text-align: center; margin: 30px 0; }
  .pagination {
    text-align: right;
    margin: 20px auto;
  }
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
  .riskTable .el-form-item { margin-bottom: 40px;}
  .riskTable .el-form-item__error { left: 0; height: 35px;}
  .cus_form .el-form-item__error { left: 130px;}
</style>
