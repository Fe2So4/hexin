<template>
  <div id="orgadd" >
    <ui-notice-bar slot="breadcast" >
      <el-breadcrumb slot="location" separator=">">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>公司管理</el-breadcrumb-item>
          <el-breadcrumb-item>移动端业务员入职审核</el-breadcrumb-item>
        </el-breadcrumb>
    </ui-notice-bar>
    <div slot="content">
      <el-row class="ri-line">
        <el-col :span="12">
          <ui-label-text labelWidth="210" label="省级分公司代码:">
            <el-input v-model="queryInfo.insurecode" clearable slot="text" @dblclick.native="openComDialog(1)" placeholder="双击可选择" @blur='opensingleComDialog(1)' @change="clearDiji"></el-input>
          </ui-label-text>
        </el-col>
        <el-col :span="12">
          <ui-label-text labelWidth="210" label="省级分公司名称:" >
            <el-input v-model="queryInfo.insurename" clearable slot="text" @dblclick.native="openComDialog(1)" placeholder="双击可选择" @blur='opensingleComDialog(1)' @change="clearDiji"></el-input>
          </ui-label-text>
        </el-col>
      </el-row>
      <el-row class="ri-line">
        <el-col :span="12">
          <ui-label-text labelWidth="210" label="地市级分公司代码:">
            <el-input v-model="queryInfo.insurecomcode" clearable slot="text" @dblclick.native="openComDialog(2)" placeholder="双击可选择" @blur='opensingleComDialog(2)'></el-input>
          </ui-label-text>
        </el-col>
        <el-col :span="12">
          <ui-label-text labelWidth="210" label="地市级分公司名称:" >
            <el-input v-model="queryInfo.insurecomname" clearable slot="text" @dblclick.native="openComDialog(2)" placeholder="双击可选择" @blur='opensingleComDialog(2)'></el-input>
          </ui-label-text>
        </el-col>
      </el-row>
      <el-row class="ri-line">
        <el-col :span="12">
          <ui-label-text labelWidth="210" label="业务员代码:">
            <el-input v-model="queryInfo.agentcode" clearable slot="text" @dblclick.native="openComDialog(3)" placeholder="双击可选择" @blur='opensingleComDialog(3)'></el-input>
          </ui-label-text>
        </el-col>
        <el-col :span="12">
          <ui-label-text labelWidth="210" label="业务员姓名:" >
            <el-input v-model="queryInfo.agentname" clearable slot="text" @dblclick.native="openComDialog(3)" placeholder="双击可选择" @blur='opensingleComDialog(3)'></el-input>
          </ui-label-text>
        </el-col>
      </el-row>
      <el-row class="ri-line">
        <el-col :span="12">
          <ui-label-text labelWidth="210" label="业务员渠道:">
            <el-select v-model="queryInfo.channel" slot="text" placeholder="请选择" @change="changeQueryInfoChannel">
              <el-option label="线下代理人" value="4"></el-option>
              <el-option label="同道人员" value="2"></el-option>
            </el-select>
          </ui-label-text>
        </el-col>
        <el-col :span="12">
          <ui-label-text labelWidth="210" label="业务员职级:" >
            <el-select v-model="queryInfo.rank" slot="text" placeholder="请选择" v-if="queryRankVis" @change="changeQueryInfoRank">
              <el-option v-for="option in queryRankOptions" :label="option.name" :value="option.id" :key="option.index"></el-option>
            </el-select>
          </ui-label-text>
        </el-col>
      </el-row>
      <el-row class="ri-line">
        <el-col :span="12">
          <ui-label-text labelWidth="210" label="业务员类型:">
            <!-- <el-input v-model="queryInfo.type" clearable slot="text"></el-input> -->
            <el-select v-model="queryInfo.type" slot="text" placeholder="请选择">
              <el-option label="代理制" value="3"></el-option>
              <el-option label="代理制-昆仑" value="6"></el-option>
            </el-select>
          </ui-label-text>
        </el-col>
        <el-col :span="12">
          <ui-label-text labelWidth="210" label="审核状态:" >
            <el-select v-model="queryInfo.verifystatus" slot="text" placeholder="请选择">
              <el-option label="审核通过" value="1"></el-option>
              <el-option label="审核不通过" value="2"></el-option>
              <el-option label="待审核" value="9"></el-option>
            </el-select>
          </ui-label-text>
        </el-col>
      </el-row>
      <el-row class="ri-line">
        <el-col :span="12">
          <ui-label-text labelWidth="210" label="是否上传已盖章合同:">
            <!-- <el-input v-model="queryInfo.type" clearable slot="text"></el-input> -->
            <el-select v-model="queryInfo.isupload" slot="text" placeholder="请选择">
              <el-option label="否" value="0"></el-option>
              <el-option label="是" value="1"></el-option>
            </el-select>
          </ui-label-text>
        </el-col>
      </el-row>
    </div>
    <div class="btn-container" slot="controlbar">
        <el-button type="primary" @click.native.prevent="submitForm">查询</el-button>
    </div>
    <div v-if="tableShowOrNot">
      <el-table :data="tableData" style="width: 100%">
        <el-table-column prop="agentcode" label="业务员代码"  width="180">
          <template slot-scope="scope" >
            <span @click="getDetailExamine(scope.row)" class="tableButton">{{ scope.row.agentcode }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="agentname" label="业务员姓名"  width="180" ></el-table-column>
        <el-table-column prop="insurecode" label="省级分公司代码"  width="180"></el-table-column>
        <el-table-column prop="insurename" label="省级分公司名称"  width="180" show-overflow-tooltip></el-table-column>
        <el-table-column prop="insurecomcode" label="地市级分公司代码" width="180" show-overflow-tooltip></el-table-column>
        <el-table-column prop="insurecomname" label="地市级分公司名称" width="180" show-overflow-tooltip></el-table-column>
        <el-table-column prop="channel" label="渠道" width="180">
          <template slot-scope="scope" >
            <span v-if="scope.row.channel === '2'">同道人员</span>
            <span v-else-if="scope.row.channel === '4'">线下代理人</span>
          </template>
        </el-table-column>
        <el-table-column prop="rank" label="职级" width="120">
          <template slot-scope="scope" >
            <span v-if="scope.row.rank === '5'">初级创业合伙人</span>
            <span v-else-if="scope.row.rank === '6'">中级创业合伙人</span>
            <span v-else-if="scope.row.rank === '7'">高级创业合伙人</span>
            <span v-else-if="scope.row.rank === '8'">资深创业合伙人</span>
            <span v-else-if="scope.row.rank === '9'">顶级创业合伙人</span>
            <span v-else-if="scope.row.rank === '3'">营销员</span>
            <span v-else-if="scope.row.rank === '2'">营业部经理</span>
            <span v-else-if="scope.row.rank === '1' && scope.row.channel === '4'">营业区总监</span>
            <span v-else-if="scope.row.rank === '1' && scope.row.channel === '2'">线上代理人</span>
          </template>
        </el-table-column>
        <el-table-column prop="identifynumber" label="证件号码" width="220"></el-table-column>
        <el-table-column prop="isupload" label="是否上传已盖章合同" width="120">
          <template slot-scope="scope" >
            <span v-if="scope.row.isupload === '0'">否</span>
            <span v-else-if="scope.row.isupload === '1'">是</span>
          </template>
        </el-table-column>
        <el-table-column prop="verifystatus" label="审核状态" width="120">
          <template slot-scope="scope" >
            <span v-if="scope.row.verifystatus === '1'">审核通过</span>
            <span v-else-if="scope.row.verifystatus === '2' || scope.row.verifystatus === 'd'">审核不通过</span>
            <span v-else>待审核</span>
          </template>
        </el-table-column>
        <el-table-column prop="history" label="审核历史" width="180">
          <template slot-scope="scope" >
            <span @click="openExamHis(scope.row)" class="tableButton">查看</span>
          </template>
        </el-table-column>
      </el-table>
      <div class="block">
        <el-pagination
          @current-change="handleCurrentChange"
          @size-change="handleSizeChange"
          :current-page="queryInfo.currentPage"
          :page-size ="queryInfo.pageSize"
          :page-sizes="[10,20,50]"
          :total="totalRecords"
          layout="total, sizes, prev, pager, next, jumper"
          >
        </el-pagination>
      </div>
    </div>
    <ComDialog :vis='comDialog1' :workerVis='comDialogworker1' :comVis='comDialogCom1' :newTableData='tempTableData1' @onClose='comDialogClosing(1)' @selectDialog='dialogBackData1' @comdialogChangePageFunction='changeComdialogPage1' @comdialogChangePageSizeFunction='changeComdialogPageSize1' :fenyetotal='fenyetotalData'/>
    <ComDialog :vis='comDialog2' :workerVis='comDialogworker2' :comVis='comDialogCom2' :newTableData='tempTableData2' @onClose='comDialogClosing(2)' @selectDialog='dialogBackData2' @comdialogChangePageFunction='changeComdialogPage2' @comdialogChangePageSizeFunction='changeComdialogPageSize2' :fenyetotal='fenyetotalData'/>
    <ComDialog :vis='comDialog3' :workerVis='comDialogworker3' :comVis='comDialogCom3' :newTableData='tempTableData3' @onClose='comDialogClosing(3)' @selectDialog='dialogBackData3' @comdialogChangePageFunction='changeComdialogPage3' @comdialogChangePageSizeFunction='changeComdialogPageSize3' :fenyetotal='fenyetotalData'/>
    <ComDialog :vis='comDialog4' :workerVis='comDialogworker4' :comVis='comDialogCom4' :newTableData='tempTableData4' @onClose='comDialogClosing(4)' @selectDialog='dialogBackData4' @comdialogChangePageFunction='changeComdialogPage4' @comdialogChangePageSizeFunction='changeComdialogPageSize4' :fenyetotal='fenyetotalData'/>
    <ComDialog :vis='comDialog5' :workerVis='comDialogworker5' :comVis='comDialogCom5' :newTableData='tempTableData5' @onClose='comDialogClosing(5)' @selectDialog='dialogBackData5' @comdialogChangePageFunction='changeComdialogPage5' @comdialogChangePageSizeFunction='changeComdialogPageSize5' :fenyetotal='fenyetotalData'/>
    <ComDialog :vis='comDialog6' :workerVis='comDialogworker6' :comVis='comDialogCom6' :newTableData='tempTableData6' @onClose='comDialogClosing(6)' @selectDialog='dialogBackData6' @comdialogChangePageFunction='changeComdialogPage6' @comdialogChangePageSizeFunction='changeComdialogPageSize6' :fenyetotal='fenyetotalData'/>
    <el-dialog :append-to-body="true" width="90%" center title="业务员详情" :visible.sync="detailDialogVis" :before-close="detailClosing">
        <ui-line-tittle :collapsible="true">
          <span slot="title" >
            <i class="font_family icon-jy-menu-4" ></i>申请信息
          </span>
          <div class="ri-content" slot="content" >
            <el-row class="ri-line">
              <el-col :span="12">
                <ui-label-text  label="业务员代码:" labelWidth="210" :text="detailDialogData.agentcode">
                </ui-label-text>
              </el-col>
              <el-col :span="12">
                <ui-label-text  label="业务员姓名:" :required="true" labelWidth="210" :text="detailDialogData.agentname">
                </ui-label-text>
              </el-col>
            </el-row>
            <el-row class="ri-line">
              <el-col :span="12">
                <ui-label-text  label="证件类型:" :required="true" labelWidth="210" :text="showIdentifytype">
                </ui-label-text>
              </el-col>
              <el-col :span="12">
                <ui-label-text  label="证件号码:" :required="true" labelWidth="210" :text="detailDialogData.identifynumber">
                </ui-label-text>
              </el-col>
            </el-row>
            <el-row class="ri-line">
              <el-col :span="12">
                <ui-label-text  label="出生日期:" :required="true" labelWidth="210" :text="detailDialogData.birthday">
                </ui-label-text>
              </el-col>
              <el-col :span="12">
                <ui-label-text  label="性别:" :required="true" labelWidth="210" :text="detailDialogData.sex === '0' ? '男' : '女'">
                </ui-label-text>
              </el-col>
            </el-row>
            <el-row class="ri-line">
              <el-col :span="12">
                <ui-label-text label="教育水平:" :required="true"  labelWidth="210">
                  <el-select v-model="detailDialogData.education" slot="text" placeholder="请选择">
                    <el-option label="小学" value="1"></el-option>
                    <el-option label="初中" value="2"></el-option>
                    <el-option label="中专" value="9"></el-option>
                    <el-option label="高中" value="3"></el-option>
                    <el-option label="大专" value="4"></el-option>
                    <el-option label="本科" value="5"></el-option>
                    <el-option label="硕士" value="6"></el-option>
                    <el-option label="博士" value="7"></el-option>
                    <el-option label="其他" value="8"></el-option>
                  </el-select>
                </ui-label-text>
              </el-col>
              <el-col :span="12">
                <ui-label-text  label="手机号码:" :required="true" labelWidth="210" >
                  <el-input slot="text" clearable v-model="detailDialogData.mobile"></el-input>
                </ui-label-text>
              </el-col>
            </el-row>
            <el-row class="ri-line">
              <el-col :span="12">
                <ui-label-text2 label="开户银行:" :required="true" labelWidth="210" id="bankLabel">
                  <!-- <el-input slot="text" clearable v-model="detailDialogData.bank"></el-input> -->
                  <el-autocomplete v-model="detailDialogData.bank" slot="text" :fetch-suggestions="querySearchAsync2"  @select="handleProSelect2">
                    <template slot-scope="{ item }"><span class="name">{{ item.name }}</span>
                    </template>
                  </el-autocomplete>
                </ui-label-text2>
              </el-col>
              <el-col :span="12">
                <ui-label-text  label="银行账号:" :required="true" labelWidth="210" >
                  <el-input slot="text" clearable v-model="detailDialogData.account"></el-input>
                </ui-label-text>
              </el-col>
            </el-row>
            <el-row class="ri-line">
              <el-col :span="12">
                <ui-label-text label="开户姓名:" :required="true"  labelWidth="210">
                  <el-input slot="text" clearable v-model="detailDialogData.accountname"></el-input>
                </ui-label-text>
              </el-col>
              <!-- <el-col :span="12">
                <ui-label-text  label="开户地址:" :required="true" labelWidth="210" >
                  <el-input slot="text" clearable v-model="detailDialogData.accounthome"></el-input>
                  <el-select v-model.trim="detailComputedObj1.province" placeholder="省">
                      <el-option v-for="item in provinceOptions" :key="item.index" :label="item.name" :value="item.id">
                      </el-option>
                  </el-select>
                  <el-select v-model.trim="detailComputedObj1.city" placeholder="市">
                      <el-option v-for="item in cityOptions" :key="item.index" :label="item.name" :value="item.id">
                      </el-option>
                  </el-select>
                </ui-label-text>
              </el-col> -->
            </el-row>
            <el-row class="ri-line">
              <el-col :span="24">
                <ui-label-text label="开户地址:" :required="true" labelWidth="210" >
                  <!-- <el-input slot="text" clearable v-model="detailDialogData.accounthome"></el-input> -->
                  <el-autocomplete v-model="detailComputedObj1.province" slot="text" @change="clearCity" :fetch-suggestions="querySearchAsync"  @select="handleProSelect" >
                    <template slot-scope="{ item }"><span class="name">{{ item.name }}</span>
                    </template>
                  </el-autocomplete>
                  <el-autocomplete v-model="detailComputedObj1.city" style="marginLeft: 20px" :disabled="detailComputedObj1.province === ''" slot="text" :fetch-suggestions="querySearchAsync1"  @select="handleProSelect1" >
                    <template slot-scope="{ item }"><span class="name">{{ item.name }}</span>
                    </template>
                  </el-autocomplete>
                </ui-label-text>
              </el-col>
            </el-row>
            <el-row class="ri-line">
              <el-col :span="12">
                <ui-label-text label="增员人工号:"  labelWidth="210">
                  <el-input slot="text" clearable v-model="detailDialogData.instructcode"  @dblclick.native="openComDialog(4)" placeholder="双击可选择"  @blur='opensingleComDialog(4)'></el-input>
                </ui-label-text>
              </el-col>
              <el-col :span="12">
                <ui-label-text label="增员人姓名:" labelWidth="210" >
                  <el-input slot="text" clearable v-model="detailDialogData.instructname"  @dblclick.native="openComDialog(4)" placeholder="双击可选择"  @blur='opensingleComDialog(4)'></el-input>
                </ui-label-text>
              </el-col>
            </el-row>
            <el-row class="ri-line">
              <el-col :span="12">
                <ui-label-text :required="true" label="地市级分公司代码:"   labelWidth="210">
                  <el-input slot="text" clearable v-model="detailDialogData.insurecomcode"  @dblclick.native="openComDialog(5)" placeholder="双击可选择"  @blur='opensingleComDialog(5)'></el-input>
                </ui-label-text>
              </el-col>
              <el-col :span="12">
                <ui-label-text :required="true" label="地市级分公司名称:"  labelWidth="210" >
                  <el-input slot="text" clearable v-model="detailDialogData.insurecomname"  @dblclick.native="openComDialog(5)" placeholder="双击可选择"  @blur='opensingleComDialog(5)'></el-input>
                </ui-label-text>
              </el-col>
            </el-row>
            <el-row class="ri-line">
              <el-col :span="12">
                <ui-label-text label="渠道:" :required="true"  labelWidth="210">
                  <el-select v-model="detailDialogData.channel" @change="changeChannel" slot="text" placeholder="请选择">
                    <el-option label="线下代理人" value="4"></el-option>
                    <el-option v-if="parseInt(tdRank)<5" label="同道人员" value="2"></el-option>
                  </el-select>
                </ui-label-text>
              </el-col>
              <el-col :span="12">
                <ui-label-text  label="类型:" :required="true" labelWidth="210">
                  <el-select v-model="detailDialogData.type" slot="text" placeholder="请选择">
                    <el-option label="代理制" value="3"></el-option>
                    <el-option label="代理制-昆仑" value="6"></el-option>
                  </el-select>
                </ui-label-text>
              </el-col>
            </el-row>
            <el-row class="ri-line">
              <el-col :span="12">
                <ui-label-text label="职级:" :required="true"  labelWidth="210">
                  <!-- <el-input slot="text" clearable v-model="detailDialogData.rank"></el-input> -->
                  <el-select v-model="detailDialogData.rank" slot="text" placeholder="请选择">
                    <el-option v-for="option in rankOptions" :label="option.name" :value="option.id" :key="option.index"></el-option>
                  </el-select>
                </ui-label-text>
              </el-col>
              <el-col :span="12" v-if="isKunlun">
                <ui-label-text label="所属项目公司:" :required="true" labelWidth="210">
                  <el-autocomplete v-model="detailDialogData.klprojectcompany" slot="text" :fetch-suggestions="querySearchAsync3"  @select="handleProSelect3">
                    <template slot-scope="{ item }"><span class="name">{{ item.klprojectcompany }}</span>
                    </template>
                  </el-autocomplete>
                </ui-label-text>
              </el-col>
            </el-row>
            <el-row class="ri-line">
              <el-col :span="12">
                <span  class="IDRequired">
                  个人照片：
                </span>
                <span style="margin-left: 90px">
                  <el-button type="primary" style="width: 4.8rem" @click="downloadPic(1)">下载</el-button>
                  <el-button type="primary" style="width: 4.8rem" @click="checkoutPic(1)">预览</el-button>
                  <el-button type="primary" style="width: 4.8rem" @click="changePic(1)">修改</el-button>
                </span>
              </el-col>
              <el-col :span="12">
                <span  class="IDRequired">
                  身份证正面：
                </span>
                <span style="margin-left: 90px">
                  <el-button type="primary" style="width: 4.8rem" @click="downloadPic(2)">下载</el-button>
                  <el-button type="primary" style="width: 4.8rem" @click="checkoutPic(2)">预览</el-button>
                  <el-button type="primary" style="width: 4.8rem" @click="changePic(2)">修改</el-button>
                </span>
              </el-col>
            </el-row>
            <el-row class="ri-line">
              <el-col :span="12">
                <span  class="IDRequired">
                  身份证反面：
                </span>
                <span style="margin-left: 90px">
                  <el-button type="primary" style="width: 4.8rem" @click="downloadPic(3)">下载</el-button>
                  <el-button type="primary" style="width: 4.8rem" @click="checkoutPic(3)">预览</el-button>
                  <el-button type="primary" style="width: 4.8rem" @click="changePic(3)">修改</el-button>
                </span>
              </el-col>
              <el-col :span="12">
                <span  class="IDRequired">
                  学历证书：
                </span>
                <span style="margin-left: 90px">
                  <el-button type="primary" style="width: 4.8rem" @click="downloadPic(4)">下载</el-button>
                  <el-button type="primary" style="width: 4.8rem" @click="checkoutPic(4)">预览</el-button>
                  <el-button type="primary" style="width: 4.8rem" @click="changePic(4)">修改</el-button>
                </span>
              </el-col>
            </el-row>
            <el-row class="ri-line">
              <el-col :span="12">
                <span  class="IDRequired">
                  银行卡：
                </span>
                <span style="margin-left: 90px">
                  <el-button type="primary" style="width: 4.8rem" @click="downloadPic(5)">下载</el-button>
                  <el-button type="primary" style="width: 4.8rem" @click="checkoutPic(5)">预览</el-button>
                  <el-button type="primary" style="width: 4.8rem" @click="changePic(5)">修改</el-button>
                </span>
              </el-col>
              <el-col :span="12">
                <span  class="IDRequired">
                  未盖章合同：
                </span>
                <span style="margin-left: 90px">
                  <el-button type="primary" style="width: 4.8rem" @click="downloadPic(6)">下载</el-button>
                  <el-button type="primary" style="width: 4.8rem" @click="checkoutPic(6)">预览</el-button>
                </span>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <span  class="IDNotRequired">
                  已盖章合同：
                </span>
                <span style="margin-left: 90px">
                  <el-button type="primary" style="width: 4.8rem" @click="changePic(7)">上传</el-button>
                  <el-button type="primary" style="width: 4.8rem" @click="checkoutPic(7)">预览</el-button>
                  <el-button type="primary" style="width: 4.8rem" @click="downloadPic(7)">下载</el-button>
                </span>
              </el-col>
            </el-row>
        <ui-line-tittle :collapsible="true" >
          <span slot="title" >
            <i class="font_family icon-jy-menu-4" ></i>紧急联系人信息
          </span>
          <div class="ri-content" slot="content">
            <el-row class="ri-line">
              <el-col :span="12">
                <ui-label-text label="紧急联系人姓名:" :required="true" labelWidth="210">
                  <el-input slot="text" clearable v-model="detailDialogData.ecpname"></el-input>
                </ui-label-text>
              </el-col>
              <el-col :span="12">
                <ui-label-text label="紧急联系人电话:" :required="true" labelWidth="210" >
                  <el-input slot="text" @blur="verifyNumber" clearable v-model="detailDialogData.ecptel"></el-input>
                </ui-label-text>
              </el-col>
            </el-row>
          </div>
        </ui-line-tittle>
        <ui-line-tittle :collapsible="true" >
          <span slot="title" >
            <i class="font_family icon-jy-menu-4" ></i>工作经历信息
          </span>
          <div class="ri-content" slot="content">
            <el-row class="ri-line">
              <el-col :span="12">
                <ui-label-text label="工作经历:" :required="true" labelWidth="210">
                  <el-checkbox style="marginTop: 5px" slot="text" v-model="freshstatus">应届生，无工作经历</el-checkbox>
                </ui-label-text>
              </el-col>
            </el-row>
            <div v-if="detailDialogData.workhistory">
              <div v-for="(item,index) in workhistory"  style="marginTop: 40px" :key="index">
                <el-row class="ri-line">
                  <el-col :span="10">
                    <ui-label-text label="公司名称:" labelWidth="120" :required="true">
                      <el-input slot="text" show-word-limit maxlength=30 clearable v-model="item.company"></el-input>
                    </ui-label-text>
                  </el-col>
                  <el-col :span="10">
                    <ui-label-text label="职位名称:" labelWidth="120" :required="true">
                      <el-input slot="text" show-word-limit maxlength=15 clearable v-model="item.position"></el-input>
                    </ui-label-text>
                  </el-col>
                </el-row>
                <el-row class="ri-line">
                  <el-col :span="10">
                    <ui-label-text label="入职时间:" labelWidth="120" :required="true">
                      <el-date-picker
                        v-model="item.entry"
                        type="month"
                        slot="text"
                        @change="changeEntryTime(index)"
                        :picker-options="pickerOptions"
                        value-format="yyyy-MM"
                        placeholder="选择日期">
                      </el-date-picker>
                    </ui-label-text>
                  </el-col>
                  <el-col :span="10">
                    <ui-label-text label="离职时间:" labelWidth="120" :required="true">
                      <el-date-picker
                        v-model="item.leave"
                        type="month"
                        slot="text"
                        :picker-options="pickerOptions"
                        @change="changeLeaveTime(index)"
                        value-format="yyyy-MM"
                        placeholder="选择日期">
                      </el-date-picker>
                    </ui-label-text>
                  </el-col>
                  <el-col :span="4">
                      <el-button type="primary" @click="deleteWorkExe(index)">删除</el-button>
                  </el-col>
                </el-row>
              </div>
            </div>
          </div>
        </ui-line-tittle>
            <el-row>
              <el-col :span="3">
                  <el-button type="primary" :disabled="newExpDisabled" @click="addWorkExe()" style="marginBottom:12px;marginTop:8px">新增</el-button>
              </el-col>
            </el-row>
          </div>
        </ui-line-tittle>
        <!--机构映射信息-->
        <ui-line-tittle :collapsible="true" >
          <span slot="title" >
            <i class="font_family icon-jy-menu-4" ></i>补充信息
          </span>
          <div class="ri-content" slot="content">
            <el-row class="ri-line">
              <el-col :span="12">
                <ui-label-text label="执业证号:" :required="true"  labelWidth="210">
                  <el-input slot="text" clearable v-model="detailDialogData.zhanyecardnum"></el-input>
                </ui-label-text>
              </el-col>
              <el-col :span="12">
                <ui-label-text  label="入职日期:" :required="true" labelWidth="210" >
                  <!-- <el-input slot="text" clearable v-model="detailDialogData.employDate"></el-input> -->
                  <el-date-picker slot="text" v-model="detailDialogData.employDate" :picker-options="pickerDate10" type="date" placeholder="选择日期" value-format="yyyy-MM-dd"></el-date-picker>
                </ui-label-text>
              </el-col>
            </el-row>
            <el-row class="ri-line">
              <el-col :span="12">
                <ui-label-text label="上级领导代码:" labelWidth="210">
                  <el-input slot="text" clearable v-model="detailDialogData.highercode" @dblclick.native="openComDialog(6)" placeholder="双击可选择"  @blur='opensingleComDialog(6)'></el-input>
                </ui-label-text>
              </el-col>
              <el-col :span="12">
                <ui-label-text  label="上级领导姓名:" labelWidth="210" >
                  <el-input slot="text" clearable v-model="detailDialogData.highername" @dblclick.native="openComDialog(6)" placeholder="双击可选择"  @blur='opensingleComDialog(6)'></el-input>
                </ui-label-text>
              </el-col>
            </el-row>
            <el-row class="ri-line">
              <el-col :span="12">
                <ui-label-text  label="是否免税:" :required="true" labelWidth="210" >
                  <!-- <el-input slot="text" clearable v-model="detailDialogData.freeTax"></el-input> -->
                  <el-select v-model="detailDialogData.freeTax" slot="text" placeholder="请选择">
                    <el-option label="是" value="1"></el-option>
                    <el-option label="否" value="0"></el-option>
                  </el-select>
                </ui-label-text>
              </el-col>
            </el-row>
          </div>
        </ui-line-tittle>
        <div class="center">
          <el-button type="primary" v-if="shenheStatus==='a'||shenheStatus==='b'||shenheStatus==='d'" @click.native.prevent="examine()">审核</el-button>
        </div>
      </el-dialog>
      <el-dialog append-to-body center title="个人照片修改"
        :visible.sync="changePicDialog1" width="60%">
        <div class="upload-content">
          <el-upload
            class="upload-content" ref="picUpload1"
            :action="uploadUrlChange(1)"
            :limit="1"
            :on-exceed="handleExceed"
            :on-success="handleEXLSuccess1"
            :file-list="fileList[0]"
            center>
            <el-button type="primary">点击选择</el-button>
            <!-- <div slot="tip" class="red-color">
              <p>* 请您耐心等待，导入结果将会以excel的形式进行显示！<a class="download" @click="ondownloadDemo">(模板下载)</a>
              </p>
            </div> -->
          </el-upload>
        </div>
      </el-dialog>
      <el-dialog append-to-body center title="身份证正面路径修改"
        :visible.sync="changePicDialog2" width="60%">
        <div class="upload-content">
          <el-upload
            class="upload-content" ref="picUpload2"
            :action="uploadUrlChange(2)"
            :limit="1"
            :on-exceed="handleExceed"
            :on-success="handleEXLSuccess2"
            :file-list="fileList[1]"
            center>
            <el-button type="primary">点击选择</el-button>
            <!-- <div slot="tip" class="red-color">
              <p>* 请您耐心等待，导入结果将会以excel的形式进行显示！<a class="download" @click="ondownloadDemo">(模板下载)</a>
              </p>
            </div> -->
          </el-upload>
        </div>
      </el-dialog>
      <el-dialog append-to-body center title="身份证反面修改"
        :visible.sync="changePicDialog3" width="60%">
        <div class="upload-content">
          <el-upload
            class="upload-content" ref="picUpload3"
            :action="uploadUrlChange(3)"
            :limit="1"
            :on-exceed="handleExceed"
            :on-success="handleEXLSuccess3"
            :file-list="fileList[2]"
            center>
            <el-button type="primary">点击选择</el-button>
            <!-- <div slot="tip" class="red-color">
              <p>* 请您耐心等待，导入结果将会以excel的形式进行显示！<a class="download" @click="ondownloadDemo">(模板下载)</a>
              </p>
            </div> -->
          </el-upload>
        </div>
      </el-dialog>
      <el-dialog append-to-body center title="学历证书修改"
        :visible.sync="changePicDialog4" width="60%">
        <div class="upload-content">
          <el-upload
            class="upload-content" ref="picUpload4"
            :action="uploadUrlChange(4)"
            :limit="1"
            :on-exceed="handleExceed"
            :on-success="handleEXLSuccess4"
            :file-list="fileList[3]"
            center>
            <el-button type="primary">点击选择</el-button>
            <!-- <div slot="tip" class="red-color">
              <p>* 请您耐心等待，导入结果将会以excel的形式进行显示！<a class="download" @click="ondownloadDemo">(模板下载)</a>
              </p>
            </div> -->
          </el-upload>
        </div>
      </el-dialog>
      <el-dialog append-to-body center title="银行卡照片修改"
        :visible.sync="changePicDialog5" width="60%">
        <div class="upload-content">
          <el-upload
            class="upload-content" ref="picUpload5"
            :action="uploadUrlChange(5)"
            :limit="1"
            :on-exceed="handleExceed"
            :on-success="handleEXLSuccess5"
            :file-list="fileList[4]"
            center>
            <el-button type="primary">点击选择</el-button>
            <!-- <div slot="tip" class="red-color">
              <p>* 请您耐心等待，导入结果将会以excel的形式进行显示！<a class="download" @click="ondownloadDemo">(模板下载)</a>
              </p>
            </div> -->
          </el-upload>
        </div>
      </el-dialog>
      <el-dialog append-to-body center title="盖章合同修改"
        :visible.sync="changePicDialog7" width="60%">
        <div class="upload-content">
          <el-upload
            class="upload-content" ref="picUpload7"
            :action="uploadUrlChange(7)"
            :limit="1"
            :on-exceed="handleExceed"
            :on-success="handleEXLSuccess7"
            :file-list="fileList[5]"
            center>
            <el-button type="primary">点击选择</el-button>
            <!-- <div slot="tip" class="red-color">
              <p>* 请您耐心等待，导入结果将会以excel的形式进行显示！<a class="download" @click="ondownloadDemo">(模板下载)</a>
              </p>
            </div> -->
          </el-upload>
        </div>
      </el-dialog>
      <!-- 审核 的弹框-->
      <el-dialog :append-to-body="true" width="80%" center title="审核" :visible.sync="dialogTableVisibleCheck">
        <el-row class="ri-line">
          <el-col :span="24">
            <el-radio v-model="shenheInput.checkCode" label='0' >审核通过</el-radio>
            <el-radio v-model="shenheInput.checkCode" label='1' >审核不通过</el-radio>
          </el-col>
        </el-row>
        <el-row class="ri-line">
          <el-col :span="24">
            <ui-label-text labelWidth="90" label="审核意见:" >
              <el-input labelWidth="300" type="textarea" v-model="shenheInput.content" slot="text" ></el-input>
            </ui-label-text>
          </el-col>
        </el-row>
        <div class="center">
          <el-button type="primary" class="button_add" @click.native.prevent="goodToGo">提交审核</el-button>
          <el-button type="primary" class="button_add" @click.native.prevent="dialogTableVisibleCheck = false">返回</el-button>
        </div>
      </el-dialog>
      <el-dialog
      append-to-body
      center
      title="审核历史"
      :visible.sync="checkTrace"
      width="50%"
      :before-close='traceDialogClose'>
        <ui-line-tittle :collapsible="true">
          <span slot="title" >
            <i class="font_family icon-jy-menu-4" ></i>
            <span>审核历史</span>
          </span>
          <div slot="content">
            <el-table stripe style="width: 100%" :data="traceTableData">
              <el-table-column prop="verifystatus" label="审核状态" width="200"></el-table-column>
              <el-table-column prop="reviews" label="审核意见" width="250"></el-table-column>
              <el-table-column prop="updateDate" label="操作时间" width="280"></el-table-column>
              <el-table-column prop="updaterCode" label="操作员" width="280"></el-table-column>
            </el-table>
            <div class="block">
              <el-pagination
                @current-change="handleCurrentChange2"
                @size-change="handleSizeChange2"
                :current-page="traceData.currentPage"
                :page-size ="traceData.pageSize"
                :page-sizes="[5,10,20]"
                :total="totalRecords2"
                layout="total, sizes, prev, pager, next, jumper"
                >
              </el-pagination>
            </div>
          </div>
        </ui-line-tittle>
    </el-dialog>
  </div>
</template>

<script>
import NoticeBar from '@/components/notice-bar'
import LineTittle from '@/components/line-tittle'
import LabelText3 from '@/components/label-text3'
import LabelText2 from '@/components/label-text2'
import LabelText from '@/components/label-text'
import { mapActions } from 'vuex'
import ComDialog from '@/components/comDialog'
import IsEmpty from '@/utils/IsEmpty'
// import moment from 'moment'
// import {downloadUrl} from 'download.js'
import {
  api
} from '@/api/lifeInsur_mgr/quitListMgr.js'
export default {
  name: '',
  data () {
    return {
      pickerOptions: {
        disabledDate (time) {
          return time.getTime() > Date.now()
        }
      },
      queryInfo: {
        insurecode: '',
        insurename: '',
        insurecomcode: '',
        insurecomname: '',
        agentcode: '',
        agentname: '',
        channel: '',
        rank: '',
        type: '',
        verifystatus: '',
        isupload: '',
        currentPage: 1,
        pageSize: 10
      },
      freshstatus: false,
      newExpDisabled: false,
      detailQueryData: {},
      fileList: [[], [], [], [], [], []],
      changeFileFlag: [[], [], [], [], [], []],
      uploadFlag: [false, false, false, false, false, false],
      tableData: [],
      fenyetotalData: 0,
      tableShowOrNot: false,
      totalRecords: 0,
      showIdentifytype: '',
      loading1: false, // 是否显示加载
      detailDialogVis: false,
      checkTrace: false,
      totalRecords2: 0,
      comDialog1: false,
      comDialogCom1: false,
      comDialogworker1: false,
      comDialog2: false,
      comDialogCom2: false,
      comDialogworker2: false,
      comDialog3: false,
      comDialogCom3: false,
      comDialogworker3: false,
      comDialog4: false,
      comDialogCom4: false,
      comDialogworker4: false,
      comDialog5: false,
      comDialogCom5: false,
      comDialogworker5: false,
      comDialog6: false,
      comDialogCom6: false,
      comDialogworker6: false,
      shenheStatus: '',
      changePicDialog: false,
      changePicDialog1: false,
      changePicDialog2: false,
      changePicDialog3: false,
      changePicDialog4: false,
      changePicDialog5: false,
      changePicDialog7: false,
      detailDialogData: {
        agentcode: '',
        agentname: '',
        identifytype: '',
        identifynumber: '',
        birthday: '',
        sex: '', // 传数字0女1男
        education: '', // 传数字1小学，2初中，3高中，4大专，5本科，6硕士，7博士，8其他，9中专
        mobile: '',
        bank: '',
        account: '',
        accountname: '',
        accounthome: '',
        instructcode: '',
        instructname: '',
        insurecomcode: '',
        insurecomname: '',
        channel: '', // 传数字2同道人员4线下代理人
        type: 3, // 传数字 3代理制
        rank: '',
        klprojectcompany: '',
        klprojectcompanycode: '',
        zhanyecardnum: '',
        employDate: '',
        highercode: '',
        highername: '',
        freeTax: '',
        reviewresult: '',
        reviews: '',
        personimg: '',
        idcardimg1: '',
        idcardimg2: '',
        educationimg: '',
        bankimg: '',
        contractimg: '',
        sealelectroniccontractphoto: '',
        ecpname: '',
        ecptel: '',
        freshstatus: '0',
        workhistory: ''
      },
      workhistory: [],
      tdRank: '',
      tdChannel: '',
      shenheInput: {
        checkCode: '',
        content: ''
      },
      pickerDate10: {
        disabledDate (time) {
          let curDate = (new Date()).getTime()
          let three = 10 * 24 * 3600 * 1000
          let interval = curDate - three
          return time.getTime() > Date.now() || time.getTime() < interval
        }
      },
      tempTraceData: '',
      traceTableData: [],
      traceData: {
        agentcode: '',
        currentPage: 1,
        pageSize: 5
      },
      isKunlun: false,
      dialogTableVisibleCheck: false,
      tempTableData1: [],
      tempTableData2: [],
      tempTableData3: [],
      tempTableData4: [],
      tempTableData5: [],
      tempTableData6: [],
      shengjiQueryData: {
        clickType: '2',
        comCodeOrName: '',
        currentPage: 1,
        pageSize: 10
      },
      dijiQueryData: {
        clickType: '2',
        upperComCode: '',
        comCodeOrName: '',
        currentPage: 1,
        pageSize: 10
      },
      tdWorkerData: {
        clickType: '2',
        agentcode: '',
        agentname: '',
        currentPage: 1,
        pageSize: 10
      },
      baiyingWorkerData: {
        agentCode: '',
        agentName: '',
        comCode: '',
        comName: '',
        clickType: 2,
        currentPage: 1,
        pageSize: 10
      },
      detailDijiQueryData: {
        comcode: '',
        comname: '',
        type: '2', // 1只找总公司和省级，2只找市级，不填找全部
        upcode: '', // 根据省级找市级时用，可以不填
        currentPage: 1,
        pageSize: 10,
        clickType: '2'
      },
      baiyingUpperWorkerData: {
        agentCode: '',
        agentName: '',
        comCode: '',
        comName: '',
        clickType: 2,
        currentPage: 1,
        pageSize: 10
      },
      queryRankVis: true,
      queryRankOptions: [],
      provinceOptions: [], // 省
      cityOptions: [], // 市,
      bankOptions: [], // 可以选择的银行
      rankOptions: [],
      detailComputedObj1: {
        province: '',
        city: '',
        id1: '',
        id2: ''
      }
    }
  },
  methods: {
    ...mapActions([
      'contiListCheckDialogDataGet1', 'contiListCheckDialogDataGet2', 'tdWorkerQuery', 'baiyingWorkerQuery', 'ultimateBaiyingCompanyQuery'
    ]),
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
    submitForm () {
      this.queryInfo.currentPage = 1
      this.tableShowOrNot = true
      this.totalRecords = 0
      this.queryData()
    },
    clearDiji () { // 更改省级市自动修改地级市
      this.queryInfo.insurecomcode = ''
      this.queryInfo.insurecomname = ''
    },
    handleExceed (files, fileList) {
      this.openToast('warning', `当前限制选择 1 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length} 个文件`, 0)
    },
    // uploadFirst () {
    //   let self = this
    //   this.Loading()
    //   if () {
    //     (async function () {
    //       // 循环异步
    //       for (let i = 0; i < self.changeFileFlag.length; i++) {
    //         await self.$refs[`picUpload${i + 1}`].submit()
    //       }
    //     })()
    //   }
    // },
    handleEXLSuccess1 (response) {
      if (response.msg === '上传成功') {
        this.detailDialogData.personimg = response.code
        this.openToast('success', '上传成功')
        this.changePicDialog1 = false
      } else {
        this.openToast('warning', response.msg)
        this.changePicDialog1 = false
      }
    },
    handleEXLSuccess2 (response) {
      if (response.msg === '上传成功') {
        this.detailDialogData.idcardimg1 = response.code
        this.openToast('success', '上传成功')
        this.changePicDialog2 = false
      } else {
        this.openToast('warning', response.msg)
        this.changePicDialog2 = false
      }
    },
    handleEXLSuccess3 (response) {
      if (response.msg === '上传成功') {
        this.detailDialogData.idcardimg2 = response.code
        this.openToast('success', '上传成功')
        this.changePicDialog3 = false
      } else {
        this.openToast('warning', response.msg)
        this.changePicDialog3 = false
      }
    },
    handleEXLSuccess4 (response) {
      if (response.msg === '上传成功') {
        this.detailDialogData.educationimg = response.code
        this.openToast('success', '上传成功')
        this.changePicDialog4 = false
      } else {
        this.openToast('warning', response.msg)
        this.changePicDialog4 = false
      }
    },
    handleEXLSuccess5 (response) {
      if (response.msg === '上传成功') {
        this.detailDialogData.bankimg = response.code
        this.openToast('success', '上传成功')
        this.changePicDialog5 = false
      } else {
        this.openToast('warning', response.msg)
        this.changePicDialog5 = false
      }
    },
    handleEXLSuccess7 (response) {
      if (response.msg === '上传成功') {
        this.detailDialogData.sealelectroniccontractphoto = response.code
        this.openToast('success', '上传成功')
        this.changePicDialog7 = false
      } else {
        this.openToast('warning', response.msg)
        this.changePicDialog7 = false
      }
    },
    beforeRemove (file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`)
    },
    queryData () {
      this.Loading()
      // if (!IsEmpty(this.queryInfo.insurename)) {
      //   this.queryInfo.insurename = '天安佰盈保险销售有限公司' + this.queryInfo.insurename
      // }
      api('/tdEmpIntern/query', 'post', this.queryInfo).then((res) => {
        this.closeLoading()
        if (res.data.code !== '000000' && !IsEmpty(res.data.code)) {
          this.openToast('warning', res.data.msg)
        } else {
          this.tableData = res.data.data.content
          this.totalRecords = res.data.data.totalElements
          // for (let i = 0; i < this.tableData.length; i++) {
          //   for (const key in this.tableData[i]) {
          //     if (this.tableData[i].hasOwnProperty(key)) {
          //
          //       // this.tableData[i][key].replace(/天安佰盈保险销售有限公司/, '')
          //     }
          //   }
          // }
          this.tableShowOrnot = true
        }
      })
    },
    handleCurrentChange (val) {
      this.queryInfo.currentPage = val
      this.queryData()
    },
    handleSizeChange (val) {
      this.queryInfo.pageSize = val
      this.queryInfo.currentPage = 1
      this.queryData()
    },
    getDetailExamine (data) {
      // this.detailQueryData = data
      this.detailDijiQueryData.upcode = data.insurecode // 保存省级分公司code
      this.shenheStatus = data.verifystatus // 保存审核状态
      let temp = {
        agentcode: data.agentcode
      }
      this.Loading()
      api(`/tdEmpIntern/querydetail`, 'post', temp).then((res) => {
        if (res.data.code !== '000000' && !IsEmpty(res.data.code)) {
          this.openToast('warning', res.data.msg)
        } else {
          let self = this
          this.detailDialogData = res.data.data
          this.detailDialogData.klprojectcompany = this.detailDialogData.klprojectcompany ? this.detailDialogData.klprojectcompany : ''
          this.detailDialogData.klprojectcompanycode = this.detailDialogData.klprojectcompanycode ? this.detailDialogData.klprojectcompanycode : ''
          this.tdRank = res.data.data['rank'] // 小于5时，详情中渠道可选择同道
          this.tdChannel = res.data.data['channel']
          let temp2 = res.data.data.accounthome
          switch (res.data.data.identifytype) {
            case '1':
              this.showIdentifytype = '身份证'
              break
            case '2':
              this.showIdentifytype = '户口本'
              break
            case '3':
              this.showIdentifytype = '军官证'
              break
            case '4':
              this.showIdentifytype = '驾驶证'
              break
            case '5':
              this.showIdentifytype = '护照'
              break
            case '6':
              this.showIdentifytype = '港澳居民来往大陆通行证'
              break
            case '7':
              this.showIdentifytype = '台湾居民来往大陆通行证'
              break
            case '8':
              this.showIdentifytype = '其他'
              break
            case '9':
              this.showIdentifytype = '出生医学证明'
              break
            default:
              break
          }
          // imgAddress: {
          //   personimg: '',
          //   idcardimg1: '',
          //   idcardimg2: '',
          //   educationimg: '',
          //   bankimg: '',
          //   contractimg: '',
          //   sealelectroniccontractphoto: ''
          // },
          this.getProvinces().then(
            () => {
              let temp1 = this.detailDialogData.accounthome.slice(0, 2) + '0000'
              for (let i = 0; i < this.provinceOptions.length; i++) {
                if (this.provinceOptions[i].id === parseInt(temp1)) {
                  this.detailComputedObj1.province = this.provinceOptions[i].name
                  this.detailComputedObj1.id1 = this.provinceOptions[i].id
                }
              }
              this.changeChannel()
              this.detailDialogData.freeTax = this.detailDialogData.freeTax ? this.detailDialogData.freeTax : '0'
              this.detailDialogData.insurecomname = this.detailDialogData.insurecomname.replace(/天安佰盈保险销售有限公司/, '')
              this.getCities(temp1).then(
                () => {
                  self.closeLoading()
                  self.detailDialogVis = true
                  for (let i = 0; i < self.cityOptions.length; i++) {
                    if (self.cityOptions[i].id === parseInt(temp2)) {
                      self.detailComputedObj1.city = self.cityOptions[i].name
                      self.detailComputedObj1.id2 = self.cityOptions[i].id
                    }
                  }
                }
              )
            }
          )
        }
      })
    },
    handleProSelect (item) {
      this.detailComputedObj1.province = item.name
      this.detailComputedObj1.id1 = item.id
    },
    handleProSelect1 (item) {
      this.detailComputedObj1.city = item.name
      this.detailComputedObj1.id2 = item.id
    },
    handleProSelect2 (item) {
      this.detailDialogData.bank = item.name
    },
    handleProSelect3 (item) {
      this.detailDialogData.klprojectcompany = item.klprojectcompany
      this.detailDialogData.klprojectcompanycode = item.klprojectcompanycode
    },
    getProvinces () {
      return api(`http://192.168.164.24:8090/tabyperf/enum/fetch/province?userId=${this.userId}&userCode=${this.userCode}&userName=${this.userName}&orgId=${this.orgId}`, 'get', '').then(
        (data) => {
          this.provinceOptions = data.data
        })
    },
    changeEntryTime (index) { // 工作时间不能相互覆盖校验，入职时间
      // 拿到所有日期
      if (Date.parse(this.workhistory[index].entry) > Date.parse(this.workhistory[index].leave)) {
        this.workhistory[index].entry = ''
        this.openToast('warning', '工作经历入职时间有误')
        return
      }
      let startTime = []
      let endTime = []
      for (let i = 0; i < this.workhistory.length; i++) {
        if (Date.parse(this.workhistory[i].entry) && Date.parse(this.workhistory[i].leave)) {
          if (Date.parse(this.workhistory[i].entry) === Date.parse(this.workhistory[i].leave)) {
            for (let j = 0; j < this.workhistory.length; j++) {
              if ((Date.parse(this.workhistory[i].entry) > Date.parse(this.workhistory[j].entry)) && (Date.parse(this.workhistory[i].entry) < Date.parse(this.workhistory[j].leave))) {
                this.workhistory[index].entry = ''
                this.openToast('warning', '工作经历入职时间有误')
                return
              }
            }
          } else {
            startTime.push(Date.parse(this.workhistory[i].entry) + 2 * i + 1)
            endTime.push(Date.parse(this.workhistory[i].leave))
          }
        }
      }
      startTime = startTime.sort((a, b) => {
        return a - b
      })
      endTime = endTime.sort((a, b) => {
        return a - b
      })
      for (let i = 1; i < startTime.length; i++) {
        if (startTime[i] <= endTime[i - 1]) {
          this.workhistory[index].entry = ''
          this.openToast('warning', '工作经历入职时间有误')
          return
        }
      }
    },
    changeLeaveTime (index) { // 工作时间不能相互覆盖校验，离职时间
      if (Date.parse(this.workhistory[index].entry) > Date.parse(this.workhistory[index].leave)) {
        this.workhistory[index].leave = ''
        this.openToast('warning', '工作经历离职时间有误')
        return
      }
      let startTime = []
      let endTime = []
      for (let i = 0; i < this.workhistory.length; i++) {
        if (Date.parse(this.workhistory[i].entry) && Date.parse(this.workhistory[i].leave)) {
          if (Date.parse(this.workhistory[i].entry) === Date.parse(this.workhistory[i].leave)) {
            for (let j = 0; j < this.workhistory.length; j++) {
              if ((Date.parse(this.workhistory[i].entry) > Date.parse(this.workhistory[j].entry)) && (Date.parse(this.workhistory[i].entry) < Date.parse(this.workhistory[j].leave))) {
                this.workhistory[index].leave = ''
                this.openToast('warning', '工作经历入职时间有误')
                return
              }
            }
          } else {
            startTime.push(Date.parse(this.workhistory[i].entry) + 2 * i + 1)
            endTime.push(Date.parse(this.workhistory[i].leave))
          }
        }
      }
      startTime = startTime.sort((a, b) => {
        return a - b
      })
      endTime = endTime.sort((a, b) => {
        return a - b
      })
      for (let i = 1; i < startTime.length; i++) {
        if (startTime[i] <= endTime[i - 1]) {
          this.workhistory[index].leave = ''
          this.openToast('warning', '工作经历离职时间有误')
          return
        }
      }
    },
    addWorkExe () { // 添加工作记录
      if (this.workhistory.length === 5) {
        this.openToast('warning', '工作经历最多可有5条记录', 0)
      } else {
        this.workhistory.push({
          'company': '', 'entry': '', 'leave': '', 'position': ''
        })
      }
    },
    deleteWorkExe (index) {
      this.workhistory.splice(index, 1)
    },
    verifyNumber () { // 校验紧急联系人号码，只能为手机或座机
      if (!RegExp(/^[1][3,4,5,6,7,8][0-9]{9}$/).test(this.detailDialogData.ecptel) && !RegExp(/^0\d{2,3}-\d{7,8}$/).test(this.detailDialogData.ecptel)) {
        this.openToast('warning', '请输入正确的座机或手机号', 0)
        this.detailDialogData.ecptel = ''
      }
    },
    openExamHis (data) { // 查看审核历史
      this.Loading()
      this.tempTraceData = data
      this.traceData.agentcode = data.agentcode
      api('/tdEmpIntern/reviewhistory', 'post', this.traceData).then((res) => {
        this.closeLoading()
        if (res.data.code !== '000000' && !IsEmpty(res.data.code)) {
          this.openToast('warning', res.data.msg)
        } else {
          this.traceTableData = res.data.data.content
          this.totalRecords2 = res.data.data.totalElements
          this.checkTrace = true
        }
      })
    },
    openComDialog (index) {
      switch (index) {
        case 1:
          this.shengjiQueryData.clickType = '2'
          if (IsEmpty(this.queryInfo.insurecode)) {
            this.shengjiQueryData.comCodeOrName = this.queryInfo.insurename
          } else {
            this.shengjiQueryData.comCodeOrName = this.queryInfo.insurecode
          }
          this.contiListCheckDialogDataGet1(this.shengjiQueryData).then(
            (res) => {
              if (res.data.code !== '000000' && !IsEmpty(res.data.code)) {
                this.openToast('warning', res.data.msg)
              } else {
                for (let i = 0; i < res.data.data.data.length; i++) {
                  res.data.data.data[i].comCName = res.data.data.data[i].comCName.replace(/天安佰盈保险销售有限公司/, '')
                }
                this.tempTableData1 = res.data.data.data
                this.fenyetotalData = res.data.data.totalRecords
                for (let i = 0; i < this.tempTableData1.length; i++) {
                  this.tempTableData1[i]['renderData'] = `${this.tempTableData1[i].comCode}-${this.tempTableData1[i].comCName}`
                }
                this.comDialog1 = true
                this.comDialogCom1 = true
                this.comDialogworker1 = false
              }
            })
          break
        case 2:
          if (IsEmpty(this.queryInfo.insurecode)) {
            this.openToast('warning', '请先选择省级分公司！')
          } else if (this.queryInfo.insurecode === '01') {
            this.openToast('warning', '当您在省级分公司输入框处为总公司不可选择分公司！')
          } else {
            this.dijiQueryData.clickType = '2'
            this.dijiQueryData.upperComCode = this.queryInfo.insurecode
            if (IsEmpty(this.queryInfo.insurecomcode)) {
              this.dijiQueryData.comCodeOrName = this.queryInfo.insurecomname
            } else {
              this.dijiQueryData.comCodeOrName = this.queryInfo.insurecomcode
            }
            this.contiListCheckDialogDataGet2(this.dijiQueryData).then(
              (res) => {
                if (res.data.code !== '000000' && !IsEmpty(res.data.code)) {
                  this.openToast('warning', res.data.msg)
                } else {
                  for (let i = 0; i < res.data.data.data.length; i++) {
                    res.data.data.data[i].comCName = res.data.data.data[i].comCName.replace(/天安佰盈保险销售有限公司/, '')
                  }
                  this.tempTableData2 = res.data.data.data
                  this.fenyetotalData = res.data.data.totalRecords
                  for (let i = 0; i < this.tempTableData2.length; i++) {
                    this.tempTableData2[i]['renderData'] = `${this.tempTableData2[i].comCode}-${this.tempTableData2[i].comCName}`
                  }
                  this.comDialog2 = true
                  this.comDialogCom2 = true
                  this.comDialogworker2 = false
                }
              })
          }
          break
        case 3:
          this.tdWorkerData.clickType = '2'
          this.tdWorkerData.agentcode = this.queryInfo.agentcode
          this.tdWorkerData.agentname = this.queryInfo.agentname
          this.tdWorkerQuery(this.tdWorkerData).then(
            (res) => {
              if (res.data.code !== '000000' && !IsEmpty(res.data.code)) {
                this.openToast('warning', res.data.msg)
              } else {
                this.tempTableData3 = res.data.data.data
                this.fenyetotalData = res.data.data.totalRecords
                for (let i = 0; i < this.tempTableData3.length; i++) {
                  this.tempTableData3[i]['renderData'] = `${this.tempTableData3[i].agentCode}-${this.tempTableData3[i].agentName}`
                }
                this.comDialog3 = true
                this.comDialogCom3 = true
                this.comDialogworker3 = false
              }
            })
          break
        case 4:
          // baiyingWorkerQuery baiyingWorkerData
          this.baiyingWorkerData.clickType = '2'
          this.baiyingWorkerData.agentCode = this.detailDialogData.instructcode
          this.baiyingWorkerData.agentName = this.detailDialogData.instructname
          this.baiyingWorkerQuery(this.baiyingWorkerData).then(
            (res) => {
              if (res.data.code !== '000000' && !IsEmpty(res.data.code)) {
                this.openToast('warning', res.data.msg)
              } else {
                this.tempTableData4 = res.data.data.data
                this.fenyetotalData = res.data.data.totalRecords
                for (let i = 0; i < this.tempTableData4.length; i++) {
                  this.tempTableData4[i]['renderData'] = `${this.tempTableData4[i].agentCode}-${this.tempTableData4[i].agentName}`
                }
                this.comDialog4 = true
                this.comDialogCom4 = true
                this.comDialogworker4 = false
              }
            })
          break
        case 5:
          // contiListCheckDialogDataGet2
          this.detailDijiQueryData.comcode = this.detailDialogData.insurecomcode
          this.detailDijiQueryData.comname = this.detailDialogData.insurecomname
          this.detailDijiQueryData.clickType = '2'
          this.ultimateBaiyingCompanyQuery(this.detailDijiQueryData).then(
            (res) => {
              if (res.data.code !== '000000' && !IsEmpty(res.data.code)) {
                this.openToast('warning', res.data.msg)
              } else {
                this.tempTableData5 = res.data.data.data
                for (let i = 0; i < this.tempTableData5.length; i++) {
                  this.tempTableData5[i].comCName = this.tempTableData5[i].comCName.replace(/天安佰盈保险销售有限公司/, '')
                }
                this.fenyetotalData = res.data.data.totalRecords
                for (let i = 0; i < this.tempTableData5.length; i++) {
                  this.tempTableData5[i]['renderData'] = `${this.tempTableData5[i].comCode}-${this.tempTableData5[i].comCName}`
                }
                this.comDialog5 = true
                this.comDialogCom5 = true
                this.comDialogworker5 = false
              }
            })
          break
        case 6:
          // baiyingWorkerQuery baiyingUpperWorkerData
          this.baiyingUpperWorkerData.clickType = '2'
          this.baiyingUpperWorkerData.agentCode = this.detailDialogData.highercode
          this.baiyingUpperWorkerData.agentName = this.detailDialogData.highername
          this.baiyingWorkerQuery(this.baiyingUpperWorkerData).then(
            (res) => {
              if (res.data.code !== '000000' && !IsEmpty(res.data.code)) {
                this.openToast('warning', res.data.msg)
              } else {
                this.tempTableData6 = res.data.data.data
                this.fenyetotalData = res.data.data.totalRecords
                for (let i = 0; i < this.tempTableData6.length; i++) {
                  this.tempTableData6[i]['renderData'] = `${this.tempTableData6[i].agentCode}-${this.tempTableData6[i].agentName}`
                }
                this.comDialog6 = true
                this.comDialogCom6 = true
                this.comDialogworker6 = false
              }
            })
          break
      }
    },
    handleCurrentChange2 (val) {
      this.traceData.currentPage = val
      this.openExamHis(this.tempTraceData)
    },
    handleSizeChange2 (val) {
      this.traceData.currentPage = 1
      this.traceData.pageSize = val
      this.openExamHis(this.tempTraceData)
    },
    traceDialogClose () {
      this.initDialogData()
      this.checkTrace = false
    },
    // toast提示
    openToast (type, mesg, time = 0) {
      this.$message({
        showClose: true,
        message: mesg,
        type: type,
        duration: time
      })
    },
    uploadUrlChange (index) { // 上传链接，当该条记录无上传过文件时，参数为该业务员代码，否则为之前上传文件的路径在点开详情时获取，或者上传成功后返回
      switch (index) {
        case 1:
          if (IsEmpty(this.detailDialogData.personimg)) {
            return `/tabycore/tdEmpIntern/fileUpLoad?filetype=personimg&fileName=${this.detailDialogData.agentcode}`
          } else {
            return `/tabycore/tdEmpIntern/fileUpLoad?filetype=personimg&fileName=${this.detailDialogData.personimg}`
          }
        case 2:
          if (IsEmpty(this.detailDialogData.idcardimg1)) {
            return `/tabycore/tdEmpIntern/fileUpLoad?filetype=idcardimg1&fileName=${this.detailDialogData.agentcode}`
          } else {
            return `/tabycore/tdEmpIntern/fileUpLoad?filetype=idcardimg1&fileName=${this.detailDialogData.idcardimg1}`
          }
        case 3:
          if (IsEmpty(this.detailDialogData.idcardimg2)) {
            return `/tabycore/tdEmpIntern/fileUpLoad?filetype=idcardimg2&fileName=${this.detailDialogData.agentcode}`
          } else {
            return `/tabycore/tdEmpIntern/fileUpLoad?filetype=idcardimg2&fileName=${this.detailDialogData.idcardimg2}`
          }
        case 4:
          if (IsEmpty(this.detailDialogData.educationimg)) {
            return `/tabycore/tdEmpIntern/fileUpLoad?filetype=educationimg&fileName=${this.detailDialogData.agentcode}`
          } else {
            return `/tabycore/tdEmpIntern/fileUpLoad?filetype=educationimg&fileName=${this.detailDialogData.educationimg}`
          }
        case 5:
          if (IsEmpty(this.detailDialogData.bankimg)) {
            return `/tabycore/tdEmpIntern/fileUpLoad?filetype=bankimg&fileName=${this.detailDialogData.agentcode}`
          } else {
            return `/tabycore/tdEmpIntern/fileUpLoad?filetype=bankimg&fileName=${this.detailDialogData.bankimg}`
          }
        case 7:
          if (IsEmpty(this.detailDialogData.sealelectroniccontractphoto)) {
            return `/tabycore/tdEmpIntern/fileUpLoad?filetype=sealelectroniccontractphoto&fileName=${this.detailDialogData.agentcode}`
          } else {
            return `/tabycore/tdEmpIntern/fileUpLoad?filetype=sealelectroniccontractphoto&fileName=${this.detailDialogData.sealelectroniccontractphoto}`
          }
        default:
          break
      }
    },
    // searchBanks (query) {
    //   if (query !== '') {
    //     this.loading = true
    //     let queryBody = {}
    //     queryBody.name = query
    //     // api(`http://192.168.164.24:8090/tabyperf/enum/fetch/bank?userId=${this.userId}&userCode=${this.userCode}&userName=${this.userName}&orgId=${this.orgId}`, 'post', queryBody).then(
    //     //   (data) => {
    //     //     this.bankOptions = data
    //     //     this.loading = false
    //     //   })
    //     this.loading = false
    //     this.bankOptions = [{name: '中国农业银行股份有限公司北京工体路支行', id: '中国农业银行股份有限公司北京工体路支行'}]
    //   } else {
    //     this.bankOptions = []
    //   }
    // },
    getCities (query) { // 获取城市列表，192.168.164.24为生产环境ip
      return api(`http://192.168.164.24:8090/tabyperf/enum/fetch/city?userId=${this.userId}&userCode=${this.userCode}&userName=${this.userName}&orgId=${this.orgId}&provinceId=${query}`, 'get').then(
        (data) => {
          this.cityOptions = data.data
        })
    },
    getBanks (query) { // 获取银行列表，192.168.164.24为生产环境ip
      return api(`http://192.168.164.24:8090/tabyperf/enum/fetch/bank?userId=${this.userId}&userCode=${this.userCode}&userName=${this.userName}&orgId=${this.orgId}`, 'post', query).then(
        (data) => {
          this.bankOptions = data.data
        })
    },
    clearCity () {
      this.detailComputedObj1.city = ''
    },
    changeQueryInfoChannel () { // 渠道改变职级也会相应改变
      this.queryRankVis = false
      this.$nextTick(() => {
        if (this.queryInfo.channel === '4') {
          this.queryRankOptions = [
            {name: '初级创业合伙人', id: '5', index: 5},
            {name: '中级创业合伙人', id: '6', index: 4},
            {name: '高级创业合伙人', id: '7', index: 3},
            {name: '资深创业合伙人', id: '8', index: 2},
            {name: '顶级创业合伙人', id: '9', index: 1},
            {name: '营销员', id: '3', index: 6},
            {name: '营业部经理', id: '2', index: 7},
            {name: '营业区总监', id: '1', index: 8}
          ]
        } else {
          this.queryRankOptions = [
            {name: '线上代理人', id: '1', index: 1}
          ]
        }
        this.queryRankVis = true
      })
    },
    changeQueryInfoRank () {
      if (IsEmpty(this.queryInfo.channel)) {
        this.openToast('warning', '请先选择渠道')
      }
    },
    opensingleComDialog (index) {
      if (!(this.comDialog1 || this.comDialog2 || this.comDialog3 || this.comDialog4 || this.comDialog5 || this.comDialog6)) {
        switch (index) {
          case 1:
            this.shengjiQueryData.clickType = '1'
            if (IsEmpty(this.queryInfo.insurecode)) {
              this.shengjiQueryData.comCodeOrName = this.queryInfo.insurename
            } else {
              this.shengjiQueryData.comCodeOrName = this.queryInfo.insurecode
            }
            this.contiListCheckDialogDataGet1(this.shengjiQueryData).then(
              (res) => {
                if (res.data.code !== '000000' && !IsEmpty(res.data.code)) {
                  this.openToast('warning', res.data.msg)
                } else {
                  if (res.data.data.data.length === 1) {
                    this.queryInfo.insurecode = res.data.data.data[0].comCode
                    this.queryInfo.insurename = res.data.data.data[0].comCName.replace(/天安佰盈保险销售有限公司/, '')
                  }
                }
              }
            )
            break
          case 2:
            this.dijiQueryData.clickType = '1'
            this.dijiQueryData.upperComCode = this.queryInfo.insurecode
            if (IsEmpty(this.queryInfo.insurecomcode)) {
              this.dijiQueryData.comCodeOrName = this.queryInfo.insurecomname
            } else {
              this.dijiQueryData.comCodeOrName = this.queryInfo.insurecomcode
            }
            this.contiListCheckDialogDataGet2(this.dijiQueryData).then(
            (res) => {
              if (res.data.code !== '000000' && !IsEmpty(res.data.code)) {
                this.openToast('warning', res.data.msg)
              } else {
                if (res.data.data.data.length === 1) {
                  this.queryInfo.insurecomcode = res.data.data.data[0].comCode
                  this.queryInfo.insurecomname = res.data.data.data[0].comCName.replace(/天安佰盈保险销售有限公司/, '')
                }
              }
            })
            break
          case 3:
            this.tdWorkerData.clickType = '1'
            this.tdWorkerData.agentcode = this.queryInfo.agentcode
            this.tdWorkerData.agentname = this.queryInfo.agentname
            this.tdWorkerQuery(this.tdWorkerData).then(
              (res) => {
                if (res.data.code !== '000000' && !IsEmpty(res.data.code)) {
                  this.openToast('warning', res.data.msg)
                } else {
                  if (res.data.data.data.length === 1) {
                    this.queryInfo.agentcode = res.data.data.data[0].agentCode
                    this.queryInfo.agentname = res.data.data.data[0].agentName
                  }
                }
              })
            break
          case 4:
            // baiyingWorkerQuery baiyingWorkerData
            this.baiyingWorkerData.clickType = '1'
            this.baiyingWorkerData.agentCode = this.detailDialogData.instructcode
            this.baiyingWorkerData.agentName = this.detailDialogData.instructname
            this.baiyingWorkerQuery(this.baiyingWorkerData).then(
              (res) => {
                if (res.data.code !== '000000' && !IsEmpty(res.data.code)) {
                  this.openToast('warning', res.data.msg)
                } else {
                  if (res.data.data.data.length === 1) {
                    this.detailDialogData.instructcode = res.data.data.data[0].agentCode
                    this.detailDialogData.instructname = res.data.data.data[0].agentName
                  }
                }
              })
            break
          case 5:
            // contiListCheckDialogDataGet2
            this.detailDijiQueryData.comcode = this.detailDialogData.insurecomcode
            this.detailDijiQueryData.comname = this.detailDialogData.insurecomname
            this.detailDijiQueryData.clickType = '1'
            this.ultimateBaiyingCompanyQuery(this.detailDijiQueryData).then(
              (res) => {
                if (res.data.code !== '000000' && !IsEmpty(res.data.code)) {
                  this.openToast('warning', res.data.msg)
                } else {
                  if (res.data.data.data.length === 1) {
                    this.detailDialogData.insurecomcode = res.data.data.data[0].comCode
                    this.detailDialogData.insurecomname = res.data.data.data[0].comCName.replace(/天安佰盈保险销售有限公司/, '')
                  }
                }
              })
            break
          case 6:
            // baiyingWorkerQuery baiyingUpperWorkerData
            this.baiyingUpperWorkerData.clickType = '1'
            this.baiyingUpperWorkerData.agentCode = this.detailDialogData.highercode
            this.baiyingUpperWorkerData.agentName = this.detailDialogData.highername
            this.baiyingWorkerQuery(this.baiyingUpperWorkerData).then(
              (res) => {
                if (res.data.code !== '000000' && !IsEmpty(res.data.code)) {
                  this.openToast('warning', res.data.msg)
                } else {
                  if (res.data.data.data.length === 1) {
                    this.detailDialogData.highercode = res.data.data.data[0].agentCode
                    this.detailDialogData.highername = res.data.data.data[0].agentName
                  }
                }
              })
            break
        }
      }
    },
    querySearchAsync (queryString, cb) {
      let self = this
      // 查询省份 cb callBack方法
      this.getProvinces().then(
        () => {
          cb(self.provinceOptions)
        }
      )
      // this.searchPro({
      //   codeOrName: queryString,
      //   provinceOrCity: 'province'
      // }).then(resp => {
      //   this.proSearch = resp
      //   cb(this.proSearch)
      // })
    },
    querySearchAsync1 (queryString, cb) {
      // 查询省份 cb callBack方法
      let self = this
      this.getCities(self.detailComputedObj1.id1).then(
        () => {
          cb(self.cityOptions)
        }
      )
      // this.searchPro({
      //   codeOrName: queryString,
      //   provinceOrCity: 'province'
      // }).then(resp => {
      //   this.proSearch = resp
      //   cb(this.proSearch)
      // })
    },
    querySearchAsync2 (queryString, cb) {
      let self = this
      // 查询省份 cb callBack方法
      let temp = {
        name: queryString
      }
      this.getBanks(temp).then(
        () => {
          cb(self.bankOptions)
        }
      )
      // this.searchPro({
      //   codeOrName: queryString,
      //   provinceOrCity: 'province'
      // }).then(resp => {
      //   this.proSearch = resp
      //   cb(this.proSearch)
      // })
    },
    querySearchAsync3 (queryString, cb) {
      this.Loading()
      api('/tdEmpIntern/getKunlunCompany', 'post', {'klprojectcompany': queryString, 'klprojectcompanycode': '', 'currentPage': 1, 'pageSize': 50}).then((res) => {
        this.closeLoading()
        if (res.data.code !== '000000' && !IsEmpty(res.data.code)) {
          this.openToast('warning', res.data.msg)
        } else {
          cb(res.data.data.data)
        }
      })
    },
    detailClosing () {
      this.detailDialogVis = false
      this.queryData()
      this.initDialogData()
    },
    initDialogData () {
      this.detailDialogData = {
        agentcode: '',
        agentname: '',
        identifytype: '',
        identifynumber: '',
        birthday: '',
        sex: '', // 传数字0女1男
        education: '', // 传数字1小学，2初中，3高中，4大专，5本科，6硕士，7博士，8其他，9中专
        mobile: '',
        bank: '',
        account: '',
        accountname: '',
        accounthome: '',
        instructcode: '',
        instructname: '',
        insurecomcode: '',
        insurecomname: '',
        channel: '', // 传数字2同道人员4线下代理人
        type: 3, // 传数字 3代理制
        klprojectcompany: '',
        klprojectcompanycode: '',
        rank: '',
        zhanyecardnum: '',
        employDate: '',
        highercode: '',
        highername: '',
        freeTax: '',
        ecpname: '',
        ecptel: '',
        freshstatus: '0',
        workhistory: '',
        reviewresult: '',
        reviews: ''
      }
      this.freshstatus = false
      this.workhistory = []
      this.traceData = {
        agentcode: '',
        currentPage: 1,
        pageSize: 5
      }
      this.tdRank = ''
      this.tdChannel = ''
      this.shenheInput = {
        checkCode: '',
        content: ''
      }
      this.cityOptions = [] // 市,
      this.bankOptions = [] // 可以选择的银行
      this.rankOptions = []
      this.detailComputedObj1 = {
        province: '',
        city: '',
        id1: '',
        id2: ''
      }
    },
    comDialogClosing (index) {
      this.comDialog1 = false
      this.comDialog2 = false
      this.comDialog3 = false
      this.comDialog4 = false
      this.comDialog5 = false
      this.comDialog6 = false
      this.initshuangjiDialog()
      switch (index) {
        case 1:
          this.queryInfo.insurecode = ''
          this.queryInfo.insurename = ''
          break
        case 2:
          this.queryInfo.insurecomcode = ''
          this.queryInfo.insurecomname = ''
          break
        case 3:
          this.queryInfo.agentcode = ''
          this.queryInfo.agentname = ''
          break
        case 4:
          this.detailDialogData.instructcode = ''
          this.detailDialogData.instructname = ''
          break
        case 5:
          this.detailDialogData.insurecomcode = ''
          this.detailDialogData.insurecomname = ''
          break
        case 6:
          this.detailDialogData.highercode = ''
          this.detailDialogData.highername = ''
          break
      }
    },
    initshuangjiDialog () {
      this.shengjiQueryData = {
        clickType: '2',
        comCodeOrName: '',
        currentPage: 1,
        pageSize: 10
      }
      this.dijiQueryData = {
        clickType: '2',
        upperComCode: '',
        comCodeOrName: '',
        currentPage: 1,
        pageSize: 10
      }
      this.tdWorkerData = {
        clickType: '2',
        agentcode: '',
        agentname: '',
        currentPage: 1,
        pageSize: 10
      }
      this.baiyingWorkerData = {
        agentCode: '',
        agentName: '',
        comCode: '',
        comName: '',
        clickType: 2,
        currentPage: 1,
        pageSize: 10
      }
      this.baiyingUpperWorkerData = {
        agentCode: '',
        agentName: '',
        comCode: '',
        comName: '',
        clickType: 2,
        currentPage: 1,
        pageSize: 10
      }
      this.detailDijiQueryData = {
        comcode: '',
        comname: '',
        type: '2', // 1只找总公司和省级，2只找市级，不填找全部
        upcode: '', // 根据省级找市级时用，可以不填
        currentPage: 1,
        pageSize: 10,
        clickType: '2'
      }
    },
    checkoutPic (index) { // 预览功能，random确保不会获取上次缓存的数据
      switch (index) {
        case 1:
          if (IsEmpty(this.detailDialogData.personimg)) {
            this.openToast('warning', '未上传个人照片')
          } else {
            window.open(this.detailDialogData.personimg + '?random=' + Math.random())
          }
          break
        case 2:
          if (IsEmpty(this.detailDialogData.idcardimg1)) {
            this.openToast('warning', '未上传身份证正面图片')
          } else {
            window.open(this.detailDialogData.idcardimg1 + '?random=' + Math.random())
          }
          break
        case 3:
          if (IsEmpty(this.detailDialogData.idcardimg2)) {
            this.openToast('warning', '未上传身份证反面图片')
          } else {
            window.open(this.detailDialogData.idcardimg2 + '?random=' + Math.random())
          }
          break
        case 4:
          if (IsEmpty(this.detailDialogData.educationimg)) {
            this.openToast('warning', '未上传学历证书图片')
          } else {
            window.open(this.detailDialogData.educationimg + '?random=' + Math.random())
          }
          break
        case 5:
          if (IsEmpty(this.detailDialogData.bankimg)) {
            this.openToast('warning', '未上传银行卡图片')
          } else {
            window.open(this.detailDialogData.bankimg + '?random=' + Math.random())
          }
          break
        case 6:
          if (IsEmpty(this.detailDialogData.contractimg)) {
            this.openToast('warning', '未上传未盖章合同')
          } else {
            window.open(this.detailDialogData.contractimg + '?random=' + Math.random())
          }
          break
        case 7:
          if (IsEmpty(this.detailDialogData.sealelectroniccontractphoto)) {
            this.openToast('warning', '未上传已盖章合同')
          } else {
            window.open(this.detailDialogData.sealelectroniccontractphoto + '?random=' + Math.random())
          }
          break
        default:
          break
      }
    },
    downloadPic (index) { // 下载附件
      switch (index) {
        case 1:
          if (IsEmpty(this.detailDialogData.personimg)) {
            this.openToast('warning', '未上传个人照片')
          } else {
            this.downloadPicGo(this.detailDialogData.personimg)
          }
          break
        case 2:
          if (IsEmpty(this.detailDialogData.idcardimg1)) {
            this.openToast('warning', '未上传身份证正面图片')
          } else {
            this.downloadPicGo(this.detailDialogData.idcardimg1)
          }
          break
        case 3:
          if (IsEmpty(this.detailDialogData.idcardimg2)) {
            this.openToast('warning', '未上传身份证反面图片')
          } else {
            this.downloadPicGo(this.detailDialogData.idcardimg2)
          }
          break
        case 4:
          if (IsEmpty(this.detailDialogData.educationimg)) {
            this.openToast('warning', '未上传学历证书图片')
          } else {
            this.downloadPicGo(this.detailDialogData.educationimg)
          }
          break
        case 5:
          if (IsEmpty(this.detailDialogData.bankimg)) {
            this.openToast('warning', '未上传银行卡图片')
          } else {
            this.downloadPicGo(this.detailDialogData.bankimg)
          }
          break
        case 6:
          if (IsEmpty(this.detailDialogData.contractimg)) {
            this.openToast('warning', '未上传未盖章合同')
          } else {
            this.downloadPicGo(this.detailDialogData.contractimg)
          }
          break
        case 7:
          if (IsEmpty(this.detailDialogData.sealelectroniccontractphoto)) {
            this.openToast('warning', '未上传已盖章合同')
          } else {
            this.downloadPicGo(this.detailDialogData.sealelectroniccontractphoto)
          }
          break
        default:
          break
      }
    },
    changePic (index) {
      switch (index) {
        case 1:
          this.changePicDialog1 = true
          this.fileList[0] = []
          break
        case 2:
          this.changePicDialog2 = true
          this.fileList[1] = []
          break
        case 3:
          this.changePicDialog3 = true
          this.fileList[2] = []
          break
        case 4:
          this.changePicDialog4 = true
          this.fileList[3] = []
          break
        case 5:
          this.changePicDialog5 = true
          this.fileList[4] = []
          break
        case 7:
          this.changePicDialog7 = true
          this.fileList[5] = []
          break
        default:
          break
      }
    },
    downloadPicGo (url) {
      const $a = document.createElement('a')
      $a.setAttribute('href', '/tabycore/tdEmpIntern/pictureDownLoad?fileName=' + url + '')
      $a.setAttribute('download', url)
      $a.click()
    },
    addFile (index, file, fileList) {
      this.changeFileFlag[index].push(1)
    },
    examine () {
      if (this.shenheStatus === 'a' && this.orgId === '01') {
        this.openToast('warning', '该审核节点为分公司待审核！')
        return
      } else if (this.shenheStatus === 'b' && this.orgId !== '01') {
        this.openToast('warning', '该审核节点为总公司待审核！')
        return
      } else if (this.shenheStatus === 'd' && this.orgId === '01') {
        this.openToast('warning', '该审核节点为分公司待审核！')
        return
      }
      this.dialogTableVisibleCheck = true
    },
    goodToGo () {
      let tempBool = true
      this.detailDialogData.reviewresult = this.shenheInput.checkCode
      this.detailDialogData.reviews = this.shenheInput.content
      if (IsEmpty(this.detailDialogData.reviewresult)) {
        this.openToast('warning', '请选择审核意见')
      } else if (this.detailDialogData.reviewresult === '1') { // 审核不通过，不需要进行校验直接提交
        this.detailDialogData.insurecomname = '天安佰盈保险销售有限公司' + this.detailDialogData.insurecomname
        api('/tdEmpIntern/review', 'post', this.detailDialogData).then((res) => {
          this.closeLoading()
          if (res.data.code !== '000000' && !IsEmpty(res.data.code)) {
            this.openToast('warning', res.data.msg)
          } else {
            this.shenheInput.checkCode = ''
            this.shenheInput.content = ''
            this.openToast('success', res.data.msg)
            this.dialogTableVisibleCheck = false
            this.detailDialogVis = false
            this.queryData()
            this.initDialogData()
          }
        })
      } else { // 审核通过，进行非空校验
        if (
          IsEmpty(this.detailDialogData.education) ||
          IsEmpty(this.detailDialogData.mobile) ||
          IsEmpty(this.detailDialogData.bank) ||
          IsEmpty(this.detailDialogData.account) ||
          IsEmpty(this.detailDialogData.accountname) ||
          IsEmpty(this.detailDialogData.accounthome) ||
          IsEmpty(this.detailDialogData.insurecomcode) ||
          IsEmpty(this.detailDialogData.insurecomname) ||
          IsEmpty(this.detailDialogData.zhanyecardnum) ||
          IsEmpty(this.detailDialogData.employDate) ||
          IsEmpty(this.detailDialogData.type) ||
          IsEmpty(this.detailDialogData.rank) ||
          IsEmpty(this.detailDialogData.channel)
          //所属项目公司临时注释
          // ||
          // (IsEmpty(this.detailDialogData.klprojectcompany) && this.isKunlun)
        ) {
          tempBool = false
        } else {
          // if (IsEmpty(this.detailDialogData.ecptel) || IsEmpty(this.detailDialogData.ecpname)) {
          //   this.openToast('warning', '请输入相关必填项！')
          //   return false
          // } else {
          //   if (!this.freshstatus && this.workhistory.length === 0) {
          //     this.openToast('error', '请填入工作经历', 0)
          //     return false
          //   } else if (!this.freshstatus && this.workhistory.length !== 0) {
          //       // 非应届生
          //     for (let i = 0; i < this.workhistory.length; i++) {
          //       for (const key in this.workhistory[i]) {
          //         if (this.workhistory[i].hasOwnProperty(key)) {
          //           if (!this.workhistory[i][key]) {
          //             let workhistoryEnum = {
          //               'company': '公司名称',
          //               'position': '职位名称',
          //               'entry': '入职日期',
          //               'leave': '离职日期'
          //             }
          //             this.openToast('error', `您的工作经历，${workhistoryEnum[key]}字段没有填写完成，请完善`, 0)
          //             return false
          //           }
          //         }
          //       }
          //     }
          //   }
          // }
        }
        if (tempBool) {
        // freshstatus转换
          if ((!IsEmpty(this.detailDialogData.ecptel) || !IsEmpty(this.detailDialogData.ecpname)) && IsEmpty(this.detailDialogData.freshstatus)) {
            this.detailDialogData.freshstatus = '0'
          }
          this.detailDialogData.insurecomname = '天安佰盈保险销售有限公司' + this.detailDialogData.insurecomname
          api('/tdEmpIntern/review', 'post', this.detailDialogData).then((res) => {
            this.closeLoading()
            if (res.data.code !== '000000' && !IsEmpty(res.data.code)) {
              this.openToast('warning', res.data.msg)
            } else {
              this.shenheInput.checkCode = ''
              this.shenheInput.content = ''
              this.openToast('success', res.data.msg)
              this.dialogTableVisibleCheck = false
              this.detailDialogVis = false
              this.queryData()
              this.initDialogData()
            }
          })
        } else {
          this.openToast('warning', '请输入相关必填项！')
        }
      }
    },
    changeChannel (value) {
      // channel 4 rank 4
      if (value === '4' && !IsEmpty(this.detailDialogData.rank)) {
        this.detailDialogData.rank = ''
      }
      if (this.detailDialogData.channel === '4' && parseInt(this.tdRank) >= 5) {
        // 顶级创业合伙人、资深创业合伙人、高级创业合伙人、中级创业合伙人、初级创业合伙人
        this.rankOptions = [
          {name: '初级创业合伙人', id: '5', index: 5},
          {name: '中级创业合伙人', id: '6', index: 4},
          {name: '高级创业合伙人', id: '7', index: 3},
          {name: '资深创业合伙人', id: '8', index: 2},
          {name: '顶级创业合伙人', id: '9', index: 1}
        ]
      } else if (this.detailDialogData.channel === '4' && parseInt(this.tdRank) <= 3) {
        this.rankOptions = [
          {name: '营销员', id: '3', index: 3},
          {name: '营业部经理', id: '2', index: 2},
          {name: '营业区总监', id: '1', index: 1}
        ]
      } else if (this.detailDialogData.channel === '2') {
        this.rankOptions = [
          {name: '线上代理人', id: '1', index: 1}
        ]
      }
      if (this.tdRank === '1' && this.tdChannel === '2') {
        if (this.detailDialogData.channel === '4') {
          this.rankOptions = [
            {name: '营销员', id: '3', index: 3},
            {name: '营业部经理', id: '2', index: 2},
            {name: '营业区总监', id: '1', index: 1}
          ]
        }
      }
    },
    changeComdialogPage1 (data) {
      this.shengjiQueryData.currentPage = data
      this.openComDialog(1)
    },
    changeComdialogPage2 (data) {
      this.dijiQueryData.currentPage = data
      this.openComDialog(2)
    },
    changeComdialogPage3 (data) {
      this.tdWorkerData.currentPage = data
      this.openComDialog(3)
    },
    changeComdialogPage4 (data) {
      this.baiyingWorkerData.currentPage = data
      this.openComDialog(4)
    },
    changeComdialogPage5 (data) {
      this.detailDijiQueryData.currentPage = data
      this.openComDialog(5)
    },
    changeComdialogPage6 (data) {
      this.baiyingUpperWorkerData.currentPage = data
      this.openComDialog(6)
    },
    changeComdialogPageSize1 (data) {
      this.shengjiQueryData.currentPage = 1
      this.shengjiQueryData.pageSize = data
      this.openComDialog(1)
    },
    changeComdialogPageSize2 (data) {
      this.dijiQueryData.currentPage = 1
      this.dijiQueryData.pageSize = data
      this.openComDialog(2)
    },
    changeComdialogPageSize3 (data) {
      this.tdWorkerData.currentPage = 1
      this.tdWorkerData.pageSize = data
      this.openComDialog(3)
    },
    changeComdialogPageSize4 (data) {
      this.baiyingWorkerData.currentPage = 1
      this.baiyingWorkerData.pageSize = data
      this.openComDialog(4)
    },
    changeComdialogPageSize5 (data) {
      this.detailDijiQueryData.currentPage = 1
      this.detailDijiQueryData.pageSize = data
      this.openComDialog(5)
    },
    changeComdialogPageSize6 (data) {
      this.baiyingUpperWorkerData.currentPage = 1
      this.baiyingUpperWorkerData.pageSize = data
      this.openComDialog(6)
    },
    dialogBackData1 (data) {
      this.initshuangjiDialog()
      this.comDialog1 = false
      let temp = []
      temp = data.split('-')
      this.queryInfo.insurecode = temp[0]
      this.queryInfo.insurename = temp[1]
    },
    dialogBackData2 (data) {
      this.initshuangjiDialog()
      this.comDialog2 = false
      let temp = []
      temp = data.split('-')
      this.queryInfo.insurecomcode = temp[0]
      this.queryInfo.insurecomname = temp[1]
    },
    dialogBackData3 (data) {
      this.initshuangjiDialog()
      this.comDialog3 = false
      let temp = []
      temp = data.split('-')
      this.queryInfo.agentcode = temp[0]
      this.queryInfo.agentname = temp[1]
    },
    dialogBackData4 (data) {
      this.initshuangjiDialog()
      this.comDialog4 = false
      let temp = []
      temp = data.split('-')
      this.detailDialogData.instructcode = temp[0]
      this.detailDialogData.instructname = temp[1]
    },
    dialogBackData5 (data) {
      this.initshuangjiDialog()
      this.comDialog5 = false
      let temp = []
      temp = data.split('-')
      this.detailDialogData.insurecomcode = temp[0]
      this.detailDialogData.insurecomname = temp[1]
    },
    dialogBackData6 (data) {
      this.initshuangjiDialog()
      this.comDialog6 = false
      let temp = []
      temp = data.split('-')
      this.detailDialogData.highercode = temp[0]
      this.detailDialogData.highername = temp[1]
    }
  },
  computed: {
    orgId () {
      return this.$store.state.login.showComName.split('(')[1].split(')')[0]
    },
    userCode () {
      return this.$store.state.login.showUserId.split('(')[1].split(')')[0]
    },
    userName () {
      return this.$store.state.login.showUserId.split('(')[0]
    },
    userId () {
      return this.$store.state.login.loginUserId
    },
    localID () {
      return document.location.hostname
    }
  },
  mounted () {
  },
  watch: {
    detailDialogData: {
      handler (newValue, oldValue) {
        if (newValue.channel === '2' && newValue.rank > 1) {
          this.detailDialogData.rank = ''
        }
        if (IsEmpty(newValue.workhistory)) {
          this.workhistory = []
        } else {
          this.workhistory = JSON.parse(newValue.workhistory)
        }
        if (newValue.freshstatus === '0') {
          this.freshstatus = false
        } else if (newValue.freshstatus === '1') {
          this.freshstatus = true
        }
        // .type" slot="text" placeholder="请选择">
        //             <el-option label="代理制" value="3"></el-option>
        //             <el-option label="代理制-昆仑" value="6"></el-option>
        // eslint-disable-next-line eqeqeq
        if (newValue.type == '6') {
          this.isKunlun = false
          // this.isKunlun = true //所属项目公司临时注释

          // this.isKunlun = false
        } else {
          this.isKunlun = false
        }
      },
      deep: true
    },
    'isKunlun': function (newVal, oldVal) {
      if (newVal === false) {
        this.detailDialogData.klprojectcompany = ''
        this.detailDialogData.klprojectcompanycode = ''
      }
    },
    workhistory: {
      handler (newValue, oldValue) {
        this.detailDialogData.workhistory = JSON.stringify(newValue)
      },
      deep: true
    },
    'freshstatus': function (newVal, oldVal) {
      if (newVal === true) {
        this.newExpDisabled = true
        this.workhistory = []
        this.detailDialogData.workhistory = ''
        this.detailDialogData.freshstatus = '1'
      } else if (newVal === false) {
        this.newExpDisabled = false
        this.detailDialogData.freshstatus = '0'
      }
    },
    'queryInfo.channel' () {
      this.queryInfo.rank = ''
    },
    'queryInfo.insurecode' () {
      if (this.queryInfo.insurecode === '') {
        this.queryInfo.insurename = ''
      }
    },
    'queryInfo.insurename' () {
      if (this.queryInfo.insurename === '') {
        this.queryInfo.insurecode = ''
      }
    },
    'queryInfo.insurecomcode' () {
      if (this.queryInfo.insurecomcode === '') {
        this.queryInfo.insurecomname = ''
      }
    },
    'queryInfo.insurecomname' () {
      if (this.queryInfo.insurecomname === '') {
        this.queryInfo.insurecomcode = ''
      }
    },
    'queryInfo.agentcode' () {
      if (this.queryInfo.agentcode === '') {
        this.queryInfo.agentname = ''
      }
    },
    'queryInfo.agentname' () {
      if (this.queryInfo.agentname === '') {
        this.queryInfo.agentcode = ''
      }
    },
    'detailDialogData.instructcode' () {
      if (this.detailDialogData.instructcode === '') {
        this.detailDialogData.instructname = ''
      }
    },
    'detailDialogData.instructname' () {
      if (this.detailDialogData.instructname === '') {
        this.detailDialogData.instructcode = ''
      }
    },
    'detailDialogData.insurecomcode' () {
      if (this.detailDialogData.insurecomcode === '') {
        this.detailDialogData.insurecomname = ''
      }
    },
    'detailDialogData.insurecomname' () {
      if (this.detailDialogData.insurecomname === '') {
        this.detailDialogData.insurecomcode = ''
      }
    },
    'detailDialogData.highercode' () {
      if (this.detailDialogData.highercode === '') {
        this.detailDialogData.highername = ''
      }
    },
    'detailDialogData.highername' () {
      if (this.detailDialogData.highername === '') {
        this.detailDialogData.highercode = ''
      }
    },
    detailComputedObj1: {
      handler (newValue, oldValue) {
        if (!IsEmpty(newValue.id2)) {
          this.detailDialogData.accounthome = newValue.id2
        } else {
          this.detailDialogData.accounthome = newValue.id1
        }
        if (IsEmpty(newValue.province)) {
          this.detailComputedObj1.city = ''
          this.detailComputedObj1.id2 = ''
        }
      },
      deep: true
    }
  },
  components: {
    [NoticeBar.name]: NoticeBar,
    [LineTittle.name]: LineTittle,
    [LabelText.name]: LabelText,
    [LabelText2.name]: LabelText2,
    [LabelText3.name]: LabelText3,
    ComDialog
  }
}
</script>

<style lang="scss" scoped type="text/css">
#orgadd {padding-left: 30px;padding-right: 30px;}
.btn-container{text-align: center;margin-top: 60px;margin-bottom: 30px;}
.ri-line{margin-top: 10px;margin-bottom: 10px;}
.datestyle{color: #717171;font-size: 0.875rem;display: inline-block;width: 120px;}
.datestyle1{color: #717171;font-size: 0.875rem;display: inline-block;text-align: center;width: 60px;}
.el-pagination{float: right;padding-right: 20px;}
.center{text-align: center}
.orgInfoTable{text-align: center}
.orgInfoTable tr{height: 40px}
.orgInfoTable td{ width: 15%;height: 2rem}
.head{background: #d3e7fa;color: #2585e6;height: 40px}
.IDRequired:before{
    content: '*';
    font-size: 24px;
    font-weight: bolder;
    color: #ff7777;
    position: relative;
    top: 7px;
}
.IDRequired {
  color: #717171;
  font-size: 0.83rem;
  display: inline-block;
  width: 6rem;
}
.IDNotRequired {
  color: #717171;
  font-size: 0.83rem;
  display: inline-block;
  width: 6rem;
}
.tableButton {
  cursor: pointer;
  color: #66B1FF;
}
.upload-content{
  width: 100%;
  text-align: center;
  }
.block {
  position: relative;
  bottom: 10px;
  margin-top: 40px;

}
</style>
