<template>
  <div id="home_index">
    <ui-notice-bar slot="breadcast" >
      <el-breadcrumb slot="location" separator=">">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <!-- <el-breadcrumb-item>系统管理</el-breadcrumb-item> -->
          <el-breadcrumb-item>黑灰名单管理</el-breadcrumb-item>
          <el-breadcrumb-item>黑灰名单管理</el-breadcrumb-item>
        </el-breadcrumb>
    </ui-notice-bar>
    <el-form class="mesg_form" :rules="queryRules" ref="queryForm" :model="queryForm">
      <el-row>
        <el-col :span="12" >
          <el-form-item prop="blackListType">
            <ui-label-text  label="黑灰名单类型:" labelWidth="140">
              <el-select v-model="info.blackListType" slot="text" placeholder="请选择">
                <el-option label="黑名单" value="1"></el-option>
                <el-option label="灰名单" value="2"></el-option>
              </el-select>
            </ui-label-text>
          </el-form-item>
        </el-col>
        <el-col :span="12" >
          <el-form-item prop="name">
            <ui-label-text  label="姓名:" :required="true"  labelWidth="140">
              <el-input clearable v-model="queryForm.name" slot="text" ></el-input>
            </ui-label-text>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12" >
          <el-form-item  prop="identityType">
            <ui-label-text  label="证件类型:" labelWidth="140">
              <el-select v-model="info.identityType" slot="text" placeholder="请选择">
                <el-option label="身份证" value="1"></el-option>
                <el-option label="户口簿" value="2"></el-option>
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
        <el-col :span="12" >
          <ui-label-text  label="证件号码:" labelWidth="140">
            <el-input clearable v-model="info.identityNum" slot="text" ></el-input>
          </ui-label-text>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12" >
          <el-form-item  prop="status">
            <ui-label-text  label="状态:" labelWidth="140">
              <el-select  v-model="info.status" slot="text" placeholder="请选择">
                <el-option label="有效" value="1"> </el-option>
                <el-option label="无效" value="0"></el-option>
                <el-option label="全部" value="2"></el-option>
              </el-select>
            </ui-label-text>
          </el-form-item>
        </el-col>
        <el-col :span="12" >
          <el-form-item  prop="auditType">
            <ui-label-text  label="审核类型:" labelWidth="140">
              <el-select v-model="info.auditType" slot="text" placeholder="请选择">
                <el-option label="修改" value="1"> </el-option>
                <el-option label="撤销" value="2"></el-option>
              </el-select>
            </ui-label-text>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12" >
          <el-form-item  prop="auditStatus">
            <ui-label-text label="审核状态:"  labelWidth="140">
              <el-select v-model="info.auditStatus" slot="text" placeholder="请选择">
                <el-option label="待审核" value="1"> </el-option>
                <el-option label="审核通过" value="2"></el-option>
                <el-option label="审核不通过" value="3"></el-option>
              </el-select>
            </ui-label-text>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <div class="btn-container" slot="controlbar" labelWidth="20" :span="4">
      <el-button type="primary" @click.native.prevent="submitForm('queryForm')" :disabled="quanxian.query">查询</el-button>
      <el-button type="primary" @click="dialogTableVisibleAdd = true" :disabled="quanxian.add">新增</el-button>
      <el-button type="primary" @click="dialogTableVisibleImport = true" :disabled="quanxian.import">批量导入</el-button>
      <el-button type="primary" @click="modDialog()" :disabled="quanxian.modify">修改</el-button>
      <el-button type="primary" @click="revokeDialog()" :disabled="quanxian.re">撤销</el-button>
      <el-button type="primary" @click="checkDialog()" :disabled="quanxian.review">审核</el-button>
    </div>
    <el-table ref="multipleTable" stripe @selection-change="handleSelectionChange" :data="queryBlackList" tooltip-effect="dark" style="width: 100%" v-if='isShowTable' >
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column prop="blackListType" label="黑灰名单类型"  width="120"></el-table-column>
      <el-table-column prop="name" label="姓名" width="120"></el-table-column>
      <el-table-column prop="clientNo" label="客户代码" width="120">
        <template slot-scope="scope">
          <a href="javascript:void(0)" class="astyle"  @click="customerFindById(scope.row)">{{scope.row.clientNo}}</a>
        </template>
      </el-table-column>
      <el-table-column prop="identityType" label="证件类型" width="120"></el-table-column>
      <el-table-column prop="identityNum" label="证件号码"  width="180" show-overflow-tooltip></el-table-column>
      <el-table-column prop="verifyStatus" label="审核状态" show-overflow-tooltip></el-table-column>
      <el-table-column prop="channel" label="渠道" show-overflow-tooltip></el-table-column>
      <el-table-column prop="validatestatus" label="有效状态" show-overflow-tooltip></el-table-column>
      <el-table-column prop="proNum" label="拥有保单数" show-overflow-tooltip>
        <template slot-scope="scope">
          <a href="javascript:void(0)" class="astyle"  @click="queryLsById(scope.row)">{{scope.row.proNum}}</a>
        </template>
      </el-table-column>
      <el-table-column prop="reason" label="审核原因" show-overflow-tooltip></el-table-column>
      <el-table-column prop="verifyType" label="审核类型" show-overflow-tooltip></el-table-column>
      <el-table-column label="操作" show-overflow-tooltip>
        <template slot-scope="scope">
          <el-button type="primary" v-if="scope.row.verifyStatus === '待审核' && scope.row.verifyType === '修改' " size='mini' @click.prevent="detail(scope.row)">查看</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="block" v-if='isShowTable' >
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page.sync="info.currentPage"
        :page-sizes="sizeList"
        :page-size="100"
        layout="total, sizes, prev, pager, next, jumper"
        :total="totalElements == totalElements ? totalElements : 0"></el-pagination>
    </div>
    <!-- 黑灰名单查看详情 -->
    <el-dialog :append-to-body="true" center width="80%" title="黑灰名单详情" :visible.sync="isDetail">
      <el-form class='mesg_form' :model="detailForm">
      <el-row>
        <el-col :span="12">
          <el-form-item  prop="blackListType">
            <ui-label-text  label="黑灰名单类型:" labelWidth="140">
              <el-select disabled v-model="detailForm.blackListType" slot="text" placeholder="请选择">
                <el-option label="黑名单" value="1"></el-option>
                <el-option label="灰名单" value="2"></el-option>
              </el-select>
            </ui-label-text>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item  prop="name">
            <ui-label-text  label="姓名:" :required="true" labelWidth="140">
              <el-input disabled v-model="detailForm.name" slot="text" ></el-input>
            </ui-label-text>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item  prop="identityType">
            <ui-label-text  label="证件类型:" labelWidth="140">
              <el-select disabled v-model="detailForm.identityType" slot="text" placeholder="请选择">
                <el-option label="身份证" value="1"></el-option>
                <el-option label="户口簿" value="2"></el-option>
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
          <el-form-item  prop="identityNum">
            <ui-label-text  label="证件号码:" labelWidth="140">
              <el-input disabled v-model="detailForm.identityNum" slot="text" ></el-input>
            </ui-label-text>
          </el-form-item>
        </el-col>
      </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item  prop="channel">
              <ui-label-text  label="渠道:" labelWidth="140">
                <el-select disabled v-model="detailForm.channel" slot="text" placeholder="请选择">
                  <el-option label="寿险" value="寿险"></el-option>
                  <el-option label="财险" value="财险"></el-option>
                </el-select>
              </ui-label-text>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item  prop="certificatesValidateDate" >
              <ui-label-text  label="证件有效期:"  labelWidth="140">
                <el-date-picker disabled slot="text" ref="timepiker" v-model="detailForm.certificatesValidateDate" style='width: 55%;' type="date" placeholder="选择日期"></el-date-picker>
              </ui-label-text>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-checkbox ref="timer" disabled  v-model="detailForm.longFlag" label='false' >永久有效</el-checkbox>
          </el-col>
        </el-row>
        </el-form>
    </el-dialog>

      <!--新增 的弹框-->
    <el-dialog :append-to-body="true" center width="80%" :before-close="addClose" title="黑灰名单新增" :visible.sync="dialogTableVisibleAdd">
      <el-form class='mesg_form' :rules="addRules" ref="addForm" :model="addForm">
      <el-row>
        <el-col :span="12">
          <el-form-item  prop="blackListType">
            <ui-label-text  label="黑灰名单类型:" :required="true" labelWidth="140">
              <el-select v-model="addForm.blackListType" slot="text" placeholder="请选择">
                <el-option label="黑名单" value="1"></el-option>
                <el-option label="灰名单" value="2"></el-option>
              </el-select>
            </ui-label-text>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item  prop="name">
            <ui-label-text  label="姓名:" :required="true" labelWidth="140">
              <el-input clearable v-model="addForm.name" slot="text" ></el-input>
            </ui-label-text>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item  prop="identityType">
            <ui-label-text  label="证件类型:" :required="true" labelWidth="140">
              <el-select v-model="addForm.identityType" @change="cIdentifyNumber" slot="text" placeholder="请选择">
                <el-option label="身份证" value="1"></el-option>
                <el-option label="户口簿" value="2"></el-option>
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
          <div v-if="addForm.identityType === '1' || addForm.identityType === '2'" >
            <el-form-item  prop="identityNum">
              <ui-label-text  label="证件号码:" :required="true" labelWidth="140">
                <el-input clearable v-model="addForm.identityNum" slot="text" ></el-input>
              </ui-label-text>
            </el-form-item>
          </div>
          <div v-else >
            <el-form-item  prop="identityNum">
              <ui-label-text  label="证件号码:" :required="true" labelWidth="140">
                <el-input clearable v-model="addForm.identityNum" slot="text" ></el-input>
              </ui-label-text>
            </el-form-item>
          </div>
        </el-col>
      </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item  prop="channel">
              <ui-label-text  label="渠道:" :required="true" labelWidth="140">
                <el-select v-model="addForm.channel" slot="text" placeholder="请选择">
                  <el-option label="寿险" value="寿险"></el-option>
                  <el-option label="财险" value="财险"></el-option>
                </el-select>
              </ui-label-text>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item  prop="certificatesValidateDate" >
              <ui-label-text  label="证件有效期:" :required="true" labelWidth="140">
                <el-date-picker
                  value-format="yyyy-MM-dd"
                  slot="text"
                  ref="timepiker"
                  :disabled="disabledEdit"
                  v-model="info.certificatesValidateDate"
                  style='width: 55%;'
                  type="date"
                  placeholder="选择日期"></el-date-picker>
              </ui-label-text>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-checkbox
              ref="timer"
              @click.native="handleValidClick()"
              v-model="longFlag1"
              label='false' >永久有效</el-checkbox>
          </el-col>
        </el-row>
        </el-form>
        <!-- <el-button type="primary" class="button_add keep" @click.native.prevent="add()">保存</el-button> -->
        <div class="center">
          <el-button type="primary" class="button_add keep" @click.native.prevent="_addForm('addForm')">保存</el-button>
        </div>
    </el-dialog>
      <!--修改 的弹框-->
    <el-dialog :append-to-body="true" center width="80%" :before-close="ModClose" title="黑灰名单修改" :visible.sync="dialogTableVisibleMod">
      <el-form :rules="modRules" ref="modForm" :model="modForm">
        <el-row class="ri-line">
          <el-col :span="12">
            <el-form-item  prop="blackListType" :required="false">
              <ui-label-text  label="黑灰名单类型:" :required="false" labelWidth="140">
                <el-select  v-model="modForm.blackListType" slot="text" placeholder="请选择">
                  <el-option
                    v-for="item in blackListTypes"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>

                </el-select>
              </ui-label-text>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item  prop="name">
              <ui-label-text  label="姓名:"  readonly labelWidth="140">
                <el-input clearable v-model="modForm.name" readonly slot="text" ></el-input>
              </ui-label-text>
            </el-form-item>
          </el-col>
        </el-row>
          <el-row class="ri-line">
          <el-col :span="12">
            <el-form-item  prop="identityType" >
              <ui-label-text  label="证件类型:"  readonly labelWidth="140">
                  <el-input clearable v-model="modForm.identityType" readonly slot="text" ></el-input>
                </ui-label-text>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item  prop="identityNum">
              <ui-label-text  label="证件号码:"  labelWidth="140">
                <el-input clearable v-model="modForm.identityNum" readonly slot="text" ></el-input>
              </ui-label-text>
            </el-form-item>
          </el-col>
      </el-row>
        <el-row class="ri-line">
          <el-col :span="12">
            <el-form-item  prop="channel" :required="false">
              <ui-label-text  label="渠道:" :required="false" labelWidth="140">
                <el-select v-model="modForm.channel" slot="text" placeholder="请选择">
                    <el-option
                      v-for="item in channelType"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                  </el-select>
              </ui-label-text>
            </el-form-item>
          </el-col>
            <el-col :span="12">
              <el-form-item  prop="certificatesValidateDate" :required="false">
                <ui-label-text  label="证件有效期:" :required="true" labelWidth="140">
                <el-date-picker
                  value-format="yyyy-MM-dd"
                  format="yyyy-MM-dd"
                  slot="text"
                  ref="timepiker"
                  :disabled="disabledEdit1"
                  v-model="modForm.certificatesValidateDate"
                  style='width: 35%;'
                  :clearable = 'false'
                  type="date"
                  placeholder="选择日期"></el-date-picker>
                  <!-- v-model="longFlag3" -->
                <el-checkbox
                  ref="timer"
                  @change.native="handleValidClickmod()"
                  v-model="modForm.longFlag"
                  slot="text"
                  label='false' >永久有效</el-checkbox>
              </ui-label-text>
              </el-form-item>
            </el-col>
        </el-row>
        <el-row class="ri-line">
          <el-col :span="12">
            <el-form-item  prop="reason" >
              <ui-label-text  label="修改原因:" :required="true" labelWidth="140">
                <el-input v-model="modForm.reason" slot="text" ></el-input>
              </ui-label-text>
            </el-form-item>
          </el-col>
        </el-row>
        </el-form>
        <div class="center">
          <el-button type="primary" class="button_add" @click.native.prevent="_modForm('modForm')">提交审核</el-button>
        </div>
    </el-dialog>
    <!--审核 的弹框-->
    <el-dialog :append-to-body="true" center width="60%" :before-close="examineClose" title="黑灰名单审核" :visible.sync="ialogTableVisibleExamine">
        <el-form :model="modForm">
        <el-form-item label="审核结果:">
          <el-radio v-model="modForm.auditStatus" label="2">审核通过</el-radio>
          <el-radio v-model="modForm.auditStatus" label="3">审核不通过</el-radio>
        </el-form-item>
        <el-form-item label="审核意见:">
          <el-input type="textarea"  :rows='5' style="width: 85%; "  v-model="modForm.remarks" ></el-input>
        </el-form-item>
      </el-form>
        <div class="center">
          <el-button class="button_add"  @click.native.prevent="back()">返回</el-button>
          <el-button class="button_add" type="primary" @click.native.prevent="examine()">提交审核</el-button>
        </div>
    </el-dialog>
    <!--撤销 的弹框-->
    <el-dialog :append-to-body="true" center width="60%" :before-close="revokeClose" title="黑灰名单撤销" :visible.sync="dialogTableVisibleRevoke">
      <el-row class="ri-line">
        <el-col :span="24">
          <ui-label-text  label="撤销原因:"  :required="true">
            <el-input type="textarea" class="revokereason" :rows='2'  v-model="info.reason"  slot="text" ></el-input>
          </ui-label-text>
        </el-col>
      </el-row>
      <div class="center">
        <el-button type="primary" class="button_add" @click.native.prevent="revoke()">提交审核</el-button>
      </div>
    </el-dialog>
    <!--黑灰名单导入 的弹框-->
    <el-dialog :append-to-body="true" center width="50%" title="黑灰名单批量导入" :visible.sync="dialogTableVisibleImport">
      <div class="rate-wrapper">
        <div class="download">
          <el-button type="primary">
            <a @click="downTem(info.temtype)" class="downstyle" href="javascript:void(0)" download>导入模板下载</a>
          </el-button>
        </div>
          <div class="ri-content" slot="content" >
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
          </div>
        <!-- <div class="center">
          <el-button  class="button_add" type="primary" @click.native.prevent="back()">返回</el-button>
        </div> -->

        </div>
    </el-dialog>
     <!-- 又一个查看详情 查看客户详情 -->
    <el-dialog :append-to-body="true" center width="80%" title="详情" :visible.sync="cusDetail">
     <el-form class='mesg_form' :model="custDetail">
      <el-row>
        <el-col :span="12">
          <el-form-item  prop="custId">
            <ui-label-text  label="客户编码:" labelWidth="140">
              <el-input disabled v-model="custDetail.custId" slot="text" ></el-input>
            </ui-label-text>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item  prop="custName">
            <ui-label-text  label="客户名称:"  labelWidth="140">
              <el-input disabled v-model="custDetail.custName" slot="text" ></el-input>
            </ui-label-text>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item  prop="custId">
            <ui-label-text  label="归属机构代码:" labelWidth="140">
              <el-input disabled v-model="custDetail.comCode" slot="text" ></el-input>
            </ui-label-text>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item  prop="paperworkType">
            <ui-label-text  label="证件类型:"  labelWidth="140">
              <el-select v-model="custDetail.paperworkType" disabled  slot="text" placeholder="请选择">
                <el-option label="身份证" value="1"></el-option>
                <el-option label="户口簿" value="2"></el-option>
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
          <el-form-item  prop="idNumber">
            <ui-label-text  label="证件号码:" labelWidth="140">
              <el-input clearable readonly v-model="custDetail.idNumber" slot="text" ></el-input>
            </ui-label-text>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item  prop="sex">
            <ui-label-text  label="性别:" labelWidth="140">
              <el-select v-model="custDetail.sex" disabled slot="text" placeholder="请选择">
                <el-option label="男" value="0"></el-option>
                <el-option label="女" value="1"></el-option>
              </el-select>
            </ui-label-text>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <ui-label-text  label="证件有效期:"  labelWidth="140">
            <el-input v-if="custDetail.longFlag === 0" slot="text" readonly v-model="custDetail.identifyValiddate" ></el-input>
            <el-input v-else slot="text" readonly placeholder="永久有效" ></el-input>
          </ui-label-text>
        </el-col>
        <el-col :span="12">
          <el-form-item  prop="birthDate">
            <ui-label-text  label="出生年月:"  labelWidth="140">
              <el-date-picker slot="text" :disabled="disabEdit" v-model="custDetail.birthDate" type="date" readonly></el-date-picker>
            </ui-label-text>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item  prop="familyName">
            <ui-label-text  label="民族:"  labelWidth="140">
              <el-input  slot="text" readonly v-model="custDetail.familyName" ></el-input>
            </ui-label-text>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item  prop="familyMembers">
            <ui-label-text  label="家庭成员:"  labelWidth="140">
              <el-input  slot="text" readonly v-model="custDetail.familyMembers" ></el-input>
            </ui-label-text>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item  prop="familyRelation">
            <ui-label-text  label="所属关系:"  labelWidth="140">
              <el-input  slot="text" readonly v-model="custDetail.familyRelation" ></el-input>
            </ui-label-text>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item  prop="maritalStatus">
            <ui-label-text  label="婚否:"  labelWidth="140">
              <el-select v-model="custDetail.maritalStatus" disabled slot="text" placeholder="请选择">
                <el-option label="已婚" value="1"></el-option>
                <el-option label="未婚" value="2"></el-option>
                <el-option label="不明" value="3"></el-option>
                <el-option label="离异" value="4"></el-option>
              </el-select>
            </ui-label-text>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item  prop="address">
            <ui-label-text  label="地址:"  labelWidth="140">
              <el-input  slot="text" readonly v-model="custDetail.address" ></el-input>
            </ui-label-text>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item  prop="zipCode">
            <ui-label-text  label="邮政编码:"  labelWidth="140">
              <el-input  slot="text" readonly v-model="custDetail.zipCode" ></el-input>
            </ui-label-text>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item  prop="education">
            <ui-label-text  label="学历:"  labelWidth="140">
              <el-select v-model="custDetail.education" disabled slot="text" placeholder="请选择">
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
        <el-col :span="12">
          <el-form-item  prop="job">
            <ui-label-text  label="职业:"  labelWidth="140">
              <el-input  slot="text" readonly v-model="custDetail.job" ></el-input>
            </ui-label-text>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item  prop="modelsCode">
            <ui-label-text  label="车型代码:"  labelWidth="140">
              <el-input  slot="text" readonly v-model="custDetail.modelsCode" ></el-input>
            </ui-label-text>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item  prop="carNumber">
            <ui-label-text  label="车牌号:"  labelWidth="140">
              <el-input  slot="text" readonly v-model="custDetail.carNumber" ></el-input>
            </ui-label-text>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item  prop="mobile">
            <ui-label-text  label="手机:"  labelWidth="140">
              <el-input  slot="text" readonly v-model="custDetail.mobile" ></el-input>
            </ui-label-text>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item  prop="phone">
            <ui-label-text  label="固定电话:"  labelWidth="140">
              <el-input  slot="text" readonly v-model="custDetail.phone" ></el-input>
            </ui-label-text>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item  prop="fax">
            <ui-label-text  label="传真:"  labelWidth="140">
              <el-input  slot="text" readonly v-model="custDetail.fax" ></el-input>
            </ui-label-text>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item  prop="email">
            <ui-label-text  label="E-mail:"  labelWidth="140">
              <el-input  slot="text" readonly v-model="custDetail.email" ></el-input>
            </ui-label-text>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item  prop="status">
            <ui-label-text  label="效力状态:"  labelWidth="140">
              <el-select v-model="custDetail.status" disabled slot="text" placeholder="请选择">
                <el-option label="无效" value="0"></el-option>
                <el-option label="有效" value="1"></el-option>
              </el-select>
            </ui-label-text>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item  prop="country">
            <ui-label-text  label="国籍:"  labelWidth="140">
              <el-input  slot="text" readonly v-model="custDetail.country" ></el-input>
            </ui-label-text>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item  prop="birthplace">
            <ui-label-text  label="籍贯:"  labelWidth="140">
              <el-input  slot="text" readonly v-model="custDetail.birthplace" ></el-input>
            </ui-label-text>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item  prop="weChat">
            <ui-label-text  label="微信号:"  labelWidth="140">
              <el-input  slot="text" readonly v-model="custDetail.weChat" ></el-input>
            </ui-label-text>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item  prop="workingUnit">
            <ui-label-text  label="工作单位:"  labelWidth="140">
              <el-input  slot="text" readonly v-model="custDetail.workingUnit" ></el-input>
            </ui-label-text>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item  prop="habitualResidence">
            <ui-label-text  label="经常居住地:"  labelWidth="140">
              <el-input  slot="text" readonly v-model="custDetail.habitualResidence" ></el-input>
            </ui-label-text>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item  prop="remark">
            <ui-label-text  label="备注:"  labelWidth="140">
              <el-input  slot="text" readonly v-model="custDetail.remark" ></el-input>
            </ui-label-text>
          </el-form-item>
        </el-col>
      </el-row>
     </el-form>
    </el-dialog>
    <!--保单数的弹框-->
    <el-dialog :append-to-body="true"  center width="80%" :before-close="BDSClose" title="拥有保单数" :visible.sync="idNumDialog">
      <el-table ref="multipleTable1" stripe :data="getInfo" tooltip-effect="dark" style="width: 100%"  >
        <el-table-column prop="blackListType" label="黑灰名单类型"  width="120"></el-table-column>
        <el-table-column prop="name" label="姓名" width="120"></el-table-column>
        <el-table-column prop="identityType" label="证件类型" width="120"></el-table-column>
        <el-table-column prop="identityNum" label="证件号码" width="170" show-overflow-tooltip></el-table-column>
        <el-table-column prop="companyCode" label="保险公司代码" show-overflow-tooltip></el-table-column>
        <el-table-column prop="companyName" label="保险公司名称" show-overflow-tooltip></el-table-column>
        <el-table-column prop="proDate" label="投保日期" show-overflow-tooltip></el-table-column>
        <el-table-column prop="proposalNo" label="投保单号" show-overflow-tooltip></el-table-column>
      </el-table>
      <div class="block" style="margin-top:22px; padding-bottom:22px">
        <el-pagination
          @current-change="handleCurrentChangeBDS"
          @size-change="handleSizeChangeBDS"
          :current-page.sync="infoNum.currentPage"
          :page-sizes="sizeList"
          :page-size="100"
          layout="total, sizes, prev, pager, next, jumper"
          :total="getInfosNum == getInfosNum ? getInfosNum : 0"></el-pagination>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import NoticeBar from '@/components/notice-bar'
import LineTittle from '@/components/line-tittle'
import LabelText from '@/components/label-text'
import { mapActions } from 'vuex'
import {
  api
} from '@/api/lifeInsur_mgr/quitListMgr.js'
export default {
  name: '',
  data () {
    const { nameValidator,
            IdValidator,
            bgtypeValidator,
            IDtypeValidator,
            noEmptyValidator,
            channelValidator } = this.$store.getters.validators
    return {
      quanxian: {
        query: true,
        add: true,
        import: true,
        modify: true,
        re: true,
        review: true
      },
      loading: '',
      IdValidator: IdValidator,
      noEmptyValidator: noEmptyValidator,
      detailForm: {}, // 查看详情
      isDetail: false,
      info: {
        // auditStatus: '1'
        longFlag: '0',
        certificatesValidateDate: '',
        auditStatus: '2',
        ids: ''
      },
      queryForm: {
        name: ''
      },
      queryRules: {
        name: nameValidator
      },
      addForm: {
        name: '',
        identityNum: ''
      },
      addRules: {
        name: nameValidator,
        identityNum: IdValidator,
        blackListType: bgtypeValidator,
        identityType: IDtypeValidator,
        channel: IDtypeValidator
      },
      modForm: {
        blackListType: '',
        name: '',
        identityNum: '',
        channel: '',
        identityType: '',
        certificatesValidateDate: '',
        ids: '',
        reason: ''
      },
      modRules: {
        name: nameValidator,
        identityNum: noEmptyValidator,
        blackListType: bgtypeValidator,
        identityType: IDtypeValidator,
        channel: channelValidator,
        reason: [
          { required: true, message: '请输入修改原因', trigger: 'blur' }
        ]
      },
      queryBlackList: [],  // 查询出来的数据
      totalElements: 0,    // 查询出来的条数
      result: '',
      fileList: [],
      multipleSelection: [],
      disabledEdit: false,
      disabledEdit1: false,
      disabEdit: true,
      value: '',
      blackListVos: [],
      idsArray: [],
      ids: '',
      longFlag1: false,
      longFlag3: false,
      dialogTableVisibleInfo: false,
      dialogTableVisibleAdd: false,
      dialogTableVisibleMod: false,
      dialogTableVisibleRevoke: false,
      ialogTableVisibleExamine: false,
      ialogTableVisibleQuery: false,
      dialogTableVisibleImport: false,
      cusDetail: false,
      isShowTable: false,
      channelType: [{
        label: '财险',
        value: '财险'
      }, {
        label: '寿险',
        value: '寿险'
      }],
      blackListTypes: [{
        label: '黑名单',
        value: '黑名单'
      }, {
        label: '灰名单',
        value: '灰名单'
      }],
      infoId: {},
      infoNum: {},
      idNumDialog: false,
      sizeList: [5, 10, 20, 50],
      getInfo: [],
      getInfosNum: 0
    }
  },
  mounted () {
    // this.info.auditStatus = '2'
    api(`/auth/findButtonByUserCodeAndPage?userId=${this.$store.state.login.loginUserId}&page=黑灰名单管理`, 'get').then(result => {
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
  },
  methods: {
    ...mapActions([
      'queryBlackList_1',
      'addblackList_1',
      'modblackList_1',
      'revokeblackList_1',
      'examineBlackList_black',
      'queryLsById_1',
      'queryDetail_1',
      'checkAdd',
      'customerFindById_1'
    ]),
    handleSizeChange (val) {
      this.info.pageSize = val
      this.query(1)
    },
    handleCurrentChange (val) {
      console.log(`当前页: ${val}`)
      this.query(val)
    },
    handleSelectionChange (val) { // table勾选
      console.log(typeof (val))
      if (val.length > 0) {
        this.multipleSelection = JSON.parse(JSON.stringify(val))
        this.modForm = this.multipleSelection[0]
        this.modForm.oldChannel = this.modForm.channel
      } else {
        this.multipleSelection = []
        this.modForm = {}
      }
    },
    handleValidClick () {
      if (this.longFlag1 === false) {
        // false的话  时间不能填 longFlag == 1 永久有效
        this.info.longFlag = '1'
        console.log(this.info.longFlag)
        console.log(this.info.certificatesValidateDate)
        this.info.certificatesValidateDate = ''
        this.disabledEdit = true
      } else {
        // true的话  时间可以填 longFlag == 0 有效期
        this.info.longFlag = '0'
        this.disabledEdit = false
        console.log(this.info.longFlag)
      }
    },
     // 修改弹框是否弹出  也就是点击修改按钮
    modDialog () {
      if (this.multipleSelection.length === 1) {
        if (this.multipleSelection[0].verifyStatus === '审核通过' || this.multipleSelection[0].verifyStatus === '审核不通过') {
          this.dialogTableVisibleMod = true
          // alert(JSON.stringify(this.modForm))
          // alert(JSON.stringify(this.modForm.longFlag))
          if (this.modForm.longFlag === '1' || this.modForm.longFlag === 1) {
            this.modForm.longFlag = true   // 永久有效
            this.disabledEdit1 = true      // 有效期置灰
          } else if (this.modForm.longFlag === '0' || this.modForm.longFlag === 0) {
            this.modForm.longFlag = false  // 不永久有效
            this.disabledEdit1 = false     // 有效期不置灰
          }
        } else {
          this.open('warning', '仅可对审核通过、审核不通过的记录进行修改')
        }
      } else if (this.multipleSelection.length > 1) {
        this.open('warning', '仅可选一条记录进行修改操作！')
      } else {
        this.open('warning', '请先选择数据记录!')
      }
    },
    handleValidClickmod () {  // 修改的点击证件有效期
      // alert(JSON.stringify(this.modForm))
      // alert(JSON.stringify(this.modForm.longFlag))

      if (this.modForm.longFlag === false) {
        // false 时间不能填 longFlag == 1 永久有效
        // true  时间可以填 longFlag == 0 有效期
        this.modForm.longFlag = false
        console.log('longFlag:' + this.modForm.longFlag)
        this.disabledEdit1 = false
        console.log('disabledEdit1:' + this.disabledEdit1)
        // this.longFlag3 = false
        this.modForm.certificatesValidateDate = ''
      } else if (this.modForm.longFlag === true) {
        console.log(this.modForm.longFlag)
        console.log(this.modForm.certificatesValidateDate)
        this.modForm.certificatesValidateDate = ''
        this.disabledEdit1 = true
        console.log('disabledEdit1:' + this.disabledEdit1)
        this.modForm.longFlag = true
        console.log('longFlag:' + this.modForm.longFlag)
      }
    },
    // 修改弹框的缺定按钮
    mod () {
      if (this.multipleSelection.length > 0) {
        // this.dialogTableVisibleMod = false
        this.$refs.multipleTable.clearSelection()
        // this.modblackList_1(this.info)

        this.modblackList_1(this.modForm).then(resp => {
          if (resp.code === '000000') {
            this.dialogTableVisibleMod = false
            this.$refs.multipleTable.clearSelection()
            this.modForm.reason = '修改'
            this.open('success', resp.msg)
            this.info.name = ''
            this.query(1)
          } else {
            this.open('error', resp.msg)
          }
        })

        this.queryForm.name = ''
        this.info = {}
        // this.queryBlackList_1(this.info)
      }
    },
    revoke () {
      this.multipleSelection.forEach(ele => {
        this.blackListVos.push(ele)
      })
      this.info.blackListVos = this.blackListVos
      if (this.info.reason === '' || this.info.reason === null || this.info.reason === undefined) {
        this.open('warning', '请输入撤销原因！')
        return false
      }
      // this.info.reason = '撤销'
      this.revokeblackList_1(this.info).then(resp => {
        if (resp.code === '000000') {
          this.open('success', '撤销成功！')
          this.info.reason = ''
          this.info.blackListVos = []

          this.info.currentPage = 1
          this.info.name = this.queryForm.name
          this.info.auditStatus = '1'
          this.queryBlackList_1(this.info).then(resp => {
            if (resp.code === '000000') {
              this.isShowTable = true
              this.queryBlackList = resp.data.content
              this.totalElements = resp.data.totalElements
            } else {
              this.open('error', resp.msg)
            }
          })
          this.info.blackListVos = []
          this.blackListVos = []
        } else {
          this.open('error', resp.msg)
          this.info.reason = ''
          this.info.blackListVos = []
          this.blackListVos = []
        }
        this.info.blackListVos = []
      })
      this.dialogTableVisibleRevoke = false
      this.$refs.multipleTable.clearSelection()
      // this.info.blackListVos = []
    },
    examine () {
      // alert(JSON.stringify(this.modForm.auditStatus))
      this.info = this.modForm
      this.multipleSelection[0].auditStatus = this.info.auditStatus
      this.multipleSelection[0].remarks = this.info.remarks
      this.multipleSelection[0].auditType = this.info.auditType
      this.multipleSelection[0].verifyType = this.info.verifyType
      // this.info.ids = ''
      this.multipleSelection.forEach(ele => {
        this.idsArray.push(ele.ids)
      })
      this.ids = this.idsArray.toString()
      console.log(JSON.stringify(this.ids))
      this.info.ids = this.ids
      this.info.auditType = this.info.verifyType
      this.info.verifyStatus = this.modForm.auditStatus
      console.log(JSON.stringify(this.ids))
      console.log(JSON.stringify(this.info.ids))
      console.log(JSON.stringify(this.info)) // 整体的审核 data
      console.log(JSON.stringify(this.info.auditStatus))
      if (this.info.auditStatus === null || this.info.auditStatus === '' || this.info.auditStatus === undefined) {
        this.open('warning', '请先选择审核状态！')
        return false
      }
      if (this.info.remarks === null || this.info.remarks === '' || this.info.remarks === undefined) {
        this.open('warning', '请先填写审核意见！')
        return false
      }
      this.examineBlackList_black(this.info).then(resp => {
        if (resp.code === '000000') {
          console.log(JSON.stringify(resp))
          this.ialogTableVisibleExamine = false
          this.$refs.multipleTable.clearSelection()
          this.modForm.remarks = ''

          // this.queryForm.name = ''
          // this.$refs['queryForm'].resetFields() // 清空校验
          this.info.ids = ''

          this.info = {}
          this.info.remarks = ''
          this.open('success', resp.msg)
          console.log('this.info:' + JSON.stringify(this.info))
          // this.query(1)
          this.info.currentPage = 1
          this.info.name = this.queryForm.name
          this.info.auditStatus = '2'
          this.queryBlackList_1(this.info).then(resp => {
            if (resp.code === '000000') {
              this.isShowTable = true
              this.queryBlackList = resp.data.content
              this.totalElements = resp.data.totalElements
            } else {
              this.open('error', resp.msg)
            }
          })
        } else {
          this.open('error', resp.msg)
          this.modForm.remarks = ''
          // this.queryForm.name = ''
          // this.$refs['queryForm'].resetFields() // 清空校验
          this.$refs.multipleTable.clearSelection()
          this.ialogTableVisibleExamine = false
        }
      })
      this.multipleSelection = []
      // this.info.ids = ''
      // this.ids = ''
      this.idsArray = []
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
      this.Loading()
      this.info.currentPage = page
      this.info.name = this.queryForm.name
      this.queryBlackList_1(this.info).then(resp => {
        this.closeLoading()
        if (resp.code === '000000') {
          this.isShowTable = true
          // console.log(JSON.stringify(resp))
          this.queryBlackList = resp.data.content
          this.totalElements = resp.data.totalElements
        } else {
          this.open('error', resp.msg)
        }
      })
    },
    // 查询接口
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.query(1)
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    cIdentifyNumber (val) {
      this.addForm.identityNum = ''
      if (val === '1' || val === '2') {
        this.addRules['identityNum'] = this.IdValidator
      } else {
        this.addRules['identityNum'] = this.noEmptyValidator
      }
      // this.$refs['addForm'].resetFields() // 清空校验
    },
    addClose () {  // 新增的关闭弹框
      this.addForm.blackListType = ''
      this.addForm.name = ''
      this.addForm.identityType = ''
      this.addForm.identityNum = ''
      this.addForm.channel = ''
      this.info.certificatesValidateDate = ''
      this.longFlag1 = false
      this.disabledEdit = false  // 证件有效期

      this.info.blackListType = ''
      this.info.name = ''
      this.info.identityType = ''
      this.info.identityNum = ''
      this.info.status = ''
      this.info.auditType = ''
      this.info.certificatesValidateDate = ''
      this.$refs['addForm'].resetFields() // 清空校验
      this.dialogTableVisibleAdd = false // 关闭弹框
    },
    ModClose () {  // 修改的关闭弹框
      this.modForm.reason = ''
      this.$refs['modForm'].resetFields() // 清空校验
      this.dialogTableVisibleMod = false
    },
    revokeClose () {  // 撤销的关闭弹框
      this.dialogTableVisibleRevoke = false
      this.info.reason = ''
    },
    examineClose () {
      this.ialogTableVisibleExamine = false
      this.modForm.remarks = ''
      this.$refs['modForm'].resetFields() // 清空校验
    },
    // 增加的提交表单
    _addForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // 验证通过 提交表单
          this.info.blackListType = this.addForm.blackListType
          this.info.name = this.addForm.name
          this.info.identityType = this.addForm.identityType
          this.info.identityNum = this.addForm.identityNum
          this.info.channel = this.addForm.channel
          console.log(JSON.stringify(this.info))
          if (this.info.longFlag === '0' && this.info.certificatesValidateDate === '') {
            this.open('warning', '请选择日期！')
            return
          }
          this.checkAdd({'name': this.info.name, 'blackListType': this.info.blackListType, 'longFlag': this.info.longFlag, 'certificatesValidateDate': this.info.certificatesValidateDate, 'channel': this.info.channel, 'identityType': this.info.identityType, 'identityNum': this.info.identityNum}).then(resp => {
          // this.checkAdd(this.info).then(resp => {
            if (resp.code === '000000') {
              this.addblackList_1(this.info).then(resp => {
                if (resp.code === '000000') {
                  this.dialogTableVisibleAdd = false
                  // this.addForm = {}
                  this.$refs['addForm'].resetFields() // 清空校验
                  this.open('success', resp.msg)
                  this.info.blackListType = ''
                  this.info.name = ''
                  this.info.identityType = ''
                  this.info.identityNum = ''
                  this.info.status = ''
                  this.info.auditType = ''
                  this.info.certificatesValidateDate = ''
                  this.info.longFlag = '0'
                  this.detailForm.longFlag = false
                  this.longFlag1 = false
                  this.disabledEdit = false

                  this.addForm.blackListType = ''
                  this.addForm.addForm.name = ''
                  this.addForm.identityType = ''
                  this.addForm.identityNum = ''
                  this.addForm.channel = ''
                } else {
                  this.dialogTableVisibleAdd = false
                  this.open('error', resp.msg)
                  // this.addForm = {}
                  this.$refs['addForm'].resetFields() // 清空校验
                  this.info.blackListType = ''
                  this.info.name = ''
                  this.info.identityType = ''
                  this.info.identityNum = ''
                  this.info.status = ''
                  this.info.auditType = ''
                  this.info.certificatesValidateDate = ''
                  this.info.longFlag = '0'
                  this.detailForm.longFlag = false
                  this.longFlag1 = false
                  this.disabledEdit = false

                  this.addForm.blackListType = ''
                  this.addForm.addForm.name = ''
                  this.addForm.identityType = ''
                  this.addForm.identityNum = ''
                  this.addForm.channel = ''
                }
              })
            } else {
              this.open('error', resp.msg)
            }
          })

          // this.info.blackListType = ''
          // this.info.name = ''
          // this.info.identityType = ''
          // this.info.identityNum = ''
          // this.info.status = ''
          // this.info.auditType = ''
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    // 修改的提交表单
    _modForm (formNamemod) {
      this.$refs[formNamemod].validate((valid) => {
        if (valid) {
          if (this.multipleSelection.length > 0) {
            if (this.modForm.longFlag === true) {
              this.modForm.longFlag = '1'
            } else if (this.modForm.longFlag === false) {
              this.modForm.longFlag = '0'
            }
            console.log(JSON.stringify(this.modForm))
            if (this.modForm.certificatesValidateDate === '' && this.modForm.longFlag === '0') {
              this.open('warning', '请选择证件有效期!')
              return false
            }
            console.log('提交前的校验:' + JSON.stringify(this.modForm))
            this.modblackList_1(this.modForm).then(resp => {
              if (resp.code === '000000') {
                this.dialogTableVisibleMod = false
                this.$refs.multipleTable.clearSelection()
                this.modForm.reason = '修改'
                this.open('success', resp.msg)
                // this.info.name = ''
                // this.queryForm.name = ''
                // this.$refs['queryForm'].resetFields() // 清空校验
                // this.query(1)
                this.info.currentPage = 1
                this.info.name = this.queryForm.name
                this.info.auditStatus = '1'
                this.queryBlackList_1(this.info).then(resp => {
                  if (resp.code === '000000') {
                    this.isShowTable = true
                    this.queryBlackList = resp.data.content
                    this.totalElements = resp.data.totalElements
                  } else {
                    this.open('error', resp.msg)
                  }
                })
              } else {
                this.open('error', resp.msg)
              }
            })
          }
        } else {
          return false
        }
      })
    },
    queryLsById (row) {
      this.infoNum.ids = row.ids
      this.infoNum.currentPage = 1
      this.infoNum.pageSize = '5'
      this.sizeList = [5, 10, 20, 50]
      console.log('info的查询:' + JSON.stringify(this.infoNum))
      // 调用黑灰名单投保单信息查询
      this.queryLsById_1(this.infoNum).then(result => {
        console.log(JSON.stringify(result.data))
        if (result.code === '000000') {
          this.idNumDialog = true
          this.getInfo = result.data.content
          this.getInfosNum = result.data.totalElements
        } else {
          this.open('error', result.msg)
        }
      })
    },
    handleCurrentChangeBDS (val) {  // 跳转到的当前页 1 2 3 4 5
      this.infoNum.currentPage = val
      this.queryLsById_1(this.infoNum).then(result => {
        // console.log(JSON.stringify(result.data))
        if (result.code === '000000') {
          // alert(2)
          // this.idNumDialog = true
          this.getInfo = result.data.content
          this.getInfosNum = result.data.totalElements
        } else {
          this.open('error', result.msg)
        }
      })
    },
    handleSizeChangeBDS (val) {  // 每页的条数改变  5 10 20 50
      console.log(`每页 ${val} 条`)
      this.infoNum.pageSize = val
      this.infoNum.currentPage = 1
      // this.info.currentPage = 1
      console.log(this.infoNum)
      this.queryLsById_1(this.infoNum).then(result => {
        if (result.code === '000000') {
          // this.idNumDialog = true
          // alert(1)
          this.getInfo = result.data.content
          this.getInfosNum = result.data.totalElements
        } else {
          this.open('error', result.msg)
        }
      })
    },
    BDSClose () { // 关闭拥有保单数的弹框
      // this.sizeList = []
      this.idNumDialog = false
      this.getInfo = []
      this.getInfosNum = 0
    },
    customerFindById (row) {
      this.infoId.custId = row.clientNo
      // alert(JSON.stringify(this.infoId))
      this.customerFindById_1(this.infoId)
      this.cusDetail = true
    },
    // 返回
    back () {
      this.dialogTableVisibleCheck = false
      this.dialogTableVisibleImport = false
      this.ialogTableVisibleExamine = false
    },
    open (type, mesg) { // 提示
      this.$message({
        showClose: true,
        message: mesg,
        type: type
      })
    },

    // 撤销弹框是否弹出
    revokeDialog () {
      if (this.multipleSelection.length > 0) {
        if (this.multipleSelection[0].verifyStatus === '审核通过' || this.multipleSelection[0].verifyStatus === '审核不通过') {
          this.dialogTableVisibleRevoke = true
          // this.revoke()
        } else {
          this.open('warning', '仅可对审核通过、审核不通过的记录进行撤销')
        }
      } else {
        this.open('warning', '请先选择数据记录!')
      }
    },
    // 审核弹框是否弹出
    checkDialog () {
      if (this.multipleSelection.length > 0) {
        if (this.multipleSelection[0].verifyStatus === '待审核') {
          this.ialogTableVisibleExamine = true
        } else {
          this.open('warning', '仅可对待审核的记录进行审核')
        }
      } else {
        this.open('warning', '请先选择数据记录!')
      }
    },

    downTem () {
      window.open('/tabycore/blackList/downloadModel')
    },
    uploadUrl () {
      // return '/tabycore/blackList/blackListImport'
      return '/tabycore/blackList/blackListImport'
    },
    handleEXLSuccess (response, file, fileList) {
      // this.$message({
      //   message: '上传成功',
      //   type: 'success'
      // })
      if (response.code === '000000') {
        this.$message({
          message: response.msg,
          type: 'success'
        })
      } else {
        this.$message({
          message: response.msg,
          type: 'error'
        })
      }
    },
    detail (row) { // 查看详情
      this.queryDetail_1({'identityType': row.identityType, 'identityNum': row.identityNum}).then(resp => {
        if (resp.code === '000000') {
          this.isDetail = true
          this.detailForm = resp.data
          if (this.detailForm.longFlag === '1') {
            this.detailForm.longFlag = true
          } else if (this.detailForm.longFlag === '0') {
            this.detailForm.longFlag = false
          }
        }
      })
    },
    closeDailog () {
      return new Promise((resolve, reject) => {
        this.show_dialog = false
        resolve()
      })
    }
  },
  components: {
    [NoticeBar.name]: NoticeBar,
    [LineTittle.name]: LineTittle,
    [LabelText.name]: LabelText
  },
  created () {
  },
  computed: {
    // queryBlackList () {
    //   return this.$store.state.BlackList.queryBlackList
    // },
    // getInfo () {
    //   return this.$store.state.BlackList.getInfos
    // },
    // getInfosNum () {
    //   return parseInt(this.$store.state.BlackList.getInfosNum)
    // },
    // totalElements () {
    //   return parseInt(this.$store.state.BlackList.totalElements)
    // },
    custDetail () {
      return this.$store.state.BlackList.custDetail
    }
  }
}
</script>

<style lang="scss" scoped type="text/css">
#home_index{padding: 0px 30px 30px 30px;}
.el-form {margin: 20px 0 ;}
.btn-container{ text-align: center; margin-bottom: 30px; }
.ri-line{margin-top: 10px;margin-bottom: 10px;}
.datestyle{color: #717171;font-size: 0.875rem;display: inline-block;width: auto;}
.el-pagination{float: right;padding-right: 50px;}
.rate-wrapper {width: 300px;margin: 100px auto;}
.keep{margin:0 auto}
.martop{margin-top: 30px}
.center{text-align: center}
.dialog__title{text-align: center}
.revokereason{
  width: 300px !important
}
</style>
<style>
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
  .el-input__icon { height: initial; line-height: inherit; }
  .upload-rate{
    text-align: center
  }
  .download{text-align: center;margin-bottom: 20px}
  .downstyle{
    text-decoration:none;
    color:#ffffff;
  }
  .el-form-item__error{
    margin-left: 140px !important
  }
</style>

