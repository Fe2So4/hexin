<template>
  <div id="orgadd" >
      <ui-notice-bar slot="breadcast" >
        <el-breadcrumb slot="location" separator=">">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>寿险业务管理</el-breadcrumb-item>
            <el-breadcrumb-item>离职单管理</el-breadcrumb-item>
          </el-breadcrumb>
      </ui-notice-bar>
      <div class="ri-content" slot="content" >
        <el-form  ref="queryInfo" :rules="rules1" :model="queryInfo">
          <el-row class="ri-line">
            <el-col :span=12>
              <el-form-item prop='policyNo'>
                <ui-label-text labelWidth="145" label="保单号:" >
                  <el-input v-model="queryInfo.policyNo" slot='text' clearable></el-input>
                </ui-label-text>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row class="ri-line">
            <el-col :span=12>
              <el-form-item prop='comCode'>
                <ui-label-text labelWidth="145" label="省级分公司机构:">
                  <el-input v-model="queryInfo.comCode" slot='text' @dblclick.native="openComDialog(0)" @blur='opensingleComDialog(0)' placeholder="双击可选择" clearable></el-input>
                </ui-label-text>
              </el-form-item>
            </el-col>
            <el-col :span=12>
              <el-form-item prop='comCode2'>
                <ui-label-text labelWidth="160" label="地市级分公司机构:">
                  <el-input v-model="queryInfo.comCode2" slot='text' @dblclick.native="openComDialog(1)" @blur='opensingleComDialog(1)' placeholder="双击可选择" clearable></el-input>
                </ui-label-text>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row class="ri-line">
            <el-col :span=12>
              <el-form-item prop='agentCode'>
                <ui-label-text labelWidth="145" label="离职业务员代码:">
                  <el-input v-model="queryInfo.agentCode" slot='text' @dblclick.native="openComDialog(2)" @blur='opensingleComDialog(2)' placeholder="双击可选择" clearable></el-input>
                </ui-label-text>
              </el-form-item>
            </el-col>
            <el-col :span=12>
              <el-form-item prop='agentName' >
                <ui-label-text labelWidth="160" label="离职业务员名称:">
                  <el-input v-model="queryInfo.agentName" slot='text' @dblclick.native="openComDialog(2)" @blur='opensingleComDialog(2)' placeholder="双击可选择" clearable></el-input>
                </ui-label-text>
              </el-form-item>
            </el-col>
          </el-row>
          <div class="btn-container">
            <el-form-item >
              <el-button type="primary" @click="queryTableData" :disabled="quanxian.query">查询</el-button>
              <el-button type="primary" @click="importDialogOpen" :disabled="quanxian.import">批量导入</el-button>
            </el-form-item>
          </div>
        </el-form>
      </div>
      <ComDialog :vis='comDialog' :workerVis='comDialogworker' :comVis='comDialogCom' :newTableData='tempTableData1' @onClose='comDialogClosing(0)' @selectDialog='dialogBackData' @comdialogChangePageFunction='changeComdialogPage1' @comdialogChangePageSizeFunction='changeComdialogPageSize1' :fenyetotal='fenyetotalData'/>
      <ComDialog :vis='comDialog1' :workerVis='comDialogworker1' :comVis='comDialogCom1' :newTableData='tempTableData2' @onClose='comDialogClosing(1)' @selectDialog='dialogBackData1' @comdialogChangePageFunction='changeComdialogPage2' @comdialogChangePageSizeFunction='changeComdialogPageSize2' :fenyetotal='fenyetotalData'/>
      <el-dialog :append-to-body='true' :visible.sync='comDialog2' :before-close='childClose'>
        <div>
          <el-row class="ri-line1">
            <el-input v-model="findOutWorkerData.agentCode" placeholder="业务员代码："></el-input>
          </el-row>
          <el-row class="ri-line1">
            <el-input v-model="findOutWorkerData.agentName" placeholder="业务员名称："></el-input>
          </el-row>
          <el-row class="ri-line1">
            <el-input v-model="findOutWorkerData.comCode" placeholder="归属机构代码："></el-input>
          </el-row>
          <el-row class="ri-line1">
            <el-input v-model="findOutWorkerData.comName" placeholder="归属机构名称："></el-input>
          </el-row>
          <el-row class="btn-container1">
            <el-button type="primary" @click.native.prevent="queryWorker1()">查询</el-button>
          </el-row>
          <el-table stripe @row-click='changeData' ref="multipleTable" :data="workerDialogData">
            <el-table-column prop="agentCode" label="代码" center ></el-table-column>
            <el-table-column prop="agentName" label="名称" center ></el-table-column>
          </el-table>
          <div class="block">
            <el-pagination
              :pager-count="5"
              @current-change="handleCurrentChange1"
              @size-change="handleSizeChange1"
              :current-page="findOutWorkerData.currentPage"
              :page-size ="findOutWorkerData.pageSize"
              :page-sizes="[10,20,50]"
              layout="total, sizes, prev, pager, next, jumper"
              :total="fenyetotalData"
              >
            </el-pagination>
          </div>
        </div>
      </el-dialog>
      <!-- 保单号弹框 -->
      <el-dialog :append-to-body='true' center width='70%' title="查询详情"  :visible.sync="isBillNo" >
        <el-form class="mesg_form">
          <!-- 基本信息 -->
          <ui-line-tittle :collapsible="true" >
            <span slot="title" >
              <i class="font_family icon-jy-menu-4" ></i>基本信息
            </span>
            <div class="ri-content" slot="content" >
              <el-row >
                <el-col :span="12">
                  <el-form-item>
                    <ui-label-text label="投保单号：" labelWidth="160" >
                      <el-input slot="text" :disabled="true" v-model="BillNoList.baseMesg.proposalNo" ></el-input>
                    </ui-label-text>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item>
                    <ui-label-text label="保单号：" labelWidth="160" >
                      <el-input slot="text" :disabled="true" v-model="BillNoList.baseMesg.policyNo" ></el-input>
                    </ui-label-text>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row >
                <el-col :span="12">
                  <el-form-item>
                    <ui-label-text label="保单状态：" labelWidth="160" >
                      <el-select slot="text" disabled  v-model="BillNoList.baseMesg.policyStatus" placeholder="请选择">
                        <el-option label="未承保" value="1"></el-option>
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
                        <el-option label="保单终止" value="13"></el-option>
                      </el-select>
                    </ui-label-text>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item>
                    <ui-label-text  label="投保日期：" labelWidth="160" >
                      <el-date-picker disabled v-model="BillNoList.baseMesg.proposalDate" slot="text" type="date" placeholder="选择日期"></el-date-picker>
                      <!-- <el-input slot="text" :disabled="true" v-model="BillNoList.baseMesg.proposalDate" ></el-input> -->
                    </ui-label-text>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row >
                <el-col :span="12">
                  <el-form-item>
                    <ui-label-text label="承保日期：" labelWidth="160" >
                      <el-date-picker disabled v-model="BillNoList.baseMesg.acceptDate" slot="text" type="date" placeholder="选择日期"></el-date-picker>
                      <!-- <el-input slot="text" :disabled="true" v-model="BillNoList.baseMesg.acceptDate" ></el-input> -->
                    </ui-label-text>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item>
                    <ui-label-text label="生效日期：" labelWidth="160" >
                      <el-date-picker disabled v-model="BillNoList.baseMesg.generateDate" slot="text" type="date" placeholder="选择日期"></el-date-picker>
                      <!-- <el-input slot="text" :disabled="true" v-model="BillNoList.baseMesg.generateDate" ></el-input> -->
                    </ui-label-text>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row >
                <el-col :span="12">
                  <el-form-item>
                    <ui-label-text label="缴至日期：" labelWidth="160" >
                      <el-date-picker disabled v-model="BillNoList.baseMesg.jzDate" slot="text" type="date" placeholder="选择日期"></el-date-picker>
                      <!-- <el-input slot="text" :disabled="true" v-model="BillNoList.baseMesg.jzDate" ></el-input> -->
                    </ui-label-text>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item>
                    <ui-label-text label="保单年度：" labelWidth="160" >
                      <el-input slot="text" :disabled="true" v-model="BillNoList.baseMesg.bdYear" ></el-input>
                    </ui-label-text>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row >
                <el-col :span="12">
                  <el-form-item>
                    <ui-label-text label="归属保险公司代码：" labelWidth="160" >
                      <el-input slot="text" :disabled="true" v-model="BillNoList.baseMesg.companyCode"></el-input>
                    </ui-label-text>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item>
                    <ui-label-text  label="归属保险公司名称：" labelWidth="160" >
                      <el-input slot="text"  :disabled='true' v-model="BillNoList.baseMesg.companyName" ></el-input>
                    </ui-label-text>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row >
                <el-col :span="12">
                  <el-form-item >
                    <ui-label-text label="归属保险公司机构代码：" labelWidth="160" >
                      <el-input slot="text" :disabled='true' v-model="BillNoList.baseMesg.companyComCode"></el-input>
                    </ui-label-text>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item>
                    <ui-label-text label="归属保险公司机构名称：" labelWidth="160" >
                      <el-input slot="text"  :disabled='true' v-model="BillNoList.baseMesg.companyComName" ></el-input>
                    </ui-label-text>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row >
                <el-col :span="12">
                  <el-form-item>
                    <ui-label-text label="新/续保标记：" labelWidth="160" >
                      <!-- <el-input slot="text" :disabled='true' v-model="BillNoList.baseMesg.insuranceMark"></el-input> -->
                      <el-select slot="text" disabled  v-model="BillNoList.baseMesg.insuranceMark" placeholder="请选择">
                        <el-option label="新保" value="1"></el-option>
                        <el-option label="续保" value="2"></el-option>
                      </el-select>
                    </ui-label-text>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item>
                    <ui-label-text label="是否自动续保：" labelWidth="160" >
                      <el-select slot="text" disabled  v-model="BillNoList.baseMesg.atuoAcceptFlag" placeholder="请选择">
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
                      <el-select slot="text" disabled v-model="BillNoList.baseMesg.businessNature" placeholder="请选择">
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
                      <el-select slot="text" disabled v-model="BillNoList.baseMesg.busiType" placeholder="请选择">
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
                      <el-select slot="text" disabled v-model="BillNoList.baseMesg.xjjzzddjbf" placeholder="请选择">
                        <el-option label="是" value="1"></el-option>
                        <el-option label="否" value="0"></el-option>
                      </el-select>
                    </ui-label-text>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item>
                    <ui-label-text label="账户价值自动抵交保费：" labelWidth="160" >
                      <el-select disabled slot="text" v-model="BillNoList.baseMesg.xjjzdjbff" placeholder="请选择">
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
                      <el-select slot="text" disabled v-model="BillNoList.baseMesg.hllqfs" placeholder="请选择">
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
                      <el-select slot="text" disabled v-model="BillNoList.baseMesg.njlqfs" placeholder="请选择">
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
                      <el-input slot="text" :disabled='true' v-model="BillNoList.baseMesg.speAgreement" ></el-input>
                    </ui-label-text>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item >
                    <ui-label-text label="回执签收日期：" labelWidth="160" >
                      <el-date-picker disabled v-model="BillNoList.baseMesg.backMsgSignDate" slot="text" type="date" placeholder="选择日期"></el-date-picker>
                      <!-- <el-input slot="text" :disabled='true' v-model="BillNoList.baseMesg.backMsgSignDate" ></el-input> -->
                    </ui-label-text>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row >
                <el-col :span="12">
                  <el-form-item >
                    <ui-label-text label="回访状态：" labelWidth="160" >
                      <el-select slot="text" disabled v-model="BillNoList.baseMesg.hfStatus" placeholder="请选择">
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
                      <el-date-picker disabled v-model="BillNoList.baseMesg.hfDate" slot="text" type="date" placeholder="选择日期"></el-date-picker>
                      <!-- <el-input slot="text" :disabled='true' v-model="BillNoList.baseMesg.hfDate" ></el-input> -->
                    </ui-label-text>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row >
                <el-col :span="12">
                  <el-form-item>
                    <ui-label-text label="自保件：" labelWidth="160" >
                      <el-select slot="text" disabled v-model="BillNoList.baseMesg.byMyself" placeholder="请选择">
                        <el-option label="是" value="1"></el-option>
                        <el-option label="否" value="0"></el-option>
                      </el-select>
                    </ui-label-text>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item >
                    <ui-label-text label="出单方式：" labelWidth="160" >
                      <el-select slot="text" disabled v-model="BillNoList.baseMesg.singleMode" placeholder="请选择">
                        <el-option label="同道" value="1"></el-option>
                        <el-option label="微/电投" value="2"></el-option>
                        <el-option label="纸质投保" value="3"></el-option>
                        <el-option label="其他" value="4"></el-option>
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
                  <el-form-item >
                    <ui-label-text label="投保人代码：" labelWidth="160" >
                      <el-input slot="text" :disabled='true' v-model="BillNoList.policyHolder.insureNo" ></el-input>
                    </ui-label-text>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item >
                    <ui-label-text label="投保人名称：" labelWidth="160" >
                      <el-input slot="text" :disabled='true' v-model="BillNoList.policyHolder.insureName" ></el-input>
                    </ui-label-text>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="12">
                  <el-form-item >
                    <ui-label-text label="投保人地址：" labelWidth="160" >
                      <el-input slot="text" :disabled='true' v-model="BillNoList.policyHolder.insureAddress" ></el-input>
                    </ui-label-text>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item  >
                    <ui-label-text label="邮政编码：" labelWidth="160" >
                      <el-input slot="text" :disabled='true' v-model="BillNoList.policyHolder.postNo" ></el-input>
                    </ui-label-text>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row >
                <el-col :span="12">
                  <el-form-item >
                    <ui-label-text label="性别：" labelWidth="160" >
                      <el-select slot="text" disabled v-model="BillNoList.policyHolder.sexType" placeholder="请选择">
                        <el-option label="男" value="0"></el-option>
                        <el-option label="女" value="1"></el-option>
                      </el-select>
                    </ui-label-text>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item >
                    <ui-label-text label="国籍：" labelWidth="160" >
                      <el-input slot="text" :disabled='true' v-model="BillNoList.policyHolder.country" ></el-input>
                    </ui-label-text>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row >
                <el-col :span="12">
                  <el-form-item >
                    <ui-label-text label="出生日期：" labelWidth="160" >
                      <el-date-picker disabled v-model="BillNoList.policyHolder.birthDate" slot="text" type="date" placeholder="选择日期"></el-date-picker>
                    </ui-label-text>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item >
                    <ui-label-text  label="备注：" labelWidth="160" >
                      <el-input slot="text" :disabled='true' v-model="BillNoList.policyHolder.remark" ></el-input>
                    </ui-label-text>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row >
                <el-col :span="12">
                  <el-form-item >
                    <ui-label-text label="婚姻状况：" labelWidth="160" >
                      <el-select slot="text" disabled v-model="BillNoList.policyHolder.marriage" placeholder="请选择">
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
                      <el-select slot="text" disabled v-model="BillNoList.policyHolder.educationCode" placeholder="请选择">
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
                  <el-form-item  >
                    <ui-label-text label="证件类型：" labelWidth="160" >
                      <el-select slot="text" disabled v-model="BillNoList.policyHolder.identifyType" placeholder="请选择">
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
                  <el-form-item>
                    <ui-label-text label="证件号码：" labelWidth="160" >
                      <el-input slot="text" :disabled='true' v-model="BillNoList.policyHolder.identifyNumber" ></el-input>
                    </ui-label-text>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row >
                <el-col :span="12">
                  <el-form-item>
                    <ui-label-text label="证件有效期：" labelWidth="160" >
                      <!-- <el-date-picker disabled v-model="BillNoList.policyHolder.identifyValiddate" slot="text" type="date" placeholder="选择日期"></el-date-picker> -->
                      <el-date-picker style="width: 40%; margin-right: 9%; " :disabled="true" v-model="BillNoList.policyHolder.identifyValiddate" slot="text" type="date" placeholder="选择日期"></el-date-picker>
                        <el-checkbox disabled style="display: inline-block; " slot="text"  size='mini' v-model="BillNoList.policyHolder.longFlagtag" >终身</el-checkbox>
                      <!-- <el-input slot="text" :disabled='true' v-model="BillNoList.policyHolder.identifyValiddate" ></el-input> -->
                    </ui-label-text>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row >
                <el-col :span="12">
                  <el-form-item >
                    <ui-label-text  label="固定电话：" labelWidth="160" >
                      <el-input slot="text" :disabled='true' v-model="BillNoList.policyHolder.insureTel" ></el-input>
                    </ui-label-text>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item >
                    <ui-label-text  label="移动电话：" labelWidth="160" >
                      <el-input slot="text" :disabled='true' v-model="BillNoList.policyHolder.mobilePhone" ></el-input>
                    </ui-label-text>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row >
                <el-col :span="12">
                  <el-form-item >
                    <ui-label-text label="工作单位：" labelWidth="160" >
                      <el-input slot="text"  :disabled='true' v-model="BillNoList.policyHolder.workingUnit" ></el-input>
                    </ui-label-text>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item >
                    <ui-label-text label="职业：" labelWidth="160" >
                      <el-input slot="text"  :disabled='true' v-model="BillNoList.policyHolder.job" ></el-input>
                    </ui-label-text>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row >
                <el-col :span="12">
                  <el-form-item >
                    <ui-label-text label="Email：" labelWidth="160" >
                      <el-input slot="text" :disabled='true' v-model="BillNoList.policyHolder.e_mail" ></el-input>
                    </ui-label-text>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item >
                    <ui-label-text label="微信号：" labelWidth="160" >
                      <el-input slot="text" :disabled='true' v-model="BillNoList.policyHolder.weixin" ></el-input>
                    </ui-label-text>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row >
                <el-col :span="12">
                  <el-form-item >
                    <ui-label-text label="经常居住地：" labelWidth="160" >
                      <el-input slot="text" :disabled='true' v-model="BillNoList.policyHolder.habitualResidence" ></el-input>
                    </ui-label-text>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item >
                    <ui-label-text label="与被保险人关系：" labelWidth="160" >
                      <el-select slot="text"  disabled v-model="BillNoList.policyHolder.insuredrType" placeholder="请选择">
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
                  <el-form-item >
                    <ui-label-text label="关系名称：" labelWidth="160" >
                      <el-input slot="text" :disabled="true" v-model="BillNoList.policyHolder.insuredrName" ></el-input>
                    </ui-label-text>
                  </el-form-item>
                </el-col>
              </el-row>
            </div>
          </ui-line-tittle>
          <!-- 被保险人信息 -->
          <ui-line-tittle :collapsible="true" >
            <span slot="title" >
              <i class="font_family icon-jy-menu-4" ></i>被保险人信息
            </span>
            <div class="ri-content" slot="content" >
              <div v-for="(item, index) in BillNoList.insuredList" :key='index' class='splice-line'>
                <el-row>
                  <el-col :span="12">
                    <el-form-item >
                      <ui-label-text label="被保险人代码：" labelWidth="160" >
                        <el-input slot="text" :disabled='true' v-model="item.insureNoD" ></el-input>
                      </ui-label-text>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item >
                      <ui-label-text label="被保险人名称：" labelWidth="160" >
                        <el-input slot="text" :disabled='true' v-model="item.insureNameD" ></el-input>
                      </ui-label-text>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="12">
                    <el-form-item >
                      <ui-label-text label="被保险人地址：" labelWidth="160" >
                        <el-input slot="text" :disabled='true' v-model="item.insureAddressD" ></el-input>
                      </ui-label-text>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item  >
                      <ui-label-text label="邮政编码：" labelWidth="160" >
                        <el-input slot="text" :disabled='true' v-model="item.postNoD" ></el-input>
                      </ui-label-text>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row >
                  <el-col :span="12">
                    <el-form-item >
                      <ui-label-text label="性别：" labelWidth="160" >
                        <el-select slot="text" disabled v-model="item.sexTypeD" placeholder="请选择">
                          <el-option label="男" value="0"></el-option>
                          <el-option label="女" value="1"></el-option>
                        </el-select>
                      </ui-label-text>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item >
                      <ui-label-text label="国籍：" labelWidth="160" >
                        <el-input slot="text" :disabled='true' v-model="item.countryD" ></el-input>
                      </ui-label-text>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row >
                  <el-col :span="12">
                    <el-form-item >
                      <ui-label-text label="出生日期：" labelWidth="160" >
                        <el-date-picker disabled v-model="item.birthDateD" slot="text" type="date" placeholder="选择日期"></el-date-picker>
                      </ui-label-text>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item >
                      <ui-label-text  label="备注：" labelWidth="160" >
                        <el-input slot="text" :disabled='true' v-model="item.remark" ></el-input>
                      </ui-label-text>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row >
                  <el-col :span="12">
                    <el-form-item >
                      <ui-label-text label="婚姻状况：" labelWidth="160" >
                        <el-select slot="text" disabled v-model="item.marriageD" placeholder="请选择">
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
                        <el-select slot="text" disabled v-model="item.educationCodeD" placeholder="请选择">
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
                    <el-form-item  >
                      <ui-label-text label="证件类型：" labelWidth="160" >
                        <el-select slot="text" disabled v-model="item.identifyTypeD" placeholder="请选择">
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
                    <el-form-item>
                      <ui-label-text label="证件号码：" labelWidth="160" >
                        <el-input slot="text" :disabled='true' v-model="item.identifyNumberD" ></el-input>
                      </ui-label-text>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row >
                  <el-col :span="12">
                    <el-form-item>
                      <ui-label-text label="证件有效期：" labelWidth="160" >
                        <el-date-picker style="width: 40%; margin-right: 9%; " :disabled="true" v-model="item.identifyValiddateD" slot="text" type="date" placeholder="选择日期"></el-date-picker>
                        <el-checkbox disabled style="display: inline-block; " slot="text"  size='mini' v-model="item.longFlagtag" >终身</el-checkbox>
                      </ui-label-text>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row >
                  <el-col :span="12">
                    <el-form-item >
                      <ui-label-text  label="固定电话：" labelWidth="160" >
                        <el-input slot="text" :disabled='true' v-model="item.insureTelD" ></el-input>
                      </ui-label-text>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item >
                      <ui-label-text  label="移动电话：" labelWidth="160" >
                        <el-input slot="text" :disabled='true' v-model="item.mobilePhoneD" ></el-input>
                      </ui-label-text>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row >
                  <el-col :span="12">
                    <el-form-item >
                      <ui-label-text label="工作单位：" labelWidth="160" >
                        <el-input slot="text"  :disabled='true' v-model="item.workingUnitD" ></el-input>
                      </ui-label-text>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item >
                      <ui-label-text label="职业：" labelWidth="160" >
                        <el-input slot="text"  :disabled='true' v-model="item.jobD" ></el-input>
                      </ui-label-text>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row >
                  <el-col :span="12">
                    <el-form-item >
                      <ui-label-text label="Email：" labelWidth="160" >
                        <el-input slot="text" :disabled='true' v-model="item.e_mailD" ></el-input>
                      </ui-label-text>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item >
                      <ui-label-text label="微信号：" labelWidth="160" >
                        <el-input slot="text" :disabled='true' v-model="item.weixinD" ></el-input>
                      </ui-label-text>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row >
                  <el-col :span="12">
                    <el-form-item >
                      <ui-label-text label="经常居住地：" labelWidth="160" >
                        <el-input slot="text" :disabled='true' v-model="item.habitualResidenceD" ></el-input>
                      </ui-label-text>
                    </el-form-item>
                  </el-col>
                </el-row>
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
                      <el-radio-group disabled slot="text" v-model="BillNoList.baseMesg.sgFlag" >
                        <el-radio :label="1">法定受益人</el-radio>
                        <el-radio :label="2">指定受益人</el-radio>
                      </el-radio-group>
                    </ui-label-text>
                  </el-form-item>
                </el-col>
              </el-row>
              <div v-if='BillNoList.baseMesg.sgFlag == 2'>
                <div class='tabShow splice-line'  v-for='(item, index) in BillNoList.dieBeniftList' :key='index' >
                  <el-row>
                    <el-col :span="12">
                      <el-form-item >
                        <ui-label-text label="姓名："  labelWidth="160" >
                          <el-input :disabled="true" slot="text" v-model="item.partyName" ></el-input>
                        </ui-label-text>
                      </el-form-item>
                    </el-col>
                    <el-col :span="12">
                      <el-form-item   >
                        <ui-label-text   label="证件类型：" labelWidth="160" >
                          <el-select disabled slot="text" v-model="item.identifyType" placeholder="请选择">
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
                      <el-form-item   >
                        <ui-label-text label="证件号码："  labelWidth="160" >
                          <el-input :disabled="true" slot="text" v-model="item.identifyNumber" ></el-input>
                        </ui-label-text>
                      </el-form-item>
                    </el-col>
                    <el-col :span="12">
                      <el-form-item  >
                        <ui-label-text  label="证件有效期：" labelWidth="160" >
                          <el-date-picker style="width: 40%; margin-right: 9%; " :disabled="true" v-model="item.identifyValiddate" slot="text" type="date" placeholder="选择日期"></el-date-picker>
                          <el-checkbox disabled style="display: inline-block; " slot="text"  size='mini' v-model="item.longFlagtag" >终身</el-checkbox>
                        </ui-label-text>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row>
                    <el-col :span="12">
                      <el-form-item >
                        <ui-label-text label="性别："  labelWidth="160" >
                          <el-select disabled slot="text" v-model="item.sex" placeholder="请选择">
                            <el-option label="男" value="0"></el-option>
                            <el-option label="女" value="1"></el-option>
                          </el-select>
                        </ui-label-text>
                      </el-form-item>
                    </el-col>
                    <el-col :span="12">
                      <el-form-item >
                        <ui-label-text label="出生日期："  labelWidth="160" >
                          <el-date-picker disabled v-model="item.birthdate" slot="text" type="date" placeholder="选择日期"></el-date-picker>
                        </ui-label-text>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row>
                    <el-col :span="12">
                      <el-form-item >
                        <ui-label-text  label="备注：" labelWidth="160" >
                          <el-input :disabled="true" slot="text" v-model="item.remark" ></el-input>
                        </ui-label-text>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row>
                    <el-col :span="12">
                      <el-form-item >
                        <ui-label-text label="受益顺序："  labelWidth="160" >
                          <el-select disabled slot="text" v-model="item.beneficialOrder" placeholder="请选择">
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
                      <el-form-item >
                        <ui-label-text label="受益份额（%）："  labelWidth="160" >
                          <el-input :disabled="true" slot="text" v-model="item.benefitShare" ></el-input>
                        </ui-label-text>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row>
                    <el-col :span="12">
                      <el-form-item  >
                        <ui-label-text   label="与被保险人关系：" labelWidth="160" >
                          <el-select disabled slot="text" v-model="item.insuredrType" placeholder="请选择">
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
                          <el-input :disabled="true" slot="text" v-model="item.insuredrName" ></el-input>
                        </ui-label-text>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row>
                    <el-col :span="12">
                      <el-form-item  >
                        <ui-label-text label="联系方式：" labelWidth="160" >
                          <el-input :disabled="true" slot="text" v-model="item.phone" ></el-input>
                        </ui-label-text>
                      </el-form-item>
                    </el-col>
                    <el-col :span="12">
                      <el-form-item >
                        <ui-label-text label="经常居住地：" labelWidth="160" >
                          <el-input :disabled="true" slot="text" v-model="item.habitualResidenc" ></el-input>
                        </ui-label-text>
                      </el-form-item>
                    </el-col>
                  </el-row>
                </div>
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
                      <el-radio-group disabled slot="text" v-model="BillNoList.baseMesg.scFlag">
                        <el-radio :label="1">投保人</el-radio>
                        <el-radio :label="2">被保险人</el-radio>
                        <el-radio :label="3">其他</el-radio>
                      </el-radio-group>
                    </ui-label-text>
                  </el-form-item>
                </el-col>
              </el-row>
              <div v-if='BillNoList.baseMesg.scFlag == 3'>
                <div class='tabShow'  v-for='(item, index) in BillNoList.liveBeniftList' :key='index'>
                  <el-row>
                    <el-col :span="12">
                      <el-form-item >
                        <ui-label-text label="姓名："  labelWidth="160" >
                          <el-input :disabled="true" slot="text" v-model="item.partyName" ></el-input>
                        </ui-label-text>
                      </el-form-item>
                    </el-col>
                    <el-col :span="12">
                      <el-form-item   >
                        <ui-label-text   label="证件类型：" labelWidth="160" >
                          <el-select disabled slot="text" v-model="item.identifyType" placeholder="请选择">
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
                      <el-form-item   >
                        <ui-label-text label="证件号码："  labelWidth="160" >
                          <el-input :disabled="true" slot="text" v-model="item.identifyNumber" ></el-input>
                        </ui-label-text>
                      </el-form-item>
                    </el-col>
                    <el-col :span="12">
                      <el-form-item  >
                        <ui-label-text  label="证件有效期：" labelWidth="160" >
                          <el-date-picker v-if="item.longFlag === 0||!(item.longFlag)" disabled v-model="item.identifyValiddate" slot="text" type="date" placeholder="选择日期"></el-date-picker>
                          <!-- <el-input :disabled="true" slot="text" v-model="subsistBenefit.identifyValiddate" ></el-input> -->
                          <el-input v-else slot="text" readonly placeholder="永久有效" ></el-input>
                        </ui-label-text>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row>
                    <el-col :span="12">
                      <el-form-item >
                        <ui-label-text label="性别："  labelWidth="160" >
                          <el-select disabled slot="text" v-model="item.sex" placeholder="请选择">
                            <el-option label="男" value="0"></el-option>
                            <el-option label="女" value="1"></el-option>
                          </el-select>
                        </ui-label-text>
                      </el-form-item>
                    </el-col>
                    <el-col :span="12">
                      <el-form-item >
                        <ui-label-text label="出生日期："  labelWidth="160" >
                          <el-date-picker disabled v-model="item.birthdate" slot="text" type="date" placeholder="选择日期"></el-date-picker>
                          <!-- <el-input :disabled="true" slot="text" v-model="subsistBenefit.birthdate" ></el-input> -->
                        </ui-label-text>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row>
                    <el-col :span="12">
                      <el-form-item >
                        <ui-label-text  label="备注：" labelWidth="160" >
                          <el-input :disabled="true" slot="text" v-model="item.remark" ></el-input>
                        </ui-label-text>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row>
                    <el-col :span="12">
                      <el-form-item >
                        <ui-label-text label="受益顺序："  labelWidth="160" >
                          <el-select disabled slot="text" v-model="item.beneficialOrder" placeholder="请选择">
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
                      <el-form-item >
                        <ui-label-text label="受益份额（%）："  labelWidth="160" >
                          <el-input :disabled="true" slot="text" v-model="item.benefitShare" ></el-input>
                        </ui-label-text>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row>
                    <el-col :span="12">
                      <el-form-item  >
                        <ui-label-text   label="与被保险人关系：" labelWidth="160" >
                          <el-select disabled slot="text" v-model="item.insuredrType" placeholder="请选择">
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
                          <el-input :disabled="true" slot="text" v-model="item.insuredrName" ></el-input>
                        </ui-label-text>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row>
                    <el-col :span="12">
                      <el-form-item  >
                        <ui-label-text label="联系方式：" labelWidth="160" >
                          <el-input :disabled="true" slot="text" v-model="item.phone" ></el-input>
                        </ui-label-text>
                      </el-form-item>
                    </el-col>
                    <el-col :span="12">
                      <el-form-item >
                        <ui-label-text label="经常居住地：" labelWidth="160" >
                          <el-input :disabled="true" slot="text" v-model="item.habitualResidenc" ></el-input>
                        </ui-label-text>
                      </el-form-item>
                    </el-col>
                  </el-row>
                </div>
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
                  <el-form-item >
                    <ui-label-text label="业务员代码" labelWidth="160" >
                      <el-input slot="text" :disabled="true" v-model="BillNoList.baseMesg.handlerCode" ></el-input>
                    </ui-label-text>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item   >
                    <ui-label-text label="业务员名称"  labelWidth="160" >
                      <el-input slot="text" :disabled="true" v-model="BillNoList.baseMesg.handlerName" ></el-input>
                    </ui-label-text>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="12">
                  <el-form-item   >
                    <ui-label-text label="归属机构/部门代码："  labelWidth="160" >
                      <el-input slot="text" :disabled="true" v-model="BillNoList.baseMesg.comCode" ></el-input>
                    </ui-label-text>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item  >
                    <ui-label-text  label="归属机构/部门名：" labelWidth="160" >
                      <el-input slot="text" :disabled="true" v-model="BillNoList.baseMesg.comName" ></el-input>
                    </ui-label-text>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="12">
                  <el-form-item >
                    <ui-label-text label="介绍人类型："  labelWidth="160" >
                      <el-input slot="text" :disabled="true" v-model="BillNoList.baseMesg.introduceType" ></el-input>
                    </ui-label-text>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item >
                    <ui-label-text label="业务员状态："  labelWidth="160" >
                      <el-select disabled v-model="BillNoList.baseMesg.agentStatus" slot="text" placeholder="请选择">
                        <el-option label="离职" value="0"></el-option>
                        <el-option label="在职" value="1"></el-option>
                      </el-select>
                    </ui-label-text>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="12">
                  <el-form-item >
                    <ui-label-text label="介绍人代码："  labelWidth="160" >
                      <el-input slot="text" :disabled="true" v-model="BillNoList.baseMesg.introduceCode" ></el-input>
                    </ui-label-text>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item >
                    <ui-label-text label="介绍人姓名："  labelWidth="160" >
                      <el-input slot="text" :disabled="true" v-model="BillNoList.baseMesg.introduceName" ></el-input>
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
            <div class="ri-content" slot="content" >
                <el-table border :data="BillNoList.insureTypeList" style="width: 100%">
                  <el-table-column prop="riskCode" label="险种代码" width="120"></el-table-column>
                  <el-table-column prop="riskName" label="险种名称" width="200" ></el-table-column>
                  <el-table-column prop="mainFlag" label="主/附险标识" width="120">
                    <template slot-scope="scope" >
                      <el-select disabled size='mini' v-model="scope.row.mainFlag" slot="text" placeholder="请选择">
                          <el-option label="附加险" value="0"></el-option>
                          <el-option label="主险" value="1"></el-option>
                          <el-option label="主/附险" value="3"></el-option>
                        </el-select>
                    </template>
                  </el-table-column>
                  <el-table-column prop="paymentPeriod" label="缴费年期" width="120">
                    <template slot-scope="scope">
                      <el-input slot="text" size='mini' :disabled="true" v-model="scope.row.paymentPeriod" ></el-input>
                    </template>
                  </el-table-column>
                  <el-table-column prop="payrate" label="缴费频率" width="120">
                    <template slot-scope="scope">
                        <el-select disabled size='mini' v-model="scope.row.payrate" slot="text" placeholder="请选择">
                          <el-option label="天缴" value="0"></el-option>
                          <el-option label="月缴" value="1"></el-option>
                          <el-option label="季缴" value="2"></el-option>
                          <el-option label="年缴" value="3"></el-option>
                          <el-option label="趸缴" value="4"></el-option>
                          <el-option label="半年缴" value="5"></el-option>
                        </el-select>
                    </template>
                  </el-table-column>
                  <el-table-column prop="premium" label="应缴保费" width="120">
                    <template slot-scope="scope">
                      <el-input size='mini' :disabled='true' slot="text" v-model="scope.row.premium" ></el-input>
                    </template>
                  </el-table-column>
                  <el-table-column prop="riskPremium" label="保险金额" width="120">
                    <template slot-scope="scope">
                      <el-input size='mini' :disabled='true' slot="text" v-model="scope.row.riskPremium" ></el-input>
                    </template>
                  </el-table-column>
                  <el-table-column prop="number" label="份数" width="120">
                    <template slot-scope="scope">
                      <el-input size='mini' :disabled='true' slot="text" v-model="scope.row.number" ></el-input>
                    </template>
                  </el-table-column>
                  <el-table-column prop="addPremium" label="加费金额" width="120">
                    <template slot-scope="scope">
                      <el-input size='mini' :disabled='true' slot="text" v-model="scope.row.addPremium" ></el-input>
                    </template>
                  </el-table-column>
                  <el-table-column prop="freeDate" label="豁免日期" width="200">
                    <template slot-scope="scope">
                      <el-date-picker size="mini" style="width: 100%; "  v-model="scope.row.freeDate" :disabled="true" slot="text" type="date" placeholder="选择日期"></el-date-picker>
                    </template>
                  </el-table-column>
                  <el-table-column prop="tbrFreeFlag" label="豁免人" width="200">
                    <template slot-scope="scope">
                      <el-checkbox disabled size="mini" v-model="scope.row.tbrFreeFlag">投保人</el-checkbox>
                      <el-checkbox disabled size='mini' v-model="scope.row.bbrFreeFlag" >被保人</el-checkbox>
                    </template>
                  </el-table-column>
                  <el-table-column prop="startDate" label="保险期间" width="350">
                    <template slot-scope="scope">
                      <el-date-picker size="mini" :disabled="true" style="width: 45%; margin-right: 2%; " v-model="scope.row.startDate" slot="text" type="date" placeholder="选择日期"></el-date-picker>至
                      <el-date-picker size="mini" :disabled="true" style="width: 45%; margin-right: 2%; " v-if='scope.row.lifeFlag == false' v-model="scope.row.endDate" slot="text" type="date" placeholder="选择日期"></el-date-picker>
                      <el-checkbox :disabled="true"  size='mini' v-model="scope.row.lifeFlag" >终身</el-checkbox>
                    </template>
                  </el-table-column>
                  <el-table-column prop="riskStatus" label="险种状态" width="120">
                    <template slot-scope="scope">
                      {{ scope.row.riskStatus === '0' ?  '失效': '' }}
                      {{ scope.row.riskStatus === '2' ?  '有效': '' }}
                      {{ scope.row.riskStatus === '3' ?  '拒保': '' }}
                      {{ scope.row.riskStatus === '4' ?  '退保': '' }}
                      {{ scope.row.riskStatus === '5' ?  '犹退': '' }}
                      {{ scope.row.riskStatus === '6' ?  '失效': '' }}
                      {{ scope.row.riskStatus === '7' ?  '永久失效': '' }}
                      {{ scope.row.riskStatus === '8' ?  '理赔中': '' }}
                      {{ scope.row.riskStatus === '9' ?  '理赔终止': '' }}
                      {{ scope.row.riskStatus === '10' ?  '减额交清': '' }}
                      {{ scope.row.riskStatus === '11' ?  '交清': '' }}
                      {{ scope.row.riskStatus === '12' ?  '冻结': '' }}
                      {{ scope.row.riskStatus === '13' ?  '到期终止': '' }}
                      {{ scope.row.riskStatus === '14' ?  '死亡理赔': '' }}
                    </template>
                  </el-table-column>
                </el-table>
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
                      <el-date-picker disabled slot="text" v-model="BillNoList.payFeeList.paidDate" type="date" placeholder="选择日期"></el-date-picker>
                    </ui-label-text>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item  >
                    <ui-label-text label="缴费方式"  labelWidth="160" >
                      <el-select disabled v-model="BillNoList.payFeeList.firstal" slot="text" placeholder="请选择">
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
                      <el-select disabled v-model="BillNoList.payFeeList.bankName" slot="text" placeholder="请选择">
                        <el-option label="中国银行" value="1"></el-option>
                        <el-option label="其他" value="2"></el-option>
                      </el-select>
                    </ui-label-text>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item >
                    <ui-label-text label="账户名：" labelWidth="160" >
                      <el-input disabled slot="text" v-model="BillNoList.payFeeList.accountNameFirstal" ></el-input>
                    </ui-label-text>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="12">
                  <el-form-item >
                    <ui-label-text label="账号：" labelWidth="160" >
                      <el-input disabled slot="text" v-model="BillNoList.payFeeList.accountFirstal" ></el-input>
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
              <el-table border :data="BillNoList.payFeeDetailList" style="width: 100%">
                <el-table-column prop="riskCode" label="险种代码"></el-table-column>
                <el-table-column prop="riskName" label="险种名称"></el-table-column>
                <el-table-column prop="paidPremium" label="实收保费"></el-table-column>
                <el-table-column prop="payDate" label="实收日期">
                  <template slot-scope="scope">
                    <el-date-picker disabled size="mini" style="width: auto;" v-model="scope.row.payDate" slot="text" type="date" placeholder="选择日期"></el-date-picker>
                  </template>
                </el-table-column>
                <el-table-column prop="riskStatus" label="险种状态">
                  <template slot-scope="scope">
                    {{ scope.row.riskStatus === '0' ?  '失效': '' }}
                    {{ scope.row.riskStatus === '2' ?  '有效': '' }}
                    {{ scope.row.riskStatus === '3' ?  '拒保': '' }}
                    {{ scope.row.riskStatus === '4' ?  '退保': '' }}
                    {{ scope.row.riskStatus === '5' ?  '犹退': '' }}
                    {{ scope.row.riskStatus === '6' ?  '失效': '' }}
                    {{ scope.row.riskStatus === '7' ?  '永久失效': '' }}
                    {{ scope.row.riskStatus === '8' ?  '理赔中': '' }}
                    {{ scope.row.riskStatus === '9' ?  '理赔终止': '' }}
                    {{ scope.row.riskStatus === '10' ?  '减额交清': '' }}
                    {{ scope.row.riskStatus === '11' ?  '交清': '' }}
                    {{ scope.row.riskStatus === '12' ?  '冻结': '' }}
                    {{ scope.row.riskStatus === '13' ?  '到期终止': '' }}
                    {{ scope.row.riskStatus === '14' ?  '死亡理赔': '' }}
                  </template>
                </el-table-column>
              </el-table>
              <el-row style="margin-top: 20px;">
                <el-col :span="12">
                  <el-form-item  >
                    <ui-label-text label="应缴保费总计：" labelWidth="160" >
                      <el-input disabled slot="text" v-model="BillNoList.payFeeList.sumPremium" ></el-input>
                    </ui-label-text>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item >
                    <ui-label-text label="实收保费总计" labelWidth="160" >
                      <el-input disabled slot="text" v-model="BillNoList.payFeeList.paidPremium" ></el-input>
                    </ui-label-text>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="12">
                  <el-form-item  >
                    <ui-label-text label="缴费状态：" labelWidth="160" >
                      <el-select disabled v-model="BillNoList.payFeeList.paymentFlag" slot="text" placeholder="请选择">
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
        </el-form>
      </el-dialog>

      <!-- 投保人弹框 -->
      <el-dialog :append-to-body='true' center width='75%' title="投保人详细信息"  :visible.sync="isIns" >
        <el-form class="mesg_form">
          <!-- 基本信息 -->
          <ui-line-tittle :collapsible="true" >
            <span slot="title" >
              <i class="font_family icon-jy-menu-4" ></i>投保人信息
            </span>
            <div class="ri-content" slot="content" >
              <el-row>
                <el-col :span="12">
                  <el-form-item >
                    <ui-label-text label="投保人代码：" labelWidth="160" >
                      <el-input slot="text" :disabled='true' v-model="applicantList.insureNo" ></el-input>
                    </ui-label-text>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item >
                    <ui-label-text label="投保人名称：" labelWidth="160" >
                      <el-input slot="text" :disabled='true' v-model="applicantList.insureName" ></el-input>
                    </ui-label-text>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="12">
                  <el-form-item >
                    <ui-label-text label="投保人地址：" labelWidth="160" >
                      <el-input slot="text" :disabled='true' v-model="applicantList.insureAddress" ></el-input>
                    </ui-label-text>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item >
                    <ui-label-text label="投保人电话：" labelWidth="160" >
                      <el-input slot="text" :disabled='true' v-model="applicantList.insureAddress" ></el-input>
                    </ui-label-text>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row >
                <el-col :span="12">
                  <el-form-item >
                    <ui-label-text label="性别：" labelWidth="160" >
                      <el-select slot="text" disabled v-model="applicantList.sexType" placeholder="请选择">
                        <el-option label="男" value="0"></el-option>
                        <el-option label="女" value="1"></el-option>
                      </el-select>
                    </ui-label-text>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item >
                    <ui-label-text label="出生日期：" labelWidth="160" >
                      <el-date-picker disabled v-model="applicantList.birthDate" slot="text" type="date" placeholder="选择日期"></el-date-picker>
                    </ui-label-text>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row >
                <el-col :span="12">
                  <el-form-item >
                    <ui-label-text label="婚姻状况：" labelWidth="160" >
                      <el-select slot="text" disabled v-model="applicantList.marriage" placeholder="请选择">
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
                      <el-select slot="text" disabled v-model="applicantList.educationCode" placeholder="请选择">
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
                  <el-form-item  >
                    <ui-label-text label="证件类型：" labelWidth="160" >
                      <el-select slot="text" disabled v-model="applicantList.identifyType" placeholder="请选择">
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
                  <el-form-item>
                    <ui-label-text label="证件号码：" labelWidth="160" >
                      <el-input slot="text" :disabled='true' v-model="applicantList.identifyNumber" ></el-input>
                    </ui-label-text>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row >
                <el-col :span="12">
                  <el-form-item>
                    <ui-label-text label="证件有效期：" labelWidth="160" >
                      <el-date-picker v-if="applicantList.longFlag === 0||!(applicantList.longFlag)" disabled v-model="applicantList.identifyValiddate" slot="text" type="date" placeholder="选择日期"></el-date-picker>
                      <el-input v-else slot="text" readonly placeholder="永久有效" ></el-input>
                    </ui-label-text>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item >
                    <ui-label-text  label="移动电话：" labelWidth="160" >
                      <el-input slot="text" :disabled='true' v-model="applicantList.mobilePhone" ></el-input>
                    </ui-label-text>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row >
                <el-col :span="12">
                  <el-form-item >
                    <ui-label-text  label="固定电话：" labelWidth="160" >
                      <el-input slot="text" :disabled='true' v-model="applicantList.insureTel" ></el-input>
                    </ui-label-text>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item  >
                    <ui-label-text label="邮政编码：" labelWidth="160" >
                      <el-input slot="text" :disabled='true' v-model="applicantList.postNo" ></el-input>
                    </ui-label-text>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row >
                <el-col :span="12">
                  <el-form-item >
                    <ui-label-text label="与被保险人关系：" labelWidth="160" >
                      <el-select slot="text"  disabled v-model="applicantList.insuredrType" placeholder="请选择">
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
                  <el-form-item >
                    <ui-label-text label="国籍：" labelWidth="160" >
                      <el-input slot="text" :disabled='true' v-model="applicantList.country" ></el-input>
                    </ui-label-text>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row >
                <el-col :span="12">
                  <el-form-item >
                    <ui-label-text label="工作单位：" labelWidth="160" >
                      <el-input slot="text"  :disabled='true' v-model="applicantList.workingUnit" ></el-input>
                    </ui-label-text>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item >
                    <ui-label-text label="职业：" labelWidth="160" >
                      <el-input slot="text"  :disabled='true' v-model="applicantList.job" ></el-input>
                    </ui-label-text>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row >
                <el-col :span="12">
                  <el-form-item >
                    <ui-label-text label="Email：" labelWidth="160" >
                      <el-input slot="text" :disabled='true' v-model="applicantList.e_mail" ></el-input>
                    </ui-label-text>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item >
                    <ui-label-text label="微信号：" labelWidth="160" >
                      <el-input slot="text" :disabled='true' v-model="applicantList.weixin" ></el-input>
                    </ui-label-text>
                  </el-form-item>
                </el-col>
              </el-row>
            </div>
          </ui-line-tittle>
        </el-form>
      </el-dialog>

    <el-dialog
      center
      title="指派离职单"
      :visible.sync="quitDialogVis"
      width="70%"
      :append-to-body='true'
      :before-close="closechangequitDialog">
      <ui-line-tittle :collapsible="true" >
        <span slot="title" >
            <i class="font_family icon-jy-menu-4" ></i>原业务员信息
        </span>
        <div class="ri-content1" slot="content">
          <el-row class="ri-line">
            <el-col :span="12">
              <ui-label-text labelWidth="130" label="业务员代码:" :text="quitListDetail.agentCode" ></ui-label-text>
            </el-col>
            <el-col :span="12">
              <ui-label-text labelWidth="130" label="业务员名称：" :text="quitListDetail.agentName" ></ui-label-text>
            </el-col>
          </el-row>
          <el-row class="ri-line">
            <el-col :span="12">
              <ui-label-text labelWidth="130" label="归属机构代码：" :text="quitListDetail.comCode" ></ui-label-text>
            </el-col>
            <el-col :span="12">
              <ui-label-text labelWidth="130" label="归属机构名称：" :text="quitListDetail.comName" ></ui-label-text>
            </el-col>
          </el-row>
        </div>
      </ui-line-tittle>
      <ui-line-tittle :collapsible="true" >
        <span slot="title" >
            <i class="font_family icon-jy-menu-4" ></i>离职单指派
        </span>
        <div class="ri-content1" slot="content">
          <el-form ref="zhipaiInfo" :rules="rules" :model="quitListDetail">
            <el-row class="ri-line">
              <el-col :span=12>
                <el-form-item prop='identityType'>
                  <ui-label-text labelWidth="130" label="人员类型：" :required="true">
                    <el-select v-model="quitListDetail.agentType"  slot="text" placeholder="请选择证件类型">
                      <el-option
                          label="续收人员"
                          value="1">
                      </el-option>
                      <el-option
                          label="服务人员"
                          value="2">
                      </el-option>
                    </el-select>
                  </ui-label-text>
                </el-form-item>
              </el-col>
            </el-row>
            <div v-if="quitListDetail.agentType === '1'">
              <el-row class="ri-line">
                <el-col :span=12>
                  <el-form-item prop='agentCode2'>
                    <ui-label-text labelWidth="130" label="业务员代码："  :required="true">
                      <el-input v-model="quitListDetail.agentCode2" clearable slot='text' @dblclick.native="openComDialog(3)" @blur='opensingleComDialog(3)' placeholder="双击可选择"></el-input>
                    </ui-label-text>
                  </el-form-item>
                </el-col>
                <el-col :span=12>
                  <el-form-item prop='agentName2'>
                    <ui-label-text labelWidth="130" label="业务员名称："  :required="true">
                      <el-input v-model="quitListDetail.agentName2" clearable slot='text' @dblclick.native="openComDialog(3)" @blur='opensingleComDialog(3)' placeholder="双击可选择"></el-input>
                    </ui-label-text>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row class="ri-line">
                <el-col :span=12>
                  <el-form-item prop='comCode2'>
                    <ui-label-text labelWidth="130" label="归属机构代码："  :required="true">
                      <el-input v-model="quitListDetail.comCode2" clearable slot='text'></el-input>
                    </ui-label-text>
                  </el-form-item>
                </el-col>
                <el-col :span=12>
                  <el-form-item prop='comName2'>
                    <ui-label-text labelWidth="130" label="归属机构名称："  :required="true">
                      <el-input v-model="quitListDetail.comName2" clearable slot='text'></el-input>
                    </ui-label-text>
                  </el-form-item>
                </el-col>
              </el-row>
            </div>
            <div v-else>
              <el-row class="ri-line">
                <el-col :span=12>
                  <el-form-item prop='agentTypeName'>
                    <ui-label-text labelWidth="130" label="服务人员名称："  :required="true">
                      <el-input v-model="quitListDetail.agentTypeName" clearable slot='text'></el-input>
                    </ui-label-text>
                  </el-form-item>
                </el-col>
              </el-row>
            </div>
          </el-form>
        </div>
      </ui-line-tittle>
      <div class="btn-container">
        <el-button type="primary" @click="submitForm('zhipaiInfo')">提交</el-button>
      </div>
    </el-dialog>

    <div v-if='tableShowOrNot'>
      <el-table stripe ref="multipleTable" tooltip-effect="dark" style="width: 100%" :data="tableData"
        >
        <el-table-column prop="policyNo" label="保单号"  width="400" show-overflow-tooltip>
          <template slot-scope="scope" >
            <span @click="baodanDetailGet1(scope.row.policyNo)" class="tableButton">{{ scope.row.policyNo }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="comyanyName" label="保险公司名称" width="400" show-overflow-tooltip>
        </el-table-column>
        <el-table-column prop="partyName" label="投保人姓名" width="250" show-overflow-tooltip>
          <template slot-scope="scope">
            <span @click="baodanDetailGet2(scope.row)" class="tableButton">{{ scope.row.partyName }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="genDate" label="保单生效日" width="250" show-overflow-tooltip>
        </el-table-column>
        <el-table-column prop="padiPremium" label="实收保费" width="200" show-overflow-tooltip>
        </el-table-column>
        <el-table-column prop="sendQuitPaper" label="指派离职单" width="300" show-overflow-tooltip>
          <template slot-scope="scope">
            <el-button type="primary" @click="openSendQuitList(scope.row.policyNo)" size="small" >修改</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="block">
        <el-pagination
          :pager-count="5"
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
    </div>
    <el-dialog :append-to-body='true' title="导入离职单" :visible.sync="showImportDialog" :before-close='importDialogClose'>
      <span>请选择文件路径</span>
      <div>
        <el-upload
          class="upload-rate"
          :action="uploadUrl()"
          :limit="1"
          name="file"
          :on-success="handleEXLSuccess"
          accept='xls'
          :file-list="fileList">
          <el-button size="small" type="primary">点击上传</el-button>
          <div slot="tip" class="el-upload__tip"></div>
        </el-upload>
        <el-button type="primary" @click.native.prevent="downloadModal()" class='moban'>离职单模板下载</el-button>
      </div>
    </el-dialog>
    <el-dialog title="提示信息" center :append-to-body='true' :visible.sync='makeReportListTip'>
      <span class="center">是否修改续{{isFirst}}保单对应的业务员</span>
      <div class="btn-container">
        <el-button @click="makeReportListTip = false;quitDialogVis = true">确定</el-button>
        <el-button @click="makeReportListTip = false;isFirst = ''">取消</el-button>
      </div>
    </el-dialog>
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
      quanxian: {
        query: true,
        import: true
      },
      queryInfo: {
        comCode: '',
        comCode2: '',
        agentCode: '',
        agentName: '',
        pageSize: 10,
        currentPage: 1
      },
      findWorkerInfo: {
        agentCode: '',
        agentName: '',
        comCode: '',
        comName: '',
        validStatus: '0',
        pageSize: 10,
        currentPage: 1,
        clickType: '2'
      },
      findOutWorkerData: {
        agentCode: '',
        agentName: '',
        comCode: '',
        comName: '',
        validStatus: '1',
        pageSize: 10,
        currentPage: 1,
        clickType: '2'
      },
      salesmanInfoList: [
        [{label: '原业务员代码', prop: 'agentCode'}, {label: '原业务员名称', prop: 'agentName'}],
        [{label: '原业务员状态', prop: 'agentStatus'}],
        [{label: '原归属机构/部门代码', prop: 'comCode'}, {label: '原归属机构/部门名称', prop: 'comName'}],
        [{label: '介绍人类型', prop: 'introduceType'}, {label: '介绍人代码', prop: 'introduceCode'}],
        [{label: '介绍人名称', prop: 'introduceName'}, {label: '联系人电话', prop: 'agentPhone'}],
        [{label: '新业务员代码', prop: 'agentCode2'}, {label: '新业务员名称', prop: 'agentName2'}],
        [{label: '新业务员状态', prop: 'agentStatus2'}, {label: '服务人员名称', prop: 'agentTypeName'}]
      ],
      enumes: {
        agentStatus: {
          '0': '离职',
          '1': '在职'
        },
        introduceTypes: {
          '0': '0',
          '1': '1'
        }
      },
      rules: {
        agentCode2: [
          { required: true, message: '请输入业务员代码', trigger: 'change' }
        ],
        agentName2: [
          { required: true, message: '请输入业务员名称', trigger: 'change' }
        ],
        comCode2: [
          { required: true, message: '请输入归属机构代码', trigger: 'change' }
        ],
        comName2: [
          { required: true, message: '请输入归属机构名称', trigger: 'change' }
        ],
        agentTypeName: [
          { required: true, message: '请输入服务人员名称', trigger: 'change' }
        ]
      },
      quitListDetail: {
        agentTypeName: '',
        agentType: '',
        agentCode: '',
        agentName: '',
        comCode2: '',
        comName2: '',
        policyNo: ''
      },
      tableData: [],
      rules1: {},
      quitListMgrZhipaijieguo: '',
      fileList: [],
      isFirst: '',
      makeReportListTip: false,
      quitDialogVis: false,
      tableShowOrNot: false,
      comDialog: false,
      comDialogworker: true,
      comDialogCom: false,
      comDialog1: false,
      comDialogworker1: true,
      comDialogCom1: false,
      comDialog2: false,
      comDialogworker2: true,
      comDialogCom2: false,
      showImportDialog: false,
      singleInsureCheckDetail1: false,
      singleInsureCheckDetail2: false,
      isIns: false,
      isBillNo: false,
      yewuyuanQuery: false,
      BillNoList: { // 个保单详情
        baseMesg: {}, // 基本信息
        policyHolder: {}, // 投保人信息
        insuredList: [], // 被保险人
        dieBeniftList: [], // 身故受益人
        liveBeniftList: [], // 生存受益人
        insureTypeList: [], // 险种信息
        payFeeList: {}, // 缴费信息
        payFeeDetailList: [] // 缴费明细
      },
      applicantList: {},
      totalRecords: 0,
      callBackData: '',
      callBackData1: '',
      shengjiQueryData: {
        comCodeOrName: '',
        clickType: '',
        currentPage: 1,
        pageSize: 10
      },
      dijiQueryData: {
        upperComCode: '',
        comCodeOrName: '',
        clickType: '',
        currentPage: 1,
        pageSize: 10
      },
      fenyetotalData: 0,
      workerDialogData: [],
      tempTableData1: [],
      tempTableData2: [],
      tempTableData3: [],
      workerType: '',
      loading: ''
    }
  },
  mounted () {
    // this.info.auditStatus = '2'
    api(`/auth/findButtonByUserCodeAndPage?userId=${this.$store.state.login.loginUserId}&page=离职单管理`, 'get').then(result => {
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
    'quitListDetail.agentCode2' () {
      if (this.quitListDetail.agentCode2 === '') {
        this.quitListDetail.agentName2 = ''
        this.quitListDetail.comCode2 = ''
        this.quitListDetail.comName2 = ''
      }
    },
    'quitListDetail.agentName2' () {
      if (this.quitListDetail.agentName2 === '') {
        this.quitListDetail.agentCode2 = ''
        this.quitListDetail.comCode2 = ''
        this.quitListDetail.comName2 = ''
      }
    }
  },
  methods: {
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          console.log('submit!')
          this.sendQuitList()
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    select (index) {
      this.callBackData = index
    },
    initDialog () {
      this.shengjiQueryData = {
        comCodeOrName: '',
        clickType: '',
        currentPage: 1,
        pageSize: 10
      }
      this.dijiQueryData = {
        upperComCode: '',
        comCodeOrName: '',
        clickType: '',
        currentPage: 1,
        pageSize: 10
      }
      this.findWorkerInfo = {
        agentCode: '',
        agentName: '',
        comCode: '',
        comName: '',
        validStatus: '0',
        pageSize: 10,
        currentPage: 1,
        clickType: '2'
      }
      this.findOutWorkerData = {
        agentCode: '',
        agentName: '',
        comCode: '',
        comName: '',
        validStatus: '1',
        pageSize: 10,
        currentPage: 1,
        clickType: '2'
      }
    },
    changeComdialogPage1 (data) {
      this.shengjiQueryData.currentPage = data
      this.searchForCom1(this.shengjiQueryData)
    },
    changeComdialogPage2 (data) {
      this.dijiQueryData.currentPage = data
      this.searchForCom2(this.dijiQueryData)
    },
    changeComdialogPageSize1 (data) {
      this.shengjiQueryData.pageSize = data
      this.shengjiQueryData.currentPage = 1
      this.searchForCom1(this.shengjiQueryData)
    },
    changeComdialogPageSize2 (data) {
      this.dijiQueryData.pageSize = data
      this.dijiQueryData.currentPage = 1
      this.searchForCom2(this.dijiQueryData)
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
    quitListMgrcheckQuitList (info) {
      this.Loading()
      this.tableData = []
      // this.totalRecords = 0
      console.log(info)
      api('/leaveAgent/leaveAgentPolicyQuery', 'post', info).then(result => {
        console.log(result)
        this.closeLoading()
        if (result.data.code !== '000000') {
          this.openToast('warning', result.data.msg)
          this.tableData = []
        } else {
          this.tableData = result.data.data.content
          this.totalRecords = result.data.data.totalElements
          console.log(this.queryInfo)
        }
      }).catch((e) => {
        console.log(e)
      })
    },
    queryTableData () {
      this.totalRecords = 0
      this.queryInfo.currentPage = 1
      this.quitListMgrcheckQuitList(this.queryInfo)
      this.tableShowOrNot = true
    },
    searchForCom1 (info) {
      this.contiListCheckDialogDataGet1(info).then(
        (res) => {
          console.log(res)
          if (res.data.code !== '000000' && !IsEmpty(res.data.code)) {
            this.openToast('warning', res.data.msg)
          } else {
            this.tempTableData1 = res.data.data.data
            this.fenyetotalData = res.data.data.totalRecords
            for (let i = 0; i < this.tempTableData1.length; i++) {
              this.tempTableData1[i]['renderData'] = `${this.tempTableData1[i].comCode}-${this.tempTableData1[i].comCName}`
            }
            this.comDialog = true
            this.comDialogCom = true
            this.comDialogworker = false
          }
        })
    },
    singSearchForCom1 (info) {
      this.contiListCheckDialogDataGet1(info).then(
        (res) => {
          console.log(res)
          if (res.data.code !== '000000' && !IsEmpty(res.data.code)) {
            this.openToast('warning', res.data.msg)
            this.quitListDetail.agentCode2 = ''
            this.quitListDetail.agentName2 = ''
            this.quitListDetail.comCode2 = ''
            this.quitListDetail.comName2 = ''
          } else {
            if (res.data.data.data.length === 1) {
              this.quitListDetail.agentCode2 = res.data.data.data[0].agentCode
              this.quitListDetail.agentName2 = res.data.data.data[0].agentName
              this.quitListDetail.comCode2 = res.data.data.data[0].comCode
              this.quitListDetail.comName2 = res.data.data.data[0].comCName
            } else {
              this.quitListDetail.agentCode2 = ''
              this.quitListDetail.agentName2 = ''
              this.quitListDetail.comCode2 = ''
              this.quitListDetail.comName2 = ''
            }
          }
        })
    },
    singSearchForCom2 (info) {
      this.contiListCheckDialogDataGet2(info).then(
        (res) => {
          console.log(res)
          if (res.data.code !== '000000' && !IsEmpty(res.data.code)) {
            this.openToast('warning', res.data.msg)
            this.quitListDetail.agentCode2 = ''
            this.quitListDetail.agentName2 = ''
            this.quitListDetail.comCode2 = ''
            this.quitListDetail.comName2 = ''
          } else {
            if (res.data.data.data.length === 1) {
              this.quitListDetail.agentCode2 = res.data.data.data[0].agentCode
              this.quitListDetail.agentName2 = res.data.data.data[0].agentName
              this.quitListDetail.comCode2 = res.data.data.data[0].comCode
              this.quitListDetail.comName2 = res.data.data.data[0].comCName
            } else {
              this.quitListDetail.agentCode2 = ''
              this.quitListDetail.agentName2 = ''
              this.quitListDetail.comCode2 = ''
              this.quitListDetail.comName2 = ''
            }
          }
        })
    },
    searchForCom2 (info) {
      this.contiListCheckDialogDataGet2(info).then(
        (res) => {
          console.log(res)
          if (res.data.code !== '000000' && !IsEmpty(res.data.code)) {
            this.openToast('warning', res.data.msg)
          } else {
            this.tempTableData2 = res.data.data.data
            this.fenyetotalData = res.data.data.totalRecords
            for (let i = 0; i < this.tempTableData2.length; i++) {
              this.tempTableData2[i]['renderData'] = `${this.tempTableData2[i].comCode}-${this.tempTableData2[i].comCName}`
            }
            this.comDialog1 = true
            this.comDialogCom1 = true
            this.comDialogworker1 = false
          }
        })
    },
    searchForWorker1 (info) {
      this.quitListMgrdbclickWorker(info).then(
        (res) => {
          console.log(res)
          if (res.data.code !== '000000' && !IsEmpty(res.data.code)) {
            this.openToast('warning', res.data.msg)
          } else {
            this.tempTableData3 = res.data.data.content
            this.fenyetotalData = res.data.data.totalElements
            this.comDialog2 = true
            this.comDialogCom2 = true
            this.comDialogworker2 = false
            for (let i = 0; i < this.tempTableData3.length; i++) {
              this.tempTableData3[i]['renderData'] = `${this.tempTableData3[i].agentCode}-${this.tempTableData3[i].agentName}`
              this.tempTableData3[i]['renderData1'] = `${this.tempTableData3[i].comCode}-${this.tempTableData3[i].comName}`
            }
            this.workerDialogData = this.tempTableData3
          }
        })
    },
    searchForWorker2 (info) {
      this.quitListMgrdbclickWorker(info).then(
        (res) => {
          console.log(res)
          if (res.data.code !== '000000' && !IsEmpty(res.data.code)) {
            this.openToast('warning', res.data.msg)
            this.findWorkerInfo.agentCode = ''
            this.findWorkerInfo.agentName = ''
          } else if (IsEmpty(res.data.data.content)) {
            this.openToast('warning', '没有查询到该业务员')
            this.findWorkerInfo.agentCode = ''
            this.findWorkerInfo.agentName = ''
          } else {
            this.tempTableData3 = res.data.data.content
            this.fenyetotalData = res.data.data.totalElements
            this.comDialog2 = true
            this.comDialogCom2 = true
            this.comDialogworker2 = false
            for (let i = 0; i < this.tempTableData3.length; i++) {
              this.tempTableData3[i]['renderData'] = `${this.tempTableData3[i].agentCode}-${this.tempTableData3[i].agentName}`
              this.tempTableData3[i]['renderData1'] = `${this.tempTableData3[i].comCode}-${this.tempTableData3[i].comName}`
            }
            this.workerDialogData = this.tempTableData3
          }
        })
    },
    zhunqueSearchForWorker (index) {
      switch (index) {
        case 1:
          this.findWorkerInfo.clickType = '1'
          this.findWorkerInfo.validStatus = '0'
          this.findWorkerInfo.agentCode = this.queryInfo.agentCode
          this.findWorkerInfo.agentName = this.queryInfo.agentName
          this.findWorkerInfo.comCode = this.queryInfo.comCode
          this.tempTableData3 = []
          this.quitListMgrdbclickWorker(this.findWorkerInfo).then((res) => {
            if (res.data.code !== '000000' && !IsEmpty(res.data.code)) {
              this.openToast('warning', res.data.msg)
              this.quitListDetail.agentCode2 = ''
              this.quitListDetail.agentName2 = ''
              this.quitListDetail.comCode2 = ''
              this.quitListDetail.comName2 = ''
            } else {
              if (res.data.data.length === 1) {
                this.quitListDetail.agentCode2 = res.data.data[0].agentCode
                this.quitListDetail.agentName2 = res.data.data[0].agentName
                this.quitListDetail.comCode2 = res.data.data[0].comCode
                this.quitListDetail.comName2 = res.data.data[0].comName
              } else {
                this.quitListDetail.agentCode2 = ''
                this.quitListDetail.agentName2 = ''
                this.quitListDetail.comCode2 = ''
                this.quitListDetail.comName2 = ''
              }
            }
          })
          break
        case 2:
          this.findWorkerInfo.clickType = '1'
          this.findWorkerInfo.validStatus = '1'
          this.findWorkerInfo.agentCode = this.quitListDetail.agentCode2
          this.findWorkerInfo.agentName = this.quitListDetail.agentName2
          this.findWorkerInfo.comCode = this.quitListDetail.comCode2
          this.findWorkerInfo.comName = this.quitListDetail.comName2
          this.tempTableData3 = []
          this.quitListMgrdbclickWorker(this.findWorkerInfo).then((res) => {
            console.log(res)
            if (res.data.code !== '000000' && !IsEmpty(res.data.code)) {
              this.openToast('warning', res.data.msg)
              this.quitListDetail.agentCode2 = ''
              this.quitListDetail.agentName2 = ''
              this.quitListDetail.comCode2 = ''
              this.quitListDetail.comName2 = ''
            } else {
              this.quitListDetail.agentCode2 = res.data.data[0].agentCode
              this.quitListDetail.agentName2 = res.data.data[0].agentName
              this.quitListDetail.comCode2 = res.data.data[0].comCode
              this.quitListDetail.comName2 = res.data.data[0].comName
            }
          })
          break
        default:
          break
      }
    },
    openComDialog (index) {
      switch (index) {
        case 0:
          this.shengjiQueryData.clickType = '2'
          this.shengjiQueryData.comCodeOrName = this.queryInfo.comCode
          this.searchForCom1(this.shengjiQueryData)
          break
        case 1:
          this.dijiQueryData.clickType = '2'
          this.dijiQueryData.upperComCode = this.queryInfo.comCode
          this.dijiQueryData.comCodeOrName = this.queryInfo.comCode2
          console.log(this.dijiQueryData)
          this.searchForCom2(this.dijiQueryData)
          break
        case 2:
          this.findWorkerInfo.clickType = '2'
          this.findWorkerInfo.validStatus = '0'
          this.findWorkerInfo.agentCode = this.queryInfo.agentCode
          this.findWorkerInfo.agentName = this.queryInfo.agentName
          this.findWorkerInfo.comCode = this.queryInfo.comCode
          this.workerType = '1'
          console.log(this.findWorkerInfo)
          this.searchForWorker1(this.findWorkerInfo)
          break
        case 3:
          this.findWorkerInfo.clickType = '2'
          this.findWorkerInfo.validStatus = '1'
          this.findWorkerInfo.agentCode = this.quitListDetail.agentCode2
          this.findWorkerInfo.agentName = this.quitListDetail.agentName2
          this.findWorkerInfo.comCode = this.quitListDetail.comCode2
          this.findWorkerInfo.comName = this.quitListDetail.comName2
          this.workerType = '2'
          this.searchForWorker2(this.findWorkerInfo)
          break
        default:
          break
      }
    },
    opensingleComDialog (index) {
      if (!(this.comDialog || this.comDialog1 || this.comDialog2)) {
        switch (index) {
          case 0:
            this.shengjiQueryData.clickType = '1'
            this.shengjiQueryData.comCodeOrName = this.queryInfo.comCode
            this.singSearchForCom1(this.shengjiQueryData)
            break
          case 1:
            this.dijiQueryData.clickType = '1'
            this.dijiQueryData.comCodeOrName = this.queryInfo.comCode2
            this.dijiQueryData.upperComCode = this.queryInfo.comCode
            console.log(this.dijiQueryData)
            this.singSearchForCom2(this.dijiQueryData)
            break
          case 2:
            this.workerType = '1'
            this.zhunqueSearchForWorker(1)
            break
          case 3:
            this.workerType = '2'
            this.zhunqueSearchForWorker(2)
            break
          default:
            break
        }
      }
    },
    childClose () {
      if (this.workerType === '1') {
        this.comDialog2 = false
        this.queryInfo.agentCode = ''
        this.queryInfo.agentName = ''
        this.findOutWorkerData.currentPage = 1
        this.findOutWorkerData.pageSize = 10
      } else {
        this.comDialog2 = false
        this.quitListDetail.agentCode2 = ''
        this.quitListDetail.agentName2 = ''
        this.findOutWorkerData.currentPage = 1
        this.findOutWorkerData.pageSize = 10
      }
      this.yewuyuanQuery = false
      this.initDialog()
    },
    changeData (row) {
      this.callBackData = `${row.agentCode}-${row.agentName}`
      this.callBackData1 = `${row.comCode}-${row.comName}`
      if (!IsEmpty(this.callBackData)) {
        if (this.workerType === '1') {
          let temp = []
          temp = this.callBackData.split('-')
          this.queryInfo.agentCode = temp[0]
          this.queryInfo.agentName = temp[1]
        } else {
          let temp = []
          let temp1 = []
          temp = this.callBackData.split('-')
          temp1 = this.callBackData1.split('-')
          this.quitListDetail.agentCode2 = temp[0]
          this.quitListDetail.agentName2 = temp[1]
          this.quitListDetail.comCode2 = temp1[0]
          this.quitListDetail.comName2 = temp1[1]
        }
      }
      this.comDialog2 = false
    },
    queryWorker1 () {
      this.yewuyuanQuery = true
      if (this.workerType === '1') {
        this.findOutWorkerData.validStatus = '0'
        api('/leaveAgent/agentQuery', 'post', this.findOutWorkerData).then(
          (res) => {
            if (res.data.code !== '000000' && !IsEmpty(res.data.code)) {
              this.openToast('warning', res.data.msg)
            } else {
              this.tempTableData3 = res.data.data.content
              this.fenyetotalData = res.data.data.totalElements
              for (let i = 0; i < this.tempTableData3.length; i++) {
                this.tempTableData3[i]['renderData'] = `${this.tempTableData3[i].agentCode}-${this.tempTableData3[i].agentName}`
              }
              this.workerDialogData = this.tempTableData3
            }
          })
      } else {
        this.findOutWorkerData.validStatus = '1'
        api('/leaveAgent/agentQuery', 'post', this.findOutWorkerData).then(
          (res) => {
            console.log(res)
            if (res.data.code !== '000000' && !IsEmpty(res.data.code)) {
              this.openToast('warning', res.data.msg)
            } else {
              this.tempTableData3 = res.data.data.content
              this.fenyetotalData = res.data.data.totalElements
              for (let i = 0; i < this.tempTableData3.length; i++) {
                this.tempTableData3[i]['renderData'] = `${this.tempTableData3[i].agentCode}-${this.tempTableData3[i].agentName}`
              }
              this.workerDialogData = this.tempTableData3
            }
          })
      }
    },
    dialogBackData (data) {
      this.initDialog()
      this.comDialog = false
      let temp = []
      temp = data.split('-')
      this.queryInfo.comCode = temp[0]
    },
    dialogBackData1 (data) {
      this.initDialog()
      this.comDialog1 = false
      let temp = []
      temp = data.split('-')
      this.queryInfo.comCode2 = temp[0]
    },
    comDialogClosing (index) {
      switch (index) {
        case 0:
          this.comDialog = false
          this.queryInfo.comCode = ''
          this.queryInfo.comCode2 = ''
          break
        case 1:
          this.comDialog1 = false
          this.queryInfo.agentCode = ''
          this.queryInfo.agentName = ''
          break
        default:
          break
      }
      this.comDialog2 = false
      this.comDialog3 = false
      this.initDialog()
    },
    quitListMgrchangeQuitList (info) {
      api('/leaveAgent/getLeaveAgentInfo', 'post', `policyNo=${info}`).then(result => {
        if (result.data.code !== '000000') {
          this.openToast('warning', result.data.msg)
        } else {
          this.quitListDetail = result.data.data
          for (let item of Object.keys(this.quitListDetail)) {
            if (this.quitListDetail[item] === null) {
              this.quitListDetail[item] = ''
            }
          }
          this.quitListDetail['policyNo'] = info
          api('/leaveAgent/checkLeaveAgent', 'post', this.quitListDetail).then(result => {
            console.log(result)
            if (result.data.code !== '000000' && result.data.code !== '000001') {
              this.openToast('warning', result.data.msg)
            } else if (result.data.code === '000001') {
              // 是否修改续"+xqFlag+"保单对应的业务员
              result.data.msg = result.data.msg.replace(/是否修改续/, '')
              result.data.msg = result.data.msg.replace(/保单对应的业务员/, '')
              this.isFirst = result.data.msg
              this.makeReportListTip = true
            } else if (result.data.code === '000000') {
              // 是否修改续"+xqFlag+"保单对应的业务员
              result.data.msg = result.data.msg.replace(/是否修改续/, '')
              result.data.msg = result.data.msg.replace(/保单对应的业务员/, '')
              this.isFirst = result.data.msg
              this.quitDialogVis = true
            }
          }).catch((e) => {
            console.log(e)
          })
        }
      }).catch((e) => {
        console.log(e)
      })
    },
    openSendQuitList (policyNo) {
      this.quitListMgrchangeQuitList(policyNo)
      // this.$store.commit('openQuitDialogVis')
    },
    closeSingleInsureCheckDetail1 () {
      this.singleInsureCheckDetail1 = false
    },
    closeSingleInsureCheckDetail2 () {
      this.singleInsureCheckDetail2 = false
    },
    closechangequitDialog () {
      this.quitDialogVis = false
      this.$refs['zhipaiInfo'].resetFields()
    },
    importDialogClose () {
      this.showImportDialog = false
    },
    importDialogOpen () {
      this.showImportDialog = true
    },
    downloadModal () {
      window.open('/tabycore/leaveAgent/downloadModel?downType=model')
    },
    quitsendListDetail (info) {
      api('/leaveAgent/saveLeaveAgent', 'post', info).then(result => {
        console.log(result)
        if (result.data.code !== '000000') {
          this.openToast('warning', result.data.msg)
        } else {
          this.openToast('success', '指派成功')
          this.$refs['zhipaiInfo'].resetFields()
          setTimeout(() => {
            this.queryTableData()
          }, 1000)
        }
        this.quitDialogVis = false
      }).catch((e) => {
        console.log(e)
      })
    },
    baodanDetailGet1 (info) {
      let temp = {
        policyNo: info
      }
      this.Loading()
      return api('/policyQuery/singlePolicyInfoView', 'post', temp).then(result => {
        this.closeLoading()
        console.log(result)
        let resp = result.data
        if (result.data.code !== '000000') {
          this.openToast('warning', result.data.msg)
        } else {
          this.BillNoList.baseMesg = resp.data.lifePCMainCondition // 基本信息
          if (this.BillNoList.baseMesg.hfStatus === '未回访' || this.BillNoList.baseMesg.hfStatus === null) {
            this.BillNoList.baseMesg.hfStatus = ''
          }
          this.BillNoList.policyHolder = resp.data.lifePartyCondition // 投保人信息
          if (this.BillNoList.policyHolder.longFlag === 0) { // 身份证是否长 期有效
            this.$set(this.BillNoList.policyHolder, 'longFlagtag', false)
          } else {
            this.$set(this.BillNoList.policyHolder, 'longFlagtag', true)
          }
          this.BillNoList.insuredList = resp.data.lifePartyConditionDList // 被保险人信息
          if (!IsEmpty(this.BillNoList.insuredList)) {
            this.BillNoList.insuredList.forEach((item, index) => {
              if (item.longFlag === 0) { // 身份证是否长 期有效
                this.$set(item, 'longFlagtag', false)
              } else {
                this.$set(item, 'longFlagtag', true)
              }
            })
          }
          this.BillNoList.dieBeniftList = resp.data.lifePartyTConditionList // 身故受益人信息
          if (!IsEmpty(this.BillNoList.dieBeniftList)) {
            this.BillNoList.dieBeniftList.forEach((item, index) => {
              if (item.longFlag === 0) { // 身份证是否长 期有效
                this.$set(item, 'longFlagtag', false)
              } else {
                this.$set(item, 'longFlagtag', true)
              }
            })
          }
          this.BillNoList.liveBeniftList = resp.data.lifePartyAConditionList // 生存收益人信息
          if (!IsEmpty(resp.data.lifeCItemKindConditionList)) {
            resp.data.lifeCItemKindConditionList.forEach((item, index) => {
              if (item.tbrFreeFlag === '0' || item.tbrFreeFlag === null || item.tbrFreeFlag === 'null') {
                item.tbrFreeFlag = false
              } else {
                item.tbrFreeFlag = true
              }
              if (item.bbrFreeFlag === '0' || item.bbrFreeFlag === null || item.bbrFreeFlag === 'null') {
                item.bbrFreeFlag = false
              } else {
                item.bbrFreeFlag = true
              }
              if (item.lifeFlag === 0 || item.lifeFlag === null || item.lifeFlag === 'null') {
                item.lifeFlag = false
              } else {
                item.lifeFlag = true
              }
              if (item.feeFlag === 0 || item.feeFlag === null) {
                this.$set(item, 'feeFlagTag', false)
              } else {
                this.$set(item, 'feeFlagTag', true)
              }
            })
          }
          this.BillNoList.insureTypeList = resp.data.lifeCItemKindConditionList // 险种信息
          this.BillNoList.payFeeList = resp.data.lifeFeeCondition // 缴费信息
          if (this.BillNoList.payFeeList === null) {
            this.BillNoList.payFeeList = {}
          }
          this.BillNoList.payFeeDetailList = resp.data.lifeChargeConditionList // 缴费明细
          this.isBillNo = true
        }
      }).catch((e) => {
        console.log(e)
      })
    },
    baodanDetailGet2 (info) {
      let temp = {
        partyName: info.partyName,
        policyNo: info.policyNo
      }
      this.Loading()
      return api('/policyQuery/singlePolicyInsureView', 'post', temp).then(result => {
        this.closeLoading()
        console.log(result)
        if (result.data.code !== '000000') {
          this.openToast('warning', result.data.msg)
        } else {
          this.applicantList = result.data.data
          this.isIns = true
        }
      }).catch((e) => {
        console.log(e)
      })
    },
    sendQuitList () {
      let temp = {}
      temp.isFirst = this.isFirst
      this.quitListDetail.isFirst = this.isFirst
      if (this.quitListDetail.agentType === '1') {
        this.quitListDetail.agentTypeName = ''
        this.quitsendListDetail(this.quitListDetail)
      } else {
        temp['agentTypeName'] = this.quitListDetail.agentTypeName
        temp['agentType'] = this.quitListDetail.agentType
        temp['agentCode'] = this.quitListDetail.agentCode
        temp['agentName'] = this.quitListDetail.agentName
        temp['companyCode'] = this.quitListDetail.companyCode
        temp['comyanyName'] = this.quitListDetail.comyanyName
        temp['comCode'] = this.quitListDetail.comCode
        temp['comName'] = this.quitListDetail.comName
        temp['effectDate'] = this.quitListDetail.effectDate
        temp['proposalNo'] = this.quitListDetail.proposalNo
        temp['policyNo'] = this.quitListDetail.policyNo
        this.quitsendListDetail(temp)
      }
    },
    handleCurrentChange (val) {
      console.log(val)
      this.queryInfo.currentPage = val
      this.quitListMgrcheckQuitList(this.queryInfo)
    },
    handleSizeChange (val) {
      this.queryInfo.currentPage = 1
      this.queryInfo.pageSize = val
      this.quitListMgrcheckQuitList(this.queryInfo)
    },
    handleCurrentChange1 (val) {
      if (this.yewuyuanQuery) {
        this.findOutWorkerData.currentPage = val
        this.queryWorker1()
      } else {
        this.findWorkerInfo.currentPage = val
        this.searchForWorker2(this.findWorkerInfo)
      }
    },
    handleSizeChange1 (val) {
      if (this.yewuyuanQuery) {
        this.findOutWorkerData.currentPage = 1
        this.findOutWorkerData.pageSize = val
        this.queryWorker1()
      } else {
        this.findWorkerInfo.currentPage = 1
        this.findWorkerInfo.pageSize = val
        this.searchForWorker2(this.findWorkerInfo)
      }
    },
    handleEXLSuccess (res) {
      if (res.code === '000000') {
        this.openToast('success', res.msg)
      } else {
        this.openToast('error', res.msg)
        this.fileList = []
      }
    },
    uploadUrl () {
      return '/tabycore/leaveAgent/leaveAgentReport'
    },
    ...mapActions([
      'contiListCheckDialogDataGet1', 'contiListCheckDialogDataGet2', 'quitListMgrdbclickWorker'
    ]),
    // toast提示
    openToast (type, mesg) {
      this.$message({
        showClose: true,
        message: mesg,
        type: type
      })
    }
  },
  computed: {
    comDialogData () {
      let temp = this.$store.state.quitListMgr.quitListMgrdblComData
      if (!IsEmpty(temp)) {
        for (let i = 0; i < temp.length; i++) {
          temp[i]['renderData'] = `${temp[i].comCode}-${temp[i].comCName}`
        }
      }
      return temp
    }
  },
  components: {
    [NoticeBar.name]: NoticeBar,
    [LineTittle.name]: LineTittle,
    [LabelText.name]: LabelText,
    ComDialog
  },
  created () {
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
  text-align: center;
}
.btn-container1{
  text-align: center;
  margin-top: 15px;
  margin-bottom: 15px;
}
.ri-line1{
  margin-top: 5px;
  margin-bottom: 5px;
}
.ri-line{
  margin-top: 10px;
  margin-bottom: 10px;
}
.renderButton{
  border:0;
  cursor:pointer;
  width:40px;
  font-size:14px;
  //background-color: white
}
.renderButton{
  border:0;
  cursor:pointer;
  width:100%;
  font-size:14px;
  background-color: white
}
.mesg_form .required:before{
    font-size: 14px!important;
    top: 3px !important;
}
.tableButton {
  cursor: pointer;
  color: #66B1FF;
}
.mesg_form .el-form-item__error { left: 170px;}
</style>
