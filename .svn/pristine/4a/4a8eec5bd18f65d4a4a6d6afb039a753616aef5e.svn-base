<template>
  <div id="riskIndex" >
      <el-form :model="info" :rules="queryrules" ref="queryForm" >
        <ui-line-tittle :collapsible="true" >
          <span slot="title" >
            <i class="font_family icon-jy-menu-4" ></i>基本信息
          </span>
          <div class="ri-content" slot="content" >
            <el-row class="ri-line">
              <el-col :span="12">
              <ui-label-text :required="true" labelWidth="130" label="保单号:" >
                <span slot="text">{{info.lifePCMainCondition.policyNo}}</span>
              </ui-label-text>
              </el-col>
              <el-col :span="12">
                <ui-label-text labelWidth="130" label="投保单号:" >
                  <span slot="text">{{info.lifePCMainCondition.proposalNo}}</span>
                </ui-label-text>
              </el-col>
            </el-row>
            <el-row class="ri-line">
              <el-col :span="12">
              <ui-label-text labelWidth="130" label="承保日期:" >
                <span slot="text">{{info.lifePCMainCondition.acceptDate}}</span>
              </ui-label-text>
              </el-col>
              <el-col :span="12">
              <ui-label-text labelWidth="130" label="生效日期:" >
                <span slot="text">{{info.lifePCMainCondition.generateDate}}</span>
              </ui-label-text>
              </el-col>
            </el-row>
            <el-row class="ri-line">
              <el-col :span="12">
              <ui-label-text labelWidth="130" label="投保日期:" >
                <span slot="text">{{info.lifePCMainCondition.proposalDate}}</span>
              </ui-label-text>
              </el-col>
              <el-col :span="12">
              <ui-label-text labelWidth="130" label="保单状态:" >
                <span slot="text">{{info.lifePCMainCondition.aaa}}</span>
              </ui-label-text>
              </el-col>
            </el-row>
            <el-row class="ri-line">
              <el-col :span="12">
              <ui-label-text labelWidth="130" label="归属保险公司代码:" >
                <span slot="text">{{info.lifePCMainCondition.aaa}}</span>
              </ui-label-text>
              </el-col>
              <el-col :span="12">
              <ui-label-text labelWidth="130" label="归属保险公司名称:" >
                <span slot="text">{{info.lifePCMainCondition.aaa}}</span>
              </ui-label-text>
              </el-col>
            </el-row>
            <el-row class="ri-line">
              <el-col :span="12">
              <ui-label-text labelWidth="130" label="归属保险公司机构代码:" >
                <span slot="text">{{info.lifePCMainCondition.aaa}}</span>
              </ui-label-text>
              </el-col>
              <el-col :span="12">
              <ui-label-text labelWidth="130" label="归属保险公司机构名称:" >
                <span slot="text">{{info.lifePCMainCondition.aaa}}</span>
              </ui-label-text>
              </el-col>
            </el-row>
            <el-row class="ri-line">
              <el-col :span="12">
              <ui-label-text labelWidth="130" label="新/续期标记:" >
                <span slot="text">{{info.lifePCMainCondition.aaa}}</span>
              </ui-label-text>
              </el-col>
              <el-col :span="12">
              <ui-label-text labelWidth="130" label="缴至日期:" >
                <span slot="text">{{info.lifePCMainCondition.aaa}}</span>
              </ui-label-text>
              </el-col>
            </el-row>
            <el-row class="ri-line">
              <el-col :span="12">
              <ui-label-text labelWidth="130" label="保单年度:" >
                <span slot="text">{{info.lifePCMainCondition.aaa}}</span>
              </ui-label-text>
              </el-col>
              <el-col :span="12">
              <ui-label-text labelWidth="130" label="是否自动续保:" >
                <span slot="text">{{info.lifePCMainCondition.aaa}}</span>
              </ui-label-text>
              </el-col>
            </el-row>
            <el-row class="ri-line">
              <el-col :span="12">
              <ui-label-text labelWidth="130" label="出单渠道:" >
                <span slot="text">{{info.lifePCMainCondition.aaa}}</span>
              </ui-label-text>
              </el-col>
              <el-col :span="12">
              <ui-label-text labelWidth="130" label="业务类型:" >
                <span slot="text">{{info.lifePCMainCondition.aaa}}</span>
              </ui-label-text>
              </el-col>
            </el-row>
            <el-row class="ri-line">
              <el-col :span="12">
              <ui-label-text labelWidth="130" label="现金价值自动垫缴保费:" >
                <span slot="text">{{info.lifePCMainCondition.aaa}}</span>
              </ui-label-text>
              </el-col>
              <el-col :span="12">
              <ui-label-text labelWidth="130" label="账户价值自动抵交保费:" >
                <span slot="text">{{info.lifePCMainCondition.aaa}}</span>
              </ui-label-text>
              </el-col>
            </el-row>
            <el-row class="ri-line">
              <el-col :span="12">
              <ui-label-text labelWidth="130" label="红利领取方式:" >
                <span slot="text">{{info.lifePCMainCondition.aaa}}</span>
              </ui-label-text>
              </el-col>
              <el-col :span="12">
              <ui-label-text labelWidth="130" label="年金领取方式:" >
                <span slot="text">{{info.lifePCMainCondition.aaa}}</span>
              </ui-label-text>
              </el-col>
            </el-row>
            <el-row class="ri-line">
              <el-col :span="12">
              <ui-label-text labelWidth="130" label="回执签收日期:" >
                <span slot="text">{{info.lifePCMainCondition.aaa}}</span>
              </ui-label-text>
              </el-col>
              <el-col :span="12">
              <ui-label-text labelWidth="130" label="特别约定:" >
                <span slot="text">{{info.lifePCMainCondition.aaa}}</span>
              </ui-label-text>
              </el-col>
            </el-row>
            <el-row class="ri-line">
              <el-col :span="12">
              <ui-label-text labelWidth="130" label="回访状态:" >
                <span slot="text">{{info.lifePCMainCondition.aaa}}</span>
              </ui-label-text>
              </el-col>
              <el-col :span="12">
              <ui-label-text labelWidth="130" label="出单方式:" >
                <span slot="text">{{info.lifePCMainCondition.aaa}}</span>
              </ui-label-text>
              </el-col>
            </el-row>
            <el-row class="ri-line">
              <el-col :span="12">
              <ui-label-text labelWidth="130" label="自保件:" >
                <span slot="text">{{info.lifePCMainCondition.aaa}}</span>
              </ui-label-text>
              </el-col>
            </el-row>
          </div>
        </ui-line-tittle>
        <ui-line-tittle :collapsible="true" >
          <span slot="title" >
            <i class="font_family icon-jy-menu-4" ></i>投保人信息
          </span>
          <div class="ri-content" slot="content" >
            <el-row class="ri-line">
              <el-col :span="12">
              <ui-label-text labelWidth="130" label="投保人代码:" >
                <span slot="text">{{recordData.aaa}}</span>
              </ui-label-text>
              </el-col>
              <el-col :span="12">
                <ui-label-text labelWidth="130" label="投保人名称:" >
                  <span slot="text">{{recordData.aaa}}</span>
                </ui-label-text>
              </el-col>
            </el-row>
            <el-row class="ri-line">
              <el-col :span="12">
              <ui-label-text labelWidth="130" label="投保人地址:" >
                <span slot="text">{{recordData.aaa}}</span>
              </ui-label-text>
              </el-col>
              <el-col :span="12">
                <ui-label-text labelWidth="130" label="邮政编码:" >
                  <span slot="text">{{recordData.aaa}}</span>
                </ui-label-text>
              </el-col>
            </el-row>
            <el-row class="ri-line">
              <el-col :span="12">
              <ui-label-text labelWidth="130" label="性别:" >
                <span slot="text">{{recordData.aaa}}</span>
              </ui-label-text>
              </el-col>
              <el-col :span="12">
                <ui-label-text labelWidth="130" label="国籍:" >
                  <span slot="text">{{recordData.aaa}}</span>
                </ui-label-text>
              </el-col>
            </el-row>
            <el-row class="ri-line">
              <el-col :span="12">
              <ui-label-text labelWidth="130" label="出生日期:" >
                <span slot="text">{{recordData.aaa}}</span>
              </ui-label-text>
              </el-col>
              <el-col :span="12">
                <ui-label-text labelWidth="130" label="备注:" >
                  <span slot="text">{{recordData.aaa}}</span>
                </ui-label-text>
              </el-col>
            </el-row>
            <el-row class="ri-line">
              <el-col :span="12">
              <ui-label-text labelWidth="130" label="婚姻状况:" >
                <span slot="text">{{recordData.aaa}}</span>
              </ui-label-text>
              </el-col>
              <el-col :span="12">
                <ui-label-text labelWidth="130" label="学历:" >
                  <span slot="text">{{recordData.aaa}}</span>
                </ui-label-text>
              </el-col>
            </el-row>
            <el-row class="ri-line">
              <el-col :span="12">
              <ui-label-text labelWidth="130" label="证件类型:" >
                <span slot="text">{{recordData.aaa}}</span>
              </ui-label-text>
              </el-col>
              <el-col :span="12">
              <ui-label-text labelWidth="130" label="证件号码:" >
                <span slot="text">{{recordData.aaa}}</span>
              </ui-label-text>
              </el-col>
            </el-row>
            <el-row class="ri-line">
              <el-col :span="12">
              <ui-label-text labelWidth="130" label="证件有效期:" >
                <span slot="text">{{recordData.aaa}}</span>
              </ui-label-text>
              </el-col>
            </el-row>
            <el-row class="ri-line">
              <el-col :span="12">
              <ui-label-text labelWidth="130" label="固定电话:" >
                <span slot="text">{{recordData.aaa}}</span>
              </ui-label-text>
              </el-col>
              <el-col :span="12">
              <ui-label-text labelWidth="130" label="移动电话:" >
                <span slot="text">{{recordData.aaa}}</span>
              </ui-label-text>
              </el-col>
            </el-row>
            <el-row class="ri-line">
              <el-col :span="12">
              <ui-label-text labelWidth="130" label="工作单位:" >
                <span slot="text">{{recordData.aaa}}</span>
              </ui-label-text>
              </el-col>
              <el-col :span="12">
              <ui-label-text labelWidth="130" label="职业:" >
                <span slot="text">{{recordData.aaa}}</span>
              </ui-label-text>
              </el-col>
            </el-row>
            <el-row class="ri-line">
              <el-col :span="12">
              <ui-label-text labelWidth="130" label="Email:" >
                <span slot="text">{{recordData.aaa}}</span>
              </ui-label-text>
              </el-col>
              <el-col :span="12">
              <ui-label-text labelWidth="130" label="微信号:" >
                <span slot="text">{{recordData.aaa}}</span>
              </ui-label-text>
              </el-col>
            </el-row>
            <el-row class="ri-line">
              <el-col :span="12">
              <ui-label-text labelWidth="130" label="经常居住地:" >
                <span slot="text">{{recordData.aaa}}</span>
              </ui-label-text>
              </el-col>
            </el-row>
            <el-row class="ri-line">
              <el-col :span="12">
              <ui-label-text labelWidth="130" label="与被保险人关系:" >
                <span slot="text">{{recordData.aaa}}</span>
              </ui-label-text>
              </el-col>
              <el-col :span="12">
              <ui-label-text labelWidth="130" label="关系名称:" >
                <span slot="text">{{recordData.aaa}}</span>
              </ui-label-text>
              </el-col>
            </el-row>
          </div>
        </ui-line-tittle>
        <ui-line-tittle :collapsible="true" >
          <span slot="title" >
            <i class="font_family icon-jy-menu-4" ></i>被保险人信息
          </span>
          <div class="ri-content" slot="content" >
            <el-row class="ri-line">
              <el-col :span="12">
              <ui-label-text labelWidth="130" label="被保险人代码:" >
                <span slot="text">{{recordData.aaa}}</span>
              </ui-label-text>
              </el-col>
              <el-col :span="12">
                <ui-label-text labelWidth="130" label="被保险人名称:" >
                  <span slot="text">{{recordData.aaa}}</span>
                </ui-label-text>
              </el-col>
            </el-row>
            <el-row class="ri-line">
              <el-col :span="12">
              <ui-label-text labelWidth="130" label="投保人地址:" >
                <span slot="text">{{recordData.aaa}}</span>
              </ui-label-text>
              </el-col>
              <el-col :span="12">
                <ui-label-text labelWidth="130" label="邮政编码:" >
                  <span slot="text">{{recordData.aaa}}</span>
                </ui-label-text>
              </el-col>
            </el-row>
            <el-row class="ri-line">
              <el-col :span="12">
              <ui-label-text labelWidth="130" label="性别:" >
                <span slot="text">{{recordData.aaa}}</span>
              </ui-label-text>
              </el-col>
              <el-col :span="12">
                <ui-label-text labelWidth="130" label="国籍:" >
                  <span slot="text">{{recordData.aaa}}</span>
                </ui-label-text>
              </el-col>
            </el-row>
            <el-row class="ri-line">
              <el-col :span="12">
              <ui-label-text labelWidth="130" label="出生日期:" >
                <span slot="text">{{recordData.aaa}}</span>
              </ui-label-text>
              </el-col>
              <el-col :span="12">
                <ui-label-text labelWidth="130" label="备注:" >
                  <span slot="text">{{recordData.aaa}}</span>
                </ui-label-text>
              </el-col>
            </el-row>
            <el-row class="ri-line">
              <el-col :span="12">
              <ui-label-text labelWidth="130" label="婚姻状况:" >
                <span slot="text">{{recordData.aaa}}</span>
              </ui-label-text>
              </el-col>
              <el-col :span="12">
                <ui-label-text labelWidth="130" label="学历:" >
                  <span slot="text">{{recordData.aaa}}</span>
                </ui-label-text>
              </el-col>
            </el-row>
            <el-row class="ri-line">
              <el-col :span="12">
              <ui-label-text labelWidth="130" label="证件类型:" >
                <span slot="text">{{recordData.aaa}}</span>
              </ui-label-text>
              </el-col>
              <el-col :span="12">
              <ui-label-text labelWidth="130" label="证件号码:" >
                <span slot="text">{{recordData.aaa}}</span>
              </ui-label-text>
              </el-col>
            </el-row>
            <el-row class="ri-line">
              <el-col :span="12">
              <ui-label-text labelWidth="130" label="证件有效期:" >
                <span slot="text">{{recordData.aaa}}</span>
              </ui-label-text>
              </el-col>
            </el-row>
            <el-row class="ri-line">
              <el-col :span="12">
              <ui-label-text labelWidth="130" label="固定电话:" >
                <span slot="text">{{recordData.aaa}}</span>
              </ui-label-text>
              </el-col>
              <el-col :span="12">
              <ui-label-text labelWidth="130" label="移动电话:" >
                <span slot="text">{{recordData.aaa}}</span>
              </ui-label-text>
              </el-col>
            </el-row>
            <el-row class="ri-line">
              <el-col :span="12">
              <ui-label-text labelWidth="130" label="工作单位:" >
                <span slot="text">{{recordData.aaa}}</span>
              </ui-label-text>
              </el-col>
              <el-col :span="12">
              <ui-label-text labelWidth="130" label="职业:" >
                <span slot="text">{{recordData.aaa}}</span>
              </ui-label-text>
              </el-col>
            </el-row>
            <el-row class="ri-line">
              <el-col :span="12">
              <ui-label-text labelWidth="130" label="Email:" >
                <span slot="text">{{recordData.aaa}}</span>
              </ui-label-text>
              </el-col>
              <el-col :span="12">
              <ui-label-text labelWidth="130" label="微信号:" >
                <span slot="text">{{recordData.aaa}}</span>
              </ui-label-text>
              </el-col>
            </el-row>
            <el-row class="ri-line">
              <el-col :span="12">
              <ui-label-text labelWidth="130" label="经常居住地:" >
                <span slot="text">{{recordData.aaa}}</span>
              </ui-label-text>
              </el-col>
            </el-row>
          </div>
        </ui-line-tittle>
        <ui-line-tittle :collapsible="true" >
          <span slot="title" >
            <i class="font_family icon-jy-menu-4" ></i>身故受益人信息
          </span>
          <div class="ri-content" slot="content" >
            <el-checkbox-group 
              v-model="info.checkedInfo"
              :min="1"
              :max="2">
              <el-checkbox v-for="item in checkBoxInfo" :label="item" :key="item">{{item}}</el-checkbox>
            </el-checkbox-group>
          </div>
        </ui-line-tittle>
        <ui-line-tittle :collapsible="true" >
          <span slot="title" >
            <i class="font_family icon-jy-menu-4" ></i>生存受益人信息
          </span>
          <div class="ri-content" slot="content" >
            <el-checkbox-group 
              v-model="info.checkedInfo"
              :min="1"
              :max="2">
              <el-checkbox v-for="item in checkBoxInfo1" :label="item" :key="item">{{item}}</el-checkbox>
            </el-checkbox-group>
          </div>
        </ui-line-tittle>
        <ui-line-tittle :collapsible="true" >
          <span slot="title" >
            <i class="font_family icon-jy-menu-4" ></i>业务员信息
          </span>
          <div class="ri-content" slot="content" >
            <el-row class="ri-line">
              <el-col :span="12">
              <ui-label-text labelWidth="130" label="业务员代码:" >
                <span slot="text">{{recordData.aaa}}</span>
              </ui-label-text>
              </el-col>
              <el-col :span="12">
                <ui-label-text labelWidth="130" label="业务员名称:" >
                  <span slot="text">{{recordData.aaa}}</span>
                </ui-label-text>
              </el-col>
            </el-row>
            <el-row class="ri-line">
              <el-col :span="12">
              <ui-label-text labelWidth="130" label="归属机构/部门代码:" >
                <span slot="text">{{recordData.aaa}}</span>
              </ui-label-text>
              </el-col>
              <el-col :span="12">
              <ui-label-text labelWidth="130" label="归属机构/部门名称:" >
                <span slot="text">{{recordData.aaa}}</span>
              </ui-label-text>
              </el-col>
            </el-row>
            <el-row class="ri-line">
              <el-col :span="12">
              <ui-label-text labelWidth="130" label="归属团队代码:" >
                <span slot="text">{{recordData.aaa}}</span>
              </ui-label-text>
              </el-col>
              <el-col :span="12">
              <ui-label-text labelWidth="130" label="归属团队名称:" >
                <span slot="text">{{recordData.aaa}}</span>
              </ui-label-text>
              </el-col>
            </el-row>
            <el-row class="ri-line">
              <el-col :span="12">
              <ui-label-text labelWidth="130" label="介绍人类型:" >
                <span slot="text">{{recordData.aaa}}</span>
              </ui-label-text>
              </el-col>
              <el-col :span="12">
              <ui-label-text labelWidth="130" label="介绍人代码:" >
                <span slot="text">{{recordData.aaa}}</span>
              </ui-label-text>
              </el-col>
            </el-row>
            <el-row class="ri-line">
              <el-col :span="12">
              <ui-label-text labelWidth="130" label="介绍人姓名:" >
                <span slot="text">{{recordData.aaa}}</span>
              </ui-label-text>
              </el-col>
              <el-col :span="12">
              <ui-label-text labelWidth="130" label="业务员状态:" >
                <span slot="text">{{recordData.aaa}}</span>
              </ui-label-text>
              </el-col>
            </el-row>
          </div>
        </ui-line-tittle>
        <ui-line-tittle :collapsible="true" >
          <span slot="title" >
            <i class="font_family icon-jy-menu-4" ></i>险种信息
          </span>
          <div class="ri-content" slot="content" >
            <el-table
              :data="tableData"
              style="width: 100%">
              <el-table-column
                label="险种代码"
                width="180">
                <template slot-scope="scope">
                  <span style="margin-left: 10px">{{ scope.row.insurerCode }}</span>
                </template>
              </el-table-column>
              <el-table-column
                label="险种名称"
                width="180">
                <template slot-scope="scope">
                  <span style="margin-left: 10px">{{ scope.row.insurerName }}</span>
                </template>
              </el-table-column>
              <el-table-column
                label="主/附险标记"
                width="180">
                <template slot-scope="scope">
                  <span style="margin-left: 10px">{{ scope.row.riskCode }}</span>
                </template>
              </el-table-column>
              <el-table-column
                label="缴费年期"
                width="180">
                <template slot-scope="scope">
                  <span style="margin-left: 10px">{{ scope.row.riskName }}</span>
                </template>
              </el-table-column>
              <el-table-column
                label="缴费频率"
                width="180">
                <template slot-scope="scope">
                  <span style="margin-left: 10px">{{ scope.row.rate }}</span>
                </template>
              </el-table-column>
              <el-table-column
                label="应缴保费"
                width="180">
                <template slot-scope="scope">
                  <span style="margin-left: 10px">{{ scope.row.rate }}</span>
                </template>
              </el-table-column>
              <el-table-column
                label="保险金额"
                width="180">
                <template slot-scope="scope">
                  <span style="margin-left: 10px">{{ scope.row.rate }}</span>
                </template>
              </el-table-column>
              <el-table-column
                label="份数"
                width="180">
                <template slot-scope="scope">
                  <span style="margin-left: 10px">{{ scope.row.rate }}</span>
                </template>
              </el-table-column>
              <el-table-column
                label="加费金额"
                width="180">
                <template slot-scope="scope">
                  <span style="margin-left: 10px">{{ scope.row.rate }}</span>
                </template>
              </el-table-column>
              <el-table-column
                label="豁免日期"
                width="180">
                <template slot-scope="scope">
                  <span style="margin-left: 10px">{{ scope.row.rate }}</span>
                </template>
              </el-table-column>
              <el-table-column
                label="豁免人"
                width="180">
                <template slot-scope="scope">
                  <span style="margin-left: 10px">{{ scope.row.rate }}</span>
                </template>
              </el-table-column>
              <el-table-column
                label="保险期间"
                width="180">
                <template slot-scope="scope">
                  <span style="margin-left: 10px">{{ scope.row.rate }}</span>
                </template>
              </el-table-column>
              <el-table-column
                label="险种状态"
                width="180">
                <template slot-scope="scope">
                  <span style="margin-left: 10px">{{ scope.row.rate }}</span>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </ui-line-tittle>
        <ui-line-tittle :collapsible="true" >
          <span slot="title" >
            <i class="font_family icon-jy-menu-4" ></i>缴费信息
          </span>
          <div class="ri-content" slot="content" >
            <el-row class="ri-line">
              <el-col :span="12">
              <ui-label-text labelWidth="130" label="应缴日期:" >
                <span slot="text"></span>
              </ui-label-text>
              </el-col>
              <el-col :span="12">
                <ui-label-text labelWidth="130" label="缴费方式:" >
                  <span slot="text"></span>
                </ui-label-text>
              </el-col>
            </el-row>
            <el-row class="ri-line">
              <el-col :span="12">
              <ui-label-text labelWidth="130" label="开户行名称:" >
                <span slot="text"></span>
              </ui-label-text>
              </el-col>
              <el-col :span="12">
                <ui-label-text labelWidth="130" label="账户名:" >
                  <span slot="text"></span>
                </ui-label-text>
              </el-col>
            </el-row>
            <el-row class="ri-line">
              <el-col :span="12">
              <ui-label-text labelWidth="130" label="账号:" >
                <span slot="text"></span>
              </ui-label-text>
              </el-col>
            </el-row>
          </div>
        </ui-line-tittle>
        <ui-line-tittle :collapsible="true" >
          <span slot="title" >
            <i class="font_family icon-jy-menu-4" ></i>缴费明细
          </span>
          <div class="ri-content" slot="content" >
            <el-table
              :data="tableData"
              style="width: 100%">
              <el-table-column
                label="承保险种代码"
                width="180">
                <template slot-scope="scope">
                  <span style="margin-left: 10px">{{ scope.row.insurerCode }}</span>
                </template>
              </el-table-column>
              <el-table-column
                label="险种名称"
                width="180">
                <template slot-scope="scope">
                  <span style="margin-left: 10px">{{ scope.row.insurerName }}</span>
                </template>
              </el-table-column>
              <el-table-column
                label="实收保费"
                width="280">
                <template slot-scope="scope">
                  <span style="margin-left: 10px">{{ scope.row.riskCode }}</span>
                </template>
              </el-table-column>
              <el-table-column
                label="实收日期"
                width="260">
                <template slot-scope="scope">
                  <span style="margin-left: 10px">{{ scope.row.riskName }}</span>
                </template>
              </el-table-column>
              <el-table-column label="险种状态">
                <template slot-scope="scope">
                  <span style="margin-left: 10px">{{ scope.row.riskName }}</span>                  
                </template>
              </el-table-column>
            </el-table>
          </div>
        </ui-line-tittle>
        <ui-line-tittle :collapsible="true" >
          <span slot="title" >
            <i class="font_family icon-jy-menu-4" ></i>总计
          </span>
          <div class="ri-content" slot="content" >
            <el-row class="ri-line">
              <el-col :span="12">
              <ui-label-text labelWidth="130" label="应缴保费总计:" >
                <span slot="text"></span>
              </ui-label-text>
              </el-col>
              <el-col :span="12">
                <ui-label-text labelWidth="130" label="实收保费总计:" >
                  <span slot="text"></span>
                </ui-label-text>
              </el-col>
            </el-row>
            <el-row class="ri-line">
              <el-col :span="12">
              <ui-label-text labelWidth="130" label="缴费状态:" >
                  <span slot="text"></span>                
              </ui-label-text>
              </el-col>
            </el-row>
          </div>
        </ui-line-tittle>
        <ui-line-tittle :collapsible="true" >
          <span slot="title" >
            <i class="font_family icon-jy-menu-4" ></i>保全信息
          </span>
          <div class="ri-content" slot="content" >
          </div>
        </ui-line-tittle>
      </el-form>
      <div class="btn-container" slot="controlbar" >
        <el-button type="primary" @click.native.prevent="back()">返回</el-button>
      </div>
  </div>
</template>

<script>
import NoticeBar from '@/components/notice-bar'
import LineTittle from '@/components/line-tittle'
import LabelText from '@/components/label-text'
import RiskImport from '@/pages/goodsCommRate_mgr/riskImport'
import { mapActions } from 'vuex'
export default {
  name: 'renewal-detail',
  props: ['info'],
  data () {
    return {
      disabled: true,
      fileList: [],
      tableData: [
        {
          insurerCode: '00',
          insurerName: 'aa',
          riskCode: '123',
          riskName: 'aa'
        }
      ],
      checkBoxInfo: ['法定受益人', '指定受益人'],
      checkBoxInfo1: ['投保人', '被保险人', '其他 '],
      queryrules: {
        // insurerCode: [
        //   { required: true, message: '请输入保险公司代码', trigger: 'blur' }
        // ]
      }
    }
  },
  mounted () {
  },
  methods: {
    handleSubmit () {
      // 续期保单的回录时间必须大于等于承保日期1年
      // this.$refs['queryForm'].validate((valid) => {
      //   if (valid) {
      this.submitRecord(this.info)
      //   } else {
      //     console.log('error submit!!')
      //     return false
      //   }
      // })
    },
    ...mapActions([
    ]),
    handleDelete (index, row) {
      // 主险不可删除
      if (row.status === 1) {
        this.$message({
          showClose: true,
          message: '主险不能进行删除操作，附加险可以',
          type: 'error'
        })
      } else {
        this.deleteRecord(row)
      }
    },
    back () {
      this.$emit('getSubmitData')
    }
  },
  components: {
    [NoticeBar.name]: NoticeBar,
    [LineTittle.name]: LineTittle,
    [LabelText.name]: LabelText,
    [RiskImport.name]: RiskImport
  },
  created () {
  },
  computed: {
    // todo
    recordData () {
      return this.$store.state.renewal.recordData
    }
  }
}
</script>

<style lang="scss" scoped type="text/css">
#riskIndex {
  padding-left: 30px;
  padding-right: 30px;
}
.btn-container {
  text-align: center;
  margin-top: 60px;
  margin-bottom: 30px;
}
.ri-line {
  margin-top: 10px;
  margin-bottom: 10px;
}
.el-pagination {
  text-align: right;
  margin-top: 10px;
}
.upload-rate,
.download {
  text-align: center;
}
</style>

<style lang="scss" type="text/css">
.risk-dialog-wrapper .lt-label, .risk-dialog-wrapper .el-form-item {
  float: left;
  margin-bottom: 2px;
}
</style>
