<template>
	<div class="wrap">
		<ui-notice-bar slot="breadcast">
			<el-breadcrumb slot="location" separator=">">
				<el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
				<el-breadcrumb-item>寿险业务管理</el-breadcrumb-item>
				<el-breadcrumb-item>寿险投保单管理</el-breadcrumb-item>
				<el-breadcrumb-item>超级权限投保单修改</el-breadcrumb-item>
			</el-breadcrumb>
		</ui-notice-bar>
		<el-form>
			<el-row class="ri-line">
				<el-col :span="12">
					<ui-label-text label="归属机构代码:" labelWidth="180" >
						<el-input slot="text" v-model="info.comCode" clearable placeholder="双击可选择" @dblclick.native="searchOrg(1)"  @blur="searchOrg1(1)"></el-input>
					</ui-label-text>
				</el-col>
				<el-col :span="12">
					<ui-label-text label="归属机构名称:" labelWidth="180"  >
						<el-input slot="text"  v-model="info.comName" clearable placeholder="双击可选择" @dblclick.native="searchOrg2(1)" @blur="searchOrg3(1)"></el-input>
					</ui-label-text>
				</el-col>
			</el-row>
			<el-row class="ri-line">
				<el-col :span="12">
					<ui-label-text label="归属保险公司代码:" labelWidth="180" >
						<el-input slot="text" v-model="info.companyCode" clearable placeholder="双击可选择" @dblclick.native="searchCom(1,0)" @blur="searchCom1(1,0)" ></el-input>
					</ui-label-text>
				</el-col>
				<el-col :span="12">
					<ui-label-text label="归属保险公司名称:" labelWidth="180"  >
						<el-input slot="text" v-model="info.companyName" clearable placeholder="双击可选择" @dblclick.native="searchCom2(1,0)" @blur="searchCom3(1,0)"></el-input>
					</ui-label-text>
				</el-col>
			</el-row>
			<el-row class="ri-line">
				<el-col :span="12">
					<ui-label-text label="投保单号:" labelWidth="180" >
						<el-input slot="text" v-model="info.proposalNo"></el-input>
					</ui-label-text>
				</el-col>
				<el-col :span="12">
					<ui-label-text label="出单渠道:" labelWidth="180" >
						<el-select v-model="info.businessNature" slot="text" placeholder="请选择">
							<el-option label="佰盈销售" value="1"></el-option>
							<el-option label="同道" value="4"></el-option>
						</el-select>
					</ui-label-text>
				</el-col>
			</el-row>
			<el-row class="ri-line">
				<el-col :span="12">
					<ui-label-text label="业务员代码:" labelWidth="180" >
						<el-input slot="text" v-model="info.handlerCode" clearable placeholder="双击可选择" @dblclick.native="searchSeller(1)" @blur="searchSeller1(1)"></el-input>
					</ui-label-text>
				</el-col>
				<el-col :span="12">
					<ui-label-text label="业务员姓名:" labelWidth="180">
						<el-input slot="text" v-model="info.handlerName" clearable placeholder="双击可选择" @dblclick.native="searchSeller2(1)" @blur="searchSeller3(1)"></el-input>
					</ui-label-text>
				</el-col>
			</el-row>
			<el-row class="ri-line">
				<el-col :span="12">
					<ui-label-text label="投保人名称:" labelWidth="180">
						<el-input slot="text" v-model="info.insureName" ></el-input>
					</ui-label-text>
				</el-col>
				<el-col :span="12">
					<ui-label-text label="被保险人名称:" labelWidth="180">
						<el-input slot="text" v-model="info.insureNameD" ></el-input>
					</ui-label-text>
				</el-col>
			</el-row>
			<el-row class="ri-line">
				<el-col :span="24">
					<div class="datestyle" labelWidth="150">投保日期:</div>
					<el-date-picker v-model="info.startDate" value-format="yyyy-MM-dd" type="date" placeholder="选择开始日期"></el-date-picker>
					<div class="datestyle1" labelWidth="150">至</div>
					<el-date-picker v-model="info.endDate" value-format="yyyy-MM-dd" type="date" placeholder="选择结束日期"></el-date-picker>
				</el-col>
			</el-row>
			<el-row class="ri-line">
				<el-col :span="12" >
					<ui-label-text  label="审核状态:" labelWidth="180">
						<el-select v-model="info.verifyStatus" slot="text"  placeholder="请选择">
						<el-option
											v-for="item in verifyStatusItem"
											:key="item.value"
											:label="item.label"
											:value="item.value">
										</el-option>
						</el-select>
					</ui-label-text>
				</el-col>
			</el-row>
			<div class='btn-container'>
				<el-button type="primary" @click.native.prevent="query(1)">查询</el-button>
				<el-button size="primary" @click="handlemod()" >修改</el-button>
			</div>
		</el-form>
    <el-table ref="multipleTable" stripe @selection-change="handleSelectionChange" v-if='isShowTable' :data="tableData" tooltip-effect="dark" style="width: 100%" >
      <el-table-column type="selection" width="30"></el-table-column>
      <el-table-column prop="proposalNo" label="投保单号"  width="120">
        <template slot-scope="scope">
          <a href="javascript:void(0)" class="astyle"  @click="detail(scope.row)">{{scope.row.proposalNo}}</a>
        </template>
      </el-table-column>
      <el-table-column prop="comName" label="归属机构名称" ></el-table-column>
      <el-table-column prop="companyName" label="归属保险公司名称" ></el-table-column>
      <el-table-column prop="handlerName" label="业务员名称" width="120"></el-table-column>
      <el-table-column prop="insureName" label="投保人名称" width="120"></el-table-column>
      <el-table-column prop="insuredName" label="被保险人名称" show-overflow-tooltip></el-table-column>
      <el-table-column prop="updateTime" label="更新时间" show-overflow-tooltip></el-table-column>
      <el-table-column prop="verifyStatus" label="审核状态" show-overflow-tooltip>
        <template slot-scope="scope">
          <div v-if="scope.row.verifyStatus === '1'">
            <span >未提交审核</span>
          </div>
          <div v-if="scope.row.verifyStatus === '2'">
            <span >提交审核</span>
          </div>
          <div v-if="scope.row.verifyStatus === '3'">
            <span >审核通过</span>
          </div>
          <div v-if="scope.row.verifyStatus === '9'">
            <span >审核不通过</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="applyType" label="审核类型" show-overflow-tooltip>
        <template slot-scope="scope">
          <div v-if="scope.row.applyType === '1'">
            <span >新增审核</span>
          </div>
          <div v-if="scope.row.applyType === '2'">
            <span >修改审核</span>
          </div>
        </template>
      </el-table-column>
    </el-table>
    <div class="block" v-if='isShowTable'>
    	<el-pagination
    		@current-change="handleCurrentChange1"
    		@size-change="queryPageSize1"
    		:current-page="info.currentPage"
    		:page-sizes="sizeList"
    		:page-size="100"
    		layout="total, sizes, prev, pager, next, jumper"
    		:total="totalRecords == totalRecords ? totalRecords : 0">
    	</el-pagination>
    </div>
    <!--edit-->
    <el-dialog append-to-body center title="投保单修改" :before-close="dialogClose"  :visible.sync="editVisible" width="90%">
      <lifeInsurEdit :isEdit="isEdit" :isSuper="true" :data="EditData" ref="lifeInsurEdit"></lifeInsurEdit>
    </el-dialog>
    <el-dialog :append-to-body="true" width="65%" center :before-close="orgClose" title="归属机构" :visible.sync="dialogsustomerOrg">
      <el-table stripe ref="multipleTable" @row-click="customerinOrg" :data="customOfOrg" tooltip-effect="dark" style="width: 100%">
        <el-table-column prop="comCode"  label="佰盈机构代码" show-overflow-tooltip>
        </el-table-column>
        <el-table-column prop="comCName" label="佰盈机构名称" show-overflow-tooltip>
        </el-table-column>
      </el-table>
      <div class="block" style="margin-top:15px;padding-bottom:15px">
        <el-pagination
          @current-change="handleCurrentChangeCode"
          @size-change="handleSizeChange"
          :current-page.sync="info.currentPage"
          :page-sizes="sizeList"
          :page-size="100"
          layout="total, sizes, prev, pager, next, jumper"
          :total="totalsOrg == totalsOrg ? totalsOrg : 0">
        </el-pagination>
      </div>
    </el-dialog>
    <el-dialog :append-to-body="true" center width="90%" title="投保单详细信息" :visible.sync="dialogTableVisibleQuery">
          <!--基本信息-->
          <ui-line-tittle :collapsible="true" >
            <span slot="title" >
                <i class="font_family icon-jy-menu-4" ></i>基本信息
            </span>
            <div class="ri-content" style="padding-left:40px" slot="content">
              <el-row class="ri-line">
                <el-col :span="12">
                  <ui-label-text label="投保单号:" required="true" labelWidth="230">
                    <el-input slot="text" readonly v-model="lifePCMain.proposalNo" ></el-input>
                  </ui-label-text>
                </el-col>
                <el-col :span="12">
                  <ui-label-text label="投保日期:" required="true" labelWidth="230">
                    <!-- <el-input slot="text" readonly v-model="lifePCMain.proposalDate" ></el-input> -->
                    <el-date-picker
                        slot="text"
                        v-model="lifePCMain.proposalDate"
                        type="date"
                        disabled

                        placeholder="选择日期"> </el-date-picker>
                  </ui-label-text>
                </el-col>
              </el-row>
              <el-row class="ri-line">
                <el-col :span="12">
                  <ui-label-text label="归属保险公司代码:" required="true" labelWidth="230">
                    <el-input slot="text" readonly v-model="lifePCMain.companyCode" ></el-input>
                  </ui-label-text>
                </el-col>
                <el-col :span="12">
                  <ui-label-text label="归属保险公司名称:" required="true" labelWidth="230">
                    <el-input slot="text" readonly v-model="lifePCMain.companyName" ></el-input>
                  </ui-label-text>
                </el-col>
              </el-row>
              <el-row class="ri-line">
                <el-col :span="12">
                  <ui-label-text label="归属保险公司机构代码:" required="true" labelWidth="230">
                    <el-input slot="text" readonly v-model="lifePCMain.companyComCode" ></el-input>
                  </ui-label-text>
                </el-col>
                <el-col :span="12">
                  <ui-label-text label="归属保险公司机构名称:" required="true" labelWidth="230">
                    <el-input slot="text" readonly v-model="lifePCMain.companyComName" ></el-input>
                  </ui-label-text>
                </el-col>
              </el-row>
              <el-row class="ri-line">
                <el-col :span="12">
                  <ui-label-text label="新/续保标记:" labelWidth="230">
                    <el-input slot="text" readonly v-model="lifePCMain.insuranceMark" ></el-input>
                  </ui-label-text>
                </el-col>
                <el-col :span="12">
                  <ui-label-text label="是否自动续保:" required="true" labelWidth="230">
                    <el-select v-model="lifePCMain.atuoAcceptFlag" disabled slot="text" placeholder="请选择">
                      <el-option label="是" value="1"></el-option>
                      <el-option label="否" value="0"></el-option>
                    </el-select>
                  </ui-label-text>
                </el-col>
              </el-row>
              <el-row class="ri-line">
                <el-col :span="12">
                  <ui-label-text label="出单渠道:" labelWidth="230">
                    <el-select v-model="lifePCMain.businessNature" disabled slot="text" placeholder="请选择">
                      <el-option label="佰盈销售" value="1"></el-option>
                      <el-option label="同道" value="4"></el-option>
                    </el-select>
                  </ui-label-text>
                </el-col>
                <el-col :span="12">
                  <ui-label-text label="业务类型:" labelWidth="230">
                    <el-input slot="text" readonly v-model="lifePCMain.busiType" ></el-input>
                  </ui-label-text>
                </el-col>
              </el-row>
              <el-row class="ri-line">
                <el-col :span="12">
                  <ui-label-text label="现金价值自动垫缴保费:" labelWidth="230">
                    <el-select v-model="lifePCMain.xjjzzddjbf" disabled slot="text" placeholder="请选择">
                      <el-option label="是" value="1"></el-option>
                      <el-option label="否" value="0"></el-option>
                    </el-select>
                  </ui-label-text>
                </el-col>
                <el-col :span="12">
                  <ui-label-text label="账户价值自动抵交保费:" labelWidth="230">
                    <el-select v-model="lifePCMain.xjjzdjbff" disabled slot="text" placeholder="请选择">
                      <el-option label="是" value="1"></el-option>
                      <el-option label="否" value="0"></el-option>
                    </el-select>
                  </ui-label-text>
                </el-col>
              </el-row>
              <el-row class="ri-line">
                <el-col :span="12">
                  <ui-label-text label="红利领取方式:" labelWidth="230">
                    <el-select v-model="lifePCMain.hllqfs" disabled slot="text" placeholder="请选择">
                      <el-option label="累积生息" value="1"></el-option>
                      <el-option label="抵缴保费" value="2"></el-option>
                      <el-option label="增额交清" value="3"></el-option>
                      <el-option label="转万能账户" value="4"></el-option>
                    </el-select>
                  </ui-label-text>
                </el-col>
                <el-col :span="12">
                  <ui-label-text label="年金领取方式:" labelWidth="230">
                    <el-select v-model="lifePCMain.njlqfs" disabled slot="text" placeholder="请选择">
                      <el-option label="累积生息" value="1"></el-option>
                      <el-option label="抵缴保费" value="2"></el-option>
                      <el-option label="增额交清" value="3"></el-option>
                      <el-option label="转万能账户" value="4"></el-option>
                    </el-select>
                  </ui-label-text>
                </el-col>
              </el-row>
              <el-row class="ri-line">
                <el-col :span="12">
                  <ui-label-text label="特别约定:" labelWidth="230">
                    <el-input slot="text" readonly v-model="lifePCMain.speAgreement" ></el-input>
                  </ui-label-text>
                </el-col>
                <el-col :span="12">
                  <ui-label-text label="双录标识:" labelWidth="230">
                    <!-- <el-input slot="text" readonly v-model="lifePCMain.isDoubleInsert" ></el-input> -->
                    <el-select v-model="lifePCMain.isDoubleInsert" disabled slot="text" placeholder="请选择">
                      <el-option label="已经双录" value="1"></el-option>
                      <el-option label="客户拒绝" value="2"></el-option>
                    </el-select>
                  </ui-label-text>
                </el-col>
              </el-row>
              <el-row class="ri-line">
                <el-col :span="12">
                  <ui-label-text label="自保件:" required="true" labelWidth="230">
                    <el-select v-model="lifePCMain.byMyself" disabled slot="text" placeholder="请选择">
                      <el-option label="是" value="1"></el-option>
                      <el-option label="否" value="0"></el-option>
                    </el-select>
                  </ui-label-text>
                </el-col>
                <el-col :span="12">
                  <ui-label-text label="出单方式:" required="true" labelWidth="230">
                    <el-select v-model="lifePCMain.singleMode" disabled slot="text" placeholder="请选择">
                      <el-option label="同道" value="1"></el-option>
                      <el-option label="微/电投" value="2"></el-option>
                      <el-option label="纸质投保" value="3"></el-option>
                      <el-option label="其他" value="4"></el-option>
                    </el-select>
                  </ui-label-text>
                </el-col>
              </el-row>
            </div>
          </ui-line-tittle>
          <!--查看详情的投保人信息-->
          <ui-line-tittle :collapsible="true" >
            <span slot="title" >
                <i class="font_family icon-jy-menu-4" ></i>投保人信息
            </span>
            <div class="ri-content" style="padding-left:40px" slot="content">
              <el-row class="ri-line">
                <el-col :span="12">
                  <ui-label-text label="投保人代码:" :required="false" labelWidth="230">
                    <el-input slot="text" readonly v-model="lifeParty.insureNo" ></el-input>
                  </ui-label-text>
                </el-col>
                <el-col :span="12">
                  <ui-label-text label="投保人名称:" :required="false" labelWidth="230">
                    <el-input slot="text" readonly v-model="lifeParty.insureName" ></el-input>
                  </ui-label-text>
                </el-col>
              </el-row>
              <el-row class="ri-line">
                <el-col :span="12">
                  <ui-label-text label="投保人地址:" labelWidth="230">
                    <el-input slot="text" readonly v-model="lifeParty.insureAddress" ></el-input>
                  </ui-label-text>
                </el-col>
                <el-col :span="12">
                  <ui-label-text label="邮政编码:" labelWidth="230">
                    <el-input slot="text" readonly v-model="lifeParty.postNo" ></el-input>
                  </ui-label-text>
                </el-col>
              </el-row>
              <el-row class="ri-line">
                <el-col :span="12">
                  <ui-label-text label="性别:" labelWidth="230">
                    <el-select v-model="lifeParty.sexType" disabled slot="text" >
                      <el-option label="男" value="0"></el-option>
                      <el-option label="女" value="1"></el-option>
                    </el-select>
                  </ui-label-text>
                </el-col>
                <el-col :span="12">
                  <ui-label-text label="国籍:" labelWidth="230">
                    <el-input slot="text" readonly v-model="lifeParty.country" ></el-input>
                  </ui-label-text>
                </el-col>
              </el-row>
              <el-row class="ri-line">
                <el-col :span="12">
                  <ui-label-text label="学历:" labelWidth="230">
                    <el-select v-model="lifeParty.educationCode" disabled slot="text" >
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
                </el-col>
                <el-col :span="12">
                  <ui-label-text label="婚姻状况:" labelWidth="230">
                    <!-- <el-input slot="text" readonly v-model="lifeParty.marriage" ></el-input> -->
                    <el-select v-model="lifeParty.marriage" disabled slot="text">
                      <el-option label="已婚" value="1"></el-option>
                      <el-option label="未婚" value="2"></el-option>
                      <el-option label="不明" value="3"></el-option>
                      <el-option label="离异" value="4"></el-option>
                    </el-select>
                  </ui-label-text>
                </el-col>
              </el-row>
              <el-row class="ri-line">
                <el-col :span="12">
                  <ui-label-text label="出生日期:" labelWidth="230">
                    <el-date-picker slot="text" readonly v-model="lifeParty.birthDate" type="date" ></el-date-picker>
                  </ui-label-text>
                </el-col>
                <el-col :span="12">
                  <ui-label-text label="备注:" labelWidth="230">
                    <el-input slot="text" readonly v-model="lifeParty.remark" ></el-input>
                  </ui-label-text>
                </el-col>
              </el-row>
              <el-row class="ri-line">
                <el-col :span="12">
                  <ui-label-text label="证件类型:" labelWidth="230">
                    <!-- <el-input slot="text" readonly v-model="lifeParty.identifyType" ></el-input> -->
                    <el-select v-model="lifeParty.identifyType" :required="false" disabled slot="text" >
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
                </el-col>
                <!-- <el-col :span="12">
                  <ui-label-text label="证件名称:" labelWidth="230">
                    <el-input slot="text" readonly v-model="lifeParty.identifyName" ></el-input>
                  </ui-label-text>
                </el-col>    -->
              </el-row>
              <el-row class="ri-line">
                <el-col :span="12">
                  <ui-label-text label="证件号码:" :required="false" labelWidth="230">
                    <el-input slot="text" readonly v-model="lifeParty.identifyNumber" ></el-input>
                  </ui-label-text>
                </el-col>
                <el-col :span="12">
                  <ui-label-text label="证件有效期:" :required="false" labelWidth="230">
                    <el-input v-if="lifeParty.longFlag === 0" slot="text" readonly v-model="lifeParty.identifyValiddate" ></el-input>
                    <!-- <el-date-picker slot="text" readonly v-model="lifeParty.birthDate" type="date" ></el-date-picker> -->
                    <el-input v-else slot="text" readonly placeholder="永久有效" ></el-input>
                  </ui-label-text>
                </el-col>
              </el-row>
              <el-row class="ri-line">
                <el-col :span="12">
                  <ui-label-text label="固定电话:" labelWidth="230">
                    <el-input slot="text" readonly v-model="lifeParty.insureTel" ></el-input>
                  </ui-label-text>
                </el-col>
                <el-col :span="12">
                  <ui-label-text label="移动电话:" labelWidth="230">
                    <el-input slot="text" readonly v-model="lifeParty.mobilePhone" ></el-input>
                  </ui-label-text>
                </el-col>
              </el-row>
              <el-row class="ri-line">
                <el-col :span="12">
                  <ui-label-text label="工作单位:" labelWidth="230">
                    <el-input slot="text" readonly v-model="lifeParty.workingUnit" ></el-input>
                  </ui-label-text>
                </el-col>
                <el-col :span="12">
                  <ui-label-text label="职业:" labelWidth="230">
                    <el-input slot="text" readonly v-model="lifeParty.job" ></el-input>
                  </ui-label-text>
                </el-col>
              </el-row>
              <el-row class="ri-line">
                <el-col :span="12">
                  <ui-label-text label="E-mail:" labelWidth="230">
                    <el-input slot="text" readonly v-model="lifeParty.e_mail" ></el-input>
                  </ui-label-text>
                </el-col>
                <el-col :span="12">
                  <ui-label-text label="微信号:" labelWidth="230">
                    <el-input slot="text" readonly v-model="lifeParty.weixin" ></el-input>
                  </ui-label-text>
                </el-col>
              </el-row>
              <el-row class="ri-line">
                <el-col :span="12">
                  <ui-label-text label="经常居住地:" labelWidth="230">
                    <el-input slot="text" readonly v-model="lifeParty.habitualResidence" ></el-input>
                  </ui-label-text>
                </el-col>
                <el-col :span="12">
                  <ui-label-text label="与被保险人关系:" :required="false" labelWidth="230">
                    <el-select v-model="lifeParty.insuredrType" disabled slot="text">
                      <el-option label="本人" value="1"></el-option>
                      <el-option label="配偶" value="2"></el-option>
                      <el-option label="子女" value="3"></el-option>
                      <el-option label="父母" value="4"></el-option>
                      <el-option label="其他" value="5"></el-option>
                    </el-select>
                  </ui-label-text>
                </el-col>
              </el-row>
              <el-row class="ri-line">
                <div v-if="lifeParty.insuredrType === '5'">
                  <el-col :span="12">
                    <ui-label-text label="关系名称:" :required="false" labelWidth="230">
                      <el-input slot="text" readonly v-model="lifeParty.insuredrName" ></el-input>
                    </ui-label-text>
                  </el-col>
                </div>
              </el-row>
            </div>
          </ui-line-tittle>
          <!--查看详情的被保险人信息-->
          <ui-line-tittle :collapsible="true" >
            <span slot="title" >
                <i class="font_family icon-jy-menu-4" ></i>被保险人信息
            </span>
            <div class="ri-content" slot="content">
              <ul>
                <li v-for="item of lifePconDist" :key="item.index" style="list-style-type:none;">
                  <el-row class="ri-line">
                    <el-col :span="12">
                      <ui-label-text label="被保险人代码:" :required="false" labelWidth="230">
                        <el-input slot="text" readonly v-model="item.insureNoD"></el-input>
                      </ui-label-text>
                    </el-col>
                    <el-col :span="12">
                      <ui-label-text label="被保险人名称:" :required="false" labelWidth="230">
                        <el-input slot="text" readonly v-model="item.insureNameD"></el-input>
                      </ui-label-text>
                    </el-col>
                  </el-row>
                  <el-row class="ri-line">
                    <el-col :span="12">
                      <ui-label-text label="被保险人地址:" labelWidth="230">
                        <el-input slot="text" readonly v-model="item.insureAddressD"></el-input>
                      </ui-label-text>
                    </el-col>
                    <el-col :span="12">
                      <ui-label-text label="邮政编码:" labelWidth="230">
                        <el-input slot="text" readonly v-model="item.postNoD"></el-input>
                      </ui-label-text>
                    </el-col>
                  </el-row>
                  <el-row class="ri-line">
                    <el-col :span="12">
                      <ui-label-text label="性别:" labelWidth="230">
                        <el-select v-model="item.sexTypeD" disabled slot="text" >
                          <el-option label="男" value="0"></el-option>
                          <el-option label="女" value="1"></el-option>
                        </el-select>
                      </ui-label-text>
                    </el-col>
                    <el-col :span="12">
                      <ui-label-text label="国籍:" labelWidth="230">
                        <el-input slot="text" readonly v-model="item.countryD"></el-input>
                      </ui-label-text>
                    </el-col>
                  </el-row>
                  <el-row class="ri-line">
                    <el-col :span="12">
                      <ui-label-text label="学历:" labelWidth="230">
                        <el-select v-model="item.educationCodeD" disabled slot="text" >
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
                    </el-col>
                    <el-col :span="12">
                      <ui-label-text label="婚姻状况:" labelWidth="230">
                        <!-- <el-input slot="text" readonly v-model="item.marriageD"></el-input> -->
                        <el-select v-model="item.marriageD" disabled slot="text">
                          <el-option label="已婚" value="1"></el-option>
                          <el-option label="未婚" value="2"></el-option>
                          <el-option label="不明" value="3"></el-option>
                          <el-option label="离异" value="4"></el-option>
                        </el-select>
                      </ui-label-text>
                    </el-col>
                  </el-row>
                  <el-row class="ri-line">
                    <el-col :span="12">
                      <ui-label-text label="出生日期:" labelWidth="230">
                        <!-- <el-input slot="text" readonly v-model="item.birthDateD"></el-input> -->
                        <el-date-picker slot="text" readonly v-model="item.birthDateD" type="date" ></el-date-picker>
                      </ui-label-text>
                    </el-col>
                    <el-col :span="12">
                      <ui-label-text label="备注:" labelWidth="230">
                        <el-input slot="text" readonly v-model="item.remark"></el-input>
                      </ui-label-text>
                    </el-col>
                  </el-row>
                  <el-row class="ri-line">
                    <el-col :span="12">
                      <ui-label-text label="证件类型:" :required="false" labelWidth="230">
                        <!-- <el-input slot="text" readonly v-model="item.identifyTypeD"></el-input> -->
                        <el-select v-model="item.identifyTypeD" disabled slot="text" >
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
                    </el-col>
                    <!-- <el-col :span="12">
                      <ui-label-text label="证件名称:" :required="false" labelWidth="230">
                        <el-input slot="text" readonly v-model="item.identifyNameD"></el-input>
                      </ui-label-text>
                    </el-col>      -->
                  </el-row>
                  <el-row class="ri-line">
                    <el-col :span="12">
                      <ui-label-text label="证件号码:" :required="false" labelWidth="230">
                        <el-input slot="text" readonly v-model="item.identifyNumberD"></el-input>
                      </ui-label-text>
                    </el-col>
                    <el-col :span="12">
                      <ui-label-text label="证件有效期:" :required="false" labelWidth="230">
                        <!-- <el-input v-if="item.longFlagD === 0" slot="text" readonly v-model="item.identifyValiddateD" ></el-input> -->
                        <el-date-picker
                        v-if="item.longFlagD === 0"
                        slot="text"
                        v-model="item.identifyValiddateD"
                        type="date"
                        disabled> </el-date-picker>
                        <el-input v-else slot="text" readonly placeholder="永久有效" ></el-input>
                      </ui-label-text>
                    </el-col>
                  </el-row>
                  <el-row class="ri-line">
                    <el-col :span="12">
                      <ui-label-text label="固定电话:" labelWidth="230">
                        <el-input slot="text" readonly v-model="item.insureTelD"></el-input>
                      </ui-label-text>
                    </el-col>
                    <el-col :span="12">
                      <ui-label-text label="移动电话:" labelWidth="230">
                        <el-input slot="text" readonly v-model="item.mobilePhoneD"></el-input>
                      </ui-label-text>
                    </el-col>
                  </el-row>
                  <el-row class="ri-line">
                    <el-col :span="12">
                      <ui-label-text label="工作单位:" labelWidth="230">
                        <el-input slot="text" readonly v-model="item.workingUnitD"></el-input>
                      </ui-label-text>
                    </el-col>
                    <el-col :span="12">
                      <ui-label-text label="职业:" labelWidth="230">
                        <el-input slot="text" readonly v-model="item.jobD" ></el-input>
                      </ui-label-text>
                    </el-col>
                  </el-row>
                  <el-row class="ri-line">
                    <el-col :span="12">
                      <ui-label-text label="E-mail:" labelWidth="230">
                        <el-input slot="text" readonly v-model="item.e_mailD"></el-input>
                      </ui-label-text>
                    </el-col>
                    <el-col :span="12">
                      <ui-label-text label="微信号:" labelWidth="230">
                        <el-input slot="text" readonly v-model="item.weixinD"></el-input>
                      </ui-label-text>
                    </el-col>
                  </el-row>
                  <el-row class="ri-line">
                    <el-col :span="12">
                      <ui-label-text label="经常居住地:" labelWidth="230">
                        <el-input slot="text" readonly v-model="item.habitualResidenceD"></el-input>
                      </ui-label-text>
                    </el-col>
                  </el-row>
                </li>
              </ul>
            </div>
          </ui-line-tittle>
          <!--身故受益人信息-->
          <ui-line-tittle :collapsible="true" >
            <span slot="title" >
                <i class="font_family icon-jy-menu-4" ></i>身故受益人信息
            </span>
            <div class="ri-content" slot="content">
              <el-row class="ri-line">
                <el-col :span="24">
                  <el-radio-group v-model="lifePCMain.sgFlag">
                    <el-radio :label='1' disabled>法定受益人</el-radio>
                    <el-radio :label='2' disabled>指定受益人</el-radio>
                  </el-radio-group>
                </el-col>
              </el-row>
              <div v-if="lifePCMain.sgFlag =='1'"></div>
              <div v-if="lifePCMain.sgFlag =='2'">
                <ul>
                  <li v-for="item of lifePartyTList" :key="item.index" style="list-style-type:none;">
                    <el-row class="ri-line">
                      <el-col :span="12">
                        <ui-label-text label="姓名:" :required="false" labelWidth="230">
                          <el-input slot="text" readonly v-model="item.partyName"></el-input>
                        </ui-label-text>
                      </el-col>
                      <el-col :span="12">
                        <ui-label-text label="证件类型:" :required="false" labelWidth="230">
                          <!-- <el-input slot="text" readonly v-model="item.identifyType"></el-input> -->
                          <el-select v-model="item.identifyType" disabled slot="text" >
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
                      </el-col>
                    </el-row>
                    <el-row class="ri-line">
                      <el-col :span="12">
                        <ui-label-text label="证件号码:" :required="false" labelWidth="230">
                          <el-input slot="text" readonly v-model="item.identifyNumber"></el-input>
                        </ui-label-text>
                      </el-col>
                      <el-col :span="12">
                        <ui-label-text label="证件有效期:" :required="false" labelWidth="230">
                          <!-- <el-input v-if="item.longFlag === 0" slot="text" readonly v-model="item.identifyValiddate" ></el-input> -->
                          <el-date-picker v-if="item.longFlag === 0" disabled slot="text" ref="timepiker" v-model="item.identifyValiddate"  type="date" placeholder="选择日期"></el-date-picker>

                          <el-input v-else slot="text" readonly placeholder="永久有效" ></el-input>
                        </ui-label-text>
                      </el-col>
                    </el-row>
                    <el-row class="ri-line">
                      <el-col :span="12">
                        <ui-label-text label="性别:" :required="false" labelWidth="230">
                          <!-- <el-input slot="text" readonly v-model="item.sex"></el-input> -->
                          <el-select v-model="item.sex" disabled slot="text" >
                            <el-option label="男" value="0"></el-option>
                            <el-option label="女" value="1"></el-option>
                          </el-select>
                        </ui-label-text>
                      </el-col>
                      <el-col :span="12">
                        <ui-label-text label="出生日期:" :required="false" labelWidth="230">
                          <!-- <el-input slot="text" type="data" readonly v-model="item.birthdate"></el-input> -->

                          <el-date-picker slot="text" readonly v-model="item.birthdate" type="date" ></el-date-picker>
                        </ui-label-text>
                      </el-col>
                    </el-row>
                    <el-row class="ri-line">
                      <el-col :span="12">
                        <ui-label-text label="备注:" :required="false" labelWidth="230">
                          <el-input slot="text" readonly v-model="item.remark"></el-input>
                        </ui-label-text>
                      </el-col>
                      <el-col :span="12">
                        <ui-label-text label="受益排序:" :required="false" labelWidth="230">
                          <el-input slot="text" readonly v-model="item.beneficialOrder"></el-input>
                        </ui-label-text>
                      </el-col>
                    </el-row>
                    <el-row class="ri-line">
                      <el-col :span="12">
                        <ui-label-text label="收益份额:" :required="false" labelWidth="230">
                          <el-input slot="text" readonly v-model="item.benefitShare"></el-input>
                        </ui-label-text>
                      </el-col>
                      <el-col :span="12">
                        <ui-label-text label="与被保险人关系:" :required="false" labelWidth="230">
                          <el-select v-model="item.insuredrType" slot="text" placeholder="请选择">
                            <el-option label="本人" value="1"></el-option>
                            <el-option label="配偶" value="2"></el-option>
                            <el-option label="子女" value="3"></el-option>
                            <el-option label="父母" value="4"></el-option>
                            <el-option label="其他" value="5"></el-option>
                          </el-select>
                        </ui-label-text>
                      </el-col>
                    </el-row>
                    <el-row class="ri-line">
                      <el-col :span="12">
                        <ui-label-text label="关系名称:" :required="false" labelWidth="230">
                          <el-input slot="text" readonly v-model="item.insuredrName"></el-input>
                        </ui-label-text>
                      </el-col>
                      <el-col :span="12">
                        <ui-label-text label="联系方式:" labelWidth="230">
                          <el-input slot="text" readonly v-model="item.phone"></el-input>
                        </ui-label-text>
                      </el-col>
                  </el-row>
                    <el-row class="ri-line">
                      <el-col :span="12">
                        <ui-label-text label="经常居住地:" labelWidth="230">
                          <el-input slot="text" readonly v-model="item.habitualResidence"></el-input>
                        </ui-label-text>
                      </el-col>
                    </el-row>
                  </li>
                </ul>
              </div>
            </div>
          </ui-line-tittle>
          <!--生存受益人信息-->
          <ui-line-tittle :collapsible="true" >
            <span slot="title" >
                <i class="font_family icon-jy-menu-4" ></i>生存受益人信息
            </span>
            <div class="ri-content" slot="content">
              <el-row class="ri-line">
                <el-col :span="24" >
                  <el-radio-group v-model="lifePCMain.scFlag">
                    <el-radio :label='1' disabled>投保人</el-radio>
                    <el-radio :label='2' disabled>被保险人</el-radio>
                    <el-radio :label='3' disabled>其他</el-radio>
                  </el-radio-group>
                </el-col>
              </el-row>
              <div v-if="lifePCMain.scFlag =='1'"></div>
              <div v-if="lifePCMain.scFlag =='2'"></div>
              <div v-if="lifePCMain.scFlag =='3'">
                <ul>
                  <li v-for="item of lifePartyAConditionList" :key="item.index" style="list-style-type:none;margin-buttom:30px">
                    <el-row class="ri-line">
                      <el-col :span="12">
                        <ui-label-text label="姓名:" :required="false" labelWidth="230">
                          <el-input slot="text" readonly v-model="item.partyName"></el-input>
                        </ui-label-text>
                      </el-col>
                      <el-col :span="12">
                        <ui-label-text label="证件类型:" :required="false" labelWidth="230">
                          <el-select v-model="item.identifyType" disabled slot="text" >
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
                      </el-col>
                    </el-row>
                    <el-row class="ri-line">
                      <el-col :span="12">
                        <ui-label-text label="证件号码:" :required="false" labelWidth="230">
                          <el-input slot="text" readonly v-model="item.identifyNumber"></el-input>
                        </ui-label-text>
                      </el-col>
                      <el-col :span="12">
                        <ui-label-text label="证件有效期:" :required="false" labelWidth="230">
                          <el-date-picker v-if="item.longFlag === 0" slot="text" ref="timepiker" v-model="item.identifyValiddate"  type="date" placeholder="选择日期"></el-date-picker>
                          <!-- <el-input v-if="item.longFlag === 0" slot="text" readonly v-model="item.identifyValiddate" ></el-input> -->
                          <el-input v-else slot="text" readonly placeholder="永久有效" ></el-input>
                        </ui-label-text>
                      </el-col>
                    </el-row>
                    <el-row class="ri-line">
                      <el-col :span="12">
                        <ui-label-text label="性别:" :required="false" labelWidth="230">
                          <!-- <el-input slot="text" readonly v-model="item.sex"></el-input> -->
                          <el-select v-model="item.sex" disabled slot="text" >
                            <el-option label="男" value="0"></el-option>
                            <el-option label="女" value="1"></el-option>
                          </el-select>
                        </ui-label-text>
                      </el-col>
                      <el-col :span="12">
                        <ui-label-text label="出生日期:" :required="false" labelWidth="230">
                          <el-date-picker slot="text" readonly v-model="item.birthdate" type="date" ></el-date-picker>
                        </ui-label-text>
                      </el-col>
                    </el-row>
                    <el-row class="ri-line">
                      <el-col :span="12">
                        <ui-label-text label="备注:" :required="false" labelWidth="230">
                          <el-input slot="text" readonly v-model="item.remark"></el-input>
                        </ui-label-text>
                      </el-col>
                      <el-col :span="12">
                        <ui-label-text label="受益排序:" :required="false" labelWidth="230">
                          <el-input slot="text" readonly v-model="item.beneficialOrder"></el-input>
                        </ui-label-text>
                      </el-col>
                    </el-row>
                    <el-row class="ri-line">
                      <el-col :span="12">
                        <ui-label-text label="收益份额:" :required="false" labelWidth="230">
                          <el-input slot="text" readonly v-model="item.benefitShare"></el-input>
                        </ui-label-text>
                      </el-col>
                      <el-col :span="12">
                        <ui-label-text label="与被保险人关系:" :required="false" labelWidth="230">
                          <!-- <el-input slot="text" readonly v-model="item.insuredrType"></el-input> -->
                          <el-select v-model="item.insuredrType" disabled slot="text" >
                            <el-option label="本人" value="1"></el-option>
                            <el-option label="配偶" value="2"></el-option>
                            <el-option label="子女" value="3"></el-option>
                            <el-option label="父母" value="4"></el-option>
                            <el-option label="其他" value="5"></el-option>
                          </el-select>
                        </ui-label-text>
                      </el-col>
                    </el-row>
                    <el-row class="ri-line">
                      <el-col :span="12">
                        <ui-label-text label="关系名称:" :required="false" labelWidth="230">
                          <el-input slot="text" readonly v-model="item.insuredrName"></el-input>
                        </ui-label-text>
                      </el-col>
                      <el-col :span="12">
                        <ui-label-text label="联系方式:" labelWidth="230">
                          <el-input slot="text" readonly v-model="item.phone"></el-input>
                        </ui-label-text>
                      </el-col>
                    </el-row>
                    <el-row class="ri-line">
                      <el-col :span="12">
                        <ui-label-text label="经常居住地:" labelWidth="230">
                          <el-input slot="text" readonly v-model="item.habitualResidence"></el-input>
                        </ui-label-text>
                      </el-col>
                    </el-row>
                  </li>
                </ul>
              </div>
            </div>
          </ui-line-tittle>
          <!--查看详情的业务员信息-->
          <ui-line-tittle :collapsible="true" >
            <span slot="title" >
                <i class="font_family icon-jy-menu-4" ></i>业务员信息
            </span>
            <div class="ri-content" style="padding-left:40px" slot="content">
              <el-row class="ri-line">
                <el-col :span="12">
                  <ui-label-text  label="业务员代码:" required="true" labelWidth="230">
                    <el-input v-model="lifePCMain.handlerCode" readonly slot="text" ></el-input>
                  </ui-label-text>
                </el-col>
                <el-col :span="12">
                  <ui-label-text  label="业务员名称:" required="true" labelWidth="230">
                    <el-input v-model="lifePCMain.handlerName"  readonly slot="text" ></el-input>
                  </ui-label-text>
                </el-col>
              </el-row>
              <el-row class="ri-line">
                <el-col :span="12">
                  <ui-label-text  label="归属机构/部门代码:" required="true"  labelWidth="230">
                    <el-input v-model="lifePCMain.comCode" readonly slot="text" ></el-input>
                  </ui-label-text>
                </el-col>
                <el-col :span="12">
                  <ui-label-text  label="归属机构/部门名称:" required="true" labelWidth="230">
                    <el-input v-model="lifePCMain.comName"  readonly slot="text" ></el-input>
                  </ui-label-text>
                </el-col>
              </el-row>
              <el-row class="ri-line">
                <el-col :span="12">
                  <ui-label-text  label="介绍人类型:"  labelWidth="230">
                    <el-input v-model="lifePCMain.introduceType" readonly slot="text" ></el-input>
                  </ui-label-text>
                </el-col>
                <el-col :span="12">
                  <ui-label-text  label="介绍人代码:"  labelWidth="230">
                    <el-input v-model="lifePCMain.introduceCode"  readonly slot="text" ></el-input>
                  </ui-label-text>
                </el-col>
              </el-row>
              <el-row class="ri-line">
                <el-col :span="12">
                  <ui-label-text  label="介绍人姓名:"  labelWidth="230">
                    <el-input v-model="lifePCMain.introduceName" readonly slot="text" ></el-input>
                  </ui-label-text>
                </el-col>
              </el-row>
            </div>
          </ui-line-tittle>
          <!--险种信息-->
          <ui-line-tittle :collapsible="true" >
            <span slot="title" >
                <i class="font_family icon-jy-menu-4" ></i>险种信息
            </span>
            <div class="ri-content riskTable mesg_form" slot="content">
              <el-table ref="multipleTable" stripe  :data="lifeCItemKindConditionList" tooltip-effect="dark" style="width:100%" >
                <el-table-column prop="riskCode" label="险种代码"  width="150">
                  <template slot-scope="scope">
                    <ui-label-text :required="true" >
                      <el-input slot="text" size='mini'  readonly v-model="scope.row.riskCode"  ></el-input>
                    </ui-label-text>
                  </template>
                </el-table-column>
                <el-table-column prop="riskName" label="险种名称" width="200">
                  <template slot-scope="scope">
                    <ui-label-text :required="true" >
                      <el-input slot="text" size='mini' :disabled="true" readonly v-model="scope.row.riskName"  ></el-input>
                    </ui-label-text>
                  </template>
                </el-table-column>
                <el-table-column prop="mainFlag" label="主/附险标记" width="100">
                  <template slot-scope="scope">
                    <el-select  size='mini' required="true" disabled v-model="scope.row.mainFlag" slot="text" placeholder="请选择">
                      <el-option label="主险" value="1"></el-option>
                      <el-option label="附加险" value="2"></el-option>
                      <el-option label="主/附险" value="3"></el-option>
                    </el-select>
                  </template>
                </el-table-column>
                <el-table-column prop="paymentPeriod" label="缴费年期" width="135">
                  <template slot-scope="scope">
                    <ui-label-text :required="true" >
                      <el-input slot="text" size='mini' readonly v-model="scope.row.paymentPeriod"  ></el-input>
                    </ui-label-text>
                  </template>
                </el-table-column>

                <el-table-column prop="payrate" label="缴费频率" width="105">
                  <template slot-scope="scope">
                    <el-select  size='mini' disabled v-model="scope.row.payrate" slot="text" placeholder="请选择">
                      <el-option label="天缴" value="0"></el-option>
                      <el-option label="月缴" value="1"></el-option>
                      <el-option label="季缴" value="2"></el-option>
                      <el-option label="年缴" value="3"></el-option>
                      <el-option label="趸缴" value="4"></el-option>
                      <el-option label="半年缴" value="5"></el-option>
                    </el-select>
                  </template>
                </el-table-column>
                <el-table-column prop="premium" label="应缴保费" width="150">
                  <template slot-scope="scope">
                    <ui-label-text :required="true" >
                      <el-input slot="text" size='mini'  readonly v-model="scope.row.premium"  ></el-input>
                    </ui-label-text>
                  </template>
                </el-table-column>
                <el-table-column prop="riskPremium" label="保险金额" width="150">
                  <template slot-scope="scope">
                    <ui-label-text :required="true" >
                      <el-input slot="text" size='mini' readonly v-model="scope.row.riskPremium"  ></el-input>
                    </ui-label-text>
                  </template>
                </el-table-column>
                <el-table-column prop="number" label="份数" width="150" >
                  <template slot-scope="scope">
                    <ui-label-text :required="true" >
                      <el-input slot="text" size='mini' readonly v-model="scope.row.number"  ></el-input>
                    </ui-label-text>
                  </template>
                </el-table-column>

                <el-table-column prop="addPremium" label="加费金额" width="150">
                  <template slot-scope="scope">
                    <ui-label-text :required="true" >
                      <el-input slot="text" size='mini' readonly v-model="scope.row.addPremium"  ></el-input>
                    </ui-label-text>
                  </template>
                </el-table-column>
                <el-table-column prop="freeDate" type="date" label="豁免日期" width="180" show-overflow-tooltip>
                  <template slot-scope="scope">
                    <el-date-picker disabled slot="text"  size='mini' v-model="scope.row.freeDate" ref="timepiker3"  style="width: 100%" type="date" ></el-date-picker>
                  </template>
                </el-table-column>
                <el-table-column label="豁免人" width="188">
                  <template slot-scope="scope">
                    <el-checkbox disabled size="mini" v-model="scope.row.tbrFreeFlag">投保人</el-checkbox>
                    <el-checkbox disabled size='mini' v-model="scope.row.bbrFreeFlag" >被保人</el-checkbox>
                  </template>
                </el-table-column>
                <el-table-column label="保险期间" width="450">
                  <template slot-scope="scope">
                    <el-date-picker disabled slot="text" size='mini' v-model="scope.row.startDate" ref="timepiker4"  style="width:160px" type="date" ></el-date-picker>
                    <el-date-picker disabled slot="text" size='mini' v-model="scope.row.endDate" ref="timepiker5"  style="width:160px" type="date" ></el-date-picker>
                    <el-checkbox  disabled v-model="scope.row.lifeFlag" >终身</el-checkbox>
                  </template>
                </el-table-column>
              </el-table>
            </div>
          </ui-line-tittle>
          <!--缴费信息-->
          <ui-line-tittle :collapsible="true" >
            <span slot="title" >
                <i class="font_family icon-jy-menu-4" ></i>缴费信息
            </span>
            <div class="ri-content" style="padding-left:40px" slot="content">
              <el-row class="ri-line">
                <el-col :span="12">
                  <ui-label-text label="应缴日期:" labelWidth="230">
                    <el-date-picker slot="text" placeholder="选择日期" readonly v-model="lifeFeeCondition.paidDate" type="date" ></el-date-picker>
                  </ui-label-text>
                </el-col>
                <el-col :span="12">
                  <ui-label-text label="缴费方式:" labelWidth="230">
                    <el-select v-model="lifeFeeCondition.firstal" disabled slot="text" placeholder="请选择">
                      <el-option label="银行转账" value="1"></el-option>
                      <el-option label="其他" value="2"></el-option>
                    </el-select>
                  </ui-label-text>
                </el-col>
              </el-row>
              <el-row class="ri-line">
                <el-col :span="12">
                  <ui-label-text label="开户行名称:" labelWidth="230">
                    <el-input slot="text" readonly v-model="lifeFeeCondition.configSetValueName"></el-input>
                  </ui-label-text>
                </el-col>
                <el-col :span="12">
                  <ui-label-text label="账户名:" labelWidth="230">
                    <el-input slot="text" readonly v-model="lifeFeeCondition.accountNameFirstal"></el-input>
                  </ui-label-text>
                </el-col>
              </el-row>
              <el-row class="ri-line">
                <el-col :span="12">
                  <ui-label-text label="账号:" labelWidth="230">
                    <el-input slot="text" readonly v-model="lifeFeeCondition.accountFirstal"></el-input>
                  </ui-label-text>
                </el-col>
                <el-col :span="12">
                  <ui-label-text label="投保单详细信息:" labelWidth="230">
                    <el-input slot="text" readonly v-model="lifeFeeCondition.sumPremium"></el-input>
                  </ui-label-text>
                </el-col>
              </el-row>
            </div>
          </ui-line-tittle>
        </el-dialog>
     <!--查询公司 的弹框-->
    <el-dialog :append-to-body="true" width="65%" center :before-close="companyClose" title="保险公司" :visible.sync="dialogsustomerCom">
      <el-table stripe ref="multipleTable" @row-click="clickRowCom" :data="InsuranceCo" tooltip-effect="dark" style="width: 100%">
        <el-table-column prop="insurercode"  label="保险公司代码" show-overflow-tooltip>
        </el-table-column>
        <el-table-column prop="insurername" label="保险机构名称" show-overflow-tooltip>
        </el-table-column>
      </el-table>
      <div class="block" style="margin-top:15px;padding-bottom:15px">
        <el-pagination
          @current-change="handleCurrentChangeCodeCom"
          @size-change="handleSizeChangeCom"
          :current-page.sync="info.currentPage"
          :page-sizes="sizeList"
          :page-size="100"
          layout="total, sizes, prev, pager, next, jumper"
          :total="totalCom == totalCom ? totalCom : 0">
        </el-pagination>
      </div>
    </el-dialog>
     <!--查询业务员 的弹框-->
    <el-dialog :append-to-body="true" width="65%" center :before-close="sellerClose" title="业务员信息" :visible.sync="dialogsustomerSeller">
      <el-table stripe ref="multipleTable" @row-click="clickRowSeller" :data="agentFind" tooltip-effect="dark" style="width: 100%">
        <el-table-column prop="agentCode"  label="业务员代码" show-overflow-tooltip>
        </el-table-column>
        <el-table-column prop="agentName" label="业务员名称" show-overflow-tooltip>
        </el-table-column>
      </el-table>
      <div class="block" style="margin-top:15px;padding-bottom:15px">
        <el-pagination
          @current-change="handleCurrentChangeCodeSeller"
          @size-change="handleSizeChangeSeller"
          :current-page.sync="infoSeller.currentPage"
          :page-sizes="sizeList"
          :page-size="100"
          layout="total, sizes, prev, pager, next, jumper"
          :total="agentFindRecords == agentFindRecords ? agentFindRecords : 0">
        </el-pagination>
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
  import Bus from '@/components/lifeInsure/bus.js'
  // import lifeInsurEdit from '@/pages/lifeInsur_mgr/lifeInsur_policy/lifeInsur_mod' // 编辑组件
  import lifeInsurEdit from '@/pages/lifeInsur_mgr/lifeInsur_policy/lifeInsur_edit' // 编辑组件
  import lifeInsurMgr from '@/pages/lifeInsur_mgr/lifeInsur_policy/lifeInsurMgr' // 投保单主页
  // import { api } from '@/api/bill_mgr/blackInsure'
  export default {
    components: {
      [NoticeBar.name]: NoticeBar,
      [LineTittle.name]: LineTittle,
      [LabelText.name]: LabelText,
      ComDialog,
      lifeInsurEdit,
      lifeInsurMgr
    },
    data () {
      // const { noEmptyValidator } = this.$store.getters.validators
      return {
        isEdit: true,
        EditData: {},
        tableData: [],
        loading: '',
        info: {
          // currentPage: 1,
          // pageSize: 10,
          verifyStatus: '审核通过',
          comCode: '',  // 归属机构code
          comName: '',
          companyCode: '', // 归属公司code
          companyName: '',
          handlerCode: '', // 业务员code
          handlerName: ''
        },
        isShowTable: false,
        revokeinfo: {},
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
          // proposalNo: noEmptyValidator,
          // proposalNo2: noEmptyValidator,
          // proposalDate: noEmptyValidator,
          // companyCode: noEmptyValidator,
          // companyName: noEmptyValidator,
          // companyComCode: noEmptyValidator,
          // companyComName: noEmptyValidator,
          // insuranceMark: noEmptyValidator,
          // atuoAcceptFlag: noEmptyValidator,
          // businessNature: noEmptyValidator,
          // busiType: noEmptyValidator,
          // byMyself: noEmptyValidator,
          // singleMode: noEmptyValidator,
          // identifyType: noEmptyValidator,
          // identifyNumber: noEmptyValidator,
          // insuredrType: noEmptyValidator,
          // insureNameD: noEmptyValidator,
          // identifyTypeD: noEmptyValidator,
          // identifyNumberD: noEmptyValidator,
          // partyName: noEmptyValidator
        },
        verifyStatusItem: [{
          label: '未提交审核',
          value: '1'
        }, {
          label: '待审核',
          value: '2'
        }, {
          label: '审核通过',
          value: '3'
        }, {
          label: '审核不通过',
          value: '9'
        }],
        label: '3',
        modForm: {},
        label1: '1',
        label2: '1',
        disabledEdit: false,
        longFlag1: false,
        dialogTableVisibleQuery: false,
        isToMod: '0',
        queryDetailed: {},
        dialogTableVisibleRevoke: false,
        ialogTableVisibleExamine: false,
        multipleSelection: [],
        idsArray: [],
        proposalNos: {},
        isverifyStatus: [],
        verifyStatus: {},
        dialogsustomerOrg: false,
        dialogsustomerCom: false,
        dialogsustomerSeller: false,
        infoPage: {
          pageSize: 5
        },
        infoSeller: {}, // 查询业务员
        fullscreenLoading: false,
        InsuranceCo: [],
        totalCom: 0,
        sizeList: [5, 10, 20, 50],
        detailVisible: false,
        editVisible: false,
        dblclickDetailVisible: false,
        lifeCItemKindConditionList: []
      }
    },
    methods: {
      ...mapActions([
        'queryproposalForm_1',
        'queryPolicyById_1',
        'cancelByProposalNo_1',
        'lifetVerify_1',
        'customerOfOrg_1', // 客户归属机构查询   最上面第一个查询的  和新增个人客户里面查询的机构
        'getInsurers_1', // 保险公司查询
        'agentFind_1' // 业务员查询
      ]),
      dbSelect (e) {
        console.log(e)
      },
      dialogClose () {
        this.$store.state.proposalForm.insurSame = ''
        this.editVisible = false
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
        // this.info.current = page
        // alert(this.info.currentPage)
        // this.queryproposalForm_1(this.info)
        if (this.info.verifyStatus === '审核通过') {
          this.info.verifyStatus = '3'
        }
        // alert(JSON.stringify(this.info))
        if (this.info.startDate !== '' && this.info.endDate !== '') {
          var oDate1 = new Date(this.info.startDate)
          var oDate2 = new Date(this.info.endDate)
          if (oDate1.getTime() > oDate2.getTime()) {
            this.open('error', '结束日期不能小于开始日期!')
            return false
          }
        }
        this.info.currentPage = page
        this.info.pageSize = 5
        this.sizeList = [5, 10, 20, 50]
        this.Loading()
        this.queryproposalForm_1(this.info).then(result => {
          this.closeLoading()
          if (result.code === '000000') {
            // this.open('success', '查询成功!')
            this.isShowTable = true
            this.tableData = result.data.data
            console.log(this.tableData)
          } else if (result.code === '000002') {
            this.isShowTable = true
            this.tableData = []
          } else {
            this.open('error', result.msg)
          }
        })
      },
      onedit () {
        if (this.multipleSelection.length > 1) {
          this.openToast('warning', '只能修改单条数据！')
          return 0
        } else if (this.multipleSelection.length === 0) {
          this.openToast('warning', '修改必须选择一条数据！')
          return 0
        } else {
          this.$store.state.proposalForm.dataglodClose = '1'
          this.editVisible = true
        }
      },
      handleDiaCurrentChange (val) {
        this.tablePage.currentPage = val
        this.onquery()
      },
      onDetails () {
        this.detailVisible = true
      },
      handleCurrentChange1 (val) {   // 当前页
        this.info.currentPage = val
        this.queryproposalForm_1(this.info).then(result => {
          if (result.code === '000000') {
            this.tableData = result.data.data
          } else {
            this.open('error', result.msg)
          }
        })
      },
      queryPageSize1 (val) {   // 每页条熟
        console.log(`每页 ${val} 条`)
        this.info.pageSize = val
        this.info.currentPage = 1
        this.queryproposalForm_1(this.info).then(result => {
          if (result.code === '000000') {
            this.tableData = result.data.data
          } else {
            this.open('error', result.msg)
          }
        })
      },
      handleSelectionChange (val) {
        if (val.length > 0) {
          if (val.length === 1) {
            this.multipleSelection = val
            this.isToMod = '1'
            this.queryDetailed.proposalNo = this.multipleSelection[0].proposalNo
            Bus.$emit('proposalNo', this.queryDetailed.proposalNo)
          } else if (val.length > 1) {
            this.multipleSelection = val
            this.isToMod = '2'
          }
        } else {
          this.$refs.multipleTable.clearSelection()
          this.isToMod = '0'
        }
      },
      openToast (type, mesg) {
        this.$message({
          showClose: true,
          message: mesg,
          type: type
        })
      },
      detail (row) { // 单击表格里的投保单号
        this.queryDetailed.proposalNo = row.proposalNo
        this.queryPolicyById_1(this.queryDetailed).then(result => {
          // console.log('页面查询出的：' + JSON.stringify(result))
          if (result.code === '000000') {
            this.dialogTableVisibleQuery = true
            this.lifeCItemKindConditionList = result.data.lifeCItemKindConditionListTwo
            this.lifeCItemKindConditionList.forEach((item, index) => { // 险种
              if (item.tbrFreeFlag === '1' || item.tbrFreeFlag === 1) {
                this.$set(item, 'tbrFreeFlag', true)
              } else {
                this.$set(item, 'tbrFreeFlag', false)
              }
              if (item.bbrFreeFlag === '1' || item.bbrFreeFlag === 1) {
                this.$set(item, 'bbrFreeFlag', true)
              } else {
                this.$set(item, 'bbrFreeFlag', false)
              }
              if (item.lifeFlag === 1) {
                this.$set(item, 'lifeFlag', true)
              // alert(item.lifeFlag)
              } else if (item.lifeFlag === 0) {
                this.$set(item, 'lifeFlag', false)
              }
              this.$set(item, 'feeFlagTag', false)
              // if (item.feeFlag === 0 || item.feeFlag === null) {
              //   this.$set(item, 'feeFlagTag', false)
              //     // item.feeFlag = false
              // } else {
              //   this.$set(item, 'feeFlagTag', true)
              //     // item.feeFlag = true
              // }
            })
          } else {
            this.open('error', result.msg)
          }
        })
      },
      addCustom () {
        console.log('addCustomer')
      },
      clickBtn (id) {
        console.log('按钮ID:' + id)
        if (id === 11) {
          this.addCustom()
        }
      },
      dblclickInput (e) {
        this.dblclickDetailVisible = true
        this.title = '选择' + e.name
      },
      searchOrg (page) { // 查询机构code  双击
        this.info.currentPage = page
        this.info.pageSize = 5
        this.sizeList = [5, 10, 20, 50]
        this.info.clickType = '2'
        this.info.comCodeOrName = this.info.comCode
        console.log('page:' + page)
        console.log(this.info)
        this.customerOfOrg_1(this.info).then(result => {
          if (result.code === '000000' || result.code === '000002') {
            this.$store.state.proposalForm.customOfOrg = result.data.data
            this.$store.state.proposalForm.totalredords = result.data.totalRecords
            this.dialogsustomerOrg = true
          } else {
            this.open('error', result.msg)
          }
        })
      },
      searchOrg1 (page) {  // 查询机构code  失焦
        if (this.dialogsustomerOrg === true) {
          return false
        }
        this.info.currentPage = page
        this.info.pageSize = 5
        this.info.clickType = '1'
        if (this.info.comCode === '' || this.info.comCode === null || this.info.comCode === undefined) {
          return false
        }
        this.info.comCodeOrName = this.info.comCode
        console.log('page:' + page)
        console.log(this.info)
        this.customerOfOrg_1(this.info).then(result => {
          if (result.code === '000000') {
            console.log(result.data.data[0].comCode)
            console.log(result.data.data[0].comCode)
            this.info.comCode = result.data.data[0].comCode
            this.info.comName = result.data.data[0].comCName
          } else {
            this.open('error', result.msg)
            this.info.comCode = ''
          }
        })
      },
      searchOrg2 (page) { // 查询机构name  双击
        this.info.currentPage = page
        this.info.pageSize = 5
        this.sizeList = [5, 10, 20, 50]
        this.info.clickType = '2'
        this.info.comCodeOrName = this.info.comName
        console.log('page:' + page)
        console.log(this.info)
        this.customerOfOrg_1(this.info).then(result => {
          if (result.code === '000000' || result.code === '000002') {
            this.dialogsustomerOrg = true
            this.$store.state.proposalForm.customOfOrg = result.data.data
            this.$store.state.proposalForm.totalredords = result.data.totalRecords
          } else {
            this.open('error', result.msg)
          }
        })
      },
      searchOrg3 (page) {  // 查询机构name  失焦
        if (this.dialogsustomerOrg === true) {
          return false
        }
        this.info.currentPage = page
        this.info.pageSize = 5
        this.info.clickType = '1'
        if (this.info.comName === '' || this.info.comName === null || this.info.comName === undefined) {
          return false
        }
        this.info.comCodeOrName = this.info.comName
        console.log('page:' + page)
        console.log(this.info)
        this.customerOfOrg_1(this.info).then(result => {
          if (result.code === '000000') {
            this.info.comCode = result.data.data[0].comCode
            this.info.comName = result.data.data[0].comCName
          } else {
            this.open('error', result.msg)
            this.info.comName = ''
          }
        })
      },
      orgClose () {
        this.dialogsustomerOrg = false
        this.sizeList = []
        this.info.comName = ''
        this.info.comCode = ''
      },
      // 把机构带入
      customerinOrg (row, event, column) {
        this.info.comCode = row.comCode
        this.info.comName = row.comCName
        this.dialogsustomerOrg = false
      },
      // 机构的页码
      handleCurrentChangeCode (val) {
        console.log(`当前前页: ${val}`)
        this.info.currentPage = val
        this.sizeList = [5, 10, 20, 50]
        this.info.type = '2'
        this.info.clickType = '2'
        this.customerOfOrg_1(this.info).then(result => {
          if (result.code === '000000' || result.code === '000002' || result.code === '000003') {
            this.dialogsustomerOrg = true
          } else {
            this.open('error', result.msg)
            this.info.comCode = ''
          }
        })
      },
      // 机构的分页条数
      handleSizeChange (val) {
        console.log(`每页 ${val} 条`)
        this.info.pageSize = val
        this.info.currentPage = 1
        this.customerOfOrg_1(this.info)
      },
      searchCom (page) { // 查询公司code 双击
        this.info.currentPage = page
        this.info.pageSize = 5
        this.sizeList = [5, 10, 20, 50]
        this.info.type = '2'
        this.info.clickType = '2'
        this.info.insurerName = ''
        this.info.insurerCode = this.info.companyCode
        console.log('page:' + page)
        console.log(this.info)
        this.getInsurers_1(this.info).then(result => {
          if (result.code === '000000') {
            this.InsuranceCo = result.data.data
            this.totalCom = result.data.totalRecords
            this.dialogsustomerCom = true
          } else if (result.code === '000003') {
            this.InsuranceCo = []
            this.totalCom = 0
            this.dialogsustomerCom = true
          } else {
            this.open('error', result.msg)
          }
        })
      },
      searchCom1 (page) { // 查询公司code 失焦
        if (this.dialogsustomerCom === true) {
          return false
        }
        this.info.currentPage = page
        this.info.pageSize = 5
        this.info.type = '2'
        this.info.clickType = '1'
        if (this.info.companyCode === '' || this.info.companyCode === null || this.info.companyCode === undefined) {
          return false
        }
        this.info.insurerCode = this.info.companyCode
        console.log('page:' + page)
        console.log(this.info)
        this.getInsurers_1(this.info).then(result => {
          if (result.code === '000000') {
            this.info.companyCode = result.data.insurercode
            this.info.companyName = result.data.insurername
          } else {
            this.open('error', result.msg)
            this.info.companyCode = ''
            this.info.companyName = ''
          }
        })
      },
      searchCom2 (page) {  // 查询公司name 双击
        this.info.currentPage = page
        this.info.pageSize = 5
        this.sizeList = [5, 10, 20, 50]
        this.info.type = '2'
        this.info.clickType = '2'
        this.info.insurerCode = ''
        this.info.insurerName = this.info.companyName
        console.log('page:' + page)
        console.log(this.info)
        this.getInsurers_1(this.info).then(result => {
          if (result.code === '000000') {
            this.InsuranceCo = result.data.data
            this.totalCom = result.data.totalRecords
            this.dialogsustomerCom = true
          } else if (result.code === '000003') {
            this.InsuranceCo = []
            this.totalCom = 0
            this.dialogsustomerCom = true
          } else {
            this.open('error', result.msg)
            this.info.companyCode = ''
            this.info.companyName = ''
          }
        })
      },
      searchCom3 (page) { // 查询公司name 失焦
        if (this.dialogsustomerCom === true) {
          return false
        }
        this.info.currentPage = page
        this.info.pageSize = 5
        this.info.type = '2'
        this.info.clickType = '1'
        // alert('11:' + JSON.stringify(this.info))
        this.info.insurerName = this.info.companyName
        console.log('page:' + page)
        console.log(this.info)
        this.getInsurers_1(this.info).then(result => {
          if (result.code === '000000') {
            this.info.companyCode = result.data.insurercode
            this.info.companyName = result.data.insurername
          } else {
            this.open('error', result.msg)
            this.info.companyCode = ''
            this.info.companyName = ''
          }
        })
      },
      companyClose () {
        this.sizeList = []
        this.dialogsustomerCom = false
        this.info.companyCode = ''
        this.info.companyName = ''
      },
      // 公司的页码
      handleCurrentChangeCodeCom (val) {
        console.log(`当前前页: ${val}`)
        this.info.currentPage = val
        // this.info.pageSize = 5
        this.sizeList = [5, 10, 20, 50]
        this.info.type = '2'
        this.info.clickType = '2'
        this.getInsurers_1(this.info).then(result => {
          if (result.code === '000000' || result.code === '000002' || result.code === '000003') {
            this.InsuranceCo = result.data.data
            this.totalCom = result.data.totalRecords
            this.dialogsustomerCom = true
          } else {
            this.open('error', result.msg)
            this.info.companyCode = ''
          }
        })
      },
      // 公司的分页条数
      handleSizeChangeCom (val) {
        console.log(`每页 ${val} 条`)
        this.info.pageSize = val
        this.info.currentPage = 1
        this.sizeList = [5, 10, 20, 50]
        this.info.type = '2'
        this.info.clickType = '2'
        this.getInsurers_1(this.info).then(result => {
          if (result.code === '000000' || result.code === '000002' || result.code === '000003') {
            this.InsuranceCo = result.data.data
            this.totalCom = result.data.totalRecords
            this.dialogsustomerCom = true
          } else {
            this.open('error', result.msg)
            this.info.companyCode = ''
          }
        })
      },
      // 把公司代码和名称带入
      clickRowCom (row, event, column) {
        this.info.companyCode = row.insurercode
        this.info.companyName = row.insurername
        this.dialogsustomerCom = false
      },
      searchSeller (page) { // 查询业务员code 双击
        this.infoSeller.currentPage = page
        this.infoSeller.pageSize = 5
        this.sizeList = [5, 10, 20, 50]
        this.infoSeller.clickType = '2'
        this.infoSeller.agentName = ''
        this.infoSeller.agentCode = this.info.handlerCode
        this.$store.state.proposalForm.agentFind = []
        console.log('page:' + page)
        console.log(this.infoSeller)
        this.agentFind_1(this.infoSeller).then(result => {
          if (result.code === '000000' || result.code === '000002') {
            this.$store.state.proposalForm.agentFind = result.data.data
            this.$store.state.proposalForm.agentFindRecords = result.data.totalRecords
            this.dialogsustomerSeller = true
          } else {
            this.open('error', result.msg)
            this.info.handlerCode = ''
            this.info.handlerName = ''
          }
        })
      },
      searchSeller1 (page) { // 查询业务员code 失焦
        if (this.dialogsustomerSeller === true) {
          return false
        }
        this.infoSeller.currentPage = page
        this.infoSeller.pageSize = 5
        this.infoSeller.clickType = '1'
        // 判断输入框里是否有值  没有值不调接口
        if (this.info.handlerCode === '' || this.info.handlerCode === null || this.info.handlerCode === undefined) {
          return false
        }
        this.infoSeller.agentCode = this.info.handlerCode // 获取所填写的值
        this.agentFind_1(this.infoSeller).then(result => {
          if (result.code === '000000') {
            this.info.handlerCode = result.data.data[0].agentCode
            this.info.handlerName = result.data.data[0].agentName
          } else {
            this.open('error', result.msg)
            this.info.handlerCode = ''
            this.info.handlerName = ''
          }
        })
      },
      searchSeller2 (page) { // 查询业务员name 双击
        this.infoSeller.currentPage = page
        this.infoSeller.pageSize = 5
        this.sizeList = [5, 10, 20, 50]
        this.infoSeller.clickType = '2'
        this.infoSeller.agentName = this.info.handlerName
        this.infoSeller.agentCode = ''
        console.log('page:' + page)
        console.log(this.infoSeller)
        this.agentFind_1(this.infoSeller).then(result => {
          if (result.code === '000000' || result.code === '000002') {
            this.dialogsustomerSeller = true
            this.$store.state.proposalForm.agentFind = result.data.data
            this.$store.state.proposalForm.agentFindRecords = result.data.totalRecords
          } else {
            this.open('error', result.msg)
            this.info.handlerCode = ''
            this.info.handlerName = ''
          }
        })
      },
      searchSeller3 (page) { // 查询业务员name 失焦
        if (this.dialogsustomerSeller === true) {
          return false
        }
        this.infoSeller.currentPage = page
        this.infoSeller.pageSize = 5
        this.infoSeller.clickType = '1'
        // 判断输入框里是否有值  没有值不调接口
        if (this.info.handlerName === '' || this.info.handlerName === null || this.info.handlerName === undefined) {
          return false
        }
        this.infoSeller.agentCode = this.info.handlerName // 获取所填写的值
        this.agentFind_1(this.infoSeller).then(result => {
          if (result.code === '000000') {
            this.info.handlerCode = result.data.data[0].agentCode
            this.info.handlerName = result.data.data[0].agentName
          } else {
            this.open('error', result.msg)
            this.info.handlerCode = ''
            this.info.handlerName = ''
          }
        })
      },
      sellerClose () {
        this.dialogsustomerSeller = false
        this.sizeList = []
        this.info.handlerCode = ''
        this.info.handlerName = ''
      },
      // 业务员的页码
      handleCurrentChangeCodeSeller (val) {
        console.log(`当前前页: ${val}`)
        this.infoSeller.currentPage = val
        this.agentFind_1(this.infoSeller).then(result => {
          if (result.code === '000000' || result.code === '000002' || result.code === '000003') {
            this.dialogsustomerSeller = true
          } else {
            this.open('error', result.msg)
            this.info.handlerCode = ''
            this.info.handlerName = ''
          }
        })
      },
      // 业务员的分页条数
      handleSizeChangeSeller (val) {
        console.log(`每页 ${val} 条`)
        this.infoSeller.pageSize = val
        this.infoSeller.currentPage = 1
        this.agentFind_1(this.infoSeller).then(result => {
          if (result.code === '000000' || result.code === '000002' || result.code === '000003') {
            this.dialogsustomerSeller = true
          } else {
            this.open('error', result.msg)
            this.info.handlerCode = ''
            this.info.handlerName = ''
          }
        })
      },
      // 把业务员代码和名称带入
      clickRowSeller (row, event, column) {
        this.info.handlerCode = row.agentCode
        this.info.handlerName = row.agentName
        this.dialogsustomerSeller = false
      },
      handlemod () {
        if (this.isToMod === '1') {
          // 调接口查询 然后放入store 里面
          // alert(JSON.stringify(this.queryDetailed))
          this.$store.state.proposalForm.localStorage = this.queryDetailed
          // alert('localStorage:' + JSON.stringify(this.$store.state.proposalForm.localStorage))
          // this.$router.push('/lifeInsur_policy/lifeInsur_mod')
          this.multipleSelection.forEach(ele => {
            this.isverifyStatus.push(ele.verifyStatus)
          })

          // this.queryPolicyById_1(this.queryDetailed).then(result => {
          //   if (result.code === '000000') {
          //     this.$router.push('/lifeInsur_policy/lifeInsur_mod')
          //   } else {
          //     this.open('error', result.msg)
          //   }
          // })
          // alert(JSON.stringify(this.isverifyStatus))
          this.queryPolicyById_1(this.queryDetailed).then(result => {
            if (result.code === '000000' || result.code === '000002' || result.code === '000003') {
              this.EditData = result.data
              /* this.lifeCItemKindConditionList.forEach((item, index) => {
                if (item.tbrFreeFlag === 1 || item.tbrFreeFlag === '1') {
                  this.lifeCItemKindConditionList[index].tbrFreeFlag = true
                } else {
                  this.lifeCItemKindConditionList[index].tbrFreeFlag = false
                }
                if (item.bbrFreeFlag === 1 || item.bbrFreeFlag === '1') {
                  this.lifeCItemKindConditionList[index].bbrFreeFlag = true
                } else {
                  this.lifeCItemKindConditionList[index].bbrFreeFlag = false
                }
                if (item.lifeFlag === 1 || item.lifeFlag === '1') {
                  this.lifeCItemKindConditionList[index].lifeFlag = true
                } else {
                  this.lifeCItemKindConditionList[index].lifeFlag = false
                }
              }) */
              this.$store.state.proposalForm.dataglodClose = '1'
              this.editVisible = true
            } else {
              this.open('error', result.msg)
            }
          })
        } else if (this.isToMod === '2') {
          this.open('error', '只能选取一条数据进行修改')
          this.$refs.multipleTable.clearSelection()
          this.isverifyStatus = []
        } else {
          this.open('error', '请先选取投保单进行修改')
        }
      },
      open (type, mesg) {
        this.$message({
          showClose: true,
          message: mesg,
          type: type
        })
      }
    },
    watch: {
      windowClose (val) {
        if (val === '0') {
          this.editVisible = false
          this.query(1)
        }
      }
    },
    computed: {
      // 客户所属机构
      customOfOrg () {
        return this.$store.state.proposalForm.customOfOrg
        // return this.$store.state.InsuranceCo.getInsurersOrg
      },
      // 客户所属机构查询出来的总条数
      totalsOrg () {
        return parseInt(this.$store.state.proposalForm.totalredords)
      },
      // // 保险公司查询
      // InsuranceCo () {
      //   return this.$store.state.InsuranceCo.getInsurers
      // },
      // 业务员查询
      agentFind () {
        return this.$store.state.proposalForm.agentFind
      },
     // 业务员查询出来的总条数
      agentFindRecords () {
        return parseInt(this.$store.state.proposalForm.agentFindRecords)
      },
      // totalCom () {
      //   return parseInt(this.$store.state.InsuranceCo.totalRecords)
      // },
      totalRecords () {
        return parseInt(this.$store.state.proposalForm.proposaltotal)
      },
      lifePCMain () {
        return this.$store.state.proposalForm.lifePCMainCondition // 基本信息
      },
      lifeParty () {
        return this.$store.state.proposalForm.lifePartyCondition // 投保人信息
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
      lifeFeeCondition () {
        return this.$store.state.proposalForm.lifeFeeCondition // 缴费信息
      },
      windowClose () {
        return this.$store.state.proposalForm.dataglodClose
      }
    }
  }
</script>

<style lang="scss" scoped type="text/css">
	.wrap {
		padding-left: 30px;
		padding-right: 30px;
	}

	.verify-content {
		padding: 20px 0;
	}

	.btn {
		text-align: center;
	}

	.btn .el-button {
		margin-right: 10px;
	}

	.table {
		margin: 20px 0;
	}

	.btn-export {
		margin: 10px auto;
	}

	.upload-content {
		width: 100%;
		text-align: center;
	}

	.red-color {
		color: red;
	}

	.download {
		color: blue;
		cursor: pointer;
	}

	.dis-top {
		margin-top: 10px;
	}

	.dis-bottom {
		margin-bottom: 10px;
	}

  #insManage{ padding: 0px 30px 30px 30px;}
  .ri-line { margin-bottom: 22px  !important; }
  .btn-container { margin-top: 30px; text-align: center}
  .el-form {margin: 20px 0 ;}
  .pagination {text-align: right;margin: 20px auto;}
  a { cursor: pointer;}
  .datestyle{ color: #717171;font-size: 0.875rem; display: inline-block;width: 120px;}
  .datestyle1{ color: #717171;font-size: 0.875rem;display: inline-block;text-align: center;width: 60px;}
  .el-pagination{float: right;padding-bottom: 15px}
  .center{ text-align: center}
  .astyle{text-decoration:none;}
  .el-input--suffix .el-input__inner {
    padding-right: 30px;
  }
  .riskTable .el-select { width: 90%; }
  .riskTable .label-text .el-input { width: 90%;  }
  .riskTable .el-form-item__error { left: 0; padding: 0 !important}
  .mesg_form .required:before{
    font-size: 14px!important;
    top: 3px !important;
  }
</style>
<style>
  .mesg_form .required:before{
    font-size: 14px!important;
    top: 3px !important;
  }
</style>

