<template>
  <div id="newBill">
    <ui-notice-bar slot="breadcast" >
      <el-breadcrumb slot="location" separator=">">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>寿险业务管理</el-breadcrumb-item>
        <el-breadcrumb-item>寿险投保单管理</el-breadcrumb-item>
        <el-breadcrumb-item>投保单修改</el-breadcrumb-item>
      </el-breadcrumb>
    </ui-notice-bar>
    <el-form class="mesg_form manage_form" :model="BillNoList" ref="BillNoList" :rules="rule">
      <!-- 基本信息 -->
      <ui-line-tittle :collapsible="true" >
        <span slot="title" >
          <i class="font_family icon-jy-menu-4" ></i>基本信息
        </span>
        <div class="ri-content" slot="content" >
          <el-row >
            <el-col :span="12">
              <el-form-item prop="lifePCMainCondition.proposalNo">
                <ui-label-text :required="true" label="投保单号：" labelWidth="160" >
                  <el-input slot="text" clearable v-model="BillNoList.lifePCMainCondition.proposalNo" :disabled="true" ></el-input>
                </ui-label-text>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item prop="lifePCMainCondition.proposalDate">
                <ui-label-text :required="true" label="投保日期：" labelWidth="160" >
                  <el-date-picker value-format="timestamp" v-model="BillNoList.lifePCMainCondition.proposalDate" slot="text" type="date" placeholder="选择日期"></el-date-picker>
                </ui-label-text>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row >
            <el-col :span="12">
              <el-form-item prop="lifePCMainCondition.companyCode">
                <ui-label-text :required="true" label="归属保险公司代码：" labelWidth="160" >
                  <el-input slot="text" clearable v-model="BillNoList.lifePCMainCondition.companyCode" :disabled="true"></el-input>
                </ui-label-text>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item prop="lifePCMainCondition.companyName">
                <ui-label-text :required="true" label="归属保险公司名称：" labelWidth="160" >
                  <el-input slot="text" :disabled="true" v-model="BillNoList.lifePCMainCondition.companyName" ></el-input>
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
                  <el-select slot="text" disabled  v-model="BillNoList.lifePCMainCondition.insuranceMark" placeholder="请选择">
                    <el-option label="新保" value="1"></el-option>
                    <el-option label="续保" value="2"></el-option>
                  </el-select>
                </ui-label-text>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item>
                <ui-label-text label="是否自动续保：" labelWidth="160" >
                  <el-select slot="text" :disabled='allInput' clearable v-model="BillNoList.lifePCMainCondition.atuoAcceptFlag" placeholder="请选择">
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
                  <el-select slot="text" :disabled="true" v-model="BillNoList.lifePCMainCondition.businessNature" placeholder="请选择">
                    <el-option label="百盈销售" value="1"></el-option>
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
                  <el-select :disabled='allInput' slot="text" v-model="BillNoList.lifePCMainCondition.xjjzzddjbf" placeholder="请选择">
                    <el-option label="是" value="1"></el-option>
                    <el-option label="否" value="0"></el-option>
                  </el-select>
                </ui-label-text>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item>
                <ui-label-text label="账户价值自动抵交保费：" labelWidth="160" >
                  <el-select :disabled='allInput' slot="text" v-model="BillNoList.lifePCMainCondition.xjjzdjbff" placeholder="请选择">
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
                  <el-select :disabled='allInput' slot="text" v-model="BillNoList.lifePCMainCondition.hllqfs" placeholder="请选择">
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
                  <el-select :disabled='allInput' slot="text" v-model="BillNoList.lifePCMainCondition.njlqfs" placeholder="请选择">
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
                  <el-input :disabled='allInput' slot="text" clearable  v-model="BillNoList.lifePCMainCondition.speAgreement" ></el-input>
                </ui-label-text>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item >
                <ui-label-text label="更新时间: " labelWidth="160" >
                  <el-date-picker :disabled='true' format="yyyy-MM-dd HH:mm:ss" value-format="timestamp" v-model="BillNoList.lifePCMainCondition.updateTime" slot="text" type="date" placeholder="选择日期"></el-date-picker>
                </ui-label-text>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row >
            <el-col :span="12">
              <el-form-item prop="lifePCMainCondition.singleMode">
                <ui-label-text :required="true" label="出单方式：" labelWidth="160" >
                  <el-select :disabled='allInput' slot="text"  v-model="BillNoList.lifePCMainCondition.singleMode" placeholder="请选择">
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
                  <el-input slot="text" placeholder="双击选择" clearable v-model="BillNoList.lifePartyCondition.insureNo" :disabled="true"></el-input>
                </ui-label-text>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item>
                <ui-label-text :required='true' label="投保人名称：" labelWidth="160" >
                  <el-input slot="text" clearable v-model="BillNoList.lifePartyCondition.insureName" :disabled="true" ></el-input>
                </ui-label-text>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item >
                <ui-label-text label="投保人地址：" labelWidth="160" >
                  <el-input slot="text" :disabled='true' clearable v-model="BillNoList.lifePartyCondition.insureAddress" ></el-input>
                </ui-label-text>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item>
                <ui-label-text label="邮政编码：" labelWidth="160" >
                  <el-input slot="text" :disabled='true' clearable v-model="BillNoList.lifePartyCondition.postNo" ></el-input>
                </ui-label-text>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row >
            <el-col :span="12">
              <el-form-item >
                <ui-label-text label="性别：" labelWidth="160" >
                  <el-select slot="text" :disabled='true' clearable  v-model="BillNoList.lifePartyCondition.sexType" placeholder="请选择">
                    <el-option label="男" value="0"></el-option>
                    <el-option label="女" value="1"></el-option>
                  </el-select>
                </ui-label-text>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item >
                <ui-label-text label="国籍：" labelWidth="160" >
                  <el-input slot="text" :disabled='true' clearable v-model="BillNoList.lifePartyCondition.country" ></el-input>
                </ui-label-text>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row >
            <el-col :span="12">
              <el-form-item >
                <ui-label-text label="出生日期：" labelWidth="160" >
                  <el-date-picker :disabled='true'  v-model="BillNoList.lifePartyCondition.birthDate" slot="text" type="date" value-format="timestamp" placeholder="选择日期"></el-date-picker>
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
                  <el-select slot="text" :disabled='true'  v-model="BillNoList.lifePartyCondition.marriage" placeholder="请选择">
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
                  <el-select slot="text" :disabled='true'  v-model="BillNoList.lifePartyCondition.educationCode" placeholder="请选择">
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
              <el-form-item>
                <ui-label-text :required='true' label="证件类型：" labelWidth="160" >
                  <el-select @change="idNumChange" slot="text" :disabled='true'  v-model="BillNoList.lifePartyCondition.identifyType" placeholder="请选择">
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
                <ui-label-text :required='true' label="证件号码：" labelWidth="160" >
                  <el-input clearable slot="text" :disabled='true' v-model="BillNoList.lifePartyCondition.identifyNumber" ></el-input>
                </ui-label-text>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row >
            <el-col :span="12" >
              <el-form-item>
                <ui-label-text :required='true' label="证件有效期：" labelWidth="160" >
                  <el-date-picker value-format="timestamp" style="width: 40%; margin-right: 9%; " :disabled="true" v-model="BillNoList.lifePartyCondition.identifyValiddate" slot="text" type="date" placeholder="选择日期"></el-date-picker>
                  <el-checkbox style="display: inline-block; " slot="text" :disabled='true'  size='mini' v-model="BillNoList.lifePartyCondition.longFlagtag" @change="checkChange" >终身</el-checkbox>
                </ui-label-text>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row >
            <el-col :span="12">
              <el-form-item>
                <ui-label-text  label="固定电话：" labelWidth="160" >
                  <el-input slot="text" clearable :disabled='true'  v-model="BillNoList.lifePartyCondition.insureTel" ></el-input>
                </ui-label-text>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item>
                <ui-label-text  label="移动电话：" labelWidth="160" >
                  <el-input slot="text" clearable :disabled='true' v-model="BillNoList.lifePartyCondition.mobilePhone" ></el-input>
                </ui-label-text>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row >
            <el-col :span="12">
              <el-form-item >
                <ui-label-text label="工作单位：" labelWidth="160" >
                  <el-input slot="text" clearable :disabled='true'  v-model="BillNoList.lifePartyCondition.workingUnit" ></el-input>
                </ui-label-text>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item >
                <ui-label-text label="职业：" labelWidth="160" >
                  <el-input slot="text" :disabled='true' clearable v-model="BillNoList.lifePartyCondition.job" ></el-input>
                </ui-label-text>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row >
            <el-col :span="12">
              <el-form-item >
                <ui-label-text label="Email：" labelWidth="160" >
                  <el-input slot="text" :disabled='true' v-model="BillNoList.lifePartyCondition.e_mail" ></el-input>
                </ui-label-text>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item >
                <ui-label-text label="微信号：" labelWidth="160" >
                  <el-input slot="text" clearable :disabled='true' v-model="BillNoList.lifePartyCondition.weixin" ></el-input>
                </ui-label-text>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row >
            <el-col :span="12">
              <el-form-item >
                <ui-label-text label="经常居住地：" labelWidth="160" >
                  <el-input slot="text" clearable :disabled='true' v-model="BillNoList.lifePartyCondition.habitualResidence" ></el-input>
                </ui-label-text>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item>
                <ui-label-text :required='true' label="与被保险人关系：" labelWidth="160" >
                  <el-select @change="relChange" slot="text" :disabled="!isclick" v-model="BillNoList.lifePartyCondition.insuredrType" placeholder="请选择">
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
                    <el-input slot="text" @dblclick.native="customerFindIns(1, 1, $event, index)" :readonly='true' :disabled='item.isclick' placeholder="双击选择" v-model="item.insureNoD" clearable ></el-input>
                  </ui-label-text>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item >
                  <ui-label-text :required="true" label="被保险人名称：" labelWidth="160" >
                    <el-input slot="text" @dblclick.native="customerFindIns(1, 1, $event, index)" :readonly='item.isInput' :disabled='item.isclick' placeholder="双击选择"  v-model="item.insureNameD" clearable ></el-input>
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
                <el-form-item>
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
                    <el-date-picker :disabled='item.isInput' value-format="timestamp" v-model="item.birthDateD" slot="text" type="date" placeholder="选择日期"></el-date-picker>
                  </ui-label-text>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item >
                  <ui-label-text  label="备注：" labelWidth="160" >
                    <el-input slot="text"  :disabled='item.isInput' clearable  v-model="item.remark" ></el-input>
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
                <el-form-item >
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
                <el-form-item >
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
                    <el-date-picker style="width: 40%; margin-right: 9%; " value-format="timestamp" :disabled="item.longFlagTag" v-model="item.identifyValiddateD" slot="text" type="date" placeholder="选择日期"></el-date-picker>
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
            <div class='addBtn' style="text-align: right; " v-if="!allInput">
              <el-button type="danger" @click="deletInsured(index)">删除</el-button>
            </div>
          </div>
          <div class='addBtn'>
            <el-button type="primary" @click="addInsured" v-if="!allInput">增加</el-button>
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
                  <el-radio-group :disabled='isSg'  slot="text" v-model="BillNoList.lifePCMainCondition.sgFlag" >
                    <el-radio :label="1">法定受益人</el-radio>
                    <el-radio :label="2">指定受益人</el-radio>
                  </el-radio-group>
                </ui-label-text>
              </el-form-item>
            </el-col>
          </el-row>
          <div v-if='BillNoList.lifePCMainCondition.sgFlag == 2'>
            <div class='tabShow splice-line'  v-for='(item, index) in BillNoList.lifePartyTConditionList' :key='index' >
              <el-row>
                <el-col :span="12">
                  <el-form-item :prop="'lifePartyTConditionList.' + index +'.partyName'" :rules="sgRules.partyName">
                    <ui-label-text :required="true" label="姓名："  labelWidth="160" >
                      <el-input :disabled="item.isInput" clearable slot="text" v-model="item.partyName" ></el-input>
                    </ui-label-text>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item :prop="'lifePartyTConditionList.' + index +'.identifyType'" :rules="sgRules.identifyType" >
                    <ui-label-text :required="true" label="证件类型：" labelWidth="160" >
                      <el-select :disabled="item.isInput" @change="idNumChangeItem($event, index, 1)" slot="text" v-model="item.identifyType" placeholder="请选择">
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
                      <el-input :disabled="item.isInput" clearable slot="text" v-model="item.identifyNumber" ></el-input>
                    </ui-label-text>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item>
                    <ui-label-text :required="true" label="证件有效期：" labelWidth="160" >
                      <el-date-picker style="width: 40%; margin-right: 9%; " :disabled="item.longFlagTag" v-model="item.identifyValiddate" slot="text" value-format="timestamp" type="date" placeholder="选择日期"></el-date-picker>
                      <el-checkbox @change="checkChangeItem($event, index, 1)" :disabled='item.isInput' style="display: inline-block; " slot="text"  size='mini' v-model="item.longFlagtag" >终身</el-checkbox>
                    </ui-label-text>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="12">
                  <el-form-item :prop="'lifePartyTConditionList.' + index +'.sex'" :rules="sgRules.sex">
                    <ui-label-text :required="true" label="性别："  labelWidth="160" >
                      <el-select :disabled="item.isInput" slot="text" v-model="item.sex" placeholder="请选择">
                        <el-option label="男" value="1"></el-option>
                        <el-option label="女" value="2"></el-option>
                      </el-select>
                    </ui-label-text>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item :prop="'lifePartyTConditionList.' + index +'.birthdate'" :rules="sgRules.birthdate">
                    <ui-label-text :required="true" label="出生日期："  labelWidth="160" >
                      <el-date-picker :disabled="item.isInput" style="width: 40%; margin-right: 9%; " v-model="item.birthdate" slot="text" value-format="timestamp" type="date" placeholder="选择日期"></el-date-picker>
                    </ui-label-text>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="12">
                  <el-form-item >
                    <ui-label-text  label="备注：" labelWidth="160" >
                      <el-input clearable :disabled="item.isInput"  slot="text" v-model="item.remark" ></el-input>
                    </ui-label-text>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="12">
                  <el-form-item :prop="'lifePartyTConditionList.' + index +'.beneficialOrder'" :rules="sgRules.beneficialOrder" >
                    <ui-label-text :required="true" label="受益顺序："  labelWidth="160" >
                      <el-select :disabled="item.isInput" slot="text" v-model="item.beneficialOrder" placeholder="请选择">
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
                      <el-input :disabled="item.isInput" clearable slot="text" v-model="item.benefitShare" ></el-input>
                    </ui-label-text>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="12">
                  <el-form-item :prop="'lifePartyTConditionList.' + index +'.insuredrType'" :rules="sgRules.insuredrType">
                    <ui-label-text :required="true" label="与被保险人关系：" labelWidth="160" >
                      <el-select :disabled="item.isInput" @change="sgRelstionShip(index, $event)"  slot="text" v-model="item.insuredrType" placeholder="请选择">
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
                      <el-input :disabled="item.isInput" clearable slot="text" v-model="item.phone" ></el-input>
                    </ui-label-text>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item >
                    <ui-label-text label="经常居住地：" labelWidth="160" >
                      <el-input :disabled="item.isInput" clearable slot="text" v-model="item.habitualResidence" ></el-input>
                    </ui-label-text>
                  </el-form-item>
                </el-col>
              </el-row>
              <div class='addBtn' v-if="!allInput" style="text-align: right; ">
                <el-button type="danger" @click="deletSgItem(index)">删除</el-button>
              </div>
            </div>
          </div>

          <div class='addBtn' v-if="!allInput">
            <el-button type="primary" @click="addSgItem" v-if="BillNoList.lifePCMainCondition.sgFlag == 2 && !allInput" >增加</el-button>
            <el-button type="info" v-else-if="BillNoList.lifePCMainCondition.sgFlag == 1 && !allInput" >增加</el-button>
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
                  <el-radio-group :disabled='isSg' slot="text" v-model="BillNoList.lifePCMainCondition.scFlag">
                    <el-radio :label="1">投保人</el-radio>
                    <el-radio :label="2">被保险人</el-radio>
                    <el-radio :label="3">其他</el-radio>
                  </el-radio-group>
                </ui-label-text>
              </el-form-item>
            </el-col>
          </el-row>
          <div v-if='BillNoList.lifePCMainCondition.scFlag == 3'>
            <div class='tabShow'  v-for='(item, index) in BillNoList.lifePartyAConditionList' :key='index'>
              <el-row>
                <el-col :span="12">
                  <el-form-item :prop="'lifePartyAConditionList.' + index +'.partyName'" :rules="sgRules.partyName">
                    <ui-label-text :required="true" label="姓名："  labelWidth="160" >
                      <el-input :disabled="item.isInput" clearable slot="text" v-model="item.partyName" ></el-input>
                    </ui-label-text>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item :prop="'lifePartyAConditionList.' + index +'.identifyType'" :rules="sgRules.identifyType">
                    <ui-label-text :required="true"  label="证件类型：" labelWidth="160" >
                      <el-select :disabled="item.isInput"  @change="idNumChangeItem($event, index, 2)"  slot="text" v-model="item.identifyType" placeholder="请选择">
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
                      <el-input :disabled="item.isInput" clearable slot="text" v-model="item.identifyNumber" ></el-input>
                    </ui-label-text>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item>
                    <ui-label-text :required="true" label="证件有效期：" labelWidth="160" >
                      <el-date-picker style="width: 40%; margin-right: 9%; " :disabled="item.longFlagTag" v-model="item.identifyValiddate" value-format="timestamp" slot="text" type="date" placeholder="选择日期"></el-date-picker>
                      <el-checkbox @change="checkChangeItem($event, index, 2)" style="display: inline-block; " slot="text" :disabled="item.isInput"  size='mini' v-model="item.longFlagtag" >终身</el-checkbox>
                    </ui-label-text>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="12">
                  <el-form-item :prop="'lifePartyAConditionList.' + index +'.sex'" :rules="sgRules.sex">
                    <ui-label-text :required="true" label="性别："  labelWidth="160" >
                      <el-select :disabled="item.isInput" clearable slot="text" v-model="item.sex" placeholder="请选择">
                        <el-option label="男" value="1"></el-option>
                        <el-option label="女" value="2"></el-option>
                      </el-select>
                    </ui-label-text>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item :prop="'lifePartyAConditionList.' + index +'.birthdate'" :rules="sgRules.birthdate">
                    <ui-label-text :required="true" label="出生日期："  labelWidth="160" >
                      <el-date-picker :disabled="item.isInput" v-model="item.birthdate" slot="text" type="date" placeholder="选择日期" value-format="timestamp"></el-date-picker>
                    </ui-label-text>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="12">
                  <el-form-item >
                    <ui-label-text  label="备注：" labelWidth="160" >
                      <el-input :disabled="item.isInput" clearable slot="text" v-model="item.remark" ></el-input>
                    </ui-label-text>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="12">
                  <el-form-item :prop="'lifePartyAConditionList.' + index +'.beneficialOrder'" :rules="sgRules.beneficialOrder">
                    <ui-label-text :required="true" label="受益顺序："  labelWidth="160" >
                      <el-select :disabled="item.isInput" slot="text" v-model="item.beneficialOrder" placeholder="请选择">
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
                      <el-input :disabled="item.isInput" clearable slot="text" v-model="item.benefitShare" ></el-input>
                    </ui-label-text>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="12">
                  <el-form-item :prop="'lifePartyAConditionList.' + index +'.insuredrType'" :rules="sgRules.insuredrType">
                    <ui-label-text :required="true"  label="与被保险人关系：" labelWidth="160" >
                      <el-select :disabled="item.isInput" slot="text" v-model="item.insuredrType" placeholder="请选择">
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
                      <el-input :disabled="item.isInput" clearable slot="text" v-model="item.insuredrName" ></el-input>
                    </ui-label-text>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="12">
                  <el-form-item  >
                    <ui-label-text label="联系方式：" labelWidth="160" >
                      <el-input :disabled="item.isInput" clearable slot="text" v-model="item.phone" ></el-input>
                    </ui-label-text>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item >
                    <ui-label-text label="经常居住地：" labelWidth="160" >
                      <el-input :disabled="item.isInput" clearable slot="text" v-model="item.habitualResidence" ></el-input>
                    </ui-label-text>
                  </el-form-item>
                </el-col>
              </el-row>
              <div class='addBtn' v-if="!allInput" style="text-align: right; ">
                <el-button type="danger" @click="deletScItem(index)">删除</el-button>
              </div>
            </div>
          </div>
          <div class='addBtn' v-if="!allInput">
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
                  <el-input slot="text" placeholder="双击选择" :disabled="allInput" clearable @dblclick.native="getAgentCodeName(1)" v-model="BillNoList.lifePCMainCondition.handlerCode" ></el-input>
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
                  <el-input slot="text" :disabled="allInput"  v-model="BillNoList.lifePCMainCondition.introduceType" ></el-input>
                </ui-label-text>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item >
                <ui-label-text label="介绍人代码："  labelWidth="160" >
                  <el-input slot="text" :disabled="allInput"  v-model="BillNoList.lifePCMainCondition.introduceCode" ></el-input>
                </ui-label-text>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item >
                <ui-label-text label="介绍人姓名："  labelWidth="160" >
                  <el-input slot="text" :disabled="allInput"   v-model="BillNoList.lifePCMainCondition.introduceName" ></el-input>
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
                    <el-input slot="text" size='mini' placeholder="双击可选择" clearable v-model="scope.row.riskCode" @dblclick.native="getRiskList(1, scope.$index, scope.row, 0)" ></el-input>
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
                      <el-input size='mini' placeholder="双击可选择" clearable v-model="scope.row.riskName" @dblclick.native="getRiskList(1, scope.$index, scope.row, 0)"></el-input>
                    </el-tooltip> -->
                    <el-input size='mini' slot="text" placeholder="双击可选择" clearable v-model="scope.row.riskName" @dblclick.native="getRiskList(1, scope.$index, scope.row, 0)"></el-input>
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
            <el-table-column prop="premium" label="应缴保费" width="200">
              <template slot-scope="scope">
                <el-form-item  :prop="'lifeCItemKindConditionList.' + scope.$index +'.premium'" :rules="riskRules.premium">
                  <ui-label-text :required="true" >
                    <el-input size='mini' @blur='addpremium'  slot="text" v-model="scope.row.premium" ></el-input>
                  </ui-label-text>
                </el-form-item>
              </template>
            </el-table-column>
            <el-table-column prop="riskPremium" label="保险金额" width="200">
              <template slot-scope="scope">
                <el-form-item :prop="'lifeCItemKindConditionList.' + scope.$index +'.riskPremium'" :rules="riskRules.riskPremium">
                  <ui-label-text>
                    <el-input size='mini' @blur='checkNumber(scope.$index, $event)'  slot="text" v-model="scope.row.riskPremium" ></el-input>
                  </ui-label-text>
                </el-form-item>
              </template>
            </el-table-column>
            <el-table-column prop="number" label="份数" width="120">
              <template slot-scope="scope">
                <el-form-item>
                  <ui-label-text>
                    <el-input size='mini'  slot="text" v-model="scope.row.number" ></el-input>
                  </ui-label-text>
                </el-form-item>
              </template>
            </el-table-column>
            <el-table-column prop="addPremium" label="加费金额" width="120">
              <template slot-scope="scope">
                <el-form-item :prop="'lifeCItemKindConditionList.' + scope.$index +'.addPremium'" :rules="riskRules.addPremium">
                  <ui-label-text>
                    <el-input size='mini'  slot="text" v-model="scope.row.addPremium" ></el-input>
                  </ui-label-text>
                </el-form-item>
              </template>
            </el-table-column>
            <el-table-column prop="freeDate" label="豁免日期" width="200">
              <template slot-scope="scope">
                <el-form-item>
                  <ui-label-text>
                    <el-date-picker size="mini" value-format="timestamp" v-model="scope.row.freeDate" :disabled="scope.row.isHmRisk" slot="text" type="date" placeholder="选择日期"></el-date-picker>
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
                    <el-date-picker size="mini" style="width: 45%; margin-right: 2%; " v-model="scope.row.startDate" value-format="timestamp" slot="text" type="date" placeholder="选择日期"></el-date-picker>至
                    <el-date-picker size="mini" style="width: 45%; margin-right: 2%; " v-if='scope.row.lifeFlagtag == false' value-format="timestamp" v-model="scope.row.endDate" slot="text" type="date" placeholder="选择日期"></el-date-picker>
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
                  <el-date-picker  slot="text" value-format="timestamp" :disabled="allInput" v-model="BillNoList.lifeFeeCondition.paidDate" type="date" placeholder="选择日期"></el-date-picker>
                </ui-label-text>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item  >
                <ui-label-text label="缴费方式:"  labelWidth="160" >
                  <el-select :disabled="allInput" v-model="BillNoList.lifeFeeCondition.firstal" slot="text" placeholder="请选择">
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
                  <el-autocomplete :disabled="allInput" clearable v-model="BillNoList.lifeFeeCondition.bankName" slot="text" :fetch-suggestions="querySearchAsync"  placeholder="请输入内容"  @select="bankSelect" >
                    <template slot-scope="{ item }">
                      <span class="code">{{ item.configSetValueCode }}</span>-
                      <span class="name">{{ item.configSetValueName }}</span>
                    </template>
                  </el-autocomplete>
                </ui-label-text>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item >
                <ui-label-text label="账户名：" labelWidth="160" >
                  <el-input :disabled="allInput" slot="text" v-model="BillNoList.lifeFeeCondition.accountNameFirstal" ></el-input>
                </ui-label-text>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item >
                <ui-label-text label="账号：" labelWidth="160" >
                  <el-input :disabled="allInput" slot="text" v-model="BillNoList.lifeFeeCondition.accountFirstal" ></el-input>
                </ui-label-text>
              </el-form-item>
            </el-col>
          </el-row>
        </div>
      </ui-line-tittle>
      <!-- 提交修改 -->
      <div class="btn-container">
        <el-button type="primary" >保存</el-button>
        <el-button type="primary" >提交审核</el-button>
      </div>
    </el-form>
    <!-- 获取保险公司 -->
    <!-- <el-dialog title="保险公司" :before-close='comClose'  center :append-to-body='true' :visible.sync="com_dialog" width="50%">
      <el-table stripe @row-click='selectRowCom' ref="multipleTable" :data="insComTableData" >
        <el-table-column prop="insurercode" label="保险公司代码" center ></el-table-column>
        <el-table-column prop="insurername" label="保险公司名称" center ></el-table-column>
      </el-table>
      <div class="pagination" >
        <el-pagination @size-change="comSizeChange" @current-change='comCurrentChange' :page-sizes='sizeList' :current-page.sync="dailogCurrent" layout="total, sizes, prev, pager, next, jumper" :pager-count='5' :total="dailogRecords" :page-count="dailogPages" :page-size="5"> </el-pagination>
      </div>
    </el-dialog> -->
    <!-- 获取保险公司机构 -->
    <!-- <el-dialog title="保险公司机构" :before-close='insOrgClose'  :append-to-body='true' :visible.sync="insorg_dialog" width="50%" center>
      <el-table stripe @row-click='selectRowInsOrg' ref="multipleTable" :data="insOrgTableData" >
        <el-table-column prop="orgcode" label="保险机构代码" center ></el-table-column>
        <el-table-column prop="orgname" label="保险机构名称" center ></el-table-column>
      </el-table>
      <div class="pagination" >
        <el-pagination @size-change="insOrgSizeChange" @current-change='insOrgCurrentChange' :page-sizes='sizeList' :current-page.sync="dailogCurrent" layout="total, sizes, prev, pager, next, jumper" :pager-count='5' :total="dailogRecords" :page-size="5" :page-count="dailogPages"> </el-pagination>
      </div>
    </el-dialog> -->
    <!-- 获取投保人代码 -->
    <!-- <el-dialog title="投保人或被保人" :before-close='insManClose' :append-to-body='true' :visible.sync="insMan_dialog" width="50%" center>
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
    </el-dialog> -->
    <!-- 获取业务员 -->
    <!-- <el-dialog title="归属业务员" :before-close='agentClose' :append-to-body='true' :visible.sync="agentIns_dialog" width="70%" center>
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
      <el-table @row-click='selectRowAgentMod' ref="multipleTable" :data="agentListData">
        <el-table-column prop="agentCode" label="归属业务员代码" center ></el-table-column>
        <el-table-column prop="agentName" label="归属业务员名称" center ></el-table-column>
      </el-table>
      <div class="pagination" >
        <el-pagination @size-change="agentModSizeChange" small @current-change='agentModCurrentChange' :current-page.sync="dailogCurrent" :pager-count='5' :page-size='5' :page-sizes='sizeList'  :total="dailogRecords" layout="total, sizes, prev, pager, next, jumper" :page-count="dailogPages"></el-pagination>
      </div>
    </el-dialog> -->
     <!-- 获取险种代码 -->
    <!-- <el-dialog title="险种" :before-close='riskClose' :append-to-body='true' :visible.sync="risk_dialog" width="50%" center>
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
      <el-table stripe @row-click='selectRowRisk' ref="multipleTable" :data="riskListData">
        <el-table-column prop="riskcode"  label="险种代码" show-overflow-tooltip></el-table-column>
        <el-table-column prop="riskname" label="险种名称" show-overflow-tooltip></el-table-column>
      </el-table>
      <div class="pagination" >
        <el-pagination @size-change="riskSizeChange" small @current-change='riskCurrentChange' :current-page.sync="dailogCurrent" :pager-count='5' :page-size='5' :page-sizes='sizeList'  :total="dailogRecords" layout="total, sizes, prev, pager, next, jumper" :page-count="dailogPages"></el-pagination>
      </div>
    </el-dialog> -->
    <!-- 金额提示 -->
    <!-- <el-dialog title="提示" center :append-to-body='true' :visible.sync="isTrue" width="30%" >
      <p style="text-align: center; ">此金额值不大于0，确定继续?</p>
      <span slot="footer" class="dialog-footer">
        <el-button @click="calBtn">取 消</el-button>
        <el-button type="primary" @click="trueBtn">确 定</el-button>
      </span>
    </el-dialog> -->
    <!--新增个人客户 的弹框-->
    <!-- <el-dialog :append-to-body="true" @close='closeCus' width="70%" center title="新增个人客户" :visible.sync="isAddCus">
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
          <el-col :span="12" >
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
    </el-dialog> -->
    <!-- 获取公司机构 -->
    <!-- <el-dialog title="公司机构" :before-close='orgClose'  :append-to-body='true' :visible.sync="org_dialog" width="50%" center>
      <el-table stripe @row-click='selectRowOrg' ref="multipleTable" :data="orgTableData" >
        <el-table-column prop="comCode" label="机构代码" center ></el-table-column>
        <el-table-column prop="comCName" label="机构名称" center ></el-table-column>
      </el-table>
      <div class="pagination" >
        <el-pagination @size-change="orgSizeChange" @current-change='orgCurrentChange' :page-sizes='sizeList' :current-page.sync="dailogCurrent" layout="total, sizes, prev, pager, next, jumper" :pager-count='5' :total="dailogRecords" :page-size="5" :page-count="dailogPages"> </el-pagination>
      </div>
    </el-dialog> -->
  </div>
</template>

<script>
import NoticeBar from '@/components/notice-bar'
import LabelText from '@/components/label-text'
import LineTittle from '@/components/line-tittle'
// import IsEmpty from '@/utils/IsEmpty'
import { mapActions } from 'vuex'
export default {
  data () {
    const { emptyValidator, noValidator, nameValidator, letterNumberValidator, billNumberValidator, PostValidator, IdValidator, insurtypeaddPremiumValidator2, insModPremiumValidator, PhoneValidator, phoneNumberValidator } = this.$store.getters.validators
    return {
      IdValidator: IdValidator,
      emptyValidator: emptyValidator,
      noValidator: noValidator,
      isContinue: true,
      allInput: false,
      longFlagTag: false, // 投保人证件日期是否灰显
      isTrue: false,
      isEdit: true,
      isclick: true,
      isSg: false,
      isSc: false,
      rule: {
        'lifePCMainCondition.proposalNo': letterNumberValidator, // 投保单号
        'lifePCMainCondition.policyNo': billNumberValidator, // 保单号
        'lifePCMainCondition.policyStatus': emptyValidator,
        'lifePCMainCondition.proposalDate': emptyValidator,
        'lifePCMainCondition.acceptDate': emptyValidator,
        'lifePCMainCondition.generateDate': emptyValidator,
        'lifePCMainCondition.jzDate': emptyValidator,
        'lifePCMainCondition.bdYear': emptyValidator,
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
        'lifePartyCondition.mobilePhone': phoneNumberValidator
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
      BillNoList: { // 个保单详情
        lifePCMainCondition: { // 基本信息
          'proposalNo': '', // 投保单号
          'policyNo': '', // 保单号
          'policyStatus': '', // 保单状态
          'proposalDate': '',
          'acceptDate': '',
          'generateDate': '',
          'jzDate': '',
          'bdYear': '',
          'companyCode': '', // 归属保险公司代码
          'companyName': '', // 归属保险公司名称
          'companyComCode': '', // 归属保险公司机构代码
          'companyComName': '', // 归属保险公司机构名称
          'insuranceMark': '', // 新契约标记
          'atuoAcceptFlag': '', // 是否自动续保
          'businessNature': '1', // 出单渠道
          'busiType': '', // 业务类型
          'xjjzzddjbf': '', // 现金价值自动垫缴保费
          'xjjzdjbff': '', // 账户价值自动抵交保费
          'hllqfs': '', // 红利领取方式
          'njlqfs': '', // 年金领取方式
          'backMsgSignDate': '', // 回执签收日期
          'speAgreement': '', // 特别约定
          'hfStatus': '',
          'hfDate': '',
          'updateTime': '',
          'isDoubleInsert': '', // 双录标识
          'singleMode': '', // 出单方式
          'byMyself': '', // 自保件
          'flag': '',
          'surrenderFlag': '',
          'handlerCode': ''
        },
        lifePartyCondition: {
          companyCode: '',
          companyName: '',
          partyFlag: '1',
          serialNo: '1',
          partyType: '1'
        }, // 投保人信息
        lifePartyConditionDList: [
          {
            'insureNoD': '',
            'insureNameD': '',
            'insureAddressD': '',
            'postNoD': '',
            'sexTypeD': '',
            'countryD': '',
            'educationCodeD': '',
            'marriageD': '',
            'birthDateD': '',
            'remark': '',
            'identifyTypeD': '',
            'identifyNameD': '',
            'identifyNumberD': '',
            'identifyValiddateD': '',
            'longFlagD': '1',
            'longFlagtag': false,
            'longFlagTag': false,
            'insureTelD': '',
            'mobilePhoneD': '',
            'workingUnitD': '',
            'jobD': '',
            'mailD': '',
            'weixinD': '',
            'habitualResidenceD': '',
            'isclick': false,
            'isInput': false,
            'partyFlagD': '2',
            'serialNoD': '2',
            'partyTypeD': '1'
          }
        ], // 被保险人
        lifePartyTConditionList: [], // 身故受益人
        lifePartyAConditionList: [], // 生存受益人
        lifeCItemKindConditionList: [], // 险种信息
        lifeFeeCondition: {
          paidDate: '',
          firstal: '',
          bankName: '',
          accountNameFirstal: '',
          accountFirstal: ''
        }, // 缴费信息
        lifeChargeConditionList: [] // 缴费明细
      }, // 保单号信息
      loading: '',
      sizeList: [], // 每页显示条数
      dailogRecords: 0,
      dailogPages: 0,
      dailogSize: 5,
      dailogCurrent: 1,
      com_dialog: false,
      org_dialog: false,
      orgTableData: [],
      insComTableData: [],
      insorg_dialog: false,
      insOrgTableData: [],
      isInput: false,
      insMan_dialog: false,
      searchInsMan: {},
      insManType: '',
      insManListData: [],
      dateForm: {
        backMsgSignDate: '',
        hfDate: '',
        hfStatus: ''
      },
      isDate: false, // 是否回录日期
      isHf: false,
      fileList: [],
      isImport: false,
      isTip: false,
      agentIns_dialog: false, // 是否显示业务员弹框
      agentData: {},
      agentListData: [],
      risk_dialog: false, // 是否显示险种弹框
      riskList: {},
      riskListData: [], // 险种数据
      riskIndex: '',
      riskTag: '',
      isAddCus: false,
      addRules: {
        custName: nameValidator,
        comCode: emptyValidator,
        comCName: emptyValidator,
        idNumber: emptyValidator,
        birthDate: emptyValidator,
        phone: PhoneValidator,
        identifyValiddate: emptyValidator
      },
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
      }
    }
  },
  mounted () {
    this.$nextTick(function () {
      // 初始化数据
      this.getDate()
      let queryDetailed = this.$store.state.proposalForm.localStorage
      console.log(queryDetailed)
      // this.addFeeItem()
      // this.BillNoList.lifePCMainCondition.insuranceMark = '新保'
    })
  },
  watch: {
    'BillNoList.lifePCMainCondition.companyCode' (newValue, oldValue) {
      if (newValue === '') {
        this.BillNoList.lifePCMainCondition.companyName = ''
      }
    },
    'BillNoList.lifePCMainCondition.companyComCode' (newValue, oldValue) {
      if (newValue === '') {
        this.BillNoList.lifePCMainCondition.companyComName = ''
      }
    },
    'BillNoList.lifePCMainCondition.handlerCode' (newValue, oldValue) {
      if (newValue === '') {
        this.BillNoList.lifePCMainCondition.handlerName = ''
        this.BillNoList.lifePCMainCondition.comCode = ''
        this.BillNoList.lifePCMainCondition.comName = ''
      }
    },
    'addCustom.comCode' (newValue, oldValue) {
      if (newValue === '') {
        this.addCustom.comCName = ''
      }
    }
  },
  methods: {
    getBillMesg () {
      this.queryPolicyById_Mod()
    },
    postAddCustom () { // 新增客户的提交表单
      this.$refs['addCustom'].validate((valid) => {
        if (valid) {
          if (this.addCustom.mobile === '' && this.addCustom.phone === '') {
            this.open('error', '手机号与固话必填一个！')
            return false
          }
          let post = {
            'custName': this.addCustom.custName,
            'sex': this.addCustom.sex,
            'birthDate': this.addCustom.birthDate
          }
          this.customerSimilar_NewBill(post).then(resp => {
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
      this.customerAdd_NewBill(this.addCustom).then(result => {
        this.closeLoading()
        if (result.code === '000000') {
          this.isAddCus = false
          this.$refs.multipleTable.clearSelection()
          this.open('success', '新增成功')
          this.closeCus()
        } else {
          this.open('error', result.msg)
        }
      }).catch(() => {
        this.closeLoading()
      })
    },
    closeCus () { // 关闭新增客户
      this.isAddCus = false
      this.addCustom = {
        'custName': '',
        'comCode': '',
        'comName': '',
        'paperworkType': '',
        'idNumber': '',
        'sex': '',
        'identifyValiddate': '',
        'isLongFlag': '',
        'longFlagtag': false,
        'birthDate': '',
        'familyName': '',
        'familyMembers': '',
        'familyRelation': '',
        'maritalStatus': '',
        'address': '',
        'zipCode': '',
        'education': '',
        'job': '',
        'modelsCode': '',
        'carNumber': '',
        'mobile': '',
        'phone': '',
        'fax': '',
        'email': '',
        'status': '',
        'country': '',
        'birthplace': '',
        'weChat': '',
        'workingUnit': '',
        'habitualResidence': '',
        'remark': ''
      }
      this.$refs['addCustom'].resetFields()
    },
    isHasCustom () { // 是否存在客户
      let postD = {
        'idType': this.addCustom.paperworkType,
        'idNo': this.addCustom.idNumber
      }
      this.customerIsExist_NewBill(postD).then(resp => {
        if (resp.code === '000000') {
          if (resp.data === true) {
            this.addCustom.idNumber = ''
            this.open('error', '该客户已存在！')
          }
        }
      })
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
        habitualResidenceD: '',
        partyFlagD: '2',
        partyTypeD: '1'
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
        'insuredrName': '',
        'partyFlag': '3',
        'serialNo': '2'
      }
      this.BillNoList.lifePartyTConditionList.push(addPost)
      console.log(this.BillNoList.lifePartyTConditionList)
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
        'habitualResidence': '',
        'partyFlag': '4',
        'serialNo': '2'
      }
      this.BillNoList.lifePartyAConditionList.push(addPost)
      console.log(this.BillNoList.lifePartyTConditionList)
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
    getComInfo (page) { // 保险公司查询
      this.sizeList = [5, 10, 20, 50]
      this.dailogCurrent = page
      let insurerCode = ''
      let insurerName = ''
      insurerCode = this.BillNoList.lifePCMainCondition.companyCode
      insurerName = this.BillNoList.lifePCMainCondition.companyName
      var data = {}
      data = {
        'insurerCode': insurerCode,
        'insurerName': insurerName,
        'currentPage': page,
        'clickType': '2',
        'type': '2',
        'pageSize': this.dailogSize
      }
      this.getInsCom_newBill(data).then(resp => {
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
    blurInsCom (event, tag) { // 判断保险公司是否存在
      if (event.target.value === '' || this.com_dialog) {
        return false
      }
      let insurerCode = ''
      let insurerName = ''
      if (tag === 0) {
        insurerCode = event.target.value
      } else {
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
      this.getInsCom_newBill(dataCom).then(resp => {
        if (resp.code === '000000') {
          this.BillNoList.lifePCMainCondition.companyCode = resp.data.data[0].insurercode
          this.BillNoList.lifePCMainCondition.companyName = resp.data.data[0].insurername
        } else {
          this.BillNoList.lifePCMainCondition.companyCode = ''
          this.BillNoList.lifePCMainCondition.companyName = ''
          this.open('error', '改代码或名称不存在！')
        }
      })
    },
    comSizeChange (size) { // 保险公司
      this.dailogSize = size
      this.getComInfo(1)
    },
    selectRowCom (row) { // 保险公司选择
      this.closeDailog().then(() => {
        this.BillNoList.lifePCMainCondition.companyCode = row.insurercode
        this.BillNoList.lifePCMainCondition.companyName = row.insurername
        this.com_dialog = false
      })
    },
    comCurrentChange (val) { // 选择保险公司分页
      this.getComInfo(val)
    },
    comClose () { // 关闭弹窗
      this.sizeList = []
      this.com_dialog = false
      this.dailogSize = 5
      this.BillNoList.lifePCMainCondition.companyCode = ''
      this.BillNoList.lifePCMainCondition.companyName = ''
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
      this.getInsOrg_newBill(dataOrg).then(resp => {
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
    insOrgClose () { // 关闭弹窗
      this.sizeList = []
      this.dailogSize = 5
      this.insorg_dialog = false
      this.BillNoList.lifePCMainCondition.companyComCode = ''
      this.BillNoList.lifePCMainCondition.companyComName = ''
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
      this.allOrg_newBill(dataOrg).then(resp => {
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
      this.allOrg_newBill(dataOrg).then(resp => {
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
    customerFindIns (page, tag, event, index) { // 获取投保人被保险人
      this.sizeList = [5, 10, 20, 50]
      this.insManType = tag
      console.log(index)
      if (index >= 0) {
        this.itemIndex = index
      } else {
        this.itemIndex = 0
      }
      let CodeOrName
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
      this.customerFind_newBill(data).then(resp => {
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
          this.longFlagTag = true
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
          if (row.isLongFlag === 0) { // 身份证是否长 期有效
            this.$set(this.BillNoList.lifePartyCondition, 'longFlagtag', false)
          } else {
            this.$set(this.BillNoList.lifePartyCondition, 'longFlagtag', true)
          }
          // this.byMyself()
        } else {
          this.BillNoList.lifePartyConditionDList[this.itemIndex].isInput = true
          this.BillNoList.lifePartyConditionDList[this.itemIndex].longFlagTag = true
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
          if (row.isLongFlag === 0) { // 身份证是否长 期有效
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
        this.BillNoList.lifePartyConditionDList[this.itemIndex].longFlagTag = false
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
      this.agentFind_newBill(data).then(resp => {
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
      this.riskcode_newBill(data).then(resp => {
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
          this.BillNoList.lifeCItemKindConditionList.forEach((item, index) => {
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
          this.BillNoList.lifeCItemKindConditionList[this.riskIndex].riskCode = row.riskcode
          this.BillNoList.lifeCItemKindConditionList[this.riskIndex].riskName = row.riskname
          if (row.mainorextrflag === '2') {
            row.mainorextrflag = '0'
          }
          this.BillNoList.lifeCItemKindConditionList[this.riskIndex].mainFlag = row.mainorextrflag
          this.BillNoList.lifeCItemKindConditionList[this.riskIndex].paymentPeriod = row.paymentperiod
          this.BillNoList.lifeCItemKindConditionList[this.riskIndex].payrate = row.payway
        } else {
          let riskTag = false
          this.BillNoList.lifeCItemKindConditionList.forEach((item, index) => {
            if (row.riskcode === item.riskCode) {
              riskTag = true
            }
          })
          if (riskTag) {
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
    bankSelect (item) { // 银行选择
      this.BillNoList.lifeFeeCondition.traBankFirstal = item.configSetValueCode
      this.BillNoList.lifeFeeCondition.bankName = item.configSetValueName
    },
    querySearchAsync (queryString, cb) { // 银行选择
      this.getAllBank_newBill({'bankCodeOrName': queryString}).then(resp => {
        this.bankSearch = resp
        cb(this.bankSearch)
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
    checkChange (val) { // 勾选终身（投保人）
      if (val) {
        this.rule['lifePartyCondition.identifyValiddate'] = this.noValidator
        this.BillNoList.lifePartyCondition.identifyValiddate = ''
        this.longFlagTag = true
      } else {
        this.longFlagTag = false
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
    idNumChange (val) { // 验证身份证号码 （投保人）
      if (val === '1' || val === '2') {
        this.rule['lifePartyCondition.identifyNumber'] = this.IdValidator
      } else {
        this.rule['lifePartyCondition.identifyNumber'] = this.emptyValidator
      }
    },
    relChange (val) { // 与被保险关系（投保人）
      console.log(val)
      if (val === '1') { // 选择本人
        console.log(this.BillNoList.lifePartyCondition)
        console.log(this.BillNoList.lifePartyConditionDList[0])
        if (this.BillNoList.lifePartyConditionDList.length > 1) {
          this.BillNoList.lifePartyConditionDList.splice(1, this.BillNoList.lifePartyConditionDList.length)
        }
        this.BillNoList.lifePartyConditionDList[0].isInput = true
        this.BillNoList.lifePartyConditionDList[0].isclick = false
        this.BillNoList.lifePartyConditionDList[0].insureNoD = this.BillNoList.lifePartyCondition.insureNo
        this.BillNoList.lifePartyConditionDList[0].insureNameD = this.BillNoList.lifePartyCondition.insureName
        this.BillNoList.lifePartyConditionDList[0].insureAddressD = this.BillNoList.lifePartyCondition.insureAddress
        this.BillNoList.lifePartyConditionDList[0].postNoD = this.BillNoList.lifePartyCondition.postNo
        this.BillNoList.lifePartyConditionDList[0].sexTypeD = this.BillNoList.lifePartyCondition.exType
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
        this.isEdit = true
      } else {
        if (this.BillNoList.lifePartyConditionDList.length > 1) {
          this.BillNoList.lifePartyConditionDList.splice(1, this.BillNoList.lifePartyConditionDList.length)
        }
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
        this.BillNoList.lifePartyConditionDList[0].isclick = true
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
    idNumChangeCus (val) { // 验证身份证号码 (新增客户)
      if (val === '1' || val === '2') {
        this.addRules['idNumber'] = this.IdValidator
      } else {
        this.addRules['idNumber'] = this.emptyValidator
      }
    },
    checkChangeItem (val, index, tag) {
      if (val) {
        if (tag === 0) { // 被保险人
          this.BillNoList.lifePartyConditionDList[index].longFlagTag = true
          this.BillNoList.lifePartyConditionDList[index].identifyValiddateD = ''
        } else if (tag === 1) { // 身故受益人
          this.BillNoList.lifePartyTConditionList[index].longFlagTag = true
          this.BillNoList.lifePartyTConditionList[index].identifyValiddate = ''
        } else if (tag === 2) {
          this.BillNoList.lifePartyAConditionList[index].longFlagTag = true
          this.BillNoList.lifePartyAConditionList[index].identifyValiddate = ''
        }
      } else {
        if (tag === 0) {
          this.BillNoList.lifePartyConditionDList[index].longFlagTag = false
          // this.rules['identifyValiddateD'] = this.emptyValidator
        } else if (tag === 1) { // 身故受益人
          // this.sgRules['identifyValiddateD'] = this.emptyValidator
        } else if (tag === 2) {
          // this.sgRules['identifyValiddateD'] = this.emptyValidator
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
    // 时间处理
    getDate () {
      var timestamp = new Date().getTime()
      this.BillNoList.lifePCMainCondition.updateTime = timestamp
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
    ...mapActions([
      'queryPolicyById_Mod'
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
  #newBill{
    padding: 0px 30px 30px 30px;
  }
  .manage_form { margin-top: 10px; }
  .ri-line { margin-bottom: 10px; }
  .selectItem { margin-top: 20px; }
  .btnStyle { text-align: center; margin: 20px 0 0; }
  .addBtn { text-align: center; margin-bottom: 20px; }
  .checkBtn { margin: 20px 0; text-align: center; }
  .splice-line { border-bottom: 1px solid #e4e7ed; margin-bottom: 10px; }
  .splice-line:last-child { border-bottom: 0; }
  .download { text-align: center; margin-bottom: 10px; }
  .upLoad { text-align: center; }
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
  #newBill .mesg_form .el-form-item__error { left: 170px;}
  .riskTable .el-form-item__error { left: 0;}
  .cus_form .el-form-item__error { left: 130px;}
</style>

